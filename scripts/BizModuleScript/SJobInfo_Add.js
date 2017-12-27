/***********************************
 * @文件描述：与定时任务调度相关的js
 *************************************/
function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于新增操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于新增操作，页面元素发生改变是要执行的代码在此完成//////////

	if(obj.name == 'EXECUTETIME' || obj.name == 'EXECUTECYCLE'){
		var executeTime = document.getElementById("detailId_EXECUTETIME").value;
		var executeCycle = document.getElementById("detailId_EXECUTECYCLE").value;
		if(executeTime.length == 19 && executeCycle != ""){
			if(!IsDateTime(executeTime)) {
				showMessage("运行时间格式不正确，正确格式为 YYYY-MM-DD hh:mm:ss");
				setFieldValue("TIMEEXPRESSION","");
				return;
			}
			var date = new Date();
			var currMonth = date.getMonth() + 1;
			var currDate = date.getDate();
			currMonth = (currMonth < 10) ? ('0' + currMonth) : currMonth;
			currDate = (currDate < 10) ? ('0' + currDate) : currDate;
			var currTime = date.getFullYear() + "-" + currMonth + "-" + currDate +" " 
			              + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
			if(dateConvDig(executeTime) > dateConvDig(currTime)){
				var timeExpression;
				var year = executeTime.substring(0,4);
				var month = executeTime.substring(5,7);
				var day = executeTime.substring(8,10);
				var hour = executeTime.substring(11,13);
				var minute = executeTime.substring(14,16);
				var second = executeTime.substring(17,19);
				if(month.charAt(0) == "0"){
					month = month.charAt(1);
				}
				if(day.charAt(0) == "0"){
					day = day.charAt(1);
				}
				if(minute.charAt(0) == "0"){
					minute = minute.charAt(1);
				}
				if(second.charAt(0) == "0"){
					second = second.charAt(1);
				}
				if(executeCycle == "1"){              //判断运行周期是否为“每分钟”
					//timeExpression = "0 * " + hour + " " + day + " " + month + " ? " + year;
					timeExpression = second+" * * * * ? *";
				}else if(executeCycle == "2"){        //判断运行周期是否为“每时”
					//timeExpression = "0 " + minute + " * " + day + " " + month + " ? " + year;
					timeExpression = second+" " + minute + " * * * ? *" ;
				}else if(executeCycle == "3"){        //判断运行周期是否为“每天”
					//timeExpression = "0 " + minute + " " + hour + " * " + month + " ? " + year;
					timeExpression = second+" " + minute +" "+  hour + " * * ? *";
				}else if(executeCycle == "4"){        //判断运行周期是否为“每月”
					//timeExpression = "0 " + minute + " " + hour + " " + day + " * ? " + year;
					timeExpression = second+" " + minute + " " + hour + " " + day + " * ? *";
				}
				setFieldValue("TIMEEXPRESSION",timeExpression);
			}else{
				setFieldValue("TIMEEXPRESSION","");
				showMessage("MSG1437");//运行时间必须大于当前时间
			}			
		}
	}
}

/**  
 * 点击任务排斥，打开checkbox pop窗口
 */   
function openModleDataRangeCheckPop(id,fid,tableModelId,fieldId,fieldName){
	var dataObject = new Object(); 
	dataObject.fieldId = fieldId;
	dataObject.fieldName = fieldName;
	var jobCode = document.getElementById("detailId_JOBCODE").value;

	//在新增页面时调用此url，不设置过滤条件
	var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkSinPop&tableModelId="+tableModelId+"&checkBoxMode=true";
	openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");

	dataObject.backCall=function(){
		if(dataObject.dispValue!=null&&dataObject.trueValue!=null){		   
			document.getElementById('detailId_'+id).value=dataObject.trueValue;
			document.getElementById('disp_detailId_'+id).value=dataObject.dispValue;
			document.getElementById("detailId_"+fid).value=dataObject.dispValue;
		}
	};
}