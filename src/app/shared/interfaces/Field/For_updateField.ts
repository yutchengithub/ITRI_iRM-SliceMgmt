
// @2024/01/25 Add by yuchen
// 描述單一場域的詳細資訊
export interface ForUpdateField {
    fieldposition1: string;
    fieldposition2: string;
    fieldposition3: string;
    fieldposition4: string;
    name:           string;
    id:             string;
    bsinfo:         Bsinfo[];
    phone:          string;
    session:        string;
}

export interface Bsinfo {
    id: string;
}