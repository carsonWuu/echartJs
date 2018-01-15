var hiddenMenuTree;	  //隐藏菜单结构
var menuTree;	      //存放该用户的菜单结构
var customTree;       //自定义快捷菜单树结构
var userMenuUrl="";
var lastMenuSpanId="";
/*
 * currentTree点击目录对应的树，生成位置在该点击目录与下一目录中间位置。
 */
var currentTree;
var tempTree;


var PreId="";

function getMenuData(sUrl){	
	userMenuUrl = sUrl;
	var divNode = document.getElementById("TreeTopDiv");
	var ctrlLink = "<span style='color:#fff;font-size:14px;margin-left:1px;'>菜单导航</span>";
	divNode.innerHTML = ctrlLink;//+menuTree.toString();
	//trees[lv2ItemId] = dtree;			
	loadMenuXML("TreeContainDiv",sUrl);
	
};


function loadMenuXML(divID, url) {
	
	var xmlHttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlHttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			
			var xmlTxt = xmlHttp.responseText;
			xmlTxt = HTMLDecode(xmlTxt);
			hiddenMenuTree =new dhtmlXTreeObject("hiddenTreeBox","100%","100%",0); 
			hiddenMenuTree.setSkin('dhx_skyblue');
			hiddenMenuTree.setImagePath("../../images/maintreeimage/csh_scbrblue/");			
			hiddenMenuTree.loadXMLString(xmlTxt);
			hiddenMenuTree.openAllItems(0);
			hiddenMenuTree.enableCheckBoxes(0);
			hiddenMenuTree.enableThreeStateCheckboxes(true);
			
			//hiddenMenuTree.closeAllItems(0);			
			
			/*
			 * 
			 * tempTree 是存放被剪贴整个点击目录的节点树。
			 * 
			 */
			tempTree=new dhtmlXTreeObject("tempTreeBox","100%","100%",0);
			tempTree.setSkin('dhx_skyblue');
			tempTree.setImagePath("../../images/maintreeimage/csh_scbrblue/");	
			//tempTree.loadXMLString(xmlTxt);
			tempTree.enableCheckBoxes(0);
			tempTree.enableThreeStateCheckboxes(true);
		
//			function attachEventListen(obj, e, fun){
//		         obj.attachEvent ? obj.attachEvent("on"+e, fun) : obj.addEventListener(e, fun, false);
//		    } 
//			attachEventListen(currentTree, "Click", function(id){ 
//				
//				var url = currentTree.getUserData(id,"URL");
//				closeAllDivWindow();
//				if (url=="-"){
//					window.open(rootPath+"/fmp/FrameBiz/GetModuleDesc?moduleId="+id,'infoframe','');
//				}else if(url!=""){
//					url = HTMLDecode(url);
//					if (url.indexOf("http://")!=0){
//						main_ShowProgressDiv();
//						url = rootPath+url;
//					}
//					window.open(url,'infoframe','');	
//				}
//			});
			
			
			//menuTree是原来的整个点击节点的树。

			
			doShowMenuBar();
			
			//menuTree.openAllItems(0);	
			
		}
	}
	xmlHttp.open("POST", url, true);
	xmlHttp.send();
	
}

/**
 * 创建自定义快捷菜单树
 * @return
 */


/**
 * 显示一级菜单
 * @return
 */
function doShowMenuBar() {
	var menuBar = document.getElementById("menu_lv2");
	var divNode = document.createElement("DIV");
	//divNode.id = menuId+"_subMenu";	
	menuBar.appendChild(divNode);
	var c = hiddenMenuTree.hasChildren(0);
	//alert("主目录下一共有几个目录："+c);
	for (var i = 0; i<c; i++){
		var menuId = hiddenMenuTree.htmlNode.childNodes[i].id;
		var menuText = hiddenMenuTree.getItemText(menuId);
		//alert("menuText:"+menuText+"\tmenuId:"+menuId);
		createMenuBar(divNode,menuId,menuText);
	}
	//showSubTree(hiddenMenuTree.htmlNode.childNodes[0].id);
};

/**
 * 创建一级菜单
 * @param divNode
 * @param menuId
 * @param menuText
 * @return
 */
