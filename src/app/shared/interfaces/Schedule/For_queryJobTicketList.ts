  
// @2024/03/15 Add
// 用於儲存排程列表 
export interface ScheduleList {
    jobticket: Schedule[];
}

// @2024/03/15 Add
// 用於儲存單一排程概要資訊
export interface Schedule {
    id: string;
    fieldid: string;
    tickettype: string;
    ticketstatus: string;
    executedtype: string;
    executedtime: string;
    jobticket: string;
    ticketresult: string;
}
