import { Injectable } from '@angular/core';
import { Enlanguage } from '../language-models/en-language';
import { TwLanguage } from '../language-models/tw-language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language = 'TW';   // 'EN' | 'TW'
  i18n: any = {};

  constructor() {
    this.getLanguage();
  }

  getLanguage() {
    if (window.sessionStorage.getItem('language')) {
      this.language = window.sessionStorage.getItem('language') as string;
    }
    this.setLanguage();
  }

  setLanguage() {
    window.sessionStorage.setItem('language', this.language);
    if (this.language === 'EN') {
      this.i18n = Enlanguage;
    } else {
      this.i18n = TwLanguage;
    }
  }

  changeI18n(language: string) {
    this.language = language;
    this.setLanguage();
  }

  toggleChange() {
    if (this.language === 'EN') {
      this.changeI18n('EN');
    } else {
      this.changeI18n('TW');
    }
  }


}
