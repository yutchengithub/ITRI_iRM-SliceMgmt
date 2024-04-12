
// @2024/04/12 Add
// 用於發送套用 SON 計算優化用參數之結構 ( 呼叫的 API - multiOptimalBs )
export interface ForApplySon {
    session: string;
     isSave: boolean;  // 目前都帶死值: true
       type: string[]; // 可透過 this.calculationCategories 取得
     bsInfo: ApplySon_BsInfo[];
}

// @2024/04/12 Add
// 發送套用 SON 優化計算用所需之 BS 資訊
export interface ApplySon_BsInfo {
               bsId: string; // 可透過 this.processedCcoResults 中每筆的 bsId 取得
                nci: string; // 可透過 this.processedCcoResults 中每筆的 nci 取得
                pci: number; // 可透過 this.gnbsPci.nrPCI 取得
        'tx-power'?: number; // type 沒 cco 時不用傳，可透過 this.processedCcoResults.newTxPower 取得
    'beam-pattern'?: string; // type 沒 cco 時不用傳，目前有帶時都帶死值: "FINE"
           neighbor: ApplySon_Neighbor[]; // type 沒 anr 時不用傳
}

// @2024/04/12 Add
// 發送套用 SON 優化計算用所需之 BS 對應的鄰居 BS 資訊
export interface ApplySon_Neighbor {

          nci: string;          // 可透過 this.processedAnrResults 中每筆 newNeighbors 中的每筆 nci 取得
          pci: number;          // 可透過 this.processedAnrResults 中每筆 newNeighbors 中的每筆 pci 取得
      nrarfcn: number;          // 可透過 this.processedAnrResults 中每筆 newNeighbors 中的每筆 nrarfcn 取得
    'plmn-id': ApplySon_Plmnid; // 可透過 this.processedAnrResults 中每筆 newNeighbors 中的每筆 plmn-id 取得

    // 都只帶死值的部分
                  tac: string; // 目前都帶死值: ""
                   id: string; // 目前都帶死值: "0"
               enable: string; // 目前都帶死值: "0"
                alias: string; // 目前都帶死值: "xxxxxxxxxxxxxxxxxx"
                  cio: string; // 目前都帶死值: ""
          blacklisted: string; // 目前都帶死值: ""
       'must-include': string; // 目前都帶死值: ""
           'q-offset': string; // 目前都帶死值: ""
        'rs-tx-power': string; // 目前都帶死值: ""
    __itri_default___: number; // 目前都帶死值: 0
}

// @2024/04/12 Add
// 發送套用 SON 優化計算用所需之 BS 對應的鄰居 BS 資訊之 PLMNID
export interface ApplySon_Plmnid {
    mcc: string;
    mnc: string;
}

