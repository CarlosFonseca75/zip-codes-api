// Dependencies.
import { HttpStatus, Injectable } from '@nestjs/common';

// Interfaces.
import { ApiResponse } from './app.interfaces';

@Injectable()
export class AppService {
  /**
   * @function
   * @description Checks the health of the API.
   * @returns {ApiResponse} - The API response object.
   */
  checkHealth(): ApiResponse<any> {
    return {
      message: 'API is running.',
      error: false,
      httpStatus: HttpStatus.OK,
    };
  }
}
