import {Injectable} from '@angular/core';
import {HttpService} from '../../../app/services/http/http.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DaoVerseService {

  constructor(private http: HttpService) {
  }

  getVersesByCode(params): any {
    return this.http.get(environment.urls.api + '/verses', params)
      .toPromise()
      .then((verses: any) => {
        return verses.result;
      });
  }

  getVersesByQuery(params): any {
    return this.http.get(environment.urls.api + '/verse/search', params)
      .toPromise()
      .then((verses: any) => {
        return verses.result;
        /*return articles.map(article => {
          return this.convertToVerse();
        });*/
      });
  }

  convertToVerse() {
    return {
    };
  }
}
