
// @2024/03/31 Add
// 用於發送計算 SON 用參數之結構 
export interface ForCalculateSon {
  session: string;
  fieldServer: string;
  fieldId: string;
  type: string[];
  pciMax: string;
  pciMin: string;
  ueSyncMinSINR: string;
  ratioAverageSINR: string;
  ratioCoverage: string;
  ratioMaxCapacity: string;
  ratioFairCapacity: string;
  txPowerMax: string;
  txPowerMin: string;
}

export interface ForCalculateSonResponse {
  cco: Cco;
  anr: Anr;
  pci: Pci;
}

export interface Pci {
  collision_cell: any[];
  confusion_cell: any[];
  confusion_count_new: any[];
  collision_count: any[];
  confusion_cell_new: any[];
  confusion_count: any[];
  collision_cell_new: any[];
  collision_count_new: any[];
  cellIndividualResult: pci_CellIndividualResult[];
}

export interface pci_CellIndividualResult {
  nrPCI: number;
  gNBId: number;
  cellLocalId: string;
  NRCellRelation: NRCellRelation2[];
  PLMNId_MCC: string;
  PLMNId_MNC: string;
}

export interface NRCellRelation2 {
  nRTCI: number;
  gNBId: number;
  nRPCI: number;
  cellLocalId: string;
  PLMNId_MCC: string;
  PLMNId_MNC: string;
}

export interface Anr {
  field: string;
  cellIndividualResult: anr_CellIndividualResult[];
}

export interface anr_CellIndividualResult {
  gNBId: number;
  cellLocalId: string;
  pLMNId_MNC: string;
  pLMNId_MCC: string;
  NRCellRelation: NRCellRelation[];
}

export interface NRCellRelation {
  cellLocalId: string;
  isRemoveAllowed: string;
  arfcnDl: number;
  isHOAllowed: string;
  cellIndividualOffset: CellIndividualOffset;
  nRPCI: number;
  gNBId: number;
  pLMNId_MNC: string;
  pLMNId_MCC: string;
  nRFreqRelationRef: string;
  adjacentNrCellRef: string;
  nRFrequencyRef: string;
  nRFreqRelation?: NRFreqRelation[];
  externalNrCellCu?: any[];
}

export interface NRFreqRelation {
  nRFrequncyRef: string;
  qRxLevMin: number;
  threshXHighP: number;
  threshXLowP: number;
  tReselectionNr: number;
}

export interface CellIndividualOffset {
  rsrpOffsetSsb: string;
  rsrqOffsetSsb: string;
  sinrOffsetSsb: string;
  rsrpOffsetCsiRs: string;
  rsrqOffsetCsiRs: string;
  sinrOffsetCsiRs: string;
}

export interface Cco {
  field: string;
  average_sinr: string;
  cellIndividualResult: cco_CellIndividualResult[];
  coverage: string;
}

export interface cco_CellIndividualResult {
  pLMNId_MNC: string;
  txpower: number;
  gNBId: number;
  pLMNId_MCC: string;
  cellLocalId: string;
}
