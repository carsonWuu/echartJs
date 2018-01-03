/**
 * facet设计模式, 适应不同的浏览器，同时也加快程序开发,如decodeURI， option的生成
 */
var request = {
	getParameter : function(parameter) {
		var paraObj = {};
		if (location.href.indexOf("?") > 0) {
			var para = location.href.split("?")[1].split("&");
			for (var i = 0; i < para.length; i++) {
				if (para[i].indexOf("=") > 0) paraObj[para[i].split("=")[0]] = para[i].split("=")[1];
			}
		}
		return decodeURI(paraObj[parameter]);
	},	
	getPath : function() {
		return "http://" + location.href.split("/")[2] + "/" + location.href.split("/")[3];
		//return "D:/myEclipse5.5.1GA_workspace/pf/WebRoot/";
	} 
}

var util = {
	getViewportHeight: function(w){
		if (w.innerHeight != w.undefined) return w.innerHeight;
		if (w.document.compatMode == 'CSS1Compat') return w.document.documentElement.clientHeight;
		if (w.document.body) return w.document.body.clientHeight;
	},
	getViewportWidth: function(w){
		if (w.innerWidth != w.undefined) return w.innerWidth;
		if (w.document.compatMode == 'CSS1Compat') return w.document.documentElement.clientWidth;
		if (w.document.body) return w.document.body.clientWidth;
	},
	addEvent: function(obj, evType, fn) {
		if (obj.addEventListener) obj.addEventListener(evType, fn, false);
		else if (obj.attachEvent) obj.attachEvent("on" + evType, fn);
	},
	removeEvent: function(obj, evType, fn, useCapture){
		if (obj.removeEventListener) obj.removeEventListener(evType, fn, useCapture);
		else if (obj.detachEvent)obj.detachEvent("on" + evType, fn);
	}
}

var component = {
	createOption: function(id, valueArray, textArray) {
		document.getElementById(id).innerHTML = "";
		for (var i = 0; i < valueArray.length && valueArray != ''; i++) {
			var op = document.createElement("option");
			op.value = valueArray[i];
			op.innerHTML = textArray[i];
			document.getElementById(id).appendChild(op);
		}
	},
	appendOption: function(id, value, text) {
		var op = document.createElement("option");
		op.value = value;
		op.innerHTML = text;
		document.getElementById(id).appendChild(op);
	},	
	getOptionValues: function(id) {
		var value = [];
		var name = [];
		for (var i = 0; i < document.getElementById(id).length; i++) {
			value.push(document.getElementById(id).options[i].value);
			name.push(document.getElementById(id).options[i].text);
		}
		return [value, name];
	},
	removeOption: function(id) {
		for(var i = 0; i < document.getElementById(id).length; i++) {
			if (document.getElementById(id).options[i].selected) {
				document.getElementById(id).remove(i);
				i = -1;
			}
		}
	}
}
