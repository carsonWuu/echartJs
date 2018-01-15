/***********************************
* @文件描述：
*************************************/
function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于新增操作，页面加载时要执行的代码在此完成//////////
  if (getFieldTrueValue("IS_FORCE_CLOSE") == "1"){
	  setFieldValue("FINAL_RECTIFY_SUGGEST","2");
	  setFieldReadOnly("FINAL_RECTIFY_SUGGEST",true);
  }else{
	  setFieldReadOnly("FINAL_RECTIFY_SUGGEST",false);
  }
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于新增操作，页面元素发生改变是要执行的代码在此完成//////////
  
  if(obj.name == 'IS_FORCE_CLOSE'){
	  if (getFieldTrueValue("IS_FORCE_CLOSE") == "1"){
		  setFieldValue("FINAL_RECTIFY_SUGGEST","2");
		  setFieldReadOnly("FINAL_RECTIFY_SUGGEST",true);
	  }else{
		  setFieldReadOnly("FINAL_RECTIFY_SUGGEST",false);
	  }	  
  }
}
