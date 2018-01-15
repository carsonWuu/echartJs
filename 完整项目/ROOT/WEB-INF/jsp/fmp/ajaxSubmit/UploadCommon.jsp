<!-----------------------------------
* @功能说明：异步上传文件页面
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%
	String rootPath = request.getContextPath();
	String fileLimitMax = FMPContex.getSystemParameter("SYS7");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html>   
<head>   
<style type="text/css"> 
body { 
font: 12px/16px Arial, Helvetica, sans-serif; 
} 
#fileQueue { 
width: 400px; 
height: 300px; 
overflow: auto; 
border: 1px solid #E5E5E5; 
margin-bottom: 10px; 
} 
</style> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<title>文件上传</title> 
<link href="<%=rootPath%>/scripts/uploadify-v2.1.4/uploadify.css" rel="stylesheet" type="text/css" /> 
<script src="<%=rootPath%>/scripts/fmp/forbid.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/uploadify-v2.1.4/jquery-1.4.2.min.js"></script>
<script language="javascript"  src="<%=rootPath%>/scripts/uploadify-v2.1.4/swfobject.js"></script> 
<script src="<%=rootPath%>/scripts/uploadify-v2.1.4/jquery.uploadify.v2.1.4.min.js"></script>
<script language="JavaScript" src="<%=rootPath%>/js/jquery.form.js"></script>
<script src="<%=rootPath%>/scripts/fmp/ajaxSubmit.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/dataList.js" type="text/javascript" language="javascript"></script>
  </head>   
  <body>   
  <form name="formUpload" id="formUpload" method="post" > 
  	<div id="scfj">
  	<table width="100%">  
  		<tr>
  		<td align="center">
		  	<div id="fileQueue"></div>   
		  	<input type="file" name="fileInput" id="fileInput" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  	<img src="<%=rootPath%>/images/zscrd/fileUpload/upload.jpg" width="80px" height="27px" onclick="beginUpload();" style="cursor:hand"/>&nbsp;&nbsp;
		  	<img src="<%=rootPath%>/images/zscrd/fileUpload/clearqueue.jpg" width="80px" height="27px" onclick="clearQueue();" style="cursor:hand"/>&nbsp;&nbsp;
		  	<!--<img src="<%=rootPath%>/images/zscrd/fileUpload/return.jpg" width="50px" height="27px" onclick="closeWindow();" style="cursor:hand"/>-->
		  	<br>  <br> 
	  	</td> 
	  	</tr>
	</table>
	</div>
    <div id="result"></div><!--显示结果-->   
 </form>
  </body>   
