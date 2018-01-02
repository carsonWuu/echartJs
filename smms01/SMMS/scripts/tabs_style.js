function selectTag(showContent, selfObj, reload) {
	//操作标签
	var tag = document.getElementById("tags").getElementsByTagName("li");
	var taglength = tag.length;
	for (i = 0; i < taglength; i++) {
		tag[i].className = "";
	}
	selfObj.parentNode.className = "selectTag";
	var contentDiv = document.getElementById(showContent);
	if (reload){
		contentDiv.style.display = "none";
		contentDiv.childNodes[0].childNodes[0].src=contentDiv.childNodes[0].childNodes[0].src;
	}	
	//操作内容
	for (i = 0; j = document.getElementById("tagContent" + i); i++) {
		j.style.display = "none";
	}
	contentDiv.style.display = "block";
}

/**
 * 通过id查询表的某个记录是否存在,如果存在，返回"1",不存在,返回"2"
 */
function getVOExist(id,url){
	var xmlHttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlHttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	 var checkObj=document.getElementById(id);
	 if(!checkObj){
		 showMessage("MSG0034");//要检查的对象缺少id,请联系管理员！
	  return;
	 }
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var xmlTxt = xmlHttp.responseText;
            var backStr=xmlTxt.replace(/(^\s*)|(\s*$)/g, "");
            //alert(backStr);
			if("oldExist"==backStr){
				showMessage("MSG0035",checkObj.value);//"%s"已被删除，请通知管理员恢复数据！
				   if(checkObj){
					   checkObj.value="";
					   checkObj.focus();  
				   }
			}else if("newExist"==backStr){
				showMessage("MSG0036",checkObj.value);//"%s"已经存在,请重新输入！
				   if(checkObj){
					   checkObj.value="";
					   checkObj.focus();  
				   }
			}else if("Success"==backStr){
			}else{
				showMessage("MSG0037");//未知的错误！
			}
		}
	}
	//alert(url+"?id="+checkObj.value);
	xmlHttp.open("POST", url+"?id="+checkObj.value, true);
	xmlHttp.send();	
}

/***********************************
* @文件描述：
* @版权所有：
* @功能说明：循环判断页面所有的非空ids:"a,b,c" same to desc
* @作者    ：岑后文
* @创建日期：2011.10.9
* @版本    ：v1.0
* @修改记录：
* @修改说明：
* @修改人  ：
* @修改日期：
*************************************/
function checValidForNull(ids,desc)
{
	var msg="";
    var arr=ids.split(",");
    var nameArr=desc.split(",");
   if(arr){
      for(var i=0;i<arr.length;i++){
    	 // setObjEvens("detailId_"+arr[i],"time");
    	 var obj=document.getElementById("detailId_"+arr[i]);
	     if(obj){
		    if(obj.value=="")
			    msg+=nameArr[i]+"不能为空\n";
		 } 	 
	  }
   }
   if(msg!=""){
	   showMessage(msg);
	   return false;
  }
	return true;
}