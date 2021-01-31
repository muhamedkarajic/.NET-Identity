import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";

export abstract class CustomValidators {
  static get email() {
    return CustomValidators.patternValidator(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      { email: true }
    );
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

  static printError(control: FormControl): string {
    if (control.hasError("required")) return "This field is required.";
    if (control.hasError("email")) return "Email is not valid.";
    if (control.hasError("minlength")) return `Minimum lenght of ${control.errors.minlength.requiredLength} required.`;
    if (control.hasError("maxlength")) return `Maximum lenght of ${control.errors.maxlength.requiredLength} allowed.`;
    if (control.hasError("hasNumber")) return "Require 1 number.";
    if (control.hasError("hasCapitalCase")) return "Require 1 capital character.";
    if (control.hasError("hasSmallCase")) return "Require 1 small character.";
    if (control.hasError("hasSpecialCharacters")) return "Require 1 simbol.";
    return JSON.stringify(control.errors);
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
