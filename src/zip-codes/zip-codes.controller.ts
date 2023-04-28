// Dependencies.
import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Param,
  Put,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Services.
import { ZipCodesService } from './zip-codes.service';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

// Guards.
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('zip-codes')
export class ZipCodesController {
  constructor(private readonly zipCodesService: ZipCodesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<ApiResponse<any>> {
    return this.zipCodesService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  createOne(@Body() data: any): Promise<ApiResponse<any>> {
    return this.zipCodesService.createOne(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateOne(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<ApiResponse<any>> {
    return this.zipCodesService.updateOne(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteOne(@Param('id') id: string): Promise<ApiResponse<any>> {
    return this.zipCodesService.deleteOne(id);
  }
}
