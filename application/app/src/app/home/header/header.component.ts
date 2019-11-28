import { Component, OnInit, Input } from '@angular/core';
import {AppConfig} from '../../app.config';
import {SidenavService} from '../../services/sidenav/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() logoUrl: any = '';

  notAuthorizedMenu: Array <any> = [];
  constructor(private config: AppConfig, private sidenavService: SidenavService) { }

  ngOnInit() {
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }
}
