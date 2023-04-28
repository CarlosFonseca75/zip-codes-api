// Dependencies.
import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';

// Mongoose.
import { MongooseModule } from '@nestjs/mongoose';

// Schemas.
import { Plan, PlanSchema } from './schemas/plan.schema';
import { Price, PriceSchema } from '../prices/schemas/price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
    MongooseModule.forFeature([{ name: Price.name, schema: PriceSchema }]),
  ],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
