import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {SidenavService} from './services/sidenav/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') public sidenav;

  loading: boolean = false;
  opened: any = false;
  user: any;

  constructor(private router: Router,
              private sidenavService: SidenavService) {
    this.subscribeRouterEvents();
  }

  private subscribeRouterEvents() {
    this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd) {
        this.loading = false;
      }

      if (event instanceof NavigationError) {
      }
    });
  }

  toggleSelected() {
    this.opened = false;
  }

  ngAfterViewInit() {
    this.sidenavService.sidenav = this.sidenav;
  }
}
