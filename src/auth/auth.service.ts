// Dependencies.
import { HttpStatus, Injectable } from '@nestjs/common';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

@Injectable()
export class AuthService {
  /**
   * @function
   * @description Checks the user's session.
   * @param {Request} req - The Express request object.
   * @returns {ApiResponse} - The API response object.
   */
  getSession(): ApiResponse<any> {
    return {
      message: 'Session is valid.',
      error: false,
      httpStatus: HttpStatus.OK,
    };
  }
}
