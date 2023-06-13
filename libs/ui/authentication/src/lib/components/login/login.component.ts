import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, AuthService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'vef-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form! : FormGroup;
  constructor(
    private formBuilder : FormBuilder,
    private uiLoader: NgxUiLoaderService,
    private service : ApiService,
    private notification : NzNotificationService,
    private authService : AuthService,
    private router : Router
    ){}

  ngOnInit(): void {
      this.form  = this.formBuilder.group({
        email : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required]],
      })
  }

  submit(){
    this.uiLoader.start();
    this.service.postToUrl('/Account/login', this.form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.uiLoader.stop()
        this.notification.success('Success', 'Login successful', {nzAnimate: true, nzDuration: 4000});
        this.authService.setToken(res.data.token);
        this.authService.getToken() ? this.router.navigate(['/']) : ''
      },
      error: (err) => {
        console.log(err);
        this.uiLoader.stop()
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to login', {nzAnimate: true, nzDuration: 4000})

      },
      complete: () => this.uiLoader.stop()
    })
    
  }
}
