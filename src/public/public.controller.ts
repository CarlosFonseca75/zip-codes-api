// Dependencies.
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

// Services.
import { PublicService } from './public.service';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('/plans-prices/:zipCode')
  getAll(@Param('zipCode') zipCode: string): Promise<ApiResponse<any>> {
    return this.publicService.getPlansPrices(zipCode);
  }
}
