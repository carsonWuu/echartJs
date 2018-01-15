

function setOrg() {
	
	if (selectedRid != null) {
		var url="fmp/system/sysAffiche/affich/SAfficheBiz/SetOrgs.action?tableModelId=SOrg&RID="+selectedRid;
		openModalDialog(url,window,'dialogWidth:700px;dialogHeight:350px');
		doRefreshList();
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}




function moveOption(e1, e2) {
	for ( var i = 0; i < e1.options.length; i++) {
		if (e1.options[i].selected) {
			var e = e1.options[i];
			e2.options.add(new Option(e.text, e.value));
			e1.remove(i);
			i = i - 1;
		}
	}
}
function moveAllOption(e1, e2) {
	for ( var i = 0; i < e1.options.length; i++) {		
			var e = e1.options[i];
			e2.options.add(new Option(e.text, e.value));
			e1.remove(i);
			i = i - 1;
		
	}
}








