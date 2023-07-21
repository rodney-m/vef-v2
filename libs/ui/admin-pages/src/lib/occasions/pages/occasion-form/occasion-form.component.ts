import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vef-occasion-form',
  templateUrl: './occasion-form.component.html',
  styleUrls: ['./occasion-form.component.scss'],
})
export class OccasionFormComponent {
  form! : FormGroup;
  loading = false;
  editMode = false;
  selectedOccasion! : any;
  constructor( 
    private service : ApiService, 
    private fb : FormBuilder,
    private notification : NzNotificationService,
    private location : Location,
    private activatedRoute : ActivatedRoute
    ){}
  ngOnInit(): void {
      this.form = this.fb.group({
        type: ['', Validators.required]
      })

      const id = this.activatedRoute.snapshot.params['id'];
      id ? this.getSelectedOccasion(id) : ''
  }
  getSelectedOccasion(id: number){
    this.editMode = true;
    const occasionId = Number(id);
    

    this.service.getFromUrl('/Occasion/'+occasionId).subscribe({
      next: (res : any) => { 
        this.selectedOccasion = res.data;
        this.form.patchValue({type: this.selectedOccasion.type})
      },
      error: () => {
        this.notification.error('Error', 'Failed to get occasion detail');
        setTimeout(() => {this.location.back()}, 1500);
      }
    })
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
        this.location.back()
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.notification.warning('Failed', err?.error?.message ? err?.error?.message : 'Something went wrong, failed to add occassion', {nzAnimate : true, nzDuration : 4000})
        },
        complete: ()=> this.loading = false
      
    })
  }


  update() {
    if (this.form.invalid){
      this.notification.warning('Warning', 'Occassion type is required', {nzAnimate: true, nzDuration: 4000})
      return
    }

    this.loading = true;

    this.service.updateToUrl('/Occasion', {...this.form.value, id : this.selectedOccasion.id}).subscribe({
      next: () => {
        this.notification.success('Success', 'Occassion Updated', {nzAnimate : true, nzDuration : 4000});
        this.location.back()
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
