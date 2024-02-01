
// @2024/01/16 Add by yuchen
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
    components: {};
    status: number;
    gNBId: number;
    gNBIdLength: number;
    adminstate: number;
    laston: string;
    lastoff: string;

    selected?: boolean; // 用於決定 BS list 每列 BS 對應到的 CheckBox 是否要顯示被選擇或未選擇
}
  