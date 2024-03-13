
export interface UserLogsList {   
    logNumber: number; 
    loginfo: UserLogsInfo[];
}

export interface UserLogsInfo { 
    userid: string;    
    logtype: string;
    loglevel: number;
    logmsg: string; 
    logtime: string;  
}

// For click View User Log Detail Page 
export interface UserLogDetail {
    userid: string;
    logtype: string;
    loglevel: number;
    logtime: string;
    logmsg: string;
}
