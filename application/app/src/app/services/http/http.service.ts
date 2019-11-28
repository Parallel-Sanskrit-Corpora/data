import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient) {
  }

  createAuthorizationHeader() {
    const headers = {};

    return new HttpHeaders(headers);
  }

  get(url, params = {}) {
    return this.http.get(url, {
      headers: this.createAuthorizationHeader(),
      params
    });
  }

  post(url, data) {
    return this.http.post(url, data, {
      headers: this.createAuthorizationHeader()
    });
  }

  put(url, data) {
    return this.http.put(url, data, {
      headers: this.createAuthorizationHeader()
    });
  }

  delete(url) {
    return this.http.delete(url, {
      headers: this.createAuthorizationHeader()
    });
  }
}
