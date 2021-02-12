import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from './schemas/client.schema';

@Module({
  providers: [ClientService],
  controllers: [ClientController],
  imports :[
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),

  ],
  exports: [ClientService, MongooseModule],

  })
export class ClientModule {}
