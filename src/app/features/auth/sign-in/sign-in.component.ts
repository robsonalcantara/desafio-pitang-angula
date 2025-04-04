import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {FlexModule} from "@ngbracket/ngx-layout";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {LoginRequest} from '../../../models/login-request.model';
import {Router} from '@angular/router';
import {SignInService} from '../../../core/services/sign-in.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ButtonDirective,
    FlexModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    SharedModule,
    ToastModule,
  ],
  providers: [
    SignInService,
    MessageService
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder,
              private signInService: SignInService,
              private router: Router,
              private messageService: MessageService,
  ) {
    this.signInForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  login(): void {
    const login: LoginRequest = {
      login: this.signInForm.get('login')?.value,
      password: this.signInForm.get('password')?.value,
    };

    this.signInService.signIn(login).subscribe({
      next: () => this.router.navigateByUrl('/me'),
      error: (error) => {
        this.messageService.add({severity: 'error', summary: error.error.status, detail: error.error.message})
      }
    })
  }

}
