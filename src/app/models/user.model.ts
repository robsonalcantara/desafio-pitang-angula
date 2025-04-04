import {Car} from './car.model';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday?: Date;
  login?: string;
  password?: string;
  phone: string;
  cars?: Car[];
  createdAt?: Date;
  lastLogin?: Date;
}
