// Dependencies.
import { Injectable, HttpStatus } from '@nestjs/common';

// Mongoose.
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas.
import { Price } from '../prices/schemas/price.schema';
import { ZipCode } from '../zip-codes/schemas/zipcode.schema';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

@Injectable()
export class PublicService {
  // Schemas.
  constructor(
    @InjectModel(Price.name) private pricesModel: Model<Price>,
    @InjectModel(ZipCode.name) private zipCodesModel: Model<ZipCode>,
  ) {}

  /**
   * @function
   * @name getPlansPrices
   * @description Retrieves all plans with their prices by zip code.
   * @param {string} zipCode - The zip code.
   * @returns {ApiResponse} The API response object.
   */
  async getPlansPrices(zipCode: string): Promise<ApiResponse<any>> {
    try {
      // Get zip code.
      const zipCodeDocument = await this.zipCodesModel
        .findOne({ zipCode: zipCode })
        .lean();

      // Check if zip code exists.
      if (!zipCodeDocument) {
        return {
          message: 'Zip code was not found.',
          error: false,
          data: [],
          httpStatus: HttpStatus.OK,
        };
      }

      // Get zip code ID.
      const zipCodeId = zipCodeDocument._id;

      // Get plans prices.
      const plansPrices = await this.pricesModel
        .find({ zip_code_id: zipCodeId })
        .populate({ path: 'plan', select: 'name description' })
        .populate({ path: 'zipCode', select: 'zipCode city state' })
        .lean();

      return {
        message: 'Plans with prices were retrieved successfully.',
        error: false,
        data: plansPrices,
        httpStatus: HttpStatus.OK,
      };
    } catch (e: any) {
      console.log(e);
      return {
        message: 'An error occurred while getting the plan prices.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
