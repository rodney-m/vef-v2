import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vef-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  isFolded = false ;
  isExpand = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  get currentRoute() {
    return this.router.url
  }
}
