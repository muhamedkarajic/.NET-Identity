import { FormControl } from "@angular/forms";
import { Component, Input } from "@angular/core";

@Component({
  selector: "reactive-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent {
  @Input() placeholder: string;
  @Input() label: string;
  @Input() name: string;
  @Input() type: "password" | "text" | "number" | "checkbox" = "text";
  @Input() control: FormControl;

  isRequiredControl(): boolean {
    if (this.control.validator) {
      const validation = this.control.validator(new FormControl());
      return validation !== null && validation.required === true;
    }
    return false;
  }

  printError()
  {
    if(this.control.hasError("required"))
      return "This field is required.";
    if(this.control.hasError("email"))
      return "Email is not valid.";
    if(this.control.hasError("minlength"))
      return `Minimum lenght of ${this.control.errors.minlength.requiredLength} required.`
    if(this.control.hasError("maxlength"))
      return `Maximum lenght of ${this.control.errors.maxlength.requiredLength} allowed.`
    if(this.control.hasError("hasNumber"))
      return "Require 1 number.";
    if(this.control.hasError("hasCapitalCase"))
      return "Require 1 capital character.";
    if(this.control.hasError("hasSmallCase"))
      return "Require 1 small character.";
    if(this.control.hasError("hasSpecialCharacters"))
      return "Require 1 simbol.";
    return JSON.stringify(this.control.errors);
  }
}
