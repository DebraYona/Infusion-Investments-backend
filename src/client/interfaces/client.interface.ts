import { Document } from 'mongoose';

export interface Client extends Document {

  readonly firstName: string;
  readonly lastName: string;
  readonly city: string;
  address?: string;
}