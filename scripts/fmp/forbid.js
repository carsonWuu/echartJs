/***********************************
 * @文件描述：框架页面禁止操作控制的js
 *************************************/
function KeyDown(){   //屏蔽鼠标右键、Ctrl+n、shift+F10、F5刷新、退格键 
	//alert( "ASCII代码是： "+event.keyCode); 
	if   (
			 //屏蔽   Alt+   方向键   →        //屏蔽   Alt+   方向键   ← 
			(event.altKey)&& ((event.keyCode==37) ||(window.event.keyCode==39))||
			(event.keyCode==116)||                                   //屏蔽   F5   刷新键 
			(event.keyCode==112)||                                   //屏蔽   F1   刷新键 
			(event.keyCode==121)||                                   //屏蔽   F10   刷新键 
			(event.ctrlKey   &&   event.keyCode==82)||
			((event.ctrlKey)&&(event.keyCode==78))||				 //屏蔽   Ctrl+n 
			((event.shiftKey)&&(event.keyCode==121))||				 //屏蔽   shift+F10 
			(event.srcElement.tagName == "A " && event.shiftKey)|| //屏蔽   shift   加鼠标左键新开一网页
			((window.event.altKey)&&(window.event.keyCode==115))  //屏蔽Alt+F4 
	){    
		event.keyCode=0; 
		event.returnvalue=false; 
		return false;		
	}else if(event.keyCode == 8) {// 如果按下的是退格键
		// 如果是在textarea内不执行任何操作
		if(event.srcElement.tagName.toLowerCase() != "input"  && event.srcElement.tagName.toLowerCase() != "textarea")
			event.returnValue = false; 
		// 如果是readOnly或者disable不执行任何操作
		if(event.srcElement.readOnly == true || event.srcElement.disabled == true) 
			event.returnValue = false;                             
	}	
} 

 
if (false){
	document.oncontextmenu = function(){
		return false;
	};
	document.onkeydown=KeyDown;
}

