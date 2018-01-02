<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>

<html>
<head><title>异常信息页面</title></head>
<body>
    <h3>异常堆栈信息:</h3>
    <pre>
        <fmp:property value="exceptionStack"/>
    </pre>
</body>
</html>

<script>
if (window.top.parent.openerWindow){
	if (typeof window.top.parent.openerWindow.top.main_HideProgressDiv != "undefined"){
		window.top.parent.openerWindow.top.main_HideProgressDiv();
	}
}else{
	if (typeof window.top.main_HideProgressDiv != "undefined"){
		window.top.main_HideProgressDiv();
	}
}	

</script>