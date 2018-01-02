/**
 * ichartjs  Library v1.0
 * http://www.ichartjs.cn/
 * Copyright 2012 wanghetommy@gmail.com
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.  
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 */
;(function(window){
var ua = navigator.userAgent.toLowerCase(),
	mc = function(e) {
		return e.test(ua)
	},ts = Object.prototype.toString,
        docMode = document.documentMode,
        isOpera = mc(/opera/),
        isChrome = mc(/\bchrome\b/),
        isWebKit = mc(/webkit/),
        isSafari = !isChrome && mc(/safari/),
        isIE = !isOpera && mc(/msie/),
        supportCanvas = !!document.createElement('canvas').getContext,
        isGecko = !isWebKit && mc(/gecko/),
        isFF = isGecko&&mc(/firefox/),
        isMobile = mc(/ipod|ipad|iphone|android/gi),
        isWindows = mc(/windows|win32/),
        isMac = mc(/macintosh|mac os x/),
        isLinux = mc(/linux/),
		arithmetic = {
			Linear: function(t,b,c,d){ return c*t/d + b; },
			Quad:{
				easeIn: function(t,b,c,d){
					return c*(t/=d)*t + b;
				},
				easeOut: function(t,b,c,d){
					return -c *(t/=d)*(t-2) + b;
				},
				easeInOut: function(t,b,c,d){
					if ((t/=d/2) < 1) return c/2*t*t + b;
					return -c/2 * ((--t)*(t-2) - 1) + b;
				}
			},
			Cubic:{
				easeIn: function(t,b,c,d){
					return c*(t/=d)*t*t + b;
				},
				easeOut: function(t,b,c,d){
					return c*((t=t/d-1)*t*t + 1) + b;
				},
				easeInOut: function(t,b,c,d){
					if ((t/=d/2) < 1) return c/2*t*t*t + b;
					return c/2*((t-=2)*t*t + 2) + b;
				}
			},
			Quart:{
				easeIn: function(t,b,c,d){
					return c*(t/=d)*t*t*t + b;
				},
				easeOut: function(t,b,c,d){
					return -c * ((t=t/d-1)*t*t*t - 1) + b;
				},
				easeInOut: function(t,b,c,d){
					if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
					return -c/2 * ((t-=2)*t*t*t - 2) + b;
				}
			},
			Bounce: {
				easeOut: function(t,b,c,d){
					if ((t/=d) < (1/2.75)) {
						return c*(7.5625*t*t) + b;
					} else if (t < (2/2.75)) {
						return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
					} else if (t < (2.5/2.75)) {
						return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
					} else {
						return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
					}
				}
			}
		};
var iChart_ = (function(window) {//spirit from jquery
	var isReady= false,
		readyBound= false,
		readyList=[],
		DOMContentLoaded = (function(){
			if ( document.addEventListener ) {
				return function() {
					document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
					ready();
				};
			} else if ( document.attachEvent ) {
				return function() {
					if ( document.readyState === "complete" ) {
						document.detachEvent( "onreadystatechange", DOMContentLoaded );
						ready();
					}
				};
			}
		})(),
		doScrollCheck = function () {
			if ( isReady ) {
				return;
			}
			try {
				document.documentElement.doScroll("left");
			} catch(e) {
				setTimeout( doScrollCheck, 1 );
				return;
			}
			ready();
		},
		ready = function() {
			if ( !isReady ) {
				isReady = true;
				for(var i =0;i<readyList.length;i++){
					readyList[i].call(document);
				}
				readyList = [];
			}
		},
		bindReady = function() {
			if ( readyBound ) return;
			readyBound = true;
			if ( document.readyState === "complete" ) {
				return setTimeout(ready,1);
			}
			if ( document.addEventListener ) {
				document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
				window.addEventListener( "load", ready, false );
			} else if ( document.attachEvent ) {
				document.attachEvent( "onreadystatechange", DOMContentLoaded );
				window.attachEvent( "onload", ready );
				var toplevel = false;
	
				try {
					toplevel = window.frameElement == null;
				} catch(e) {}
	
				if ( document.documentElement.doScroll && toplevel ) {
					doScrollCheck();
				}
			}
		},bind = function(fn){
			bindReady();
			if (isReady )
				fn.call( document, _ );
			else
				readyList.push( function() { return fn.call(this);});
		},_ = function(selector){
			if ( !selector || selector.nodeType ) {
				return selector;
			}
			if ( typeof selector === "string" ) {
				if(selector.indexOf("#")!=-1){
					selector = selector.substring(1);
				}
				return document.getElementById(selector);	
			}
			if ( typeof selector === "function" ) {
				bind( selector );
			}
		};
		
		_.apply = function(d, e) { 
			if (d && e && typeof e == "object") {
				for (var a in e) {
					if(typeof e[a]!='undefined')
					d[a] = e[a]
				}
			}
			if(!e&&d){
				var clone={};
				for (var a in d) {
					clone[a] = d[a]
				}
				return clone;
			}
			return d
		};
		/**
		 * only get the attr that target not exist
		 */
		_.applyIf = function(d, e) { 
			if (d && e && typeof e == "object") {
				for (var a in e) {
					if(typeof e[a]!='undefined'&&typeof d[a]=='undefined')
					d[a] = e[a]
				}
			}
			if(!e&&d){
				return _.apply(d);
			}
			return d
		};
		/**
		 * there will apply a deep clone
		 */
		_.merge = function(d, e, f) {
			if (d && e && typeof e == "object") {
				for (var a in e) {
					if(typeof e[a]!='undefined'){
						if(ts.apply(e[a]) === "[object Object]"){
							if(ts.apply(d[a]) === "[object Object]"){
								_.merge(d[a],e[a]);
							}else{
								d[a] = _.clone(e[a],true);
							}
						}else{
							d[a] = e[a]; 
						}
					}
				}
				if(typeof f == "object"){
					return _.merge(d,f);
				}
			}
			return d;
		};
		//get attribute that given
		_.clone = function(a,e,deep) {
			var d = {};
			if(ts.apply(a) === "[object Array]"&&ts.apply(e) === "[object Object]"){
				for(var i=0;i<a.length;i++){
					if(deep&&ts.apply(e[a[i]]) === "[object Object]")
						d[a[i]] = _.clone(e[a[i]]);
					else
						d[a[i]] = e[a[i]];
				}
			}else if(ts.apply(a) === "[object Object]"){
				for (var b in a) {
					//avoid recursion reference
					if(e&&ts.apply(a[b]) === "[object Object]"&&!(a[b] instanceof _.Painter))
						d[b] = _.clone(a[b],e);
					else
						d[b] = a[b];
				}
			}
			return d;
		};
		
		_.override = function(e, D) {
			if (D) {
				var C = e.prototype;
				_.apply(C, D);
				if (_.isIE && D.hasOwnProperty("toString")) {
					C.toString = D.toString
				}
			}
		};
		_.extend = function() { //spirit from ext2.0
					var C = function(E) {
						for (var D in E) {
							this[D] = E[D];
						}
					};
					var e = Object.prototype.constructor;
					return function(G,O) {
						var J = function() {
							G.apply(this, arguments);
						}
					var E = function() {
					}, H, D = G.prototype;
					E.prototype = D;
					H = J.prototype = new E();
					H.constructor = J;
					J.superclass = D;//the pointer to the superclass
					if (D.constructor == e) {
						D.constructor = G;
					}
					J.override = function(F) {
						_.override(J, F);
					};
					H.superclass = H.supr = (function() {
						return D;
					});
					H.override = C;
					_.override(J, O);
					J.extend = function(F) {
						return _.extend(J, F)
					};
					return J;
				}
		}();
		
		//*******************Math************************
		var sin = Math.sin, cos = Math.cos, atan=Math.atan,tan = Math.tan,acos = Math.acos,
			sqrt = Math.sqrt, abs = Math.abs,pi = Math.PI, pi2 = 2*pi,
			ceil=Math.ceil,round = Math.round,floor=Math.floor,max=Math.max,min=Math.min,
			pF = parseFloat,
			parseParam =  function(s,d) {
				if(_.isNumber(s))
					return new Array(s,s,s,s);
				s = s.replace( /^\s+|\s+$/g,"").replace(/\s{2,}/g,/\s/).replace(/\s/g,',').split(",");
				if(s.length==1){
					s[0] = s[1] = s[2] = s[3] = pF(s[0])||d;
				}else if(s.length==2){
					s[0] = s[2] = pF(s[0])||d;
					s[1] = s[3] = pF(s[1])||d;
				}else if(s.length==3){
					s[0] = pF(s[0])||d;
					s[1] = s[3] = pF(s[1])||d;
					s[2] = pF(s[2])||d;
				}else{
					s[0] = pF(s[0])||d;
					s[1] = pF(s[1])||d;
					s[2] = pF(s[2])||d;
					s[3] = pF(s[3])||d;
				}
			return s;
		},
		/**
		 * 如果是纯整数或者纯小数,返回靠近其最小数量级(1/5)的数
		 * 若有整数和小数,则按照整数部分确定parseInt(value)==value
		 */
		factor = function(v,f){
			if(v==0)return v;
			f = f || 5;
			if(parseInt(v)==0){
				return parseFloat((v/f+"").substring(0,(v+"").length+1));
			}
			return Math.ceil(v/f);
		},
		innerColor  = ["navy","olive","silver","gold","lime","fuchsia","aqua","green","red","blue","pink","purple","yellow","maroon","black","gray","white"],	
		colors = {
			navy:'rgb(0,0,128)',
			olive:'rgb(128,128,0)',
			orange:'rgb(255,165,0)',
			silver:'rgb(192,192,192)',
			white:'rgb(255,255,255)',
			gold:'rgb(255,215,0)',
			lime:'rgb(0,255,0)',
			fuchsia:'rgb(255,0,255)',
			aqua:'rgb(0,255,255)',
			green:'rgb(0,128,0)',
			gray:'rgb(80,80,80)',
			red:'rgb(255,0,0)',
			blue:'rgb(0,0,255)',
			pink:'rgb(255,192,203)',
			purple:'rgb(128,0,128)',
			yellow:'rgb(255,255,0)',
			maroon:'rgb(128,0,0)',
			black:'rgb(0,0,0)',
			azure:'rgb(240,255,255)',
			beige:'rgb(245,245,220)',
			brown:'rgb(165,42,42)',
			cyan:'rgb(0,255,255)',
			darkblue:'rgb(0,0,139)',
			darkcyan:'rgb(0,139,139)',
			darkgrey:'rgb(169,169,169)',
			darkgreen:'rgb(0,100,0)',
			darkkhaki:'rgb(189,183,107)',
			darkmagenta:'rgb(139,0,139)',
			darkolivegreen:'rgb(85,107,47)',
			darkorange:'rgb(255,140,0)',
			darkorchid:'rgb(153,50,204)',
			darkred:'rgb(139,0,0)',
			darksalmon:'rgb(233,150,122)',
			darkviolet:'rgb(148,0,211)',
			indigo:'rgb(75,0,130)',
			khaki:'rgb(240,230,140)',
			lightblue:'rgb(173,216,230)',
			lightcyan:'rgb(224,255,255)',
			lightgreen:'rgb(144,238,144)',
			lightgrey:'rgb(211,211,211)',
			lightpink:'rgb(255,182,193)',
			lightyellow:'rgb(255,255,224)',
			magenta:'rgb(255,0,255)',
			violet:'rgb(128,0,128)'
		},
		hex2Rgb = function(hex) {
			hex = hex.replace(/#/g,"").replace(/^(\w)(\w)(\w)$/,"$1$1$2$2$3$3");
			return  'rgb(' + parseInt(hex.substring(0, 2), 16) + ','
					+ parseInt(hex.substring(2, 4), 16) + ','
					+ parseInt(hex.substring(4, 6), 16) + ')';
		},
		i2hex=function (N) {
			return ('0'+parseInt(N).toString(16)).slice(-2);
		},
		rgb2Hex=function(rgb) {
			var m = rgb.match(/rgb\((\d+),(\d+),(\d+)\)/);
			return m?('#' + i2hex(m[1]) + i2hex(m[2]) + i2hex(m[3])).toUpperCase():null;
		},
		c2a=function(rgb){
			var result =  /rgb\((\w*),(\w*),(\w*)\)/.exec(rgb);
			if(result){
				return new Array(result[1],result[2],result[3]);
			}
			result =  /rgba\((\w*),(\w*),(\w*),(.*)\)/.exec(rgb);
			if(result){
				return new Array(result[1],result[2],result[3],result[4]);
			}
			throw new Error("invalid colors value '"+rgb+"'");
		},
		toHsv=function(r,g,b){
			if(_.isArray(r)){
				g = r[1];
				b = r[2];
				r = r[0];
			}
			r = r/255;
			g = g/255;
			b = b/255;
			var m  = max(max(r,g),b),
				mi  = min(min(r,g),b),
				dv = m - mi;
			if(dv == 0){
				return new Array(0,0,m);
			}
			var h;
			if(r==m){
				h = (g-b)/dv;
			}else if(g==m){
				h = (b-r)/dv + 2;
			}else if(b==m){
				h = (r-g)/dv + 4;
			}
			h*=60;
			if(h<0)h+=360;
			return new Array(h,dv/m,m);
		},
		toRgb=function (color) {
			color = color.replace(/\s/g,'').toLowerCase();
			//  Look for rgb(255,255,255)
			if (/rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)/.exec(color)){
				return color;
			}
			
			//Look for rgba(255,255,255,0.3)
			if (/rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0(\.[0-9])?|1(\.0)?)\)/.exec(color)){
				return color;
			}
			
			// Look for #a0b1c2 or #fff
			if (/#(([a-fA-F0-9]{6})|([a-fA-F0-9]{3}))/.exec(color))
				return hex2Rgb(color);
			// Look a string  for green
			if(colors[color])
				return colors[color];
			throw new Error("invalid colors value '"+color+"'");
		},
		hsv2Rgb=function(h,s,v,a){
			if(_.isArray(h)){
				a = s;
				s = h[1];
				v = h[2];
				h = h[0];
			}
			var r,g,b,hi,f;
				hi = floor(h/60)%6;
				f = h/60 - hi;
				p = v*(1-s);
			    q = v*(1-s*f);
			    t = v*(1-s*(1-f));
				 switch(hi) {
			      case 0:
			        r = v; g = t; b = p;
			        break;
			      case 1:
			        r = q; g = v; b = p;
			        break;
			      case 2:
			        r = p; g = v; b = t;
			        break;
			      case 3:
			        r = p; g = q; b = v;
			        break;
			      case 4:
			        r = t; g = p; b = v;
			        break;
			      case 5:
			        r = v; g = p; b = q;
			        break;
			    }
			return 'rgb'+(a?'a':'')+'('+round(r*255)+','+round(g*255)+','+round(b*255)+(a?','+a+')':')');
		},
		//the increment of s(v) of hsv model
		s_inc = 0,
		v_inc = 0.14,
		/**
		 * 当目标值>0.1时:以增量iv为上限、随着目标值的减小增量减小
		 * 当目标值<=0.1时:若指定的增量大于目标值则直接返回其1/2、否则返回增量值
		 */
		inc = function(v,iv){
			iv = iv || v_inc;
			if(v>0.5){
				return iv - (1-v)/10;
			}else if(v>0.1){
				return iv - 0.16 + v/5;
			}else{
				return v>iv?iv:v/2;
			}
		},
		/**
		 * 变色龙
		 * @param {Boolean} d true为变深,false为变浅
		 * @param {Object} rgb
		 * @param {Number} iv 明度(0-1)
		 * @param {Number} is 纯度(0-1)
		 */
		anole = function (d,rgb,iv,is) {
			rgb = c2a(toRgb(rgb));
			var hsv = toHsv(rgb);
			hsv[1] -=is||s_inc;
			if(d){
				hsv[2] -=inc(hsv[2],iv);
				hsv[1] = _.upTo(hsv[1],1);
				hsv[2] = _.lowTo(hsv[2],0);
			}else{
				hsv[2] +=inc((1-hsv[2]),iv);
				hsv[1] = _.lowTo(hsv[1],0);
				hsv[2] = _.upTo(hsv[2],1);
			}
			return hsv2Rgb(hsv,rgb[3]);
		};
		
		_.apply(_,{
			version : "1.0",
			email : 'wanghetommy@gmail.com',
			isEmpty : function(C, e) {
					return C === null || C === undefined
							|| ((_.isArray(C) && !C.length))
							|| (!e ? C === "" : false)
			},
			isArray : function(e) {
				return ts.apply(e) === "[object Array]"
			},
			isDate : function(e) {
				return ts.apply(e) === "[object Date]"
			},
			isObject : function(e) {
				return !!e
						&& ts.apply(e) === "[object Object]"
			},
			isFunction : function(e) {
				return ts.apply(e) === "[object Function]"
			},
			isNumber : function(e) {
				return typeof e === "number" && isFinite(e)
			},
			isString : function(e) {
				return typeof e === "string"
			},
			isBoolean : function(e) {
				return typeof e === "boolean"
			},
			isFalse : function(e) {
				return typeof e === "boolean" && !e;
			},
			isElement : function(e) {
				return e ? !!e.tagName : false
			},
			isDefined : function(e) {
				return typeof e !== "undefined"
			},
			getFont : function(w,s,f) {
				return w+" "+s+"px "+f;
			},
			/**
			 * obtain the Dom Document 
			 */
			getDoc : function() {
				var doc = window.contentWindow ? window.contentWindow.document : window.contentDocument ? window.contentDocument : window.document;
				return doc;
			},
			/**
			 * define the interface,the subclass must implement it
			 */
			DefineAbstract:function(M,H){
				if(!H[M])
					throw new Error("Cannot instantiate the type '"+H.type+"'.you must implements it with method '"+M+"'.");
			},
			getAnimationArithmetic:function(tf){
				if(tf=='linear')
					return arithmetic.Linear;
				if(tf=='bounce')
					return arithmetic.Bounce.easeOut;
				if(tf=='easeInOut'||tf=='easeIn'||tf=='easeOut')
				return arithmetic[_.DefaultAnimationArithmetic][tf];
				return arithmetic.Linear;                                   
			},
			/**
			 * simple noConflict implements
			 */
			noConflict: function( deep ) {
				return iChart_;
			},
			parseBorder:function(s,d) {
				return parseParam(s,d);	
			},
			parsePadding:function(s,d) {
				return parseParam(s,d);	
			},
			/**
			 * the distance of two point
			 */
			distanceP2P:function(x1,y1,x2,y2){
				return sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
			},
			/**
			 * the angle of two line that two point and x-axis positive direction,anticlockwise
			atanToAngle:function(ox,oy,x,y){
				if(ox==x){
					if(y>oy)return 90;
					return 270;
				}
				var quadrant = _.quadrant(ox,oy,x,y);
				var angle = _.radian2Angle(atan(abs((oy-y)/(ox-x))));
				if(quadrant==1){
					angle = 180 - angle;
				}else if(quadrant==2){
					angle = 180 + angle;
				}else if(quadrant==3){
					angle = 360 - angle;
				}
				return angle;
			},*/
			atan2Radian:function(ox,oy,x,y){
				if(ox==x){
					if(y>oy)return pi/2;
					return pi*3/2;
				}
				var q = _.quadrant(ox,oy,x,y);
				var r = atan(abs((oy-y)/(ox-x)));
				if(q==1){
					r = pi - r;
				}else if(q==2){
					r = pi + r;
				}else if(q==3){
					r = pi2 - r;
				}
				return r;
			},
			angle2Radian:function(a){
				return a*pi/180;
			},
			radian2Angle:function(r){
				return r*180/pi;
			},
			/**
			 * indicate angle in which quadrant,and it different from math's concept.this will return 0 if it in first quadrant(other eg.0,1,2,3)
			 */
			quadrant:function (ox,oy,x,y){
				if(ox<x){if(oy<y){return 3;}else{return 0;}}else{if(oy<y){return 2;}else{return 1;}}
			},
			quadrantd:function(a){
				return ceil(2*(a%(pi*2))/pi);
			},
			upTo:function (u,v){
				return v>u?u:v;
			},
			lowTo:function (l,v){
				return v<l?l:v;
			},
			between:function(l,u,v){
				return v>u?u:v<l?l:v;
			},
			inRange:function(l,u,v){
				return u>v&&l<v;
			},
			angleInRange:function(l,u,v){
				l = l%pi2;
				u  =  u%pi2;
				if(u>l){
					return u>v&&l<v;
				}
				if(u<l){
					return v <u || v >l;
				}
				return v ==u;
			},
			inRangeClosed:function(l,u,v){
				return u>=v&&l<=v;
			},
			inEllipse:function(x,y,a,b){
				return (x*x/a/a+y*y/b/b)<=1;
			},
			p2Point:function(x,y,a,C){
				return {
					x:x + cos(a)*C,
					y:y + sin(a)*C
				}
			},
			/**
			 * 计算空间点坐标矢量
			 * @param {Number} x
			 * @param {Number} y
			 */
			vectorP2P:function(x,y,radian){
				if(!radian){
					y = _.angle2Radian(y);
					x = _.angle2Radian(x);
				}
				y = sin(y);
				return {
					x:y*sin(x),
					y:y*cos(x)
				}
			},
			iGather : function(P){
				return (P||'ichartjs') + '-'+new Date().getTime().toString();
			},
			toPercent:function(v,d){
				return (v*100).toFixed(d)+'%';
			},
			parseFloat:function(v,d){
				if(!_.isNumber(v)){
					v = pF(v);
					if(!_.isNumber(v))
						throw new Error("'"+d+"'is not a valid number.");
				}
				return v;
			},
			/**
			 * 返回向上靠近一个数量级为f的数
			 */
			ceil:function(max,f){
				return max+factor(max,f);
			},
			/**
			 * 返回向下靠近一个数量级为f的数
			 */
			floor:function(max,f){
				return max-factor(max,f);
			},
			get:function(i){
			  return innerColor[i%16];
			},
			_2D:'2d',
			_3D:'3d',
			light:function (rgb,iv,is) {
				return anole(false,rgb,iv,is);
			},
			dark:function (rgb,iv,is) {
				return anole(true,rgb,iv,is);				
			},
			fixPixel: function(v) {
				return _.isNumber(v)?v:pF(v.replace('px',""))||0 ;
			},
			toPixel: function(v) {
				return _.isNumber(v)?v+'px':_.fixPixel(v)+'px';
			},
			emptyFn:function(){return true;},
			supportCanvas:supportCanvas,
			isOpera : isOpera,
			isWebKit : isWebKit,
			isChrome : isChrome,
			isSafari : isSafari,
			isIE : isIE,
			isGecko : isGecko,
			isFF:isFF,
			isLinux : isLinux,
			isMobile : isMobile,
			isWindows : isWindows,
			isMac : isMac,
			/**
			 * static variable
			 */
			FRAME:isMobile?24:54,
			DefaultAnimationArithmetic:'Cubic'
		});
		
		_.Assert = {
			gtZero:function (v,n){
				_.Assert.gt(v,0,n);
			},
			gt:function (v,c,n){
				if(!_.isNumber(v)&&v>=c)
					throw new Error(n+ " required Number gt "+c+",given:"+v);
			},
			isNumber:function(v,n){
				if(!_.isNumber(v))
					throw new Error(n+ " required Number,given:"+v);
			},
			isNotEmpty:function(v,cause){
				if(!v||v==''){
					throw new Error(" required not empty.cause:"+cause);
				}	
				if(_.isArray(v)&&v.length==0){
					throw new Error("required must has one element at least.cause:"+cause);
				}
			},
			isArray:function(v,n){
				if(!_.isArray(v))
					throw new Error(n +" required Array,given:"+v);
			},
			isFunction:function(v,n){
				if(!_.isFunction(v))
					throw new Error(n +" required Function,given:"+v);
			},
			isTrue:function(v,cause){
				if(v!==true)
					throw new Error(cause);
			},
			equal:function(v1,v2,cause){
				if(v1!==v2)
					throw new Error(cause);
			}
		};
		/**
		 * shim layer with setTimeout fallback
		 */
	    window.requestAnimFrame = (function(){
	      return  window.requestAnimationFrame       || 
	              window.webkitRequestAnimationFrame || 
	              window.mozRequestAnimationFrame    || 
	              window.oRequestAnimationFrame      || 
	              window.msRequestAnimationFrame     || 
	              function( callback ){
	                window.setTimeout(callback, 1000 / 60);
	              };
	    })();
		/**
		 * defined Event
		 */
		_.Event = {
				addEvent:function(ele,type,fn,useCapture){
				 	if (ele.addEventListener) 
					 	ele.addEventListener(type,fn,useCapture);
				 	else if (ele.attachEvent) 
				 		ele.attachEvent('on' + type, fn);
				 	else 
				 		ele['on' + type] = fn;
				},
			    fix: function( e ) { //inspire by jquery
					// Fix event for mise
					if(typeof(e) == 'undefined'){
						e = window.event;
					}
					// Fix target property, if necessary
					if ( !e.target ) {
						e.target = e.srcElement || document;
					}
									
					// Add relatedTarget, if necessary
					if ( !e.relatedTarget && e.fromElement ) {
						e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement;
					}
					
					// Calculate pageX/Y if missing and clientX/Y available
					if ( e.pageX == null && e.clientX != null ) {
						var doc = document.documentElement, body = document.body;
						e.pageX = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
						e.pageY = e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
					}
					
					// This is mainly for FF which doesn't provide offsetX
			        if (typeof(e.offsetX) == 'undefined' && typeof(e.offsetY) == 'undefined') {
				        // Browser not with offsetX and offsetY
				        if (typeof(e.offsetX) != 'number') {
				            var x = 0,y = 0,obj = e.target;
				            while (obj != document.body && obj) {
				                x += obj.offsetLeft;
				                y += obj.offsetTop;
				                obj = obj.offsetParent;
				            }
				            e.offsetX = e.pageX - x;
				            e.offsetY = e.pageY - y;
				        }
			        }
					
					// Add which for key events
					if ( e.which == null && (e.charCode != null || e.keyCode != null) ) {
						e.which = e.charCode != null ? e.charCode : e.keyCode;
					}
					
					// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
					if ( !e.metaKey && e.ctrlKey ) {
						e.metaKey = e.ctrlKey;
					}
					
					// Add which for click: 1 === left; 2 === middle; 3 === right
					// Note: button is not normalized, so don't use it
					if ( !e.which && e.button !== undefined ) {
						e.which = (e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) ));
					}
					
					// Any browser that doesn't implement stopPropagation() (MSIE)
			        if (!e.stopPropagation) {
			            e.stopPropagation = function () {window.event.cancelBubble = true;}
			        }
					return e;
				}
			};
	return _;
	
})(window);


