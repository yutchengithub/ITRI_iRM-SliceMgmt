
 // Interfaces of ForCalculateSonResponse @2024/03/31 Add
 import { ForCalculateSonResponse } from '../../interfaces/Field/For_multiCalculateBs';                       

 // Local Files for general CalculateSonResponse
 export class localCalculateSonResponse {

    // For calculateSON_Submit() Get local CalculateSonResponse
    calculateSonResponse_local: ForCalculateSonResponse = {
      "cco": {
        "average_sinr": "4.003489",
        "cellIndividualResult": [
          {
            "txpower": 3,
            "gNBId": 2,
            "pLMNId_MNC": "55",
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000"
          },
          {
            "txpower": 3,
            "gNBId": 1,
            "pLMNId_MNC": "55",
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000"
          },
          {
            "txpower": 3,
            "gNBId": 3,
            "pLMNId_MNC": "55",
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000"
          },
          {
            "txpower": 16,
            "gNBId": 3,
            "pLMNId_MNC": "55",
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001001"
          }
        ],
        "field": "f769da087f2044e7a0d7",
        "coverage": "0.990000"
      },
      "anr": {
        "field": "f769da087f2044e7a0d7",
        "cellIndividualResult": [
          {
            "gNBId": 2,
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001000",
                "gNBId": 1,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 159,
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001000",
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 160,
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001001",
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 101,
                "nRFreqRelation": [
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  },
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  },
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  }
                ],
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0",
                "externalNrCellCu": []
              }
            ],
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55"
          },
          {
            "gNBId": 1,
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001000",
                "gNBId": 2,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 100,
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001000",
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 160,
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001001",
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 101,
                "nRFreqRelation": [
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  },
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  },
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  }
                ],
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0",
                "externalNrCellCu": []
              }
            ],
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55"
          },
          {
            "gNBId": 3,
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001000",
                "gNBId": 2,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 100,
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001000",
                "gNBId": 1,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 159,
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001001",
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 101,
                "nRFreqRelation": [
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  },
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  },
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  }
                ],
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0",
                "externalNrCellCu": []
              }
            ],
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55"
          },
          {
            "gNBId": 3,
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001000",
                "gNBId": 2,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 100,
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001000",
                "gNBId": 1,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 159,
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "sinrOffsetCsiRs": "db0",
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0"
                },
                "cellLocalId": "00000100001000",
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "nRFrequencyRef": "id0",
                "nRPCI": 160,
                "nRFreqRelation": [
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  },
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  },
                  {
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "nRFrequncyRef": "id0",
                    "tReselectionNr": 0
                  }
                ],
                "nRFreqRelationRef": "id0",
                "isHOAllowed": "true",
                "isRemoveAllowed": "false",
                "pLMNId_MCC": "466",
                "arfcnDl": 4850,
                "adjacentNrCellRef": "id0",
                "externalNrCellCu": []
              }
            ],
            "cellLocalId": "00000100001001",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55"
          }
        ]
      },
      "pci": {
        "collision_count": [],
        "confusion_count_new": [
          {
            "confusion_pci": 102,
            "confusion_count": 4
          }
        ],
        "collision_cell": [],
        "confusion_cell_new": [
          {
            "confused_gNBId_length": 22,
            "target_gNBId_length": 22,
            "confusion_pci": 102,
            "target_mcc": "466",
            "confused_gNBId": 1,
            "source_gNBId": 2,
            "source_gNBId_length": 22,
            "source_cellLocalId": 264,
            "target_mnc": "55",
            "confused_mcc": "466",
            "confused_cellLocalId": 264,
            "source_mcc": "466",
            "source_mnc": "55",
            "confused_mnc": "55",
            "target_cellLocalId": 265,
            "target_gNBId": 3
          },
          {
            "confused_gNBId_length": 22,
            "target_gNBId_length": 22,
            "confusion_pci": 102,
            "target_mcc": "466",
            "confused_gNBId": 1,
            "source_gNBId": 3,
            "source_gNBId_length": 22,
            "source_cellLocalId": 265,
            "target_mnc": "55",
            "confused_mcc": "466",
            "confused_cellLocalId": 264,
            "source_mcc": "466",
            "source_mnc": "55",
            "confused_mnc": "55",
            "target_cellLocalId": 264,
            "target_gNBId": 2
          },
          {
            "confused_gNBId_length": 22,
            "target_gNBId_length": 22,
            "confusion_pci": 102,
            "target_mcc": "466",
            "confused_gNBId": 3,
            "source_gNBId": 2,
            "source_gNBId_length": 22,
            "source_cellLocalId": 264,
            "target_mnc": "55",
            "confused_mcc": "466",
            "confused_cellLocalId": 264,
            "source_mcc": "466",
            "source_mnc": "55",
            "confused_mnc": "55",
            "target_cellLocalId": 265,
            "target_gNBId": 3
          },
          {
            "confused_gNBId_length": 22,
            "target_gNBId_length": 22,
            "confusion_pci": 102,
            "target_mcc": "466",
            "confused_gNBId": 3,
            "source_gNBId": 3,
            "source_gNBId_length": 22,
            "source_cellLocalId": 265,
            "target_mnc": "55",
            "confused_mcc": "466",
            "confused_cellLocalId": 264,
            "source_mcc": "466",
            "source_mnc": "55",
            "confused_mnc": "55",
            "target_cellLocalId": 264,
            "target_gNBId": 2
          }
        ],
        "confusion_cell": [],
        "confusion_count": [],
        "collision_cell_new": [
          {
            "source_cellLocalId": 264,
            "collision_pci": 102,
            "source_gNBId": 2,
            "source_gNBId_length": 22,
            "target_mnc": "55",
            "source_mcc": "466",
            "source_mnc": "55",
            "target_cellLocalId": 265,
            "target_gNBId": 3,
            "target_gNBId_length": 22,
            "target_mcc": "466"
          },
          {
            "source_cellLocalId": 265,
            "collision_pci": 102,
            "source_gNBId": 3,
            "source_gNBId_length": 22,
            "target_mnc": "55",
            "source_mcc": "466",
            "source_mnc": "55",
            "target_cellLocalId": 264,
            "target_gNBId": 2,
            "target_gNBId_length": 22,
            "target_mcc": "466"
          }
        ],
        "collision_count_new": [
          {
            "collision_count": 2,
            "collision_pci": 102
          }
        ],
        "cellIndividualResult": [
          {
            "NRCellRelation": [
              {
                "nRPCI": 101,
                "nRTCI": 101,
                "PLMNId_MCC": "466",
                "gNBId": 1,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001000"
              },
              {
                "nRPCI": 100,
                "nRTCI": 100,
                "PLMNId_MCC": "466",
                "gNBId": 3,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001000"
              },
              {
                "nRPCI": 102,
                "nRTCI": 102,
                "PLMNId_MCC": "466",
                "gNBId": 3,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001001"
              }
            ],
            "nrPCI": 102,
            "PLMNId_MCC": "466",
            "gNBId": 2,
            "PLMNId_MNC": "55",
            "cellLocalId": "00000100001000"
          },
          {
            "NRCellRelation": [
              {
                "nRPCI": 102,
                "nRTCI": 102,
                "PLMNId_MCC": "466",
                "gNBId": 2,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001000"
              },
              {
                "nRPCI": 100,
                "nRTCI": 100,
                "PLMNId_MCC": "466",
                "gNBId": 3,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001000"
              },
              {
                "nRPCI": 102,
                "nRTCI": 102,
                "PLMNId_MCC": "466",
                "gNBId": 3,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001001"
              }
            ],
            "nrPCI": 101,
            "PLMNId_MCC": "466",
            "gNBId": 1,
            "PLMNId_MNC": "55",
            "cellLocalId": "00000100001000"
          },
          {
            "NRCellRelation": [
              {
                "nRPCI": 102,
                "nRTCI": 102,
                "PLMNId_MCC": "466",
                "gNBId": 2,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001000"
              },
              {
                "nRPCI": 101,
                "nRTCI": 101,
                "PLMNId_MCC": "466",
                "gNBId": 1,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001000"
              },
              {
                "nRPCI": 102,
                "nRTCI": 102,
                "PLMNId_MCC": "466",
                "gNBId": 3,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001001"
              }
            ],
            "nrPCI": 100,
            "PLMNId_MCC": "466",
            "gNBId": 3,
            "PLMNId_MNC": "55",
            "cellLocalId": "00000100001000"
          },
          {
            "NRCellRelation": [
              {
                "nRPCI": 102,
                "nRTCI": 102,
                "PLMNId_MCC": "466",
                "gNBId": 2,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001000"
              },
              {
                "nRPCI": 101,
                "nRTCI": 101,
                "PLMNId_MCC": "466",
                "gNBId": 1,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001000"
              },
              {
                "nRPCI": 100,
                "nRTCI": 100,
                "PLMNId_MCC": "466",
                "gNBId": 3,
                "PLMNId_MNC": "55",
                "cellLocalId": "00000100001000"
              }
            ],
            "nrPCI": 102,
            "PLMNId_MCC": "466",
            "gNBId": 3,
            "PLMNId_MNC": "55",
            "cellLocalId": "00000100001001"
          }
        ]
      }
    };
    
}
