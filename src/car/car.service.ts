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

    async googleAnalitics(){

        const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
        const jwt = new google.auth.JWT(this.configService.get<string>('CLIENT_EMAIL'), null, this.configService.get<string>('PRIVATE_KEY').replace(/\\n/gm, '\n'), scopes);
        const view_id = this.configService.get<string>('VIEWID')
        const response = await jwt.authorize()
        const result = await google.analytics('v3').data.ga.get({
          'auth': jwt,
          'ids': 'ga:' + view_id,
          'start-date': '30daysAgo',
          'end-date': 'today',
          'metrics': 'ga:pageviews'
        })
      
        console.dir(result)
        return result
    }

    


}
