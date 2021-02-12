import { Controller, Post, Res, Body, HttpStatus, Get } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDTO } from './dtos/create-client.dto';

@Controller('client')
export class ClientController {
    constructor(private clientService: ClientService) {}

    @Post('/')
    async createClient(@Res() res, @Body() createclientDTO: CreateClientDTO) {
      try {
        const client = await this.clientService.createNewClient(createclientDTO);
        return res.status(HttpStatus.OK).json({
          success: true,
          code: 201,
          message: ' creado satisfactoriamente ',
          data: client,
        });
      } catch (error) {
        console.log(error)
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          code: 400,
          message: error.message,
        });
      }
    }
  
    @Get('/list')
    async getClients(@Res() res) {
      const clients = await this.clientService.getClients();
      return res.status(HttpStatus.OK).json({
        success: true,
        message: ' Lista recuperada satisfactoriamente ',
        code: 200,
        data: clients,
      });
    }

    @Get('/analytics')
    async getAnalytics(@Res() res) {
      const clients = await this.clientService.getClients();
      return res.status(HttpStatus.OK).json({
        success: true,
        message: ' Lista recuperada satisfactoriamente ',
        code: 200,
        data: clients,
      });
    }
}
