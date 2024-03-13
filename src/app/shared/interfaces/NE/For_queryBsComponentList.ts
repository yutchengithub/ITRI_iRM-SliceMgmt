 
  export interface ComponentList {
    components: Components[];
  }
  
  export interface Components {
    id: string;
    bsId: string;
    bsName: string;
    name: string;
    ip: string;
    port: string;
    account: string;
    key: string;
    comtype: number;
    firm: string;
    modelname: string;
    status: number;
  }
  