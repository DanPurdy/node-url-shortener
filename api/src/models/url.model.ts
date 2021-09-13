import { Document, model, Schema } from 'mongoose';
import CounterModel from './counter.model';

export const COUNT_OFFSET = process.env.COUNTER_STEP
  ? Number(process.env.COUNTER_STEP)
  : 1000; // exaggerated for local setup

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
  // NOTE: incrementing by 1000 here just to have a little more of a dramatic change in the generated URL's in the client - would usually increment by 1 in a real system
  CounterModel.findByIdAndUpdate(
    { _id: 'count' },
    { $inc: { count: COUNT_OFFSET } },
  )
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
});

const UrlModel = model<IUrl>('Url', urlSchema);

export default UrlModel;
