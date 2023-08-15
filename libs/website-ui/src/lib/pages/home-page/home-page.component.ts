import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";


// install Swiper modules
SwiperCore.use([Autoplay, Navigation]);


@Component({
  selector: 'vef-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  carouselContent :any[] = [
    {
      heading: 'Send the Perfect Gift',
      cta: 'Buy Now',
      paragraph: "Say it with flowers! Whether it's for a birthday, anniversary, or just because, our gorgeous blooms make the perfect gift. Browse our selection and send a thoughtful message to someone special today",
      image: 'assets/images/slide-1.jpg'
      
    },
    {
      heading: 'Fresh Cut Flowers Delivered to You',
      cta: 'Buy Now',
      paragraph: 'we make it easy to enjoy beautiful flowers in your home. Our fresh-cut blooms are delivered straight to your door, ready to be arranged and admired. Explore our collection and order now to bring some color to your life',
      image: 'assets/images/slide-2.jpg'
    },
    {
      heading: 'Serenade your loved ones with our Saxophone Delivery Service',
      cta: 'Buy Now',
      paragraph: 'Our flower delivery service just got even better with the addition of our Saxophone Delivery Service! Surprise your loved ones with a beautiful bouquet of flowers accompanied by the smooth sounds of a saxophone.',
      image: 'assets/images/slide-3.jpg'
    },
  ]
  loading = true;

  bouquetCategories :any[] = []

  constructor(private service : ApiService) {}

  ngOnInit(): void {
      this.getBouquetCategories()
  }

  getBouquetCategories(){
    this.service.getFromUrl('/Bouquet/occasion/grouped').subscribe({
      next: (res) => {
        this.bouquetCategories = res.data;
        this.loading=false
      }
    })
  }
}
