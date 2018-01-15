<%-----------------------------------
* @文件描述：系统主框架页面
* @版权所有：
* @功能说明：系统主页面展示
* @作者          ： 潘智杰
* @创建日期：2011-08-10
* @版本          ：v1.0
* @修改记录：
* @修改说明：
* @修改人     ：
* @修改日期：
------------------------------------%>
 
<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%
	String rootPath = request.getContextPath();
%>
<html>
<head>
<title>珠海市公安局IDC安全管理系统</title>
<META http-equiv="X-UA-Compatible" content="IE=10" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="<%=rootPath%>/styles/fmp/frameStyle.css" rel="stylesheet"
	type="text/css" />
<link href="<%=rootPath%>/styles/fmp/mainframe.css" rel="stylesheet"
	type="text/css" />
<link rel="STYLESHEET" type="text/css"
	href="<%=rootPath%>/styles/fmp/dhtmlxtree.css">
<script src="<%=rootPath%>/scripts/fmp/forbid.js" type="text/javascript"
	language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/ajaxSubmit.js"
	type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/fmpcommon.js"
	type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/dhtmlxcommon.js"></script>
<script src="<%=rootPath%>/scripts/dhtmlxtree.js"></script>	
<script src="<%=rootPath%>/scripts/commontree.js"></script>	
<script src="<%=rootPath%>/scripts/fmp/jquery-1.11.3.js"></script>	

<style type="text/css">
.banner_label{
	position: relative;
	left: 80%;
	top: 35px;
	height: 20px;
	color: black;
}
</style>

<style type="text/css">
        .tree{		
		border-top:2px solid #4499ee;
		border-left:2px solid #4499ee;
		overflow：auto;	
		}
</style>

