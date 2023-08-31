import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, FileService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Location } from '@angular/common';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'vef-view-extra',
  templateUrl: './view-extra.component.html',
  styleUrls: ['./view-extra.component.scss'],
})
export class ViewExtraComponent implements OnInit {
  loading = false;
  form!: FormGroup;
  imageLoading = false;
  isVisible = false;

  fileList: NzUploadFile[] | any[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  imageUrl = '';
  selectedItemId!: any;
  selectedItem!: any;
  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private service: ApiService,
    private fileService: FileService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private uiLoader: NgxUiLoaderService
  ) {}

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

  ngOnInit(): void {
    this.innitializeForm();
    if (this.activatedRoute.snapshot.params['id']) {
      this.selectedItemId = this.activatedRoute.snapshot.params['id'];
      this.getSelectedExtra();
    }
  }

  innitializeForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      isInStock: [true, Validators.required],
    });
  }

  confirmDelete() {}

  submit() {
    this.loading = true;
    this.service
      .updateToUrl('/AddOn', { ...this.form.value, id: this.selectedItem.id })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
          this.notification.success('Success', 'Extras updated', {
            nzAnimate: true,
            nzDuration: 4000,
          });
          this.getSelectedExtra();
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.notification.error(
            'Error',
            err?.error?.message
              ? err?.error?.message
              : 'Failed to update extras',
            { nzAnimate: true, nzDuration: 4000 }
          );
        },
        complete: () => (this.loading = false),
      });
  }

  patchValues() {
    this.form.patchValue({ name: this.selectedItem.name });
    this.form.patchValue({ price: this.selectedItem.price });
    this.form.patchValue({ isInStock: this.selectedItem.isInStock });
  }

  getSelectedExtra() {
    this.uiLoader.start();
    this.service.getFromUrl(`/AddOn/${this.selectedItemId}`).subscribe({
      next: (res) => {
        this.selectedItem = res.data;
        this.patchValues();
        this.uiLoader.stop();
      },
      error: (err) => {
        this.uiLoader.stop();
        console.log(err);
      },
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    const formData = new FormData();

    formData.append('file', this.fileList[0]);
    this.uiLoader.start();
    this.fileService.postToUrl('', formData).subscribe({
      next: (res) => {
        console.log(res);
        this.imageUrl = res?.data.url;
        this.updateExtra();
        this.isVisible = false;
      },
      error: () => {
        this.loading = false;
        this.uiLoader.stop();
        this.notification.warning('Failed to upload Image', '', {
          nzAnimate: true,
          nzDuration: 4000,
        });
        return;
      },
    });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  updateExtra() {
    this.service
      .updateToUrl('/AddOn', {
        name: this.selectedItem.name,
        price: this.selectedItem.price,
        description: this.selectedItem.description,
        imageUrl: this.imageUrl,
        isInStock: this.selectedItem.isInStock,
        id: this.selectedItem.id,
      })
      .subscribe({
        next: (res) => {
          this.uiLoader.stop();

          this.loading = false;
          this.notification.success('Success', 'Extras updated', {
            nzAnimate: true,
            nzDuration: 4000,
          });
          this.getSelectedExtra();
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.uiLoader.stop();

          this.notification.error(
            'Error',
            err?.error?.message
              ? err?.error?.message
              : 'Failed to update extras',
            { nzAnimate: true, nzDuration: 4000 }
          );
        },
        complete: () => (this.loading = false),
      });
  }
}
