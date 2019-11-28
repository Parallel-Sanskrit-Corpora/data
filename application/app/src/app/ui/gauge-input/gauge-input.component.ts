import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-gauge-input',
  templateUrl: './gauge-input.component.html',
  styleUrls: ['./gauge-input.component.scss']
})
export class GaugeInputComponent implements OnInit {
  @Input('categoryFormGroup') categoryFormGroup: FormGroup;
  @Input('prefix') prefix: string;
  @Input('name') name: string;
  @Input('categoryId') categoryId: number;
  @Input('min') min: number;
  @Input('minLabel') minLabel: string;
  @Input('max') max: number;
  @Input('maxLabel') maxLabel: string;
  @Input('dataSetAccumulator') dataSetAccumulator: any;

  gaugeItemsCount: number = null;
  gaugeValue: number = null;

  constructor() {
  }

  get gauge() {
    return this.categoryFormGroup.get(this.name);
  }

  ngOnInit() {
    this.gaugeItemsCount = this.min === 0 ? this.max - this.min : this.max - this.min + 1;
    this.gaugeValue = this.gauge.value == null ? null : this.gauge.value;
  }

  valueChanged() {
    this.gaugeValue = this.gauge.value;
    this.dataSetAccumulator[this.prefix + this.name] = {
      input: 'number',
      value: this.gauge.value
    };
  }

  isGaugeValueNull(gaugeValue) {
    return gaugeValue == null || gaugeValue === '';
  }
}
