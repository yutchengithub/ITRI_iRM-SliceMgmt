/* 
    @2024/05/03 Add
    主要功能是追蹤場域頁面的顯示模式狀態。
    此服務文件的目的是提供一個簡單的方式來追蹤應用中場域資訊頁面的顯示狀態變化。
    它儲存用戶在場域資訊頁面選擇的地圖模式或基站列表模式的狀態，允許應用在任何時刻訪問和修改用戶的顯示偏好。
    這對於根據用戶介面顯示狀態創建特定邏輯或改進用戶體驗（例如，在不同模式間切換或維持狀態）非常有用。
*/

// 引入 Angular 的核心模組中的 Injectable 裝飾器。
import { Injectable } from '@angular/core';

// 定義一個可注入的服務，提供於根模組，使其在整個應用中可用。
@Injectable({
  providedIn: 'root'
})
export class FieldStateService {  // 定義 FieldStateService 類
  
  private _showMapModel: boolean = true;  // 私有屬性 _showMapModel，初始化為 true，表示場域地圖模式的初始顯示狀態
  
  private _directReturnFromBSInfo: boolean = false;  // 新增私有屬性 _directReturnFromBSInfo，追蹤是否直接從基站詳細訊息頁返回

  // 公共的 getter 方法，提供外部獲取 _showMapModel 的值
  get showMapModel(): boolean {
    return this._showMapModel;
  }

  // 公共的 setter 方法，允許外部設置 _showMapModel 的值，更新場域頁面的顯示模式
  set showMapModel(value: boolean) {
    this._showMapModel = value;
  }

  // 公共的 getter 方法，提供外部獲取 _directReturnFromBSInfo 的值
  get directReturnFromBSInfo(): boolean {
    return this._directReturnFromBSInfo;
  }

  // 公共的 setter 方法，允許外部設置 _directReturnFromBSInfo 的值，追蹤基站資訊頁面的返回行為
  set directReturnFromBSInfo( value: boolean ) {
    this._directReturnFromBSInfo = value;
  }
}
