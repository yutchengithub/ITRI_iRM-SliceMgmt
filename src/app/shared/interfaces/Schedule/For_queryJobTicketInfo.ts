
// @2024/03/15 Add
// 用於儲存排程資訊
export interface ScheduleInfo {
    id: string;
    fieldid: string;
    fieldname: string;
    tickettype: string;
    ticketstatus: string;
    executedtype: string;
    executedtime: string;
    jobticket: string;
    ticketinfo: Ticketinfo[] | Ticketinfo2[] | Ticketinfo3[] | Ticketinfo4;
    ticketresult: string;
  }

  // @2024/03/15 Add
  // 用於儲存單一排程細項資訊 - type 4 
  export interface Ticketinfo4 {
    fieldsnapshotid: string;
    fieldsnapshotname: string;
  }

  // @2024/03/15 Add
  // 用於儲存單一排程細項資訊 - type 3
  export interface Ticketinfo3 {
    fieldId: string;
    start: string;
    end: string;
    iscustomized: number;
  }

  // @2024/03/15 Add
  // 用於儲存單一排程細項資訊 - type 2
  export interface Ticketinfo2 {
    bscompid: string;
    bscompname: string;
    uploadid: string;
    currentversion: string;
    upgradeversion: string;
  }

  // @2024/03/15 Add
  // 用於儲存單一排程細項資訊 - type 1
  export interface Ticketinfo {
    fieldId: string;
    start: string;
    end: string;
  }
