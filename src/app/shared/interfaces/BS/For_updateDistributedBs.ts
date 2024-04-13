  
// @2024/04/14 Add
// 用於編輯「分佈式」基站資訊 POST 時的 Submit Data 用

  export interface ForUpdateDistributedBs {
    session: string;
    id: string;
    name: string;
    bstype: string;
    components: Components_dist;  
    description: string;
    cellinfo: Cellinfo[];
    edit_type: number;
    extension_info: Extensioninfo[];
  }
  
  export interface Extensioninfo {
    gNBId: number;
    gNBIdLength: number;
    cellLocalId: string;
    nci: string;
    gNBCUFunction: GNBCUFunction;
    NRCellCU: NRCellCU;
    peeParametersList_CU: PeeParametersListCU;
    vnfParametersList_CU: VnfParametersListCU;
    EP_F1C_CU: EPF1CCU;
    EP_F1U_CU: EPF1CCU;
    EP_NgC: EPF1CCU;
    EP_NgU: EPF1CCU;
    peeParametersList_NRCellCU: PeeParametersListNRCellCU;
    vnfParametersList_NRCellCU: VnfParametersListNRCellCU;
    s_NSSAI_leafList_NRCellCU: SNSSAIleafListNRCellCU;
    gNBDUFunction: GNBDUFunction;
    NRCellDU: NRCellDU;
    peeParametersList_DU: PeeParametersListDU;
    vnfParametersList_DU: VnfParametersListDU;
    EP_F1C_DU: EPF1CDU;
    EP_F1U_DU: EPF1CDU;
    NRSectorCarrier: NRSectorCarrier;
    BWP: BWP;
    peeParametersList_NRSector: PeeParametersListNRSector;
    vnfParametersList_NRSector: VnfParametersListNRSector;
    peeParametersList_NRCellDU: PeeParametersListNRCellDU;
    vnfParametersList_NRCellDU: VnfParametersListNRCellDU;
    s_NSSAI_leafList_NRCellDU: SNSSAIleafListNRCellDU;
    NRSectorCarrierRef_NRCellDU: NRSectorCarrierRefNRCellDU;
    bWPRef_leafList_NRCellDU: BWPRefleafListNRCellDU;
    peeParametersList_BWP: PeeParametersListNRSector;
    vnfParametersList_BWP: VnfParametersListNRSector;
  }
  
  export interface BWPRefleafListNRCellDU {
    db: Db22;
    ds: Db22;
  }
  
  export interface Db22 {
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: string;
    pLMNId_MNC: string;
    cellLocalId: string;
    bWPRef: number;
    id: string;
  }
  
  export interface NRSectorCarrierRefNRCellDU {
    db: Db21;
    ds: Db21;
  }
  
  export interface Db21 {
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: string;
    pLMNId_MNC: string;
    cellLocalId: string;
    NRSectorCarrierRef: number;
    id: string;
  }
  
  export interface SNSSAIleafListNRCellDU {
    db: Db20;
    ds: Db20;
  }
  
  export interface Db20 {
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: string;
    pLMNId_MNC: string;
    cellLocalId: string;
    s_NSSAI: number;
    id: string;
  }
  
  export interface VnfParametersListNRCellDU {
    db: Db19;
    ds: Db19;
  }
  
  export interface Db19 {
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
  
  export interface PeeParametersListNRCellDU {
    db: Db18;
    ds: Db18;
  }
  
  export interface Db18 {
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
  
  export interface VnfParametersListNRSector {
    db: Db17;
    ds: Db17;
  }
  
  export interface Db17 {
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
  
  export interface PeeParametersListNRSector {
    db: Db16;
    ds: Db16;
  }
  
  export interface Db16 {
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
  
  export interface BWP {
    db: Db15;
    ds: Db15;
  }
  
  export interface Db15 {
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
  
  export interface NRSectorCarrier {
    db: Db14;
    ds: Db14;
  }
  
  export interface Db14 {
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
  
  export interface EPF1CDU {
    db: Db13;
    ds: Db13;
  }
  
  export interface Db13 {
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
  
  export interface VnfParametersListDU {
    db: Db12;
    ds: Db12;
  }
  
  export interface Db12 {
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
  
  export interface PeeParametersListDU {
    db: Db11;
    ds: Db11;
  }
  
  export interface Db11 {
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
  
  export interface NRCellDU {
    db: Db10;
    ds: Db10;
  }
  
  export interface Db10 {
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
  
  export interface GNBDUFunction {
    db: Db9;
    ds: Db9;
  }
  
  export interface Db9 {
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: string;
    pLMNId_MNC: string;
    gNBDUId: number;
    gNBDUName: string;
    componentId: string;
    id: string;
  }
  
  export interface SNSSAIleafListNRCellCU {
    db: Db8;
    ds: Db8;
  }
  
  export interface Db8 {
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: string;
    pLMNId_MNC: string;
    cellLocalId: string;
    s_NSSAI: number;
    id: string;
  }
  
  export interface VnfParametersListNRCellCU {
    db: Db7;
    ds: Db7;
  }
  
  export interface Db7 {
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
  
  export interface PeeParametersListNRCellCU {
    db: Db6;
    ds: Db6;
  }
  
  export interface Db6 {
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
  
  export interface EPF1CCU {
    db: Db5;
    ds: Db5;
  }
  
  export interface Db5 {
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: string;
    pLMNId_MNC: string;
    localAddress_ip_addr: string;
    localAddress_vlan_id: string;
    remoteAddress: string;
    id: string;
  }
  
  export interface VnfParametersListCU {
    db: Db4;
    ds: Db4;
  }
  
  export interface Db4 {
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
  
  export interface PeeParametersListCU {
    db: Db3;
    ds: Db3;
  }
  
  export interface Db3 {
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
  
  export interface NRCellCU {
    db: Db2;
    ds: Db2;
  }
  
  export interface Db2 {
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
  
  export interface GNBCUFunction {
    db: Db;
    ds: Db;
  }
  
  export interface Db {
    gNBId: number;
    gNBIdLength: number;
    'gNB-type': string;
    gNBCUName: string;
    pLMNId_MCC: string;
    pLMNId_MNC: string;
    componentId: string;
    id: string;
  }
  
  export interface Cellinfo {
    nRPCI: number;
    nRTAC: string;
    arfcnDL: number;
    arfcnUL: number;
    bSChannelBwDL: number;
    configuredMaxTxPower: number;
    pLMNId_MCC: string;
    pLMNId_MNC: string;
    nci: string;
  }
  
  export interface Components_dist {
    [cuID: string]: duID;
  }
  
  export interface duID {
    [DUid: string]: ruID[];
  }
  
  export interface ruID {
    [RUid: string]: string;
  }

