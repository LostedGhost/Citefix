import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../roles.enum';

@Schema()
export class User extends Document {
  @Prop({ required: true }) fullName: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) password: string;
  @Prop({ enum: Role, default: Role.CITOYEN }) role: Role;
  @Prop() bio?: string;
  @Prop() avatar?: string;
  @Prop() dateOfBirth?: Date;
  @Prop() residence?: string;
  @Prop({ default: true }) isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