/**
 * Add useful method
 */
Array.prototype.each = function(f,s)
{
	var j = this.length,r;for(var i=0;i<j;i++){r=s?f.call(s,this[i],i):f(this[i],i);if(typeof r === "boolean" && !r){break}};
};
Array.prototype.eachAll = function(f,s)
{
	this.each(function(d,i){if(iChart_.isArray(d)){d.eachAll(f, s);}else{s?f.call(s,d,i):f(d,i);}},s);
};
window.iChart = iChart_;
if(!window.$){
	window.$ = window.iChart;
}
})(window);

;(function($){
/**
 * @overview This is base class of all element.All must extend this so that has ability for configuration
 * this class include some base attribute
 * @component#$.Element
 * @extend#Object
 */
$.Element = function(config) {
	/**
	 * indicate the element's type
	 */
	this.type = 'element';

	/**
	 * define abstract method
	 */
	$.DefineAbstract('configure', this);
	$.DefineAbstract('afterConfiguration', this);

	/**
	 * All of the configuration will in this property
	 */
	this.options = {};

	this.set({
		/**
		 * @inner {String} The unique id of this element (defaults to an auto-assigned id).
		 */
		id : '',
		/**
		 * @cfg {Number} Specifies the font size of this element in pixels.(default to 12)
		 */
		fontsize : 12,
		/**
		 * @cfg {String} Specifies the font of this element.(default to 'Verdana')
		 */
		font : 'Verdana',
		/**
		 * @cfg {String} Specifies the font weight of this element.(default to 'normal')
		 */
		fontweight : 'normal',
		/**
		 * @cfg {Object} Specifies the border for this element.
		 * Available property are:
		 * @Option enable {boolean} If enable the border
		 * @Option color {String} the border's color.(default to '#BCBCBC')
		 * @Option style {String} the border's style.(default to 'solid')
		 * @Option width {Number/Array} the border's width.(default to 1)
		 * @Option radius {Number} the border's radius.(default to 5)
		 */
		border : {
			enable : false,
			color : '#BCBCBC',
			style : 'solid',
			width : 1,
			radius : 5
		},
		/**
		 * @cfg {Boolean} Specifies whether the element should be show a shadow.In general there will be get a high render speed when apply false.(default to false)
		 */
		shadow : false,
		/**
		 * @cfg {String} Specifies the color of your shadow is.(default to '#666666')
		 */
		shadow_color : '#666666',
		/**
		 * @cfg {Number} Specifies How blur you want your shadow to be.(default to 4)
		 */
		shadow_blur : 4,
		/**
		 * @cfg {Number} Specifies Horizontal distance (x-axis) between the shadow and the shape in pixel.(default to 0)
		 */
		shadow_offsetx : 0,
		/**
		 * @cfg {Number} Specifies Vertical distance (y-axis) between the shadow and the shape in pixel.(default to 0)
		 */
		shadow_offsety : 0
	});

	/**
	 * the running variable cache
	 */
	this.variable = {};

	/**
	 * the container of all events
	 */
	this.events = {};
	this.preventEvent = false;
	this.initialization = false;
	
	
	//this.registerEvent();
	/**
	 * inititalize configure
	 */
	this.configure.apply(this, Array.prototype.slice.call(arguments, 1));

	/**
	 * megre customize config
	 */
	this.set(config);

	this.afterConfiguration();
}

$.Element.prototype = {
	set : function(c) {
		if ($.isObject(c))
			$.merge(this.options, c);
	},
	pushIf : function(name, value) {
		if (!this.get(name)) {
			return this.push(name, value);
		}
		return this.get(name);
	},
	/**
	 * average write speed about 0.013ms
	 */
	push : function(name, value) {
		var A = name.split("."), V = this.options;
		for (i = 0; i < A.length - 1; i++) {
			if (!V[A[i]])
				V[A[i]] = {};
			V = V[A[i]];
		}
		V[A[A.length - 1]] = value;
		return value;
	},
	/**
	 * average read speed about 0.005ms
	 */
	get : function(name) {
		var A = name.split("."), V = this.options[A[0]];
		for (i = 1; i < A.length; i++) {
			if (!V)
				return null;
			V = V[A[i]];
		}
		return V;
	}
}

/**
 * @overview The interface this class defined include draw and event,so the sub class has must capability to draw and aware of event.
 * this class is a abstract class,so you should not try to initialize it.
 * @component#$.Painter
 * @extend#$.Element
 */
$.Painter = $.extend($.Element, {

	configure : function() {
		/**
		 * indicate the element's type
		 */
		this.type = 'painter';

		this.dimension = $._2D;

		/**
		 * define abstract method
		 */
		$.DefineAbstract('commonDraw', this);
		$.DefineAbstract('initialize', this);

		this.set({
			/**
			 * @cfg {Number} Specifies the default linewidth of the canvas's context in this element.(defaults to 1)
			 */
			brushsize : 1,
			/**
			 * @cfg {String} Specifies the default strokeStyle of the canvas's context in this element.(defaults to 'gray')
			 */
			strokeStyle : 'gray',
			/**
			 * @cfg {Number} Specifies the padding for this element in pixel,the same rule as css padding.(defaults to 10)
			 */
			padding : 10,
			/**
			 * @cfg {String} Specifies the font's color for this element.(defaults to 'black')
			 */
			color : 'black',
			/**
			 * @cfg {Number} Specifies Horizontal offset(x-axis) in pixel.(default to 0)
			 */
			offsetx : 0,
			/**
			 * @cfg {Number}Specifies Vertical distance (y-axis) in pixel.(default to 0)
			 */
			offsety : 0,
			/**
			 * @cfg {String} Specifies the backgroundColor for this element.(defaults to 'FDFDFD')
			 */
			background_color : '#FEFEFE',
			/**
			 * @cfg {float} Specifies the factor make color dark or light for this element,relative to background-color,the bigger the value you set,the larger the color changed.scope{0.01 - 0.5}.(defaults to '0.15')
			 */
			color_factor : 0.15,
			/**
			 * @inner {Boolean} True to apply the gradient.(default to false)
			 */
			gradient : false,
			/**
			 * @cfg {String} ('2d','3d')
			 */
			style : '',
			/**
			 * @cfg {Object} Here,specify as true by default
			 */
			border : {
				enable : true
			},
			/**
			 * @cfg {Object} A config object containing one or more event handlers.(default to null)
			 */
			listeners : null,
			/**
			 * @inner {Number} inner use
			 */
			originx : 0,
			/**
			 * @inner {Number} inner use
			 */
			originy : 0
		});

		this.variable.event = {
			mouseover : false
		};
		
		
		/**
		 * register the common event
		 */
		this.registerEvent(
		/**
		 * @event Fires after the element initializing is finished this is for test
		 * @paramter $.Painter#this
		 */
		'initialize',
		/**
		 * @event Fires when this element is clicked
		 * @paramter $.Painter#this
		 * @paramter EventObject#e The click event object
		 * @paramter Object#param The additional parameter
		 */
		'click',
		/**
		 * @event Fires when this element is dblclick
		 * @paramter $.Painter#this
		 * @paramter EventObject#e The dblclick event object
		 */
		'dblclick',
		/**
		 * @event Fires when the mouse move on the element
		 * @paramter $.Painter#this
		 * @paramter EventObject#e The mousemove event object
		 */
		'mousemove',
		/**
		 * @event Fires when the mouse hovers over the element
		 * @paramter $.Painter#this
		 * @paramter EventObject#e The mouseover event object
		 */
		'mouseover',
		/**
		 * @event Fires when the mouse exits the element
		 * @paramter $.Painter#this
		 * @paramter EventObject#e The mouseout event object
		 */
		'mouseout',
		/**
		 * @event Fires before the element drawing.Return false from an event handler to stop the draw.
		 * @paramter $.Painter#this
		 */
		'beforedraw',
		/**
		 * @event Fires after the element drawing when calling the draw method.
		 * @paramter $.Painter#this
		 */
		'draw');

	},
	afterConfiguration : function() {

	},
	registerEvent : function() {
		for ( var i = 0; i < arguments.length; i++) {
			this.events[arguments[i]] = [];
		}
	},
	init : function() {
		if (!this.initialization) {
			/**
			 * register event
			 */
			if ($.isObject(this.get('listeners'))) {
				for ( var e in this.get('listeners')) {
					this.on(e, this.get('listeners')[e]);
				}
			}

			this.initialize();
			/**
			 * fire the initialize event,this probable use to unit test
			 */
			this.fireEvent(this, 'initialize', [this]);
		}
	},
	is3D : function() {
		return this.dimension == $._3D;
	},
	/**
	 * @method The commnd fire to draw the chart use configuration,this is a abstract method.Currently known,both <link>$.Chart</link> and <link>$.Component</link> implement this method.
	 * @return void
	 */
	draw : function(o) {
		this.init();
		this.draw = function(o){
			/**
			 * fire the beforedraw event
			 */
			if (!this.fireEvent(this, 'beforedraw', [this])) {
				return this;
			}
			/**
			 * execute the commonDraw() that the subClass implement
			 */
			this.commonDraw(o);

			/**
			 * fire the draw event
			 */
			this.fireEvent(this, 'draw', [this]);
		}
		this.draw(o);
	},
	fireString : function(socpe, name, args, s) {
		var t = this.fireEvent(socpe, name, args);
		return $.isString(t) ? t : s;
	},
	fireEvent : function(socpe, name, args) {
		var L = this.events[name].length;
		if (L == 1)
			return this.events[name][0].apply(socpe, args);
		var r = true;
		for ( var i = 0; i < L; i++) {
			r = this.events[name][i].apply(socpe, args);
		}
		return r;
	},
	on : function(name, fn) {
		if ($.isString(name) && $.isFunction(fn))
			if(!this.events[name]){
				console.log(name);
			}
			this.events[name].push(fn);
		return this;
	},
	doConfig : function() {
		var padding = $.parsePadding(this.get('padding')), bg = this.get('background_color'), f = this.get('color_factor');
		this.push('padding_top', padding[0]);
		this.push('padding_right', padding[1]);
		this.push('padding_bottom', padding[2]);
		this.push('padding_left', padding[3]);
		this.push('hpadding', padding[1] + padding[3]);
		this.push('vpadding', padding[0] + padding[2]);
		this.push('fontStyle', $.getFont(this.get('fontweight'), this.get('fontsize'), this.get('font')));
		this.push('fill_color', bg);
		this.push("light_color", $.light(bg, f));
		this.push("dark_color", $.dark(bg, f));
		this.push("light_color2", $.light(bg, f * 2));
		this.push("dark_color2", $.dark(bg, f) * 2);
		this.id = this.get('id');

	}
});


/**
 * 
 * @overview this component use for 画图的基类、其他组件要继承此组件
 * @component#$.Html
 * @extend#$.Element
 */
$.Html = $.extend($.Element,{
	configure : function(T) {
		
		/**
		 * indicate the element's type
		 */
		this.type = 'html';
		
		this.T = T;
		
		/**
		 * define abstract method
		 */
		$.DefineAbstract('beforeshow',this);
		
		this.set({
			 animation:true,
			 /**
			  * @inner Specifies the width of this element in pixels.
			  */
			 width:0,
			 /**
			  * @inner Specifies the height of this element in pixels.
			  */
			 height:0,
			 /**
			 * @cfg {String} Custom style specification to be applied to this element.(default to '')
			 * like this:'padding:10px;font-size:12px'
			 */
			 style:'',
			 /**
			  * @inner The z-index of this element.(default to 999)
			  */
			 index:999,
			 /**
			  * @inner The top of this element.(default to 0)
			  */
			 offset_top:0,
			 /**
			  * @inner The left of this element.(default to 0)
			  */
			 offset_left:0
		});
		
		
		this.transitions = "";
	},
	afterConfiguration:function(){
		this.initialize();
	},
	initialize:function(){
		//the element's wrap
		this.wrap = this.get('wrap');
		this.dom = document.createElement("div");
		
		if(this.get('shadow')){
			this.css('boxShadow',this.get('shadow_offsetx')+'px '+this.get('shadow_offsety')+'px '+this.get('shadow_blur')+'px '+this.get('shadow_color'));
		}
		if(this.get('border.enable')){
			this.css('border',this.get('border.width')+"px "+this.get('border.style')+" "+this.get('border.color'));
			this.css('borderRadius',this.get('border.radius')+"px");
		}
		this.css('zIndex',this.get('index'));
		
		this.applyStyle();
	},
	width:function(){
		return this.dom.offsetWidth;
	},
	height:function(){
		return this.dom.offsetHeight;
	},
	onTransitionEnd:function(fn,useCapture){
		var type = 'transitionend';
		if($.isWebKit){
			type = 'webkitTransitionEnd';
		}else if($.isOpera){
			type = 'oTransitionEnd';
		}
		$.Event.addEvent(this.dom,type,fn,useCapture);
	},
	transition:function(v){
		this.transitions = this.transitions==''?v:this.transitions+','+v;
		if($.isWebKit){
			this.css('WebkitTransition',this.transitions);
		}else if($.isGecko){
			this.css('MozTransition',this.transitions);
		}else if($.isOpera){
			this.css('OTransition',this.transitions);
		}else{
			this.css('transition',this.transitions);
		}
	},
	show:function(e,m){
		this.beforeshow(e,m);
		this.css('visibility','visible');
	},
	hidden:function(e){
		this.css('visibility','hidden');
	},
	getDom:function(){
		return this.dom;
	},
	css:function(k,v){
		if($.isString(k))if($.isDefined(v))this.dom.style[k]=v;else return this.dom.style[k];
	},
	applyStyle:function(){
		var styles  = this.get('style').split(";"),style;
		for(var i = 0;i< styles.length;i++){
			style = styles[i].split(":");
			if(style.length>1)this.css(style[0],style[1]);
		}
	}
});


	/**
	 * @overview this component use for abc
	 * @component#$.Component
	 * @extend#$.Painter
	 */
	$.Component = $.extend($.Painter,{
		configure : function(c) {
			/**
			 * invoked the super class's configuration
			 */
			$.Component.superclass.configure.apply(this,arguments);
	
			/**
			 * indicate the element's type
			 */
			this.type = 'component';
	
			this.set({
				/**
				 * @inner {Boolean} Specifies the config of Tip.For details see <link>$.Tip</link>
				 * Note:this has a extra property named 'enable',indicate whether tip available(default to false)
				 */
				tip : {
					enable : false,
					border : {
						width : 2
					}
				}
			});
			
			/**
			 * If this element can split or contain others.(default to false)
			 */
			this.atomic = false;
			
			this.inject(c);
			
			this.final_parameter = {};
			
	
	},
	afterConfiguration:function(){
		this.init();
	},
	initialize : function() {
		if (!this.preventEvent)
			/**
			 * define abstract method
			 */
			$.DefineAbstract('isEventValid', this);
	
		$.DefineAbstract('doDraw', this);
	
		this.doConfig();
		this.initialization = true;
	},
	doConfig : function() {
		$.Component.superclass.doConfig.call(this);
		/**
		 * originx
		 */
		this.x = this.get('originx')+this.get('offsetx');
		/**
		 * 
		 * originy
		 */
		this.y = this.get('originy')+this.get('offsety');
		
		/**
		 * if have evaluate it
		 */
		this.data = this.get('data');
	
		$.Interface._3D.call(this);
		
		if (this.get('tip.enable')) {
			/**
			 * make tip's border in accord with sector
			 */
			this.pushIf('tip.border.color', this.get('background_color'));
	
			if (!$.isFunction(this.get('tip.invokeOffset')))
				/**
				 * indicate the tip must calculate position
				 */
				this.push('tip.invokeOffset', this.tipInvoke());
		}
	
	},
	isMouseOver : function(e) {
		return this.isEventValid(e);
	},
	//render ? named
	redraw : function() {
		this.container.draw();
	},
	commonDraw : function(opts) {
		// 转换中心坐标至当前目标坐标中心?
		// this.T.ctx.translate(this.x,this.y);
		/**
		 * execute the doDraw() that the subClass implement
		 */
		this.doDraw.call(this, opts);
	
	},
	inject : function(c) {
		if (c) {
			this.container = c;
			this.target = this.T = c.T;
		}
	}
	});
	$.Interface = function(){
		var simple = function(c,z) {
			var M=0,V=0,MI,ML=0;
			c.each(function(d,i){
				$.merge(d,this.fireEvent(this,'parseData',[this,d,i]));
				d.color = d.color || $.get(i);
				V  = d.value;
				if($.isNumber(V)){
					V = $.parseFloat(V,this.type+':data['+i+']');
					d.value = V;
					this.total+=V;
					M = V>M?V:M;
					if(!MI)
						MI = V;
					MI = V<MI?V:MI;
				}else if($.isArray(V)){
					var T = 0;
					ML = V.length>ML?V.length:ML;
					for(var j=0;j<V.length;j++){
						T+=V[j];
						if(!MI)
						MI = V;
						M = V[j]>M?V[j]:M;
						MI = V[j]<MI?V[j]:MI;
					}
					d.total = T;
				}
			},this);
			
			if($.isNumber(z)){
				Array.prototype.splice.apply(this.data,[z,0].concat(c));
			}else{
				this.data = this.data.concat(c);
			}
			
			if(this.get('minValue')){
				MI = this.get('minValue')<MI?this.get('minValue'):MI;
			}
			
			if(this.get('maxValue')){
				M = this.get('maxValue')<M?this.get('maxValue'):M;
			}
			
			if($.isArray(this.get('data_labels'))){
				ML = this.get('data_labels').length>ML?this.get('data_labels').length:ML;
			}
			
			this.push('maxItemSize',ML);
			this.push('minValue',MI);
			this.push('maxValue',M);
			this.push('total',this.total);
			
			return c;
		},
		complex = function(c,z){
			this.data_labels = this.get('data_labels');
			var M=0,MI=0,V,d,L=this.data_labels.length;
			
			this.data = this.data.concat(c);
			
			this.data.each(function(d,i){
				$.merge(d,this.fireEvent(this,'parseData',[this,d,i,this.data_labels]));
				$.Assert.equal(d.value.length,L,this.type+':data length and data_labels not corresponding.');
			},this);
			
			for(var i=0;i<L;i++){
				var item = [];
				for(var j=0;j<this.data.length;j++){
					d = this.data[j];
					V = d.value[i];
					d.value[i] = $.parseFloat(V,this.type+':data['+j+','+i+']');
					if(!d.color)
					d.color = $.get(j);
					//NEXT 此总数需考虑?
					this.total+=V;
					M = V>M?V:M;
					MI = V<MI?V:MI;
					
					item.push({
						name:d.name,
						value:d.value[i],
						color:d.color
					});
				}
				this.columns.push({
					name:this.data_labels[i],
					item:item
				});
			}
			
			
			
			this.push('minValue',MI); 
			this.push('maxValue',M);
			this.push('total',this.total);
		};
		return {
			parser:function(d,i){
				if(this.dataType=='simple'){
					return simple.call(this,[].concat(d),i);
				}else if(this.dataType=='complex'){
					complex.call(this,[].concat(d),i);
				}
			},
			_3D:function(){
				if(this.is3D()&&!this.get('xAngle_')){
					var P = $.vectorP2P(this.get('xAngle'),this.get('yAngle'));
					this.push('xAngle_',P.x);
					this.push('yAngle_',P.y);
				}
			},
			_2D:function(){
			},
			coordinate_:function(){
				if(this.dimension == $._2D){
					return new $.Coordinate2D($.apply({
						scale:{
							 position:this.get('scaleAlign'),	
							 max_scale:this.get('maxValue'),
							 min_scale:this.get('minValue')
						}
					},this.get('coordinate')),this);
				}else{
					this.push('coordinate.xAngle_',this.get('xAngle_'));
					this.push('coordinate.yAngle_',this.get('yAngle_'));
					
					//the Coordinate' Z is same as long as the column's
					this.push('coordinate.zHeight',this.get('zHeight')*this.get('bottom_scale'));
					
					return new $.Coordinate3D($.apply({
						scale:{
							 position:this.get('scaleAlign'),	
							 scaleAlign:this.get('scaleAlign'),	
							 max_scale:this.get('maxValue'),
							 min_scale:this.get('minValue')
						}
					},this.get('coordinate')),this);
				}
			},
			coordinate:function(){
				/**
				 * calculate  chart's measurement
				 */
				var w = this.pushIf('coordinate.width',this.get('client_width')*0.9),
					h=this.pushIf('coordinate.height',this.get('client_height')*0.9);
				
				if(this.get('coordinate.height')>this.get('client_height')){
					h = this.push('coordinate.height',this.get('client_height')*0.9);
				}
				if(this.get('coordinate.width')>this.get('client_width')){
					w = this.push('coordinate.width',this.get('client_width')*0.9);
				}
				
				/**
				 * calculate chart's alignment
				 */
				if (this.get('align') == 'left') {
					this.push('originx',this.get('l_originx'));
				}else if (this.get('align') == 'right'){
					this.push('originx',this.get('r_originx')-w);
				}else{
					this.push('originx',this.get('centerx')-w/2);
				}
				
				this.push('originx',this.get('originx')+this.get('offsetx'));
				this.push('originy',this.get('centery')-h/2+this.get('offsety'));
				
				if(!this.get('coordinate.valid_width')||this.get('coordinate.valid_width')>w){
					this.push('coordinate.valid_width',w);
				}
				
				if(!this.get('coordinate.valid_height')||this.get('coordinate.valid_height')>h){
					this.push('coordinate.valid_height',h);
				}
				
				/**
				 * originx for short
				 */
				this.x = this.get('originx');
				/**
				 * 
				 * originy for short 
				 */
				this.y = this.get('originy');
				
				this.push('coordinate.originx',this.x);
				this.push('coordinate.originy',this.y);
				
			}
		}	
	}();

 	/**
	 * @overview this component use for abc
	 * @component#$.Tip
	 * @extend#$.Element
	 */
	$.Tip = $.extend($.Html,{
		configure:function(){
			
			/**
			 * invoked the super class's configuration
			 */
			$.Tip.superclass.configure.apply(this,arguments);
			
			/**
			 * indicate the legend's type
			 */
			this.type = 'tip';
			
			this.set({
				/**
				 * @cfg {String} Specifies the text want to disply.(default to '')
				 */
				 text:'',
				 /**
				 * @cfg {String} Specifies the tip's type.(default to 'follow') Available value are:
				 * @Option follow
				 * @Option fixed
				 */
				 showType:'follow',
				 /**
				  * @cfg {Function} Specifies Function to calculate the position.(default to null)
				  */
				 invokeOffset:null,
				 /**
				 * @cfg {Number} Specifies the duration when fadeIn/fadeOut in millisecond.(default to 300)
				 */
				 fade_duration:300,
				 /**
				 * @cfg {Number} Specifies the duration when move in millisecond.(default to 100)
				 */
				 move_duration:100,
				 /**
				 * @cfg {Boolean} if calculate the position every time (default to false)
				 */
				 invokeOffsetDynamic:false,
				 /**
				 * @cfg {String} Specifies the css of this Dom.
				 */
				 style:'textAlign:left;padding:4px 5px;cursor:pointer;backgroundColor:rgba(239,239,239,.85);fontSize:12px;color:black;',
				 /**
				 * @cfg {Object} Override the default as enable = true
				 */
				 border:{
					enable:true
				 },
				 delay:200
			});
		},
		follow:function(e,m){
			var style = this.dom.style;
			if(this.get('invokeOffsetDynamic')){
				if(m.hit){
					if($.isString(m.text)||$.isNumber(m.text)){
						this.dom.innerHTML =  m.text;
					}
					var o = this.get('invokeOffset')(this.width(),this.height(),m);
					style.top =  o.top+"px";
					style.left = o.left+"px";
				}
			}else{
				if(this.get('showType')=='follow'){
					style.top = (e.offsetY-this.height()*1.1-2)+"px";
					style.left = (e.offsetX+2)+"px";
				}else if($.isFunction(this.get('invokeOffset'))){
					var o = this.get('invokeOffset')(this.width(),this.height(),m);
					style.top =  o.top+"px";
					style.left = o.left+"px";
				}else{
					style.top = (e.offsetY-this.height()*1.1-2)+"px";
					style.left = (e.offsetX+2)+"px";
				}
			}
		},
		text:function(text){
			this.dom.innerHTML = text;
		},
		beforeshow:function(e,m){
			this.follow(e,m);
		},
		show:function(e,m){
			this.beforeshow(e,m);
			this.css('visibility','visible');
			if(this.get('animation')){
				this.css('opacity',1);
			}
		},
		hidden:function(e){
			if(this.get('animation')){
				this.css('opacity',0);
			}else{
				this.css('visibility','hidden');
			}
		},
		initialize:function(){
			$.Tip.superclass.initialize.call(this);
			
			var _ = this;
			
			_.css('position','absolute');
			_.dom.innerHTML = _.get('text');
			
			_.hidden();
			
			if(_.get('animation')){
				var m =  _.get('move_duration')/1000+'s ease-in 0s';
				_.transition('opacity '+_.get('fade_duration')/1000+'s ease-in 0s');
				_.transition('top '+m);
				_.transition('left '+m);
				_.onTransitionEnd(function(e){
					if(_.css('opacity')==0){
						_.css('visibility','hidden');
					}
				},false);
			}
			
			_.wrap.appendChild(_.dom);
			
			_.T.on('mouseover',function(e,m){
				_.show(e,m);	
			}).on('mouseout',function(e,m){
				_.hidden(e);	
			});
			
			if(_.get('showType')=='follow'){
				_.T.on('mousemove',function(e,m){
					if(_.T.variable.event.mouseover){
						setTimeout(function(){
							if(_.T.variable.event.mouseover)
								_.follow(e,m);
						},_.get('delay'));
					}
				});
			}
			
		}
});// @end


	/**
	 * @overview this element simulate the crosshair on the coordinate.actually this composed of some div of html. 
	 * @component#$.CrossHair
	 * @extend#$.Html
	 */
	$.CrossHair = $.extend($.Html,{
		configure:function(){
		
			/**
			 * invoked the super class's configuration
			 */
			$.CrossHair.superclass.configure.apply(this,arguments);
			
			/**
			 * indicate the component's type
			 */
			this.type = 'crosshair';
			
			this.set({
				yAngle_ : undefined,
				/**
				 * @inner {Number} Specifies the position top,normally this will given by chart.(default to 0)
				 */
				 top:0,
				 /**
				 * @inner {Number} Specifies the position left,normally this will given by chart.(default to 0)
				 */
				 left:0,
				 /**
				 * @inner {Boolean} private use
				 */
				 hcross:true,
				  /**
				 * @inner {Boolean} private use
				 */
				 vcross:true,
				 /**
				 * @inner {Function} private use
				 */
				 invokeOffset:null,
				 /**
				 * @cfg {Number} Specifies the linewidth of the crosshair.(default to 1)
				 */
				 line_width:1,
				 /**
				 * @cfg {Number} Specifies the linewidth of the crosshair.(default to 1)
				 */
				 line_color:'#1A1A1A',
				 delay:200
			});
		},
		/**
		 * this function will implement at every target object,and this just default effect
		 */
		follow:function(e,m){
			if(this.get('invokeOffset')){
				var o = this.get('invokeOffset')(e,m);
				if(o&&o.hit){
					this.horizontal.style.top = (o.top-this.top)+"px";
					this.vertical.style.left = (o.left-this.left)+"px";
				}
			}else{
				/**
				 * set the 1px offset will make the line at the top left all the time
				 */
				this.horizontal.style.top = (e.offsetY-this.top-1)+"px";
				this.vertical.style.left = (e.offsetX-this.left-1)+"px";
			}
		},
		beforeshow:function(e,m){
			this.follow(e,m);
		},
		initialize:function(){
			$.CrossHair.superclass.initialize.call(this);
			
			var _ = this;
			
			_.top = $.fixPixel(_.get('top'));
			_.left = $.fixPixel(_.get('left'));
			
			_.dom = document.createElement("div");
			
			_.dom.style.zIndex=_.get('index');
			_.dom.style.position="absolute";
			/**
			 * set size zero make integration with vertical and horizontal
			 */
			_.dom.style.width= $.toPixel(0);
			_.dom.style.height=$.toPixel(0);
			_.dom.style.top=$.toPixel(_.get('top'));
			_.dom.style.left=$.toPixel(_.get('left'));
			_.css('visibility','hidden');
			
			_.horizontal = document.createElement("div");
			_.vertical = document.createElement("div");
			
			_.horizontal.style.width= $.toPixel(_.get('width'));
			_.horizontal.style.height= $.toPixel(_.get('line_width'));
			_.horizontal.style.backgroundColor = _.get('line_color');
			_.horizontal.style.position="absolute";
			
			_.vertical.style.width= $.toPixel(_.get('line_width'));
			_.vertical.style.height = $.toPixel(_.get('height'));
			_.vertical.style.backgroundColor = _.get('line_color');
			_.vertical.style.position="absolute";
			_.dom.appendChild(_.horizontal);
			_.dom.appendChild(_.vertical);
			
			if(_.get('shadow')){
				_.dom.style.boxShadow = _.get('shadowStyle');
			}
			
			_.wrap.appendChild(_.dom);
			
			_.T.on('mouseover',function(e,m){
				_.show(e,m);	
			}).on('mouseout',function(e,m){
				_.hidden(e,m);	
			}).on('mousemove',function(e,m){
				_.follow(e,m);
			});
			
		}
});// @end

/**
 * @overview this component use for abc
 * @component#$.Legend
 * @extend#$.Component
 */
$.Legend = $.extend($.Component, {
	configure : function() {
		/**
		 * invoked the super class's configuration
		 */
		$.Legend.superclass.configure.apply(this, arguments);

		/**
		 * indicate the legend's type
		 */
		this.type = 'legend';

		this.set({
			/**
			 * @cfg {Array} Required,The datasource of Legend.Normally,this will given by chart.(default to undefined)
			 */
			data : undefined,
			/**
			 * @cfg {Number} Specifies the width.Note if set to 'auto' will be fit the actual width.(default to 'auto')
			 */
			width : 'auto',
			/**
			 * @cfg {Number/String} Specifies the number of column.(default to 1) Note:If set to 'max',the list will be lie on the property row
			 */
			column : 1,
			/**
			 * @cfg {Number/String} Specifies the number of column.(default to 'max') Note:If set to 'max',the list will be lie on the property column
			 */
			row : 'max',
			/**
			 * @cfg {Number} Specifies the limited width.Normally,this will given by chart.(default to 0)
			 */
			maxwidth : 0,
			/**
			 * @cfg {Number} Specifies the lineheight when text display multiline.(default to 16)
			 */
			line_height : 16,
			/**
			 * @cfg {String} Specifies the shape of legend' sign (default to 'square') Available value are：
			 * @Option 'round'
			 * @Option 'square'
			 * @Option 'round-bar'
			 * @Option 'square-bar'
			 */
			sign : 'square',
			/**
			 * @cfg {Number} the size of legend' sign (default to 12)
			 */
			sign_size : 12,
			/**
			 * @cfg {Number} the distance of legend' sign and text (default to 5)
			 */
			sign_space : 5,
			/**
			 * @cfg {Number} Specifies the space between the sign and text.(default to 5)
			 */
			legend_space : 5,
			/**
			 * @cfg {Boolean} If true the text's color will accord with sign's.(default to false)
			 */
			text_with_sign_color : false,
			/**
			 * @cfg {String} Specifies the horizontal position of the legend in chart.(defaults to 'right').Available value are:
			 * @Option 'left'
			 * @Option 'center' Only applies when valign = 'top|bottom'
			 * @Option 'right'
			 */
			align : 'right',

			/**
			 * @cfg {String} this property specifies the vertical position of the legend in an module (defaults to 'middle'). Available value are:
			 * @Option 'top'
			 * @Option 'middle' Only applies when align = 'left|right'
			 * @Option 'bottom'
			 */
			valign : 'middle'
		});

		/**
		 * this element support boxMode
		 */
		this.atomic = true;

		this.registerEvent(
		/**
		 * @event Fires when parse this element'data.Return text value will override existing.
		 * @paramter $.Chart#this
		 * @paramter string#text the text will display
		 * @paramter int#i the index of data
		 * @return string
		 */
		'parse',
		/**
		 * @event Fires after raw was drawed
		 * @paramter $.Chart#this
		 * @paramter int#i the index of legend
		 */
		'drawRaw',
		/**
		 * @event Fires after a cell was drawed
		 * @paramter $.Chart#this
		 */
		'drawCell');

	},
	drawCell : function(x, y, text, color) {
		var s = this.get('sign_size'), n = this.get('sign');
		if (n == 'round') {
			this.T.round(x + s / 2, y + s / 2, s / 2, color);
		} else if (n == 'round-bar') {
			this.T.rectangle(x, y + s * 5 / 12, s, s / 6, color);
			this.T.round(x + s / 2, y + s / 2, s / 4, color);
		} else if (n == 'square-bar') {
			this.T.rectangle(x, y + s * 5 / 12, s, s / 6, color);
			this.T.rectangle(x + s / 4, y + s / 4, s / 2, s / 2, color);
		} else {
			this.T.rectangle(x, y, s, s, color);
		}
		var textcolor = this.get('color');

		if (this.get('text_with_sign_color')) {
			textcolor = color;
		}
		this.T.fillText(text, x + this.get('signwidth'), y + s / 2, this.get('textwidth'), textcolor);

		this.fireEvent(this, 'drawCell', [this]);
	},
	drawRow : function(suffix, x, y) {
		var d;
		for ( var j = 0; j < this.get('column'); j++) {
			d = this.data[suffix];
			if (suffix < this.data.length) {
				this.fireEvent(this, 'drawCell', [d]);
				this.drawCell(x, y, d.text, d.color);
				d.x = x;
				d.y = y;
			}
			x += this.columnwidth[j] + this.get('signwidth') + this.get('legend_space');
			suffix++;
		}
	},
	isEventValid : function(e) {
		var r = {
			valid : false
		};
		if (e.offsetX > this.x && e.offsetX < (this.x + this.width) && e.offsetY > this.y && e.offsetY < (this.y + this.height)) {
			this.data.each(function(d, i) {
				if (e.offsetX > d.x && e.offsetX < (d.x + d.width + this.get('signwidth')) && e.offsetY > d.y && e.offsetY < (d.y + this.get('line_height'))) {
					r = {
						valid : true,
						index : i,
						target : d
					}
				}
			}, this);
		}
		return r;
	},
	doDraw : function() {
		if (this.get('border.enable'))
			this.T.drawBorder(this.x, this.y, this.width, this.height, this.get('border.width'), this.get('border.color'), this.get('border.radius'), this.get('fill_color'), false, this.get('shadow'), this.get('shadow_color'), this.get('shadow_blur'), this.get('shadow_offsetx'),
					this.get('shadow_offsety'));

		this.T.textStyle('left', 'middle', $.getFont(this.get('fontweight'), this.get('fontsize'), this.get('font')));

		var x = this.x + this.get('padding_left'), y = this.y + this.get('padding_top'), text, c = this.get('column'), r = this.get('row');

		for ( var i = 0; i < r; i++) {
			this.drawRow(i * c, x, y);
			y += this.get('line_height');
			this.fireEvent(this, 'drawRaw', [this, i * c]);
		}
	},
	calculate : function(data, D) {
		this.data = data;

		var suffix = 0, maxwidth = w = this.get('width'), width = 0, wauto = (w == 'auto'), c = $.isNumber(this.get('column')), r = $.isNumber(this.get('row')), L = this.data.length, d, h, g = this.container;

		if (!c && !r)
			c = 1;

		if (c && !r)
			this.push('row', Math.ceil(L / this.get('column')));
		if (!c && r)
			this.push('column', Math.ceil(L / this.get('row')));

		c = this.get('column');
		r = this.get('row');

		if (L > r * c) {
			r += Math.ceil((L - r * c) / c);
			this.push('row', r);
		}

		this.columnwidth = new Array(c);

		if (wauto) {
			maxwidth = 0;// 行最大宽度
		}

		// calculate the width each item will used
		D.each(function(d, i) {
			$.merge(d,this.fireEvent(this, 'parse', [this, d.name, i]));
			d.text = d.text || d.name;
			d.width = this.T.measureText(d.text);
		}, this);
		
		// calculate the each column's width it will used
		for ( var i = 0; i < c; i++) {
			width = 0;
			suffix = i;
			while (suffix < L) {
				width = Math.max(width, this.data[suffix].width);
				suffix += c;
			}
			this.columnwidth[i] = width;
			maxwidth += width;
		}

		if (wauto) {
			w = this.push('width', maxwidth + this.get('hpadding') + this.get('signwidth') * c + (c - 1) * this.get('legend_space'));
		}

		if (w > this.get('maxwidth')) {
			w = this.push('width', this.get('maxwidth'));
		}

		this.push('textwidth', w - this.get('hpadding') - this.get('signwidth'));

		this.width = w;
		this.height = h = this.push('height', r * this.get('line_height') + this.get('vpadding'));

		if (this.get('valign') == 'top') {
			this.y = g.get('t_originy');
		} else if (this.get('valign') == 'bottom') {
			this.y = g.get('b_originy') - h;
		} else {
			this.y = g.get('centery') - h / 2;
		}

		if (this.get('align') == 'left') {
			this.x = g.get('l_originx');
		} else if (this.get('align') == 'center') {
			this.x = g.get('centerx') - this.get('textwidth') / 2;
		} else {
			this.x = g.get('r_originx') - w;
		}

		this.x = this.push('originx', this.x + this.get('offsetx'));
		this.y = this.push('originy', this.y + this.get('offsety'));
	},
	doConfig : function() {
		$.Legend.superclass.doConfig.call(this);
		$.Assert.isNotEmpty(this.get('data'), this.type + '[data]');

		var ss = this.get('sign_size'), g = this.container;

		this.T.textFont(this.get('fontStyle'));

		this.push('signwidth', (ss + this.get('sign_space')));

		if (this.get('line_height') < ss) {
			this.push('line_height', ss + ss / 5);
		}

		// if the position is incompatible,rectify it.
		if (this.get('align') == 'center' && this.get('valign') == 'middle') {
			this.push('valign', 'top');
		}

		// if this position incompatible with container,rectify it.
		if (g.get('align') == 'left') {
			if (this.get('valign') == 'middle') {
				this.push('align', 'right');
			}
		}

		this.calculate(this.data, this.data);

	}
});// @end

/**
 * @overview this component use for abc
 * @component#$.Label
 * @extend#$.Component
 */
$.Label = $.extend($.Component, {
	configure : function() {
		/**
		 * invoked the super class's configuration
		 */
		$.Label.superclass.configure.apply(this, arguments);

		/**
		 * indicate the legend's type
		 */
		this.type = 'legend';

		this.set({
			/**
			 * @cfg {String} Specifies the text of this label,Normally,this will given by chart.(default to '').
			 */
			text : '',
			/**
			 * @cfg {Number} Specifies the lineheight when text display multiline.(default to 16).
			 */
			line_height : 16,
			/**
			 * @cfg {Number} Specifies the thickness of line in pixel.(default to 1).
			 */
			line_thickness:1,
			/**
			 * @cfg {String} Specifies the shape of legend' sign (default to 'square').Available value are：
			 * @Option 'round'
			 * @Option 'square'
			 */
			sign : 'square',
			/**
			 * @cfg {Number} Specifies the size of legend' sign in pixel.(default to 12)
			 */
			sign_size : 12,
			/**
			 * @cfg {Number} Override the default as 5 in pixel.
			 */
			padding : 5,
			/**
			 * @cfg {Number} Override the default as 2 in pixel.
			 */
			offsety : 2,
			/**
			 * @cfg {Number} Specifies the space between the sign and text.(default to 5)
			 */
			sign_space : 5,
			/**
			 * @cfg {Number} Override the default as '#efefef'.
			 */
			background_color : '#efefef',
			/**
			 * @cfg {Boolean} If true the text's color will accord with sign's.(default to false)
			 */
			text_with_sign_color : false,
			/**
			 * @cfg {Object} Override the default as border.radius = 2
			 */
			border : {
				radius : 2
			}
		});

		/**
		 * this element support boxMode
		 */
		this.atomic = true;

		this.registerEvent();

	},
	isEventValid : function(e) {
		return {
			valid : $.inRange(this.labelx,this.labelx + this.get('width'), e.offsetX) && $.inRange(this.labely, this.labely + this.get('height'), e.offsetY)
		};
	},
	text : function(text) {
		if (text)
			this.push('text', text);
		this.push('width',this.T.measureText(this.get('text')) + this.get('hpadding') + this.get('sign_size') + this.get('sign_space'));
	},
	localizer:function(){
		var Q =  this.get('quadrantd');
		this.labelx = (Q>=2&&Q<=3)?(this.get('labelx') - this.get('width')):this.get('labelx');
        this.labely = Q>=3?(this.get('labely') - this.get('height')):this.get('labely');
	},
	doDraw : function() {
		this.localizer();
		
		var p = this.get('line_potins'),ss = this.get('sign_size'),
		x = this.labelx + this.get('padding_left'),
		y = this.labely +this.get('padding_top');
		
		this.T.lines(p,this.get('line_thickness'), this.get('border.color'),this.get('line_globalComposite'));
		
		this.T.drawBorder(this.labelx, this.labely, this.get('width'), this.get('height'), this.get('border.width'), this.get('border.color'), this.get('border.radius'), this.get('background_color'), false, this.get('shadow'), this.get('shadow_color'), this.get('shadow_blur'), this.get('shadow_offsetx'), this.get('shadow_offsety'));
		
		this.T.textStyle('left', 'top', this.get('fontStyle'));
		
		var textcolor = this.get('color');
		if (this.get('text_with_sign_color')) {
			textcolor = this.get('scolor');
		}
		if (this.get('sign') == 'square') {
			this.T.rectangle(x, y, ss, ss, this.get('scolor'), 1);
		} else {
			this.T.round(x + ss / 2, y + ss / 2, ss / 2, this.get('scolor'), 1);
		}
		this.T.fillText(this.get('text'), x + ss + this.get('sign_space'), y, this.get('textwidth'), textcolor);
	},
	doConfig : function() {
		$.Label.superclass.doConfig.call(this);

		this.T.textFont($.getFont(this.get('fontweight'), this.get('fontsize'), this.get('font')));
		
		this.push('height',this.get('line_height') + this.get('vpadding'));

		this.text();
		
		this.localizer();
		

	}
});// @end

	/**
	 * @overview this component use for abc
	 * @component#$.Text
	 * @extend#$.Component
	 */
	$.Text = $.extend($.Component,{
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Text.superclass.configure.apply(this,arguments);
			
			/**
			 * indicate the component's type
			 */
			this.type = 'text';
			
			this.set({
				/**
				 * @cfg {String} Specifies the text want to disply.(default to '')
				 */
				text:'',
				/**
				 * @cfg {String} Specifies the textAlign of html5.(default to 'center')
				 * Available value are:
				 * @Option start
				 * @Option end
				 * @Option left
				 * @Option right
				 * @Option center
				 */
				textAlign:'center',
				/**
				 * @cfg {String} Specifies the textBaseline of html5.(default to 'top')
				 * Available value are:
				 * @Option top
				 * @Option hanging
				 * @Option middle
				 * @Option alphabetic
				 * @Option ideographic
				 * @Option bottom
				 */
				textBaseline:'top',
				/**
				 * @cfg {Number} Specifies the maxwidth of text in pixels,if given 0 will not be limited.(default to 0)
				 */
				width:0,
				/**
				 * @cfg {Number} Specifies the maxheight of text in pixels,if given 0 will not be limited(default to 0)
				 */
				height:0,
				/**
				 * @cfg {String} Specifies the writing-mode of text.(default to 'lr') .
				 * Available value are:
				 * @Option 'lr'
				 */
				writingmode : 'lr',
				/**
				 * @cfg {Number} Specifies the lineheight when text display multiline.(default to 16).
				 */
				line_height : 16
			});
			
			this.registerEvent();
			
			/**
			 * indicate this component not need support event
			 */
			this.preventEvent = true;
		},
		doDraw:function(opts){
			if(this.get('text')!='')
			this.T.text(this.get('text'),this.x,this.y,false,this.get('color'),this.get('textAlign'),this.get('textBaseline'),this.get('fontStyle'));
		},
		doConfig:function(){
			$.Text.superclass.doConfig.call(this);
		}
});
;
(function($) {

	var inc = Math.PI / 90, PI = Math.PI, PI2 = 2 * Math.PI, sin = Math.sin, cos = Math.cos, fd = function(w, c) {
		return w <= 1 ? (Math.floor(c) + 0.5) : Math.floor(c);
	};
	/**
	 * @private support an improved API for drawing in canvas
	 */
	function Cans(c) {
		if (typeof c === "string")
			c = document.getElementById(c);
		if (!c || !c['tagName'] || c['tagName'].toLowerCase() != 'canvas')
			throw new Error("there not a canvas element");

		this.canvas = c;
		this.c = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;
	}

	Cans.prototype = {
		css : function(a, s) {
			if ($.isDefined(s))
				this.canvas.style[a] = s;
			else
				return this.canvas.style[a];
		},
		/**
		 * arc
		 */
		arc : function(x, y, r, s, e, c, b, bw, bc, sw, swc, swb, swx, swy, ccw, a2r, last) {
			var x0, y0, ccw = !!ccw, a2r = !!a2r;
			this.save();
			if (!!last)
				this.c.globalCompositeOperation = "destination-over";
			if (b)
				this.strokeStyle(bw, bc);
			this.shadowOn(sw, swc, swb, swx, swy).fillStyle(c);
			this.moveTo(x, y).beginPath();
			this.c.arc(x, y, r, s, e, ccw);
			if (a2r)
				this.lineTo(x, y);
			this.closePath().fill();
			if (b)
				this.stroke();
			return this.restore();
		},
		/**
		 * draw ellipse API
		 */
		ellipse : function(x, y, a, b, s, e, c, bo, bow, boc, sw, swc, swb, swx, swy, ccw, a2r, last) {
			var angle = s, ccw = !!ccw, a2r = !!a2r;
			this.save();
			if (!!last)
				this.c.globalCompositeOperation = "destination-over";
			if (b)
				this.strokeStyle(bow, boc);
			this.shadowOn(sw, swc, swb, swx, swy).fillStyle(c).moveTo(x, y).beginPath();
			
			if (a2r)
				this.moveTo(x, y);

			while (angle <= e) {
				this.lineTo(x + a * cos(angle), y + (ccw ? (-b * sin(angle)) : (b * sin(angle))));
				angle += inc;
			}
			this.lineTo(x + a * cos(e), y + (ccw ? (-b * sin(e)) : (b * sin(e)))).closePath();
			if (b)
				this.stroke();
			return this.fill().restore();
		},
		/**
		 * draw sector
		 */
		sector : function(x, y, r, s, e, c, b, bw, bc, sw, swc, swb, swx, swy, ccw) {
			if (sw) {
				/**
				 * fixed Chrome and Opera bug
				 */
				this.arc(x, y, r, s, e, c, b, bw, bc, sw, swc, swb, swx, swy, ccw, true);
				this.arc(x, y, r, s, e, c, b, bw, bc, false, swc, swb, swx, swy, ccw, true);
			} else {
				this.arc(x, y, r, s, e, c, b, bw, bc, false, 0, 0, 0, 0, ccw, true);
			}
			return this;
		},
		sector3D : function() {
			var x0, y0, sPaint = function(x, y, a, b, s, e, ccw, h, color) {
				if ((ccw && e <= PI) || (!ccw && s >= PI))
					return false;
				var Lo = function(A, h) {
					this.lineTo(x + a * cos(A), y + (h || 0) + (ccw ? (-b * sin(A)) : (b * sin(A))));
				};
				s = ccw && e > PI && s < PI ? PI : s;
				e = !ccw && s < PI && e > PI ? PI : e;
				var angle = s;
				this.fillStyle($.dark(color)).moveTo(x + a * cos(s), y + (ccw ? (-b * sin(s)) : (b * sin(s)))).beginPath();
				while (angle <= e) {
					Lo.call(this, angle);
					angle = angle + inc;
				}
				Lo.call(this, e);
				this.lineTo(x + a * cos(e), (y + h) + (ccw ? (-b * sin(e)) : (b * sin(e))));
				angle = e;
				while (angle >= s) {
					Lo.call(this, angle, h);
					angle = angle - inc;
				}
				Lo.call(this, s, h);
				this.lineTo(x + a * cos(s), y + (ccw ? (-b * sin(s)) : (b * sin(s)))).closePath().fill();
			}, layerDraw = function(x, y, a, b, ccw, h, A, color) {
				var x0 = x + a * cos(A);
				var y0 = y + h + (ccw ? (-b * sin(A)) : (b * sin(A)));
				this.moveTo(x, y).beginPath().fillStyle($.dark(color)).lineTo(x, y + h).lineTo(x0, y0).lineTo(x0, y0 - h).lineTo(x, y).closePath().fill();
			}, layerPaint = function(x, y, a, b, s, e, ccw, h, color) {
				var ds = ccw ? (s < PI / 2 || s > 1.5 * PI) : (s > PI / 2 && s < 1.5 * PI), de = ccw ? (e > PI / 2 && e < 1.5 * PI) : (e < PI / 2 || e > 1.5 * PI);
				if (!ds && !de)
					return false;
				if (ds)
					layerDraw.call(this, x, y, a, b, ccw, h, s, color);
				if (de)
					layerDraw.call(this, x, y, a, b, ccw, h, e, color);
			};
			return function(x, y, a, b, s, e, h, c, bo, bow, boc, sw, swc, swb, swx, swy, ccw, isw) {
				/**
				 * browser opera has bug when use destination-over and shadow
				 */
				sw = sw && !$.isOpera;
				this.save().fillStyle(c)
				this.c.globalCompositeOperation = "destination-over";
				/**
				 * paint inside layer
				 */
				layerPaint.call(this, x, y, a, b, s, e, ccw, h, c);
				/**
				 * paint bottom layer
				 */
				this.ellipse(x, y + h, a, b, s, e, c, bo, bow, boc, sw, swc, swb, swx, swy, ccw, true);
				this.c.globalCompositeOperation = "source-over";

				/**
				 * paint top layer var g = this.avgRadialGradient(x,y,0,x,y,a,[$.light(c,0.1),$.dark(c,0.05)]);
				 */
				this.ellipse(x, y, a, b, s, e, c, bo, bow, boc, false, swc, swb, swx, swy, ccw, true);
				/**
				 * paint outside layer
				 */
				sPaint.call(this, x, y, a, b, s, e, ccw, h, c);

				return this.restore();;
			}
		}(),
		
		textStyle : function(a, l, f) {
			return this.textAlign(a).textBaseline(l).textFont(f);
		},
		strokeStyle : function(w, c, j) {
			if (w)
				this.c.lineWidth = w;
			if (c)
				this.c.strokeStyle = c;
			if (j)
				this.c.lineJoin = j;
			return this;
		},
		globalAlpha : function(v) {
			if (v)
				this.c.globalAlpha = v;
			return this;
		},
		fillStyle : function(c) {
			if (c)
				this.c.fillStyle = c;
			return this;
		},
		textAlign : function(a) {
			if (a)
				this.c.textAlign = a;
			return this;
		},
		textBaseline : function(l) {
			if (l)
				this.c.textBaseline = l;
			return this;
		},
		textFont : function(font) {
			if (font)
				this.c.font = font;
			return this;
		},
		shadowOn : function(s, c, b, x, y) {
			if ($.isString(s)) {
				y = x;
				x = b;
				b = c;
				c = s;
				c = true;
			}
			if (s) {
				this.c.shadowColor = c;
				this.c.shadowBlur = b;
				this.c.shadowOffsetX = x;
				this.c.shadowOffsetY = y;
			}
			return this;
		},
		shadowOff : function() {
			this.c.shadowColor = 'white';
			this.c.shadowBlur = this.c.shadowOffsetX = this.c.shadowOffsetY = 0;
		},
		avgLinearGradient : function(xs, ys, xe, ye, c) {
			var g = this.createLinearGradient(xs, ys, xe, ye);
			for ( var i = 0; i < c.length; i++)
				g.addColorStop(i / (c.length - 1), c[i]);
			return g;
		},
		createLinearGradient : function(xs, ys, xe, ye) {
			return this.c.createLinearGradient(xs, ys, xe, ye);
		},
		avgRadialGradient : function(xs, ys, rs, xe, ye, re, c) {
			var g = this.createRadialGradient(xs, ys, rs, xe, ye, re);
			for ( var i = 0; i < c.length; i++)
				g.addColorStop(i / (c.length - 1), c[i]);
			return g;
		},
		createRadialGradient : function(xs, ys, rs, xe, ye, re) {
			return this.c.createRadialGradient(xs, ys, rs, xe, ye, re);
		},
		fillText : function(t, x, y, max, color, mode, lineheight) {
			t = t + "";
			max = max || false;
			mode = mode || 'lr';
			lineheight = lineheight || 16;
			this.fillStyle(color);
			var T = t.split(mode == 'tb' ? "" : "\n");
			T.each(function(t) {
				try {
				if (max)
					this.c.fillText(t, x, y, max);
				else
					this.c.fillText(t, x, y);
				y += lineheight;
				} catch (e) {
					console.log(e.message+'['+t+','+x+','+y+']');
				}
			}, this);
			return this;
		},
		measureText : function(text) {
			return this.c.measureText(text).width;
		},
		moveTo : function(x, y) {
			x = x || 0;
			y = y || 0;
			this.c.moveTo(x, y);
			return this;
		},
		lineTo : function(x, y) {
			x = x || 0;
			y = y || 0;
			this.c.lineTo(x, y);
			return this;
		},
		save : function() {
			this.c.save();
			return this;
		},
		restore : function() {
			this.c.restore();
			return this;
		},
		beginPath : function() {
			this.c.beginPath();
			return this;
		},
		closePath : function() {
			this.c.closePath();
			return this;
		},
		stroke : function() {
			this.c.stroke();
			return this;
		},
		fill : function() {
			this.c.fill();
			return this;
		},
		text : function(text, x, y, max, color, align, line, font, mode, lineheight) {
			this.save();
			this.textStyle(align, line, font);
			this.fillText(text, x, y, max, color, mode, lineheight);
			this.c.restore();
			return this;
		},
		/**
		 * can use cube3D instead of this?
		 */
		cube : function(x, y, xv, yv, width, height, zdeep, bg, b, bw, bc, sw, swc, swb, swx, swy) {
			x = fd(bw, x);
			y = fd(bw, y);
			zdeep = (zdeep && zdeep > 0) ? zdeep : width;
			var x1 = x + zdeep * xv, y1 = y - zdeep * yv;
			x1 = fd(bw, x1);
			y1 = fd(bw, y1);
			/**
			 * styles -> top-front-right
			 */
			if (sw) {
				this.polygon(bg, b, bw, bc, sw, swc, swb, swx, swy, false, [x, y, x1, y1, x1 + width, y1, x + width, y]);
				this.polygon(bg, b, bw, bc, sw, swc, swb, swx, swy, false, [x, y, x, y + height, x + width, y + height, x + width, y]);
				this.polygon(bg, b, bw, bc, sw, swc, swb, swx, swy, false, [x + width, y, x1 + width, y1, x1 + width, y1 + height, x + width, y + height]);
			}
			/**
			 * clear the shadow on the body
			 */
			this.polygon($.dark(bg), b, bw, bc, false, swc, swb, swx, swy, false, [x, y, x1, y1, x1 + width, y1, x + width, y]);
			this.polygon(bg, b, bw, bc, false, swc, swb, swx, swy, false, [x, y, x, y + height, x + width, y + height, x + width, y]);
			this.polygon($.dark(bg), b, bw, bc, false, swc, swb, swx, swy, false, [x + width, y, x1 + width, y1, x1 + width, y1 + height, x + width, y + height]);
			return this;
		},
		/**
		 * cube3D
		 * 
		 * @param {Number}
		 *            x 左下角前面x坐标
		 * @param {Number}
		 *            y 左下角前面y坐标
		 * @param {Number}
		 *            rotatex x旋转值,默认角度为单位
		 * @param {Number}
		 *            rotatey y旋转值,默认角度为单位
		 * @param {Number}
		 *            width 宽度
		 * @param {Number}
		 *            height 高度
		 * @param {Number}
		 *            zh z轴长
		 * @param {Number}
		 *            border 边框
		 * @param {Number}
		 *            linewidth
		 * @param {String}
		 *            bcolor
		 * @param {Array}
		 *            styles 立方体各个面样式,包含:{alpha,color},共六个面
		 * @return this
		 */
		cube3D : function(x, y, rotatex, rotatey, angle, w, h, zh, b, bw, bc, styles) {
			/**
			 * styles -> 下底-底-左-右-上-前
			 */
			x = fd(bw, x);
			y = fd(bw, y);
			zh = (!zh || zh == 0) ? w : zh;

			if (angle) {
				var P = $.vectorP2P(rotatex, rotatey);
				rotatex = x + zh * P.x, rotatey = y - zh * P.y;
			} else {
				rotatex = x + zh * rotatex, rotatey = y - zh * rotatey;
			}

			while (styles.length < 6)
				styles.push(false);

			rotatex = fd(bw, rotatex);
			rotatey = fd(bw, rotatey);

			var side = [];

			if (rotatey < 0) {
				if ($.isObject(styles[4]))
					side.push($.applyIf({
						points : [x, y - h, rotatex, rotatey - h, rotatex + w, rotatey - h, x + w, y - h]
					}, styles[4]));
			} else {
				if ($.isObject(styles[0]))
					side.push($.applyIf({
						points : [x, y, rotatex, rotatey, rotatex + w, rotatey, x + w, y]
					}, styles[0]));
			}

			if ($.isObject(styles[1]))
				side.push($.applyIf({
					points : [rotatex, rotatey, rotatex, rotatey - h, rotatex + w, rotatey - h, rotatex + w, rotatey]
				}, styles[1]));

			if ($.isObject(styles[2]))
				side.push($.applyIf({
					points : [x, y, x, y - h, rotatex, rotatey - h, rotatex, rotatey]
				}, styles[2]));

			if ($.isObject(styles[3]))
				side.push($.applyIf({
					points : [x + w, y, x + w, y - h, rotatex + w, rotatey - h, rotatex + w, rotatey]
				}, styles[3]));

			if (rotatey < 0) {
				if ($.isObject(styles[0]))
					side.push($.applyIf({
						points : [x, y, rotatex, rotatey, rotatex + w, rotatey, x + w, y]
					}, styles[0]));
			} else {
				if ($.isObject(styles[4]))
					side.push($.applyIf({
						points : [x, y - h, rotatex, rotatey - h, rotatex + w, rotatey - h, x + w, y - h]
					}, styles[4]));
			}

			if ($.isObject(styles[5]))
				side.push($.applyIf({
					points : [x, y, x, y - h, x + w, y - h, x + w, y]
				}, styles[5]));

			side.each(function(s) {
				this.polygon(s.color, b, bw, bc, s.shadow, s.shadowColor, s.blur, s.sx, s.sy, s.alpha, s.points);
			}, this);

			return this;
		},
		/**
		 * polygon
		 * 
		 * @param {Object}
		 *            border
		 * @param {Object}
		 *            linewidth
		 * @param {Object}
		 *            bcolor
		 * @param {Object}
		 *            bgcolor
		 * @param {Object}
		 *            alpham
		 * @param {Object}
		 *            points
		 * @memberOf {TypeName}
		 * @return {TypeName}
		 */
		polygon : function(bg, b, bw, bc, sw, swc, swb, swx, swy, alpham, points) {
			if (points.length < 2)
				return;
			this.save()
			.strokeStyle(bw, bc)
			.beginPath()
			.fillStyle(bg)
			.globalAlpha(alpham)
			.shadowOn(sw, swc, swb, swx, swy)
			.moveTo(points[0], points[1]);
			for ( var i = 2; i < points.length; i += 2)
				this.lineTo(points[i], points[i + 1]);
			this.closePath();
			if (b)
				this.stroke();
			this.fill().restore();
			return this;
		},
		lines : function(p, w, c, last) {
			if(p.length<4)return this;
			this.save();
			if (!!last)
				this.c.globalCompositeOperation = "destination-over";
			this.beginPath().strokeStyle(w, c).moveTo(fd(w,p[0]),fd(w,p[1]));
			for ( var i = 2; i < p.length - 1; i+=2) {
				this.lineTo(fd(w,p[i]),fd(w,p[i+1]));                
			}
			return this.stroke().restore();
		},
		line : function(x1, y1, x2, y2, w, c, last) {
			if (!w || w == 0)
				return this;
			this.save();
			if (!!last)
				this.c.globalCompositeOperation = "destination-over";
			return this.beginPath().strokeStyle(w, c).moveTo(fd(w, x1), fd(w, y1)).lineTo(fd(w, x2), fd(w, y2)).stroke().restore();
		},
		round : function(x, y, r, c, bw, bc) {
			return this.arc(x, y, r, 0, PI2, c, !!bc, bw, bc);
		},
		fillRect:function(x, y, w, h){
			this.c.fillRect(x, y, w, h);
			return this;
		},
		translate:function(x, y){
			this.c.translate(x, y);
			return this;
		},
		backgound : function(x, y, w, h, bgcolor) {
			this.save();
			this.c.globalCompositeOperation = "destination-over";
			return this.translate(x, y).beginPath().fillStyle(bgcolor).fillRect(0, 0, w, h).restore();
		},
		rectangle : function(x, y, w, h, bgcolor, border, linewidth, bcolor, sw, swc, swb, swx, swy) {
			this.save().translate(fd(linewidth, x), fd(linewidth, y)).beginPath().fillStyle(bgcolor).shadowOn(sw, swc, swb, swx, swy);
			if (border && $.isNumber(linewidth)) {
				this.strokeStyle(linewidth,bcolor);
				this.c.strokeRect(0, 0, w, h);
			}
			
			if(bgcolor)
			this.fillRect(0, 0, w, h);

			if (border && $.isArray(linewidth)) {
				this.strokeStyle(null,bcolor)
				.line(0, 0, w, 0, linewidth[0], bcolor)
				.line(w, 0, w, h, linewidth[1], bcolor)
				.line(0, h, w, h, linewidth[2], bcolor)
				.line(0, 0, 0, h, linewidth[3], bcolor);
			}
			return this.restore();
		},
		clearRect : function(x, y, w, h) {
			x = x || 0;
			y = y || 0;
			w = w || this.width;
			h = h || this.height;
			this.c.clearRect(x, y, w, h);
			return this;
		},
		drawBorder : function(x, y, w, h, line, color, round, bgcolor, last, shadow, scolor, blur, offsetx, offsety) {
			this.save();
			var x0 = fd(line, x);
			var y0 = fd(line, y);
			if (x0 != x) {
				x = x0;
				w -= 1;
			}
			if (y0 != y) {
				y = y0;
				h -= 1;
			}
			this.translate(x, y).strokeStyle(line,color);
			if (!!last) {
				this.c.globalCompositeOperation = "destination-over";
			}
			if (bgcolor) {
				this.fillStyle(bgcolor);
			}

			round = round == 0 ? 0 : $.parseBorder(round);

			/**
			 * draw a round corners border
			 */
			if ($.isArray(round)) {
				this.beginPath()
				.moveTo(round[0], 0)
				.lineTo(w - round[1], 0);
				this.c.arcTo(w, 0, w, round[1], round[1]);
				this.lineTo(w, h - round[2]);
				this.c.arcTo(w, h, w - round[2], h, round[2]);
				this.lineTo(round[3], h);
				this.c.arcTo(0, h, 0, h - round[3], round[3]);
				this.lineTo(0, round[0]);
				this.c.arcTo(0, 0, round[0], 0, round[0]);
				this.closePath().shadowOn(shadow, scolor, blur, offsetx, offsety);
				if (bgcolor) {
					this.fill();
				}
				if (shadow)
					this.shadowOff();
				this.c.globalCompositeOperation = "source-over";

				this.stroke();
			} else {
				/**
				 * draw a rectangular border
				 */
				this.shadowOn(shadow, scolor, blur, offsetx, offsety);
				if (bgcolor) {
					this.fillRect(0, 0, w, h);
				}
				if (shadow)
					this.shadowOff();
				this.c.strokeRect(0, 0, w, h);
			}
			return this.restore();
		},
		toImageURL : function() {
			return this.canvas.toDataURL("image/png");
		},
		addEvent : function(type, fn, useCapture) {
			$.Event.addEvent(this.canvas, type, fn, useCapture);
		}

	}

	/**
	 * @overview this component use for abc
	 * @component#$.Chart
	 * @extend#$.Painter
	 */
	$.Chart = $.extend($.Painter, {
		/**
		 * @cfg {TypeName}
		 */
		configure : function() {
			/**
			 * invoked the super class's configuration
			 */
			$.Chart.superclass.configure.apply(this, arguments);

			/**
			 * indicate the element's type
			 */
			this.type = 'chart';

			this.set({
				render : '',
				/**
				 * @cfg {Array} Required,The datasource of Chart.must be not empty.
				 */
				data : [],
				/**
				 * @cfg {Number} Specifies the width of this canvas
				 */
				width : undefined,
				/**
				 * @cfg {Number} Specifies the height of this canvas
				 */
				height : undefined,
				/**
				 * @cfg {String} Specifies the default lineJoin of the canvas's context in this element.(defaults to 'round')
				 */
				lineJoin : 'round',
				/**
				 * @cfg {String} this property specifies the horizontal alignment of chart in an module (defaults to 'center') Available value are:
				 * @Option 'left'
				 * @Option 'center'
				 * @Option 'right'
				 */
				align : 'center',
				/**
				 * @cfg {Boolean} If true mouse change to a pointer when a mouseover fired.(defaults to true)
				 */
				default_mouseover_css : true,
				/**
				 * @cfg {Boolean} Indicate if the chart clear segment of canvas(defaults to true)
				 */
				segmentRect : true,
				/**
				 * @cfg {Boolean} Specifies as true to display with percent.(default to false)
				 */
				showpercent : false,
				/**
				 * @cfg {Number} Specifies the number of decimal when use percent.(default to 1)
				 */
				decimalsnum : 1,
				/**
				 * @cfg {Object/String} Specifies the config of Title details see <link>$.Text</link>,If given a string,it will only apply the text.note:If the text is empty,then will not display
				 */
				title : {
					text:'',
					fontweight : 'bold',
					/**
					 * Specifies the font-size in pixels of title.(default to 20)
					 */
					fontsize : 20,
					/**
					 * Specifies the height of title will be take.(default to 30)
					 */
					height : 30
				},
				/**
				 * @cfg {Object/String}Specifies the config of subtitle details see <link>$.Text</link>,If given a string,it will only apply the text.note:If the title or subtitle'text is empty,then will not display
				 */
				subtitle : {
					text:'',
					fontweight : 'bold',
					/**
					 * Specifies the font-size in pixels of title.(default to 16)
					 */
					fontsize : 16,
					/**
					 * Specifies the height of title will be take.(default to 20)
					 */
					height : 20
				},
				/**
				 * @cfg {Object/String}Specifies the config of footnote details see <link>$.Text</link>,If given a string,it will only apply the text.note:If the text is empty,then will not display
				 */
				footnote : {
					text:'',
					/**
					 * Specifies the font-color of footnote.(default to '#5d7f97')
					 */
					color : '#5d7f97',
					/**
					 * Specifies the height of title will be take.(default to 20)
					 */
					height : 20
				},
				/**
				 * @cfg {String} Specifies how align footnote horizontally Available value are:
				 * @Option 'left'
				 * @Option 'center'
				 * @Option 'right'
				 */
				footnote_align : 'right',
				/**
				 * @cfg {String} Specifies how align title horizontally Available value are:
				 * @Option 'left'
				 * @Option 'center'
				 * @Option 'right'
				 */
				title_align : 'center',
				/**
				 * @inner {String} Specifies how align title vertically Available value are:
				 * @Option 'top'
				 * @Option 'middle' Only applies when title_writingmode = 'tb'
				 * @Option 'bottom'
				 */
				title_valign : 'top',
				/**
				 * @cfg {Boolean} If true element will have a animation when show, false to skip the animation.(default to false)
				 */
				animation : false,
				/**
				 * @inner {Function} the custom funtion for animation
				 */
				doAnimationFn : $.emptyFn,
				/**
				 * @cfg {String} (default to 'ease-in-out') Available value are:
				 * @Option 'easeIn'
				 * @Option 'easeOut'
				 * @Option 'easeInOut'
				 * @Option 'linear'
				 */
				animation_timing_function : 'easeInOut',
				/**
				 * @cfg {Number} Specifies the duration when animation complete in millisecond.(default to 1000)
				 */
				duration_animation_duration : 1000,
				/**
				 * @cfg {Object}Specifies the config of Legend.For details see <link>$.Legend</link> Note:this has a extra property named 'enable',indicate whether legend available(default to false)
				 */
				legend : {
					enable : false
				},
				/**
				 * @cfg {Object} Specifies the config of Tip.For details see <link>$.Tip</link> Note:this has a extra property named 'enable',indicate whether tip available(default to false)
				 */
				tip : {
					enable : false
				}
			});

			/**
			 * register the common event
			 */
			this.registerEvent(
			/**
			 * @event Fires when parse this element'data.Return value will override existing.
			 * @paramter $.Chart#this
			 * @paramter Object#data this element'data item
			 * @paramter int#i the index of data
			 */
			'parseData',
			/**
			 * @event Fires when parse this tip's data.Return value will override existing. Only valid when tip is available
			 * @paramter Object#data this tip's data item
			 * @paramter int#i the index of data
			 */
			'parseTipText',
			/**
			 * @event Fires before this element Animation.Only valid when <link>animation</link> is true
			 * @paramter $.Chart#this
			 */
			'beforeAnimation',
			/**
			 * @event Fires when this element Animation finished.Only valid when <link>animation</link> is true
			 * @paramter $.Chart#this
			 */
			'afterAnimation', 'animating');

			this.T = null;
			this.rendered = false;

			this.animationed = false;
			this.data = [];
			this.components = [];
			this.total = 0;

		},
		pushComponent : function(c, b) {
			if (!!b)
				this.components.unshift(c);
			else
				this.components.push(c);;
		},
		plugin : function(c, b) {
			this.init();
			c.inject(this);
			this.pushComponent(c, b);
		},
		toImageURL : function() {
			return this.T.toImageURL();
		},
		segmentRect : function() {
			this.T.clearRect(this.get('l_originx'), this.get('t_originy'), this.get('client_width'), this.get('client_height'));
		},
		resetCanvas : function() {
			this.T.backgound(this.get('l_originx'), this.get('t_originy'), this.get('client_width'), this.get('client_height'), this.get('background_color'));
		},
		animation : function(_) {
			/**
			 * clear the part of canvas
			 */
			_.segmentRect();
			/**
			 * doAnimation of implement
			 */
			_.doAnimation(_.variable.animation.time, _.duration);
			/**
			 * fill the background
			 */
			_.resetCanvas();
			if (_.variable.animation.time < _.duration) {
				_.variable.animation.time++;
				requestAnimFrame(function() {
					_.animation(_);
				});
			} else {
				requestAnimFrame(function() {
					_.variable.animation.time = 0;
					_.animationed = true;
					_.draw();
					_.processAnimation = false;
					_.fireEvent(_, 'afterAnimation', [_]);
				});
			}
		},
		doAnimation : function(t, d) {
			this.get('doAnimationFn').call(this, t, d);
		},
		/**
		 * the common config
		 */
		add : function(data, index, animate) {
			if (this.processAnimation) {
				this.variable.animation.queue.push({
					handler : 'add',
					arguments : [data, index, animate]
				});
				return false;
			}
			$.isNumber(index)
			index = $.between(0, this.data.length, index);
			data = $.Interface.parser.call(this, data, index);

			if (this.get('legend.enable')) {
				this.legend.calculate(this.data, data);
			}

			return data;
		},
		commonDraw : function() {
			$.Assert.isTrue(this.rendered, this.type + ' has not rendered.');
			$.Assert.isTrue(this.initialization, this.type + ' has initialize failed.');
			$.Assert.gtZero(this.data.length, this.type + '\'data is empty.');

			/**
			 * console.time('Test for draw');
			 */

			if (!this.redraw) {
				if(this.title){
					this.title.draw();
				}
				if(this.subtitle){
					this.subtitle.draw();
				}
				if(this.footnote){
					this.footnote.draw();
				}
				
				if (this.get('border.enable')) {
					this.T.drawBorder(0, 0, this.width, this.height, this.get('border.width'), this.get('border.color'), this.get('border.radius'), this.get('background_color'), true);
				} else {
					this.T.backgound(0, 0, this.width, this.height, this.get('background_color'));
				}
			}
			this.redraw = true;

			if (!this.animationed && this.get('animation')) {
				this.fireEvent(this, 'beforeAnimation', [this]);
				this.animation(this);
				return;
			}

			this.segmentRect();

			this.components.eachAll(function(c, i) {
				c.draw();
			}, this);

			this.resetCanvas();
			/**
			 * console.timeEnd('Test for draw');
			 */

		},
		create : function(shell) {
			/**
			 * default should to calculate the size of warp?
			 */
			this.width = this.pushIf('width', 400);
			this.height = this.pushIf('height', 300);

			var style = "width:" + this.width + "px;height:" + this.height + "px;padding:0px;overflow:hidden;position:relative;";

			var id = $.iGather(this.type);
			this.shellid = $.iGather(this.type + "-shell");
			var html = "<div id='" + this.shellid + "' style='" + style + "'>" + "<canvas id= '" + id + "'  width='" + this.width + "' height=" + this.height + "'>" + "<p>Your browser does not support the canvas element</p>" + "</canvas>" + "</div>";
			/**
			 * also use appendChild()
			 */
			shell.innerHTML = html;

			this.element = document.getElementById(id);
			this.shell = document.getElementById(this.shellid);
			/**
			 * the base canvas wrap for draw
			 */
			this.T = this.target = new Cans(this.element);

			this.rendered = true;
		},
		render : function(id) {
			this.push('render', id);
		},
		initialize : function() {
			if (!this.rendered) {
				var r = this.get('render');
				if (typeof r == "string" && document.getElementById(r))
					this.create(document.getElementById(r));
				else if (typeof r == 'object')
					this.create(r);
			}

			if (this.get('data').length > 0 && this.rendered && !this.initialization) {
				$.Interface.parser.call(this, this.get('data'));
				this.doConfig();
				this.initialization = true;
			}
		},
		doConfig : function() {
			$.Chart.superclass.doConfig.call(this);

			/**
			 * for compress
			 */
			var _ = this, E = _.variable.event, mCSS = _.get('default_mouseover_css'), O, AO;

			$.Assert.isArray(_.data);
			
			$.Interface._3D.call(_);

			_.T.strokeStyle(_.get('brushsize'), _.get('strokeStyle'), _.get('lineJoin'));

			_.processAnimation = _.get('animation');

			_.duration = Math.ceil(_.get('duration_animation_duration') * $.FRAME / 1000);
			
			_.variable.animation = {
				type : 0,
				time : 0,
				queue : []
			};

			_.animationArithmetic = $.getAnimationArithmetic(_.get('animation_timing_function'));

			_.on('afterAnimation', function() {
				var N = _.variable.animation.queue.shift();
				if (N) {
					_[N.handler].apply(_, N.arguments);
				}
			});

			['click', 'dblclick', 'mousemove'].each(function(it) {
				_.T.addEvent(it, function(e) {
					if (_.processAnimation)
						return;
					_.fireEvent(_, it, [_, $.Event.fix(e)]);
				}, false);
			});

			_.on('click', function(_, e) {
				/**
				 * console.time('Test for click');
				 */
				_.components.eachAll(function(c) {
					if (!c.preventEvent) {
						var M = c.isMouseOver(e);
						if (M.valid)
							c.fireEvent(c, 'click', [c, e, M]);
					}
				});
				/**
				 * console.timeEnd('Test for click');
				 */
			});

			_.on('mousemove', function(_, e) {
				O = AO = false;
				_.components.eachAll(function(cot) {
					if (!cot.preventEvent) {
						var cE = cot.variable.event, M = cot.isMouseOver(e);
						if (M.valid) {
							O = true;
							AO = AO || cot.atomic;
							if (!E.mouseover) {
								E.mouseover = true;
								_.fireEvent(_, 'mouseover', [e]);
							}

							if (mCSS && AO) {
								_.T.css("cursor", "pointer");
							}

							if (!cE.mouseover) {
								cE.mouseover = true;
								cot.fireEvent(cot, 'mouseover', [e, M]);
							}
							cot.fireEvent(cot, 'mousemove', [e, M]);
						} else {
							if (cE.mouseover) {
								cE.mouseover = false;
								cot.fireEvent(cot, 'mouseout', [e, M]);
							}
						}
					}
				});

				if (mCSS && !AO && E.mouseover) {
					_.T.css("cursor", "default");
				}

				// console.log(O+":"+E.mouseover);
					if (!O && E.mouseover) {
						E.mouseover = false;
						_.fireEvent(_, 'mouseout', [e]);
					}
				});

			_.push('l_originx', _.get('padding_left'));
			_.push('r_originx', _.width - _.get('padding_right'));
			_.push('t_originy', _.get('padding_top'));
			_.push('b_originy', _.height - _.get('padding_bottom'));
			_.push('client_width', (_.get('width') - _.get('hpadding')));
			var H = 0;
			if($.isString(_.get('title'))){
				_.push('title',{
					text:_.get('title'),
					fontweight : 'bold',
					fontsize : 20,
					height : 30
				});
			}
			if($.isString(_.get('subtitle'))){
				_.push('subtitle',{
					text:_.get('subtitle'),
					fontweight : 'bold',
					fontsize : 16,
					height : 20
				});
			}
			if($.isString(_.get('footnote'))){
				_.push('footnote',{
					text:_.get('footnote'),
					color : '#5d7f97',
					height : 20
				});
			}
			
			if (_.get('title.text') != '') {
				var st = _.get('subtitle.text') != '';
				H = st ? _.get('title.height') + _.get('subtitle.height') : _.get('title.height');
				if (_.get('title_align') == 'left') {
					_.push('title.originx', _.get('padding_left'));
				} else if (_.get('title_align') == 'right') {
					_.push('title.originx', _.width - _.get('padding_right'));
				} else {
					_.push('title.originx', _.get('padding_left')+_.get('client_width') / 2);
				}
				
				_.push('t_originy', _.get('t_originy') + H);
				
				this.push('title.textAlign', this.get('title_align'));
				this.push('title.originy', this.get('padding_top'));
				this.push('title.textBaseline', 'top');
				this.title = new $.Text(this.get('title'), this);
				if (st) {
					_.push('subtitle.originx', _.get('title.originx'));
					_.push('subtitle.originy', _.get('title.originy')+_.get('title.height'));
					_.push('subtitle.textAlign', _.get('title_align'));
					_.push('subtitle.textBaseline', 'top');
					this.subtitle = new $.Text(this.get('subtitle'), this);
				}
			}
			
			if (_.get('footnote.text') != '') {
				var fh = _.get('footnote.height');
				H +=fh;
				
				_.push('b_originy', _.get('b_originy') - fh);
				
				if (_.get('footnote_align') == 'left') {
					_.push('footnote.originx', _.get('padding_left'));
				} else if (_.get('footnote_align') == 'right') {
					_.push('footnote.originx', _.width - _.get('padding_right'));
				} else {
					_.push('footnote.originx', _.get('padding_left')+_.get('client_width') / 2);
				}
				
				this.push('footnote.textAlign', this.get('footnote_align'));
				this.push('footnote.originy', this.get('b_originy'));
				this.push('footnote.textBaseline', 'top');
				
				this.footnote = new $.Text(this.get('footnote'), this);
				
			}
			
			_.push('client_height', (_.get('height') - _.get('vpadding') - H));
			
			_.push('minDistance', Math.min(_.get('client_width'), _.get('client_height')));
			_.push('maxDistance', Math.max(_.get('client_width'), _.get('client_height')));
			_.push('minstr', _.get('client_width') < _.get('client_height') ? 'width' : 'height');

			_.push('centerx', _.get('l_originx') + _.get('client_width') / 2);
			_.push('centery', _.get('t_originy') + _.get('client_height') / 2);

			/**
			 * legend
			 */
			if (_.get('legend.enable')) {
				_.legend = new $.Legend($.apply({
					maxwidth : _.get('client_width'),
					data : _.data
				}, _.get('legend')), _);

				_.components.push(_.legend);
			}
			/**
			 * tip's wrap
			 */
			if (_.get('tip.enable')) {
				_.push('tip.wrap', _.shell);
			}

		}
	});
})($);
// @end

	/**
	 * @overview this component use for abc
	 * @component#$.Custom
	 * @extend#$.Component
	 */
	$.Custom = $.extend($.Component,{
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Custom.superclass.configure.apply(this,arguments);
			
			/**
			 * indicate the component's type
			 */
			this.type = 'custom';
			
			this.set({
				/**
				 * @cfg {Function} Specifies the customize function.(default to emptyFn)
				 */
				drawFn:$.emptyFn,
				/**
				 * @cfg {Function} Specifies the customize event valid function.(default to undefined)
				 */
				eventValid:undefined	
			});
			
			this.registerEvent();
			
		},
		doDraw:function(opts){
			this.get('drawFn').call(this,opts);
		},
		isEventValid:function(e){
			if($.isFunction(this.get('eventValid')))
			return this.get('eventValid').call(this,e);
			return {valid:false};
		},
		doConfig:function(){
			$.Custom.superclass.doConfig.call(this);
		}
});
/**
 * @overview this is inner use for axis
 * @component#$.Scale
 * @extend#$.Component
 */
