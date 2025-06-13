import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Complaint {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  zone: string;

  @Prop({ default: 0 })
  fonds_recu: number;
}

export type ComplaintDocument = Complaint & Document;

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
