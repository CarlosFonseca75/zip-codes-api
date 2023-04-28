// Dependencies.
import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';

// Mongoose.
import { MongooseModule } from '@nestjs/mongoose';

// Schemas.
import { Price, PriceSchema } from '../prices/schemas/price.schema';
import { ZipCode, ZipCodeSchema } from '../zip-codes/schemas/zipcode.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Price.name, schema: PriceSchema }]),
    MongooseModule.forFeature([{ name: ZipCode.name, schema: ZipCodeSchema }]),
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
