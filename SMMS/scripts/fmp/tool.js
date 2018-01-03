var gBegin = new Begin();
var gEnd = new End();
var gArrow = new Arrow();
var gDynaArrow = new DynaArrow();
var gArrowNode = new ArrowNode();
var gActivity = new Activity();

function DrawingTool() {
	this.tool;
	
	this.setTool = function(tool) {
		this.tool = tool;
	}
	
	this.draw = function(x1, y1, x2, y2) {
		return this.tool.draw(x1, y1, x2, y2);
	}
	
	this.move = function(id, x, y) {
		this.tool.move(id, x, y);	
	}
	
	this.remove = function(id) {
		this.tool.remove(id);
	}
	
	this.getCenterPoint = function(id) {
		return this.tool == null ? null : this.tool.getCenterPoint(id);
	}	
	
	this.getArrowPoint = function(id, x1, y1) {
		return this.tool == null ? null : this.tool.getArrowPoint(id, x1, y1);
	}
	
	this.highLight = function(id) {
		if (this.tool != null) this.tool.highLight(id);
	}
	
	this.cancelLighLight = function(id) {
		if (this.tool != null) this.tool.cancelLighLight(id);
	}
}

function Begin() {
	this.draw = function(x, y) {
		var g  = svgDocument.createElementNS('http://www.w3.org/2000/svg', "g");
		g.setAttribute("id", "Begin_" + getSeqId());
		g.setAttribute("transform", "translate(" + x + "," + y + ")");			
		// circle
		var c = svgDocument.createElementNS('http://www.w3.org/2000/svg', "circle");
		c.setAttribute("cx", 0);
		c.setAttribute("cy", 0);
		c.setAttribute("r", 20);
		c.setAttribute("style", "fill: white");		
		c.setAttribute("stroke", "black");
		c.setAttribute("stroke-width", "1");		
		// text
		var t = svgDocument.createElementNS('http://www.w3.org/2000/svg', "text");
		t.setAttribute("x", 0);
		t.setAttribute("y", 4);
		t.setAttribute("text-anchor", "middle");
		t.appendChild(svgDocument.createTextNode("开始"));
		
		g.appendChild(c);
		g.appendChild(t);
		$svg('canvas').appendChild(g);
		return g.id;	
	}
	
	this.move = function(id, x, y) {
		gActivity.move(id, x, y);
	}
	
	this.remove = function(beginId) {
		gActivity.remove(beginId);
	}
	
	this.getCenterPoint = function(beginId) {
		var p = {};
		var transMatrix = $svg(beginId).getCTM();
		p.x = Number(transMatrix.e);
		p.y = Number(transMatrix.f);
		return p;
	}
	
	this.getArrowPoint = function(id, x1, y1) {
		var p = {};
		var centerPoint = this.getCenterPoint(id);
		var x2 = centerPoint.x;
		var y2 = centerPoint.y;		
		var x3 = 0;
		var y3 = 0;
		var c = this.getCircle(id);
		var r =  Number(c.getAttribute("r"));
		var para = r / Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
		x3 = x2 - para * (x2 - x1);
		// 如果x2-x1等于0 自行处理
		if (x2 - x1 == 0) y3 = y1 < y2 ? y2 - r : y2 + r;
		else y3 = (x3 - x1) * (y2 - y1) / (x2 - x1) + y1;		
		p.x = x3;
		p.y = y3;
		return p;
	}
	
	this.highLight = function(id) {
		this.getCircle(id).setAttribute("style", "fill: orange");
	}
	
	this.cancelLighLight = function(id) {
		this.getCircle(id).setAttribute("style", "fill: white");
	}
	
	this.getCircle = function(beginId) {
		return $svg(beginId).firstChild;
	}
}

