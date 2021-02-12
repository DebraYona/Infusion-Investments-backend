import { Schema } from 'mongoose';

export const CarSchema = new Schema({
  carModel: { type: String, required: true},
  year: { type: String, },
  placa: { type: String, },
  oil: { type: String },
  valves: { type: String },
  photo: { type: String },
  status: { type: Boolean, default: true },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'ClientSchema',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
  
});