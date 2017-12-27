/***********************************
* @文件描述：关于手机短信模板的js
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
	var fireScene = getFieldTrueValue("FIRESCENE");
	if(fireScene == "0900"){        //判断触发场景是否为“日终定时触发”
		setFieldDisplay("FIREBASETIME", true);
		setFieldDisplay("FIREPERIOD", true);
	}else{
		setFieldDisplay("FIREBASETIME", false);
		setFieldDisplay("FIREPERIOD", false);
	}
}

function doChange_Super(obj){
//////对于所有操作，页面元素发生改变是要执行的代码在此完成//////////
	if(obj.name == "FIRESCENE"){
		var fireScene = getFieldTrueValue("FIRESCENE");
		if(fireScene == "0900"){        //判断触发场景是否为“日终定时触发”
			setFieldDisplay("FIREBASETIME", true);
			setFieldDisplay("FIREPERIOD", true);
		}else{
			setFieldDisplay("FIREBASETIME", false);
			setFieldDisplay("FIREPERIOD", false);
		}
	}
}