function End() {
	this.draw = function(x, y) {
		var g  = svgDocument.createElementNS('http://www.w3.org/2000/svg', "g");
		g.setAttribute("id", "End_" + getSeqId());
		g.setAttribute("transform", "translate(" + x + "," + y + ")");		
		// circle
		var c = svgDocument.createElementNS('http://www.w3.org/2000/svg', "circle");
		c.setAttribute("cx", 0);
		c.setAttribute("cy", 0);
		c.setAttribute("r", 20);
		c.setAttribute("style", "fill: #EDC4FF");		
		c.setAttribute("stroke", "black");
		c.setAttribute("stroke-width", "1");		
		// text
		var t = svgDocument.createElementNS('http://www.w3.org/2000/svg', "text");
		t.setAttribute("x", 0);
		t.setAttribute("y", 4);
		t.setAttribute("text-anchor", "middle");
		t.appendChild(svgDocument.createTextNode("结束"));
		
		g.appendChild(c);
		g.appendChild(t);
		$svg('canvas').appendChild(g);
		return g.id;
	}
	
	this.move = function(id, x, y) {
		gActivity.move(id, x, y);
	}
	
	this.remove = function(endId) {
		gActivity.remove(endId);
	}
	
	this.getCenterPoint = function(endId) {
		return gBegin.getCenterPoint(endId);
	}
	
	this.getArrowPoint = function(id, x1, y1) {
		return gBegin.getArrowPoint(id, x1, y1);
	}
	
	this.highLight = function(id) {
		this.getCircle(id).setAttribute("style", "fill: orange");
	}
	
	this.cancelLighLight = function(id) {
		this.getCircle(id).setAttribute("style", "fill: #EDC4FF");
	}
	
	this.getCircle = function(endId) {
		return $svg(endId).firstChild;
	}
}

