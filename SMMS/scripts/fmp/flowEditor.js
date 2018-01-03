
function WorkFlow(){
	this.id=null;
	this.name=null;
	this.opMode = "edit";   //编辑模式
	this.signNodeid =null;
	this.nodes=[];
	this.lines=[];
	this.selectedObj=[];
	this.selectedLineFrom=[];
	this.selectedLineTo=[];
	this.mouseX= -1;
	this.mouseY= -1;
	this.mouseEndX= -1;
	this.mouseEndY= -1;
	this.action=null;
	this.lineFlag=null;
	this.multiSelect=false;
	this.ctrlKey=false;
	this.nodeMirror=null;
	this.lineMirror=null;
	this.bottomHeight=10;
	this.rightWidth=10;
	this.init=function(opMode,nodeid){
		var obj=document.getElementById('flowEditor');
		obj.setAttribute('bindClass',this);
		if (opMode=="edit"){
			obj.onmousedown=EditorEvent.mouseDown;
			obj.onmousemove=EditorEvent.mouseMove;
			obj.ondblclick=EditorEvent.dblClick;       //增加双击事件操作,ldn
			obj.onmouseup=EditorEvent.mouseUp;
			obj.onkeydown=EditorEvent.keyDown;
			obj.onkeyup=EditorEvent.keyUp;
		}else{
			this.opMode = opMode;
			this.signNodeid =nodeid;
		}
		this.lineMirror=new Line();
		this.lineMirror.textFlag=false;
		this.lineMirror.mirrorFlag=true;
		this.lineMirror.init();
		this.lineMirror.setDisplay('none');
		this.lineMirror.strokeObj.dashStyle='dashdot';
		this.lineMirror.obj.strokecolor='#000000';
		this.nodeMirror=new Node();
		this.nodeMirror.strokeFlag=true;
		this.nodeMirror.shadowFlag=false;
		this.nodeMirror.textFlag=false;
		this.nodeMirror.mirrorFlag=true;
		this.nodeMirror.init();
		this.nodeMirror.setDisplay('none');
		this.nodeMirror.obj.strokecolor='black';
		this.nodeMirror.obj.style.zIndex='100';
		this.nodeMirror.obj.filled=false;
		this.nodeMirror.strokeObj.dashstyle='dot';
	};
	
	this.getObjectNum=function(){
		this.count++;
		return this.count;
	};
	this.point=function(flag){
		if(flag=='down'){
			this.mouseX=EditorEvent.getMouseX();
			this.mouseY=EditorEvent.getMouseY();
		}else if(flag=='up'){
			this.mouseEndX=EditorEvent.getMouseX();
			this.mouseEndY=EditorEvent.getMouseY();
		}
	};
	this.getEventNode=function(flag){
		var res=null;
		var nodeNum=this.nodes.length;
		var node=null;
		var x;
		var y;
		if(flag=='down'){
			x=this.mouseX;
			y=this.mouseY;
		}else if(flag=='up'){
			x=this.mouseEndX;
			y=this.mouseEndY;
		}
		for(var i=(nodeNum-1);i>=0;i--){
			node=this.nodes[i];
			if(node.pointInObj(x,y)){
				res=node;
				break;
			}
		}
		return res;
	};
	//通过节点id获取节点对象 add by ldn，2012-2-13
	this.getEventNodeById=function(id){
		var res=null;
		var nodeNum=this.nodes.length;
		var node=null;
		for(var i=(nodeNum-1);i>=0;i--){
			node=this.nodes[i];
			if(this.nodes[i].id ==id){
				res=node;
				break;
			}
		}
		return res;
	};
	//查看模式下标记节点，显示红色边框    add by ldn，2012-2-13
	this.signNode = function(nodeid){
	    var node = this.getEventNodeById(nodeid);
	    var flowEditor=document.getElementById('flowEditor');
	    var obj=document.createElement('div');
	    obj.id = 'signFrame',
	    flowEditor.appendChild(obj);
	    obj.style.position='absolute';
	    if(nodeid == '000' || nodeid == '999'){ //如果是开始节点，结束节点，边框尺寸小点
		    obj.style.height='45';
		    obj.style.width='45';
		    obj.style.top=node.top-10;
	    }else{
		    obj.style.height='85';
		    obj.style.width='90';
		    obj.style.top=node.top;
	    }
	    obj.style.border= '2px solid red';
	    obj.style.left=node.left-8;
	    obj.style.zIndex='99'; 
	};
	this.getEventLine=function(){
		var res=null;
		var lineNum=this.lines.length;
		var line=null;
		var x=this.mouseX;
		var y=this.mouseY;
		var isStroke= -1;
		for(var i=(lineNum-1);i>=0;i--){
			line=this.lines[i];
			if(line.pointInObj(x,y)){
				if(res==null||line.obj.style.zIndex=='22'){
					res=null;
					res=EditorEvent.insertObjInArr(res,line);
					isStroke=line.pointInStroke(x,y);
					if(isStroke==0){
						this.selectedLineTo=[];
						this.selectedLineFrom=[];
						this.selectedLineTo=EditorEvent.insertObjInArr(this.selectedLineTo,line);
					}else if(isStroke==1){
						this.selectedLineTo=[];
						this.selectedLineFrom=[];
						this.selectedLineFrom=EditorEvent.insertObjInArr(this.selectedLineFrom,line);
					}
				}
			}
		}
		return res;
	};
	this.moveSelectedObj=function(){
		var x=EditorEvent.getMouseX();
		var y=EditorEvent.getMouseY();
		var num=this.selectedObj.length;
		var lineNum=this.lines.length;
		var line=null;
		for(var i=0;i<num;i++){
			this.selectedObj[i].move(x,y,this.mouseX,this.mouseY);
			for(var j=0;j<lineNum;j++){
				line=this.lines[j];
				if((line.fromObj==this.selectedObj[i])||(line.toObj==this.selectedObj[i])){
					line.relink();
				}
			}
		}
	};
	this.moveSelectedObjEnd=function(){
		var num=this.selectedObj.length;
		for(var i=0;i<num;i++){
			this.selectedObj[i].moveEnd();
		}
	};
	this.moveLine=function(){
		var x=EditorEvent.getMouseX();
		var y=EditorEvent.getMouseY();
		var num=this.selectedLineTo.length;
		for(var i=0;i<num;i++){
			this.selectedLineTo[i].setTo(x,y,null);
		}
		num=this.selectedLineFrom.length;
		for(var i=0;i<num;i++){
			this.selectedLineFrom[i].setFrom(x,y,null);
		}
	};
	this.moveLineEnd=function(selNode){
		var num=this.selectedLineTo.length;
		if(selNode!=null){
			for(var i=0;i<num;i++){
				if(this.createLine(this.selectedLineTo[i].fromObj,selNode)){
					this.selectedLineTo[i].setTo(this.mouseEndX,this.mouseEndY,selNode);
					this.selectedLineTo[i].relink();
				}else{
					this.selectedLineTo[i].relink();
				}
			}
		}else{
			for(var i=0;i<num;i++){
				this.selectedLineTo[i].relink();
			}
		}
		this.selectedLineTo=[];
		num=this.selectedLineFrom.length;
		if(selNode!=null){
			for(var i=0;i<num;i++){
				if(this.createLine(selNode,this.selectedLineFrom[i].toObj)){
					this.selectedLineFrom[i].setFrom(this.mouseEndX,this.mouseEndY,selNode);
					this.selectedLineFrom[i].relink();
				}else{
					this.selectedLineFrom[i].relink();
				}
			}
		}else{
			for(var i=0;i<num;i++){
				this.selectedLineFrom[i].relink();
			}
		}
		this.selectedLineFrom=[];
	};
	this.drawLineEnd=function(selNode){
		if(selNode!=null){
			this.drawMirrorLineTo(selNode);
			if(this.createLine(this.lineMirror.fromObj,this.lineMirror.toObj)){
				var line=new PolyLine();
				line.init();
				line.setShape(this.lineFlag);
				line.link(this.lineMirror);
				this.clearSelected();
			}
		}
		this.lineMirror.setDisplay('none');
	};
	this.drawMirrorLineFrom=function(selObj){
		this.lineMirror.setFrom(this.mouseX,this.mouseY,selObj);
		this.lineMirror.setTo(this.mouseX,this.mouseY,selObj);
		this.lineMirror.setDisplay('');
	};
	this.drawMirrorLineTo=function(selObj){
		var x=EditorEvent.getMouseX();
		var y=EditorEvent.getMouseY();
		this.lineMirror.setTo(x,y,selObj);
	};
	this.drawMirrorNodeStart=function(){
		this.multiSelect=false;
		this.nodeMirror.setLeft(EditorEvent.getX(this.mouseX));
		this.nodeMirror.setTop(EditorEvent.getY(this.mouseY));
		this.nodeMirror.setHeight(0);
		this.nodeMirror.setWidth(0);
	};
	this.drawMirrorNode=function(){
		var x=EditorEvent.getMouseX();
		var y=EditorEvent.getMouseY();
		this.nodeMirror.setWidth(Math.abs(EditorEvent.getX(x)-EditorEvent.getX(this.mouseX)));
		this.nodeMirror.setHeight(Math.abs(EditorEvent.getY(y)-EditorEvent.getY(this.mouseY)));
		if(EditorEvent.getX(x)<EditorEvent.getX(this.mouseX)){
			this.nodeMirror.setLeft(EditorEvent.getX(x));
		}
		if(EditorEvent.getY(y)<EditorEvent.getY(this.mouseY)){
			this.nodeMirror.setTop(EditorEvent.getY(y));
		}
		this.nodeMirror.setDisplay('');
	};
	this.drawMirrorNodeEnd=function(){
		this.nodeMirror.setDisplay('none');
		if(this.embodyObj()) this.multiSelect=true;
	};
	this.embodyObj=function(){
		var res=false;
		var x1=this.nodeMirror.left;
		var x2=this.nodeMirror.left+this.nodeMirror.width;
		var y1=this.nodeMirror.top;
		var y2=this.nodeMirror.top+this.nodeMirror.height;
		var nodeNum=this.nodes.length;
		var lineNum=this.lines.length;
		var node=null;
		var line=null;
		for(var i=0;i<nodeNum;i++){
			node=this.nodes[i];
			if((x1<=node.left)&&(x2>=(node.left+node.width))&&(y1<=node.top)&&(y2>=(node.top+node.height))){
				node.setSelected();
				this.selectedObj=EditorEvent.insertObjInArr(this.selectedObj,node);
				node.x=0;
				node.y=0;
				node.mouseX=node.left;
				node.mouseY=node.top;
				res=true;
			}
		}
		for(var i=0;i<lineNum;i++){
			line=this.lines[i];
			if((x1<=Math.min(line.fromX,line.toX))&&(x2>=Math.max(line.fromX,line.toX))&&
			(y1<=Math.min(line.fromY,line.toY))&&(y2>=Math.max(line.fromY,line.toY))){
				line.setSelected();
				this.selectedObj=EditorEvent.insertObjInArr(this.selectedObj,line);
				res=true;
			}
		}
		return res;
	};
	this.createLine=function(fromObj,toObj){
		var res=true;
		if(fromObj==toObj){
			res=false;
		}
		var len=this.lines.length;
		var line=null;
		for(var i=0;i<len;i++){
			line=this.lines[i];
			if((line.fromObj==fromObj)&&(line.toObj==toObj)){
				res=false;
				showMessage("MSG0008");//两点之间已经存在连接！
				break;
			}
			if((fromObj.id=='000')&&(line.toObj != null)&&(line.fromObj==fromObj)){
				res=false;
				showMessage("MSG0009");//开始节点允许有且只有一个下一节点！
				break;
			}
		}
		if(toObj.id=='999' && fromObj.id=='000'){
			res=false;
			showMessage("MSG0010");//开始节点无法直接指向结束节点！
		}
		if(toObj.id=='000'){
			res=false;
			showMessage("MSG0011");//无法指向开始节点！
		}
		if(fromObj.id=='999'){
			res=false;
			showMessage("MSG0012");//无法指出结束节点！
		}
		return res;
	};
	this.clearSelected=function(){
		var num=this.selectedObj.length;
		for(var i=0;i<num;i++){
			this.selectedObj[i].clearSelected();
		}
		this.selectedObj=[];
	};
	this.selectAll=function(){
		this.selectedObj=[];
		var num=this.nodes.length;
		var obj=null;
		for(var i=0;i<num;i++){
			obj=this.nodes[i];
			obj.setSelected();
			this.selectedObj=EditorEvent.insertObjInArr(this.selectedObj,obj);
			obj.x=0;
			obj.y=0;
			obj.mouseX=obj.left;
			obj.mouseY=obj.top;
		}
		num=this.lines.length;
		obj=null;
		for(var i=0;i<num;i++){
			obj=this.lines[i];
			obj.setSelected();
			this.selectedObj=EditorEvent.insertObjInArr(this.selectedObj,obj);
		}
	};
	this.removeSelected=function(){
		var num=this.nodes.length;
		var obj=null;
		var arr=new Array();
		var count=0;
		for(var i=0;i<num;i++){
			obj=this.nodes[i];
			if(obj.selected){
				obj.remove();
			}else{
				arr[count]=obj;
				count++;
			}
		}
		this.nodes=arr;
		num=this.lines.length;
		obj=null;
		arr=new Array();
		var count=0;
		for(var i=0;i<num;i++){
			obj=this.lines[i];
			if(obj.selected){
				obj.remove();
			}else{
				arr[count]=obj;
				count++;
			}
		}
		this.lines=arr;
		this.selectedObj=[];
	};
	this.setEditorArea=function(){
		var obj=document.getElementById('flowEditor');
		var maxWidth= -1;
		var maxHeight= -1;
		var num=this.nodes.length;
		var node=null;
		for(var i=0;i<num;i++){
			node=this.nodes[i];
			if(maxWidth<(node.left+node.width)){
				maxWidth=node.left+node.width;
			}
			if(maxHeight<(node.top+node.height)){
				maxHeight=node.top+node.height;
			}
		}
		if(maxHeight>document.body.clientHeight){
			obj.style.height=(maxHeight+this.bottomHeight)+'px';
		}else{
			obj.style.height='100%';
		}
		if(maxWidth>document.body.clientWidth){
			obj.style.width=(maxWidth+this.rightWidth)+'px';
		}else{
			obj.style.width='100%';
		}
	};
	this.toJson=function(){
		var jNodes=[];
		var nodeNum=this.nodes.length;
		for(var i=0;i<nodeNum;i++){
			EditorEvent.insertObjInArr(jNodes,this.nodes[i].toJson());
		}
		var jLines=[];
		var lineNum=this.lines.length;
		for(var i=0;i<lineNum;i++){
			EditorEvent.insertObjInArr(jLines,this.lines[i].toJson());
		}
		var json={
			//id:this.id,
			//name:this.name,
			//count:this.count,
			nodes:jNodes,
			lines:jLines
		};
		return JSON.encode(json);
	};
	this.jsonTo=function(json){
//		this.id=json.id;
//		this.name=json.name;
//		this.count=json.count;
		var jNodes=json.nodes;
		var nodeNum=jNodes.length;
		var node=null;
		for(var i=0;i<nodeNum;i++){
			switch(jNodes[i].NODETYPE){
				case '1':{
					node=new NodeImg();
					break;
				}
				case '0':{
					node=new NodeOval();
					break;
				}
				case '2':{
					node=new NodeOval();
					break;
				}
				default:node=new Node();
				break;
			}
			node.jsonTo(jNodes[i]);
			node.init();
		}
		if(this.opMode =="view" && this.signNodeid !=null){
			this.signNode(this.signNodeid);
		}
		var jLines=json.lines;
		var lineNum=jLines.length;
		var line=null;
		for(var i=0;i<lineNum;i++){
			switch(jLines[i].shape){
				default:line=new PolyLine();
				break;
			}
			line.jsonTo(jLines[i]);
			line.init();
			line.relink();
		}
	};
	this.setProp=function(selObj,flag){
		var win=document.getElementById('propWin');
		win.setAttribute('selected',selObj);
		win.setAttribute('type',flag); 
		for(var i=0;i<Prop.panels.length;i++){
			var panel=document.getElementById(Prop.panels[i].id);
			if(flag==Prop.panels[i].flag){
				win.t.innerHTML=Prop.panels[i].title;
				panel.style.display='';
				var tabs=panel.getAttribute('tabs');
				if(tabs)tabs.setSelected();
				if(selObj)selObj.setProperty(flag);
			}else{
				panel.style.display='none';
			}
		}
	};
	
	//双击节点，显示不同的相应属性信息。   add by ldn，2012-1-29
	this.propWin = function(){
		var selNode=this.getEventNode('down');
		var selLine=this.getEventLine();
		
		if(selNode!=null && selNode.nodetype =="1"){ 
			var url=rootPath+"/fmp/workflow/WorkFlowBiz/ShowWorkFlowPropNodeWin";
			openModalDialog(url,selNode,'dialogWidth:460px;dialogHeight:390px;scroll:no');
		}else if(selLine!=null && selLine[selLine.length-1].fromObj.id !="000"){
			var url=rootPath+"/fmp/workflow/WorkFlowBiz/ShowWorkFlowPropLineWin?FLOWTEMPID="+flowtempid;
			openModalDialog(url,selLine[selLine.length-1],'dialogWidth:460px;dialogHeight:250px;scroll:no');
		}
	};
	
	this.eventStart=function(){
		if(this.ctrlKey){
			this.multiSelect=true;
		}
		var selNode=this.getEventNode('down');
		var selLine=this.getEventLine();
		if(!this.multiSelect){
			this.clearSelected();
		}
		if(selNode!=null){
			//this.setProp(selNode,'n');
			if(!EditorEvent.isInArr(this.selectedObj,selNode)){
				if(!this.ctrlKey){
					this.multiSelect=false;
					this.clearSelected();
				}
				selNode.setSelected();
				this.selectedObj=EditorEvent.insertObjInArr(this.selectedObj,selNode);
			}else{
				if(this.ctrlKey){
					selNode.clearSelected();
					this.selectedObj=EditorEvent.removeObjInArr(this.selectedObj,selNode);
				}
			}
			if(this.lineFlag==null){
				this.action='nodedown';
			}else if(this.lineFlag!=null){
				this.action='drawline';
				this.drawMirrorLineFrom(selNode);
			}
		}else if(selLine!=null){
			//this.setProp(selLine[selLine.length-1],'l');
			for(var i=0;i<selLine.length;i++){
				if(!EditorEvent.isInArr(this.selectedObj,selLine[i])){
					if(!this.ctrlKey){
						this.multiSelect=false;
					}
					selLine[i].setSelected();
					this.selectedObj=EditorEvent.insertObjInArr(this.selectedObj,selLine[i]);
				}else{
					if(this.ctrlKey){
						selLine[i].clearSelected();
						this.selectedObj=EditorEvent.removeObjInArr(this.selectedObj,selLine[i]);
					}
				}
			}
			if(this.selectedLineTo.length>0){
				this.action='moveline';
				for(var i=0;i<this.selectedLineTo.length;i++){
					this.selectedLineTo[i].setMoveSelected();
				}
			}
			if(this.selectedLineFrom.length>0){
				this.action='moveline';
				for(var i=0;i<this.selectedLineFrom.length;i++){
					this.selectedLineFrom[i].setMoveSelected();
				}
			}
		}else{
			//this.setProp(null,'help');
			this.action='blankdown';
			if(!this.ctrlKey){
				this.clearSelected();
				this.drawMirrorNodeStart();
			}
		}
	};
	

	//校验操作   //
	this.checkAll=function(){
		var nodeNum = this.nodes.length;
		var lineNum = this.lines.length;
		var formObjSet = "";
		var toObjSet = "";
		var otherwiseSet = "";
		var lastObjSet = "";  //最后节点集合
		for(var i = 0;i<lineNum;i++){
			var objRoutecondition = this.lines[i].routecondition;
			if(objRoutecondition == "" && this.lines[i].fromObj.id != "000"){
				return "无法保存！节点'"+this.lines[i].fromObj.name+"'的分支的路由条件存在空值。";
			}
						
			//一个节点的分支只允许存在一个OTHERWISE条件
			if(objRoutecondition=='OTHERWISE' || objRoutecondition =='otherwise'){ 
				if(otherwiseSet.indexOf(this.lines[i].fromObj.id) !=-1){
					return "无法保存！节点'"+this.lines[i].fromObj.name+"'的分支的路由条件存在两个或两个的OTHERWISE条件，请修改后再保存。";
				}
				otherwiseSet +=this.lines[i].fromObj.id+",";
			}
			if(this.lines[i].toObj.id == "999"){
				lastObjSet += this.lines[i].fromObj.id+",";
			}
			formObjSet += this.lines[i].fromObj.id+",";
			toObjSet += this.lines[i].toObj.id+",";
		}
		if(nodeNum == 0){
			return "无法保存！流程图无开始节点。";
		}
		for(var j = 0;j<nodeNum;j++){
			switch(this.nodes[j].nodetype){
			case "0":{
				if(formObjSet.indexOf(this.nodes[j].id) == -1){
					return "无法保存！开始节点无指出箭头。";
				}
				break;
			}
			case "1":{
				if(formObjSet.indexOf(this.nodes[j].id) == -1 || toObjSet.indexOf(this.nodes[j].id) == -1){
					return "无法保存！中间节点'"+this.nodes[j].name+"'箭头指向缺失。";
				}
				if(this.nodes[j].postdefine == ""){
					return "节点'"+this.nodes[j].name+"'未定义审批职位，请确定后操作。";
				}
				if(this.nodes[j].meetingpostdefine == "" && this.nodes[j].nodebiztype == "1"){
					return "节点'"+this.nodes[j].name+"'未定义会签职位，请确定后操作。";
				}
				if(lastObjSet.indexOf(this.nodes[j].id) != -1){
					if(this.nodes[j].islastreject !='1'){
						return "节点'"+this.nodes[j].name+"'必须拥有最终否决权。";
					}
				}
				break;
			}
			case "2":{
				if(toObjSet.indexOf(this.nodes[j].id) == -1){
					return "无法保存！结束节点无指向箭头。";
				}
				break;
			}
			default:
			break;
		    }

	    }		
		if(formObjSet.indexOf('000') == -1){
			return "无法保存！流程图无开始节点。";
		}
		if(toObjSet.indexOf('999') == -1){
			return "无法保存！流程图无结束节点。";
		}
	};
};


