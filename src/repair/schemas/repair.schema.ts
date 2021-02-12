import { Schema } from 'mongoose';

export const RepairSchema = new Schema({
  type: { type: String, required: true},
  cost: { type: Number},
  date: { type: Date },
  status: { type: Boolean, default: true },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'CarSchema',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
  
});