import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String },
});

export interface Cat {
  id: string;
  name: string;
  age: number;
  breed?: string;
}