var EditorEvent={
	mouseDown:function(){
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		Love.point('down');
		document.selection.empty();    //让高亮的文字不高亮
		
		
		//此处控制鼠标左击后可移动对象
		Love.point('down');
		Love.eventStart();
		return false;
		
		
		
		//控制鼠标左击，右击移动对象和拖出箭头，由于浏览器鼠标手势限制，注释掉此处代码，by ldn 2013-05-16
		/*
		if(window.event.button == '1'){		//鼠标左击时操作，移动对象
			if(Love.lineFlag=='line'){
				Love.lineFlag=null;
			}
			Love.eventStart();
			return false;
		}else if(window.event.button == '2'){			//如果鼠标右击时，拖出箭头
			var selNode=Love.getEventNode('down');
			if(selNode !=null){
				if(Love.lineFlag==null){
					Love.lineFlag='line';	
				}
				Love.action='drawline';
				Love.drawMirrorLineFrom(selNode);
			}
		}
		*/
	}
	//新增双击操作，add by ldn，2012-1-29
	,dblClick:function(){
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		document.selection.empty();    //让高亮的文字不高亮
		Love.point('down');
		Love.propWin();          //点击节点后显示不同的属性界面		
	}
	,mouseMove:function(){
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		if(Love.action!=null){
			switch(Love.action){
				case "nodedown":
					Love.moveSelectedObj();
					break;
				case "drawline":
					Love.drawMirrorLineTo(null);
					break;
				case "moveline":
					Love.moveLine(null);
					break;
				case "blankdown":
					Love.drawMirrorNode();
					break;
				default:
			}
		}
		return false;
	}
	,mouseUp:function(){
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		if(Love.action!=null){
			Love.point('up');
			var selNode=Love.getEventNode('up');
			switch(Love.action){
				case "nodedown":
					Love.moveSelectedObjEnd();
					break;
				case "drawline":
					Love.drawLineEnd(selNode);
					break;
				case "moveline":
					Love.moveLineEnd(selNode);
					break;
				case "blankdown":
					Love.drawMirrorNodeEnd();
					break;
				default:
			}
		}
		Love.setEditorArea();
		Love.action=null;
		return false;
	}
	,keyDown:function(){
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		if(window.event.ctrlKey)Love.ctrlKey=true;
		switch(window.event.keyCode){
			case 46:
				Love.removeSelected();
				break;
			case 65:
				if(window.event.ctrlKey){ //ctrl+A
					Love.selectAll();
					Love.multiSelect=true;
					window.event.returnValue=false;
				}
				break;
			default:
		}
	}
	,keyUp:function(){
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		Love.ctrlKey=false;
	}
	,getX:function(x){
		return(x+document.body.scrollLeft);
	}
	,getY:function(y){
		return(y+document.body.scrollTop);
	}
	,getMouseX:function(){
		return window.event.clientX;
	}
	,getMouseY:function(){
		return window.event.clientY;
	}
	,insertObjInArr:function(arr,s){
		if(arr==null)arr=[];
		arr[arr.length]=s;
		return arr;
	}
	,removeObjInArr:function(arr,s){
		var tArr=null;
		var count=0;
		if(arr!=null){
			tArr=[];
			var num=arr.length;
			for(var i=0;i<num;i++){
				if(arr[i]!=s){
					tArr[count]=arr[i];
					count++;
				}
			}
		}
		return tArr;
	}
	,isInArr:function(arr,s){
		var res=false;
		if(arr!=null){
			var num=arr.length;
			for(var i=0;i<num;i++){
				if(arr[i]==s){
					res=true;
					break;
				}
			}
		}
		return res;
	}
};


