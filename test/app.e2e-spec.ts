import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    if (app) {
      return;
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
          database: path.resolve(__dirname, '..', 'db.test.sqlite'),
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/todos (POST)', () => {
    return request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'my first todo' })
      .expect(201)
      .expect({ title: 'my first todo', completed: false, id: 1 });
  });

  it('/todos (GET)', () => {
    return request(app.getHttpServer())
      .get('/todos')
      .expect(200)
      .expect([{ title: 'my first todo', completed: false, id: 1 }]);
  });

  it('/todos (PUT)', () => {
    return request(app.getHttpServer())
      .put('/todos/1')
      .send({ title: 'my first todo', completed: true })
      .expect(200)
      .expect({ title: 'my first todo', completed: true, id: 1 });
  });

  it('/todos (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/todos/1')
      .expect(200)
      .expect({ title: 'my first todo', completed: true });
  });
});
