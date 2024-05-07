/* 
    @2024/05/03 Add
    主要功能是追蹤用戶的導航歷史。
    本服務文件提供了一個簡單的方式來監控應用中的路由變化。
    它儲存了用戶的導航歷史，使應用能在任何時刻訪問用戶之前訪問過的路由。
    這對於創建基於導航歷史的特定邏輯或用戶體驗改進（例如“返回”按鈕的行為）非常有用。
*/

// 引入 Angular 的核心模組和相關函數。
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

// 定義一個可注入的服務，提供於根模組，使其在整個應用中可用。
@Injectable({
  providedIn: 'root'
})
export class NavigationService {  // 定義 NavigationService 類
  history: string[] = [];         // 定義一個陣列來儲存導航的 URL 歷史

  // 類的構造函數，注入 Router 來訪問導航事件
  constructor(private router: Router) {
    this.router.events  // 監聽路由事件
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd) // 使用 filter 篩選出只有 NavigationEnd 類型的事件
      )
      .subscribe((event: NavigationEnd) => {       // 訂閱事件流
        this.history.push(event.urlAfterRedirects); // 將導航結束後重定向的 URL 添加到歷史陣列中
      });
  }

  /**
   * @2024/05/03 Add
   * 獲取倒數第二個訪問的 URL
   * @method getPreviousUrl
   * @returns {string} 返回倒數第二個訪問的 URL，如果歷史數據少於兩個，則返回根路徑 '/'
   * @description
   * - 此方法提供從導航歷史中獲取倒數第二個訪問的 URL
   * - 如果導航歷史中的條目少於兩個，則默認返回到根路徑 '/'
   * - 主要用於處理返回操作，特別是在多頁面應用中導航回上一頁時的場景
   */
  getPreviousUrl(): string {
    return this.history.length > 1 ? this.history[this.history.length - 2] : '/';
  }
}
