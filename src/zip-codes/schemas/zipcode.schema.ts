// Dependencies.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ZipCodeDocument = HydratedDocument<ZipCode>;

@Schema()
export class ZipCode {
  @Prop()
  zipCode: string;

  @Prop()
  city: string;

  @Prop()
  state: string;
}

export const ZipCodeSchema = SchemaFactory.createForClass(ZipCode);
