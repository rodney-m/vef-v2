import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  testimonials :any[] = []
  constructor(private service : ApiService){}


  ngOnInit(): void {
      this.getTestimonials()
  }

  getTestimonials(){
    this.service.getFromUrl('/Customer/testimonials').subscribe({
      next: (res) => {
        this.testimonials = res.data
        console.log(this.testimonials)
      },
      
    })
  }
}
