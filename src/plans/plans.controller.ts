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
import { PlansService } from './plans.service';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

// Guards.
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<ApiResponse<any>> {
    return this.plansService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  createOne(@Body() data: any): Promise<ApiResponse<any>> {
    return this.plansService.createOne(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateOne(@Param('id') id: string, @Body() data: any): Promise<ApiResponse<any>> {
    return this.plansService.updateOne(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteOne(@Param('id') id: string): Promise<ApiResponse<any>> {
    return this.plansService.deleteOne(id);
  }
}