$.Scale = $.extend($.Component, {
	configure : function() {

		/**
		 * invoked the super class's configuration
		 */
		$.Scale.superclass.configure.apply(this, arguments);

		/**
		 * indicate the component's type
		 */
		this.type = 'scale';

		this.set({
			/**
			 * @cfg {String} Specifies alignment of this scale.(default to 'left')
			 */
			position:'left',
			/**
			 * @cfg {String} the axis's type(default to 'h') Available value are:
			 * @Option 'h' :horizontal
			 * @Option 'v' :vertical
			 */
			which : 'h',
			/**
			 * @inner {Number}
			 */
			distance : undefined,
			/**
			 * @cfg {Number} Specifies the start coordinate scale value.(default to 0)
			 */
			start_scale : 0,
			/**
			 * @cfg {Number} Specifies the end coordinate scale value.Note either this or property of max_scale must be has the given value.(default to undefined)
			 */
			end_scale : undefined,
			/**
			 * @inner {Number} Specifies the chart's minimal value
			 */
			min_scale : undefined,
			/**
			 * @inner {Number} Specifies the chart's maximal value
			 */
			max_scale : undefined,
			/**
			 * @cfg {Number} Specifies the space of two scale.Note either this or property of scale_share must be has the given value.(default to undefined)
			 */
			scale_space : undefined,
			/**
			 * @cfg {Number} Specifies the number of scale on axis.(default to 5)
			 */
			scale_share : 5,
			/**
			 * @cfg {Boolean} True to display the scale line.(default to true)
			 */
			scale_enable : true,
			/**
			 * @cfg {Number} Specifies the size of brush(context.linewidth).(default to 1)
			 */
			scale_size : 1,
			/**
			 * @cfg {Number} Specifies the width(length) of scale.(default to 4)
			 */
			scale_width : 4,
			/**
			 * @cfg {String} Specifies the color of scale.(default to 4)
			 */
			scale_color : '#333333',
			/**
			 * @cfg {String} Specifies the align against axis.(default to 'center') When the property of which set to 'h',Available value are:
			 * @Option 'left'
			 * @Option 'center'
			 * @Option 'right' When the property of which set to 'v', Available value are:
			 * @Option 'top'
			 * @Option 'center'
			 * @Option 'bottom'
			 */
			scaleAlign : 'center',
			/**
			 * @cfg {Array} the customize labels
			 */
			labels : [],
			/**
			 * @cfg {Boolean} True to Indicate the grid is accord with scale
			 */
			scale2grid : true,
			/**
			 * @cfg {Number} Specifies the lineheight when text display multiline.(default to 16)
			 */
			text_height : 16,
			/**
			 * @cfg {Number} Specifies the distance to scale.(default to 4)
			 */
			text_space : 4,
			/**
			 * @cfg {String} Specifies the align against axis.(default to 'left' or 'bottom' in v mode) When the property of which set to 'h',Available value are:
			 * @Option 'left'
			 * @Option 'right' When the property of which set to 'v', Available value are:
			 * @Option 'top'
			 * @Option 'bottom'
			 */
			textAlign : 'left',
			/**
			 * @cfg {Number} Specifies the number of decimal.this will change along with scale.(default to 0)
			 */
			decimalsnum : 0,
			/**
			 * @inner {String} the style of overlapping(default to 'none') Available value are:
			 * @Option 'square'
			 * @Option 'round'
			 * @Option 'none'
			 */
			join_style : 'none',
			/**
			 * @inner {Number}
			 */
			join_size : 2
		});

		this.registerEvent(
		/**
		 * @event Fires the event when parse text、you can return a object like this:{text:'',textX:100,textY:100} to override the given.
		 * @paramter string#text item's text
		 * @paramter int#textX coordinate-x of item's text
		 * @paramter int#textY coordinate-y of item's text
		 * @paramter int#index item's index
		 */
		'parseText');

		this.items = [];
		this.number = 0;

	},
	isEventValid : function(e) {
		return {
			valid : false
		};
	},
	/**
	 * 按照从左自右,从上至下原则
	 */
	doDraw : function() {
		var x = 0,y = 0,x0 = 0,y0 = 0,tx = 0,ty = 0, w = this.get('scale_width'), w2 = w / 2, sa = this.get('scaleAlign'), ta = this.get('textAlign'), ts = this.get('text_space');
		if (this.isH) {
			if (sa == 'top') {
				y = -w;
			} else if (sa == 'center') {
				y = -w2;
				y0 = w2;
			} else {
				y0 = w;
			}
			this.T.textAlign('center');
			if (ta == 'top') {
				ty = -ts;
				this.T.textBaseline('bottom');
			} else {
				ty = ts;
				this.T.textBaseline('top');
			}
		} else {
			if (sa == 'left') {
				x = -w;
			} else if (sa == 'center') {
				x = -w2;
				x0 = w2;
			} else {
				x0 = w;
			}
			this.T.textBaseline('middle');
			if (ta == 'right') {
				this.T.textAlign('left');
				tx = ts;
			} else {
				this.T.textAlign('right');
				tx = -ts;
			}
		}
		/**
		 * 将上述的配置部分转移到config中?
		 */

		/**
		 * individuation text?
		 */
		this.T.textFont(this.get('fontStyle'));

		for ( var i = 0; i < this.items.length; i++) {
			if (this.get('scale_enable'))
				this.T.line(this.items[i].x + x, this.items[i].y + y, this.items[i].x + x0, this.items[i].y + y0, this.get('scale_size'), this.get('scale_color'), false);

			this.T.fillText(this.items[i].text, this.items[i].textX + tx, this.items[i].textY + ty, false, this.get('color'), 'lr', this.get('text_height'));
		}
	},
	doConfig : function() {
		$.Scale.superclass.doConfig.call(this);
		$.Assert.isNumber(this.get('distance'), 'distance');

		var customLabel = this.get('labels').length, min_scale = this.get('min_scale'), max_scale = this.get('max_scale'), scale_space = this.get('scale_space'), end_scale = this.get('end_scale'), start_scale = this.get('start_scale');
		if (customLabel > 0) {
			this.number = customLabel - 1;
		} else {
			$.Assert.isTrue($.isNumber(max_scale) || $.isNumber(end_scale), 'max_scale&end_scale');
			
			/**
			 * end_scale must greater than maxScale
			 */
			if (!end_scale || end_scale < max_scale) {
				end_scale = this.push('end_scale', $.ceil(max_scale));
			}
			
			/**
			 * startScale must less than minScale
			 */
			if (start_scale > min_scale) {
				this.push('start_scale', $.floor(min_scale));
			}

			if (scale_space && scale_space < end_scale - start_scale) {
				this.push('scale_share', (end_scale - start_scale) / scale_space);
			}
			
			/**
			 * value of each scale
			 */
			if (!scale_space || scale_space > end_scale - start_scale) {
				scale_space = this.push('scale', (end_scale - start_scale) / this.get('scale_share'));
			}
			
			this.number = this.get('scale_share');
			
			if(scale_space<1&&this.get('decimalsnum')==0){
				var dec = scale_space;
				while(dec<1){
					dec *=10;
					this.push('decimalsnum',this.get('decimalsnum')+1);
				}
			}
			
		}

		/**
		 * the real distance of each scale
		 */
		this.push('distanceOne', this.get('valid_distance') / this.number);
		
		
		var text, maxwidth = 0, x, y;

		this.T.textFont(this.get('fontStyle'));
		this.push('which', this.get('which').toLowerCase());
		this.isH = this.get('which') == 'h';
		/**
		 * 有效宽度仅对水平刻度有效、有效高度仅对垂直高度有效
		 */
		for ( var i = 0; i <= this.number; i++) {
			text = customLabel ? this.get('labels')[i] : (scale_space * i + start_scale).toFixed(this.get('decimalsnum'));
			x = this.isH ? this.get('valid_x') + i * this.get('distanceOne') : this.x;
			y = this.isH ? this.y : this.get('valid_y') + this.get('distance') - i * this.get('distanceOne');
			this.items.push($.merge({
				text : text,
				x : x,
				y : y,
				textX : x,
				textY : y
			}, this.fireEvent(this, 'parseText', [text, x, y, i])));
			maxwidth = Math.max(maxwidth, this.T.measureText(text));
		}

		/**
		 * what does follow code doing?
		 */
		this.left = this.right = this.top = this.bottom = 0;
		var ts = this.get('text_space'),
		ta = this.get('textAlign'),
		sa = this.get('scaleAlign'), 
		w = this.get('scale_width'),
		w2 = w / 2;

		if (this.isH) {
			if (sa == 'top') {
				this.top = w;
			} else if (sa == 'center') {
				this.top = w2;
			} else {
				this.top = 0;
			}
			this.bottom = w - this.top;
			if (ta == 'top') {
				this.top += this.get('text_height') + ts;
			} else {
				this.bottom += this.get('text_height') + ts;
			}
		} else {
			if (sa == 'left') {
				this.left = w;
			} else if (sa == 'center') {
				this.left = w2;
			} else {
				this.left = 0;
			}
			this.right = w - this.left;
			if (ta == 'left') {
				this.left += maxwidth + ts;
			} else {
				this.right += maxwidth + ts;
			}
		}
	}
});// @end

