import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OcassionsFormComponent } from '../../components/ocassions-form/ocassions-form.component';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-occassions-list',
  templateUrl: './occassions-list.component.html',
  styleUrls: ['./occassions-list.component.scss'],
})
export class OccassionsListComponent implements OnInit {
  occassions :any[] =[]
  tableLoading = false;

  constructor(private modalService : NzModalService, private service : ApiService){}

  ngOnInit(): void {
      this.getOccassions();
  }

  openModal(){
    const modal = this.modalService.create({
      nzContent: OcassionsFormComponent
    })

    modal.afterClose.subscribe((data) => {
      if(data) {
        this.getOccassions()
      }
    })
  }

  getOccassions(){
    this.tableLoading = true;
    this.service.getFromUrl('/Occasion').subscribe({
      next: (res) => {
        this.occassions = res.data
        this.tableLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.tableLoading = false;
      }
    })
  }
}
