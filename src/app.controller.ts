// Dependencies.
import { Controller, Get } from '@nestjs/common';

// Services.
import { AppService } from './app.service';

// Interfaces.
import { ApiResponse } from './app.interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth(): ApiResponse<any> {
    return this.appService.checkHealth();
  }
}