/**
 * @overview this component use for abc
 * @component#$.Coordinate2D
 * @extend#$.Component
 */
$.Coordinate2D = $.extend($.Component,
		{
			configure : function() {
				/**
				 * invoked the super class's configurationuration
				 */
				$.Coordinate2D.superclass.configure.apply(this, arguments);

				/**
				 * indicate the component's type
				 */
				this.type = 'coordinate2d';

				this.set({
					/**
					 * @inner {Number}
					 */
					sign_size : 12,
					/**
					 * @inner {Number}
					 */
					sign_space : 5,
					/**
					 * @cfg {Array} the option for scale.For details see <link>$.Scale</link>
					 */
					scale : [],
					/**
					 * @cfg {Number} Specifies the valid width,less than the width of coordinate.(default same as width)
					 */
					valid_width : undefined,
					/**
					 * @cfg {Number} Specifies the valid height,less than the height of coordinate.(default same as height)
					 */
					valid_height : undefined,
					/**
					 * @cfg {Number} Specifies the linewidth of the grid.(default to 1)
					 */
					grid_line_width : 1,
					/**
					 * @cfg {String} Specifies the color of the grid.(default to '#dbe1e1')
					 */
					grid_color : '#dbe1e1',
					/**
					 * @cfg {Boolean} True to display grid line.(default to true)
					 */
					gridlinesVisible : true,
					/**
					 * @cfg {Boolean} indicate whether the grid is accord with scale,on the premise of grids is not specify. this just give a convenient way bulid grid for default.and actual value depend on scale's scale2grid
					 */
					scale2grid : true,
					/**
					 * @cfg {Object} this is grid config for custom.there has two valid property horizontal and vertical.the property's sub property is: 
					 * way:the manner calculate grid-line (default to 'share_alike') 
					 *    Available property are:
					 *    @Option share_alike
					 *    @Option given_value 
					 * value: when property way apply to 'share_alike' this property mean to the number of grid's line.
					 * when apply to 'given_value' this property mean to the distance each grid line(unit:pixel) .
					 * code will like:
					 * { 
					 *   horizontal: { way:'share_alike', value:10 } 
					 *   vertical: { way:'given_value', value:40 } 
					 *  }
					 */
					grids : undefined,
					/**
					 * @cfg {Boolean} If True the grid line will be ignored when gird and axis overlap.(default to true)
					 */
					ignoreOverlap : true,
					/**
					 * @cfg {Boolean} If True the grid line will be ignored when gird and coordinate's edge overlap.(default to false)
					 */
					ignoreEdge : false,
					/**
					 * @inner {String} Specifies the label on x-axis
					 */
					xlabel : '',
					/**
					 * @inner {String} Specifies the label on y-axis
					 */
					ylabel : '',
					/**
					 * @cfg {Boolean} If True the grid background-color will be alternate.(default to true)
					 */
					alternate_color : true,
					/**
					 * @cfg {String} Specifies the direction apply alternate color.(default to 'v')Available value are:
					 * @Option 'h' horizontal
					 * @Option 'v' vertical
					 */
					alternate_direction : 'v',
					/**
					 * @cfg {float(0.01 - 0.5)} Specifies the factor make color dark alternate_color,relative to background-color,the bigger the value you set,the larger the color changed.(defaults to '0.01')
					 */
					alternate_color_factor:0.01,
					/**
					 * @cfg {Object} Specifies config crosshair.(default enable to false).For details see <link>$.CrossHair</link>
					 * Note:this has a extra property named 'enable',indicate whether crosshair available(default to false)
					 */
					crosshair : {
						enable : false
					},
					/**
					 * @cfg {Number} Required,Specifies the width of this coordinate.(default to undefined)
					 */
					width : undefined,
					/**
					 * @cfg {Number} Required,Specifies the height of this coordinate.(default to undefined)
					 */
					height : undefined,
					/**
					 * @cfg {Object} Specifies style for axis of this coordinate. Available property are:
					 * @Option enable {Boolean} True to display the axis.(default to true)
					 * @Option color {String} Specifies the color of each axis.(default to '#666666')
					 * @Option width {Number/Array} Specifies the width of each axis, If given the a array,there must be have have 4 element, like this:[1,0,0,1](top-right-bottom-left).(default to 1)
					 */
					axis : {
						enable : true,
						color : '#666666',
						width : 1
					}
				});

				this.registerEvent();

				this.scale = [];
				this.gridlines = [];
			},
			getScale : function(p) {
				for ( var i = 0; i < this.scale.length; i++) {
					var k = this.scale[i];
					if (k.get('position') == p) {
						return {
							start : k.get('start_scale'),
							end : k.get('end_scale'),
							distance : k.get('end_scale') - k.get('start_scale')
						};
					}
				}
				return {
					start : 0,
					end : 0,
					distance : 0
				};
			},
			isEventValid : function(e) {
				return {
					valid : e.offsetX > this.x && e.offsetX < (this.x + this.get('width')) && e.offsetY < this.y + this.get('height') && e.offsetY > this.y
				};
			},
			doDraw : function(opts) {
				this.T.rectangle(this.x, this.y, this.get('width'), this.get('height'), this.get('fill_color'));
				
				if (this.get('alternate_color')) {
					var x, y, f = false, axis = [0, 0, 0, 0], c = $.dark(this.get('fill_color'),this.get('alternate_color_factor'));
					if (this.get('axis.enable')) {
						axis = this.get('axis.width');
					}
				}
				var gl = this.gridlines,glw=this.get('grid_line_width'),v=this.get('alternate_direction')=='v';
				for ( var i = 0; i < gl.length; i++) {
					gl[i].x1 = Math.round(gl[i].x1);
					gl[i].y1 = Math.round(gl[i].y1);
					gl[i].x2 = Math.round(gl[i].x2);
					gl[i].y2 = Math.round(gl[i].y2);
					if (this.get('alternate_color')) {
						if (f) {
							if(v)
								this.T.rectangle(gl[i].x1 + axis[3], gl[i].y1 + glw, gl[i].x2 - gl[i].x1 - axis[3] - axis[1], y - gl[i].y1 - glw, c);
							else
								this.T.rectangle(x +glw, gl[i].y2 + axis[0], gl[i].x1 - x, gl[i].y1 - gl[i].y2 - axis[0] - axis[2], c);
						}
						x = gl[i].x1;
						y = gl[i].y1;
						f = !f;
					}
					this.T.line(gl[i].x1, gl[i].y1, gl[i].x2, gl[i].y2, glw, this.get('grid_color'));
				}
				
				this.T.rectangle(this.x, this.y, this.get('width'), this.get('height'), false, this.get('axis.enable'), this.get('axis.width'), this.get('axis.color'), this.get('shadow'), this.get('shadow_color'), this.get('shadow_blur'), this
						.get('shadow_offsetx'), this.get('shadow_offsety'));
				
				
				for ( var i = 0; i < this.scale.length; i++) {
					this.scale[i].draw();
				}
			},
			doConfig : function() {
				$.Coordinate2D.superclass.doConfig.call(this);
				$.Assert.isNumber(this.get('width'), 'width');
				$.Assert.isNumber(this.get('height'), 'height');
				
				/**
				 * this element not atomic because it is a container,so this is a particular case.
				 */
				this.atomic = false;

				/**
				 * apply the gradient color to fill_color
				 */
				if (this.get('gradient') && $.isString(this.get('background_color'))) {
					this.push('fill_color', this.T.avgLinearGradient(this.x, this.y, this.x, this.y + this.get('height'), [this.get('dark_color'), this.get('light_color')]));
				}

				if (this.get('axis.enable')) {
					var aw = this.get('axis.width');
					if (!$.isArray(aw))
						this.push('axis.width', [aw, aw, aw, aw]);
				}

				if (this.get('crosshair.enable')) {
					this.push('crosshair.wrap', this.container.shell);
					this.push('crosshair.height', this.get('height'));
					this.push('crosshair.width', this.get('width'));
					this.push('crosshair.top', this.y);
					this.push('crosshair.left', this.x);

					this.crosshair = new $.CrossHair(this.get('crosshair'), this);
				}

				var jp, cg = !!(this.get('gridlinesVisible') && this.get('grids')), // custom grid
				hg = cg && !!this.get('grids.horizontal'), vg = cg && !!this.get('grids.vertical'), h = this.get('height'), w = this.get('width'), vw = this.get('valid_width'), vh = this.get('valid_height'), k2g = this.get('gridlinesVisible') && this.get('scale2grid')
						&& !(hg && vg), sw = (w - vw) / 2,
				sh = (h - vh) / 2, axis = this.get('axis.width');

				if (!$.isArray(this.get('scale'))) {
					if ($.isObject(this.get('scale')))
						this.push('scale', [this.get('scale')]);
					else
						this.push('scale', []);
				}
				this.get('scale').each(function(kd,i){
					jp = kd['position'];
					jp = jp || 'left';
					jp = jp.toLowerCase();
					kd['originx'] = this.x;
					kd['originy'] = this.y;
					kd['valid_x'] = this.x + sw;
					kd['valid_y'] = this.y + sh;
					kd['position'] = jp;
					// calculate coordinate,direction,distance
					if (jp == 'top') {
						kd['which'] = 'h';
						kd['distance'] = w;
						kd['valid_distance'] = vw;
					} else if (jp == 'right') {
						kd['which'] = 'v';
						kd['distance'] = h;
						kd['valid_distance'] = vh;
						kd['originx'] += w;
						kd['valid_x'] += vw;
					} else if (jp == 'bottom') {
						kd['which'] = 'h';
						kd['distance'] = w;
						kd['valid_distance'] = vw;
						kd['originy'] += h;
						kd['valid_y'] += vh;
					} else {
						kd['which'] = 'v';
						kd['distance'] = h;
						kd['valid_distance'] = vh;
					}
					this.scale.push(new $.Scale(kd, this.container));
				},this);
				

				var iol = this.push('ignoreOverlap', this.get('ignoreOverlap') && this.get('axis.enable') || this.get('ignoreEdge'));

				if (iol) {
					if (this.get('ignoreEdge')) {
						var ignoreOverlap = function(w, x, y) {
							return w == 'v' ? (y == this.y) || (y == this.y + h) : (x == this.x) || (x == this.x + w);
						}
					} else {
						var ignoreOverlap = function(wh, x, y) {
							return wh == 'v' ? (y == this.y && axis[0] > 0) || (y == (this.y + h) && axis[2] > 0) : (x == this.x && axis[3] > 0) || (x == (this.x + w) && axis[1] > 0);
						}
					}
				}

				if (k2g) {
					var scale, x, y;
					for ( var i = 0; i < this.scale.length; i++) {
						scale = this.scale[i];
						// disable,given specfiy grid will ignore scale2grid
						if ($.isFalse(scale.get('scale2grid')) || hg && scale.get('which') == 'v' || vg && scale.get('which') == 'h') {
							continue;
						}
						x = y = 0;
						if (scale.get('position') == 'top') {
							y = h;
						} else if (scale.get('position') == 'right') {
							x = -w;
						} else if (scale.get('position') == 'bottom') {
							y = -h;
						} else {
							x = w;
						}
						for ( var j = 0; j < scale.items.length; j++) {
							if (iol)
								if (ignoreOverlap.call(this, scale.get('which'), scale.items[j].x, scale.items[j].y))
									continue;
							this.gridlines.push({
								x1 : scale.items[j].x,
								y1 : scale.items[j].y,
								x2 : scale.items[j].x + x,
								y2 : scale.items[j].y + y
							});
						}
					}
				}
				if (vg) {
					var gv = this.get('grids.vertical');
					$.Assert.gtZero(gv['value'], 'value');
					var d = w / gv['value'], n = gv['value'];
					if (gv['way'] == 'given_value') {
						n = d;
						d = gv['value'];
						d = d > w ? w : d;
					}
						
					for ( var i = 0; i <= n; i++) {
						if (iol)
							if (ignoreOverlap.call(this, 'h', this.x + i * d, this.y))
								continue;
						this.gridlines.push({
							x1 : this.x + i * d,
							y1 : this.y,
							x2 : this.x + i * d,
							y2 : this.y + h
						});
					}
				}
				if (hg) {
					var gh = this.get('grids.horizontal');
					$.Assert.gtZero(gh['value'], 'value');
					var d = h / gh['value'], n = gh['value'];
					if (gh['way'] == 'given_value') {
						n = d;
						d = gh['value'];
						d = d > h ? h : d;
					}

					for ( var i = 0; i <= n; i++) {
						if (iol)
							if (ignoreOverlap.call(this, 'v', this.x, this.y + i * d))
								continue;
						this.gridlines.push({
							x1 : this.x,
							y1 : this.y + i * d,
							x2 : this.x + w,
							y2 : this.y + i * d
						});
					}
				}

			}
		});// @end
