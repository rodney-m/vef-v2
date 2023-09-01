import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExpensesFormComponent } from '../expenses-form/expenses-form.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-expenses-bouquets-list',
  templateUrl: './expenses-bouquets-list.component.html',
  styleUrls: ['./expenses-bouquets-list.component.scss'],
})
export class ExpensesBouquetsListComponent implements OnInit {
  size = 12;
  page = 0;
  totalItems = 0;
  currentPage = 0;
  loading = false;
  
  expenses: any[] = [];

  constructor(
    private service: ApiService, 
    private modal : NzModalService,
    private notification : NzNotificationService
    ) {}

  ngOnInit(): void {
      this.getExpenses(this.size, this.page);
  }

  editExpense(expense : any){
    const addModal = this.modal.create({
      nzContent : ExpensesFormComponent,
      nzTitle : 'Edit Bouquet Expense',
      nzComponentParams : {expense }
    })

    addModal.afterClose.subscribe((addedExpense) => {
      if (addedExpense){
        this.getExpenses(this.size, this.page);
      }
    })
  }

  openModal(){
    const addModal = this.modal.create({
      nzContent : ExpensesFormComponent,
      nzTitle : 'Add Bouquet Expense',
    })

    addModal.afterClose.subscribe((addedExpense) => {
      if (addedExpense){
        this.getExpenses(this.size, this.page)
      }
    })
  }

  
  getExpenses(size: number, page: number) {
    this.loading = true;
    this.service
      .getPaginated({ size: size, page: page }, '/Expense/paged')
      .subscribe({
        next: (res: any) => {
          this.expenses = res.data.items;
          this.totalItems = res.data.totalItemCount;
          this.currentPage = res.data.page;
          this.size = res.data.pageSize;
          this.loading = false;
        },
        complete: () => {
          this.loading = false
        }
      });
  }

  confirmDelete(id: number){
    this.loading = true;
    this.service.delete(`/Expense/${id}`).subscribe({
      next: () => {
        this.loading = false;
        this.getExpenses(this.size, this.page)
        this.notification.success('Success', 'Expense deleted', {nzAnimate:true, nzDuration: 4000});
      },
      error: (err) => {
        this.loading = false;
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to delete expense', {nzAnimate: true, nzDuration: 4000});         
      }
    })
  }




  pageIndexChange(index: number) {
    this.getExpenses(this.size, index--);
  }
  pageSizeChange(size: number) {
    this.getExpenses(size, this.page);
  }
}
