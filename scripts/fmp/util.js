function $svg(id) {	
	return svgDocument.getElementById(id);
}

var sequenceId = 0;
function getSeqId() {
	return sequenceId++;
}

function getTrueCoords(evt) {
	var newScale = svgRoot.currentScale;
	var translation = svgRoot.currentTranslate;
	trueCoords.x = (evt.clientX - translation.x)/newScale;
	trueCoords.y = (evt.clientY - translation.y)/newScale;
}

function getElementInst(id) {
	var preId = id.split("_");
	if (preId.length == 2) {	
		if (preId[0] == "Begin") return gBegin;
		if (preId[0] == "Activity") return gActivity;
		if (preId[0] == "End") return gEnd;
		if (preId[0] == "Arrow") return gArrow;
		if (preId[0] == "ArrowNode") return gArrowNode;
	}	
	return null;
}

function updatePointsN(points, x, y, n) {
	var p = points.split(" ");
	p[n] = x + "," + y;
	return p.join(" ");
}

function updatePointsFirst(points, x, y) {
	var p = points.split(" ");
	p[0] = x + "," + y;
	return p.join(" "); 
}

function updatePointsLast(points, x, y) {
	var p = points.split(" ");
	p[p.length - 1] = x + "," + y;
	return p.join(" "); 
}

// 返回在哪个节点上加上箭头节点
function pointInLine(points, px, py) {
	var p = points.split(" ");
	var distance = [];
	for (var i = 0; i < p.length - 1; i++) {
		x1 = p[i].split(",")[0];
		y1 = p[i].split(",")[1];
		x2 = p[i + 1].split(",")[0];
		y2 = p[i + 1].split(",")[1];
		// 距离比较
		var r1 = Math.sqrt((py - y1) * (py - y1) + (px - x1) * (px - x1));
		var r2 = Math.sqrt((py - y2) * (py - y2) + (px - x2) * (px - x2));
		
		var d = r1 + r2 - Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
		distance.push(d);
	}
	return distance.indexOf(distance.min()) + 1;
}

function arrowNodeInLine(points, x, y) {
	var p = points.split(" ");
	for (var i = 0; i < p.length; i++) {
		if (p[i].split(",")[0] == x && p[i].split(",")[1] == y) return i;
	}
}

function addArrowNodeIds(arrowNodeIds, arrowNodeId, n) {
	var a = arrowNodeIds.split(" ");
	a.splice(n, 0, arrowNodeId);
	return a.join(" ");
}

function deleteArrowNodeIds(arrowNodeIds, n) {
	var a = arrowNodeIds.split(" ");
	a.splice(n, 1);
	return a.join(" ");
}

function addPoints(points, x, y, n) {
	var p = points.split(" ");		
	p.splice(n, 0, x + "," + y);
	return p.join(" ");
}

function deletePoints(points, n) {
	var p = points.split(" ");
	p.splice(n, 1);
	return p.join(" ");
}

function countPointsLen(points) {
	return points.split(" ").length;
}

function getPointLastSecond(points) {
	var p = {};
	var point = points.split(" ");
	var lastSecond = (point[point.length - 2] + "").split(",");
	p.x = Number(lastSecond[0]);
	p.y = Number(lastSecond[1]);
	return p;
}

function getElementArrowPoint(id, x1, y1) {
	tempDrawingTool.setTool(getElementInst(id));
	return tempDrawingTool.getArrowPoint(id, x1, y1);
}

function getElementCenterPoint(id) {
	tempDrawingTool.setTool(getElementInst(id));
	return tempDrawingTool.getCenterPoint(id);
}

function getArrowObject() {
	// 数据储存
	var arrowObject = {id : [],fromId : [],toId : []}
	var g = svgDocument.getElementsByTagName("g");
	for (var i = 0; i < g.length; i++) {
		var arrow = g.item(i);
		if (getElementInst(arrow.id) == gArrow) {
			arrowObject.id.push(arrow.id);
			arrowObject.fromId.push(arrow.getAttribute("fromActId"));
			arrowObject.toId.push(arrow.getAttribute("toActId"));
		}
	}
	return arrowObject;
}

function highLightSelectedObj(id) {
	if (oldSelectedObjId != null) cancelHighLightSelectedObj(oldSelectedObjId);
	tempDrawingTool.setTool(getElementInst(id));
	tempDrawingTool.highLight(id);
	oldSelectedObjId = id;
}

function cancelHighLightSelectedObj(id) {
	if ($svg(id) != null) {
		tempDrawingTool.setTool(getElementInst(id));
		tempDrawingTool.cancelLighLight(id);
		oldSelectedObjId = null;
	}
}

function drawCursor(x, y) {
	if (drawingTool.tool instanceof DynaArrow) {
		removeCursor();
		var a = $svg('cursorArrow');
		a.setAttribute('display', 'block');
		a.setAttribute('transform', 'translate(' + x + ',' + y + ')');
	}
	else if (drawingTool.tool instanceof Activity) {
		removeCursor();
		var a = $svg('cursorRect');
		a.setAttribute('display', 'block');
		a.setAttribute('x', x);
		a.setAttribute('y', y);
	}
	else if (drawingTool.tool instanceof Begin || drawingTool.tool instanceof End) {
		removeCursor();
		var a = $svg('cursorCircle');
		a.setAttribute('display', 'block');
		a.setAttribute('cx', x);
		a.setAttribute('cy', y);
	}
}

function removeCursor() {
	$svg('cursorArrow').setAttribute('display', 'none');
	$svg('cursorRect').setAttribute('display', 'none');
	$svg('cursorCircle').setAttribute('display', 'none');
}