// Dependencies.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

// Schemas.
import { Plan } from '../../plans/schemas/plan.schema';
import { ZipCode } from '../../zip-codes/schemas/zipcode.schema';

export type PriceDocument = HydratedDocument<Price>;

@Schema()
export class Price {
  @Prop()
  price: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: Plan.name })
  plan_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: ZipCode.name })
  zip_code_id: Types.ObjectId;
}

export const PriceSchema = SchemaFactory.createForClass(Price);

// Virtuals.
PriceSchema.virtual('plan', {
  ref: Plan.name,
  localField: 'plan_id',
  foreignField: '_id',
  justOne: true,
});

PriceSchema.virtual('zipCode', {
  ref: ZipCode.name,
  localField: 'zip_code_id',
  foreignField: '_id',
  justOne: true,
});
