import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'vef-order-tracking-page',
  templateUrl: './order-tracking-page.component.html',
  styleUrls: ['./order-tracking-page.component.scss'],
})
export class OrderTrackingPageComponent implements OnInit {
  order! :any ;

  trackingForm! : FormGroup;

  constructor(
    private service : ApiService, 
    private uiLoader : NgxUiLoaderService, 
    private fb: FormBuilder,
    private activatedRoute : ActivatedRoute,
    private notification : NzNotificationService
    ){}

 

  ngOnInit(): void {
      this.trackingForm = this.fb.group({
        reference : ['', Validators.required]
      })

      const ref = this.activatedRoute.snapshot.queryParams['ref']
      if(ref) {
        this.trackingForm.patchValue({reference : ref})
      }
  }

  track(){
    if(this.trackingForm.controls['reference'].value === ''){
      this.notification.warning('Reference is required', 'Check your order reference in the email you received when you placed an order');
      return;
    }
    this.uiLoader.start()
    this.service.getFromUrl(`/Order/reference/${this.trackingForm.controls['reference'].value}`).subscribe({
      next: (res) => {
        this.order = res.data;
        this.uiLoader.stop();
      },
      error: (err) => {
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to track order', {nzAnimate: true, nzDuration: 4000})
        this.uiLoader.stop()
      },
      complete:()=> {
        this.uiLoader.stop()
      }
    })
  }
}