/**
 * @overview this component use for abc
 * @component#$.Coordinate3D
 * @extend#$.Coordinate2D
 */
$.Coordinate3D = $.extend($.Coordinate2D, {
	configure : function() {
		/**
		 * invoked the super class's configurationuration
		 */
		$.Coordinate3D.superclass.configure.apply(this, arguments);

		/**
		 * indicate the component's type
		 */
		this.type = 'coordinate3d';
		this.dimension = $._3D;

		this.set({
			/**
			 * @cfg {Number} Three-dimensional rotation X in degree(angle).socpe{0-90},Normally, this will accord with the chart.(default to 60)
			 */
			xAngle : 60,
			/**
			 * @cfg {Number} Three-dimensional rotation Y in degree(angle).socpe{0-90},Normally, this will accord with the chart.(default to 20)
			 */
			yAngle : 20,
			xAngle_ : undefined,
			yAngle_ : undefined,
			/**
			 * @cfg {Number} Required,Specifies the z-axis deep of this coordinate,Normally, this will given by chart.(default to 0)
			 */
			zHeight : 0,
			/**
			 * @cfg {Number} Specifies pedestal height of this coordinate.(default to 22)
			 */
			pedestal_height : 22,
			/**
			 * @cfg {Number} Specifies board deep of this coordinate.(default to 20)
			 */
			board_deep : 20,
			/**
			 * @cfg {Boolean} Override the default as true
			 */
			gradient : true,
			/**
			 * @cfg {float} Override the default as 0.18.
			 */
			color_factor : 0.18,
			/**
			 * @cfg {Boolean} Override the default as true.
			 */
			ignoreEdge : true,
			/**
			 * @cfg {Boolean} Override the default as false.
			 */
			alternate_color : false,
			/**
			 * @cfg {String} Override the default as '#7a8d44'.
			 */
			grid_color : '#7a8d44',
			/**
			 * @cfg {String} Override the default as '#d6dbd2'.
			 */
			background_color : '#d6dbd2',
			/**
			 * @cfg {Number} Override the default as 4.
			 */
			shadow_offsetx : 4,
			/**
			 * @cfg {Number} Override the default as 2.
			 */
			shadow_offsety : 2,
			/**
			 * @cfg {Array} Specifies the style of board(wall) of this coordinate. the array length must be 3 and each object option has two property. Available property are:
			 * @Option color the color of wall
			 * @Option alpha the opacity of wall
			 */
			wall_style : [],
			/**
			 * @cfg {Boolean} Override the default as axis.enable = false.
			 */
			axis : {
				enable : false
			}
		});
	},
	doDraw : function(opts) {
		var w = this.get('width'), h = this.get('height'), xa = this.get('xAngle_'), ya = this.get('yAngle_'), zh = this.get('zHeight'), offx = xa * zh, offy = ya * zh, gl = this.gridlines;

		/**
		 * bottom
		 */
		this.T.cube3D(this.x, this.y + h + this.get('pedestal_height'), xa, ya, false, w, this.get('pedestal_height'), zh * 3 / 2, this.get('axis.enable'), this.get('axis.width'), this.get('axis.color'), this.get('bottom_style'));
		/**
		 * board_style
		 */
		this.T.cube3D(this.x + this.get('board_deep') * xa, this.y + h - this.get('board_deep') * ya, xa, ya, false, w, h, zh, this.get('axis.enable'), this.get('axis.width'), this.get('axis.color'), this.get('board_style'));

		this.T.cube3D(this.x, this.y + h, xa, ya, false, w, h, zh, this.get('axis.enable'), this.get('axis.width'), this.get('axis.color'), this.get('wall_style'));

		for ( var i = 0; i < gl.length; i++) {
			this.T.line(gl[i].x1, gl[i].y1, gl[i].x1 + offx, gl[i].y1 - offy, this.get('grid_line_width'), this.get('grid_color'));
			this.T.line(gl[i].x1 + offx, gl[i].y1 - offy, gl[i].x2 + offx, gl[i].y2 - offy, this.get('grid_line_width'), this.get('grid_color'));
		}

		for ( var i = 0; i < this.scale.length; i++) {
			this.scale[i].draw();
		}
	},
	doConfig : function() {
		$.Coordinate3D.superclass.doConfig.call(this);

		var bg = this.get('background_color'), dark_color = $.dark(bg, 0.1), h = this.get('height'), w = this.get('width');

		if (this.get('wall_style').length < 3) {
			this.push('wall_style', [{
				color : dark_color
			}, {
				color : bg
			}, {
				color : dark_color
			}]);
		}

		var dark = this.get('wall_style')[0].color;

		/**
		 * 右-前
		 */
		this.push('bottom_style', [{
			color : bg,
			shadow : this.get('shadow'),
			shadowColor : this.get('shadow_color'),
			blur : this.get('shadow_blur'),
			sx : this.get('shadow_offsetx'),
			sy : this.get('shadow_offsety')
		}, false, false, {
			color : dark
		}, {
			color : dark
		}, {
			color : dark
		}]);

		/**
		 * 上-右
		 */
		this.push('board_style', [false, false, false, {
			color : dark
		}, {
			color : bg
		}, false]);
		/**
		 * 下底-底-左-右-上-前
		 */
		if (this.get('gradient')) {
			var offx = this.get('xAngle_') * this.get('zHeight'), offy = this.get('yAngle_') * this.get('zHeight'), ws = this.get('wall_style'), bs = this.get('bottom_style');

			if ($.isString(ws[0].color)) {
				ws[0].color = this.T.avgLinearGradient(this.x, this.y + h, this.x + w, this.y + h, [dark, this.get('dark_color')]);
			}
			if ($.isString(ws[1].color)) {
				ws[1].color = this.T.avgLinearGradient(this.x + offx, this.y - offy, this.x + offx, this.y + h - offy, [this.get('dark_color'), this.get('light_color')]);
			}
			if ($.isString(ws[2].color)) {
				ws[2].color = this.T.avgLinearGradient(this.x, this.y, this.x, this.y + h, [bg, this.get('dark_color')]);
			}
			bs[5].color = this.T.avgLinearGradient(this.x, this.y + h, this.x, this.y + h + this.get('pedestal_height'), [bg, dark_color]);
		}

	}
});// @end

	/**
	 * @overview this component use for abc
	 * @component#$.Rectangle
	 * @extend#$.Component
	 */
	$.Rectangle = $.extend($.Component,{
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Rectangle.superclass.configure.apply(this,arguments);
			
			/**
			 * indicate the component's type
			 */
			this.type = 'rectangle';
			
			this.set({
				/**
				 * @cfg {Number} Specifies the width of this element in pixels,Normally,this will given by chart.(default to 0)
				 */
				width:0,
				/**
				 * @cfg {Number} Specifies the height of this element in pixels,Normally,this will given by chart.(default to 0)
				 */
				height:0,
				/**
				 * @cfg {Number} the distance of column's edge and value in pixels.(default to 4)
				 */
				value_space:4,
				/**
				 * @cfg {String} Specifies the text of this element,Normally,this will given by chart.(default to '')
				 */
				value:'',
				/**
				 * @cfg {String} Specifies the name of this element,Normally,this will given by chart.(default to '')
				 */
				name:'',
				/**
				 * @cfg {String} Specifies the tip alignment of chart(defaults to 'top').Available value are:
				 * @Option 'left'
				 * @Option 'right'
				 * @Option 'top'
				 * @Option 'bottom'
				 */
				tipAlign:'top',
				/**
				 * @cfg {String} Specifies the value's text alignment of chart(defaults to 'top') Available value are:
				 * @Option 'left'
				 * @Option 'right'
				 * @Option 'top'
				 * @Option 'bottom'
				 */
				valueAlign:'top',
				/**
				 * @inner
				 */
				textAlign:'center',
				/**
				 * @inner
				 */
				textBaseline:'top',
				/**
				 * @cfg {Number} Override the default as 3
				 */
				shadow_blur:3,
				/**
				 * @cfg {Number} Override the default as -1
				 */
				shadow_offsety:-1
			});
			
			/**
			 * this element support boxMode
			 */
			this.atomic = true;
			
			this.registerEvent(
					/**
					 * @event Fires when draw this label.Return value will override existing value.
					 * @paramter $.Rectangle#rect
					 * @paramter string#text the current label's text
					 */
					'drawLabelText');
			
		},
		doDraw:function(opts){
			this.drawRectangle();
			this.drawValue();
		},
		doConfig:function(){
			$.Rectangle.superclass.doConfig.call(this);
			$.Assert.gtZero(this.get('width'),'width');
			this.width = this.get('width');
			this.height = this.get('height');
			
			this.centerX = this.x + this.width/2;
			this.centerY = this.y + this.height/2;
			
			if(this.get('tip.enable')){
				if(this.get('tip.showType')!='follow'){
					this.push('tip.invokeOffsetDynamic',false);
				}
				this.tip = new $.Tip(this.get('tip'),this);
			}
			
			this.variable.event.highlight = false;
			
			this.on('mouseover',function(e){
				//console.time('mouseover');
				this.variable.event.highlight = true;
				this.redraw();
				this.variable.event.highlight = false;
				//console.timeEnd('mouseover');
			}).on('mouseout',function(e){
				//console.time('mouseout');
				this.variable.event.highlight = false;
				this.redraw();
				//console.timeEnd('mouseout');
			});
			
			this.on('beforedraw',function(){
				this.push('fill_color',this.variable.event.highlight?this.get('light_color'):this.get('background_color'));
				return true;
			});
		}
});
	/**
	 * @overview this component use for abc
	 * @component#$.Rectangle2D
	 * @extend#$.Rectangle
	 */
	$.Rectangle2D = $.extend($.Rectangle,{
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Rectangle2D.superclass.configure.apply(this,arguments);
			
			/**
			 * indicate the component's type
			 */
			this.type = 'rectangle2d';
			
			this.set({
				/**
				 * @cfg {Number} Override the default as -2
				 */
				shadow_offsety:-2
			});
			
		},
		drawValue:function(){
			if(this.get('value')!=''){
				this.T.text(this.fireString(this, 'drawLabelText', [this, this.get('value')], this.get('value')),this.get('value_x'),this.get('value_y'),false,this.get('color'),this.get('textAlign'),this.get('textBaseline'),this.get('fontStyle'));
			}
		},
		drawRectangle:function(){
			this.T.rectangle(
				this.get('originx'),
				this.get('originy'),
				this.get('width'),
				this.get('height'),
				this.get('fill_color'),
				this.get('border.enable'),
				this.get('border.width'),
				this.get('border.color'),
				this.get('shadow'),
				this.get('shadow_color'),
				this.get('shadow_blur'),
				this.get('shadow_offsetx'),
				this.get('shadow_offsety'));
		},
		isEventValid:function(e){
			return {valid:e.offsetX>this.x&&e.offsetX<(this.x+this.width)&&e.offsetY<(this.y+this.height)&&e.offsetY>(this.y)};
		},
		tipInvoke:function(){
			var _ = this;
			//base on event? NEXT
			return function(w,h){
				return {
					left:_.tipX(w,h),
					top:_.tipY(w,h)
				}
			}
		},
		doConfig:function(){
			$.Rectangle2D.superclass.doConfig.call(this);
			var _ = this,tipAlign = _.get('tipAlign'),valueAlign=_.get('valueAlign');
			if(tipAlign=='left'||tipAlign=='right'){
				_.tipY = function(w,h){return _.centerY - h/2;};
			}else{
				_.tipX = function(w,h){return _.centerX -w/2;};
			}
			
			if(tipAlign=='left'){
				_.tipX = function(w,h){return _.x - _.get('value_space') -w;};
			}else if(tipAlign=='right'){
				_.tipX = function(w,h){return _.x + _.width + _.get('value_space');};
			}else if(tipAlign=='bottom'){
				_.tipY = function(w,h){return _.y  +_.height+3;};
			}else{
				_.tipY = function(w,h){return _.y  - h -3;};
			}
			
			
			if(valueAlign=='left'){
				_.push('textAlign','right');
				_.push('value_x',_.x - _.get('value_space'));
				_.push('value_y',_.centerY);
			}else if(valueAlign=='right'){
				_.push('textAlign','left');
				_.push('textBaseline','middle');
				_.push('value_x',_.x + _.width + _.get('value_space'));
				_.push('value_y',_.centerY);
			}else if(valueAlign=='bottom'){
				_.push('value_x',_.centerX);
				_.push('value_y',_.y  + _.height + _.get('value_space'));
				_.push('textBaseline','top');
			}else{
				_.push('value_x',_.centerX);
				_.push('value_y',_.y  - _.get('value_space'));
				_.push('textBaseline','bottom');
			}
			
			_.valueX = _.get('value_x');
			_.valueY = _.get('value_y');
		}
});
	/**
	 * @overview this component use for abc
	 * @component#$.Rectangle3D
	 * @extend#$.Rectangle
	 */
	$.Rectangle3D = $.extend($.Rectangle,{
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Rectangle3D.superclass.configure.apply(this,arguments);
			
			/**
			 * indicate the component's type
			 */
			this.type = 'rectangle3d';
			this.dimension = $._3D;
			
			this.set({
				/**
				 * @cfg {Number} Specifies Three-dimensional z-axis deep in pixels.Normally,this will given by chart.(default to undefined)
				 */
				zHeight:undefined,
				/**
				 * @cfg {Number} Three-dimensional rotation X in degree(angle).socpe{0-90}.Normally,this will given by chart.(default to 60)
				 */
				xAngle:60,
				/**
				 * @cfg {Number} Three-dimensional rotation Y in degree(angle).socpe{0-90}.Normally,this will given by chart.(default to 20)
				 */
				yAngle:20,
				xAngle_:undefined,
				yAngle_:undefined,
				/**
				 * @cfg {Number} Override the default as 2
				 */
				shadow_offsetx:2
			});
			
		},
		drawValue:function(){
			if(this.get('value')!='')
			this.T.text(this.get('value'),this.centerX,this.topCenterY + this.get('value_space'),false,this.get('color'),'center','top',this.get('fontStyle'));
		},
		drawRectangle:function(){
			this.T.cube(
				this.get('originx'),
				this.get('originy'),
				this.get('xAngle_'),
				this.get('yAngle_'),
				this.get('width'),
				this.get('height'),
				this.get('zHeight'),
				this.get('fill_color'),
				this.get('border.enable'),
				this.get('border.width'),
				this.get('light_color'),
				this.get('shadow'),
				this.get('shadow_color'),
				this.get('shadow_blur'),
				this.get('shadow_offsetx'),
				this.get('shadow_offsety')
			);
		},
		isEventValid:function(e){
			return {valid:!this.preventEvent&&e.offsetX>this.x&&e.offsetX<(this.x+this.get('width'))&&e.offsetY<this.y+this.get('height')&&e.offsetY>this.y};
		},
		tipInvoke:function(){
			var self = this;
			return function(w,h){
				return {
					left:self.topCenterX - w/2,
					top:self.topCenterY - h
				}
			}
		},
		doConfig:function(){
			$.Rectangle3D.superclass.doConfig.call(this);
			
			this.pushIf("zHeight",this.get('width'));
			
			this.centerX=this.x+this.get('width')/2;
			
			this.topCenterX=this.x+(this.get('width')+this.get('width')*this.get('xAngle_'))/2;
			
			this.topCenterY=this.y-this.get('width')*this.get('yAngle_')/2;
			
		}
});
/**
 * @overview this component use for abc
 * @component#$.Sector
 * @extend#$.Component
 */
