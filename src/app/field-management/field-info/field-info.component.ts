import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../shared/common.service';
import { SoftwareList } from './../../software-management/software-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SystemSummary } from 'src/app/dashboard/dashboard.component';
import { LanguageService } from 'src/app/shared/service/language.service';
import { ChangeDetectorRef } from '@angular/core';  // @12/13 Add

export interface OcloudInfo {
  id: string;
  name: string;
  imsEndpoint: string;
  softwareVersion: string;
  callbackUri: string;
  dms: Dms[];
  nf: Nf[];
  fault: Fault;
  resourcepool: Resourcepool[];
}

export interface Dms {
  id: string;
  name: string;
  dmsEndpoint: string;
}

export interface Nf {
  id: string;
  name: string;
  dmsName: string;
  status: number;
}

export interface Fault {
  critical: number;
  major: number;
  minor: number;
  warning: number;
}

export interface Resourcepool {
  poolId: string;
  poolName: string;
  active?: boolean;
  node: Node[];
}

export interface Node {
  nodeId: string;
  nodeName: string;
  cpu: Cpu[];
  memory: Memory,
  nic: Nic[];
  storage: Storage;
}

export interface Cpu {
  id: string;
  name: string;
  product: string;
  capacity: string;
}

export interface Nic {
  id: string;
  name: string;
  product: string;
  capacity: string;
}

export interface Memory {
  name: string;
  size: string;
}

export interface Storage {
  total: string;
  items: Items[];
}

export interface Items {
  id: string;
  name: string;
  size: string;
}

export interface OcloudPerformance {
  // totalCpu: number;
  // usedCpu: number;
  cpu: string;
  memory: string;
  storage: string;
  network: string;
}

// @12/05 Add by yuchen
// 描述單一場域的詳細資訊
export interface FieldInfo {
  id: string;
  name: string;
  phone: string;
  fieldposition1: string;
  fieldposition2: string;
  fieldposition3: string;
  fieldposition4: string;
  bsinfo: BsInfo[];
  bsNum: number;
  ueNum: string;
  coverage: string;
  accessibility: string;
  availability: string;
  mobility: string;
  retainability: string;
  energy: string;
  integrity: Integrity;
  utilization: Utilization;
  alarmCriticalNum: number;
  alarmMajorNum: number;
  alarmMinorNum: number;
  alarmWarningNum: number;
}

// @12/05 Add by yuchen
// 描述 BS 的資訊
export interface BsInfo {
  id: string;
  name: string;
  accessibility: string | null;
  mobility: string | null;
  retainability: string | null;
  energy: string | null;
  integrity: Integrity;
  utilization: Utilization;
  cellInfo?: CellInfo[];
}

// @12/05 Add by yuchen
// 描述單一 BS 之 Cell 的資訊
export interface CellInfo {
  nci: string;
  accessibility: string;
  mobility: string;
  retainability: string;
  energy: string;
  integrity: Integrity;
  utilization: Utilization;
}

// @12/05 Add by yuchen
// 描述網路整體完整性的資訊
export interface Integrity {
  downlinkDelay?: string | null;
  uplinkDelay?: string | null;
  downlinkThrouthput?: string | null;
  uplinkThrouthput?: string | null;
}

// @12/05 Add by yuchen
// 描述網路使用情況的資訊
export interface Utilization {
  pdu: string | null;
  resourceProcess: string;
  resourceMemory: string;
  resourceDisk: string | null;
  maxPdu: string | null;
}

/* @12/14 Add ↓ For BSInfo:[] ↓ */
// notes: 當物件有可能是空的或可能不在 JSON 中設為"?:"
export interface BSInfo {
  info: Info[]; // ok
  extension_info: ExtensionInfo[]; // ok
  cellInfo?: Cellinfo;
  anr: Anr;
  pci?: PCI;  // 目前沒看到有 BS 這個有值
  cco?: CCO;  // 目前沒看到有 BS 這個有值
  id: string;
  name: string;
  ip?: string;        // 不一定有值
  port?: string;      // 不一定有值
  position?: string;  // 不一定有值
  description: string;
  bstype: number;
  components: Components;
  status: number;
  laston: string;
  lastoff: string;
  'components-info'?: {}; // 不一定有值
}

