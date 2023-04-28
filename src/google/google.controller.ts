// Dependencies.
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

// Guards.
import { GoogleOauthGuard } from '../auth/guards/google-oauth.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

// Services.
import { GoogleService } from './google.service';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('/redirect')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    this.googleService.googleLogin(req, res);
  }

  @Get('/logout')
  @UseGuards(AuthGuard)
  googleLogout(@Res() res: Response): ApiResponse<any> {
    return this.googleService.googleLogout(res);
  }
}
