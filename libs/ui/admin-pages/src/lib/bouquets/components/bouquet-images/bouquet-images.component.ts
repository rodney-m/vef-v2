import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UploadImagesComponent } from '../upload-images/upload-images.component';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, of } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'vef-bouquet-images',
  templateUrl: './bouquet-images.component.html',
  styleUrls: ['./bouquet-images.component.scss'],
})
export class BouquetImagesComponent implements OnInit {
    @Input() bouquet!:any;
    @Output() refresh = new EventEmitter()
    constructor(
      private modal : NzModalService, 
      private service : ApiService, 
      private notification : NzNotificationService,
      private uiLoader : NgxUiLoaderService
      ){}


  ngOnInit(): void {
      console.log(this.bouquet);
  }

  openUploadImageModal(){
    const uploadImageModal = this.modal.create({
      nzTitle: 'Upload images',
      nzContent: UploadImagesComponent,
      nzComponentParams: {bouquet: this.bouquet}
    });

    uploadImageModal.afterClose.subscribe((data) => {
      if(data)
        this.refresh.emit()
    })
  }

 

  confirmDelete(image : any){
    this.uiLoader.start()
    this.service.delete(`/Bouquet/${image?.bouquetId}/images/${image?.id}`).subscribe({
      next: () => {
        this.notification.success('Deleted', 'Image has been successfully deleted');
        this.refresh.emit();
        this.uiLoader.stop()

      },
      error: (err) => {
        this.notification.error('Error', err?.error?.message ? err?.error?.message : 'Failed to delete image' );
        this.uiLoader.stop();
      },
      complete: () => this.uiLoader.stop()
    })
  }
}
