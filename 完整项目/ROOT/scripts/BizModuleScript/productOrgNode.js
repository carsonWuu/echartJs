/*******************************************************************************
 * @文件描述：机构产品节点设置脚本
 ******************************************************************************/

function setNextNode() {
	var divObj = $_('selectSub');
	var htmls = '';
	var isSelect = false;
	var isOver = 0;
	var hasselectedArr; // 数组，用于回显
	var isShow = false;
	for ( var i = 0; i < selectedNode.options.length; i++) {
		if (selectedNode.options[i].selected) {
			isSelect = true;
			isOver += 1;
			if (isOver >= 2) {
				showMessage("MSG1199");//您最多只能选择一个节点！
				return;
			} else {
				selectedIndex = i;

				var hasselected = selectedNode.options[selectedIndex].value;
				if (hasselected.indexOf('=>') != -1) {// 判断选定的节点是否有下一节点
					isShow = true;
					hasselected = hasselected.substring(hasselected
							.indexOf('(') + 1, hasselected.lastIndexOf(')'));
					hasselectedArr = hasselected.split('#');
				}

			}
		} else {
			var selectedNodeText = selectedNode.options[i].text;
			var selectedNodeValue = selectedNode.options[i].value;
			if (selectedNodeText.indexOf('=>') != -1) {
				selectedNodeText = selectedNodeText.substring(0,
						selectedNodeText.indexOf('=>'));
			}
			if (selectedNodeValue.indexOf('=>') != -1) {
				selectedNodeValue = selectedNodeValue.substring(0,
						selectedNodeValue.indexOf('=>'));
			}
			htmls = htmls + '<INPUT  type="checkbox" value="'
					+ selectedNodeValue + '" name="' + selectedNodeText + '">'
					+ selectedNodeText + '</INPUT>&nbsp;&nbsp;';
		}
	}

	if (isSelect == true) {
		openBg(1);
		openSelect(1);
		divObj.innerHTML = htmls;
		if (isShow) {
			var items = $_('selectSub').getElementsByTagName('input');
			for ( var i = 0; i < items.length; i++) {
				for ( var j = 0; j < hasselectedArr.length; j++) {
					if (items[i].value == hasselectedArr[j]) { // 若当前节点与数组中节点一致，则被选中
						items[i].checked = true;
					}
				}
			}
		}
	} else {
		showMessage("MSG1200");//请在已选的节点中选择一个节点！
	}
}

function makeSure() {
	var nextnodesId = '';
	openBg(0);
	openSelect(0);
	var nextnodesName = '';
	var items = $_('selectSub').getElementsByTagName('input');

	for ( var i = 0; i < items.length; i++) {
		if (items[i].checked == true) {
			nextnodesName += items[i].name + ',';
			nextnodesId += items[i].value + '#';
		}
	}
	nextnodesName = nextnodesName.substring(0, nextnodesName.length - 1);

	var theNodeT = selectedNode.options[selectedIndex].text;
	if (theNodeT.indexOf('=>') != -1) {
		theNodeT = theNodeT.substring(0, theNodeT.indexOf('='));
	}
	if (nextnodesName == '') {
		selectedNode.options[selectedIndex].text = theNodeT;
	} else {
		selectedNode.options[selectedIndex].text = theNodeT + '=>('
				+ nextnodesName + ')';
	}

	nextnodesId = nextnodesId.substring(0, nextnodesId.length - 1);
	var theNodeV = selectedNode.options[selectedIndex].value;
	if (theNodeV.indexOf('=>') != -1) {
		theNodeV = theNodeV.substring(0, theNodeV.indexOf('='));
	}
	if (nextnodesId == '') {
		selectedNode.options[selectedIndex].value = theNodeV;
	} else {
		selectedNode.options[selectedIndex].value = theNodeV + '=>('
				+ nextnodesId + ')';
	}
}

