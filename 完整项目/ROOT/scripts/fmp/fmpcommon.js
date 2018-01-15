var pub_isDebugMode = false;   //是否JS调试模式
/**
 * 打开弹出式窗口的统一方法
 */
function openWindow(url,title,left,top,width,height,resizable,scrolling,z_index,winStyle){
/*	if (target != "_self"){
		if (url.indexOf(rootPath)!=0){	//url不是以根路径开头
			url = getUrlPath()+url; 		//加上默认命名空间路径
		}
		//window.open(url,'_blank','height=400,width=800,left=100,top=10,scrollbars=yes');
		var freezeParams = 'height=860, width=1024, top=0, left=0, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no';
		if (target == null){
			target = '_blank';
		}
		if (params!=null){
			params = params +","+freezeParams;

		}else{
			params = freezeParams;
		}	
		//var openUrl = "title="+fmpEncodeURI(title)+"&open="+fmpEncodeURI(fmpEncodeUrlParam(fmpStrEncode(url)));
		//url=rootPath+"/fmp/FrameBiz/OpenWindow?open="+str2asii(url,RANDOMID)+"&title="+str2asii(title,RANDOMID);//
	}
	return window.open(url,target,params);
	 */
	if(title == null){
		title ="";
	}
	showDivWindow(url,null,title,left,top,width,height,resizable,scrolling,z_index,winStyle);
}

/**
 * 打开打印窗口的方法
 * @param url
 * @param title
 * @return
 */
function openPrintDivWindow(url,title,left,top,width,height){
	(title)? title = title : title = "";
	var topWindow = getMainWindow();
	var dwp = divWinPath+","+topWindow.divCount;
	var divCount = topWindow.createWindowDiv(title,window,left,top,width,height);
	topWindow.frames['ifData'+divCount].location.href =url + "&divWinPath="+dwp+"&currDivId="+divCount+"&parentDivId="+currDivId;
}

/**
 * 获取弹出窗口DIV对象
 * @return
 */



function showDivWindow(url,dataObject,title,left,top,width,height,resizable,scrolling,z_index,winStyle){
	var topWindow = getMainWindow();
	var dwp = divWinPath+","+topWindow.divCount;
	var divCount = topWindow.createWindowDiv(title,window,left,top,width,height,resizable,scrolling,z_index,winStyle);
	var iframe = topWindow.frames['ifData'+topWindow.divCount];
	topWindow.dataObject = dataObject;
	iframe.location.href =url + "&divWinPath="+dwp+"&currDivId="+divCount+"&parentDivId="+currDivId;

}
	

/**
 * 打开模态化窗口的统一方法
 * @param url
 * @param dataObject
 * @param params
 * @return
 */
function openModalDialog(url,dataObject,params){
	var kvJson="";
	var paramArr = params.split(";");
	for (var i=0;i<paramArr.length;i++){
		var kvs = paramArr[i];
		if (kvs != ""){
			var kvArr = kvs.split(":");
			if (kvArr.length == 2){
				kvJson += ","+kvArr[0]+":'"+kvArr[1].replace(/px/g,"")+"'";
			}
		}
	}

	if (kvJson.length>0){
		kvJson = kvJson.substring(1);
	}
	var paramsObj = eval('({'+kvJson+'})');
	//alert(kvJson);
	//var paramsObj = jQuery.parseJSON('{'+kvJson+'}');
	//alert(obj.dialogLeft);


	if (url.indexOf("?") > 0) 
	{ 
		url += "&winType=divWin"; 
	} 
	else 
	{ 
		url += "?winType=divWin"; 
	} 		
 
	if(url.indexOf("randnum=")==-1){
		url += "&randnum=" + Math.random(); 
	}
 
	var _title = paramsObj.title;
	if(_title == undefined || _title == "undefined" || _title == "" ){
		_title = "请选择";
	}
	paramsObj.dialogLeft = paramsObj.dialogLeft - 0;
	showDivWindow(url,dataObject,_title,paramsObj.dialogLeft,paramsObj.dialogTop,paramsObj.dialogWidth,paramsObj.dialogHeight,paramsObj.resizable,paramsObj.scrolling,paramsObj.z_index,paramsObj.winStyle);  //title,left,top,width,height


	//	if(window.showModalDialog == undefined || window.showModalDialog == "undefined" ){

//	}else{
//	window.showModalDialog(url,dataObject, params);
//	}
}

/**
 * 弹出消息提示框的统一方法
 * @param msg
 * @return
 */
function showMessage(msg,msgArgs){
	if(msg.substr(0,3) == 'MSG'){
		alert(getMessage(msg,msgArgs));
	}else{
		alert(msg);
	}
}
/**
 * 根据信息ID获取提示信息
 * @param msgId
 * @param msgArgs
 * @return
 */
/**
 * 根据信息ID获取提示信息
 * @param msgId
 * @param msgArgs
 * @return
 */
function getMessage(msgId,msgArgs){
	XMLHttp.urlSubmit(rootPath+"/fmp/FrameBiz/GetMessage?msgId="+msgId+"&msgArgs="+msgArgs,null);
	return XMLHttp.message;
}

/**
 * 关闭详细信息页面（新增页面、修改页面、查看页面）
 * @return
 */
function closeWindow(){
	var topWin = window.top;
	if(topWin.closeDivWindow){ //div窗口 
		var topWinDivId = topWin.getTopWinDivId();
		if(topWinDivId ==""){
			history.go(-1);
		}else{
			topWin.closeDivWindow(-1);
		}

	}else{   //模态窗口
		if (typeof window.parent != "undefined"){
			if (typeof window.parent.parent == "undefined"){
				window.parent.parent.close();
			}else{
				window.parent.close();
			}
		}else {
			window.close();
		}
	}

}

/**
 * 重新加载页面
 * @return
 */
function reloadWindow(params){
	if (typeof window.parent == "undefined"){
		params = "";
	}
	if (typeof window.parent != "undefined"){
		if (typeof window.parent.parent == "undefined"){			
			window.parent.parent.location.href = returnHref(window.parent.parent.location.href) + params;			
			//window.parent.parent.location.reload();
		}else{
			window.parent.location.href = returnHref(window.parent.location.href) + params;
			//window.parent.location.reload();
		}
	}else {

		window.location.href = returnHref(window.location.href) + params;
		//window.location.reload();
	}		

}

function returnHref(url){
	if(url.indexOf('selectedTableModelId')!=-1){
		url = url.replace('selectedTableModelId','nouse');
	}
	return url;
}

/**
 * 更新窗口标题
 * @param title
 * @return
 */
function updateDocTitle(title){
	if (typeof window.parent != "undefined"){
		if (typeof window.parent.parent == "undefined"){
			if (window.parent.parent.document.body.id!='sysmainbody'){
				window.parent.parent.document.title = title;
			}
		}else{
			if (window.parent.document.body.id!='sysmainbody'){ 
				window.parent.document.title = title;
			}
		}
	}else {
		if (window.document.body.id!='sysmainbody'){
			window.document.title = title;
		}
	}		

}

/**
 * 获取根路径
 * @return
 */
function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
	//return window.location.protocol + '//' + window.location.host + '/'+ webName + '/';
	return window.location.protocol + '//' + window.location.host + '/'+ webName;
}  

function getUrlPath(){
	var pathName = window.location.pathname;
	return pathName.substring(0, pathName.lastIndexOf('/')+1);
}


/**
 * HTML编码
 * @param str
 * @return
 */
