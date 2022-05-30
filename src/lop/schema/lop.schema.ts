import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LopDocument = Lop & Document;

@Schema()
export class Lop {
  @Prop({ required: true })
  name: string;
}

export const LopSchema = SchemaFactory.createForClass(Lop);
