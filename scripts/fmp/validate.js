function isExistElement(obj) {
	var g = svgDocument.getElementsByTagName("g");
	for (var i = 0; i < g.length; i++) {
		if (getElementInst(g.item(i).id) == obj) return true;
	}
	return false;
}

function canDrawArrow(fromObj, toObj) {
	if (getElementInst(toObj.id) == gBegin) {
		alert("不能画到<开始>!");
		return false;
	}
	if (getElementInst(fromObj.id) == gEnd) {
		alert("不能从<结束>开始!");
		return false;
	}
	if (getElementInst(fromObj.id) == gBegin && getElementInst(toObj.id) == gEnd) {
		alert("不能从<开始>到<结束>!");
		return false;
	}
	for (var i = 0; i <= arrowObject.id.length; i++) {
		if (arrowObject.fromId[i] == fromObj.id && arrowObject.toId[i] == toObj.id) {		
			alert("连线已经存在!");
			return false;
		}
		if (arrowObject.fromId[i] == fromObj.id && getElementInst(fromObj.id) == gBegin) {
			alert("<开始>只能有一条连线!");
			return false;
		}
	}
	return true;
}

function validateDiagram() {
	var str = "";
	if (!isExistElement(gBegin)) {
		str = "没有<开始>\r";
	}
	if (!isExistElement(gEnd)) {
		str += "没有<结束>\r";
	}
	if (!isExistElement(gActivity)) {
		str += "没有<活动>\r";
	}
	
	var g = svgDocument.getElementsByTagName("g");
	for (var i = 0; i < g.length; i++) {
		if (getElementInst(g.item(i).id) == gBegin) {
			if (arrowObject.fromId.indexOf(g.item(i).id) < 0) {
				str += "<开始>没有连线\r";
			}
		}
		if (getElementInst(g.item(i).id) == gEnd) {
			if (arrowObject.toId.indexOf(g.item(i).id) < 0) {
				str += "<结束>没有连线\r";
			}
		}
		if (getElementInst(g.item(i).id) == gActivity) {
			if (arrowObject.fromId.indexOf(g.item(i).id) < 0) {
				var actName = gActivity.getText(g.item(i).id).firstChild.data;
				str += '活动ID:<' + g.item(i).id + '> 活动名称:<' + actName + ">没有出线\r";
			}
			if (arrowObject.toId.indexOf(g.item(i).id) < 0) {
				var actName = gActivity.getText(g.item(i).id).firstChild.data;
				str += '活动ID:<' + g.item(i).id + '> 活动名称:<' + actName + ">没有进线\r";
			}
		}
	}	
	
	if (str != "") {
		alert(str);
		return false;
	}
	return true;
}
