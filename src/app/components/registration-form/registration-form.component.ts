import { NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, computed, Signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { errorMessage, TypeForm } from '../../utils/form';
import { toSignal } from '@angular/core/rxjs-interop';
import { NumericOnlyDirective } from '../../directive/numeric-only.directive';
import { FocusNextDirective } from '../../directive/focus-next.directive';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  documentNumber: string;
  documentType: string;
  gender: string;
  country: string;
  phone: string;
  password: string;
};

const phoneNumberPatterns: { [key: string]: RegExp } = {
  Perú: /^9\d{8}$/,
  Argentina: /^\+?549\d{8}$/,
  México: /^\+?521\d{9}$/,
  Colombia: /^\+?57\d{10}$/,
  Chile: /^\+?569\d{8}$/,
};

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgFor,
    NumericOnlyDirective,
    NgClass,
    FocusNextDirective,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent {
  countries: string[] = ['Perú', 'Argentina', 'México', 'Colombia', 'Chile'];
  documentsType: string[] = ['DNI', 'Pasaporte', 'Carnet de Extranjería'];

  registrationForm!: FormGroup<TypeForm<FormData>>;
  observerForm$!: Signal<Partial<FormData> | undefined>;

  constructor(
    private readonly _nonNullableFormBuilder: NonNullableFormBuilder
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.registrationForm = this._nonNullableFormBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      documentNumber: ['', [Validators.required, Validators.minLength(8)]],
      documentType: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^9\d{8}$/), // Ejemplo: 985635698
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ // Ejemplo: Pass123@$
          ),
        ],
      ],
    });

    this.observerForm$ = toSignal(this.registrationForm.valueChanges);

    this.registrationForm.controls.country.valueChanges.subscribe((value) => {
      if (value.trim() === '') return;

      const reg = phoneNumberPatterns[value.trim()];

      this.registrationForm.controls.phone.setValidators([
        Validators.required,
        Validators.pattern(reg),
      ]);
      this.registrationForm.controls.phone.reset();
    });
  }

  errorMessages$: Signal<Partial<FormData> | null> = computed(() => {
    this.observerForm$();

    return errorMessage<FormData>(this.registrationForm, {
      firstName: {
        required: 'Ingresa su nombre',
      },
      lastName: {
        required: 'Ingrese su apellido',
      },
      email: {
        required: 'Ingresa tu correo electrónico',
        email: 'Formato de correo incorrecto',
      },
      documentNumber: {
        required: 'Ingrese su número de documento',
        minLength: 'Formato de documento incorrecto',
      },
      documentType: {
        required: 'Ingrese el tipo de documento',
      },
      gender: {
        required: 'Seleccione su género',
      },
      country: {
        required: 'Seleccione su país',
      },
      phone: {
        required: 'Ingrese su número de celular',
        pattern: 'Ingrese un número de teléfono válido para',
      },
      password: {
        required: 'Ingrese una contraseña segura',
        pattern: 'Ingrese una contraseña que cumpla con los criterios',
      },
    });
  });

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Formulario enviado:', this.registrationForm.value);
      window.alert(JSON.stringify(this.registrationForm.value));
    }
  }
}
