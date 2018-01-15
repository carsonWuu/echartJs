/////////////以下为ajax提交处理的js对象////////////////

var XMLHttp = {
	_objPool : [],
	_getInstance : function() {
		for ( var i = 0; i < this._objPool.length; i++) {
			if (this._objPool[i].readyState == 0
					|| this._objPool[i].readyState == 4) {
				return this._objPool[i];
			}
		}
		// IE5中不支持push方法
		this._objPool[this._objPool.length] = this._createObj();
		return this._objPool[this._objPool.length - 1];
	},
	
	_createObj : function() {
		var objXMLHttp = null;
		if (window.XMLHttpRequest) {
			objXMLHttp = new XMLHttpRequest();
		} else {
			var MSXML = ['MSXML2.XMLHTTP','MSXML2.XMLHTTP.8.0','MSXML2.XMLHTTP.7.0','MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
								'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
			for ( var n = 0; n < MSXML.length; n++) {
				try {
					objXMLHttp = new ActiveXObject(MSXML[n]);
					break;
				} catch (e) {
				}
			}
		}

		// mozilla某些版本没有readyState属性
		if (objXMLHttp.readyState == null) {
			objXMLHttp.readyState = 0;

			objXMLHttp.addEventListener("load", function() {
				objXMLHttp.readyState = 4;

				if (typeof objXMLHttp.onreadystatechange == "function") {
					objXMLHttp.onreadystatechange();
				}
			}, false);
		}
		return objXMLHttp;
	},
	message : null,
	htmlDecode : true,
	// 发送请求(方法[post,get], 地址, 数据, 回调函数 , 异步)
	sendReq : function(method, url, data, callback, XMLHttpbool, htmlDecode, extCallFunc) {
		XMLHttp.htmlDecode = true;
		var objXMLHttp = this._getInstance();
		with (objXMLHttp) {
				// 加随机数防止缓存
				if (url.indexOf("?") > 0) {
					url += "&";
				} else {
					url += "?";
				}
				if(url.indexOf("randnum=")==-1){
					url += "randnum=" + Math.random();
				}
				open(method, url, XMLHttpbool);//

				// 设定请求编码方式
				setRequestHeader('Content-Type',
						'application/x-www-form-urlencoded; charset=UTF-8');
				if (data) {
					send(data);
				} else {
					send();
				}
				onreadystatechange = function() {};
				
				
				if(XMLHttpbool){//异步处理
					onreadystatechange = function() {
						if (objXMLHttp.readyState == 4
								&& (objXMLHttp.status == 200 || objXMLHttp.status == 304)) {
							this.message = objXMLHttp.responseText;
							if (htmlDecode){
								// 将返回字符串用innerHTML转换，fix中文乱码 add by jgf。
								var newNode = document.createElement("xxxxtemp");
								newNode.innerHTML = this.message;
								this.message = newNode.innerHTML;
								this.message = trim(this.message);	
							} 
							newNode = null;
							var backStr = this.message;
							onreadystatechange = function() {};
							if (callback != null){
								callback(backStr);
								if (typeof extCallFunc != "undefined"){
									extCallFunc(window);
								}
								callback = null;
							}
							
						}
					};
				}else{//同步处理
					this.message = objXMLHttp.responseText;
					if (htmlDecode){
						// 将返回字符串用innerHTML转换，fix中文乱码 add by jgf。
						var newNode = document.createElement("xxxxtemp");
						newNode.innerHTML = this.message;
						this.message = newNode.innerHTML;
						this.message = trim(this.message);	
					} 
					newNode = null;	
					var backStr = this.message;
					if (callback != null){
						callback(backStr);
						if (typeof extCallFunc != "undefined"){
							extCallFunc(window);
						}						
						callback = null;
					}
				}
		}
	},
	
	/*
	 * 表单异步提交的方法
	 * form 表单
	 * 
	 * url 处理文件名
	 * 
	 * func 提交后的处理方法
	 * 
	 */
	formSubmit : function(form, url, func) {
		if (typeof form != 'object') {
			form = document.getElementById(form);
		}
		var data;
		if (form) {
			var ele = form.elements;
			var post = new Array();

			for ( var i = 0; i < ele.length; i++) {
				post[i] = ele[i].name + "=" + fmpEncodeUrlParam(ele[i].value); //encodeURI(
			}
			data = post.join('&');
		}
		var isSynchro = true;
		if (typeof func == "undefined"){
			isSynchro = false;
			func = function(msg){
					if (msg != null && msg != ""){
						showMessage(msg);
					}
				};
		};
		if (func==null){
			isSynchro = false;
		}		
		this.sendReq('post', url, data, func, isSynchro,XMLHttp.htmlDecode);
	},
	
	/**
	 * URL异步请求
	 * url  异步请求的URL
	 * backCallFunc  回调函数
	 * params  请求参数
	 * extCallFunc 扩展回调函数
	 */
	urlSubmit : function(url, backCallFunc,params, extCallFunc) {
		var isSameStep = true;
		if (typeof backCallFunc == "undefined"){
			isSameStep = false;
				backCallFunc = function(msg){
					if (msg != null && msg != ""){
						showMessage(msg);
					}
				};
		};
		if (backCallFunc==null){
			isSameStep = false;
		}
		this.sendReq('post', url, params, backCallFunc, isSameStep, XMLHttp.htmlDecode, extCallFunc);
	}
};

/**
 * 清除字符串两端空格
 * @param str
 * @return
 */
function trim(str){
	if (str == null){
		return str;
	}
	return str.replace(/(^\s*)|(\s*$)/g, "");
};




