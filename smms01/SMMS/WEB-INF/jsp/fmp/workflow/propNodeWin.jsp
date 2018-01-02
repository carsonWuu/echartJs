<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page contentType="text/html; charset=utf-8"%>
<%
	String rootPath = request.getContextPath();
%>
<html>
<head>

<jsp:include
	page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath%>/scripts/fmp/flowEditor.js"
	type="text/javascript" language="javascript"></script>
<link href='<%=rootPath%>/styles/fmp/propwin.css' rel='stylesheet'
	type='text/css'>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>节点</title>
</head>

<body onload="isshow();">
<div id="con">
<ul id="tags">
	<li class="selectTag"><a onclick="selectTag('tagContent0',this)"
		href="javascript:void(0)">常规</a></li>
	<li><a onclick="selectTag('tagContent1',this)"
		href="javascript:void(0)">审批权</a></li>
	<li><a onclick="selectTag('tagContent2',this)"
		href="javascript:void(0)">短信</a></li>
</ul>

<div id="tagContent">
<div class="tagContent selectTag" id="tagContent0">
<table id="tab0">
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">节点ID：</td>
		<td><input class="x-form-field" id="NODEID" value="" readOnly /></td>
	</tr>
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">节点名称：</td>
		<td><input class="x-form-field" id="NODENAME" value="" /></td>
	</tr>
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">是否最终否决：</td>
		<td>
		<input type="radio" id="ISLASTREJECT_Y" name="rd_ISLASTREJECT" value="1" onClick="clickRadio(this);">
		<font size="2px">是</font></input> 
		<input type="radio" id="ISLASTREJECT_N" name="rd_ISLASTREJECT" value="2" onClick="clickRadio(this);">
		<font size="2px">否</font></input> 
			<input id="ISLASTREJECT" type="hidden"/></td>
	</tr>
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">是否支持有条件通过：</td>
		<td>
		<input type="radio" id="ISCHECKCONDITION_Y" name="rd_ISCHECKCONDITION" value="1" onClick="clickRadio(this);">
		<font size="2px">是</font></input> 
		<input type="radio" id="ISCHECKCONDITION_N" name="rd_ISCHECKCONDITION" value="2" onClick="clickRadio(this);">
		<font size="2px">否</font></input> 
		<input id="ISCHECKCONDITION" type="hidden" /></td>
	</tr>
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">是否为有条件通过确认节点：</td>
		<td><input type="radio" id="ISCONDICONFIRM_Y"
			name="rd_ISCONDICONFIRM" value="1" onClick="clickRadio(this);"><font
			size="2px">是</font></input> <input type="radio" id="ISCONDICONFIRM_N"
			name="rd_ISCONDICONFIRM" value="2" onClick="clickRadio(this);"><font
			size="2px">否</font></input> <input id="ISCONDICONFIRM" type="hidden" /></td>
	</tr>
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">节点功能类型：</td>
		<td><select class="x-form-field" id="NODEBIZTYPE"
			onchange="isshow();">
			<option value="0" class="x-form-field">普通节点</option>
			<option value="1" class="x-form-field">会签节点</option>
		</select></td>
	</tr>
	<tr id="thepassrate">
			<td style="text-align: left; width: 120px; font-size: 12px;">会签通过率(百分比)：</td>
			<td><input class="x-form-field" id="PASSRATE" onblur="isfloat();" /></td>
	</tr>
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">节点办理时限(天数)：</td>
		<td><input class="x-form-field" id="TRANSACTDAYS"
			onblur="isNumber();" /></td>
	</tr>
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">节点描述：</td>
		<td><textarea class="x-form-field" id="NODEDESC" rows="10"></textarea></td>
	</tr>
</table>

</div>

