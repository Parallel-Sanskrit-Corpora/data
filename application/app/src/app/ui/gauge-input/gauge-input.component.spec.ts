import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeInputComponent } from './gauge-input.component';

describe('GaugeInputComponent', () => {
  let component: GaugeInputComponent;
  let fixture: ComponentFixture<GaugeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