/* @12/14 Add ↓ For info:[] ↓ */
export interface Info {
  nci: string;
  gNBId: number;
  gNBIdLength: number;
  cellLocalId: string;
  CU: CU;
  DU: DU;
  RU: RU;
}

export interface CU {
  id: string;
  func: string;
  cellLocalId: string;
  absoluteFrequencySSB: string;
  sSBSubCarrierSpacing: string;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
}

export interface DU {
  id: string;
  func: string;
  cellLocalId: string;
  administrativeState: string;
  arfcnDL: number;
  arfcnSUL: number;
  arfcnUL: number;
  bSChannelBwDL: number;
  bSChannelBwSUL: number;
  bSChannelBwUL: number;
  nRPCI: number;
  nRTAC: string;
  ssbDuration: number;
  ssbFrequency: number;
  ssbOffset: number;
  ssbPeriodicity: number;
  ssbSubCarrierSpacing: number;
  configuredMaxTxPower: number;
}

export interface RU {
  id: string;
  position: string;
}
/* @12/14 Add ↑ For info:[] ↑ */


/* @12/14 ↓ For extension_info:[] ↓ */

export interface ExtensionInfo {
  gNBId: number;
  gNBIdLength: number;
  cellLocalId: string;
  nci: string;

  gNBCUFunction: GNBCUFunction | null;
  NRCellCU: NRCELLCU | null;
  peeParametersList_CU: PeeParametersListCU | null;
  vnfParametersList_CU: VnfParametersListCU | null;

  EP_F1C_CU: EPF1C_CU | null;
  EP_F1U_CU: EPF1U_CU | null;
  EP_NgC: EPNgC | null;
  EP_NgU: EPNgU | null;

  peeParametersList_NRCellCU: PeeParametersListNRCellCU | null;
  vnfParametersList_NRCellCU: VnfParametersListNRCellCU | null;
  s_NSSAI_leafList_NRCellCU: SNSSAILeafListNRCellCU | null;
  
  gNBDUFunction: GNBDUFunction | null;
  NRCellDU: NRCELLDU | null;
  peeParametersList_DU: PeeParametersListDU | null;
  vnfParametersList_DU: VnfParametersListDU | null;

  EP_F1C_DU: EPF1C_DU | null;
  EP_F1U_DU: EPF1U_DU | null;
  NRSectorCarrier: NRSectorCarrier | null;

  BWP: Bwp | null;
  peeParametersList_NRSector: PeeParametersListNRSector | null;
  vnfParametersList_NRSector: VnfParametersListNRSector | null;

  peeParametersList_NRCellDU: PeeParametersListNRCellDU | null;
  vnfParametersList_NRCellDU: VnfParametersListNRCellDU | null;
  s_NSSAI_leafList_NRCellDU: SNSSAILeafListNRCellDU | null;

  NRSectorCarrierRef_NRCellDU: NRSectorCarrierRefNRCellDU | null;
  bWPRef_leafList_NRCellDU: BWPRefLeafListNRCellDU | null;

  peeParametersList_BWP: PeeParametersListBWP | null;
  vnfParametersList_BWP: VnfParametersListBWP | null;
}

export interface GNBCUFunction {
  db: GNBCUFunctionDetail;
  ds: GNBCUFunctionDetail;
}

export interface GNBCUFunctionDetail {
  gNBId: number;
  gNBIdLength: number;
  'gNB-type': string;
  gNBCUName: string;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  componentId: string;
  id: string;
}

export interface NRCELLCU {
  db: NRCELLCUDetail;
  ds: NRCELLCUDetail;
}

export interface NRCELLCUDetail {
  componentId: string;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  cellLocalId: string;
  absoluteFrequencySSB: string;
  sSBSubCarrierSpacing: string;
  id: string;
}

export interface PeeParametersListCU {
  db: PeeParametersDetail;
  ds: PeeParametersDetail;
}

export interface PeeParametersDetail {
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  siteIdentification: string;
  siteLatitude: string;
  siteLongitude: string;
  siteDescription: string;
  equipmentType: string;
  environmentType: string;
  powerInterface: string;
  id: string;
}

