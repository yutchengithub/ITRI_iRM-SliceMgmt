
// @2024/02/04 Add @yutchengithub 
// 取得或更新場域"效能管理參數設定"時用得結構
export interface ForQueryOrUpdatePmFTPInfo {
    ftpip:       string;
    ftpid:       string;
    ftpkey:      string;
    folderpath:  string;
    pmint:       number;
    fmint:       number;
    metric:      string;

    id:          string; // 場域 ID   
    session?:    string; // "更新"場域的效能管理參數時才需攜帶，故設置 "?" 表可存在或不存在
}
