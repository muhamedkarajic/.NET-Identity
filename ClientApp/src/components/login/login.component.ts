import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from 'src/shared/customValidators';
import { GlobalVariables } from 'src/shared/variables';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm = null;
  constructor(private fb: FormBuilder, private client: HttpClient, private router: Router) {

    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, CustomValidators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(16),
        CustomValidators.hasNumber,
        CustomValidators.hasCapitalCase,
        CustomValidators.hasSmallCase,
        CustomValidators.hasSpecialCharacters,
      ]),
      isPersistent: new FormControl(false),
    });
  }
  submitForm()
  {
    this.client.post(environment.url + 'api/Auth/Login', this.loginForm.value)
    .pipe(tap((response: any) => {localStorage.setItem(GlobalVariables.__TOKEN__, response.token); return response;}))
      .subscribe(response => this.router.navigateByUrl('dashboard'), error => alert("Email or password not valid!"));
  }
}