<div class="tagContent" id="tagContent1">
<table id="tab1">
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">审批机构定义：</td>
		<td><input class="x-form-field" id="ORGNAMESET" readOnly />
		<button class="btn"
			onclick="openPop('SOrg','ORGNAMESET','ORGDEFINE','ORGID','ORGNAME')">
		...</button>
		<input id="ORGDEFINE" type="hidden" /></td>
	</tr>
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">审批机构集合扩展：</td>
		<td><input type="checkbox" id="BIZORGEXT" name="cbx_ORGEXTSET"
			value="1" onClick="clickCheckBox(this);"><font size="2px">业务机构</font></input>
		<input type="checkbox" id="STARTORGEXT" name="cbx_ORGEXTSET" value="2"
			onClick="clickCheckBox(this);"><font size="2px">发起机构</font></input>
		<input id="ORGEXTSET" type="hidden" /></td>
	</tr>


	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">审批部门定义：</td>
		<td><input class="x-form-field" id="DEPTNAMESET" readOnly />
		<button class="btn"
			onclick="openPop('SDept','DEPTNAMESET','DEPTDEFINE','DEPTID','DEPTNAME')">
		...</button>
		<input id="DEPTDEFINE" type="hidden" /></td>
	</tr>
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">审批部门集合扩展：</td>
		<td><input type="checkbox" id="STARTDEPTEXT"
			name="cbx_DEPTEXTSET" value="1" onClick="clickCheckBox(this);"><font
			size="2px">发起部门</font></input> <input id="DEPTEXTSET" type="hidden" /></td>
	</tr>

	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">审批职位定义：</td>
		<td><input class="x-form-field" id="POSTNAMESET" value=""
			readOnly />
		<button class="btn"
			onclick="openPop('SPost','POSTNAMESET','POSTDEFINE','POSTID','POSTNAME');">
		...</button>
		<input id="POSTDEFINE" type="hidden" value="" /></td>
	</tr>
	<tr id="themeetingpost">
		<td style="text-align: left; width: 120px; font-size: 12px;">会签职位定义：</td>
		<td><input class="x-form-field" id="MEETINGPOSTNAMESET" value=""
			readOnly />
		<button class="btn"
			onclick="openPop('SPost','MEETINGPOSTNAMESET','MEETINGPOSTDEFINE','POSTID','POSTNAME');">
		...</button>
		<input id="MEETINGPOSTDEFINE" type="hidden" value="" /></td>
	</tr>
</table>

</div>

<div class="tagContent" id="tagContent2">
<table id="tab2">
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">短信发送审批结果条件：</td>
		<td><input type="checkbox" id="AGREE" name="cbx_SMSSENDCOND"
			value="1" onClick="clickCheckBox(this);"><font size="2px">同意</font></input>
		<input type="checkbox" id="DISAGAREE" name="cbx_SMSSENDCOND" value="2"
			onClick="clickCheckBox(this);"><font size="2px">不同意</font></input> <input
			type="checkbox" id="AGREEWITHCONDI" name="cbx_SMSSENDCOND" value="3"
			onClick="clickCheckBox(this);"><font size="2px">有条件通过</font></input>
		<input type="checkbox" id="UNTREAD" name="cbx_SMSSENDCOND" value="4"
			onClick="clickCheckBox(this);"><font size="2px">打回到发起人</font></input>
		<input type="checkbox" id="UNTREADSPECIFY" name="cbx_SMSSENDCOND"
			value="5" onClick="clickCheckBox(this);"><font size="2px">打回到特定节点</font></input>
		<input id="SMSSENDCOND" type="hidden" /></td>
	</tr>
	<tr>
		<td style="text-align: left; width: 120px; font-size: 12px;">手机短信模板编号：</td>
		<td><input class="x-form-field" id="SMSTEMPCODE" value=""
			readOnly />
		<button class="btn"
			onclick="openPop('SSmsTemplet','SMSTEMPCODE','SMSTEMPCODE','SMSTEMPCODE','SMSTEMPCODE');">
		...</button>
		</td>
	</tr>
</table>

