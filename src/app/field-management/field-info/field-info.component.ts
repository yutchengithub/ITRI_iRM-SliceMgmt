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

import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';          // @12/13 Add for use 'detectChanges()'
import { environment } from 'src/environments/environment'; // @12/20 Add for import Google Maps API Key

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

/* ↓ @12/14~15 Add For API of queryBsInfo ↓ */
// notes: 當物件有可能是空的或可能不在 JSON 中設為"?:"
export interface BSInfo {
  info: {
    'bs-conf': {
      'plmn-id': {
        mcc: string;
        mnc: string;
      };
      nci: string;
      pci: number;
      'nrarfcn-dl': number;
      'nrarfcn-ul': number;
      'duplex-mode': string;
      'channel-bandwidth': number;
      tac: string;
      'tx-power': number;
    };
    nci?: string;
    gNBId: number;
    gNBIdLength: number;
    'gNB-type'?: string;
    gNBCUName ?: string;
    pLMNId_MCC ?: string; 
    pLMNId_MNC ?: string; 
    cellLocalId?: string;
    id?: string; 
    CU?:{
      id: string;
      func: string;
      cellLocalId: string;
      absoluteFrequencySSB: string;
      sSBSubCarrierSpacing: string;
      pLMNId_MCC: string;
      pLMNId_MNC: string;
    };
    DU?: {
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
    RU: {
      id: string;
      position: string;
    };
  };

  extension_info: ExtensionInfo[]; // ok
  cellInfo?: Cellinfo; // ok
  anr: Anr;     // ok
  pci: PCI;     // ok 目前沒看到有 BS 這個有值
  cco: CCO;     // ok 目前沒看到有 BS 這個有值
  id: string;   // ok 
  name: string; // ok 
  ip: string;              // ok 不一定有值
  port: string;            // ok 不一定有值
  position: string;        // ok 不一定有值
  description?: string;      // ok 
  bstype?: number;           // ok 
  components?: Components;   // ok 可能會出錯
  status?: number;           // ok 
  laston?: string;           // ok 
  lastoff?: string;          // ok 
  'components-info'?: ComponentsInfo;   // ok 不一定有值
}

/* ↓ @12/14 Add For extension_info:[] ↓ */

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

/* ↑ @12/14 Add For extension_info:[] ↑ */


/* ↓ @12/15 Add For "cellInfo": {} ↓ */
export interface Cellinfo {
  [key: string]: string;
}
/* ↑ @12/15 Add For "cellInfo": {} ↑ */


/* ↓ @12/15 Add For "anr": {} ↓ */
export interface Anr {
  'anr-son-output': AnrSonOutput;
}

export interface AnrSonOutput {
  neighbor: Neighbor[];
}

// "neighbor":
export interface Neighbor {
  nci: string;
  pci: number;
  nrarfcn: number;
  'plmn-id': {
    mcc: string;
    mnc: string;
  };
  tac: string;
  id?: string;
  enable?: string;
  alias?: string;
  cio?: string;
  blacklisted?: string;
  'must-include'?: string;
  'q-offset'?: string;
  'rs-tx-power'?: string;
  '__itri_default___': number;
}

/* ↑ @12/15 Add For "anr": {} ↑ */

export interface PCI {
  // 待添加 (目前未看到有值的案例)
}

export interface CCO {
  // 待添加 (目前未看到有值的案例)
}

/* ↓ @12/15 Add  For "components": ↓ */

export interface Components {
  [key: string]: { [key: string]: DUInfo[] } | string; // 添加了字符串的可能性
  //type: string;
  //id: string;
}

export interface DUInfo {
  [key: string]: string;
}

/* ↑ @12/15 Add  For "components": ↑ */


/* ↓ @12/15 Add  For "components-info": ↓ */

export interface ComponentsInfo {
  [componentId: string]: ComponentDetail | {}; // 允許空對象或具體的組件資訊
}

export interface ComponentDetail {
  firm?: string;
  modelname?: string;
  'components-sw-inventory'?: SoftwareInventory;
}

// "components-sw-inventory":
export interface SoftwareInventory {
  'software-inventory': { 
    'software-slot': SoftwareSlot[];
  };
}

// "software-slot":
export interface SoftwareSlot {
  name: string;
  status: string;
  active: string;
  running: string;
  access: string;
  'vendor-code'?: string;
  'build-id'?: string;
  'build-name'?: string;
  'build-version'?: string;
  files?: SoftwareFiles;
}

// "files":
export interface SoftwareFiles {
  name: string;
  version: string;
  'local-path': string;
  integrity?: string;
}

