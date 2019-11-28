import { TestBed, inject } from '@angular/core/testing';

import { DaoVerseService } from './app.data.dao.verse-service';

describe('DaoVerseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaoVerseService]
    });
  });

  it('should be created', inject([DaoVerseService], (service: DaoVerseService) => {
    expect(service).toBeTruthy();
  }));
});
