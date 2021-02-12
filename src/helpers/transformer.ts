import { Repair } from 'src/repair/interfaces/repair.interface';

export const carTransformer = carPopulated => ({
  _id: carPopulated._id,
  cost: carPopulated.cost,
  date: carPopulated.date,
  type: carPopulated.type,
  client:
    carPopulated.car.client.firstName + ' ' + carPopulated.car.client.lastName,
  car: carPopulated.car.carModel,
});

export const carResponseTranformer = carsPopulated =>
  carsPopulated.map(carTransformer);
