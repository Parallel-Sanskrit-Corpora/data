import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ComponentModule} from '../components/components.module';
import {ProjectMaterialModule} from './../material.module';
import {HomeComponent} from './home.component';
import {HeaderComponent} from './header/header.component';
import {VerseSearchComponent} from './verse-search/verse-search.component';
import {VerseComponent} from './verse/verse.component';
import {MenuComponent} from './menu/menu.component';

import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
import { HighlightSearch } from '../pipes/highlight-search.pipe';

import {
  MatToolbarModule,
  MatDialogModule,
  MatNativeDateModule,
  MatRadioModule,
  MatExpansionModule,
  MatButtonModule,
  MatMenuModule,
  MatSnackBarModule,
  MatIconModule,
  MatSlideToggleModule
} from '@angular/material';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ComponentModule,
    MatToolbarModule,
    MatDialogModule,
    MatNativeDateModule,
    MatRadioModule,
    MatExpansionModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatIconModule,
    MatSlideToggleModule,
    ProjectMaterialModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    VerseSearchComponent,
    MenuComponent,
    EscapeHtmlPipe,
    HighlightSearch,
    VerseComponent
  ]
})

export class HomeModule {
}