function openBg(state) {
	if (state == 1) {
		$_("bg").style.display = "block";
		var h = document.body.offsetHeight > document.documentElement.offsetHeight ? document.body.offsetHeight
				: document.documentElement.offsetHeight;
		$_("bg").style.height = h + "px";
	} else {
		$_("bg").style.display = "none";
	}
}
function openSelect(state) {
	if (state == 1) {
		$_("selectItem").style.display = "block";
		$_("selectItem").style.left = ($_("bg").offsetWidth - $_("selectItem").offsetWidth)
				/ 2 + "px";
		$_("selectItem").style.top = document.body.scrollTop + 100 + "px";
	} else {
		$_("selectItem").style.display = "none";
	}
}

function saveOrgProductNode() {
	var form0 = document.forms[0];
	var rightList = form0.rightSelectBox;
	var ids = "";
	var nodeValue = "";
	var nodeArr = new Array(); // 键值对数组，用于存入节点以及其下一节点
	for (i = 0; i < rightList.length; i++) {
		ids += rightList[i].value;
		var tempnames = rightList[i].text;

		nodeValue = rightList[i].value;

		if (tempnames.indexOf("=>") != -1) {

			// 将节点以及其下一节点存入键值对数组
			nodeArr[nodeValue.substring(0, nodeValue.indexOf("=>"))] = nodeValue
					.substring(nodeValue.indexOf("(") + 1, nodeValue
							.lastIndexOf(")"));

			tempnames = tempnames.substring(tempnames.indexOf("(", tempnames
					.indexOf("=>")) + 1, tempnames.lastIndexOf(")"));
			tempnames = tempnames.replace(/,/g, '#');
			ids += "*(" + tempnames + ")*" + i + ",";
		} else {
			ids += "*" + i + ",";

			// 将节点以及其下一节点存入键值对数组，下一节点为空
			nodeArr[nodeValue] = "";
		}

		rightList[i].selected = true;
	}
	if (ids != "" && ids.length > 0) {
		ids = ids.substring(0, ids.length - 1);
	}

	var isLegal = true;// 默认合法
	for ( var key in nodeArr) {
		var rtValue = checkValid("", key, nodeArr);
		if (!rtValue) { // 校验设置的下一节点是否合法
			isLegal = isLegal && false;
		} else if (rtValue == "error") {
			showMessage("MSG1201");//节点出现缺失，请重新配置项目节点！
			return;
		}
	}
	if (isLegal) {
		var PRODUCTCODE = document.getElementById("PRODUCTCODE").value;
		var url = rootPath
				+ "/credit/crdbase/product/CrdProductInfoBiz/SaveOrgProductNode?PRODUCTCODE="+ PRODUCTCODE 
				+ "&ids=" + ids 
				+ "&ORGID=" + selectedOrg
				+ "&TRANSACTAREA=" + selectedArea ;
		comAjax(fmpEncodeURI(url), backCallSaveOrgProductNode);
	} else {
		showMessage("MSG1202");//下一节点的设置不合法，出现交叉，请确认后提交！
	}

}

// 递归函数，用于校验配置的下一节点是否合法
function checkValid(passNodes, currNode, nodeArr) {
	var rtBool = true; // 初始是合法
	var nextNodes = nodeArr[currNode]; // 获取下一节点
	if (typeof (nextNodes) == "undefined") { // 若下一节点缺失，防止用户修改已配置好的节点配置，误将下一节点删除
		return "error";
	}
	var nextNodeArr = nextNodes.split("#"); // 拆开下一节点
	for ( var i = 0; i < nextNodeArr.length; i++) { // 遍历下一节点
		if (nextNodeArr[i] != "") { // 判断下一节点是否为空（是否结束）
			if (passNodes.indexOf(nextNodeArr[i]) > -1) { // 判断下一节点是否在上面走过的节点
				return false; // 如果在，就是出现回路，返回不合法
			} else { // 如果不在，继续向下检查
				rtBool = rtBool
						&& checkValid(passNodes + "," + currNode,
								nextNodeArr[i], nodeArr);
			}
		}
	}
	return rtBool;

}

