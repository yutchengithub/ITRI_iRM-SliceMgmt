
// @2024/03/21 Update by yuchen
// 描述系統內所有 BS 的列表

export interface BSList {
    basestation: Basestation[];
}

export interface Basestation {
    id: string;
    fieldId?: string;
    fieldName?: string;
    name: string;
    ip: string;
    port: string;
    position: string;
    description: string; // 基站地點說明
    bstype: number;
    components: { [key: string]: any }; // 定義為帶索引簽名的物件,鍵為字符串,值可以是任意類型,用於支援使用字符串索引訪問和修改屬性
    status: number;
    gNBId: number;
    gNBIdLength: number;
    adminstate: number;
    laston: string;
    lastoff: string | null;

    cellCount?: number; // 記錄 cell 數用
    selected?: boolean; // 用於決定 BS list 每列 BS 對應到的 CheckBox 是否要顯示被選擇或未選擇
}
  