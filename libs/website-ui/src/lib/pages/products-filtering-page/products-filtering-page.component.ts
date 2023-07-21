import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-products-filtering-page',
  templateUrl: './products-filtering-page.component.html',
  styleUrls: ['./products-filtering-page.component.scss'],
})
export class ProductsFilteringPageComponent implements OnInit {
  searchText = '';
  size = 8;
  page = 0;
  currentAction = Action.all;

  searched = false;

  items: any[] = [];
  isLoading = false;
  noMoreData = false;

  constructor(private service: ApiService, private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.queryParams)
    if(this.activatedRoute.snapshot.queryParams['search']){
      this.searchText = this.activatedRoute.snapshot.queryParams['search'];
      this.search();
    } else{
      this.getAllProducts();
    }
  }

  fetchData() {
    this.getAllProducts();
  }

  toggleLoading = () => (this.isLoading = !this.isLoading);

  getByCategory() {}

  getAllProducts = () => {
    this.toggleLoading();

    this.service
      .getPaginated({ size: this.size, page: this.page }, '/Product/paged')
      .subscribe({
        next: (res: any) => {
          this.items = res.data.items;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => this.toggleLoading(),
      });
  };

  appendData(): void {
    this.toggleLoading();

    if (this.currentAction === Action.all) {
      this.service
        .getPaginated({ size: this.size, page: this.page }, '/Product/paged')
        .subscribe({
          next: (res: any) => {
            this.items = [...this.items, ...res.data.items];
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => this.toggleLoading(),
        });
    } else {
      this.service
        .getPaginated(
          { size: this.size, page: this.page, search: this.searchText },
          `/Product/search/paged?searchParam=${this.searchText}`
        )
        .subscribe({
          next: (res: any) => {
            res.data.items.length === 0 ? this.toggleNoMoreData() : ''
            this.items = [...this.items, ...res.data.items];
            this.currentAction = Action.search;
          },
          complete: () => {
            this.toggleLoading();
          }
        });
    }

    // this.fetchData();
  }


  toggleNoMoreData(){
    this.noMoreData =true
    setTimeout(() => {
      this.noMoreData = false
    }, 3000);
  }

  onScroll = () => {
    this.page++;
    this.appendData();

    console.log('onScroll');
  };

  onChange(e: any) {
    this.searchText = e.target.value;
    if(this.searchText === ''){
      this.page = 0;
      this.getAllProducts()
      this.currentAction = Action.all
    }
  }

  search() {
    this.searched = true;

    this.service
      .getPaginated(
        { size: this.size, page: 0, searchParam: this.searchText },
        `/Product/search/paged`
      )
      .subscribe({
        next: (res: any) => {
          this.items =res.data.items;
          this.currentAction = Action.search;
        },
      });
  }
}

enum Action {
  search = 'SEARCH',
  all = 'ALL',
  category = 'CATEGORY',
}
