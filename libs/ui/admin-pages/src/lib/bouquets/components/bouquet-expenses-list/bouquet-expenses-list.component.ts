import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddEditBouquetExpenseComponent } from '../add-edit-bouquet-expense/add-edit-bouquet-expense.component';

@Component({
  selector: 'vef-bouquet-expenses-list',
  templateUrl: './bouquet-expenses-list.component.html',
  styleUrls: ['./bouquet-expenses-list.component.scss'],
})
export class BouquetExpensesListComponent implements OnInit {
  @Input() bouquetId! :number ;
  expenses! : any[];
  loading = false;

  constructor(
    private service : ApiService,
    private notification : NzNotificationService,
    private modal : NzModalService
  ){}

  ngOnInit(): void {
      this.getProductExpenses()
  }

  editExpense(expense : any){
    const addModal = this.modal.create({
      nzContent : AddEditBouquetExpenseComponent,
      nzTitle : 'Edit Bouquet Expense',
      nzComponentParams : {expense }
    })

    addModal.afterClose.subscribe((addedExpense) => {
      if (addedExpense){
        this.getProductExpenses()
      }
    })
  }
  confirmDelete(id: number){
    this.loading = true;
    this.service.delete(`/Expense/bouquet/expense/${id}`).subscribe({
      next: () => {
        this.loading = false;
        this.getProductExpenses()
        this.notification.success('Success', 'Expense deleted', {nzAnimate:true, nzDuration: 4000});
      },
      error: (err) => {
        this.loading = false;
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to delete expense', {nzAnimate: true, nzDuration: 4000});         
      }
    })
  }



  getProductExpenses(){
    this.loading = true;
    this.service.getFromUrl(`/Expense/bouquet/${this.bouquetId}`).subscribe({
      next: (res) => {
        this.expenses = res.data;
        this.loading = false
      },
      error: (err) => {
        this.loading = false;
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to get bouquet expenses', {nzAnimate: true, nzDuration: 4000})
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  openModal(){
    const addModal = this.modal.create({
      nzContent : AddEditBouquetExpenseComponent,
      nzTitle : 'Add Bouquet Expense',
      nzComponentParams : {bouquet : this.bouquetId}
    })

    addModal.afterClose.subscribe((addedExpense) => {
      if (addedExpense){
        this.getProductExpenses()
      }
    })
  }
}
