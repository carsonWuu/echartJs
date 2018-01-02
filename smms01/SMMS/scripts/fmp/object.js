var gActObj = {
	actId: '',
	actName: '',
	actType: '',
	forkType: '',
	joinType: '',
	exeId: '',
	exeName: '',
	exeType: '',
	actUrl: ''
}

var gTranObj = {
	tranId: '',
	tranName: '',
	fromActId: '',
	toActId: '',
	fromActName: '',
	toActName: ''
}

function getActObj(actId) {
	gActObj.actId = actId;
	gActObj.actName = gActivity.getText(actId).firstChild.data;
	gActObj.actType = $svg(actId).getAttribute("actType");
	gActObj.forkType = $svg(actId).getAttribute("forkType");
	gActObj.joinType = $svg(actId).getAttribute("joinType");
	
	gActObj.exeId = $svg(actId).getAttribute("exeId");
	gActObj.exeName = $svg(actId).getAttribute("exeName");
	gActObj.exeType = $svg(actId).getAttribute("exeType");
	gActObj.actUrl = $svg(actId).getAttribute("actUrl");
	return gActObj;
}

function getTranObj(tranId) {
	gTranObj.tranId = tranId;
	gTranObj.tranName = gArrow.getText(tranId).firstChild.data;
	gTranObj.fromActId = $svg(tranId).getAttribute("fromActId");
	gTranObj.toActId = $svg(tranId).getAttribute("toActId");
	gTranObj.fromActName = gActivity.getText(gTranObj.fromActId).firstChild.data;
	gTranObj.toActName = gActivity.getText(gTranObj.toActId).firstChild.data;
	return gTranObj;
}

function setTranObjToDiagram(tranObj) {
	var text = gArrow.getText(tranObj.tranId);
	text.replaceChild(svgDocument.createTextNode(tranObj.tranName), text.firstChild);
}

function setActObjToDiagram(actObj) {
	var text = gActivity.getText(actObj.actId);	
	text.replaceChild(svgDocument.createTextNode(actObj.actName), text.firstChild);
	$svg(actObj.actId).setAttribute("actType", actObj.actType);
	$svg(actObj.actId).setAttribute("forkType", actObj.forkType);
	$svg(actObj.actId).setAttribute("joinType", actObj.joinType);
	
	$svg(actObj.actId).setAttribute("exeId", actObj.exeId);
	$svg(actObj.actId).setAttribute("exeName", actObj.exeName);
	$svg(actObj.actId).setAttribute("exeType", actObj.exeType);
	$svg(actObj.actId).setAttribute("actUrl", actObj.actUrl);
		
	if (actObj.forkType == "0") {
		// OR
		if ($svg(actObj.actId + "_fork") != null) $svg(actObj.actId + "_fork").parentNode.removeChild($svg(actObj.actId + "_fork"));
	}
	else if (actObj.forkType == "1") {
		// AND
		if ($svg(actObj.actId + "_fork") == null) {
			var r = svgDocument.createElementNS('http://www.w3.org/2000/svg', "rect");
			r.setAttribute("id", actObj.actId + "_fork");
			r.setAttribute("x", 95);
			r.setAttribute("y", 0);
			r.setAttribute("width", 4);
			r.setAttribute("height", 40);
			r.setAttribute("fill", "blue");
			$svg(actObj.actId).appendChild(r);
		}
	}
	
	if (actObj.joinType == "0") {
		// SPLIT
		if ($svg(actObj.actId + "_join") != null) $svg(actObj.actId + "_join").parentNode.removeChild($svg(actObj.actId + "_join"));
	}
	else if (actObj.joinType == "1") {
		// JOIN
		if ($svg(actObj.actId + "_join") == null) {
			var r = svgDocument.createElementNS('http://www.w3.org/2000/svg', "rect");
			r.setAttribute("id", actObj.actId + "_join");
			r.setAttribute("x", 1);
			r.setAttribute("y", 0);
			r.setAttribute("width", 4);
			r.setAttribute("height", 40);
			r.setAttribute("fill", "blue");
			$svg(actObj.actId).appendChild(r);
		}
	}	
	
	if (actObj.actType == "1") {
		// 一般类型
		if ($svg(actObj.actId + "_type") != null) $svg(actObj.actId + "_type").parentNode.removeChild($svg(actObj.actId + "_type"));
	}
	else if (actObj.actType == "2") {
		// 动态类型
		if ($svg(actObj.actId + "_type") == null) {
			var t = svgDocument.createElementNS('http://www.w3.org/2000/svg', "text");
			t.setAttribute("id", actObj.actId + "_type");
			t.setAttribute("x", 85);
			t.setAttribute("y", 13);
			t.appendChild(svgDocument.createTextNode("*"));
			$svg(actObj.actId).appendChild(t);
		}
	}
}
