import { Controller, Post, Get, Res, HttpStatus, Body, Param } from '@nestjs/common';
import { CreateCartDTO } from './dtos/create-car.dto';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
    constructor(private carService: CarService) {}

    @Post('/')
    async createCar(@Res() res, @Body() createCartDTO: CreateCartDTO) {
      try {
        const car = await this.carService.createNewCar(createCartDTO);
        return res.status(HttpStatus.OK).json({
          success: true,
          code: 201,
          message: ' creado satisfactoriamente ',
          data: car,
        });
      } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          code: 400,
          message: error.message,
        });
      }
    }
  
    @Get('/list')
    async getCars(@Res() res) {
      const cars = await this.carService.getCars();
      return res.status(HttpStatus.OK).json({
        success: true,
        message: ' Lista recuperada satisfactoriamente ',
        code: 200,
        data: cars,
      });
    }
    @Get('/client/:clientId')
    async getCarsByClient(@Res() res, @Param('clientId') clientId) {
      const cars = await this.carService.getCarsbyClientId(clientId);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: ' Lista recuperada satisfactoriamente ',
        code: 200,
        data: cars,
      });
    }

}
