import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-choice-input',
  templateUrl: './choice-input.component.html',
  styleUrls: ['./choice-input.component.scss']
})
export class ChoiceInputComponent implements OnInit {
  @Input('categoryFormGroup') categoryFormGroup: FormGroup;
  @Input('prefix') prefix: string;
  @Input('options') options: any;
  @Input('categoryId') categoryId: number;
  @Input('name') name: string;
  @Input('dataSetAccumulator') dataSetAccumulator: any;

  choiceValue: string = '';

  constructor() {
  }

  get choice() {
    return this.categoryFormGroup.get(this.name);
  }

  ngOnInit() {
    this.choiceValue = this.choice.value;
  }

  valueChanged() {
    this.choiceValue = this.choice.value;
    this.dataSetAccumulator[this.prefix + this.name] = {
      input: 'choice',
      value: this.choice.value
    };
  }
}
