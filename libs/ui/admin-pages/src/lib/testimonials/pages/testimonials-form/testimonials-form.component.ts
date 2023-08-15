import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'vef-testimonials-form',
  templateUrl: './testimonials-form.component.html',
  styleUrls: ['./testimonials-form.component.scss'],
})
export class TestimonialsFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  loading = false;
  testimonial : any;
  constructor(
    private service: ApiService, 
    private fb: FormBuilder, 
    private notification : NzNotificationService, 
    private location : Location,
    private activatedRoute : ActivatedRoute,
    private uiLoader : NgxUiLoaderService
    ) {}
  ngOnInit(): void {
    this.innitializeForm();
    this.activatedRoute.snapshot.params['id'] ? this.editMode = true : '';

    this.editMode ? this.prefillValues() : ''
  }

  innitializeForm() {
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      comment: ['', Validators.required],
      source: ['', Validators.required],
    });
  }

  prefillValues(){
    this.uiLoader.start()
    this.service.getFromUrl('/Customer/testimonials/'+this.activatedRoute.snapshot.params['id']).subscribe({
      next: (res) => {
        this.testimonial = res.data
        this.form.patchValue({customerName : this.testimonial.customerName});
        this.form.patchValue({comment : this.testimonial.comment});
        this.form.patchValue({source : this.testimonial.source});
        this.uiLoader.stop();
      },
      error: (err) => {
        this.loading = false
        this.notification.warning('Failed', err?.error?.message ? err?.error?.message : 'Something went wrong, failed to add testimonial', {nzAnimate : true, nzDuration : 4000})
        this.uiLoader.stop();
      },
      complete: ()=> {
        this.loading = false
      this.uiLoader.stop();
      }
    })
  }

  submit(){
    if (this.form.invalid){
      this.notification.warning('Warning', 'FIll in all fields', {nzAnimate: true, nzDuration: 4000})
      return
    }

    this.loading = true;

    this.service.postToUrl('/Customer/testimonials', this.form.value).subscribe({
      next: () => {
        this.notification.success('Success', 'Testimonial Added', {nzAnimate : true, nzDuration : 4000});
        this.location.back()
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.notification.warning('Failed', err?.error?.message ? err?.error?.message : 'Something went wrong, failed to add testimonial', {nzAnimate : true, nzDuration : 4000})
        },
        complete: ()=> this.loading = false
      
    })
  }


  update() {
    if (this.form.invalid){
      this.notification.warning('Warning', 'Fill in all fields', {nzAnimate: true, nzDuration: 4000})
      return
    }

    this.loading = true;

    this.service.updateToUrl('/Customer/testimonials', {...this.form.value, id: this.testimonial.id}).subscribe({
      next: () => {
        this.notification.success('Success', 'Testimonial Updated', {nzAnimate : true, nzDuration : 4000});
        this.location.back()
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.notification.warning('Failed', err?.error?.message ? err?.error?.message : 'Something went wrong, failed to update testimonial', {nzAnimate : true, nzDuration : 4000})
        },
        complete: ()=> this.loading = false
      
    })
  }
}
