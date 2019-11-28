import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxInputComponent } from './checkbox-input.component';

describe('CheckBoxInputComponent', () => {
  let component: CheckBoxInputComponent;
  let fixture: ComponentFixture<CheckBoxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
