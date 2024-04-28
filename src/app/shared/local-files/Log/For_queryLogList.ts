
// Interfaces of Log Management - queryLogList @2024/03/14 Add
import { UserLogsList } from '../../interfaces/Log/For_queryLogList';

// @2024/04/27 Add
// 引入 moment 模組：moment 是一個用於日期和時間處理的庫，非常適合用於解析、驗證、操作和格式化日期。
// 在此項目中，我們使用 moment 來計算從當前日期往回推一個月的時間，這是為了確保在本地模式下能夠得到正確的時間，以對應特定的日誌管理需求。
import * as moment from 'moment';

// @2024/04/27 Add
// 引入 node-schedule 模組：node-schedule 允許在 Node.js 中安排任務，例如定期執行腳本。
// 我們使用它來安排每月自動更新日誌時間的任務，確保在本地模式下，日誌的時間總是從今天算起往回推一個月，以保持日誌的時效性和準確性。
import { scheduleJob } from 'node-schedule';

// Local Files for general UserLogsList @2024/04/27 Update 新增定期更新其時間戳
export class localUserLogsList {

  /**
   * @2024/04/27 Add
   * 啟動時立即更新日誌時間並設定每月自動更新的排程
   * @constructor
   * @description
   * - 在類實例化時立即調用 updateLogTimes 方法來更新日誌時間
   * - 使用 node-schedule 排程在每月的第一天午夜自動更新日誌時間
   * - 這確保了日誌時間在應用啟動時和每月都保持最新
   */
   constructor() {
    // Immediately update log times on startup
    this.updateLogTimes();
    console.log('Initial log times have been updated!');

    // Schedule to update log times on the first day of every month at midnight
    scheduleJob('0 0 1 * *', () => {
        this.updateLogTimes();
        console.log('Log times have been updated monthly!');
    });
  }

  /**
  * @2024/04/27 Update
  * 更新本地日誌檔案中的 logtime 至過去一個月內的隨機時間點
  * @function updateLogTimes
  * @description
  * - 遍歷 userLogsList_local.loginfo 中的每條日誌記錄
  * - 為每條日誌記錄生成一個隨機時間，該時間是從當前時間往回推的 0 到 30 天內
  * - 這樣可以讓每條日誌的時間都是過去一個月內的隨機時間點，而不是集中在同一天
  * - 使用 moment.js 來處理日期時間的生成和格式化
  */
  updateLogTimes(): void {
    this.userLogsList_local.loginfo.forEach(log => {
        // 從當前時間開始
        let logTime = moment();

        // 隨機選擇從 0 到 30 天的時間
        let daysToSubtract = Math.floor(Math.random() * 30);
        let hoursToSubtract = Math.floor(Math.random() * 24);
        let minutesToSubtract = Math.floor(Math.random() * 60);
        let secondsToSubtract = Math.floor(Math.random() * 60);

        // 往回推算隨機天數、小時、分鐘、秒數
        logTime = logTime.subtract(daysToSubtract, 'days');
        logTime = logTime.subtract(hoursToSubtract, 'hours');
        logTime = logTime.subtract(minutesToSubtract, 'minutes');
        logTime = logTime.subtract(secondsToSubtract, 'seconds');

        // 更新 logtime 為隨機生成的過去時間
        log.logtime = logTime.format("YYYY-MM-DD HH:mm:ss");
    });

    console.log('所有日誌時間已經更新為一個月內的隨機時間點。');
  }


  userLogsList_local: UserLogsList = {
  
    logNumber: 25,  // number
    loginfo: [
      {
        userid: "k200",   // string
        logtype: "POST",  // string
        loglevel: 20,     // number
        logmsg: "k200 login success session: irm_session_0309079f",  // string
        logtime: "2024-02-14 13:59:46"  // string
      },
      {
        userid: "k300",
        logtype: "GET",
        loglevel: 20,
        logmsg: "queryUploadFileList success field Id: k300",
        logtime: "2024-02-27 17:44:19"
      },
      {
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 queryJobTicketList success",
        logtime: "2024-02-29 17:21:04"
      },
      {
        userid: "k100",
        logtype: "GET",
        loglevel: 20,
        logmsg: "QueryBsList success field Id: k200",
        logtime: "2024-02-16 16:48:34"
      },
      {
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 QueryBsComponentList Success",
        logtime: "2024-02-19 16:48:34"
      },
      {
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 queryFieldList success",
        logtime: "2024-03-06 16:48:34"
      },
      {
        userid: "k000",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k000 queryFieldList success",
        logtime: "2024-03-01 16:40:37"
      },
      {
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "queryUploadFileList success field Id: k200",
        logtime: "2024-03-03 16:48:38"
      },
      {
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 queryJobTicketList success",
        logtime: "2024-02-21 14:48:39"
      },
      {
        userid: "k100",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k100 QueryBsComponentList Success",
        logtime: "2024-02-23 16:48:47"
      },
      {
        userid: "k200",
        logtype: "DELETE",
        loglevel: 20,
        logmsg: "RemoveField success field Id: 1a933410af39457eb2c8",
        logtime: "2024-02-23 16:35:52"
      },
      {
        userid: "k100",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k100 queryFieldList success",
        logtime: "2024-03-03 16:35:53"
      },
      {
        userid: "k000",
        logtype: "GET",
        loglevel: 20,
        logmsg: "QueryBsList success field Id: k000",
        logtime: "2024-02-29 16:35:54"
      },
      {
        userid: "k300",
        logtype: "DELETE",
        loglevel: 20,
        logmsg: "RemoveBs success Id: k300",
        logtime: "2024-02-29 16:35:59"
      },
      {
        userid: "k100",
        logtype: "POST",
        loglevel: 20,
        logmsg: "queryUploadFileList success field Id: k100",
        logtime: "2024-03-04 16:40:19"
      },      
      {
        userid: "k000",
        logtype: "GET",
        loglevel: 20,
        logmsg: "queryUploadFileList success field Id: k000",
        logtime: "2024-03-04 17:2:19"
      },
      {
        userid: "k100",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k100 queryJobTicketList success",
        logtime: "2024-03-04 18:19:04"
      },      
      {
        userid: "k000",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k000 queryFieldList success",
        logtime: "2024-03-04 13:48:37"
      },
      {
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "queryUploadFileList success field Id: k200",
        logtime: "2024-02-20 13:48:38"
      },
      {
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 queryJobTicketList success",
        logtime: "2024-02-19 21:48:39"
      },
      {
        userid: "k000",
        logtype: "GET",
        loglevel: 20,
        logmsg: "queryUploadFileList success field Id: k000",
        logtime: "2024-03-04 17:2:19"
      },
      {
        userid: "k100",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k100 queryJobTicketList success",
        logtime: "2024-03-10 18:19:04"
      },      
      {
        userid: "k000",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k000 queryFieldList success",
        logtime: "2024-03-14 13:48:37"
      },
      {
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "queryUploadFileList success field Id: k200",
        logtime: "2024-03-02 13:48:38"
      },
      {
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 queryJobTicketList success",
        logtime: "2024-03-05 21:48:39"
      }
    ]
  };

}
