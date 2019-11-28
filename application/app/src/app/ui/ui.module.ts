import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TabComponent} from './tabs/tab.component';
import {TabsComponent} from './tabs/tabs.component';
import {CheckBoxInputComponent} from './checkbox-input/checkbox-input.component';
import {ChoiceInputComponent} from './choice-input/choice-input.component';
import {GaugeInputComponent} from './gauge-input/gauge-input.component';
import {ValidationMessageComponent} from './validation-message/validation-message.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    TabsComponent,
    TabComponent,
    ChoiceInputComponent,
    CheckBoxInputComponent,
    GaugeInputComponent,
    ValidationMessageComponent
  ],
  exports: [
    TabsComponent,
    TabComponent,
    ChoiceInputComponent,
    CheckBoxInputComponent,
    GaugeInputComponent,
    ValidationMessageComponent
  ]
})
export class UIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIModule,
      providers: []
    };
  }
}
