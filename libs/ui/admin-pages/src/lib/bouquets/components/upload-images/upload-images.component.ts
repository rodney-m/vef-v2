import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'vef-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
  fileList: NzUploadFile[] | any[]= [];
  previewImage: string | undefined = '';
  previewVisible = false;
  imageUrl =''
  loading = false;
  @Input() public bouquet! : any;

  constructor(
    private fileService : FileService, 
    private notification : NzNotificationService,
    private modalRef : NzModalRef,
    private service : ApiService
    ){}

    ngOnInit(): void {
        console.log(this.bouquet)
    }

  handlePreview = async (file: NzUploadFile | any): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    console.log(this.fileList);
    return false;
  };

  cancel(){
    this.modalRef.close(false);
  }

  upload(){
    this.loading = true;
    const formData = new FormData();  
    const imageUrls :any[]= []
    this.fileList.map((file, index) => {
      formData.append('file', this.fileList[index])
      this.fileService.postToUrl('',formData).subscribe({
        next: (res : any) => {
          this.updateImage(res?.data.url)
        },
        error: () => {
          this.loading = false;
          this.notification.warning("Failed to upload Image", "", {nzAnimate: true, nzDuration:4000} )
          return;
        }
      })
    })
  }

  updateImage(imageUrl : string){
    this.service.updateToUrl(`/Product/${this.bouquet.id}/images?imageUrl=${imageUrl}`, '').subscribe({
      next: () => {
          this.notification.success('Success', 'Image uploaded');
          this.modalRef.close(true);      },
      error: (err) => {
        this.notification.warning('Failed', err?.error?.message);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}
