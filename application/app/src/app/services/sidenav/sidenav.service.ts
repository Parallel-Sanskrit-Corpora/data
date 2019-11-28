import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public sidenav: any;

  constructor() {

  }

  toggleSidenav() {
    this.sidenav.opened = !this.sidenav.opened;
  }
}
