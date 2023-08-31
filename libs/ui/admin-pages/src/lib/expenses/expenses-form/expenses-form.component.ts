import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'vef-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss'],
})
export class ExpensesFormComponent implements OnInit {
  productsList: any[] = [];
  selectedBouquet! : any;
  form!: FormGroup;
  loading =false;
  expensesForm!: FormGroup;
  constructor(
    private service: ApiService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notification : NzNotificationService,
    private location : Location,
    private uiLoader : NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      bouquet: [0],
    });
    this.innitializeExpenses();
    
    this.getProducts(300, 0);
    const bouquetId = Number(this.activatedRoute.snapshot.params['id']);
    console.log(bouquetId);
    this.form.patchValue({ bouquet: bouquetId });
    this.getExpenses()
    // this.form.controls['bouquet'].patchValue(bouquetId);
  }

  innitializeExpenses() {
    this.expensesForm = new FormGroup({
      expenses: new FormArray([
        new FormGroup({
          id: new FormControl(0),
          name: new FormControl(''),
          description: new FormControl(''),
          cost: new FormControl(0),
        }),
      ]),
    });
  }

  updateExpense(i:number){
    const control = <FormArray>(
      this.expensesForm.controls['expenses']
    );

    this.uiLoader.start();
    this.service.updateToUrl(`/Expense`, {
      bouquetId: this.selectedBouquet.id,
      ...control.controls[i].value
    }).subscribe({
      next: () =>{
        this.uiLoader.stop();
        this.getExpenses()
      },
      error: (err)=> {
        this.uiLoader.stop();
        this.notification.error('Error', err?.error?.message ? err?.error?.message : 'Failed to update');
      },
      complete: ()=>{
        this.uiLoader.stop();
      }
    })
  }

  toUpdateControl(i : number) : boolean{
    const control = <FormArray>(
      this.expensesForm.controls['expenses']
    );

    const selected = control.controls[i].value
    const returnValue = selected.id !== 0 ? true : false
    return returnValue
  }
  

  // submit(){
  //   const payload = {...this.expensesForm.value, bouquetId: this.form.controls['bouquet'].value};
  //   this.loading =true
  //   this.service.postToUrl(`/Expense`,payload).subscribe({
  //     next: () => { 
  //       this.notification.success('Success', 'Expenses updated', {nzAnimate:true, nzDuration: 4000});
  //       this.loading =false;
  //       this.location.back();
  //     },
  //     error: (err) => {
  //       this.notification.error('Error', err.error.message ? err.error.message : 'Failed to update expenses', {nzAnimate:true, nzDuration: 4000});
  //       this.loading =false
  //     },
  //     complete: () => this.loading =false
  //   })
  // }

  save(i : number){

    const control = <FormArray>(
      this.expensesForm.controls['expenses']
    );

    const selected = control.controls[i].value
    delete selected.id
    const payload = {
      bouquetId: this.selectedBouquet.id,
      expenses: [
        selected
      ]
    }

    this.uiLoader.start()
    this.service.postToUrl(`/Expense`,payload).subscribe({
      next: () => { 
        this.notification.success('Success', 'Expense added', {nzAnimate:true, nzDuration: 4000});
        this.loading =false;
        this.uiLoader.stop();
        this.getExpenses()
      },
      error: (err) => {
        this.notification.error('Error', err.error.message ? err.error.message : 'Failed to update expenses', {nzAnimate:true, nzDuration: 4000});
        this.uiLoader.stop();
      },
      complete: () => this.uiLoader.stop()
    })
  }

  get expensesFormControls() {
    return this.expensesForm.get('expenses') as FormArray;
  }

  removeExpense(index: number) {
    const control = <FormArray>(
      this.expensesForm.controls['expenses']
    );

    const selected = control.controls[index].value

    if (selected.id === 0){
      control.removeAt(index);
    } else {
      this.uiLoader.start()
      this.service.delete(`/Expense/${selected.id}`).subscribe({
        next: ()=> {
          this.uiLoader.stop()
          control.removeAt(index);
          this.notification.success('Success', 'Expense deleted')          
        },
        error:(err) => {
          this.notification.success('Error', err.error.message ? err.error.message : 'Failed to delete expense')          
          this.uiLoader.stop();
        },
        complete: ()=>{
          this.uiLoader.stop();
        }
      })
    }
    const returnValue = selected.id !== 0 ? true : false
  }


  addExpense() {
    const control = <FormArray>this.expensesForm.controls['expenses'];

    control.push(
      new FormGroup({
        id: new FormControl(0),
        name: new FormControl(''),
        description: new FormControl(''),
        cost: new FormControl(0),
      })
    );
  }

  getProducts(size: number, page: number) {
    this.service
      .getPaginated({ size: size, page: page }, '/Bouquet/paged')
      .subscribe({
        next: (res: any) => {
          this.productsList = res.data.items;
        },
      });
  }

  prefillDataInForm(){
    const control = <FormArray>this.expensesForm.controls['expenses'];
    //remove the already existing element
    control.controls.pop();  
    this.selectedBouquet.expenses.map((expense : any) => {

      //fill the data from already existing expenses
      control.push(
        new FormGroup({
          id: new FormControl(expense.id),
          name: new FormControl(expense.name),
          description: new FormControl(expense.description),
          cost: new FormControl(expense.cost),
        })
      );
    })
  }

  getExpenses(){
    this.uiLoader.start()
    this.service.getFromUrl(`/Bouquet/${this.activatedRoute.snapshot.params['id']}`).subscribe({
      next: (res) => {
        this.selectedBouquet = res.data

        this.selectedBouquet?.expenses.length > 0 ? this.prefillDataInForm() : ''

      console.log(this.selectedBouquet);
      },
      error: () => {
        this.uiLoader.stop();
      },
      complete: () => {
        this.uiLoader.stop();
      }
    })
  }
}
