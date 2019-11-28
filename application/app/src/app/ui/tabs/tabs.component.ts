import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';

import {TabComponent} from './tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() changeTab: EventEmitter<any> = new EventEmitter();
  @Input('hideIcons') hideIcons: boolean = false;
  @Input('addClass') addClass: string = '';

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.changeTab.emit(tab);
  }
}
