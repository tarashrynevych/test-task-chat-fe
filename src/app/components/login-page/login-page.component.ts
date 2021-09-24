import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  @Output() addNewUser: EventEmitter<string> = new EventEmitter<string>();

  public readonly loginForm = this.buildLoginForm();

  constructor(private formBuilder: FormBuilder) {}

  private buildLoginForm(): FormGroup {
    return this.formBuilder.group({ userName: ['', Validators.required] });
  }
}
