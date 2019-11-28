import {Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import {VerseService} from '../../../data/model/verse/app.data.model.verse-service';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss']
})
export class VerseComponent implements OnInit, OnChanges {
  @Input('verse') verse: any = {};
  @Input('displayDevanagari') displayDevanagari: boolean = false;
  @Input('search') search: string = '';

  translation: string = '';
  devanagari: Array<string> = [];
  comments: Array<string> = [];
  iast: Array<string> = [];
  volume: number = 0;
  chapter: number = 0;

  constructor(private verseService: VerseService) {}

  ngOnInit() {
    if (this.verse.sanskrit) {
      this.devanagari = this.verse.sanskrit.map((item) => item.devanagari);
      this.iast = this.verse.sanskrit.map((item) => {
        return {iast: item.iast, split_iast: item.oliver_verse.split_iast, parallels: item.parallels};
      });
    }

    if (this.verse.translation[0]) {
      this.volume = this.verse.translation[0].volume;
      this.chapter = this.verse.translation[0].chapter;
      this.translation = this.verseService.getVerseTranslation(this.verse);
    }

    if (this.verse.comments) {
      this.comments = this.verse.comments;
    }
  }

  toggleBlockVisibility(item, name) {
    item[name] = !item[name];
    console.log(name, item[name]);
  }

  ngOnChanges(changes: SimpleChanges) {
  }
}
