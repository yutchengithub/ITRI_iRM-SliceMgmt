
// Interfaces of Field Management - queryFieldKpiInfo @2024/06/11 Add
import { FieldKpiInfo } from '../../interfaces/Field/For_queryFieldKpiInfo';

// Local Files for general Current Field Kpi Info @2024/06/11 Add
export class localFieldKpiInfo {

  fieldKpiInfo_local: FieldKpiInfo = {
    // "0": {
    //   "start": "2024-01-01 18:00",
    //   "end": "2024-01-02 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "1": {
    //   "start": "2024-01-02 18:00",
    //   "end": "2024-01-03 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "2": {
    //   "start": "2024-01-03 18:00",
    //   "end": "2024-01-04 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "3": {
    //   "start": "2024-01-04 18:00",
    //   "end": "2024-01-05 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "4": {
    //   "start": "2024-01-05 18:00",
    //   "end": "2024-01-06 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "5": {
    //   "start": "2024-01-06 18:00",
    //   "end": "2024-01-07 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "6": {
    //   "start": "2024-01-07 18:00",
    //   "end": "2024-01-08 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "7": {
    //   "start": "2024-01-08 18:00",
    //   "end": "2024-01-09 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "8": {
    //   "start": "2024-01-09 18:00",
    //   "end": "2024-01-10 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "9": {
    //   "start": "2024-01-10 18:00",
    //   "end": "2024-01-11 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "10": {
    //   "start": "2024-01-11 18:00",
    //   "end": "2024-01-12 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "11": {
    //   "start": "2024-01-12 18:00",
    //   "end": "2024-01-13 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "12": {
    //   "start": "2024-01-13 18:00",
    //   "end": "2024-01-14 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "13": {
    //   "start": "2024-01-14 18:00",
    //   "end": "2024-01-15 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "14": {
    //   "start": "2024-01-15 18:00",
    //   "end": "2024-01-16 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "15": {
    //   "start": "2024-01-16 18:00",
    //   "end": "2024-01-17 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "72.54",
    //     "mobility": "74.8",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "152",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "72.54",
    //       "mobility": "74.8",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "152"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "16": {
    //   "start": "2024-01-17 18:00",
    //   "end": "2024-01-18 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "89.86",
    //     "mobility": "77.76",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "220",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "89.86",
    //       "mobility": "77.76",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "220"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "17": {
    //   "start": "2024-01-18 18:00",
    //   "end": "2024-01-19 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "18": {
    //   "start": "2024-01-19 18:00",
    //   "end": "2024-01-20 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "19": {
    //   "start": "2024-01-20 18:00",
    //   "end": "2024-01-21 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "20": {
    //   "start": "2024-01-21 18:00",
    //   "end": "2024-01-22 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "21": {
    //   "start": "2024-01-22 18:00",
    //   "end": "2024-01-23 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "22": {
    //   "start": "2024-01-23 18:00",
    //   "end": "2024-01-24 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "23": {
    //   "start": "2024-01-24 18:00",
    //   "end": "2024-01-25 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "24": {
    //   "start": "2024-01-25 18:00",
    //   "end": "2024-01-26 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "98.96",
    //     "mobility": "78.15",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "202",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "98.96",
    //       "mobility": "78.15",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "202"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "25": {
    //   "start": "2024-01-26 18:00",
    //   "end": "2024-01-27 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.05",
    //     "mobility": "76.71",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "288",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.05",
    //       "mobility": "76.71",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "26": {
    //   "start": "2024-01-27 18:00",
    //   "end": "2024-01-28 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.14",
    //     "mobility": "72.99",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "288",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.14",
    //       "mobility": "72.99",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "27": {
    //   "start": "2024-01-28 18:00",
    //   "end": "2024-01-29 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.21",
    //     "mobility": "80.55",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "288",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.21",
    //       "mobility": "80.55",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "28": {
    //   "start": "2024-01-29 18:00",
    //   "end": "2024-01-30 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.27",
    //     "mobility": "84.66",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "288",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.27",
    //       "mobility": "84.66",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "29": {
    //   "start": "2024-01-30 18:00",
    //   "end": "2024-01-31 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.32",
    //     "mobility": "78.66",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "288",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.32",
    //       "mobility": "78.66",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "30": {
    //   "start": "2024-01-31 18:00",
    //   "end": "2024-02-01 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.37",
    //     "mobility": "74.63",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "288",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.37",
    //       "mobility": "74.63",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "31": {
    //   "start": "2024-02-01 18:00",
    //   "end": "2024-02-02 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.44",
    //     "mobility": "74.27",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "468",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "99.99",
    //       "mobility": "70.64",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "120"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "71.41",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "60",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "69.8",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "60",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "67.35",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "60"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.41",
    //       "mobility": "77.31",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "32": {
    //   "start": "2024-02-02 18:00",
    //   "end": "2024-02-03 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.5",
    //     "mobility": "75.84",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "99.99",
    //       "mobility": "71.95",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "69.68",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "74.23",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.32",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.44",
    //       "mobility": "77.95",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "33": {
    //   "start": "2024-02-03 18:00",
    //   "end": "2024-02-04 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.54",
    //     "mobility": "81.96",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "99.99",
    //       "mobility": "82.13",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "84.72",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "79.69",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "71.74",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.47",
    //       "mobility": "85.81",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "34": {
    //   "start": "2024-02-04 18:00",
    //   "end": "2024-02-05 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.58",
    //     "mobility": "78.94",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "79.54",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.9",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.17",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "72.53",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.5",
    //       "mobility": "80.8",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "35": {
    //   "start": "2024-02-05 18:00",
    //   "end": "2024-02-06 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.61",
    //     "mobility": "79.8",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "99.99",
    //       "mobility": "83.14",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "79.18",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "87.23",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.06",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.53",
    //       "mobility": "78.83",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "36": {
    //   "start": "2024-02-06 18:00",
    //   "end": "2024-02-07 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.62",
    //     "mobility": "79.43",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "99.99",
    //       "mobility": "76.62",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "81.19",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "72.19",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.13",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.54",
    //       "mobility": "79.98",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "37": {
    //   "start": "2024-02-07 18:00",
    //   "end": "2024-02-08 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.64",
    //     "mobility": "80.7",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "99.99",
    //       "mobility": "75.15",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "68.84",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "81.78",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.02",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.55",
    //       "mobility": "84.28",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "38": {
    //   "start": "2024-02-08 18:00",
    //   "end": "2024-02-09 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.65",
    //     "mobility": "72.83",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "99.99",
    //       "mobility": "78.93",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "81.26",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "99.99",
    //           "mobility": "76.68",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "71.47",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.56",
    //       "mobility": "69.3",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "39": {
    //   "start": "2024-02-09 18:00",
    //   "end": "2024-02-10 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.66",
    //     "mobility": "82.0",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.82",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.51",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.31",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "88.89",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.57",
    //       "mobility": "84.75",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "40": {
    //   "start": "2024-02-10 18:00",
    //   "end": "2024-02-11 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.67",
    //     "mobility": "81.74",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.62",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "74.02",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.21",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "94.39",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.58",
    //       "mobility": "82.74",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "41": {
    //   "start": "2024-02-11 18:00",
    //   "end": "2024-02-12 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.68",
    //     "mobility": "78.26",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.41",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "91.91",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.44",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "63.29",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.59",
    //       "mobility": "79.34",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "42": {
    //   "start": "2024-02-12 18:00",
    //   "end": "2024-02-13 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.69",
    //     "mobility": "77.04",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "73.46",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "72.06",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "74.98",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "75.75",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.6",
    //       "mobility": "79.79",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "43": {
    //   "start": "2024-02-13 18:00",
    //   "end": "2024-02-14 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.7",
    //     "mobility": "75.14",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.4",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "70.66",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.29",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "73.13",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.61",
    //       "mobility": "76.33",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "44": {
    //   "start": "2024-02-14 18:00",
    //   "end": "2024-02-15 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.71",
    //     "mobility": "79.5",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.91",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.65",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "80.48",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "85.37",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.61",
    //       "mobility": "78.61",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "45": {
    //   "start": "2024-02-15 18:00",
    //   "end": "2024-02-16 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.72",
    //     "mobility": "77.98",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.82",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.54",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "86.68",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.44",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.62",
    //       "mobility": "77.96",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "46": {
    //   "start": "2024-02-16 18:00",
    //   "end": "2024-02-17 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.73",
    //     "mobility": "75.41",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.03",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "84.11",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "72.04",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.97",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.63",
    //       "mobility": "72.71",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "47": {
    //   "start": "2024-02-17 18:00",
    //   "end": "2024-02-18 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.74",
    //     "mobility": "77.3",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "75.1",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.02",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "73.23",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "79.21",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.64",
    //       "mobility": "78.24",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "48": {
    //   "start": "2024-02-18 18:00",
    //   "end": "2024-02-19 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.74",
    //     "mobility": "75.53",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "79.65",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.51",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.67",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.32",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.64",
    //       "mobility": "72.12",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "49": {
    //   "start": "2024-02-19 18:00",
    //   "end": "2024-02-20 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.75",
    //     "mobility": "81.6",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.67",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.58",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.74",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "85.7",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.65",
    //       "mobility": "83.49",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "50": {
    //   "start": "2024-02-20 18:00",
    //   "end": "2024-02-21 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.76",
    //     "mobility": "77.86",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.96",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.32",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "74.84",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "86.1",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.66",
    //       "mobility": "75.74",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "51": {
    //   "start": "2024-02-21 18:00",
    //   "end": "2024-02-22 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.76",
    //     "mobility": "80.45",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.57",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "84.33",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.05",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "72.63",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.66",
    //       "mobility": "83.01",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "52": {
    //   "start": "2024-02-22 18:00",
    //   "end": "2024-02-23 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.77",
    //     "mobility": "77.21",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "72.54",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "76.21",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "69.14",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "79.96",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.67",
    //       "mobility": "79.59",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "53": {
    //   "start": "2024-02-23 18:00",
    //   "end": "2024-02-24 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.77",
    //     "mobility": "78.3",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.73",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "83.89",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.64",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "67.25",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.67",
    //       "mobility": "80.47",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "54": {
    //   "start": "2024-02-24 18:00",
    //   "end": "2024-02-25 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.78",
    //     "mobility": "83.79",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "86.81",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "97.21",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.81",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.18",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.68",
    //       "mobility": "84.33",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "55": {
    //   "start": "2024-02-25 18:00",
    //   "end": "2024-02-26 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.78",
    //     "mobility": "83.69",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "87.83",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "96.59",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.47",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "83.0",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.69",
    //       "mobility": "81.35",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "56": {
    //   "start": "2024-02-26 18:00",
    //   "end": "2024-02-27 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.79",
    //     "mobility": "78.34",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "82.56",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "83.65",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.49",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "69.64",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.69",
    //       "mobility": "78.63",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "57": {
    //   "start": "2024-02-27 18:00",
    //   "end": "2024-02-28 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.79",
    //     "mobility": "79.59",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.21",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.42",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.07",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.03",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.7",
    //       "mobility": "79.84",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "58": {
    //   "start": "2024-02-28 18:00",
    //   "end": "2024-02-29 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.8",
    //     "mobility": "77.43",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "82.61",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "93.44",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "72.75",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "69.98",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.7",
    //       "mobility": "76.75",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "59": {
    //   "start": "2024-02-29 18:00",
    //   "end": "2024-03-01 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.8",
    //     "mobility": "81.22",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.0",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "89.15",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.12",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.47",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.7",
    //       "mobility": "78.39",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "60": {
    //   "start": "2024-03-01 18:00",
    //   "end": "2024-03-02 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.81",
    //     "mobility": "85.48",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "87.27",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "89.65",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "84.7",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.85",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.71",
    //       "mobility": "84.45",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "61": {
    //   "start": "2024-03-02 18:00",
    //   "end": "2024-03-03 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.81",
    //     "mobility": "77.07",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.8",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "74.45",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.38",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "70.66",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.71",
    //       "mobility": "78.87",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "62": {
    //   "start": "2024-03-03 18:00",
    //   "end": "2024-03-04 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.81",
    //     "mobility": "80.31",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "75.52",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.15",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "70.64",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.59",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.72",
    //       "mobility": "83.22",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "63": {
    //   "start": "2024-03-04 18:00",
    //   "end": "2024-03-05 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.82",
    //     "mobility": "74.69",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.04",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.94",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "73.27",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "66.06",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.72",
    //       "mobility": "76.65",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "64": {
    //   "start": "2024-03-05 18:00",
    //   "end": "2024-03-06 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.82",
    //     "mobility": "78.02",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.59",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.16",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "67.22",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "72.33",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.73",
    //       "mobility": "82.43",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "65": {
    //   "start": "2024-03-06 18:00",
    //   "end": "2024-03-07 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.82",
    //     "mobility": "75.23",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "71.06",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "70.92",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.19",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "71.37",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.73",
    //       "mobility": "79.61",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "66": {
    //   "start": "2024-03-07 18:00",
    //   "end": "2024-03-08 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.83",
    //     "mobility": "78.54",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "82.75",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "91.63",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.12",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.86",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.73",
    //       "mobility": "77.19",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "67": {
    //   "start": "2024-03-08 18:00",
    //   "end": "2024-03-09 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.83",
    //     "mobility": "74.49",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "575",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "72.85",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "74.53",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.22",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.7",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.74",
    //       "mobility": "74.97",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "287"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "68": {
    //   "start": "2024-03-09 18:00",
    //   "end": "2024-03-10 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.83",
    //     "mobility": "72.39",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "68.52",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "69.51",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "67.51",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "70.53",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.74",
    //       "mobility": "75.66",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "69": {
    //   "start": "2024-03-10 18:00",
    //   "end": "2024-03-11 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.84",
    //     "mobility": "79.01",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "83.97",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "85.56",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.38",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "71.33",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.74",
    //       "mobility": "78.46",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "70": {
    //   "start": "2024-03-11 18:00",
    //   "end": "2024-03-12 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.84",
    //     "mobility": "75.31",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "70.23",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.83",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "68.73",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "71.43",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.75",
    //       "mobility": "80.04",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "71": {
    //   "start": "2024-03-12 18:00",
    //   "end": "2024-03-13 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.84",
    //     "mobility": "80.39",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.38",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.39",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.13",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "88.8",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.75",
    //       "mobility": "82.02",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "72": {
    //   "start": "2024-03-13 18:00",
    //   "end": "2024-03-14 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.84",
    //     "mobility": "79.11",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.29",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.93",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.63",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "88.39",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.75",
    //       "mobility": "76.77",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "73": {
    //   "start": "2024-03-14 18:00",
    //   "end": "2024-03-15 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.85",
    //     "mobility": "75.86",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.11",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.7",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.51",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "63.81",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.76",
    //       "mobility": "78.82",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "74": {
    //   "start": "2024-03-15 18:00",
    //   "end": "2024-03-16 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.85",
    //     "mobility": "73.02",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "72.51",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "72.25",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "72.78",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "63.85",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.76",
    //       "mobility": "76.61",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "75": {
    //   "start": "2024-03-16 18:00",
    //   "end": "2024-03-17 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.85",
    //     "mobility": "82.68",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.36",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "88.38",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "80.56",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "82.86",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.76",
    //       "mobility": "81.57",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "76": {
    //   "start": "2024-03-17 18:00",
    //   "end": "2024-03-18 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.85",
    //     "mobility": "78.72",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.77",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.09",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "80.59",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.85",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.77",
    //       "mobility": "79.7",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "77": {
    //   "start": "2024-03-18 18:00",
    //   "end": "2024-03-19 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.86",
    //     "mobility": "77.15",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "73.78",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "69.81",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.05",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "75.72",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.77",
    //       "mobility": "80.0",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "78": {
    //   "start": "2024-03-19 18:00",
    //   "end": "2024-03-20 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.86",
    //     "mobility": "81.84",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.75",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.1",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.72",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.16",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.77",
    //       "mobility": "83.29",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "79": {
    //   "start": "2024-03-20 18:00",
    //   "end": "2024-03-21 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.86",
    //     "mobility": "81.02",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.85",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.93",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.32",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "75.36",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.77",
    //       "mobility": "85.72",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "80": {
    //   "start": "2024-03-21 18:00",
    //   "end": "2024-03-22 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.86",
    //     "mobility": "83.01",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "85.47",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "89.94",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.2",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.63",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.78",
    //       "mobility": "81.78",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "81": {
    //   "start": "2024-03-22 18:00",
    //   "end": "2024-03-23 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.86",
    //     "mobility": "78.53",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.44",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "84.98",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "76.45",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "73.95",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.78",
    //       "mobility": "78.82",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "82": {
    //   "start": "2024-03-23 18:00",
    //   "end": "2024-03-24 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.87",
    //     "mobility": "79.85",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.21",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.09",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "86.05",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "71.87",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.78",
    //       "mobility": "81.77",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "83": {
    //   "start": "2024-03-24 18:00",
    //   "end": "2024-03-25 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.87",
    //     "mobility": "81.27",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.75",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "84.01",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.8",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.3",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.79",
    //       "mobility": "84.05",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "84": {
    //   "start": "2024-03-25 18:00",
    //   "end": "2024-03-26 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.87",
    //     "mobility": "80.93",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "82.48",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.22",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "83.69",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "79.15",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.79",
    //       "mobility": "80.49",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "85": {
    //   "start": "2024-03-26 18:00",
    //   "end": "2024-03-27 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.87",
    //     "mobility": "76.48",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "82.05",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "80.45",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "83.76",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "75.84",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.79",
    //       "mobility": "73.11",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "86": {
    //   "start": "2024-03-27 18:00",
    //   "end": "2024-03-28 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.87",
    //     "mobility": "80.19",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.85",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.53",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.62",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.5",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.79",
    //       "mobility": "83.41",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "87": {
    //   "start": "2024-03-28 18:00",
    //   "end": "2024-03-29 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.87",
    //     "mobility": "81.03",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.72",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.74",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.81",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.0",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.79",
    //       "mobility": "85.1",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "88": {
    //   "start": "2024-03-29 18:00",
    //   "end": "2024-03-30 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.88",
    //     "mobility": "76.94",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.33",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.93",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.06",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "72.37",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.8",
    //       "mobility": "77.64",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "89": {
    //   "start": "2024-03-30 18:00",
    //   "end": "2024-03-31 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.88",
    //     "mobility": "80.15",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.5",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "83.12",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.93",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "71.54",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.8",
    //       "mobility": "82.9",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "90": {
    //   "start": "2024-03-31 18:00",
    //   "end": "2024-04-01 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.88",
    //     "mobility": "77.72",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.34",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.87",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.92",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "71.7",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.8",
    //       "mobility": "78.12",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "91": {
    //   "start": "2024-04-01 18:00",
    //   "end": "2024-04-02 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.88",
    //     "mobility": "79.81",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.13",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "91.02",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.17",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.38",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.8",
    //       "mobility": "80.78",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "92": {
    //   "start": "2024-04-02 18:00",
    //   "end": "2024-04-03 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.88",
    //     "mobility": "77.74",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.93",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "86.15",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "83.72",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.41",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.81",
    //       "mobility": "71.51",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "93": {
    //   "start": "2024-04-03 18:00",
    //   "end": "2024-04-04 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.88",
    //     "mobility": "77.16",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.79",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.72",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.82",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "70.45",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.81",
    //       "mobility": "77.26",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "94": {
    //   "start": "2024-04-04 18:00",
    //   "end": "2024-04-05 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.89",
    //     "mobility": "77.94",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "75.31",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "80.68",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "69.91",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.23",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.81",
    //       "mobility": "79.97",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "95": {
    //   "start": "2024-04-05 18:00",
    //   "end": "2024-04-06 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.89",
    //     "mobility": "78.12",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.69",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.19",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "76.17",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "73.79",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.81",
    //       "mobility": "79.92",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "96": {
    //   "start": "2024-04-06 18:00",
    //   "end": "2024-04-07 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.89",
    //     "mobility": "80.86",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "75.9",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.43",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "70.2",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "82.17",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.81",
    //       "mobility": "84.08",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "97": {
    //   "start": "2024-04-07 18:00",
    //   "end": "2024-04-08 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.89",
    //     "mobility": "79.28",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.93",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.02",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "85.13",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.02",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.81",
    //       "mobility": "76.96",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "98": {
    //   "start": "2024-04-08 18:00",
    //   "end": "2024-04-09 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.89",
    //     "mobility": "76.83",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "517",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "73.83",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "172"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "73.77",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "86",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "73.89",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "86",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "83.16",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "86"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.82",
    //       "mobility": "76.88",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "259"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "99": {
    //   "start": "2024-04-09 18:00",
    //   "end": "2024-04-10 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "100": {
    //   "start": "2024-04-10 18:00",
    //   "end": "2024-04-11 18:00",
    //   "field": {
    //     "accessibility": null,
    //     "availability": null,
    //     "mobility": null,
    //     "retainability": null,
    //     "energy": null,
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "0",
    //       "resourceProcess": "0",
    //       "resourceMemory": "0",
    //       "resourceDisk": "0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": null,
    //       "availability": null,
    //       "mobility": null,
    //       "energy": null,
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "0",
    //         "resourceMemory": "0",
    //         "resourceDisk": "0",
    //         "maxPdu": "0"
    //       },
    //       "retainability": null,
    //       "cellInfoList": []
    //     }
    //   ]
    // },
    // "101": {
    //   "start": "2024-04-11 18:00",
    //   "end": "2024-04-12 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.89",
    //     "mobility": "80.9",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "341",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "83.83",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "114"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "89.18",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "57",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.97",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "57",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "93.9",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "57"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.82",
    //       "mobility": "75.1",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "170"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "102": {
    //   "start": "2024-04-12 18:00",
    //   "end": "2024-04-13 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.9",
    //     "mobility": "79.47",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.82",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "80.58",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "73.28",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "88.23",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.82",
    //       "mobility": "78.6",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "103": {
    //   "start": "2024-04-13 18:00",
    //   "end": "2024-04-14 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.9",
    //     "mobility": "77.03",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "576",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.41",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "192"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.42",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.59",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "96",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "64.99",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.82",
    //       "mobility": "79.12",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "104": {
    //   "start": "2024-04-14 18:00",
    //   "end": "2024-04-15 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "78.36",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "812",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.41",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "428"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "84.68",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "214",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.3",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "214",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.48",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.83",
    //       "mobility": "74.29",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "105": {
    //   "start": "2024-04-15 18:00",
    //   "end": "2024-04-16 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "74.05",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "800",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "72.64",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "416"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "76.81",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "208",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "68.36",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "208",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.21",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.83",
    //       "mobility": "73.62",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "106": {
    //   "start": "2024-04-16 18:00",
    //   "end": "2024-04-17 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.91",
    //     "mobility": "77.62",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.49",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "76.96",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "80.09",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.85",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.83",
    //       "mobility": "76.64",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "107": {
    //   "start": "2024-04-17 18:00",
    //   "end": "2024-04-18 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.91",
    //     "mobility": "76.84",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.09",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.41",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "74.77",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "79.21",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.83",
    //       "mobility": "74.94",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "108": {
    //   "start": "2024-04-18 18:00",
    //   "end": "2024-04-19 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.91",
    //     "mobility": "85.25",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "84.01",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.36",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "89.07",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "85.98",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.83",
    //       "mobility": "86.29",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "109": {
    //   "start": "2024-04-19 18:00",
    //   "end": "2024-04-20 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.91",
    //     "mobility": "71.8",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "70.03",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "69.8",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "70.25",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "73.68",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.83",
    //       "mobility": "72.97",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "110": {
    //   "start": "2024-04-20 18:00",
    //   "end": "2024-04-21 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.91",
    //     "mobility": "77.36",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.86",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.91",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "83.98",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "73.08",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.84",
    //       "mobility": "75.5",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "111": {
    //   "start": "2024-04-21 18:00",
    //   "end": "2024-04-22 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "77.27",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.89",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.69",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "81.09",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "82.54",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.84",
    //       "mobility": "71.51",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "112": {
    //   "start": "2024-04-22 18:00",
    //   "end": "2024-04-23 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "78.45",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.81",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "76.89",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "76.74",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "85.69",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.84",
    //       "mobility": "78.09",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "113": {
    //   "start": "2024-04-23 18:00",
    //   "end": "2024-04-24 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "75.8",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.46",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "74.33",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.61",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.9",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.84",
    //       "mobility": "74.14",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "114": {
    //   "start": "2024-04-24 18:00",
    //   "end": "2024-04-25 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "74.28",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.89",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.55",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.17",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.05",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.84",
    //       "mobility": "71.81",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "115": {
    //   "start": "2024-04-25 18:00",
    //   "end": "2024-04-26 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "75.03",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "73.7",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.51",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "71.93",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "70.37",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.84",
    //       "mobility": "77.91",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "116": {
    //   "start": "2024-04-26 18:00",
    //   "end": "2024-04-27 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "77.19",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.96",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.61",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.29",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "79.22",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.84",
    //       "mobility": "74.85",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "117": {
    //   "start": "2024-04-27 18:00",
    //   "end": "2024-04-28 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "77.83",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "83.93",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "78.6",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "89.71",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.49",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.84",
    //       "mobility": "72.35",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "118": {
    //   "start": "2024-04-28 18:00",
    //   "end": "2024-04-29 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "79.01",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "79.46",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "73.38",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "86.14",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.45",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.85",
    //       "mobility": "78.76",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "119": {
    //   "start": "2024-04-29 18:00",
    //   "end": "2024-04-30 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "79.0",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "80.17",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "84.45",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.9",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.93",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.85",
    //       "mobility": "78.51",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "120": {
    //   "start": "2024-04-30 18:00",
    //   "end": "2024-05-01 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "77.19",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "76.48",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "72.44",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "80.55",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "70.02",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.85",
    //       "mobility": "80.94",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "121": {
    //   "start": "2024-05-01 18:00",
    //   "end": "2024-05-02 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "77.38",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "82.46",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "84.2",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "80.74",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "64.69",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.85",
    //       "mobility": "77.2",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "122": {
    //   "start": "2024-05-02 18:00",
    //   "end": "2024-05-03 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "80.49",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.6",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.99",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "87.78",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "90.09",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.85",
    //       "mobility": "76.33",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "123": {
    //   "start": "2024-05-03 18:00",
    //   "end": "2024-05-04 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.92",
    //     "mobility": "79.14",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "79.6",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.31",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.0",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.52",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.85",
    //       "mobility": "78.88",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "124": {
    //   "start": "2024-05-04 18:00",
    //   "end": "2024-05-05 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.93",
    //     "mobility": "78.98",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "81.19",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "79.24",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "83.09",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.97",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.85",
    //       "mobility": "76.92",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "125": {
    //   "start": "2024-05-05 18:00",
    //   "end": "2024-05-06 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.93",
    //     "mobility": "82.75",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "85.43",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "88.53",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "82.44",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.23",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.85",
    //       "mobility": "82.87",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "126": {
    //   "start": "2024-05-06 18:00",
    //   "end": "2024-05-07 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.93",
    //     "mobility": "73.42",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "74.91",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "77.34",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "72.47",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "78.3",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.86",
    //       "mobility": "70.4",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "127": {
    //   "start": "2024-05-07 18:00",
    //   "end": "2024-05-08 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.93",
    //     "mobility": "79.47",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "672",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "77.79",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "80.46",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "100.0",
    //           "mobility": "75.29",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "144",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "73.21",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.86",
    //       "mobility": "83.37",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "128": {
    //   "start": "2024-05-08 18:00",
    //   "end": "2024-05-09 18:00",
    //   "field": {
    //     "accessibility": "100.0",
    //     "availability": "99.8",
    //     "mobility": "77.48",
    //     "retainability": "0.0",
    //     "energy": "28780.54",
    //     "utilization": {
    //       "pdu": "0",
    //       "maxPdu": "736",
    //       "resourceProcess": "5.0",
    //       "resourceMemory": "47.0",
    //       "resourceDisk": "0.0"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "100.0",
    //       "availability": "99.68",
    //       "mobility": "78.44",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "352"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "100.0",
    //           "availability": "99.68",
    //           "mobility": "80.46",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "176",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "100.0",
    //           "availability": "99.68",
    //           "mobility": "76.45",
    //           "retainability": "0.0",
    //           "utilization": {
    //             "pdu": "0",
    //             "maxPdu": "176",
    //             "resourceProcess": "5.0",
    //             "resourceMemory": "47.0",
    //             "resourceDisk": "0.0"
    //           },
    //           "energy": "28780.54",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "100.0",
    //       "availability": "100.0",
    //       "mobility": "79.76",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "96"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "100.0",
    //       "availability": "99.86",
    //       "mobility": "75.59",
    //       "energy": "28780.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "0",
    //         "resourceProcess": "5.0",
    //         "resourceMemory": "47.0",
    //         "resourceDisk": "0.0",
    //         "maxPdu": "288"
    //       },
    //       "retainability": "0.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "129": {
    //   "start": "2024-05-09 18:00",
    //   "end": "2024-05-10 18:00",
    //   "field": {
    //     "accessibility": "66.19",
    //     "availability": "99.76",
    //     "mobility": "77.8",
    //     "retainability": "0.4",
    //     "energy": "29.12",
    //     "utilization": {
    //       "pdu": "194",
    //       "maxPdu": "971",
    //       "resourceProcess": "15.73",
    //       "resourceMemory": "87.9",
    //       "resourceDisk": "1.44"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "66.94",
    //       "availability": "99.62",
    //       "mobility": "76.53",
    //       "energy": "45.62",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "64",
    //         "resourceProcess": "12.35",
    //         "resourceMemory": "88.72",
    //         "resourceDisk": "0.91",
    //         "maxPdu": "449"
    //       },
    //       "retainability": "0.16",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "66.8",
    //           "availability": "99.62",
    //           "mobility": "80.59",
    //           "retainability": "0.16",
    //           "utilization": {
    //             "pdu": "32",
    //             "maxPdu": "224",
    //             "resourceProcess": "12.31",
    //             "resourceMemory": "102.28",
    //             "resourceDisk": "0.89"
    //           },
    //           "energy": "47.88",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "67.08",
    //           "availability": "99.62",
    //           "mobility": "72.72",
    //           "retainability": "0.16",
    //           "utilization": {
    //             "pdu": "32",
    //             "maxPdu": "225",
    //             "resourceProcess": "12.39",
    //             "resourceMemory": "77.7",
    //             "resourceDisk": "0.93"
    //           },
    //           "energy": "43.57",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "63.14",
    //       "availability": "100.0",
    //       "mobility": "81.11",
    //       "energy": "20.34",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "35",
    //         "resourceProcess": "18.78",
    //         "resourceMemory": "89.61",
    //         "resourceDisk": "2.48",
    //         "maxPdu": "130"
    //       },
    //       "retainability": "0.31",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "66.71",
    //       "availability": "99.86",
    //       "mobility": "78.49",
    //       "energy": "20.84",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "95",
    //         "resourceProcess": "18.9",
    //         "resourceMemory": "86.82",
    //         "resourceDisk": "1.89",
    //         "maxPdu": "392"
    //       },
    //       "retainability": "0.31",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "130": {
    //   "start": "2024-05-10 18:00",
    //   "end": "2024-05-11 18:00",
    //   "field": {
    //     "accessibility": "64.28",
    //     "availability": "99.98",
    //     "mobility": "79.1",
    //     "retainability": "1.0",
    //     "energy": "2.81",
    //     "utilization": {
    //       "pdu": "878",
    //       "maxPdu": "1630",
    //       "resourceProcess": "39.3",
    //       "resourceMemory": "86.52",
    //       "resourceDisk": "14.06"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.71",
    //       "availability": "99.99",
    //       "mobility": "79.25",
    //       "energy": "6.72",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "284",
    //         "resourceProcess": "30.8",
    //         "resourceMemory": "83.5",
    //         "resourceDisk": "6.11",
    //         "maxPdu": "675"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.94",
    //           "availability": "99.99",
    //           "mobility": "90.22",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "138",
    //             "maxPdu": "336",
    //             "resourceProcess": "30.79",
    //             "resourceMemory": "81.77",
    //             "resourceDisk": "6.14"
    //           },
    //           "energy": "6.75",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.48",
    //           "availability": "99.99",
    //           "mobility": "69.35",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "146",
    //             "maxPdu": "339",
    //             "resourceProcess": "30.8",
    //             "resourceMemory": "85.26",
    //             "resourceDisk": "6.09"
    //           },
    //           "energy": "6.7",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.8",
    //       "availability": "78.27",
    //       "mobility": "74.76",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "146",
    //         "resourceProcess": "46.14",
    //         "resourceMemory": "87.71",
    //         "resourceDisk": "41.45",
    //         "maxPdu": "242"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "63.49",
    //       "availability": "77.47",
    //       "mobility": "75.0",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "448",
    //         "resourceProcess": "46.0",
    //         "resourceMemory": "88.23",
    //         "resourceDisk": "36.96",
    //         "maxPdu": "713"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "131": {
    //   "start": "2024-05-11 18:00",
    //   "end": "2024-05-12 18:00",
    //   "field": {
    //     "accessibility": "65.08",
    //     "availability": "99.98",
    //     "mobility": "74.3",
    //     "retainability": "1.0",
    //     "energy": "2.79",
    //     "utilization": {
    //       "pdu": "779",
    //       "maxPdu": "1472",
    //       "resourceProcess": "39.34",
    //       "resourceMemory": "84.73",
    //       "resourceDisk": "14.61"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "66.46",
    //       "availability": "99.99",
    //       "mobility": "74.28",
    //       "energy": "6.58",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "266",
    //         "resourceProcess": "31.09",
    //         "resourceMemory": "82.79",
    //         "resourceDisk": "6.54",
    //         "maxPdu": "604"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "67.72",
    //           "availability": "99.99",
    //           "mobility": "72.73",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "137",
    //             "maxPdu": "306",
    //             "resourceProcess": "31.22",
    //             "resourceMemory": "80.11",
    //             "resourceDisk": "7.06"
    //           },
    //           "energy": "6.46",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "65.23",
    //           "availability": "99.99",
    //           "mobility": "75.89",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "129",
    //             "maxPdu": "298",
    //             "resourceProcess": "30.95",
    //             "resourceMemory": "85.69",
    //             "resourceDisk": "6.03"
    //           },
    //           "energy": "6.7",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.57",
    //       "availability": "76.86",
    //       "mobility": "76.24",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "129",
    //         "resourceProcess": "46.33",
    //         "resourceMemory": "89.5",
    //         "resourceDisk": "37.02",
    //         "maxPdu": "222"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.33",
    //       "availability": "78.05",
    //       "mobility": "74.39",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "384",
    //         "resourceProcess": "45.63",
    //         "resourceMemory": "84.5",
    //         "resourceDisk": "38.91",
    //         "maxPdu": "646"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "132": {
    //   "start": "2024-05-12 18:00",
    //   "end": "2024-05-13 18:00",
    //   "field": {
    //     "accessibility": "65.42",
    //     "availability": "99.98",
    //     "mobility": "80.89",
    //     "retainability": "1.0",
    //     "energy": "2.78",
    //     "utilization": {
    //       "pdu": "602",
    //       "maxPdu": "1096",
    //       "resourceProcess": "39.24",
    //       "resourceMemory": "83.22",
    //       "resourceDisk": "14.04"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "66.05",
    //       "availability": "99.99",
    //       "mobility": "81.11",
    //       "energy": "6.54",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "208",
    //         "resourceProcess": "31.0",
    //         "resourceMemory": "80.8",
    //         "resourceDisk": "6.33",
    //         "maxPdu": "463"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "66.78",
    //           "availability": "99.99",
    //           "mobility": "75.4",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "101",
    //             "maxPdu": "237",
    //             "resourceProcess": "31.45",
    //             "resourceMemory": "77.46",
    //             "resourceDisk": "6.4"
    //           },
    //           "energy": "6.57",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "65.32",
    //           "availability": "99.99",
    //           "mobility": "87.66",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "107",
    //             "maxPdu": "226",
    //             "resourceProcess": "30.57",
    //             "resourceMemory": "84.38",
    //             "resourceDisk": "6.27"
    //           },
    //           "energy": "6.51",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "62.46",
    //       "availability": "77.68",
    //       "mobility": "73.45",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "97",
    //         "resourceProcess": "46.37",
    //         "resourceMemory": "85.53",
    //         "resourceDisk": "37.42",
    //         "maxPdu": "166"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "66.01",
    //       "availability": "78.13",
    //       "mobility": "75.07",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "297",
    //         "resourceProcess": "45.6",
    //         "resourceMemory": "84.1",
    //         "resourceDisk": "36.86",
    //         "maxPdu": "467"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "133": {
    //   "start": "2024-05-13 18:00",
    //   "end": "2024-05-14 18:00",
    //   "field": {
    //     "accessibility": "64.97",
    //     "availability": "99.98",
    //     "mobility": "74.43",
    //     "retainability": "1.0",
    //     "energy": "2.84",
    //     "utilization": {
    //       "pdu": "871",
    //       "maxPdu": "1614",
    //       "resourceProcess": "39.0",
    //       "resourceMemory": "84.38",
    //       "resourceDisk": "14.68"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "65.14",
    //       "availability": "99.99",
    //       "mobility": "74.41",
    //       "energy": "6.72",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "297",
    //         "resourceProcess": "30.63",
    //         "resourceMemory": "86.65",
    //         "resourceDisk": "6.71",
    //         "maxPdu": "665"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.19",
    //           "availability": "99.99",
    //           "mobility": "68.77",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "150",
    //             "maxPdu": "326",
    //             "resourceProcess": "31.14",
    //             "resourceMemory": "84.43",
    //             "resourceDisk": "6.41"
    //           },
    //           "energy": "6.73",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "66.11",
    //           "availability": "99.99",
    //           "mobility": "80.92",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "147",
    //             "maxPdu": "339",
    //             "resourceProcess": "30.13",
    //             "resourceMemory": "88.84",
    //             "resourceDisk": "7.02"
    //           },
    //           "energy": "6.71",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.53",
    //       "availability": "76.52",
    //       "mobility": "75.95",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "144",
    //         "resourceProcess": "46.45",
    //         "resourceMemory": "85.71",
    //         "resourceDisk": "35.62",
    //         "maxPdu": "238"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.68",
    //       "availability": "77.99",
    //       "mobility": "74.36",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "430",
    //         "resourceProcess": "45.33",
    //         "resourceMemory": "82.47",
    //         "resourceDisk": "39.89",
    //         "maxPdu": "711"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "134": {
    //   "start": "2024-05-14 18:00",
    //   "end": "2024-05-15 18:00",
    //   "field": {
    //     "accessibility": "64.46",
    //     "availability": "99.98",
    //     "mobility": "74.6",
    //     "retainability": "1.0",
    //     "energy": "2.79",
    //     "utilization": {
    //       "pdu": "854",
    //       "maxPdu": "1637",
    //       "resourceProcess": "38.94",
    //       "resourceMemory": "83.59",
    //       "resourceDisk": "14.46"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.38",
    //       "availability": "99.99",
    //       "mobility": "74.6",
    //       "energy": "6.71",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "282",
    //         "resourceProcess": "30.9",
    //         "resourceMemory": "81.84",
    //         "resourceDisk": "6.38",
    //         "maxPdu": "674"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.51",
    //           "availability": "99.99",
    //           "mobility": "77.1",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "141",
    //             "maxPdu": "340",
    //             "resourceProcess": "30.75",
    //             "resourceMemory": "87.07",
    //             "resourceDisk": "6.32"
    //           },
    //           "energy": "6.64",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.25",
    //           "availability": "99.99",
    //           "mobility": "72.25",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "141",
    //             "maxPdu": "334",
    //             "resourceProcess": "31.04",
    //             "resourceMemory": "76.83",
    //             "resourceDisk": "6.45"
    //           },
    //           "energy": "6.78",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.27",
    //       "availability": "79.42",
    //       "mobility": "74.95",
    //       "energy": "0.89",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "142",
    //         "resourceProcess": "44.18",
    //         "resourceMemory": "84.95",
    //         "resourceDisk": "37.27",
    //         "maxPdu": "229"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.58",
    //       "availability": "78.88",
    //       "mobility": "74.47",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "430",
    //         "resourceProcess": "45.58",
    //         "resourceMemory": "84.29",
    //         "resourceDisk": "38.52",
    //         "maxPdu": "734"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "135": {
    //   "start": "2024-05-15 18:00",
    //   "end": "2024-05-16 18:00",
    //   "field": {
    //     "accessibility": "65.1",
    //     "availability": "99.98",
    //     "mobility": "76.23",
    //     "retainability": "1.0",
    //     "energy": "2.77",
    //     "utilization": {
    //       "pdu": "783",
    //       "maxPdu": "1487",
    //       "resourceProcess": "39.23",
    //       "resourceMemory": "84.21",
    //       "resourceDisk": "14.82"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.93",
    //       "availability": "99.99",
    //       "mobility": "76.28",
    //       "energy": "6.71",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "261",
    //         "resourceProcess": "31.13",
    //         "resourceMemory": "83.59",
    //         "resourceDisk": "6.82",
    //         "maxPdu": "607"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.67",
    //           "availability": "99.99",
    //           "mobility": "74.44",
    //           "retainability": "0.61",
    //           "utilization": {
    //             "pdu": "131",
    //             "maxPdu": "303",
    //             "resourceProcess": "31.19",
    //             "resourceMemory": "82.75",
    //             "resourceDisk": "7.07"
    //           },
    //           "energy": "6.81",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "65.18",
    //           "availability": "99.99",
    //           "mobility": "78.2",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "130",
    //             "maxPdu": "304",
    //             "resourceProcess": "31.07",
    //             "resourceMemory": "84.45",
    //             "resourceDisk": "6.58"
    //           },
    //           "energy": "6.62",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.91",
    //       "availability": "77.57",
    //       "mobility": "74.86",
    //       "energy": "0.84",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "134",
    //         "resourceProcess": "44.73",
    //         "resourceMemory": "84.73",
    //         "resourceDisk": "37.18",
    //         "maxPdu": "224"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.94",
    //       "availability": "77.82",
    //       "mobility": "74.87",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "388",
    //         "resourceProcess": "45.84",
    //         "resourceMemory": "84.46",
    //         "resourceDisk": "39.23",
    //         "maxPdu": "656"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "136": {
    //   "start": "2024-05-16 18:00",
    //   "end": "2024-05-17 18:00",
    //   "field": {
    //     "accessibility": "65.76",
    //     "availability": "99.98",
    //     "mobility": "77.68",
    //     "retainability": "0.99",
    //     "energy": "2.79",
    //     "utilization": {
    //       "pdu": "367",
    //       "maxPdu": "688",
    //       "resourceProcess": "38.99",
    //       "resourceMemory": "84.0",
    //       "resourceDisk": "14.14"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "66.9",
    //       "availability": "99.99",
    //       "mobility": "77.76",
    //       "energy": "6.33",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "122",
    //         "resourceProcess": "30.52",
    //         "resourceMemory": "81.93",
    //         "resourceDisk": "6.05",
    //         "maxPdu": "280"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "67.34",
    //           "availability": "99.99",
    //           "mobility": "71.75",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "65",
    //             "maxPdu": "135",
    //             "resourceProcess": "30.74",
    //             "resourceMemory": "81.5",
    //             "resourceDisk": "5.89"
    //           },
    //           "energy": "6.46",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "66.47",
    //           "availability": "99.99",
    //           "mobility": "83.79",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "57",
    //             "maxPdu": "145",
    //             "resourceProcess": "30.3",
    //             "resourceMemory": "82.37",
    //             "resourceDisk": "6.2"
    //           },
    //           "energy": "6.2",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.61",
    //       "availability": "77.29",
    //       "mobility": "77.07",
    //       "energy": "0.93",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "60",
    //         "resourceProcess": "45.74",
    //         "resourceMemory": "84.17",
    //         "resourceDisk": "40.26",
    //         "maxPdu": "105"
    //       },
    //       "retainability": "0.98",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.36",
    //       "availability": "76.58",
    //       "mobility": "75.02",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "185",
    //         "resourceProcess": "45.8",
    //         "resourceMemory": "85.31",
    //         "resourceDisk": "39.63",
    //         "maxPdu": "303"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "137": {
    //   "start": "2024-05-17 18:00",
    //   "end": "2024-05-18 18:00",
    //   "field": {
    //     "accessibility": "65.37",
    //     "availability": "99.98",
    //     "mobility": "85.17",
    //     "retainability": "1.0",
    //     "energy": "2.84",
    //     "utilization": {
    //       "pdu": "871",
    //       "maxPdu": "1639",
    //       "resourceProcess": "39.45",
    //       "resourceMemory": "84.78",
    //       "resourceDisk": "14.31"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "65.86",
    //       "availability": "99.99",
    //       "mobility": "85.58",
    //       "energy": "6.69",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "300",
    //         "resourceProcess": "31.01",
    //         "resourceMemory": "87.46",
    //         "resourceDisk": "6.33",
    //         "maxPdu": "679"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.52",
    //           "availability": "99.99",
    //           "mobility": "87.94",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "153",
    //             "maxPdu": "337",
    //             "resourceProcess": "30.87",
    //             "resourceMemory": "85.24",
    //             "resourceDisk": "5.88"
    //           },
    //           "energy": "6.69",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "66.2",
    //           "availability": "99.99",
    //           "mobility": "83.25",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "147",
    //             "maxPdu": "342",
    //             "resourceProcess": "31.16",
    //             "resourceMemory": "89.83",
    //             "resourceDisk": "6.78"
    //           },
    //           "energy": "6.69",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.84",
    //       "availability": "77.57",
    //       "mobility": "72.83",
    //       "energy": "0.9",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "145",
    //         "resourceProcess": "46.24",
    //         "resourceMemory": "88.7",
    //         "resourceDisk": "40.85",
    //         "maxPdu": "240"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.88",
    //       "availability": "77.77",
    //       "mobility": "74.58",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "426",
    //         "resourceProcess": "46.06",
    //         "resourceMemory": "81.83",
    //         "resourceDisk": "36.95",
    //         "maxPdu": "720"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "138": {
    //   "start": "2024-05-18 18:00",
    //   "end": "2024-05-19 18:00",
    //   "field": {
    //     "accessibility": "64.54",
    //     "availability": "99.99",
    //     "mobility": "80.52",
    //     "retainability": "1.0",
    //     "energy": "2.78",
    //     "utilization": {
    //       "pdu": "861",
    //       "maxPdu": "1636",
    //       "resourceProcess": "39.3",
    //       "resourceMemory": "85.84",
    //       "resourceDisk": "14.45"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "63.6",
    //       "availability": "99.99",
    //       "mobility": "80.76",
    //       "energy": "6.65",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "290",
    //         "resourceProcess": "30.87",
    //         "resourceMemory": "85.66",
    //         "resourceDisk": "6.74",
    //         "maxPdu": "671"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "63.24",
    //           "availability": "99.99",
    //           "mobility": "75.3",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "142",
    //             "maxPdu": "336",
    //             "resourceProcess": "30.91",
    //             "resourceMemory": "86.33",
    //             "resourceDisk": "6.41"
    //           },
    //           "energy": "6.75",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "63.97",
    //           "availability": "99.99",
    //           "mobility": "86.97",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "148",
    //             "maxPdu": "335",
    //             "resourceProcess": "30.84",
    //             "resourceMemory": "84.99",
    //             "resourceDisk": "7.06"
    //           },
    //           "energy": "6.55",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.87",
    //       "availability": "78.22",
    //       "mobility": "74.29",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "148",
    //         "resourceProcess": "46.36",
    //         "resourceMemory": "88.92",
    //         "resourceDisk": "37.91",
    //         "maxPdu": "240"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.74",
    //       "availability": "77.7",
    //       "mobility": "74.29",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "423",
    //         "resourceProcess": "45.82",
    //         "resourceMemory": "84.95",
    //         "resourceDisk": "37.13",
    //         "maxPdu": "725"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "139": {
    //   "start": "2024-05-19 18:00",
    //   "end": "2024-05-20 18:00",
    //   "field": {
    //     "accessibility": "64.55",
    //     "availability": "99.98",
    //     "mobility": "76.56",
    //     "retainability": "0.99",
    //     "energy": "2.78",
    //     "utilization": {
    //       "pdu": "793",
    //       "maxPdu": "1479",
    //       "resourceProcess": "39.36",
    //       "resourceMemory": "89.26",
    //       "resourceDisk": "15.31"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.5",
    //       "availability": "99.99",
    //       "mobility": "76.61",
    //       "energy": "6.61",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "257",
    //         "resourceProcess": "31.23",
    //         "resourceMemory": "91.4",
    //         "resourceDisk": "6.44",
    //         "maxPdu": "608"
    //       },
    //       "retainability": "0.61",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "63.98",
    //           "availability": "99.99",
    //           "mobility": "77.26",
    //           "retainability": "0.61",
    //           "utilization": {
    //             "pdu": "135",
    //             "maxPdu": "302",
    //             "resourceProcess": "30.96",
    //             "resourceMemory": "94.48",
    //             "resourceDisk": "6.48"
    //           },
    //           "energy": "6.69",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "65.02",
    //           "availability": "99.99",
    //           "mobility": "76.03",
    //           "retainability": "0.61",
    //           "utilization": {
    //             "pdu": "122",
    //             "maxPdu": "306",
    //             "resourceProcess": "31.51",
    //             "resourceMemory": "88.58",
    //             "resourceDisk": "6.41"
    //           },
    //           "energy": "6.52",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.19",
    //       "availability": "77.55",
    //       "mobility": "75.62",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "132",
    //         "resourceProcess": "45.65",
    //         "resourceMemory": "89.93",
    //         "resourceDisk": "42.48",
    //         "maxPdu": "210"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.71",
    //       "availability": "76.95",
    //       "mobility": "74.88",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "404",
    //         "resourceProcess": "45.7",
    //         "resourceMemory": "87.62",
    //         "resourceDisk": "42.67",
    //         "maxPdu": "661"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "140": {
    //   "start": "2024-05-20 18:00",
    //   "end": "2024-05-21 18:00",
    //   "field": {
    //     "accessibility": "63.92",
    //     "availability": "99.99",
    //     "mobility": "77.29",
    //     "retainability": "1.0",
    //     "energy": "2.78",
    //     "utilization": {
    //       "pdu": "542",
    //       "maxPdu": "1050",
    //       "resourceProcess": "39.26",
    //       "resourceMemory": "83.28",
    //       "resourceDisk": "13.95"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.6",
    //       "availability": "99.99",
    //       "mobility": "77.36",
    //       "energy": "6.61",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "183",
    //         "resourceProcess": "31.09",
    //         "resourceMemory": "84.48",
    //         "resourceDisk": "6.18",
    //         "maxPdu": "432"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.85",
    //           "availability": "99.99",
    //           "mobility": "74.81",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "92",
    //             "maxPdu": "219",
    //             "resourceProcess": "31.53",
    //             "resourceMemory": "92.26",
    //             "resourceDisk": "6.23"
    //           },
    //           "energy": "6.76",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "63.37",
    //           "availability": "99.99",
    //           "mobility": "79.82",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "91",
    //             "maxPdu": "213",
    //             "resourceProcess": "30.65",
    //             "resourceMemory": "77.11",
    //             "resourceDisk": "6.14"
    //           },
    //           "energy": "6.46",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "62.6",
    //       "availability": "77.69",
    //       "mobility": "74.82",
    //       "energy": "0.84",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "88",
    //         "resourceProcess": "47.02",
    //         "resourceMemory": "81.63",
    //         "resourceDisk": "36.6",
    //         "maxPdu": "157"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "63.9",
    //       "availability": "79.37",
    //       "mobility": "75.4",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "271",
    //         "resourceProcess": "45.21",
    //         "resourceMemory": "83.05",
    //         "resourceDisk": "36.96",
    //         "maxPdu": "461"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "141": {
    //   "start": "2024-05-21 18:00",
    //   "end": "2024-05-22 18:00",
    //   "field": {
    //     "accessibility": "65.34",
    //     "availability": "99.99",
    //     "mobility": "75.83",
    //     "retainability": "1.0",
    //     "energy": "2.82",
    //     "utilization": {
    //       "pdu": "845",
    //       "maxPdu": "1651",
    //       "resourceProcess": "39.22",
    //       "resourceMemory": "85.65",
    //       "resourceDisk": "14.78"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "66.31",
    //       "availability": "99.99",
    //       "mobility": "75.85",
    //       "energy": "6.63",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "279",
    //         "resourceProcess": "31.06",
    //         "resourceMemory": "86.44",
    //         "resourceDisk": "6.85",
    //         "maxPdu": "670"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "66.57",
    //           "availability": "99.99",
    //           "mobility": "74.17",
    //           "retainability": "0.61",
    //           "utilization": {
    //             "pdu": "145",
    //             "maxPdu": "332",
    //             "resourceProcess": "31.29",
    //             "resourceMemory": "87.77",
    //             "resourceDisk": "6.17"
    //           },
    //           "energy": "6.45",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "66.06",
    //           "availability": "99.99",
    //           "mobility": "77.63",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "134",
    //             "maxPdu": "338",
    //             "resourceProcess": "30.83",
    //             "resourceMemory": "85.1",
    //             "resourceDisk": "7.53"
    //           },
    //           "energy": "6.81",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "63.64",
    //       "availability": "77.83",
    //       "mobility": "75.27",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "141",
    //         "resourceProcess": "45.84",
    //         "resourceMemory": "88.53",
    //         "resourceDisk": "40.1",
    //         "maxPdu": "249"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.27",
    //       "availability": "76.12",
    //       "mobility": "75.12",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "425",
    //         "resourceProcess": "45.55",
    //         "resourceMemory": "84.23",
    //         "resourceDisk": "37.92",
    //         "maxPdu": "732"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "142": {
    //   "start": "2024-05-22 18:00",
    //   "end": "2024-05-23 18:00",
    //   "field": {
    //     "accessibility": "64.98",
    //     "availability": "99.99",
    //     "mobility": "83.11",
    //     "retainability": "1.0",
    //     "energy": "2.82",
    //     "utilization": {
    //       "pdu": "876",
    //       "maxPdu": "1610",
    //       "resourceProcess": "39.25",
    //       "resourceMemory": "85.45",
    //       "resourceDisk": "14.48"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "65.58",
    //       "availability": "99.99",
    //       "mobility": "83.45",
    //       "energy": "6.79",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "287",
    //         "resourceProcess": "30.69",
    //         "resourceMemory": "85.34",
    //         "resourceDisk": "6.64",
    //         "maxPdu": "663"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.83",
    //           "availability": "99.99",
    //           "mobility": "88.15",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "146",
    //             "maxPdu": "333",
    //             "resourceProcess": "30.51",
    //             "resourceMemory": "85.86",
    //             "resourceDisk": "6.76"
    //           },
    //           "energy": "6.78",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "66.32",
    //           "availability": "99.99",
    //           "mobility": "78.7",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "141",
    //             "maxPdu": "330",
    //             "resourceProcess": "30.86",
    //             "resourceMemory": "84.84",
    //             "resourceDisk": "6.52"
    //           },
    //           "energy": "6.81",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "63.33",
    //       "availability": "77.44",
    //       "mobility": "74.4",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "139",
    //         "resourceProcess": "45.15",
    //         "resourceMemory": "90.84",
    //         "resourceDisk": "37.36",
    //         "maxPdu": "237"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.14",
    //       "availability": "78.38",
    //       "mobility": "74.3",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "450",
    //         "resourceProcess": "46.27",
    //         "resourceMemory": "83.79",
    //         "resourceDisk": "38.65",
    //         "maxPdu": "710"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "143": {
    //   "start": "2024-05-23 18:00",
    //   "end": "2024-05-24 18:00",
    //   "field": {
    //     "accessibility": "65.12",
    //     "availability": "99.99",
    //     "mobility": "74.43",
    //     "retainability": "1.0",
    //     "energy": "2.76",
    //     "utilization": {
    //       "pdu": "863",
    //       "maxPdu": "1620",
    //       "resourceProcess": "39.1",
    //       "resourceMemory": "84.92",
    //       "resourceDisk": "14.92"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "65.54",
    //       "availability": "99.99",
    //       "mobility": "74.42",
    //       "energy": "6.41",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "287",
    //         "resourceProcess": "30.87",
    //         "resourceMemory": "83.33",
    //         "resourceDisk": "6.79",
    //         "maxPdu": "664"
    //       },
    //       "retainability": "0.6",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "66.44",
    //           "availability": "99.99",
    //           "mobility": "68.46",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "145",
    //             "maxPdu": "333",
    //             "resourceProcess": "30.57",
    //             "resourceMemory": "84.31",
    //             "resourceDisk": "6.73"
    //           },
    //           "energy": "6.48",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.64",
    //           "availability": "99.99",
    //           "mobility": "80.75",
    //           "retainability": "0.6",
    //           "utilization": {
    //             "pdu": "142",
    //             "maxPdu": "331",
    //             "resourceProcess": "31.17",
    //             "resourceMemory": "82.38",
    //             "resourceDisk": "6.84"
    //           },
    //           "energy": "6.33",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.55",
    //       "availability": "78.48",
    //       "mobility": "76.02",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "149",
    //         "resourceProcess": "45.57",
    //         "resourceMemory": "88.59",
    //         "resourceDisk": "38.38",
    //         "maxPdu": "244"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.03",
    //       "availability": "78.41",
    //       "mobility": "74.1",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "427",
    //         "resourceProcess": "45.52",
    //         "resourceMemory": "84.83",
    //         "resourceDisk": "39.53",
    //         "maxPdu": "712"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "144": {
    //   "start": "2024-05-24 18:00",
    //   "end": "2024-05-25 18:00",
    //   "field": {
    //     "accessibility": "64.41",
    //     "availability": "77.32",
    //     "mobility": "74.6",
    //     "retainability": "1.0",
    //     "energy": "0.85",
    //     "utilization": {
    //       "pdu": "874",
    //       "maxPdu": "1428",
    //       "resourceProcess": "45.58",
    //       "resourceMemory": "63.26",
    //       "resourceDisk": "28.83"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.11",
    //       "availability": "77.28",
    //       "mobility": "74.26",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "291",
    //         "resourceProcess": "46.06",
    //         "resourceMemory": "41.69",
    //         "resourceDisk": "19.04",
    //         "maxPdu": "479"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "63.58",
    //           "availability": "77.65",
    //           "mobility": "74.36",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "143",
    //             "maxPdu": "239",
    //             "resourceProcess": "45.37",
    //             "resourceMemory": "41.21",
    //             "resourceDisk": "18.46"
    //           },
    //           "energy": "0.85",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.64",
    //           "availability": "76.91",
    //           "mobility": "74.16",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "148",
    //             "maxPdu": "240",
    //             "resourceProcess": "46.76",
    //             "resourceMemory": "42.17",
    //             "resourceDisk": "19.59"
    //           },
    //           "energy": "0.84",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.57",
    //       "availability": "76.5",
    //       "mobility": "75.27",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "143",
    //         "resourceProcess": "45.23",
    //         "resourceMemory": "84.67",
    //         "resourceDisk": "40.66",
    //         "maxPdu": "230"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.77",
    //       "availability": "77.65",
    //       "mobility": "74.83",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "440",
    //         "resourceProcess": "45.37",
    //         "resourceMemory": "85.02",
    //         "resourceDisk": "37.6",
    //         "maxPdu": "719"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "145": {
    //   "start": "2024-05-25 18:00",
    //   "end": "2024-05-26 18:00",
    //   "field": {
    //     "accessibility": "64.98",
    //     "availability": "77.7",
    //     "mobility": "74.52",
    //     "retainability": "1.0",
    //     "energy": "0.87",
    //     "utilization": {
    //       "pdu": "855",
    //       "maxPdu": "1450",
    //       "resourceProcess": "45.8",
    //       "resourceMemory": "65.36",
    //       "resourceDisk": "27.69"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.99",
    //       "availability": "77.57",
    //       "mobility": "74.33",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "285",
    //         "resourceProcess": "46.44",
    //         "resourceMemory": "42.51",
    //         "resourceDisk": "17.91",
    //         "maxPdu": "484"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.04",
    //           "availability": "77.65",
    //           "mobility": "74.54",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "143",
    //             "maxPdu": "239",
    //             "resourceProcess": "45.48",
    //             "resourceMemory": "42.25",
    //             "resourceDisk": "17.51"
    //           },
    //           "energy": "0.89",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.95",
    //           "availability": "77.48",
    //           "mobility": "74.12",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "142",
    //             "maxPdu": "245",
    //             "resourceProcess": "47.42",
    //             "resourceMemory": "42.77",
    //             "resourceDisk": "18.31"
    //           },
    //           "energy": "0.87",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.06",
    //       "availability": "78.67",
    //       "mobility": "73.79",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "140",
    //         "resourceProcess": "45.24",
    //         "resourceMemory": "81.26",
    //         "resourceDisk": "36.01",
    //         "maxPdu": "244"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.94",
    //       "availability": "77.56",
    //       "mobility": "75.01",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "430",
    //         "resourceProcess": "45.56",
    //         "resourceMemory": "90.78",
    //         "resourceDisk": "37.95",
    //         "maxPdu": "722"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "146": {
    //   "start": "2024-05-26 18:00",
    //   "end": "2024-05-27 18:00",
    //   "field": {
    //     "accessibility": "65.12",
    //     "availability": "77.9",
    //     "mobility": "74.73",
    //     "retainability": "1.0",
    //     "energy": "0.86",
    //     "utilization": {
    //       "pdu": "861",
    //       "maxPdu": "1446",
    //       "resourceProcess": "45.74",
    //       "resourceMemory": "63.92",
    //       "resourceDisk": "28.11"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.5",
    //       "availability": "78.2",
    //       "mobility": "74.37",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "286",
    //         "resourceProcess": "45.78",
    //         "resourceMemory": "41.89",
    //         "resourceDisk": "18.89",
    //         "maxPdu": "480"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.25",
    //           "availability": "78.03",
    //           "mobility": "74.34",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "148",
    //             "maxPdu": "242",
    //             "resourceProcess": "45.67",
    //             "resourceMemory": "42.24",
    //             "resourceDisk": "19.21"
    //           },
    //           "energy": "0.89",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.76",
    //           "availability": "78.38",
    //           "mobility": "74.41",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "138",
    //             "maxPdu": "238",
    //             "resourceProcess": "45.89",
    //             "resourceMemory": "41.53",
    //             "resourceDisk": "18.57"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.58",
    //       "availability": "77.09",
    //       "mobility": "74.75",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "148",
    //         "resourceProcess": "45.21",
    //         "resourceMemory": "88.9",
    //         "resourceDisk": "36.76",
    //         "maxPdu": "242"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.81",
    //       "availability": "77.76",
    //       "mobility": "75.21",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "427",
    //         "resourceProcess": "45.9",
    //         "resourceMemory": "85.73",
    //         "resourceDisk": "37.47",
    //         "maxPdu": "724"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "147": {
    //   "start": "2024-05-27 18:00",
    //   "end": "2024-05-28 18:00",
    //   "field": {
    //     "accessibility": "64.39",
    //     "availability": "77.62",
    //     "mobility": "75.39",
    //     "retainability": "1.0",
    //     "energy": "0.86",
    //     "utilization": {
    //       "pdu": "885",
    //       "maxPdu": "1450",
    //       "resourceProcess": "45.64",
    //       "resourceMemory": "64.26",
    //       "resourceDisk": "28.45"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.49",
    //       "availability": "77.65",
    //       "mobility": "75.77",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "287",
    //         "resourceProcess": "45.72",
    //         "resourceMemory": "41.92",
    //         "resourceDisk": "17.71",
    //         "maxPdu": "477"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.45",
    //           "availability": "78.12",
    //           "mobility": "75.99",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "146",
    //             "maxPdu": "237",
    //             "resourceProcess": "46.11",
    //             "resourceMemory": "41.86",
    //             "resourceDisk": "18.88"
    //           },
    //           "energy": "0.87",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.54",
    //           "availability": "77.18",
    //           "mobility": "75.55",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "141",
    //             "maxPdu": "240",
    //             "resourceProcess": "45.34",
    //             "resourceMemory": "41.97",
    //             "resourceDisk": "16.59"
    //           },
    //           "energy": "0.85",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.26",
    //       "availability": "77.74",
    //       "mobility": "75.17",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "147",
    //         "resourceProcess": "44.97",
    //         "resourceMemory": "85.77",
    //         "resourceDisk": "41.34",
    //         "maxPdu": "247"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.3",
    //       "availability": "77.53",
    //       "mobility": "74.95",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "451",
    //         "resourceProcess": "45.8",
    //         "resourceMemory": "88.36",
    //         "resourceDisk": "38.73",
    //         "maxPdu": "726"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "148": {
    //   "start": "2024-05-28 18:00",
    //   "end": "2024-05-29 18:00",
    //   "field": {
    //     "accessibility": "64.37",
    //     "availability": "77.7",
    //     "mobility": "75.52",
    //     "retainability": "1.0",
    //     "energy": "0.85",
    //     "utilization": {
    //       "pdu": "878",
    //       "maxPdu": "1454",
    //       "resourceProcess": "45.55",
    //       "resourceMemory": "62.62",
    //       "resourceDisk": "27.8"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.67",
    //       "availability": "77.61",
    //       "mobility": "75.79",
    //       "energy": "0.84",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "301",
    //         "resourceProcess": "45.35",
    //         "resourceMemory": "41.87",
    //         "resourceDisk": "17.26",
    //         "maxPdu": "492"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.83",
    //           "availability": "77.16",
    //           "mobility": "76.12",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "151",
    //             "maxPdu": "242",
    //             "resourceProcess": "45.34",
    //             "resourceMemory": "42.11",
    //             "resourceDisk": "17.01"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "63.53",
    //           "availability": "78.06",
    //           "mobility": "75.46",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "150",
    //             "maxPdu": "250",
    //             "resourceProcess": "45.35",
    //             "resourceMemory": "41.62",
    //             "resourceDisk": "17.52"
    //           },
    //           "energy": "0.82",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.02",
    //       "availability": "76.72",
    //       "mobility": "74.38",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "141",
    //         "resourceProcess": "45.04",
    //         "resourceMemory": "86.06",
    //         "resourceDisk": "39.87",
    //         "maxPdu": "247"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.1",
    //       "availability": "78.16",
    //       "mobility": "75.55",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "436",
    //         "resourceProcess": "45.86",
    //         "resourceMemory": "81.66",
    //         "resourceDisk": "37.27",
    //         "maxPdu": "715"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "149": {
    //   "start": "2024-05-29 18:00",
    //   "end": "2024-05-30 18:00",
    //   "field": {
    //     "accessibility": "64.73",
    //     "availability": "77.67",
    //     "mobility": "75.09",
    //     "retainability": "1.0",
    //     "energy": "0.88",
    //     "utilization": {
    //       "pdu": "864",
    //       "maxPdu": "1434",
    //       "resourceProcess": "45.79",
    //       "resourceMemory": "64.15",
    //       "resourceDisk": "30.19"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.87",
    //       "availability": "77.13",
    //       "mobility": "74.46",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "282",
    //         "resourceProcess": "45.37",
    //         "resourceMemory": "44.43",
    //         "resourceDisk": "21.53",
    //         "maxPdu": "476"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.74",
    //           "availability": "77.16",
    //           "mobility": "73.82",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "141",
    //             "maxPdu": "238",
    //             "resourceProcess": "45.55",
    //             "resourceMemory": "44.13",
    //             "resourceDisk": "22.12"
    //           },
    //           "energy": "0.87",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "65.01",
    //           "availability": "77.1",
    //           "mobility": "75.1",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "141",
    //             "maxPdu": "238",
    //             "resourceProcess": "45.19",
    //             "resourceMemory": "44.73",
    //             "resourceDisk": "20.95"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "63.84",
    //       "availability": "78.92",
    //       "mobility": "75.11",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "144",
    //         "resourceProcess": "46.83",
    //         "resourceMemory": "85.79",
    //         "resourceDisk": "38.4",
    //         "maxPdu": "241"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.83",
    //       "availability": "77.98",
    //       "mobility": "75.93",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "438",
    //         "resourceProcess": "45.72",
    //         "resourceMemory": "84.14",
    //         "resourceDisk": "38.43",
    //         "maxPdu": "717"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "150": {
    //   "start": "2024-05-30 18:00",
    //   "end": "2024-05-31 18:00",
    //   "field": {
    //     "accessibility": "65.35",
    //     "availability": "77.7",
    //     "mobility": "75.7",
    //     "retainability": "1.0",
    //     "energy": "0.86",
    //     "utilization": {
    //       "pdu": "866",
    //       "maxPdu": "1419",
    //       "resourceProcess": "46.05",
    //       "resourceMemory": "63.18",
    //       "resourceDisk": "30.41"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "65.4",
    //       "availability": "77.33",
    //       "mobility": "75.44",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "289",
    //         "resourceProcess": "46.18",
    //         "resourceMemory": "42.42",
    //         "resourceDisk": "20.88",
    //         "maxPdu": "476"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.36",
    //           "availability": "77.27",
    //           "mobility": "74.63",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "141",
    //             "maxPdu": "238",
    //             "resourceProcess": "45.98",
    //             "resourceMemory": "42.76",
    //             "resourceDisk": "21.37"
    //           },
    //           "energy": "0.9",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "65.44",
    //           "availability": "77.4",
    //           "mobility": "76.26",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "148",
    //             "maxPdu": "238",
    //             "resourceProcess": "46.38",
    //             "resourceMemory": "42.08",
    //             "resourceDisk": "20.39"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.21",
    //       "availability": "77.04",
    //       "mobility": "76.25",
    //       "energy": "0.84",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "151",
    //         "resourceProcess": "46.34",
    //         "resourceMemory": "80.2",
    //         "resourceDisk": "44.44",
    //         "maxPdu": "241"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.33",
    //       "availability": "78.43",
    //       "mobility": "75.88",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "426",
    //         "resourceProcess": "45.86",
    //         "resourceMemory": "85.57",
    //         "resourceDisk": "38.32",
    //         "maxPdu": "702"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "151": {
    //   "start": "2024-05-31 18:00",
    //   "end": "2024-06-01 18:00",
    //   "field": {
    //     "accessibility": "64.09",
    //     "availability": "78.15",
    //     "mobility": "74.88",
    //     "retainability": "1.0",
    //     "energy": "0.88",
    //     "utilization": {
    //       "pdu": "851",
    //       "maxPdu": "1430",
    //       "resourceProcess": "46.03",
    //       "resourceMemory": "62.08",
    //       "resourceDisk": "30.03"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "63.78",
    //       "availability": "78.06",
    //       "mobility": "75.35",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "286",
    //         "resourceProcess": "46.23",
    //         "resourceMemory": "42.2",
    //         "resourceDisk": "21.04",
    //         "maxPdu": "473"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "63.23",
    //           "availability": "77.52",
    //           "mobility": "76.28",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "136",
    //             "maxPdu": "238",
    //             "resourceProcess": "46.22",
    //             "resourceMemory": "42.15",
    //             "resourceDisk": "21.5"
    //           },
    //           "energy": "0.87",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.34",
    //           "availability": "78.6",
    //           "mobility": "74.45",
    //           "retainability": "0.98",
    //           "utilization": {
    //             "pdu": "150",
    //             "maxPdu": "235",
    //             "resourceProcess": "46.25",
    //             "resourceMemory": "42.25",
    //             "resourceDisk": "20.6"
    //           },
    //           "energy": "0.85",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.55",
    //       "availability": "77.69",
    //       "mobility": "74.78",
    //       "energy": "0.9",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "142",
    //         "resourceProcess": "45.64",
    //         "resourceMemory": "77.93",
    //         "resourceDisk": "41.84",
    //         "maxPdu": "241"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.35",
    //       "availability": "78.43",
    //       "mobility": "74.29",
    //       "energy": "0.89",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "423",
    //         "resourceProcess": "46.03",
    //         "resourceMemory": "82.37",
    //         "resourceDisk": "38.27",
    //         "maxPdu": "716"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "152": {
    //   "start": "2024-06-01 18:00",
    //   "end": "2024-06-02 18:00",
    //   "field": {
    //     "accessibility": "64.52",
    //     "availability": "77.48",
    //     "mobility": "75.14",
    //     "retainability": "1.0",
    //     "energy": "0.86",
    //     "utilization": {
    //       "pdu": "1076",
    //       "maxPdu": "1780",
    //       "resourceProcess": "46.01",
    //       "resourceMemory": "77.97",
    //       "resourceDisk": "34.73"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.36",
    //       "availability": "77.8",
    //       "mobility": "75.5",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "496",
    //         "resourceProcess": "45.96",
    //         "resourceMemory": "72.63",
    //         "resourceDisk": "32.49",
    //         "maxPdu": "833"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "63.65",
    //           "availability": "77.55",
    //           "mobility": "75.47",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "243",
    //             "maxPdu": "412",
    //             "resourceProcess": "45.88",
    //             "resourceMemory": "72.53",
    //             "resourceDisk": "31.12"
    //           },
    //           "energy": "0.88",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "65.07",
    //           "availability": "78.05",
    //           "mobility": "75.53",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "253",
    //             "maxPdu": "421",
    //             "resourceProcess": "46.04",
    //             "resourceMemory": "72.73",
    //             "resourceDisk": "33.87"
    //           },
    //           "energy": "0.85",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.13",
    //       "availability": "76.42",
    //       "mobility": "74.85",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "146",
    //         "resourceProcess": "46.11",
    //         "resourceMemory": "83.4",
    //         "resourceDisk": "35.82",
    //         "maxPdu": "240"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.54",
    //       "availability": "77.41",
    //       "mobility": "74.77",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "434",
    //         "resourceProcess": "46.05",
    //         "resourceMemory": "83.32",
    //         "resourceDisk": "37.37",
    //         "maxPdu": "707"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "153": {
    //   "start": "2024-06-02 18:00",
    //   "end": "2024-06-03 18:00",
    //   "field": {
    //     "accessibility": "64.72",
    //     "availability": "78.25",
    //     "mobility": "75.16",
    //     "retainability": "1.0",
    //     "energy": "0.88",
    //     "utilization": {
    //       "pdu": "1162",
    //       "maxPdu": "1932",
    //       "resourceProcess": "45.65",
    //       "resourceMemory": "83.65",
    //       "resourceDisk": "38.18"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.54",
    //       "availability": "78.68",
    //       "mobility": "74.99",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "584",
    //         "resourceProcess": "45.71",
    //         "resourceMemory": "83.98",
    //         "resourceDisk": "38.94",
    //         "maxPdu": "963"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.19",
    //           "availability": "78.85",
    //           "mobility": "75.37",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "292",
    //             "maxPdu": "486",
    //             "resourceProcess": "46.0",
    //             "resourceMemory": "79.92",
    //             "resourceDisk": "37.74"
    //           },
    //           "energy": "0.89",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.89",
    //           "availability": "78.5",
    //           "mobility": "74.62",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "292",
    //             "maxPdu": "477",
    //             "resourceProcess": "45.42",
    //             "resourceMemory": "88.26",
    //             "resourceDisk": "40.14"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "66.07",
    //       "availability": "79.49",
    //       "mobility": "75.03",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "146",
    //         "resourceProcess": "45.4",
    //         "resourceMemory": "81.33",
    //         "resourceDisk": "37.28",
    //         "maxPdu": "240"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.51",
    //       "availability": "77.27",
    //       "mobility": "75.44",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "432",
    //         "resourceProcess": "45.65",
    //         "resourceMemory": "84.0",
    //         "resourceDisk": "37.47",
    //         "maxPdu": "729"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "154": {
    //   "start": "2024-06-03 18:00",
    //   "end": "2024-06-04 18:00",
    //   "field": {
    //     "accessibility": "64.66",
    //     "availability": "99.81",
    //     "mobility": "75.96",
    //     "retainability": "0.88",
    //     "energy": "3.3",
    //     "utilization": {
    //       "pdu": "806",
    //       "maxPdu": "1571",
    //       "resourceProcess": "38.0",
    //       "resourceMemory": "86.46",
    //       "resourceDisk": "12.19"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "0",
    //       "uplinkDelay": "0",
    //       "downlinkThrouthput": "0",
    //       "uplinkThrouthput": "0"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.65",
    //       "availability": "99.68",
    //       "mobility": "74.27",
    //       "energy": "3.19",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "400",
    //         "resourceProcess": "38.3",
    //         "resourceMemory": "87.85",
    //         "resourceDisk": "12.23",
    //         "maxPdu": "792"
    //       },
    //       "retainability": "0.78",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.65",
    //           "availability": "99.68",
    //           "mobility": "78.1",
    //           "retainability": "0.78",
    //           "utilization": {
    //             "pdu": "204",
    //             "maxPdu": "392",
    //             "resourceProcess": "38.59",
    //             "resourceMemory": "83.4",
    //             "resourceDisk": "11.68"
    //           },
    //           "energy": "3.2",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "63.68",
    //           "availability": "99.68",
    //           "mobility": "70.68",
    //           "retainability": "0.78",
    //           "utilization": {
    //             "pdu": "196",
    //             "maxPdu": "400",
    //             "resourceProcess": "38.02",
    //             "resourceMemory": "92.32",
    //             "resourceDisk": "12.79"
    //           },
    //           "energy": "3.19",
    //           "integrity": {
    //             "downlinkDelay": "0",
    //             "uplinkDelay": "0",
    //             "downlinkThrouthput": "0",
    //             "uplinkThrouthput": "0"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "62.76",
    //       "availability": "99.99",
    //       "mobility": "70.24",
    //       "energy": "3.43",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "101",
    //         "resourceProcess": "38.22",
    //         "resourceMemory": "91.59",
    //         "resourceDisk": "12.71",
    //         "maxPdu": "197"
    //       },
    //       "retainability": "0.78",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.33",
    //       "availability": "99.89",
    //       "mobility": "80.5",
    //       "energy": "3.4",
    //       "integrity": {
    //         "downlinkDelay": "0",
    //         "uplinkDelay": "0",
    //         "downlinkThrouthput": "0",
    //         "uplinkThrouthput": "0"
    //       },
    //       "utilization": {
    //         "pdu": "305",
    //         "resourceProcess": "37.51",
    //         "resourceMemory": "82.92",
    //         "resourceDisk": "11.98",
    //         "maxPdu": "582"
    //       },
    //       "retainability": "0.78",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "155": {
    //   "start": "2024-06-04 18:00",
    //   "end": "2024-06-05 18:00",
    //   "field": {
    //     "accessibility": "64.55",
    //     "availability": "77.4",
    //     "mobility": "74.96",
    //     "retainability": "1.0",
    //     "energy": "0.86",
    //     "utilization": {
    //       "pdu": "1125",
    //       "maxPdu": "1931",
    //       "resourceProcess": "45.48",
    //       "resourceMemory": "83.92",
    //       "resourceDisk": "40.29"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "76509",
    //       "uplinkDelay": "84277",
    //       "downlinkThrouthput": "60758",
    //       "uplinkThrouthput": "57066"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.65",
    //       "availability": "77.36",
    //       "mobility": "75.11",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "38364",
    //         "uplinkDelay": "42114",
    //         "downlinkThrouthput": "30422",
    //         "uplinkThrouthput": "28515"
    //       },
    //       "utilization": {
    //         "pdu": "564",
    //         "resourceProcess": "45.17",
    //         "resourceMemory": "83.22",
    //         "resourceDisk": "41.18",
    //         "maxPdu": "972"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.63",
    //           "availability": "76.85",
    //           "mobility": "75.17",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "275",
    //             "maxPdu": "497",
    //             "resourceProcess": "45.38",
    //             "resourceMemory": "82.77",
    //             "resourceDisk": "39.56"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "19252",
    //             "uplinkDelay": "21133",
    //             "downlinkThrouthput": "15196",
    //             "uplinkThrouthput": "14213"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.67",
    //           "availability": "77.88",
    //           "mobility": "75.04",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "289",
    //             "maxPdu": "475",
    //             "resourceProcess": "44.97",
    //             "resourceMemory": "83.67",
    //             "resourceDisk": "42.78"
    //           },
    //           "energy": "0.9",
    //           "integrity": {
    //             "downlinkDelay": "19112",
    //             "uplinkDelay": "20981",
    //             "downlinkThrouthput": "15226",
    //             "uplinkThrouthput": "14302"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.46",
    //       "availability": "76.62",
    //       "mobility": "75.87",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "9531",
    //         "uplinkDelay": "10457",
    //         "downlinkThrouthput": "7607",
    //         "uplinkThrouthput": "7137"
    //       },
    //       "utilization": {
    //         "pdu": "137",
    //         "resourceProcess": "46.02",
    //         "resourceMemory": "79.69",
    //         "resourceDisk": "40.93",
    //         "maxPdu": "243"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.46",
    //       "availability": "77.71",
    //       "mobility": "74.47",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "28614",
    //         "uplinkDelay": "31706",
    //         "downlinkThrouthput": "22729",
    //         "uplinkThrouthput": "21414"
    //       },
    //       "utilization": {
    //         "pdu": "424",
    //         "resourceProcess": "45.71",
    //         "resourceMemory": "86.34",
    //         "resourceDisk": "38.87",
    //         "maxPdu": "716"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "156": {
    //   "start": "2024-06-05 18:00",
    //   "end": "2024-06-06 18:00",
    //   "field": {
    //     "accessibility": "64.77",
    //     "availability": "77.91",
    //     "mobility": "75.58",
    //     "retainability": "1.0",
    //     "energy": "0.88",
    //     "utilization": {
    //       "pdu": "1143",
    //       "maxPdu": "1908",
    //       "resourceProcess": "46.12",
    //       "resourceMemory": "85.07",
    //       "resourceDisk": "39.45"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "90613",
    //       "uplinkDelay": "99884",
    //       "downlinkThrouthput": "73049",
    //       "uplinkThrouthput": "68531"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "65.14",
    //       "availability": "78.01",
    //       "mobility": "76.23",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "45279",
    //         "uplinkDelay": "49967",
    //         "downlinkThrouthput": "36480",
    //         "uplinkThrouthput": "34228"
    //       },
    //       "utilization": {
    //         "pdu": "562",
    //         "resourceProcess": "46.04",
    //         "resourceMemory": "86.74",
    //         "resourceDisk": "38.75",
    //         "maxPdu": "951"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.08",
    //           "availability": "77.97",
    //           "mobility": "75.75",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "287",
    //             "maxPdu": "479",
    //             "resourceProcess": "46.11",
    //             "resourceMemory": "84.36",
    //             "resourceDisk": "35.7"
    //           },
    //           "energy": "0.88",
    //           "integrity": {
    //             "downlinkDelay": "22626",
    //             "uplinkDelay": "24985",
    //             "downlinkThrouthput": "18249",
    //             "uplinkThrouthput": "17088"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "66.21",
    //           "availability": "78.05",
    //           "mobility": "76.72",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "275",
    //             "maxPdu": "472",
    //             "resourceProcess": "45.97",
    //             "resourceMemory": "89.22",
    //             "resourceDisk": "41.86"
    //           },
    //           "energy": "0.87",
    //           "integrity": {
    //             "downlinkDelay": "22653",
    //             "uplinkDelay": "24982",
    //             "downlinkThrouthput": "18231",
    //             "uplinkThrouthput": "17140"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "63.19",
    //       "availability": "78.29",
    //       "mobility": "74.46",
    //       "energy": "0.89",
    //       "integrity": {
    //         "downlinkDelay": "11322",
    //         "uplinkDelay": "12474",
    //         "downlinkThrouthput": "9125",
    //         "uplinkThrouthput": "8508"
    //       },
    //       "utilization": {
    //         "pdu": "147",
    //         "resourceProcess": "46.77",
    //         "resourceMemory": "82.63",
    //         "resourceDisk": "38.46",
    //         "maxPdu": "236"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.81",
    //       "availability": "77.66",
    //       "mobility": "75.09",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "34012",
    //         "uplinkDelay": "37443",
    //         "downlinkThrouthput": "27444",
    //         "uplinkThrouthput": "25795"
    //       },
    //       "utilization": {
    //         "pdu": "434",
    //         "resourceProcess": "46.01",
    //         "resourceMemory": "83.65",
    //         "resourceDisk": "40.71",
    //         "maxPdu": "721"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "157": {
    //   "start": "2024-06-06 18:00",
    //   "end": "2024-06-07 18:00",
    //   "field": {
    //     "accessibility": "65.16",
    //     "availability": "77.69",
    //     "mobility": "75.29",
    //     "retainability": "1.0",
    //     "energy": "0.86",
    //     "utilization": {
    //       "pdu": "1133",
    //       "maxPdu": "1916",
    //       "resourceProcess": "45.66",
    //       "resourceMemory": "84.77",
    //       "resourceDisk": "38.38"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "90602",
    //       "uplinkDelay": "99585",
    //       "downlinkThrouthput": "72996",
    //       "uplinkThrouthput": "68425"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.87",
    //       "availability": "77.55",
    //       "mobility": "74.71",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "45241",
    //         "uplinkDelay": "49735",
    //         "downlinkThrouthput": "36506",
    //         "uplinkThrouthput": "34206"
    //       },
    //       "utilization": {
    //         "pdu": "561",
    //         "resourceProcess": "45.53",
    //         "resourceMemory": "83.07",
    //         "resourceDisk": "38.55",
    //         "maxPdu": "962"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.01",
    //           "availability": "77.97",
    //           "mobility": "75.1",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "283",
    //             "maxPdu": "486",
    //             "resourceProcess": "45.22",
    //             "resourceMemory": "82.26",
    //             "resourceDisk": "39.54"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "22666",
    //             "uplinkDelay": "24839",
    //             "downlinkThrouthput": "18213",
    //             "uplinkThrouthput": "17121"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.73",
    //           "availability": "77.13",
    //           "mobility": "74.32",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "278",
    //             "maxPdu": "476",
    //             "resourceProcess": "45.84",
    //             "resourceMemory": "83.87",
    //             "resourceDisk": "37.6"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "22575",
    //             "uplinkDelay": "24896",
    //             "downlinkThrouthput": "18293",
    //             "uplinkThrouthput": "17085"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.23",
    //       "availability": "78.43",
    //       "mobility": "74.98",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "11291",
    //         "uplinkDelay": "12461",
    //         "downlinkThrouthput": "9130",
    //         "uplinkThrouthput": "8577"
    //       },
    //       "utilization": {
    //         "pdu": "147",
    //         "resourceProcess": "45.55",
    //         "resourceMemory": "85.35",
    //         "resourceDisk": "38.54",
    //         "maxPdu": "236"
    //       },
    //       "retainability": "1.01",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.53",
    //       "availability": "77.62",
    //       "mobility": "76.17",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "34070",
    //         "uplinkDelay": "37389",
    //         "downlinkThrouthput": "27360",
    //         "uplinkThrouthput": "25642"
    //       },
    //       "utilization": {
    //         "pdu": "425",
    //         "resourceProcess": "45.86",
    //         "resourceMemory": "86.87",
    //         "resourceDisk": "38.09",
    //         "maxPdu": "718"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "158": {
    //   "start": "2024-06-07 18:00",
    //   "end": "2024-06-08 18:00",
    //   "field": {
    //     "accessibility": "65.1",
    //     "availability": "77.94",
    //     "mobility": "74.54",
    //     "retainability": "1.0",
    //     "energy": "0.87",
    //     "utilization": {
    //       "pdu": "1160",
    //       "maxPdu": "1954",
    //       "resourceProcess": "45.78",
    //       "resourceMemory": "84.87",
    //       "resourceDisk": "38.42"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "90806",
    //       "uplinkDelay": "99803",
    //       "downlinkThrouthput": "72964",
    //       "uplinkThrouthput": "68521"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.24",
    //       "availability": "78.04",
    //       "mobility": "74.52",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "45432",
    //         "uplinkDelay": "49937",
    //         "downlinkThrouthput": "36454",
    //         "uplinkThrouthput": "34299"
    //       },
    //       "utilization": {
    //         "pdu": "573",
    //         "resourceProcess": "45.95",
    //         "resourceMemory": "85.04",
    //         "resourceDisk": "39.71",
    //         "maxPdu": "984"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.4",
    //           "availability": "77.22",
    //           "mobility": "74.91",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "286",
    //             "maxPdu": "487",
    //             "resourceProcess": "45.84",
    //             "resourceMemory": "84.52",
    //             "resourceDisk": "40.85"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "22690",
    //             "uplinkDelay": "25014",
    //             "downlinkThrouthput": "18257",
    //             "uplinkThrouthput": "17094"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.07",
    //           "availability": "78.86",
    //           "mobility": "74.14",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "287",
    //             "maxPdu": "497",
    //             "resourceProcess": "46.06",
    //             "resourceMemory": "85.56",
    //             "resourceDisk": "38.58"
    //           },
    //           "energy": "0.85",
    //           "integrity": {
    //             "downlinkDelay": "22742",
    //             "uplinkDelay": "24923",
    //             "downlinkThrouthput": "18197",
    //             "uplinkThrouthput": "17205"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "67.33",
    //       "availability": "77.81",
    //       "mobility": "75.17",
    //       "energy": "0.89",
    //       "integrity": {
    //         "downlinkDelay": "11361",
    //         "uplinkDelay": "12481",
    //         "downlinkThrouthput": "9165",
    //         "uplinkThrouthput": "8597"
    //       },
    //       "utilization": {
    //         "pdu": "142",
    //         "resourceProcess": "45.25",
    //         "resourceMemory": "79.91",
    //         "resourceDisk": "34.52",
    //         "maxPdu": "249"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.53",
    //       "availability": "77.86",
    //       "mobility": "74.36",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "34013",
    //         "uplinkDelay": "37385",
    //         "downlinkThrouthput": "27345",
    //         "uplinkThrouthput": "25625"
    //       },
    //       "utilization": {
    //         "pdu": "445",
    //         "resourceProcess": "45.74",
    //         "resourceMemory": "86.32",
    //         "resourceDisk": "38.05",
    //         "maxPdu": "721"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "159": {
    //   "start": "2024-06-08 18:00",
    //   "end": "2024-06-09 18:00",
    //   "field": {
    //     "accessibility": "65.41",
    //     "availability": "78.18",
    //     "mobility": "74.62",
    //     "retainability": "1.0",
    //     "energy": "0.88",
    //     "utilization": {
    //       "pdu": "1150",
    //       "maxPdu": "1894",
    //       "resourceProcess": "45.97",
    //       "resourceMemory": "84.66",
    //       "resourceDisk": "38.79"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "90782",
    //       "uplinkDelay": "100017",
    //       "downlinkThrouthput": "72959",
    //       "uplinkThrouthput": "68257"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "65.83",
    //       "availability": "77.9",
    //       "mobility": "74.66",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "45340",
    //         "uplinkDelay": "50000",
    //         "downlinkThrouthput": "36374",
    //         "uplinkThrouthput": "34165"
    //       },
    //       "utilization": {
    //         "pdu": "571",
    //         "resourceProcess": "46.32",
    //         "resourceMemory": "85.22",
    //         "resourceDisk": "39.49",
    //         "maxPdu": "955"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.79",
    //           "availability": "78.02",
    //           "mobility": "74.62",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "280",
    //             "maxPdu": "476",
    //             "resourceProcess": "46.2",
    //             "resourceMemory": "82.47",
    //             "resourceDisk": "38.48"
    //           },
    //           "energy": "0.88",
    //           "integrity": {
    //             "downlinkDelay": "22648",
    //             "uplinkDelay": "25037",
    //             "downlinkThrouthput": "18193",
    //             "uplinkThrouthput": "17088"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "65.87",
    //           "availability": "77.78",
    //           "mobility": "74.7",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "291",
    //             "maxPdu": "479",
    //             "resourceProcess": "46.45",
    //             "resourceMemory": "88.11",
    //             "resourceDisk": "40.48"
    //           },
    //           "energy": "0.87",
    //           "integrity": {
    //             "downlinkDelay": "22692",
    //             "uplinkDelay": "24963",
    //             "downlinkThrouthput": "18181",
    //             "uplinkThrouthput": "17077"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.26",
    //       "availability": "79.71",
    //       "mobility": "74.37",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "11391",
    //         "uplinkDelay": "12567",
    //         "downlinkThrouthput": "9133",
    //         "uplinkThrouthput": "8478"
    //       },
    //       "utilization": {
    //         "pdu": "135",
    //         "resourceProcess": "45.49",
    //         "resourceMemory": "83.4",
    //         "resourceDisk": "30.78",
    //         "maxPdu": "234"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.89",
    //       "availability": "78.04",
    //       "mobility": "74.64",
    //       "energy": "0.9",
    //       "integrity": {
    //         "downlinkDelay": "34051",
    //         "uplinkDelay": "37450",
    //         "downlinkThrouthput": "27452",
    //         "uplinkThrouthput": "25614"
    //       },
    //       "utilization": {
    //         "pdu": "444",
    //         "resourceProcess": "45.65",
    //         "resourceMemory": "84.35",
    //         "resourceDisk": "40.63",
    //         "maxPdu": "705"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "160": {
    //   "start": "2024-06-09 18:00",
    //   "end": "2024-06-10 18:00",
    //   "field": {
    //     "accessibility": "65.23",
    //     "availability": "77.88",
    //     "mobility": "75.08",
    //     "retainability": "1.0",
    //     "energy": "0.87",
    //     "utilization": {
    //       "pdu": "1151",
    //       "maxPdu": "1927",
    //       "resourceProcess": "45.62",
    //       "resourceMemory": "85.33",
    //       "resourceDisk": "39.15"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "90504",
    //       "uplinkDelay": "99696",
    //       "downlinkThrouthput": "72960",
    //       "uplinkThrouthput": "68166"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "66.11",
    //       "availability": "77.01",
    //       "mobility": "74.6",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "45171",
    //         "uplinkDelay": "49785",
    //         "downlinkThrouthput": "36476",
    //         "uplinkThrouthput": "34159"
    //       },
    //       "utilization": {
    //         "pdu": "578",
    //         "resourceProcess": "45.9",
    //         "resourceMemory": "86.58",
    //         "resourceDisk": "40.17",
    //         "maxPdu": "955"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "66.14",
    //           "availability": "76.79",
    //           "mobility": "74.37",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "292",
    //             "maxPdu": "482",
    //             "resourceProcess": "45.66",
    //             "resourceMemory": "84.97",
    //             "resourceDisk": "38.51"
    //           },
    //           "energy": "0.88",
    //           "integrity": {
    //             "downlinkDelay": "22636",
    //             "uplinkDelay": "24937",
    //             "downlinkThrouthput": "18212",
    //             "uplinkThrouthput": "17100"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "66.08",
    //           "availability": "77.24",
    //           "mobility": "74.83",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "286",
    //             "maxPdu": "473",
    //             "resourceProcess": "46.14",
    //             "resourceMemory": "88.21",
    //             "resourceDisk": "41.9"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "22535",
    //             "uplinkDelay": "24848",
    //             "downlinkThrouthput": "18264",
    //             "uplinkThrouthput": "17059"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.35",
    //       "availability": "79.06",
    //       "mobility": "76.07",
    //       "energy": "0.9",
    //       "integrity": {
    //         "downlinkDelay": "11381",
    //         "uplinkDelay": "12464",
    //         "downlinkThrouthput": "9085",
    //         "uplinkThrouthput": "8494"
    //       },
    //       "utilization": {
    //         "pdu": "144",
    //         "resourceProcess": "44.84",
    //         "resourceMemory": "85.8",
    //         "resourceDisk": "35.22",
    //         "maxPdu": "247"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.37",
    //       "availability": "78.65",
    //       "mobility": "75.4",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "33952",
    //         "uplinkDelay": "37447",
    //         "downlinkThrouthput": "27399",
    //         "uplinkThrouthput": "25513"
    //       },
    //       "utilization": {
    //         "pdu": "429",
    //         "resourceProcess": "45.53",
    //         "resourceMemory": "83.58",
    //         "resourceDisk": "39.14",
    //         "maxPdu": "725"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "161": {
    //   "start": "2024-06-10 18:00",
    //   "end": "2024-06-11 18:00",
    //   "field": {
    //     "accessibility": "64.87",
    //     "availability": "78.17",
    //     "mobility": "75.01",
    //     "retainability": "1.0",
    //     "energy": "0.88",
    //     "utilization": {
    //       "pdu": "1134",
    //       "maxPdu": "1932",
    //       "resourceProcess": "45.5",
    //       "resourceMemory": "84.73",
    //       "resourceDisk": "37.89"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "90702",
    //       "uplinkDelay": "99928",
    //       "downlinkThrouthput": "72936",
    //       "uplinkThrouthput": "68526"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.88",
    //       "availability": "78.3",
    //       "mobility": "74.85",
    //       "energy": "0.89",
    //       "integrity": {
    //         "downlinkDelay": "45431",
    //         "uplinkDelay": "49998",
    //         "downlinkThrouthput": "36453",
    //         "uplinkThrouthput": "34356"
    //       },
    //       "utilization": {
    //         "pdu": "555",
    //         "resourceProcess": "45.44",
    //         "resourceMemory": "84.8",
    //         "resourceDisk": "37.79",
    //         "maxPdu": "974"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.66",
    //           "availability": "78.98",
    //           "mobility": "74.24",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "280",
    //             "maxPdu": "488",
    //             "resourceProcess": "45.1",
    //             "resourceMemory": "85.37",
    //             "resourceDisk": "36.71"
    //           },
    //           "energy": "0.88",
    //           "integrity": {
    //             "downlinkDelay": "22742",
    //             "uplinkDelay": "24997",
    //             "downlinkThrouthput": "18213",
    //             "uplinkThrouthput": "17198"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.11",
    //           "availability": "77.63",
    //           "mobility": "75.47",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "275",
    //             "maxPdu": "486",
    //             "resourceProcess": "45.79",
    //             "resourceMemory": "84.22",
    //             "resourceDisk": "38.88"
    //           },
    //           "energy": "0.9",
    //           "integrity": {
    //             "downlinkDelay": "22689",
    //             "uplinkDelay": "25001",
    //             "downlinkThrouthput": "18240",
    //             "uplinkThrouthput": "17158"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.68",
    //       "availability": "77.95",
    //       "mobility": "76.38",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "11279",
    //         "uplinkDelay": "12505",
    //         "downlinkThrouthput": "9153",
    //         "uplinkThrouthput": "8534"
    //       },
    //       "utilization": {
    //         "pdu": "145",
    //         "resourceProcess": "45.45",
    //         "resourceMemory": "84.92",
    //         "resourceDisk": "35.77",
    //         "maxPdu": "242"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.61",
    //       "availability": "78.06",
    //       "mobility": "74.76",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "33992",
    //         "uplinkDelay": "37425",
    //         "downlinkThrouthput": "27330",
    //         "uplinkThrouthput": "25636"
    //       },
    //       "utilization": {
    //         "pdu": "434",
    //         "resourceProcess": "45.59",
    //         "resourceMemory": "84.58",
    //         "resourceDisk": "38.75",
    //         "maxPdu": "716"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "162": {
    //   "start": "2024-06-11 18:00",
    //   "end": "2024-06-12 18:00",
    //   "field": {
    //     "accessibility": "64.96",
    //     "availability": "77.89",
    //     "mobility": "74.88",
    //     "retainability": "1.0",
    //     "energy": "0.86",
    //     "utilization": {
    //       "pdu": "1166",
    //       "maxPdu": "1918",
    //       "resourceProcess": "45.66",
    //       "resourceMemory": "85.92",
    //       "resourceDisk": "37.49"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "90666",
    //       "uplinkDelay": "99780",
    //       "downlinkThrouthput": "72802",
    //       "uplinkThrouthput": "68480"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.73",
    //       "availability": "77.68",
    //       "mobility": "74.82",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "45397",
    //         "uplinkDelay": "49930",
    //         "downlinkThrouthput": "36357",
    //         "uplinkThrouthput": "34225"
    //       },
    //       "utilization": {
    //         "pdu": "577",
    //         "resourceProcess": "45.59",
    //         "resourceMemory": "86.18",
    //         "resourceDisk": "36.88",
    //         "maxPdu": "967"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.04",
    //           "availability": "78.43",
    //           "mobility": "74.71",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "282",
    //             "maxPdu": "476",
    //             "resourceProcess": "45.87",
    //             "resourceMemory": "87.61",
    //             "resourceDisk": "36.91"
    //           },
    //           "energy": "0.85",
    //           "integrity": {
    //             "downlinkDelay": "22728",
    //             "uplinkDelay": "24913",
    //             "downlinkThrouthput": "18197",
    //             "uplinkThrouthput": "17159"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.42",
    //           "availability": "76.93",
    //           "mobility": "74.92",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "295",
    //             "maxPdu": "491",
    //             "resourceProcess": "45.31",
    //             "resourceMemory": "84.75",
    //             "resourceDisk": "36.85"
    //           },
    //           "energy": "0.87",
    //           "integrity": {
    //             "downlinkDelay": "22669",
    //             "uplinkDelay": "25017",
    //             "downlinkThrouthput": "18160",
    //             "uplinkThrouthput": "17066"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "65.0",
    //       "availability": "77.4",
    //       "mobility": "73.61",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "11309",
    //         "uplinkDelay": "12531",
    //         "downlinkThrouthput": "9088",
    //         "uplinkThrouthput": "8510"
    //       },
    //       "utilization": {
    //         "pdu": "156",
    //         "resourceProcess": "45.78",
    //         "resourceMemory": "86.11",
    //         "resourceDisk": "36.62",
    //         "maxPdu": "236"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.25",
    //       "availability": "78.33",
    //       "mobility": "75.4",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "33960",
    //         "uplinkDelay": "37319",
    //         "downlinkThrouthput": "27357",
    //         "uplinkThrouthput": "25745"
    //       },
    //       "utilization": {
    //         "pdu": "433",
    //         "resourceProcess": "45.72",
    //         "resourceMemory": "85.51",
    //         "resourceDisk": "38.54",
    //         "maxPdu": "715"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "163": {
    //   "start": "2024-06-12 18:00",
    //   "end": "2024-06-13 18:00",
    //   "field": {
    //     "accessibility": "64.84",
    //     "availability": "78.13",
    //     "mobility": "75.39",
    //     "retainability": "1.0",
    //     "energy": "0.86",
    //     "utilization": {
    //       "pdu": "1131",
    //       "maxPdu": "1922",
    //       "resourceProcess": "45.63",
    //       "resourceMemory": "84.95",
    //       "resourceDisk": "38.29"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "90750",
    //       "uplinkDelay": "99894",
    //       "downlinkThrouthput": "72878",
    //       "uplinkThrouthput": "68515"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "65.24",
    //       "availability": "78.08",
    //       "mobility": "75.71",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "45439",
    //         "uplinkDelay": "49921",
    //         "downlinkThrouthput": "36477",
    //         "uplinkThrouthput": "34226"
    //       },
    //       "utilization": {
    //         "pdu": "566",
    //         "resourceProcess": "45.41",
    //         "resourceMemory": "87.27",
    //         "resourceDisk": "37.94",
    //         "maxPdu": "961"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.17",
    //           "availability": "78.26",
    //           "mobility": "75.69",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "281",
    //             "maxPdu": "471",
    //             "resourceProcess": "45.18",
    //             "resourceMemory": "86.7",
    //             "resourceDisk": "37.47"
    //           },
    //           "energy": "0.85",
    //           "integrity": {
    //             "downlinkDelay": "22660",
    //             "uplinkDelay": "24912",
    //             "downlinkThrouthput": "18198",
    //             "uplinkThrouthput": "16897"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "65.32",
    //           "availability": "77.9",
    //           "mobility": "75.74",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "285",
    //             "maxPdu": "490",
    //             "resourceProcess": "45.65",
    //             "resourceMemory": "87.85",
    //             "resourceDisk": "38.42"
    //           },
    //           "energy": "0.85",
    //           "integrity": {
    //             "downlinkDelay": "22779",
    //             "uplinkDelay": "25009",
    //             "downlinkThrouthput": "18279",
    //             "uplinkThrouthput": "17329"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "63.69",
    //       "availability": "78.73",
    //       "mobility": "75.36",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "11346",
    //         "uplinkDelay": "12495",
    //         "downlinkThrouthput": "9117",
    //         "uplinkThrouthput": "8629"
    //       },
    //       "utilization": {
    //         "pdu": "140",
    //         "resourceProcess": "46.52",
    //         "resourceMemory": "80.97",
    //         "resourceDisk": "41.96",
    //         "maxPdu": "240"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.68",
    //       "availability": "77.99",
    //       "mobility": "74.98",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "33965",
    //         "uplinkDelay": "37478",
    //         "downlinkThrouthput": "27284",
    //         "uplinkThrouthput": "25660"
    //       },
    //       "utilization": {
    //         "pdu": "425",
    //         "resourceProcess": "45.63",
    //         "resourceMemory": "83.33",
    //         "resourceDisk": "37.53",
    //         "maxPdu": "721"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "164": {
    //   "start": "2024-06-13 18:00",
    //   "end": "2024-06-14 18:00",
    //   "field": {
    //     "accessibility": "64.59",
    //     "availability": "78.01",
    //     "mobility": "74.91",
    //     "retainability": "1.0",
    //     "energy": "0.86",
    //     "utilization": {
    //       "pdu": "1158",
    //       "maxPdu": "1925",
    //       "resourceProcess": "45.72",
    //       "resourceMemory": "84.8",
    //       "resourceDisk": "37.74"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "90558",
    //       "uplinkDelay": "99982",
    //       "downlinkThrouthput": "73047",
    //       "uplinkThrouthput": "68485"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.56",
    //       "availability": "78.26",
    //       "mobility": "75.33",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "45342",
    //         "uplinkDelay": "50033",
    //         "downlinkThrouthput": "36555",
    //         "uplinkThrouthput": "34241"
    //       },
    //       "utilization": {
    //         "pdu": "585",
    //         "resourceProcess": "45.87",
    //         "resourceMemory": "85.29",
    //         "resourceDisk": "36.53",
    //         "maxPdu": "960"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "65.32",
    //           "availability": "78.02",
    //           "mobility": "75.74",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "289",
    //             "maxPdu": "481",
    //             "resourceProcess": "45.79",
    //             "resourceMemory": "87.54",
    //             "resourceDisk": "37.22"
    //           },
    //           "energy": "0.87",
    //           "integrity": {
    //             "downlinkDelay": "22603",
    //             "uplinkDelay": "25010",
    //             "downlinkThrouthput": "18301",
    //             "uplinkThrouthput": "17162"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "63.81",
    //           "availability": "78.51",
    //           "mobility": "74.93",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "296",
    //             "maxPdu": "479",
    //             "resourceProcess": "45.94",
    //             "resourceMemory": "83.01",
    //             "resourceDisk": "35.82"
    //           },
    //           "energy": "0.86",
    //           "integrity": {
    //             "downlinkDelay": "22739",
    //             "uplinkDelay": "25023",
    //             "downlinkThrouthput": "18254",
    //             "uplinkThrouthput": "17079"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "63.82",
    //       "availability": "77.81",
    //       "mobility": "74.4",
    //       "energy": "0.87",
    //       "integrity": {
    //         "downlinkDelay": "11272",
    //         "uplinkDelay": "12509",
    //         "downlinkThrouthput": "9128",
    //         "uplinkThrouthput": "8535"
    //       },
    //       "utilization": {
    //         "pdu": "141",
    //         "resourceProcess": "46.06",
    //         "resourceMemory": "80.94",
    //         "resourceDisk": "39.71",
    //         "maxPdu": "250"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "64.89",
    //       "availability": "77.74",
    //       "mobility": "74.52",
    //       "energy": "0.86",
    //       "integrity": {
    //         "downlinkDelay": "33944",
    //         "uplinkDelay": "37440",
    //         "downlinkThrouthput": "27364",
    //         "uplinkThrouthput": "25709"
    //       },
    //       "utilization": {
    //         "pdu": "432",
    //         "resourceProcess": "45.41",
    //         "resourceMemory": "85.46",
    //         "resourceDisk": "38.75",
    //         "maxPdu": "715"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    // "165": {
    //   "start": "2024-06-14 18:00",
    //   "end": "2024-06-15 18:00",
    //   "field": {
    //     "accessibility": "64.79",
    //     "availability": "77.69",
    //     "mobility": "74.82",
    //     "retainability": "1.0",
    //     "energy": "0.87",
    //     "utilization": {
    //       "pdu": "1139",
    //       "maxPdu": "1918",
    //       "resourceProcess": "45.81",
    //       "resourceMemory": "86.58",
    //       "resourceDisk": "39.13"
    //     },
    //     "integrity": {
    //       "downlinkDelay": "90651",
    //       "uplinkDelay": "99710",
    //       "downlinkThrouthput": "73062",
    //       "uplinkThrouthput": "68690"
    //     }
    //   },
    //   "bs": [
    //     {
    //       "id": "b1c72ebb77744ea6aa9a",
    //       "compId": "51e4faf908f3434fa06d",
    //       "name": "BS-D-1",
    //       "accessibility": "64.49",
    //       "availability": "77.97",
    //       "mobility": "74.95",
    //       "energy": "0.88",
    //       "integrity": {
    //         "downlinkDelay": "45236",
    //         "uplinkDelay": "49851",
    //         "downlinkThrouthput": "36535",
    //         "uplinkThrouthput": "34337"
    //       },
    //       "utilization": {
    //         "pdu": "560",
    //         "resourceProcess": "46.16",
    //         "resourceMemory": "88.91",
    //         "resourceDisk": "39.48",
    //         "maxPdu": "954"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": [
    //         {
    //           "cellId": "00000c108",
    //           "accessibility": "64.33",
    //           "availability": "78.09",
    //           "mobility": "75.4",
    //           "retainability": "0.99",
    //           "utilization": {
    //             "pdu": "292",
    //             "maxPdu": "470",
    //             "resourceProcess": "46.29",
    //             "resourceMemory": "91.49",
    //             "resourceDisk": "39.96"
    //           },
    //           "energy": "0.88",
    //           "integrity": {
    //             "downlinkDelay": "22605",
    //             "uplinkDelay": "24924",
    //             "downlinkThrouthput": "18289",
    //             "uplinkThrouthput": "17145"
    //           }
    //         },
    //         {
    //           "cellId": "00000c109",
    //           "accessibility": "64.65",
    //           "availability": "77.84",
    //           "mobility": "74.52",
    //           "retainability": "1.0",
    //           "utilization": {
    //             "pdu": "268",
    //             "maxPdu": "484",
    //             "resourceProcess": "46.02",
    //             "resourceMemory": "86.35",
    //             "resourceDisk": "39.01"
    //           },
    //           "energy": "0.88",
    //           "integrity": {
    //             "downlinkDelay": "22631",
    //             "uplinkDelay": "24927",
    //             "downlinkThrouthput": "18246",
    //             "uplinkThrouthput": "17192"
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       "id": "a3587d2f75274a5d9d0e",
    //       "compId": "97259ca0b7ea409d9b53",
    //       "name": "BS-all-1",
    //       "accessibility": "64.75",
    //       "availability": "76.97",
    //       "mobility": "74.47",
    //       "energy": "0.9",
    //       "integrity": {
    //         "downlinkDelay": "11330",
    //         "uplinkDelay": "12506",
    //         "downlinkThrouthput": "9149",
    //         "uplinkThrouthput": "8550"
    //       },
    //       "utilization": {
    //         "pdu": "142",
    //         "resourceProcess": "45.18",
    //         "resourceMemory": "81.19",
    //         "resourceDisk": "39.15",
    //         "maxPdu": "242"
    //       },
    //       "retainability": "1.0",
    //       "cellInfoList": {}
    //     },
    //     {
    //       "id": "f5db8120fd8d4ab69399",
    //       "compId": "94d4aa57df9e4e909e88",
    //       "name": "BS-all-2",
    //       "accessibility": "65.2",
    //       "availability": "77.57",
    //       "mobility": "74.75",
    //       "energy": "0.85",
    //       "integrity": {
    //         "downlinkDelay": "34085",
    //         "uplinkDelay": "37353",
    //         "downlinkThrouthput": "27378",
    //         "uplinkThrouthput": "25803"
    //       },
    //       "utilization": {
    //         "pdu": "437",
    //         "resourceProcess": "45.56",
    //         "resourceMemory": "85.48",
    //         "resourceDisk": "38.65",
    //         "maxPdu": "722"
    //       },
    //       "retainability": "0.99",
    //       "cellInfoList": {}
    //     }
    //   ]
    // },
    "166": {
      "start": "2024-06-15 18:00",
      "end": "2024-06-16 18:00",
      "field": {
        "accessibility": "65.34",
        "availability": "78.02",
        "mobility": "75.3",
        "retainability": "1.0",
        "energy": "0.88",
        "utilization": {
          "pdu": "1154",
          "maxPdu": "1898",
          "resourceProcess": "45.65",
          "resourceMemory": "85.85",
          "resourceDisk": "38.11"
        },
        "integrity": {
          "downlinkDelay": "90899",
          "uplinkDelay": "99818",
          "downlinkThrouthput": "72945",
          "uplinkThrouthput": "68097"
        }
      },
      "bs": [
        {
          "id": "b1c72ebb77744ea6aa9a",
          "compId": "51e4faf908f3434fa06d",
          "name": "BS-D-1",
          "accessibility": "64.82",
          "availability": "78.0",
          "mobility": "75.71",
          "energy": "0.87",
          "integrity": {
            "downlinkDelay": "45575",
            "uplinkDelay": "49861",
            "downlinkThrouthput": "36456",
            "uplinkThrouthput": "34109"
          },
          "utilization": {
            "pdu": "572",
            "resourceProcess": "45.79",
            "resourceMemory": "84.76",
            "resourceDisk": "36.57",
            "maxPdu": "944"
          },
          "retainability": "0.99",
          "cellInfoList": [
            {
              "cellId": "00000c108",
              "accessibility": "63.84",
              "availability": "78.11",
              "mobility": "75.93",
              "retainability": "0.99",
              "utilization": {
                "pdu": "292",
                "maxPdu": "461",
                "resourceProcess": "45.73",
                "resourceMemory": "85.33",
                "resourceDisk": "37.87"
              },
              "energy": "0.88",
              "integrity": {
                "downlinkDelay": "22736",
                "uplinkDelay": "24990",
                "downlinkThrouthput": "18315",
                "uplinkThrouthput": "17046"
              }
            },
            {
              "cellId": "00000c109",
              "accessibility": "65.82",
              "availability": "77.89",
              "mobility": "75.48",
              "retainability": "0.99",
              "utilization": {
                "pdu": "280",
                "maxPdu": "483",
                "resourceProcess": "45.84",
                "resourceMemory": "84.2",
                "resourceDisk": "35.24"
              },
              "energy": "0.87",
              "integrity": {
                "downlinkDelay": "22839",
                "uplinkDelay": "24871",
                "downlinkThrouthput": "18141",
                "uplinkThrouthput": "17063"
              }
            }
          ]
        },
        {
          "id": "a3587d2f75274a5d9d0e",
          "compId": "97259ca0b7ea409d9b53",
          "name": "BS-all-1",
          "accessibility": "66.45",
          "availability": "78.7",
          "mobility": "74.5",
          "energy": "0.88",
          "integrity": {
            "downlinkDelay": "11316",
            "uplinkDelay": "12507",
            "downlinkThrouthput": "9075",
            "uplinkThrouthput": "8438"
          },
          "utilization": {
            "pdu": "146",
            "resourceProcess": "44.4",
            "resourceMemory": "85.48",
            "resourceDisk": "41.46",
            "maxPdu": "239"
          },
          "retainability": "1.0",
          "cellInfoList": {}
        },
        {
          "id": "f5db8120fd8d4ab69399",
          "compId": "94d4aa57df9e4e909e88",
          "name": "BS-all-2",
          "accessibility": "65.67",
          "availability": "77.83",
          "mobility": "75.04",
          "energy": "0.87",
          "integrity": {
            "downlinkDelay": "34008",
            "uplinkDelay": "37450",
            "downlinkThrouthput": "27414",
            "uplinkThrouthput": "25550"
          },
          "utilization": {
            "pdu": "436",
            "resourceProcess": "45.9",
            "resourceMemory": "87.44",
            "resourceDisk": "39.12",
            "maxPdu": "715"
          },
          "retainability": "0.99",
          "cellInfoList": {}
        }
      ]
    },
    "167": {
      "start": "2024-06-16 18:00",
      "end": "2024-06-17 18:00",
      "field": {
        "accessibility": "64.8",
        "availability": "76.96",
        "mobility": "75.03",
        "retainability": "1.0",
        "energy": "0.88",
        "utilization": {
          "pdu": "1141",
          "maxPdu": "1929",
          "resourceProcess": "45.95",
          "resourceMemory": "84.45",
          "resourceDisk": "36.72"
        },
        "integrity": {
          "downlinkDelay": "90696",
          "uplinkDelay": "99865",
          "downlinkThrouthput": "73111",
          "uplinkThrouthput": "68539"
        }
      },
      "bs": [
        {
          "id": "b1c72ebb77744ea6aa9a",
          "compId": "51e4faf908f3434fa06d",
          "name": "BS-D-1",
          "accessibility": "64.85",
          "availability": "77.44",
          "mobility": "75.18",
          "energy": "0.88",
          "integrity": {
            "downlinkDelay": "45242",
            "uplinkDelay": "49962",
            "downlinkThrouthput": "36543",
            "uplinkThrouthput": "34302"
          },
          "utilization": {
            "pdu": "570",
            "resourceProcess": "45.96",
            "resourceMemory": "84.43",
            "resourceDisk": "37.52",
            "maxPdu": "962"
          },
          "retainability": "1.0",
          "cellInfoList": [
            {
              "cellId": "00000c108",
              "accessibility": "64.77",
              "availability": "76.8",
              "mobility": "75.19",
              "retainability": "1.0",
              "utilization": {
                "pdu": "285",
                "maxPdu": "484",
                "resourceProcess": "46.3",
                "resourceMemory": "83.93",
                "resourceDisk": "35.78"
              },
              "energy": "0.87",
              "integrity": {
                "downlinkDelay": "22557",
                "uplinkDelay": "24916",
                "downlinkThrouthput": "18267",
                "uplinkThrouthput": "17189"
              }
            },
            {
              "cellId": "00000c109",
              "accessibility": "64.92",
              "availability": "78.09",
              "mobility": "75.17",
              "retainability": "0.99",
              "utilization": {
                "pdu": "285",
                "maxPdu": "478",
                "resourceProcess": "45.63",
                "resourceMemory": "84.93",
                "resourceDisk": "39.26"
              },
              "energy": "0.89",
              "integrity": {
                "downlinkDelay": "22685",
                "uplinkDelay": "25046",
                "downlinkThrouthput": "18276",
                "uplinkThrouthput": "17113"
              }
            }
          ]
        },
        {
          "id": "a3587d2f75274a5d9d0e",
          "compId": "97259ca0b7ea409d9b53",
          "name": "BS-all-1",
          "accessibility": "63.94",
          "availability": "77.77",
          "mobility": "77.4",
          "energy": "0.87",
          "integrity": {
            "downlinkDelay": "11341",
            "uplinkDelay": "12512",
            "downlinkThrouthput": "9075",
            "uplinkThrouthput": "8491"
          },
          "utilization": {
            "pdu": "141",
            "resourceProcess": "45.82",
            "resourceMemory": "83.6",
            "resourceDisk": "35.02",
            "maxPdu": "241"
          },
          "retainability": "0.99",
          "cellInfoList": {}
        },
        {
          "id": "f5db8120fd8d4ab69399",
          "compId": "94d4aa57df9e4e909e88",
          "name": "BS-all-2",
          "accessibility": "65.02",
          "availability": "76.05",
          "mobility": "74.06",
          "energy": "0.87",
          "integrity": {
            "downlinkDelay": "34113",
            "uplinkDelay": "37391",
            "downlinkThrouthput": "27493",
            "uplinkThrouthput": "25746"
          },
          "utilization": {
            "pdu": "430",
            "resourceProcess": "45.98",
            "resourceMemory": "84.76",
            "resourceDisk": "36.18",
            "maxPdu": "726"
          },
          "retainability": "1.0",
          "cellInfoList": {}
        }
      ]
    },
    "168": {
      "start": "2024-06-17 18:00",
      "end": "2024-06-18 18:00",
      "field": {
        "accessibility": "65.05",
        "availability": "77.82",
        "mobility": "74.64",
        "retainability": "1.0",
        "energy": "0.87",
        "utilization": {
          "pdu": "1176",
          "maxPdu": "1916",
          "resourceProcess": "45.96",
          "resourceMemory": "84.55",
          "resourceDisk": "40.79"
        },
        "integrity": {
          "downlinkDelay": "90808",
          "uplinkDelay": "99980",
          "downlinkThrouthput": "72811",
          "uplinkThrouthput": "68092"
        }
      },
      "bs": [
        {
          "id": "b1c72ebb77744ea6aa9a",
          "compId": "51e4faf908f3434fa06d",
          "name": "BS-D-1",
          "accessibility": "65.27",
          "availability": "77.8",
          "mobility": "74.51",
          "energy": "0.87",
          "integrity": {
            "downlinkDelay": "45392",
            "uplinkDelay": "49910",
            "downlinkThrouthput": "36438",
            "uplinkThrouthput": "34111"
          },
          "utilization": {
            "pdu": "581",
            "resourceProcess": "46.1",
            "resourceMemory": "84.92",
            "resourceDisk": "39.1",
            "maxPdu": "953"
          },
          "retainability": "0.99",
          "cellInfoList": [
            {
              "cellId": "00000c108",
              "accessibility": "65.09",
              "availability": "76.88",
              "mobility": "75.05",
              "retainability": "0.99",
              "utilization": {
                "pdu": "284",
                "maxPdu": "477",
                "resourceProcess": "46.18",
                "resourceMemory": "84.03",
                "resourceDisk": "40.77"
              },
              "energy": "0.86",
              "integrity": {
                "downlinkDelay": "22749",
                "uplinkDelay": "24963",
                "downlinkThrouthput": "18253",
                "uplinkThrouthput": "17010"
              }
            },
            {
              "cellId": "00000c109",
              "accessibility": "65.44",
              "availability": "78.74",
              "mobility": "73.97",
              "retainability": "0.99",
              "utilization": {
                "pdu": "297",
                "maxPdu": "476",
                "resourceProcess": "46.03",
                "resourceMemory": "85.82",
                "resourceDisk": "37.5"
              },
              "energy": "0.87",
              "integrity": {
                "downlinkDelay": "22643",
                "uplinkDelay": "24947",
                "downlinkThrouthput": "18185",
                "uplinkThrouthput": "17101"
              }
            }
          ]
        },
        {
          "id": "a3587d2f75274a5d9d0e",
          "compId": "97259ca0b7ea409d9b53",
          "name": "BS-all-1",
          "accessibility": "65.39",
          "availability": "78.64",
          "mobility": "74.53",
          "energy": "0.83",
          "integrity": {
            "downlinkDelay": "11393",
            "uplinkDelay": "12521",
            "downlinkThrouthput": "9131",
            "uplinkThrouthput": "8438"
          },
          "utilization": {
            "pdu": "155",
            "resourceProcess": "45.73",
            "resourceMemory": "84.84",
            "resourceDisk": "43.1",
            "maxPdu": "241"
          },
          "retainability": "0.99",
          "cellInfoList": {}
        },
        {
          "id": "f5db8120fd8d4ab69399",
          "compId": "94d4aa57df9e4e909e88",
          "name": "BS-all-2",
          "accessibility": "64.66",
          "availability": "77.57",
          "mobility": "74.85",
          "energy": "0.89",
          "integrity": {
            "downlinkDelay": "34023",
            "uplinkDelay": "37549",
            "downlinkThrouthput": "27242",
            "uplinkThrouthput": "25543"
          },
          "utilization": {
            "pdu": "440",
            "resourceProcess": "45.84",
            "resourceMemory": "83.96",
            "resourceDisk": "42.33",
            "maxPdu": "722"
          },
          "retainability": "1.0",
          "cellInfoList": {}
        }
      ]
    },
    "169": {
      "start": "2024-06-18 18:00",
      "end": "2024-06-19 18:00",
      "field": {
        "accessibility": "64.88",
        "availability": "77.16",
        "mobility": "75.21",
        "retainability": "1.0",
        "energy": "0.88",
        "utilization": {
          "pdu": "1155",
          "maxPdu": "1910",
          "resourceProcess": "45.77",
          "resourceMemory": "84.18",
          "resourceDisk": "39.13"
        },
        "integrity": {
          "downlinkDelay": "90759",
          "uplinkDelay": "99889",
          "downlinkThrouthput": "72932",
          "uplinkThrouthput": "68442"
        }
      },
      "bs": [
        {
          "id": "b1c72ebb77744ea6aa9a",
          "compId": "51e4faf908f3434fa06d",
          "name": "BS-D-1",
          "accessibility": "64.66",
          "availability": "77.31",
          "mobility": "75.04",
          "energy": "0.88",
          "integrity": {
            "downlinkDelay": "45410",
            "uplinkDelay": "49957",
            "downlinkThrouthput": "36470",
            "uplinkThrouthput": "34232"
          },
          "utilization": {
            "pdu": "579",
            "resourceProcess": "46.12",
            "resourceMemory": "84.07",
            "resourceDisk": "38.69",
            "maxPdu": "944"
          },
          "retainability": "1.0",
          "cellInfoList": [
            {
              "cellId": "00000c108",
              "accessibility": "64.63",
              "availability": "77.22",
              "mobility": "74.81",
              "retainability": "1.0",
              "utilization": {
                "pdu": "287",
                "maxPdu": "466",
                "resourceProcess": "46.0",
                "resourceMemory": "82.26",
                "resourceDisk": "37.77"
              },
              "energy": "0.87",
              "integrity": {
                "downlinkDelay": "22654",
                "uplinkDelay": "24923",
                "downlinkThrouthput": "18245",
                "uplinkThrouthput": "17039"
              }
            },
            {
              "cellId": "00000c109",
              "accessibility": "64.68",
              "availability": "77.4",
              "mobility": "75.27",
              "retainability": "1.0",
              "utilization": {
                "pdu": "292",
                "maxPdu": "478",
                "resourceProcess": "46.24",
                "resourceMemory": "85.93",
                "resourceDisk": "39.61"
              },
              "energy": "0.88",
              "integrity": {
                "downlinkDelay": "22756",
                "uplinkDelay": "25034",
                "downlinkThrouthput": "18225",
                "uplinkThrouthput": "17193"
              }
            }
          ]
        },
        {
          "id": "a3587d2f75274a5d9d0e",
          "compId": "97259ca0b7ea409d9b53",
          "name": "BS-all-1",
          "accessibility": "66.42",
          "availability": "77.81",
          "mobility": "75.1",
          "energy": "0.89",
          "integrity": {
            "downlinkDelay": "11311",
            "uplinkDelay": "12432",
            "downlinkThrouthput": "9161",
            "uplinkThrouthput": "8532"
          },
          "utilization": {
            "pdu": "138",
            "resourceProcess": "45.83",
            "resourceMemory": "81.42",
            "resourceDisk": "42.09",
            "maxPdu": "251"
          },
          "retainability": "0.99",
          "cellInfoList": {}
        },
        {
          "id": "f5db8120fd8d4ab69399",
          "compId": "94d4aa57df9e4e909e88",
          "name": "BS-all-2",
          "accessibility": "64.66",
          "availability": "76.75",
          "mobility": "75.48",
          "energy": "0.89",
          "integrity": {
            "downlinkDelay": "34038",
            "uplinkDelay": "37500",
            "downlinkThrouthput": "27301",
            "uplinkThrouthput": "25678"
          },
          "utilization": {
            "pdu": "438",
            "resourceProcess": "45.29",
            "resourceMemory": "85.27",
            "resourceDisk": "38.74",
            "maxPdu": "715"
          },
          "retainability": "0.99",
          "cellInfoList": {}
        }
      ]
    },
    "170": {
      "start": "2024-06-19 18:00",
      "end": "2024-06-20 18:00",
      "field": {
        "accessibility": "64.9",
        "availability": "77.87",
        "mobility": "74.85",
        "retainability": "1.0",
        "energy": "0.87",
        "utilization": {
          "pdu": "1164",
          "maxPdu": "1931",
          "resourceProcess": "45.87",
          "resourceMemory": "83.11",
          "resourceDisk": "38.58"
        },
        "integrity": {
          "downlinkDelay": "90611",
          "uplinkDelay": "99878",
          "downlinkThrouthput": "72927",
          "uplinkThrouthput": "68267"
        }
      },
      "bs": [
        {
          "id": "b1c72ebb77744ea6aa9a",
          "compId": "51e4faf908f3434fa06d",
          "name": "BS-D-1",
          "accessibility": "64.37",
          "availability": "77.72",
          "mobility": "74.65",
          "energy": "0.87",
          "integrity": {
            "downlinkDelay": "45365",
            "uplinkDelay": "50026",
            "downlinkThrouthput": "36413",
            "uplinkThrouthput": "34101"
          },
          "utilization": {
            "pdu": "568",
            "resourceProcess": "45.98",
            "resourceMemory": "84.94",
            "resourceDisk": "37.99",
            "maxPdu": "959"
          },
          "retainability": "1.0",
          "cellInfoList": [
            {
              "cellId": "00000c108",
              "accessibility": "65.06",
              "availability": "77.61",
              "mobility": "74.72",
              "retainability": "1.0",
              "utilization": {
                "pdu": "274",
                "maxPdu": "477",
                "resourceProcess": "45.89",
                "resourceMemory": "84.95",
                "resourceDisk": "37.21"
              },
              "energy": "0.86",
              "integrity": {
                "downlinkDelay": "22638",
                "uplinkDelay": "25127",
                "downlinkThrouthput": "18203",
                "uplinkThrouthput": "17179"
              }
            },
            {
              "cellId": "00000c109",
              "accessibility": "63.69",
              "availability": "77.83",
              "mobility": "74.58",
              "retainability": "1.0",
              "utilization": {
                "pdu": "294",
                "maxPdu": "482",
                "resourceProcess": "46.08",
                "resourceMemory": "84.92",
                "resourceDisk": "38.76"
              },
              "energy": "0.88",
              "integrity": {
                "downlinkDelay": "22727",
                "uplinkDelay": "24899",
                "downlinkThrouthput": "18210",
                "uplinkThrouthput": "16922"
              }
            }
          ]
        },
        {
          "id": "a3587d2f75274a5d9d0e",
          "compId": "97259ca0b7ea409d9b53",
          "name": "BS-all-1",
          "accessibility": "65.66",
          "availability": "78.91",
          "mobility": "74.63",
          "energy": "0.89",
          "integrity": {
            "downlinkDelay": "11330",
            "uplinkDelay": "12517",
            "downlinkThrouthput": "9113",
            "uplinkThrouthput": "8550"
          },
          "utilization": {
            "pdu": "151",
            "resourceProcess": "45.63",
            "resourceMemory": "82.92",
            "resourceDisk": "35.98",
            "maxPdu": "239"
          },
          "retainability": "1.0",
          "cellInfoList": {}
        },
        {
          "id": "f5db8120fd8d4ab69399",
          "compId": "94d4aa57df9e4e909e88",
          "name": "BS-all-2",
          "accessibility": "65.37",
          "availability": "77.74",
          "mobility": "75.2",
          "energy": "0.87",
          "integrity": {
            "downlinkDelay": "33916",
            "uplinkDelay": "37335",
            "downlinkThrouthput": "27401",
            "uplinkThrouthput": "25616"
          },
          "utilization": {
            "pdu": "445",
            "resourceProcess": "45.8",
            "resourceMemory": "80.88",
            "resourceDisk": "40.24",
            "maxPdu": "733"
          },
          "retainability": "1.0",
          "cellInfoList": {}
        }
      ]
    },
    "171": {
      "start": "2024-06-20 18:00",
      "end": "2024-06-21 18:00",
      "field": {
        "accessibility": "64.91",
        "availability": "78.15",
        "mobility": "75.29",
        "retainability": "1.0",
        "energy": "0.87",
        "utilization": {
          "pdu": "1155",
          "maxPdu": "1914",
          "resourceProcess": "45.49",
          "resourceMemory": "83.83",
          "resourceDisk": "38.97"
        },
        "integrity": {
          "downlinkDelay": "90720",
          "uplinkDelay": "99994",
          "downlinkThrouthput": "72793",
          "uplinkThrouthput": "68589"
        }
      },
      "bs": [
        {
          "id": "b1c72ebb77744ea6aa9a",
          "compId": "51e4faf908f3434fa06d",
          "name": "BS-D-1",
          "accessibility": "64.66",
          "availability": "78.31",
          "mobility": "75.21",
          "energy": "0.86",
          "integrity": {
            "downlinkDelay": "45286",
            "uplinkDelay": "50064",
            "downlinkThrouthput": "36424",
            "uplinkThrouthput": "34389"
          },
          "utilization": {
            "pdu": "570",
            "resourceProcess": "45.16",
            "resourceMemory": "85.0",
            "resourceDisk": "37.93",
            "maxPdu": "959"
          },
          "retainability": "1.0",
          "cellInfoList": [
            {
              "cellId": "00000c108",
              "accessibility": "64.33",
              "availability": "77.97",
              "mobility": "76.08",
              "retainability": "1.0",
              "utilization": {
                "pdu": "291",
                "maxPdu": "477",
                "resourceProcess": "45.16",
                "resourceMemory": "78.56",
                "resourceDisk": "38.21"
              },
              "energy": "0.87",
              "integrity": {
                "downlinkDelay": "22683",
                "uplinkDelay": "25078",
                "downlinkThrouthput": "18240",
                "uplinkThrouthput": "17246"
              }
            },
            {
              "cellId": "00000c109",
              "accessibility": "64.98",
              "availability": "78.65",
              "mobility": "74.36",
              "retainability": "1.0",
              "utilization": {
                "pdu": "279",
                "maxPdu": "482",
                "resourceProcess": "45.15",
                "resourceMemory": "91.99",
                "resourceDisk": "37.65"
              },
              "energy": "0.85",
              "integrity": {
                "downlinkDelay": "22603",
                "uplinkDelay": "24986",
                "downlinkThrouthput": "18184",
                "uplinkThrouthput": "17143"
              }
            }
          ]
        },
        {
          "id": "a3587d2f75274a5d9d0e",
          "compId": "97259ca0b7ea409d9b53",
          "name": "BS-all-1",
          "accessibility": "67.07",
          "availability": "77.22",
          "mobility": "76.3",
          "energy": "0.87",
          "integrity": {
            "downlinkDelay": "11398",
            "uplinkDelay": "12435",
            "downlinkThrouthput": "9082",
            "uplinkThrouthput": "8623"
          },
          "utilization": {
            "pdu": "146",
            "resourceProcess": "45.42",
            "resourceMemory": "83.67",
            "resourceDisk": "41.34",
            "maxPdu": "240"
          },
          "retainability": "0.99",
          "cellInfoList": {}
        },
        {
          "id": "f5db8120fd8d4ab69399",
          "compId": "94d4aa57df9e4e909e88",
          "name": "BS-all-2",
          "accessibility": "64.53",
          "availability": "78.26",
          "mobility": "75.06",
          "energy": "0.88",
          "integrity": {
            "downlinkDelay": "34036",
            "uplinkDelay": "37495",
            "downlinkThrouthput": "27287",
            "uplinkThrouthput": "25577"
          },
          "utilization": {
            "pdu": "439",
            "resourceProcess": "45.95",
            "resourceMemory": "82.39",
            "resourceDisk": "39.6",
            "maxPdu": "715"
          },
          "retainability": "1.0",
          "cellInfoList": {}
        }
      ]
    },
    "172": {
      "start": "2024-06-21 18:00",
      "end": "2024-06-22 18:00",
      "field": {
        "accessibility": "64.98",
        "availability": "77.52",
        "mobility": "75.21",
        "retainability": "1.0",
        "energy": "0.88",
        "utilization": {
          "pdu": "766",
          "maxPdu": "1298",
          "resourceProcess": "45.62",
          "resourceMemory": "84.76",
          "resourceDisk": "38.34"
        },
        "integrity": {
          "downlinkDelay": "60862",
          "uplinkDelay": "67139",
          "downlinkThrouthput": "48832",
          "uplinkThrouthput": "46068"
        }
      },
      "bs": [
        {
          "id": "b1c72ebb77744ea6aa9a",
          "compId": "51e4faf908f3434fa06d",
          "name": "BS-D-1",
          "accessibility": "65.75",
          "availability": "78.17",
          "mobility": "74.98",
          "energy": "0.87",
          "integrity": {
            "downlinkDelay": "30312",
            "uplinkDelay": "33350",
            "downlinkThrouthput": "24279",
            "uplinkThrouthput": "22906"
          },
          "utilization": {
            "pdu": "384",
            "resourceProcess": "45.19",
            "resourceMemory": "83.79",
            "resourceDisk": "37.67",
            "maxPdu": "639"
          },
          "retainability": "0.99",
          "cellInfoList": [
            {
              "cellId": "00000c108",
              "accessibility": "66.24",
              "availability": "78.69",
              "mobility": "74.84",
              "retainability": "0.99",
              "utilization": {
                "pdu": "190",
                "maxPdu": "326",
                "resourceProcess": "44.88",
                "resourceMemory": "81.49",
                "resourceDisk": "38.84"
              },
              "energy": "0.88",
              "integrity": {
                "downlinkDelay": "15198",
                "uplinkDelay": "16676",
                "downlinkThrouthput": "12115",
                "uplinkThrouthput": "11464"
              }
            },
            {
              "cellId": "00000c109",
              "accessibility": "65.27",
              "availability": "77.66",
              "mobility": "75.12",
              "retainability": "0.99",
              "utilization": {
                "pdu": "194",
                "maxPdu": "313",
                "resourceProcess": "45.5",
                "resourceMemory": "86.1",
                "resourceDisk": "36.56"
              },
              "energy": "0.86",
              "integrity": {
                "downlinkDelay": "15114",
                "uplinkDelay": "16674",
                "downlinkThrouthput": "12164",
                "uplinkThrouthput": "11442"
              }
            }
          ]
        },
        {
          "id": "a3587d2f75274a5d9d0e",
          "compId": "97259ca0b7ea409d9b53",
          "name": "BS-all-1",
          "accessibility": "63.45",
          "availability": "76.91",
          "mobility": "74.4",
          "energy": "0.89",
          "integrity": {
            "downlinkDelay": "7661",
            "uplinkDelay": "8499",
            "downlinkThrouthput": "6131",
            "uplinkThrouthput": "5806"
          },
          "utilization": {
            "pdu": "87",
            "resourceProcess": "45.41",
            "resourceMemory": "82.75",
            "resourceDisk": "42.26",
            "maxPdu": "159"
          },
          "retainability": "1.0",
          "cellInfoList": {}
        },
        {
          "id": "f5db8120fd8d4ab69399",
          "compId": "94d4aa57df9e4e909e88",
          "name": "BS-all-2",
          "accessibility": "64.5",
          "availability": "76.85",
          "mobility": "75.77",
          "energy": "0.88",
          "integrity": {
            "downlinkDelay": "22889",
            "uplinkDelay": "25290",
            "downlinkThrouthput": "18422",
            "uplinkThrouthput": "17356"
          },
          "utilization": {
            "pdu": "295",
            "resourceProcess": "46.27",
            "resourceMemory": "86.78",
            "resourceDisk": "37.96",
            "maxPdu": "500"
          },
          "retainability": "0.99",
          "cellInfoList": {}
        }
      ]
    }
  };

}
