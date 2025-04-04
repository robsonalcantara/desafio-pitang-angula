import {User} from './user.model';

export interface Car {
  id?: string;
  year?: number;
  licensePlate: string;
  model: string;
  color: string;
  usage?: boolean;       
  usageCount?: number;  
}
