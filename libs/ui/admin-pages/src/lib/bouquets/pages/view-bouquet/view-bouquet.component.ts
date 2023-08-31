import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, FileService } from '@vef/core';
import { Location } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'vef-view-bouquet',
  templateUrl: './view-bouquet.component.html',
  styleUrls: ['./view-bouquet.component.scss'],
})
export class ViewBouquetComponent implements OnInit {
  bouquet!:any;
  bouquetId!:number;
  form!: FormGroup;
  occassions: any[] = []


  constructor(
    private service : ApiService, 
    private activatedRoute : ActivatedRoute,
    private notification: NzNotificationService,
    private fileService : FileService,
    private location : Location,
    private fb: FormBuilder,
    private uiLoader : NgxUiLoaderService
    ){}

  ngOnInit(): void {
    this.bouquetId = this.activatedRoute.snapshot.params['id']
    this.getOccassions();
    this.form = this.fb.group({
      occasionId: [null, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: [''],
    });     
      this.getData()
  }

  getData() {
    this.uiLoader.start();
    const id = this.activatedRoute.snapshot.params['id']
    this.service.getFromUrl(`/Bouquet/${id}`).subscribe({
      next: (res) => {
        this.bouquet = res.data
        this.prefillValues(this.bouquet);
      },
      error: (err)=> {
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to get bouquet info', {nzAnimate: true, nzDuration: 4000})
        this.uiLoader.stop()
      },
      complete: () => this.uiLoader.stop()
    });
  }

  prefillValues(bouquet : any){
    
    this.form.patchValue({name: bouquet?.name});
    this.form.patchValue({price: bouquet?.price});
    this.form.patchValue({description: bouquet?.description});
    this.form.patchValue({occasionId: bouquet?.occasion?.id});

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
