// Dependencies.
import { Injectable, HttpStatus } from '@nestjs/common';

// Mongoose.
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas.
import { Price } from './schemas/price.schema';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

@Injectable()
export class PricesService {
  // Schemas.
  constructor(@InjectModel(Price.name) private pricesModel: Model<Price>) {}

  /**
   * @function
   * @name getAll
   * @description Retrieves all prices.
   * @returns {ApiResponse} The API response object.
   */
  async getAll(): Promise<ApiResponse<any>> {
    try {
      const prices = await this.pricesModel
        .find()
        .populate({ path: 'plan', select: 'name description' })
        .populate({ path: 'zipCode', select: 'zipCode city state' })
        .lean();

      return {
        message: 'Prices were retrieved successfully.',
        error: false,
        data: prices,
        httpStatus: HttpStatus.OK,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while getting the prices.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * @function
   * @name createOne
   * @description Creates a new price.
   * @param {object} data - The data of the new price to create.
   * @returns {ApiResponse} - The API response object.
   */
  async createOne(data: any): Promise<ApiResponse<any>> {
    try {
      // Get values.
      const { price, plan, zipCode } = data;

      // Check if the price exists.
      const priceDocument = await this.pricesModel
        .findOne({ plan_id: plan, zip_code_id: zipCode })
        .lean();

      if (priceDocument) {
        return {
          message: 'This price already exists.',
          error: true,
          httpStatus: HttpStatus.FOUND,
        };
      }

      // Set new price.
      const priceToCreate = {
        plan_id: plan,
        zip_code_id: zipCode,
        price,
      };

      // Create new price.
      const newPrice = await this.pricesModel.create(priceToCreate);

      return {
        message: 'Price created successfully.',
        error: false,
        data: newPrice,
        httpStatus: HttpStatus.CREATED,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while creating a price.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * @function
   * @name updateOne
   * @description Updates a single price by ID.
   * @param {string} id - The ID of the price to update.
   * @param {object} data - The new data for the price.
   * @returns {ApiResponse} The API response object.
   */
  async updateOne(id: string, data: any): Promise<ApiResponse<any>> {
    try {
      // Get values.
      const { price, plan, zipCode } = data;

      // Check if the price exists.
      const priceDocument = await this.pricesModel
        .findOne({ plan_id: plan, zip_code_id: zipCode, _id: { $ne: id } })
        .lean();

      if (priceDocument) {
        return {
          message: 'This price already exists.',
          error: true,
          httpStatus: HttpStatus.FOUND,
        };
      }

      // Set new price.
      const priceToUpdate = {
        plan_id: plan,
        zip_code_id: zipCode,
        price,
      };

      // Update price.
      const updatedPrice = await this.pricesModel.findByIdAndUpdate(
        id,
        priceToUpdate,
        {
          new: true,
        },
      );

      return {
        message: 'Plan was updated successfully.',
        error: false,
        data: updatedPrice,
        httpStatus: HttpStatus.OK,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while updating a price.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * @function
   * @name deleteOne
   * @description Deletes a single price by ID.
   * @param {string} id - The ID of the price to delete.
   * @returns {ApiResponse} The API response object.
   */
  async deleteOne(id: string): Promise<ApiResponse<any>> {
    try {
      const deletedPlan = await this.pricesModel.findByIdAndDelete(id);

      if (!deletedPlan) {
        return {
          message: 'Price was not found.',
          error: true,
          httpStatus: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: 'Price was deleted successfully.',
        error: false,
        data: deletedPlan,
        httpStatus: HttpStatus.OK,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while deleting a price.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
