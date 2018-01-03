/***********************************
* @文件描述：在字典表设置模块中，与修改字典表相关的js
*************************************/

function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于新增操作，页面加载时要执行的代码在此完成//////////

	var dataType = document.getElementById("detailId_DATATYPE").value;
	/**
	if(dataType=="" || dataType==null){  //判断数据类型是否为空
		setFieldDisplay('SUPERDIC',false);
		setFieldValue("SUPERDIC","");
	}else{
		selectSjzd(dataType);
	}
	*/
	setDatatypeDesc(dataType);
}

function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于新增操作，页面元素发生改变是要执行的代码在此完成//////////
	if(obj.name=='DATATYPE'){
		var dataType = document.getElementById("detailId_DATATYPE").value;
		/**
		if(dataType!=""){
			setFieldDisplay('SUPERDIC',true);
			selectSjzd(dataType);
		}else{
			setFieldDisplay('SUPERDIC',false);
		}
		setFieldValue("SUPERDIC","");
		*/
		setFieldValue("DATATYPEDESC","");
		setDatatypeDesc(dataType);
		validDataKey();
	}
	
	if(obj.name == 'DATAKEY'){
		validDataKey();
	}
}

function validDataKey(){
	var dataType = document.getElementById("detailId_DATATYPE").value;
	var dataKey = document.getElementById("detailId_DATAKEY").value;
	var preDataKey = document.getElementsByName("pre#DATAKEY")[0].value;
	if(dataKey == preDataKey){
		return;
	}
	if(dataType != "" && dataKey != ""){
		var url = rootPath+'/fmp/FrameCommonBiz/ValidCheck?sqlMapId=SDic.isDataKeyData&DATATYPE='+dataType+'&DATAKEY='+dataKey;
		XMLHttp.urlSubmit(comUrl(url),backCall_getDataKeyData);
		function backCall_getDataKeyData(msg){
			if(msg !="0" && msg != null){
				showMessage("MSG1215");//该数据类型已存在此数据键，请您重新确认！
				setFieldValue("DATAKEY","");
			}
		}
	}
}

function selectSjzd(dataType){
	var url = rootPath + "/fmp/SDicBiz/GetDicDataByType?opMode=update&DATATYPE="+dataType;		
	XMLHttp.urlSubmit(comUrl(url),backCall_getDicData);
}

function setDatatypeDesc(dataType){
	var url = rootPath + "/fmp/SDicBiz/GetDicTypeDesc?DATATYPE="+dataType;
	XMLHttp.urlSubmit(comUrl(url),backCall_getDicTypeDesc);
}

function backCall_getDicTypeDesc(dicTypeDeStr){   //获取与数据类型相关的数据类型描述
	if(dicTypeDeStr != ""){
		setFieldValue("DATATYPEDESC",dicTypeDeStr);
	}
}

function backCall_getDicData(dicDataStr){   //根据数据类型自动生成对应的上级字典下拉框选项
	document.getElementById("detailId_SUPERDIC").options.length = 0;	
	document.getElementById("detailId_SUPERDIC").options.add(new Option("-- 请选择 --",""));
	var DataValue = document.getElementById("detailId_DATAVALUE").value;	
	var DataKey = document.getElementById("detailId_DATAKey").value;	
	var dataValue;
	var dataKey;
	var arr = dicDataStr.split('#;#');
	var brr=new Array();
	for (var i=0; i<arr.length-1; i++){
		brr[i] = arr[i].split('#=#');
		dataKey = brr[i][0];
		dataValue = brr[i][1];
		if(dataValue!=DataValue || dataKey!=DataKey){
			if(dataValue != "" && dataValue != null){
				document.getElementById("detailId_SUPERDIC").options.add(new Option(dataValue,dataKey)); 
			}
		}
	}

	var gfo = getFieldObject('SUPERDIC').oldvalue; 
	var selectObj = document.getElementById("detailId_SUPERDIC");
	for(var i=0;i<selectObj.options.length;i++){
		if(selectObj.options[i].value==gfo){   //判断下拉框选项值
			selectObj.options[i].selected=true;   //选中其下拉框选项
		}
	}
}