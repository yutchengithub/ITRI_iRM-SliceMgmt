
export interface NEInfo {
    id: string;
    name: string;
    ip: string;
    port: string;
    account: string;
    key: string;
    comtype: number;
    firm: string;
    modelname: string;
    status: number;
    info: Info;
    sm: Sm;
  }
  
  export interface Sm {
    'software-inventory': Softwareinventory;
  }
  
  export interface Softwareinventory {
    'software-slot': Softwareslot[];
  }
  
  export interface Softwareslot {
    name: string;
    status: string;
    active: string;
    running: string;
    access: string;
    'vendor-code'?: string;
    'build-id'?: string;
    'build-name'?: string;
    'build-version'?: string;
    files?: Files;
  }
  
  export interface Files {
    name: string;
    version: string;
    'local-path': string;
    integrity: string;
  }
  
  export interface Info {
    data: string;
  }