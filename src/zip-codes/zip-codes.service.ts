// Dependencies.
import { HttpStatus, Injectable } from '@nestjs/common';

// Mongoose.
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas.
import { ZipCode } from './schemas/zipcode.schema';
import { Price } from '../prices/schemas/price.schema';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

@Injectable()
export class ZipCodesService {
  // Schemas.
  constructor(
    @InjectModel(ZipCode.name) private zipCodeModel: Model<ZipCode>,
    @InjectModel(Price.name) private priceModel: Model<Price>,
  ) {}

  /**
   * @function
   * @name getAll
   * @description Retrieves all zip codes.
   * @returns {ApiResponse} The API response object.
   */
  async getAll(): Promise<ApiResponse<any>> {
    try {
      const zipCodes = await this.zipCodeModel.find();

      return {
        message: 'Zip codes were retrieved successfully.',
        error: false,
        data: zipCodes,
        httpStatus: HttpStatus.OK,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while getting the zip codes.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * @function
   * @name createOne
   * @description Creates a new zip code.
   * @param {object} data - The data of the new zip code to create.
   * @returns {ApiResponse} - The API response object.
   */
  async createOne(data: any): Promise<ApiResponse<any>> {
    try {
      // Regex for case insensitive.
      const regexZipCode = new RegExp(data.zipCode, 'i');

      // Check if the zip code already exists.
      const zipCodeDocument = await this.zipCodeModel
        .findOne({ zipCode: regexZipCode })
        .lean();

      if (zipCodeDocument) {
        return {
          message: 'This zip code already exists.',
          error: true,
          httpStatus: HttpStatus.FOUND,
        };
      }

      // Create zip code.
      const newZipCode = this.zipCodeModel.create(data);

      return {
        message: 'Zip code created successfully.',
        error: false,
        data: newZipCode,
        httpStatus: HttpStatus.CREATED,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while creating the zip code.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * @function
   * @name updateOne
   * @description Updates a single zip code by ID.
   * @param {string} id - The ID of the zip code to update.
   * @param {object} data - The new data for the zip code.
   * @returns {ApiResponse} The API response object.
   */
  async updateOne(id: string, data: any): Promise<ApiResponse<any>> {
    try {
      // Regex for case insensitive.
      const regexZipCode = new RegExp(data.zipCode, 'i');

      // Check if the zip code already exists.
      const zipCodeDocument = await this.zipCodeModel
        .findOne({ zipCode: regexZipCode, _id: { $ne: id } })
        .lean();

      if (zipCodeDocument) {
        return {
          message: 'This zip code already exists.',
          error: true,
          httpStatus: HttpStatus.FOUND,
        };
      }

      // Update zip code.
      const updatedZipCode = await this.zipCodeModel.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        },
      );

      return {
        message: 'Zip code was updated successfully.',
        error: false,
        data: updatedZipCode,
        httpStatus: HttpStatus.OK,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while updating a zip code.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * @function
   * @name deleteOne
   * @description Deletes a single zip code by ID.
   * @param {string} id - The ID of the zip code to delete.
   * @returns {ApiResponse} The API response object.
   */
  async deleteOne(id: string): Promise<ApiResponse<any>> {
    try {
      // Delete all prices associated with the zip code.
      await this.priceModel.deleteMany({ zip_code_id: id });

      // Delete zip code.
      const deletedZipCode = await this.zipCodeModel.findByIdAndDelete(id);

      if (!deletedZipCode) {
        return {
          message: 'Zip code was not found.',
          error: true,
          httpStatus: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: 'Zip code was deleted successfully.',
        error: false,
        data: deletedZipCode,
        httpStatus: HttpStatus.OK,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while deleting a zip code.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