$.Sector = $.extend($.Component, {
	configure : function() {
		/**
		 * invoked the super class's configuration
		 */
		$.Sector.superclass.configure.apply(this, arguments);

		/**
		 * indicate the component's type
		 */
		this.type = 'sector';

		this.set({
			/**
			 * @cfg {String} Specifies the value of this element,Normally,this will given by chart.(default to '')
			 */
			value:'',
			/**
			 * @cfg {String} Specifies the name of this element,Normally,this will given by chart.(default to '')
			 */
			name:'',
			/**
			 * @inner {Boolean} True to make sector counterclockwise.(default to false)
			 */
			counterclockwise : false,
			/**
			 * @cfg {Number} Specifies the start angle of this sector.Normally,this will given by chart.(default to 0)
			 */
			startAngle : 0,
			/**
			 * @cfg {Number} middleAngle = (endAngle - startAngle)/2.Normally,this will given by chart.(default to 0)
			 */
			middleAngle : 0,
			/**
			 * @cfg {Number} Specifies the end angle of this sector.Normally,this will given by chart.(default to 0)
			 */
			endAngle : 0,
			/**
			 * @cfg {Number} Specifies total angle of this sector,totalAngle = (endAngle - startAngle).Normally,this will given by chart.(default to 0)
			 */
			totalAngle : 0,
			/**
			 * @cfg {String} the event's name trigger pie bound(default to 'click').
			 */
			bound_event : 'click',
			/**
			 * @cfg {Boolean} True to bound this sector.(default to false)
			 */
			expand : false,
			/**
			 * @inner {Boolean} True to has animation when bound.(default to false)
			 */
			pop_animate : false,
			/**
			 * @cfg {Boolean} If true means just one piece could bound at same time.(default to false)
			 */
			mutex : false,
			/**
			 * @cfg {Number} Specifies the offset when bounded.Normally,this will given by chart.(default to undefined)
			 */
			increment : undefined,
			/**
			 * @cfg {Object} Specifies the config of label.For details see <link>$.Label</link>
			 * Note:this has a extra property named 'enable',indicate whether label available(default to true)
			 */
			label : {
				enable : true
			}
		});

		/**
		 * this element support boxMode
		 */
		this.atomic = true;

		this.registerEvent('changed');

		this.label = null;
		this.tip = null;
	},
	bound : function() {
		if (!this.expanded)
			this.toggle();
	},
	rebound : function() {
		if (this.expanded)
			this.toggle();
	},
	toggle : function() {
		this.fireEvent(this, this.get('bound_event'), [this]);
	},
	doDraw : function(opts) {
		this.drawSector();
		if (this.label) {
			/**
			 * draw the labels
			 */
			this.label.draw();
		}
	},
	labelInvoke:function(L){
		var A = this.get('middleAngle'),x = Math.cos(A)*L,y = Math.sin(A)*L,l=this.label;
		l.push('originx',l.get('originx')+x);
		l.push('originy',l.get('originy')+y);
		l.push('labelx',l.get('labelx')+x);
		l.push('labely',l.get('labely')+y);
		var p =[];
		l.get('line_potins').each(function(v, i){
			p.push(i%2==0?(v+x):(v+y));
		},l);
		l.push('line_potins',p);
	},
	doConfig : function() {
		$.Sector.superclass.doConfig.call(this);

		var _ = this;

		_.push('totalAngle', _.get('endAngle') - _.get('startAngle'));


		if(this.get('label.enable')){
			_.pushIf('label.line_thickness',_.is3D()?4:1);
			_.pushIf('label.border.color',_.get('border.color'));
			/**
			 * make the label's color in accord with sector
			 */
			_.push('label.scolor', _.get('background_color'));
		}
		_.variable.event.status = _.expanded = _.get('expand');

		if (_.get('tip.enable')) {
			if (_.get('tip.showType') != 'follow') {
				_.push('tip.invokeOffsetDynamic', false);
			}
			_.tip = new $.Tip(_.get('tip'), _);
		}

		_.variable.event.poped = false;

		_.on(_.get('bound_event'), function(_, e, r) {
			// console.profile('Test for pop');
				// console.time('Test for pop');
				_.variable.event.poped = true;
				_.expanded = !_.expanded;
				_.redraw();
				_.variable.event.poped = false;
				// console.timeEnd('Test for pop');
				// console.profileEnd('Test for pop');
			});

		_.on('beforedraw', function() {
			_.x = _.get('originx');
			_.y = _.get('originy');
			if (_.variable.event.status != _.expanded) {
				_.fireEvent(_, 'changed', [_, _.expanded]);
				if(_.get('label.enable'))
				_.labelInvoke(_.get('label.linelength')*(_.expanded?2:-2)/3);
			}
			_.variable.event.status = _.expanded;
			if (_.expanded) {
				if (_.get('mutex') && !_.variable.event.poped) {
					_.expanded = false;
				} else {
					_.x += _.get('increment') * Math.cos(2 * Math.PI -_.get('middleAngle'));
					_.y -= _.get('increment') * Math.sin(2 * Math.PI - _.get('middleAngle'));
				}
			}
			return true;
		});

	}
});// @end

	/**
	 * @overview this component use for abc
	 * @component#$.Sector2D
	 * @extend#$.Sector
	 */
	$.Sector2D = $.extend($.Sector,{
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Sector2D.superclass.configure.apply(this,arguments);
			
			/**
			 * indicate the component's type
			 */
			this.type = 'sector2d';
			
			this.set({
				/**
				 * @cfg {Float (0~)} Specifies the sector's radius.Normally,this will given by chart.(default to 0)
				 */
				radius:0
			});
			
		},
		drawSector:function(){
			this.T.sector(
					this.x,
					this.y,
					this.r,
					this.get('startAngle'),
					this.get('endAngle'),
					this.get('fill_color'),
					this.get('border.enable'),
					this.get('border.width'),
					this.get('border.color'),
					this.get('shadow'),
					this.get('shadow_color'),
					this.get('shadow_blur'),
					this.get('shadow_offsetx'),
					this.get('shadow_offsety'),
					this.get('counterclockwise'));
		},
		isEventValid:function(e){
			if(this.label&&this.label.isEventValid(e).valid)
				return {valid:true};
				
			if((this.r)<$.distanceP2P(this.x,this.y,e.offsetX,e.offsetY)){
				return {valid:false};
			}
			/**
			 * 与x轴正方向形成的夹角、x轴逆时针的角度、并转换弧度参照 
			 */
			if($.angleInRange(this.get('startAngle'),this.get('endAngle'),(2*Math.PI - $.atan2Radian(this.x,this.y,e.offsetX,e.offsetY)))){
				return {valid:true};
			}
			return {valid:false};
		},
		tipInvoke:function(){
			var _ = this;
			return function(w,h){
				var P = $.p2Point(_.x,_.y,_.get('middleAngle'),_.r*0.8),Q  = $.quadrantd(_.get('middleAngle'));
				return {
					left:(Q>=2&&Q<=3)?(P.x - w):P.x,
					top:Q>=3?(P.y - h):P.y
				}
			}
		},
		doConfig:function(){
			$.Sector2D.superclass.doConfig.call(this);
			
			this.r = this.get('radius');
			$.Assert.gtZero(this.r);
			
			
			if(this.get('gradient')){
				this.push('fill_color',this.T.avgRadialGradient(this.x,this.y,0,this.x,this.y,this.r,[this.get('light_color'),this.get('dark_color')]));
			}
			
			this.pushIf('increment',$.lowTo(5,this.r/8));
			
			if(this.get('label.enable')){
				this.pushIf('label.linelength',$.lowTo(10,this.r/8));
				
				var A = this.get('middleAngle'),
				Q  = $.quadrantd(A),
				P2 = $.p2Point(this.x,this.y,A,this.r/2);
			
				this.push('label.originx',P2.x);
				this.push('label.originy',P2.y);
				this.push('label.quadrantd',Q);
				
				var P = $.p2Point(this.x,this.y,A,this.r + this.get('label.linelength'));
				this.push('label.line_potins',[P2.x,P2.y,P.x,P.y]);
				this.push('label.labelx',P.x);
				this.push('label.labely',P.y);
				
				this.label = new $.Label(this.get('label'),this);
			}
		}
});
	/**
	 * @overview this component use for abc
	 * @component#$.Sector3D
	 * @extend#$.Sector
	 */
	$.Sector3D = $.extend($.Sector,{
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Sector3D.superclass.configure.apply(this,arguments);
			
			/**
			 * indicate the component's type
			 */
			this.type = 'sector3d';
			this.dimension = $._3D;
			
			this.set({
				/**
				 * @cfg {Number}  Specifies major semiaxis of ellipse.Normally,this will given by chart.(default to 0)
				 */
				semi_major_axis:0,
				/**
				 * @cfg {Number} Specifies minor semiaxis of ellipse.Normally,this will given by chart.(default to 0)
				 */
				semi_minor_axis:0,
				/**
				 * @cfg {Float (0~)} Specifies the sector's height(thickness).Normally,this will given by chart.(default to 0)
				 */
				cylinder_height:0
			});
			
			
		},
		drawSector:function(){
			this.T.sector3D(
					this.x,
					this.y,
					this.a,
					this.b,
					this.get('startAngle'),
					this.get('endAngle'),
					this.h,
					this.get('background_color'),
					this.get('border.enable'),
					this.get('border.width'),
					this.get('border.color'),
					this.get('shadow'),
					this.get('shadow_color'),
					this.get('shadow_blur'),
					this.get('shadow_offsetx'),
					this.get('shadow_offsety'),
					this.get('counterclockwise'));
		},
		isEventValid:function(e){
			if(this.get('label.enable')){
				if(this.label.isEventValid(e).valid)
					return {valid:true};
			}
			if(!$.inEllipse(e.offsetX - this.x,e.offsetY-this.y,this.a,this.b)){
				return {valid:false};
			}
			if($.inRange(this.sA,this.eA,(2*Math.PI - $.atan2Radian(this.x,this.y,e.offsetX,e.offsetY)))){
				return {valid:true};
			}
			return {valid:false};
		},
		p2p:function(x,y,a,z){
			return {
				x:x+this.a*Math.cos(a)*z,
				y:y+this.b*Math.sin(a)*z
			};
		},
		tipInvoke:function(){
			var A = this.get('middleAngle'),
				Q  = $.quadrantd(A),
				_ =  this;
			return function(w,h){
				var P = _.p2p(_.x,_.y,A,0.6);
				return {
					left:(Q>=2&&Q<=3)?(P.x - w):P.x,
					top:Q>=3?(P.y - h):P.y
				}
			}
		},
		doConfig:function(){
			$.Sector3D.superclass.doConfig.call(this);
			
			this.a = this.get('semi_major_axis');
			this.b = this.get('semi_minor_axis');
			this.h = this.get('cylinder_height');
			
			$.Assert.gtZero(this.a);
			$.Assert.gtZero(this.b);
			
			this.pushIf('increment',$.lowTo(5,this.a/8));
			
			this.inc = Math.PI/180,ccw = this.get('counterclockwise');
			
			var toAngle = function(A){
				var t = $.atan2Radian(0,0,this.a*Math.cos(A),ccw?(-this.b*Math.sin(A)):(this.b*Math.sin(A)));
				if(!ccw&&t!=0){
					t = 2*Math.PI - t;
				}
				return t;
			}
			this.sA = toAngle.call(this,this.get('startAngle'));
			this.eA = toAngle.call(this,this.get('endAngle'));
			
			if(this.get('label.enable')){
				this.pushIf('label.linelength',$.lowTo(10,this.a/8));
				this.Z = this.get('label.linelength')/this.a+1;
				var A = this.get('middleAngle'),
				Q  = $.quadrantd(A),
				
				P = this.p2p(this.x,this.y,A,this.Z),
				P2 = this.p2p(this.x,this.y,A,1),
				ccw = this.get('counterclockwise');
				
				this.push('label.originx',P2.x);
				this.push('label.originy',P2.y);
				this.push('label.quadrantd',Q);
				
				this.push('label.line_potins',[P2.x,P2.y+this.h/2,P.x,P.y+this.h/2]);
				this.push('label.line_globalComposite',(ccw&&A<Math.PI)||(!ccw&&A>Math.PI));
				this.push('label.labelx',P.x);
				this.push('label.labely',P.y+this.h/2);
				
				this.label = new $.Label(this.get('label'),this);
			}
		}
});
/**
 * @overview this component use for abc
 * @component#$.Pie
 * @extend#$.Chart
 */
