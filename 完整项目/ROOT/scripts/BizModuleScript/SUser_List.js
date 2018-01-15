function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}

function openDeptPop(){                       //打开所属部门pop窗口
	var orgId = document.getElementById("detailId_ORGID").value;
	if(orgId == "" || orgId == null){         //判断所属机构是否为“空”
		showMessage("MSG1240");//请先选择所属机构！
	}else {
		var freezeCondition = "and (dept.ORGID='"+orgId+"' or dept.ORGID='[ALL]')";
		openSinPop('SDept','DEPTID','DEPTID','DEPTNAME','',freezeCondition);
	}
}

function setRoles() {
	//机构用户管理设置岗位
	if (selectedRid != null) {   
		var url="fmp/SUser/SetRole.action?tableModelId=SRole&RID="+selectedRid+"&isOrgUser="+isOrgUser;
		openModalDialog(url,window,'dialogWidth:450px;dialogHeight:400px');
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function setOrgRoles() {
	//系统用户管理设置岗位
	if (selectedRid != null) {
		var url="fmp/SUser/SetRole.action?tableModelId=SRole&RID="+selectedRid;
		openModalDialog(url,window,"dialogWidth:450px;dialogHeight:400px");
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}


function setPosts() {
	//机构用户管理设置职位
	if (selectedRid != null) {
		var url="fmp/SUser/SetPost.action?isOrgUser=true&tableModelId=SPost&RID="+selectedRid;
		openModalDialog(url,window,'dialogWidth:400px;dialogHeight:400px');
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}


function setOrgPosts() {
	//系统用户管理设置职位
	if (selectedRid != null) {
		var url="fmp/SUser/SetPost.action?tableModelId=SPost&RID="+selectedRid;
		openModalDialog(url,window,'dialogWidth:400px;dialogHeight:400px');
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function setDepts() {
	//机构用户管理设置 部门
	if (selectedRid != null) {
		var url="fmp/SUser/SetDepts.action?isOrgUser=true&tableModelId=SDept&RID="+selectedRid;
		openModalDialog(url,window,'dialogWidth:400px;dialogHeight:400px');
		doRefreshList();
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function setOrgDepts(){
	//系统用户管理设置职位
	if (selectedRid != null) {
		var url="fmp/SUser/SetDepts.action?tableModelId=SDept&RID="+selectedRid;
		openModalDialog(url,window,'dialogWidth:400px;dialogHeight:400px');
		doRefreshList();
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}


function reSetPassword(){

	if (selectedRid != null) {
		if (confirm("是否确认重置改用户密码？")) {
			var userId = getDataListTrueValue(selectedRid,"USERID");
			var url =rootPath+"/fmp/SUser/SavePassword?pwdMode=reSave&USERID="+userId;
			comAjax(url,reCallBack);
		}
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}


function reCallBack(msg){
	if(msg == 'success'){
		showMessage("MSG1241");//密码重置成功！密码为：888888
	}else{
		showMessage("MSG0087");//密码修改失败，请联系管理员！
	}
}

function moveOption(e1, e2) {
	for ( var i = 0; i < e1.options.length; i++) {
		if (e1.options[i].selected) {
			if(e1.options[i].text.indexOf('(') !=-1){
				e1.options[i].text = e1.options[i].text.substring(0,e1.options[i].text.indexOf('('));
			}
			var e = e1.options[i];
			e2.options.add(new Option(e.text, e.value));
			e1.remove(i);
			i = i - 1;
		}
	}
}
function moveAllOption(e1, e2) {
	for ( var i = 0; i < e1.options.length; i++) {		

		if(e1.options[i].text.indexOf('(') !=-1){
			e1.options[i].text = e1.options[i].text.substring(0,e1.options[i].text.indexOf('('));
		}
		var e = e1.options[i];
		e2.options.add(new Option(e.text, e.value));
		e1.remove(i);
		i = i - 1;

	}
}

function setMainDept(){
	var form0 = document.forms[0];
	var leftList = form0.rightSelectBox;
	for ( var i = 0; i < leftList.options.length; i++) {
		var selectedOp = leftList.options[i].text;
		if(selectedOp.indexOf('(') !=-1){
			leftList.options[i].text = selectedOp.substring(0,selectedOp.indexOf('('));
		}
		if (leftList.options[i].selected) {
			selectedOp=leftList.options[i].text+"(主属)";
			leftList.options[i].text=selectedOp;
		}	
	}
}

function importExcel(){

	var url=rootPath+"/fmp/SUser/InvocakeAction.action?tableModelId=SUser";
	openModalDialog(url,window,'dialogWidth:450px;dialogHeight:50px');

}

function setHypothec(){                           //设置抵押权人
	if (selectedRid != null) {
		var ifHypothec = getDataListTrueValue(selectedRid,"IFHYPOTHEC");
		if(ifHypothec=="1"){    //判断抵押权人是否为“是”
			showMessage("MSG1243");//抵押权人已设置为“是”，无需再次设置！
		}else{
			var tag = "set";
			var url=rootPath+"/fmp/SUser/setOrCancleHypothec?tag="+tag+"&tableModelId=SUser&RID="+selectedRid;
			comAjax(url,backCallSetHypothec);	  
		}

	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function backCallSetHypothec(msg){
	if(msg == 'success'){
		showMessage("MSG1244");//设置抵押权人成功！
		doRefreshList();
	}
}

function cancleHypothec(){                        //取消抵押权人
	if (selectedRid != null) {
		var ifHypothec = getDataListTrueValue(selectedRid,"IFHYPOTHEC");
		var balanceAmt = getDataListTrueValue(selectedRid,"OCCUPYAMT");
		if(balanceAmt == "0.00"){
			if(ifHypothec=="2"){    //判断抵押权人是否为“否”
				showMessage("MSG1245");//抵押权人已设置为“否”，无需取消！
			}else{
				var tag = "cancle";
				var url=rootPath+"/fmp/SUser/setOrCancleHypothec?tag="+tag+"&tableModelId=SUser&RID="+selectedRid;
				comAjax(url,backCallCancleHypothec);	  
			}
		}else{
			showMessage("MSG1246");//因为抵押余额不为“0”，所以不能取消抵押权人！
		}
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function backCallCancleHypothec(msg){
	if(msg == 'success'){	
		showMessage("MSG1247");//取消抵押权人成功！
		doRefreshList();
	}
}


function orgUserAddData(){
	var url=rootPath+"/fmp/SUser/DoAdd?tableModelId=SUser&freezeValue=ORGID:"+CURR_ORGID+",TRANS_ORGID:"+fmpEncodeURI(CURR_ORGNAME);
	openWindow(comUrl(url));

}




