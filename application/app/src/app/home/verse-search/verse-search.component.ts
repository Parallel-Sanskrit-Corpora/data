import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {VerseService} from '../../../data/model/verse/app.data.model.verse-service';

@Component({
  selector: 'app-verse-search',
  templateUrl: './verse-search.component.html',
  styleUrls: ['./verse-search.component.scss']
})
export class VerseSearchComponent implements OnInit, OnChanges {
  @Input('searchMode') searchMode: boolean = false;
  @Input('displayDevanagari') displayDevanagari: boolean = false;

  private placeholders = {
    search: {
      query: 'Введите строку для поиска...',
      number: 'Введите номер для поиска...',
    }
  };

  verses: Array<any> = [];
  queryValue = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  controlPlaceholder: string = this.placeholders.search.query;

  constructor(private verseService: VerseService) {}

  ngOnInit() {
    this.filteredOptions = this.queryValue.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  ngOnChanges(changes) {
    console.log('changes', changes);
  }

  inputChanged() {
    const params: any = {};
    let promise;

    if (this.queryValue.value && this.queryValue.value.length > 0) {
      if (this.searchMode) {
        if (this.queryValue.value && this.queryValue.value.length > 0) {
          params.code = this.queryValue.value;
        }
        promise = this.verseService.getVersesByCode(params);
      } else {
        if (this.queryValue.value && this.queryValue.value.length > 0) {
          params.query = this.queryValue.value;
        }

        promise = this.verseService.getVersesByQuery(params);
      }

      promise.then((verses) => {
        this.verses = verses;
      });
    } else {
      this.verses = [];
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
