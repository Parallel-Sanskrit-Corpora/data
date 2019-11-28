import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss']
})
export class CheckBoxInputComponent implements OnInit {
  @Input('categoryFormGroup') categoryFormGroup: FormGroup;
  @Input('prefix') prefix: string;
  @Input('options') options: any;
  @Input('categoryId') categoryId: number;
  @Input('configuration') configuration: any;
  @Input('name') name: string;
  @Input('dataSetAccumulator') dataSetAccumulator: any;

  @Output() changeCheckbox: EventEmitter<any> = new EventEmitter();

  hasAnyOption: boolean = false;
  anyOptionValue: boolean = false;

  constructor() {
  }

  ngOnInit() {
    const values = this.checkbox.value;

    this.options.forEach(option => {
      if (values[option.code] && values[option.code] === true) {
        option.checked = true;
      }
    });

    if (values.noOptions === true) {
      this.anyOptionValue = true;
    }

    this.hasAnyOption = this.configuration && this.configuration.any;
  }

  get checkbox() {
    return this.categoryFormGroup.get(this.name);
  }

  valueChanged(proposition, isChecked: boolean) {
    const dataSetValue = {};

    proposition.checked = isChecked;

    this.anyOptionValue = false;
    this.options.forEach(option => {
      dataSetValue[option.code] = !!(option.checked);
    });

    this.options.forEach(option => {
      if (dataSetValue[option.code] === true) {
        dataSetValue['noOptions'] = false;
      }
    });

    this.changeCheckbox.emit(dataSetValue);

    this.dataSetAccumulator[this.prefix + this.name] = {
      input: 'checkbox',
      value: dataSetValue
    };
  }

  anyChanged(isChecked: boolean) {
    const dataSetValue = {};

    this.anyOptionValue = isChecked;

    this.options.forEach(option => {
      option.checked = false;
      dataSetValue[option.code] = false;
    });

    dataSetValue['noOptions'] = true;

    this.changeCheckbox.emit(dataSetValue);

    this.dataSetAccumulator[this.prefix + this.name] = {
      input: 'checkbox',
      value: dataSetValue
    };
  }
}
