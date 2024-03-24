
  // @2024/03/24 Update
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
      ticketinfo: sfUpdateInfo[]     /* tickettype = 0 */ |
                  caReportInfo       /* tickettype = 1 */ |
                  pmReportInfo[]     /* tickettype = 2 */ |
                  sfOrfmReportInfo[] /* tickettype = 3 or 4 */;
    ticketresult: string;
  }

  // @2024/03/24 Update
  // 用於儲存單一排程細項資訊 - 軟體更新 - tickettype = 0
  export interface sfUpdateInfo {
          bscompid: string;
        bscompname: string;
          uploadid: string;
    currentversion: string;
    upgradeversion: string;
        installlog: installLogInfo[];
  }
  
  // @2024/03/24 Add
  // In Software Update ( 軟體更新 ) - tickettype = 0
  export interface installLogInfo {
    Download: string;
     Install: string;
  }

  // @2024/03/24 Update
  // 用於儲存單一排程細項資訊 - 產出配置稽核報表 - tickettype = 1
  export interface caReportInfo {
      fieldsnapshotid: string;
    fieldsnapshotname: string;
  }

  // @2024/03/24 Update
  // 用於儲存單一排程細項資訊 - 產出效能管理報表 - tickettype = 2
  export interface pmReportInfo {
           fieldId: string;
             start: string;
               end: string;
      iscustomized: number;
    customizedkpi?: { [key: string]: kpiInfo }; 
  }

  // @2024/03/24 Add
  // 用於當產出效能管理報表為使用自定義 KPI 時，儲存自定義的 KPI 各項資訊
  export interface kpiInfo {
    describe: string;
         kpi: string;
        name: string;
  }

  // @2024/03/24 Update
  // 用於儲存單一排程細項資訊 - 產出軟體管理報表 或 產出故障管理報表 - tickettype = 3 or 4
  export interface sfOrfmReportInfo {
    fieldId: string;
      start: string;
        end: string;
  }