function Line(){
	this.id='line_';
	this.name='New Line';
	
	this.routecondition='';
	this.number= -1;
	this.type='line';
	this.shape='line';
	this.selected=false;
	this.fromX= -1;
	this.fromY= -1;
	this.toX= -1;
	this.toY= -1;
	this.textFlag=false;
	this.mirrorFlag=false;
	this.obj=null;
	this.strokeObj=null;
	this.textObj=null;
	this.fromObj=null;
	this.toObj=null;
	this.init=function(){
		var flowEditor=document.getElementById('flowEditor');
		var obj=document.createElement('v:line');
		try{
			obj.title=this.name;
		}catch(e){
			if (pub_isDebugMode){
				alert(e.message);
			}				
		}
		flowEditor.appendChild(obj);
		obj.from='0,0';
		obj.to='0,0';
		obj.strokecolor='blue';
		obj.strokeweight='1';
		obj.filled='false';
		obj.style.position='absolute';
		obj.style.zIndex='2';
		obj.style.cursor='hand';
		this.obj=obj;
		var strokeObj=document.createElement('v:stroke');
		obj.appendChild(strokeObj);
		strokeObj.endArrow="Classic";
		this.strokeObj=strokeObj;
		if(this.textFlag){
			var textObj=document.createElement('v:textbox');
			textObj.inset='10pt,1pt,5pt,5pt';
			textObj.style.textAlign='center';
			textObj.style.verticalAlign='bottom';
			textObj.style.color='blue';
			textObj.style.fontSize='9pt';
			textObj.innerHTML=this.name;
			obj.appendChild(textObj);
			this.textObj=textObj;
		}
		if(!this.mirrorFlag){
//			var Love=flowEditor.getAttribute('bindClass');
//			this.number=Love.getObjectNum();
//			this.id=this.id+this.number;
			this.id = creatNewID();
			obj.id=this.id;
			Love.lines[Love.lines.length]=this;
		}
	};
	this.setFrom=function(x,y,obj){
		this.fromX=EditorEvent.getX(x);
		this.fromY=EditorEvent.getY(y);
		if(obj)this.fromObj=obj;
		this.obj.from=this.fromX+','+this.fromY;
	};
	this.setTo=function(x,y,obj){
		this.toX=EditorEvent.getX(x);
		this.toY=EditorEvent.getY(y);
		if(obj)this.toObj=obj;
		this.obj.to=this.toX+','+this.toY;
	};
	this.setDisplay=function(flag){
		this.obj.style.display=flag;
	};
	this.link=function(lineMirror){
		this.fromObj=lineMirror.fromObj;
		this.toObj=lineMirror.toObj;
		this.relink();
		this.fromObj.clearSelected();
	};
	this.relink=function(){
		var fromDots=this.fromObj.getDots();
		var toDots=this.toObj.getDots();
		var fromDotNum=fromDots.length;
		var toDotNum=toDots.length;
		var lineLen= -1;
		var fromDot;
		var toDot;
		for(var i=0;i<fromDotNum;i++){
			for(var j=0;j<toDotNum;j++){
				if(lineLen<0){
					lineLen=this.getLineLength(fromDots[i].x,fromDots[i].y,toDots[j].x,toDots[j].y);
					fromDot=fromDots[i];
					toDot=toDots[j];
				}else if(lineLen>this.getLineLength(fromDots[i].x,fromDots[i].y,toDots[j].x,toDots[j].y)){
					lineLen=this.getLineLength(fromDots[i].x,fromDots[i].y,toDots[j].x,toDots[j].y);
					fromDot=fromDots[i];
					toDot=toDots[j];
				}
			}
		}
		this.fromX=fromDot.x;
		this.fromY=fromDot.y;
		this.toX=toDot.x;
		this.toY=toDot.y;
		this.obj.from=this.fromX+','+this.fromY;
		this.obj.to=this.toX+','+this.toY;
	};
	this.getLineLength=function(x1,y1,x2,y2){
		return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	};
	this.pointInObj=function(x,y){
		var res=false;
		x=EditorEvent.getX(x);
		y=EditorEvent.getY(y);
		var x1=this.fromX;
		var x2=this.toX;
		var y1=this.fromY;
		var y2=this.toY;
		var x21=x2-x1;
		var y21=y2-y1;
		if(x21==0){
			res=(Math.abs(x-x1)<5)&&(Math.min(y1,y2)<=y)&&(Math.max(y1,y2)>=y);
		}else if(y21==0){
			res=(Math.abs(y-y1)<5)&&(Math.min(x1,x2)<=x)&&(Math.max(x1,x2)>=x);
		}else{
			res=(Math.min(y1,y2)<=y)&&(Math.max(y1,y2)>=y)&&(Math.min(x1,x2)<=x)&&(Math.max(x1,x2)>=x)
				&&((Math.abs(Math.floor((x21/y21)*(y-y1)+x1-x))<5)||(Math.abs(Math.floor((y21/x21)*(x-x1)+y1-y))<5));
		}
		return res;
	};
	this.pointInStroke=function(x,y){
		var res= -1;
		x=EditorEvent.getX(x);
		y=EditorEvent.getY(y);
		var x1=this.fromX;
		var x2=this.toX;
		var y1=this.fromY;
		var y2=this.toY;
		if((Math.abs(x2-x)<6)&&(Math.abs(y2-y)<6))res=0;
		if((Math.abs(x1-x)<6)&&(Math.abs(y1-y)<6))res=1;
		return res;
	};
	this.setSelected=function(){
		this.obj.strokecolor='green';
		if(this.textObj)this.textObj.style.color='green';
		this.selected=true;
		this.obj.style.zIndex='22';
	};
	this.move=function(){};
	this.moveEnd=function(){};
	this.setMoveSelected=function(){
		this.obj.strokecolor='red';
		if(this.textObj)this.textObj.style.color='green';
		this.selected=true;
		this.obj.style.zIndex='22';
	};
	this.clearSelected=function(){
		this.obj.strokecolor='blue';
		if(this.textObj)this.textObj.style.color='blue';
		this.selected=false;
		this.obj.style.zIndex='2';
	};
	this.remove=function(){
		var flowEditor=document.getElementById('flowEditor');
		flowEditor.removeChild(this.obj);
	};
}


