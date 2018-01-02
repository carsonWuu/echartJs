<!-----------------------------------
* @文件描述：系统头文件包含页面
------------------------------------>
<%@page language="java" contentType="text/html; charset=UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<script type="text/javascript">
	function commonOnload(){
		/*var OnLoadMsg = "${OnLoadMsg}";
		if (OnLoadMsg != ""&&OnLoadMsg != "null"){
			showMessage(OnLoadMsg);
			doRefreshList();		
		}	*/
	}
     
	function commonAddOnload(){
		commonOnload();
	}
	function commonUpdateOnload(){
		commonOnload();	
	}	
	function commonListOnload(){
		commonOnload();	
	}	
	function commonViewOnload(){
		commonOnload();	
	}	
 
	/**
	*以下用于控制div窗口的高度在默认的区间范围内
	
 
	var topWin = getMainWindow();
	if(topWin && topWin.getTopWinDivId){
		var topWinDivId = topWin.getTopWinDivId();
		if(topWinDivId !=""){
			//var currContetHeight = rtIntPx(document.getElementById('testHeightDiv').offsetTop+document.body.scrollTop+30);
			var currDivWinObj = topWin.document.getElementById(topWinDivId);
			if(currDivWinObj){
				var maxHeight = rtIntPx(currDivWinObj.maxDefHeight);
				var minHeight = rtIntPx(currDivWinObj.minDefHeight);

				var nowHeight = 0;
				if(currContetHeight < maxHeight && currContetHeight >minHeight){
					nowHeight = currContetHeight;
				}else if(currContetHeight > maxHeight){
					nowHeight = maxHeight;
				}else if(currContetHeight < minHeight){
					nowHeight = minHeight;
				}


				if(typeof isStatePic != "undefined" && isStatePic){
					//若是单独的状态灯页面（不是从表），则将页面高度设为最大值
					currDivWinObj.style.height = maxHeight +"px";
				}
				if(nowHeight > rtIntPx(currDivWinObj.style.height)){
					currDivWinObj.style.height = nowHeight +"px";
				}
			}
		}
	}
	
	*/

	function onResize(){
		return;  //by pzj 此方法已经不需要  
		for (var i = 0;i<50;i++){
			var tagObj = document.getElementById("tagContent"+i);
			if (tagObj){
				if(tagObj.style.height){
					tagObj.style.height = (document.body.offsetHeight - 80)+"px";
				}
				//setTimeout(function(){autoResize(i)},500);
			}else{
				return;
			}
			/*
			var winObj = window.top.document.getElementById("winContent"+i);
			if (winObj){
				//winObj.style.width = (document.body.offsetWidth - 60)+"px";
				winObj.style.height = (document.body.offsetHeight+50)+"px";
			}
			
			
			var ifrObj = document.getElementById("infoFrame_"+i);
			if (ifrObj){
				ifrObj.style.width = (document.body.offsetWidth - 60)+"px";
				ifrObj.style.height = 777;//(document.body.offsetHeight - 80)+"px";
			}	
			*/	
		}
		
	}

	
	function rtIntPx(num){
		var tempValue = 0;
		if(typeof num != 'number' && num.indexOf('px') != -1){
			tempValue = parseInt(num.substring(0,num.indexOf('px')));
		}else{
			tempValue = parseInt(num);
		}
		return tempValue;
	}
	//防止div窗口出现焦点丢失的问题
	//resetFocus();
	
	function hideProgressDiv(){
		var topWin = getMainWindow();
		var obj = topWin.document.getElementById("divprogressbar");
		if(obj){
			topWin.document.body.removeChild(obj);
		}	
	}	
	hideProgressDiv();
	
</script>

<div id="testHeightDiv" style="position:relative"></div>