export interface VnfParametersListCU {
  db: VnfParametersDetail;
  ds: VnfParametersDetail;
}

export interface VnfParametersDetail {
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  autoScalable: boolean;
  flavourId: string;
  vnfInstanceId: string;
  vnfdId: string;
  id: string;
}

export interface EPF1C_CU {
  db: EPF1C_CUDetail;
  ds: EPF1C_CUDetail;
}

export interface EPF1C_CUDetail {
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  localAddress_ip_addr: string;
  localAddress_vlan_id: string;
  remoteAddress: string;
  id: string;
}

export interface EPF1U_CU {
  db: EPF1U_CUDetail;
  ds: EPF1U_CUDetail;
}

export interface EPF1U_CUDetail {
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  localAddress_ip_addr: string;
  localAddress_vlan_id: string;
  remoteAddress: string;
  id: string;
}

export interface EPNgC {
  db: EPNgCDetail;
  ds: EPNgCDetail;
}

export interface EPNgCDetail {
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  localAddress_ip_addr: string;
  localAddress_vlan_id: string;
  remoteAddress: string;
  id: string;
}

export interface EPNgU {
  db: EPNgUDetail;
  ds: EPNgUDetail;
}

export interface EPNgUDetail {
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  localAddress_ip_addr: string;
  localAddress_vlan_id: string;
  remoteAddress: string;
  id: string;
}

export interface PeeParametersListNRCellCU {
  db: PeeParametersNRCellCUDetail;
  ds: PeeParametersNRCellCUDetail;
}

export interface PeeParametersNRCellCUDetail {
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  cellLocalId: string;
  siteIdentification: string;
  siteLatitude: string;
  siteLongitude: string;
  siteDescription: string;
  equipmentType: string;
  environmentType: string;
  powerInterface: string;
  id: string;
}

export interface VnfParametersListNRCellCU {
  db: VnfParametersNRCellCUDetail;
  ds: VnfParametersNRCellCUDetail;
}

export interface VnfParametersNRCellCUDetail {
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  cellLocalId: string;
  autoScalable: boolean;
  flavourId: string;
  vnfInstanceId: string;
  vnfdId: string;
  id: string;
}

export interface SNSSAILeafListNRCellCU {
  db: SNSSAIDetail;
  ds: SNSSAIDetail;
}

export interface SNSSAIDetail {
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  cellLocalId: string;
  s_NSSAI: number;
  id: string;
}

export interface GNBDUFunction {
  db: GNBDUFunctionDetail;
  ds: GNBDUFunctionDetail;
}

export interface GNBDUFunctionDetail {
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  gNBDUId: number;
  gNBDUName: string;
  componentId: string;
  id: string;
}

export interface NRCELLDU {
  db: NRCELLDUDetail;
  ds: NRCELLDUDetail;
}

export interface NRCELLDUDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  cellLocalId: string;
  administrativeState: string;
  nRPCI: number;
  nRTAC: string;
  arfcnDL: number;
  arfcnUL: number;
  arfcnSUL: number;
  bSChannelBwDL: number;
  ssbFrequency: number;
  ssbPeriodicity: number;
  ssbSubCarrierSpacing: number;
  ssbOffset: number;
  ssbDuration: number;
  bSChannelBwUL: number;
  bSChannelBwSUL: number;
  componentId: string;
  id: string;
}

export interface PeeParametersListDU {
  db: PeeParametersDUDetail;
  ds: PeeParametersDUDetail;
}

export interface PeeParametersDUDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  siteIdentification: string;
  siteLatitude: string;
  siteLongitude: string;
  siteDescription: string;
  equipmentType: string;
  environmentType: string;
  powerInterface: string;
  id: string;
}

export interface VnfParametersListDU {
  db: VnfParametersDUDetail;
  ds: VnfParametersDUDetail;
}

export interface VnfParametersDUDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  autoScalable: boolean;
  flavourId: string;
  vnfInstanceId: string;
  vnfdId: string;
  id: string;
}

