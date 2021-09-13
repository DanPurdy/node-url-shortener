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

urlSchema.pre('save', (next) => {
  // TODO move count id name to env vars
  // NOTE: incrementing by 1000 here just to have a little more of a dramatic change in the generated URL's in the client - would usually increment by 1 in a real system
  CounterModel.findByIdAndUpdate({ _id: 'count' }, { $inc: { count: 1000 } })
    .then((counter) => {
      next();
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
});

const UrlModel = model<IUrl>('Url', urlSchema);

export default UrlModel;
