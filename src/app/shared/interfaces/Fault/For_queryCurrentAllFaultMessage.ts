// @2024/06/03 Add
// 描述系統內所有 Fault 的列表
export interface FaultList {
    totalMessageNumber: number;
    faultMessage: FaultMessages_new[];
}
  
export interface FaultMessages_new {
    bsId: string;
    bsName: string;
    fieldName: string;
    compname: string;
    id: string;
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
    processstatus: string | number;
    processresult: string;
}