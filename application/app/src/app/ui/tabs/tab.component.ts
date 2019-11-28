import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `<div class="tab__content tab__content--cat-{{ categoryId }}" *ngIf="active"><ng-content></ng-content></div>`
})
export class TabComponent {
  @Input('label') label: string;
  @Input('icon') icon: string;
  @Input('viewBox') viewBox: string;
  @Input('categoryId') categoryId: string;
  @Input('index') index: number;
  @Input() active = false;
}
