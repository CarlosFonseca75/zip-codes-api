// Dependencies.
import { Controller, Get, UseGuards } from '@nestjs/common';

// Services.
import { AuthService } from './auth.service';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

// Guards.
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard)
  getSession(): ApiResponse<any> {
    return this.authService.getSession();
  }
}
