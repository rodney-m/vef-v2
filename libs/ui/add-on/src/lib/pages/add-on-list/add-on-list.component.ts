import { Component, OnInit } from '@angular/core';
import { AddOnFormComponent } from '../../components/add-on-form/add-on-form.component';
import { ApiService } from '@vef/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-add-on-list',
  templateUrl: './add-on-list.component.html',
  styleUrls: ['./add-on-list.component.scss'],
})
export class AddOnListComponent implements OnInit {
  addOns :any[] =[]
  tableLoading = false;
  isInStockLoading = false;

  constructor(
    private modalService : NzModalService, 
    private service : ApiService,
    private notification : NzNotificationService

    ){}

  ngOnInit(): void {
      this.getAddOns();
  }

  openModal(){
    const modal = this.modalService.create({
      nzContent: AddOnFormComponent
    })

    modal.afterClose.subscribe((data) => {
      if(data) {
        this.getAddOns()
      }
    })
  }

  toggleIsInStock(addOn : any){
    this.isInStockLoading = true;

    this.service.updateToUrl('/Addon', {...addOn, isInStock: !addOn.isInStock}).subscribe({
      next: (res) => {
        this.getAddOns();
        this.notification.success('Success', 'Add on updated', {nzAnimate : true, nzDuration : 4000});
        this.isInStockLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isInStockLoading = false;
      },
      complete: () => this.isInStockLoading = false
    })
  }

  getAddOns(){
    this.tableLoading = true;
    this.service.getFromUrl('/Addon').subscribe({
      next: (res) => {
        this.addOns = res.data
        this.tableLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.tableLoading = false;
      }
    })
  }
}
