
// @2024/03/06 Add by yuchen
// 描述指定場域內的 Snapshot 的列表

export interface FieldSnapshotList {
    fieldSnapshot: FieldSnapshot[];
}

export interface FieldSnapshot {
    id:         string;
    fieldid:    string;
    name:       string;
    createtime: string;
    bsamount:   string;
}