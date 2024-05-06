  
  // @2024/05/06 Add
  // 用於編輯「分佈式」基站的鄰居基站列表資訊 POST 時用的 Submit Data 結構
  export interface ForUpdateDistributedBs_editNeighborBs {
    session: string;
    id: string;
    name: string;
    bstype: string;
    components: Components_dist;
    description: string;
    neighborinfo: Neighborinfo[];
  }
  
  export interface Neighborinfo {
    gNBId: number;
    gNBIdLength: number;
    cellLocalId: string;
    neighbor: Neighbor_dist[];
  }
  
  export interface Neighbor_dist {
    nci: string;
    pci: number | string;
    nrarfcn: number;
    'plmn-id': Plmnid;
    tac: string;
    id: string;
    enable: string;
    alias: string;
    cio: string;
    blacklisted: string;
    'must-include': string;
    'q-offset': string;
    'rs-tx-power': string;
    __itri_default___?: number;
  }
  
  export interface Plmnid {
    mcc: string;
    mnc: string;
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

