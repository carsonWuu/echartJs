/***********************************
* @文件描述：集团操作机构产品节点设置脚本
*************************************/

function setOrgProductNode(){
	var isSelect =false;
	var isOver =0;
	if(isSubmit == true){
		showMessage("MSG1196");//请您先提交后再设置！
		return;
	}
	for ( var i = 0; i < selectedNode.options.length; i++) {
		if (selectedNode.options[i].selected) {
			isSelect =true;
			isOver +=1;
			if (isOver >= 2) {
				showMessage("MSG1197");//您最多只能选择一个机构！
				return;
			}else{
				var selectdeOrg = selectedNode.options[i].value;
			}
		}
	}
	for ( var i = 0; i < areas.options.length; i++) {
		if (areas.options[i].selected) {
			var selectedArea = areas.options[i].value;
		}
	}
	if (isSelect == true) {
		var productCode =document.getElementById('PRODUCTCODE').value;
		var url=rootPath+"/credit/crdbase/product/CrdProductInfoBiz/SetOrgProductNode?PRODUCTCODE="+productCode
		                +"&selectedOrg="+selectdeOrg
		                +"&selectedArea="+selectedArea;
		openModalDialog(url,window,'dialogWidth:680px;dialogHeight:320px');
		
	} else {
		showMessage("MSG1198");//请在已选的节点中选择任一机构！
	}
}

function moveOption(e1, e2) {
	isSubmit =true;
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
	isSubmit =true;
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



function getAreaSelect(){
	for ( var i = 0; i < selectedNode.options.length; i++) {
		if (selectedNode.options[i].selected) {
			var selectOrgId = selectedNode.options[i].value;
		}
	}
	if(selectOrgId =='' || selectOrgId ==null){
		return;
	}
	var url = rootPath + "/fmp/system/orgTransactArea/orgTransactAreaBiz/getOrgTransactAreaInfo?ORGID="+selectOrgId;		
	XMLHttp.urlSubmit(url,backCall_getMessageData);	
	function backCall_getMessageData(areaDataStr){
		document.getElementById("areaSelectBox").options.length = 0;	
		document.getElementById("areaSelectBox").options.add(new Option("-- 请选择 --",""));

		var areaId;
		var areaName;
		var arr = areaDataStr.split('#;#');
		var brr=new Array();
		for (var i=0; i<arr.length-1; i++){
			brr[i] = arr[i].split('#=#');
			areaId = brr[i][0];
			areaName = brr[i][1];
			if(areaId != "" && areaName != null){
				document.getElementById("areaSelectBox").options.add(new Option(areaName,areaId)); 
			}
		}
		

	}
}
