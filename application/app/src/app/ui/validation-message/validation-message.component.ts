import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {ValidationService} from '../../services/validation/validation.service';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {
  private errors: Array<any> = [];
  @Input('control') control: AbstractControl | any;

  constructor() {
  }

  ngOnInit() {
  }

  get errorMessages() {
    this.errors = [];
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        switch (propertyName) {
          case 'missed':
            break;
          case 'required':
          case 'condition':
            this.errors.push(ValidationService.getValidatorErrorMessage(propertyName, this.control.options));
            break;
          default:
            if (this.control.dirty) {
              this.errors.push(ValidationService.getValidatorErrorMessage(propertyName, this.control.options));
            }
            break;
        }
      }
    }

    return this.errors;
  }
}
