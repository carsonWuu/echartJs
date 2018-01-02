/***********************************
* @文件描述：
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

}

function doChange_Super(obj){
////////对于所有操作，页面元素发生改变是要执行的代码在此完成//////////

}

function dateConvDig(str){                  //将日期转换为整型
	var numerical = 0;
	if(str != null && str != ""){
		numerical = parseInt(str.substring(0,4) + str.substring(5,7) + str.substring(8,10) + str.substring(11,13) + str.substring(14,16) + str.substring(17,19));			
	}
	return numerical;
}

function IsDateTime(str){
    str = str.trim();
    if(str.length!=0){
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        var r = str.match(reg);
        if(r==null) {
        	//alert('对不起，您输入的日期格式不正确!'); //请将“日期”改成你需要验证的属性名称!
        	return false;
        } else {
        	return true;
        }
    }
}