function Menu(){
	this.id='menu';
	this.left=10;
	this.top=3;
	this.height=30;
	this.width=300;
	this.selected=false;
	this.obj=null;
	this.menuObj=null;
	this.x= -1;
	this.y= -1;
	this.img=new Array('back.gif','save.gif','start.gif','end.gif','member.gif','forward.gif'  
			,'delete.gif','node.gif','page-next.gif','drop-yes.gif');
	this.text=new Array('返回到列表','保存','开始节点','结束节点','节点（图片）','路径'
			,'删除','设置参数','下一步','还原');
	this.action=new Array('MenuAction.back()','MenuAction.save()','MenuAction.start()','MenuAction.end()'
			,'MenuAction.nodeImg()','if(MenuAction.line()) MenuAction.changeStyle(this)','MenuAction.remove()'
			,'MenuAction.setting()','MenuAction.goNext()','MenuAction.goBack()');
	this.init=function(opMode){    //初始化横向的工具栏
		var toolObj=document.getElementById('tool');
		var obj=document.createElement('div');
		toolObj.appendChild(obj);
		toolObj.appendChild(this.createMenu(opMode));
		obj.id='movebar';
		obj.setAttribute('bindClass',this);
		this.obj=obj;
		obj.onmousedown=MenuEvent.mouseDown;
		obj.onmousemove=MenuEvent.mouseMove;
		obj.onmouseup=MenuEvent.mouseUp;
		obj.style.position='absolute';
		obj.style.left=this.left;
		obj.style.top=this.top;
		var td=document.createElement('div');
		td.innerHTML='&nbsp;&nbsp;';
		obj.appendChild(td);
	};
	this.createMenu=function(opMode){
		var obj=document.createElement('div');
		this.menuObj=obj;
		obj.id=this.id;
		obj.style.position='absolute';
		obj.style.height=this.height;
		obj.style.left=this.left+8;
		obj.style.top=this.top;
		var tobj=document.createElement('table');
		obj.appendChild(tobj);
		var tb=document.createElement('tbody');
		tobj.appendChild(tb);
		var tr=document.createElement('tr');
		tb.appendChild(tr);
		var td=null;
		var toolLength = 1;
		var startIndex = 0;
		if (opMode=="edit"){
			toolLength =this.img.length-3;
		}
		if (opMode=="simul"){
			toolLength =this.img.length;
			startIndex =this.img.length-3-1;
		}
		for(var i=0;i<toolLength;i++){
			td=document.createElement('td');
			tr.appendChild(td);
			td.innerHTML='<img src="'+rootPath+'/images/workflow/'+this.img[i]+'"><span onmousemove="MenuAction.over(this)"	onmouseout="MenuAction.out(this)" onclick="'+this.action[i]+'">'+this.text[i]+'</span><img src="'+rootPath+'/images/workflow/grid-blue-split.gif">';
			if(startIndex != 0){
				i = startIndex;
				startIndex = 0;
			}
		}
		return obj;
	};

	//鼠标点击时
	this.down=function(){
		var x=EditorEvent.getMouseX();
		var y=EditorEvent.getMouseY();
		x=EditorEvent.getX(x);
		y=EditorEvent.getY(y);
		this.x=x-this.obj.offsetLeft;
		this.y=y-this.obj.offsetTop;
		this.selected=true;
	};
	//鼠标移动时
	this.move=function(){
		if(this.selected){
			var x=EditorEvent.getMouseX();
			var y=EditorEvent.getMouseY();
			this.left=EditorEvent.getX(x)-this.x;
			this.top=EditorEvent.getY(y)-this.y;
			this.obj.style.left=this.left+'px';
			this.obj.style.top=this.top+'px';
			this.menuObj.style.left=(this.left+8)+'px';
			this.menuObj.style.top=this.top+'px';
		}
	};
	//鼠标松开时
	this.up=function(){
		this.selected=false;
		if(this.left<10){
			this.left=10;
			this.obj.style.left=this.left+'px';
			this.menuObj.style.left=(this.left+8)+'px';
		}
		if(this.top<3){
			this.top=3;
			this.obj.style.top=this.top+'px';
			this.menuObj.style.top=this.top+'px';
		}
	};
};

var MenuEvent={
	mouseDown:function(){
		var menu=document.getElementById('movebar');
		var menuClass=menu.getAttribute('bindClass');
		if (menu.setCapture){
			menu.setCapture();
		}else{
			window.captureEvents(menu.MOUSEMOVE);
		}
		menuClass.down();
	}
	,mouseMove:function(){
		var menu=document.getElementById('movebar');
		var menuClass=menu.getAttribute('bindClass');
		menuClass.move();
		return false;
	}
	,mouseUp:function(){
		var menu=document.getElementById('movebar');
		var menuClass=menu.getAttribute('bindClass');
		menuClass.up();
		if (menu.releaseCapture){
			menu.releaseCapture();
		}else{
			window.releaseEvents(menu.MOUSEMOVE);
		}		
		document.getElementById('flowEditor').focus();
	}
};
var MenuAction={   
	open:function(){ //打开
		openwind();
	}   
    ,back:function(){
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
    	if(initJson != Love.toJson()){
    		showMessage("MSG0013");//请保存所作修改！
    		return;
    	} 
    	//javascript :history.back();
    	 closeWindow();
    }
	,save:function(){			//保存
			var flowEditor=document.getElementById('flowEditor');
			var Love=flowEditor.getAttribute('bindClass');
		    var result = Love.checkAll(); 
		    if(result){
		    	showMessage(result);
		    }else{ 
				var url =rootPath+"/fmp/workflow/WorkFlowBiz/SaveWorkFlow";
				XMLHttp.urlSubmit(fmpEncodeURI(url),callBackSave,"workFlow="+Love.toJson());
				function  callBackSave(msg){
					showMessage(msg);
					this.document.location.reload();
				}
		    }

	}
	,start:function(){			//开始节点
		var ovalObj = document.getElementById('000');
		if(ovalObj){
			showMessage("MSG0014");//只允许有且只有一个开始节点！
		}else{
			var n=new NodeOval();
			n.init();
		}
	}
	,end:function(){			//结束节点
		var ovalObj = document.getElementById('999');
		if(ovalObj){
			showMessage("MSG0015");//只允许有且只有一个结束节点！
		}else{
			var n=new NodeOval();
			n.setType('end');
			n.init();
		}
	}
	,nodeRect:function(){		//节点（长方形）
		var n=new Node();
		n.init();
	}
	,nodeImg:function(){		//节点（图片）
		var n=new NodeImg();
		n.init();
	}
	,line:function(){			//路径（直线）
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		if(Love.lineFlag==null){
			Love.lineFlag='line';
		}else if(Love.lineFlag=='line'){
			Love.lineFlag=null;
		}else{
			return false;
		}
		return true;
	}
	,polyline:function(){			//路径（折线）
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		if(Love.lineFlag==null){
			Love.lineFlag='polyline';
		}else if(Love.lineFlag=='polyline'){
			Love.lineFlag=null;
		}else{
			return false;
		}
		return true;
	}
	,remove:function(){				//删除
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		Love.removeSelected();
	}
	,grid:function(){			//网格
		var obj=document.body.style.backgroundImage;
		if(obj=='')document.body.style.backgroundImage='url('+rootPath+'/images/workflow/bg.jpg)';
		else document.body.style.backgroundImage='';
	}
	,changeStyle:function(obj){
		if(obj.style.color=='')obj.style.color='#ffffff';
		else obj.style.color='';
	}
	,over:function(obj){
		obj.style.backgroundColor='#A8D0F9';
	}
	,out:function(obj){
		obj.style.backgroundColor='';
	}
	,setting:function(){
		if(firstNodeId == ""){
			showMessage("MSG0016");//该流程模板还未配置流程图，请确定后操作！
			return;
		}
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		if (document.getElementById('signFrame')){
	        var obj_div=document.getElementById('signFrame');
	        flowEditor.removeChild(obj_div);     //移除红色框框
			currNodeId = firstNodeId;
			nodeIdArray.length = 0;  //清空数组
			parmaeterStr = "";
		}
		openBg(1);
		openSelect(1);
		
		
		var selectObj = document.getElementById("bizTableModelId");
		if(selectObj.value == ""){
			for(var i=0;i<selectObj.options.length;i++){
				if(selectObj.options[i].text == flowtempName){   //判断下拉框选项值
					selectObj.options[i].selected=true;   //选中其下拉框选项

				}
			}
		}
	}
	,goNext:function(){
		if(firstNodeId == ""){
			showMessage("MSG0016");//该流程模板还未配置流程图，请确定后操作！
			return;
		}
		if(parmaeterStr != ""){
			var url=rootPath+"/fmp/workflow/WorkFlowBiz/SimulateWorkFlowRun?parmaeterStr="+parmaeterStr
							+"&FLOWTEMPID="+flowtempid
							+"&FROMNODE="+currNodeId;
			XMLHttp.urlSubmit(url,null);
			var rtMsg =XMLHttp.message;
			if(rtMsg.indexOf("Error")>-1){ //获取不到下一节点，直接弹出错误信息
				showMessage("MSG0096");
			}else{			//获取到下一节点
				var flowEditor=document.getElementById('flowEditor');
				var Love=flowEditor.getAttribute('bindClass');
				if(rtMsg == '999'){
					showMessage("MSG0017");//流程流转结束！
				}else{
					if (document.getElementById('signFrame')){
				        var obj_div=document.getElementById('signFrame');
				        flowEditor.removeChild(obj_div);     //移除红色框框
				    }
					Love.signNode(rtMsg);
					nodeIdArray.push(currNodeId); //存放流转过的节点
					currNodeId = rtMsg; //将获取的下一节点赋给当前节点
				}
			}
			
		}else{
			showMessage("MSG0018");//请先设置参数！
		}
	}
	,goBack:function(){
		if(nodeIdArray.length == 0){
			showMessage("MSG0018");//请先设置参数！
			return;
		}
		var perNodeId= nodeIdArray.pop();
		if(perNodeId == '000'){
			showMessage("MSG0019");//已经还原到第一个节点！
		}else{
			var flowEditor=document.getElementById('flowEditor');
			var Love=flowEditor.getAttribute('bindClass');
			if (document.getElementById('signFrame')){
		        var obj_div=document.getElementById('signFrame');
		        flowEditor.removeChild(obj_div);     //移除红色框框
		    }
			Love.signNode(perNodeId);
			currNodeId = perNodeId;
		}
	}
};
function Node(){    //节点，矩形
	this.id='node_';
	this.name='New Node';
	this.number= -1;
	this.type='node';
	this.shape='rect';
	this.property=null;
	this.selected=false;
	this.left=100;
	this.top=80;
	this.width=100;
	this.height=40;
	this.mouseX= -1;
	this.mouseY= -1;
	this.x= -1;
	this.y= -1;
	this.strokeFlag=false;
	this.shadowFlag=true;
	this.textFlag=true;
	this.mirrorFlag=false;
	this.obj=null;
	this.shadowObj=null;
	this.textObj=null;
	this.strokeObj=null;
	this.init=function(){
		var flowEditor=document.getElementById('flowEditor');
		var obj=document.createElement('v:rect');
		flowEditor.appendChild(obj);
		obj.title=this.name;
		obj.style.position='absolute';
		obj.style.left=this.left;
		obj.style.top=this.top;
		obj.style.width=this.width;
		obj.style.height=this.height;
		obj.style.cursor='hand';
		obj.style.zIndex='1';
		obj.strokecolor='blue';
		obj.strokeweight='1';
		this.obj=obj;
		if(this.shadowFlag){
			var shadowObj=document.createElement('v:shadow');
			shadowObj.on='T';
			shadowObj.type='single';
			shadowObj.color='#b3b3b3';
			shadowObj.offset='5px,5px';
			obj.appendChild(shadowObj);
			this.shadowObj=shadowObj;
		}
		if(this.strokeFlag){
			var strokeObj=document.createElement('v:stroke');
			obj.appendChild(strokeObj);
			this.strokeObj=strokeObj;
		}
		if(this.textFlag){
			var textObj=document.createElement('v:textbox');
			textObj.inset='2pt,5pt,2pt,5pt';
			textObj.style.textAlign='center';
			textObj.style.color='blue';
			textObj.style.fontSize='9pt';
			textObj.innerHTML=this.name;
			obj.appendChild(textObj);
			this.textObj=textObj;
		}
		if(!this.mirrorFlag){
			var Love=flowEditor.getAttribute('bindClass');
			if(this.number<0){
				this.number=Love.getObjectNum();
				this.id=this.id+this.number;
				obj.id=this.id;
				this.name=this.id;
				this.obj.title=this.id;
				this.textObj.innerHTML=this.id;
			}
			Love.nodes[Love.nodes.length]=this;
		}
	};
	this.setDisplay=function(flag){
		this.obj.style.display=flag;
	};
	this.pointInObj=function(x,y){
		var res=false;
		x=EditorEvent.getX(x);
		y=EditorEvent.getY(y);
		var x1=this.left;
		var x2=x1+this.width;
		var y1=this.top;
		var y2=y1+this.height;
		if((x>=x1)&&(x<=x2)&&(y>=y1)&&(y<=y2)){
			this.mouseX=x;
			this.mouseY=y;
			this.x=x-this.obj.offsetLeft;
			this.y=y-this.obj.offsetTop;
			res=true;
		}
		return res;
	};
	this.move=function(x,y,mouseX,mouseY){
		this.left=EditorEvent.getX(x)-this.x-EditorEvent.getX(mouseX)+this.mouseX;
		this.top=EditorEvent.getY(y)-this.y-EditorEvent.getY(mouseY)+this.mouseY;
		this.obj.style.left=this.left+'px';
		this.obj.style.top=this.top+'px';
	};
	this.moveEnd=function(){
		this.x=0;
		this.y=0;
		this.mouseX=this.left;
		this.mouseY=this.top;
	};
	this.setSelected=function(){
		this.shadowObj.color='green';
		this.obj.strokecolor='green';
		this.textObj.style.color='green';
		this.selected=true;
	};
	this.clearSelected=function(){
		this.shadowObj.color='#b3b3b3';
		this.obj.strokecolor='blue';
		this.textObj.style.color='blue';
		this.selected=false;
	};
	this.remove=function(){
		var flowEditor=document.getElementById('flowEditor');
		flowEditor.removeChild(this.obj);
	};
	this.setLeft=function(n){
		this.left=n;
		this.obj.style.left=n;
	};
	this.setTop=function(n){
		this.top=n;
		this.obj.style.top=n;
	};
	this.setWidth=function(n){
		this.width=n;
		this.obj.style.width=n;
	};
	this.setHeight=function(n){
		this.height=n;
		this.obj.style.height=n;
	};
	this.getDots=function(){
		var l=this.left;
		var t=this.top;
		var w=this.width;
		var h=this.height;
		var dots=new Array();
		var dot;
		dots[dots.length]={x:l,y:t+h/2};
		dots[dots.length]={x:l+w,y:t+h/2};
		dots[dots.length]={x:l+w/2,y:t};
		dots[dots.length]={x:l+w/2,y:t+h};
		dots[dots.length]={x:l,y:t};
		dots[dots.length]={x:l+w,y:t};
		dots[dots.length]={x:l,y:t+h};
		dots[dots.length]={x:l+w,y:t+h};
		return dots;
	};
	this.setProperty=function(type){
		Prop.clear();
		document.getElementById(type+'_p_id').innerHTML=this.id;
		document.getElementById(type+'_p_name').value=this.name;
		if(this.property){
			var num=this.property.length;
			for(var i=0;i<num;i++){
				switch(this.property[i].text){
					case 'span':
						document.getElementById(this.property[i].id).innerHTML=this.property[i].value;
						break;
					default:
						document.getElementById(this.property[i].id).value=this.property[i].value;
						break;
				}
			}
		}
	};
	this.getProperty=function(property){
		this.property=property;
		this.name=property.n_p_name;
		this.title=this.name;
	};
	this.toJson=function(){
		var json={
			id:this.id,
			name:this.name,
			type:this.type,
			shape:this.shape,
			number:this.number,
			left:this.left,
			top:this.top,
			width:this.width,
			height:this.height,
			property:this.property
		};
		return json;
	};
	this.jsonTo=function(json){
		this.id=json.id;
		this.name=json.name;
		this.type=json.type;
		this.shape=json.shape;
		this.number=json.number;
		this.left=json.left;
		this.top=json.top;
		this.width=json.width;
		this.height=json.height;
		this.property=json.property;
	};
}


