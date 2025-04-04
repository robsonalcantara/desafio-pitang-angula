import { Routes } from '@angular/router';
import {CarsComponent} from './features/cars/cars.component';
import {UsersComponent} from './features/users/users.component';
import {ProfileComponent} from './features/profile/profile.component';
import {SignInComponent} from './features/auth/sign-in/sign-in.component';
import { AuthModule } from './features/auth/auth.module';

export const routes: Routes = [
  {
    path: '',pathMatch:'full',redirectTo:'signin'
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'cars',
    component: CarsComponent
  },
  {
    path: 'me',
    component: ProfileComponent
  },
  {
    path: 'signin',
    loadChildren: () => import('./features/auth/auth.module').then(m=>AuthModule)
  }
];