export interface EPF1C_DU {
  db: EPF1C_DUDetail;
  ds: EPF1C_DUDetail;
}

export interface EPF1C_DUDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  localAddress_ip_addr: string;
  localAddress_vlan_id: string;
  remoteAddress: string;
  id: string;
}

export interface EPF1U_DU {
  db: EPF1U_DUDetail;
  ds: EPF1U_DUDetail;
}

export interface EPF1U_DUDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  localAddress_ip_addr: string;
  localAddress_vlan_id: string;
  remoteAddress: string;
  id: string;
}

export interface NRSectorCarrier {
  db: NRSectorCarrierDetail;
  ds: NRSectorCarrierDetail;
}

export interface NRSectorCarrierDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  txDirection: string;
  configuredMaxTxPower: number;
  configuredMaxTxEIRP: number;
  arfcnDL: number;
  arfcnUL: number;
  bSChannelBwDL: number;
  bSChannelBwUL: number;
  id: string;
}

export interface Bwp {
  db: BwpDetail;
  ds: BwpDetail;
}

export interface BwpDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  bwpContext: number;
  isInitialBwp: number;
  subCarrierSpacing: number;
  cyclicPrefix: number;
  startRB: string;
  numberOfRBs: number;
  id: string;
}

export interface PeeParametersListNRSector {
  db: PeeParametersNRSectorDetail;
  ds: PeeParametersNRSectorDetail;
}

export interface PeeParametersNRSectorDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  idRef: string;
  siteIdentification: string;
  siteLatitude: string;
  siteLongitude: string;
  siteDescription: string;
  equipmentType: string;
  environmentType: string;
  powerInterface: string;
  id: string;
}

export interface VnfParametersListNRSector {
  db: VnfParametersNRSectorDetail;
  ds: VnfParametersNRSectorDetail;
}

export interface VnfParametersNRSectorDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  idRef: string;
  autoScalable: boolean;
  flavourId: string;
  vnfInstanceId: string;
  vnfdId: string;
  id: string;
}

export interface PeeParametersListNRCellDU {
  db: PeeParametersNRCellDUDetail;
  ds: PeeParametersNRCellDUDetail;
}

export interface PeeParametersNRCellDUDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  cellLocalId: string;
  siteIdentification: string;
  siteLatitude: string;
  siteLongitude: string;
  siteDescription: string;
  equipmentType: string;
  environmentType: string;
  powerInterface: string;
  id: string;
}

export interface VnfParametersListNRCellDU {
  db: VnfParametersNRCellDUDetail;
  ds: VnfParametersNRCellDUDetail;
}

export interface VnfParametersNRCellDUDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  cellLocalId: string;
  autoScalable: boolean;
  flavourId: string;
  vnfInstanceId: string;
  vnfdId: string;
  id: string;
}

export interface SNSSAILeafListNRCellDU {
  db: SNSSAIDetail;
  ds: SNSSAIDetail;
}

export interface SNSSAIDetail {
  gNBDUId?: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  cellLocalId: string;
  s_NSSAI: number;
  id: string;
}

export interface NRSectorCarrierRefNRCellDU {
  db: NRSectorCarrierRefDetail;
  ds: NRSectorCarrierRefDetail;
}

export interface NRSectorCarrierRefDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  cellLocalId: string;
  NRSectorCarrierRef: number;
  id: string;
}

export interface BWPRefLeafListNRCellDU {
  db: BWPRefDetail;
  ds: BWPRefDetail;
}

export interface BWPRefDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  cellLocalId: string;
  bWPRef: number;
  id: string;
}

export interface PeeParametersListBWP {
  db: PeeParametersBWPPDetail;
  ds: PeeParametersBWPPDetail;
}

export interface PeeParametersBWPPDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  idRef: string;
  siteIdentification: string;
  siteLatitude: string;
  siteLongitude: string;
  siteDescription: string;
  equipmentType: string;
  environmentType: string;
  powerInterface: string;
  id: string;
}

export interface VnfParametersListBWP {
  db: VnfParametersBWPPDetail;
  ds: VnfParametersBWPPDetail;
}

