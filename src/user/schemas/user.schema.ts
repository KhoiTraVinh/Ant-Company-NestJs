import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Lop } from 'src/lop/schema/lop.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lop' })
  lop: Lop;
}

export const UserSchema = SchemaFactory.createForClass(User);
