import { Document } from 'mongoose';

export interface Car extends Document {
  client: string;
  carModel: string;
  year: string;
  placa: string;
  valves: string;
  oil: string;
  photo: string;
}