import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  mail: string;

  @Prop({ required: true })
  password: string;
}

const schema = SchemaFactory.createForClass(User);
schema.plugin(mongoosePaginate);
export const UserSchema = schema;
