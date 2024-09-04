
// Interfaces of ScheduleList @2024/03/15 Add
import { ScheduleList } from './../../interfaces/Schedule/For_queryJobTicketList';    
 
// @2024/04/28 Add
// 引入 moment 模組：moment 是一個用於日期和執行時間處理的庫，非常適合用於解析、驗證、操作和格式化日期。
// 在此項目中，我們使用 moment 來計算從當前日期往回推一個月的執行時間，這是為了確保在本地模式下能夠得到正確的執行時間，以對應特定的 Schedule 管理需求。
import * as moment from 'moment';

// @2024/04/28 Add
// 引入 node-schedule 模組：node-schedule 允許在 Node.js 中安排任務，例如定期執行腳本。
// 我們使用它來安排每月自動更新 Schedule 執行時間的任務，確保在本地模式下， Schedule 的執行時間總是從今天算起往回推一個月，以保持 Schedule 的時效性和準確性。
import { scheduleJob } from 'node-schedule';

 // Local Files for general ScheduleList @2024/03/21 Update
 export class localScheduleList {

    /**
     * @2024/04/28 Add
     * 啟動時立即更新 Schedule 執行時間並設定每月自動更新的排程
     * @constructor
     * @description
     * - 在類實例化時立即調用 updateScheduleRunTimes 方法來更新 Schedule 執行時間
     * - 使用 node-schedule 排程在每月的第一天午夜自動更新 Schedule 執行時間
     * - 這確保了 Schedule 執行時間在應用啟動時和每月都保持最新
     */
      constructor() {
      // Immediately update log times on startup
      this.updateScheduleRunTimes();
      console.log('Initial Scheduled Run Times have been updated!');
  
      // Schedule to update log times on the first day of every month at midnight
      scheduleJob('0 0 1 * *', () => {
          this.updateScheduleRunTimes();
          console.log('Scheduled Run Times have been updated monthly!');
      });
    }
  
    /**
    * @2024/04/28 Add
    * 更新本地 Schedule 檔案中的 executedtime 至過去一個月內的隨機執行時間點
    * @function updateScheduleRunTimes
    * @description
    * - 遍歷 scheduleList_local 中的每條 jobticket.executedtime 記錄
    * - 為每條 Schedule 記錄生成一個隨機執行時間，該執行時間是從當前執行時間往回推的 0 到 30 天內
    * - 這樣可以讓每條 Schedule 的執行時間都是過去一個月內的隨機執行時間點，而不是集中在同一天
    * - 使用 moment.js 來處理執行日期時間的生成和格式化
    */
    updateScheduleRunTimes(): void {
      this.scheduleList_local.jobticket.forEach( schedule => {

          // 從當前執行時間開始
          let executedtime = moment();
  
          // 隨機選擇從 0 到 30 天的執行時間
          let daysToSubtract    = Math.floor( Math.random() * 30 );
          let hoursToSubtract   = Math.floor( Math.random() * 24 );
          let minutesToSubtract = Math.floor( Math.random() * 60 );
          let secondsToSubtract = Math.floor( Math.random() * 60 );
  
          // 往回推算隨機天數、小時、分鐘、秒數
          executedtime = executedtime.subtract( daysToSubtract, 'days' );
          executedtime = executedtime.subtract( hoursToSubtract, 'hours' );
          executedtime = executedtime.subtract( minutesToSubtract, 'minutes' );
          executedtime = executedtime.subtract( secondsToSubtract, 'seconds' );
  
          // 更新 executedtime 為隨機生成的過去執行時間
          schedule.executedtime = executedtime.format("YYYY-MM-DD HH:mm:ss");
      });
  
      console.log('所有 Schedule 執行時間已經更新為一個月內的隨機時間點。');
    }

  // For getQueryJobTicketList() Get local queryJobTicketList
  scheduleList_local: ScheduleList = {
    
      "jobticket": [
        {
          "id": "59d1af12c92344259217",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "1",
          "ticketstatus": "0",
          "executedtype": "3",
          "executedtime": "2024-04-03 05:00:00",
          "jobticket": "0",
          "ticketresult": ""
        },
        {
          "id": "3f69e61845f948fca0c8",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "2",
          "ticketstatus": "0",
          "executedtype": "1",
          "executedtime": "2024-03-22 13:00:00",
          "jobticket": "0",
          "ticketresult": ""
        },
        {
          "id": "7d9834a134bd473faf62",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "4",
          "ticketstatus": "0",
          "executedtype": "2",
          "executedtime": "2024-03-27 05:00:00",
          "jobticket": "0",
          "ticketresult": ""
        },
        {
          "id": "0a43733eeada462090bc",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "4",
          "ticketstatus": "0",
          "executedtype": "1",
          "executedtime": "2024-03-22 10:00:00",
          "jobticket": "0",
          "ticketresult": ""
        },
        {
          "id": "6a8d961f6b9c4f8d9492",
          "fieldid": "e6700d701f8b41f8950e",
          "tickettype": "2",
          "ticketstatus": "2",
          "executedtype": "0",
          "executedtime": "2024-03-23 04:00:00",
          "jobticket": "0",
          "ticketresult": ""
        },
        {
          "id": "0ddc4a5ba62f43bcb3e7",
          "fieldid": "e6700d701f8b41f8950e",
          "tickettype": "2",
          "ticketstatus": "2",
          "executedtype": "0",
          "executedtime": "2024-03-23 03:33:00",
          "jobticket": "0",
          "ticketresult": ""
        },
        {
          "id": "dd9f0d4919164f8d90d8",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "3",
          "ticketstatus": "3",
          "executedtype": "0",
          "executedtime": "2024-03-21 14:00:00",
          "jobticket": "1",
          "ticketresult": "FM_Report_2024-03-01-00-00-00-2024-03-08-00-00-00.xlsx"
        },
        {
          "id": "b771d42a70df4c6ab247",
          "fieldid": "e6700d701f8b41f8950e",
          "tickettype": "0",
          "ticketstatus": "5",
          "executedtype": "0",
          "executedtime": "2024-03-21 13:14:00",
          "jobticket": "1",
          "ticketresult": ""
        },
        {
          "id": "d1a274f2a2e44507ba61",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "2",
          "ticketstatus": "3",
          "executedtype": "0",
          "executedtime": "2024-03-21 13:11:00",
          "jobticket": "1",
          "ticketresult": "PmReportCustomized-2024-03-21-13-12-19.xlsx"
        },
        {
          "id": "86c1dc7773224f60a040",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "2",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-21 13:00:00",
          "jobticket": "1",
          "ticketresult": "PmReport-2024-03-21-13-00-22.xlsx"
        },
        {
          "id": "857118441dbf4255a5a2",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "4",
          "ticketstatus": "4",
          "executedtype": "1",
          "executedtime": "2024-03-21 10:00:00",
          "jobticket": "1",
          "ticketresult": ""
        },
        {
          "id": "072978190052488e8ed7",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "2",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-20 13:00:00",
          "jobticket": "1",
          "ticketresult": "PmReport-2024-03-20-16-51-23.xlsx"
        },
        {
          "id": "3d01156b231f405ab69a",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "4",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-20 10:00:00",
          "jobticket": "1",
          "ticketresult": "SwmReport-2024-03-20-16-51-46.xlsx"
        },
        {
          "id": "b96b98b1a16344de9cfe",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "2",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-19 13:00:00",
          "jobticket": "1",
          "ticketresult": "PmReport-2024-03-20-16-50-24.xlsx"
        },
        {
          "id": "e5e9a7817e4545c8b24b",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "4",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-19 10:00:00",
          "jobticket": "1",
          "ticketresult": "SwmReport-2024-03-20-16-50-50.xlsx"
        },
        {
          "id": "8e984caa71ce497b8600",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "2",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-18 13:00:00",
          "jobticket": "1",
          "ticketresult": "PmReport-2024-03-20-16-49-29.xlsx"
        },
        {
          "id": "2861ef7ef2a24982ae00",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "4",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-18 10:00:00",
          "jobticket": "1",
          "ticketresult": "SwmReport-2024-03-20-16-49-26.xlsx"
        },
        {
          "id": "ce430c58566d40aca51b",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "2",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-17 13:00:00",
          "jobticket": "1",
          "ticketresult": "PmReport-2024-03-20-16-48-32.xlsx"
        },
        {
          "id": "80d7bdf88585460b9967",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "4",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-17 10:00:00",
          "jobticket": "1",
          "ticketresult": "SwmReport-2024-03-20-16-48-23.xlsx"
        },
        {
          "id": "13bd97bb48b14c4ebca1",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "2",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-16 13:00:00",
          "jobticket": "1",
          "ticketresult": "PmReport-2024-03-20-16-47-24.xlsx"
        },
        {
          "id": "d7ff5b400f57488788e1",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "4",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-16 10:00:00",
          "jobticket": "1",
          "ticketresult": "SwmReport-2024-03-20-16-47-49.xlsx"
        },
        {
          "id": "9e75da718d3a4739b517",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "0",
          "ticketstatus": "5",
          "executedtype": "0",
          "executedtime": "2024-03-15 19:00:00",
          "jobticket": "1",
          "ticketresult": ""
        },
        {
          "id": "3fadc30352144dc8a6d4",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "2",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-15 13:00:00",
          "jobticket": "1",
          "ticketresult": "PmReport-2024-03-20-16-01-04.xlsx"
        },
        {
          "id": "7edf1bea0919445eb89d",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "4",
          "ticketstatus": "3",
          "executedtype": "1",
          "executedtime": "2024-03-15 10:00:00",
          "jobticket": "1",
          "ticketresult": "SwmReport-2024-03-20-16-01-29.xlsx"
        },
        {
          "id": "f7259488c98645bebf7e",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "3",
          "ticketstatus": "3",
          "executedtype": "0",
          "executedtime": "2024-03-15 10:00:00",
          "jobticket": "1",
          "ticketresult": "FM_Report_2024-03-01-00-00-00-2024-03-14-15-00-00.xlsx"
        },
        {
          "id": "6fd8e7652a7c4cd6a47e",
          "fieldid": "aa520ec8e5074f54b77d",
          "tickettype": "1",
          "ticketstatus": "4",
          "executedtype": "0",
          "executedtime": "2024-03-15 09:35:00",
          "jobticket": "1",
          "ticketresult": ""
        }
      ]
    }
      

}
