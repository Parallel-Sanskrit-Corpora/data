import {Component, OnInit} from '@angular/core';
import {AppConfig} from '../app.config';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {
  gtuId: number;
  confidential: number;
  legals: number;
  contactForm: string;

  constructor(private config: AppConfig) {
  }

  ngOnInit() {
  }
}