<script language="JavaScript">

	var rootPath = '<%=rootPath%>';

    var excelObject = "";
    var wordObject = "";
	var timerID=null;
	var timerRunning=false;
	var selectValue="";
	var selectContent="";
	var menuElement;
	var divWinPath = "";
	var currDivId = 0;
	var locked = false;
 
	function moveLeftFrame(cssleft,cssright,yqti,slide,alt,obj) {
		var yq = document.getElementById(yqti);
		var sl = document.getElementById(slide);
		var alrt = document.getElementById(alt);
		
		if(yq.style.display=='none'){
			yq.style.display='inline';
			alrt.alt='点击隐藏';
			sl.className=cssleft;
			obj.style.width="83%";		
			//obj.style.width="81.1%";		
		//	if(browserversion==7)
		//	  obj.style.width="84.4%";
		} else {
			obj.style.width="99%";
			//obj.style.width="98.8%";
			yq.style.display='none';
			alrt.alt='点击显示';
			sl.className=cssright;
		}
		
	}

	function stopClock()
	{
		if(timerRunning)
			clearTimeout (timerID);
		timerRunning=false;
	};
	
	function showTime()
	{
		var now=new Date();
		var year=now.getFullYear();
		var month=now.getMonth()+1;
		var date=now.getDate();
		var hours=now.getHours();
		var mins=now.getMinutes();
		var secs=now.getSeconds();
		var timeVal="";
		
		timeVal += year+'年';
		timeVal += ((month < 10) ? "0" : "") + month + "月";
		timeVal += date + "日";
		timeVal += ((hours < 12) ? "上午" : "下午");
		timeVal += ((hours<=12) ? hours : hours-12);
		timeVal += ((mins<10)? ":0" : ":")+ mins;
//		timeVal += ((secs<10)? ":0" : ":")+ secs;
		
		document.getElementById('time').innerHTML = timeVal;
		timerID = setTimeout("showTime();",1000);
		timerRunning = true;
	};
	
	function startClock()
	{
		stopClock();
		showTime();
	};

	function lockWindow(){      //锁屏
		if(window.confirm("是否锁屏？")){
			confirmLock();
	    }
	}

	function confirmLock(){     //确认锁屏
		locked = true;
		createDiv();
    	var dataObj = new Object(); 
    	dataObj.validvalue=null;
    	var result = false;
    	var url = rootPath+"/fmp/base/ValidLockPage?loginCode="+window.loginCode+"&userid="+window.CURR_USERID;

    	
   		//do{
   			var httpObj = new XMLHttpRequest();
   			httpObj.open("HEAD", url, false);
   			httpObj.send();
   		 	if(!(httpObj.readyState == 4 && (httpObj.status == 200 || httpObj.status == 304))){
   		  		if(confirm("当前网络发生故障，是否关闭所有窗口")) {
    	 			window.opener = null;
    	 			window.open('','_self');
    	 			window.close();
   					return;
   				}
   	   		}
       	 	//window.showModalDialog(url,dataObject,"dialogWidth:384px;dialogHeight:162px;center:yes;help:no;resizable:no;status:yes"); 
			var winLeft = (self.screen.width - 400)/2;
			var winTop = (self.screen.height - 205)/2;
       	 	openModalDialog(url,dataObj,"title:系统已锁定;dialogLeft:"+winLeft+"px;dialogTop:"+winTop+"px;dialogWidth:400px;dialogHeight:205px;center:yes;help:no;resizable:no;status:yes; scrolling: no;winStyle:panel;");
       	    dataObj.backCall=function(){
           	 	if (dataObj.validvalue != null) {         	 	
             		result = dataObj.validvalue;
         		}
           		if(dataObj.validvalue == "closeLock"){
        	 		result = true;
        	 		window.lastMove = new Date().getTime();
        	 		removeDiv("cover");
        	 		quit();
        	 		//window.top = null;
        	 		//window.open('','_self');
        	 		//window.close();
        	 		//window.opener=null;  
        	 		//window=null;  
            	}else{
                	if(result){
    	    			window.lastMove = new Date().getTime();
    	    			removeDiv("cover");
                	}
          		}
       	    };
       	    

        //}while(!result);
	}

	if(typeof window.loginCode == "undefined" || window.loginCode == ""){
		window.loginCode = "${sessionScope.LOGINCODE}";
		window.CURR_USERID = "${sessionScope.CURR_USERID}";
	}
	document.onmousemove = function(){ 
		window.lastMove = new Date().getTime(); 
	}; 
	if(typeof window.lockTime == "undefined" || window.lockTime == ""){
		var LOCKTIME = "${sessionScope.LOCKTIME}";
		window.lockTime = parseInt(LOCKTIME)*60000;   //不操作鼠标就锁定页面的时间
	}
	window.lastMove = new Date().getTime();
	window.setInterval(function(){
		var now = new Date().getTime(); 
		if( now - lastMove > lockTime ){  //判断是否超过设置时间
			if (locked == false){
				confirmLock();
			}
		}
	}, 1000);
	function exit(){
		var flag = window.confirm('您确定要退出么? ');
		if(flag)
			window.location='Logout';
		return;
	};
		
	function encodeURL(url) {
		if (url) {
			if(url.indexOf("http://") != -1)
				return url;
			var sample = "<emp:url action='[sample]'/>";
			var newurl = sample.replace("[sample]",url);
			var b = 0;
			var reg = new RegExp("(.*)\\?(.*)\\?(.*)");
			return newurl.replace(reg, "$1?$2&$3");
		}
	};
	
	function quit(){
		exit();
		//window.location.href='${context.sysLogout}';
		//window.location.href='http://10.2.41.94:8088/CCIS/signOut.do?address=0000A4EE00C0C9D0C46B349218A63B2E|4703000050';
	}
		
	function loadContent(){
		//document.getElementById("Page_middle").style.height="780px";
	    document.getElementById("sessionExceptionUrl").value="${context.sessionExceptionUrl}";
		getMenuData("<%=rootPath%>/fmp/FrameBiz/GetMenuXML");
		//alert(document.all["TreeContainDiv"].style);
		//document.all["TreeContainDiv"].style.height = 470;
		//document.all["TreeContainDiv"].style.width = 200;
		//startClock();
		var url = '${context.loginUrl}';
		var urlForChangeSys='${context.address}&&loginUrl=${context.loginUrl}';
		var urlChangeSys='${context.address}&&loginUrl=${context.loginUrl}';
		url = encodeURI(url);

			
		document.getElementById("menu_lv1").innerHTML=
			 '<table class="table_menu_lv1">'
			 +'<tr>'
			 	+'<td style="width:10px;align:right">'
			 		+'<div class="userInfoBar_left"></div>'
			 	+'</td>'
			 	+'<td  >'
					 +'<div class="userInfoBar" onmouseover="showRoleInfo()" onmouseout="hideRoleInfo()" onmousemove="showRoleInfo()">'
			 			+ '<br><a>当前用户: ${CURR_USERNAME}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
			 			+ '所属部门: ${CURR_DEPTNAME}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>'
			 			+'<div id="hint" style="position:absolute;display:none;width:100px; "></div>  '
			 		+ '</div>'
			 	+'</td>'
			 	+'<td style="width:140px" >'
			 		+'<div class="userButtonBar"  > <div style=" padding-top:6px; ">'
			 			+'<div style=" float: left;   background: url(<%=rootPath%>/images/bar/quit.gif) right repeat-x;  height: 21px;width: 65px;color:#0050ac;"><a style=" color:#0050ac;text-decoration: none;" onclick="quit()" href="#" > &nbsp;&nbsp;退出系统</a></div>'
	         			+'<div style=" float: right;   background: url(<%=rootPath%>/images/bar/locking.gif) right repeat-x; height: 21px;width: 46px;color:#dd5f0b;"><a onclick="lockWindow()" href="#" style="  color:#dd5f0b;text-decoration: none;">&nbsp;&nbsp; 锁屏</a></div>'
	         		+'</div></div>'
	         	+'</td>'
	         	+'</tr></table>';
		//初始化框架大小 add by jgf
		//window.open("www.baidu.com");
		resizeEleWH();
		//alert($("#infoframe"));
		//$("#infoframe").attr("src",rootPath+"/fmp/system/notice/NoticeBiz/ShowNotice?moduleId=s_md_fhzy&tableModelId=SAffiche");
		//alert(rootPath);
		//window.open(rootPath+"/fmp/system/notice/NoticeBiz/ShowNotice?moduleId=s_md_fhzy&tableModelId=SAffiche","infoFrame");	
		
		//setTimeout("FixLayout()",5000);
		FixLayout();
	};

	/*显示岗位div*/
    function showRoleInfo(){  
        var CURR_ROLENAME = "${CURR_ROLENAME}";
        var oSon = window.document.getElementById("hint");  
        if (oSon == null) return;  
 
	        oSon.innerHTML = CURR_ROLENAME.replace(/,/g,"<br>"); 
	        oSon.style.display = "block";  
 
            var evt = getEvent();   
 
	       //oSon.style.left = (evt.clientX + document.body.scrollLeft  + 200) ;  
	      
	        //oSon.style.top = (evt.clientY + window.document.body.scrollTop + 9) ;  

	        oSon.style.pixelLeft = window.event.clientX + window.document.body.scrollLeft + 6;  
		      
	        oSon.style.pixelTop = window.event.clientY + window.document.body.scrollTop + 9;  	        
 
    } 

    function getEvent() {   
        return window.event || arguments.callee.caller.arguments[0];   
    }        
    /*隐藏岗位div*/
    function hideRoleInfo(){  
        var oSon = window.document.getElementById("hint");  
        if(oSon == null) return;  
        oSon.style.display="none";  
    } 


	
	<%--创建DIV浮层，遮蔽背景--%>
	function createDiv(){
		var cover=document.createElement("div");
		cover.id="cover";
		cover.style.position="absolute";
		//mask.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=4,opacity=25)";//IE的不透明设置
		cover.style.opacity=0.4;//Mozilla的不透明设置black
		cover.style.background="#BFBFBD";
		cover.style.top="0px";
		cover.style.left="0px";
		cover.style.width=self.screen.width;
		cover.style.height=self.screen.height;
		cover.style.zIndex=index++;
		document.body.appendChild(cover);
	}




	/*
		清除遮罩层以及弹出的对话框
	*/	
	function removeDiv(objId){
			var obj=document.getElementById(objId);
			//var msgbox=document.getElementById("msgbox");
			if(obj){
				document.body.removeChild(obj);
			}
	}
	/* 窗口尺寸改变时事件 */
	function EventOnresize() {
		resizeEleWH();
	}
	/* 防止框架变形 */
	function resizeEleWH() {
		var width = document.body.clientWidth; //浏览器宽度
 
		var height = $("#bottonCopyright0").position().top+25;//document.body.clientHeight; //整页高度
		//alert(height);
		var headerHeight = document.getElementById('Header').offsetHeight; //页头高度
		//alert(headerHeight);
		//alert($("#bottonCopyright0").position().top);
		
		if (width<960){
			document.getElementById('Page_content').style.width = "960px";
		}
		else{
			document.getElementById('Page_content').style.width = "100%";
		}
		if (height<452){
			document.getElementById('Page_middle').style.height=452-headerHeight-4-20+'px';
			document.getElementById('Page_left').style.height=452-headerHeight-4-20+'px';
			document.getElementById('infoFrame').height=452-headerHeight-6-20+'px';	
		}
		else{
			document.getElementById('Page_middle').style.height=height-headerHeight-4-20+'px';
			document.getElementById('Page_left').style.height=height-headerHeight-4-20+'px';
			document.getElementById('infoFrame').height=height-headerHeight-6-20+'px';	
		}
	}
	/* 防止框架变形 */
	function FixLayout (){
		//document.getElementById('TreeContainDiv').children[0].style.width="";
		var obj = document.getElementById('TreeContainDiv');
		//obj.style.marginTop = "-260px";
		
		var Page_left_tree_tr = document.getElementById('Page_left_tree_tr');
		var Page_left_tree = document.getElementById('Page_left_tree');
		
		
		
		//alert(obj.parentNode.parentNode.parentNode.childNodes[0].style.height);
	}


	/***创建弹出窗口的层**/
	var divCount = 0;  //div弹出窗口计数 
	var index  = 1;    //初始化点击层的z-index
	var topArr = new Array(); //用于存放最小化的div的top数值

	function createWindowDiv(title,winObj,left,top,width,height,resizable,scrolling,z_index,winStyle){
 
		var temp_left=180;
		var temp_top=50;
		var default_width="970px";
		var default_height_max="700px";  //默认最大高度
		var default_height_min="550px";	 //默认最小高度
		var default_height=default_height_min;
 
		//设置left,top,width,height大小
		if(left) temp_left = left;
		if(top) temp_top = top;
		if(width) default_width = width;
		if(height) default_height = height;
		var default_left=temp_left;
		var default_top=temp_top;
		var temp_x= -1; 
		var temp_y= -1;
		var selected=false;
		if (resizable == undefined){
			resizable = true;
		}else{
			resizable = resizable != "no";
		}
		divCount++;
		//if(document.getElementById('winDiv'+divCount)){
		//	divCount++;
		//}
		var winDiv=document.createElement("div");
		winDiv.maxDefHeight = default_height_max;
		winDiv.minDefHeight = default_height_min;
		winDiv.isMax = true; //窗口是否最大化
		winDiv.onbtn = false;
		winDiv.openerWindow = winObj;
		winDiv.openerDivId = getTopWinDivId();//由于该div的父级div肯定是最顶层的div所以取最顶层div即可
		winDiv.id = "winDiv"+divCount;
 
		
		winDiv.style.position= "absolute";
		
		
		winDiv.style.width=default_width;
		winDiv.style.height=default_height;
		winDiv.style.filter= "progid:DXImageTransform.Microsoft.Shadow(color=#999999,direction=135,strength=8)";
 
		winDiv.style.border="1px solid #78ACD3";
		winDiv.style.background="#FFF";
		winDiv.style.top=temp_top+"px";
		winDiv.style.left=temp_left+"px"; 
		/*
		if (parseInt(winDiv.style.top) + parseInt(winDiv.style.height) > self.screen.height -150 ){
			winDiv.style.top = self.screen.height - parseInt(winDiv.style.height) -150;
		}			
		*/
		if (z_index == undefined){
			winDiv.style.zIndex=index++;
		}else{
			winDiv.style.zIndex=z_index;
		}
		
		document.body.appendChild(winDiv);
		var str="";
		str+='<table width="100%" height="100%"><tr height="1%"><td>';
		
		str+='<div id="titleDiv'+divCount+'" class="winTitle" windivId="'+winDiv.id+'">'+
				'<span id="divWindowTitle'+divCount+'" class="title_left">'+title+'</span>'+
				'<span class="title_right">';
			//		'<a id="msg_min'+divCount+'" title="最小化" href="javascript:void 0">_</a>&nbsp;'+
			//		'<a id="msg_close'+divCount+'" title="关闭" href="javascript:void 0">×</a>&nbsp;&nbsp;'+
					if (winStyle != "panel"){
						str+='<div style="padding-top: 2px; cursor: hand;"><img id="msg_min'+divCount+'" title="最小化" href="javascript:void 0" src="<%=rootPath%>/images/btn/min.png"></img>&nbsp;'+
					'<img id="msg_close'+divCount+'" title="关闭" href="javascript:void 0" src="<%=rootPath%>/images/btn/close.png"></img></div>';	
					}		
					str+='</span>'+
			 '</div>';  //标题栏
		str+='</td></tr><tr height="99%"><td>';	 
		str+='<div class="winContent" id="winContent'+divCount+'">'+
				'<iframe id="ifData'+divCount+'" frameborder="0" name="ifData'+divCount+'" ';
		if (resizable){
			str+='height="100%" width="100%"';
		}else{
			str+='height="110%" width="110%"';
		}
		str+='  ></iframe>'+
			 '</div>';  //窗口内容
		str+='</td></tr></table>';		 
	    str+='<input type="hidden" id="windowType'+divCount+'" name="windowType" value="divWindow"/>';	
	    if (resizable){ 
			str+='<div class="moveDivCss" id="moveDiv'+divCount+'" windivId="'+winDiv.id+'" ></div>';
	    }
		
		winDiv.innerHTML = str;

		$("#"+winDiv.id).css("-webkit-box-shadow","#666 0px 0px 10px");
		$("#"+winDiv.id).css("-moz-box-shadow","#666 0px 0px 10px");
		$("#"+winDiv.id).css("box-shadow","#666 0px 0px 10px");
		$("#"+winDiv.id).css("border-radius","8px");
		var td =document.getElementById("titleDiv"+divCount);
 
		//td.setAttribute('bindClass',td); 
 
		td.onmousedown=DivEvent.mouseDown;
		td.onmousemove=DivEvent.mouseMove;
		td.onmouseup=DivEvent.mouseUp;
		td.ondblclick=DivEvent.mouseDble; 

		var selectedDiv;
		var currWinDiv;
			//鼠标点击时
		td.down=function(){
			window.top.selectedDiv = this;
			document.onmousemove=DivEvent.mouseMove;
		 	var obj = document.getElementById(this.getAttribute("windivId"));
		 	obj.style.zIndex= index++;   //选择层显示最顶层
			var x=WinEvent.getMouseX();
			var y=WinEvent.getMouseY();
			x=WinEvent.getX(x);
			y=WinEvent.getY(y);
			temp_x=x-winDiv.offsetLeft;
			temp_y=y-winDiv.offsetTop;
			if(!winDiv.onbtn){
				selected=true;
			}
		 };
			//鼠标移动时
		 td.move=function(){
			if(selected){
				var x=WinEvent.getMouseX();
				var y=WinEvent.getMouseY();
				temp_left=WinEvent.getX(x)-temp_x;
				temp_top=WinEvent.getY(y)-temp_y;
				winDiv.style.left=(temp_left+8)+'px';
				winDiv.style.top=temp_top+'px';
			}
		 };
			//鼠标松开时
		 td.up=function(){
			selected=false;
			/*if(temp_left<10){
				temp_left=10;
				winDiv.style.left=(temp_left+8)+'px';
			}*/
			if(temp_top<3){
				temp_top=3;
				winDiv.style.top=temp_top+'px';
			}
		  };

		  var contDiv=document.getElementById("winContent"+divCount); 
		  var oDiv=document.getElementById("moveDiv"+divCount); 
		  var minBtn = document.getElementById("msg_min"+divCount);
		  if (winStyle != "panel"){
				//鼠标双击时
			  td.dble=function(){
				  if(winDiv.isMax){
						winDiv.style.width  = document.body.clientWidth+"px";
						winDiv.style.height = document.body.clientHeight-30+"px";
	
						
						if(minBtn.status == "1"){
							contDiv.style.display = "block";
							oDiv.style.display = "block";
							minBtn.status = "0";
							//minBtn.innerHTML ="0";
							minBtn.src = "<%=rootPath%>/images/btn/min.png";
							minBtn.title = "最小化";
	
							topArr.push(winDiv.style.top);
						}else{
							minBtn.src = "<%=rootPath%>/images/btn/min.png";
						}
						
						
					    winDiv.style.left=0;
					    winDiv.style.top=0;
					    winDiv.isMax = false;
					    
				  }else{
					    winDiv.isMax = true;
					    winDiv.style.left=default_left;
					    winDiv.style.top=default_top;
						winDiv.style.width  = default_width;
						winDiv.style.height = default_height;
						
				  }
			  };
		  }
		  var mouseStart={}; 
		  var divStart={}; 
		  var rightStart={}; 
		  var bottomStart={};

		  if (oDiv){
		  
//			往左右同时拽 
		  oDiv.onmousedown=DivEvent.mouseDown;
		  oDiv.onmousemove=DivEvent.mouseMove;
		  oDiv.onmouseup=DivEvent.mouseUp;
		  //oDiv.ondblclick=DivEvent.mouseDble; 
 		  
		  oDiv.down=function() {
			 selected=true;
			 window.top.selectedDiv = this;
			 var obj = document.getElementById($(this).attr("windivId"));
			 window.top.currWinDiv = obj;
			 obj.style.zIndex= index++;   //选择层显示最顶层
			 mouseStart.x=WinEvent.getMouseX();
			 mouseStart.y=WinEvent.getMouseY(); 
			 divStart.x=this.offsetLeft; 
			 divStart.y=this.offsetTop; 
			 if(this.setCapture){ //IE
				 this.onmousemove=doDrag;  
				this.setCapture(this.MOUSEMOVE); 
			 } else { //GOOGLE
				 if (window.captureEvents){
				 	window.captureEvents(this.MOUSEMOVE);
				 }
				 //document.addEventListener("mouseover", doDrag, true);
			 } 	 
			 document.onmousemove = DivEvent.mouseMove;
		     this.onmouseup=DivEvent.mouseUp; 	
		     document.onmouseup=DivEvent.mouseUp; 
		     
		  }; 
 
		  oDiv.move=function(){ 
				if (selected){
					 var l=WinEvent.getMouseX()-mouseStart.x+divStart.x; 
					 var t=WinEvent.getMouseY()-mouseStart.y+divStart.y; 
					 var w=l+window.top.selectedDiv.offsetWidth; 
					 var h=t+window.top.selectedDiv.offsetHeight; 
						
					 if(w<window.top.selectedDiv.offsetWidth){ 
						w=window.top.selectedDiv.offsetWidth; 
					 }else if(w>document.body.clientWidth-winDiv.offsetLeft) { 
						w=document.body.clientWidth-winDiv.offsetLeft-2; 
					 } 
						
					 if(h<window.top.selectedDiv.offsetHeight) { 
							h=window.top.selectedDiv.offsetHeight; 
					 }else if(h>document.body.clientHeight-winDiv.offsetTop){ 
							h=document.body.clientHeight-winDiv.offsetTop-2; 
					 } 
					 winDiv.style.width=w+"px"; 
					 winDiv.style.height=h+"px"; 
					 //contDiv.style.height=(h-50)+"px";
					 //$("#tagContent0").height();
					 //fmpDebug("======oDiv.move==winDiv.style.height===="+ $("#tagContent0").height());
				}
			}; 
			
			oDiv.up=function(){ 
				selected = false;
				this.onmousemove=null; 
				document.onmousemove = null;
				this.onmouseup=null; 	
				document.onmouseup = null;
 			
				if (this.releaseCapture){
					this.releaseCapture();
				}	
				if (window.releaseEvents){
					window.releaseEvents(this.MOUSEMOVE);
					//document.removeEventListener("mouseover", doDrag, true);	
				}	 
				
			}; 
		  }
		  maxMinimize(divCount);  //最大化最小化控制初始化
		  return divCount;

	}		

	function setDivWindowTitle(title){
		document.getElementById("divWindowTitle"+divCount).innerHTML = title;
	}

	
	/**
	 * 定义获取鼠标坐标和位移事件
	 */
	var WinEvent={
			getX:function(x){
				return(x+document.body.scrollLeft);
			}
			,getY:function(y){
				return(y+document.body.scrollTop);
			}
			,getMouseX:function(){
				return window.event.clientX;
			}
			,getMouseY:function(){
				return window.event.clientY;
			}
	};		


	/**
	 * 定义DIV操作事件
	 */
	var DivEvent={
		mouseDown:function(){

			//var menu=document.getElementById(this.id);
			//var menuClass=menu.getAttribute('bindClass');
 
			

			if (this.setCapture){
				this.setCapture();
			}else{
				window.captureEvents(this.MOUSEMOVE);
			}
	 
			//menu.setCapture();
			//menuClass.down();
			this.down();
		}
		,mouseMove:function(){
			//var menu=document.getElementById(this.id);
			//var menuClass=menu.getAttribute('bindClass');
			//menuClass.move();
			//alert(selectedDiv.id);
			if (window.top.selectedDiv){
				window.top.selectedDiv.move();
			}
			//alert(this.move);
			return false;
		}
		,mouseUp:function(){
			//var menu=document.getElementById(this.id);
			//var menuClass=menu.getAttribute('bindClass');
			//menuClass.up();
			this.up();
			if (this.releaseCapture){
				this.releaseCapture();
			}else{
				window.releaseEvents(this.MOUSEMOVE);
			}
		}
		,mouseDble:function(){
			//var menu=document.getElementById(this.id);
			//var menuClass=menu.getAttribute('bindClass');
			//menuClass.dble();
			this.dble();
		}
		
	};


	
	/*
	 *初始化DIV窗口的的最小化、最大化按钮
	 */


	function maxMinimize(index){
		var set={minbtn: 'msg_min'+index,closebtn: 'msg_close'+index, content:'winContent'+index, movebar:'moveDiv'+index};
		var objSet =new Array();
		objSet.char = null;
		objSet.win = document.getElementById('winDiv'+index);
		for (var Id in set) {
			objSet[Id] = document.getElementById(set[Id]);
		};
		var me = objSet;
		//objSet.win.style
		//alert($(objSet.win).height());
		//alert(objSet.win.style.height);
		//objSet.content.style.height = '100%';
		//$(objSet.content).height($(objSet.win).height()-50);//objSet.win.style.height);
		//alert(objSet.content.style.height);
		//alert($(objSet.content));		
		if (objSet.minbtn){
			objSet.minbtn.onclick = function() {
				var set=objSet.minbtn.status == 1?[0,1,'block',objSet.char[0],'最小化']:[1,0,'none',objSet.char[1],'恢复'];
				objSet.minbtn.status=set[0];
				objSet.win.style.borderBottomWidth=set[1];
				objSet.content.style.display =set[2];
				objSet.movebar.style.display =set[2];
				//objSet.minbtn.innerHTML =set[3];
				
				objSet.minbtn.title = set[4];
				if(objSet.minbtn.status == 1){
					objSet.temp_width = objSet.win.style.width;
					objSet.temp_height = objSet.win.style.height;
					objSet.temp_top = objSet.win.style.top;
					objSet.temp_left = objSet.win.style.left;
					objSet.win.style.height = "20px";
					objSet.win.style.width = "200px";
					objSet.win.style.left = window.screen.availWidth -210+"px";
					objSet.win.isMax = true;
					objSet.minbtn.src = "<%=rootPath%>/images/btn/max.png";
					//以下用于存取最小化div窗口的top值，以便将最小化的div进行排列
					var popTop = topArr.pop();
					if(typeof popTop == "undefined"){
						var initValue = 85;
						objSet.win.style.top = initValue;
						topArr.push(initValue); 
					}else if(popTop.toString().indexOf("px") ==-1){
						objSet.win.style.top = popTop+25+"px";;
						topArr.push(popTop+25);
					}else{
						objSet.win.style.top = popTop;
					}
					 
				}else{
					topArr.push(objSet.win.style.top);
					objSet.win.style.height=objSet.temp_height;
					objSet.win.style.width =objSet.temp_width;
					objSet.win.style.top =objSet.temp_top;
					objSet.win.style.left =objSet.temp_left ;
					objSet.minbtn.src = "<%=rootPath%>/images/btn/min.png";
				}
			};
			objSet.minbtn.onmouseover = function() {
				if(objSet.win.onbtn != true){
					objSet.win.onbtn = true;
				}
			};
			objSet.minbtn.onmouseout = function() {
				if(objSet.win.onbtn ==true){
					objSet.win.onbtn = false;
				}
			};			
		}

		if (objSet.minbtn){
			objSet.closebtn.onmouseover = function() {
				if(objSet.win.onbtn != true){
					objSet.win.onbtn = true;
				}
			};
			objSet.closebtn.onmouseout = function() {
				if(objSet.win.onbtn ==true){
					objSet.win.onbtn = false;
				}
			};
			objSet.closebtn.onclick = function() {
				closeDivWindow(index);
				if(objSet.minbtn.status == "1" ){
					topArr.push(objSet.win.style.top);
				}
			};			
		}


		objSet.char=navigator.userAgent.toLowerCase().indexOf('firefox')+1?['_','□','×']:['_','□','×'];//FF不支持webdings字体
		//objSet.minbtn.innerHTML=objSet.char[0];
		//objSet.minbtn.src = "<%=rootPath%>/images/btn/min.png";;
		//objSet.minbtn
		//objSet.closebtn.innerHTML=objSet.char[2];
		return objSet;
	}

	
   /*
	*关闭div窗口
	*/
	function closeDivWindow(num){
		locked = false;
		var topWindow = getMainWindow();
		var dataObject = topWindow.dataObject;		
		if (num == -1){
			num = divCount;
		}
		var obj=document.getElementById("winDiv"+num);

		if(obj){
			var ifobj = document.getElementById("ifData"+num);

			try{
				if (ifobj.contentWindow && ifobj.contentWindow.document){
					var ifrs = ifobj.contentWindow.document.getElementsByTagName("iframe");  
					for(var i=0; i<ifrs.length; i++){
						ifrs[i].src = 'about:blank'; 
				    } 
				}
			}catch(ex){}
		   
    
			ifobj.src = 'about:blank'; 
			ifobj.parentNode.removeChild(ifobj);

			obj.innerHTML="";
			document.body.removeChild(obj);
			obj=null;
			initFindChild(obj);
			try{
				if (CollectGarbage){
					CollectGarbage();		//清理内存
				}
			}catch(e){

			}
			if (dataObject){
				if (typeof dataObject.backCall != "undefined"){
					dataObject.backCall();
				}	
				dataObject = null; 
			}
			
		}
	}

   /**
   *关闭所有DIV窗口
   **/
	function closeAllDivWindow(){
		for (var i = divCount;i>=0;i--){
			closeDivWindow(i);
		}
	}

	
   /*
	*移除元素
	*/
	function discardElement(element) { 
		var garbageBin = document.getElementById('IELeakGarbageBin'); 
		if (!garbageBin) { 
		garbageBin = document.createElement('DIV'); 
		garbageBin.id = 'IELeakGarbageBin'; 
		garbageBin.style.display = 'none'; 
		document.body.appendChild(garbageBin); 
		} 
		garbageBin.appendChild(element); 
		garbageBin.innerHTML = ''; 
		element = null;
	} 


   /*
	*递归函数，找出指定对象其下属所有节点对象
	*/
	function findChild(x){
		var c=x.childNodes;
		for(var i=0;i<c.length;i++){
			if(c[i].tagName){
				allPrpos (c[i]);
				discardElement(c[i]);	
			}
			if(c[i].childNodes){
				findChild(c[i]);
			}
		}
	}
   /*
	*初始化递归函数
	*/
	function initFindChild(obj){   
		if(obj){
			findChild(obj);
		}
	}

	
	/* 
	 * 用来遍历指定对象所有的属性名称和值 
	 */ 
	function allPrpos (obj) { 
		for ( var p in obj ){ 
			if ( typeof ( obj [ p ]) == "function" ){  //该对象所有事件方法
				obj [ p ]=null;
			}
		} 
	} 		
	
   /*
	*获取当前弹出层窗口最顶层的id
	*/
	function getTopWinDivId(){

		var topDivId ="";   //最顶层id 
		var divs = document.getElementsByTagName("DIV");
		var maxNum = 0;
		for(var i = 0; i < divs.length; i++){
			var divId = divs[i].id;
			if(divId.indexOf('winDiv')!=-1){
				var tempNum = divs[i].style.zIndex;
				tempNum = (tempNum) ? parseInt(tempNum) : 0;
				if(tempNum > maxNum){
					maxNum = tempNum;
					topDivId = divId;
				} 
			}
		}
		return topDivId;
	}
	/*
	*通用移除等待遮罩div
	*/
	function main_HideProgressDiv(topWin){
		if (typeof topWin == "undefined"){
			topWin = this;
		}		
		var obj=topWin.document.getElementById("divprogressbar");
		if(obj){
			topWin.document.body.removeChild(obj);
		}	
	} 


	/*
	*通用启动等待遮罩div
	*/
	function main_ShowProgressDiv(topWin){
		if (typeof topWin == "undefined"){
			topWin = this;
		}
		var obj=topWin.document.getElementById("divprogressbar");
		if(!obj){
			obj = topWin.document.createElement("div");
			obj.className = "div_progressbar";
			obj.id = "divprogressbar";
			topWin.document.body.appendChild(obj);
			topWin.setTimeout("main_HideProgressDiv()",10000);
		}
	}

	/**
	*弹出版本信息窗口
	*/
	function showVersion(){
		
		var url = rootPath+"/fmp/FrameBiz/ShowVersion";
		window.createWindowDiv("系统版本信息",window,200,50,600,600);
		window.frames['ifData'+divCount].location.href =url;
	}
	
	if (window.parent.document.getElementById("infoFrame")){
		window.parent.location.reload();
	}
 
 