</html>  
<script type="text/javascript"> 
     var recordrid='<s:property value="#request.recordrid"/>';
     var tableid='<s:property value="#request.tableid"/>';
     var tag='<s:property value="#request.tag"/>';
     var archiveType = "${ARCHIVETYPE}";
     var attachmentName = "${ATTACHMENTNAME}";
     attachmentName = decodeURI(decodeURI(attachmentName));
     var attachmentRemark = "${ATTACHMENTREMARK}";
     attachmentRemark = decodeURI(decodeURI(attachmentRemark));
     var rootPath = '<%=rootPath%>';
     
     function showDisplayMsg(id, color, message){	//添加显示信息  
         $("#result").append("<div id='"+id+"' style='color:"+color+";'>"+message+"</div>");
     }   

     function removeDisDiv(id){						//移除显示信息中的某个节点
         var divNode = document.getElementById(id);
         divNode.parentNode.removeChild(divNode);
     }
     function clearDisplayMsg(){					//清空显示信息
    	 $("#result").html("");
     }

     function FileInfo(fileId, fileName){			//附件信息
		this.fileId = fileId;
		this.fileName = fileName;
     }
     
     var fileMaxSize = "<%=fileLimitMax%>";		//上传文件的最大大小
     
     var checkSuccessArr = new Array();			//验证附件成功的数组
     var checkFailureArr = new Array();			//验证附件失败的数组
     
     var isClearDisplay = false;				//是否清空显示信息
	 var uploadFileCount =0;					//队列文件总个数
	 var currFileNumber = 0;					//附件所处当前队列的序号
     $(document).ready(function() { 
        $('#fileInput').uploadify({   
			'uploader': '<%=rootPath%>/scripts/uploadify-v2.1.4/uploadify.swf', 
	        'script': '<%=rootPath%>/upload/commonUpload/save?tableid='+tableid+'%26recordrid='+recordrid+'%26tag='+tag
	        			+'%26ARCHIVETYPE='+archiveType,   //指定服务端处理类的入口 
	        'folder': 'temp',   
			'cancelImg': '<%=rootPath%>/images/zscrd/fileUpload/cancel.png',  
	        'fileDataName': 'fileInput', //和input的name属性值保持一致就好，Struts2就能处理了   
	        'queueID': 'fileQueue',   
	        'auto': false,//是否选取文件后自动上传   
	        'multi': true,//是否支持多文件上传 
	        'buttonImg' : '<%=rootPath%>/images/zscrd/fileUpload/brows.jpg',
	        'buttonText': '11',//按钮上的文字   
	        'displayData': 'percentage',//有speed和percentage两种，一个显示速度，一个显示完成百分比    
	        'onSelect': function(e, queueId, fileObj){
		        if(isClearDisplay){
		        	clearDisplayMsg();
		        	isClearDisplay = false;
			    }
			    
		        if(fileObj.type == null || fileObj.type == ""){	//判断附件是否缺少附件类型
		        	showDisplayMsg(queueId, "red", "附件("+fileObj.name+")缺少附件类型，已经将该附件移出队列，请您重新确认");
		        	checkFailureArr.push(queueId);
		        	return false;
			    }
		        if(fileMaxSize*1024*1024 < fileObj.size){		//判断附件是否超过设置的大小
		        	showDisplayMsg(queueId, "red", "附件("+fileObj.name+")的文件大小超过上限("+fileMaxSize+"MB)，已经将该附件移出队列，请您重新确认");
		        	checkFailureArr.push(queueId);
		        	return false;
			    }

		        checkSuccessArr.push(new FileInfo(queueId, fileObj.name));
	        },
	        'onSelectOnce': function (event, data){							//在单文件或多文件上传时，选择文件时触发
	        	uploadFileCount = data.fileCount;
	        	isClearDisplay = true;
	        	var failureArrlen = checkFailureArr.length;
	        	if(failureArrlen > 0){
		        	for(var failure=0; failure<failureArrlen; failure++){	//循环需要移出队列的附件
		        		$('#fileInput').uploadifyCancel(checkFailureArr[failure]);
			        }
		        }
	        	checkFailureArr.splice(0, failureArrlen);
		    },
		    'onCancel': function(event,queueId,fileObj,data){				//当点击文件队列中文件的关闭按钮或点击取消上传时触发
				uploadFileCount = data.fileCount;
				
				var successArrlen = checkSuccessArr.length;
	        	if(successArrlen > 0){
		        	for(var success=0; success<successArrlen; success++){	//循环被取消上传的附件，移出checkSuccessArr数组
		        		if(checkSuccessArr[success].fileId == queueId){
		        			checkSuccessArr.splice(success, 1);
		        			break;
			        	}
			        }
		        }
			},
			'onError': function(event,queueId,fileObj,errorObj){				//当上传过程中发生错误时触发
				showDisplayMsg(queueId, "red", "文件("+fileObj.name+")上传时发生错误，其错误类型为:"+errorObj.type+"，其错误信息为："+errorObj.info);
			},
			'onClearQueue': function(event, data){								//清空队列时触发
				clearDisplayMsg();
			},
	        'onComplete': function (event, queueID, fileObj, response, data){ 	//文件上传完成后触发
		        currFileNumber = uploadFileCount - data.fileCount + 1;
		        $("#fileInput").uploadifySettings('scriptData',
	    	        	{'ATTACHMENTNAME': encodeURIComponent(encodeURI(attachmentName)),'ATTACHMENTREMARK': encodeURI(encodeURI(attachmentRemark)),'CURRFILENUMBER':currFileNumber});
				showDisplayMsg("successId"+currFileNumber, "purple", response);
          	},
          	'onAllComplete': function(event, data){		//文件队列中所有的文件上传完成后触发
          		uploadFileCount = 0;
              	if(tag == "uploadLackAtt"){
    	        	document.getElementById("scfj").style.display = "none";
                }
              	$("#result").append("<br/><br/><br/>");
              	showDisplayMsg("successId", "blue", "成功上传文件的总个数为：" + data.filesUploaded + "个");
              	showDisplayMsg("failureId", "blue", "上传文件时出现错误的总文件个数为：" + data.errors + "个");
				if(typeof doRefreshList != "undefined"){
	        		doRefreshList();
		        }
          	}  
        });        
    });  

    function beginUpload(){
    	clearDisplayMsg();
    	isClearDisplay = true;
        if(uploadFileCount == 0){
            alert("您还未选择上传的文件，请你重新确认");
            return;
        }
        if(tag == "batch"){			//若是批量上传，要判断附件名称的正确性
            var allFlieCheckTag = true;
        	var fileNameArr = new Array();
	       	var successArrlen = checkSuccessArr.length;
        	for(var success=0; success<successArrlen; success++){
            	var singleFlieCheckTag = true;
        		var fileName = checkSuccessArr[success].fileName;
        		var fileNameNoSuf = fileName.substring(0, fileName.lastIndexOf("."));
        		var replaceFileName = fileNameNoSuf.replace(new RegExp("\\+","g"),"**");
        		var lenDif = replaceFileName.length - fileNameNoSuf.length;
        		if(lenDif != 2){
        			allFlieCheckTag = false;
        			singleFlieCheckTag = false;
            	}else{
            		var arrFileName = replaceFileName.split("**");
            		for(var i=0,arrLen=arrFileName.length;i<arrLen;i++){
                		if(arrFileName[i] == null || arrFileName[i] == ""){
                			allFlieCheckTag = false;
                			singleFlieCheckTag = false;
                    	}
                	}
                }
                if(!singleFlieCheckTag){
        			showDisplayMsg(checkSuccessArr[success].fileId, "red", "文件("+fileName+")命名格式不正确，请您重新确认");
                }else{
                	fileNameArr.push(fileName);
                }
	        }
	        if(!allFlieCheckTag){
		        return;
		    }
	        var fileNameStr = fileNameArr.join("|");
        	fileNameStr = fileNameStr.replace(new RegExp("\\+","g"),"**");
        	var url = "<%=rootPath%>/upload/commonUpload/checkFileName?fileNameStr="+fileNameStr;
        	XMLHttp.urlSubmit(encodeURI(encodeURI(url)), backCallMsg);
        	function backCallMsg(msg){
        		if(msg == "true"){             //判断附件名称是否符合规范
        			uploadFileSaveData();
         		}else{                         //显示附件名称的不规范信息
         			if(msg.indexOf("||") > 0){
             			var arr = msg.split("||");
             			for(var i = 0;i < arr.length; i++){
             				showDisplayMsg("customId"+i, "red", arr[i]);
                 		}
            		}else{
            			showDisplayMsg("customId", "red", msg);
                	}
         		}
            }
        }else{
        	uploadFileSaveData();
        }     
     }

     function uploadFileSaveData(){		//上传附件保存数据
         $("#fileInput").uploadifySettings('scriptData',
 	        	{'ATTACHMENTNAME': encodeURIComponent(encodeURI(attachmentName)),'ATTACHMENTREMARK': encodeURI(encodeURI(attachmentRemark)),'CURRFILENUMBER':1});
		 $('#fileInput').uploadifyUpload();
     }
     
     function clearQueue(){
         $('#fileInput').uploadifyClearQueue();
     }

     /**
      * 关闭详细信息页面（新增页面、修改页面、查看页面）
      * @return
      */
     function closeWindow(){
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

     /**
      * 清除字符串两端空格
      * @param str
      * @return
      */
     function trim(str){
     	return str.replace(/(^\s*)|(\s*$)/g, "");
     }
</script>   