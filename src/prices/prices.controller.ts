// Dependencies.
import {
  Controller,
  Get,
  UseGuards,
  Param,
  Put,
  Body,
  Delete,
  Post,
} from '@nestjs/common';

// Services.
import { PricesService } from './prices.service';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

// Guards.
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<ApiResponse<any>> {
    return this.pricesService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  createOne(@Body() data: any): Promise<ApiResponse<any>> {
    return this.pricesService.createOne(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateOne(@Param('id') id: string, @Body() data: any): Promise<ApiResponse<any>> {
    return this.pricesService.updateOne(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteOne(@Param('id') id: string): Promise<ApiResponse<any>> {
    return this.pricesService.deleteOne(id);
  }
}
