import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwiperConfigInterface, SwiperModule, SWIPER_CONFIG} from 'ngx-swiper-wrapper';
import {RouterModule} from '@angular/router';
import {SpinnerComponent} from './spinner/spinner.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {GaugeComponent} from './gauge/gauge.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {HelpButtonComponent} from './help-button/help-button.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  slidesPerView: 1
};
@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule,
    NgxSpinnerModule,
    LazyLoadImageModule
  ],
  declarations: [
    SpinnerComponent,
    GaugeComponent,
    HelpButtonComponent
  ],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
  exports: [
    SpinnerComponent,
    GaugeComponent,
    HelpButtonComponent
  ]
})

export class ComponentModule {
}
