import {Injectable} from '@angular/core';

import {DaoVerseService} from '../../dao/verse/app.data.dao.verse-service';

@Injectable({
  providedIn: 'root'
})
export class VerseService {

  constructor(private daoVerseService: DaoVerseService) {
  }

  getVersesByCode(params): any {
    return this.daoVerseService.getVersesByCode(params);
  }

  getVersesByQuery(params): any {
    return this.daoVerseService.getVersesByQuery(params);
  }

  getVerseTranslation(verse): any {
    let verseText = verse.translation[0].text;


    return `[${verse.translation[0].range_value}] ` +  verseText;
  }
}
