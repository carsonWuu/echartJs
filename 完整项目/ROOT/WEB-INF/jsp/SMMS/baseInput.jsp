<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%
	String rootPath = request.getContextPath();
	WebComponent wff = FMPContex.webFieldFactory;
%>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>基础数据导入</title>
<jsp:include
	page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<link href="<%=rootPath%>/styles/fmp/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" /> 
<script>

$(function(){
	var oUploadWebcase = $("#uploadWebcase");
	var oUploadRoomInfo = $("#uploadRoomInfo");

	oUploadWebcase.on("click",function(){
		var idcId = $("#idc_num").val();
		if(idcId == ""){
			showMessage("IDC编号不能为空"); 
		}else{
			//var file = $("#caseFile").prop('files')[0];
			var file = document.getElementById('caseFile').files[0];
			if(typeof(file) == "undefined"){
				showMessage("未选择文件");
			}else{
				var formData = new FormData();
				formData.append("idcId",idcId);
				formData.append("webcaseFile",file);
				var request = $.ajax({
					type: "POST",
					url: "<%=rootPath%>/SMMS/WebCaseBiz/inputWebcase",
					data: formData,			//这里上传的数据使用了formData 对象
					 cache: false,
		         	 contentType: false,
		        	 processData: false,
		        	 async:false,
					
					//上传成功后回调
					success: function(result){
						showMessage(result.replace(/\s|\xA0/g,""));
						
					},
					//上传失败后回调
					error: function(){
					}
				});
			}
		}
	});


	oUploadRoomInfo.on("click",function(){
		var idcId = $("#idc_num").val();
		if(idcId == ""){
			showMessage("IDC编号不能为空");
		}else{
			//var file = $("#caseFile").files;
			var file = document.getElementById('roomFile').files[0];
			if(typeof(file) == "undefined"){
				showMessage("未选择文件");
			}else{
				var formData = new FormData();
				formData.append("idcId",idcId);
				formData.append("roomFile",file);
				var request = $.ajax({
					type: "POST",
					url: "<%=rootPath%>/SMMS/SmmsRoomInfoBiz/inputRoomInfo",
					data: formData,			//这里上传的数据使用了formData 对象
					 cache: false,
		         	 contentType: false,
		        	 processData: false,
		        	 async:false,
					
					//上传成功后回调
					success: function(result){
						showMessage(result.replace(/\s|\xA0/g,""));
					},
					//上传失败后回调
					error: function(){
					}
				});
			}

		}
	});
	
});
	
</script>
<style>
.fileUpload {
    position: relative;
    overflow: hidden;
    margin: 10px;
}
 
.fileUpload input.upload {  position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
}
.all{
	margin-top:15%;
	margin-left:30%;
}
.idcSpan{
	font-size:large;
}
.webTitle{
	margin-top:2%;
}
.File{
	background:#CCFFFF;
	cursor:pointer;
}
.bttn{
	margin-left:2%;
}
</style>
</head>

<body>
<div class="all">
	<div class="fileUpload">
 		<span class="idcSpan" id="idc" >IDC编号</span>
 		<input type="text" class="idc_num" id="idc_num" name="idc_num" class="upload" size="100"></input>
	</div>

<div class="fileUpload webTitle">
  <input type="file" class="File" id="caseFile" name="caseFile" ></input>
  <input type="button" class="bttn" id="uploadWebcase" name="uploadWebcase" value="上传备案信息">
  
   
</div>

<div class="fileUpload webTitle">
  <input type="file" class="File" id="roomFile" name="roomFile"></input>
  <input type="button" class="bttn" id="uploadRoomInfo" name="uploadRoomInfo" value="上传机房信息">
  
</div>
</div>

<jsp:include
	page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />
</body>
</html>