import { Document } from 'mongoose';

export interface INote extends Document {
  Title: string;
  Description: string;
  color: string;
  isArchived: boolean;
  isTrash: boolean;
  UserID: string
}