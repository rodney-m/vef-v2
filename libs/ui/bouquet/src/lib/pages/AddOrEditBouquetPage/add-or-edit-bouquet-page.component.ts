import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-add-or-edit-bouquet-page',
  templateUrl: './add-or-edit-bouquet-page.component.html',
  styleUrls: ['./add-or-edit-bouquet-page.component.scss'],
})
export class AddOrEditBouquetPageComponent {
  loading = false;
  form!: FormGroup;
  occassions: any[] = []

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private service: ApiService
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

  submit() {}

  cancel() {
  }
}
