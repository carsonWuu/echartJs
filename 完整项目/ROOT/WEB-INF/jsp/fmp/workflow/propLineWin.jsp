<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Iterator"%>
<%
	String rootPath = request.getContextPath();
	Map flowParamInfo = (Map)request.getAttribute("flowParamInfo");
%>
<html>
<head>
<link href='<%=rootPath%>/styles/fmp/propwin.css' rel='stylesheet' type='text/css'>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath%>/scripts/fmp/flowEditor.js" type="text/javascript" language="javascript"></script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>路径</title>
</head>

<body>
    <div id="con">
        <ul id="tags">
            <li class="selectTag">
            	<a onclick="selectTag('tagContent0',this)" href="javascript:void(0)">路由条件</a>
            </li>            
        </ul>

        <div id="tagContent">
            <div class="tagContent selectTag" id="tagContent0">
	            <table border = "0"  height="100%" width="100%">
	            <tr height="30px">
	            <td>
	            	<span>&nbsp;&nbsp;路由条件</span>	
	            </td>
	            <td>
	            	<span>&nbsp;&nbsp;点击选取</span>
	            </td>	            
	            </tr>
				  <tr>
				    <td style=" width: 65%; ">
				    	<div style=" height:100% ;">
									    
					    	<div style="overflow-y: auto;   width: 100%;"  >
					    		<textarea style="height:100% " class="x-form-field-line" id="ROUTECONDITION" rows="10"></textarea>
							</div>
						</div>	
					</td>			    
				    <td style=" width: 35%;">
				    <% 
				    	if(flowParamInfo != null){
				    %>
				    <div style=" height:100% ;">
						
						<div style="overflow-y: auto;  width: 100%;"   >
				    <%
				    	Iterator<String> it = flowParamInfo.keySet().iterator();
					    while (it.hasNext()) {
							String key = it.next();
							%>
							<input class="h5button orange small" type="button" onclick="copyKeyToTra('<%=key %>')" value="<%=flowParamInfo.get(key)%>"/>
								
							 
							<%
						}
				    %>
						</div>
						</div>
				    <% 
				    	}
				    %>
									
					</td>
				  </tr>		
				  <tr height="30px">
					  <td align="center">
					    <div >
					    	<input class="h5button blue medium" type="button"   onclick="apply();" value="确定"></input>
					    </div> 					  
					  </td>
					  <td></td>
				  </tr>		  				  				  
				</table>         	           	   		
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


     }
 </script>
<script type="text/javascript">
        var topWindow = getMainWindow();
        var obj = topWindow.dataObject; //得到父窗口传递过来的对象     	
		document.getElementById('ROUTECONDITION').value=obj.ROUTECONDITION;
		var isApply = false;
		function apply(){
			if(obj){
				var routeconditionStr = document.getElementById('ROUTECONDITION').value;
				if(checkSingleQuotes(routeconditionStr)){
					alert("'路由条件'包含非法字符 ',请修改后保存。");
					return;
				}else{
					obj.ROUTECONDITION=routeconditionStr;
					closeWindow();
				} 
			}  
			isApply = false;
		}
 
		
		/**
		 * 单号号校验
		 */ 	
		function checkSingleQuotes(strObj){
			var strP = /\'/g;
			return strP.test(strObj);
		}


		/**
		*修改检测
		*/
		var input  = document.getElementsByTagName("INPUT"); 
		for(var   i=0;i <input.length;   i++){  
			input[i].addEventListener("onchange",testSave);
		} 
		var textarea = document.getElementsByTagName("textarea"); 
		for(var   i=0;i <textarea.length;   i++){  
			textarea[i].addEventListener("onchange",testSave); 
		} 
		function   testSave(){ 
			isApply = true;
	    }

		function copyKeyToTra(key){
			//alert(key);
			var paramKey = " $#"+key+"# ";
			//alert(paramKey);
			var textarea = document.getElementById("ROUTECONDITION");
			//alert(textarea.value);
			textarea.value = textarea.value +paramKey;
		}   
 </script>
    
    
</body>
</html>