function createMenuBar(divNode,menuId,menuText) {
//	var urlLink = "<span style='padding-right:10px;'><img src='../../images/zscrd/kuangjia/arrow.png'></span>";
	var spanNode = document.createElement("div");
	spanNode.id = menuId+"_span";
	spanNode.className = "menu2_off";
	divNode.appendChild(spanNode);
	var textNode = document.createTextNode(menuText);//item.label
	var linkNode = document.createElement("div");
//	linkNode.href="#";
	linkNode.id = "twolevel";//item.id+"_a";
	linkNode.itemid = "2";//item.id;
	linkNode.onclick = Function("showSubTree('"+menuId+"')");//"+level+""+item.id+"
	spanNode.appendChild(linkNode);
//	linkNode.innerHTML=urlLink;
	linkNode.appendChild(textNode);	
	
	
	/*
	 * 增加一个div:treeShow***************************************
	 * */
	var treeShow = document.createElement("div");
	treeShow.id = menuId+"_treeShow";
	treeShow.className = "treeShow";
	treeShow.display="visible";
	divNode.appendChild(treeShow);
	
}

/**
 * 显示子树
 * @param menuId
 * @return
 */
function showSubTree(menuId){
	var menuSpan = document.getElementById(menuId+"_span");
	backSubTree();
	if(menuId!=PreId){
		menuSpan.className = "menu2_on";
	}
	
	/*
	 * 生成对应点击目录下的节点树
	 */
	var currentSpan = document.getElementById(menuId+"_treeShow");
	currentTree=new dhtmlXTreeObject(currentSpan,"100%","100%",0);
	currentTree.setSkin('dhx_skyblue');
	currentTree.setImagePath("../../images/maintreeimage/csh_scbrblue/");	
	currentTree.enableCheckBoxes(0);
	currentTree.enableThreeStateCheckboxes(true);
	currentTree.clearAllParentRecordCount = function(treeObj,parentObj){ 
		if (parentObj && typeof(parentObj) != "undefined"){
			parentObj.recordCount = 0;
			treeObj.clearAllParentRecordCount(treeObj,parentObj.parentObject);
		}
	};
	
	
	/**
	 * 重新处理所有父菜单的记录总数
	 */
	currentTree.resetParentRecordCount = function(treeObj,parentObj,addRecord){ 
		if (typeof(parentObj) != "undefined"){
			var oldText = treeObj.getUserData(parentObj.id,"oldText");
			if (typeof(oldText) != "undefined" && oldText != "" ){
				if (typeof(parentObj.recordCount) == "undefined"){
					parentObj.recordCount = 0;
				}
				parentObj.recordCount += addRecord;
				if (!isNaN(parentObj.recordCount)){
					treeObj.setItemText(parentObj.id,oldText+"<font color='green'>("+parentObj.recordCount+")</font>");
					if(parentObj){
						treeObj.resetParentRecordCount(treeObj,parentObj.parentObject,parentObj.recordCount);
					}
				}
			}
		}
	};
	/**
	 * 重新处理当前父菜单的记录总数
	 */
	currentTree.setRecordCount = function(treeObj,id){  
		var oldText = treeObj.getUserData(id,"oldText");
		if (typeof(oldText) != "undefined" && oldText != ""){
			var url = treeObj.getUserData(id,"URL");	
			if(url!="" && url!="-"){
				XMLHttp.urlSubmit(rootPath+HTMLDecode(url)+"&getRecordCountOnly=true",callbackfunc);
				function callbackfunc(msg){
					
					if (msg != "0" && !isNaN(msg)){
						treeObj.setItemText(id,treeObj.getUserData(id,"oldText")+"<font color='green'>("+msg+")</font>");
						var menuObj = treeObj._globalIdStorageFind(id);
						if(menuObj){
							treeObj.resetParentRecordCount(treeObj,menuObj.parentObject,parseInt(msg));
						}
					}else{
						treeObj.setItemText(id,treeObj.getUserData(id,"oldText"));
						var menuObj = treeObj._globalIdStorageFind(id);
						if(menuObj){
							treeObj.resetParentRecordCount(treeObj,menuObj.parentObject,parseInt(msg));
						}
					}
				}
			}	
		}
	};
	if(menuId!=PreId){
		var menuObj = hiddenMenuTree._globalIdStorageFind(menuId);
		if(menuObj){
			var childCount = menuObj.childNodes.length;
			hiddenMenuTree.openItem(menuId);
			hiddenMenuTree.doCutById(menuId);
			hiddenMenuTree.doPasteOtherTree(tempTree,'0');
			
			if (childCount>0){
				for (var i = 0; i<childCount; i++){
					var id=menuObj.childNodes[0].id;
					PreId=menuId;	
					tempTree.openItem(menuObj.childNodes[0].id);
					tempTree.doCutById(menuObj.childNodes[0].id);
					tempTree.doPasteOtherTree(currentTree,'0');
					refreshRecordCount(currentTree,id);
//					currentTree.closeAllItems(0);
				}
			}
			$("#"+menuId+"_treeShow").css("margin-bottom","10px");
			$("#"+menuId+"_treeShow").css("margin-top","3px");
			//$("#"+menuId+"_treeShow").css("height","585px");
			$("#"+menuId+"_treeShow").css("overflow","auto");
		}
	}else{
		PreId="";
	}
	
	
	function attachEventListen(obj, e, fun){
        obj.attachEvent ? obj.attachEvent("on"+e, fun) : obj.addEventListener(e, fun, false);
   } 
	attachEventListen(currentTree, "Click", function(id){ 
		
		var url = currentTree.getUserData(id,"URL");
		closeAllDivWindow();
		if (url=="-"){
			window.open(rootPath+"/fmp/FrameBiz/GetModuleDesc?moduleId="+id,'infoframe','');
			
		}else if(url!=""){
			url = HTMLDecode(url);
			if (url.indexOf("http://")!=0){
				main_ShowProgressDiv();
				url = rootPath+url;
			}
			window.open(url,'infoframe','');	
		}
	});
	
	
	
	
	
}

