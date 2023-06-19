import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-all-bouquets-infinite-scroll',
  templateUrl: './all-bouquets-infinite-scroll.component.html',
  styleUrls: ['./all-bouquets-infinite-scroll.component.scss'],
})
export class AllBouquetsInfiniteScrollComponent implements OnInit {
  items: any[] = [];
  isLoading = false;

  currentPage = 0;
  itemsPerPage = 8;

  toggleLoading = () => this.isLoading = ! this.isLoading;

  loadData= () => {
    this.toggleLoading();

    this.service.getPaginated({size: this.itemsPerPage, page: this.currentPage}, '/Product/paged').subscribe({
      next: (res : any) => {
        this.items = res.data.items
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => this.toggleLoading()
    })
  }

  appendData(): void{
    this.toggleLoading();
    this.service.getPaginated({size: this.itemsPerPage, page: this.currentPage}, '/Product/paged').subscribe({
      next: (res: any) =>{
        this.items = [...this.items, ...res.data.items]
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => this.toggleLoading()
    })
  }

  onScroll = () => {
    this.currentPage++;
    this.appendData();

    console.log("onScroll")
  }

  ngOnInit(): void {
    this.loadData()
  }

  constructor(private service : ApiService) {}


}
