
// Interfaces of Log Management @2024/03/14 Add
import { NELogsList } from '../../interfaces/Log/For_queryUserNetconfLog';

// @2024/04/27 Add
// 引入 moment 模組：moment 是一個用於日期和時間處理的庫，非常適合用於解析、驗證、操作和格式化日期。
// 在此項目中，我們使用 moment 來計算從當前日期往回推一個月的時間，這是為了確保在本地模式下能夠得到正確的時間，以對應特定的日誌管理需求。
import * as moment from 'moment';

// @2024/04/27 Add
// 引入 node-schedule 模組：node-schedule 允許在 Node.js 中安排任務，例如定期執行腳本。
// 我們使用它來安排每月自動更新日誌時間的任務，確保在本地模式下，日誌的時間總是從今天算起往回推一個月，以保持日誌的時效性和準確性。
import { scheduleJob } from 'node-schedule';

// Local Files for general NELogsList @2024/04/27 Update 新增定期更新其時間戳
export class localNELogsList {

  /**
   * @2024/04/27 Add
   * 構造函數會在實例化時立即更新日誌時間，並設置定期更新
   * @description
   * - 在類實例化時立即調用 updateLogTimes 方法來隨機更新日誌時間
   * - 使用 node-schedule 排程在每月的第一天午夜自動執行更新，以保持日誌時間的準確性
   */
  constructor() {
    // 立即更新日誌時間
    this.updateLogTimes();
    console.log('Initial NE log times have been updated!');

    // 定期更新日誌時間
    scheduleJob('0 0 1 * *', () => {
        this.updateLogTimes();
        console.log('NE log times have been updated monthly!');
    });
  }

  /**
    * @2024/04/27 Add
    * 隨機更新日誌條目的 logtime 屬性，將其設置為過去一個月內的隨機時間
    * @description
    * - 遍歷 neLogsList_local.loginfo 數組的每個日誌條目
    * - 為每個條目生成一個新的 logtime，該時間是從當前時間往回推的 0 到 30 天的隨機時間
    * - 更新的時間戳確保日誌時間在過去一個月內隨機分布
    */
  updateLogTimes(): void {
    this.neLogsList_local.loginfo.forEach(log => {
        // 獲取當前時間
        let logTime = moment();

        // 生成隨機天數和時間偏移量
        let daysToSubtract = Math.floor(Math.random() * 30);
        let hoursToSubtract = Math.floor(Math.random() * 24);
        let minutesToSubtract = Math.floor(Math.random() * 60);
        let secondsToSubtract = Math.floor(Math.random() * 60);

        // 更新日誌時間
        logTime.subtract(daysToSubtract, 'days')
              .subtract(hoursToSubtract, 'hours')
              .subtract(minutesToSubtract, 'minutes')
              .subtract(secondsToSubtract, 'seconds');
        log.logtime = logTime.format("YYYY-MM-DD HH:mm:ss");
    });

    console.log('NE log times have been updated to random points within the last month.');
  }
  

