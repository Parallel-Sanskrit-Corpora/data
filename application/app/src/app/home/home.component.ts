import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class HomeComponent implements OnInit {
  titles: any = {};
  menuState: string = 'out';
  displayDevanagari: boolean = false;
  searchMode: boolean = false;

  constructor() {
    this.titles.main = 'Махабхарата';
    this.titles.sub = 'Араньякапарва';
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  toggleDevanagariEvent(value) {
    this.displayDevanagari = value;
    console.log('displayDevanagari', value);
  }

  toggleSearchModeEvent(value) {
    this.searchMode = value;
    console.log('searchMode', value);
  }
}
