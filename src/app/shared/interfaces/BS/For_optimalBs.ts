
    // @2024/05/04 Add
    // 用於新增、編輯或刪除一個基站的鄰居基站 POST 時用的 interfaces
    export interface ForAddOrEditOrDeleteNeighborBs_allInOneBs {
        type: string;
        session: string;
        isSave: string;
        bsInfo: BsInfo_OptimalBs[];
    }

    export interface BsInfo_OptimalBs {
        bsId: string;
        nci: string;
        neighbor: Neighbor_OptimalBs[];
    }

    export interface Neighbor_OptimalBs {
        id: string;
        nci: string;
        enable: string;
        alias: string;
        'must-include': string;
        'plmn-id': Plmnid;
        nrarfcn: number | string;
        pci: number | string;
        'q-offset': string;
        cio: string;
        'rs-tx-power': string;
        blacklisted: string;
        tac: string;
        __itri_default___?: number;
    }

    export interface Plmnid {
        mcc: string;
        mnc: string;
    }

    