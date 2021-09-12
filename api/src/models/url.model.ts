import { Document, model, Schema } from 'mongoose';
import CounterModel from './counter.model';

export interface IUrl extends Document {
  longUrl: string;
  shortUrl: string;
}

const urlSchema = new Schema<IUrl>(
  {
    longUrl: {
      required: true,
      type: String,
    },
    shortUrl: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

urlSchema.pre('save', function (next) {
  const doc = this;

  // TODO move count name to env vars
  CounterModel.findByIdAndUpdate({ _id: 'count' }, { $inc: { count: 1 } })
    .then((counter) => {
      console.log(counter?.count);
      // doc._id = counter?.count;
      next();
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
});

const UrlModel = model<IUrl>('Url', urlSchema);

export default UrlModel;
