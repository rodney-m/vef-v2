import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'vef-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  loginForm! : FormGroup;

  constructor(private fb : FormBuilder){
    this.loginForm = this.fb.group({
      userName: [],
      password: []
    })
  }
  submitForm(){}
}