   /* ↑ @12/15 Add  For "components-info": ↑ */

/* ↑ @12/14~15 Add For API of queryBsInfo ↑ */

// 定義一個接口，其內部結構可以是任意類型的屬性
export interface DynamicBSInfo {
  [key: string]: any;
}


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

  refreshTimeout!: any;
  refreshTime: number = 5;

  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用

  @ViewChild('updateModal') updateModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  formValidated = false;

  ocloudInfo: OcloudInfo = {} as OcloudInfo;
  ocloudPerformance: OcloudPerformance = {} as OcloudPerformance;
  softwareList: SoftwareList[] = [];
  systemSummary: SystemSummary = {} as SystemSummary;;
  fileNameMapSoftware: Map<string, SoftwareList> = new Map();
  showTooltipCpu: any = {};
  showTooltipStorage: any = {};
  showTooltipNic: any = {};


  // For Fault Alarms: CRITICAL, MAJOR, MINOR, WARNING
  severitys: string[];

  tooltipOptions = {
    theme: 'light',     // 'dark' | 'light'
    hideDelay: 250
  };


// ↓ For setting Google Maps @12/20 Update by yuchen

  // 定義用於繪製多邊形的樣式選項
  polyOptions: google.maps.PolygonOptions = {
    strokeColor: '#0f91e7',   // 多邊形邊界的顏色
    strokeOpacity: 0.8,       // 多邊形邊界的透明度
    strokeWeight: 2,          // 多邊形邊界線的寬度
    fillColor: '#0f91e7',     // 多邊形填充的顏色
    fillOpacity: 0,           // 將多邊形填充的透明度設置為 0，使其透明
    clickable: false          // 確保多邊形不會捕捉點擊事件
  };

  // 用於存儲多邊形頂點的陣矩陣，初始時為空
  polyPath: google.maps.LatLngLiteral[] = [];

  // 初始化地圖中心的經緯度為(0, 0)，這可能會導致地圖在視圖上看不到任何內容(目前都可以顯示)
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  // 設置地圖的初始縮放級別，這裡設為 19.5 ( 近地面 )
  zoom = 19.5;

  // 定義地圖的其他配置選項，包括樣式，來隱藏默認的地標
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',            // 設置地圖類型為道路地圖
    disableDefaultUI: true,          // 禁用地圖預設的用戶界面元件
    backgroundColor: '#126df5',      // 設置地圖的背景顏色
    clickableIcons: false,           // 設置地圖上的圖標是否可點擊
    disableDoubleClickZoom: true,    // 禁用雙擊縮放功能
    draggable: false,                // 禁止用戶拖動地圖
    zoomControl: false,              // 禁止用戶通過控件來縮放地圖
    styles: [                        // 自定義樣式來隱藏地圖上的點擊性圖標
      {
        // "poi" 隱藏所有類型的搜尋點
        featureType: "poi", 
        stylers: [{ visibility: "off" }]
      }
    ]
  };

  // 自定義標記 Icon
  customIcon: google.maps.Icon = {
    url: './assets/img/bs_icons_v3/dist_gnb_online_default.png', // 圖標的相對路徑 URL
    scaledSize: new google.maps.Size(33, 33), // 設定圖標的大小
    origin: new google.maps.Point(0, 0),      // 圖標的起始點
    anchor: new google.maps.Point(20, 20),    // 圖標錨點的位置
  };
  
