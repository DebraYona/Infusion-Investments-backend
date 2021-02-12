import { Module } from '@nestjs/common';
import { RepairService } from './repair.service';
import { RepairController } from './repair.controller';
import { CarModule } from '../car/car.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RepairSchema } from './schemas/repair.schema';
import { ClientModule } from 'src/client/client.module';

@Module({
  providers: [RepairService],
  controllers: [RepairController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Repair', schema: RepairSchema },
    ]),
    CarModule, ClientModule
  ],
})
export class RepairModule {}
