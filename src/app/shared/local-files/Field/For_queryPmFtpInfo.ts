
 // Interfaces of PmFTPInfo @2024/02/04 Add
 import { ForQueryOrUpdatePmFTPInfo } from '../../interfaces/Field/For_queryPmFtpInfo_or_updatePmFtpInfo';                       

 // Local Files for general PmFTPInfo @2024/02/24 Update by yuchen 
 export class localPmFTPInfo {

    // For getQueryPmFtpInfo() Get local queryPmFtpInfo
    pmFtpInfo_local: ForQueryOrUpdatePmFTPInfo[] = [
        {
            "id": "aa520ec8e5074f54b77d",
            "ftpip": "10.0.2.16",
            "ftpid": "k200",
            "ftpkey": "k200123",
            "folderpath": "/home/k200/irm-itri/server/uploadFolder/ftpFolder",
            "pmint": 900,
            "fmint": 900,
            "metric": "RSRP,SINR,RSRQ"
        },
        {
            "id": "aa520ec8e5074f54b78d",
            "ftpip": "10.0.2.17",
            "ftpid": "k200",
            "ftpkey": "k200123",
            "folderpath": "/home/k200/irm-itri/server/uploadFolder/ftpFolder",
            "pmint": 900,
            "fmint": 900,
            "metric": "default"
        },
        {
            "id": "aa520ec8e5074f54b79d",
            "ftpip": "10.0.2.18",
            "ftpid": "k200",
            "ftpkey": "k200123",
            "folderpath": "/home/k200/irm-itri/server/uploadFolder/ftpFolder",
            "pmint": 900,
            "fmint": 900,
            "metric": ""
        }
    ];
}
