import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'vef-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService,
    private service: ApiService,
    private uiLoader: NgxUiLoaderService,
    private router :  Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      otpCode: ['', Validators.required],
    });

    if (this.activatedRoute.snapshot.queryParams) {
      this.form.patchValue({
        email: this.activatedRoute.snapshot.queryParams['email'],
      });
      this.form.patchValue({
        otpCode: this.activatedRoute.snapshot.queryParams['code'],
      });
    }
  }

  get formControls() {
    return this.form.controls;
  }

  submit() {
    if (
      this.formControls['password'].value !==
      this.formControls['confirmPassword'].value
    ) {
      this.notification.warning(
        'Password mismatch',
        'Password and Confirm Password fields should match'
      );
      return;
    }

    this.loading = true;
    this.uiLoader.start()
    this.service
      .postToUrl('/Account/verify', {
        email: this.formControls['email'].value,
        password: this.formControls['password'].value,
        confirmPassword: this.formControls['confirmPassword'].value,
        otpCode: this.formControls['otpCode'].value,
      })
      .subscribe({
        next: () => {
          this.notification.success('Success', 'Account verified, Login to continue');
          this.loading = false;
          this.uiLoader.stop();
          this.router.navigate(['/auth/login'])
          
        },
        error: (err) => {
          this.notification.error(
            'Error',
            err?.error?.message ? err?.error?.message : 'Failed to verify account',
            { nzAnimate: true, nzDuration: 4000 }
          );
          this.loading = false;
          this.uiLoader.stop()
        },
        complete: () => {
          this.loading = false;
          this.uiLoader.stop()
        }

      });
  }
}
