// Dependencies.
import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from './plans.service';
import { ConfigModule } from '@nestjs/config';

// Mongoose.
import { MongooseModule } from '@nestjs/mongoose';

// Modules.
import { PlansModule } from './plans.module';

describe('PlansService', () => {
  // Values.
  let plansService: PlansService;
  let moduleRef: TestingModule;
  let planId: string;

  // Before each.
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URI),
        PlansModule,
      ],
    }).compile();

    plansService = await moduleRef.resolve(PlansService);
  });

  // After all.
  afterAll(async () => {
    await moduleRef.close();
  });

  /**
   * @test
   * Test case for createOne method of PlanService.
   */
  it('should create a new plan', async () => {
    // Data.
    const newPlan = {
      name: 'Test plan',
      description: 'This is a test plan',
    };

    // Create plan.
    const { error, data } = await plansService.createOne(newPlan);

    // Save plan ID.
    planId = data._id;

    // Validate.
    expect(error).toBe(false);
    expect(data.name).toEqual('Test plan');
  });

  /**
   * @test
   * Test case for updateOne method of PlanService.
   */
  it('should update a plan', async () => {
    // Data.
    const planToUpdate = {
      name: 'Test update plan',
      description: 'This is a an update',
    };

    // Update plan.
    const { error, data } = await plansService.updateOne(
      planId,
      planToUpdate,
    );

    // Validate.
    expect(error).toBe(false);
    expect(data.name).toEqual('Test update plan');
    expect(data.description).toEqual('This is a an update');
  });

  /**
   * @test
   * Test case for deleteOne method of PlanService.
   */
  it('should delete a plan', async () => {
    // Delete plan.
    const { error, message } = await plansService.deleteOne(planId);

    // Validate.
    expect(error).toBe(false);
    expect(message).toEqual('Plan was deleted successfully.');
  });
});
