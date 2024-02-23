export const Enlanguage = {

  'logon':'Login',
  'logon.welcome':'Welcome to the',
  'logon.field_mgr_system':'Athena Orchestrator',
  'logon.user_logon':'USER LOGIN',
  'logon.password_error':'Username or password Eentered Incorrectly',
  'logon.required_error':'Please Enter Account or Password',
  'logon.401':'Session ID has expired, please log in again',
  'logon.403':'Username or password Eentered Incorrectly',
  'logon.404':'This account does not exist',

  // Menu Title
  'index.menu_iRmSys':'Athena Orchestrator',
  'index.menu_dashboard':'Dashboard',
  'index.menu_fieldMgr':'Field Management',
  'index.menu_BSMgr':'BS Management',
  'index.menu_componentMgr':'Component Management',
  'index.menu_faultMgr':'Fault Management',
  'index.menu_performMgr':'Performance Management',
  'index.menu_softwareMgr':'Software Management',
  'index.menu_scheduleMgr':'Schedule Management',
  'index.menu_logMgr':'Log Management',
  'index.menu_accountMgr':'Account Management',
 

  'index.netFun':'Network Functions',
  'index.faultMsg':'Fault Messages',
  'index.viewMore':'View More',
  'index.view':'View',
  'index.resourceMsg':'Resource Information',
  'index.cpuLoading':'CPU Loading',
  'index.diskUsage':'Disk Usage',
  'index.memoryUsage':'Memory Usage',
  'index.networkThroughput':'Network Throughput',
  'table.header_name':'Name',
  'table.header_dmsCount':'DMS Counts',
  'table.header_nfCount':'NF Counts',
  'table.header_faultCount':'Fault Counts',
  'table.globalID':'Global ID',
  'table.Status':'Status',
  'table.performance':'Performance',
  'table.delete':'Delete',
  
  // Common Items
  'ok':'OK',
  'confirm':'Confirm',  // @2024/01/10 Add by yuchen
  'cancel':'Cancel',
  'search':'Search',
  'search_criteria':'Filter By',   // @12/04 Add by yuchen
  'clear_search':'Search Reset',   // @11/24 Add by yuchen
  'close': 'Close',                // @2024/01/22 Add
  

  // Field Management (場域管理) @11/30 Add by yuchen
  'field.list':'Field List',
  'field.name':'Field Name',
  'field.bsNum':'Number of BSs',
  'field.view':'View',
  'field.viewDetail':'Details',
  'field.alarm':'Field Alarm',
  'field.snapshot':'Snapshot',
  'field.delTitle':'Delete',
  'field.delItem':'Delete this field',
  'field.create':'Create field',
  'field.createTitle':'Field Creation',
  'field.createNext': 'Next',                  // @2024/01/31 Add
  'field.createBack': 'Back',                  // @2024/01/31 Add
  'field.createDone': 'Done',                  // @2024/01/31 Add
  'field.createReset': 'Reset',                // @2024/01/31 Add
  'field.setFieldName': 'Set Field Name',      // @2024/01/31 Add
  'field.setFieldBoundsCoord': 'Set Field Boundary Coordinates', // @2024/01/31 Add
  'field.setNotificationNum':  'Set Admin Notification Number',   // @2024/01/31 Add  
  'field.PhoneNum': 'Phone Number',                   // @2024/01/31 Add
  'field.selectBaseStations': 'Select Base Stations', // @2024/01/31 Add
  'field.setupComplete': 'Field Setup Complete.',     // @2024/01/31 Add
  'field.bsDescription': 'Description',               // @2024/02/01 Add
  'field.validLongitude': 'Please enter a valid longitude ( -180.0 ~ 180.0 )',  // @2024/02/02 Add
  'field.validLatitude' : 'Please enter a valid latitude ( -90.0 ~ 90.0 )',     // @2024/02/02 Add
  'field.validPhoneNumber' : 'Please enter a valid phone number ( 10 digits )', // @2024/02/02 Add

  'field.info':'Field Detailed Information',
  'field.Map':'Field Map',
  'field.image':'Field Image',
  'field.noFieldImageAvailableTitle':'Notice', // @2024/01/22 Add
  'field.noFieldImageAvailableMessage':'The field image has not been uploaded yet.', // @2024/01/22 Add
  'field.rsrpMap':'RSRP MAP',
  'field.sinrMap':'SINR MAP',
  'field.MapOption':'More Options',
  'field.faultInfo':'Field Alarms',
  'field.criticalFault':'Critical',
  'field.majorFault':'Major',
  'field.minorFault':'Minor',
  'field.warningFault':'Warning',
  'field.performanceInfo':'Performance',
  'field.handoverRate':'Handover Success Rate',
  'field.accessRate':'Access Success Rate',
  'field.CPU_Utilization':'CPU Utilization',
  'field.Memory_Utilization':'Memory Utilization',
  'field.bsInfo':'BS Information',
  'field.BSname':'Name',
  'field.BStype':'Type',
  'field.Longitude':'Longitude',
  'field.Latitude':'Latitude',
  'field.modifyConfiguration':'Modify Configuration',
  'field.modifySuccess':'Modification Applied',     // @2024/01/10 Add
  'field.modifyError':'Modification Error',         // @2024/01/10 Add
  'field.nothingChanged':'Nothing Changed',         // @2024/01/15 Add
  'field.neighboringBSList':'Neighboring BS List',
  'field.config':'Field Configuration',             // @12/12 Add
  'field.edit':'Field Editing',                     // @2024/01/11 Add
  'field.editInfo':'Field Information',             // @2024/01/11 Add
  'field.northBound':'North Boundary',              // @2024/01/11 Add
  'field.southBound':'South Boundary',              // @2024/01/11 Add
  'field.lat':'Latitude',                           // @2024/02/02 Add
  'field.westBound':'West Boundary',                // @2024/01/11 Add
  'field.eastBound':'East Boundary',                // @2024/01/11 Add
  'field.lng':'Longitude',                          // @2024/02/02 Add
  'field.notificationNum':'Notification Number',    // @2024/01/11 Add
  'field.fieldBoundsEx':'Field Boundary Diagram',   // @2024/01/18 Add
  'field.editBSs':'Adjust BS Field Allocation',     // @2024/01/28 Add
  'field.cancelEditBSs':'Cancel',                   // @2024/01/28 Add
  'field.selectBSs':'Choose BSs in field',          // @2024/01/18 Add
  'field.confirmFieldEditField': "Confirm to make these field changes ?",  // @2024/01/28 Add
  
  'field.fieldImageUpload':'Upload Field Image',      // @2024/02/23 Update
  'field.fieldImageNotUploaded': 'Field image not yet uploaded ( e.g., Indoor or outdoor maps )',  // @2024/02/23 Update
  'field.confirmDeletefieldImage':'Sure to remove the field image ?',  // @2024//02/23 Update
  'field.indoorMap':'Indoor Map',                    // @2024/01/18 Add
  'field.preview':'Preview',                         // @2024/02/04 Add
  'field.fieldImageNone':'No field image available',  // @2024/02/23 Update
  'field.DeletefieldImage':'Delete the field image',  // @2024/02/23 Update

  'field.configPMset':'PM Parameter Setting',  // @12/12 Add
  'field.pmIP': 'PM Server IP Address',        // @2024/02/15 Add
  'field.folderPath': 'Folder Path',           // @2024/02/15 Add
  'field.pmID': 'Username',                    // @2024/02/15 Add
  'field.pmKey': 'Password',                   // @2024/02/15 Add
  'field.MeasurementInterval_pmint': 'Measurement Interval (s)',  // @2024/02/15 Add
  'field.UploadInterval_fmint': 'Upload Interval (s)',            // @2024/02/15 Add
  'field.measurementType': 'Measurement Type',  // @2024/02/16 Add
  'field.off': 'Off',                           // @2024/02/16 Add
  'field.default': 'Default',                   // @2024/02/16 Add
  'field.selfDefined': 'Self-defined',          // @2024/02/16 Add
  "field.enterSelfDefinedParam": "Enter self defined parameter",                          // @2024/02/21 Add
  'field.confirmPMgmtParameterSet': 'Confirm apply changes ?' ,  // @2024/02/22 Update
  'field.apply':'Apply',        // @2024/02/22 Add
  'field.close':'Close',        // @2024/02/22 Add
  'field.applyReminder':'Reminder', // @2024/02/22 Add

  'field.report':'Field Reports',                   // @12/12 Add
  'field.reportPM':'Performance (PM)',              // @12/12 Add
  'field.reportFM':'Alarms (FM)',                   // @12/12 Add
  'field.optim':'Field Optimization',               // @12/12 Add
  'field.optimSON':'SON Calculation',               // @12/12 Add
  'field.mapModel':'Map Mode',                      // @12/12 Add
  'field.bsList':'BS List',                         // @12/12 Add
  'field.bsAntennaCoord':'BS Antenna Coordinates',  // @12/13 Add
  'field.BSstatus':'BS Status',                     // @12/13 Add
  'field.bsAlarm':'Alarm',                          // @12/13 Add
  'field.legend_all-in-one_bs':'All-in-one BS',     // @12/28 Add
  'field.legend_dist_bs':'O-RAN BS',                // @12/28 Add
  

  // Fault Management
  'fm.start':'StartTime',
  'fm.end':'EndTime',
  'fm.no':'No.',
  'fm.field':'Field Name',
  'fm.BS':'BS Name',
  'fm.component':'Component Name',
  'fm.alarm':'Alarm Name',
  'fm.severity':'Severity',
  'fm.count':'Count',
  'fm.occurtime':'OccurTime',
  'fm.createtime':'Create Time',
  'fm.updatetime':'Update Time',
  'fm.status':'Status',
  'fm.situation':'Situation',
  'fm.owner':'Acknowledge Owner',
  'fm.view':'View',
  'fm.total1':'Total',
  'fm.total2':'Alarms',
  'fm.eType':'Event Type',
  'fm.eCause':'Event Cause',
  'fm.eDesc':'Event Description',
  'fm.detail':'Fault Message Detail',
  'fm.addsitch':'Add Situation',
  'fm.sHistory':'Situation History',
  'fm.add':'Add',
  'fm.pending':'Pending',
  'fm.ended':'Ended',
  'fm.close':'Close',
  'fm.modifySuccess':'Modify successfully',

  // Performance Management
  'pm.field':'Field Name',
  'pm.accessibility':'Accessibility',
  'pm.integrity':'Integrity (4 Indicator)',
  'pm.retainability':'Retainability',
  'pm.efficiency':'Energy Efficiency',
  'pm.utilization':'Utilization (5 Indicator)',
  'pm.mobility':'Mobility',
  'information':'Information',
  'basic.info':'Basic Information',
  'nf.list':'NF List',
  'resource.pools':'Resource Pools',
  'ims.endpoint':'IMS Endpoint',
  'software.info':'Software Information',
  'version':'Version',
  'update':'Update',
  'theme':'Adjust theme',
  'logout_now':'Logout Now',
  'view_detail':'View this item in detail',
  'createNF':'Create a new NF',
  'delItem':'Delete this item',
  'updateSoftware':'Update this software',
  'nfRun':'NF running',
  'nfNotRun':'NF not running',
  'stopDE':'Stop deploy',
  'startDE':'Start deploy',
  'createNFcapacity':'Create a new NF capacity',
  'a_search':'Advanced Search',
  'addSoftware':'Add New Software',
  'delsoftware':'Delete Software',
  'type':'Type',
  'description':'Description',
  'fileName':'File Name',
  'action':'Action',
  'time':'Time',
  'severity':'Severity',
  'NFmgr':'Network Function Management',
  'upload':'Upload',
  'softwareFile':'Software File',
  'faultContext':'Fault Context',
  'processComment':'Process Comment',
  'npInfo':'Network Performance Information',
  'send':'Send',
  'receive':'Receive',
  'confirm_del_soft':'Confirm to Delete Software',
  'confirm_del_field':'Confirm to Delete Field',
  'confirm_del_nf':'Confirm to Delete NF',
  'performance_Advanced_Search':'Advanced Search',
  'software_update':'Software Update',
  'add_field':'Create Field',
  'detail':'Detail',
  'limit.max':'max',
  'limit.min':'min',
  'modify_faultMsg_status':'Modify Fault Message Status',
  'confirm_modify':'Confirm to modify',
  'pending_error':'Pending', //Modify by Charles (Pending Error->Pending)
  'resolved':'Ended', //Modify by Charles (Resolved->Ended)
  'no_results':'No results were found. Please verify your search terms and try again.',

  // Dashboard
  'num_fields':'Number of Field',
  'num_BSs':'Number of BSs',
  'num_UEs':'Number of UEs',
  'coverage':'Coverage',
  'critical_Alarm':'Critical Alarm',
  'major_Alarm':'Major Alarm',
  'minor_Alarm':'Minor Alarm',
  'warning_Alarm':'Warning Alarm',
  'dashboard.view':'View',
  
  // Software Management
  'firm':'Firm',
  'model':'Model',
  'manufacturer':'Manufacturer',
  'notes':'Notes',
  'upload_time':'Upload Time',
  'file.Url':'File/Url',
  'ftp.account':'FTP Account',
  'ftp.password':'FTP Password',
  'upload.file':'Upload File',
  'url':'Url',
  'add.method':'Add Method',
  'file.size':'File Size',
  'field_list':'Field List',
  'software_version':'Software Version',
  'time.end':'～ ',
  
  // Component Management (元件管理)
  'cm.name':'Component Name',
  'cm.provision':'Provision',
  'ExportCSV':'Export Result.csv',
  'cm.add':'Add Component',
  'cm.type':'Component Type',
  'cm.ip':'Component IP',
  'cm.port':'Component Port',
  'cm.mac':'Component MAC',
  'cm.acc':'Component Account',
  'cm.passw':'Component Password',
  'cm.manufacturer':'Manufacturer',
  'cm.model':'Model',
  'cm.delete':'Delete Component',
  'cm.confirm_del':'Confirm to Delete Component',
  'cm.unable_del':'Can not delete the component which has been assigned to a certain BS',
  'cm.error':'ERROR',
  'cm.info':'Component Detail Information',
  'cm.apply':'Apply',
  'cm.file':'File Management',
  'cm.path':'Path',
  'cm.download':'Download',

  // Account Management
  'user_account':'User',
  'key_account':'Password',
  'role_account':'Role',
  'expired_time_account':'Expired Time',
  'addaccount':'Create Account',
  'delaccount':'Delete Account',
  'confirm_del_acc':'Confirm to Delete Account',

  // Schedule Management @11/24 Add by yuchen
  'sm.select_type':'Schedule Type',
  'sm.select_field':'Field',
  'sm.th_create':'Create Schedule',
  'sm.th_time':'Schedule Time',
  'sm.th_type':'Type',
  'sm.th_state':'State',
  'sm.th_download':'Download Report',
  'sm.th_view':'View',
  'sm.th_delete':'Delete',
  'sm.smDownload':'Download report of this schedule',
  'sm.view_detail':'View this schedule in detail',
  'sm.delItem':'Delete this schedule',
  'sm.fmReport':'Fault Management Report',
  'sm.pmReport':'Performance Management Report',
  'sm.sfUpdate':'Software update',

  // Log Management @10/31 add by yuchen
  'LogLists': 'Log Lists',
  'UserLogs': 'User Logs',
  'NELogs': 'NE Logs',            // NE = Network Element
  'Log.start':'Execution Time',   // @11/17 Changed by yuchen
  'Log.end':'～',                  // @12/04 Changed by yuchen
  'Log.total':'Total',            // @11/21 Add by yuchen

  'UserLog.No':'No.',
  'UserLog.userid':'User',
  'UserLog.logtype':'Type',
  'UserLog.loglevel':'Level',
  'UserLog.logmsg':'Action Executed',
  'UserLog.logtime':'Execution Time',
  'UserLog.view':'View',
  'UserLog.single':'User Log',  // @11/21 Add by yuchen
  'UserLog.total':'User Logs',  // @11/21 Changed by yuchen
  'UserLog.logKeywordString':'Action Executed',  // @11/17 changed by yuchen
  'UserLog.detail':'User Log Detail', // @11/03 Add by yuchen
  'UserLog.detailclose':'Close',      // @11/03 Add by yuchen
  'UserLog.ExportCSV':'Export User Logs to .csv',    // @11/07 Add by yuchen
  'UserLog.ExportXLSX':'Export User Logs to .xlsx',  // @11/23 Add by yuchen

  'NElog.No':'No.',
  'NElog.userid':'User',
  'NElog.comp_name':'NE Name',   // @11/22 Add by yuchen
  'NElog.operation':'Type',
  'NElog.req_data':'Request Data',
  'NElog.resp_data':'Response Data',
  'NElog.logtime':'Execution Time',
  'NElog.view':'View',
  'NElog.single':'NE Log',       // @11/21 Add by yuchen
  'NElog.total':'NE Logs',       // @11/21 Changed by yuchen
  'NElog.logKeywordString':'Request / Response Data',  // @11/17 Changed by yuchen
  'NElog.detail':'NE Log Detail',  // @11/03 Add by yuchen
  'NElog.detailclose':'Close',     // @11/03 Add by yuchen
  'NElog.ExportCSV':'Export NE Logs to .csv',   // @11/07 Add by yuchen
  'NElog.ExportXLSX':'Export NE Logs to .xlsx'  // @11/23 Add by yuchen
}
