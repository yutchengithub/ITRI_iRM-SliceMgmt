
export interface NELogsList { 
    logNumber: number;       
    loginfo: NELogsInfo[];             
}

export interface NELogsInfo { 
    userid: string;    
    operation: string;   
    req_data: string;  
    resp_data: string;   
    logtime: string;    
    comp_name: string;
}

// For click View NE Log Detail Page
export interface NELogDetail {
    userid: string;
    operation: string;
    req_data: string;
    resp_data: string;
    logtime: string;
    comp_name: string;
}
