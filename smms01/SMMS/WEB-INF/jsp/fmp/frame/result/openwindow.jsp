<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String rootPath = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" /> 
<title></title>
</head>
<body onresize="onOpenWindowResize();">
						<iframe
							id="contentFrame"
							overflow-x="no"
							frameborder="0" scrolling="auto" height="100%" width="100%" onload="javascript:dyniframesize('contentFrame');" >
						</iframe>
</body>
<script type="text/javascript" >
function dyniframesize(ifrName) { 
	var ifrObj = null; 
	if (document.getElementById){ 
		ifrObj = document.getElementById(ifrName); 
		if (ifrObj){
			try{
				ifrObj.height = opener.document.body.offsetHeight + 70;		
			}catch(e){
				//调整界面如果出现异常，可以忽略
			}
		}
	}  
} 

function onOpenWindowResize(){
	dyniframesize('contentFrame');
}

//var src = fmpStrDecode(fmpDecodeUrlParam(fmpDecodeURI("${open}")));
var src = "${open}";
var iframe = document.getElementById("contentFrame"); 
//alert(RANDOMID);
iframe.src = asii2str(src,RANDOMID);
document.title = asii2str('${title}',RANDOMID);

</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 
</html>