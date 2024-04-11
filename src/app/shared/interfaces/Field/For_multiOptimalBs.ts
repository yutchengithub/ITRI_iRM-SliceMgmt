
// @2024/04/12 Add
// 用於發送套用 SON 計算優化用參數之結構 ( 呼叫的 API - multiOptimalBs )
export interface ForApplySon {
    session: string;
     isSave: boolean;
       type: string[];
     bsInfo: ApplySon_BsInfo[];
}

// @2024/04/12 Add
// 發送套用 SON 優化計算用所需之 BS 資訊
export interface ApplySon_BsInfo {
              bsId: string;
               nci: string;
               pci: number;
        'tx-power': number;
    'beam-pattern': string;
          neighbor: ApplySon_Neighbor[];
}

// @2024/04/12 Add
// 發送套用 SON 優化計算用所需之 BS 對應的鄰居 BS 資訊
export interface ApplySon_Neighbor {

          nci: string;
          pci: number;
      nrarfcn: number;
    'plmn-id': ApplySon_Plmnid;

    // 目前系統都只帶死值的部分
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