function Activity() {
	this.draw = function(x, y) {
		var g  = svgDocument.createElementNS('http://www.w3.org/2000/svg', "g");
		g.setAttribute("id", "Activity_" + getSeqId());
		g.setAttribute("transform", "translate(" + x + "," + y + ")");
		g.setAttribute("actType", "1");
		g.setAttribute("forkType", "0");
		g.setAttribute("joinType", "0");
		g.setAttribute("exeId", "");
		g.setAttribute("exeName", "");
		g.setAttribute("exeType", "0");
		g.setAttribute("actUrl", "");
		// rect
		var r = svgDocument.createElementNS('http://www.w3.org/2000/svg', "rect");
		r.setAttribute("x", 0);
		r.setAttribute("y", 0);
		r.setAttribute("width", 100);
		r.setAttribute("height", 40);
		r.setAttribute("style", "fill:#eeeeee");
		r.setAttribute("stroke","black");
		r.setAttribute("stroke-width","1");		
		// text
		var t = svgDocument.createElementNS('http://www.w3.org/2000/svg', "text");
		t.setAttribute("x", 50);
		t.setAttribute("y", 25);
		t.setAttribute("text-anchor", "middle");
		t.appendChild(svgDocument.createTextNode("活动"));
		
		g.appendChild(r);
		g.appendChild(t);		
		$svg('canvas').appendChild(g);
		return g.id;
	}
	
	this.move = function(id, x, y) {
		var len = arrowObject.id.length;
		for (var i = 0; i < len; i++) {
			if (arrowObject.fromId[i] == id) {
				// 移动箭头开始位置
				var pl = gArrow.getPolyline(arrowObject.id[i]);					
				pl.setAttribute("points", updatePointsFirst(pl.getAttribute("points"), x, y));
				// 业务规则： 如果线段有二节及以上，不需要更新
				if (countPointsLen(pl.getAttribute("points")) == 2) {
					var p = getElementArrowPoint(arrowObject.toId[i], x, y);
					pl.setAttribute("points", updatePointsLast(pl.getAttribute("points"), p.x, p.y));
				}					
				gArrow.adjustArrowText(arrowObject.id[i]);
			}
			if (arrowObject.toId[i] == id) {
				// 移动箭头结束位置
				var pl = gArrow.getPolyline(arrowObject.id[i]);	
				var p = getPointLastSecond(pl.getAttribute("points"));
				var aP = getElementArrowPoint(arrowObject.toId[i], p.x, p.y);
				pl.setAttribute("points", updatePointsLast(pl.getAttribute("points"), aP.x, aP.y));					
				gArrow.adjustArrowText(arrowObject.id[i]);
			}
		}
	}
	
	this.remove = function(actId) {
		var activity = $svg(actId);
		$svg('canvas').removeChild(activity);
	
		var a = getArrowObject();
		for (var i = 0; i < a.id.length; i++) {
			if (a.fromId[i] == actId) $svg('canvas').removeChild($svg(a.id[i]));
			if (a.toId[i] == actId) $svg('canvas').removeChild($svg(a.id[i]));
		}
		arrowObject = getArrowObject();
	}
	
	this.getCenterPoint = function(actId) {
		var p = {};
		var transMatrix = $svg(actId).getCTM();
		var rect = this.getRect(actId);		
		p.x = Number(transMatrix.e) + Number(rect.getAttribute("width")) / 2;
		p.y = Number(transMatrix.f) + Number(rect.getAttribute("height")) / 2;
		return p;
	}
	
	this.getArrowPoint = function(id, x1, y1) {
		var p = {};
		var centerPoint = this.getCenterPoint(id);
		var x2 = centerPoint.x;
		var y2 = centerPoint.y;		
		var x3 = 0;
		var y3 = 0;
			
		var transMatrix = $svg(id).getCTM();	
		var rect = gActivity.getRect(id);
		var w = Number(rect.getAttribute("width"));
		var h = Number(rect.getAttribute("height"));
			
		// 开始点在左边
		if (x1 <= x2) {
			x3 = Number(transMatrix.e);
			y3 = (x3 - x1) * (y2- y1) / (x2 - x1) + y1;
			// 上面超出
			if (y3 < Number(transMatrix.f)) {
				y3 = Number(transMatrix.f);
				x3 = (y3 - y1) * (x2 - x1) / (y2 - y1) + x1;
			}
			else if (y3 > Number(transMatrix.f) + h) {
				y3 = Number(transMatrix.f) + h;
				x3 = (y3 - y1) * (x2 - x1) / (y2- y1) + x1;
			}
		}
		else {
			x3 = Number(transMatrix.e + w);
			y3 = (x3 - x1) * (y2 - y1) / (x2 - x1) + y1;
			// 上面超出
			if (y3 < Number(transMatrix.f)) {
				y3 = Number(transMatrix.f);
				x3 = (y3 - y1) * (x2 - x1) / (y2 - y1) + x1;
			}
			else if (y3 > Number(transMatrix.f) + h) {
				y3 = Number(transMatrix.f) + h;
				x3 = (y3 - y1) * (x2 - x1) / (y2 - y1) + x1;
			}
		}		
		p.x = x3;
		p.y = y3;		
		return p;
	}
	
	this.highLight = function(id) {
		this.getRect(id).setAttribute("style", "fill:orange");
	}
	
	this.cancelLighLight = function(id) {
		this.getRect(id).setAttribute("style", "fill:#eeeeee");
	}
		
	this.getRect = function(actId) {
		return $svg(actId).firstChild;
	}
	
	this.getText = function(actId) {
		return $svg(actId).childNodes.item(1);
	}
}

