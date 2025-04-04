import { Component } from '@angular/core';
import {DatePipe} from '@angular/common';
import {UserFormComponent} from './user-form/user-form.component';
import {SharedModule} from '../../shared/shared.module';
import {User} from '../../models/user.model';
import {UserService} from './services/user.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule, DatePipe, UserFormComponent, ToastModule],
  providers:[MessageService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!: User[];
  editUser!: User;


  cols: Array<{ field: string; header: string }> = [
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'email', header: 'Email Address' },
    { field: 'birthday', header: 'Birthday' },
    { field: 'phone', header: 'Phone' },
    { field: 'createdAt', header: 'Created At' },
    { field: 'lastLogin', header: 'Last Login At' },
    { field: 'edit', header: '' },
    { field: 'delete', header: '' },
  ];

  constructor(private userService: UserService,
              private messageService: MessageService,) {
  }

  ngOnInit() {
    this.getUsers()
  }

  editUserById(user: User){
    if(user.id) {
      this.userService.getUserById(user).subscribe({
        next: (editUser) => {
          this.editUser = editUser;
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: error.error.status, detail: error.error.message})
        }
      })
    }
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.messageService.add({severity: 'error', summary: error.error.status, detail: error.error.message})
      }
    })
  }

  deleteUser(user: User){
    this.userService.deleteUserById(user).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (error) => {
        this.messageService.add({severity: 'error', summary: error.error.status, detail: error.error.message})
      }
    })
  }
  
}
