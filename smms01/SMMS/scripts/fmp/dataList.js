/***********************************
* @文件描述：列表页面公共的js
*************************************/
//在列表中删除数据，数据并没有在数据库中删除
function deleteDataInUpdateListMode(){
	if (selectedRid != null) {
		if (confirm("是否确认要删除？")) {
			var dataTable = document.getElementById("dataListBody");
			var selectedTR = document.getElementById("rowid_"+selectedRid);
			dataTable.deleteRow(selectedTR.sectionRowIndex);
			//selectedTR.style.display = "none";
			//selectedTR.isDeleted = true;
			deletedRowIds +=","+selectedRid;
			selectedRid = ","+selectedRid+",";	
			InitRids = ","+InitRids+",";
			updateRowIds = ","+updateRowIds+",";
			addRowIds = ","+addRowIds+",";
			
			InitRids = InitRids.replace(selectedRid,",");	
			
			updateRowIds = updateRowIds.replace(selectedRid,",");	
			addRowIds = addRowIds.replace(selectedRid,",");		


			while (updateRowIds.indexOf(",,")>-1){
				updateRowIds = updateRowIds.replace(/,,/g,","); 
			}
			updateRowIds = updateRowIds.replace(/^\s+|\s+$/g,"");
			if (updateRowIds==","){
				updateRowIds = "";
			}
			while (addRowIds.indexOf(",,")>-1){
				addRowIds = addRowIds.replace(/,,/g,","); 
			}
			addRowIds = addRowIds.replace(/^\s+|\s+$/g,"");
			if (addRowIds==","){
				addRowIds = "";
			}		
			while (InitRids.indexOf(",,")>-1){
				InitRids = InitRids.replace(/,,/g,","); 
			}			
			InitRids = InitRids.replace(/^\s+|\s+$/g,"");
			if (InitRids==","){
				InitRids = "";
			}
			
			selectedRid=null;
			ejiaA1('ejiaA1','#FFFFFF','#e7eef4','#f0f2fd','#ffe3a8');
		}
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}		
}

/**
 * 加入修改过的记录RID，目的是只对修改过的数据进行保存
 * @param changeObj
 * @return
 */
function addChangeRids(changeObj){
	var selRid = getSelectedRid(changeObj);
	if (typeof(updateRowIds) == "undefined"){
		updateRowIds ="";
	}
	if (selRid !="" && updateRowIds.indexOf(selRid)<0){
		updateRowIds +=","+selRid;
	}		
//	alert("change="+updateRowIds);
//	var objName = changeObj.name;
//	if (objName.indexOf("_rid_")>-1){
//	var rid = objName.substring(objName.indexOf("_rid_")+"_rid_".length,objName.length);
//	if (updateRowIds.indexOf(rid)<0){
//	updateRowIds +=","+rid;
//	}
//	}
}

/**
 * 列表保存以后，对RID记录串进行重置，避免数据反复提交修改
 * @return
 */
function resetRidsAfterSave(){
	if (typeof InitRids== "undefined"){
		InitRids = "";
	}
	if (typeof addRowIds== "undefined"){
		addRowIds = "";
	}	
	InitRids += addRowIds;
	InitRids = InitRids.replace(",,",",");	
	deletedRowIds = "";
	updateRowIds = "";
	addRowIds = "";
}

/**
 * 单击行的触发事件
 * @param rid
 * @return
 */
function RowClick(rid) {
	selectedRid = rid;
}

