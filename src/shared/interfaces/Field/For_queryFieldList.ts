
// @2024/01/29 Add
// Interfaces of FieldList
export interface FieldList {
    fields: Fields[];
}

// @2024/01/29 Add
export interface Fields {
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
