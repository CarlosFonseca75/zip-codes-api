// Dependencies.
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers.
import { AppController } from './app.controller';

// Services.
import { AppService } from './app.service';

// Modules.
import { GoogleModule } from './google/google.module';
import { ZipCodesModule } from './zip-codes/zip-codes.module';
import { AuthModule } from './auth/auth.module';
import { PlansModule } from './plans/plans.module';
import { PricesModule } from './prices/prices.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    GoogleModule,
    ZipCodesModule,
    PlansModule,
    PricesModule,
    PublicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
