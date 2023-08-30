import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, FileService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Location } from '@angular/common';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vef-view-extra',
  templateUrl: './view-extra.component.html',
  styleUrls: ['./view-extra.component.scss'],
})
export class ViewExtraComponent implements OnInit {
  loading = false;
  form!: FormGroup;

  fileList: NzUploadFile[] | any[]= [];
  previewImage: string | undefined = '';
  previewVisible = false;
  imageUrl =''
  selectedItemId!: any;
  selectedItem!: any;
  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private service: ApiService,
    private fileService : FileService,
    private location : Location,
    private activatedRoute : ActivatedRoute
  ){}

  ngOnInit(): void {
   this.innitializeForm();
   if(this.activatedRoute.snapshot.params['id']){
     this.selectedItemId = this.activatedRoute.snapshot.params['id'];
     this.getSelectedExtra();
   } 
  }

  innitializeForm(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      isInStock: [true, Validators.required],
    });
  }

  submit() {
    
    this.loading = true;
    this.service.updateToUrl('/AddOn', {...this.form.value, imageUrl: this.imageUrl }).subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false
        this.notification.success('Success', 'Extras updated', {nzAnimate: true, nzDuration: 4000});
        this.location.back()
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to create add on', {nzAnimate: true, nzDuration: 4000})

      },
      complete: () => this.loading = false
    })

  }

  patchValues(){
    this.form.patchValue({name: this.selectedItem.name})
  }

  getSelectedExtra(){
    this.service.getFromUrl(`/AddOn/${this.selectedItemId}`).subscribe({
      next: (res) => {
        this.selectedItem = res.data;
        this.patchValues()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



}
