import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { CarModule } from './car/car.module';
import { RepairModule } from './repair/repair.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      
    }),
   
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_ROOT'),
        useCreateIndex: true,
      }),
    }),
    ClientModule, CarModule, RepairModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