</div>
</div>
</div>
<script type="text/javascript">
     function selectTag(showContent, selfObj) {
         // 操作标签
         var tag = document.getElementById("tags").getElementsByTagName("li");
         var taglength = tag.length;
         for (i = 0; i < taglength; i++) {
             tag[i].className = "";
         }
         selfObj.parentNode.className = "selectTag";
         // 操作内容
         for (i = 0; j = document.getElementById("tagContent" + i); i++) {
             j.style.display = "none";
         }
         document.getElementById(showContent).style.display = "block";
         //通过当然的tab的ID来找到table的高度，更换底部button的高度，实现自适应效果
         if(showContent=='tagContent0')
         {
             var obj=document.getElementById("tab0");
        	 var height=$(obj).css('height');
        	 var heightarr=height.split("px");
        	 var He=parseInt(heightarr[0])+15;
        	 var but=document.getElementById("button");
        	 $(but).css("padding-top",He+"px");
         }
         if(showContent=='tagContent1')
         {
        	 var obj=document.getElementById("tab1");
        	 var height=$(obj).css('height');
        	 var heightarr=height.split("px");
        	 var He=parseInt(heightarr[0])+15;
        	 var but=document.getElementById("button");
        	 $(but).css("padding-top",He+"px");
         }
         if(showContent=='tagContent2')
         {
        	 var obj=document.getElementById("tab2");
        	 var height=$(obj).css('height');
        	 var heightarr=height.split("px");
        	 var He=parseInt(heightarr[0])+15;
        	 var but=document.getElementById("button");
        	 $(but).css("padding-top",He+"px");
         }
     }
 </script>