/**
 * 根据菜单ID刷新菜单的记录数提示
 */

function refreshRecordCount(treeObj,menuId){ 
	
	var menuObj = treeObj._globalIdStorageFind(menuId);
	if(menuObj){
		//alert("存在");
		var childCount = menuObj.childNodes.length;
		menuObj.recordCount = 0;
		//alert("recordCount:"+childCount);
		if (childCount>0){
			for (var i = 0; i<childCount; i++){
				refreshRecordCount(treeObj,menuObj.childNodes[i].id);
			}			
		}else{
			currentTree.setRecordCount(treeObj,menuId);
			
		}


		//hiddenMenuTree._globalIdStorageFind(menuId);
		//menuTree.showRecordCount(menuTree,id);
	}
	
}
 
/**
 * 备份子树
 * @return
 */
function backSubTree(){	
	$("#"+PreId+"_treeShow").css("margin-bottom","0px");
	$("#"+PreId+"_treeShow").css("margin-top","0px");
	//$("#"+PreId+"_treeShow").css("height","0px");
	if (currentTree!=undefined && PreId!=""){
		
		var childCount=currentTree.htmlNode.childNodes.length;
		for (var i = 0; i<childCount; i++){
		currentTree.doCutById(currentTree.htmlNode.childNodes[0].id);
		currentTree.doPasteOtherTree(tempTree,PreId);
		}
			
		var menuSpan = document.getElementById(PreId+"_span");
		menuSpan.className = "menu2_off";
			
		tempTree.doCutById(tempTree.htmlNode.childNodes[0].id);
		tempTree.doPasteOtherTree(hiddenMenuTree, '0');	
				
	}
}

/**
 * HTML编码
 * @param str
 * @return
 */
