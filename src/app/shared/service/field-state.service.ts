/* 
    @2024/05/03 Add
    主要功能是追蹤場域頁面的 showMapModel 顯示模式狀態。
    此服務檔案的功用是提供一個簡單的方式來追蹤應用中場域訊息頁面的顯示狀態變化。
    它存儲了用戶在場域資訊頁面選擇的地圖模式或基站列表模式的狀態，使得應用可以在任何時刻訪問和修改用戶的顯示偏好。
    這對於創建基於用戶界面顯示狀態的特定邏輯或用戶體驗改進（例如，在不同模式間切換或維持狀態）非常有用。
*/

// 引入 Angular 的核心模塊中的 Injectable 裝飾器。
import { Injectable } from '@angular/core';

// 定義一個可注入的服務，提供於根模塊，使其在整個應用中可用。
@Injectable({
  providedIn: 'root'
})
export class FieldStateService {  // 定義一個服務類 FieldStateService
  
  private _showMapModel: boolean = true;  // 私有屬性 _showMapModel，初始化為 true，用來存儲場域地圖模式的顯示狀態
  
  private _directReturnFromBSInfo: boolean = false;  // 新增私有屬性，用於追蹤是否直接從基站詳細訊息頁返回

  // 公共的 getter 方法，用於外部獲取 _showMapModel 的值
  get showMapModel(): boolean {
    return this._showMapModel;
  }

  // 公共的 setter 方法，用於外部設置 _showMapModel 的值
  set showMapModel( value: boolean ) {
    this._showMapModel = value;  // 更新 _showMapModel 的值
  }

  // 公共的 getter 方法，用於外部獲取 _directReturnFromBSInfo 的值
  get directReturnFromBSInfo(): boolean {
    return this._directReturnFromBSInfo;
  }

  // 公共的 setter 方法，用於外部設置 _directReturnFromBSInfo 的值
  set directReturnFromBSInfo( value: boolean ) {
    this._directReturnFromBSInfo = value;
  }
}
