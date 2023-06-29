import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, FileService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {Location} from '@angular/common'
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'vef-extras-form',
  templateUrl: './extras-form.component.html',
  styleUrls: ['./extras-form.component.scss'],
})
export class ExtrasFormComponent {
  loading = false;
  form!: FormGroup;

  fileList: NzUploadFile[] | any[]= [];
  previewImage: string | undefined = '';
  previewVisible = false;
  imageUrl =''

  handlePreview = async (file: NzUploadFile | any): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private service: ApiService,
    private fileService : FileService,
    private location : Location
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      isInStock: [true, Validators.required],
    });

  }


  handleUpload(): void {
    if(this.form.invalid){
      this.notification.warning('Warning', 'Fill in all required fields', {nzAnimate : true, nzDuration: 4000});
      return;
    }
    if (this.fileList.length === 0 ) {
      this.notification.warning('Warning', 'Upload bouquet image', {nzAnimate : true, nzDuration: 4000}) 
      return
    } 
    this.loading = true;
    const formData = new FormData();    

    formData.append('file', this.fileList[0])

    this.fileService.postToUrl('',formData).subscribe({
      next: (res) => {
        console.log(res)
        this.imageUrl = res?.data.url;
        this.submit()
      },
      error: () => {
        this.loading = false;
        this.notification.warning("Failed to upload Image", "", {nzAnimate: true, nzDuration:4000} )
        return;
      }
    })
   
  }



  submit() {
    
    this.loading = true;
    this.service.postToUrl('/AddOn', {...this.form.value, imageUrl: this.imageUrl }).subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false
        this.notification.success('Success', 'Add On Added', {nzAnimate: true, nzDuration: 4000});
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

  cancel() {
    
  }
}
