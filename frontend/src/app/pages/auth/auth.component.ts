import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { RotasEnum } from '../../shared/enums/rotas.enum';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  rotas = RotasEnum;
  authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.router.navigate([this.rotas.HOME]);
  }
}
