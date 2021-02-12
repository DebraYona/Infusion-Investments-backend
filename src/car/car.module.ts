import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './schemas/car.schema';
import { ClientModule } from '../client/client.module';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
    ClientModule,
  ],
  exports:[
    CarService, MongooseModule,

  ]

})
export class CarModule {}
