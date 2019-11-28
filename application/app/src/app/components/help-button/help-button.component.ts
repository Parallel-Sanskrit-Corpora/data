import { Component, OnInit } from '@angular/core';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss']
})
export class HelpButtonComponent implements OnInit {

  contactFrom: string;

  constructor(private config: AppConfig) {
    // this.contactFrom = this.config.get('contact_form') || '';
  }

  ngOnInit() {
  }

}
