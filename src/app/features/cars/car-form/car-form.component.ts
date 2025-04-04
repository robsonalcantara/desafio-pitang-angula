import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {SharedModule} from '../../../shared/shared.module';
import {Car} from '../../../models/car.model';
import {CarService} from '../services/car.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    FlexLayoutModule,
    ToastModule,
  ],
  providers: [
    CarService,
    MessageService,
  ],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent {
  carForm: FormGroup;
  cars: Car[] = [];
  _editCar: Car = {color: '', licensePlate: '', model: ''};
  @Output() updateCarList = new EventEmitter();


  constructor(private fb: FormBuilder,
              private carService: CarService,
              private messageService: MessageService) {
    this.carForm = this.fb.group({
      id: ['', Validators.required],
      year: ['', Validators.required],
      licensePlate: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      usage:[''],
      usageCount:['']

    });
  }

  @Input()
  set editCar(car: Car) {
    this._editCar = car;
    this.updateForm(car)
  }

  get editCar(): Car {
    return this._editCar;
  }

  updateForm(car: Car){
    this.carForm.patchValue({
      id: car.id,
      year: car.year,
      licensePlate: car.licensePlate,
      model: car.model,
      color: car.color,
      usage: car.usage,
      usageCount: car.usageCount
    })
  }

  submit(){
    if (this.editCar?.id){
      this.editByCarId()
    }else{
      this.createCar()
    }
  }

  createCar(): void {
    const carData = {
      ...this.carForm.value
    };

    this.carService.createCar(carData).subscribe({
      next: () => {
        this.limpaFormularios()
        this.updateCarList.emit()
      },
      error: (error) => {
        this.messageService.add({severity: 'error', summary: error.error.status, detail: error.error.message})
      }
    })
  }

  editByCarId(){
    this.carService.editCarById(this.carForm.value).subscribe({
      next: () => {
        this.limpaFormularios()
        this.updateCarList.emit();
      },
      error: (error) => {
        this.messageService.add({severity: 'error', summary: error.error.status, detail: error.error.message})
      }
    })
  }

  limpaFormularios() {
    this.carForm.reset();
    this.editCar = {color: '', licensePlate: '', model: ''};
  }

}
