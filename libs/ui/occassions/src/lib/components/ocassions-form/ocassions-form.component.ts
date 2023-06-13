import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {ApiService} from '@vef/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-ocassions-form',
  templateUrl: './ocassions-form.component.html',
  styleUrls: ['./ocassions-form.component.scss'],
})
export class OcassionsFormComponent implements OnInit{
  form! : FormGroup;
  loading = false;
  constructor(
    private modalRef : NzModalRef, 
    private service : ApiService, 
    private fb : FormBuilder,
    private notification : NzNotificationService
    ){}
  ngOnInit(): void {
      this.form = this.fb.group({
        type: ['', Validators.required]
      })
  }
  cancel(){
    this.modalRef.close(null)
  }
  submit(){
    if (this.form.invalid){
      this.notification.warning('Warning', 'Occassion type is required', {nzAnimate: true, nzDuration: 4000})
      return
    }

    this.loading = true;

    this.service.postToUrl('/Occasion', this.form.value).subscribe({
      next: () => {
        this.notification.success('Success', 'Occassion Added', {nzAnimate : true, nzDuration : 4000});
        this.modalRef.close(true);
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.notification.warning('Failed', err?.error?.message ? err?.error?.message : 'Something went wrong, failed to add occassion', {nzAnimate : true, nzDuration : 4000})
        },
        complete: ()=> this.loading = false
      
    })
  }
}