function HTMLEncode(str)                                                     
{                                                                                                                
	if(str.length == 0) return "";                                 
	s    =    str.replace(/&/g,"&amp;");                           
	s    =    s.replace(/</g,"&lt;");                              
	s    =    s.replace(/>/g,"&gt;");                              
	s    =    s.replace(/ /g,"&nbsp;");                            
	s    =    s.replace(/\'/g,"&#39;");                            
	s    =    s.replace(/\"/g,"&quot;");                          
	return   s;                                                   

}        

/**
 * HTML解码
 * @param str
 * @return
 */
function HTMLDecode(str)                                            
{  
	if (typeof(str) == "undefined") {
		return str;
	}	
	if(str.length == 0)   return "";                               
	var s = str.replace(/&amp;/g,"&");                                 
	s = s.replace(/&lt;/g,"<");                                    
	s = s.replace(/&gt;/g,">");                                    
	s = s.replace(/&nbsp;/g," ");                                  
	s = s.replace(/&#39;/g,"\'");                                  
	s = s.replace(/&quot;/g,"\"");                                 
	return   s;         
}              	
/**
 * url参数编码
 * @param url
 * @return
 */
function fmpEncodeUrlParam(url){
	if (typeof(url) == "undefined") {
		return url;
	}
	url = url.replace(/%/g,"%25");
	url = url.replace(/&/g,"%26");
	url = url.replace(/'/g,"%27");
	url = url.replace(/\+/g,"%2B");
	url = url.replace(/,/g,"%2C");
	url = url.replace(/ /g,"%20");
	return url;
}
/**
 * url参数解码
 * @return
 */
function fmpDecodeUrlParam(url){
	if (typeof(url) == "undefined") {
		return url;
	}	
	url = url.replace(/%20/g," ");
	url = url.replace(/%2C/g,",");
	url = url.replace(/%2B/g,"+");
	url = url.replace(/%26/g,"&");
	url = url.replace(/%27/g,"'");
	url = url.replace(/%25/g,"%");
	return url;
}

/**
 * rul编码
 * @param url
 * @return
 */
function fmpEncodeURL(url){
	if (typeof(url) == "undefined") {
		return url;
	}	
	url = url.replace(/%/g,"%25");
	return url;
}	

/**
 * rul解码
 * @param url
 * @return
 */
function fmpDecodeURL(url){
	if (typeof(url) == "undefined") {
		return url;
	}	
	url = url.replace(/%25/g,"%");
	return url;
}	


/**
 * rui编码
 * @param url
 * @return
 */
function fmpEncodeURI(url){
	url = encodeURI(encodeURI(url));
	return url;
}

/**
 * rui解码
 * @param url
 * @return
 */
function fmpDecodeURI(url){
	url = decodeURI(decodeURI(url));
	return url;
}

//--------把中文字符转换成Utf8编码------------------------//  
function EncodeUtf8(s1)   {
	var s = escape(s1);       
	var sa = s.split("%");      
	var retV ="";       
	if(sa[0] != "")       
	{          
		retV = sa[0];       
	}       
	for(var i = 1; i < sa.length; i ++)       
	{            
		if(sa[i].substring(0,1) == "u")            
		{                
			retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));                             
		}            
		else retV += "%" + sa[i];       
	}               
	return retV;   
}   
function Str2Hex(s)   {       
	var c = "";       
	var n;       
	var ss = "0123456789ABCDEF";       
	var digS = "";       
	for(var i = 0; i < s.length; i ++)       
	{          
		c = s.charAt(i);          
		n = ss.indexOf(c);          
		digS += Dec2Dig(eval(n));                    
	}       //return value;       
	return digS;   
}   
function Dec2Dig(n1)   {       
	var s = "";       
	var n2 = 0;       
	for(var i = 0; i < 4; i++)       
	{          
		n2 = Math.pow(2,3 - i);          
		if(n1 >= n2)          
		{             
			s += '1';             
			n1 = n1 - n2;           
		}          
		else          
			s += '0';                   
	}       
	return s;           
}   
function Dig2Dec(s)   
{       
	var retV = 0;       
	if(s.length == 4)       
	{           
		for(var i = 0; i < 4; i ++)           
		{               
			retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);           
		}           
		return retV;       
	}       
	return -1;   
}    
function Hex2Utf8(s)   
{      
	var retS = "";      
	var tempS = "";      
	var ss = "";      
	if(s.length == 16)      
	{          
		tempS = "1110" + s.substring(0, 4);          
		tempS += "10" +  s.substring(4, 10);           
		tempS += "10" + s.substring(10,16);           
		var sss = "0123456789ABCDEF";          
		for(var i = 0; i < 3; i ++)          
		{             
			retS += "%";             
			ss = tempS.substring(i * 8, (eval(i)+1)*8);                                                       
			retS += sss.charAt(Dig2Dec(ss.substring(0,4)));             
			retS += sss.charAt(Dig2Dec(ss.substring(4,8)));          
		}          
		return retS;      
	}      
	return "";   
}

/**
 * 字符串加密函数
 * @param s
 * @return
 */
function fmpStrEncode(s){
	var rts="";
	for (var i=0;i<s.length ; i++)
	{
		var idx = s.charCodeAt(i);
		if ((idx>64 && idx<91))
		{
			idx = idx+1;
			if (idx>90)
			{
				idx = idx - 26;
			}
			rts += String.fromCharCode(idx);

		}else if (idx>96 && idx<123)
		{
			idx = idx + 1;
			if (idx>122)
			{
				idx = idx - 26;
			}
			rts += String.fromCharCode(idx);
		}else if (idx>47 && idx<58)
		{
			idx = idx + 1;
			if (idx>57)
			{
				idx = idx - 10;
			}
			rts += String.fromCharCode(idx);
		}else{
			rts += String.fromCharCode(idx);
		}
	}
	return rts;
}

/**
 * 字符串解密函数
 * @param s
 * @return
 */
function fmpStrDecode(s){
	var rts="";
	for (var i=0;i<s.length ; i++)
	{
		var idx = s.charCodeAt(i);
		if ((idx>64 && idx<91))
		{
			idx = idx-1;
			if (idx<65)
			{
				idx = idx + 26;
			}
			rts += String.fromCharCode(idx);
		}else if (idx>96 && idx<123)
		{
			idx = idx-1;
			if (idx<97)
			{
				idx = idx + 26;
			}
			rts += String.fromCharCode(idx);
		}else if (idx>47 && idx<58)
		{
			idx = idx-1;
			if (idx<48)
			{
				idx = idx + 10;
			}
			rts += String.fromCharCode(idx);
		}else{
			rts += String.fromCharCode(idx);
		}
	}
	return rts;
}

/**
 * 把字符串转换成ASII码
 * @param s  字符串
 * @param offset 位移
 * @return
 */
function str2asii(s,offset)
{
	if (typeof(s) == "undefined") {
		return "";
	}
	if (typeof(offset) == "undefined") {
		offset = 0;
	}else{
		offset += 0;
	}
	var rts="";
	for (var i=0;i<s.length ; i++)
	{
		var idx = parseInt(s.charCodeAt(i));
		idx += parseInt(offset);
		rts += ","+idx;
	}
	return rts;
}

 
/**
 * 把ASII码转换成字符串
 * @param s  ASII码
 * @param offset  位移
 * @return
 */
function asii2str(s,offset)
{
	if (typeof(s) == "undefined") {
		return "";
	}
	if (typeof(offset) == "undefined") {
		offset = 0;
	}else{
		offset += 0;
	}
	var rts="";
	var arr=s.split(","); //字符分割      
	for (var i=0;i<arr.length ;i++ )    
    {    
		if (arr[i] != '')
		{
			rts += String.fromCharCode(parseInt(arr[i])-parseInt(offset));
		}
    } 

	return rts;
}


/**
 * 框架级的URL加工
 * @param url
 * @return
 */
function comUrl(url){ 
	if (url.indexOf("?")>=0 || url.indexOf("&")>=0){
		if (url.indexOf("&tableModelId=")<0){
			url = url + "&tableModelId="+tableModelId;
		}
	}else{
		url = url + "?tableModelId="+tableModelId;
	}
	if (document.getElementById("keyLimit")){
		if (url.indexOf("&keyLimit=")<0){
			url = url + "&keyLimit=" +document.getElementById("keyLimit").value;
		}
	}	
	if (typeof(moduleId) != "undefined") {
		if (moduleId){
			if (url.indexOf("&moduleId=")<0){
				url = url +"&moduleId="+ moduleId;
			}
		}
	}
	if (typeof(freezeCondition) != "undefined") {
		if (freezeCondition){
			if (url.indexOf("&freezeCondition=")<0){
				url = url +"&freezeCondition="+ freezeCondition;
			}
		}
	}    	
	if (typeof(isUpdateListMode) != "undefined") {
		if (isUpdateListMode){
			if (url.indexOf("&isUpdateListMode=")<0){
				url = url +"&isUpdateListMode="+ isUpdateListMode;
			}
		}
	}  
	if (typeof(freezeParams) != "undefined") {
		if (freezeParams){
			if (url.indexOf("&freezeParams=")<0){
				url = url +"&freezeParams="+ freezeParams;
			}
		}
	}  

//	var topWindow = getMainWindow();
//	var dwp = divWinPath+","+topWindow.divCount;

//	var divCount = topWindow.createWindowDiv(title,window,left,top,width,height);
//	+ "&divWinPath="+dwp+"&currDivId="+divCount+"&parentDivId="+currDivId;			

	if (typeof(currDivId) != "undefined") {
		if (currDivId){
			if (url.indexOf("&currDivId=")<0){
				url = url +"&currDivId="+ currDivId;
			}
		}
	} 	

	if (typeof(queryString) != "undefined") {
		if (queryString){
			if (url.indexOf("&queryString=")<0){
				//如果URL中包含freezeCondition则要对queryString中的freezeCondition进行处理
				if (url.indexOf("&freezeCondition=")>=0){
					queryString = queryString.replace(/&freezeCondition=/g, "&freezeCondition2=");
				}
				url = url +"&queryString=true&"+ queryString;
			}
		}
	}
	
	/**
	 * 以下为处理URL中重复参数的问题
	 */
	var prefix = "";
	var nextfix = "";
	
	if (url.indexOf('?') == -1){
		prefix = ""; // url前导串
		nextfix = url; //url后置串		
	}else{
		prefix = url.substring(0, url.indexOf('?')); // url前导串
		nextfix = url.substring(url.indexOf('?') + 1); //url后置串
	}
 
	//fmpDebug("prefix==========="+prefix);
	//fmpDebug("nextfix==========="+nextfix);
	var strarr = nextfix.split("&");
	var newfix = "";

    for (var i = 0; i < strarr.length; i++)
    {
    	var bs = strarr[i];
    	if (bs != ""){
	    	for (var j=i+1; j< strarr.length; j++){
	    		var cs = strarr[j];
	    		//fmpDebug("["+bs+"]===["+cs+"]");
	    		if (bs == cs){
	    			strarr[j] = "";
	    		}
	    	}
    	}
    }
    
    for (var i = 0; i < strarr.length; i++){
    	if (strarr[i] != ""){
    		newfix +="&"+strarr[i];
    	}
	}
 
    if (newfix !="" && prefix != ""){
    	url = prefix+"?"+newfix;
    }else{
    	url = newfix;
    }
    
    fmpDebug(url.length);
    fmpDebug(url);
    return url;
}

/////////////以下为通用列表公共js函数///////////////////	
var selectedRid;
/*
 * 跳到某一页
 */
function goPage(pageIndex) {
	loadDataListXML("listArea",rootPath+"/fmp/FrameBiz/SearchDataList?"+getSearchListUrl(pageIndex),getSearchParamStr());
}

/**
 * 获取查询列表的url
 * @param pageIndex	当前页码
 * @return
 */
function getSearchListUrl(pageIndex){
	if (hiddenColumns == null || typeof(hiddenColumns) == "undefined"){
		var hiddenColumns = "";
	}
	var url = "&tableModelId="+ tableModelId+"&pq_currentPage="+pageIndex+"&hiddenColumns="+hiddenColumns;
	if(document.getElementById("pq_maxLine")){
		url +="&pq_maxLine="+document.getElementById("pq_maxLine").value;
	}else{
		url +="&pq_maxLine=50";
	}
	var spanElement = document.getElementsByTagName("span");
	len = spanElement.length;
	for(var i = 0; i < len; i++)
	{
		if (spanElement[i].id.indexOf("orderSpan_")==0){
			url = url + "&" + $("#"+spanElement[i].id).attr("name") + "="+$("#"+spanElement[i].id).attr("order");
		}
	}

	if (document.getElementById("keyLimit")){
		url = url + "&keyLimit=" +document.getElementById("keyLimit").value;
	}

	if (document.getElementById("opMode")){
		url = url + "&opMode=" +document.getElementById("opMode").value;
	}    	
	if (document.getElementById("isSubTbl")){
		url = url + "&isSubTbl=" +document.getElementById("isSubTbl").value;
	}	
	return encodeURI(comUrl(url));
}

/**
 * 获取查询条件参数
 * @return
 */
function getSearchParamStr(){
	var inputElement = document.getElementsByTagName("input");
	var len = inputElement.length;
	var post = new Array(); 
	var j=0;
	for(var i = 0; i < len; i++)
	{
		if (inputElement[i].id.indexOf("search_hiddenfld_id_")==0){
			var fldId = inputElement[i].id.substr(20);
			var shobj = document.getElementById("detailId_"+fldId);
			if (fldId.indexOf("$B$")==0){
				var e_obj=document.getElementById("detailId_$E$"+fldId.substr(3));
				if ($(e_obj).val()!="" && $(shobj).val()!="" &&($(e_obj).val()<$(shobj).val())){
					//showMessage("区间查询的开始值必须小于结束值"); 
					setErrMessage(e_obj, "区间查询的开始值必须小于结束值");
					return false;
				}
			}
			if (shobj != null ){
				if (($(shobj).attr("objType") == "money"
					||$(shobj).attr("objType") == "money10000"
						||$(shobj).attr("objType") == "money100000000")){
					if (inputElement[i].value!=null && trim(inputElement[i].value) != ""){
						post[j] = "search_hiddenfld_id_" + fldId + "="+moneyToFloat(inputElement[i].value);
						j++;
					}
				}else{
					if (inputElement[i].value!=null && trim(inputElement[i].value) != ""){
						if ($(shobj).attr("objType") == "percent" || $(shobj).attr("objType") == "date"  ){
							post[j] = "search_hiddenfld_id_" + fldId + "="+getFieldTrueValue(trim(inputElement[i].name));
						} else{
							post[j] = "search_hiddenfld_id_" + fldId + "="+fmpEncodeUrlParam(trim(inputElement[i].value));
						}
						j++;
					}
				}
			}
			//url = url + "&search_hiddenfld_id_" + inputElement[i].name + "="+fmpEncodeUrlParam(inputElement[i].value);
		}
	}
	return post.join('&');	
}


/**
 * 获取查询条件的显示值查询参数字串
 * @return
 */
function getDispSearchParamStr(){
	var inputElement = document.getElementsByTagName("input");
	var len = inputElement.length;
	var post = new Array(); 
	var j=0;
	for(var i = 0; i < len; i++){
		if(inputElement[i].id.indexOf("disp_detailId_")==0){
			var shobj = document.getElementById("detailId_"+inputElement[i].name);
			if (shobj != null && ($(shobj).attr("objType") == "money"
				||$(shobj).attr("objType") == "money10000"
					||$(shobj).attr("objType") == "money100000000")){
				if (inputElement[i].value!=null && trim(inputElement[i].value) != ""){
					post[j] = "disp_detailId_id_" + inputElement[i].name + "="+moneyToFloat(inputElement[i].value);
					j++;
				}
			}else{
				if (inputElement[i].value!=null && trim(inputElement[i].value) != ""){
					post[j] = "disp_detailId_id_" + inputElement[i].name + "="+fmpEncodeUrlParam(inputElement[i].value);
					j++;
				}
			}
		}
	}
	return post.join('&');
}


/**
 * 打印列表数据操作
 * 功能：页面点击该操作按钮后，显示打印机打印预览页面并打印
 * @return
 */
function commPrintDataList(){
	if(!confirm("是否打印当前列表?")){
		return;
	}

	//使用"?"替换字符串中的"&",以防止Action中无法获取该参数
	var searchParamStr = getSearchParamStr() + "&"+ getDispSearchParamStr();
	searchParamStr = searchParamStr.replace(/&/g, "?");	//查询参数字串
	
	var iframeUrl = rootPath+"/fmp/FrameBiz/printListDataIframe";
	//var pq_maxLine = document.getElementById("pq_maxLine").value;	//最大显示列数
	var pq_recordCount = document.getElementById("pq_recordCount").innerText;	//列表记录总数
	
	var url = rootPath+"/fmp/FrameBiz/printListData" + 
				  "?tableModelId=" + tableModelId +
				  "&moduleId=" + moduleId +
				  "&pq_currentPage=1" +
				  "&pq_maxLine=" + pq_recordCount +
				  "&searchParamStr=" + searchParamStr +
				  "&iframeUrl=" + iframeUrl ;
	//这里必须使用encodeURI()对url进行编码否则Action中无法进行转码，-500目的是为了隐藏窗体
	openPrintDivWindow(comUrl(encodeURI(url)),"",-500,5,'50px','50px');
}


/*前一页*/
function prePage(pageIndex) {
	if(getCurrentPage()==0) return;
	if(pageIndex==getCurrentPage()) {
		showMessage("MSG0020");//这已经是首页！
		return;
	}
	if (checkListParams()){
		goPage(pageIndex);
	}
}
/*下一页*/
function nextPage(pageIndex) {
	if(getCurrentPage()==0) return;
	if(pageIndex==getCurrentPage()) {
		showMessage("MSG0094");//这已经是尾页！
		return;
	}
	if (checkListParams()){
		goPage(pageIndex);
	}
}
/*尾页*/
function endPage(pageIndex) {
	//alert(pageIndex);
	if(getCurrentPage()==0) return;
	if(pageIndex==getCurrentPage()) {
		showMessage("MSG0094");//这已经是尾页！
		return;
	}
	if (checkListParams()){
		goPage(pageIndex);
	}
}
/*跳转页*/
function gotoPage(maxPage) {
	var pageIndex=document.getElementById("pq_jumpInput").value;
	if(pageIndex=="") {
		showMessage("MSG0021");//请输入要转到的页码！ 
		return;
	}
	if(pageIndex > maxPage) {
		document.getElementById("pq_jumpInput").value = maxPage;
		pageIndex = maxPage;
	}	
	if (checkListParams()){
		goPage(pageIndex);
	}

}

 /* 设置列表最大行数*/
function setMaxLine(maxLine) {
	if(maxLine=="") {
		showMessage("MSG0022");//请输入列表的最大行数！ 
		return false;
	}
	if (checkListParams()){
		goPage(1);
	}
}
/*获取当前页码*/
function getCurrentPage() {
	var curPg = "";
	if(document.getElementById("pageIndex")){
		curPg = document.getElementById("pageIndex").value;
	}
	if (curPg == ""){
		curPg = "0";
	}
	return  curPg;
}

/**
 * 检查列表录入的参数是否合法
 * @return
 */
function checkListParams(){
	var pageIndex=document.getElementById("pq_jumpInput").value;
	if(pageIndex.indexOf(" ") >= 0){
		document.getElementById("pq_jumpInput").value = trim(pageIndex);
	}
	if (pageIndex !=""){
		if(!isPlusInt(pageIndex)) {
			showMessage("MSG0023");//列表页码必须是整数！
			document.getElementById("pq_jumpInput").value = "";
			return false;
		}
		if(pageIndex==getCurrentPage()) {
			document.getElementById("pq_jumpInput").value = "";
			return false;
		}
	}

	var maxLine=document.getElementById("pq_maxLine").value;

	if(maxLine.indexOf(" ") >= 0){
		document.getElementById("pq_maxLine").value = trim(maxLine);
	}	
	if(!isPlusInt(maxLine)) {
		showMessage("MSG0024");//列表行数必须为整数！
		document.getElementById("pq_maxLine").value = "10";
		return false;
	}
	
	
	return true;	
}

/**
 * 判断传入数字是不是正整数
 * @param s
 * @return
 */
function isPlusInt(s){ 
	var re = new RegExp("^[0-9]*[1-9][0-9]*$"); 
	return s.match(re)!=null; 
} 

/**
 * 遍历对象的子元素,得到查询条件
 * @param node
 * @return
 */
function searchParamElement(node)
{
	if(node){
		if(node.nodeType ==1) {
			if (node.id && node.id.indexOf("detailId_")==0){
				var Search_hiddenfld_id="search_hiddenfld_id_"+node.id.substr(9);
				document.getElementById(Search_hiddenfld_id).value = node.value;
			}
		} 
		var childrens = node.childNodes;
		for(var i=0;i<childrens.length;i++)
		{
			searchParamElement(childrens[i]);
		}
	}
}
/* 点击通用查询按钮 */
function doQuery(){
	var form = document.getElementById("searchConditionForm");
	var result =checkAll(form);
	if(result){
		var divObj=document.getElementById("searchArea");
		searchParamElement(divObj);
		goPage(0);
	}else{
		showMessage("MSG0025");//请正确输入查询条件！
	}		
}

/*处理动态排序是js脚本*/
function doOrderBy(titleName){
	var orderSpan = document.getElementById("orderSpan_"+titleName);
	var order = $("#orderSpan_"+titleName);
	if (orderSpan.innerHTML == "↑"){
		orderSpan.order= "ASC";
	}else if (orderSpan.innerHTML == "↓"){
		orderSpan.order= "DESC";
	}else if (orderSpan.innerHTML == "－"){
		orderSpan.order= "none";
	} 
	if (orderSpan.order=="none") {
		orderSpan.innerHTML = "↑";
		//orderSpan.order= "ASC";
		$(order).attr("order","ASC");
	} else if (orderSpan.order=="ASC") {
		orderSpan.innerHTML = "↓";
		//orderSpan.order= "DESC";
		$(order).attr("order","DESC");
	} else if (orderSpan.order=="DESC") {
		orderSpan.innerHTML = "－";	
		//orderSpan.order= "none";	
		$(order).attr("order","none");
	}
	//alert(getSearchListUrl(0));
	goPage(0);
}

/**
 * 显示饼图表
 * @param chartType		图表类型   2dpie:2D基本饼图,  3dpie: 3D基本饼图, 2dbar:2D的条形图,  2dcolumn:2D柱形图,2dmulticolumn:2d分组柱形图,3dmulticolumn:3d分组柱形图   3dcolumn:3D柱形图,  2dline:2D折线图 , 2dmultiline:2D折线图
 * @param nameColumn	数据项名称字段
 * @param valueColumn	数据线值字段   //（valueColumn 逗号分隔字段实现多条折线）, 2dline: 2D横向数据折线图（valueColumn逗号分隔字段实现折线的多个折点）
 * @param statMode		统计模式   v:纵向统计    h:横向统计
 * @return
 */
function showChart(chartTitle,chartType,nameColumn,valueColumn,statMode){   
	var form = document.forms[0];//.getElementById("DoUpdate");
	var result =checkAll(form);

	if(result){
		var divObj=document.getElementById("searchArea");
		searchParamElement(divObj);
		goPage(0);
	}else{
		showMessage("MSG0025");//请正确输入查询条件！
	}	
	
	if (statMode == "h" || statMode == "H" ){
		if (selectedRid == null) {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
			return;
		}		
	}
	var url;
	//if (window.CanvasRenderingContext2D){
	//url = rootPath+"/fmp/FrameBiz/ShowSChart?"+getSearchListUrl(getCurrentPage())+"&"+getSearchParamStr()+"&chartTitle="+fmpEncodeURI(chartTitle)+"&chartType="+chartType+"&nameColumn="+nameColumn+"&valueColumn="+valueColumn+"&statMode="+statMode+"&selectedRid="+selectedRid;
	//}else{
	//	url = rootPath+"/fmp/FrameBiz/ShowIChart?"+getSearchListUrl(getCurrentPage())+"&"+getSearchParamStr()+"&chartTitle="+fmpEncodeURI(chartTitle)+"&chartType="+chartType+"&nameColumn="+nameColumn+"&valueColumn="+valueColumn+"&statMode="+statMode+"&selectedRid="+selectedRid;

	//}
	url = rootPath+"/fmp/FrameBiz/ShowEChart?"+getSearchListUrl(getCurrentPage())+"&"+getSearchParamStr()+"&chartTitle="+fmpEncodeURI(chartTitle)+"&chartType="+chartType+"&nameColumn="+nameColumn+"&valueColumn="+valueColumn+"&statMode="+statMode+"&selectedRid="+selectedRid;

	var selectObject = new Object(); 
		//window.open(comUrl(url));
	openModalDialog(comUrl(url),selectObject,"scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px;");
	//openWindow(comUrl(url),"统计图表");
}


/////////////以上为通用列表公共js函数///////////////////		




//单个传值的pop窗口
//fid为父窗口所选字段的关键id字段，sid为子窗口所选字段的关键id字段，sname为子窗口所选字段的中文名字段
//子窗口的id值返回到父窗口的所选id的隐藏域，子窗口的中文名值返回到父窗口所选id的显示域
function openSinPop(tableModelId,fid,sid,sname,keyLimitCondition,freezeCondition,popDataType,dataRid){
	var dataObject = new Object();              
	dataObject.sid= sid;
	dataObject.sname= sname;
	dataObject.trueValue= null;
	dataObject.dispValue= null;
	dataObject.listMap = new Map();
	if(keyLimitCondition==null || keyLimitCondition == "undefined"){
		keyLimitCondition="";
	}
	if(freezeCondition==null || freezeCondition == "undefined"){
		freezeCondition="";
	}	
	if(popDataType==null || popDataType == "undefined"){
		popDataType="Pop";
	}	
	
//  谁加的这段代码？
//	if (document.getElementById("keyLimit")){
//		keyLimitCondition = document.getElementById("keyLimit").value+","+keyLimitCondition;
//	} 
	var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=singleVPop&popDataType="+popDataType+"&tableModelId="+tableModelId+"&keyLimit="+keyLimitCondition+"&freezeCondition="+fmpEncodeUrlParam(freezeCondition);
	openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");

	dataObject.backCall=function(){
		if (dataObject.trueValue != null) {   // 返回给父窗口隐藏域
			if (dataRid != undefined && dataRid != "undefined" && dataRid != ""){
				setDataListValue(dataRid,fid,dataObject.trueValue,dataObject.dispValue);
			}else{
				setFieldValue(fid,dataObject.trueValue,dataObject.dispValue);
			}		
		}   
	};
}	        
//多个输入框传值的pop窗口
function openMulPop(tableModelId,keyLimitCondition,callBackFuncName,freezeCondition,popDataType){
	var dataObject = new Object();
	dataObject.listMap = new Map();
	if(keyLimitCondition==null || keyLimitCondition == "undefined"){
		keyLimitCondition="";
	}
	if(freezeCondition==null || freezeCondition == "undefined"){
		freezeCondition="";
	}	
	if(popDataType==null || popDataType == "undefined"){
		popDataType="Pop";
	}	
//  谁加的这段代码？	
//	if (document.getElementById("keyLimit")){
//		keyLimitCondition = document.getElementById("keyLimit").value+keyLimitCondition;
//	} 
	var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=multiVPop&popDataType="+popDataType+"&tableModelId="+tableModelId+"&keyLimit="+keyLimitCondition+"&freezeCondition="+fmpEncodeUrlParam(freezeCondition);
	openModalDialog(url,dataObject, "scroll:yes; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
	dataObject.backCall=function(){
		if(dataObject.listMap.data!=null){
			if(typeof callBackFuncName !='undefined'&& callBackFuncName instanceof Function){
				callBackFuncName(dataObject.listMap);
			}else{		  
				for(key in dataObject.listMap.data){
					if(key.indexOf("disp_")<0){
						if(key !='RID' && document.getElementById('detailId_'+key)!=null){
							setFieldValue(key,dataObject.listMap.data[key],dataObject.listMap.data['disp_'+key]);
						}
					}
				}
			}
		}
	}
}

//统计部门，统计机构传值专用的pop窗口 ，参数必须为SDept或SOrg
function openSTATPop(tableModelId,keyLimitCondition,freezeCondition,popDataType){
	var dataObject = new Object();
	dataObject.tableModelId = tableModelId;
	if(keyLimitCondition==null || keyLimitCondition == "undefined"){
		keyLimitCondition="";
	}
	if(freezeCondition==null || freezeCondition == "undefined"){
		freezeCondition="";
	}	
	if(popDataType==null || popDataType == "undefined"){
		popDataType="Pop";
	}	
	var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=STATPop&popDataType="+popDataType+"&tableModelId="+tableModelId+"&keyLimit="+keyLimitCondition;;
	openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
	dataObject.backCall=function(){
		if (dataObject.trueValue != null) {   // 返回给父窗口隐藏域
			setFieldValue("STATDEPT",dataObject.trueValue,dataObject.dispValue);
		}
	}
}	 

/**
 * 打开checkbox pop窗口
 */   
function openCheckPop(id,tableModelId,fieldName,keyLimitCondition,freezeCondition,popDataType){
	var selectObject = new Object(); 
	if(keyLimitCondition==null || keyLimitCondition == "undefined"){
		keyLimitCondition="";
	}
	if(freezeCondition==null || freezeCondition == "undefined"){
		freezeCondition="";
	}	
	if(popDataType==null || popDataType == "undefined"){
		popDataType="Pop";
	}		
	selectObject.fieldName = fieldName;
	var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkPop&checkBoxMode=true&popDataType="+popDataType+"&tableModelId="+tableModelId+"&keyLimit="+keyLimitCondition;
	openModalDialog(url,selectObject, "scroll:yes; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");

	// alert(selectObject.returnSelectStr);
	selectObject.backCall=function(){
	if(selectObject.trueValue!=null){
		setFieldValue(id,selectObject.trueValue);
	}
	}


}


function openCheckPopWithCallBackFun(tableModelId,keyLimitCondition,selectedDataList,freezeCondition,popDataType){	
	if(keyLimitCondition==null || keyLimitCondition == "undefined"){
		keyLimitCondition="";
	}
	if(freezeCondition==null || freezeCondition == "undefined"){
		freezeCondition="";
	}	
	if(popDataType==null || popDataType == "undefined"){
		popDataType="Pop";
	}	
	var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkPopWithCallBackFunc&popDataType="+popDataType+"&tableModelId="+tableModelId+"&checkBoxMode=true&keyLimit="+keyLimitCondition+"&customCondition="+fmpEncodeUrlParam(freezeCondition);
	// 弹出pop窗口
	openModalDialog(url,selectedDataList, "scroll:yes; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
}


function openCheckPopWithCloseButton(tableModelId,keyLimitCondition,selectedDataList,freezeCondition,popDataType){	
	if(keyLimitCondition==null || keyLimitCondition == "undefined"){
		keyLimitCondition="";
	}
	if(freezeCondition==null || freezeCondition == "undefined"){
		freezeCondition="";
	}	
	if(popDataType==null || popDataType == "undefined"){
		popDataType="Pop";
	}		
	var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkPopWithCallBackFunc&popDataType="+popDataType+"&tableModelId="+tableModelId+"&closeButton=true&checkBoxMode=true&keyLimit="+keyLimitCondition+"&freezeCondition="+fmpEncodeUrlParam(freezeCondition);
	// 弹出pop窗口
	openModalDialog(url,selectedDataList, "scroll:yes; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
}

/////////////以上为pop窗口键值存取以及提交处理的js函数////////////////	      


/////////////以下为编辑页面分组处理的js函数///////////////////	

function toggle(o){
	if (!o){
		return;
	}

	if (!$(o).attr("tid")){
		$(o).attr("tid", "_" + Math.random() * 100);
	}

	if (!window.toggler)window.toggler = {};
	if (!window.toggler[$(o).attr("tid")]){
		window.toggler[$(o).attr("tid")]={
				obj:o,
				maxHeight:$(o).height(),
				minHeight:25,
				timer:null,
				action:1
		};
	}
	$(o).height(o.offsetHeight + "px");
	if (window.toggler[$(o).attr("tid")].timer)clearTimeout(window.toggler[$(o).attr("tid")].timer);
	window.toggler[$(o).attr("tid")].action *= -1;
	window.toggler[$(o).attr("tid")].timer = setTimeout("anim('"+$(o).attr("tid")+"')",10 );  // ms 每隔多久循环一次
}
function anim(id){
	var t = window.toggler[id];
	var o = t.obj;
	if (t.action < 0){
		if ($(o).height() <= t.minHeight*2){
			clearTimeout(t.timer);
			$(o).height( t.minHeight);
			$(o).hide();
			$(o).prev().attr("open","false");
			return;
		}
	}
	else{
		//alert($(o).height()+"===="+t.maxHeight);
		if ($(o).height() >= t.maxHeight){
			clearTimeout(t.timer);
			$(o).height(t.maxHeight);
			return;
		}
	}
	$(o).height((parseInt($(o).height(), 10) + t.action * 40) + "px");  //step  每次变化的px量
	$(o).show();
	$(o).prev().attr("open","true");
	window.toggler[id].timer = setTimeout("anim('"+id+"')",10 );            // ms 每隔多久循环一次
}

/////////////以上为编辑页面分组处理的js函数///////////////////	



/////////////以下为导出excel的js函数////////////////////////	


function doToExcel(tblMdlId) {
	if (typeof tblMdlId == "undefined"){
		tblMdlId = tableModelId;
	}
	var url = rootPath+"/fmp/FrameBiz/ToExcel?tableModelId=" + tblMdlId+"&"+getSearchListUrl(getCurrentPage())+"&"+getSearchParamStr();

	url = encodeURI(comUrl(url));
	location.href = url;
};  



/////////////以上为导出excel的js函数////////////////////////	

/////////////以下为导出text的js函数////////////////////////	


function doToText(tblMdlId) {
	if (typeof tblMdlId == "undefined"){
		tblMdlId = tableModelId;
	}
	
	var spFlag = prompt("请输入分隔符：", "|");

	var url = rootPath+"/fmp/FrameBiz/ToText?tableModelId=" + tblMdlId+"&"+getSearchListUrl(getCurrentPage())+"&"+getSearchParamStr()+"&spFlag="+spFlag;
	var spanElement = document.getElementsByTagName("span");
	len = spanElement.length;
	for(var i = 0; i < len; i++)
	{ // 排序
		if (spanElement[i].id.indexOf("orderSpan_")==0){
			url = url + "&" + spanElement[i].name + "="+spanElement[i].order;
		}
	}

	if (document.getElementById("keyLimit")){
		url = url + "&keyLimit=" +document.getElementById("keyLimit").value;
	}

	url = encodeURI(comUrl(url));
	location.href = url;
};  

/////////////以上为导出text的js函数////////////////////////	



/////////////以下为去掉逗号的js函数////////////////////////		

function momeyDecimal(obj){
	if(obj){
		var tempValue =0;
		if(obj.value==""){
			return tempValue;
		}
		tempValue=obj.value.replace(/\,/g,"");
		return tempValue;
	}else{
		return null;
	}
}
/////////////以上为去掉逗号的js函数////////////////////////		

/**
 * 功能：公用的异步提交
 * @param url 需要执行的url,如：./fmp/Delete?RID=1
 * @param backCallFun 回调函数
 * @return 返回xmlTxt 信息
 */
function comAjax(url,ajaxBackCallFun){
	if (typeof ajaxBackCallFun != "undefined"){
		XMLHttp.urlSubmit(url,ajaxBackCallFun);
	}else{
		XMLHttp.urlSubmit(url);
	}
	return XMLHttp.message;
}
/**
 * 获取页面元素对象
 * @param id
 * @return
 */
function $_(id){
	return document.getElementById(id);
}

/**
 * 设置页面对象隐藏和显示
 * @param objId  页面域对象ID
 * @param yn   是否显示
 * @return
 */
function setObjectDisplay(objId,yn){
	var obj = document.getElementById(objId);
	if (obj){
		if (yn){
			obj.style.display = "";
		}else{
			obj.style.display = "none";
		}
	}
}

/**
 * 设置页面分组对象的隐藏和显示
 * @param objId
 * @param yn
 * @return
 */
function setGroupDisplay(objId,yn){
	if (yn){
		document.getElementById(objId).style.display = "";
		document.getElementById(objId+"_body").style.display = "";
	}else{
		document.getElementById(objId).style.display = "none";
		document.getElementById(objId+"_body").style.display = "none";
	}	
}

/**
 * 获取唯一的UID
 * @return
 */
function getUID() {    
	var S4 = function() {       
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);    
	};    
	return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}

/**
 * 获取结果集js对象    
 * @param sqlId  sqlmap id
 * @param params 参数
 * @return 对象数组 
 * 用法：
		var obj = getDataListObj("SDic.listData","");
		alert(obj[2].DATAVALUE);
 */   
function getDataListObj(sqlId,params){
	var url = rootPath+"/fmp/FrameCommonBiz/GetJsonDataList?sqlId="+sqlId;
	XMLHttp.urlSubmit(url,null,params);
	var jsontext = XMLHttp.message;
//	var obj = eval('('+jsontext+')');
	
	return jQuery.parseJSON(jsontext);
}

/**
 * 获取数据MAP对象
 * @param sqlId  sqlmap id
 * @param params 参数
 * @return 对象 
 * 用法：
 		var obj = getDataMapObj("SDic.listData","whereCondition=and RID='f4e615affc34477ea33798e0a1dea70b'");
		alert(obj.DATAVALUE);
 */ 
function getDataMapObj(sqlId,params){
	var url = rootPath+"/fmp/FrameCommonBiz/GetJsonDataMap?sqlId="+sqlId;
	XMLHttp.urlSubmit(url,null,params);
	var jsontext = XMLHttp.message;
//	var obj = eval('('+jsontext+')');	
	return jQuery.parseJSON(jsontext);
}


/**
 * 根据报表模板ID和报表取数业务RID生成报表临时文件，并在页面中展示
 * @param templetId			报表模板id
 * @param reportDataRid		报表数据业务RID
 * @param otherParams		其他的报表参数
 * @return
 */
function showReportTempFile(templetId,reportDataRid,otherParams){
	window.location.href = rootPath+'/fmp/report/ReportPrintBiz/ShowReportTempFile?REPORTTEMPLETID='+templetId+'&REPORTDATARID='+reportDataRid+otherParams;
}




/**
 * 根据报表模板，生成报表，并用EXCEL或者WORD打开
 * @param templetId
 * @param params
 * @return
 */
function genReportTempFile(templetId,params){
	var url =rootPath+"/fmp/report/ReportPrintBiz/GenReportTempFile?REPORTTEMPLETID="+templetId+"&"+params; 
	XMLHttp.urlSubmit(url,callBack);
	function callBack(tempFileName){
		var fileType = tempFileName.substr(0, 2);
		//tempFileName = TEMP_FILE_URL+tempFileName.substring(2);
		//openWindow(tempFileName,"打印项目");
		tempFileName = tempFileName.replace(/\\/g,"-");
		//window.location.href = rootPath+'/fmp/system/report/ReportPrintBiz/reportPrint?tempFileName='+tempFileName;
		var officeObj;
		if (fileType=="1:"){   		//用EXCEL打开
			tempFileName = tempFileName.substring(2);
			var strAllName;
			officeObj = new ActiveXObject("Excel.Application");
			strAllName=TEMP_FILE_URL+tempFileName;
			officeObj.Workbooks.Open(strAllName);//打开当前文档预览
			officeObj.Application.Printout();//调用自动打印
			officeObj.DisplayAlerts = false;
			officeObj.Visible = true;
			idTmr = window.setInterval("Cleanup();",1000); 			
		}else if (fileType=="2:"){	//用WORD打开
			tempFileName = tempFileName.substring(2);
			var strAllName;
			officeObj = new ActiveXObject("Word.Application");
			strAllName=TEMP_FILE_URL+tempFileName;
			officeObj.Documents.Open(strAllName);//打开当前文档预览
			officeObj.Application.Printout();//调用自动打印
			officeObj.DisplayAlerts = false;
			officeObj.Visible = true;
			idTmr = window.setInterval("Cleanup();",1000); 			
		}else{
			showMessage(tempFileName);
		}		 
	}	
}


/**
 * 根据文档类型和文档URL，直接打印文档
 * @param docType  1:excel    2:word
 * @param url
 * @return
 */
function printReportTempFile(docType,url){
  var obj = getOfficeObj(docType);
  obj.Documents.Open(url);//打开当前文档预览
  obj.DisplayAlerts = false;
  obj.Visible = false;
  obj.Application.Printout();//调用自动打印
}

/**
 * 根据对象类型，获取全局的office对象
 * @param docType  1:excel    2:word
 * @return
 */
var officeObj = null;
function getOfficeObj(docType){
	var topWindow = getMainWindow();
	if(topWindow){
		if (docType == "1"){  //excel
			if (topWindow.excelObject == ""){
				topWindow.excelObject = new ActiveXObject("Excel.Application");
			}
			return topWindow.excelObject;
		}else if (docType == "2"){ //word
			if (topWindow.wordObject == ""){
				topWindow.wordObject = new ActiveXObject("Word.Application");
			}
			return topWindow.wordObject;
		}
	}else{
		showMessage("MSG0097");  //无法创建OFFICE对象，原因是无法获取顶级窗口，请与管理员联系。
	}
}

/**
 * 获取mainframe所在的window对象
 * @return
 */
function getMainWindow(){
	if (window.top.parent.openerWindow){
		return window.top.parent.openerWindow.top;
	}else{
		return window.top;
	}		
}

 
/**
 * 动态加按钮
 * @param objId  按钮加的位置，在某个组件后面
 * @param btnText 按钮的文字
 * @param clickFunc  按钮要执行的方法
 * @return
 */
function addButton(objId,btnText,clickFunc,styleClass){
	if (!styleClass){
		styleClass = "h5button green medium";
	}
	document.getElementById(objId).insertAdjacentHTML("afterEnd","&nbsp;<input type=\"button\" " +
			"class=\""+styleClass+"\" " +
			" id=\""+btnText+"\" value=\""+btnText+"\" onclick=\""+clickFunc+"\"></input>");
}

function checkOpperation(){
	return true;
}

/**
 * 根据文本框输入的值查询过滤select选项框的选项并对其按中文拼音排序
 * @param filterInputObj  所要查询的文本框对象
 * @param selectBoxId     所要操作的select选项框ID
 * @return
 */
function filterSelectBox(filterInputObj,selectBoxId){
	if (typeof filterInputObj.hiddenOptions == "undefined"){   	         	//判断隐藏选项是否未定义
		filterInputObj.hiddenOptions = "";                                  //定义隐藏select选项
		filterInputObj.allOptions = "";                                     //定义所有select选项
	}
	var showOptions = "";                                                   //定义显示select选项 
	var selectBoxObj = document.getElementById(selectBoxId);
	for( var i = selectBoxObj.options.length-1; i > -1; i--){
		var selectBoxValue = selectBoxObj.options[i].value;
		var selectBoxName = selectBoxObj.options[i].text;
		if(showOptions == ""){                                              //判断显示select选项是否为空值
			showOptions = selectBoxValue + "," + selectBoxName;
		}else{
			showOptions = selectBoxValue + "," + selectBoxName + ";" + showOptions;
		}
		selectBoxObj.remove(i);
	}
	
	if(filterInputObj.hiddenOptions == ""){                                 //判断隐藏select选项是否为空值
		filterInputObj.allOptions = showOptions;
	}else{
		if(showOptions == ""){
			filterInputObj.allOptions = filterInputObj.hiddenOptions;
		}else{
			filterInputObj.allOptions = showOptions + ";" + filterInputObj.hiddenOptions;
		}
	}

	filterInputObj.hiddenOptions = "";
	var allOptionArr = filterInputObj.allOptions.split(";");
	var sortOptionStr = "";                                                 //定义排序字符串
    var filteredStr = "";                                                   //定义查询过滤所选字符串
    for( var j = allOptionArr.length - 1; j > -1; j--){
		if(allOptionArr[j].indexOf(filterInputObj.value) == -1){            //判断查询值是否存在该select选项值
			if(filterInputObj.hiddenOptions == ""){
				filterInputObj.hiddenOptions = allOptionArr[j];
			}else{
				filterInputObj.hiddenOptions = allOptionArr[j] + ";" + filterInputObj.hiddenOptions;
			}
		}else{
			if(allOptionArr[j] != ""){                                      //判断该select选项值是否不为空值
				var roleArr = allOptionArr[j].split(",");
				var roleId = roleArr[0];
				var roleText = roleArr[1];
				if(filteredStr == ""){                                      //判断查询值是否为空值
					filteredStr = roleId + "," + roleText;
					sortOptionStr = roleText;
				}else{
					filteredStr = roleId + "," + roleText + ";" + filteredStr;
					sortOptionStr = roleText + "," + sortOptionStr;
				}
			}
		}
	}

	if(sortOptionStr != ""){        //判断排序字符串是否为空值（若为空值，则查找不到对应的select选项）
		sortOptionStr = sortOptionStr.split(",");
		sortOptionStr.sort(function(a,b){return a.localeCompare(b);});
		filteredStr = filteredStr.split(";");
		for( var k = 0; k < sortOptionStr.length; k++){
			for( var p = filteredStr.length -1; p > -1; p--){
				var filteredArr = filteredStr[p].split(",");
				if(filteredArr[1] == sortOptionStr[k]){                     //判断查询选项值与排序选项值是否相等
					selectBoxObj.options.add(new Option(filteredArr[1], filteredArr[0]));
					filteredStr.slice(p, 1);
					break;
				}
			}
		}
	}
}

/**
 * 设置主标签页的标题
 * @param tblId		标签页的表模型ID
 * @param title		标题内容
 * @return
 */
function setMainTabTitle(tblId,title){
	document.getElementById("moduleTitle_"+tblId).innerHTML = title;
}

/**
 * 设置从表标签页的标题
 * @param tblId	标签页的表模型ID
 * @param title 标题内容
 * @return
 */
function setSubTabTitle(tblId,title){
	document.getElementById("subModuleTitle_"+tblId).innerHTML = title;
}


/**
 * 显示/隐藏子标签页
 * @param tblId 标签页的表模型ID
 * @param yn  true显示，false隐藏
 * @return
 */
function setSubTabDisplay(tblId,yn){
	if(document.getElementById("subModuleTitle_"+tblId)){
		if(yn){
			document.getElementById("subModuleTitle_"+tblId).style.display = "";
		}else{
			document.getElementById("subModuleTitle_"+tblId).style.display = "none";
		}
	}
}



/**
 * 清除字符串两端空格
 * @param str
 * @return
 */
function trim(str){
	if (str == null){
		return str;
	}
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 清除字符串左边空格
 * @param str
 * @return
 */
function trimLeft(str){
	if (str == null){
		return str;
	}	
	return str.replace(/(^\s*)/g, ""); 
}
/**
 * 清除字符串右边空格
 * @param str
 * @return
 */
function trimRight(str){
	if (str == null){
		return str;
	}	
	return str.replace(/(\s*$)/g, "");
}
 
/**
 * 根据表模型打开打印页面
 * @param tblMdlId
 * @param rid
 * @return
 */
function openPrintView(tblMdlId,rid){
	if (rid != null) {
		var url = "DoPrintView?tableModelId="+tblMdlId+"&RID="+rid;
		openWindow(comUrl(url),moduleDesc+"-打印");
	} else {
		showMessage("MSG0026");//打开打印页面失败，RID不能为空！
	}	
}

/**
 * 实现iframe自适应高度
 */
 function reinitIframe(ifId){
	 var iframe = document.getElementById(ifId);
	 try{
		 var bHeight = iframe.contentWindow.document.body.scrollHeight;
		 var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		 var height = Math.max(bHeight, dHeight);
		 iframe.height =  height;
	 }catch (ex){
		 //此处吃掉异常不影响业务逻辑
	 }
}
 
 
function autoiframesize(ifId) {
	//window.setInterval("reinitIframe('"+ifId+"')", 200);
}



/**
 * radio选中对象
 * @param value 
 * @param radioId
 * @return
 */
function radioSelected(value,radioId){
	if(value!="" && value !=null){
		var radioObjs = document.getElementsByName(radioId);
		for (var i = 0;i<radioObjs.length;i++){
			if(radioObjs[i].value == value){			
				radioObjs[i].checked =true;
			}
		}
	}
}


/**
 * 导出明细Excel（财务专用）
 */
function exportDetailExcel(templateId, tblMdlId) {
	if (typeof tblMdlId == "undefined"){
		tblMdlId = tableModelId;
	}
	if (selectedRid == null) {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	} else if (typeof templateId == "undefined" || templateId == ""){
		showMessage("MSG0027");//缺少报表模板ID！
	} else {
		var url=rootPath+"/credit/finance/bill/excelExportImport/ExportDetailExcel?tableModelId=" + tblMdlId + "&RID=" + selectedRid + "&REPORTTEMPLETID=" + templateId;
		location.href = comUrl(url);
	}
}

/**
 * 导入明细Excel（财务专用）
 */
function importDetailExcel(tblMdlId) {
	if (typeof tblMdlId == "undefined"){
		tblMdlId = tableModelId;
	}
	var url=rootPath+"/credit/finance/bill/excelExportImport/ImportDetailExcel?tableModelId=" + tblMdlId;
	openModalDialog(comUrl(url),window,'dialogWidth:450px;dialogHeight:50px');
}

/**
 * 导入Excel（新增数据）
 */
function importExcelNewData(params) {
	var url=rootPath+"/fmp/FrameBiz/InvokeImportExcelNewData";
	if (typeof params != "undefined" && params != ""){
		url += "?" + params;
	}
	openModalDialog(comUrl(url),window,'dialogWidth:450px;dialogHeight:50px');
}


/**
 * 浮点数加法运算
 * @param arg1
 * @param arg2
 * @return
 */
function FloatAdd(arg1,arg2){
     var r1,r2,m;
     try{
    	 r1=arg1.toString().split(".")[1].length;
     }catch(e){r1=0;}
     try{
    	 r2=arg2.toString().split(".")[1].length;
     }catch(e){r2=0;}
     m=Math.pow(10,Math.max(r1,r2));
     return (arg1*m+arg2*m)/m;
}

/**
 * 浮点数减法运算
 * @param arg1
 * @param arg2
 * @return
 */
function FloatSub(arg1,arg2){
     var r1,r2,m,n;
     try{
    	 r1=arg1.toString().split(".")[1].length;
     }catch(e){r1=0;}
     try{
    	 r2=arg2.toString().split(".")[1].length;
     }catch(e){r2=0;}
     m=Math.pow(10,Math.max(r1,r2));
     //动态控制精度长度
     n=(r1>=r2)?r1:r2;//(r1&gt;=r2)?r1:r2;
     return ((arg1*m-arg2*m)/m).toFixed(n);
}

/**
 * 浮点数乘法运算
 * @param arg1
 * @param arg2
 * @return
 */
function FloatMul(arg1,arg2){
     var m=0,s1=arg1.toString(),s2=arg2.toString();
     try{
    	 m+=s1.split(".")[1].length;
     }catch(e){}
     try{
    	 m+=s2.split(".")[1].length;
     }catch(e){}
     return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}


/**
 * 浮点数除法运算
 * @param arg1
 * @param arg2
 * @return
 */
function FloatDiv(arg1,arg2,scale){
     var t1=0,t2=0,r1,r2;
     try{
    	 t1=arg1.toString().split(".")[1].length;
     }catch(e){}
     try{
    	 t2=arg2.toString().split(".")[1].length;
     }catch(e){}
     with(Math){
         r1=Number(arg1.toString().replace(".",""));
         r2=Number(arg2.toString().replace(".",""));
         if(typeof(scale) != "undefined" ){
        	 return roundFun((r1/r2)*pow(10,t2-t1),scale);
         }else{
             return (r1/r2)*pow(10,t2-t1);
         }
     }
}

/**
 * 保留小数位位数函数
 * @param numberRound
 * @param roundDigit
 * @return
 */
function  roundFun(numberRound,roundDigit){  
    var digit=Math.pow(10,roundDigit);
    return   (Math.round(numberRound*digit)/digit);  
}

/**
 * 获取系统业务参数
 * @param Param
 * @return
 */
function getSysParam(Param){
	var url = rootPath+"/credit/finance/bill/fundPayBill/FinFundPayBillBiz/getSSysBizParam?ParamName="+Param;
	XMLHttp.urlSubmit(comUrl(url),null);
	if(XMLHttp.message != null && XMLHttp.message != ""){       //判断是否有还款计划数据  
		return XMLHttp.message; 
	}else{
		return "";
	}	
}


function onclickDocument(){
	if (typeof(calendar) != "undefined"){
		if(calendar && calendar.eventSrc != window.event.srcElement){
			calendar.hide();		
		}
		var colDiv=$_("selectColDiv");
		if (colDiv){
			if(colDiv.canhide){
				colDiv.style.display = "none";			
			}
			colDiv.canhide = true;
		}
	}

}
document.onclick = onclickDocument;


/**
 * 获取url中的某个参数值
 * @param param	参数名称
 * @return	返回url中与参数名称对应的参数值
 */
function getUrlParamValue(param){
	var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
	var arr = window.location.search.substr(1).match(reg);
	if (arr != null){
		return unescape(arr[2]);
	}else{
		return "";
	}
}

/**
 * 获取当前url后，根据参数名称设置对应的参数值
 * @param param	参数名称
 * @param value	对应的参数值
 * @return	返回url
 */
function setUrlParamValue(param,value){
	var url = window.location.href;
	var reg = new RegExp("(\\\?|&)" + param + "=([^&]+)(&|$)", "i");
	var arr = url.match(reg);
	if (arr){
		return url.replace(reg, function($0, $1, $2){ return ($0.replace($2, value)); } );
	}else{
		if (url.indexOf("?") == -1){
			return (url + "?" + param + "=" + value);
		}else{
			return (url + "&" + param + "=" + value);
		}
	}
}

/**
 * 实现selectbox双击功能
 * 如设置职位：双击可授职位中某一职位可添加该职位到已授职位
 * @return
 */
function addSelectDblClickMethod(){
	var leftSelectObj = document.getElementById("leftSelectBox");
	var rightSelectObj = document.getElementById("rightSelectBox");
	leftSelectObj.attachEvent("ondblclick",leftToRightAttClick); 
	rightSelectObj.attachEvent("ondblclick",rightToLeftAttClick);
	 
	function leftToRightAttClick(){  
		moveOption(leftSelectObj, rightSelectObj);
	}  
	function rightToLeftAttClick(){  
		moveOption(rightSelectObj, leftSelectObj);
	}
}


/********以下为控制下拉列表按键快速选择方法***********/
var selChar="",timer=null;
function spellList(obj){
	with(window.event){
        with(srcElement){
            if(keyCode<48){
         	   return;
            }
            if(keyCode>95){
         	   keyCode-=48;
            }
            selChar+=String.fromCharCode(keyCode);
            window.status=selChar;
            for(i=0;i<obj.length;i++){
	               	if(!options[i].sp){
	               		var tmp="";
	               		arr=getSpell(obj.options[i].text,"'").split("'");
	               		for(var j=0;j<arr.length;j++){
	               			tmp+=arr[j].substr(0,1).toUpperCase();
	               		}
	               		options[i].sp=tmp;
	               	}
	               	if(options[i].sp.indexOf(selChar)==0){
	               		obj.selectedIndex=i;
	               		break;
	               	}
            }
        }
        returnValue=false;
        clearTimeout(timer);
        timer=setTimeout("selChar=''",500);
   }
}

var strGB="啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧饨饩饪饫饬饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡缢缣缤缥缦缧缪缫缬缭缯缰缱缲缳缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶钷钸钹钺钼钽钿铄铈铉铊铋铌铍铎铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒锓锔锕锖锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤镥镦镧镨镩镪镫镬镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨鸩鸪鸫鸬鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦鹧鹨鹩鹪鹫鹬鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅龆龇龈龉龊龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞鲟鲠鲡鲢鲣鲥鲦鲧鲨鲩鲫鲭鲮鲰鲱鲲鲳鲴鲵鲶鲷鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋鳌鳍鳎鳏鳐鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄";
var qswhSpell=["a",0,"ai",2,"an",15,"ang",24,"ao",27,"ba",36,"bai",54,"ban",62,"bang",77,"bao",89,"bei",106,"ben",121,"beng",125,"bi",131,"bian",155,"biao",167,"bie",171,"bin",175,"bing",181,"bo",190,"bu",211,"ca",220,"cai",221,"can",232,"cang",239,"cao",244,"ce",249,"ceng",254,"cha",256,"chai",267,"chan",270,"chang",280,"chao",293,"che",302,"chen",308,"cheng",318,"chi",333,"chong",349,"chou",354,"chu",366,"chuai",382,"chuan",383,"chuang",390,"chui",396,"chun",401,"chuo",408,"ci",410,"cong",422,"cou",428,"cu",429,"cuan",433,"cui",436,"cun",444,"cuo",447,"da",453,"dai",459,"dan",471,"dang",486,"dao",491,"de",503,"deng",506,"di",513,"dian",532,"diao",548,"die",557,"ding",564,"diu",573,"dong",574,"dou",584,"du",591,"duan",606,"dui",612,"dun",616,"duo",625,"e",637,"en",650,"er",651,"fa",659,"fan",667,"fang",684,"fei",695,"fen",707,"feng",722,"fo",737,"fou",738,"fu",739,"ga",784,"gai",786,"gan",792,"gang",803,"gao",812,"ge",822,"gei",839,"gen",840,"geng",842,"gong",849,"gou",864,"gu",873,"gua",891,"guai",897,"guan",900,"guang",911,"gui",914,"gun",930,"guo",933,"ha",939,"hai",940,"han",947,"hang",966,"hao",969,"he",978,"hei",996,"hen",998,"heng",1002,"hong",1007,"hou",1016,"hu",1023,"hua",1041,"huai",1050,"huan",1055,"huang",1069,"hui",1083,"hun",1104,"huo",1110,"ji",1120,"jia",1173,"jian",1190,"jiang",1230,"jiao",1243,"jie",1271,"jin",1298,"jing",1318,"jiong",1343,"jiu",1345,"ju",1362,"juan",1387,"jue",1394,"jun",1404,"ka",1415,"kai",1419,"kan",1424,"kang",1430,"kao",1437,"ke",1441,"ken",1456,"keng",1460,"kong",1462,"kou",1466,"ku",1470,"kua",1477,"kuai",1482,"kuan",1486,"kuang",1488,"kui",1496,"kun",1507,"kuo",1511,"la",1515,"lai",1522,"lan",1525,"lang",1540,"lao",1547,"le",1556,"lei",1558,"leng",1569,"li",1572,"lia",1606,"lian",1607,"liang",1621,"liao",1632,"lie",1645,"lin",1650,"ling",1662,"liu",1676,"long",1687,"lou",1696,"lu",1702,"lv",1722,"luan",1736,"lue",1742,"lun",1744,"luo",1751,"ma",1763,"mai",1772,"man",1778,"mang",1787,"mao",1793,"me",1805,"mei",1806,"men",1822,"meng",1825,"mi",1833,"mian",1847,"miao",1856,"mie",1864,"min",1866,"ming",1872,"miu",1878,"mo",1879,"mou",1896,"mu",1899,"na",1914,"nai",1921,"nan",1926,"nang",1929,"nao",1930,"ne",1935,"nei",1936,"nen",1938,"neng",1939,"ni",1940,"nian",1951,"niang",1958,"niao",1960,"nie",1962,"nin",1969,"ning",1970,"niu",1976,"nong",1980,"nu",1984,"nv",1987,"nuan",1988,"nue",1989,"nuo",1991,"o",1995,"ou",1996,"pa",2003,"pai",2009,"pan",2015,"pang",2023,"pao",2028,"pei",2035,"pen",2044,"peng",2046,"pi",2060,"pian",2077,"piao",2081,"pie",2085,"pin",2087,"ping",2092,"po",2101,"pu",2110,"qi",2125,"qia",2161,"qian",2164,"qiang",2186,"qiao",2194,"qie",2209,"qin",2214,"qing",2225,"qiong",2238,"qiu",2240,"qu",2248,"quan",2261,"que",2272,"qun",2280,"ran",2282,"rang",2286,"rao",2291,"re",2294,"ren",2296,"reng",2306,"ri",2308,"rong",2309,"rou",2319,"ru",2322,"ruan",2332,"rui",2334,"run",2337,"ruo",2339,"sa",2341,"sai",2344,"san",2348,"sang",2352,"sao",2355,"se",2359,"sen",2362,"seng",2363,"sha",2364,"shai",2373,"shan",2375,"shang",2391,"shao",2399,"she",2410,"shen",2422,"sheng",2438,"shi",2449,"shou",2496,"shu",2506,"shua",2539,"shuai",2541,"shuan",2545,"shuang",2547,"shui",2550,"shun",2554,"shuo",2558,"si",2562,"song",2578,"sou",2586,"su",2589,"suan",2602,"sui",2605,"sun",2616,"suo",2619,"ta",2627,"tai",2636,"tan",2645,"tang",2663,"tao",2676,"te",2687,"teng",2688,"ti",2692,"tian",2707,"tiao",2715,"tie",2720,"ting",2723,"tong",2733,"tou",2746,"tu",2750,"tuan",2761,"tui",2763,"tun",2769,"tuo",2772,"wa",2783,"wai",2790,"wan",2792,"wang",2809,"wei",2819,"wen",2852,"weng",2862,"wo",2865,"wu",2874,"xi",2903,"xia",2938,"xian",2951,"xiang",2977,"xiao",2997,"xie",3015,"xin",3036,"xing",3046,"xiong",3061,"xiu",3068,"xu",3077,"xuan",3096,"xue",3106,"xun",3112,"ya",3126,"yan",3142,"yang",3175,"yao",3192,"ye",3207,"yi",3222,"yin",3275,"ying",3291,"yo",3309,"yong",3310,"you",3325,"yu",3346,"yuan",3390,"yue",3410,"yun",3420,"za",3432,"zai",3435,"zan",3442,"zang",3446,"zao",3449,"ze",3463,"zei",3467,"zen",3468,"zeng",3469,"zha",3473,"zhai",3487,"zhan",3493,"zhang",3510,"zhao",3525,"zhe",3535,"zhen",3545,"zheng",3561,"zhi",3576,"zhong",3619,"zhou",3630,"zhu",3644,"zhua",3670,"zhuai",3672,"zhuan",3673,"zhuang",3679,"zhui",3686,"zhun",3692,"zhuo",3694,"zi",3705,"zong",3720,"zou",3727,"zu",3731,"zuan",3739,"zui",3741,"zun",3745,"zuo",3747];
function getSpell(str,sp){
	var i,c,t,p,ret="";
	if(sp==null){
		sp="";
	}
	for(i=0;i<str.length;i++){
		if(str.charCodeAt(i)>=0x4e00){
			p=strGB.indexOf(str.charAt(i));
			if(p>-1&&p<3755){
				for(t=qswhSpell.length-1;t>0;t=t-2){
					if(qswhSpell[t]<=p){
						break;
					}
				}
				if(t>0){
					ret+=qswhSpell[t-1]+sp;
				}
			}
		}
	}
	return ret.substr(0,ret.length-sp.length);
}
/********以上为控制下拉列表按键快速选择方法***********/


/*
*通用移除等待遮罩div
*/
function hideProgressDiv(){
	var obj = getMainWindow();
	try{
		obj.main_HideProgressDiv(obj);	
	}catch(e){
		if (pub_isDebugMode){
			alert(e.message);
		}
	}
	/*
	var obj=document.getElementById("divprogressbar");
	if(obj){
		document.body.removeChild(obj);
	}	
	*/
} 


/*
*通用启动等待遮罩div
*/
function showProgressDiv(){
	var obj = getMainWindow();
	try{
		obj.main_ShowProgressDiv(obj);
	}catch(e){
		if (pub_isDebugMode){
			alert(e.message);
		}		
	}
	/*
	var obj=document.getElementById("divprogressbar");
	if(!obj){
		obj =  document.createElement("div");
		obj.className = "div_progressbar";
		obj.id = "divprogressbar";
		document.body.appendChild(obj);
		setTimeout("hiddProgressDiv()",15000);
	}*/
}
 
/*
 * 获取列表所选行的rid，若未取到则将截取传入对象的id里的rid by ldn
 */
function getSelectedRid(obj){
	//if(typeof(selectedRid) == "undefined" || selectedRid == ""){
	var objId = obj.id;
	if (typeof(objId) != "undefined"){
		var pdx = objId.lastIndexOf("_rid_");
		if (pdx > 0){
			return objId.substring(objId.lastIndexOf("_rid_")+5);
		}else{
			return "";
		}
	}else{
		return "";
	}
	//}else{
	//	return selectedRid ; 
	//}
}

/*
 * 判断若为空字符串则返回默认值
 */
function isNullDefault(s,defs){
	if(s == ''){
		return defs;
	}else{
		return s;
	}
}


function resetFocus(){
	//防止div窗口出现焦点丢失的问题
	for(var i = 0; i < document.all.length; i++){
		  var obj = document.all(i);  
		  try{
			  if(typeof (obj.type) != "undefined" && obj.type == "text"){
				  if (obj.readOnly == false && obj.disabled == false && obj.style.display != "none"){
					  obj.focus(); 
					  break;		
				  }  
			  }    
		  }catch(e){
			 //此处不影响业务，可以不处理异常
				// alert(e.message);
		  }
	}	
}


/**
 * 通过浏览器控制台输出日志
 */
function fmpDebug(msg){
	
	if (true){
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds() + "."+ date.getMilliseconds();
 
		console.log(currentdate+": "+msg);
	}
}



/*
 * MAP对象，实现MAP功能
 *
 * 接口：
 * size()     获取MAP元素个数
 * isEmpty()    判断MAP是否为空
 * clear()     删除MAP所有元素
 * put(key, value)   向MAP中增加元素（key, value) 
 * remove(key)    删除指定KEY的元素，成功返回True，失败返回False
 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL
 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
 * containsKey(key)  判断MAP中是否含有指定KEY的元素
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素
 * values()    获取MAP中所有VALUE的数组（ARRAY）
 * keys()     获取MAP中所有KEY的数组（ARRAY）
 *
 * 例子：
 * var map = new Map();
 *
 * map.put("key", "value");
 * var val = map.get("key")
 * ……
 *


function Map() {
    this.elements = new Array();
    //获取MAP元素个数
    this.size = function() {
        return this.elements.length;
    };
    //判断MAP是否为空
    this.isEmpty = function() {
        return (this.elements.length < 1);
    };
    //删除MAP所有元素
    this.clear = function() {
        this.elements = new Array();
    };
    //向MAP中增加元素（key, value) 
    this.put = function(_key, _value) {
//        this.elements.push( {
//            key : _key,
//            value : _value
//        });
    	  this.elements.push(_key);
    	  this.elements[_key] = _value;
    };
    //删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        	//this.elements.splice(_key,1);
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
    	return this.elements[_key];
//        try {
//            for (i = 0; i < this.elements.length; i++) {
//                if (this.elements[i].key == _key) {
//                    return this.elements[i].value;
//                }
//            }
//        } catch (e) {
//            return null;
//        }
    };
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    };
    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    };
    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    };
    
    this.toJson = function(){
    	return JSON.stringify(this.data);
    };    
  
}

 */
 
/**
 * 该方法只用于老版本程序中的map
 */
function Map() {      
	this.keys = new Array();   
	this.data = new Object();   
	//放入一个键值对   
	this.put = function(key, value) {   
		if($(this.data).attr(key) == undefined){   
			this.keys.push(key);   
		}   
		//this.data[key] = value;   
		$(this.data).attr(key,value);
	};   
	
	
	//获取某键对应的值   
	this.get = function(key) {   
		return $(this.data).attr(key);   
	};
	
    //判断MAP是否为空
    this.isEmpty = function() {
        return (this.keys.length < 1);
    };	
    
    this.toJson = function(){
    	return JSON.stringify(this.data);
    };

}  


function OpMap(jsonObj){
	var rootObj = this;
	if (jsonObj != undefined){
		$.each(jsonObj,function(k,v){
			$(rootObj).attr(k,v);
		});
	}
	//放入一个键值对   
	this.put = function(key, value){
		$(this).attr(key,value);
		if (jsonObj != undefined){
			$(jsonObj).attr(key,value);
		}
	};
	
	//获取某键对应的值   
	this.get = function(key) {   
		return $(this).attr(key);   
	};	
	
    this.toJson = function(){
    	return JSON.stringify(this);
    };	
}

/**
 * js实现list
 * 
 */
function OpList(jsonObj) {
	var rootObj = this;
    this.value = [];

    if (jsonObj != undefined){
    	$.merge(this.value,jsonObj);
    }
    
    
    /* 添加 */
    this.add = function(obj) {
    	if (jsonObj != undefined){
    		jsonObj.push(obj);
    	}
        return this.value.push(obj);
    };
    this.insert = function (index, obj) {
    	if (jsonObj != undefined){
    		jsonObj.splice(index, 0, obj);
    	}
    	this.value.splice(index, 0, obj);
    };
    /* 大小 */
    this.size = function() {
        return this.value.length;
    };
    /* 返回指定索引的值 */
    this.get = function(index) {
        return this.value[index];
    };
    
    /* 以OpMap的方式获取对象*/
    this.getOpMap = function(index){
    	if (typeof this.value[index] != "OpMap"){
    		if (jsonObj != undefined){
    			return new OpMap(jsonObj[index]);
    		}else{
    			return new OpMap(this.value[index]);
    		}    		
    	}
    };
    
    /* 删除指定索引的值 */
    this.remove = function(index) {
    	if (jsonObj != undefined){
    		jsonObj.splice(index,1);
    	}
        this.value.splice(index,1);
        return this.value;
    };
    /* 删除全部值 */
    this.removeAll = function() {
    	if (jsonObj != undefined){
    		jsonObj = [];
    	}
        return this.value = [];
    };
    /* 是否包含某个对象 */
    this.constains = function(obj) {
        for ( var i in this.value) {
            if (obj == this.value[i]) {
                return true;
            } else {
                continue;
            }
        }
        return false;
    };

    /* 是否包含某个对象 */
    this.getAll = function() {
        var allInfos = '';
        for ( var i in this.value) {
            if(i != (value.length-1)){
                allInfos += this.value[i]+",";
            }else{
                allInfos += this.value[i];
            }
        }
        //alert(allInfos);
        return allInfos += this.value[i]+",";;
    };
    
    this.toJson = function(){
    	return JSON.stringify(this.value);
    };

}

/**
 * 把list对象装载到表格
 * @param tableId		table的ID
 * @param list			数据列表对象
 * @param footIdx		合计信息所在的行
 * @param opType		操作类型   1: 需要追加和删除按钮
 * @return
 */
function LoadTableFromOpList(tableId,oplist,footIdx,opType){
	//alert($("#repayTable").attr("mytestattr"));
	if (oplist != null && oplist != undefined){
		$("#"+tableId+" tbody tr").remove();
		var trs = "";
		var fts = "";
		for (var i in oplist.value){
			var map = oplist.value[i];
			var tds = "";
			$("#"+tableId+" thead tr:last td").each(function(idx){
				var fld = $(this).attr("datafld");
				if (fld == "operation"){
					if (footIdx == null || footIdx == undefined || i<footIdx){
						tds +=  "<td id=\""+tableId+"_"+i+"_"+fld+"\">";
						if (opType == 1){
							tds +=" <INPUT type=\"button\" class=\"h5button green small\" name=\"newRow\" value=\"追加\" onclick=\"insertToList("+i+")\"/>" 
							+" <INPUT type=\"button\" class=\"h5button orange small\" name=\"delRow\" value=\"删除\" onclick=\"deleteFromList("+i+")\" />"
						}else if (opType == 2){
							//tds +=" <INPUT type=\"button\" class=\"h5button orange small\" name=\"delRow\" value=\"删除\" onclick=\"deleteFromList("+i+")\" />"							
						}
						tds +="</td>";		
					}
					else{
						tds +="<td></td>";
					}
				}else{
					var v = $(map).attr(fld);
					if (v == undefined){
						v = "";
					}
					tds +=  "<td id=\""+tableId+"_"+i+"_"+fld+"\">"+v+"</td>";
				}	
			});	
			if (footIdx == null || footIdx == undefined || i<footIdx){
				trs += "<tr id=\""+tableId+"_"+i+"\">"+tds+"</tr>";
			}else{
				fts += "<tr id=\""+tableId+"_"+i+"\">"+tds+"</tr>";
			}
		}
		$("#"+tableId+" tbody").html(trs);
		$("#"+tableId+" tfoot").html(fts);
	}


}





