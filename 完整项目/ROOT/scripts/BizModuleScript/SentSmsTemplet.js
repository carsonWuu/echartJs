/***********************************
 * @文件描述：发送短信的js
 *************************************/
////本方法不能删除，也不能修改，因为此函数作为调用函数，并且有可能被覆盖////
function doOnload(){
  doOnload_Super();
//请不要在此写任何业务逻辑
}

////本方法不能删除，也不能修改，因为此函数作为调用函数，并且有可能被覆盖////
function doChange(obj){
  doChange_Super(obj);
//请不要在此写任何业务逻辑
}
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


function doOnload_Super(){
////////对于所有操作，页面加载时要执行的代码在此完成//////////
	document.getElementById('DoAddSave').style.display = "none";
	addButton("DoAddSave","发送短信","sentMessage()");
}

function doChange_Super(obj){
////////对于所有操作，页面元素发生改变是要执行的代码在此完成//////////
}
var tempParamSqlId = "";                   //定义模板参数SQL全局变量

function openTelePhonePop(){               //打开手机号码pop窗口
	if(tempParamSqlId != ""){              //判断模板参数SQL是否不为“空”
		var dataObject = new Object();
		dataObject.fieldId = "RID";
		dataObject.fieldName = "TELEPHONE";
		var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkSinPop&tableModelId=SMobilePop&checkBoxMode=true&listSqlId="+tempParamSqlId;
		openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");

		dataObject.backCall=function(){
			if(dataObject.dispValue!=null && dataObject.trueValue!=null){		   
				document.getElementById('detailId_TELEPHONE').value = dataObject.trueValue;
				document.getElementById('disp_detailId_TELEPHONE').value = dataObject.dispValue;
			}
		};
	}else{
		if(document.getElementById("SMSTEMPCODE").value != ""){
			showMessage("MSG1216");//该模板名称对应的模板参数SQL为空，请您重新确认！		
		}else{
			showMessage("MSG1217");//模板名称为空，请先选择模板名称！			
		}
	}
}

function getSmsTempletMessage(map){
	if (map.data["SMSTEMPCODE"] == undefined) {              // 直接关闭弹出窗口时，页面会显示undefined
		map.data["SMSTEMPCODE"] = document.getElementById("SMSTEMPCODE").value;
	}
	
	if(map.data["SMSTEMPNAME"] != undefined){      
		setFieldValue("SMSTEMPCODE", map.data["SMSTEMPCODE"],map.data["SMSTEMPNAME"]);          // 返回模板编号
	}

	if(map.data["TEMPPARAMSQLID"] != undefined){   
		tempParamSqlId = map.data["TEMPPARAMSQLID"];          //返回模板参数SQL
	}
	
	if (map.data["MSGTEMP"] != undefined) {
		setFieldValue("MSGTEMP", map.data["MSGTEMP"]);        // 返回短信模板内容
	}
}
function sentMessage(){                                       //发送短信
	var msgTemp = document.getElementById('detailId_MSGTEMP').value;
	var ridStr = document.getElementById('detailId_TELEPHONE').value;
	var textTelePhone = document.getElementById('detailId_TELEPHONE2').value;
	if(ridStr == "" && textTelePhone == ""){  //判断手机号码是否为“空”
		showMessage("MSG1218");//手机号码不能为空，请选择填写手机号码1或者手机号码2！
		return;
	}
	if(msgTemp == null || msgTemp == ""){                     //判断短信内容是否为“空”
		showMessage("MSG1219");//短信内容不能为空，请选择填写！
		return;
	}
	if(textTelePhone != null && textTelePhone != ""){
		//验证手机号码2格式是否正确
		var telephoneArr = textTelePhone.split(",");
		for(var i = 0;i < telephoneArr.length;i++){
			var telephone = telephoneArr[i];
			var reg = new RegExp(/^0*(1)\d{10}$/);
			if(!reg.test(telephone)){
				showMessage("MSG1220");//手机号码2格式错误,多个号码之间请用逗号隔开！
				return;
			}
		}
	}
	var url = rootPath+"/fmp/mobileSms/MmAccountInfoBiz/SentSmsMessage?tableModelId=SentSmsTemplet&ridStr="
	                  +ridStr+"&textTelePhone="+textTelePhone+"&MSGTEMP="+msgTemp+"&tempParamSqlId="+tempParamSqlId;
	comAjax(fmpEncodeURI(url),callBackMsg);
	function callBackMsg(msg){
		if(msg == "success"){
			showMessage("MSG1221");//发送短信成功！
		}else{
			showMessage("MSG1222");//发送短信失败！
		}
	}
}