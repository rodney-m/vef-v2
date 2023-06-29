import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-view-bouquet',
  templateUrl: './view-bouquet.component.html',
  styleUrls: ['./view-bouquet.component.scss'],
})
export class ViewBouquetComponent implements OnInit {
  bouquet!:any;
  constructor(private service : ApiService, private activatedRoute : ActivatedRoute){}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
      this.service.getFromUrl(`/Product/${id}`).subscribe({
        next: (res) => {
          this.bouquet = res.data
        }
      })
  }
}