export interface VnfParametersBWPPDetail {
  gNBDUId: number;
  gNBId: number;
  gNBIdLength: number;
  pLMNId_MCC: string;
  pLMNId_MNC: string;
  idRef: string;
  autoScalable: boolean;
  flavourId: string;
  vnfInstanceId: string;
  vnfdId: string;
  id: string;
}

/* @12/14 Add ↑ For extension_info:[] ↑ */


export interface Cellinfo {
  [key: string]: string;
}

export interface Anr {
  [key: string]: AnrSonOutput;
}

export interface AnrSonOutput {
  'anr-son-output': AnrSonOutputDetail;
}

export interface AnrSonOutputDetail {
  neighbor: Neighbor[];
}

export interface Neighbor {
  nci: string;
  pci: number;
  nrarfcn: number;
  'plmn-id': PlmnId;
  tac: string;
  id: string;
  enable: string;
  alias: string;
  cio: string;
  blacklisted: string;
  'must-include': string;
  'q-offset': string;
  'rs-tx-power': string;
  '__itri_default___': number;
}

export interface PlmnId {
  mcc: string;
  mnc: string;
}

export interface PCI {
  // 待添加 (目前未看到有值的案例)
}

export interface CCO {
  // 待添加 (目前未看到有值的案例)
}

export interface Components {
  [cuId: string]: { 
    [duId: string]: RUInfo[] 
  };
}

export interface RUInfo {
  [ruId: string]: string; // RU ID 映射到一个包含位置信息的字符串
}



/* @12/14 Add ↑ For BSInfo:[] ↑ */

@Component({
  selector: 'app-field-info',
  templateUrl: './field-info.component.html',
  styleUrls: ['./field-info.component.scss']
})


export class FieldInfoComponent implements OnInit {
  sessionId: string = '';
  cloudId: string = '';
  cloudName: string = '';

  fieldInfo: FieldInfo = {} as FieldInfo; // @12/05 Add by yuchen
  fieldId: string = '';   // @12/05 Add by yuchen
  fieldName: string = ''; // @12/05 Add by yuchen

  bsInfo: BSInfo = {} as BSInfo; // @12/14 Add by yuchen


  refreshTimeout!: any;
  refreshTime: number = 5;

  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用

  ocloudInfo: OcloudInfo = {} as OcloudInfo;
  ocloudPerformance: OcloudPerformance = {} as OcloudPerformance;
  softwareList: SoftwareList[] = [];
  systemSummary: SystemSummary = {} as SystemSummary;;
  fileNameMapSoftware: Map<string, SoftwareList> = new Map();
  faultColors: string[] = ['#FF0000', '#FFA042', '	#FFFF37', '#00FFFF'];
  showTooltipCpu: any = {};
  showTooltipStorage: any = {};
  showTooltipNic: any = {};
  @ViewChild('updateModal') updateModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  formValidated = false;

  // For Fault Alarms: CRITICAL, MAJOR, MINOR, WARNING
  severitys: string[];

  tooltipOptions = {
    theme: 'light',     // 'dark' | 'light'
    hideDelay: 250
  };