function NodeImg(){    //图片，节点
	this.id='newnode';
	this.name='新节点';
	this.nodebiztype ='';
	this.passrate ='';
	this.nodedesc ='';
	this.apprverName =''; //节点办理人（已经办理的节点）
	this.orgnameset ='';
	this.orgdefine ='';
	this.orgextset ='';
	this.deptnameset ='';
	this.deptdefine ='';
	this.deptextset ='';
	this.postdefine ='';
	this.smssendcond ='';
	this.smstemcode ='';
	this.postnameset ='';
	this.meetingpostdefine ='';
	this.meetingpostnameset ='';
	this.nodetype = '1';//节点类型 ，中间节点
	this.islastreject ='';
	this.iscondiconfirm ='';
	this.ischeckcondtion ='';
	this.transactdays ='';
	this.number= -1;
	this.type='node';
	this.shape='img';
	this.property=null;
	this.selected=false;
	this.left=100;
	this.top=80;
	this.width=75;
	this.height=70;
	this.imgHeight=35;
	this.imgWidth=35;
	this.textHeight=35;
	this.textWidth=75;
	this.imgDLeft=20;
	this.textDTop=40;
	this.mouseX= -1;
	this.mouseY= -1;
	this.x= -1;
	this.y= -1;
	this.strokeFlag=false;
	this.shadowFlag=true;
	this.textFlag=true;
	this.mirrorFlag=false;
	this.obj=null;
	this.shadowObj=null;
	this.textObj=null;
	this.strokeObj=null;
	this.init=function(){
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		var obj=document.createElement('img');
		obj.src=rootPath+'/images/workflow/img.gif';
		flowEditor.appendChild(obj);
		if(Love.opMode=="view"){              //若是在查看模式，则鼠标移至图标上时，显示该节点的办理人 add by ldn,2012-7-7
			if(this.id == currNodeId){
				obj.title = "节点办理人:"+currApproverSet;
			}else{
				obj.title=this.apprverName;
			}
		}else{
			obj.title=this.name;
		}
		obj.style.position='absolute';
		obj.style.left=this.left+this.imgDLeft;
		obj.style.top=this.top;
		obj.style.width=this.imgWidth;
		obj.style.height=this.imgHeight;
		obj.style.cursor='hand';
		obj.style.zIndex='1';
		this.obj=obj;
		if(this.textFlag){
			var textObj=document.createElement('div');
			textObj.style.backgroundColor='#CEDEF0';
			textObj.style.position='absolute';
			textObj.style.left=this.left;
			textObj.style.top=this.top+this.textDTop;
			textObj.style.width=this.textWidth;
			textObj.style.height=this.textHeight;
			textObj.style.textAlign='center';
			textObj.style.fontSize='9pt';
			textObj.style.wordBreak='break-all';
			textObj.style.overflow='hidden';
			textObj.style.zIndex='0';
			textObj.innerHTML=this.name;
			textObj.style.zIndex='1';
			flowEditor.appendChild(textObj);
			this.textObj=textObj;
		}
		if(!this.mirrorFlag){
			var Love=flowEditor.getAttribute('bindClass');
//			alert(Love.name);
			if(this.id =='newnode'){
//				this.number=Love.getObjectNum();
//				this.id=this.id+this.number;
				this.id =creatNewID();
				obj.id=this.id;//123
//				this.name=this.id;
//				this.obj.title=this.id;
//				if(this.textObj)this.textObj.innerHTML=this.id;
				if(this.textObj)this.textObj.innerHTML=this.name;
			}
			Love.nodes[Love.nodes.length]=this;
		}
	};
	this.setDisplay=function(flag){
		this.obj.style.display=flag;
		this.textObj.style.display=flag;
	};
	this.pointInObj=function(x,y){
		var res=false;
		x=EditorEvent.getX(x);
		y=EditorEvent.getY(y);
		var x1=this.left+this.imgDLeft;
		var x2=x1+this.imgWidth;
		var y1=this.top;
		var y2=y1+this.imgHeight;
		if((x>=x1)&&(x<=x2)&&(y>=y1)&&(y<=y2)){
			this.mouseX=x;
			this.mouseY=y;
			this.x=x-this.obj.offsetLeft+this.imgDLeft;
			this.y=y-this.obj.offsetTop;
			res=true;
		}
		return res;
	};
	this.move=function(x,y,mouseX,mouseY){
		this.left=EditorEvent.getX(x)-this.x-EditorEvent.getX(mouseX)+this.mouseX;
		this.top=EditorEvent.getY(y)-this.y-EditorEvent.getY(mouseY)+this.mouseY;
		this.obj.style.left=this.left+this.imgDLeft;
		this.obj.style.top=this.top;
		this.textObj.style.left=this.left;
		this.textObj.style.top=this.top+this.textDTop;
	};
	this.moveEnd=function(){
		this.x=0;
		this.y=0; 
		this.mouseX=this.left;
		this.mouseY=this.top;
	};
	this.setSelected=function(){
		this.textObj.style.backgroundColor='green';
		this.textObj.style.color='#ffffff';
		this.selected=true;
	};
	this.clearSelected=function(){
		this.textObj.style.backgroundColor='#CEDEF0';
		this.textObj.style.color='';
		this.selected=false;
	};
	this.remove=function(){
		var flowEditor=document.getElementById('flowEditor');
		flowEditor.removeChild(this.obj);
		flowEditor.removeChild(this.textObj);
	};
	this.setLeft=function(n){
		this.left=n;
		this.obj.style.left=this.left+this.imgDLeft;
		this.textObj.style.left=this.left;
	};
	this.setTop=function(n){
		this.top=n;
		this.obj.style.top=this.top;
		this.textObj.style.top=this.top+this.textDTop;
	};
	this.setWidth=function(n){
		this.width=n;
		this.obj.style.width=n;
	};
	this.setHeight=function(n){
		this.height=n;
		this.obj.style.height=n;
	};
	this.getDots=function(){
		var l=this.left;
		var t=this.top;
		var w=this.width;
		var h=this.height;
		var dots=new Array();
		var dot;
		dots[dots.length]={
			x:l+this.imgDLeft,
			y:t+this.imgHeight/2
		};
		dots[dots.length]={
			x:l+this.imgDLeft+this.imgWidth,
			y:t+this.imgHeight/2
		};
		dots[dots.length]={
			x:l+w/2,
			y:t
		};
		dots[dots.length]={
			x:l+w/2,y:t+h
		};
		return dots;
	};

	this.toJson=function(){
		var json={
//			id:this.id,
//			name:this.name,
//			type:this.type,
//			shape:this.shape,
//			number:this.number,
//			left:this.left,
//			top:this.top,
//			width:this.width,
//			height:this.height,
//			property:this.property
			
				NODEID:this.id,
				NODENAME:this.name,
				NODEBIZTYPE:this.nodebiztype,
				PASSRATE:this.passrate,
				NODEDESC:this.nodedesc,
				ORGNAMESET:this.orgnameset,
				ORGDEFINE:this.orgdefine,
				ORGEXTSET:this.orgextset,
				DEPTNAMESET:this.deptnameset,
				DEPTDEFINE:this.deptdefine,
				DEPTEXTSET:this.deptextset,
		    	POSTNAMESET:this.postnameset,
				POSTDEFINE:this.postdefine,
		    	MEETINGPOSTNAMESET:this.meetingpostnameset,
				MEETINGPOSTDEFINE:this.meetingpostdefine,
				POSTLEFT:this.left,
				POSTTOP:this.top,
		    	NODETYPE:this.nodetype,
		    	FLOWTEMPID:flowtempid,
		    	TRANSACTDAYS:this.transactdays,
		    	ISLASTREJECT:this.islastreject,
		    	ISCONDICONFIRM:this.iscondiconfirm,
		    	ISCHECKCONDITION:this.ischeckcondtion,
		    	SMSSENDCOND:this.smssendcond,
		    	SMSTEMPCODE:this.smstemcode
		    	
		};
		return json;
	};
	this.jsonTo=function(json){
//		this.id=json.id;
//		this.name=json.name;
//		this.type=json.type;
//		this.shape=json.shape;
//		this.number=json.number;
//		this.left=json.left;
//		this.top=json.top;
//		this.width=json.width;
//		this.height=json.height;
//		this.property=json.property;
		
		this.id=json.NODEID;
		this.name=json.NODENAME;
		if(typeof json.NODEBIZTYPE=='undefined'){
			this.nodebiztype ='';
		}else{
			this.nodebiztype=json.NODEBIZTYPE;
		}
		if(typeof json.PASSRATE=='undefined'){
			this.passrate ='';
		}else{
			this.passrate=json.PASSRATE;
		}
		if(typeof json.NODEDESC=='undefined'){
			this.nodedesc ='';
		}else{
			this.nodedesc=json.NODEDESC;
		}
		if(typeof json.ORGNAMESET=='undefined'){
			this.orgnameset ='';
		}else{
			this.orgnameset=json.ORGNAMESET;
		}
		if(typeof json.ORGDEFINE=='undefined'){
			this.orgdefine ='';
		}else{
			this.orgdefine=json.ORGDEFINE;
		}
		if(typeof json.ORGEXTSET=='undefined'){
			this.orgextset ='';
		}else{
			this.orgextset=json.ORGEXTSET;
		}
		if(typeof json.DEPTNAMESET=='undefined'){
			this.deptnameset ='';
		}else{
			this.deptnameset=json.DEPTNAMESET;
		}
		if(typeof json.DEPTDEFINE=='undefined'){
			this.deptdefine ='';
		}else{
			this.deptdefine=json.DEPTDEFINE;
		}
		if(typeof json.DEPTEXTSET=='undefined'){
			this.deptextset ='';
		}else{
			this.deptextset=json.DEPTEXTSET;
		}
		if(typeof json.POSTDEFINE=='undefined'){
			this.postdefine ='';
		}else{
			this.postdefine=json.POSTDEFINE;
		}
		if(typeof json.MEETINGPOSTDEFINE=='undefined'){
			this.meetingpostdefine ='';
		}else{
			this.meetingpostdefine=json.MEETINGPOSTDEFINE;
		}
		if(typeof json.POSTLEFT=='undefined'){
			this.left ='';
		}else{
			this.left=json.POSTLEFT;
		}
		if(typeof json.POSTTOP=='undefined'){
			this.top ='';
		}else{
			this.top=json.POSTTOP;
		}
		if(typeof json.NODETYPE=='undefined'){
			this.nodetype ='';
		}else{
			this.nodetype=json.NODETYPE;
		}
		if(typeof json.TRANSACTDAYS=='undefined'){
			this.transactdays ='';
		}else{
			this.transactdays=json.TRANSACTDAYS;
		}
		if(typeof json.POSTNAMESET=='undefined'){
			this.postnameset ='';
		}else{
			this.postnameset=json.POSTNAMESET;
		}
		if(typeof json.MEETINGPOSTNAMESET=='undefined'){
			this.meetingpostnameset ='';
		}else{
			this.meetingpostnameset=json.MEETINGPOSTNAMESET;
		}
		if(typeof json.ISLASTREJECT=='undefined'){
			this.islastreject ='';
		}else{
			this.islastreject=json.ISLASTREJECT;
		}
		if(typeof json.ISCONDICONFIRM=='undefined'){
			this.iscondiconfirm ='';
		}else{
			this.iscondiconfirm=json.ISCONDICONFIRM;
		}
		if(typeof json.ISCHECKCONDITION=='undefined'){
			this.ischeckcondtion ='';
		}else{
			this.ischeckcondtion=json.ISCHECKCONDITION;
		}
		if(typeof json.SMSSENDCOND=='undefined'){
			this.smssendcond ='';
		}else{
			this.smssendcond=json.SMSSENDCOND;
		}
		if(typeof json.SMSTEMPCODE=='undefined'){
			this.smstemcode ='';
		}else{
			this.smstemcode=json.SMSTEMPCODE;
		}
		if(typeof json.APPROVERNAME=='undefined'){
			this.apprverName ='';
		}else{
			this.apprverName=json.APPROVERNAME;
		}
	};
}

