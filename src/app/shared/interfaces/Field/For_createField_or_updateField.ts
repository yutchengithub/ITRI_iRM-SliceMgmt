
// @2024/01/25 Add @yutchengithub
// 描述單一場域的詳細資訊
export interface ForCreateOrUpdateField {
    fieldposition1: string;
    fieldposition2: string;
    fieldposition3: string;
    fieldposition4: string;
    name:           string;
    id?:            string; // 建立場域時不需要攜帶場域 ID ( 因為未建立 )，故設置 "?" 表可存在或不存在 @yutchengithub - 2024/02/02 Add 
    bsinfo:         Bsinfo[];
    phone:          string;
    session:        string;
}

export interface Bsinfo {
    id: string;
}
