import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from './services/notification/notification.service';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {NotificationsComponent} from './notifications/notifications.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MenuComponent,
        MainFooterComponent,
        NotificationsComponent
      ],
      providers: [NotificationService, HttpClient]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
