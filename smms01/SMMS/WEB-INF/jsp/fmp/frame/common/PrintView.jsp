<!-----------------------------------
* @文件描述：通用打印详细信息查看页面
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Collection"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.SubTableModelLink"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.opensymphony.xwork2.ActionContext"%>
<%
	String rootPath=request.getContextPath();
	String moduleId=(String)request.getAttribute("moduleId");
	TableModel currTblMdl = (TableModel) request.getAttribute("tableModel");
	String moduleDesc = currTblMdl.getDesc();

%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<input type="hidden" id="keyLimit" name="keyLimit" value="${keyLimit}"/>
<title>查看数据-<%=moduleDesc%></title>
</head>
        <style media="print">  
            .noprint { display : none; }  
        </style>  
<body >
	<script>
	    function doPrintSetup(){  
	        //打印设置  
	    	var objs = document.getElementsByTagName("*");
	    	setHiddenBlocksVisible(objs,"none");	        
	        printWB.ExecWB(8,1); 
	        setHiddenBlocksVisible(objs,"");	 
	    }  
	    function doPrintPreview(){  
	    	//打印预览  
	    	var objs = document.getElementsByTagName("*");
	    	setHiddenBlocksVisible(objs,"none");		    
	        printWB.ExecWB(7,1);
	        setHiddenBlocksVisible(objs,"");	        
	    }  
	    function doPrint(){  
	    	//直接打印  
	    	var objs = document.getElementsByTagName("*");
	    	setHiddenBlocksVisible(objs,"none");			    
	        printWB.ExecWB(6,6);
	        setHiddenBlocksVisible(objs,"");	  
	    } 

	    function setHiddenBlocksVisible(objs,display){
	    	for(var i = 0;i < objs.length; i++){  
				if (objs[i].open == "false"){
					objs[i].style.display = display;
				}
	    	}			
		}   
	</script>
    <object id="printWB" style="dispaly:none" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"></object> 	
	<div class="noprint" >
		
		<input class="button" style="float: right;"type="button" value="直接打印" onclick="doPrint();"></input>  
		<input class="button" style="float: right;" type="button" id="op_printView" onclick="doPrintPreview();" value="打印预览"></input>
		<br><br>
		<input class="button" style="float: right;"type="button" value="打印设置" onclick="doPrintSetup();"></input>
	</div>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/CommonPrintView.jsp" /> 
</body>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 