function NodeOval(){     //开始与结束节点
	this.id='newnode';
	this.name='New Node';
	this.nodetype='0';  //节点类型，开始节点
	this.number= -1;
	this.type='start';
	this.shape='oval';
	this.property=null;
	this.selected=false;
	this.left=100;
	this.top=80;
	this.width=20;
	this.height=20;
	this.mouseX= -1;
	this.mouseY= -1;
	this.x= -1;
	this.y= -1;
	this.strokeFlag=false;
	this.shadowFlag=true;     //阴影
	this.textFlag=false;		//图片文本
	this.mirrorFlag=false;     //映射
	this.obj=null;
	this.shadowObj=null;
	this.textObj=null;
	this.strokeObj=null;
	this.init=function(){
		var flowEditor=document.getElementById('flowEditor');		
		var obj=document.createElement('v:oval');
		flowEditor.appendChild(obj);
		obj.title=this.name;
		obj.style.position='absolute';
		obj.style.left=this.left;
		obj.style.top=this.top;
		obj.style.width=this.width;
		obj.style.height=this.height;
		obj.style.cursor='hand';
		obj.style.zIndex='1';
		obj.id = this.id;
		if(this.nodetype=='0'){
			this.name='开始';
			obj.fillcolor='#33CC00';
			obj.strokecolor='#33CC00';
		}else{
			this.name='结束';
			obj.fillcolor='red';
			obj.strokecolor='red';
		}
		obj.strokeweight='1';
		this.obj=obj;
		if(this.shadowFlag){
			var shadowObj=document.createElement('v:shadow');
			shadowObj.on=false;
			shadowObj.type='single';
			shadowObj.color='#b3b3b3';
			shadowObj.offset='3px,3px';
			obj.appendChild(shadowObj);
			this.shadowObj=shadowObj;
		}
		if(this.strokeFlag){
			var strokeObj=document.createElement('v:stroke');
			obj.appendChild(strokeObj);
			this.strokeObj=strokeObj;
		}
		if(this.textFlag){
			var textObj=document.createElement('v:textbox');
			textObj.inset='2pt,5pt,2pt,5pt';
			textObj.style.textAlign='center';
			textObj.style.color='blue';
			textObj.style.fontSize='9pt';
			textObj.innerHTML=this.name;
			obj.appendChild(textObj);
			this.textObj=textObj;
		}
		if(!this.mirrorFlag){
			var Love=flowEditor.getAttribute('bindClass');
			if(this.id=='newnode'){
				if(this.nodetype == '0'){
					this.id='000';
				}else{
					this.id='999';
				}				
				obj.id=this.id;
				this.obj.title=this.name;
//				this.number=Love.getObjectNum();
//				this.id=this.id+this.number;
//				obj.id=this.id;
//				this.name=this.id;
//				this.obj.title=this.name;
//				if(this.textObj)this.textObj.innerHTML=this.name;
			}
			Love.nodes[Love.nodes.length]=this;
		}
	};
	this.setType=function(type){
		if(type){
			this.type=type;
			this.nodetype='2';
		}
	};
	this.setDisplay=function(flag){
		this.obj.style.display=flag;
	};
	this.pointInObj=function(x,y){
		var res=false;
		x=EditorEvent.getX(x);
		y=EditorEvent.getY(y);
		var x1=this.left;
		var x2=x1+this.width;
		var y1=this.top;
		var y2=y1+this.height;
		var centerX=x1+this.width/2;
		var centerY=y1+this.height/2;
		var radius=this.width/2;
		var d=(x-centerX)*(x-centerX)+(y-centerY)*(y-centerY);
		if((radius*radius)>d){
			this.mouseX=x;
			this.mouseY=y;
			this.x=x-this.obj.offsetLeft;
			this.y=y-this.obj.offsetTop;
			res=true;
		}
		return res;
	};
	this.move=function(x,y,mouseX,mouseY){
		this.obj.style.left=EditorEvent.getX(x)-this.x-EditorEvent.getX(mouseX)+this.mouseX;
		this.obj.style.top=EditorEvent.getY(y)-this.y-EditorEvent.getY(mouseY)+this.mouseY;
		this.left=parseInt(this.obj.style.left);
		this.top=parseInt(this.obj.style.top);
	};
	this.moveEnd=function(){
		this.x=0;
		this.y=0;
		this.mouseX=this.left;
		this.mouseY=this.top;
	};
	this.setSelected=function(){
		this.shadowObj.on='T';
		if(this.textObj)this.textObj.style.color='green';
		this.selected=true;
	};
	this.clearSelected=function(){
		this.shadowObj.on=false;
		if(this.textObj)this.textObj.style.color='blue';
		this.selected=false;
	};
	this.remove=function(){
		var flowEditor=document.getElementById('flowEditor');
		flowEditor.removeChild(this.obj);
	};
	this.setLeft=function(n){
		this.left=n;
		this.obj.style.left=n;
	};
	this.setTop=function(n){
		this.top=n;
		this.obj.style.top=n;
	};
	this.setWidth=function(n){
		this.width=n;
		this.obj.style.width=n;
	};
	this.setHeight=function(n){
		this.height=n;
		this.obj.style.height=n;
	};
	this.getDots=function(){
		var l=this.left;
		var t=this.top;
		var w=this.width;
		var h=this.height;
		var dots=new Array();
		var dot;
		dots[dots.length]={x:l,y:t+h/2};
		dots[dots.length]={x:l+w,y:t+h/2};
		dots[dots.length]={x:l+w/2,y:t};
		dots[dots.length]={x:l+w/2,y:t+h};
		return dots;
	};
/*	this.setProperty=function(type){
		Prop.clear();
		document.getElementById(type+'_p_id').innerHTML=this.id;
		document.getElementById(type+'_p_name').value=this.name;
		if(this.property){
			var num=this.property.length;
			for(var i=0;i<num;i++){
				switch(this.property[i].text){
					case 'span':
					document.getElementById(this.property[i].id).innerHTML=this.property[i].value;
					break;
					default:
					document.getElementById(this.property[i].id).value=this.property[i].value;break;
				}
			}
		}
	};
	this.getProperty=function(property){
		this.property=property;
		this.name=property.n_p_name;
		this.title=this.name;
	};*/
	this.toJson=function(){
		var json={
//			id:this.id,
//			name:this.name,
//			type:this.type,
//			shape:this.shape,
//			number:this.number,
//			left:this.left,
//			top:this.top,
//			width:this.width,
//			height:this.height,
//			property:this.property
				NODEID:this.id,
				NODENAME:this.name,
				POSTLEFT:this.left,
				POSTTOP:this.top,
				FLOWTEMPID:flowtempid,
				NODETYPE:this.nodetype
		};
		return json;
	};
	this.jsonTo=function(json){
//		this.id=json.id;
//		this.name=json.name;
//		this.type=json.type;
//		this.shape=json.shape;
//		this.number=json.number;
//		this.left=json.left;
//		this.top=json.top;
//		this.width=json.width;
//		this.height=json.height;v
//		this.property=json.property;
		
		this.id=json.NODEID;
		this.name=json.NODENAME;
		if(typeof json.POSTLEFT=='undefined'){
			this.left ='';
		}else{
			this.left=json.POSTLEFT;
		}
		if(typeof json.POSTTOP=='undefined'){
			this.top ='';
		}else{
			this.top=json.POSTTOP;
		}
		if(typeof json.NODETYPE=='undefined'){
			this.nodetype ='';
		}else{
			this.nodetype=json.NODETYPE;
		}
	};
}
function PolyLine(){    //折线
	this.id='newline';
	this.name='New Line';
	
	this.routecondition='';
	
	this.number= -1;
	this.type='line';
	this.shape='polyline';
	this.property=null;
	this.selected=false;
	this.fromX= -1;
	this.fromY= -1;
	this.toX= -1;
	this.toY= -1;
	this.polyDot=[];
	this.textFlag=false;
	this.mirrorFlag=false;
	this.obj=null;
	this.strokeObj=null;
	this.textObj=null;
	this.fromObj=null;
	this.toObj=null;
	this.init=function(){
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		var obj=document.createElement('v:polyline');
		flowEditor.appendChild(obj);
		if(Love.opMode=="view"){              //若是在查看模式，则鼠标移至图标上时，显示该箭头的路由条件add by ldn,2012-7-7
			obj.title=this.routecondition;
		}else{
			obj.title=this.name;
		}
		obj.points.value='0,20 50,0 100,20';
		obj.strokecolor='blue';
		obj.strokeweight='1';
		obj.filled='false';
		obj.style.position='absolute';
		obj.style.zIndex='2';
		obj.style.cursor='hand';
		this.obj=obj;
		var strokeObj=document.createElement('v:stroke');
		obj.appendChild(strokeObj);
		strokeObj.endArrow="Classic";
		this.strokeObj=strokeObj;
		if(this.textFlag){
			var textObj=document.createElement('v:textbox');
			textObj.inset='10pt,1pt,5pt,5pt';
			textObj.style.textAlign='center';
			textObj.style.verticalAlign='bottom';
			textObj.style.color='blue';
			textObj.style.fontSize='9pt';
			textObj.innerHTML=this.name;
			obj.appendChild(textObj);
			this.textObj=textObj;
		}
		if(!this.mirrorFlag){
			var Love=flowEditor.getAttribute('bindClass');
			if(this.id =='newline'){
//				this.number=Love.getObjectNum();
//				this.id=this.id+this.number;
				this.id=creatNewID();
				obj.id=this.id;
				this.name=this.id;
				this.obj.title=this.id;
			}
			Love.lines[Love.lines.length]=this;
		}
	};
	this.setFrom=function(x,y,obj){
		this.fromX=EditorEvent.getX(x);
		this.fromY=EditorEvent.getY(y);
		if(obj)this.fromObj=obj;
		this.polyDot=[];
		this.obj.points.value=this.getPointsValue();
	};
	this.setTo=function(x,y,obj){
		this.toX=EditorEvent.getX(x);
		this.toY=EditorEvent.getY(y);
		if(obj)this.toObj=obj;
		this.polyDot=[];
		this.obj.points.value=this.getPointsValue();
	};
	this.setDisplay=function(flag){
		this.obj.style.display=flag;
	};
	this.setShape=function(shape){
		if(shape)this.shape=shape;
	};
	this.link=function(lineMirror){
		this.fromObj=lineMirror.fromObj;
		this.toObj=lineMirror.toObj;
		this.relink();
		this.fromObj.clearSelected();
	};
	this.relink=function(){
		var fromDots=this.fromObj.getDots();
		var toDots=this.toObj.getDots();		
		this.relinkLine(fromDots,toDots);
		
	};
	this.relinkLine=function(fromDots,toDots){
		var fromDotNum=fromDots.length;
		var toDotNum=toDots.length;
		var lineLen= -1;
		var fromDot;
		var toDot;
		for(var i=0;i<fromDotNum;i++){
			for(var j=0;j<toDotNum;j++){
				if(lineLen<0){
					lineLen=this.getLineLength(fromDots[i].x,fromDots[i].y,toDots[j].x,toDots[j].y);
					fromDot=fromDots[i];
					toDot=toDots[j];
				}else if(lineLen>this.getLineLength(fromDots[i].x,fromDots[i].y,toDots[j].x,toDots[j].y)){
					lineLen=this.getLineLength(fromDots[i].x,fromDots[i].y,toDots[j].x,toDots[j].y);
					fromDot=fromDots[i];
					toDot=toDots[j];
				}
			}
		}
		this.fromX=fromDot.x;
		this.fromY=fromDot.y;
		this.toX=toDot.x;
		this.toY=toDot.y;
		this.obj.points.value=this.getPointsValue();
	};
	this.relinkPolyline=function(fromDots,toDots){
		var fromDot;
		var toDot;
		this.polyDot=[];
		var xflag= -1;
		var yflag= -1;
		if((this.fromObj.left+this.fromObj.width)<toDots[2].x){
			fromDot=fromDots[1];
			toDot=toDots[0];
			xflag=0;
		}else if(this.fromObj.left>toDots[2].x){
			fromDot=fromDots[0];
			toDot=toDots[1];
			xflag=1;
		}else{
			fromDot=fromDots[1];
			toDot=toDots[1];
			xflag=2;
		}
		if(fromDots[0].y>toDots[3].y){
			if(xflag==2){
				fromDot=fromDots[0];
				toDot=toDots[0];
				this.polyDot[0]={x:Math.min(fromDot.x,toDot.x)-30,y:fromDot.y};
				this.polyDot[1]={x:Math.min(fromDot.x,toDot.x)-30,y:toDot.y};
			}else{
				toDot=toDots[3];
				this.polyDot[0]={x:toDot.x,y:fromDot.y};
			}
		}else if(fromDots[0].y<toDots[2].y){
			if(xflag==2){
				this.polyDot[0]={x:Math.max(fromDot.x,toDot.x)+30,y:fromDot.y};
				this.polyDot[1]={x:Math.max(fromDot.x,toDot.x)+30,y:toDot.y};
			}else{
				toDot=toDots[2];
				this.polyDot[0]={x:toDot.x,y:fromDot.y};
			}
		}else{
			if(xflag==0){
				fromDot=fromDots[2];
				toDot=toDots[2];
				this.polyDot[0]={x:fromDot.x,y:Math.min(fromDot.y,toDot.y)-10};
				this.polyDot[1]={x:toDot.x,y:Math.min(fromDot.y,toDot.y)-10};
			}else if(xflag==1){
				fromDot=fromDots[3];
				toDot=toDots[3];
				this.polyDot[0]={x:fromDot.x,y:Math.max(fromDot.y,toDot.y)+10};
				this.polyDot[1]={x:toDot.x,y:Math.max(fromDot.y,toDot.y)+10};
			}
		}
		this.fromX=fromDot.x;
		this.fromY=fromDot.y;
		this.toX=toDot.x;
		this.toY=toDot.y;
		this.obj.points.value=this.getPointsValue();
	};
	this.getPointsValue=function(){
		var res=this.fromX+','+this.fromY;
		for(var i=0;i<this.polyDot.length;i++){
			res+=' '+this.polyDot[i].x+','+this.polyDot[i].y;
		}
		res+=' '+this.toX+','+this.toY;
		return res;
	};
	this.getLineLength=function(x1,y1,x2,y2){
		return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	};
	this.pointInObj=function(x,y){
		var res=false;
		x=EditorEvent.getX(x);
		y=EditorEvent.getY(y);
		var x1=this.fromX;
		var y1=this.fromY;
		var x2=this.toX;
		var y2=this.toY;
		var x21=x2-x1;
		var y21=y2-y1;
//		switch(this.shape){
//			case 'polyline':
//				for(var i=0;i<this.polyDot.length;i++){
//					x2=this.polyDot[i].x;
//					y2=this.polyDot[i].y;
//					x21=x2-x1;
//					y21=y2-y1;
//					if(x21==0){
//						res=(Math.abs(x-x1)<5)&&(Math.min(y1,y2)<=y)&&(Math.max(y1,y2)>=y);
//					}else if(y21==0){
//						res=(Math.abs(y-y1)<5)&&(Math.min(x1,x2)<=x)&&(Math.max(x1,x2)>=x);
//					}
//					if(res)break;
//					x1=x2;
//					y1=y2;
//				}
//				if(!res){
//					x2=this.toX;
//					y2=this.toY;
//					x21=x2-x1;
//					y21=y2-y1;
//					if(x21==0){
//						res=(Math.abs(x-x1)<5)&&(Math.min(y1,y2)<=y)&&(Math.max(y1,y2)>=y);
//					}else if(y21==0){
//						res=(Math.abs(y-y1)<5)&&(Math.min(x1,x2)<=x)&&(Math.max(x1,x2)>=x);
//					}
//				}
//				break;
//			case 'line':
				if(x21==0){
					res=(Math.abs(x-x1)<5)&&(Math.min(y1,y2)<=y)&&(Math.max(y1,y2)>=y);
				}else if(y21==0){
					res=(Math.abs(y-y1)<5)&&(Math.min(x1,x2)<=x)&&(Math.max(x1,x2)>=x);
				}else{
					res=(Math.min(y1,y2)<=y)&&(Math.max(y1,y2)>=y)&&(Math.min(x1,x2)<=x)
						&&(Math.max(x1,x2)>=x)&&((Math.abs(Math.floor((x21/y21)*(y-y1)+x1-x))<5)||(Math.abs(Math.floor((y21/x21)*(x-x1)+y1-y))<5));
				}
//				break;
//			default:
//		}
		return res;
	};
	this.pointInStroke=function(x,y){
		var res= -1;
		x=EditorEvent.getX(x);
		y=EditorEvent.getY(y);
		var x1=this.fromX;
		var x2=this.toX;
		var y1=this.fromY;
		var y2=this.toY;
		if((Math.abs(x2-x)<6)&&(Math.abs(y2-y)<6))res=0;
		if((Math.abs(x1-x)<6)&&(Math.abs(y1-y)<6))res=1;
		return res;
	};
	this.setSelected=function(){
		this.obj.strokecolor='green';
		if(this.textObj)this.textObj.style.color='green';
		this.selected=true;
		this.obj.style.zIndex='22';
	};
	this.move=function(){};
	this.moveEnd=function(){};
	this.setMoveSelected=function(){
		this.obj.strokecolor='red';
		if(this.textObj)this.textObj.style.color='green';
		this.selected=true;
		this.obj.style.zIndex='22';
	};
	this.clearSelected=function(){
		this.obj.strokecolor='blue';
		if(this.textObj)this.textObj.style.color='blue';
		this.selected=false;
		this.obj.style.zIndex='2';
	};
	this.remove=function(){
		var flowEditor=document.getElementById('flowEditor');
		flowEditor.removeChild(this.obj);
	};
/*	this.setProperty=function(type){
		Prop.clear();
		document.getElementById(type+'_p_id').innerHTML=this.id;
		document.getElementById(type+'_p_name').value=this.name;
		document.getElementById(type+'_p_pre').innerHTML=this.fromObj.name;
		document.getElementById(type+'_p_next').innerHTML=this.toObj.name;
		if(this.property){
			var num=this.property.length;
			for(var i=0;i<num;i++){
				switch(this.property[i].text){
					case 'span':
						document.getElementById(this.property[i].id).innerHTML=this.property[i].value;
						break;
					default:
						document.getElementById(this.property[i].id).value=this.property[i].value;
						break;
				}
			}
		}
	};
	this.getProperty=function(property){
		this.property=property;
		this.name=property.l_p_name;
		this.title=this.name;
	};*/
	this.toJson=function(){
		var json={
//			id:this.id,
//			name:this.name,
//			type:this.type,
//			shape:this.shape,
//			number:this.number,
//			from:this.fromObj.id,
//			to:this.toObj.id,
//			fromx:this.fromX,
//			fromy:this.fromY,
//			tox:this.toX,
//			toy:this.toY,
//			polydot:this.polyDot,
//			property:this.property
			
				LINKID:this.id,
				FROMNODE:this.fromObj.id,
				TONODE:this.toObj.id,
				FLOWTEMPID:flowtempid,
				ROUTECONDITION:this.routecondition
			
		};
		return json;
	};
	this.jsonTo=function(json){
//		this.id=json.id;
//		this.name=json.name;
//		this.type=json.type;
//		this.shape=json.shape;
//		this.number=json.number;
//		this.fromX=json.fromx;
//		this.fromY=json.fromy;
//		this.toX=json.tox;
//		this.toY=json.toy;
//		this.polyDot=json.polydot;
//		this.property=json.property;
		
		this.id=json.LINKID;
		this.name=json.FROMNODE;
		if(typeof json.ROUTECONDITION=='undefined'){
			this.routecondition ='';
		}else{
			this.routecondition = json.ROUTECONDITION;
		}		
		var flowEditor=document.getElementById('flowEditor');
		var Love=flowEditor.getAttribute('bindClass');
		var nodes=Love.nodes;
		var nodeNum=nodes.length;
		var node=null;
		for(var i=0;i<nodeNum;i++){
			node=nodes[i];
			if(node.id==json.FROMNODE){
				this.fromObj=node;
			}else if(node.id==json.TONODE){
				this.toObj=node;
			}
		}
	};
}

