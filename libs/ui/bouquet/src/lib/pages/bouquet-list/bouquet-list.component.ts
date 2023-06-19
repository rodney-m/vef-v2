import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BouquetFormComponent } from '../../components/bouquet-form/bouquet-form.component';

@Component({
  selector: 'vef-bouquet-list',
  templateUrl: './bouquet-list.component.html',
  styleUrls: ['./bouquet-list.component.scss'],
})
export class BouquetListComponent implements OnInit {
  bouquets : any[] = [];
  tableLoading = false;

  constructor(private service : ApiService, private notification : NzNotificationService , private modal : NzModalService){}
  
  ngOnInit(): void {
      this.getBouquets()
  }
  

  openModal(){
    const addModal = this.modal.create({
      nzTitle: 'Add a bouquet',
      nzContent: BouquetFormComponent
    })
  }


  getBouquets(){
    this.tableLoading = true;

    this.service.getFromUrl('/Product').subscribe({
      next: (res) => {
        this.bouquets = res.data;
        this.tableLoading = false;
      },
      error: (err) => {
        this.notification.warning('Warning', err?.error?.message ? err?.error?.message : 'Something went wrong, Failed to get bouquets', {nzAnimate : true, nzDuration : 4000})
        this.tableLoading = false;
      },
      complete: () => this.tableLoading = false
    })
  }

}
