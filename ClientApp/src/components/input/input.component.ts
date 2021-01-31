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
}