// Dependencies.
import { Injectable, HttpStatus } from '@nestjs/common';

// Mongoose.
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas.
import { Plan } from './schemas/plan.schema';
import { Price } from '../prices/schemas/price.schema';

// Interfaces.
import { ApiResponse } from '../app.interfaces';

@Injectable()
export class PlansService {
  // Schemas.
  constructor(
    @InjectModel(Plan.name) private plansModel: Model<Plan>,
    @InjectModel(Price.name) private priceModel: Model<Price>,
  ) {}

  /**
   * @function
   * @name getAll
   * @description Retrieves all plans.
   * @returns {ApiResponse} The API response object.
   */
  async getAll(): Promise<ApiResponse<any>> {
    try {
      const plans = await this.plansModel.find();

      return {
        message: 'Plans were retrieved successfully.',
        error: false,
        data: plans,
        httpStatus: HttpStatus.OK,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while getting the plans.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * @function
   * @name createOne
   * @description Creates a new plan.
   * @param {object} data - The data of the new plan to create.
   * @returns {ApiResponse} - The API response object.
   */
  async createOne(data: any): Promise<ApiResponse<any>> {
    try {
      // Regex for case insensitive.
      const regexName = new RegExp(data.name, 'i');

      // Check if the plan already exists.
      const planDocument = await this.plansModel
        .findOne({ name: regexName })
        .lean();

      if (planDocument) {
        return {
          message: 'This plan already exists.',
          error: true,
          httpStatus: HttpStatus.FOUND,
        };
      }

      // Create plan.
      const newPlan = await this.plansModel.create(data);

      return {
        message: 'Plan created successfully.',
        error: false,
        data: newPlan,
        httpStatus: HttpStatus.CREATED,
      };
    } catch (e: any) {
      console.log(e);
      return {
        message: 'An error occurred while creating the plan.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * @function
   * @name updateOne
   * @description Updates a single plan by ID.
   * @param {string} id - The ID of the plan to update.
   * @param {object} data - The new data for the plan.
   * @returns {ApiResponse} The API response object.
   */
  async updateOne(id: string, data: any): Promise<ApiResponse<any>> {
    try {
      // Regex for case insensitive.
      const regexName = new RegExp(data.name, 'i');

      // Check if the plan already exists.
      const planDocument = await this.plansModel
        .findOne({ name: regexName, _id: { $ne: id } })
        .lean();

      if (planDocument) {
        return {
          message: 'This plan already exists.',
          error: true,
          httpStatus: HttpStatus.FOUND,
        };
      }

      // Update plan.
      const updatedPlan = await this.plansModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      return {
        message: 'Plan was updated successfully.',
        error: false,
        data: updatedPlan,
        httpStatus: HttpStatus.OK,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while updating the plan.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  /**
   * @function
   * @name deleteOne
   * @description Deletes a single plan by ID.
   * @param {string} id - The ID of the plan to delete.
   * @returns {ApiResponse} The API response object.
   */
  async deleteOne(id: string): Promise<ApiResponse<any>> {
    try {
      // Delete all prices associated with the plan.
      await this.priceModel.deleteMany({ plan_id: id });

      // Delete plan.
      const deletedPlan = await this.plansModel.findByIdAndDelete(id);

      if (!deletedPlan) {
        return {
          message: 'Plan was not found.',
          error: true,
          httpStatus: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: 'Plan was deleted successfully.',
        error: false,
        data: deletedPlan,
        httpStatus: HttpStatus.OK,
      };
    } catch (e: any) {
      return {
        message: 'An error occurred while deleting a plan.',
        error: true,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
