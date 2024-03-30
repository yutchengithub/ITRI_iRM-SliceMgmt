
 // Interfaces of ForCalculateSonResponse @2024/03/31 Add
 import { ForCalculateSonResponse } from '../../interfaces/Field/For_multiCalculateBs';                       

 // Local Files for general CalculateSonResponse
 export class localCalculateSonResponse {

    // For calculateSON_Submit() Get local CalculateSonResponse
    calculateSonResponse_local: ForCalculateSonResponse = {

      "cco": {
        "field": "f769da087f2044e7a0d7",
        "average_sinr": "3.659120",
        "cellIndividualResult": [
          {
            "pLMNId_MNC": "55",
            "txpower": 4,
            "gNBId": 2,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000"
          },
          {
            "pLMNId_MNC": "55",
            "txpower": 8,
            "gNBId": 1,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000"
          },
          {
            "pLMNId_MNC": "55",
            "txpower": 21,
            "gNBId": 3,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000"
          },
          {
            "pLMNId_MNC": "55",
            "txpower": 14,
            "gNBId": 3,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001001"
          }
        ],
        "coverage": "0.990000"
      },
      "anr": {
        "field": "f769da087f2044e7a0d7",
        "cellIndividualResult": [
          {
            "gNBId": 2,
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55",
            "pLMNId_MCC": "466",
            "NRCellRelation": [
              {
                "cellLocalId": "00000100001000",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 159,
                "gNBId": 1,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellLocalId": "00000100001000",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 160,
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellLocalId": "00000100001001",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  }
                ],
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 101,
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0",
                "externalNrCellCu": []
              }
            ]
          },
          {
            "gNBId": 1,
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55",
            "pLMNId_MCC": "466",
            "NRCellRelation": [
              {
                "cellLocalId": "00000100001000",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 100,
                "gNBId": 2,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellLocalId": "00000100001000",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 160,
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellLocalId": "00000100001001",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  }
                ],
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 101,
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0",
                "externalNrCellCu": []
              }
            ]
          },
          {
            "gNBId": 3,
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55",
            "pLMNId_MCC": "466",
            "NRCellRelation": [
              {
                "cellLocalId": "00000100001000",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 100,
                "gNBId": 2,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellLocalId": "00000100001000",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 159,
                "gNBId": 1,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellLocalId": "00000100001001",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  }
                ],
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 101,
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0",
                "externalNrCellCu": []
              }
            ]
          },
          {
            "gNBId": 3,
            "cellLocalId": "00000100001001",
            "pLMNId_MNC": "55",
            "pLMNId_MCC": "466",
            "NRCellRelation": [
              {
                "cellLocalId": "00000100001000",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 100,
                "gNBId": 2,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellLocalId": "00000100001000",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 159,
                "gNBId": 1,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellLocalId": "00000100001000",
                "isRemoveAllowed": "false",
                "arfcnDl": 4850,
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXHighP": 62,
                    "threshXLowP": 0,
                    "tReselectionNr": 0
                  }
                ],
                "isHOAllowed": "true",
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0",
                  "sinrOffsetCsiRs": "db0"
                },
                "nRPCI": 160,
                "gNBId": 3,
                "pLMNId_MNC": "55",
                "pLMNId_MCC": "466",
                "nRFreqRelationRef": "id0",
                "adjacentNrCellRef": "id0",
                "nRFrequencyRef": "id0",
                "externalNrCellCu": []
              }
            ]
          }
        ]
      },
      "pci": {
        "collision_cell": [],
        "confusion_cell": [],
        "confusion_count_new": [],
        "collision_count": [],
        "confusion_cell_new": [],
        "confusion_count": [],
        "collision_cell_new": [],
        "collision_count_new": [],
        "cellIndividualResult": [
          {
            "nrPCI": 100,
            "gNBId": 2,
            "cellLocalId": "00000100001000",
            "NRCellRelation": [
              {
                "nRTCI": 159,
                "gNBId": 1,
                "nRPCI": 159,
                "cellLocalId": "00000100001000",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 160,
                "gNBId": 3,
                "nRPCI": 160,
                "cellLocalId": "00000100001000",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 101,
                "gNBId": 3,
                "nRPCI": 101,
                "cellLocalId": "00000100001001",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              }
            ],
            "PLMNId_MCC": "466",
            "PLMNId_MNC": "55"
          },
          {
            "nrPCI": 159,
            "gNBId": 1,
            "cellLocalId": "00000100001000",
            "NRCellRelation": [
              {
                "nRTCI": 100,
                "gNBId": 2,
                "nRPCI": 100,
                "cellLocalId": "00000100001000",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 160,
                "gNBId": 3,
                "nRPCI": 160,
                "cellLocalId": "00000100001000",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 101,
                "gNBId": 3,
                "nRPCI": 101,
                "cellLocalId": "00000100001001",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              }
            ],
            "PLMNId_MCC": "466",
            "PLMNId_MNC": "55"
          },
          {
            "nrPCI": 160,
            "gNBId": 3,
            "cellLocalId": "00000100001000",
            "NRCellRelation": [
              {
                "nRTCI": 100,
                "gNBId": 2,
                "nRPCI": 100,
                "cellLocalId": "00000100001000",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 159,
                "gNBId": 1,
                "nRPCI": 159,
                "cellLocalId": "00000100001000",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 101,
                "gNBId": 3,
                "nRPCI": 101,
                "cellLocalId": "00000100001001",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              }
            ],
            "PLMNId_MCC": "466",
            "PLMNId_MNC": "55"
          },
          {
            "nrPCI": 101,
            "gNBId": 3,
            "cellLocalId": "00000100001001",
            "NRCellRelation": [
              {
                "nRTCI": 100,
                "gNBId": 2,
                "nRPCI": 100,
                "cellLocalId": "00000100001000",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 159,
                "gNBId": 1,
                "nRPCI": 159,
                "cellLocalId": "00000100001000",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 160,
                "gNBId": 3,
                "nRPCI": 160,
                "cellLocalId": "00000100001000",
                "PLMNId_MCC": "466",
                "PLMNId_MNC": "55"
              }
            ],
            "PLMNId_MCC": "466",
            "PLMNId_MNC": "55"
          }
        ]
      }
    };
    
}
