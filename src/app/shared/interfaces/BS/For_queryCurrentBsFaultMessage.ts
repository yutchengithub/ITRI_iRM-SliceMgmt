
// @2024/03/31 Add
// 描述記錄 BS 內所有告警資訊列表

export interface CurrentBsFmList {
    totalMessageNumber: number;
    faultMessage: FaultMessage[];
  }
  
  export interface FaultMessage {
         bsId: string;
       bsName: string;
      fieldId: string;
    fieldName: string;
     compname: string;
    timestamp: string;
    compid: string;
     mfgid: string;
     index: number;
     alarmIdentifier: string;
           eventtype: string;
    notificationtype: number;
       probablecause: string;
     specificproblem: string;
    perceivedseverity: string;
    count: number;
    createtime: string;
    modifytime: string;
    id: string;
    processstatus: string;
    processresult: string;
  }