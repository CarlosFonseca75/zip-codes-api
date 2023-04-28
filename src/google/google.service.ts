// Dependencies.
import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

@Injectable()
export class GoogleService {
  /**
   * @function googleLogin
   * @description Logs in a user with Google credentials.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @returns {ApiResponse} - The API response object.
   */
  googleLogin(req: any, res: Response) {
    try {
      if (!req.user) {
        return {
          message: 'Invalid Google Credentials.',
          error: true,
          httpStatus: HttpStatus.UNAUTHORIZED,
        };
      }

      // Set expiration (6 hours).
      const expiration = new Date(Date.now() + 6 * 60 * 60 * 1000);

      // Set a cookie with a the access token.
      const accessToken = req.user.accessToken;

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        sameSite: true,
        secure: true,
        expires: expiration,
      });

      // Set a cookie with user's data.
      const { email, firstname, lastname } = req.user;
      const userData = { email, firstname, lastname };

      res.cookie('user_data', userData, {
        httpOnly: false,
        sameSite: true,
        secure: true,
        expires: expiration,
      });

      // Redirect to the app.
      return res.redirect(process.env.GOOGLE_FRONT_END_URL);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return {
        message: 'An error occurred while logging in with Google credentials.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * @function googleLogout
   * @description Logs out a user.
   * @param {Response} res - The Express response object.
   * @returns {ApiResponse} - The API response object.
   */
  googleLogout(res: Response): ApiResponse<any> {
    try {
      // Remove cookies.
      res.clearCookie('access_token');
      res.clearCookie('user_data');
      
      // End.
      res.end();

      // Success.
      return {
        message: 'Logged out successfully.',
        error: false,
        httpStatus: HttpStatus.OK,
      };
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return {
        message: 'An error occurred while logging out.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
