import {Injectable} from '@angular/core';
import {ValidatorFn, AbstractControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, options: any = {}) {
    const unit = options.unit || '';
    const config = {
      'required': 'Cette question est obligatoire.',
      'between': `Cette valeur doit être comprise entre ${options.min}${unit} et ${options.max}${unit}.`,
      'min': `Cette valeur doit être supérieure à ${options.min}${unit}`,
      'max': `Cette valeur doit être inférieure à ${options.maxLength}${unit}`,
      'maxlength': `Texte limité à ${options.maxlength} caractères`,
      // Custom validators
      'condition': options.errorValidationMessage || '',
      'decimal': `Cette valeur doit être un entier.`
    };

    return config[validatorName];
  }

  static BetweenValidator(min: any, max: any): ValidatorFn {
    return (control: AbstractControl) => {
      const maxDigit = parseFloat(max);
      const minDigit = parseFloat(min);
      const isNotBetween = control.value < minDigit || control.value > maxDigit;
      return isNotBetween ? {'between': {actual: control.value, min: minDigit, max: maxDigit}} : null;
    };
  }

  static DecimalValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const floatValue = parseFloat(control.value);
      const integerValue = parseInt(control.value, 10);
      const isDecimal = floatValue !== integerValue;
      return isDecimal ? {'decimal': {actual: control.value, integer: integerValue, float: floatValue}} : null;
    };
  }

  /**
   * TODO: define password validation rules in separate place
   * @param {string} passwordKey
   * @param {string} passwordConfirmationKey
   * @returns {(group: FormGroup) => (void | void | void)}
   * @constructor
   */
  static CheckIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      const hasUpperCase = /[A-Z]/.test(passwordInput.value);
      const hasLowerCase = /[a-z]/.test(passwordInput.value);
      const hasNumbers = /\d/.test(passwordInput.value);

      if (passwordInput.value.length > 0 && (passwordInput.value.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumbers)) {
        return passwordInput.setErrors({notValidPassword: true});
      }

      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
}
