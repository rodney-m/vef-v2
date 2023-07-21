import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, FileService } from '@vef/core';
import { Location } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'vef-view-bouquet',
  templateUrl: './view-bouquet.component.html',
  styleUrls: ['./view-bouquet.component.scss'],
})
export class ViewBouquetComponent implements OnInit {
  bouquet!:any;
  form!: FormGroup;
  occassions: any[] = []


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
    });     
      this.getData()
  }

  getData() {
    const id = this.activatedRoute.snapshot.params['id']
    this.service.getFromUrl(`/Product/${id}`).subscribe({
      next: (res) => {
        this.bouquet = res.data
        this.prefillValues(this.bouquet);
      }
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
