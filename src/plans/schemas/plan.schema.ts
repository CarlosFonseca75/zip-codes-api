// Dependencies.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class Plan {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
