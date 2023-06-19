import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, FileService } from '@vef/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'vef-bouquet-form',
  templateUrl: './bouquet-form.component.html',
  styleUrls: ['./bouquet-form.component.scss'],
})
export class BouquetFormComponent implements OnInit {
  loading = false;
  form!: FormGroup;
  occassions: any[] = []

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
    private modalRef: NzModalRef,
    private notification: NzNotificationService,
    private service: ApiService,
    private fileService : FileService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      occasionId: [null, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: [''],
    });

    this.getOccassions()
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

  getOccassions(){
    this.service.getFromUrl('/Occasion').subscribe({
      next: (res) => {
        this.occassions = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  submit() {
    
    this.loading = true;
    this.service.postToUrl('/Product', {...this.form.value, imageUrls: [this.imageUrl] }).subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false
        this.notification.success('Success', 'Product Added', {nzAnimate: true, nzDuration: 4000});
        this.modalRef.close(true);
        
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to create product', {nzAnimate: true, nzDuration: 4000})

      },
      complete: () => this.loading = false
    })

  }

  cancel() {
    this.modalRef.close(null);
  }
}
