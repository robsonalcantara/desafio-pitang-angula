import { Component } from '@angular/core';
import {User} from '../../models/user.model';
import {CommonModule, DatePipe} from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {SharedModule} from '../../shared/shared.module';
import {FlexModule} from '@ngbracket/ngx-layout';
import {MeService} from './services/me.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DatePipe,
    AvatarModule,
    ButtonModule,
    CardModule,
    CommonModule,
    SharedModule,
    FlexModule,
    PanelModule,
    ToastModule
  ],
  providers:[
    MeService,
    MessageService,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user!: User;

  constructor(private meService: MeService,
              private messageService: MessageService,) {
  }

  ngOnInit() {
    this.getMe();
  }

  selectedImage: string = '';

  getMe(){
    this.meService.getMe().subscribe({
      next: (user) => {
        this.user = user
      },
      error: (error) => {
        this.messageService.add({severity: 'error', summary: error.error.status, detail: error.error.message})
      }
    })
  }

}