$.Pie = $.extend($.Chart, {
	/**
	 * initialize the context for the pie
	 */
	configure : function() {
		/**
		 * invoked the super class's configuration
		 */
		$.Pie.superclass.configure.call(this);

		this.type = 'pie';
		this.dataType = 'simple';

		this.set({
			/**
			 * @cfg {Float (0~)} Specifies the pie's radius.(default to calculate by the size of chart)
			 */
			radius : 0,
			/**
			 * @cfg {Number} initial angle for first sector
			 */
			offsetAngle : 0,
			/**
			 * @cfg {String} the event's name trigger pie pop(default to 'click')
			 */
			bound_event : 'click',
			/**
			 * @inner {Boolean} True to make sector counterclockwise.(default to false)
			 */
			counterclockwise : false,
			/**
			 * @inner {Boolean} 当与其他label有位置冲突时自动浮动其位置.(default to true).
			 */
			intellectLayout : true,
			/**
			 * @inner {Boolean} if it has animate when a piece popd (default to false)
			 */
			pop_animate : false,
			/**
			 * @cfg {Boolean} Specifies as true it means just one piece could pop (default to false)
			 */
			mutex : false,
			/**
			 * @cfg {Number} Specifies the length when sector bounded.(default to 1/8 radius,and minimum is 5),
			 */
			increment : undefined,
			/**
			 * @cfg {Object} Specifies the config of label.For details see <link>$.Label</link> Note:this has a extra property named 'enable',indicate whether label available(default to true)
			 */
			label : {
				enable : true
			},
			/**
			 * @cfg {Object} option of sector.Note,Pie2d depend on Sector2d and pie3d depend on Sector3d.For details see <link>$.Sector</link>
			 */
			sector : {}
		});

		this.registerEvent(
		/**
		 * @event Fires when this element' sector bounded
		 * @paramter $.Sector2d#sector
		 * @paramter string#name
		 * @paramter int#index
		 */
		'bound',
		/**
		 * @event Fires when this element' sector rebounded
		 * @paramter $.Sector2d#sector
		 * @paramter string#name
		 * @paramter int#index
		 */
		'rebound',
		/**
		 * @event Fires when parse this label's data.Return value will override existing. Only valid when label is available
		 * @paramter Object#data this label's data item
		 * @paramter string#text the current tip's text
		 * @paramter int#i the index of data
		 */
		'parseLabelText');

		this.sectors = [];
	},
	/**
	 * @method this is a experimental method.it seems not work well,Add item(s) into the Chart at the given index or not.This method accepts either a single object of data config or a array of items's config
	 * @paramter data#Object/Array the data's config
	 * @paramter index#int The start index at which to add the item.(default to append)
	 * @paramter animate#boolean if has a animation when drawing
	 * @return void
	 */
	add : function(data, index, animate) {
		data = $.Pie.superclass.add.call(this, data, index, animate);
		if (!data)
			return;

		this.calculate();

		data.each(function(d, i) {
			d.new_ = true;
			this.doSector(d, i);
		}, this);

		/**
		 * update index,percent of each sector and angle and so on
		 */
		this.data.each(function(d, i) {
			if (d.new_) {
				delete d.new_;
			} else {
				var t = d.name + (this.get('showpercent') ? $.toPercent(d.value / this.total, this.get('decimalsnum')) : '');

				if (this.get('label.enable'))
					d.reference.label.text(this.fireString(this, 'parseLabelText', [d, i], t));

				if (this.get('tip.enable'))
					d.reference.tip.text(this.fireString(this, 'parseTipText', [d, i], t));

				d.reference.id = i;
				d.reference.push('startAngle', d.startAngle);
				d.reference.push('middleAngle', d.middleAngle);
				d.reference.push('endAngle', d.endAngle);
				d.reference.push('totalAngle', d.endAngle - d.startAngle);
			}
		}, this);

		if (animate) {
			this.animation(this);
			return;
		}

		this.draw();
	},
	/**
	 * @method Toggle sector bound or rebound by a specific index.
	 * @paramter int#i the index of sector
	 * @return void
	 */
	toggle : function(i) {
		this.data[i || 0].reference.toggle();
	},
	/**
	 * @method bound sector by a specific index.
	 * @paramter int#i the index of sector
	 * @return void
	 */
	bound : function(i) {
		this.data[i || 0].reference.bound();
	},
	/**
	 * @method rebound sector by a specific index.
	 * @paramter int#i the index of sector
	 * @return void
	 */
	rebound : function(i) {
		this.data[i || 0].reference.rebound();
	},
	/**
	 * @method Returns an array containing all sectors of this pie
	 * @return Array#the collection of sectors
	 */
	getSectors : function() {
		return this.sectors;
	},
	doAnimation : function(t, d) {
		var s, si = 0, cs = this.offsetAngle;
		this.data.each(function(D, i) {
			s = D.reference;
			si = this.animationArithmetic(t, 0, s.get('totalAngle'), d);
			s.push('startAngle', cs);
			s.push('endAngle', cs + si);
			cs += si;
			s.drawSector();
		}, this);
	},
	localizer : function(la) {
		/**
		 * the code not optimization,need to enhance so that the label can fit the continar
		 */
		this.sectors.each(function(s, i) {
			var l = s.label, x = l.labelx, y = l.labely;
			if ((la.labely <= y && (y - la.labely) < la.get('height')) || (la.labely > y && (la.labely - y) < l.get('height'))) {
				if ((la.labelx < x && (x - la.labelx) < la.get('width')) || (la.labelx > x && (la.labelx - x) < l.get('width'))) {
					var q = la.get('quadrantd');
					if ((q == 2 || q == 3) || la.labely < y) {
						/**
						 * console.log('upper..'+la.get('text')+'==='+l.get('text'));
						 */
						la.push('labely', la.get('labely') - la.get('height') + y - la.labely - 2);
						la.push('line_potins', la.get('line_potins').concat(la.get('labelx'), la.get('labely')));
					} else {
						/**
						 * console.log('lower..'+la.get('text')+'==='+l.get('text'));
						 */
						la.push('labely', la.get('labely') + l.get('height') - la.labely + y + 2);
						la.push('line_potins', la.get('line_potins').concat(la.get('labelx'), la.get('labely')));
					}
					la.localizer();
				}
			}
		}, this);
	},
	doParse : function(d, i) {
		var _ = this, t = d.name + (_.get('showpercent') ? ' ' + $.toPercent(d.value / _.total, _.get('decimalsnum')) : d.value);
		if (_.get('label.enable')) {
			_.push('sector.label.text', _.fireString(_, 'parseLabelText', [d, i], t));
		}
		if (_.get('tip.enable'))
			_.push('sector.tip.text', _.fireString(_, 'parseTipText', [d, i], t));

		_.push('sector.id', i);
		_.push('sector.value', d.value);
		_.push('sector.name', d.name);
		_.push('sector.listeners.changed', function(se, st, i) {
			_.fireEvent(_, st ? 'bound' : 'rebound', [_, se.get('name')]);
		});
		_.push('sector.startAngle', d.startAngle);
		_.push('sector.middleAngle', d.middleAngle);
		_.push('sector.endAngle', d.endAngle);
		_.push('sector.background_color', d.color);

		d.reference = this.doSector(d);

		this.sectors.push(d.reference);

		if (this.get('label.enable') && this.get('intellectLayout')) {
			this.localizer(d.reference.label);
		}
	},
	/**
	 * calculate pie chart's angle
	 */
	calculate : function() {
		var eA = this.offsetAngle, sA = eA, L = this.data.length;
		this.data.each(function(d, i) {
			eA += (2 * d.value / this.total) * Math.PI;
			if (i == (L - 1)) {
				eA = 2 * Math.PI + this.offsetAngle;
			}
			d.startAngle = sA;
			d.endAngle = eA;
			d.totalAngle = eA - sA;
			d.middleAngle = (sA + eA) / 2;
			sA = eA;
		}, this);
	},
	doConfig : function() {
		$.Pie.superclass.doConfig.call(this);
		$.Assert.gtZero(this.total, 'this.total');

		this.offsetAngle = $.angle2Radian(this.get('offsetAngle'));

		var r = this.get('radius'), f = this.get('minDistance') * (this.get('label.enable') && !this.is3D() ? 0.35 : 0.5);

		this.calculate();

		/**
		 * calculate pie chart's radius
		 */
		if (r <= 0 || r > f) {
			r = this.push('radius', Math.floor(f));
		}

		this.r = r;
		/**
		 * calculate pie chart's increment
		 */
		this.pushIf('increment', $.lowTo(5, r / 8));

		/**
		 * calculate pie chart's alignment
		 */
		if (this.get('align') == 'left') {
			this.push('originx', r + this.get('l_originx') + this.get('offsetx'));
		} else if (this.get('align') == 'right') {
			this.push('originx', this.get('r_originx') - r + this.get('offsetx'));
		} else {
			this.push('originx', this.get('centerx') + this.get('offsetx'));
		}
		this.push('originy', this.get('centery') + this.get('offsety'));

		$.apply(this.get('sector'), $.clone([
				'originx',
				'originy',
				'bound_event',
				'customize_layout',
				'counterclockwise',
				'pop_animate',
				'mutex',
				'shadow',
				'shadow_color',
				'shadow_blur',
				'shadow_offsetx',
				'shadow_offsety',
				'increment',
				'gradient',
				'color_factor',
				'label',
				'tip',
				'border'], this.options));

	}
});// @end

/**
 * @overview this component use for abc
 * @component#@chart#$.Pie2D
 * @extend#$.Pie
 */
$.Pie2D = $.extend($.Pie, {
	/**
	 * initialize the context for the pie2d
	 */
	configure : function() {
		/**
		 * invoked the super class's configuration
		 */
		$.Pie2D.superclass.configure.call(this);

		this.type = 'pie2d';

	},
	doSector:function(){
		return  new $.Sector2D(this.get('sector'), this);
	},
	doConfig : function() {
		$.Pie2D.superclass.doConfig.call(this);
		/**
		 * quick config to all rectangle
		 */
		this.push('sector.radius',this.r)
		
		this.data.each(function(d,i){
			this.doParse(d,i);
		},this);
		
		this.pushComponent(this.sectors);
	}
});
	/**
	 * @overview this component use for abc
	 * @component#@chart#$.Pie3D
	 * @extend#$.Pie
	 */
	$.Pie3D = $.extend($.Pie,{
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Pie3D.superclass.configure.apply(this,arguments);
			
			/**
			 * indicate the legend's type
			 */
			this.type = 'pie3d';
			this.dimension = $._3D;
			
			this.set({
				/**
				 * @cfg {Number} Three-dimensional rotation Z in degree(angle).socpe{0-90}.(default to 45)
				 */
				 zRotate:45,
				 /**
				 * @cfg {Number} Specifies the pie's thickness in pixels.(default to 30)
				 */
				 yHeight:30
			});
			
		},
		doSector:function(d){
			this.push('sector.cylinder_height',(d.height?d.height*Math.cos($.angle2Radian(this.get('zRotate'))):this.get('cylinder_height')));
			return new $.Sector3D(this.get('sector'), this);
		},
		doConfig:function(){
			$.Pie3D.superclass.doConfig.call(this);
			
			this.push('zRotate',$.between(0,90,90-this.get('zRotate')));
			this.push('cylinder_height',this.get('yHeight')*Math.cos($.angle2Radian(this.get('zRotate'))));
			this.push('sector.semi_major_axis',this.r);
			this.push('sector.semi_minor_axis',this.r*this.get('zRotate')/90);
			
			
			this.push('sector.semi_major_axis',this.r);
			
			this.data.each(function(d,i){
				this.doParse(d,i);
			},this);
			
			this.pushComponent(this.sectors);
			
		}
});
/**
 * @overview this component use for abc
 * @component#$.Column
 * @extend#$.Chart
 */
$.Column = $.extend($.Chart, {
	/**
	 * initialize the context for the Column
	 */
	configure : function(config) {
		/**
		 * invoked the super class's configuration
		 */
		$.Column.superclass.configure.call(this);

		this.type = 'column';
		this.dataType = 'simple';
		this.set({
			/**
			 * @cfg {Object} the option for coordinate. see <link>$.Coordinate2D</link>
			 */
			coordinate : {},
			/**
			 * @cfg {Number} the width of each column(default to calculate according to coordinate's width)
			 */
			colwidth : undefined,
			/**
			 * @cfg {Number} the distance of column's bottom and text(default to 6)
			 */
			text_space : 6,
			/**
			 * @cfg {String} the align of scale(default to 'left') Available value are:
			 * @Option 'left'
			 * @Option 'right'
			 */
			scaleAlign : 'left',
			/**
			 * @cfg {Object} option of rectangle.see <link>$.Rectangle</link>
			 */
			rectangle : {}
		});

		this.registerEvent();

		this.rectangles = [];
		this.labels = [];
		this.labels.ignore = true;
	},
	doAnimation : function(t, d) {
		var r, h;
		this.coo.draw();
		for ( var i = 0; i < this.labels.length; i++) {
			this.labels[i].draw();
		}
		for ( var i = 0; i < this.rectangles.length; i++) {
			r = this.rectangles[i];
			h = Math.ceil(this.animationArithmetic(t, 0, r.height, d));
			r.push('originy', r.y + (r.height - h));
			r.push('height', h);
			r.drawRectangle();
		}
	},
	/**
	 * @method Returns the coordinate of this element.
	 * @return $.Coordinate2D
	 */
	getCoordinate:function(){
		return this.coo;
	},
	doParse : function(d, i, id, x, y, h) {
		var t = (this.get('showpercent') ? $.toPercent(d.value / this.total, this.get('decimalsnum')) : d.value);
		
		if (this.get('tip.enable'))
			this.push('rectangle.tip.text', this.fireString(this, 'parseTipText', [d,d.value,i],d.name + ' '+t));
		
		this.push('rectangle.value', t);
		this.push('rectangle.name', d.name);
		this.push('rectangle.background_color', d.color);

		this.push('rectangle.id', id);
		this.push('rectangle.originx', x);
		this.push('rectangle.originy', y);
		this.push('rectangle.height', h);

	},
	doConfig : function() {
		$.Column.superclass.doConfig.call(this);
		/**
		 * apply the coordinate feature
		 */
		$.Interface.coordinate.call(this);

		if (this.dataType == 'simple') {
			var L = this.data.length, W = this.get('coordinate.width'), hw = this.pushIf('colwidth', W / (L * 2 + 1));

			if (hw * L > W) {
				hw = this.push('colwidth', W / (L * 2 + 1));
			}

			/**
			 * the space of two column
			 */
			this.push('hispace', (W - hw * L) / (L + 1));

		}

		if (this.is3D()) {
			this.push('zHeight', this.get('colwidth') * this.get('zScale'));
		}

		/**
		 * use option create a coordinate
		 */
		this.coo = $.Interface.coordinate_.call(this);

		this.pushComponent(this.coo,true);

		/**
		 * quick config to all rectangle
		 */
		$.apply(this.get('rectangle'), $.clone(['shadow', 'shadow_color', 'shadow_blur', 'shadow_offsetx', 'shadow_offsety', 'gradient', 'color_factor', 'label', 'tip', 'border'], this.options));

		this.push('rectangle.width', this.get('colwidth'));
	}

});// @end

/**
 * @overview this component use for abc
 * @component#@chart#$.Column2D
 * @extend#$.Column
 */
$.Column2D = $.extend($.Column, {
	/**
	 * initialize the context for the Column2D
	 */
	configure : function() {
		/**
		 * invoked the super class's configuration
		 */
		$.Column2D.superclass.configure.call(this);

		this.type = 'column2d';
		
	},
	doConfig : function() {
		$.Column2D.superclass.doConfig.call(this);

		/**
		 * get the max/min scale of this coordinate for calculated the height
		 */
		var S = this.coo.getScale(this.get('scaleAlign')), bs = this.coo.get('brushsize'), H = this.coo.get('height'), h2 = this.get('colwidth') / 2, gw = this.get('colwidth') + this.get('hispace'), h;

		this.data.each(function(d, i) {
			h = (d.value - S.start) * H / S.distance;
			
			this.doParse(d, i, i, this.x + this.get('hispace') + i * gw, this.y + H - h - bs, h);
			d.reference = new $.Rectangle2D(this.get('rectangle'), this);
			this.rectangles.push(d.reference);
			
			this.labels.push(new $.Text({
				id : i,
				text : d.name,
				originx : this.x + this.get('hispace') + gw * i + h2,
				originy : this.y + H + this.get('text_space')
			}, this));

		}, this);

		this.pushComponent(this.labels);
		this.pushComponent(this.rectangles);
	}

});// @end

	/**
	 * @overview this component use for abc
	 * @component#@chart#$.Column3D
	 * @extend#$.Column
	 */
	$.Column3D = $.extend($.Column,{
		/**
		 * initialize the context for the Column3D 
		 */
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Column3D.superclass.configure.call(this);
			
			this.type = 'column3d';
			this.dimension = $._3D;
			
			this.set({
				/**
				 * @cfg {Number(0~90)} Three-dimensional rotation X in degree(angle).(default to 60)
				 */
				xAngle:60,
				/**
				 * @cfg {Number(0~90)} Three-dimensional rotation Y in degree(angle).(default to 20)
				 */
				yAngle:20,
				/**
				 * @cfg {Number} Three-dimensional z-axis deep factor.frame of reference is width.(default to 1)
				 */
				zScale:1,
				/**
				 * @cfg {Number(1~)} Three-dimensional z-axis deep factor of pedestal.frame of reference is width.(default to 1.4)
				 */
				bottom_scale:1.4
			});
		},
		doConfig:function(){
			$.Column3D.superclass.doConfig.call(this);
			/**
			 * quick config to all rectangle
			 */
			this.push('rectangle.xAngle_',this.get('xAngle_'));
			this.push('rectangle.yAngle_',this.get('yAngle_'));
			
			//get the max/min scale of this coordinate for calculated the height
			var S = this.coo.getScale(this.get('scaleAlign')),
				zh = this.get('zHeight')*(this.get('bottom_scale')-1)/2*this.get('yAngle_'),
				h2 = this.get('colwidth')/2,
				gw = this.get('colwidth')+this.get('hispace'),
				H = this.coo.get('height'),h;
			
			this.data.each(function(d, i) {
				h = (d.value - S.start) * H / S.distance;
				
				this.doParse(d, i, i, this.x + this.get('hispace') + i * gw, this.y +(H-h)-zh, h);
				d.reference = new $.Rectangle3D(this.get('rectangle'), this);
				this.rectangles.push(d.reference);
				
				this.labels.push(new $.Text({
					id : i,
					text : d.name,
					originx : this.x + this.get('hispace') + gw * i + h2,
					originy : this.y + H + this.get('text_space')
				}, this));
				
			}, this);
			
			this.pushComponent(this.labels);
			this.pushComponent(this.rectangles);
		}
		
});
	/**
	 * @overview this component use for abc
	 * @component#@chart#$.ColumnMulti2D
	 * @extend#$.Column
	 */
	$.ColumnMulti2D = $.extend($.Column,{
		/**
		 * initialize the context for the ColumnMulti2D
		 */
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.ColumnMulti2D.superclass.configure.call(this);
			
			this.type = 'columnmulti2d';
			this.dataType = 'complex';
			
			//this.set({});
			
			//this.registerEvent();
			this.columns = [];
		},
		doRectangle : function(d, i, id, x, y, h) {
			this.doParse(d, i, id, x, y, h);
			d.reference = new $.Rectangle2D(this.get('rectangle'), this);
			this.rectangles.push(d.reference);
		},
		doConfig:function(){
			$.ColumnMulti2D.superclass.doConfig.call(this);
			
			var L = this.data.length,
				KL= this.data_labels.length,
				W = this.get('coordinate.width'),
				H = this.get('coordinate.height'),
				total = KL*L,
				bw = this.pushIf('colwidth',W/(KL+1+total));
			
			if(bw*total>W){
				bw = this.push('colwidth',W/(KL+1+total));
			}
			
			this.push('hispace',(W - bw*total)/(KL+1));
			
			//get the max/min scale of this coordinate for calculated the height
			var S = this.coo.getScale(this.get('scaleAlign')),
				bs = this.coo.get('brushsize'),
				gw = this.data.length*bw+this.get('hispace'),
				h;
			
			/**
			 * quick config to all rectangle
			 */
			this.push('rectangle.width',bw);
			
			this.columns.each(function(column, i) {
				
				column.item.each(function(d, j) {
					h = (d.value - S.start) * H / S.distance;
					this.doParse(d, j, i+'-'+j, this.x + this.get('hispace')+j*bw+i*gw, this.y + H - h - bs, h);
					d.reference = new $.Rectangle2D(this.get('rectangle'), this);
					this.rectangles.push(d.reference);
					
				}, this);
				
				this.labels.push(new $.Text({
					id:i,
					text:column.name,
					originx:this.x +this.get('hispace')*0.5+(i+0.5)*gw,
	 				originy:this.get('originy')+H+this.get('text_space')
				},this));
				
			}, this);
			
			this.pushComponent(this.labels);
			this.pushComponent(this.rectangles);
		}
});
	
    $.ColumnMulti3D = $.extend($.ColumnMulti2D, {
        configure: function() {
            $.ColumnMulti3D.superclass.configure.call(this);
            this.type = "columnmulti3d";
            this.dataType = "complex";
            this.dimension = $._3D;
            this.set({
                xAngle: 60,
                yAngle: 20,
                zScale: 1,
                group_fator: 0.3,
                bottom_scale: 1.4
            });
        },
        doConfig: function() {
            $.ColumnMulti3D.superclass.doConfig.call(this);
        }
    });
    
    
