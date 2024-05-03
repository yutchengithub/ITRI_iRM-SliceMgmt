export const Enlanguage = {
  'loading':"Loading...",
  'Processing':"Processing...",

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
  'index.menu_componentMgr':'NE Management',
  'index.menu_faultMgr':'Fault Management',
  'index.menu_performMgr':'Performance Management',
  'index.menu_sliceMgr':'Slice Management',
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
  'clear_select':'Select Reset',   // @2024/04/25 Add

  // Field Management ( 場域管理 ) @11/30 Add by yuchen
  'field.list':'Field List',
  'field.name':'Field Name',
  'field.bsNum':'Number of BSs',

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

  'field.view':'View',
  'field.viewDetail':'Details',

  'field.alarm':'Field Alarm',

  'field.snapshot':'Snapshot',
  'field.fieldSnapshots': 'Field Snapshots',
  'field.fieldSnapshotSettings': 'Field Snapshot Settings',
  'field.setSnapshotName': 'Set this snapshot name',
  'field.setCurrentSnapshotNamePlaceholder': 'Enter name for this snapshot',
  'field.snapshotsList': 'Snapshots List',
  'field.totalSaved': 'Total Saved',
  'field.saveFieldSnapshot':'Save',
  'field.snapshotNameRequired': 'Enter snapshot name (no whitespace only)',
  'field.mustContainNonWhitespace': 'The snapshot name must contain at least one non-whitespace character',
  

  'field.downloadCurrentFieldSnapshot':'Download This Snapshot',
  'field.snapshotNo':'No.',
  'field.snapshotName':'Snapshot Name',
  'field.createdTime': 'Created Time',
  'field.currentSnapshot': 'Current Snapshot',
  'field.download': 'Download',
  'field.downloadSnapshot': 'Download this snapshot',
  'field.delete': 'Delete',
  'field.deleteSnapshot': 'Delete this snapshot',
  'field.confirm_del_fieldSnapshot':'Confirm to Delete Snapshot',
  'field.closeSnapshot':'Close',

  'field.delTitle':'Delete',
  'field.delItem':'Delete this field',

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
  'field.bsNameInMouseOver':'Name',
  'field.bsTypeInMouseOver':'Type',
  'field.BSname':'Name',
  'field.BStype':'Type',
  'field.Longitude':'Longitude',
  'field.Latitude':'Latitude',
  'field.moreBsInfos':'More Infos',
  
  'field.modifyConfiguration':'Modify Configuration',
  'field.modifySuccess':'Modification Applied',     // @2024/01/10 Add
  'field.modifyError':'Modification Error',         // @2024/01/10 Add
  'field.nothingChanged':'Nothing Changed',         // @2024/01/15 Add
  'field.neighboringBSList':'Neighboring BS List',
  'field.config':'Field Configuration',             // @12/12 Add
  'field.edit':'Field Editing',                     // @2024/01/11 Add
  'field.fieldImageEdit':'Field Image Editing',
  'field.editInfo':'Field Information',             // @2024/01/11 Add
  'field.northBound':'North Boundary',              // @2024/01/11 Add
  'field.southBound':'South Boundary',              // @2024/01/11 Add
  'field.lat':'Latitude',                           // @2024/02/02 Add
  'field.westBound':'West Boundary',                // @2024/01/11 Add
  'field.eastBound':'East Boundary',                // @2024/01/11 Add
  'field.lng':'Longitude',                          // @2024/02/02 Add
  //'field.notificationNum':'Notification Number',    // @2024/01/11 Add
  'field.notificationNum':'Notification',    // @2024/01/11 Add
  'field.fieldBoundsEx':'Field Boundary Diagram',   // @2024/01/18 Add
  'field.editBSs':'Adjust BS Field Allocation',     // @2024/01/28 Add
  'field.cancelEditBSs':'Cancel',                   // @2024/01/28 Add
  'field.selectBSs':'Choose BSs in field',          // @2024/01/18 Add
  'field.confirmFieldEditField': "Confirm to make these field changes ?",  // @2024/01/28 Add
  'field.showFieldBS': 'Show Field-Only BS',
  'field.showAllBS': 'Show All BS',

  
  'field.fieldImageUpload':'Upload Field Image',      // @2024/02/23 Update
  'field.fieldImageNotUploaded': 'Field image not yet uploaded ( e.g., Indoor or outdoor maps )',  // @2024/02/23 Update
  'field.fieldImageNotUploaded1': 'Field image not yet uploaded',      // @2024/02/23 Add
  'field.fieldImageNotUploaded2': '( e.g., Indoor or outdoor maps )',  // @2024/02/23 Add
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
  'field.apply':'Apply',            // @2024/02/22 Add
  'field.close':'Close',            // @2024/02/22 Add
  'field.applyReminder':'Reminder', // @2024/02/22 Add

  'field.report':'Field Reports',                   // @12/12 Add
  'field.reportPM':'Performance (PM)',              // @12/12 Add
  'field.reportFM':'Alarms (FM)',                   // @12/12 Add
  'field.optim':'Field Optimization',               // @12/12 Add
  'field.optimSON':'SON Calculation',               // @12/12 Add

  'field.modeSwitch': 'Mode Switch',  // @2024/04/12 Add
  'field.mapModel':'Field Map',       // @2024/04/12 Update
  'field.map':'Map', 
  'field.bsList':'BS List',           // @12/12 Add

  'field.bsAntennaCoord':'BS Antenna Coordinates',  // @12/13 Add
  'field.BSstatus':'BS Status',                     // @12/13 Add
  'field.bsAlarm':'Alarm',                          // @12/13 Add
  'field.legend_all-in-one_bs':'All-in-one BS',     // @12/28 Add
  'field.legend_dist_bs':'Disaggregated BS',         // @2024/04/18 Update

  'field.selectOptimizationParameters': 'Select Optimization Parameters',
  'field.selectCalculationParameters': 'Select Calculation Parameters',

  'field.setCCO': 'Set CCO',
  'field.ccoSettings': 'CCO Settings',
  'field.maxCoverageRange': 'Maximum Coverage Range',
  'field.maxSINR': 'Maximum SINR',

  'field.setANR':'Set ANR',
  'field.anrSettings': 'ANR Settings',
  'field.minSignalPower': 'Minimum Signal Power',

  'field.setPCI':'Set PCI',
  'field.pciSettings': 'PCI Settings',
  'field.pciMin': 'Minimum PCI',
  'field.pciMax': 'Maximum PCI',

  'field.sonCalculate':'Calculate',
  'field.clearAndReset': 'Clear and Reset',


  'field.calculationCategories': 'Calculation Categories',
  'field.calculationResults': 'Calculation Results',
  'field.originalTxPower': 'Original Tx Power',
  'field.newTxPower': 'New Tx Power',

  'field.fieldPerformance': 'Field Performance',
  'field.fieldPerformanceAnalysis': 'Field Performance Analysis',

  'field.originalNeighborBS': 'Original Neighbor BSs',
  'field.newNeighborBS': 'New Neighbor BSs',
  
  'field.originalPCI': 'Original PCI',
  'field.newPCI': 'New PCI',
  
  'field.optimizationType': 'Optimization Type',
  'field.optimizationResult': 'Optimization Result',

  'field.applySON': 'Apply',
  'field.cancelSON': 'Cancel',
  "field.confirmApplySonField": "Apply this calculation for optimization ?", // @2024/04/12 Add


  'field.open': 'Open',
  'field.anrMode': 'Minimum SINR',
  'field.anrThreshold': 'Minimum SINR Threshold',
  'field.sinr': 'SINR',

  'field.optimize': 'Optimize',
  'field.calculating': 'Calculating',

  
  // BS Management ( 基站管理 )
  'BS.list':'BS List',
  'BS.createWindowTitle':'BS Creation',
  'BS.create':'Create BS',

  'BS.setBSName': 'Set BS Name',
  'BS.enterBSName': 'Please Enter BS Name',
  'BS.nameExists': 'This name already exists',
  'BS.nameUsedInAccount': 'This BS name already used in this account',


  'BS.setBSType': 'Set BS Type',
  'BS.selectBSType': 'Please Select Base Station Type',
  'BS.selectDUNumber': 'Please Select DU Number',
  'BS.selectRUNumber': 'Please Select RU Number',

  'BS.setNEAndCoordinates': 'Set NE and Coordinates',
  'BS.duNumber': 'DU Number',
  'BS.cuNumber': 'CU Number',
  'BS.ruNumber': 'RU Number',
  'BS.gpsLocation': 'GPS Location',
  'BS.selectIntegratedNE': 'Select NE',
  'BS.selectNE': 'Please Select a NE',
  'BS.selectCUNE': 'Select CU',
  'BS.requiredCU': 'Please Select a CU',
  'BS.selectDUNE': 'Select DU',
  'BS.requiredDU': 'Please Select a DU',
  'BS.selectRUNE': 'Select RU',
  'BS.requiredRU': 'Please Select an RU',
  'BS.setCU': 'Set CU',
  'BS.setDU': 'Set DU',
  'BS.setRU': 'Set RU',
  'BS.setGPSLocation': 'Set GPS Location',
  'BS.setConnectedDU': 'Set Connected DU',
  'BS.selectConnectedDU': 'Please Select a DU to Connect',
  
  'BS.setLatitude':'Set Latitude',
  'BS.setLongitude':'Set Longitude',


  'BS.setBSLocationDescriptionAndUploadParameters': 'Set BS Location Description and Upload BS Parameter File',
  'BS.generateParameterSampleFile': 'Generate BS Parameter Sample File (.xlsx)',
  'BS.generateParameterSampleDownload': 'Sample Download (.xlsx)',
  'BS.uploadParameterFile': 'Upload BS Parameter File (.xlsx)',
  'BS.ex': "ex",
  'BS.enterBSLocationDescription': 'Please Enter BS Location Description',
  'BS.uploadBSParameterFile': 'Please Upload a BS Parameter File',
  'BS.uploaded': 'Uploaded',
  'BS.notUploaded': 'Not Uploaded',
  'BS.setupComplete': 'BS Setup Complete.', 

  'BS.name':'BS Name',
  'BS.type':'BS Type',
  'BS.all-in-one':'All-in-one', // @2024/04/18 Add
  'BS.dist':'Disaggregated',    // @2024/04/18 Add
  'BS.cellCount':'Cell Count',
  'BS.description':'Description',
  'BS.belongField':'Affiliated Field',
  'BS.status':'BS Status',
  'BS.view':'View',
  'BS.delete':'Delete',
  'BS.confirm_del':'Confirm to Delete Basestation',

  'BS.info':'BS Detailed Information',
  'BS.alarmLatestUpdateTime': 'Latest Update Time',
  'BS.alarmLatestUpdateTimeRangeEnd':'～',    
  'BS.processingFmStatus': 'Processing Status',



  // 基本訊息區
  'BS.editSettings':'Edit Settings',
  'BS.Latitude': 'Latitude',
  'BS.Longitude': 'Longitude',
  'BS.apply':'Apply', 

  'BS.bsAntennaCoord':'BS Antenna Coordinates',
  'BS.ruNeName':'NE Name ( RU )',
  'BS.latLong': 'Latitude and Longitude',
  'BS.lastHeartbeatTime': 'Last Heartbeat Time',
  'BS.No':'No.',
  'BS.neName':'NE Name',
  'BS.neType':'NE Type',
  'BS.neModel':'NE Model',
  'BS.neSFversion':'Software Version',

  // 網元拓樸區
  'BS.topology':'BS Topology',

  'BS.parameters':'BS Parameters',
  'BS.basic': 'Basic',
  'BS.advanced': 'Advanced',
  'BS.allSyncOptions': 'All Sync Options',
  'BS.syncAction': 'Sync Action',
  'BS.syncWithNMSSettings': 'Sync with NMS Settings',
  'BS.syncWithBSSettings': 'Sync with BS Settings',
  'BS.nmsSettingValue': 'NMS Setting Value',
  'BS.bsSettingValue': 'BS Setting Value',  
  'BS.parametersItem': 'Parameters',
  'BS.mismatch': 'Mismatch',
  'BS.mismatchYes': 'Yes',
  'BS.mismatchNo': 'No',


  'BS.neighborBsList':'Neighbor BS List',
  'BS.alarms':'BS Alarms',
  'BS.neList':'NE List',
  'BS.performance':'BS Performance',
  'BS.ip':'IP Address',
  'BS.neStatus':'Status',
  'BS.port':'Port',
  'BS.edit':'Edit',

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
  'resolved':'Ended',         //Modify by Charles (Resolved->Ended)
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
  'modify_content': 'Modify Software Content',
  'upload_file':'Select the file to upload',
  
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
  'cm.info':'NE Detail Information',
  'cm.apply':'Apply',
  'cm.file':'File Management',
  'cm.path':'Path',
  'cm.download':'Download',
  'cm.container': 'If you update the single container, you will lose all other unsaved changes. Are you sure you want to continue?',
  'cm.notice' : 'Notice',
  'cm.applysoftware' : 'Software Apply Success',
  'cm.restart' : 'Reboot',

  // Account Management
  'user_account':'User',
  'key_account':'Password',
  'role_account':'Role',
  'expired_time_account':'Expired Time',
  'addaccount':'Create Account',
  'delaccount':'Delete Account',
  'confirm_del_acc':'Confirm to Delete Account',

  // Schedule Management @2024/03/18 Update
  'sm.select_type':'Schedule Type',
  'sm.select_field':'Field',
  'sm.createWindowTitle':'Schedule Creation',
  'sm.th_create':'Create Schedule',
  'sm.th_time':'Schedule Time',
  'sm.scheduledExecutionTime': 'Scheduled Run Time',
  'sm.scheduledExecutionTimeTo':'～',   
  'sm.scheduleType': 'Schedule Type',
  'sm.th_type':'Type',
  'sm.th_state':'State',
  'sm.th_download':'Download Report',
  'sm.th_view':'View',
  'sm.th_delete':'Delete',
  'sm.smDownload':'Download report of this schedule',
  'sm.view_detail':'View this schedule in detail',
  'sm.delItem':'Delete this schedule',
  'sm.sfReport':'Software Management Report',    // tickettype = 4
  'sm.fmReport':'Fault Management Report',       // tickettype = 3
  'sm.pmReport':'Performance Management Report', // tickettype = 2
  'sm.caReport':'Config Audit Report',           // tickettype = 1
  'sm.sfUpdate':'Software Update',               // tickettype = 0

  'sm.jobPartialSuccessString':'Partially Success', // ticketstatus = 5
  'sm.jobFailString':'Failed',                      // ticketstatus = 4
  'sm.jobSuccessString':'Success',                  // ticketstatus = 3
  'sm.jobOnGoingString':'On Going',                 // ticketstatus = 2
  'sm.jobSchedulingString':'Scheduling',            // ticketstatus = 1 | 0
  'sm.jobDailyString':'Daily',                      // executedtype = 1
  'sm.jobWeeklyString':'Weekly',                    // executedtype = 2
  'sm.jobMonthlyString':'Monthly',                  // executedtype = 3

  'sm.confirm_del':'Confirm to Delete this Schedule',

  'sm.info':'Schedule Information',
  'sm.detailInfo':'Detail Information', 
  'sm.executeField': 'Execute Field',

  'sm.contentInfo': 'Content Information',
  'sm.periodicExecution': 'Periodic Execution',
  'sm.notPeriodicExecution': 'None',
  'sm.reportDataRange': 'Report Data Range',


  // tickettype = 0
  'sm.neCurrentVersion': 'Current Version',
  'sm.neTargetVersion': 'Target Version',

  // tickettype = 1
  'sm.snapshotAuditTitle': 'Snapshot Name for Audit',

  // tickettype = 2
  'sm.startDate': 'Start Date',
  'sm.endDate': 'End Date',
  'sm.kpiType': 'KPI Type',
  'sm.custom': 'Custom',
  'sm.kpiName': 'KPI Name',
  'sm.kpiDescription': 'KPI Description',
  'sm.kpiFormula': 'KPI Formula',

  // 執行結果區
  'sm.executionResult': 'Execution Result',
  'sm.NeName':'NE Name',
  'sm.targetNE': 'Target NE',
  'sm.targetNeID': 'Target NE ID',
  'sm.time': 'Time',
  'sm.updateStatus': 'Update Status',
  'sm.target': 'Target',

  
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
  'UserLog.Export':'Export User Logs',               // @2024/03/13 Add by yuchen

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
  'NElog.ExportXLSX':'Export NE Logs to .xlsx', // @11/23 Add by yuchen
  'NElog.Export':'Export NE Logs',              // @2024/03/13 Add by yuchen


  // Slice Management ( 切片管理 )
  'slice.info':'Slice Detailed Information',
}
