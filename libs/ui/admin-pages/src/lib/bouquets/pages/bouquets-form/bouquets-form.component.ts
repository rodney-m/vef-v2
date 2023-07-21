import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, FileService } from '@vef/core';
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
  selector: 'vef-bouquets-form',
  templateUrl: './bouquets-form.component.html',
  styleUrls: ['./bouquets-form.component.scss'],
})
export class BouquetsFormComponent implements OnInit {
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
    private notification: NzNotificationService,
    private service: ApiService,
    private fileService : FileService,
    private location : Location,
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
    
    const formData = new FormData();  
    const imageUrls :any[]= []
    this.loading = true;
    this.fileList.map((file, index) => {
      formData.append('file', this.fileList[index])
      this.fileService.postToUrl('',formData).subscribe({
        next: (res : any) => {
          console.log(res)
          imageUrls.push(res?.data.url)
        },
        error: () => {
          this.loading = false;
          this.loading = false;
          this.notification.warning("Failed to upload Image", "", {nzAnimate: true, nzDuration:4000} )
          return;
        }
      })
    })

    const uploadInterval = setInterval(() => {     
      console.log(imageUrls)
      if(this.fileList.length === imageUrls.length){
        clearInterval(uploadInterval)      
        this.submit(imageUrls) 
      }
    }, 1000)


   
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

  submit(images :any[]) {
    
    // this.loading = true;
    this.service.postToUrl('/Product', {...this.form.value, imageUrls: images }).subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false
        this.notification.success('Success', 'Product Added', {nzAnimate: true, nzDuration: 4000});
        this.location.back()
        
      },
      error: (err : any) => {
        console.log(err);
        this.loading = false;
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to create product', {nzAnimate: true, nzDuration: 4000})

      },
      complete: () => this.loading = false
    })

  }

  cancel() {
   
  }
}
