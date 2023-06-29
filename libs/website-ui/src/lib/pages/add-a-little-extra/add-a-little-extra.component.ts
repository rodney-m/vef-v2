import { Component, EventEmitter, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddOnsModalComponent } from '../../components/add-ons-modal/add-ons-modal.component';

@Component({
  selector: 'vef-add-a-little-extra',
  templateUrl: './add-a-little-extra.component.html',
  styleUrls: ['./add-a-little-extra.component.scss'],
})
export class AddALittleExtraComponent {
  addOns : any[] = []
  nzOffsetBottom = 10;

  @Output() stepOneNext : EventEmitter<any> = new EventEmitter()
  constructor(private modal : NzModalService){}

  openAddOnModal() {
    const addOnModal = this.modal.create({
      nzContent: AddOnsModalComponent,
      nzTitle: 'Add Ons',
      nzBodyStyle: { height: '350px', overflow: 'auto' },
    });

    addOnModal.afterClose.subscribe((data) => {
      
      if(data)
        this.addOns = [...this.addOns, data];

        console.log(this.addOns)
    });
  }

  continue(){
    this.stepOneNext.emit({addons: this.addOns})
  }
}
