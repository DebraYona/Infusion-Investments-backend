import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Cars (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(' should create a new car', () => {
    return request(app.getHttpServer())
      .get('/car/list')
      .expect(200)
  });
});
