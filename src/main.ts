import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';

const allowedOrigins = [
  /localhost:3000/,
  /https:\/\/front-symmetrics-challenge.vercel.app/,
  '*',
];


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get<string>('PORT'), 10) || 4001;
  app.setGlobalPrefix('api/v1');
  console.log(port)
  const options = new DocumentBuilder()
    .setTitle('Symmetric API')
    .setDescription('Api')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  }
);
  app.use(helmet());
  app.use(compression());
  app.use(csurf());
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
}
bootstrap();
