import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { API, ApiService } from '@vef/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'vef-filter-by-category',
  templateUrl: './filter-by-category.component.html',
  styleUrls: ['./filter-by-category.component.scss'],
})
export class FilterByCategoryComponent implements OnInit {
  form!: FormGroup;
  items: any[] = [];
  isLoading = false;
  noMoreData = false;
  size = 8;
  page = 0;
  category!: any;
  categories: any[] = [];
  categoryId!: number | string;
  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private activatedRoute: ActivatedRoute,
    private uiLoader : NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      filter: [''],
    });

    this.categoryId = this.activatedRoute.snapshot.params['id'];
    this.getOccasions();
    this.form.patchValue({ filter: this.categoryId });
    this.categoryId ? this.getProducts() : ''
  }

  getOccasions() {
    this.service.getFromUrl(`/Occasion`).subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this.category = this.categories.find(
          (cat) => cat.id === this.categoryId
        );
      },
    });
  }

  getProducts() {
    this.uiLoader.start();
    this.service
      .getFromUrl(
        `/Bouquet/occasion/${this.form.controls['filter'].value}/paged`
      )
      .subscribe({
        next: (res: any) => {
          this.items = res.data.items;
          this.uiLoader.stop();
        },
        error: (err) => {
          console.log(err);
          this.uiLoader.stop();
        },
        complete: () => {
          this.toggleLoading();
          this.uiLoader.stop()
        },
      });
  }

  toggleLoading = () => (this.isLoading = !this.isLoading);

  appendData(): void {
    this.toggleLoading();
    this.service
      .getPaginated(
        { size: this.size, page: this.page },
        `/Bouquet/occasion/${this.form.controls['filter'].value}/paged`
      )
      .subscribe({
        next: (res: any) => {
          this.items = [...this.items, ...res.data.items];
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => this.toggleLoading(),
      });
  }

  onScroll = () => {
    this.page++;
    this.appendData();

    console.log('onScroll');
  };
}
