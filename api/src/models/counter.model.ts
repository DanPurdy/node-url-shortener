import { Document, model, Schema } from 'mongoose';

interface ICounter extends Document {
  _id: string;
  count: number;
}

const counterSchema = new Schema<ICounter>(
  {
    _id: {
      type: String,
    },
    count: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const CounterModel = model<ICounter>('Counter', counterSchema);

export default CounterModel;