/***********************************
* @文件描述：页面框架公共的js
*************************************/
    var lastClickRow;
    var tableModelId;
    var freezeCondition;
	function ejiaA1(o, color1, color2, onMoveColor, onClickColor) {	
		//'ejiaA1','#FFFFFF','#e7eef4','#f0f2fd','#ffe3a8'
		color1 = '#FFFFFF'; 
		color2 = '#f7f6f6';
		onMoveColor = '#ffe3a8';
		onClickColor = '#ffe3a8';
		var sTable = document.getElementById("dataListBody");
		if (sTable){
			for ( var i = 0; i < sTable.rows.length ; i++) {
				sTable.rows[i].style.backgroundColor = (sTable.rows[i].sectionRowIndex % 2 == 0) ? color1
						: color2;
				sTable.rows[i].onclick = function() {
					if (this.x != "1") {
						this.x = "1";
						this.style.backgroundColor = onClickColor;
						if (lastClickRow) {
							lastClickRow.x = "0";
							lastClickRow.style.backgroundColor = (lastClickRow.sectionRowIndex % 2 == 0) ? color1
									: color2;
						}
						lastClickRow = this;
					}
				};
				sTable.rows[i].onmouseover = function() {
					if (this.x != "1"){
						this.style.backgroundColor = onMoveColor;
						this.style.color = "#000000";
						//this.style.Color = onClickColor;
					}
				};
				sTable.rows[i].onmouseout = function() {
					if (this.x != "1"){
						this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? color1
								: color2;
					}
						
				};
			}
			return sTable.rows.length;
		}
	}	
	
	
    function _xml_htmlInsert(partId, viewData) {

		var regexp1 = /<script(.|\n)*?>(.|\n|\r\n)*?<\/script>/ig;
		var regexp2 = /<script(.|\n)*?>((.|\n|\r\n)*)?<\/script>/im;

		/* draw the html first */
		partId.innerHTML = viewData.replace(regexp1, "");

		var result = viewData.match(regexp1);
		if (result) {
			for ( var i = 0; i < result.length; i++) {
				var realScript = result[i].match(regexp2);
				_xml_executeScript(realScript[2], partId);
				/* Note: do not try to write more than one <script> in your view.*/
				/* break; process only one script element */
			}
		}
	}

	function loadDataListXML(divID, url, data, extCall) {
		showProgressDiv();
 /*
		var xmlHttp ;
		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlHttp = new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		};		
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				var xmlTxt = xmlHttp.responseText;
				//_xml_htmlInsert(document.getElementById(divID),xmlTxt);
				var divObj = document.getElementById(divID);
				divObj.innerHTML = "";
				if (divObj != null){
					try{
						divObj.innerHTML = xmlTxt;//xmlhttp.responseText;
						 if(typeof resizeIframe != "undefined"){
								resizeIframe();
						 }
					}catch(e){
						//吃掉异常，不影响业务
					}
				}
				dataCount = ejiaA1("ejiaA1","#FFFFFF","#e7eef4","#f0f2fd","#ffe3a8");	
				if ($_("pq_maxLine")){
					setObjectDisplay("totalRow",$_("pq_recordCount").innerHTML*1 > $_("pq_maxLine").value*1);
				}
				try{
					setVisibleColumns($_("listArea").visiColNames);
				}catch(e){
					//吃掉异常，不影响业务
				}
			};
			
		};
		xmlHttp.open("POST", url, true);
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xmlHttp.send(data); */
 
		XMLHttp.htmlDecode = false;
		XMLHttp.urlSubmit(url,callBack,data,extCall);
		function callBack(content){
			hideProgressDiv();
				var divObj = document.getElementById(divID);
				if (divObj != null){
					//try{
						divObj.innerHTML = "";
						divObj.innerHTML = content;
						 if(typeof resizeIframe != "undefined"){
								resizeIframe();
						 }
  
						 $("#"+divID+" script").each(function(){
							var sc = $(this).html();	 
							var script= document.createElement("script");
							script.innerHTML=sc;
							document.body.appendChild(script);
						 });

					//}catch(e){
						//吃掉异常，不影响业务
					//}
				}
				dataCount = ejiaA1("ejiaA1","#FFFFFF","#e7eef4","#f0f2fd","#ffe3a8");	
				if (document.getElementById("pq_maxLine")){
					setObjectDisplay("totalRow",document.getElementById("pq_recordCount").innerHTML*1 > document.getElementById("pq_maxLine").value*1);
				}
				try{
					setVisibleColumns(document.getElementById("listArea").visiColNames);
				}catch(e){
					//吃掉异常，不影响业务
				}
				
		}  
	}
	 
	
	function loadXMLDoc(divID, url) {
		var xmlHttp;
		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlHttp = new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				var xmlTxt = xmlHttp.responseText;
				//_xml_htmlInsert(document.getElementById(divID),xmlTxt);
				document.getElementById(divID).innerHTML = xmlTxt;//xmlhttp.responseText;
			}
			
		};
		xmlHttp.open("POST", url, true);
		xmlHttp.send();
	}
	
	/**
	 * 刷新列表
	 * @return
	 */
	function doRefreshList(selectedTableModelId){
/*		try{
			if (typeof(refreshList) != "undefined"){
				refreshList();
			}			

			if(typeof(window.opener) != "undefined"){
				if (typeof(window.opener.refreshList) != "undefined"){
					window.opener.refreshList();	
				}
			}

			if (typeof(window.parent.opener)!="undefined"){
				if (typeof(window.parent.opener.refreshList)!="undefined"){
					window.parent.opener.refreshList();
				};
			}
			if (typeof(window.parent.parent.opener)!="undefined"){
				if (typeof(window.parent.parent.opener.refreshList)!="undefined"){
					window.parent.parent.opener.refreshList();
				};			
			}
		}catch(e){
			//alert(e.message);//刷新列表如果失败，无须处理
			
		}
		if(typeof resetRidsAfterSave != "undefined"){
			resetRidsAfterSave();
		}
		
*/
		
		if (typeof(refreshList) != "undefined"){
			refreshList(selectedTableModelId);
		}
		if(typeof resetRidsAfterSave != "undefined"){
			resetRidsAfterSave();
		}
		var topWin = getMainWindow(); 
		if(typeof (topWin.menuTree) != "undefined"){
			var menuObj = topWin.menuTree._globalIdStorageFind(topWin.menuTree.getSelectedItemId());
			topWin.menuTree.clearAllParentRecordCount(topWin.menuTree,menuObj);
			topWin.refreshRecordCount(topWin.menuTree,topWin.menuTree.getSelectedItemId());	
		}	
		
		if(typeof(topWin.getTopWinDivId) != "undefined" && topWin.getTopWinDivId()!=""){
			/*var winObj = topWin.document.getElementById(topWin.getTopWinDivId()).openerWindow;
			if(winObj){
				if(typeof (winObj.refreshList)!="undefined"){
					winObj.refreshList(selectedTableModelId);
				}
			}
			*/
			subRefreshList(topWin.getTopWinDivId(),topWin,selectedTableModelId);
			
		}
		
	}	
	
	/**
	 * 迭代刷新父级窗口
	 */
	function subRefreshList(divID,topWin,tbID){
		var winObj = topWin.document.getElementById(divID).openerWindow;
		if(winObj){
			if(typeof (winObj.refreshList)!="undefined"){
				winObj.refreshList(tbID);
			}

			var parentId = topWin.document.getElementById(divID).openerDivId;
			if(parentId !=""){
				subRefreshList(parentId,topWin,tbID);
			}
			
			if(typeof doOnDataListload != "undefined"){
				doOnDataListload(tbID);
			}

			if (document.getElementById("selectColDiv")){
				document.getElementById("selectColDiv").hide = function() {
					this.style.display = "none";
				};
			}			
		}
	}
	
	
	/**
	 * 显示列表列选择界面
	 * @return
	 */
	function showColumnSelector(clkObj){
		var colDiv=document.getElementById("selectColDiv");
		colDiv.style.position= "absolute";
		colDiv.style.top = window.event.clientY; 
		colDiv.style.left = window.event.clientX; 
		colDiv.style.border="1px solid #78ACD3";
		colDiv.style.background="#FFF";
		colDiv.style.display = "";
		document.body.appendChild(colDiv);
		var colMap = eval('('+listColumns+')');
		var str = "<iframe name=\"setHideColIframe\" id=\"setHideColIframe\" width=\"150px\" height=\"350px\" scrolling=\"no\" frameborder=\"0\" style=\"margin:0px;\"></iframe>";
		
		colDiv.innerHTML = str;
		colDiv.canhide = false;
		var colIframe = window.frames['setHideColIframe'];
		colIframe.document.writeln('<!DOCTYPE html PUBLIC "-\/\/W3C\/\/DTD XHTML 1.0 Transitional\/\/EN" "http:\/\/www.w3.org\/TR\/xhtml1\/DTD\/xhtml1-transitional.dtd">');
		colIframe.document.writeln('<html">');
		colIframe.document.writeln('<head>');
		colIframe.document.writeln('<meta http-equiv="Content-Type" content="text\/html; charset=utf-8" \/>');
		colIframe.document.writeln('<link href="'+rootPath+'/styles/fmp/frameStyle.css" rel="stylesheet" type="text/css" />');
		//colIframe.document.writeln('<script src="'+rootPath+'/scripts/fmp/setHideColumn.js"></script>');
		colIframe.document.writeln('<title><\/title>');
		colIframe.document.writeln('<\/head>');
		colIframe.document.writeln('<body><form>');
		colIframe.document.writeln('<div>');
		colIframe.document.writeln('<table width="100%" height="100%">');
		colIframe.document.writeln( "<tr style=\"background-color: #EEE;\"><td align=\"center\"><input type=\"checkbox\" name=\"selectAllColumn\" id=\"selectAllColumn\" onclick=\"document.onCheckAllBox(this);\" checked >全选</td></tr>");
		colIframe.document.writeln( "<tr><td>");
		colIframe.document.writeln('<div class="div_selectColItem">');
		colIframe.document.writeln('<table>');
		for (var colName in colMap){
			var desc = colMap[colName];
			if (colName){//selCbx_"+colName+"
				var hCol =  document.getElementById("datalist_"+colName); 
				var checkFlag = "checked";
				if (hCol.style.display == "none"){
					checkFlag = "";
				}
				colIframe.document.writeln( "<tr><td><input type=\"checkbox\" name=\"selectColumnBoxs\" id=\"selCbx_"+colName+"\" value=\""+colName+"\" "+checkFlag+">"+desc+"</td></tr>");
			}
		}
		colIframe.document.writeln( "</table>");
		colIframe.document.writeln('</div>');
		colIframe.document.writeln( "</td></tr>");
		colIframe.document.writeln( "<tr style=\" height:100%\"></tr>");
		colIframe.document.writeln( "<tr style=\"background-color: #EEE; \"><td align=\"center\"><input class='fbutton' type='button' onclick='document.onConfirmClick();' value='确认'></input></td></tr>");
		colIframe.document.writeln( "</table>");
		colIframe.document.writeln('</div>');
		colIframe.document.writeln('<\/form><\/body>');
		colIframe.document.writeln('<\/html>');
		colIframe.document.onConfirmClick = function(){
			var selCount = 0;
			var selectedColNames = ',';
			for (var colName in colMap){
				if (colName){
					if (colIframe.document.getElementById("selCbx_"+colName).checked){
						selectedColNames +=colName+',';
						selCount++;
					}
				}
			}			
			
			if (selCount == 0){
				showMessage("MSG0095"); //请最少选择一个列！
			}else{
				setVisibleColumns(selectedColNames);
			}
		};

		colIframe.document.onCheckAllBox = function(cbxObj){
			for (var colName in colMap){
				if (colName){
					var selCbx =  colIframe.document.getElementById("selCbx_"+colName); 
					selCbx.checked = cbxObj.checked;
				}
			}
		};
		colIframe.document.close();
		return false;
	}
 

	/**
	 * 设置隐藏列
	 * colMap:列映射
	 * visiColNames: 需要显示的列名
	 */
	function setVisibleColumns(visiColNames){
		if (visiColNames){
			var colIframe = window.frames['setHideColIframe'];
			var colMap = eval('('+listColumns+')');
			
			for (var colName in colMap){
				//var hCol =  document.getElementById("datalist_"+colName); 
				var colGid = $("#datalist_"+colName).attr("colGroupId");
				if (colGid){
					var ghCol=document.getElementById(colGid);
					if(ghCol){
						ghCol.colSpan = ghCol.members-0;
						ghCol.style.display = "";
					}
				}
			}
			
			
			for (var colName in colMap){
				if (colName){
					//要显示的列
					if (visiColNames.indexOf(","+colName+",")>-1){
						setColumnDisplay(colName,"");					
					}else{//要隐藏的列
						setColumnDisplay(colName,"none");
						var hCol =  document.getElementById("datalist_"+colName); 
						if (hCol.colGroupId){
							//alert(hCol.colGroupId);
							var ghCol=document.getElementById(hCol.colGroupId);
							if(ghCol){
								var cs = ghCol.colSpan-1;
								if (cs == 0){
									ghCol.style.display = "none";
								}else{
									ghCol.colSpan = cs;
								}
							}
						}						
					}
				}
			}
	 
			var listArea=document.getElementById("listArea");
			listArea.visiColNames = visiColNames;
	
			var colDiv=document.getElementById("selectColDiv");
			colDiv.innerHTML = "";
			colDiv.style.display = "none";
		}
	}
 
	
	/**
	 * 隐藏列表中某一列
	 * colName: 列名
	 * disp： 显示标识
	 */
	function setColumnDisplay(colName,disp){
		//获取对象所在的父节点的位置
		/*function getSelfIndex(currnode){
			pNode = currnode.parentNode;
			if (pNode){
				for (var i=0;i<pNode.childNodes.length;i++){
					if (currnode == pNode.childNodes[i]){
						return i;
					}
				}
			}
			return -1;
		}	*/	
		
		var hCol =  document.getElementById("datalist_"+colName); 
		if (hCol){
			var hIdx = $(hCol).attr("colIdx");//getSelfIndex(hCol);
			//alert(hIdx);
			hCol.style.display = disp;
			var bodyNode = hCol.parentNode.parentNode.parentNode.childNodes[1];
			for (var rowIdx = 0; rowIdx < bodyNode.childNodes.length;rowIdx++){
				rowNode = bodyNode.childNodes[rowIdx];
				for (var colIdx = 0; colIdx < rowNode.childNodes.length;colIdx++){
					if ($(rowNode.childNodes[colIdx]).attr("colIdx") == hIdx){
						rowNode.childNodes[colIdx].style.display = disp;
					}
				}
			}
		}
		var sumCol =  document.getElementById("sum_"+colName); 
		if (sumCol && sumCol!= "undefined"){
			sumCol.style.display = disp;
		}
	}
	
	/**
	 * 获取mainframe所在的window对象
	 * fmpcommon.js 内亦有相同方法，不冲突
	 * @return
	 */
	function getMainWindow(){
		if (window.top.parent.openerWindow){
			return window.top.parent.openerWindow.top;
		}else{
			return window.top;
		}	
	}
	
	



	