// Dependencies.
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

// Services.
import { PricesService } from './prices.service';
import { PlansService } from '../plans/plans.service';
import { ZipCodesService } from '../zip-codes/zip-codes.service';

// Mongoose.
import { MongooseModule } from '@nestjs/mongoose';

// Modules..
import { PricesModule } from './prices.module';
import { PlansModule } from '../plans/plans.module';
import { ZipCodesModule } from '../zip-codes/zip-codes.module';

describe('PricesService', () => {
  // Ref.
  let moduleRef: TestingModule;

  // Services.
  let pricesService: PricesService;
  let plansService: PlansService;
  let zipCodesService: ZipCodesService;

  // ID's.
  let priceId: string;
  let planId: string;
  let zipCodeId: string;

  // Before all.
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URI),
        PricesModule,
        PlansModule,
        ZipCodesModule,
      ],
    }).compile();

    // Init services.
    pricesService = await moduleRef.resolve(PricesService);
    plansService = await moduleRef.resolve(PlansService);
    zipCodesService = await moduleRef.resolve(ZipCodesService);

    // Create plan and zip code.
    await createPlan();
    await createZipCode();
  });

  // After all.
  afterAll(async () => {
    // Delete plan and zip code.
    await deletePlan();
    await deleteZipCode();
    
    // Close ref.
    await moduleRef.close();
  });

  /**
   * @test
   * Test case for createOne method of PricesService.
   */
  it('should create a new price', async () => {
    // Data.
    const newPrice = {
      price: 1000,
      zip_code_id: zipCodeId,
      plan_id: planId,
    };

    // Create price.
    const { error, data } = await pricesService.createOne(newPrice);

    // Save plan ID.
    priceId = data._id;

    // Validate.
    expect(error).toBe(false);
    expect(data.price).toEqual(1000);
  });

  /**
   * @test
   * Test case for updateOne method of PricesService.
   */
  it('should update a price', async () => {
    // Data.
    const priceToUpdate = {
      price: 5000,
      zip_code_id: zipCodeId,
      plan_id: planId,
    };

    // Update price.
    const { error, data } = await pricesService.updateOne(
      priceId,
      priceToUpdate,
    );

    // Validate.
    expect(error).toBe(false);
    expect(data.price).toEqual(5000);
  });

  /**
   * @test
   * Test case for deleteOne method of PricesService.
   */
  it('should delete a price', async () => {
    // Delete price.
    const { error, message } = await pricesService.deleteOne(priceId);

    // Validate.
    expect(error).toBe(false);
    expect(message).toEqual('Price was deleted successfully.');
  });

  /**
   * @async
   * @function
   * @name createZipCode
   * @description Creates a new plan and saves its ID for later use.
   * @returns {Promise<void>}
   */
  async function createPlan(): Promise<void> {
    try {
      // Data.
      const newPlan = {
        name: 'Another plan',
        description: 'This is another test plan',
      };

      // Create plan.
      const { data } = await plansService.createOne(newPlan);

      // Save plan ID.
      planId = data._id;
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
   * @async
   * @function
   * @name createZipCode
   * @description Creates a new zip code and saves its ID for later use.
   * @returns {Promise<void>}
   */
  async function createZipCode(): Promise<void> {
    try {
      // Data.
      const newZipCode = {
        zipCode: '9000',
        city: 'city',
        state: 'state',
      };

      // Create zip code.
      const { data } = await zipCodesService.createOne(newZipCode);

      // Save zip code ID.
      zipCodeId = data._id;
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
   * @async
   * @function
   * @name deletePlan
   * @description Deletes the plan that was created during the tests.
   * @returns {Promise<void>}
   */
  async function deletePlan(): Promise<void> {
    try {
      await plansService.deleteOne(planId);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
   * @async
   * @function
   * @name deleteZipCode
   * @description Deletes the zip code that was created during the tests.
   * @returns {Promise<void>}
   */
  async function deleteZipCode(): Promise<void> {
    try {
      await zipCodesService.deleteOne(zipCodeId);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }
});
