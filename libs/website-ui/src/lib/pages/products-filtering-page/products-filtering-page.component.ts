import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-products-filtering-page',
  templateUrl: './products-filtering-page.component.html',
  styleUrls: ['./products-filtering-page.component.scss'],
})
export class ProductsFilteringPageComponent implements OnInit {
  searchText ='';
  size  = 8;
  page  = 8;
  srchSize  = 8;
  srchPage = 0;

  searched= false;
  
  items: any[] = [];
  isLoading = false;
  constructor(private service : ApiService,){

  }

  ngOnInit(): void {
      this.loadData()
  }

  toggleLoading = () => this.isLoading = ! this.isLoading;

  loadData= () => {
    this.toggleLoading();

    this.service.getPaginated({size: this.size, page: this.page}, '/Product/paged').subscribe({
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
    this.service.getPaginated({size: this.size, page: this.page}, '/Product/paged').subscribe({
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
    this.page++;
    this.appendData();

    console.log("onScroll")
  }


  onChange(e : any){
    this.searchText = e.target.value
  }


  search(){
    this.searched = true;
    this.service.getPaginated({size: this.srchSize, page: this.srchPage, search: this.searchText},'/Product/search/paged').subscribe({
      next:(res: any) => {

      } 
    })
  }
}
