import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Location } from '@angular/common';
@Component({
  selector: 'vef-locations-form',
  templateUrl: './locations-form.component.html',
  styleUrls: ['./locations-form.component.scss'],
})
export class LocationsFormComponent implements OnInit {
  form! : FormGroup;
  loading = false;
  editMode = false;
  selectedLocation! : any;
  constructor( 
    private service : ApiService, 
    private fb : FormBuilder,
    private notification : NzNotificationService,
    private location : Location,
    private activatedRoute : ActivatedRoute
    ){}
  ngOnInit(): void {
      this.form = this.fb.group({
        name: ['', Validators.required],
        deliveryCost: [0, Validators.required]
      })

      const id = this.activatedRoute.snapshot.params['id'];
      id ? this.getSelectedLocation(id) : ''
  }
  getSelectedLocation(id: number){
    this.editMode = true;
    const locationId = Number(id);
    

    this.service.getFromUrl('/Location/'+locationId).subscribe({
      next: (res : any) => { 
        this.selectedLocation = res.data;
        this.form.patchValue({name: this.selectedLocation.name})
        this.form.patchValue({deliveryCost: this.selectedLocation.deliveryCost})
      },
      error: () => {
        this.notification.error('Error', 'Failed to get location detail');
        setTimeout(() => {this.location.back()}, 1500);
      }
    })
  }
  submit(){
    if (this.form.invalid){
      this.notification.warning('Warning', 'Location type is required', {nzAnimate: true, nzDuration: 4000})
      return
    }

    this.loading = true;

    this.service.postToUrl('/Location', this.form.value).subscribe({
      next: () => {
        this.notification.success('Success', 'Occassion Added', {nzAnimate : true, nzDuration : 4000});
        this.location.back()
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.notification.warning('Failed', err?.error?.message ? err?.error?.message : 'Something went wrong, failed to add location', {nzAnimate : true, nzDuration : 4000})
        },
        complete: ()=> this.loading = false
      
    })
  }


  update() {
    if (this.form.invalid){
      this.notification.warning('Warning', 'Location type is required', {nzAnimate: true, nzDuration: 4000})
      return
    }

    this.loading = true;

    this.service.updateToUrl('/Location', {...this.form.value, id : this.selectedLocation.id}).subscribe({
      next: () => {
        this.notification.success('Success', 'Location Updated', {nzAnimate : true, nzDuration : 4000});
        this.location.back()
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.notification.warning('Failed', err?.error?.message ? err?.error?.message : 'Something went wrong, failed to add location', {nzAnimate : true, nzDuration : 4000})
        },
        complete: ()=> this.loading = false
      
    })
  }
}
