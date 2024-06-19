// @2024/06/19 Add
// 描述指定告警資訊內所有 "處理狀況" 的歷史列表
  export interface FaultProcessList {
    FaultAlarmProcess: FaultAlarmProcess[];
  }
  
  export interface FaultAlarmProcess {
    id: string;
    createtime: string;
    processstatus: number;
    processresult: string;
  }