function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}


function openApvPop(obj){
	  var objrid = obj.id.substring(3);
	  var rid =obj.id.substring(obj.id.lastIndexOf("_")+1);
	  var useridStr = getDataListTrueValue(rid,"APPROVERCONDI");
	  var userCondition ="";
	  if(useridStr !="null" && useridStr !="" && useridStr !=null){
		  var useridArr = useridStr.split(";");		  
		  for(var i=0;i<useridArr.length; i++){
			  if(useridArr[i] !='' && useridArr[i] !=null ){
				  userCondition += " user1.USERID= '"+useridArr[i]+"' or ";
			  }
		  }		   
	  }
	  if(userCondition !=""){
		  userCondition = userCondition.substring(0, userCondition.lastIndexOf('or'));		  
		  userCondition = " and ( "+userCondition+" )";        //会签审批人过滤条件
	  }else{
		  //若无配置会签人员，则1=2显示列表为空，1=1显示所有用户，默认为空
		  userCondition = " and 1=2 ";
	  }
	  
	  userCondition += getDetailListExistCondition("APPROVER","user1.USERID");
	  var dataObject = new Object();
	  dataObject. sid= "USERID";
	  dataObject. sname= "USERNAME";
	  dataObject.trueValue= null;
	  dataObject.dispValue= null;
	  var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=singleVPop&tableModelId=SUser&freezeCondition="+userCondition;
	  openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
	  dataObject.backCall=function(){
		  if(dataObject.trueValue != null){
			  document.getElementById("detailId"+objrid).value = dataObject.trueValue;
			  document.getElementById("disp"+objrid).value = dataObject.dispValue;
		  }
	  };
}


function saveMettingApvDataList(){
	/**
	 * 1，保存列表
	 * 2，计算会签通过率，判断会签通过率是否通过  会签通过率=同意人数/（不同意人数+同意人数）*100
	 * 
	 */
	
	if(saveDataList()){		
		var totalNum = 0;
		var presenceNum = 0;
		if(getInitRidsFromDatalist() != ''){
			var initRidsArr = getInitRidsFromDatalist().split(',');
			for(var i=0 ;i<initRidsArr.length; i++){
				if(initRidsArr[i]!=''){
					var isAgree =getDataListTrueValue(initRidsArr[i],'APPROVERESULT');
					if(isAgree == '1'){
						presenceNum++;
						totalNum++;
					}else if(isAgree == '2'){
						totalNum++;
					}
				}
			}
		}
		if(addRowIds != ''){
			var addRowIdsArr = addRowIds.split(',');
			for(var i=0 ;i<addRowIdsArr.length; i++){
				if(addRowIdsArr[i]!=''){
					var isAgree =getDataListTrueValue(addRowIdsArr[i],'APPROVERESULT');
					if(isAgree == '1'){
						presenceNum++;
						totalNum++;
					}else if(isAgree == '2'){
						totalNum++;
					}
				}
			}
		}
		var passrateStr = parent.document.getElementById('passrate').value;
		if(passrateStr ==''){
			passrateStr = '0.1'; //若未设会签通过率则将其设为0.1.防止出现全数选择不同意而最后结果计算为同意现象
		}
		var passrate = parseFloat(passrateStr);
		if(totalNum == 0){
			parent.document.getElementById('radio_refuse').checked =true;
		}else if(presenceNum/totalNum >= passrate/100){
			parent.document.getElementById('radio_agree').checked =true;
		}else{
			parent.document.getElementById('radio_refuse').checked =true;
		}
	}

}