
  // @2024/03/21 Update
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
    ticketinfo: Ticketinfo[] | Ticketinfo2[] | Ticketinfo3[] | Ticketinfo4[] | Ticketinfo5;
    ticketresult: string;
  }
  

  // @2024/03/21 Add
  // 用於儲存單一排程細項資訊 - type 5
  export interface Ticketinfo5 {
    fieldsnapshotid: string;
    fieldsnapshotname: string;
  }
  
  // @2024/03/21 Add
  // 用於儲存單一排程細項資訊 - type 4
  export interface Ticketinfo4 {
    fieldId: string;
    start: string;
    end: string;
    iscustomized: number;
  }

  // @2024/03/21 Add
  // 用於儲存單一排程細項資訊 - type 3
  export interface Ticketinfo3 {
    fieldId: string;
    start: string;
    end: string;
    iscustomized: number;
    customizedkpi: { [key: string]: any }; 
  }
  
  // @2024/03/21 Add
  // 用於儲存單一排程細項資訊 - type 2
  export interface Ticketinfo2 {
    fieldId: string;
    start: string;
    end: string;
  }

  // @2024/03/21 Add
  // 用於儲存單一排程細項資訊 - type 1
  export interface Ticketinfo {
    bscompid: string;
    bscompname: string;
    uploadid: string;
    currentversion: string;
    upgradeversion: string;
    installlog: Installlog[];
  }
  
  export interface Installlog {
    Download: string;
    Install: string;
  }
