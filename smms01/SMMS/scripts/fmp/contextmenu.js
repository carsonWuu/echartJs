function createContextMenu(elementInst) {
	//IE 
	var flowDiagram = document.getElementById("flowDiagram").window;
	var	contextMenu = flowDiagram.contextMenu;
	
	var menuId = "defaultMenu";
	
	if (elementInst == gArrow) {
		menuId = "arrowMenu";
	}
	else if (elementInst == gArrowNode) {
		menuId = "arrowNodeMenu";
	}
	else if (elementInst == gActivity) {
		menuId = "activityMenu";
	}
	else if (elementInst == gBegin) {
		menuId = "beginMenu";
	}
	else if (elementInst == gEnd) {
		menuId = "endMenu";
	}
	
	var menu = flowDiagram.parseXML(flowDiagram.printNode(svgRoot.getElementById(menuId)), contextMenu);
	contextMenu.replaceChild(menu, contextMenu.firstChild);
}
