
// @2024/03/14 Add by yuchen
// 用於儲存總結所有場域資訊

export interface FieldSummary {
    fieldSummaryInfo: FieldSummaryInfo[];
}
  
export interface FieldSummaryInfo {
    bsNum: number;
    fieldNum: number;
    ueNum: string;
}