function HTMLEncode(str)                                                     
{             
	if (typeof(str) == "undefined") {
		return str;
	}	
	var s = "";                                                    
	if(str.length == 0) return "";                                 
	s    =    str.replace(/&/g,"&amp;");                           
	s    =    s.replace(/</g,"&lt;");                              
	s    =    s.replace(/>/g,"&gt;");                              
	s    =    s.replace(/ /g,"&nbsp;");                            
	s    =    s.replace(/\'/g,"&#39;");                            
	s    =    s.replace(/\"/g,"&quot;");                          
	return   s;                                                   

}      
 
/**
 * HTML解码
 * @param str
 * @return
 */
function HTMLDecode(str)                                            
{           
	if (typeof(str) == "undefined") {
		return str;
	}	
	var s = "";                                                    
	if(str.length == 0)   return "";                               
	s = str.replace(/&amp;/g,"&");                                 
	s = s.replace(/&lt;/g,"<");                                    
	s = s.replace(/&gt;/g,">");                                    
	s = s.replace(/&nbsp;/g," ");                                  
	s = s.replace(/&#39;/g,"\'");                                  
	s = s.replace(/&quot;/g,"\"");                                 
	return   s;                                                    
}                                                                    


//一级菜单事件
function menu1Click(idStr) {
	showMenuBar2(idStr);
};

//二级菜单事件。
function menu2Click(idStr) {
	showTree(null,idStr);
};



function showTree(lv1ItemId,lv2ItemId) {
	if (!lv1ItemId) lv1ItemId = curMenu1;
	//if (lv2ItemId == curMenu2[curMenu1]) return;

	var curSubMenuDiv = document.getElementById(curMenu2[curMenu1]+"_subMenu");
	if (curSubMenuDiv)
		curSubMenuDiv.style.display = "none";
	var curMenuSpan = document.getElementById(curMenu2[curMenu1]+"_span");
	if (curMenuSpan)
		curMenuSpan.className="menu2_off";
	var newMenuSpan = document.getElementById(lv2ItemId+"_span");
	if (newMenuSpan)
		newMenuSpan.className="menu2_on";	

	var subMenuDiv = document.getElementById(lv2ItemId+"_subMenu");
	if (subMenuDiv) {			
		subMenuDiv.style.display = "";
	} else {		
		var menu3div = document.getElementById("Page_left");
		var divNode = document.createElement("DIV");
		divNode.id = lv2ItemId+"_subMenu";
		menu3div.appendChild(divNode);
		/*
		try {
			var dtree = new dTree('trees.'+lv2ItemId);
			dtree.add(lv2ItemId+"_treenode",-1,menuNodes[lv2ItemId].label);
			createSubTree(lv2ItemId, menuNodes[lv2ItemId], dtree);
		} catch (e) {};
		var ctrlLink = "<br/><a href='javascript: "+"trees."+lv2ItemId
				+".openAll();'>全部展开</a> | <a href='javascript: "
				+"trees."+lv2ItemId+".closeAll();'>全部收起</a><br/><br/>"
		divNode.innerHTML = ctrlLink+dtree.toString();
		trees[lv2ItemId] = dtree;*/
	}
	curMenu2[lv1ItemId] = lv2ItemId;
};



//v.1.6 build 71114

/*
 * Copyright DHTMLX LTD. http://www.dhtmlx.com You allowed to use this component
 * or parts of it under GPL terms To use it on other terms or get Professional
 * edition of the component please contact us at sales@dhtmlx.com
 */


/**
 * 根据节点ID剪切节点 add by 潘智杰 
 */
dhtmlXTreeObject.prototype.doCutById=function (id){
	this.nodeCut && this.clearCut();
	this.nodeCut=[].concat(this._globalIdStorageFind(id));
	for (var a=0 ; a<this.nodeCut.length ; a++){
		var b=this.nodeCut[a];
		b._cimgs=[];
		b._cimgs[0]=b.images[0];
		b._cimgs[1]=b.images[1];
		b._cimgs[2]=b.images[2];
		b.images[0]=b.images[1]=b.images[2]=this.cutImage;
		this._correctPlus(b)
	}
};

/**
 * 把剪切的节点粘贴到别的树中 add by 潘智杰 
 * @param treeObj 树对象
 * @param a 节点ID
 * @return
 */
dhtmlXTreeObject.prototype.doPasteOtherTree=function (treeObj,a){
	var b=treeObj._globalIdStorageFind(a);
	if (!b)return 0;
	for (var c=0 ; c<this.nodeCut.length ; c++)
		this._checkPNodes(b, this.nodeCut[c]) || this._moveNode(this.nodeCut[c], b);
	this.clearCut()
};

dhtmlXTreeObject.prototype.setSkin=function (a){
	var b=this.parentObject.className.replace(/dhxtree_[^ ]*/gi, "");
	this.parentObject.className=b+" dhxtree_"+a
};