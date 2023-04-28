import { Test, TestingModule } from '@nestjs/testing';
import { ZipCodesController } from './zip-codes.controller';

describe('ZipCodesController', () => {
  let controller: ZipCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZipCodesController],
    }).compile();

    controller = module.get<ZipCodesController>(ZipCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
