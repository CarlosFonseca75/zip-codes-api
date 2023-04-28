// Dependencies.
import { Module } from '@nestjs/common';
import { ZipCodesService } from './zip-codes.service';
import { ZipCodesController } from './zip-codes.controller';

// Mongoose.
import { MongooseModule } from '@nestjs/mongoose';

// Schemas.
import { ZipCode, ZipCodeSchema } from './schemas/zipcode.schema';
import { Price, PriceSchema } from '../prices/schemas/price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ZipCode.name, schema: ZipCodeSchema }]),
    MongooseModule.forFeature([{ name: Price.name, schema: PriceSchema }]),
  ],
  providers: [ZipCodesService],
  controllers: [ZipCodesController],
})
export class ZipCodesModule {}