function Arrow(fromId, toId) {
	this.fromId = fromId;
	this.toId = toId;
	
	this.draw = function(x1, y1, x2, y2) {
		var g  = svgDocument.createElementNS('http://www.w3.org/2000/svg', "g");
		g.setAttribute("id", "Arrow_" + getSeqId());
		g.setAttribute("fromActId", this.fromId);
		g.setAttribute("toActId", this.toId);	
		// add arrow text
		var m = svgDocument.createElementNS('http://www.w3.org/2000/svg', "marker");
		m.setAttribute("id", "arrowText_" + getSeqId());
		m.setAttribute("viewBox", "0 0 360 80");
		m.setAttribute("orient", "auto");
		m.setAttribute("markerWidth", "360");
		m.setAttribute("markerHeight", "160");
		
		var t = svgDocument.createElementNS('http://www.w3.org/2000/svg', "text");
		t.setAttribute("x", "0");
		t.setAttribute("y", "0");
		t.setAttribute("fill", "white");
		t.setAttribute("font-size", "13");
		t.setAttribute("text-anchor", "middle");
		var text = "转移";
		text = (getElementInst(this.fromId) == gBegin) ? "开始流程" : text;
		text = (getElementInst(this.toId) == gEnd) ? "结束流程" : text;
		t.appendChild(svgDocument.createTextNode(text));
						
		var pl = svgDocument.createElementNS('http://www.w3.org/2000/svg', "polyline");
		pl.setAttribute("points", x1 + "," + y1 + " " + x2 + "," + y2);		
		pl.setAttribute("arrowNodeIds", "null null");// 所对应的箭头节点
		pl.setAttribute("fill", "none");
		pl.setAttribute("stroke", "black");
		pl.setAttribute("marker-end", "url(#endArrow)");
		pl.setAttribute("marker-start", "url(#" + m.id + ")");
		
		m.appendChild(t);
		
		g.appendChild(pl);
		g.appendChild(m);
		$svg('canvas').appendChild(g);
		return g.id;
	}
	
	this.move = function(id, x, y) {
	}
	
	this.remove = function(arrowId) {
		$svg('canvas').removeChild($svg(arrowId));
		arrowObject = getArrowObject();
	}
	
	this.getCenterPoint = function(arrowId) {
		return null;
	}
		
	this.getArrowPoint = function(id, x1, y1) {
		return null;
	}
	
	this.highLight = function(id) {
		this.getPolyline(id).setAttribute("stroke", "orange");				
		var c = this.getAllCircle(id);
		for (var i = 0; i < c.length; i++) c[i].setAttribute("fill-opacity", "1");
	}
	
	this.cancelLighLight = function(id) {
		this.getPolyline(id).setAttribute("stroke", "black");				
		var c = this.getAllCircle(id);
		for (var i = 0; i < c.length; i++) c[i].setAttribute("fill-opacity", "0");
	}
	
	this.getAllCircle = function(arrowId) {
		var circle = []
		var node = $svg(arrowId).childNodes;
		for (var i = 0; i < node.length; i++) if (node.item(i).tagName == "g") circle.push(node.item(i).firstChild);
		return circle;
	}
	
	this.getPolyline = function(arrowId) {
		return $svg(arrowId).firstChild;
	}
	
	this.getText = function(arrowId) {
		return $svg(arrowId).childNodes.item(1).firstChild;;
	}
	
	this.adjustEndArrow = function(arrowId) {
		var pl = this.getPolyline(arrowId);
		var toId = arrowObject.toId[arrowObject.id.indexOf(arrowId)];		
		// 移动箭头结束位置
		var lastSecP = getPointLastSecond(pl.getAttribute("points"));
		var p = getElementArrowPoint(toId, lastSecP.x, lastSecP.y);
		pl.setAttribute("points", updatePointsLast(pl.getAttribute("points"), p.x, p.y));
	}

	this.adjustArrowText = function(arrowId) {
		var i = arrowObject.id.indexOf(arrowId);
		var p = this.getPolyline(arrowId).getAttribute("points").split(" ");
		var x1 = p[0].split(",")[0];
		var y1 = p[0].split(",")[1];
		var x2 = (p.length > 2) ? p[1].split(",")[0] : getElementCenterPoint(arrowObject.toId[i]).x;
		var y2 = (p.length > 2) ? p[1].split(",")[1] : getElementCenterPoint(arrowObject.toId[i]).y;		
		var r = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1))
		var transform = (Number(x1) <= Number(x2)) ? "rotate(0) translate(" + r / 2 + ", 0)" : "rotate(180),translate(-" + r / 2 + ", 0)";
		this.getText(arrowObject.id[i]).setAttribute("transform", transform);
	}
}

