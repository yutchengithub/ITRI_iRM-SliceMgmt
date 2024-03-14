
// Interfaces of Log Management @2024/03/14 Add
import { NELogsList } from '../../interfaces/Log/For_queryUserNetconfLog';

 // Local Files for general NELogsList @2024/03/14 Add 
 export class localNELogsList {

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