// ↑ For setting Google Maps @12/20 Update by yuchen


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
    // @12/13 Add - 使用 detectChanges() 方法用於手動觸發 Angular 的變更檢測機制，
    //              確保當數據模型更新後，相關的視圖能夠及時反映
    private cdr: ChangeDetectorRef

  ) {
    const googleMapsApiKey = environment.googleMapsApiKey; // @12/20 Add for import Google Maps API Key
    this.severitys = this.commonService.severitys;         // 取得告警資訊種類名稱
  }

  // 頁面初始化
  ngOnInit(){ 

    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      this.fieldId = params['id'];  
      this.fieldName = params['name']; 
      console.log('fieldId: ' + this.fieldId + ', fieldName: ' + this.fieldName + ',\nsend from /main/field-mgr');
      this.getQueryFieldInfo();
    });

  }

  // 計算多邊形中心點的函數 @12/20 Add
  calculateCenter(points: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {
    // 初始化緯度和經度的總和
    let lat = 0;
    let lng = 0;

    // 迭代多邊形的每個頂點
    points.forEach(point => {
      // 累加所有頂點的緯度和經度
      lat += point.lat;
      lng += point.lng;
    });

    // 返回多邊形所有頂點緯度和經度的平均值作為多邊形的中心點
    // 這是通過將總和除以點的數量來計算的
    return {
      lat: lat / points.length,  // 計算緯度的平均值
      lng: lng / points.length   // 計算經度的平均值
    };
  }

  // @12/18 Update
  getQueryFieldInfo() {
    console.log('getQueryFieldInfo() - Start'); // 啟動獲取場域資訊
    console.log('Start fetching field info');   // 開始獲取場域訊息
    clearTimeout(this.refreshTimeout);

    if (this.commonService.isLocal) {
      
      // For testing with local files
      this.fieldInfo = this.commonService.fieldInfo;
      this.processFieldInfo(); // 處理場域資訊
    } else {
      
      // Use commonService's queryFieldInfo() to make an HTTP GET request
      this.commonService.queryFieldInfo(this.fieldId).subscribe({
        next: (res) => {

          // 當 API 響應數據到達時，執行此回調
          // This callback is executed when API response data arrives
          console.log('從 API 獲取 queryFieldInfo\n( Fetched queryFieldInfo from API ): ', res, '\nfieldId: ' + res.id + ', fieldName: ' + res.name);
          console.log('從 API 獲取 fieldId.bsinfo\n( Fetched fieldId.bsinfo from API ):', res.bsinfo);
          this.fieldInfo = res;
          console.log('場域資訊\n( Field info ):', this.fieldInfo); // 取得的場域資訊 ( Obtained field information ):

          // 儲存場域位置 @12/20 Add
          // 這裡建立了一個包含場域四個角落位置的陣列，並且將場域的第一個位置再次添加到陣列的末尾
          // 以確保多邊形是閉合的。
          const positions = [
            this.parsePosition(this.fieldInfo.fieldposition1),
            this.parsePosition(this.fieldInfo.fieldposition2),
            this.parsePosition(this.fieldInfo.fieldposition3),
            this.parsePosition(this.fieldInfo.fieldposition4),
            this.parsePosition(this.fieldInfo.fieldposition1)  // 這樣做是為了閉合多邊形
          ];

          // 更新 polyPath 和中心點 @12/20 Add
          // polyPath 用來儲存多邊形各個頂點的經緯度，這個數據將被用於在地圖上繪製多邊形。
          this.polyPath = positions;

          // calculateCenter 是一個自定義函數，用於計算多邊形頂點的平均中心點，
          // 這個計算出的中心點將被用來設定地圖的初始視圖中心。
          this.center = this.calculateCenter(positions);

          // 輸出中心點到控制台，這樣可以用於調試和確認中心點是否如預期被正確計算。
          console.log('In getQueryFieldInfo() - center:', this.center);

          // 確保場域資訊已經被賦值後再進行後續處理
          // Ensure field info is assigned before proceeding
          this.processFieldInfo(); // 進行後續處理
        },
        error: (error) => {

          // 獲取資訊出錯時執行此回調
          // This callback is executed when there is an error fetching the info
          console.error('獲取場域資訊出錯:', error);
          console.error('Error fetching field info:', error);
        },
        complete: () => {

          // 請求完成時執行此回調
          // This callback is executed when the request is complete
          console.log('場域資訊獲取完成');
          console.log('Field info fetch completed');
        }
      });
    }
  }

  // @12/18 Add
  // 處理場域資訊並調用 getQueryBsInfoForAll
  // Process field info and call getQueryBsInfoForAll
  processFieldInfo() {

    // 確認 fieldInfo 和 fieldInfo.bsinfo 是否已經被定義
    // Ensure fieldInfo and fieldInfo.bsinfo are defined
    if (this.fieldInfo && this.fieldInfo.bsinfo) {
      
      // 確認場域資訊記錄的"基站數量"是否與"bsinfo"內的資料筆數相等
      if ( this.fieldInfo.bsNum === this.fieldInfo.bsinfo.length ) {

        // 取得該場域所有基站之詳細資訊
        this.getQueryBsInfoForAll(this.fieldInfo.bsNum, this.fieldInfo.bsinfo); 
      }
    }
  }

  // 用來存儲當前選擇的基站資訊 @12/19 Add
  currentBsInfo: BSInfo | null = null;

  // 用來切換成顯示"當下點擊的基站資訊" @12/19 Add
  onSelectBsInfo(bsInfo: BSInfo) {
    
    this.currentBsInfo = bsInfo;
    
    this.cdr.detectChanges(); // 手動觸發變化檢測
    console.log("After click onSelectBsInfo the currentBsInfo:", this.currentBsInfo)
  }

  // @12/18 Add
  bsInfoDetails: BSInfo[] = [];  // 用來存儲每個基站的詳細資訊之矩陣
  // Get the All infos of BSs in the field
  getQueryBsInfoForAll(bsNum: number, bsinfo: BsInfo[]) {
    console.log('getQueryBsInfoForAll() - Start');


    const observables: Observable<BSInfo>[] = bsinfo.map((bsInfo) => {
      return this.commonService.queryBsInfo(bsInfo.id);
    });

    // 使用 forkJoin 等待所有請求完成
    forkJoin(observables).subscribe({
      next: (results: BSInfo[]) => {
        // 此時 results 是一個包含所有響應的數組
        this.bsInfoDetails = results;
        console.log('The BSs info in the field:', this.bsInfoDetails);
        console.log('bsInfoDetails[0].info:', this.bsInfoDetails[0].info);

        // 檢查是否有基站資訊，如果有，則將第一筆設為當前顯示的基站資訊
        if (this.bsInfoDetails.length > 0) {
          this.currentBsInfo = this.bsInfoDetails[0];
        }
      },
      error: (error) => {
        console.error('Error fetching BS Infos:', error);
      },
      complete: () => {
        console.log('All BS Info fetches completed');
        console.log('getQueryBsInfoForAll() - End');
      }
    });
  }

  // @12/18 Add
  // Get response of queryBsInfo API 
  // 這個方法現在不需要改變，它應該返回一個 Observable
  getQueryBsInfo(bsId: string) {
    console.log('getQueryBsInfo() - Start');
    console.log('bsId: ', bsId);

    // 直接返回 API 請求的 Observable
    return this.commonService.queryBsInfo(bsId).pipe(
      tap({
        next: (res) => {
          console.log('Get queryBsInfo from API:', res, '\nBsName:', res.name, ', BsId:', res.id);

          // 處理從 API 獲取的基站資訊中的位置訊息
          if (!res.position) { // 檢查位置訊息是否為空、undefined 或 null
            // 嘗試從 res.info.RU.position 獲取位置訊息
            // 如果 res.info 或 res.info.RU 不存在，或者 res.info.RU.position 為空，
            // 則將 res.position 設置為 "None"
            res.position = res.info?.RU?.position || "None";
          }
        },
        error: (error) => {
          console.error('Error fetching Bs Info:', error);
        },
        complete: () => {
          console.log('Bs Info fetch for ID', bsId, 'completed');
        }
      })
    );
  }

  // @12/19 Add
  // 此方法用於將位置訊息的字串轉換為 Google 地圖所需的 LatLngLiteral 對象
  parsePosition(positionStr: string): google.maps.LatLngLiteral {
    try {

      // 嘗試解析 JSON 字串以獲取經緯度數組
      const positionArr = JSON.parse(positionStr);

      // 返回一個 LatLngLiteral 對象，其 lat 和 lng 屬性分別對應於緯度和經度
      return {
        lat: positionArr[1],
        lng: positionArr[0]
      };

    } catch (e) {

      // 如果解析出錯，則在控制台打印錯誤訊息
      console.error('Error parsing position:', e);

      // 返回一個默認的 LatLngLiteral 對象，防止程序崩潰
      return { lat: 0, lng: 0 };
    }
  }

  // @12/19 Add
  // 用於從當前基站資訊中獲取轉換後的位置對象 
  get currentBsInfoPosition(): google.maps.LatLngLiteral {

    // 如果 currentBsInfo 存在，則調用 parsePosition 方法進行轉換，否則返回默認值
    return this.currentBsInfo ? this.parsePosition(this.currentBsInfo.position) : { lat: 0, lng: 0 };
  }

  //  string -> number (mobility - 換手成功率)
  // @12/18 Update coverage -> mobility by yuchen 
  get mobilityAsNumber(): number {
    return parseFloat(this.fieldInfo.mobility);
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
    //console.log("severity:", severity);
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
