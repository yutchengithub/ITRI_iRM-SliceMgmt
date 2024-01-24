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

  // setLanguage() {
  //   window.sessionStorage.setItem('language', this.language);
  //   if (this.language === 'EN') {
  //     this.i18n = Enlanguage;
  //   } else {
  //     this.i18n = TwLanguage;
  //   }
  // }

  // @2024/01/24 Update
  setLanguage() {
    window.sessionStorage.setItem('language', this.language);
    if (this.language === 'EN') {
      this.i18n = Enlanguage;
    } else {
      this.i18n = TwLanguage;
    }
    
    // 當語言變化時，更新樣式表
    this.changeLanguageStylesheet( this.language );
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

  // @2024/01/24 Add
  // 函數: 切換語言樣式表
  changeLanguageStylesheet(language: string) {
    // 在控制台打印當前語言樣式表的訊息
    console.log("The current Language Style is styles." + language.toLowerCase() + ".css");

    // 獲取HTML文檔中的<head>元素
    const head = document.getElementsByTagName('head')[0];
    // 嘗試獲取頁面上已存在的用於語言樣式的<link>元素
    const existingLinkElement = document.getElementById('language-stylesheet') as HTMLLinkElement;

    // 檢查是否已經存在語言樣式的<link>元素
    if (existingLinkElement) {
      // 如果存在，則更新該<link>元素的href屬性，指向新的樣式表文件
      existingLinkElement.href = `assets/css/styles.${language.toLowerCase()}.css`;
    } else {
      // 如果不存在，則創建新的<link>元素
      const linkElement = document.createElement('link');
      // 設置新<link>元素的id，以便將來可以識別和選擇它
      linkElement.id = 'language-stylesheet';
      // 設置<link>元素的rel屬性，表明它是一個樣式表
      linkElement.rel = 'stylesheet';
      // 設置<link>元素的type屬性，表明它的類型是文字/樣式表
      linkElement.type = 'text/css';
      // 設置<link>元素的href屬性，指向對應語言的樣式表文件
      linkElement.href = `assets/css/styles.${language.toLowerCase()}.css`;
      // 將新創建的<link>元素加入到<head>元素中，使其生效
      head.appendChild(linkElement);
    }
  }


}