<div id="button" style="width:406px;text-align:center;">
<button class="btn" type="button" onclick="apply();">应用</button>
<button class="btn" type="button" onclick="closeWin();">关闭</button>
</div>
<script type="text/javascript">
        var topWindow = getMainWindow();
        var obj = topWindow.dataObject; //得到父窗口传递过来的对象        	
		document.getElementById('NODEID').value=obj.id;
		document.getElementById('NODENAME').value=obj.process_name;
		if(obj.NODEBIZTYPE == ''){
			document.getElementById('NODEBIZTYPE').value = '0';
		}else{
			document.getElementById('NODEBIZTYPE').value=obj.NODEBIZTYPE;
		}
		document.getElementById('TRANSACTDAYS').value=obj.TRANSACTDAYS;
		document.getElementById('PASSRATE').value=obj.PASSRATE;
		document.getElementById('NODEDESC').value=obj.NODEDESC;
		document.getElementById('ORGNAMESET').value=obj.ORGNAMESET;
		document.getElementById('ORGDEFINE').value=obj.ORGDEFINE;
		if(obj.ORGEXTSET != ''&&obj.ORGEXTSET!=null){
			var orgextsetStr = obj.ORGEXTSET;
			if (orgextsetStr.indexOf("1")> -1){
				document.getElementById('BIZORGEXT').checked=true;
			}
			if (orgextsetStr.indexOf("2")> -1){
				document.getElementById('STARTORGEXT').checked=true;
			}
		}
		if(obj.DEPTNAMESET!=''&&obj.DEPTNAMESET!=null)
		 document.getElementById('DEPTNAMESET').value=obj.DEPTNAMESET;
		document.getElementById('DEPTDEFINE').value=obj.DEPTDEFINE;
		if(obj.deptextset != ''&&obj.deptextset!=null){
			var deptextsetStr = obj.deptextset;
			if (deptextsetStr.indexOf("1")> -1){
				document.getElementById('STARTDEPTEXT').checked=true;
			}
		}
		document.getElementById('POSTDEFINE').value=obj.POSTDEFINE;
		document.getElementById('POSTNAMESET').value=obj.POSTNAMESET;
		document.getElementById('MEETINGPOSTDEFINE').value=obj.MEETINGPOSTDEFINE;
		document.getElementById('MEETINGPOSTNAMESET').value=obj.MEETINGPOSTNAMESET;
		
		document.getElementById('ISLASTREJECT').value=obj.ISLASTREJECT;
		if(obj.ISLASTREJECT =='1'){
			document.getElementById('ISLASTREJECT_Y').checked=true;
		}else{
			document.getElementById('ISLASTREJECT_N').checked=true;
		}
		document.getElementById('ISCONDICONFIRM').value=obj.ISCONDICONFIRM;
		if(obj.ISCONDICONFIRM =='1'){
			document.getElementById('ISCONDICONFIRM_Y').checked=true;
		}else{
			document.getElementById('ISCONDICONFIRM_N').checked=true;
		}
		document.getElementById('ISCHECKCONDITION').value=obj.ISCHECKCONDITION;
		if(obj.ISCHECKCONDITION =='1'){
			document.getElementById('ISCHECKCONDITION_Y').checked=true;
		}else{
			document.getElementById('ISCHECKCONDITION_N').checked=true;
		}
		if(obj.SMSSENDCOND!= ''&&obj.SMSSENDCOND!=null){
			var smssendcondStr = obj.SMSSENDCOND;
			if (smssendcondStr.indexOf("1")> -1){
				document.getElementById('AGREE').checked=true;
			}
			if (smssendcondStr.indexOf("2")> -1){
				document.getElementById('DISAGAREE').checked=true;
			}
			if (smssendcondStr.indexOf("3")> -1){
				document.getElementById('AGREEWITHCONDI').checked=true;
			}
			if (smssendcondStr.indexOf("4")> -1){
				document.getElementById('UNTREAD').checked=true;
			}
			if (smssendcondStr.indexOf("5")> -1){
				document.getElementById('UNTREADSPECIFY').checked=true;
			}
		}
		document.getElementById('SMSTEMPCODE').value=obj.SMSTEMPCODE;

		
		var isApply = false;
		function apply(){
			if(obj){
				obj.NODEBIZTYPE=document.getElementById('NODEBIZTYPE').value;
				obj.PASSRATE=document.getElementById('PASSRATE').value;
				obj.TRANSACTDAYS=document.getElementById('TRANSACTDAYS').value;
				var nodedescStr = document.getElementById('NODEDESC').value;
				if(checkSingleQuotes(nodedescStr)){
					alert("'节点描述'包含非法字符 ',请修改后保存。");
					return;
				}else{
					if(nodedescStr==null)
					    obj.NODEDESC="";
					else
						obj.NODEDESC=nodedescStr;
				}
				obj.ORGNAMESET=document.getElementById('ORGNAMESET').value;
				obj.ORGDEFINE=document.getElementById('ORGDEFINE').value;
				obj.ORGEXTSET=document.getElementById('ORGEXTSET').value;
				obj.DEPTNAMESET=document.getElementById('DEPTNAMESET').value;
				obj.DEPTDEFINE=document.getElementById('DEPTDEFINE').value;
				obj.DEPTEXTSET=document.getElementById('DEPTEXTSET').value;
				obj.POSTDEFINE=document.getElementById('POSTDEFINE').value;
				obj.POSTNAMESET=document.getElementById('POSTNAMESET').value;
				obj.MEETINGPOSTDEFINE=document.getElementById('MEETINGPOSTDEFINE').value;
				obj.MEETINGPOSTNAMESET=document.getElementById('MEETINGPOSTNAMESET').value;
				obj.NODENAME = document.getElementById('NODENAME').value;
				obj.ISLASTREJECT = document.getElementById('ISLASTREJECT').value;
				obj.ISCONDICONFIRM = document.getElementById('ISCONDICONFIRM').value;
				obj.ISCHECKCONDITION = document.getElementById('ISCHECKCONDITION').value;
				obj.SMSSENDCOND = document.getElementById('SMSSENDCOND').value;
				obj.SMSTEMPCODE = document.getElementById('SMSTEMPCODE').value;
				obj.process_name=document.getElementById('NODENAME').value;


				if (typeof obj.backCall != "undefined"){
					obj.backCall(obj);
				}					
				//if(obj.textObj){
				//	obj.textObj.innerHTML=obj.process_name;
					//parent.document.getElementById("text_"+obj.id).innerHTML=obj.process_name;
				//}
				//obj.obj.title = obj.process_name;
			} 
			isApply = false;
		}
		function closeWin(){
			if(isApply){
				alert("请先点击'应用'保存所作修改后关闭。");
			}else{
				closeWindow();
			}
		}




		
		function openPop(tableModelId,fid,fname,sid,sname){  	
			var dataObject = new Object();  
			dataObject.fieldId= sid;
			dataObject.fieldName= sname;
			dataObject.trueValue= null;
			dataObject.dispValue= null;

			//在新增页面时调用此url，不设置过滤条件
			var url="<%=rootPath%>/fmp/FrameCommonBiz/DoPopList?popMode=checkSinPop&tableModelId="+tableModelId+"&checkBoxMode=true";
			openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
			if (typeof dataObject.backCall != "undefined"){
				dataObject.backCall();
			}
			dataObject.backCall=function(){
				if (dataObject.trueValue!= null) {   // 返回给父窗口隐藏域
					document.getElementById(fname).value = dataObject.trueValue;
				}  
				if (dataObject.dispValue != null) {   // 返回给父窗口显示值
					document.getElementById(fid).value = dataObject.dispValue;		
				} 
			};
			
			/*if (selectObject.trueValue != null) {   // 返回给父窗口隐藏域
				document.getElementById(fname).value = selectObject.trueValue;
				testSave();
			} 
			if (selectObject.dispValue != null) {   // 返回给父窗口显示值
				document.getElementById(fid).value = selectObject.dispValue;
				testSave();
			} */
		}
		function isshow(){
			if(document.getElementById('NODEBIZTYPE').value =='1'){
				document.getElementById('thepassrate').style.display='';
			    document.getElementById('themeetingpost').style.display='';
			}else{
				document.getElementById('thepassrate').style.display='none';
				document.getElementById('themeetingpost').style.display='none';
			}
			var obj=document.getElementById("tab0");
       	    var height=$(obj).css('height');
       	    var heightarr=height.split("px");
       	    var He=parseInt(heightarr[0])+55;
       	    var but=document.getElementById("button");
       	    $(but).css("padding-top",He+"px");
		}

		function isNumber(){
			  var numObj = document.getElementById('TRANSACTDAYS').value;
			  if(numObj!=''){
				  var strP=/^\d+$/; //正整数
				  if(!strP.test(numObj)){
						alert('请输入正整数。');
						document.getElementById('TRANSACTDAYS').value='';
				  }
			  }
		}

		function isfloat(oNum) {
			var msg = "请输入0到100的数字。";
			var numObj = document.getElementById('PASSRATE').value;
			var strP = /^\d+(\.\d+)?$/;
			if(numObj!=''){
				if(numObj>0 && numObj<=100){
					if (!strP.test(numObj)){
						alert(msg);
						document.getElementById('PASSRATE').value = '';
					}				
					try {
						if (parseFloat(numObj) != numObj){
							alert(msg);
							document.getElementById('PASSRATE').value = '';
						}
					} catch (ex) {	
						alert(msg);		
						document.getElementById('PASSRATE').value = '';
					}
				}else{
					alert(msg);
					document.getElementById('PASSRATE').value = '';
				}
		    }	
		}

	/**
	 * 单号号校验
	 */ 	
	function checkSingleQuotes(strObj){
		var strP = /\'/g;
		return strP.test(strObj);
	}
		
	function clickCheckBox(obj) {
		var objName = obj.name;
		var checkBoxs = document.getElementsByName(objName);
		var fldValue = "";
		for ( var i = 0; i < checkBoxs.length; i++) {
			if (checkBoxs[i].checked) {
				if (fldValue == "") {
					fldValue = checkBoxs[i].value;
				} else {
					fldValue = fldValue + "," + checkBoxs[i].value;
				}
			}
		}
		var objId = objName.substring(objName.indexOf("cbx_")+4);
		document.getElementById(objId).value =fldValue;
	}

	
	function clickRadio(obj){
		var objId = obj.id.substring(0,obj.id.lastIndexOf('_'));
		document.getElementById(objId).value =obj.value;
	}

	
	/**
	*修改检测
	
	var input  = document.getElementsByTagName("INPUT"); 
	for(var   i=0;i <input.length;   i++){  
		input[i].attachEvent("onchange",testSave);
	} 
	var textarea = document.getElementsByTagName("textarea"); 
	for(var   i=0;i <textarea.length;   i++){  
		textarea[i].attachEvent("onchange",testSave); 
	} 
	function   testSave(){ 
		isApply = true;
   }*/


	
</script>


</body>
</html>