function backCallSaveOrgProductNode(backMsg) {
	if (backMsg == "success") {
		showMessage("MSG0005");//保存成功！
	} else {
		showMessage("MSG0006");//保存失败！
	}
}

function moveOption(e1, e2) {
	for ( var i = 0; i < e1.options.length; i++) {
		if (e1.options[i].selected) {
			if (e1.options[i].text.indexOf('=') != -1) {
				e1.options[i].text = e1.options[i].text.substring(0,
						e1.options[i].text.indexOf('='));
			}
			if (e1.options[i].value.indexOf('=') != -1) {
				e1.options[i].value = e1.options[i].value.substring(0,
						e1.options[i].value.indexOf('='));
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

		if (e1.options[i].text.indexOf('=') != -1) {
			e1.options[i].text = e1.options[i].text.substring(0,
					e1.options[i].text.indexOf('='));
		}
		if (e1.options[i].value.indexOf('=') != -1) {
			e1.options[i].value = e1.options[i].value.substring(0,
					e1.options[i].value.indexOf('='));
		}
		var e = e1.options[i];
		e2.options.add(new Option(e.text, e.value));
		e1.remove(i);
		i = i - 1;

	}
}
function moveUpOption(selRight) {
	for ( var i = 0; i < selRight.length; i++) {
		var opt = selRight.options[i];
		if (opt.selected) {
			if (i == 0) {
				alert("已经是第一个");
			} else {
				var nextText = selRight.options[i - 1].text;
				var nextValue = selRight.options[i - 1].value;
				selRight.options[i - 1].text = opt.text;
				selRight.options[i - 1].value = opt.value;
				opt.text = nextText;
				opt.value = nextValue;
				selRight.options[i - 1].selected = true;
				selRight.options[i].selected = false;
			}
			break;
		}
	}

}
function moveDownOption(selRight) {
	for ( var i = 0; i < selRight.length; i++) {
		var opt = selRight.options[i];
		if (opt.selected) {
			if (i == selRight.length - 1) {
				alert("已经是最后一个");
			} else {
				var nextText = selRight.options[i + 1].text;
				var nextValue = selRight.options[i + 1].value;
				selRight.options[i + 1].text = opt.text;
				selRight.options[i + 1].value = opt.value;
				opt.text = nextText;
				opt.value = nextValue;
				selRight.options[i + 1].selected = true;
				selRight.options[i].selected = false;
			}
			break;
		}
	}

}

function setNodeCond() {
	if (selectedRid != null) {
		var selectedNodeValue = getDataListTrueValue(selectedRid,"NODETYPECODE");
		var productCode = document.getElementById('PRODUCTCODE').value;
		var url = rootPath
				+ "/fmp/FrameCommonBiz/DoList?tableModelId=CrdORGCaseNodeCond&moduleId=crd_md_jdbltjsz&freezeValue=NODETYPECODE:"
				+ selectedNodeValue
				+ ",PRODUCTCODE:"
				+ productCode
				+ "&freezeCondition= and (cnc.ORGID='${CURR_ORGID}' or cnc.ORGID='[ALL]') and cnc.NODETYPECODE ='"
				+ selectedNodeValue + "' and (cnc.PRODUCTCODE='" + productCode
				+ "' or cnc.PRODUCTCODE ='[ALL]')";
		openWindow(url);
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}

}

function setNodeMust() {

	if (selectedRid != null) {
		var selectedNodeValue = getDataListTrueValue(selectedRid,"NODETYPECODE");
		var productCode = document.getElementById('PRODUCTCODE').value;
		var url = rootPath
				+ "/credit/caseManage/nodeMust/CaseCodeNodeSetBiz/nodeMustSet?NODETYPECODE="
				+ selectedNodeValue + "&PRODUCTCODE=" + productCode;
		openModalDialog(url, window, 'dialogWidth:550px;dialogHeight:350px');
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}

}