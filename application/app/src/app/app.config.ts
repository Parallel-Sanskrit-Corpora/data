import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpService} from './services/http/http.service';
import {Observable, throwError} from 'rxjs/index';

export function initConfig(config: AppConfig) {
  return () => {
    return config.load();
  };
}

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  private config: any = null;

  constructor(private http: HttpService) {

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later: The configuration file is not valid');
  }

  get(key: any) {
    return this.config[key];
  }

  load() {
    return new Promise((resolve, reject) => {
    });
  }
}
