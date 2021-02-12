import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './interfaces/client.interface';
import { CreateClientDTO } from './dtos/create-client.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
    private configService: ConfigService,

  ) {}

  async getClients(): Promise<Client[]> {
    const clients = await this.clientModel.find().exec();
    return clients;
  }
  async getClient(clientId: string): Promise<Client> {
    const client = await this.clientModel.findById(clientId).exec();
    if (!client) throw new Error('Client not found');

    return client;
  }
  async createNewClient(createClientDTO: CreateClientDTO): Promise<Client> {
    console.log(this.clientModel)
    if (createClientDTO.firstName && createClientDTO.lastName) {
      
        const client = new this.clientModel({
          ...createClientDTO,
        });
        console.log(client);
        await client.save();
        // await this.authService.createEmailToken(createUserDTO.email);
        // const isEmailSent = await this.authService.sendEmailVerification(createUserDTO.email);
        // if (isEmailSent)
        return client;
      } 
     else {
      throw new HttpException(
        'REGISTRATION.MISSING_MANDATORY_PARAMETERS',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
