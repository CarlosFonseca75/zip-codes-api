// Dependencies.
import { Test, TestingModule } from '@nestjs/testing';
import { ZipCodesService } from './zip-codes.service';
import { ConfigModule } from '@nestjs/config';

// Mongoose.
import { MongooseModule } from '@nestjs/mongoose';

// Modules.
import { ZipCodesModule } from './zip-codes.module';

describe('ZipCodesService', () => {
  // Values.
  let zipCodesService: ZipCodesService;
  let moduleRef: TestingModule;
  let zipCodeId: string;

  // Before each.
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URI),
        ZipCodesModule,
      ],
    }).compile();

    zipCodesService = await moduleRef.resolve(ZipCodesService);
  });

  // After all.
  afterAll(async () => {
    await moduleRef.close();
  });

  /**
   * @test
   * Test case for createOne method of ZipCodesService.
   */
  it('should create a new zip code', async () => {
    // Data.
    const newZipCode = {
      zipCode: '5000',
      city: 'city',
      state: 'state',
    };

    // Create zip code.
    const { error, data } = await zipCodesService.createOne(newZipCode);

    // Save zip code ID.
    zipCodeId = data._id;

    // Validate.
    expect(error).toBe(false);
    expect(data.zipCode).toEqual('5000');
  });

  /**
   * @test
   * Test case for updateOne method of ZipCodesService.
   */
  it('should update a zip code', async () => {
    // Data.
    const zipCodeToUpdate = {
      zipCode: '7000',
      city: 'city_update',
      state: 'state_update',
    };

    // Update zip code.
    const { error, data } = await zipCodesService.updateOne(
      zipCodeId,
      zipCodeToUpdate,
    );

    // Validate.
    expect(error).toBe(false);
    expect(data.zipCode).toEqual('7000');
  });

  /**
   * @test
   * Test case for deleteOne method of ZipCodesService.
   */
  it('should delete a zip code', async () => {
    // Delete zip code.
    const { error, message } = await zipCodesService.deleteOne(zipCodeId);

    // Validate.
    expect(error).toBe(false);
    expect(message).toEqual('Zip code was deleted successfully.');
  });
});
