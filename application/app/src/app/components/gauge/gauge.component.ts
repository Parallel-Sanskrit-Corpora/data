import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {

  @Input() progress: any = 0;

  constructor() { }

  ngOnInit() {
  }

}