</script>

</head>

<body   id="sysmainbody" class="mainbody" onLoad="loadContent()" onResize="EventOnresize();" >
<div id="div_verion" class="div_version" style="cursor:hand" onclick="showVersion();"

title="点击查看版本更新信息"

>
</div>
<div id="Page_content">
	<!-- Header start -->
	<div id="Header">
	  <!-- logo填充背景 -->
	  <div class="logo_background">
		  <div class="logo_icon">
		    <div class="logo_area">
		    	<!--<div id="userInfoBar" class="banner_label"></div>	 --> 
			    <div  id="menu_lv1" class="banner_div"></div> 
					<!-- 一级菜单 -->
			  </div>  
		  </div>
	  </div>
		<!-- 二级菜单 -->
		<div id="menu_lv2" class="menubar_lv2">
		</div>
		<div style="clear:both" ></div>
	</div>
	<div id="wrapdiv" class="wrapdiv">
	<div id="Page_left" class="tree" >
		<table id="Page_left_tree" >
			<tr id="Page_left_tree_tr">
				<td style="border:0px solid #4499ee;">
					<div id="TreeTopDiv"  ></div>
				</td>
			</tr>
			<tr id="Page_right_tree_tr">
				<td>
					<div id="TreeContainDiv"></div>
				</td>
			</tr>
		</table>
  <!-- 
	<iframe id="tranFrame" name="mainframe" src="<%=rootPath%>/fmp/frame/ShowMainTree" frameborder="0" height="570px" width="300px" scrolling="no" class="tree">
	 
	 </iframe> 
	
	  <iframe id="tranFrame" name="mainframe" src="trees.html"   frameborder="0" scrolling="auto"  height="542px" width="180px" >
	 </iframe> 
	 --> 
	</div>
	<div id="Page_middle" >
	 	<table width="1px" border="0" cellpadding="0" cellspacing="0"  height="100%" bgcolor="#c4d6e4">
			<tr>
				<td >
	       		<div id="slide" class="slide_l" onclick="moveLeftFrame('slide_l','slide_r','Page_left','slide','alt_slide',getElementById('Page_right'))">
							<img  id="alt_slide" src="<%=rootPath%>/images/space.gif" width="100%" height="48" alt="点击隐藏" />
				</div>
	      		</td>
			</tr>
			
		</table>
	</div>
  
    <div id="Page_right">
 		<!-- iframe id="infoFrame"   name="infoframe" src="<%=rootPath%>/fmp/system/notice/NoticeBiz/ShowNotice?moduleId=s_md_fhzy&tableModelId=SAffiche" frameborder="0" scrolling="auto" > -->
		   
		<iframe id="infoFrame"   name="infoframe" src="<%=rootPath%>/SMMS/SmmsPendingEventBiz/forceEntering" frameborder="0" scrolling="auto" >
		</iframe>
	</div>
	</div>
	
	<input id="sessionExceptionUrl"  type="hidden"/>
	
</div>
<div class="bottonCopyright0" id="bottonCopyright0">
</div>
<div id="hiddenTreeBox" style="width:0px; height:0px;display:none;"></div>
<div id="customTreeBox" style="width:0px; height:0px;display:none;"></div>
</body>
</html>
