import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
      this.router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
          this.menuExpanded = false;
        }
      })
  }

  toggleMenu() {
    this.menuExpanded = !this.menuExpanded;
  }
  
  menuExpanded = false;
  private router: Router;
}