  // For import Google Maps @12/10 Add by yuchen
  center: google.maps.LatLngLiteral = {lat: 24, lng: 121};
  zoom = 8;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    // ... 更多的選項
  };

  // @12/08 Add for toggle colobar
  currentColorbar: 'RSRP' | 'SINR' | null = null; // 開始時不顯示任何 colorbar

  toggleColorbar(type: 'RSRP' | 'SINR') { // @12/08 Add
    this.currentColorbar = this.currentColorbar === type ? null : type;
    this.setActiveButton_rsrp_sinr('this.currentColorbar');
  }

  // @12/13 Add for listen activeButton
  // 用於監聽當前哪個按鈕是激活的
  activeButton_fieldImage: string | null = null;
  activeButton_NR: string | null = 'NR';  // 預設激活 'NR' 按鈕
  activeButton_rsrp_sinr: string | null = null;
  activeButton_menu: string | null = null;

  // 當按鈕被點擊時，觸發更新激活按鈕的狀態 @12/13 Add
  setActiveButton_fieldImage(buttonId: string) {
    this.activeButton_fieldImage = this.activeButton_fieldImage === buttonId ? null : buttonId;
  }
  setActiveButton_NR(buttonId: string) {
      this.activeButton_NR = this.activeButton_NR === buttonId ? null : buttonId;
  }
  setActiveButton_rsrp_sinr(buttonId: string) {
    this.activeButton_rsrp_sinr = this.activeButton_rsrp_sinr === buttonId ? null : buttonId;
  }
  setActiveButton_menu(buttonId: string) {
    this.activeButton_menu = this.activeButton_menu === buttonId ? null : buttonId;
  }

  showMapModel: boolean = true;                   // 控制是否顯示地圖模式的 Flag    @12/13 Add
  recordColorbar: 'RSRP' | 'SINR' | null = null;  // 用於記錄 Colorbar 狀態的 Flag @12/13 Add 

  // 用於切換顯示地圖模式或基站列表 @12/13 Add to toggle Map Mode or gNB List
  toggleMenuButton() {
    
    this.showMapModel = !this.showMapModel; // 切換顯示的頁面並更新該 Flag 狀態
    //console.log("toggle showMapModel:", this.showMapModel);

    // 記錄切換頁面當下的 ColorBar 狀態 ( 沒值時才記錄 )
    if ( !this.recordColorbar ){
      this.recordColorbar = this.currentColorbar; 
    }

    // 如切換的頁面為地圖模式，就預設激活 'NR' 按鈕
    if ( this.showMapModel === true ) { 
      this.activeButton_NR = 'NR';
    }

    // 如果記錄的 Colorbar 不為空且切換的頁面為地圖模式，則恢復顯示記錄的 Colorbar
    if ( this.recordColorbar != null && this.showMapModel === true ) {

      this.currentColorbar = this.recordColorbar;
      //console.log("recordColorbar:", this.recordColorbar);
      this.cdr.detectChanges();   // 手動觸發變更檢測
      this.recordColorbar = null; // 初始化記錄 Colorbar 狀態的 Flag

    } else { // 如切換的頁面不為地圖模式，就將此 flag 設為空並隱藏 ColorBar
      this.currentColorbar = null;
      //console.log("recordColorbar:", this.recordColorbar);
      this.cdr.detectChanges(); // 手動觸發變更檢測
    }
    
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public languageService: LanguageService,
    private cdr: ChangeDetectorRef  // @12/13 Add - 使用 detectChanges() 方法用於手動觸發 Angular 的變更檢測機制，確保當數據模型更新後，相關的視圖能夠及時反映
  ) {
    this.severitys = this.commonService.severitys;
  }

  ngOnInit(){
    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      this.fieldId = params['id'];  
      this.fieldName = params['name']; 
      console.log('fieldId: ' + this.fieldId + ', fieldName: ' + this.fieldName + ',\nsend from /main/field-mgr');
      this.getQueryFieldInfo();

      this.cloudId = params['cloudId'];
      this.cloudName = params['cloudName'];
      console.log('cloudId=' + this.cloudId + ', cloudName=' + this.cloudName);
      //this.getOcloudInfo();
      this.getOcloudPerformance();
      this.getSoftwareList();
      this.getSystemSummary();
    });
  }

  // @12/05 Add by yuchen
  getQueryFieldInfo() {
    console.log('QueryFieldInfo() - Start');
    clearTimeout(this.refreshTimeout);
  
    if (this.commonService.isLocal) {

      // local files test
      this.fieldInfo = this.commonService.fieldInfo;
      this.fieldInfoDeal();

    } else {

      // 使用 commonService 中的 queryFieldInfo() 發起 HTTP GET 請求
      this.commonService.queryFieldInfo(this.fieldId).subscribe({
        next: (res) => {
          console.log('Get queryFieldInfo from API: ', res,'\nfieldId: '+ res.id +', fieldName: '+res.name);
          this.fieldInfo = res ;
          console.log('The Field info:', this.fieldInfo);
          this.fieldInfoDeal();
        },
        error: (error) => {
          console.error('Error fetching field info:', error);
        },
        complete: () => {
          console.log('Field info fetch completed');
        }
      });
    }
  }

  // @11/30 Add by yuchen
  fieldInfoDeal() {

    // 輸出檢查點
    console.log('fieldInfoDeal() - Start');
    console.log('The field info:', this.fieldInfo);
    console.log('The field info properties count:', this.fieldInfo ? Object.keys(this.fieldInfo).length : 'FieldInfo is undefined or null');
    console.log('After field info log');

    // 定義一個空陣列，長度等於場域的總數
    this.nullList = new Array(this.totalItems);
  
    // 如果需要，可以使用 setTimeout 設定一個定時刷新
    this.refreshTimeout = window.setTimeout(() => {
      if (this.p === 1) {
        console.log(`page[${this.p}] ===> refresh.`);
        //this.getQueryFieldInfo();  // 刷新場域資訊函數
      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 100); // timeout: 100 ms
  }

  // string -> number (coverage - 換手成功率) @12/11 Add by yuchen
  get coverageAsNumber(): number {
    return parseFloat(this.fieldInfo.coverage);
  }
 
  // accessibility - 接入成功率
  get accessibilityAsNumber(): number {
    return parseFloat(this.fieldInfo.accessibility);
  }

  // resourceProcess - CPU 使用率
  get resourceProcessAsNumber(): number {
    return parseFloat(this.fieldInfo.utilization.resourceProcess);
  }

  // resourceMemory - Memory 使用率
  get resourceMemoryAsNumber(): number {
    return parseFloat(this.fieldInfo.utilization.resourceMemory);
  }

  // 設定告警種類文字 @12/07 Update by yuchen
  severityText(severity: string): string {
    const severityKey = `field.${severity.toLowerCase()}Fault`;
    return this.languageService.i18n[severityKey];
  }

  // 設定告警種類給 CSS 選擇器用文字 @12/07 Add by yuchen
  severityText_forCSS(severity: string): string {
    console.log("severity:", severity);
    return this.commonService.severityText(severity);
  }

  // 設定場域對應的告警種類數量 @12/07 Update by yuchen
  severityCount(severity: string): number {
  
    if (!this.fieldInfo) {
      return 0; // 確保 fieldInfo 已被賦值且不為空
    }
  
    if (severity.toUpperCase() === 'CRITICAL') {
      return this.fieldInfo.alarmCriticalNum;
    } else if (severity.toUpperCase() === 'MAJOR') {
      return this.fieldInfo.alarmMajorNum;
    } else if (severity.toUpperCase() === 'MINOR') {
      return this.fieldInfo.alarmMinorNum;
    } else if (severity.toUpperCase() === 'WARNING') {
      return this.fieldInfo.alarmWarningNum;
    } else {
      return 0;
    }
  }

  // 往 Fault Mnagement @12/07 Update
  goFaultMgr() {
    this.router.navigate(['/main/fault-mgr', this.fieldName, 'All']);
  }

  // getOcloudInfo() {
  //   if (this.commonService.isLocal) {
  //     /* local file test */
  //     this.ocloudInfo = this.commonService.ocloudInfo;
  //     this.ocloudInfoDeal();
  //   } else { 
  //     this.commonService.queryOcloudInfo(this.cloudId).subscribe(
  //       res => { 
  //         console.log('getOcloudInfo:');
  //         console.log(res);
  //         const str = JSON.stringify(res);//convert array to string
  //         this.ocloudInfo = JSON.parse(str);
  //         this.ocloudInfo = res as OcloudInfo;
  //         this.ocloudInfoDeal();
  //       }
  //     );
  //   }
  // }

  getOcloudPerformance() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.ocloudPerformance = this.commonService.ocloudPerformance;
      this.ocloudPerformanceDeal();
    } else {
      this.commonService.queryOcloudPerformance(this.cloudId).subscribe(
        res => {
          console.log('getOcloudPerformance:');
          console.log(res);
          this.ocloudPerformance = res as OcloudPerformance;
          this.ocloudPerformanceDeal();
        }
      );
    }
  }

  getSoftwareList() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.softwareList = this.commonService.softwareList;
      this.softwareDeal();
    } else {
      this.commonService.querySoftwareList('', '0', '').subscribe(
        res => {
          console.log('getSoftwareList:');
          console.log(res);
          this.softwareList = res as SoftwareList[];
          this.softwareDeal();
        }
      );
    }
  }

  softwareDeal() {
    this.fileNameMapSoftware = new Map();
    this.softwareList.forEach((row) => {
      this.fileNameMapSoftware.set(row.fileName, row);
    });
  }

  getSystemSummary() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.systemSummary = this.commonService.systemSummary;
    } else {
      this.commonService.querySystemSummary().subscribe(
        res => {
          console.log('getSoftwareList:');
          console.log(res);
          this.systemSummary = res as SystemSummary;
        }
      );
    }
  }

  softwareVersion(): string {
    const fileName = this.updateForm.controls['fileName'].value;
    if (fileName === '') {
      return '';
    } else {
      const software = this.fileNameMapSoftware.get(fileName) as any;
      return software.version;
    }
  }

  ocloudInfoDeal() {
    if (this.ocloudInfo.resourcepool && this.ocloudInfo.resourcepool.length > 0) {
      this.ocloudInfo.resourcepool[0].active = true;
    }
  }

  ocloudPerformanceDeal() {
    // this.utilizationPercent = Math.floor((Number(this.ocloudPerformance.usedCpu) / Number(this.ocloudPerformance.totalCpu)) * 100);
    // if (this.ocloudPerformance.cpu != 'N/A' || this.ocloudPerformance.storage != 'N/A' ||
    //   this.ocloudPerformance.memory != 'N/A' || this.ocloudPerformance.network != 'N/A') {
    //   this.ocloudPerformance.cpu += ' %';
    //   this.ocloudPerformance.memory += ' GB';
    //   this.ocloudPerformance.storage += ' MB';
    //   this.ocloudPerformance.network += ' Kbps';
    // }
  }

  // 返回 Field Mnagement 主頁
  back() {
    this.router.navigate(['/main/field-mgr']);
  }

  openUpdateModel() {
    this.formValidated = false;
    this.updateForm = this.fb.group({
      'type': new FormControl('imageUrl'),
      'imageUrl': new FormControl('', [Validators.required]),
      'fileName': new FormControl('')
    });
    this.updateModalRef = this.dialog.open(this.updateModal, { id: 'updateModal' });
    this.updateModalRef.afterClosed().subscribe(() => {
      this.formValidated = false;
    });
  }

  changeType(e: MatButtonToggleChange) {
    this.formValidated = false;
    if (e.value === 'imageUrl') {
      this.updateForm.controls['imageUrl'].setValidators([Validators.required]);
      this.updateForm.controls['fileName'].setValidators(null);
      this.updateForm.controls['fileName'].setValue('');
    } else {
      this.updateForm.controls['imageUrl'].setValidators(null);
      this.updateForm.controls['imageUrl'].setValue('');
      this.updateForm.controls['fileName'].setValidators([Validators.required]);
    }
    this.updateForm.controls['imageUrl'].updateValueAndValidity();
    this.updateForm.controls['fileName'].updateValueAndValidity();
  }

  update() {
    this.formValidated = true;
    if (!this.updateForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.updateModalRef.close();
    } else {
      const body: any = {
        ocloud: this.ocloudInfo.id,
        currentVersion: this.ocloudInfo.softwareVersion,
        sessionid: this.sessionId
      };
      if (this.updateForm.controls['type'].value === 'imageUrl') {
        const imageUrlSplit = this.updateForm.controls['imageUrl'].value.split('/');
        body['fileName'] = imageUrlSplit[imageUrlSplit.length - 1];
      } else {
        body['fileName'] = this.updateForm.controls['fileName'].value;
        body['version'] = this.softwareVersion();
      }
      this.commonService.applyOcloudSoftware(body).subscribe(
        () => console.log('Update Successful.')
      );
      this.updateModalRef.close();
      //this.getOcloudInfo();
    }
  }

  veiw(opt: Nf) {
    const url = '/main/nf-mgr';
    this.router.navigate([url]);
  }

  goPerformanceMgr() {
    this.router.navigate(['/main/performance-mgr', this.fieldName]);
  }


}
