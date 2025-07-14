import { AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

export function minOptionsRequired(tipoControl: () => string): ValidatorFn {
  return (control: AbstractControl) => {
    const options = control as FormArray;

    // Solo validar si el tipo es 'radio' o 'checkbox'
    if (tipoControl() === 'radio' || tipoControl() === 'checkbox') {
      return options.length < 1
        ? { minOptions: 'Debe agregar al menos una opción' }
        : null;
    }

    return null;
  };
}