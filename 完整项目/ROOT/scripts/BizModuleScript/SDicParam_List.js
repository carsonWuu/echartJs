/***********************************
 * @文件描述：与系统字典参数设置相关的js
 *************************************/

function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}

function addDicParamData(){      //新增
	var newrid = addDataInUpdateListMode();   //得到一个newrid
	//给列表设值
	setDataListValue(newrid,"DATAKEY", "");
	setDataListValue(newrid,"DATAVALUE", "");
	setDataListValue(newrid,"DATATYPE", "CRD_BIZPARAM");
}