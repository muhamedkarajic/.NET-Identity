import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export abstract class CustomValidators {
  static get email() {
    return CustomValidators.patternValidator(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, { email: true });
  }
  static get hasNumber() {
    return CustomValidators.patternValidator(/\d/, { hasNumber: true });
  }

  static get hasCapitalCase() {
    return CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true });
  }

  static get hasSmallCase() {
    return CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true });
  }

  static get hasSpecialCharacters() {
    return CustomValidators.patternValidator(/[$&+,:;=?@#|'<>.^*()%!-]/, {
      hasSpecialCharacters: true,
    });
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
