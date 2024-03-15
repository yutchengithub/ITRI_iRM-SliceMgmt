  
// 用於儲存排程列表 @2024/03/15 Add
export interface ScheduleList {
    jobticket: Schedule[];
}

// 用於儲存單一排程資訊 @2024/03/15 Add
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
