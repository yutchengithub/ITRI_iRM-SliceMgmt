  
  // @2024/04/29 Add
  // 用於建立 All-in-one BS 時 Submit 用的 interface
  export interface CreateBs {
    session: string;
    name: string;
    bstype: string;
    position: string;
    components: Component_All[];
    description: string;
    componentsInfo: ComponentsInfo_All;
  }
  
  export interface ComponentsInfo_All {
    gNBCUFunction: GNBCUFunction[];
    peeParametersList_CU: PeeParametersListCU[];
    vnfParametersList_CU: VnfParametersListCU[];
    EP_F1C_CU: EPF1CCU[];
    EP_F1U_CU: EPF1CCU[];
    EP_NgC: EPF1CCU[];
    EP_NgU: EPF1CCU[];
    NRCellCU: NRCellCU[];
    peeParametersList_NRCellCU: PeeParametersListNRCellCU[];
    vnfParametersList_NRCellCU: VnfParametersListNRCellCU[];
    s_NSSAI_leafList_NRCellCU: SNSSAIleafListNRCellCU[];
    gNBDUFunction: GNBDUFunction[];
    peeParametersList_DU: PeeParametersListDU[];
    vnfParametersList_DU: VnfParametersListDU[];
    EP_F1C_DU: EPF1CDU[];
    EP_F1U_DU: EPF1CDU[];
    NRCellDU: NRCellDU[];
    peeParametersList_NRCellDU: PeeParametersListNRCellDU[];
    vnfParametersList_NRCellDU: VnfParametersListNRCellDU[];
    s_NSSAI_leafList_NRCellDU: SNSSAIleafListNRCellDU[];
    NRSectorCarrierRef_NRCellDU: NRSectorCarrierRefNRCellDU[];
    bWPRef_leafList_NRCellDU: BWPRefleafListNRCellDU[];
    NRSectorCarrier: NRSectorCarrier[];
    peeParametersList_NRSector: PeeParametersListNRSector[];
    vnfParametersList_NRSector: VnfParametersListNRSector[];
    BWP: BWP[];
    peeParametersList_BWP: PeeParametersListNRSector[];
    vnfParametersList_BWP: VnfParametersListNRSector[];
  }
  
  export interface BWP {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    bwpContext: number;
    isInitialBwp: number;
    subCarrierSpacing: number;
    cyclicPrefix: number;
    startRB: number;
    numberOfRBs: number;
  }
  
  export interface VnfParametersListNRSector {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    idRef: number;
    autoScalable: boolean;
    flavourId: number;
    vnfInstanceId: number;
    vnfdId: number;
  }
  
  export interface PeeParametersListNRSector {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    idRef: number;
    environmentType: string;
    equipmentType: string;
    powerInterface: string;
    siteDescription: string;
    siteIdentification: string;
    siteLatitude: number;
    siteLongitude: number;
  }
  
  export interface NRSectorCarrier {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    arfcnDL: number;
    arfcnUL: number;
    bSChannelBwDL: number;
    bSChannelBwUL: number;
    txDirection: string;
    configuredMaxTxPower: number;
    configuredMaxTxEIRP: number;
  }
  
  export interface BWPRefleafListNRCellDU {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    cellLocalId: number;
    bWPRef: number;
  }
  
  export interface NRSectorCarrierRefNRCellDU {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    cellLocalId: number;
    NRSectorCarrierRef: number;
  }
  
  export interface SNSSAIleafListNRCellDU {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    cellLocalId: number;
    s_NSSAI: number;
  }
  
  export interface VnfParametersListNRCellDU {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    cellLocalId: number;
    autoScalable: boolean;
    flavourId: number;
    vnfInstanceId: number;
    vnfdId: number;
  }
  
  export interface PeeParametersListNRCellDU {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    cellLocalId: number;
    environmentType: string;
    equipmentType: string;
    powerInterface: string;
    siteDescription: string;
    siteIdentification: string;
    siteLatitude: number;
    siteLongitude: number;
  }
  
  export interface NRCellDU {
    componentId: string;
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    cellLocalId: number;
    nRPCI: number;
    nRTAC: number;
    administrativeState: string;
    arfcnDL: number;
    arfcnSUL: number;
    arfcnUL: number;
    bSChannelBwDL: number;
    bSChannelBwSUL: number;
    bSChannelBwUL: number;
    ssbFrequency: number;
    ssbPeriodicity: number;
    ssbSubCarrierSpacing: number;
    ssbOffset: number;
    ssbDuration: number;
  }
  
  export interface EPF1CDU {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    localAddress_ip_addr: string;
    localAddress_vlan_id: number;
    remoteAddress: string;
  }
  
  export interface VnfParametersListDU {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    autoScalable: boolean;
    flavourId: number;
    vnfInstanceId: number;
    vnfdId: number;
  }
  
  export interface PeeParametersListDU {
    id: number;
    gNBDUId: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    environmentType: string;
    equipmentType: string;
    powerInterface: string;
    siteDescription: string;
    siteIdentification: string;
    siteLatitude: number;
    siteLongitude: number;
  }
  
  export interface GNBDUFunction {
    componentId: string;
    id: number;
    gNBDUId: number;
    gNBDUName: string;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
  }
  
  export interface SNSSAIleafListNRCellCU {
    id: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    cellLocalId: number;
    s_NSSAI: number;
  }
  
  export interface VnfParametersListNRCellCU {
    id: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    cellLocalId: number;
    autoScalable: boolean;
    flavourId: number;
    vnfInstanceId: number;
    vnfdId: number;
  }
  
  export interface PeeParametersListNRCellCU {
    id: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    cellLocalId: number;
    environmentType: string;
    equipmentType: string;
    powerInterface: string;
    siteDescription: string;
    siteIdentification: string;
    siteLatitude: number;
    siteLongitude: number;
  }
  
  export interface NRCellCU {
    componentId: string;
    id: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    cellLocalId: number;
    absoluteFrequencySSB: number;
    sSBSubCarrierSpacing: number;
  }
  
  export interface EPF1CCU {
    id: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    localAddress_ip_addr: string;
    localAddress_vlan_id: number;
    remoteAddress: string;
  }
  
  export interface VnfParametersListCU {
    id: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    autoScalable: boolean;
    flavourId: number;
    vnfInstanceId: number;
    vnfdId: number;
  }
  
  export interface PeeParametersListCU {
    id: number;
    gNBId: number;
    gNBIdLength: number;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
    environmentType: string;
    equipmentType: string;
    powerInterface: string;
    siteDescription: string;
    siteIdentification: string;
    siteLatitude: number;
    siteLongitude: number;
  }
  
  export interface GNBCUFunction {
    componentId: string;
    id: number;
    gNBCUName: string;
    gNBId: number;
    gNBIdLength: number;
    gNB_type: string;
    pLMNId_MCC: number;
    pLMNId_MNC: number;
  }
  
  export interface Component_All {
    type: string;
    id: string;
    position?:string
  }