var WindowEvent={
	mouseDown:function(){
		var win=document.getElementById(this.pid);
		if (this.setCapture){
			this.setCapture();
		}else{
			window.captureEvents(this.MOUSEMOVE);
		}
		
		var winClass=win.getAttribute('bindClass');
		winClass.down();
	},
	mouseMove:function(){
		var win=document.getElementById(this.pid);
		var winClass=win.getAttribute('bindClass');
		winClass.move();
		return false;
	},
	mouseUp:function(){
		var win=document.getElementById(this.pid);
		var winClass=win.getAttribute('bindClass');
		winClass.up();
		if (this.releaseCapture){
			this.releaseCapture();
		}else{
			window.releaseEvents(this.MOUSEMOVE);
		}		
 
		document.getElementById('flowEditor').focus();
	}
};


JSON=new function(){
	this.decode=function(){     //json解码
		var filter,result,self,tmp;
		if($$("toString")){
			switch(arguments.length){
				case 2:
				self=arguments[0];
				filter=arguments[1];
				break;
				case 1:
				//alert(arguments[0]);
				if($[typeof arguments[0]](arguments[0])===Function){
					self=this;filter=arguments[0];
				}else self=arguments[0];
				break;
				default:
				self=this;
				break;
			};
			if(rc.test(self)){    //test() 方法被查找的字符串中是否指定存在模式。返回值是 true 或 false。
				try{
					result=e("(".concat(self,")"));				//利用eval解析JSON
					if(filter&&result!==null&&(tmp=$[typeof result](result))&&(tmp===Array||tmp===Object)){
						for(self in result)
							result[self]=v(self,result)?filter(self,result[self]):result[self];
					}
				}catch(z){}
			}else{
				throw new JSONError("bad data");
			}
		};
		return result;
	};
	this.encode=function(){				 //json编码,js对象转化成json数据格式
		var self=arguments.length?arguments[0]:this,result,tmp;
		if(self===null)result="null";
		else if(self!==undefined&&(tmp=$[typeof self](self))){
			switch(tmp){
				case Array:result=[];
					for(var i=0,j=0,k=self.length;j<k;j++){
						if(self[j]!==undefined&&(tmp=JSON.encode(self[j])))result[i++]=tmp;
					};
					result="[".concat(result.join(","),"]");
					break;
				case Boolean:result=String(self);
					break;
				case Date:
					result='"'.concat(self.getFullYear(),'-',d(self.getMonth()+1),'-',d(self.getDate()),'T',d(self.getHours()),':',		d(self.getMinutes()),':',d(self.getSeconds()),'"');
					break;
				case Function:
					break;
				case Number:
					result=isFinite(self)?String(self):"null";
					break;
				case String:
					result='"'.concat(self.replace(rs,s).replace(ru,u),'"');
					break;
				default:
					var i=0,key;result=[];
					for(key in self){
						if(self[key]!==undefined&&(tmp=JSON.encode(self[key])))
							result[i++]='"'.concat(key.replace(rs,s).replace(ru,u),'":',tmp);
					};
					result="{".concat(result.join(","),"}");
					break;
			}
		};
		return result;
	};
	this.toDate=function(){
		var self=arguments.length?arguments[0]:this,result;
		if(rd.test(self)){
			result=new Date;
			result.setHours(i(self,11,2));
			result.setMinutes(i(self,14,2));
			result.setSeconds(i(self,17,2));
			result.setMonth(i(self,5,2)-1);
			result.setDate(i(self,8,2));
			result.setFullYear(i(self,0,4));
		}else if(rt.test(self))
			result=new Date(self*1000);
		return result;
	};


	
	var c={"\b":"b","\t":"t","\n":"n","\f":"f","\r":"r",'"':'"',"\\":"\\","/":"/"},
	d=function(n){
		return n<10?"0".concat(n):n;
	},
	e=function(c,f,e){
		e=eval;
		delete eval;
		if(typeof eval==="undefined")eval=e;
		f=eval(""+c);
		eval=e;
		return f;
	},
	i=function(e,p,l){
		return 1*e.substr(p,l);
	},
	p=["","000","00","0",""],
	rc=null,
	rd=/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
	rs=/(\x5c|\x2F|\x22|[\x0c-\x0d]|[\x08-\x0a])/g,
	rt=/^([0-9]+|[0-9]+[,\.][0-9]{1,3})$/,
	ru=/([\x00-\x07]|\x0b|[\x0e-\x1f])/g,
	s=function(i,d){
		return "\\".concat(c[d]);
	},
	u=function(i,d){
		var n=d.charCodeAt(0).toString(16);
		return "\\u".concat(p[n.length],n);
	},
	v=function(k,v){
		return $[typeof result](result)!==Function&&(v.hasOwnProperty?v.hasOwnProperty(k):v.constructor.prototype[k]!==v[k]);
	},
	$={
		"boolean":function(){
			return Boolean;
		},
		"function":function(){
			return Function;
		},
		"number":function(){
			return Number;
		},
		"object":function(o){
			return o instanceof o.constructor?o.constructor:null;
		},
		"string":function(){
			return String;
		},
		"undefined":function(){
			return null;
		}
	},
	$$=function(m){
		function $(c,t){
			t=c[m];
			delete c[m];
			try{
				e(c);
			}catch(z){
				c[m]=t;return 1;
			}
		};
		return $(Array)&&$(Object);
	};
	try{
		rc=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$');
	}catch(z){
		rc=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/;
	}
};



function creatNewID(){
	var date = new Date();
	var now = "";
	now = date.getFullYear()+"";
	now = now + (date.getMonth()+1);
	now = now + date.getDate();
	now = now + date.getHours();
	now = now + date.getMinutes();
	now = now + date.getSeconds();
	now = now + date.getMilliseconds();
	return now;
}

function openBg(state) {
	if (state == 1) {
		document.getElementById("bg").style.display = "block";
		var h = document.body.offsetHeight > document.documentElement.offsetHeight ? document.body.offsetHeight
				: document.documentElement.offsetHeight;
		document.getElementById("bg").style.height = h + "px";
	} else {
		document.getElementById("bg").style.display = "none";
	}
}
function openSelect(state) {
	if (state == 1) {
		document.getElementById("selectItem").style.display = "block";
		document.getElementById("selectItem").style.left = (document.getElementById("bg").offsetWidth - document.getElementById("selectItem").offsetWidth)
				/ 2 + "px";
		document.getElementById("selectItem").style.top = document.body.scrollTop + 100 + "px";
	} else {
		document.getElementById("selectItem").style.display = "none";
	}
}
