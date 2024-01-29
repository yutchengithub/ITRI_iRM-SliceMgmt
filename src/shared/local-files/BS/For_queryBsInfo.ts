  
  // Interfaces of BSInfo
  import { BSInfo } from '../../interfaces/BS/For_queryBsInfo_BS';   // @12/27 Add by yuchen
  import { BSInfo_dist } from '../../interfaces/BS/For_queryBsInfo_dist_BS';   // @12/27 Add by yuchen

  // Local Files for general BS @12/27 Add by yuchen 
  export class localBSinfo {
  
    bsInfo_local: BSInfo[] = [
        {
            "info": {
              "bs-conf": {
                "plmn-id": {
                  "mcc": "466",
                  "mnc": "55"
                },
                "nci": "000028108",
                "pci": 157,
                "nrarfcn-dl": 723333,
                "nrarfcn-ul": 723333,
                "duplex-mode": "",
                "channel-bandwidth": 20,
                "tac": "3000",
                "tx-power": 11
              },
              "gNBId": 10,
              "gNBIdLength": 22,
              "gNB-type": "SA",
              "gNBCUName": "cu1",
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55",
              "id": "0"
            },
            "extension_info": [
              {
                "gNBId": 10,
                "gNBIdLength": 22,
                "cellLocalId": "100001000",
                "nci": "000028108",
                "NRCellCU": {
                  "db": {
                    "componentId": "38b0f49a811646599ec1",
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  },
                  "ds": {
                    "componentId": "38b0f49a811646599ec1",
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  }
                },
                "gNBCUFunction": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "38b0f49a811646599ec1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "38b0f49a811646599ec1",
                    "id": "0"
                  }
                },
                "peeParametersList_CU": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_CU": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_CU": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  }
                },
                "EP_F1U_CU": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  }
                },
                "EP_NgC": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  }
                },
                "EP_NgU": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellCU": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "gNBDUFunction": {
                  "db": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "38b0f49a811646599ec1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "38b0f49a811646599ec1",
                    "id": "0"
                  }
                },
                "NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 157,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "componentId": "38b0f49a811646599ec1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 100,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "id": "0",
                    "componentId": "38b0f49a811646599ec1"
                  }
                },
                "peeParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  }
                },
                "EP_F1U_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrierRef_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  }
                },
                "bWPRef_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrier": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 11,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 10,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  }
                },
                "BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  }
                },
                "peeParametersList_NRSector": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.1111",
                    "siteLongitude": "10.2222",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.1111",
                    "siteLongitude": "10.2222",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRSector": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "peeParametersList_BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.3333",
                    "siteLongitude": "10.4444",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.3333",
                    "siteLongitude": "10.4444",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 10,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                }
              }
            ],
            "cellInfo": {},
            "anr": {
              "anr-son-output": {
                "neighbor": [
                  {
                    "id": "",
                    "nci": "00001c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 152,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000040108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 153,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000018108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 140,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00002c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 154,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024002",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 159,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024001",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 158,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024003",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 137,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024004",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 155,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00003c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 160,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000014108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 142,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000030108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 141,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000044108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 143,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000034108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 144,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000020108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 145,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  }
                ]
              }
            },
            "pci": {},
            "cco": {},
            "id": "c9bb081540ea4752982f",
            "name": "BS10",
            "ip": "",
            "port": "",
            "position": "[121.044568,24.775007]",
            "description": "BS10",
            "bstype": 1,
            "components": [
                {
                "type": "cu+du+ru",
                "id": "38b0f49a811646599ec1"
                }
            ],
            "status": 2,
            "laston": "2023-12-26 12:27:27.893742",
            "lastoff": "2023-12-26 04:59:25.910216",
            "components-info": {
              "38b0f49a811646599ec1": {
                "firm": "ITRI",
                "modelname": "A001",
                "components-sw-inventory": {
                  "software-inventory": {
                    "software-slot": [
                      {
                        "name": "slot-1",
                        "status": "VALID",
                        "active": "true",
                        "running": "true",
                        "access": "READ_ONLY",
                        "vendor-code": "K2",
                        "build-id": "b01",
                        "build-name": "product-default",
                        "build-version": "0.1.0",
                        "files": {
                          "name": "file-1",
                          "version": "0.2.3",
                          "local-path": "~/some_dir/",
                          "integrity": "OK"
                        }
                      },
                      {
                        "name": "slot-2",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-3",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-4",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      }
                    ]
                  }
                }
              }
            }
        },
        {
            "info": {
              "bs-conf": {
                "plmn-id": {
                  "mcc": "466",
                  "mnc": "55"
                },
                "nci": "00003c108",
                "pci": 160,
                "nrarfcn-dl": 723333,
                "nrarfcn-ul": 723333,
                "duplex-mode": "",
                "channel-bandwidth": 20,
                "tac": "3000",
                "tx-power": 11
              },
              "gNBId": 15,
              "gNBIdLength": 22,
              "gNB-type": "SA",
              "gNBCUName": "cu1",
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55",
              "id": "0"
            },
            "extension_info": [
              {
                "gNBId": 15,
                "gNBIdLength": 22,
                "cellLocalId": "100001000",
                "nci": "00003c108",
                "NRCellCU": {
                  "db": {
                    "componentId": "768ba7fe80cd4360bbb5",
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  },
                  "ds": {
                    "componentId": "768ba7fe80cd4360bbb5",
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  }
                },
                "gNBCUFunction": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "768ba7fe80cd4360bbb5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "768ba7fe80cd4360bbb5",
                    "id": "0"
                  }
                },
                "peeParametersList_CU": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_CU": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_CU": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  }
                },
                "EP_F1U_CU": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  }
                },
                "EP_NgC": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  }
                },
                "EP_NgU": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellCU": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "gNBDUFunction": {
                  "db": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "768ba7fe80cd4360bbb5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "768ba7fe80cd4360bbb5",
                    "id": "0"
                  }
                },
                "NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 160,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "componentId": "768ba7fe80cd4360bbb5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 100,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "id": "0",
                    "componentId": "768ba7fe80cd4360bbb5"
                  }
                },
                "peeParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  }
                },
                "EP_F1U_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrierRef_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  }
                },
                "bWPRef_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrier": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 11,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "bSChannelBwDL": 20,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 10,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  }
                },
                "BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 15,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  }
                },
                "peeParametersList_NRSector": null,
                "vnfParametersList_NRSector": null,
                "peeParametersList_BWP": null,
                "vnfParametersList_BWP": null
              }
            ],
            "cellInfo": {},
            "anr": {
              "anr-son-output": {
                "neighbor": [
                  {
                    "id": "",
                    "nci": "00004c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 146,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000040108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 153,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000048108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 100,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00002c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 154,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024002",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 159,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000038108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 156,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000054108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 147,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000050108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 150,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000044108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 143,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000028108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 157,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000034108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 144,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  }
                ]
              }
            },
            "pci": {},
            "cco": {},
            "id": "6d1288b6ea8b4334af33",
            "name": "BS15",
            "ip": "",
            "port": "",
            "position": "[121.046958,24.773829]",
            "description": "BS15",
            "bstype": 1,
            "components":[
                {
                    "type": "cu+du+ru",
                    "id": "768ba7fe80cd4360bbb5"
                }
            ],
            "status": 2,
            "laston": "2023-12-27 16:41:32.052834",
            "lastoff": "2023-12-27 16:15:07.202471",
            "components-info": {
              "768ba7fe80cd4360bbb5": {
                "firm": "ITRI",
                "modelname": "A001",
                "components-sw-inventory": {
                  "software-inventory": {
                    "software-slot": [
                      {
                        "name": "slot-1",
                        "status": "VALID",
                        "active": "true",
                        "running": "true",
                        "access": "READ_ONLY",
                        "vendor-code": "K2",
                        "build-id": "b01",
                        "build-name": "product-default",
                        "build-version": "0.1.0",
                        "files": {
                          "name": "file-1",
                          "version": "0.2.3",
                          "local-path": "~/some_dir/",
                          "integrity": "OK"
                        }
                      },
                      {
                        "name": "slot-2",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-3",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-4",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      }
                    ]
                  }
                }
              }
            }
        },
        {
            "info": {
              "bs-conf": {
                "plmn-id": {
                  "mcc": "466",
                  "mnc": "55"
                },
                "nci": "000040108",
                "pci": 153,
                "nrarfcn-dl": 723333,
                "nrarfcn-ul": 723333,
                "duplex-mode": "",
                "channel-bandwidth": 20,
                "tac": "3000",
                "tx-power": 11
              },
              "gNBId": 16,
              "gNBIdLength": 22,
              "gNB-type": "SA",
              "gNBCUName": "cu1",
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55",
              "id": "0"
            },
            "extension_info": [
              {
                "gNBId": 16,
                "gNBIdLength": 22,
                "cellLocalId": "100001000",
                "nci": "000040108",
                "NRCellCU": {
                  "db": {
                    "componentId": "2ec4af101a5b4eb4884a",
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  },
                  "ds": {
                    "componentId": "2ec4af101a5b4eb4884a",
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  }
                },
                "gNBCUFunction": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "2ec4af101a5b4eb4884a",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "2ec4af101a5b4eb4884a",
                    "id": "0"
                  }
                },
                "peeParametersList_CU": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_CU": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_CU": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  }
                },
                "EP_F1U_CU": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  }
                },
                "EP_NgC": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  }
                },
                "EP_NgU": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellCU": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "gNBDUFunction": {
                  "db": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "2ec4af101a5b4eb4884a",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "2ec4af101a5b4eb4884a",
                    "id": "0"
                  }
                },
                "NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 153,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "componentId": "2ec4af101a5b4eb4884a",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 100,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "id": "0",
                    "componentId": "2ec4af101a5b4eb4884a"
                  }
                },
                "peeParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  }
                },
                "EP_F1U_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrierRef_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  }
                },
                "bWPRef_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrier": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 11,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "bSChannelBwDL": 20,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 10,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  }
                },
                "BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 16,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  }
                },
                "peeParametersList_NRSector": null,
                "vnfParametersList_NRSector": null,
                "peeParametersList_BWP": null,
                "vnfParametersList_BWP": null
              }
            ],
            "cellInfo": {},
            "anr": {
              "anr-son-output": {
                "neighbor": [
                  {
                    "id": "",
                    "nci": "00004c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 146,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000048108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 100,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00002c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 154,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024002",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 159,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024001",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 158,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024003",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 137,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024004",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 155,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00003c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 160,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000050108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 150,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000044108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 143,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000028108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 157,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  }
                ]
              }
            },
            "pci": {},
            "cco": {},
            "id": "2b072e0d7f634ec5abce",
            "name": "BS16",
            "ip": "",
            "port": "",
            "position": "[121.045482,24.772981]",
            "description": "BS16",
            "bstype": 1,
            "components": [
                {
                    "type": "cu+du+ru",
                    "id": "2ec4af101a5b4eb4884a"
                }
            ],
            "status": 2,
            "laston": "2023-12-27 16:42:30.520801",
            "lastoff": "2023-12-27 11:31:22.997680",
            "components-info": {
              "2ec4af101a5b4eb4884a": {
                "firm": "ITRI",
                "modelname": "A001",
                "components-sw-inventory": {
                  "software-inventory": {
                    "software-slot": [
                      {
                        "name": "slot-1",
                        "status": "VALID",
                        "active": "true",
                        "running": "true",
                        "access": "READ_ONLY",
                        "vendor-code": "K2",
                        "build-id": "b01",
                        "build-name": "product-default",
                        "build-version": "0.1.0",
                        "files": {
                          "name": "file-1",
                          "version": "0.2.3",
                          "local-path": "~/some_dir/",
                          "integrity": "OK"
                        }
                      },
                      {
                        "name": "slot-2",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-3",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-4",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      }
                    ]
                  }
                }
              }
            }
        },
        {
            "info": {
              "bs-conf": {
                "plmn-id": {
                  "mcc": "466",
                  "mnc": "55"
                },
                "nci": "000038108",
                "pci": 156,
                "nrarfcn-dl": 723333,
                "nrarfcn-ul": 723333,
                "duplex-mode": "",
                "channel-bandwidth": 20,
                "tac": "3000",
                "tx-power": 11
              },
              "gNBId": 14,
              "gNBIdLength": 22,
              "gNB-type": "SA",
              "gNBCUName": "cu1",
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55",
              "id": "0"
            },
            "extension_info": [
              {
                "gNBId": 14,
                "gNBIdLength": 22,
                "cellLocalId": "100001000",
                "nci": "000038108",
                "NRCellCU": {
                  "db": {
                    "componentId": "34022d76fefa4bb4a848",
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  },
                  "ds": {
                    "componentId": "34022d76fefa4bb4a848",
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  }
                },
                "gNBCUFunction": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "34022d76fefa4bb4a848",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "34022d76fefa4bb4a848",
                    "id": "0"
                  }
                },
                "peeParametersList_CU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_CU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_CU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  }
                },
                "EP_F1U_CU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  }
                },
                "EP_NgC": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  }
                },
                "EP_NgU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellCU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "gNBDUFunction": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "34022d76fefa4bb4a848",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "34022d76fefa4bb4a848",
                    "id": "0"
                  }
                },
                "NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 156,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "componentId": "34022d76fefa4bb4a848",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 100,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "id": "0",
                    "componentId": "34022d76fefa4bb4a848"
                  }
                },
                "peeParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  }
                },
                "EP_F1U_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrierRef_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  }
                },
                "bWPRef_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrier": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 11,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "bSChannelBwDL": 20,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 10,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  }
                },
                "BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  }
                },
                "peeParametersList_NRSector": null,
                "vnfParametersList_NRSector": null,
                "peeParametersList_BWP": null,
                "vnfParametersList_BWP": null
              }
            ],
            "cellInfo": {},
            "anr": {
              "anr-son-output": {
                "neighbor": [
                  {
                    "id": "",
                    "nci": "00004c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 146,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000048108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 100,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00002c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 154,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024002",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 159,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00003c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 160,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000054108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 147,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000044108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 143,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000034108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 144,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  }
                ]
              }
            },
            "pci": {},
            "cco": {},
            "id": "7908a3e8cdf94229ac18",
            "name": "BS14",
            "ip": "",
            "port": "",
            "position": "[121.047552,24.774682]",
            "description": "BS14",
            "bstype": 1,
            "components": [
                {
                    "type": "cu+du+ru",
                    "id": "34022d76fefa4bb4a848"
                }
            ],
            "status": 2,
            "laston": "2023-12-27 16:43:33.558865",
            "lastoff": "2023-12-27 13:57:07.411214",
            "components-info": {
              "34022d76fefa4bb4a848": {
                "firm": "ITRI",
                "modelname": "A001",
                "components-sw-inventory": {
                  "software-inventory": {
                    "software-slot": [
                      {
                        "name": "slot-1",
                        "status": "VALID",
                        "active": "true",
                        "running": "true",
                        "access": "READ_ONLY",
                        "vendor-code": "K2",
                        "build-id": "b01",
                        "build-name": "product-default",
                        "build-version": "0.1.0",
                        "files": {
                          "name": "file-1",
                          "version": "0.2.3",
                          "local-path": "~/some_dir/",
                          "integrity": "OK"
                        }
                      },
                      {
                        "name": "slot-2",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-3",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-4",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      }
                    ]
                  }
                }
              }
            }
        },
        {
            "info": {
              "bs-conf": {
                "plmn-id": {
                  "mcc": "466",
                  "mnc": "55"
                },
                "nci": "000038108",
                "pci": 156,
                "nrarfcn-dl": 723333,
                "nrarfcn-ul": 723333,
                "duplex-mode": "",
                "channel-bandwidth": 20,
                "tac": "3000",
                "tx-power": 11
              },
              "gNBId": 14,
              "gNBIdLength": 22,
              "gNB-type": "SA",
              "gNBCUName": "cu1",
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55",
              "id": "0"
            },
            "extension_info": [
              {
                "gNBId": 14,
                "gNBIdLength": 22,
                "cellLocalId": "100001000",
                "nci": "000038108",
                "NRCellCU": {
                  "db": {
                    "componentId": "34022d76fefa4bb4a848",
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  },
                  "ds": {
                    "componentId": "34022d76fefa4bb4a848",
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  }
                },
                "gNBCUFunction": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "34022d76fefa4bb4a848",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "34022d76fefa4bb4a848",
                    "id": "0"
                  }
                },
                "peeParametersList_CU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_CU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_CU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  }
                },
                "EP_F1U_CU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  }
                },
                "EP_NgC": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  }
                },
                "EP_NgU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellCU": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "gNBDUFunction": {
                  "db": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "34022d76fefa4bb4a848",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "34022d76fefa4bb4a848",
                    "id": "0"
                  }
                },
                "NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 156,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "componentId": "34022d76fefa4bb4a848",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 100,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "id": "0",
                    "componentId": "34022d76fefa4bb4a848"
                  }
                },
                "peeParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  }
                },
                "EP_F1U_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrierRef_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  }
                },
                "bWPRef_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrier": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 11,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "bSChannelBwDL": 20,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 10,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  }
                },
                "BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 14,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  }
                },
                "peeParametersList_NRSector": null,
                "vnfParametersList_NRSector": null,
                "peeParametersList_BWP": null,
                "vnfParametersList_BWP": null
              }
            ],
            "cellInfo": {},
            "anr": {
              "anr-son-output": {
                "neighbor": [
                  {
                    "id": "",
                    "nci": "00004c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 146,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000048108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 100,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00002c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 154,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024002",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 159,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00003c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 160,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000054108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 147,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000044108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 143,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000034108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 144,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  }
                ]
              }
            },
            "pci": {},
            "cco": {},
            "id": "7908a3e8cdf94229ac18",
            "name": "BS14",
            "ip": "",
            "port": "",
            "position": "[121.047552,24.774682]",
            "description": "BS14",
            "bstype": 1,
            "components": [
              {
                "type": "cu+du+ru",
                "id": "34022d76fefa4bb4a848"
              }
            ],
            "status": 2,
            "laston": "2023-12-27 16:44:35.431289",
            "lastoff": "2023-12-27 13:57:07.411214",
            "components-info": {
              "34022d76fefa4bb4a848": {
                "firm": "ITRI",
                "modelname": "A001",
                "components-sw-inventory": {
                  "software-inventory": {
                    "software-slot": [
                      {
                        "name": "slot-1",
                        "status": "VALID",
                        "active": "true",
                        "running": "true",
                        "access": "READ_ONLY",
                        "vendor-code": "K2",
                        "build-id": "b01",
                        "build-name": "product-default",
                        "build-version": "0.1.0",
                        "files": {
                          "name": "file-1",
                          "version": "0.2.3",
                          "local-path": "~/some_dir/",
                          "integrity": "OK"
                        }
                      },
                      {
                        "name": "slot-2",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-3",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-4",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      }
                    ]
                  }
                }
              }
            }
        },
        {
            "info": {
              "bs-conf": {
                "plmn-id": {
                  "mcc": "466",
                  "mnc": "55"
                },
                "nci": "000034108",
                "pci": 144,
                "nrarfcn-dl": 723333,
                "nrarfcn-ul": 723333,
                "duplex-mode": "",
                "channel-bandwidth": 20,
                "tac": "3000",
                "tx-power": 11
              },
              "gNBId": 13,
              "gNBIdLength": 22,
              "gNB-type": "SA",
              "gNBCUName": "cu1",
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55",
              "id": "0"
            },
            "extension_info": [
              {
                "gNBId": 13,
                "gNBIdLength": 22,
                "cellLocalId": "100001000",
                "nci": "000034108",
                "NRCellCU": {
                  "db": {
                    "componentId": "5ae9c2ee3c9f4437811f",
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  },
                  "ds": {
                    "componentId": "5ae9c2ee3c9f4437811f",
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  }
                },
                "gNBCUFunction": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "5ae9c2ee3c9f4437811f",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "componentId": "5ae9c2ee3c9f4437811f",
                    "id": "0"
                  }
                },
                "peeParametersList_CU": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_CU": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_CU": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  }
                },
                "EP_F1U_CU": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  }
                },
                "EP_NgC": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  }
                },
                "EP_NgU": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellCU": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "gNBDUFunction": {
                  "db": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "5ae9c2ee3c9f4437811f",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "5ae9c2ee3c9f4437811f",
                    "id": "0"
                  }
                },
                "NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 144,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "componentId": "5ae9c2ee3c9f4437811f",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "administrativeState": "Locked",
                    "nRPCI": 100,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "id": "0",
                    "componentId": "5ae9c2ee3c9f4437811f"
                  }
                },
                "peeParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  }
                },
                "EP_F1U_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrierRef_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  }
                },
                "bWPRef_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "cellLocalId": "100001000",
                    "bWPRef": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrier": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 11,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "bSChannelBwDL": 20,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 10,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  }
                },
                "BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 13,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "55",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  }
                },
                "peeParametersList_NRSector": null,
                "vnfParametersList_NRSector": null,
                "peeParametersList_BWP": null,
                "vnfParametersList_BWP": null
              }
            ],
            "cellInfo": {},
            "anr": {
              "anr-son-output": {
                "neighbor": [
                  {
                    "id": "",
                    "nci": "00001c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 152,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000048108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 100,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00002c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 154,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024002",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 159,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000024001",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "66"
                    },
                    "nrarfcn": 4850,
                    "pci": 158,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "00003c108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 160,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000038108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 156,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000030108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 141,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000044108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 143,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  },
                  {
                    "id": "",
                    "nci": "000028108",
                    "enable": "0",
                    "alias": "xxxxxxxxxxxxxxxxxx",
                    "must-include": "",
                    "plmn-id": {
                      "mcc": "466",
                      "mnc": "55"
                    },
                    "nrarfcn": 4850,
                    "pci": 157,
                    "q-offset": "",
                    "cio": "",
                    "rs-tx-power": "",
                    "blacklisted": "",
                    "tac": ""
                  }
                ]
              }
            },
            "pci": {},
            "cco": {},
            "id": "dac6f2a55f774233bae4",
            "name": "BS13",
            "ip": "",
            "port": "",
            "position": "[121.046205,24.775695]",
            "description": "BS13",
            "bstype": 1,
            "components": [
              {
                "type": "cu+du+ru",
                "id": "5ae9c2ee3c9f4437811f"
              }
            ],
            "status": 2,
            "laston": "2023-12-27 16:50:44.758011",
            "lastoff": "2023-12-27 08:04:12.119111",
            "components-info": {
              "5ae9c2ee3c9f4437811f": {
                "firm": "ITRI",
                "modelname": "A001",
                "components-sw-inventory": {
                  "software-inventory": {
                    "software-slot": [
                      {
                        "name": "slot-1",
                        "status": "VALID",
                        "active": "true",
                        "running": "true",
                        "access": "READ_ONLY",
                        "vendor-code": "K2",
                        "build-id": "b01",
                        "build-name": "product-default",
                        "build-version": "0.1.0",
                        "files": {
                          "name": "file-1",
                          "version": "0.2.3",
                          "local-path": "~/some_dir/",
                          "integrity": "OK"
                        }
                      },
                      {
                        "name": "slot-2",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-3",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      },
                      {
                        "name": "slot-4",
                        "status": "EMPTY",
                        "active": "false",
                        "running": "false",
                        "access": "READ_WRITE"
                      }
                    ]
                  }
                }
              }
            }
        },
        {
          "info": {
            "bs-conf": {
              "plmn-id": {
                "mcc": "466",
                "mnc": "55"
              },
              "nci": "000004108",
              "pci": 139,
              "nrarfcn-dl": 723333,
              "nrarfcn-ul": 723333,
              "duplex-mode": "",
              "channel-bandwidth": 20,
              "tac": "3000",
              "tx-power": 16
            },
            "gNBId": 1,
            "gNBIdLength": 22,
            "gNB-type": "SA",
            "gNBCUName": "cu1",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "id": "0"
          },
          "extension_info": [
            {
              "gNBId": 1,
              "gNBIdLength": 22,
              "cellLocalId": "100001000",
              "nci": "000004108",
              "NRCellCU": {
                "db": {
                  "componentId": "af04b2ee83c14d34902c",
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                },
                "ds": {
                  "componentId": "af04b2ee83c14d34902c",
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                }
              },
              "gNBCUFunction": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "af04b2ee83c14d34902c",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "af04b2ee83c14d34902c",
                  "id": "0"
                }
              },
              "peeParametersList_CU": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_CU": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_CU": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                }
              },
              "EP_F1U_CU": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                }
              },
              "EP_NgC": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "192.168.120.42",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "192.168.120.1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                }
              },
              "EP_NgU": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "5.5.5.42",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "5.5.5.1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellCU": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellCU": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellCU": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "gNBDUFunction": {
                "db": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "af04b2ee83c14d34902c",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "af04b2ee83c14d34902c",
                  "id": "0"
                }
              },
              "NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 139,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "componentId": "af04b2ee83c14d34902c",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 100,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "id": "0",
                  "componentId": "af04b2ee83c14d34902c"
                }
              },
              "peeParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                }
              },
              "EP_F1U_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrierRef_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                }
              },
              "bWPRef_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrier": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 16,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "bSChannelBwDL": 20,
                  "bSChannelBwUL": 100,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 10,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 649788,
                  "arfcnUL": 649788,
                  "bSChannelBwDL": 100,
                  "bSChannelBwUL": 100,
                  "id": "0"
                }
              },
              "BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 1,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                }
              },
              "peeParametersList_NRSector": null,
              "vnfParametersList_NRSector": null,
              "peeParametersList_BWP": null,
              "vnfParametersList_BWP": null
            }
          ],
          "cellInfo": {},
          "anr": {
            "anr-son-output": {
              "neighbor": [
                {
                  "id": "",
                  "nci": "000018108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 140,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000014108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 142,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000008108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 148,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000010108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 149,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000020108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 145,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                }
              ]
            }
          },
          "pci": {},
          "cco": {},
          "id": "97a606c4994344e09d3b",
          "name": "BS1",
          "ip": "",
          "port": "",
          "position": "[121.041167,24.776393]",
          "description": "BS01",
          "bstype": 1,
          "components": [
            {
              "type": "cu+du+ru",
              "id": "af04b2ee83c14d34902c"
            }
          ],
          "status": 2,
          "laston": "2023-12-27 19:11:17.479423",
          "lastoff": "2023-12-27 16:16:27.848354",
          "components-info": {
            "af04b2ee83c14d34902c": {
              "firm": "ITRI",
              "modelname": "A001",
              "components-sw-inventory": {
                "software-inventory": {
                  "software-slot": [
                    {
                      "name": "slot-1",
                      "status": "VALID",
                      "active": "true",
                      "running": "true",
                      "access": "READ_ONLY",
                      "vendor-code": "K2",
                      "build-id": "b01",
                      "build-name": "product-default",
                      "build-version": "0.1.0",
                      "files": {
                        "name": "file-1",
                        "version": "0.2.3",
                        "local-path": "~/some_dir/",
                        "integrity": "OK"
                      }
                    },
                    {
                      "name": "slot-2",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    },
                    {
                      "name": "slot-3",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    },
                    {
                      "name": "slot-4",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "info": {
            "bs-conf": {
              "plmn-id": {
                "mcc": "466",
                "mnc": "55"
              },
              "nci": "000028108",
              "pci": 157,
              "nrarfcn-dl": 723333,
              "nrarfcn-ul": 723333,
              "duplex-mode": "",
              "channel-bandwidth": 20,
              "tac": "3000",
              "tx-power": 11
            },
            "gNBId": 10,
            "gNBIdLength": 22,
            "gNB-type": "SA",
            "gNBCUName": "cu1",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "id": "0"
          },
          "extension_info": [
            {
              "gNBId": 10,
              "gNBIdLength": 22,
              "cellLocalId": "100001000",
              "nci": "000028108",
              "NRCellCU": {
                "db": {
                  "componentId": "38b0f49a811646599ec1",
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                },
                "ds": {
                  "componentId": "38b0f49a811646599ec1",
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                }
              },
              "gNBCUFunction": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "38b0f49a811646599ec1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "38b0f49a811646599ec1",
                  "id": "0"
                }
              },
              "peeParametersList_CU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_CU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_CU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                }
              },
              "EP_F1U_CU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                }
              },
              "EP_NgC": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                }
              },
              "EP_NgU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellCU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellCU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellCU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "gNBDUFunction": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "38b0f49a811646599ec1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "38b0f49a811646599ec1",
                  "id": "0"
                }
              },
              "NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 157,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "componentId": "38b0f49a811646599ec1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 100,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "id": "0",
                  "componentId": "38b0f49a811646599ec1"
                }
              },
              "peeParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                }
              },
              "EP_F1U_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrierRef_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                }
              },
              "bWPRef_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrier": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 11,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 649788,
                  "arfcnUL": 649788,
                  "bSChannelBwDL": 100,
                  "bSChannelBwUL": 100,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 10,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 649788,
                  "arfcnUL": 649788,
                  "bSChannelBwDL": 100,
                  "bSChannelBwUL": 100,
                  "id": "0"
                }
              },
              "BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                }
              },
              "peeParametersList_NRSector": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.1111",
                  "siteLongitude": "10.2222",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.1111",
                  "siteLongitude": "10.2222",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRSector": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "peeParametersList_BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.3333",
                  "siteLongitude": "10.4444",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.3333",
                  "siteLongitude": "10.4444",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              }
            }
          ],
          "cellInfo": {},
          "anr": {
            "anr-son-output": {
              "neighbor": [
                {
                  "id": "",
                  "nci": "00001c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 152,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000040108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 153,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000018108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 140,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "00002c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 154,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024002",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 159,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024001",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 158,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024003",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 137,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024004",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 155,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "00003c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 160,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000014108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 142,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000030108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 141,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000044108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 143,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000034108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 144,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000020108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 145,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                }
              ]
            }
          },
          "pci": {},
          "cco": {},
          "id": "c9bb081540ea4752982f",
          "name": "BS10",
          "ip": "",
          "port": "",
          "position": "[121.044568,24.775007]",
          "description": "BS10",
          "bstype": 1,
          "components": [
            {
              "type": "cu+du+ru",
              "id": "38b0f49a811646599ec1"
            }
          ],
          "status": 2,
          "laston": "2023-12-27 19:12:39.269252",
          "lastoff": "2023-12-27 08:04:12.004873",
          "components-info": {}
        },  
        {
          "info": {
            "bs-conf": {
              "plmn-id": {
                "mcc": "466",
                "mnc": "55"
              },
              "nci": "000018108",
              "pci": 140,
              "nrarfcn-dl": 723333,
              "nrarfcn-ul": 723333,
              "duplex-mode": "",
              "channel-bandwidth": 20,
              "tac": "3000",
              "tx-power": 11
            },
            "gNBId": 6,
            "gNBIdLength": 22,
            "gNB-type": "SA",
            "gNBCUName": "cu1",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "id": "0"
          },
          "extension_info": [
            {
              "gNBId": 6,
              "gNBIdLength": 22,
              "cellLocalId": "100001000",
              "nci": "000018108",
              "NRCellCU": {
                "db": {
                  "componentId": "c10e99eb5faf440f9404",
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                },
                "ds": {
                  "componentId": "c10e99eb5faf440f9404",
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                }
              },
              "gNBCUFunction": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "c10e99eb5faf440f9404",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "c10e99eb5faf440f9404",
                  "id": "0"
                }
              },
              "peeParametersList_CU": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_CU": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_CU": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                }
              },
              "EP_F1U_CU": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                }
              },
              "EP_NgC": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                }
              },
              "EP_NgU": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellCU": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellCU": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellCU": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "gNBDUFunction": {
                "db": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "c10e99eb5faf440f9404",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "c10e99eb5faf440f9404",
                  "id": "0"
                }
              },
              "NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 140,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "componentId": "c10e99eb5faf440f9404",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 100,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "id": "0",
                  "componentId": "c10e99eb5faf440f9404"
                }
              },
              "peeParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                }
              },
              "EP_F1U_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrierRef_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                }
              },
              "bWPRef_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrier": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 11,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "bSChannelBwDL": 20,
                  "bSChannelBwUL": 100,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 10,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 649788,
                  "arfcnUL": 649788,
                  "bSChannelBwDL": 100,
                  "bSChannelBwUL": 100,
                  "id": "0"
                }
              },
              "BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 6,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                }
              },
              "peeParametersList_NRSector": null,
              "vnfParametersList_NRSector": null,
              "peeParametersList_BWP": null,
              "vnfParametersList_BWP": null
            }
          ],
          "cellInfo": {},
          "anr": {
            "anr-son-output": {
              "neighbor": [
                {
                  "id": "",
                  "nci": "00001c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 152,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024001",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 158,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000014108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 142,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000030108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 141,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000004108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 139,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000008108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 148,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000028108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 157,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000010108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 149,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000020108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 145,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "00000c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 151,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                }
              ]
            }
          },
          "pci": {},
          "cco": {},
          "id": "31e8142a41f9411f8855",
          "name": "BS6",
          "ip": "",
          "port": "",
          "position": "[121.043187,24.776462]",
          "description": "BS06",
          "bstype": 1,
          "components": [
            {
              "type": "cu+du+ru",
              "id": "c10e99eb5faf440f9404"
            }
          ],
          "status": 2,
          "laston": "2023-12-27 19:13:34.537808",
          "lastoff": "2023-12-27 14:49:32.968495",
          "components-info": {
            "c10e99eb5faf440f9404": {
              "firm": "ITRI",
              "modelname": "A001",
              "components-sw-inventory": {
                "software-inventory": {
                  "software-slot": [
                    {
                      "name": "slot-1",
                      "status": "VALID",
                      "active": "true",
                      "running": "true",
                      "access": "READ_ONLY",
                      "vendor-code": "K2",
                      "build-id": "b01",
                      "build-name": "product-default",
                      "build-version": "0.1.0",
                      "files": {
                        "name": "file-1",
                        "version": "0.2.3",
                        "local-path": "~/some_dir/",
                        "integrity": "OK"
                      }
                    },
                    {
                      "name": "slot-2",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    },
                    {
                      "name": "slot-3",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    },
                    {
                      "name": "slot-4",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "info": {
            "bs-conf": {
              "plmn-id": {
                "mcc": "466",
                "mnc": "55"
              },
              "nci": "000028108",
              "pci": 157,
              "nrarfcn-dl": 723333,
              "nrarfcn-ul": 723333,
              "duplex-mode": "",
              "channel-bandwidth": 20,
              "tac": "3000",
              "tx-power": 11
            },
            "gNBId": 10,
            "gNBIdLength": 22,
            "gNB-type": "SA",
            "gNBCUName": "cu1",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "id": "0"
          },
          "extension_info": [
            {
              "gNBId": 10,
              "gNBIdLength": 22,
              "cellLocalId": "100001000",
              "nci": "000028108",
              "NRCellCU": {
                "db": {
                  "componentId": "38b0f49a811646599ec1",
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                },
                "ds": {
                  "componentId": "38b0f49a811646599ec1",
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                }
              },
              "gNBCUFunction": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "38b0f49a811646599ec1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "38b0f49a811646599ec1",
                  "id": "0"
                }
              },
              "peeParametersList_CU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_CU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_CU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                }
              },
              "EP_F1U_CU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                }
              },
              "EP_NgC": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                }
              },
              "EP_NgU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellCU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellCU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellCU": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "gNBDUFunction": {
                "db": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "38b0f49a811646599ec1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "38b0f49a811646599ec1",
                  "id": "0"
                }
              },
              "NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 157,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "componentId": "38b0f49a811646599ec1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 100,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "id": "0",
                  "componentId": "38b0f49a811646599ec1"
                }
              },
              "peeParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                }
              },
              "EP_F1U_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrierRef_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                }
              },
              "bWPRef_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrier": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 11,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 649788,
                  "arfcnUL": 649788,
                  "bSChannelBwDL": 100,
                  "bSChannelBwUL": 100,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 10,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 649788,
                  "arfcnUL": 649788,
                  "bSChannelBwDL": 100,
                  "bSChannelBwUL": 100,
                  "id": "0"
                }
              },
              "BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                }
              },
              "peeParametersList_NRSector": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.1111",
                  "siteLongitude": "10.2222",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.1111",
                  "siteLongitude": "10.2222",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRSector": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "peeParametersList_BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.3333",
                  "siteLongitude": "10.4444",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.3333",
                  "siteLongitude": "10.4444",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 10,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              }
            }
          ],
          "cellInfo": {},
          "anr": {
            "anr-son-output": {
              "neighbor": [
                {
                  "id": "",
                  "nci": "00001c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 152,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000040108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 153,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000018108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 140,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "00002c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 154,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024002",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 159,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024001",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 158,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024003",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 137,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024004",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 155,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "00003c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 160,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000014108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 142,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000030108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 141,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000044108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 143,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000034108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 144,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000020108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 145,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                }
              ]
            }
          },
          "pci": {},
          "cco": {},
          "id": "c9bb081540ea4752982f",
          "name": "BS10",
          "ip": "",
          "port": "",
          "position": "[121.044568,24.775007]",
          "description": "BS10",
          "bstype": 1,
          "components": [
            {
              "type": "cu+du+ru",
              "id": "38b0f49a811646599ec1"
            }
          ],
          "status": 2,
          "laston": "2023-12-27 19:13:36.793325",
          "lastoff": "2023-12-27 08:04:12.004873",
          "components-info": {
            "38b0f49a811646599ec1": {
              "firm": "ITRI",
              "modelname": "A001",
              "components-sw-inventory": {
                "software-inventory": {
                  "software-slot": [
                    {
                      "name": "slot-1",
                      "status": "VALID",
                      "active": "true",
                      "running": "true",
                      "access": "READ_ONLY",
                      "vendor-code": "K2",
                      "build-id": "b01",
                      "build-name": "product-default",
                      "build-version": "0.1.0",
                      "files": {
                        "name": "file-1",
                        "version": "0.2.3",
                        "local-path": "~/some_dir/",
                        "integrity": "OK"
                      }
                    },
                    {
                      "name": "slot-2",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    },
                    {
                      "name": "slot-3",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    },
                    {
                      "name": "slot-4",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "info": {
            "bs-conf": {
              "plmn-id": {
                "mcc": "466",
                "mnc": "55"
              },
              "nci": "00002c108",
              "pci": 154,
              "nrarfcn-dl": 723333,
              "nrarfcn-ul": 3333,
              "duplex-mode": "",
              "channel-bandwidth": 20,
              "tac": "3000",
              "tx-power": 11
            },
            "gNBId": 11,
            "gNBIdLength": 22,
            "gNB-type": "SA",
            "gNBCUName": "cu1",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "id": "0"
          },
          "extension_info": [
            {
              "gNBId": 11,
              "gNBIdLength": 22,
              "cellLocalId": "100001000",
              "nci": "00002c108",
              "NRCellCU": {
                "db": {
                  "componentId": "4279c2e2d3e4422d9e71",
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                },
                "ds": {
                  "componentId": "4279c2e2d3e4422d9e71",
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                }
              },
              "gNBCUFunction": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "4279c2e2d3e4422d9e71",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "4279c2e2d3e4422d9e71",
                  "id": "0"
                }
              },
              "peeParametersList_CU": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_CU": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_CU": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                }
              },
              "EP_F1U_CU": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                }
              },
              "EP_NgC": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                }
              },
              "EP_NgU": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellCU": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellCU": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellCU": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "gNBDUFunction": {
                "db": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "4279c2e2d3e4422d9e71",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "4279c2e2d3e4422d9e71",
                  "id": "0"
                }
              },
              "NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 154,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 3333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "componentId": "4279c2e2d3e4422d9e71",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 100,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "id": "0",
                  "componentId": "4279c2e2d3e4422d9e71"
                }
              },
              "peeParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                }
              },
              "EP_F1U_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrierRef_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                }
              },
              "bWPRef_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrier": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 11,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 723333,
                  "arfcnUL": 3333,
                  "bSChannelBwDL": 20,
                  "bSChannelBwUL": 100,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 10,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 649788,
                  "arfcnUL": 649788,
                  "bSChannelBwDL": 100,
                  "bSChannelBwUL": 100,
                  "id": "0"
                }
              },
              "BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                }
              },
              "peeParametersList_NRSector": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.1111",
                  "siteLongitude": "10.2222",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.1111",
                  "siteLongitude": "10.2222",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRSector": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "peeParametersList_BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.3333",
                  "siteLongitude": "10.4444",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.3333",
                  "siteLongitude": "10.4444",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 11,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "idRef": "0",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              }
            }
          ],
          "cellInfo": {},
          "anr": {
            "anr-son-output": {
              "neighbor": [
                {
                  "id": "",
                  "nci": "00001c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 152,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "00004c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 146,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000040108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 153,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000048108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 100,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024002",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 159,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024001",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 158,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024003",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 137,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000024004",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "66"
                  },
                  "nrarfcn": 4850,
                  "pci": 155,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "00003c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 160,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000014108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 142,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000038108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 156,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000030108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 141,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000044108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 143,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000028108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 157,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000034108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 144,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                }
              ]
            }
          },
          "pci": {},
          "cco": {},
          "id": "3242af6da6554fc28ce3",
          "name": "BS11",
          "ip": "",
          "port": "",
          "position": "[121.045601,24.774559]",
          "description": "BS11",
          "bstype": 1,
          "components": [
            {
              "type": "cu+du+ru",
              "id": "4279c2e2d3e4422d9e71"
            }
          ],
          "status": 2,
          "laston": "2023-12-27 19:15:52.406905",
          "lastoff": "2023-12-27 11:31:23.233556",
          "components-info": {
            "4279c2e2d3e4422d9e71": {
              "firm": "ITRI",
              "modelname": "A001",
              "components-sw-inventory": {
                "software-inventory": {
                  "software-slot": [
                    {
                      "name": "slot-1",
                      "status": "VALID",
                      "active": "true",
                      "running": "true",
                      "access": "READ_ONLY",
                      "vendor-code": "K2",
                      "build-id": "b01",
                      "build-name": "product-default",
                      "build-version": "0.1.0",
                      "files": {
                        "name": "file-1",
                        "version": "0.2.3",
                        "local-path": "~/some_dir/",
                        "integrity": "OK"
                      }
                    },
                    {
                      "name": "slot-2",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    },
                    {
                      "name": "slot-3",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    },
                    {
                      "name": "slot-4",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "info": {
            "bs-conf": {
              "plmn-id": {
                "mcc": "466",
                "mnc": "55"
              },
              "nci": "000008108",
              "pci": 148,
              "nrarfcn-dl": 723333,
              "nrarfcn-ul": 723333,
              "duplex-mode": "",
              "channel-bandwidth": 20,
              "tac": "3000",
              "tx-power": 11
            },
            "gNBId": 2,
            "gNBIdLength": 22,
            "gNB-type": "SA",
            "gNBCUName": "cu1",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "id": "0"
          },
          "extension_info": [
            {
              "gNBId": 2,
              "gNBIdLength": 22,
              "cellLocalId": "100001000",
              "nci": "000008108",
              "NRCellCU": {
                "db": {
                  "componentId": "a4d48045771c4ce09424",
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                },
                "ds": {
                  "componentId": "a4d48045771c4ce09424",
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "id": "0"
                }
              },
              "gNBCUFunction": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "a4d48045771c4ce09424",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "gNB-type": "SA",
                  "gNBCUName": "cu1",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "componentId": "a4d48045771c4ce09424",
                  "id": "0"
                }
              },
              "peeParametersList_CU": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0001",
                  "siteLongitude": "10.0001",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_CU": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_CU": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.1",
                  "id": "0"
                }
              },
              "EP_F1U_CU": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.3",
                  "id": "0"
                }
              },
              "EP_NgC": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.5",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.5",
                  "id": "0"
                }
              },
              "EP_NgU": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.1.6",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.2.6",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellCU": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0101",
                  "siteLongitude": "10.0101",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellCU": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellCU": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "gNBDUFunction": {
                "db": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "a4d48045771c4ce09424",
                  "id": "0"
                },
                "ds": {
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "gNBDUId": 11,
                  "gNBDUName": "du1",
                  "componentId": "a4d48045771c4ce09424",
                  "id": "0"
                }
              },
              "NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 148,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "componentId": "a4d48045771c4ce09424",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "administrativeState": "Locked",
                  "nRPCI": 100,
                  "nRTAC": "3000",
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "arfcnSUL": 2079415,
                  "bSChannelBwDL": 20,
                  "ssbFrequency": 9500,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "ssbOffset": 100,
                  "ssbDuration": 3,
                  "bSChannelBwUL": 1000,
                  "bSChannelBwSUL": 1000,
                  "id": "0",
                  "componentId": "a4d48045771c4ce09424"
                }
              },
              "peeParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0202",
                  "siteLongitude": "10.0202",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "EP_F1C_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.1",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.1",
                  "id": "0"
                }
              },
              "EP_F1U_DU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "localAddress_ip_addr": "1.1.2.3",
                  "localAddress_vlan_id": "1",
                  "remoteAddress": "1.1.1.3",
                  "id": "0"
                }
              },
              "peeParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "siteIdentification": "bbb",
                  "siteLatitude": "10.0303",
                  "siteLongitude": "10.3033",
                  "siteDescription": "aaa",
                  "equipmentType": "RRU",
                  "environmentType": "Indoor",
                  "powerInterface": "AC",
                  "id": "0"
                }
              },
              "vnfParametersList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "autoScalable": true,
                  "flavourId": "1",
                  "vnfInstanceId": "1",
                  "vnfdId": "1",
                  "id": "0"
                }
              },
              "s_NSSAI_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "s_NSSAI": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrierRef_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "NRSectorCarrierRef": 0,
                  "id": "0"
                }
              },
              "bWPRef_leafList_NRCellDU": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "cellLocalId": "100001000",
                  "bWPRef": 0,
                  "id": "0"
                }
              },
              "NRSectorCarrier": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 11,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 723333,
                  "arfcnUL": 723333,
                  "bSChannelBwDL": 20,
                  "bSChannelBwUL": 100,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "txDirection": "DL",
                  "configuredMaxTxPower": 10,
                  "configuredMaxTxEIRP": 10,
                  "arfcnDL": 649788,
                  "arfcnUL": 649788,
                  "bSChannelBwDL": 100,
                  "bSChannelBwUL": 100,
                  "id": "0"
                }
              },
              "BWP": {
                "db": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                },
                "ds": {
                  "gNBDUId": 11,
                  "gNBId": 2,
                  "gNBIdLength": 22,
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "55",
                  "bwpContext": 0,
                  "isInitialBwp": 0,
                  "subCarrierSpacing": 15,
                  "cyclicPrefix": 0,
                  "startRB": "1",
                  "numberOfRBs": 25,
                  "id": "0"
                }
              },
              "peeParametersList_NRSector": null,
              "vnfParametersList_NRSector": null,
              "peeParametersList_BWP": null,
              "vnfParametersList_BWP": null
            }
          ],
          "cellInfo": {},
          "anr": {
            "anr-son-output": {
              "neighbor": [
                {
                  "id": "",
                  "nci": "00001c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 152,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000018108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 140,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000014108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 142,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000004108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 139,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "000010108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 149,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                },
                {
                  "id": "",
                  "nci": "00000c108",
                  "enable": "0",
                  "alias": "xxxxxxxxxxxxxxxxxx",
                  "must-include": "",
                  "plmn-id": {
                    "mcc": "466",
                    "mnc": "55"
                  },
                  "nrarfcn": 4850,
                  "pci": 151,
                  "q-offset": "",
                  "cio": "",
                  "rs-tx-power": "",
                  "blacklisted": "",
                  "tac": ""
                }
              ]
            }
          },
          "pci": {},
          "cco": {},
          "id": "c62e5330bda64c51ad16",
          "name": "BS2",
          "ip": "",
          "port": "",
          "position": "[121.041934,24.777122]",
          "description": "BS02",
          "bstype": 1,
          "components": [
            {
              "type": "cu+du+ru",
              "id": "a4d48045771c4ce09424"
            }
          ],
          "status": 2,
          "laston": "2023-12-27 19:11:17.710417",
          "lastoff": "2023-12-26 22:47:32.630084",
          "components-info": {
            "a4d48045771c4ce09424": {
              "firm": "ITRI",
              "modelname": "A001",
              "components-sw-inventory": {
                "software-inventory": {
                  "software-slot": [
                    {
                      "name": "slot-1",
                      "status": "VALID",
                      "active": "true",
                      "running": "true",
                      "access": "READ_ONLY",
                      "vendor-code": "K2",
                      "build-id": "b01",
                      "build-name": "product-default",
                      "build-version": "0.1.0",
                      "files": {
                        "name": "file-1",
                        "version": "0.2.3",
                        "local-path": "~/some_dir/",
                        "integrity": "OK"
                      }
                    },
                    {
                      "name": "slot-2",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    },
                    {
                      "name": "slot-3",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    },
                    {
                      "name": "slot-4",
                      "status": "EMPTY",
                      "active": "false",
                      "running": "false",
                      "access": "READ_WRITE"
                    }
                  ]
                }
              }
            }
          }
        }
    ];

    dist_bsInfo_local: BSInfo_dist[] = [
        {
            "info": [
              {
                "nci": "000024002",
                "gNBId": 9,
                "gNBIdLength": 22,
                "cellLocalId": "10",
                "CU": {
                  "id": "1ebfdbd887034b439104",
                  "func": "getCuNrCellCu",
                  "cellLocalId": "000024002",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "66"
                },
                "DU": {
                  "id": "542ec6627f744df1bafd",
                  "func": "getDuNrCellDu",
                  "cellLocalId": "000024002",
                  "administrativeState": "Locked",
                  "arfcnDL": 723333,
                  "arfcnSUL": 2079415,
                  "arfcnUL": 723333,
                  "bSChannelBwDL": 20,
                  "bSChannelBwSUL": 1000,
                  "bSChannelBwUL": 1000,
                  "nRPCI": 159,
                  "nRTAC": "3000",
                  "ssbDuration": 3,
                  "ssbFrequency": 9500,
                  "ssbOffset": 100,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "configuredMaxTxPower": 17
                },
                "RU": {
                  "id": "8ece726a4ebe4803b8be",
                  "position": "[121.045096,24.773931]"
                }
              },
              {
                "nci": "000024001",
                "gNBId": 9,
                "gNBIdLength": 22,
                "cellLocalId": "1",
                "CU": {
                  "id": "1ebfdbd887034b439104",
                  "func": "getCuNrCellCu",
                  "cellLocalId": "000024001",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "66"
                },
                "DU": {
                  "id": "f026604b16ab4651b1a3",
                  "func": "getDuNrCellDu",
                  "cellLocalId": "000024001",
                  "administrativeState": "Locked",
                  "arfcnDL": 723333,
                  "arfcnSUL": 2079415,
                  "arfcnUL": 723333,
                  "bSChannelBwDL": 20,
                  "bSChannelBwSUL": 1000,
                  "bSChannelBwUL": 1000,
                  "nRPCI": 158,
                  "nRTAC": "3000",
                  "ssbDuration": 3,
                  "ssbFrequency": 9500,
                  "ssbOffset": 100,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "configuredMaxTxPower": 8
                },
                "RU": {
                  "id": "4d926256a64443349aa1",
                  "position": "[121.044212,24.774544]"
                }
              },
              {
                "nci": "000024003",
                "gNBId": 9,
                "gNBIdLength": 22,
                "cellLocalId": "11",
                "CU": {
                  "id": "1ebfdbd887034b439104",
                  "func": "getCuNrCellCu",
                  "cellLocalId": "000024003",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "66"
                },
                "DU": {
                  "id": "f026604b16ab4651b1a3",
                  "func": "getDuNrCellDu",
                  "cellLocalId": "000024003",
                  "administrativeState": "Locked",
                  "arfcnDL": 723333,
                  "arfcnSUL": 2079415,
                  "arfcnUL": 723333,
                  "bSChannelBwDL": 20,
                  "bSChannelBwSUL": 1000,
                  "bSChannelBwUL": 1000,
                  "nRPCI": 137,
                  "nRTAC": "3000",
                  "ssbDuration": 3,
                  "ssbFrequency": 9500,
                  "ssbOffset": 100,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "configuredMaxTxPower": 8
                },
                "RU": {
                  "id": "9302a2a119484ef1ab67",
                  "position": "[121.043409,24.77402]"
                }
              },
              {
                "nci": "000024004",
                "gNBId": 9,
                "gNBIdLength": 22,
                "cellLocalId": "100",
                "CU": {
                  "id": "1ebfdbd887034b439104",
                  "func": "getCuNrCellCu",
                  "cellLocalId": "000024004",
                  "absoluteFrequencySSB": "100",
                  "sSBSubCarrierSpacing": "15",
                  "pLMNId_MCC": "466",
                  "pLMNId_MNC": "66"
                },
                "DU": {
                  "id": "f026604b16ab4651b1a3",
                  "func": "getDuNrCellDu",
                  "cellLocalId": "000024004",
                  "administrativeState": "Locked",
                  "arfcnDL": 723333,
                  "arfcnSUL": 2079415,
                  "arfcnUL": 723333,
                  "bSChannelBwDL": 20,
                  "bSChannelBwSUL": 1000,
                  "bSChannelBwUL": 1000,
                  "nRPCI": 155,
                  "nRTAC": "3000",
                  "ssbDuration": 3,
                  "ssbFrequency": 9500,
                  "ssbOffset": 100,
                  "ssbPeriodicity": 5,
                  "ssbSubCarrierSpacing": 15,
                  "configuredMaxTxPower": 5
                },
                "RU": {
                  "id": "56fc9a6be991472f8b86",
                  "position": "[121.044212,24.773144]"
                }
              }
            ],
            "extension_info": [
              {
                "gNBId": 9,
                "gNBIdLength": 22,
                "cellLocalId": "1",
                "nci": "000024001",
                "gNBCUFunction": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "componentId": "1ebfdbd887034b439104",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "componentId": "1ebfdbd887034b439104",
                    "id": "0"
                  }
                },
                "NRCellCU": {
                  "db": {
                    "componentId": "4d926256a64443349aa1",
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  },
                  "ds": {
                    "componentId": "4d926256a64443349aa1",
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "0"
                  }
                },
                "peeParametersList_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  }
                },
                "EP_F1U_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  }
                },
                "EP_NgC": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  }
                },
                "EP_NgU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "gNBDUFunction": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "gNBDUId": 12,
                    "gNBDUName": "du2",
                    "componentId": "f026604b16ab4651b1a3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "gNBDUId": 12,
                    "gNBDUName": "du2",
                    "componentId": "f026604b16ab4651b1a3",
                    "id": "0"
                  }
                },
                "NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "administrativeState": "Locked",
                    "nRPCI": 158,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "componentId": "4d926256a64443349aa1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "administrativeState": "Locked",
                    "nRPCI": 100,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "id": "0",
                    "componentId": "4d926256a64443349aa1"
                  }
                },
                "peeParametersList_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.2",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.2",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.2",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.2",
                    "id": "0"
                  }
                },
                "EP_F1U_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.4",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.4",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.4",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.4",
                    "id": "0"
                  }
                },
                "NRSectorCarrier": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 8,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 10,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  }
                },
                "BWP": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  }
                },
                "peeParametersList_NRSector": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.1111",
                    "siteLongitude": "10.2222",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.1111",
                    "siteLongitude": "10.2222",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRSector": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrierRef_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  }
                },
                "bWPRef_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "bWPRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "1",
                    "bWPRef": 0,
                    "id": "0"
                  }
                },
                "peeParametersList_BWP": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.3333",
                    "siteLongitude": "10.4444",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.3333",
                    "siteLongitude": "10.4444",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_BWP": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                }
              },
              {
                "gNBId": 9,
                "gNBIdLength": 22,
                "cellLocalId": "10",
                "nci": "000024002",
                "gNBCUFunction": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "componentId": "1ebfdbd887034b439104",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "componentId": "1ebfdbd887034b439104",
                    "id": "0"
                  }
                },
                "NRCellCU": {
                  "db": {
                    "componentId": "8ece726a4ebe4803b8be",
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "1"
                  },
                  "ds": {
                    "componentId": "8ece726a4ebe4803b8be",
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "1"
                  }
                },
                "peeParametersList_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  }
                },
                "EP_F1U_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  }
                },
                "EP_NgC": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  }
                },
                "EP_NgU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "1"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "1"
                  }
                },
                "vnfParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "1"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "1"
                  }
                },
                "s_NSSAI_leafList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "s_NSSAI": 1,
                    "id": "1"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "s_NSSAI": 1,
                    "id": "1"
                  }
                },
                "gNBDUFunction": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "542ec6627f744df1bafd",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "gNBDUId": 11,
                    "gNBDUName": "du1",
                    "componentId": "542ec6627f744df1bafd",
                    "id": "0"
                  }
                },
                "NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "administrativeState": "Locked",
                    "nRPCI": 159,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "componentId": "8ece726a4ebe4803b8be",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "administrativeState": "Locked",
                    "nRPCI": 100,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "id": "0",
                    "componentId": "8ece726a4ebe4803b8be"
                  }
                },
                "peeParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.1",
                    "id": "0"
                  }
                },
                "EP_F1U_DU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.3",
                    "id": "0"
                  }
                },
                "NRSectorCarrier": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 17,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 10,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "0"
                  }
                },
                "BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "0"
                  }
                },
                "peeParametersList_NRSector": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.1111",
                    "siteLongitude": "10.2222",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.1111",
                    "siteLongitude": "10.2222",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRSector": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrierRef_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "NRSectorCarrierRef": 0,
                    "id": "0"
                  }
                },
                "bWPRef_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "bWPRef": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "10",
                    "bWPRef": 0,
                    "id": "0"
                  }
                },
                "peeParametersList_BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.3333",
                    "siteLongitude": "10.4444",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.3333",
                    "siteLongitude": "10.4444",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_BWP": {
                  "db": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 11,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "0",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                }
              },
              {
                "gNBId": 9,
                "gNBIdLength": 22,
                "cellLocalId": "11",
                "nci": "000024003",
                "gNBCUFunction": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "componentId": "1ebfdbd887034b439104",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "componentId": "1ebfdbd887034b439104",
                    "id": "0"
                  }
                },
                "NRCellCU": {
                  "db": {
                    "componentId": "9302a2a119484ef1ab67",
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "2"
                  },
                  "ds": {
                    "componentId": "9302a2a119484ef1ab67",
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "2"
                  }
                },
                "peeParametersList_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  }
                },
                "EP_F1U_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  }
                },
                "EP_NgC": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  }
                },
                "EP_NgU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "2"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "2"
                  }
                },
                "vnfParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "2"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "2"
                  }
                },
                "s_NSSAI_leafList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "s_NSSAI": 2,
                    "id": "2"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "s_NSSAI": 2,
                    "id": "2"
                  }
                },
                "gNBDUFunction": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "gNBDUId": 12,
                    "gNBDUName": "du2",
                    "componentId": "f026604b16ab4651b1a3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "gNBDUId": 12,
                    "gNBDUName": "du2",
                    "componentId": "f026604b16ab4651b1a3",
                    "id": "0"
                  }
                },
                "NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "administrativeState": "Locked",
                    "nRPCI": 137,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "componentId": "9302a2a119484ef1ab67",
                    "id": "1"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "administrativeState": "Locked",
                    "nRPCI": 100,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "id": "1",
                    "componentId": "9302a2a119484ef1ab67"
                  }
                },
                "peeParametersList_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.2",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.2",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.2",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.2",
                    "id": "0"
                  }
                },
                "EP_F1U_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.4",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.4",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.4",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.4",
                    "id": "0"
                  }
                },
                "NRSectorCarrier": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 8,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "1"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 10,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "1"
                  }
                },
                "BWP": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "1"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "1"
                  }
                },
                "peeParametersList_NRSector": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "1",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.1111",
                    "siteLongitude": "10.2222",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "1",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.1111",
                    "siteLongitude": "10.2222",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRSector": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "1",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "1",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrierRef_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "NRSectorCarrierRef": 1,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "NRSectorCarrierRef": 1,
                    "id": "0"
                  }
                },
                "bWPRef_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "bWPRef": 1,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "11",
                    "bWPRef": 1,
                    "id": "0"
                  }
                },
                "peeParametersList_BWP": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "1",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.3333",
                    "siteLongitude": "10.4444",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "1",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.3333",
                    "siteLongitude": "10.4444",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_BWP": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "1",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "1",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                }
              },
              {
                "gNBId": 9,
                "gNBIdLength": 22,
                "cellLocalId": "100",
                "nci": "000024004",
                "gNBCUFunction": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "componentId": "1ebfdbd887034b439104",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "gNB-type": "SA",
                    "gNBCUName": "cu1",
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "componentId": "1ebfdbd887034b439104",
                    "id": "0"
                  }
                },
                "NRCellCU": {
                  "db": {
                    "componentId": "56fc9a6be991472f8b86",
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "3"
                  },
                  "ds": {
                    "componentId": "56fc9a6be991472f8b86",
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "absoluteFrequencySSB": "100",
                    "sSBSubCarrierSpacing": "15",
                    "id": "3"
                  }
                },
                "peeParametersList_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0001",
                    "siteLongitude": "10.0001",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.1",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.1",
                    "id": "0"
                  }
                },
                "EP_F1U_CU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.3",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.3",
                    "id": "0"
                  }
                },
                "EP_NgC": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.5",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.5",
                    "id": "0"
                  }
                },
                "EP_NgU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.1.6",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.2.6",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "3"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0101",
                    "siteLongitude": "10.0101",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "3"
                  }
                },
                "vnfParametersList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "3"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "3"
                  }
                },
                "s_NSSAI_leafList_NRCellCU": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "s_NSSAI": 3,
                    "id": "3"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "s_NSSAI": 3,
                    "id": "3"
                  }
                },
                "gNBDUFunction": {
                  "db": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "gNBDUId": 12,
                    "gNBDUName": "du2",
                    "componentId": "f026604b16ab4651b1a3",
                    "id": "0"
                  },
                  "ds": {
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "gNBDUId": 12,
                    "gNBDUName": "du2",
                    "componentId": "f026604b16ab4651b1a3",
                    "id": "0"
                  }
                },
                "NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "administrativeState": "Locked",
                    "nRPCI": 155,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "componentId": "56fc9a6be991472f8b86",
                    "id": "2"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "administrativeState": "Locked",
                    "nRPCI": 100,
                    "nRTAC": "3000",
                    "arfcnDL": 723333,
                    "arfcnUL": 723333,
                    "arfcnSUL": 2079415,
                    "bSChannelBwDL": 20,
                    "ssbFrequency": 9500,
                    "ssbPeriodicity": 5,
                    "ssbSubCarrierSpacing": 15,
                    "ssbOffset": 100,
                    "ssbDuration": 3,
                    "bSChannelBwUL": 1000,
                    "bSChannelBwSUL": 1000,
                    "id": "2",
                    "componentId": "56fc9a6be991472f8b86"
                  }
                },
                "peeParametersList_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0202",
                    "siteLongitude": "10.0202",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "EP_F1C_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.2",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.2",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.2",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.2",
                    "id": "0"
                  }
                },
                "EP_F1U_DU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.4",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.4",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "localAddress_ip_addr": "1.1.2.4",
                    "localAddress_vlan_id": "1",
                    "remoteAddress": "1.1.1.4",
                    "id": "0"
                  }
                },
                "NRSectorCarrier": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 5,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "2"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "txDirection": "DL",
                    "configuredMaxTxPower": 10,
                    "configuredMaxTxEIRP": 10,
                    "arfcnDL": 649788,
                    "arfcnUL": 649788,
                    "bSChannelBwDL": 100,
                    "bSChannelBwUL": 100,
                    "id": "2"
                  }
                },
                "BWP": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "2"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "bwpContext": 0,
                    "isInitialBwp": 0,
                    "subCarrierSpacing": 15,
                    "cyclicPrefix": 0,
                    "startRB": "1",
                    "numberOfRBs": 25,
                    "id": "2"
                  }
                },
                "peeParametersList_NRSector": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "2",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.1111",
                    "siteLongitude": "10.2222",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "2",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.1111",
                    "siteLongitude": "10.2222",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRSector": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "2",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "2",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "peeParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.0303",
                    "siteLongitude": "10.3033",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                },
                "s_NSSAI_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "s_NSSAI": 0,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "s_NSSAI": 0,
                    "id": "0"
                  }
                },
                "NRSectorCarrierRef_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "NRSectorCarrierRef": 2,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "NRSectorCarrierRef": 2,
                    "id": "0"
                  }
                },
                "bWPRef_leafList_NRCellDU": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "bWPRef": 2,
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "cellLocalId": "100",
                    "bWPRef": 2,
                    "id": "0"
                  }
                },
                "peeParametersList_BWP": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "2",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.3333",
                    "siteLongitude": "10.4444",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "2",
                    "siteIdentification": "bbb",
                    "siteLatitude": "10.3333",
                    "siteLongitude": "10.4444",
                    "siteDescription": "aaa",
                    "equipmentType": "RRU",
                    "environmentType": "Indoor",
                    "powerInterface": "AC",
                    "id": "0"
                  }
                },
                "vnfParametersList_BWP": {
                  "db": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "2",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  },
                  "ds": {
                    "gNBDUId": 12,
                    "gNBId": 9,
                    "gNBIdLength": 22,
                    "pLMNId_MCC": "466",
                    "pLMNId_MNC": "66",
                    "idRef": "2",
                    "autoScalable": true,
                    "flavourId": "1",
                    "vnfInstanceId": "1",
                    "vnfdId": "1",
                    "id": "0"
                  }
                }
              }
            ],
            "cellInfo": {
              "8ece726a4ebe4803b8be": "000024002",
              "4d926256a64443349aa1": "000024001",
              "9302a2a119484ef1ab67": "000024003",
              "56fc9a6be991472f8b86": "000024004"
            },
            "anr": {
              "000024001": {
                "anr-son-output": {
                  "neighbor": [
                    {
                      "nci": "00001c108",
                      "pci": 152,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000040108",
                      "pci": 153,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000018108",
                      "pci": 140,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "00002c108",
                      "pci": 154,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024002",
                      "pci": 159,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024003",
                      "pci": 137,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024004",
                      "pci": 155,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000014108",
                      "pci": 142,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000030108",
                      "pci": 141,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000044108",
                      "pci": 143,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000028108",
                      "pci": 157,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000034108",
                      "pci": 144,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000020108",
                      "pci": 145,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    }
                  ]
                }
              },
              "000024002": {
                "anr-son-output": {
                  "neighbor": [
                    {
                      "nci": "00001c108",
                      "pci": 152,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "00004c108",
                      "pci": 146,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000040108",
                      "pci": 153,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000048108",
                      "pci": 100,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "00002c108",
                      "pci": 154,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024001",
                      "pci": 158,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024003",
                      "pci": 137,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024004",
                      "pci": 155,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "00003c108",
                      "pci": 160,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000014108",
                      "pci": 142,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000038108",
                      "pci": 156,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000030108",
                      "pci": 141,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000050108",
                      "pci": 150,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000044108",
                      "pci": 143,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000028108",
                      "pci": 157,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000034108",
                      "pci": 144,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000020108",
                      "pci": 145,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    }
                  ]
                }
              },
              "000024003": {
                "anr-son-output": {
                  "neighbor": [
                    {
                      "nci": "000040108",
                      "pci": 153,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "00002c108",
                      "pci": 154,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024002",
                      "pci": 159,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024001",
                      "pci": 158,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024004",
                      "pci": 155,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000014108",
                      "pci": 142,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000028108",
                      "pci": 157,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000010108",
                      "pci": 149,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000020108",
                      "pci": 145,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    }
                  ]
                }
              },
              "000024004": {
                "anr-son-output": {
                  "neighbor": [
                    {
                      "nci": "000040108",
                      "pci": 153,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "00002c108",
                      "pci": 154,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024002",
                      "pci": 159,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024001",
                      "pci": 158,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000024003",
                      "pci": 137,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "66"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000050108",
                      "pci": 150,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    },
                    {
                      "nci": "000028108",
                      "pci": 157,
                      "nrarfcn": 4850,
                      "plmn-id": {
                        "mcc": "466",
                        "mnc": "55"
                      },
                      "tac": "",
                      "id": "0",
                      "enable": "0",
                      "alias": "xxxxxxxxxxxxxxxxxx",
                      "cio": "",
                      "blacklisted": "",
                      "must-include": "",
                      "q-offset": "",
                      "rs-tx-power": "",
                      "__itri_default___": 0
                    }
                  ]
                }
              }
            },
            "pci": {},
            "cco": {},
            "id": "349b9f81afa54669b094",
            "name": "BS9",
            "ip": "",
            "port": "",
            "position": "",
            "description": "BS09",
            "bstype": 2,
            "components": {
              "1ebfdbd887034b439104": {  // gNBCUId - Update Distributed BS Configurations need it
                "542ec6627f744df1bafd": [
                  {
                    "8ece726a4ebe4803b8be": "[121.045096,24.773931]"
                  }
                ],
                "f026604b16ab4651b1a3": [
                  {
                    "4d926256a64443349aa1": "[121.044212,24.774544]"
                  },
                  {
                    "9302a2a119484ef1ab67": "[121.043409,24.77402]"
                  },
                  {
                    "56fc9a6be991472f8b86": "[121.044212,24.773144]"
                  }
                ]
              }
            },
            "status": 2,
            "laston": "2023-12-27 16:44:34.929128",
            "lastoff": "2023-12-27 08:04:10.562803",
            "components-info": {}
        }
    ];
}
