
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
    description: string;
    bstype: number;
    components: {};
    status: number;
    gNBId: number;
    gNBIdLength: number;
    adminstate: number;
    laston: string;
    lastoff: string;
}
  