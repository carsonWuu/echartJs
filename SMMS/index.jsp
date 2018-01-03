<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
  <META HTTP-EQUIV="Refresh" CONTENT="0;URL=fmp/base/ShowLogin"> <!--重定向  -->
</head>

<body><!--
		<br>
        <s:url id="url3" action="credit/caseManage/CrdRepaymentPlan/CrdRePaymentPlanBiz/Rpp?CASECODE=NNN123&BIZRID=qwert34rfvrtyedc">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url3}">还款计划</s:a>

        <s:url id="url0" action="base/ShowLogin">
        </s:url>
		<s:a href="%{url0}">登录</s:a>
		<br>

        <s:url id="url" action="fmp/core/SModule/BuildMenuXML">
            <s:param name="USERID">admin</s:param>
        </s:url>
		<s:a href="%{url}">生成XML</s:a>
		<br>
		

        <s:url id="url1" action="fmp/core/SModule/BuildModuleActXML">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url1}">生成模块操作XML</s:a>
		<br>		
		
        <s:url id="url2" action="fmp/frame/ShowMainFrame">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url2}">主界面</s:a>	
		

					
	
 
		<br>
        <s:url id="url4" action="fmp/frame/SWorkCalender/ShowDate">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url4}">日历</s:a>	
		
		<br>
        <s:url id="url5" action="fmp/frame/common/DoList?tableModelId=SModule">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url5}">系统模块</s:a>	
		
		<br>
        <s:url id="url6" action="fmp/frame/common/DoList?tableModelId=SModuleOpperation">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url6}">模块操作</s:a>	
		
		<br>
        <s:url id="url7" action="fmp/frame/common/DoList?tableModelId=SRole">
            <s:param name="tttt">ttst</s:param>
        </s:url>

		<s:a href="%{url7}">角色管理模块</s:a>	
		<br>
        <s:url id="url7" action="fmp/frame/common/DoList?tableModelId=CrdBankInfo">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url7}">银行管理模块</s:a>
		<br>
        <s:url id="url7" action="fmp/frame/common/DoList?tableModelId=CrdTerminalInfo">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url7}">终端管理模块</s:a>
		<br>
		<s:url id="url7" action="fmp/frame/common/DoList?tableModelId=CrdTmlCommisionInfo">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url7}">支佣账号管理模块</s:a>
		<br>
        <s:url id="url7" action="fmp/frame/common/DoList?tableModelId=CrdRelatedCorpInfo">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url7}">往来单位管理模块</s:a>
		<br>
        <s:url id="url7" action="fmp/frame/common/DoList?tableModelId=CrdRelAgreementInfo">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url7}">往来单位协议管理模块</s:a>		
		<br>
        <s:url id="url5" action="fmp/system/SModule/TreeFramesets">
            <s:param name="tttt">ttst</s:param>
        </s:url>
		<s:a href="%{url5}">模块操作设置</s:a>

        <s:url id="url5" action="uplaod/commonUpload/uplaodFile">
            <s:param name="archiveid">ttst</s:param>
             <s:param name="archivetype">1</s:param>
             <s:param name="tableName">S_ARCHIVE</s:param>
             <s:param name="recordrid">dca357c1cc29431e8242ea83f5487ca2</s:param>
             <s:param name="attachmentType">01</s:param>
             
        </s:url>
		<s:a href="%{url5}">上传文件</s:a>	
		
	    <s:url id="url6" action="creadit/CrdRepayPlanBiz/CrdRepayPlanAdd">
        </s:url>
		<s:a href="%{url6}">还款计划添加</s:a>
		 <s:url id="url7" action="creadit/CrdRepayPlanBiz/EditCrdRepayPlanList">
        </s:url>
		<s:a href="%{url7}">还款计划编辑</s:a>
		
		 <s:url id="url8" action="/fmp/SRoleRightBiz/RoleRightFrameset">
        </s:url>
		<s:a href="%{url8}">角色权限设置</s:a>	
		 <s:url id="url9" action="/fmp/BuildRightBiz/BuildRight">
        </s:url>
		<s:a href="%{url9}">生成权限文件</s:a>	
		
		
		<s:url id="url20" action="/fmp/FrameCommonBiz/ValidCheck?sqlMapId=SDic.checkDataType&DATATYPE=CRD_MZ1">
        </s:url>
		<s:a href="%{url20}">数据验证</s:a>
			-->
</body>


</html>
