import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';

export interface style {
  displayName: string;
  value: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  title = 'Dashboard';

  page: 'dashboard' | 'component-management' | 'field-management' | 'bs-management' /* @12/27 Add by yuchen */ | 'fault-management' | 'performance-management' | 'slice-management' /* @2024/05/03 Add by yuchen */ |
   'software-management' | 'schedule-management' /* @11/20 Add by yuchen */ | 'log-management' /* @10/25 Add by yuchen */ | 'account-management' | 'nf-management' = 'dashboard';
  styles: style[] = [
    { displayName: 'Dark Style', value: 'black' },
    { displayName: 'Light Style', value: 'bright' }
  ]
  styleType: string = this.styles[0].value;

  pageRourter = {
    'dashboard': '/main/dashboard',
    'field-management': '/main/field-mgr',
    'bs-management': '/main/bs-mgr',               // @12/27 Add by yuchen
    'component-management': '/main/component-mgr',
    'fault-management': '/main/fault-mgr/All/All',
    'performance-management': '/main/performance-mgr',
    'slice-management': '/main/slice-mgr',         // @2024/05/03 Add by yuchen
    'software-management': '/main/software-mgr',
    'schedule-management': '/main/schedule-mgr',   // @11/20 Add by yuchen
    'log-management': '/main/log-mgr',             // @10/25 Add by yuchen
    'account-management': '/main/account-mgr',
    'nf-management': '/main/nf-mgr'
  }
  userRole: number | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private commonService: CommonService, public languageService: LanguageService) { }

  ngOnInit(): void {

    this.router.events.subscribe( event => {
      if ( event instanceof NavigationEnd ) {

        // router 更新 menu foucs
        this.reloadTitle( event.url );
      }
    });

    this.route.queryParams.subscribe( params => {
      if ( params['role'] ) {
        this.userRole = params['role'];
        console.log( this.userRole );
      }
    });

    // 初始時根據語言加載對應的樣式表 @2024/01/24 Add
    //this.languageService.changeLanguageStylesheet( this.languageService.language );

    // init menu foucs
    this.reloadTitle( this.router.url );

    // init style
    this.initStyle();
  }

  initStyle() {

    const styleType = window.sessionStorage.getItem('styleType');
    if ( styleType ) {
      this.styleType = styleType;
    }
    this.renderStyle();
  }

  changePage( url: string ) {
    this.router.navigate([url]);
  }

  reloadTitle( routerUrl: string ) {
    if ( routerUrl.indexOf('/main/dashboard' ) >= 0 ) {
      this.title = 'Dashboard';
      this.page = 'dashboard';
    } else if ( routerUrl.indexOf('/main/field-mgr') >= 0 ) {
      this.title = 'Field Management';
      this.page = 'field-management';
    } else if ( routerUrl.indexOf('/main/bs-mgr') >= 0 ) {  // @12/27 Add by yuchen
      this.title = 'BS Management';
      this.page = 'bs-management';
    } else if ( routerUrl.indexOf('/main/component-mgr') >= 0 ) {
      this.title = 'Component Management';
      this.page = 'component-management';
    } else if ( routerUrl.indexOf('/main/fault-mgr') >= 0 ) {
      this.title = 'Fault Management';
      this.page = 'fault-management';
    } else if ( routerUrl.indexOf('/main/performance-mgr') >= 0 ) {
      this.title = 'Performance Management';
      this.page = 'performance-management';
    } else if ( routerUrl.indexOf('/main/slice-mgr') >= 0 ) { // @2024/05/03 Add by yuchen
      this.title = 'Slice Management';
      this.page = 'slice-management';
    } else if ( routerUrl.indexOf('/main/software-mgr') >= 0 ) {
      this.title = 'Software Management';
      this.page = 'software-management';
    } else if ( routerUrl.indexOf('/main/schedule-mgr') >= 0 ) { // @11/20 Add by yuchen
      this.title = 'Schedule Management';
      this.page = 'schedule-management';
    } else if ( routerUrl.indexOf('/main/log-mgr') >= 0 ) {      // @10/25 Add by yuchen
      this.title = 'Log Management';
      this.page = 'log-management';
    } else if ( routerUrl.indexOf('/main/account-mgr') >= 0 ) {
      this.title = 'Account Management';
      this.page = 'account-management';
    } else if ( routerUrl.indexOf('/main/nf-mgr') >= 0 ) {
      this.title = 'NF List';
      this.page = 'nf-management';
    }
  }

  logout() {
    this.commonService.removeSessionId();
    this.router.navigate( ['/login'] );
    window.sessionStorage.removeItem('styleType');
  }

  changeStyle( opt: style ) {
    this.styleType = opt.value;
    this.renderStyle();
    document.getElementById('drawColorChange')?.click();
  }

  renderStyle() {

    // 儲存在 sessionStorage
    window.sessionStorage.setItem( 'styleType', this.styleType );
    
    /**
     * 1.clear css
     * 2.id='__[value]'
     */

    this.styles.forEach( ( row ) => {
      const id = `__${row.value}`;
      if ( document.getElementById( id ) ) {
        document.head.removeChild( document.getElementById( id ) as any );
      }
    });

    // add css
    var head: any = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.id = `__${this.styleType}`;
    style.href = `assets/css/${this.styleType}.css`;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.appendChild(style);
  }

  testClearSession() {
    this.commonService.removeSessionId();
    window.location.reload();
  }

  test401Error() {
    window.sessionStorage.setItem('401_error', 'Session ID 已過期，請重新登錄');
    window.sessionStorage.removeItem('sessionId');
    window.location.reload()
  }
}
