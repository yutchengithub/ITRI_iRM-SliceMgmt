export class ResponseMessage {
  respMsg?: string;
  severity?: string;
  status?: string;
  data?: any[];

  constructor(
    options: {
      respMsg?: string,
      severity?: string,
      status?: string,
      data?: any[]
    } = {}
  ) {
    this.respMsg = options.respMsg;
    this.severity = options.severity;
    this.status = options.status;
    this.data = options.data;
  }
}
