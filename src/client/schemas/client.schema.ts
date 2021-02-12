import { Schema } from 'mongoose';

export const ClientSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  photo: { type: String },
  status: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
  
});