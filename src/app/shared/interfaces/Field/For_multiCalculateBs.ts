
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

// 用於儲存 SON 計算回應值用於前端計算 @2024/04/11 Update 
export interface ForCalculateSonResponse {
  cco: Cco;
  anr: Anr;
  pci: Pci;
}

// PCI
export interface Pci {
       collision_cell: pci_Collisioncell[];
   collision_cell_new: pci_Collisioncell[];
      collision_count: pci_Collisioncount[];
  collision_count_new: pci_Collisioncount[];

       confusion_cell: pci_Confusioncell[];
   confusion_cell_new: pci_Confusioncell[];
      confusion_count: pci_Confusioncount[];
  confusion_count_new: pci_Confusioncount[];
  
  cellIndividualResult: pci_CellIndividualResult[];
}

export interface pci_CellIndividualResult {
  nrPCI: number;
  NRCellRelation: pci_NRCellRelation[];
  gNBId: number;
  cellLocalId: string;
  PLMNId_MCC: string;
  PLMNId_MNC: string;
}

export interface pci_NRCellRelation {
  cellLocalId: string;
  nRTCI: number;
  gNBId: number;
  PLMNId_MCC: string;
  nRPCI: number;
  PLMNId_MNC: string;
}


export interface pci_Collisioncell {
  collision_pci: number;
  source_gNBId: number;
  source_mcc: string;
  source_gNBId_length: number;
  source_cellLocalId: number;
  target_cellLocalId: number;
  source_mnc: string;
  target_gNBId: number;
  target_gNBId_length: number;
  target_mcc: string;
  target_mnc: string;
}

export interface pci_Confusioncell {
  confusion_pci: number;
  confused_mnc: string;
  source_gNBId: number;
  source_gNBId_length: number;
  confused_gNBId_length: number;
  source_mcc: string;
  confused_gNBId: number;
  confused_cellLocalId: number;
  source_cellLocalId: number;
  target_cellLocalId: number;
  source_mnc: string;
  target_gNBId: number;
  confused_mcc: string;
  target_gNBId_length: number;
  target_mcc: string;
  target_mnc: string;
}

export interface pci_Confusioncount {
  confusion_pci: number;
  confusion_count: number;
}

export interface pci_Collisioncount {
  collision_pci: number;
  collision_count: number;
}


// ANR
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

export interface ProcessedAnrResult {
  name: string;
  nci: string;
  originalNeighbors: anr_Neighbor[];
  newNeighbors: anr_Neighbor[];
}

export interface anr_Neighbor {
  name: string;
  nci: string;

  // newNeighbors 要另外帶的，用於套用優化算出的 Anr
  pci:  number;
  nrarfcn: number;
  'plmn-id': ApplySon_Plmnid;
}

export interface ApplySon_Plmnid {
  mcc: string;
  mnc: string;
}


// CCO
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

// 用於記錄前端針對 cco 處理的結果 @2024/04/12 Update
export interface ProcessedCcoResult {
  bsId: string;
  name: string;
  nci: string;
  originalTxPower: number;
  newTxPower: number;
}