/**
 * @overview this component use for abc
 * @component#$.Bar
 * @extend#$.Chart
 */
$.Bar = $.extend($.Chart, {
	/**
	 * initialize the context for the bar
	 */
	configure : function() {
		/**
		 * invoked the super class's configuration
		 */
		$.Bar.superclass.configure.call(this);

		this.type = 'bar';
		this.dataType = 'simple';
		this.set({
			/**
			 * @cfg {Object} Specifies the option for coordinate.For details see <link>$.Coordinate2D</link>
			 */
			coordinate : {
				alternate_direction : 'h'
			},
			/**
			 * @cfg {Number} Specifies the width of each bar(default to calculate according to coordinate's height)
			 */
			barheight : undefined,
			/**
			 * @cfg {Number} Specifies the distance of bar's bottom and text(default to 6)
			 */
			text_space : 6,
			/**
			 * @cfg {String} Specifies the align of scale(default to 'bottom') Available value are:
			 * @Option 'top,'bottom'
			 */
			scaleAlign : 'bottom',
			/**
			 * @cfg {Object} option of rectangle.see <link>$.Rectangle</link>
			 */
			rectangle : {}
		});

		this.registerEvent();

		this.rectangles = [];
		this.labels = [];
	},
	doParse : function(d, i, id, x, y, w) {
		var t = (this.get('showpercent') ? $.toPercent(d.value / this.total, this.get('decimalsnum')) : d.value);
		if (this.get('tip.enable'))
			this.push('rectangle.tip.text', this.fireString(this, 'parseTipText', [d, d.value, i], d.name + ' ' + t));

		this.push('rectangle.value', t);
		this.push('rectangle.background_color', d.color);

		this.push('rectangle.id', id);
		// this.push('rectangle.originx', x);
	this.push('rectangle.originy', y);
	this.push('rectangle.width', w);

},
	doAnimation : function(t, d) {
		this.coo.draw();
		this.labels.each(function(l, i) {
			l.draw();
		}, this);

		this.rectangles.each(function(r, i) {
			r.push('width', Math.ceil(this.animationArithmetic(t, 0, r.width, d)));
			r.drawRectangle();
		}, this);
	},
	doConfig : function() {
		$.Bar.superclass.doConfig.call(this);
		/**
		 * Apply the coordinate feature
		 */
		$.Interface.coordinate.call(this);

		if (this.dataType == 'simple') {

			var L = this.data.length, H = this.get('coordinate.height'), bh = this.pushIf('barheight', H / (L * 2 + 1));
			/**
			 * bar's height
			 */
			if (bh * L > H) {
				bh = this.push('barheight', H / (L * 2 + 1));
			}
			/**
			 * the space of two bar
			 */
			this.push('barspace', (H - bh * L) / (L + 1));
		}

		if (this.is3D()) {

		}
		/**
		 * use option create a coordinate
		 */
		this.coo = $.Interface.coordinate_.call(this);
		this.pushComponent(this.coo, true);

		/**
		 * Quick config to all rectangle
		 */
		$.apply(this.get('rectangle'), $.clone(['shadow', 'shadow_color', 'shadow_blur', 'shadow_offsetx', 'shadow_offsety', 'gradient', 'color_factor'], this.options));

		/**
		 * quick config to all rectangle
		 */
		this.push('rectangle.height', bh);
		this.push('rectangle.valueAlign', 'right');
		this.push('rectangle.tipAlign', 'right');
		this.push('rectangle.originx', this.x + this.coo.get('brushsize'));

	}

});// @end

	
	/**
	 * @overview this component use for abc
	 * @component#@chart#$.Bar2D
	 * @extend#$.Bar
	 */
	$.Bar2D = $.extend($.Bar,{
		/**
		 * initialize the context for the pie
		 */
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Bar2D.superclass.configure.call(this);
			
			this.type = 'bar2d';
			
		},
		doConfig:function(){
			$.Bar2D.superclass.doConfig.call(this);
			
			/**
			 * get the max/min scale of this coordinate for calculated the height
			 */
			var S = this.coo.getScale(this.get('scaleAlign')),
				W = this.coo.get('width'),
				h2 = this.get('barheight')/2,
				gw = this.get('barheight')+this.get('barspace');
			
			this.data.each(function(d, i) {
				
				this.doParse(d, i, i, 0, this.y+this.get('barspace')+i*gw, (d.value - S.start) * W / S.distance);
				d.reference = new $.Rectangle2D(this.get('rectangle'), this);
				this.rectangles.push(d.reference);
				
				this.labels.push(new $.Text({
					id:i,
					textAlign:'right',
					textBaseline:'middle',
					text:d.name,
					originx:this.x - this.get('text_space'),
	 				originy:this.y + this.get('barspace')+i*gw +h2
				},this));
			}, this);
			
			this.pushComponent(this.labels);
			this.pushComponent(this.rectangles);
		}
		
});
	/**
	 * @overview this component use for abc
	 * @component#@chart#$.BarMulti2D
	 * @extend#$.Bar
	 */
	$.BarMulti2D = $.extend($.Bar,{
			/**
			 * initialize the context for the BarMulti2D
			 */
			configure:function(){
				/**
				 * invoked the super class's  configuration
				 */
				$.BarMulti2D.superclass.configure.call(this);
				
				this.type = 'barmulti2d';
				
				this.dataType = 'complex';
				
				this.columns = [];
			},
			doConfig:function(){
				$.BarMulti2D.superclass.doConfig.call(this);
				
				var L = this.data.length,
					KL= this.data_labels.length,
					W = this.coo.get('width'),
					H = this.coo.get('height'),
					total = KL*L,
					/**
					 * bar's height
					 */
					bh = this.pushIf('barheight',H/(KL+1+total));
				
				if(bh*L>H){
					bh = this.push('barheight',H/(KL+1+total));
				}
				
				/**
				 * the space of two bar
				 */
				this.push('barspace',(H - bh*total)/(KL+1));
				
				/**
				 * get the max/min scale of this coordinate for calculated the height
				 */
				var S = this.coo.getScale(this.get('scaleAlign')),
					gw = L*bh+this.get('barspace'),
					h2 = this.get('barheight')/2,
					w;
				
				this.push('rectangle.height',bh);
				this.columns.each(function(column, i) {
					column.item.each(function(d, j) {
						w = (d.value - S.start) * W / S.distance;
						this.doParse(d, j, i+'-'+j, this.x + this.get('hispace')+j*bh+i*gw,this.y + this.get('barspace')+j*bh+i*gw, w);
						d.reference = new $.Rectangle2D(this.get('rectangle'), this);
						this.rectangles.push(d.reference);
					}, this);
					
					this.labels.push(new $.Text({
						id:i,
						text:column.name,
						textAlign:'right',
						textBaseline:'middle',
						originx:this.x - this.get('text_space'),
		 				originy:this.y + this.get('barspace')*0.5+(i+0.5)*gw
					},this));
					
				}, this);
				
				this.pushComponent(this.labels);
				this.pushComponent(this.rectangles);
			}
			
	});
/**
 * Line ability for real-time show
 * 
 * @overview this component use for abc
 * @component#$.LineSegment
 * @extend#$.Component
 */
$.LineSegment = $.extend($.Component, {
	configure : function() {
		/**
		 * invoked the super class's configuration
		 */
		$.LineSegment.superclass.configure.apply(this, arguments);

		/**
		 * indicate the component's type
		 */
		this.type = 'linesegment';

		this.set({
			/**
			 * @cfg {Boolean} If true there show a point when Line-line intersection(default to true)
			 */
			intersection : true,
			/**
			 * @cfg {Boolean} if the label displayed (default to false)
			 */
			label : false,
			/**
			 * @cfg {String} Specifies the shape of two line segment' point(default to 'round').Only applies when intersection is true Available value are:
			 * @Option 'round'
			 */
			point_style : 'round',
			/**
			 * @cfg {Boolean} If true the centre of point will be hollow.(default to true)
			 */
			point_hollow : true,
			/**
			 * @cfg {Number} Specifies the size of point.(default size 3).Only applies when intersection is true
			 */
			point_size : 3,
			/**
			 * @inner {Array} the set of points to compose line segment
			 */
			points : [],
			/**
			 * @inner {Boolean} If true the event accord width coordinate.(default to false)
			 */
			keep_with_coordinate : false,
			/**
			 * @cfg {Number} Override the default as 1
			 */
			shadow_blur : 1,
			/**
			 * @cfg {Number} Override the default as 1
			 */
			shadow_offsety : 1,
			/**
			 * @inner {Number} Specifies the space between two point
			 */
			point_space : 0,
			/**
			 * @inner {Object} reference of coordinate
			 */
			coordinate : null,
			/**
			 * @cfg {Number} Specifies the valid range of x-direction.(default to 0)
			 */
			event_range_x : 0,
			/**
			 * @cfg {Boolean} If true tip show when the mouse must enter the valid distance of axis y.(default to false)
			 */
			limit_y : false,
			/**
			 * @cfg {Number} Specifies the space between the tip and point.(default to 2)
			 */
			tip_offset : 2,
			/**
			 * @cfg {Number} Specifies the valid range of y-direction.(default to 0)
			 */
			event_range_y : 0
		});

		this.label = null;
		this.tip = null;
	},
	drawLabel : function() {
		if (this.get('intersection') && this.get('label')) {
			var p = this.get('points');
			for ( var i = 0; i < p.length; i++) {
				this.T.textStyle('center', 'bottom', $.getFont(this.get('fontweight'), this.get('fontsize'), this.get('font')));
				this.T.fillText(p[i].value, this.x + p[i].x, this.y - p[i].y - this.get('point_size') * 3 / 2, false, this.get('background_color'), 'lr', 16);
			}
		}
	},
	drawLineSegment : function() {
		this.T.shadowOn(this.get('shadow'), this.get('shadow_color'), this.get('shadow_blur'), this.get('shadow_offsetx'), this.get('shadow_offsety'));
		var p = this.get('points');

		if (this.get('area')) {
			var polygons = [this.x, this.y];
			for ( var i = 0; i < p.length; i++) {
				polygons.push(this.x + p[i].x);
				polygons.push(this.y - p[i].y);
			}
			polygons.push(this.x + this.get('width'));
			polygons.push(this.y);
			var bg = this.get('light_color');
			if (this.get('gradient')) {
				bg = this.T.avgLinearGradient(this.x, this.y - this.get('height'), this.x, this.y, [this.get('light_color2'), bg]);
			}
			/**
			 * NEXT Config the area polygon
			 */
			this.T.polygon(bg, false, 1, '', false, '', 0, 0, 0, this.get('area_opacity'), polygons);
		}

		for ( var i = 0; i < p.length - 1; i++) {
			this.T.line(this.x + p[i].x, this.y - p[i].y, this.x + p[i + 1].x, this.y - p[i + 1].y, this.get('brushsize'), this.get('fill_color'), false);
		}

		if (this.get('intersection')) {
			for ( var i = 0; i < p.length; i++) {
				if (this.get('point_hollow')) {
					this.T.round(this.x + p[i].x, this.y - p[i].y, this.get('point_size'), '#FEFEFE', this.get('brushsize'), this.get('fill_color'));
				} else {
					this.T.round(this.x + p[i].x, this.y - p[i].y, this.get('point_size'), this.get('fill_color'));
				}
			}
		}

		if (this.get('shadow')) {
			this.T.shadowOff();
		}
	},
	doDraw : function(opts) {
		this.drawLineSegment();
		this.drawLabel();
	},
	isEventValid : function(e) {
		return {
			valid : false
		};
	},
	tipInvoke : function() {
		var x = this.x, y = this.y, o = this.get('tip_offset'), s = this.get('point_size') + o, _ = this;
		return function(w, h, m) {
			var l = m.left, t = m.top;
			l = ((_.tipPosition < 3 && (m.left - w - x - o > 0)) || (_.tipPosition > 2 && (m.left - w - x - o < 0))) ? l - (w + o) : l + o;
			t = _.tipPosition % 2 == 0 ? m.top + s : m.top - h - s;
			return {
				left : l,
				top : t
			}
		}
	},
	doConfig : function() {
		$.LineSegment.superclass.doConfig.call(this);
		$.Assert.gtZero(this.get('point_space'), 'point_space');

		var _ = this, sp = this.get('point_space'), ry = _.get('event_range_y'), rx = _.get('event_range_x'), heap = _.get('tipInvokeHeap'), p = _.get('points');
		_.points = p;

		for ( var i = 0; i < p.length; i++) {
			p[i].width = p[i].x;
			p[i].height = p[i].y;
		}

		if (rx == 0) {
			rx = _.push('event_range_x', Math.floor(sp / 2));
		} else {
			rx = _.push('event_range_x', $.between(1, Math.floor(sp / 2), rx));
		}
		if (ry == 0) {
			ry = _.push('event_range_y', Math.floor(_.get('point_size')));
		}

		if (_.get('tip.enable')) {
			/**
			 * _ use for tip coincidence
			 */
			_.on('mouseover', function(e, m) {
				heap.push(_);
				_.tipPosition = heap.length;
			}).on('mouseout', function(e, m) {
				heap.pop();
			});
			_.push('tip.invokeOffsetDynamic', true);
			_.tip = new $.Tip(_.get('tip'), _);
		}

		var c = _.get('coordinate'), ly = _.get('limit_y'), k = _.get('keep_with_coordinate'), valid = function(i, x, y) {
			if (Math.abs(x - (_.x + p[i].x)) < rx && (!ly || (ly && Math.abs(y - (_.y - p[i].y)) < ry))) {
				return true;
			}
			return false;
		}, to = function(i) {
			return {
				valid : true,
				text : p[i].text,
				top : _.y - p[i].y,
				left : _.x + p[i].x,
				hit : true
			};
		};

		/**
		 * override the default method
		 */
		_.isEventValid = function(e) {
			// console.time('mouseover');
			if (c && !c.isEventValid(e).valid) {
				return {
					valid : false
				};
			}
			var ii = Math.floor((e.offsetX - _.x) / sp);
			if (ii < 0 || ii >= (p.length - 1)) {
				ii = $.between(0, p.length - 1, ii);
				if (valid(ii, e.offsetX, e.offsetY))
					return to(ii);
				else
					return {
						valid : k
					};
			}
			// calculate the pointer's position will between which two point?this function can improve location speed
			for ( var i = ii; i <= ii + 1; i++) {
				if (valid(i, e.offsetX, e.offsetY))
					return to(i);
			}
			// console.timeEnd('mouseover');
			return {
				valid : k
			};
		}

	}
});// @end

/**
 * @overview this component use for abc
 * @component#$.Line
 * @extend#$.Chart
 */
$.Line = $.extend($.Chart, {
	/**
	 * initialize the context for the line
	 */
	configure : function() {
		/**
		 * invoked the super class's configuration
		 */
		$.Line.superclass.configure.call(this);

		this.type = 'line';

		this.dataType = 'simple';

		this.set({
			/**
			 * @cfg {Object} the option for coordinate
			 */
			coordinate : {
				axis:{
					width:[0,0,2,2]
			 	}
			},
			/**
			 * @cfg {Object} Specifies config crosshair.(default enable to false).For details see <link>$.CrossHair</link>
			 * Note:this has a extra property named 'enable',indicate whether crosshair available(default to false)
			 */
			crosshair : {
				enable : false
			},
			/**
			 * @cfg {String} the align of scale.(default to 'left') Available value are:
			 * @Option 'left'
			 * @Option 'right'
			 */
			scaleAlign : 'left',
			/**
			 * @cfg {String} the align of label.(default to 'bottom') Available value are:
			 * @Option 'top,'bottom'
			 */
			labelAlign : 'bottom',
			/**
			 * @cfg {Array} the array of labels close to the axis
			 */
			data_labels : [],
			/**
			 * @cfg {Number} the distance of column's bottom and text.(default to 6)
			 */
			label_space : 6,
			/**
			 * @inner {Boolean} Can Line smooth?now has unavailable
			 */
			smooth : false,
			/**
			 * @cfg {Boolean} if the point are proportional space.(default to true)
			 */
			proportional_spacing : true,
			/**
			 * @inner {Number} the space of each label
			 */
			label_spacing : 0,
			/**
			 * @cfg {Object} the option for linesegment.
			 * For details see <link>$.LineSegment</link>
			 */
			segment_style : {},
			/**
			 * {Object} the option for legend.
			 */
			legend : {
				sign : 'round-bar',
				sign_size : 14
			}
		});

		this.registerEvent(
		/**
		 * @event Fires when parse this element'data.Return value will override existing.
		 * @paramter object#data the point's data
		 * @paramter int#x coordinate-x of point
		 * @paramter int#y coordinate-y of point
		 * @paramter int#index the index of point
		 * @return Object object Detail:
		 * @property text the text of point
		 * @property x coordinate-x of point
		 * @property y coordinate-y of point
		 */
		'parsePoint');

		this.lines = [];
	},
	doConfig : function() {
		$.Line.superclass.doConfig.call(this);

		/**
		 * apply the coordinate feature
		 */
		$.Interface.coordinate.call(this);

		var _ = this,s=_.data.length == 1;
		
		_.push('line_start', (_.get('coordinate.width') - _.get('coordinate.valid_width')) / 2);
		_.push('line_end', _.get('coordinate.width') - _.get('line_start'));

		if (_.get('proportional_spacing'))
			_.push('label_spacing', _.get('coordinate.valid_width') / (_.get('maxItemSize') - 1));

		_.push('segment_style.originx', _.get('originx') + _.get('line_start'));

		/**
		 * y also has line_start and line end
		 */
		_.push('segment_style.originy', _.get('originy') + _.get('coordinate.height'));

		_.push('segment_style.width', _.get('coordinate.valid_width'));
		_.push('segment_style.height', _.get('coordinate.valid_height'));

		_.push('segment_style.limit_y', !s);

		_.push('segment_style.keep_with_coordinate', s);

		
		if(_.get('crosshair.enable')){
			_.push('coordinate.crosshair', _.get('crosshair'));
			_.push('coordinate.crosshair.hcross',s);
			_.push('coordinate.crosshair.invokeOffset', function(e, m) {
				var r = _.lines[0].isEventValid(e);
					/**
					 * TODO how fire muti line?
					 */
					return r.valid ? r : false;
				});
		}
		
		/**
		 * quick config to all linesegment
		 */
		$.apply(_.get('segment_style'), $.clone(['shadow', 'shadow_blur', 'shadow_offsetx', 'shadow_offsety', 'gradient', 'color_factor','tip'], _.options));
		
	}

});// @end

	/**
	 * @overview this component use for abc
	 * @component#@chart#$.LineBasic2D
	 * @extend#$.Line
	 */
	$.LineBasic2D = $.extend($.Line,{
		/**
		 * initialize the context for the LineBasic2D
		 */
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.LineBasic2D.superclass.configure.call(this);
			
			this.type = 'basicline2d';
			
			 
			this.tipInvokeHeap = [];
		},
		doAnimation:function(t,d){
			var l,p;
			this.coo.draw();
			for(var i=0;i<this.lines.length;i++){
				l = this.lines[i]; 
				for(var j=0;j<l.points.length;j++){
					p = l.points[j];
					p.y = Math.ceil(this.animationArithmetic(t,0,p.height,d));
				}
				l.drawLineSegment();
			}
		},
		doConfig:function(){
			$.LineBasic2D.superclass.doConfig.call(this);
			
			this.coo = new $.Coordinate2D($.merge({
					scale:[{
						 position:this.get('scaleAlign'),	
						 max_scale:this.get('maxValue')
					},{
						 position:this.get('labelAlign'),	
						 scaleEnable:false,
						 start_scale:1,
						 scale:1,
						 end_scale:this.get('maxItemSize'),
						 labels:this.get('data_labels')
					}]
				},this.get('coordinate')),this);
			
			
			this.pushComponent(this.coo,true);
			
			this.push('segment_style.tip.showType','follow');
			this.push('segment_style.coordinate',this.coo);
			this.push('segment_style.tipInvokeHeap',this.tipInvokeHeap);
			
			
			//get the max/min scale of this coordinate for calculated the height
			var S = this.coo.getScale(this.get('scaleAlign')),
				H=this.get('coordinate.valid_height'),
				sp=this.get('label_spacing'),
				points,x,y,
				p;
			
			this.data.each(function(d,i){
				points = [];
				d.value.each(function(v,j){
					x = sp*j;
					y = (v-S.start)*H/S.distance;
					p = {x:x,y:y,value:v,text:v};
					$.merge(p,this.fireEvent(this,'parsePoint',[d,x,y,j]))
					if (this.get('tip.enable'))
						p.text = this.fireString(this,'parseTipText',[d,v,j],v);
					points.push(p);
				},this);	
				this.push('segment_style.point_space',sp);
				this.push('segment_style.points',points);
				this.push('segment_style.brushsize',d.linewidth||1);
				this.push('segment_style.background_color',d.color);
				
				this.lines.push(new $.LineSegment(this.get('segment_style'),this));
			},this);
			this.pushComponent(this.lines);
			
		}
		
});
;(function(){
	var Queue = function(T,L){
		this.T = T;
		this.line = L;
		this.direction = T.get('direction');
		this.size = T.get('queue_size');
		this.space = T.get('label_spacing');
		this.end = T.get('line_end');
	}
	
	Queue.prototype = {
		push:function(v){
			if(!$.isArray(v)){
				v = [v];
			}
			if(this.direction=='left'){
				v.reverse();
			}
			
			while(this.size<(this.line.points.length+v.length))
				this.line.points.shift();
			
			//平移
			for ( var j = 0; j < this.line.points.length; j++) {
				this.line.points[j].x += (this.space*v.length)*(this.direction=='left'?-1:1);
			}
			
			for ( var j = 0; j < v.length; j++) {
				x = this.direction=='left'?(this.end - this.space * j):(this.space * j);
				y = ($.between(this.T.S.start,this.T.S.end,v[j]) - this.T.S.start)*this.T.S.uh;
				this.line.points.push($.merge({x : x,y : y,value : v[j]},this.T.fireEvent(this.T, 'parsePoint', [v[j], x, y, j ])));
			}
		}
	}
	
	/**
	 * Line ability for real-time show 
	 * @overview this component use for abc
	 * @component#@chart#$.LineMonitor2D
	 * @extend#$.Line
	 */
	$.LineMonitor2D = $.extend($.Line,{
		/**
		 * initialize the context for the denseline2d
		 */
		configure : function(config) {
			/**
			 * invoked the super class's  configuration
			 */
			$.LineMonitor2D.superclass.configure.call(this);

			this.type = 'linemonitor2d';

			this.set({
				/**
				 * @cfg {String} the direction of line run (default 'left')
				 * Available value are:
				 * @Option 'left'
				 * @Option 'right'
				 */
				direction : 'left',
				queue_size : 10
			});
			this.registerEvent();
			
			this.queues = [];
			
		},
		createQueue:function(style){
			this.init();
			style = style || {};
			var LS = $.clone(this.get('segment_style'));
				LS.brushsize = style.linewidth || 1;
				LS.background_color = style.color || '#BDBDBD';
			var L = new $.LineSegment(LS, this);
			this.pushComponent(L);
			var queue = new Queue(this,L);
			//this.queues.push(queue);
			return queue;
		},
		doConfig : function() {
			$.LineMonitor2D.superclass.doConfig.call(this);
			
			var self = this;
			//the monitor not support the animation now
			self.push('animation',false);
			
			
			if (self.get('coordinate.crosshair.enable')) {
				self.push('coordinate.crosshair.hcross',self.data.length == 1);
				self.push('coordinate.crosshair.invokeOffset',function(e, m) {
						var r = self.lines[0].isEventValid(e);
						return r.valid ? r : false;
				});
			}
			
			self.coo = new $.Coordinate2D($.merge( {
				scale : [ {
					position : self.get('scaleAlign'),
					max_scale : self.get('maxValue')
				}, {
					position : self.get('labelAlign'),
					scaleEnable : false,
					start_scale : 1,
					scale : 1,
					end_scale : self.get('maxItemSize'),
					labels : self.get('labels')
				} ],
				axis : {
					width : [ 0, 0, 1, 1 ]
				}
			}, self.get('coordinate')), self);

			self.pushComponent(self.coo, true);
			
			self.push('label_spacing',self.get('coordinate.valid_width')/(self.get('queue_size')-1));
			
			if (!self.get('segment_style.tip')) {
				self.push('segment_style.tip', self.get('tip'));
			} else {
				self.push('segment_style.tip.wrap', self.get('tip.wrap'));
			}

			self.push('segment_style.tip.showType','follow');
			self.push('segment_style.coordinate',self.coo);
			self.push('segment_style.keep_with_coordinate',true);
			
			//get the max/min scale of this coordinate for calculated the height
			self.S = self.coo.getScale(self.get('scaleAlign'));
			self.S.uh = self.get('coordinate.valid_height')/ self.S.distance;
			

		}

	});
})();
	/**
	 * @overview this component use for abc
	 * @component#@chart#$.Area2D
	 * @extend#$.LineBasic2D
	 */
	$.Area2D = $.extend($.LineBasic2D,{
		/**
		 * initialize the context for the area2d
		 */
		configure:function(){
			/**
			 * invoked the super class's  configuration
			 */
			$.Area2D.superclass.configure.call(this);
			
			this.type = 'area2d';
			
			this.set({
				/**
				 * @cfg {Float} Specifies the opacity of this area.(default to 0.3)
				 */
				area_opacity:0.3
			});
			
		},
		doConfig:function(){
			/**
			 * must apply the area's config before 
			 */
			this.push('segment_style.area',true);
			this.push('segment_style.area_opacity',this.get('area_opacity'));
			
			$.Area2D.superclass.doConfig.call(this);
			
			
		}
	});
})(iChart);