
// @12/05 Add by yuchen
// 描述單一場域的詳細資訊
export interface FieldInfo {
    id: string;
    name: string;
    phone: string;
    fieldposition1: string;
    fieldposition2: string;
    fieldposition3: string;
    fieldposition4: string;
    bsinfo: BsInfo[];
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
  
  // @12/05 Add by yuchen
  // 描述 BS 的資訊
  export interface BsInfo {
    id: string;
    name: string;
    accessibility: string | null;
    mobility: string | null;
    retainability: string | null;
    energy: string | null;
    integrity: Integrity;
    utilization: Utilization;
    cellInfo?: CellInfo[];
  }
  
  // @12/05 Add by yuchen
  // 描述單一 BS 之 Cell 的資訊
  export interface CellInfo {
    nci: string;
    accessibility: string;
    mobility: string;
    retainability: string;
    energy: string;
    integrity: Integrity;
    utilization: Utilization;
  }
  
  // @12/05 Add by yuchen
  // 描述網路整體完整性的資訊
  export interface Integrity {
    downlinkDelay?: string | null;
    uplinkDelay?: string | null;
    downlinkThrouthput?: string | null;
    uplinkThrouthput?: string | null;
  }
  
  // @12/05 Add by yuchen
  // 描述網路使用情況的資訊
  export interface Utilization {
    pdu: string | null;
    resourceProcess: string;
    resourceMemory: string;
    resourceDisk: string | null;
    maxPdu: string | null;
  }
  