  neLogsList_local: NELogsList = {

    logNumber: 25,
    loginfo: [
      {
        userid: "k200",             // string
        operation: "get-config",    // string
        // string
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        // string
        resp_data: "<?xml version=\"1.0\" ?>\n<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n\t<software-inventory xmlns=\"urn:itri-software-management\">\n\t\t<software-slot>\n\t\t\t<name>slot-1</name>\n\t\t\t<status>VALID</status>\n\t\t\t<active>true</active>\n\t\t\t<running>true</running>\n\t\t\t<access>READ_ONLY</access>\n\t\t\t<vendor-code>K2</vendor-code>\n\t\t\t<build-id>b01</build-id>\n\t\t\t<build-name>product-default</build-name>\n\t\t\t<build-version>0.1.0</build-version>\n\t\t\t<files>\n\t\t\t\t<name>file-1</name>\n\t\t\t\t<version>0.2.3</version>\n\t\t\t\t<local-path>~/some_dir/</local-path>\n\t\t\t\t<integrity>OK</integrity>\n\t\t\t</files>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-2</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-3</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-4</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t</software-inventory>\n</data>\n",
        logtime: "2024-03-04 13:59:46",   // string
        comp_name: "itri_10.0.2.17"       // string @11/22 Add 
      },
      {              
        userid: "k300",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?>\n<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">",
        logtime: "2024-03-04 17:44:19",   // string
        comp_name: "itri_10.0.2.17"       // string @11/22 Add 
      },
      { 
        userid: "k200",
        operation: "get-config",
        req_data: "",
        resp_data: "<?xml version=\"1.0\" ?>\n<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n\t<software-inventory xmlns=\"urn:o-ran:software-management:1.0\">\n\t\t<software-slot>\n\t\t\t<name>slot-1</name>\n\t\t\t<status>VALID</status>\n\t\t\t<active>true</active>\n\t\t\t<running>true</running>\n\t\t\t<access>READ_ONLY</access>\n\t\t\t<vendor-code>K2</vendor-code>\n\t\t\t<build-id>b01</build-id>\n\t\t\t<build-name>product-default</build-name>\n\t\t\t<build-version>0.1.0</build-version>\n\t\t\t<files>\n\t\t\t\t<name>file-1</name>\n\t\t\t\t<version>0.2.3</version>\n\t\t\t\t<local-path>~/some_dir/</local-path>\n\t\t\t\t<integrity>OK</integrity>\n\t\t\t</files>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-2</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-3</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-4</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t</software-inventory>\n</data>\n",
        logtime: "2024-03-04 17:21:04",         // string
        comp_name: "itri_10.0.2.17"  // string @11/22 Add 
      },
      {
        userid: "k100",
        operation: "edit-config",
        req_data: "<config> <SMO xmlns=\"urn:rdns:com:itri:nr-smo:1.0\"> <ftpip>10.0.2.16</ftpip> <ftpid>k200</ftpid> <ftpkey>k200123</ftpkey> <ftppath>/home/k200/irm-itri/server/uploadFolder/ftpFolder/46a315326d5b4ac2a3a7</ftppath> <file-upload-interval>60</file-upload-interval> </SMO> </config>",
        resp_data: "1",
        logtime: "2024-02-29 17:10:23.979271",   // string
        comp_name: "itri_10.0.2.17"   // string @11/22 Add 
      },
      {
        userid: "k200",
        operation: "edit-config",
        req_data: "<config> <SMO xmlns=\"urn:rdns:com:itri:nr-smo:1.0\"> <ftpip>10.0.2.16</ftpip> <ftpid>k200</ftpid> <ftpkey>k200123</ftpkey> <ftppath>/home/k200/irm-itri/server/uploadFolder/ftpFolder/635778a42e854c17a4c2</ftppath> <file-upload-interval>60</file-upload-interval> </SMO> </config>",
        resp_data: "1",
        logtime: "2024-02-29 17:10:22.793374",  // string
        comp_name: "itri_10.0.2.16"  // string @11/22 Add 
      },
      {
        userid: "k200",
        operation: "edit-config",
        req_data: "<config> <SMO xmlns=\"urn:rdns:com:itri:nr-smo:1.0\"> <ftpip>10.0.2.16</ftpip> <ftpid>k200</ftpid> <ftpkey>k200123</ftpkey> <ftppath>/home/k200/irm-itri/server/uploadFolder/ftpFolder/614de0d30d1845129f02</ftppath> <file-upload-interval>60</file-upload-interval> </SMO> </config>",
        resp_data: "1",
        logtime: "2024-02-29 17:10:21.286927",  // string
        comp_name: "itri_10.0.2.16"  // string @11/22 Add 
      },
      {
        userid: "k000",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\"><GNBCUFunction><id>0</id><NRCellCU><id>1</id><vsDataContainer><id>0</id><vsData><![CDATA[ <gnbvs xmlns=\"urn:rdns:com:radisys:nr:gnb\"> <gnbCuConfig> <id>0</id> <gnbCellCuVsConfig> <id>0</id> <duId>1</duId> <nRpCI>1</nRpCI> <ueInactivityTimerSec>day30</ueInactivityTimerSec> <eutraConfig> <eutraNeighbourCell> <eutraCellIdentifier>2</eutraCellIdentifier> <MCC>466</MCC> <MNC>66</MNC> <enbIdType>MACRO_ENB_ID</enbIdType> <enbId>1</enbId> </eutraNeighbourCell> <eutraQoSConfig> <configIndex>1</configIndex> <qci>1</qci> <snSizeDL>12</snSizeDL> <snSizeUL>12</snSizeUL> <ulDataSplitThresholdInBytes>b100</ulDataSplitThresholdInBytes> <enableUlOutOfOrderDelivery>false</enableUlOutOfOrderDelivery> <rlcMode>RLC_UM</rlcMode> <rlcUmDir>RLC_UM_DIR_BIDIRECTIONAL</rlcUmDir> <reorderingTimerMs>500</reorderingTimerMs> </eutraQoSConfig> </eutraConfig> <nrConfig> <NRNeighbourCell> <nrCellIdentifier>000004108</nrCellIdentifier> <nrPci>100</nrPci> <MCC>466</MCC> <MNC>55</MNC> <nrModeTdd> <TDDInfo> <nrArfcn>0</nrArfcn> </TDDInfo> </nrModeTdd> <nrArfcn>4850</nrArfcn> <TAC>111111</TAC> </NRNeighbourCell> <NRNeighbourCell> <nrCellIdentifier>000050108</nrCellIdentifier> <nrPci>160</nrPci> <MCC>466</MCC> <MNC>55</MNC> <nrModeTdd> <TDDInfo> <nrArfcn>0</nrArfcn> </TDDInfo> </nrModeTdd> <nrArfcn>4850</nrArfcn> <TAC>111111</TAC> </NRNeighbourCell> </nrConfig> <ueCapabilityTriggerAfterSMCProc>true</ueCapabilityTriggerAfterSMCProc> </gnbCellCuVsConfig> </gnbCuConfig> </gnbvs> ]]></vsData></vsDataContainer></NRCellCU></GNBCUFunction></ME></config>",
        resp_data: "1",
        logtime: "2024-02-29 17:08:08.866697",  // string
        comp_name: "itri_10.0.2.18"  // string @11/22 Add 
      },
      {
        userid: "k200",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>false</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>VALID</status> <active>true</active> <running>false</running> <access>READ_WRITE</access> <vendor-code>WN</vendor-code> <build-id>1</build-id> <build-name>WNC-official-build</build-name> <build-version>1-0-0</build-version> <files> <name>fw-v1-0-0.bin</name> <version>1.0.0</version> <local-path>/sw_inventory/slot_3/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2024-03-01 17:15:31.669459",  // string
        comp_name: "itri_10.0.2.19"  // string @11/22 Add 
      },
      {
        userid: "k200",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>true</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2024-03-01 17:15:11.961997",  // string
        comp_name: "itri_10.0.2.19"  // string @11/22 Add 
      },
      {
        userid: "k100",
        operation: "get-config",
        req_data: "<ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\"></ME>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"/>",
        logtime: "2024-03-01 17:10:36.391256",  // string
        comp_name: "itri_10.0.2.18"  // string @11/22 Add 
      },
      {
        userid: "k200",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>true</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2024-03-01 17:09:41.933556",  // string
        comp_name: "itri_10.0.2.15"  // string @11/22 Add 
      },
      {
        userid: "k100",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\" ><GNBDUFunction><id>0</id><NRCellDU><id>0</id><bWP>1</bWP></NRCellDU></GNBDUFunction></ME></config>",
        resp_data: "1",
        logtime: "2024-03-05 17:03:27.174804",  // string
        comp_name: "itri_10.0.2.15"  // string @11/22 Add 
      },
      {
        userid: "k000",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\" ><GNBDUFunction><id>0</id><NRCellDU><id>0</id><NRSectorCarrier>0</NRSectorCarrier></NRCellDU></GNBDUFunction></ME></config>",
        resp_data: "1",
        logtime: "2024-03-05 17:03:25.265801",  // string
        comp_name: "itri_10.0.2.19"  // string @11/22 Add 
      },
      {
        userid: "k300",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\" ><GNBCUFunction><id>0</id><NRCellCU><id>0</id><s-NSSAI>0</s-NSSAI></NRCellCU></GNBCUFunction></ME></config>",
        resp_data: "1",
        logtime: "2024-03-05 17:02:15.773772",  // string
        comp_name: "itri_10.0.2.19"  // string @11/22 Add 
      },
      {
        userid: "k100",
        operation: "get-config",
        req_data: "",
        resp_data: "<active-alarm-list xmlns=\"urn:o-ran:fm:1.0\"> <active-alarms> <fault-id>1</fault-id> <fault-source>fault-source_1</fault-source> <affected-objects> <name>affected-objects_1-1</name> </affected-objects> <affected-objects> <name>affected-objects_1-2</name> </affected-objects> <fault-severity>MAJOR</fault-severity> <is-cleared>false</is-cleared> <fault-text>fault-text_1</fault-text> <event-time>2020-01-01T00:00:00Z</event-time> </active-alarms> <active-alarms> <fault-id>2</fault-id> <fault-source>fault-source_2</fault-source> <affected-objects> <name>affected-objects_2-1</name> </affected-objects> <affected-objects> <name>affected-objects_2-2</name> </affected-objects> <fault-severity>MINOR</fault-severity> <is-cleared>false</is-cleared> <fault-text>fault-text_2</fault-text> <event-time>2020-01-11T00:00:00Z</event-time> </active-alarms> <active-alarms> <fault-id>3</fault-id> <fault-source>fault-source_3</fault-source> <affected-objects> <name>affected-objects_3-1</name> </affected-objects> <affected-objects> <name>affected-objects_3-2</name> </affected-objects> <fault-severity>CRITICAL</fault-severity> <is-cleared>false</is-cleared> <fault-text>fault-text_3</fault-text> <event-time>2020-01-01T00:00:00Z</event-time> </active-alarms> </active-alarm-list>",
        logtime: "2024-03-06 17:03:04.549773",  // string
        comp_name: "itri_10.0.2.20"  // string @11/22 Add 
      },     
      {
        userid: "k200",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>true</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2024-03-06 17:09:41.933556",  // string
        comp_name: "itri_10.0.2.15"  // string @11/22 Add 
      },
      {
        userid: "k100",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\" ><GNBDUFunction><id>0</id><NRCellDU><id>0</id><bWP>1</bWP></NRCellDU></GNBDUFunction></ME></config>",
        resp_data: "1",
        logtime: "2024-02-18 17:00:27.174804",  // string
        comp_name: "itri_10.0.2.10"  // string @11/22 Add 
      },
      {
        userid: "k000",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\" ><GNBDUFunction><id>0</id><NRCellDU><id>0</id><NRSectorCarrier>0</NRSectorCarrier></NRCellDU></GNBDUFunction></ME></config>",
        resp_data: "1",
        logtime: "2024-03-02 16:03:25.265801",  // string
        comp_name: "itri_10.0.2.12"  // string @11/22 Add 
      },      
      {
        userid: "k000",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\"><GNBCUFunction><id>0</id><NRCellCU><id>1</id><vsDataContainer><id>0</id><vsData><![CDATA[ <gnbvs xmlns=\"urn:rdns:com:radisys:nr:gnb\"> <gnbCuConfig> <id>0</id> <gnbCellCuVsConfig> <id>0</id> <duId>1</duId> <nRpCI>1</nRpCI> <ueInactivityTimerSec>day30</ueInactivityTimerSec> <eutraConfig> <eutraNeighbourCell> <eutraCellIdentifier>2</eutraCellIdentifier> <MCC>466</MCC> <MNC>66</MNC> <enbIdType>MACRO_ENB_ID</enbIdType> <enbId>1</enbId> </eutraNeighbourCell> <eutraQoSConfig> <configIndex>1</configIndex> <qci>1</qci> <snSizeDL>12</snSizeDL> <snSizeUL>12</snSizeUL> <ulDataSplitThresholdInBytes>b100</ulDataSplitThresholdInBytes> <enableUlOutOfOrderDelivery>false</enableUlOutOfOrderDelivery> <rlcMode>RLC_UM</rlcMode> <rlcUmDir>RLC_UM_DIR_BIDIRECTIONAL</rlcUmDir> <reorderingTimerMs>500</reorderingTimerMs> </eutraQoSConfig> </eutraConfig> <nrConfig> <NRNeighbourCell> <nrCellIdentifier>000004108</nrCellIdentifier> <nrPci>100</nrPci> <MCC>466</MCC> <MNC>55</MNC> <nrModeTdd> <TDDInfo> <nrArfcn>0</nrArfcn> </TDDInfo> </nrModeTdd> <nrArfcn>4850</nrArfcn> <TAC>111111</TAC> </NRNeighbourCell> <NRNeighbourCell> <nrCellIdentifier>000050108</nrCellIdentifier> <nrPci>160</nrPci> <MCC>466</MCC> <MNC>55</MNC> <nrModeTdd> <TDDInfo> <nrArfcn>0</nrArfcn> </TDDInfo> </nrModeTdd> <nrArfcn>4850</nrArfcn> <TAC>111111</TAC> </NRNeighbourCell> </nrConfig> <ueCapabilityTriggerAfterSMCProc>true</ueCapabilityTriggerAfterSMCProc> </gnbCellCuVsConfig> </gnbCuConfig> </gnbvs> ]]></vsData></vsDataContainer></NRCellCU></GNBCUFunction></ME></config>",
        resp_data: "1",
        logtime: "2024-03-03 17:08:08.866697",  // string
        comp_name: "itri_10.0.2.18"  // string @11/22 Add 
      },
      {
        userid: "k200",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>false</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>VALID</status> <active>true</active> <running>false</running> <access>READ_WRITE</access> <vendor-code>WN</vendor-code> <build-id>1</build-id> <build-name>WNC-official-build</build-name> <build-version>1-0-0</build-version> <files> <name>fw-v1-0-0.bin</name> <version>1.0.0</version> <local-path>/sw_inventory/slot_3/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2024-02-20 19:15:31.669459",  // string
        comp_name: "itri_10.0.2.33"  // string @11/22 Add 
      },
      {
        userid: "k100",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>true</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2024-02-24 17:15:11.961997",  // string
        comp_name: "itri_10.0.2.12"  // string @11/22 Add 
      },
      {
        userid: "k000",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\" ><GNBDUFunction><id>0</id><NRCellDU><id>0</id><NRSectorCarrier>0</NRSectorCarrier></NRCellDU></GNBDUFunction></ME></config>",
        resp_data: "1",
        logtime: "2024-03-10 16:03:25.265801",  // string
        comp_name: "itri_10.0.2.12"  // string @11/22 Add 
      },      
      {
        userid: "k000",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\"><GNBCUFunction><id>0</id><NRCellCU><id>1</id><vsDataContainer><id>0</id><vsData><![CDATA[ <gnbvs xmlns=\"urn:rdns:com:radisys:nr:gnb\"> <gnbCuConfig> <id>0</id> <gnbCellCuVsConfig> <id>0</id> <duId>1</duId> <nRpCI>1</nRpCI> <ueInactivityTimerSec>day30</ueInactivityTimerSec> <eutraConfig> <eutraNeighbourCell> <eutraCellIdentifier>2</eutraCellIdentifier> <MCC>466</MCC> <MNC>66</MNC> <enbIdType>MACRO_ENB_ID</enbIdType> <enbId>1</enbId> </eutraNeighbourCell> <eutraQoSConfig> <configIndex>1</configIndex> <qci>1</qci> <snSizeDL>12</snSizeDL> <snSizeUL>12</snSizeUL> <ulDataSplitThresholdInBytes>b100</ulDataSplitThresholdInBytes> <enableUlOutOfOrderDelivery>false</enableUlOutOfOrderDelivery> <rlcMode>RLC_UM</rlcMode> <rlcUmDir>RLC_UM_DIR_BIDIRECTIONAL</rlcUmDir> <reorderingTimerMs>500</reorderingTimerMs> </eutraQoSConfig> </eutraConfig> <nrConfig> <NRNeighbourCell> <nrCellIdentifier>000004108</nrCellIdentifier> <nrPci>100</nrPci> <MCC>466</MCC> <MNC>55</MNC> <nrModeTdd> <TDDInfo> <nrArfcn>0</nrArfcn> </TDDInfo> </nrModeTdd> <nrArfcn>4850</nrArfcn> <TAC>111111</TAC> </NRNeighbourCell> <NRNeighbourCell> <nrCellIdentifier>000050108</nrCellIdentifier> <nrPci>160</nrPci> <MCC>466</MCC> <MNC>55</MNC> <nrModeTdd> <TDDInfo> <nrArfcn>0</nrArfcn> </TDDInfo> </nrModeTdd> <nrArfcn>4850</nrArfcn> <TAC>111111</TAC> </NRNeighbourCell> </nrConfig> <ueCapabilityTriggerAfterSMCProc>true</ueCapabilityTriggerAfterSMCProc> </gnbCellCuVsConfig> </gnbCuConfig> </gnbvs> ]]></vsData></vsDataContainer></NRCellCU></GNBCUFunction></ME></config>",
        resp_data: "1",
        logtime: "2024-03-11 17:08:08.866697",  // string
        comp_name: "cu9"  // string @11/22 Add 
      },
      {
        userid: "k200",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>false</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>VALID</status> <active>true</active> <running>false</running> <access>READ_WRITE</access> <vendor-code>WN</vendor-code> <build-id>1</build-id> <build-name>WNC-official-build</build-name> <build-version>1-0-0</build-version> <files> <name>fw-v1-0-0.bin</name> <version>1.0.0</version> <local-path>/sw_inventory/slot_3/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2024-03-12 19:15:31.669459",  // string
        comp_name: "du9"  // string @11/22 Add 
      },
      {
        userid: "k100",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>true</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2024-03-14 17:15:11.961997",  // string
        comp_name: "du9-2"  // string @11/22 Add 
      }
    ]
  };

}
