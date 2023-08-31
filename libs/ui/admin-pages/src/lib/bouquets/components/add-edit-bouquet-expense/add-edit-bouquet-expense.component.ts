import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@vef/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-add-edit-bouquet-expense',
  templateUrl: './add-edit-bouquet-expense.component.html',
  styleUrls: ['./add-edit-bouquet-expense.component.scss'],
})
export class AddEditBouquetExpenseComponent implements OnInit {
  form! : FormGroup;
  loading = false;
  expenses  :any[] = [];
  @Input() bouquet! : any;
  @Input() expense! : any;
  editMode = false;
  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private service: ApiService,
    private modalRef : NzModalRef
  ) {}

  ngOnInit(): void {
      this.innitializeForm()
      this.getAllExpensesList()

      if(this.expense){
        this.editMode = true;
        this.patchValues()
      }
  }

  patchValues(){
    this.form.patchValue({expenseId : this.expense?.expense?.id})
    this.form.patchValue({cost : this.expense?.cost})
  }

  getAllExpensesList(){
    this.service.getFromUrl(`/Expense`).subscribe({
      next: (res) => {
        this.expenses = res.data;
      },
      error: (err) => {
        this.loading = false;
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to get expenses list', {nzAnimate: true, nzDuration: 4000})
      },
    })
  }

  cancel(){
    this.modalRef.close()
  }

  update(){
    if(this.form.invalid){
      this.notification.warning("Invalid form", "Fill in all fields correctly", {nzAnimate: true, nzDuration:4000} );
      return
    }

    
    this.loading = true
    this.service.updateToUrl('/Expense/bouquet', {...this.form.value, bouquetId: Number(this.bouquet), id : this.expense.id }).subscribe({
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

  
  save(){

    if(this.form.invalid){
      this.notification.warning("Invalid form", "Fill in all fields correctly", {nzAnimate: true, nzDuration:4000} );
      return
    }

    this.loading = true
    this.service.postToUrl('/Expense/bouquet', {...this.form.value, bouquetId: Number(this.bouquet) }).subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false
        this.notification.success('Success', 'Expense Added', {nzAnimate: true, nzDuration: 4000});
        this.modalRef.close(true);        
      },
      error: (err : any) => {
        this.loading = false;
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to add expsense for bouquet', {nzAnimate: true, nzDuration: 4000})

      },
      complete: () => this.loading = false
    })
  }

  innitializeForm(){
    this.form = this.fb.group({
      expenseId: [0, Validators.required],
      cost: [0, Validators.required],
    });
  }
}
