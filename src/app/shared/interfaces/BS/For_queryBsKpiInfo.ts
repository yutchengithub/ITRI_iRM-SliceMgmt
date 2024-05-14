
// @2024/05/14 Add for get queryBsKpiInfo
// BsKpiInfo 介面，將索引簽名用於數組或對象，其中包含多個 TimeBlock 元素
export interface BsKpiInfo {
    [index: number]: TimeBlock;
}

// 表示單個時間塊的數據，包括起始結束時間、場域及基站數據
export interface TimeBlock {
    start: string;       // 時間塊開始時間
      end: string;       // 時間塊結束時間
    field: Field;        // 包含特定場域相關訊息的 Field 對象
       bs: Bs_KpiInfo[]; // 基站數組，每個基站包括多個特定數據點
}

// 表示場域相關的數據點
export interface Field {
    accessibility: null | string; // 訪問性能評分，可能為 null
     availability: null | string; // 可用性評分，可能為 null
         mobility: null | string; // 移動性能評分，可能為 null
    retainability: null | number; // 保留性質量，可能為 null
           energy: null | string; // 能耗數據，可能為 null
      utilization: Utilization;   // 利用率相關數據
        integrity: Integrity;     // 完整性指標
}

// 表示一個基站的詳細資訊
export interface Bs_KpiInfo {
               id: string;        // 基站的唯一識別 ID
           compId: string;        // 網元 ID
             name: string;        // 基站名稱
    accessibility: null | string; // 基站訪問性評分
     availability: null | string; // 基站可用性評分
         mobility: null | string; // 基站行動性能評分
           energy: null | string; // 基站耗能
        integrity: Integrity;     // 基站完整性指標
      utilization: Utilization;   // 基站利用率數據
    retainability: null | string; // 基站保留性質量
     cellInfoList: CellInfo[];    // 基站內的 Cell 訊息列表
}

// 表示單個 Cell 的資訊
export interface CellInfo {
           cellId: string;      // Cell 的唯一識別ID
    accessibility: string;      // Cell 訪問性評分
     availability: string;      // Cell 可用性評分
         mobility: string;      // Cell 移動性能評分
    retainability: string;      // Cell 保留性質量
      utilization: Utilization; // Cell 利用率數據
           energy: string;      // Cell 能耗
        integrity: Integrity;   // Cell 完整性指標
}

// 利用率相關數據
export interface Utilization {
                pdu: string; // 功率分配單元
             maxPdu: string; // 最大功率分配單元
    resourceProcess: string; // 處理資源利用率
     resourceMemory: string; // 內存資源利用率
       resourceDisk: string; // 磁碟資源利用率
}

// 完整性指標
export interface Integrity {
         downlinkDelay: string; // 下行延遲
           uplinkDelay: string; // 上行延遲
    downlinkThrouthput: string; // 下行吞吐量
      uplinkThrouthput: string; // 上行吞吐量
}
