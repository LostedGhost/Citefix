// src/complaint/schemas/complaint.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ComplaintStatut } from '../complaint-statut.enum';

@Schema()
export class Complaint extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  citoyen_id: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop()
  categorie?: string;

  @Prop({
    required: true,
    enum: ComplaintStatut,
    default: ComplaintStatut.SIGNALEE,
  })
  statut: string;

  @Prop({ type: [String], default: [] })
  photos: string[];

  @Prop({ type: [String], default: [] })
  videos: string[];

  @Prop({ required: true })
  date_publication: Date;

  @Prop()
  zone?: string;

  @Prop()
  fonds_recu?: number;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({
    type: [
      {
        user_id: { type: Types.ObjectId, required: true },
        texte: { type: String, required: true },
        date: { type: Date, required: true },
        signalements: [
          {
            citoyen_id: { type: Types.ObjectId },
            raison: String,
            date: Date,
          },
        ],
      },
    ],
    default: [],
  })
  commentaires: {
    user_id: Types.ObjectId;
    texte: string;
    date: Date;
    signalements?: {
      citoyen_id?: Types.ObjectId;
      raison?: string;
      date?: Date;
    }[];
  }[];

  @Prop({
    type: [
      {
        user_id: { type: Types.ObjectId, required: true },
        type: { type: String, enum: ['like', 'dislike'], required: true },
      },
    ],
    default: [],
  })
  reactions: {
    user_id: Types.ObjectId;
    type: 'like' | 'dislike';
  }[];

  @Prop({
    type: [
      {
        technicien_id: { type: Types.ObjectId },
        categorie: String,
        description: String,
        date: Date,
      },
    ],
    default: [],
  })
  categorie_proposee: {
    technicien_id?: Types.ObjectId;
    categorie?: string;
    description?: string;
    date?: Date;
  }[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  technicien_id?: Types.ObjectId;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
