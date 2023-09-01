import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@vef/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'vef-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss'],
})
export class ExpensesFormComponent implements OnInit {
  editMode  = false;
  loading = false;
  form!: FormGroup;
  @Input() expense! : any;
  expenses :any = []
  constructor(
    private service: ApiService,
    private fb: FormBuilder,
    private notification : NzNotificationService,
    private modalRef : NzModalRef
  ) {}

  ngOnInit(): void {
    this.innitializeExpenses();

    if(this.expense){
      this.editMode = true;
      this.patchValues()
    }
  }

  patchValues(){
    this.form.patchValue({name : this.expense?.name});
  }

  innitializeExpenses() {
    this.form = this.fb.group({
      name : ['', Validators.required]
    })
    
  }

  save(){

    if(this.form.invalid){
      this.notification.warning("Invalid form", "Fill in all fields correctly", {nzAnimate: true, nzDuration:4000} );
      return
    }

    this.loading = true
    this.service.postToUrl('/Expense',this.form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false
        this.notification.success('Success', 'Expense Added', {nzAnimate: true, nzDuration: 4000});
        this.modalRef.close(true);        
      },
      error: (err : any) => {
        this.loading = false;
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to add expsense', {nzAnimate: true, nzDuration: 4000})

      },
      complete: () => this.loading = false
    })
  }

  update(){
    if(this.form.invalid){
      this.notification.warning("Invalid form", "Fill in all fields correctly", {nzAnimate: true, nzDuration:4000} );
      return
    }

    
    this.loading = true
    this.service.updateToUrl('/Expense', {...this.form.value, id : this.expense.id }).subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false
        this.notification.success('Success', 'Expense Updated', {nzAnimate: true, nzDuration: 4000});
        this.modalRef.close(true);        
      },
      error: (err : any) => {
        this.loading = false;
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to update expsense', {nzAnimate: true, nzDuration: 4000})

      },
      complete: () => this.loading = false
    })
  }

  cancel(){
    this.modalRef.close(false)
  }

 
}
