
 // Interfaces of ForCalculateSonResponse @2024/03/31 Add
 import { ForCalculateSonResponse } from '../../interfaces/Field/For_multiCalculateBs';                       

 // Local Files for general CalculateSonResponse
 export class localCalculateSonResponse {

    // For calculateSON_Submit() Get local CalculateSonResponse

    // 只有原鄰居基站多的狀況 04/11 Add 
    /*
      calculateSonResponse_local: ForCalculateSonResponse = {
        "cco": {
          "field": "e6700d701f8b41f8950e",
          "cellIndividualResult": [
            {
              "gNBId": 16,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 6,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 11,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 15,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 5,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 14,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 12,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 1,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 17,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 2,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 10,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 13,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 8,
              "txpower": 2,
              "pLMNId_MCC": "466",
              "cellLocalId": "00000100001000",
              "pLMNId_MNC": "55"
            }
          ],
          "average_sinr": "-5.902576",
          "coverage": "0.520000"
        },
        "anr": {
          "field": "e6700d701f8b41f8950e",
          "cellIndividualResult": [
            {
              "gNBId": 16,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 11,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 154,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 12,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 141,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 10,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 157,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 13,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 144,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 6,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 5,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 142,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 17,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 143,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 2,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 148,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 11,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 16,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 153,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 10,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 157,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 13,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 144,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 15,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 14,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 156,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 5,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 6,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 140,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 8,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 145,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 14,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 15,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 160,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 12,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 16,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 153,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 10,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 157,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 13,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 144,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 1,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 17,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 143,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 2,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 148,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 17,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 6,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 140,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 1,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 139,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 2,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 148,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 2,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 6,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 140,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 1,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 139,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 17,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 143,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 10,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 16,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 153,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 11,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 154,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 12,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 141,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 13,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 16,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 153,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 11,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 154,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0"
                },
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 12,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 141,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    },
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            },
            {
              "gNBId": 8,
              "cellLocalId": "00000100001000",
              "NRCellRelation": [
                {
                  "cellIndividualOffset": {
                    "sinrOffsetSsb": "db0",
                    "rsrpOffsetSsb": "db0",
                    "rsrqOffsetCsiRs": "db0",
                    "rsrqOffsetSsb": "db0",
                    "rsrpOffsetCsiRs": "db0",
                    "sinrOffsetCsiRs": "db0"
                  },
                  "cellLocalId": "00000100001000",
                  "gNBId": 5,
                  "nRFrequencyRef": "id0",
                  "nRPCI": 142,
                  "isRemoveAllowed": "false",
                  "arfcnDl": 4850,
                  "nRFreqRelation": [
                    {
                      "qRxLevMin": -90,
                      "threshXLowP": 0,
                      "threshXHighP": 62,
                      "nRFrequncyRef": "id0",
                      "tReselectionNr": 0
                    }
                  ],
                  "isHOAllowed": "true",
                  "pLMNId_MNC": "55",
                  "pLMNId_MCC": "466",
                  "nRFreqRelationRef": "id0",
                  "adjacentNrCellRef": "id0",
                  "externalNrCellCu": []
                }
              ],
              "pLMNId_MCC": "466",
              "pLMNId_MNC": "55"
            }
          ]
        },
        "pci": {
          "collision_cell": [],
          "collision_count": [],
          "collision_count_new": [
            {
              "collision_pci": 150,
              "collision_count": 14
            },
            {
              "collision_pci": 151,
              "collision_count": 2
            }
          ],
          "confusion_cell": [],
          "confusion_count_new": [
            {
              "confusion_pci": 151,
              "confusion_count": 2
            },
            {
              "confusion_pci": 150,
              "confusion_count": 22
            }
          ],
          "confusion_count": [],
          "confusion_cell_new": [
            {
              "confusion_pci": 151,
              "confused_mnc": "55",
              "source_gNBId": 11,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 16,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 13,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 12,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 16,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 10,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 10,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 16,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 12,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 151,
              "confused_mnc": "55",
              "source_gNBId": 13,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 16,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 11,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 5,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 6,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 2,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 2,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 6,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 5,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 16,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 11,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 10,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 10,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 11,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 16,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 6,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 5,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 8,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 8,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 5,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 6,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 16,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 12,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 10,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 10,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 12,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 16,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 6,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 17,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 1,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 6,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 17,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 2,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 1,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 17,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 6,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 1,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 17,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 2,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 2,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 17,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 6,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 2,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 17,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 1,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 6,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 2,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 1,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 1,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 2,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 6,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 16,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 10,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 12,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 12,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 10,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 16,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 16,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 13,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 12,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "confusion_pci": 150,
              "confused_mnc": "55",
              "source_gNBId": 12,
              "source_gNBId_length": 22,
              "confused_gNBId_length": 22,
              "source_mcc": "466",
              "confused_gNBId": 13,
              "confused_cellLocalId": 264,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 16,
              "confused_mcc": "466",
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            }
          ],
          "collision_cell_new": [
            {
              "collision_pci": 150,
              "source_gNBId": 16,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 12,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 16,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 10,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 6,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 5,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 6,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 2,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 151,
              "source_gNBId": 11,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 13,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 5,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 6,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 5,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 8,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 12,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 16,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 12,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 10,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 1,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 2,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 2,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 6,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 2,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 1,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 10,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 16,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 10,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 12,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 151,
              "source_gNBId": 13,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 11,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            },
            {
              "collision_pci": 150,
              "source_gNBId": 8,
              "source_mcc": "466",
              "source_gNBId_length": 22,
              "source_cellLocalId": 264,
              "target_cellLocalId": 264,
              "source_mnc": "55",
              "target_gNBId": 5,
              "target_gNBId_length": 22,
              "target_mcc": "466",
              "target_mnc": "55"
            }
          ],
          "cellIndividualResult": [
            {
              "nrPCI": 150,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 151,
                  "gNBId": 11,
                  "PLMNId_MCC": "466",
                  "nRPCI": 151,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 12,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 10,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 151,
                  "gNBId": 13,
                  "PLMNId_MCC": "466",
                  "nRPCI": 151,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 16,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 150,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 5,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 151,
                  "gNBId": 17,
                  "PLMNId_MCC": "466",
                  "nRPCI": 151,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 2,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 6,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 151,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 16,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 10,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 151,
                  "gNBId": 13,
                  "PLMNId_MCC": "466",
                  "nRPCI": 151,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 11,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 151,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 14,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 15,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 150,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 6,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 8,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 5,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 150,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 151,
                  "gNBId": 15,
                  "PLMNId_MCC": "466",
                  "nRPCI": 151,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 14,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 150,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 16,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 10,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 151,
                  "gNBId": 13,
                  "PLMNId_MCC": "466",
                  "nRPCI": 151,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 12,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 150,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 151,
                  "gNBId": 17,
                  "PLMNId_MCC": "466",
                  "nRPCI": 151,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 2,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 1,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 151,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 6,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 1,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 2,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 17,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 150,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 6,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 1,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 151,
                  "gNBId": 17,
                  "PLMNId_MCC": "466",
                  "nRPCI": 151,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 2,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 150,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 16,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 151,
                  "gNBId": 11,
                  "PLMNId_MCC": "466",
                  "nRPCI": 151,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 12,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 10,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 151,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 16,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 151,
                  "gNBId": 11,
                  "PLMNId_MCC": "466",
                  "nRPCI": 151,
                  "PLMNId_MNC": "55"
                },
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 12,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 13,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            },
            {
              "nrPCI": 150,
              "NRCellRelation": [
                {
                  "cellLocalId": "00000100001000",
                  "nRTCI": 150,
                  "gNBId": 5,
                  "PLMNId_MCC": "466",
                  "nRPCI": 150,
                  "PLMNId_MNC": "55"
                }
              ],
              "gNBId": 8,
              "cellLocalId": "00000100001000",
              "PLMNId_MCC": "466",
              "PLMNId_MNC": "55"
            }
          ]
        }
      };
    */
    
    // 原鄰居基站多、新鄰居基站也多的狀況 04/12 Add 
    calculateSonResponse_local: ForCalculateSonResponse = {
      "cco": {
        "average_sinr": "-4.752979",
        "cellIndividualResult": [
          {
            "txpower": 10,
            "gNBId": 16,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 6,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 11,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 15,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 5,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 14,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 12,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 1,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 17,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 2,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 10,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 13,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          },
          {
            "txpower": 10,
            "gNBId": 8,
            "pLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "pLMNId_MNC": "55"
          }
        ],
        "field": "e6700d701f8b41f8950e",
        "coverage": "0.430000"
      },
      "anr": {
        "field": "e6700d701f8b41f8950e",
        "cellIndividualResult": [
          {
            "gNBId": 16,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 11,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 154,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 15,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 160,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 5,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 142,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 14,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 156,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 12,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 141,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 10,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 157,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 13,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 144,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 6,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 5,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 142,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 12,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 141,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 1,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 139,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 17,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 143,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 2,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 148,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 10,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 157,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 8,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 145,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 11,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 16,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 153,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 15,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 160,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 14,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 156,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 12,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 141,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 10,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 157,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 13,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 144,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 15,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 16,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 153,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 11,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 154,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 14,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 156,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 13,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 144,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 5,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 16,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 153,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 6,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 140,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 12,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 141,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 1,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 139,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 17,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 143,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 2,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 148,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 10,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 157,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 8,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 145,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 14,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 16,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 153,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 11,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 154,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 15,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 160,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 13,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 144,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 12,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 16,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 153,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 6,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 140,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 11,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 154,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 5,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 142,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 10,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 157,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 13,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 144,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 1,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 6,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 140,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 5,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 142,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 17,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 143,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 2,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 148,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 8,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 145,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 17,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 6,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 140,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 5,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 142,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 1,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 139,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 2,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 148,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 8,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 145,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 2,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 6,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 140,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 5,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 142,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 1,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 139,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 17,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 143,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 10,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 16,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 153,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 6,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 140,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 11,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 154,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 5,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 142,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 12,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 141,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 13,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 144,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 8,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 145,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 13,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 16,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 153,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 11,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 154,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 15,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 160,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 14,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 156,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 12,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 141,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 10,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 157,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          },
          {
            "gNBId": 8,
            "cellLocalId": "00000100001000",
            "pLMNId_MCC": "466",
            "pLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 6,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 140,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 5,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 142,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 1,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 139,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 17,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 143,
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0"
              },
              {
                "cellIndividualOffset": {
                  "rsrpOffsetSsb": "db0",
                  "sinrOffsetCsiRs": "db0",
                  "rsrqOffsetSsb": "db0",
                  "sinrOffsetSsb": "db0",
                  "rsrpOffsetCsiRs": "db0",
                  "rsrqOffsetCsiRs": "db0"
                },
                "gNBId": 10,
                "isRemoveAllowed": "false",
                "cellLocalId": "00000100001000",
                "nRPCI": 157,
                "externalNrCellCu": [],
                "pLMNId_MCC": "466",
                "adjacentNrCellRef": "id0",
                "isHOAllowed": "true",
                "pLMNId_MNC": "55",
                "arfcnDl": 4850,
                "nRFreqRelationRef": "id0",
                "nRFrequencyRef": "id0",
                "nRFreqRelation": [
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  },
                  {
                    "nRFrequncyRef": "id0",
                    "qRxLevMin": -90,
                    "threshXLowP": 0,
                    "threshXHighP": 62,
                    "tReselectionNr": 0
                  }
                ]
              }
            ]
          }
        ]
      },
      "pci": {
        "collision_cell": [],
        "collision_count": [],
        "confusion_count_new": [],
        "confusion_cell_new": [],
        "confusion_cell": [],
        "cellIndividualResult": [
          {
            "nrPCI": 153,
            "gNBId": 16,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 154,
                "nRPCI": 154,
                "gNBId": 11,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 160,
                "nRPCI": 160,
                "gNBId": 15,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 168,
                "nRPCI": 168,
                "gNBId": 5,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 156,
                "nRPCI": 156,
                "gNBId": 14,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 165,
                "nRPCI": 165,
                "gNBId": 12,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 157,
                "nRPCI": 157,
                "gNBId": 10,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 13,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 167,
            "gNBId": 6,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 168,
                "nRPCI": 168,
                "gNBId": 5,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 165,
                "nRPCI": 165,
                "gNBId": 12,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 163,
                "nRPCI": 163,
                "gNBId": 1,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 17,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 150,
                "nRPCI": 150,
                "gNBId": 2,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 157,
                "nRPCI": 157,
                "gNBId": 10,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 164,
                "nRPCI": 164,
                "gNBId": 8,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 154,
            "gNBId": 11,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 153,
                "nRPCI": 153,
                "gNBId": 16,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 160,
                "nRPCI": 160,
                "gNBId": 15,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 156,
                "nRPCI": 156,
                "gNBId": 14,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 165,
                "nRPCI": 165,
                "gNBId": 12,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 157,
                "nRPCI": 157,
                "gNBId": 10,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 13,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 160,
            "gNBId": 15,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 153,
                "nRPCI": 153,
                "gNBId": 16,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 154,
                "nRPCI": 154,
                "gNBId": 11,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 156,
                "nRPCI": 156,
                "gNBId": 14,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 13,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 168,
            "gNBId": 5,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 153,
                "nRPCI": 153,
                "gNBId": 16,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 167,
                "nRPCI": 167,
                "gNBId": 6,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 165,
                "nRPCI": 165,
                "gNBId": 12,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 163,
                "nRPCI": 163,
                "gNBId": 1,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 17,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 150,
                "nRPCI": 150,
                "gNBId": 2,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 157,
                "nRPCI": 157,
                "gNBId": 10,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 164,
                "nRPCI": 164,
                "gNBId": 8,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 156,
            "gNBId": 14,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 153,
                "nRPCI": 153,
                "gNBId": 16,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 154,
                "nRPCI": 154,
                "gNBId": 11,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 160,
                "nRPCI": 160,
                "gNBId": 15,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 13,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 165,
            "gNBId": 12,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 153,
                "nRPCI": 153,
                "gNBId": 16,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 167,
                "nRPCI": 167,
                "gNBId": 6,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 154,
                "nRPCI": 154,
                "gNBId": 11,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 168,
                "nRPCI": 168,
                "gNBId": 5,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 157,
                "nRPCI": 157,
                "gNBId": 10,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 13,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 163,
            "gNBId": 1,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 167,
                "nRPCI": 167,
                "gNBId": 6,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 168,
                "nRPCI": 168,
                "gNBId": 5,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 17,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 150,
                "nRPCI": 150,
                "gNBId": 2,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 164,
                "nRPCI": 164,
                "gNBId": 8,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 166,
            "gNBId": 17,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 167,
                "nRPCI": 167,
                "gNBId": 6,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 168,
                "nRPCI": 168,
                "gNBId": 5,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 163,
                "nRPCI": 163,
                "gNBId": 1,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 150,
                "nRPCI": 150,
                "gNBId": 2,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 164,
                "nRPCI": 164,
                "gNBId": 8,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 150,
            "gNBId": 2,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 167,
                "nRPCI": 167,
                "gNBId": 6,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 168,
                "nRPCI": 168,
                "gNBId": 5,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 163,
                "nRPCI": 163,
                "gNBId": 1,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 17,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 157,
            "gNBId": 10,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 153,
                "nRPCI": 153,
                "gNBId": 16,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 167,
                "nRPCI": 167,
                "gNBId": 6,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 154,
                "nRPCI": 154,
                "gNBId": 11,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 168,
                "nRPCI": 168,
                "gNBId": 5,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 165,
                "nRPCI": 165,
                "gNBId": 12,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 13,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 164,
                "nRPCI": 164,
                "gNBId": 8,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 166,
            "gNBId": 13,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 153,
                "nRPCI": 153,
                "gNBId": 16,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 154,
                "nRPCI": 154,
                "gNBId": 11,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 160,
                "nRPCI": 160,
                "gNBId": 15,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 156,
                "nRPCI": 156,
                "gNBId": 14,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 165,
                "nRPCI": 165,
                "gNBId": 12,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 157,
                "nRPCI": 157,
                "gNBId": 10,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          },
          {
            "nrPCI": 164,
            "gNBId": 8,
            "PLMNId_MCC": "466",
            "cellLocalId": "00000100001000",
            "PLMNId_MNC": "55",
            "NRCellRelation": [
              {
                "nRTCI": 167,
                "nRPCI": 167,
                "gNBId": 6,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 168,
                "nRPCI": 168,
                "gNBId": 5,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 163,
                "nRPCI": 163,
                "gNBId": 1,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 166,
                "nRPCI": 166,
                "gNBId": 17,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              },
              {
                "nRTCI": 157,
                "nRPCI": 157,
                "gNBId": 10,
                "PLMNId_MCC": "466",
                "cellLocalId": "00000100001000",
                "PLMNId_MNC": "55"
              }
            ]
          }
        ],
        "confusion_count": [],
        "collision_cell_new": [],
        "collision_count_new": []
      }
    };
}
