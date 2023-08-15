import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, FileService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Location } from '@angular/common';

@Component({
  selector: 'vef-bouquets-update',
  templateUrl: './bouquets-update.component.html',
  styleUrls: ['./bouquets-update.component.scss'],
})
export class BouquetsUpdateComponent implements OnInit {
  @Input() bouquet!:any;
  form!: FormGroup;
  occassions: any[] = [];
  loading = false;


  constructor(
    private service : ApiService, 
    private activatedRoute : ActivatedRoute,
    private notification: NzNotificationService,
    private fileService : FileService,
    private location : Location,
    private fb: FormBuilder,
    ){}

  ngOnInit(): void {
    this.getOccassions();
    this.form = this.fb.group({
      occasionId: [null, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: [''],
      leadTimeRequired: [false],
      tinOptions: [[]],
    });     
    
    this.getProductDetails()
  }

  getProductDetails(){
    const id = this.activatedRoute.snapshot.params['id']
    this.service.getFromUrl(`/Bouquet/${id}`).subscribe({
      next: (res) => {
        this.bouquet = res.data
        this.prefillValues(this.bouquet)
      }
    });    
  }

  update(){
    const images :any[] = [];
    this.bouquet.images.map((image : any) => {
      images.push(image.imageUrl)
    })

    this.loading = true;
   
    this.service.updateToUrl('/Bouquet', {
      ...this.form.value,
      imageUrls : images,
      id: this.bouquet.id
    }).subscribe({
      next: () => {
        this.notification.success('Success','Bouquet updated');
        this.location.back()
      },
      error: (err) => {
        this.notification.error('Error', err?.error?.message? err?.error?.message : 'Failed to update product');
        this.loading = false;
      },
      complete: () => this.loading = false
    })
  }

  prefillValues(bouquet : any){
    
    this.form.patchValue({name: bouquet?.name});
    this.form.patchValue({price: bouquet?.price});
    this.form.patchValue({description: bouquet?.description});
    this.form.patchValue({occasionId: bouquet?.occasion?.id});
    this.form.patchValue({leadTimeRequired: bouquet?.leadTimeRequired});
    
    const options = bouquet.tinOptions.map((item : any) => {
      return item.option
    });
    
    this.form.patchValue({tinOptions: options});
    console.log(bouquet?.occasion?.id);
  }

  getOccassions(){
    this.service.getFromUrl('/Occasion').subscribe({
      next: (res : any) => {
        this.occassions = res.data
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
