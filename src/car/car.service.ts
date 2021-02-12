import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model,  } from 'mongoose';
import { ClientService } from '../client/client.service';
import { CreateCartDTO } from './dtos/create-car.dto';
import {google} from 'googleapis';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class CarService {
    constructor(
        @InjectModel('Car') private readonly carModel: Model<Car>,
        private readonly clientService:ClientService,
        private configService: ConfigService,

      ) {}
    async getCars(): Promise<Car[]> {
        const cars = await this.carModel.find().exec();
        return cars;
      }

    async getCar(carId: string): Promise<Car> {
      const car = await this.carModel.findById(carId).exec();
      if (!car) throw new Error('Car not found');
    
      return car;
    }
    async getCarsbyClientId(clientId:string): Promise<Car[]> {
        const cars = await this.carModel.find({client:clientId}).exec();
        return cars;
    }
    async createNewCar(createCartDTO: CreateCartDTO): Promise<Car>{
        if(createCartDTO.client){
            const user =this.clientService.getClient(createCartDTO.client);
            if(user){
                const car = new this.carModel({
                    ...createCartDTO
                })
                await car.save();
                return car;
    
            }else{
                throw new HttpException('REGISTRATION.USER_NO_REGISTERED', HttpStatus.FORBIDDEN);
    
            }
        }else{
            throw new HttpException('REGISTRATION.MISSING_MANDATORY_PARAMETERS', HttpStatus.FORBIDDEN);

        }  
        
    }



    


}