function ArrowNode(arrowId) {
	this.arrowId = arrowId;
	
	this.draw = function(x, y) {			
		var g  = svgDocument.createElementNS('http://www.w3.org/2000/svg', "g");
		g.setAttribute("id", "ArrowNode_" + getSeqId());				
		g.setAttribute("transform", "translate(" + x + "," + y + ")");	
		// circle
		var c = svgDocument.createElementNS('http://www.w3.org/2000/svg', "circle");
		c.setAttribute("cx", 0);
		c.setAttribute("cy", 0);
		c.setAttribute("r", 4);
		c.setAttribute("style", "fill: orange");
		
		g.appendChild(c);
		$svg(this.arrowId).appendChild(g);
		return g.id;
	}
	
	this.move = function(id, x, y) {
		var arrowId = $svg(id).parentNode.id;			
		var pl = gArrow.getPolyline(arrowId);			
		var n = pl.getAttribute("arrowNodeIds").split(" ").indexOf(id);	 
		pl.setAttribute("points", updatePointsN(pl.getAttribute("points"), x, y, n));			
		gArrow.adjustEndArrow(arrowId);
		gArrow.adjustArrowText(arrowId);
	}
	
	this.remove = function(arrowNodeId) {
		var arrowNode = $svg(arrowNodeId);
		var arrow = arrowNode.parentNode;
		var pl = gArrow.getPolyline(arrow.id);
		var n = arrowNodeInLine(pl.getAttribute("points"), arrowNode.getCTM().e, arrowNode.getCTM().f);
		arrow.removeChild(arrowNode);
		pl.setAttribute("points", deletePoints(pl.getAttribute("points"), n));
		pl.setAttribute("arrowNodeIds", deleteArrowNodeIds(pl.getAttribute("arrowNodeIds"), n));
				
		gArrow.adjustEndArrow(arrow.id);
		gArrow.adjustArrowText(arrow.id);
	}
	
	this.getCenterPoint = function(endId) {
		return gBegin.getCenterPoint(endId);
	}
	
	this.getArrowPoint = function(id, x1, y1) {
		return null;
	}
	
	this.highLight = function(arrowNodeId) {
		gArrow.highLight($svg(arrowNodeId).parentNode.id);
	}
	
	this.cancelLighLight = function(arrowNodeId) {
		gArrow.cancelLighLight($svg(arrowNodeId).parentNode.id);
	}
	
	this.add = function(arrowId, x, y) {
		var pl = gArrow.getPolyline(arrowId);
		var n = pointInLine(pl.getAttribute("points"), x, y);
		pl.setAttribute("points", addPoints(pl.getAttribute("points"), x, y, n));	
		drawingTool.setTool(new ArrowNode(arrowId));
		var arrowNodeId = drawingTool.draw(x, y);
		pl.setAttribute("arrowNodeIds", addArrowNodeIds(pl.getAttribute("arrowNodeIds"), arrowNodeId, n));
		drawingTool.setTool(null);
	}
}

function DynaArrow() {
	this.oldDynaArrow = null;
		
	this.draw = function(x1, y1, x2, y2) {
		this.remove();		
		var dA = $svg("dynaArrow");
		dA.setAttribute("x1", x1);
		dA.setAttribute("y1", y1);
		dA.setAttribute("x2", x2);
		dA.setAttribute("y2", y2);
		dA.setAttribute("stroke", "black");
		dA.setAttribute("stroke-dasharray", "5");
		dA.setAttribute("marker-end", "url(#endArrow)");
		gDynaArrow.oldDynaArrow = dA;
	}
	
	this.remove = function() {
		if (gDynaArrow.oldDynaArrow != null) {
			gDynaArrow.oldDynaArrow.setAttribute("fill", "none");
			gDynaArrow.oldDynaArrow.setAttribute("stroke", "none");
			gDynaArrow.oldDynaArrow.setAttribute("marker-end", "none");
			gDynaArrow.oldDynaArrow = null;
		}
	}
}