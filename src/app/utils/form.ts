import { FormGroup, Validators, ɵElement } from '@angular/forms';

export type TypeForm<T> = { [K in keyof T]: ɵElement<T[K], never> };

type keyValidators = Exclude<
  keyof typeof Validators,
  'compose' | 'prototype' | 'composeAsync'
>;

type ValidatorKeys = keyValidators;

type ValidatorType<T> = {
  [key in keyof T]?: {
    [key in ValidatorKeys]?: string;
  };
};

export function errorMessage<T extends { [key: string]: any }>(
  formGroup: FormGroup<TypeForm<T>>,
  validators: ValidatorType<T>
) {
  const messages: { [key in keyof T]?: string } = {};

  const validatorKeys = Object.keys(validators) as Array<keyof T>;
  if (validatorKeys.length === 0) return null;

  validatorKeys.forEach((key) => {
    const control = formGroup.get(key as string);
    const validator = validators[key];

    if (control && validator) {
      // Recorriendo las claves de los validadores específicos
      for (const validationKey in validator) {
        if (Object.prototype.hasOwnProperty.call(validator, validationKey)) {
          if (control.hasError(validationKey.toLowerCase())) {
            const message = validator[validationKey as ValidatorKeys];
            if (message) {
              messages[key] = message;
            }
          }
        }
      }
    }
  });

  return Object.keys(messages).length > 0 ? messages : null;
}
