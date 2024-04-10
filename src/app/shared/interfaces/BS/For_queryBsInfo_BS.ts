
/* ↓ @12/24 Update For API of queryBsInfo for BS ↓ */
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
      gNBId: number;
      gNBIdLength: number;
      'gNB-type': string;
      gNBCUName: string;
      pLMNId_MCC: string;
      pLMNId_MNC: string;
      id: string;
    };
  
    extension_info: ExtensionInfo[]; // ok
    cellInfo: Cellinfo; // ok
    anr: Anr;     // ok
    pci: PCI;     // ok 目前沒看到有 BS 這個有值
    cco: CCO;     // ok 目前沒看到有 BS 這個有值
    id: string;   // ok
    name: string; // ok
    ip: string;              // ok 不一定有值
    port: string;            // ok 不一定有值
    position: string;        // ok 不一定有值
    description: string;        // ok
    bstype: number;             // ok
    components: Components[];   // ok 
    status: number;             // ok
    laston: string;             // ok
    lastoff: string | null;            // ok
    'components-info': ComponentsInfo;   // ok 不一定有值
  }
  
  /* ↓ @12/14 Add For extension_info:[] ↓ */
  
  export interface ExtensionInfo {
    gNBId: number;
    gNBIdLength: number;
    cellLocalId: string;
    nci: string;
  
    NRCellCU: NRCELLCU | null;
    gNBCUFunction: GNBCUFunction;
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
    peeParametersList_NRCellDU: PeeParametersListNRCellDU | null;
    vnfParametersList_NRCellDU: VnfParametersListNRCellDU | null;
    s_NSSAI_leafList_NRCellDU: SNSSAILeafListNRCellDU | null;
    NRSectorCarrierRef_NRCellDU: NRSectorCarrierRefNRCellDU | null;
    bWPRef_leafList_NRCellDU: BWPRefLeafListNRCellDU | null;

    NRSectorCarrier: NRSectorCarrier | null;
    BWP: Bwp | null;

    peeParametersList_NRSector: PeeParametersListNRSector | null;
    vnfParametersList_NRSector: VnfParametersListNRSector | null;
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
    //[key: string]: string;
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
    id: string;
    nci: string;
    enable: string;
    alias: string;
    'must-include': string;
    'plmn-id': {
      mcc: string;
      mnc: string;
    };
    nrarfcn: number;
    pci: number;
    'q-offset': string;
    cio: string;
    'rs-tx-power': string;
    blacklisted: string;
    tac: string;
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
    type: string;
    id: string;
  }
  
  /* ↑ @12/15 Add  For "components": ↑ */
  
  
  /* ↓ @12/15 Add  For "components-info": ↓ */
  
  export interface ComponentsInfo {
    [componentId: string]: ComponentDetail; // 允許空對象或具體的組件資訊
  }
  
  export interface ComponentDetail {
    firm: string;
    modelname: string;
    'components-sw-inventory': SoftwareInventory;
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
    integrity: string;
  }
  
     /* ↑ @12/15 Add  For "components-info": ↑ */
  
  /* ↑ @12/14~15 Add For API of queryBsInfo ↑ */