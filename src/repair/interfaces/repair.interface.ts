import { Document } from 'mongoose';

export interface Repair extends Document {
  car: string;
  cost: number;
  date: Date;
  type: string;
}