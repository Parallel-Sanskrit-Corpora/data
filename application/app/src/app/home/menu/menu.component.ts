import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() toggleDevanagari: EventEmitter<any> = new EventEmitter();
  @Output() toggleSearchMode: EventEmitter<any> = new EventEmitter();

  searchMode = new FormControl();
  displayDevanagari = new FormControl();

  constructor() {
  }

  ngOnInit() {
  }

  closeEvent() {
    this.close.emit(null);
  }

  slideChanged(name) {
    switch (name) {
      /*case 'displayDevanagari':
        this.controlPlaceholder = this.displayDevanagari.value ? this.placeholders.search.number : this.placeholders.search.query;
        break;
      case 'searchMode':
        this.controlPlaceholder = this.isSearchNumber.value ? this.placeholders.search.number : this.placeholders.search.query;
        break;*/
      case 'displayDevanagari':
        this.toggleDevanagari.emit(this.displayDevanagari.value);
        break;
      case 'searchMode':
        this.toggleSearchMode.emit(this.searchMode.value);
        break;
      default:
        break;
    }
  }
}
