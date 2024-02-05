
// 用於儲存多個場域資訊的列表 @2024/02/03 Update
// Interfaces of FieldList
export interface FieldList {
    fields: Field[];
}

// 用於儲存一個場域的資訊 @2024/02/03 Update
export interface Field {
    id: string;
    name: string;
    phone: string;
    fieldposition1: string;
    fieldposition2: string;
    fieldposition3: string;
    fieldposition4: string;
    bsinfo: Bsinfo[];
    bsNum: number;
    ueNum: string;
    coverage: string;
    accessibility: string;
    availability: string;
    mobility: string;
    retainability: string;
    energy: string;
    integrity: Integrity;
    utilization: Utilization;
    alarmCriticalNum: number;
    alarmMajorNum: number;
    alarmMinorNum: number;
    alarmWarningNum: number;
}

// @2024/01/29 Add
export interface Bsinfo {
    id: string;
    name: string;
}

// @2024/01/29 Add
export interface Integrity {
    downlinkDelay: string;
    uplinkDelay: string;
    downlinkThrouthput: string;
    uplinkThrouthput: string;
}

// @2024/01/29 Add
export interface Utilization {
    pdu: string;
    resourceProcess: string;
    resourceMemory: string;
    resourceDisk: string;
    maxPdu: string;
}
