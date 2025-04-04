import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {MenubarModule} from 'primeng/menubar';
import {CommonModule} from '@angular/common';
import {CalendarModule} from 'primeng/calendar';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    MenubarModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    MenubarModule,
    CalendarModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
