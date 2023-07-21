import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { differenceInCalendarDays } from 'date-fns';


@Component({
  selector: 'vef-recepient-details',
  templateUrl: './recepient-details.component.html',
  styleUrls: ['./recepient-details.component.scss'],
})
export class RecepientDetailsComponent implements OnInit {
  recepientDetailsForm!: FormGroup;
  recepientDetails: any = {};
  locations: any[] = [];
  @Output() stepTwoNext: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private notification: NzNotificationService
  ) {}
  ngOnInit(): void {
    this.recepientDetailsForm = this.fb.group({
      recipientName: ['', Validators.required],
      recipientEmail: [''],
      recipientPhone: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryInstruction: [''],
      deliveryDate: ['', Validators.required],
      location: ['', Validators.required],
    });

    this.getLocations();
  }

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, Date.now()) < 0;

  continue() {
    if (this.recepientDetailsForm.invalid) {
      this.notification.warning(
        'Required fields',
        'Fill in all required field marked with (*)',
        { nzAnimate: true, nzDuration: 4000 }
      );
      return;
    }
    this.stepTwoNext.emit({ ...this.recepientDetailsForm.value });
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  getLocations() {
    this.service.getFromUrl('/Location').subscribe({
      next: (res: any) => {
        this.locations = res.data;
      },
    });
  }
}
