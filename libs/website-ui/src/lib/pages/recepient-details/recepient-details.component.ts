import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-recepient-details',
  templateUrl: './recepient-details.component.html',
  styleUrls: ['./recepient-details.component.scss'],
})
export class RecepientDetailsComponent implements OnInit {
  recepientDetailsForm!: FormGroup;
  recepientDetails: any = {};
  locations : any[] = []
  @Output() stepTwoNext: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder, private service : ApiService) {}
  ngOnInit(): void {
    this.recepientDetailsForm = this.fb.group({
      recipientName: ['', Validators.required],
      recipientEmail: ['', [Validators.required, Validators.email]],
      recipientPhone: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryInstruction: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      location: ['', Validators.required],
    });

    this.getLocations()
  }

  continue() {
    this.stepTwoNext.emit({...this.recepientDetailsForm.value});
  }

  getLocations(){
    this.service.getFromUrl('/Location').subscribe({
      next:(res :any) => {
        this.locations = res.data
      }
    })
  }
}
