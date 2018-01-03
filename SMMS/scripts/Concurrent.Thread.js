
(function(){
    if ( !this.Math || (typeof this.Math != 'object' && typeof this.Math != 'function') ) this.Math = new Object();
    if ( this.Math.ToInteger === undefined ) this.Math.ToInteger = undefined;
    if ( this.Math.ToInt32 === undefined ) this.Math.ToInt32 = undefined;
    if ( this.Math.ToUInt32 === undefined ) this.Math.ToUInt32 = undefined;
    if ( this.Math.ToUInt16 === undefined ) this.Math.ToUInt16 = undefined;
with ( function(){
with ( Math ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Math.ToInteger module.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Math';



// This module provides functions emulating the integral type 
// conversions defined in ECMA-262 3rd.



function ToInteger ( n ) {
    return n < 0 ? ceil(n)
                 : floor(n) || 0;
}



function ToInt32 ( n ) {
    return n | 0;
}



function ToUInt32 ( n ) {
    return n >>> 0;
}



function ToUInt16 ( n ) {
    return n & 0xFFFF;
}


            return {
                ToUInt16: ToUInt16, ToUInt32: ToUInt32, ToInt32: ToInt32, ToInteger: ToInteger
            };
        }();
    }
}.call(null) ) {
    this.Math.ToUInt16 = ToUInt16;
    this.Math.ToUInt32 = ToUInt32;
    this.Math.ToInt32 = ToInt32;
    this.Math.ToInteger = ToInteger;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( this.Data.Stack === undefined ) this.Data.Stack = undefined;
with ( function(){
with ( Data ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Stack module.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data';




function Stack ( )
{
    this.length = 0;
}

var proto = Stack.prototype;

proto.pop  = Array.prototype.pop;
proto.push = Array.prototype.push;

proto.peek = function ( )
{
    return this.length > 0
             ?  this[this.length-1]
             :  undefined;
};

proto.isEmpty = function ( )
{
    return this.length == 0;
};

            return {
                Stack: Stack
            };
        }();
    }
}.call(null) ) {
    this.Data.Stack = Stack;
}
}).call(null);

(function(){
    this.GLOBAL = this;
}).call(null);
(function(){
    if ( !this.Util || (typeof this.Util != 'object' && typeof this.Util != 'function') ) this.Util = new Object();
    if ( !this.Util.Arrayize || (typeof this.Util.Arrayize != 'object' && typeof this.Util.Arrayize != 'function') ) this.Util.Arrayize = new Object();
    if ( this.Util.Arrayize.arrayize === undefined ) this.Util.Arrayize.arrayize = undefined;
with ( function(){
with ( Util.Arrayize ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            


NAMESPACE = 'Util.Arrayize';




var slice = Array.prototype.slice;


function arrayize ( o ) {
    if ( !o ) return [];
    try {
        return slice.call(o, 0);
    } catch ( e ) {
        var r = [];
        for ( var i=0;  i < o.length;  i++ ) {
            r[i] = o[i];
        }
        return r;
    }
}


            return {
                arrayize: arrayize
            };
        }();
    }
}.call(null) ) {
    this.Util.Arrayize.arrayize = arrayize;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Data.Cons.Cell === undefined ) this.Data.Cons.Cell = undefined;
    if ( this.Data.Cons.Nil === undefined ) this.Data.Cons.Nil = undefined;
    if ( this.Data.Cons.nil === undefined ) this.Data.Cons.nil = undefined;
    if ( this.Data.Cons.cons === undefined ) this.Data.Cons.cons = undefined;
    if ( this.Data.Cons.car === undefined ) this.Data.Cons.car = undefined;
    if ( this.Data.Cons.cdr === undefined ) this.Data.Cons.cdr = undefined;
with ( function(){
with ( Data.Cons ) {

        return function () {
            var VERSION = '0.2.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Cons code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Cons';





function Cell ( car, cdr ) {
    this.car = car;
    this.cdr = cdr;
}

var proto = Cell.prototype;

proto.toString = function ( ) {
    return "(" + this.car + " . " + this.cdr + ")";
};

proto.toLocaleString = function ( ) {
    return "("
         + (this.car == null ? String(this.car) : this.car.toLocaleString)
         + " . "
         + (this.cdr == null ? String(this.cdr) : this.cdr.toLocaleString)
         + ")";
};

proto.isNil = function ( ) {
    return false;
};




function Nil ( ) {
    this.car = this;
    this.cdr = this;
}

var proto = Nil.prototype = new Cell();
proto.constructor = Nil;

proto.toString       = 
proto.toLocaleString = function ( ) {
    return "nil";
};

proto.isNil = function ( ) {
    return true;
};




function nil ( ) {
    return new Nil();
};



function cons ( car, cdr ) {
    return new Cell(car, cdr);
}



function car ( cell ) {
    return cell.car;
}



function cdr ( cell ) {
    return cell.cdr;
}


            return {
                nil: nil, Nil: Nil, car: car, Cell: Cell, cdr: cdr, cons: cons
            };
        }();
    }
}.call(null) ) {
    this.Data.Cons.nil = nil;
    this.Data.Cons.Nil = Nil;
    this.Data.Cons.car = car;
    this.Data.Cons.Cell = Cell;
    this.Data.Cons.cdr = cdr;
    this.Data.Cons.cons = cons;
}
}).call(null);
(function(){
    if ( !this.WebBrowser || (typeof this.WebBrowser != 'object' && typeof this.WebBrowser != 'function') ) this.WebBrowser = new Object();
    if ( !this.WebBrowser.ScriptExecuter || (typeof this.WebBrowser.ScriptExecuter != 'object' && typeof this.WebBrowser.ScriptExecuter != 'function') ) this.WebBrowser.ScriptExecuter = new Object();
    if ( this.WebBrowser.ScriptExecuter.register === undefined ) this.WebBrowser.ScriptExecuter.register = undefined;
    if ( this.WebBrowser.ScriptExecuter.exec === undefined ) this.WebBrowser.ScriptExecuter.exec = undefined;
with ( function(){
with ( WebBrowser.ScriptExecuter ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            

NAMESPACE = 'WebBrowser.ScriptExecuter';



var executers    = {};
var default_type = "text/javascript";



function register ( type, exec ) {
    if ( typeof exec != "function" ) throw new TypeError("function required, but got: " + exec);
    executers[String(type).toLowerCase()] = exec;
}



function exec ( ) {
    var metas = document.getElementsByTagName("META");
    for ( var i=0;  i < metas.length;  i++ ) {
        if ( String(metas[i].httpEquiv).match(/^Content-Script-Type$/i) ) {
            default_type = metas[i].content;
        }
    }
    var scripts = document.getElementsByTagName("SCRIPT");
    for ( var i=0;  i < scripts.length;  i++ ) {
        (function( el ){
            setTimeout(function(){ exec_aux(el); }, 0);
        })(scripts[i]);
    }
}


function exec_aux ( el ) {
    var mime = parseMIMEType(el.type ? el.type : default_type);
    if ( executers[mime.type] ) {
        if ( el.src ) {
            var req = createXHR();
            req.open("GET", el.src, true);
            req.onreadystatechange = function ( ) {
                if ( req.readyState == 4 ) rest(req.responseText);
            };
            req.send(null);
        } else {
            rest(el.innerHTML);
        }
    }
    function rest ( source ) {
        el.parentNode.removeChild(el);
        executers[mime.type](source, mime.attr);
    }
}


function createXHR ( ) {
    try {
        return new XMLHttpRequest();
    } catch (_){
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (_){
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
}


var NOT_TSPECIAL  = '[^][()<>@,;:\\\\"/?=\\x00-\\x20]';
var TOKEN         = "(?:" + NOT_TSPECIAL + "+)";
var MIME_TYPE     = "(?:" + TOKEN + "/" + TOKEN + ")";
var QUOTED_STRING = '(?:"[^"]*(?:\\\\.[^"]*)*")';
var VALUE         = "(?:" + TOKEN + "|" + QUOTED_STRING + ")";

function parseMIMEType ( text ) {
    text = String(text);
    var re = new RegExp("^" + MIME_TYPE, "g");
    re.lastIndex = 0;
    var result = re.exec(text);
    if ( !result ) return {type:text.toLowerCase(), attr:{}};
    var type = result[0].toLowerCase();
    var attr = {};
    text = text.substring(re.lastIndex);
    re = new RegExp("^\\s*;\\s*(" + TOKEN + ")\\s*=\\s*(" + VALUE + ")", "g");
    re.lastIndex = 0;
    while ( result = re.exec(text) ) {
        attr[result[1].toLowerCase()] = result[2];
        text = text.substring(re.lastIndex);
        re.lastIndex = 0;
    }
    return {type:type, attr:attr};
}


if ( window.addEventListener ) {
    window.addEventListener("load", exec, false);
} else if ( window.attachEvent ) {
    window.attachEvent("onload", exec);
} else {
    if ( window.onload ) {
        var temp = window.onload;
        window.onload = function ( ) {
            var r = temp.apply(this, arguments);
            exec();
            return r;
        };
    } else {
        window.onload = exec;
    }
}

            return {
                register: register, exec: exec
            };
        }();
    }
}.call(null) ) {
    this.WebBrowser.ScriptExecuter.register = register;
    this.WebBrowser.ScriptExecuter.exec = exec;
}
}).call(null);
(function(){
    if ( !this.WebBrowser || (typeof this.WebBrowser != 'object' && typeof this.WebBrowser != 'function') ) this.WebBrowser = new Object();
    if ( !this.WebBrowser.GUI || (typeof this.WebBrowser.GUI != 'object' && typeof this.WebBrowser.GUI != 'function') ) this.WebBrowser.GUI = new Object();
    if ( !this.WebBrowser.GUI.Event || (typeof this.WebBrowser.GUI.Event != 'object' && typeof this.WebBrowser.GUI.Event != 'function') ) this.WebBrowser.GUI.Event = new Object();
    if ( this.WebBrowser.GUI.Event.attach === undefined ) this.WebBrowser.GUI.Event.attach = undefined;
    if ( this.WebBrowser.GUI.Event.detach === undefined ) this.WebBrowser.GUI.Event.detach = undefined;
with ( function(){
with ( WebBrowser.GUI.Event ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            


NAMESPACE = 'WebBrowser.GUI.Event';




var listener_id = 0;
var registry = {};

attach(window, "unload", function(){
    for ( var i in registry ) detach(Number(i));
});




function attach ( element, type, listener, useCapture ) {
    if ( !element || typeof element !== "object" ) {
        throw new TypeError("argument not a element: " + element);
    }
    type = String(type);
    if ( typeof listener !== "function" ) {
        throw new TypeError("argument not a function: " + listener);
    }
    useCapture = Boolean(useCapture);
    
    function handler ( e ) {
        e = e || window.event;
        if ( !e.stopPropagation ) { // Sets standard properties for IE
            e.target        = e.srcElement;
            e.currentTarget = this;
            e.cancelable    = true;
            e.stopPropagation = function stopPropagation ( ) {
                this.cancelBubble = true;
            };
            var prevent_default = false;
            e.preventDefault = function preventDefault ( ) {
                prevent_default = true;
            };
        }
        var ret_val = listener.call(this, e);
        return prevent_default ? false : ret_val;
    }
    
    if ( element.addEventListener ) {
        element.addEventListener(type, handler, useCapture);
    } else if ( element.attachEvent ) {
        element.attachEvent("on"+type, handler);
    } else {
        element["on"+type] = handler;
    }
    
    var id = listener_id++;
    registry[id] = {
        element   : element,
        type      : type,
        listener  : listener,
        useCapture: useCapture,
        handler   : handler
    };
    return id;
}



function detach ( element, type, listener, useCapture ) {
    if ( arguments.length === 1 && typeof element === "number" ) {
        if ( !registry[element] ) return false;
        var reg    = registry[element];
        delete registry[element];
        return detach_aux(reg.element, reg.type, reg.handler, reg.useCapture);
    } else {
        if ( !element || typeof element !== "object" ) {
            throw new TypeError("argument is not an element: " + element);
        }
        type = String(type);
        if ( typeof listener !== "function" ) {
            throw new TypeError("argument is not s function: " + listener);
        }
        useCapture = Boolean(useCapture);
        var ret_val = false;
        for ( var i in registry ) {
            var reg = registry[i];
            if ( reg.element    === element
              && reg.type       === type
              && reg.listener   === listener
              && reg.useCapture === useCapture )
            {
                delete registry[i];
                ret_val = detach_aux(reg.element, reg.type, reg.handler, reg.useCapture) || ret_val;
            }
        }
        return ret_val;
    }
};

function detach_aux ( element, type, listener, useCapture ) {
    return  element.removeEventListener  ?  element.removeEventListener(type, listener, useCapture)  :
            element.detachEvent          ?  element.detachEvent("on"+type, listener)                 :
                                            delete element["on"+type]                                ;
}

            return {
                detach: detach, attach: attach
            };
        }();
    }
}.call(null) ) {
    this.WebBrowser.GUI.Event.detach = detach;
    this.WebBrowser.GUI.Event.attach = attach;
}
}).call(null);
(function(){
    if ( !this.JSON || (typeof this.JSON != 'object' && typeof this.JSON != 'function') ) this.JSON = new Object();
    if ( this.JSON.dump === undefined ) this.JSON.dump = undefined;
with ( function(){
with ( JSON ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            

NAMESPACE = 'JSON';




var DUMPER = "JSON.dumper";



function dump ( data, opts ) {
    opts = opts || {};
    var indent = String(opts.indent);
    if ( !indent.match(/^\s*$/) ) indent = "  ";
    return dump_main(data, {pretty:opts.pretty, indent:indent, deflate:opts.deflate});
}


function dump_main ( data, opts ) {
    switch ( typeof data ) {
      case "undefined":
        return opts.deflate ? '(void 0)' : '"undefined"';

      case "boolean":
      case "number":
        return String(data);

      case "string":
        return dump_string(data);

      case "function":
      case "object":
        if ( data === null ) {
            return "null";
        } else if ( typeof data[DUMPER] == "function" ){
            return data[DUMPER](opts);
        } else if ( data instanceof Array ) {
            var arr = [];
            for ( var i=0;  i < data.length;  i++ ) arr[i] = dump_main(data[i], opts);
            if ( opts.pretty ) {
                return "[\n" + arr.join(",\n").replace(/^/mg, opts.indent) + "\n]";
            } else {
                return "[" + arr.join(",") + "]";
            }
        } else {
            var arr = [];
            for ( var i in data ) {
                if ( data.hasOwnProperty(i) ) {
                    arr.push(dump_string(i) + ":" + dump_main(data[i], opts));
                }
            }
            if ( opts.pretty ) {
                return "{\n" + arr.join(",\n").replace(/^/mg, opts.indent) + "\n}";
            } else {
                return "{" + arr.join(",") + "}";
            }
        }
    }
}


function dump_string ( str ) {
    return '"' + str.replace(/[^\u0020-\u0021\u0023-\u005B\u005D-\u007E]/g, function (c){
                             // any ASCII character except '"', '\' and control-character
        c = c.charCodeAt(0);
        switch ( c ) {
          case '"' : return '\\"';
          case '\\': return '\\\\';
          case '\b': return '\\b';
          case '\f': return '\\f';
          case '\n': return '\\n';
          case '\r': return '\\r';
          case '\t': return '\\t';
          default:
            c = c.toString(16);
            while ( c.length < 4 ) c = "0" + c;
            return "\\u" + c;
        }
    }) + '"';
}



String.prototype[DUMPER] = function ( opts ) {
    return opts.deflate ? "new String(" + dump_string(this.toString()) + ")"
                        : dump_string(this.toString());
};

Boolean.prototype[DUMPER] = function ( opts ) {
    return opts.deflate ? "new Boolean(" + this.toString() + ")"
                        : this.toString();
};

Number.prototype[DUMPER] = function ( opts ) {
    return opts.deflate ? "new Number(" + this.toString() + ")"
                        : this.toString();
};

Date.prototype[DUMPER] = function ( opts ) {
    return opts.deflate ? "new Date(" + this.valueOf() + ")"
                        : dump_string(this.toString());
};

RegExp.prototype[DUMPER] = function ( opts ) {
    return opts.deflate ? this.toString()
                        : dump_string(this.toString());
};

Function.prototype[DUMPER] = function ( opts ) {
    return opts.deflate ? this.toString()
                        : dump_string(this.toString());
};



            return {
                dump: dump
            };
        }();
    }
}.call(null) ) {
    this.JSON.dump = dump;
}
}).call(null);
(function(){
with ( function(){

        return function () {
            var VERSION = '0.1.0';
            var NAMESPACE;
            




Function.prototype.bind = function ( o ) {
    var f = this;
    return function ( ) {
        return f.apply(o, arguments);
    };
};

            return {
                
            };
        }();
    }.call(null) ) {
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data.Functional.Loop || (typeof this.Data.Functional.Loop != 'object' && typeof this.Data.Functional.Loop != 'function') ) this.Data.Functional.Loop = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( this.Data.Functional.discontinue === undefined ) this.Data.Functional.discontinue = undefined;
    if ( this.Data.Functional.DiscontinueException === undefined ) this.Data.Functional.DiscontinueException = undefined;
    if ( this.Data.Functional.ignore === undefined ) this.Data.Functional.ignore = undefined;
    if ( this.Data.Functional.IgnoreException === undefined ) this.Data.Functional.IgnoreException = undefined;
    if ( this.Data.Functional.return_list === undefined ) this.Data.Functional.return_list = undefined;
    if ( this.Data.Functional.ReturnListException === undefined ) this.Data.Functional.ReturnListException = undefined;
    if ( this.Data.Functional.Loop.EndOfLoopException === undefined ) this.Data.Functional.Loop.EndOfLoopException = undefined;
    if ( this.Data.Functional.Loop.wrap_for_forEach === undefined ) this.Data.Functional.Loop.wrap_for_forEach = undefined;
    if ( this.Data.Functional.Loop.wrap_for_fold === undefined ) this.Data.Functional.Loop.wrap_for_fold = undefined;
    if ( this.Data.Functional.Loop.wrap_for_map === undefined ) this.Data.Functional.Loop.wrap_for_map = undefined;
with ( function(){
with ( Data.Functional.Loop ) {
with ( Data.Functional ) {

        return function () {
            var VERSION = '0.5.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Functional code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */






NAMESPACE = 'Data.Functional';



function discontinue ( /* variable arguments */ ) {
    throw new DiscontinueException(arguments);
}


function DiscontinueException ( args ) {
    this.args = args;
}
var proto = DiscontinueException.prototype;
proto.name    = NAMESPACE + ".DiscontinueException";
proto.message = "unusual use of `discontinue' (this should be caught by `forEach' or other iteration-methods).";



function ignore ( /* variable arguments */ ) {
    throw new IgnoreException(arguments);
}


function IgnoreException ( args ) {
    this.args = args;
}
var proto = IgnoreException.prototype;
proto.name    = NAMESPACE + ".IgnoreException";
proto.message = "unusual use of `ignore' (this should be caught by `forEach' or other iteration-methods).";



function return_list ( /* variable arguments */ ) {
    throw new ReturnListException(arguments);
}


function ReturnListException ( args ) {
    this.args = args;
}
var proto = ReturnListException.prototype;
proto.name    = NAMESPACE + ".ReturnListException";
proto.message = "unusual use of `return_list' (this should be caught by `forEach' or other iteration-methods).";



NAMESPACE = 'Data.Functional.Loop';



function EndOfLoopException ( v ) {
    this.result = v;
}
var proto = EndOfLoopException.prototype;
proto.name    = NAMESPACE + ".EndOfLoopException";
proto.message = "this should be caught by `forEach' or other iteration-methods";



function wrap_for_forEach ( t, f ) {
    if ( typeof f != "function" ) throw new TypeError("argument to forEach must be function");
    return function ( v ) {
        try {
            f.call(t, v);
        } catch ( e ) {
            if ( e instanceof DiscontinueException ) {
                throw new EndOfLoopException();
            } else if ( e instanceof IgnoreException ) {
                // Do nothing.
            } else if ( e instanceof ReturnListException ) {
                // Do nothing.
            } else {
                throw e;
            }
        }
    };
}



function wrap_for_fold ( t, f, s ) {
    if ( typeof f != "function" ) throw new TypeError("argument to fold must be function");
    return function ( v ) {
        try {
            return s = f.call(t, s, v);
        } catch ( e ) {
            if ( e instanceof DiscontinueException ) {
                throw new EndOfLoopException(e.args[e.args.length-1]);
            } else if ( e instanceof IgnoreException ) {
                return s;
            } else if ( e instanceof ReturnListException ) {
                return s = f.call(t, s, e.args[e.args.length-1]);
            } else {
                throw e;
            }
        }
    };
}



function wrap_for_map ( t, f, a ) {
    if ( typeof f != "function" ) throw new TypeError("argument to map must be function");
    if ( typeof a != "function" ) throw new TypeError("the third argument to wrap_for_map must be function");
    return function ( v ) {
        try {
            a.call(null, f.call(t, v));
        } catch ( e ) {
            if ( e instanceof DiscontinueException ) {
                a.apply(null, e.args);
                throw new EndOfLoopException();
            } else if ( e instanceof IgnoreException ) {
                // Do nothing.
            } else if ( e instanceof ReturnListException ) {
                a.apply(null, e.args);
            } else {
                throw e;
            }
        }
    };
}

            return {
                DiscontinueException: DiscontinueException, wrap_for_forEach: wrap_for_forEach, wrap_for_map: wrap_for_map, ignore: ignore, discontinue: discontinue, ReturnListException: ReturnListException, wrap_for_fold: wrap_for_fold, return_list: return_list, IgnoreException: IgnoreException, EndOfLoopException: EndOfLoopException
            };
        }();
    }
}
}.call(null) ) {
    this.Data.Functional.DiscontinueException = DiscontinueException;
    this.Data.Functional.Loop.wrap_for_forEach = wrap_for_forEach;
    this.Data.Functional.Loop.wrap_for_map = wrap_for_map;
    this.Data.Functional.ignore = ignore;
    this.Data.Functional.discontinue = discontinue;
    this.Data.Functional.ReturnListException = ReturnListException;
    this.Data.Functional.Loop.wrap_for_fold = wrap_for_fold;
    this.Data.Functional.return_list = return_list;
    this.Data.Functional.IgnoreException = IgnoreException;
    this.Data.Functional.Loop.EndOfLoopException = EndOfLoopException;
}
}).call(null);
(function(){
    if ( !this.Util || (typeof this.Util != 'object' && typeof this.Util != 'function') ) this.Util = new Object();
    if ( !this.Util.Arrayize || (typeof this.Util.Arrayize != 'object' && typeof this.Util.Arrayize != 'function') ) this.Util.Arrayize = new Object();
with ( function(){
with ( Util.Arrayize ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            









var null_constructor = function (){};

Function.prototype.extend = function extend ( init, props ) {
    if ( typeof init !== "function" ) throw new TypeError("function is expected: " + init);
    if ( props == null ) props = {};
    
    var SuperClass = this;
    var SubClass = function ( ) {
        var self = this;
        var super_is_called = false;
        function super_call ( ) {
            if ( super_is_called ) throw new Error("super-constructor has already been called");
            super_is_called = true;
            var ret_val = SuperClass.apply(self, arguments);
            if ( ret_val instanceof Object ) {
                for ( var i in ret_val ) {
                    if ( ret_val.hasOwnProperty(i) ) self[i] = ret_val[i];
                }
            }
            return ret_val;
        }
        arguments = arrayize(arguments);
        arguments.unshift(super_call);
        return init.apply(self, arguments);
    };
    
    null_constructor.prototype = SuperClass.prototype;
    var proto = SubClass.prototype = new null_constructor;
    proto.constructor = SubClass;
    proto.$super = function ( prop ) {
        if ( !arguments.length ) return SuperClass;
        var value = SuperClass.prototype[prop];
        if ( typeof value === "function" ) {
            return value.bind(this);
        } else {
            return value;
        }
    };
    for ( var i in props ) proto[i] = props[i];
    
    return SubClass;
};


            return {
                
            };
        }();
    }
}.call(null) ) {
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( this.Data.Error.Error === undefined ) this.Data.Error.Error = undefined;
    if ( this.Data.Error.Exception === undefined ) this.Data.Error.Exception = undefined;
with ( function(){
with ( Data.Error ) {

        return function () {
            var VERSION = '0.3.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Error module.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


NAMESPACE = 'Data.Error';








var Error = GLOBAL.Error.extend(
    function ( $super, message ) {
        $super(message);
    },
    {
        name    : NAMESPACE + ".Error",
        message : "something's wrong",
        toString: function ( ) {
            var s = String(this.message);
            s = s  ?  this.name + ": " + s
                   :  this.name;
            if ( this.fileName ) {
                s += " @" + this.fileName + ":" + this.lineNumber;
            }
            return s;
        }
    }
);



var Exception = GLOBAL.Error.extend(
    function ( $super, message ) {
        $super(message);
    },
    {
        name    : NAMESPACE + ".Exception",
        message : "an exception has occurred",
        toString: function ( ) {
            var s = String(this.message);
            s = s  ?  this.name + ": " + s
                   :  this.name;
            if ( this.fileName ) {
                s += " @" + this.fileName + ":" + this.lineNumber;
            }
            return s;
        }
    }
);


            return {
                Error: Error, Exception: Exception
            };
        }();
    }
}.call(null) ) {
    this.Data.Error.Error = Error;
    this.Data.Error.Exception = Exception;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( this.Data.Error.UnimplementedMethodError === undefined ) this.Data.Error.UnimplementedMethodError = undefined;
with ( function(){
with ( Data.Error ) {

        return function () {
            var VERSION = '0.3.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Error.UnimplementedMethodError.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


NAMESPACE = 'Data.Error';







var UnimplementedMethodError = Error.extend(
    function ( $super, method, invocant, message ) {
        if ( message !== undefined ) {
            $super(message);
        } else {
            $super("an required method `" + method + "' has not been implemented");
        }
        this.method   = method;
        this.invocant = invocant;
    },
    { name: NAMESPACE + ".UnimplementedMethodError" }
);


            return {
                UnimplementedMethodError: UnimplementedMethodError
            };
        }();
    }
}.call(null) ) {
    this.Data.Error.UnimplementedMethodError = UnimplementedMethodError;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Iterator || (typeof this.Data.Iterator != 'object' && typeof this.Data.Iterator != 'function') ) this.Data.Iterator = new Object();
    if ( this.Data.Iterator.NoSuchElementError === undefined ) this.Data.Iterator.NoSuchElementError = undefined;
with ( function(){
with ( Data.Error ) {
with ( Data.Iterator ) {

        return function () {
            var VERSION = '0.2.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Iterator code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Iterator';








var NoSuchElementError = Error.extend(
    function ( $super, message ) { $super(message); },
    {
        name   : NAMESPACE + ".NoSuchElementError",
        message: "no such element"
    }
);


            return {
                NoSuchElementError: NoSuchElementError
            };
        }();
    }
}
}.call(null) ) {
    this.Data.Iterator.NoSuchElementError = NoSuchElementError;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( this.Data.Error.IllegalStateError === undefined ) this.Data.Error.IllegalStateError = undefined;
with ( function(){
with ( Data.Error ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Error.IllegalStateError module.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */




NAMESPACE = 'Data.Error';





var IllegalStateError = Error.extend(
    function ( $super, message ) { $super(message); },
    {
        name   : NAMESPACE + ".IllegalStateError",
        message: "illegal state"
    }
);


            return {
                IllegalStateError: IllegalStateError
            };
        }();
    }
}.call(null) ) {
    this.Data.Error.IllegalStateError = IllegalStateError;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Iterator || (typeof this.Data.Iterator != 'object' && typeof this.Data.Iterator != 'function') ) this.Data.Iterator = new Object();
    if ( this.Data.Iterator.Iterator === undefined ) this.Data.Iterator.Iterator = undefined;
with ( function(){
with ( Data.Error ) {
with ( Data.Iterator ) {

        return function () {
            var VERSION = '0.2.1';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Iterator code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Iterator';








function Iterator ( ) {
    // This is a kind of abstract class.
    // Sub-classes should implement appropreate methods.
}

var proto = Iterator.prototype;

var obj_name = "[object " + NAMESPACE + ".Iterator]";


proto.toString = function ( ) {
    return obj_name;
};


// Returns true if this iterator points to the tail of a list,
// false othersise.
// The default implementation merely throws UnimplementedMethodError.
// Sub-classes must implement their own version of this method.
proto.isTail = function ( ) {
    throw new UnimplementedMethodError("isTail", this);
};


// Returns value of the element which is just after the position 
// this iterator points to.
// The default implementation merely throws UnimplementedMethodError.
// Sub-classes must implement their own version of this method, 
// which may throws Data.Iterator.NoSuchElementError.
proto.value = function ( ) {
    throw new UnimplementedMethodError("value", this);
};


// Returns a new iterator that points to the next position to the 
// one which this iterator points to.
// The default implementation merely throws UnimplementedMethodError.
// Sub-classes must implement their own version of this method, 
// which may throws Data.Iterator.NoSuchElementError.
proto.next = function ( ) {
    throw new UnimplementedMethodError("next", this);
};


// Returns true if and only if this iterator is associated with the 
// object specified by the argument, false otherwise.
// The default implementation just returns false.
proto.isBoundTo = function ( list ) {
    return false;
};


proto.find = function ( f ) {
    for ( var it=this;  !it.isTail();  it=it.next() ) {
        if ( f(it.value()) ) break;
    }
    return it;
};


            return {
                Iterator: Iterator
            };
        }();
    }
}
}.call(null) ) {
    this.Data.Iterator.Iterator = Iterator;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data.Functional.Loop || (typeof this.Data.Functional.Loop != 'object' && typeof this.Data.Functional.Loop != 'function') ) this.Data.Functional.Loop = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( this.Data.Functional.Enumerable === undefined ) this.Data.Functional.Enumerable = undefined;
    if ( this.Data.Functional.EmptyEnumerationError === undefined ) this.Data.Functional.EmptyEnumerationError = undefined;
with ( function(){
with ( Data.Error ) {
with ( Data.Functional.Loop ) {
with ( Data.Functional ) {

        return function () {
            var VERSION = '0.5.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Functional code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Functional';












function Enumerable ( ) {
    // This is a kind of abstract class.
}

var proto = Enumerable.prototype;

var obj_name = "[object " + NAMESPACE + ".Enumerable]";


proto.toString = function ( ) {
    return obj_name;
};


proto.iterator = function ( ) {
    throw new UnimplementedMethodError("iterator", this);
};


proto.forEach = function ( f ) {
    var ret_val;
    f = wrap_for_forEach(this, f);
    for ( var it=this.iterator();  !it.isTail();  it=it.next() ) {
        try {
            f(it.value());
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) return;
            else                                   throw e;
        }
    }
};


proto.fold = function ( f, s ) {
    f = wrap_for_fold(this, f, s);
    for ( var it=this.iterator();  !it.isTail();  it=it.next() ) {
        try {
            s = f(it.value());
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) return e.result;
            else                                   throw e;
        }
    }
    return s;
};


proto.fold1 = function ( f ) {
    var it = this.iterator();
    if ( it.isTail() ) throw new EmptyEnumerationError();
    var s = it.value();
    it = it.next();
    f = wrap_for_fold(this, f, s);
    for ( ;  !it.isTail();  it=it.next() ) {
        try {
            s = f(it.value());
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) return e.result;
            else                                   throw e;
        }
    }
    return s;
};


proto.and = function ( ) {
    return this.fold(function ( x, y ) {
        return y || discontinue(y);
    }, true);
};

proto.or = function ( ) {
    return this.fold(function ( x, y ) {
        return y && discontinue(y);
    }, false);
};

proto.all = function ( f ) {
    return this.fold(function ( x, y ) {
        y = f.call(this, y);
        return y || discontinue(y);
    }, true);
};

proto.any = function ( f ) {
    return this.fold(function ( x, y ) {
        y = f.call(this, y);
        return y && discontinue(y);
    }, false);
};




var EmptyEnumerationError = Error.extend(
    function ( $super, message ) { $super(message); },
    {
        name   : NAMESPACE + ".EmptyEnumerationError",
        message: "empty enumeration"
    }
);


            return {
                EmptyEnumerationError: EmptyEnumerationError, Enumerable: Enumerable
            };
        }();
    }
}
}
}.call(null) ) {
    this.Data.Functional.EmptyEnumerationError = EmptyEnumerationError;
    this.Data.Functional.Enumerable = Enumerable;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data.Functional.Loop || (typeof this.Data.Functional.Loop != 'object' && typeof this.Data.Functional.Loop != 'function') ) this.Data.Functional.Loop = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( this.Data.Functional.Collection === undefined ) this.Data.Functional.Collection = undefined;
with ( function(){
with ( Data.Error ) {
with ( Data.Functional.Loop ) {
with ( Data.Functional ) {

        return function () {
            var VERSION = '0.5.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Functional code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Functional';












function Collection ( ) {
    // This is kind of abstract class.
}

var proto = Collection.prototype = new Enumerable();
proto.constructor = Collection;

var obj_name = "[object " + NAMESPACE + ".Collection]";


proto.toString = function ( ) {
    return obj_name;
};


proto.toArray = function ( ) {
    var a = [];
    this.forEach(function( it ){
        a.push(it);
    });
    return a;
};


proto.add = function ( /* variable args */ ) {
    throw new UnimplementedMethodError("add", this);
};


proto.addAll = function ( /* variable arguments */ ) {
    var self    = this;
    var changed = false;
    for ( var i=0;  i < arguments.length;  i++ ) {
        var c = arguments[i];
        if ( c instanceof Collection ) {
            c.forEach(function( it ){
                changed = self.add(it) || changed;
            });
        } else if ( c instanceof Array ) {
            changed = this.add.apply(this, c) || changed;
        } else {
            chagned = this.add(c) || changed;
        }
    }
    return changed;
};


proto.removeAt = function ( it ) {
    throw new UnimplementedMethodError("removeAt", this);
};


proto.isEmpty = function ( ) {
    return this.iterator().isTail();
};


proto.empty = function ( ) {
    var it;
    while ( !(it=this.iterator()).isTail() ) this.removeAt(it);
};


proto.size = function ( ) {
    var i = 0;
    this.forEach(function(){ ++i; });
    return i;
};


proto.emptyCopy = function ( ) {
    return new this.constructor();
};


proto.copy = function ( ) {
    var c = this.emptyCopy();
    this.forEach(function( it ){
        c.add(it);
    });
    return c;
};


proto.map = function ( f ) {
    var c = this.emptyCopy();
    f = wrap_for_map(this, f, function ( ) {
        c.add.apply(c, arguments);
    });
    for ( var it=this.iterator();  !it.isTail();  it=it.next() ) {
        try {
            f(it.value());
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) return c;
            else                                   throw e;
        }
    }
    return c;
};


proto.filter = function ( f ) {
    return this.map(function( it ){
        if ( f.call(this, it) ) return it;
        else                    ignore();
    });
};


proto.grep = function ( re ) {
    if ( !(re instanceof RegExp) ) re = new Regex(re);
    return this.filter(function(it){
        return String(it).match(re);
    });
};



            return {
                Collection: Collection
            };
        }();
    }
}
}
}.call(null) ) {
    this.Data.Functional.Collection = Collection;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Iterator || (typeof this.Data.Iterator != 'object' && typeof this.Data.Iterator != 'function') ) this.Data.Iterator = new Object();
    if ( this.Data.Iterator.BidirectionalIterator === undefined ) this.Data.Iterator.BidirectionalIterator = undefined;
with ( function(){
with ( Data.Error ) {
with ( Data.Iterator ) {

        return function () {
            var VERSION = '0.2.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Iterator code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Iterator';










function BidirectionalIterator ( ) {
    // This is a kind of abstract class.
    // Sub-classes should implement appropreate methods.
}

var proto = BidirectionalIterator.prototype = new Iterator();
proto.constructor = BidirectionalIterator;

var obj_name = "[object " + NAMESPACE + ".BidirectionalIterator]";


proto.toString = function ( ) {
    return obj_name;
};


// Returns true if this iterator points to the head of a list,
// false othersise.
// The default implementation merely throws UnimplementedMethodError.
// Sub-classes must implement their own version of this method.
proto.isHead = function ( ) {
    throw new UnimplementedMethodError("isHead", this);
};


// Returns a new iterator that points to the previous position to 
// the one which this iterator points to.
// The default implementation merely throws UnimplementedMethodError.
// Sub-classes must implement their own version of this method.
proto.previous = function ( ) {
    throw new UnimplementedMethodError("previous", this);
};


            return {
                BidirectionalIterator: BidirectionalIterator
            };
        }();
    }
}
}.call(null) ) {
    this.Data.Iterator.BidirectionalIterator = BidirectionalIterator;
}
}).call(null);
(function(){
    if ( !this.Math || (typeof this.Math != 'object' && typeof this.Math != 'function') ) this.Math = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data.Functional.Loop || (typeof this.Data.Functional.Loop != 'object' && typeof this.Data.Functional.Loop != 'function') ) this.Data.Functional.Loop = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( this.Data.Functional.List === undefined ) this.Data.Functional.List = undefined;
with ( function(){
with ( Math ) {
with ( Data.Functional.Loop ) {
with ( Data.Functional ) {

        return function () {
            var VERSION = '0.5.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Functional code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

// This module should not be required directly.
// Require Data.Functional.List instead.



NAMESPACE = 'Data.Functional';












function List ( ) {
    // This is a kind of abstract class.
}

var proto = List.prototype = new Collection();
proto.constructor = List;


// Iterator methods.
// Return an iterator pointing to just before the n'th element
// (the first element is the 0th one). If there are only n elements 
// in this list, return an iterator pointing to the tail.
// If n is negative, it is treated as size+n, where size is the length 
// of this list. Thus, if n is negative, the result of head(n) and 
// the one of tail(-n) should be equivalent.
// These methods can throw RangeError.
proto.head = function ( n ) {
    if ( n < 0 ) return this.tail(-n);
    return nNextFromHead(this.tail(), n);
};

proto.tail = function ( n ) {
    if ( n < 0 ) return this.head(-n);
    return nPreviousFromTail(this.head(), n);
};

proto.reverseHead = function ( n ) {
    if ( n < 0 ) return this.reverseTail(-n);
    return nNextFromHead(this.reverseTail(), n);
};

proto.reverseTail = function ( n ) {
    if ( n < 0 ) return this.reverseHead(-n);
    return nPreviousFromTail(this.reverseHead(), n);
};

function nNextFromHead ( it, n ) {
    var q = [];
    n = ToInteger(n);
    if ( n == 0 ) {  // simple optimization
        while ( !it.isHead() ) it = it.previous();
        return it;
    } else {
        while ( n-- > 0 ) {
            if ( it.isHead() ) throw new RangeError();
            q.push(it);
            it = it.previous();
        }
        while ( !it.isHead() ) {
            q.shift();
            q.push(it);
            it = it.previous();
        }
        q.push(it);
        return q[0];
    }
}

function nPreviousFromTail ( it, n ) {
    var q = [];
    n = ToInteger(n);
    if ( n == 0 ) {  // simple optimization
        while ( !it.isTail() ) it = it.next();
        return it;
    } else {
        while ( n-- > 0 ) {
            if ( it.isTail() ) throw new RangeError();
            q.push(it);
            it = it.next();
        }
        while ( !it.isTail() ) {
            q.shift();
            q.push(it);
            it = it.next();
        }
        q.push(it);
        return q[0];
    }
}


proto.iterator = function ( /* delegate */ ) {
    return this.head.apply(this, arguments);
};

proto.add = function ( /* variable args */ ) {
    if ( arguments.length == 0 ) return false;
    for ( var i=0;  i < arguments.length;  i++ ) {
        this.tail().insert(arguments[i]);
    }
    return true;
};


// Returns the value indexed by the argument.
// If there is no corresponding value in this list, returns undefined.
// The argument can be either number or iterator.
proto.get = function ( it ) {
    if ( !(it instanceof List.Iterator  &&  it.isBoundTo(this)) ) {
        try {
            it = this.head(it);
        } catch ( e ) {
            if ( e instanceof RangeError ) {
                return undefined;
            } else {
                throw e;
            }
        }
    }
    if ( it.isTail() ) return undefined;
    else               return it.value();
};

// Assigns the second argument to the container indexed by the first 
// argument.
// The argument can be either number or iterator.
proto.set = function ( it, v ) {
    if ( !(it instanceof List.Iterator  &&  it.isBoundTo(this)) ) {
        it = this.head(it);
    }
    return it.assign(v);
};

// Inserts a new container at the position indexed by the first 
// argument, and sets the second argument to the container, then, 
// returns the value of the container.
// The argument can be either number or iterator.
// The position which this iterator points to after insertion is 
// implementation-dependent.
proto.insertAt = function ( it, v ) {
    if ( !(it instanceof List.Iterator  &&  it.isBoundTo(this)) ) {
        it = this.head(it);
    }
    return it.insert(v);
};

// Removes the container indexed by the argument, then, returns the 
// value of the container.
// The argument can be either number or iterator.
// The position which this iterator points to after removal is 
// implementation-dependent.
proto.removeAt = function ( it ) {
    if ( !(it instanceof List.Iterator  &&  it.isBoundTo(this)) ) {
        it = this.head(it);
    }
    return it.remove();
};


proto.pop = function ( ) {
    return this.reverseHead().remove();
};

proto.push = function ( /* variable args */ ) {
    this.add.apply(this, arguments);
    return this.size();
};

proto.shift = function ( ) {
    return this.head().remove();
};

proto.unshift = function ( /* variable args */ ) {
    for ( var i=arguments.length-1;  i >= 0;  i-- ) {
        this.head().insert(arguments[i]);
    }
    return this.size();
};


proto.join = function ( /* delegate */ ) {
    var arr = this.toArray();
    return arr.join.apply(arr, arguments);
};

proto.toString = function ( /* delegate */ ) {
    var arr = this.toArray();
    return arr.toString.apply(arr, arguments);
};

proto.toLocaleString = function ( /* delegate */ ) {
    var arr = this.toArray();
    return arr.toLocaleString.apply(arr, arguments);
};


proto.reverse = function ( ) {
    var r = this.emptyCopy();
    for ( var it=this.reverseHead();  !it.isTail();  it=it.next() ) {
        r.add(it.value());
    }
    return r;
};

proto.slice = function ( start, end ) {
    if ( !(    start instanceof List.Iterator
            &&   end instanceof List.Iterator
            && start.isBoundTo(this) && end.isBoundTo(this)
            && start.constructor === end.constructor ) )  // one might be reverse-iterator even though the other is iterator.
    {
        try {
            start = this.head(start);
        } catch ( e ) {
            if ( e instanceof RangeError ) {
                start = start < 0 ? this.head() : this.tail();
            } else {
                throw e;
            }
        }
        if ( end === undefined ) {
            end = this.tail();
        } else {
            try {
                end = this.head(end);
            } catch ( e ) {
                if ( e instanceof RangeError ) {
                    end = end < 0 ? this.head() : this.tail();
                } else {
                    throw e;
                }
            }
        }
    }
    var l = this.emptyCopy();
    if ( start.compareTo(end) >= 0 ) return l;
    while ( !start.equals(end) ) {
        l.add(start.value());
        start = start.next();
    }
    return l;
};

proto.concat = function ( /* variable arguments */ ) {
    var list = this.emptyCopy();
    arguments[-1] = this;
    for ( var i=-1;  i < arguments.length;  i++ ) {
        var e = arguments[i];
        if ( e instanceof List ) {
            e.forEach(function(it){
                list.add(it)
            });
        }
        else if ( e instanceof Array ) {
            for ( var j=0;  j < e.length;  j++ ) list.add(e[j])
        }
        else {
            list.add(e);
        }
    }
    return list;
};


proto.foldl = proto.fold;

proto.foldl1 = proto.fold1;

proto.foldr = function ( f, s ) {
    var g = wrap_for_fold(this, function(x,y){return f.call(this,y,x);}, s);
    for ( var it=this.reverseHead();  !it.isTail();  it=it.next() ) {
        try {
            s = g(it.value());
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) return e.result;
            else                                   throw e;
        }
    }
    return s;
};

proto.foldr1 = function ( f ) {
    var it = this.reverseHead();
    if ( it.isTail() ) throw new EmptyEnumerationError();
    var s = it.value();
    it = it.next();
    var g = wrap_for_fold(this, function(x,y){return f.call(this,y,x);}, s);
    for ( ;  !it.isTail();  it=it.next() ) {
        try {
            s = g(it.value());
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) return e.result;
            else                                   throw e;
        }
    }
    return s;
};


            return {
                List: List
            };
        }();
    }
}
}
}.call(null) ) {
    this.Data.Functional.List = List;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Iterator || (typeof this.Data.Iterator != 'object' && typeof this.Data.Iterator != 'function') ) this.Data.Iterator = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( this.Data.Functional.Set === undefined ) this.Data.Functional.Set = undefined;
with ( function(){
with ( Data.Error ) {
with ( Data.Iterator ) {
with ( Data.Functional ) {

        return function () {
            var VERSION = '0.4.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Functional code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Functional';














function Set ( ) {
    // This is kind of interface.
}

var proto = Set.prototype = new Collection();
proto.constructor = Set;

var obj_name = "[object " + NAMESPACE + ".Set]";


proto.toString = function ( ) {
    return obj_name;
};


proto.contains = function ( /* variable args */ ) {
    throw new UnimplementedMethodError("contains", this);
};

proto.containsAll = function ( /* variable args */ ) {
    for ( var i=0;  i < arguments.length;  i++ ) {
        var e = arguments[i];
        if ( e instanceof Array ) {
            if ( !this.contains.apply(this, e) ) return false;
        } else if ( e instanceof Collection ) {
            var self = this;
            if ( !e.all(function(it){ return self.contains(it); }) ) return false;
        } else {
            if ( !this.contains(e) ) return false;
        }
    }
    return true;
};


proto.remove = function ( /* variable args */ ) {
    throw new UnimplementedMethodError("remove", this);
};

proto.removeAll = function ( /* variable args */ ) {
    var changed = false;
    for ( var i=0;  i < arguments.length;  i++ ) {
        var e = arguments[i];
        if ( e instanceof Array ) {
            changed = this.remove.apply(this, e) || changed;
        } else if ( e instanceof Collection ) {
            var self = this;
            e.forEach(function( it ){
                changed = self.remove(it) || changed;
            });
        } else {
            changed = this.remove(e) || changed;
        }
    }
    return changed;
};

proto.removeAt = function ( it ) {
    if ( !(it instanceof Iterator) ) throw new TypeError("the argument is not of type Data.Iterator.Iterator");
    if ( !it.isBoundTo(this)       ) throw new IllegalStateError();
    var v = it.value();
    this.remove(v);
    return v;
};


proto.retainAll = function ( /* variable args */ ) {
    var temp = this.emptyCopy();
    temp.addAll.apply(temp, arguments);
    return this.removeAll( this.filter(function(it){
        return !temp.contains(it);
    }) );
};



            return {
                Set: Set
            };
        }();
    }
}
}
}.call(null) ) {
    this.Data.Functional.Set = Set;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Iterator || (typeof this.Data.Iterator != 'object' && typeof this.Data.Iterator != 'function') ) this.Data.Iterator = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data.Functional.List || (typeof this.Data.Functional.List != 'object' && typeof this.Data.Functional.List != 'function') ) this.Data.Functional.List = new Object();
    if ( this.Data.Functional.List.Iterator === undefined ) this.Data.Functional.List.Iterator = undefined;
with ( function(){
with ( Data.Error ) {
with ( Data.Iterator ) {
with ( Data.Functional.List ) {

        return function () {
            var VERSION = '0.5.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Functional code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Functional.List';













function Iterator ( ) {
    // This is a kind of abstract class.
}

var proto = Iterator.prototype = new BidirectionalIterator();
proto.constructor = Iterator;

var obj_name = "[object " + NAMESPACE + ".Iterator]";


proto.toString = function ( ) {
    return obj_name;
};


// Assign the argument to the element which is just after the position 
// this iterator points to, then returns the new value of the element, 
// which can be defferent from the argument.
// The effect of assignment at the tail of a list should be identical 
// to the one of insertion.
// The default implementation merely throws UnimplementedMethodError.
proto.assign = function ( v ) {
    throw new UnimplementedMethodError("assign", this);
};


// Inserts a new container at the position which this iterator points 
// to and sets the argument to the container, then, returns the value 
// of the container, which can be defferent from the argument.
// The position which the iterator points to after insertion is 
// implementation-dependent.
// The default implementation merely throws UnimplementedMethodError.
proto.insert = function ( v ) {
    throw new UnimplementedMethodError("insert", this);
};


// Removes the container just after the position which this iterator 
// points, then, returns the value of the container.
// The position which the iterator points to after removal is 
// implementation-dependent.
// The default implementation merely throws UnimplementedMethodError.
proto.remove = function ( ) {
    throw new UnimplementedMethodError("remove", this);
};


// Returns true if both this iterator and the argument points to the same position,
// false otherwise.
// The default implementation is based on `compareTo' method.
proto.equals = function ( that ) {
    return this.compareTo(that) === 0;
};


// Returns the distance of this iterator and the argument,
// or undefined if the iterators seem to point to defferent list.
// A negative return value means the arguments succeeds this iterator
// and its magnitude represents the distance of them. Thus, this can be 
// used as comparison-function.
// The default implementation is based on `next', `equals' and `isTail' method.
proto.distance  = 
proto.compareTo = function ( that ) {
    if ( !(that instanceof Iterator) ) return undefined;
    for ( var i=0, l=this, r=that;  ;  i--, l=l.next() ) {
        if ( l.equals(r) ) return i;
        if ( l.isTail() ) break;
    }
    for ( var i=1, l=that.next(), r=this;  ;  i++, l=l.next() ) {
        if ( l.equals(r) ) return i;
        if ( l.isTail() ) break;
    }
    return undefined;
};



            return {
                Iterator: Iterator
            };
        }();
    }
}
}
}.call(null) ) {
    this.Data.Functional.List.Iterator = Iterator;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data.Functional.List || (typeof this.Data.Functional.List != 'object' && typeof this.Data.Functional.List != 'function') ) this.Data.Functional.List = new Object();
    if ( this.Data.Functional.List.ReverseIterator === undefined ) this.Data.Functional.List.ReverseIterator = undefined;
with ( function(){
with ( Data.Functional.List ) {

        return function () {
            var VERSION = '0.4.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Functional code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Functional.List';





// This module provides convinient wrapper to construct 
// reverse iterator from normal list iterator.



function ReverseIterator ( it ) {
    this._it = it;
}

var proto = ReverseIterator.prototype = new Iterator();
proto.constructor = ReverseIterator;


proto.isBoundTo = function ( that ) {
    return this._it.isBoundTo(that);
};

proto.isTail = function ( ) {
    return this._it.isHead();
};

proto.isHead = function ( ) {
    return this._it.isTail();
};

proto.next = function ( ) {
    return new ReverseIterator(this._it.previous());
};

proto.previous = function ( ) {
    return new ReverseIterator(this._it.next());
};

proto.value = function ( ) {
    return this._it.previous().value();
};

proto.assign = function ( v ) {
    return this._it.previous().assign(v);
};

proto.insert = function ( v ) {
    return this._it.insert(v);
};

proto.remove = function ( ) {
    return this._it.previous().remove();
};

proto.equals = function ( that ) {
    if ( !(that instanceof ReverseIterator) ) return false;
    return this._it.equal(taht._it);
};

proto.compareTo = function ( that ) {
    if ( !(that instanceof ReverseIterator) ) return undefined;
    var c = this._it.compareTo(that._it);
    if ( isNaN(d) ) return c;
    return -c;
};

proto.distance = function ( that ) {
    if ( !(that instanceof ReverseIterator) ) return undefined;
    var d = this._it.distance(that._it);
    if ( isNaN(d) ) return d;
    return -d;
};


            return {
                ReverseIterator: ReverseIterator
            };
        }();
    }
}.call(null) ) {
    this.Data.Functional.List.ReverseIterator = ReverseIterator;
}
}).call(null);
(function(){
with ( function(){

        return function () {
            var VERSION = '0.5.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Functional code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */




// This is just a alias.
// See "Data.Functional.List.list" for the entity of "Data.Functional.List".



            return {
                
            };
        }();
    }.call(null) ) {
}
}).call(null);
(function(){
    if ( !this.Math || (typeof this.Math != 'object' && typeof this.Math != 'function') ) this.Math = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data.Functional.Loop || (typeof this.Data.Functional.Loop != 'object' && typeof this.Data.Functional.Loop != 'function') ) this.Data.Functional.Loop = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
with ( function(){
with ( Math ) {
with ( Data.Error ) {
with ( Data.Functional.Loop ) {
with ( Data.Functional ) {

        return function () {
            var VERSION = '0.5.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Functional code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


















var proto = Array.prototype;

for ( var i in List.prototype ) {
    if ( typeof proto[i] != "function" ) proto[i] = List.prototype[i];
}


proto.head = function ( n ) {
    if ( n < 0 ) return this.tail(-n);
    n = ToInteger(n);
    if ( n > this.length ) throw new RangeError();
    return new Iterator(this, n);
};

proto.tail = function ( n ) {
    if ( n < 0 ) return this.head(-n);
    n = ToInteger(n);
    if ( n > this.length ) throw new RangeError();
    return new Iterator(this, this.length-n);
};

proto.iterator = proto.head;

proto.reverseHead = function ( n ) {
    if ( n < 0 ) return this.reverseTail(-n);
    n = ToInteger(n);
    if ( n > this.length ) throw new RangeError();
    return new ReverseIterator(this, n);
};

proto.reverseTail = function ( n ) {
    if ( n < 0 ) return this.reverseHead(-n);
    n = ToInteger(n);
    if ( n > this.length ) throw new RangeError();
    return new ReverseIterator(this, this.length-n);
};


proto.add = function ( /* variable args */ ) {
    this.push.apply(this, arguments);
    return true;
};

proto.get = function ( it ) {
    if ( it instanceof Iterator || it instanceof ReverseIterator ) {
        if ( it.isBoundTo(this) ) return it.value();
        throw new IllegalStateError();
    }
    it = ToInteger(n);
    if ( it < 0 ) it += this.length;
    return this[it];
};

proto.set = function ( it, v ) {
    if ( it instanceof Iterator || it instanceof ReverseIterator ) {
        if ( it.isBoundTo(this) ) return it.assign(v);
        throw new IllegalStateError();
    }
    var n = ToInteger(it);
    if ( n < 0            ) n += this.length;
    if ( n < 0            ) throw new RangeError("`" + it + "' is too small.");
    if ( n >= this.length ) throw new RangeError("`" + it + "' is too large.");
    return this[n] = v;
};

proto.insertAt = function ( it, v ) {
    if ( it instanceof Iterator || it instanceof ReverseIterator ) {
        if ( it.isBoundTo(this) ) return it.insert(v);
        throw new IllegalStateError();
    }
    var n = ToInteger(it);
    if ( n < 0            ) n += this.length;
    if ( n < 0            ) throw new RangeError("`" + it + "' is too small.");
    if ( n >= this.length ) throw new RangeError("`" + it + "' is too large.");
    this.splice(n, 0, v);
    return v;
};

proto.removeAt = function ( it ) {
    if ( it instanceof Iterator || it instanceof ReverseIterator ) {
        if ( it.isBoundTo(this) ) return it.remove();
        throw new IllegalStateError();
    }
    var n = ToInteger(it);
    if ( n < 0            ) n += this.length;
    if ( n < 0            ) throw new RangeError("`" + it + "' is too small.");
    if ( n >= this.length ) throw new RangeError("`" + it + "' is too large.");
    return this.splice(n, 1)[0];
};


proto.isEmpty = function ( ) {
    return this.length == 0;
};

proto.empty = function ( ) {
    this.length = 0;
};

proto.size = function ( ) {
    return this.length;
};

proto.copy    =
proto.toArray = function ( ) {
    var a = [];
    for ( var i=0;  i < this.length;  i++ ) a[i] = this[i];
    return a;
};


proto.forEach = function ( f ) {
    f = wrap_for_forEach(this, f);
    for ( var i=0;  i < this.length;  i++ ) {
        try {
            f(this[i]);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return;
            } else {
                throw e;
            }
        }
    }
};

proto.fold  =
proto.foldl = function ( f, s ) {
    f = wrap_for_fold(this, f, s);
    for ( var i=0;  i < this.length;  i++ ) {
        try {
            s = f(this[i]);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return e.result;
            } else {
                throw e;
            }
        }
    }
    return s;
};

proto.fold1  =
proto.foldl1 = function ( f ) {
    if ( this.length == 0 ) throw new EmptyEnumerationError();
    var s = this[0];
    f = wrap_for_fold(this, f, s);
    for ( var i=1;  i < this.length;  i++ ) {
        try {
            s = f(this[i]);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return e.result;
            } else {
                throw e;
            }
        }
    }
    return s;
};

proto.foldr = function ( f, s ) {
    var g = wrap_for_fold(this, function(x,y){return f.call(this,y,x);}, s);
    for ( var i=this.length-1;  i >= 0;  i-- ) {
        try {
            s = f(this[i]);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return e.result;
            } else {
                throw e;
            }
        }
    }
    return s;
};

proto.foldr1 = function ( f ) {
    if ( this.length == 0 ) throw new EmptyEnumerationError();
    var s = this[this.length-1];
    var g = wrap_for_fold(this, function(x,y){return f.call(this,y,x);}, s);
    for ( var i=this.length-2;  i >= 0;  i-- ) {
        try {
            s = g(this[i]);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return e.result;
            } else {
                throw e;
            }
        }
    }
    return s;
};

proto.map = function ( f ) {
    var a = [];
    f = wrap_for_map(this, f, function(){
        a.push.apply(a, arguments);
    });
    for ( var i=0;  i < this.length;  i++ ) {
        try {
            f(this[i]);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) return a;
            else                                   throw e;
        }
    }
    return a;
};


// Re-define concat and slice
var original_concat = proto.concat;
proto.concat = function ( /* variable argumentes */ ) {
    for ( var i=0;  i < arguments.length;  i++ ) {
        var v = arguments[i];
        if ( v instanceof List ) arguments[i] = v.toArray();
    }
    return original_concat.apply(this, arguments);
};

var original_slice = proto.slice;
proto.slice = function ( start, end ) {
    if (   (   start instanceof Iterator        && end instanceof Iterator
            || start instanceof ReverseIterator && end instanceof ReverseIterator )
        && start.isBoundTo(this) && end.isBoundTo(this)  )
    {
        if ( start.compareTo(end) >= 0 ) return [];
        var s = [];
        do {
            s.push(start.value());
            start = start.next();
        } while ( !start.equals(end) );
        return s;
    } else {
        return original_slice.apply(this, arguments);
    }
};



function Iterator ( a, n ) {
    this._arr = a;
    this._pos = n;
}

var proto = Iterator.prototype = new List.Iterator();
proto.constructor = Iterator;

proto.isBoundTo = function ( that ) {
    return this._arr === that;
};

proto.isHead = function ( ) {
    return ToInteger(this._pos) <= 0
        || this._arr.length == 0;
};

proto.isTail = function ( ) {
    return ToInteger(this._pos) >= this._arr.length
        || this._arr.length == 0;
};

proto.value = function ( ) {
    if ( this.isTail() ) return undefined;
    if ( this.isHead() ) return this._arr[0];
    else                 return this._arr[ToInteger(this._pos)];
};

proto.assign = function ( v ) {
    if ( this.isTail() ) return this.insert();
    if ( this.isHead() ) return this._arr[0] = v;
    else                 return this._arr[ToInteger(this._pos)] = v;
};

proto.insert = function ( v ) {
    var i = ToInteger(this._pos);
    if ( i <= 0 ) i = 0;
    else          i = min(i, this._arr.length);
    return this._arr.insertAt(i, v);
};

proto.remove = function ( ) {
    if      ( this.isTail() ) throw new IllegalStateError("can't remove at the tail of list");
    else if ( this.isHead() ) return this._arr.aplice(0, 1)[0];
    else                      return this._arr.splice(this._pos, 1)[0];
};

proto.next = function ( ) {
    if ( this.isTail() ) throw new NoSuchElement("no next element");
    if ( this.isHead() ) return new this.constructor(this._arr, 1);
    else                 return new this.constructor(this._arr, this._pos+1);
};

proto.previous = function ( ) {
    if ( this.isHead() ) throw new NoSuchElement("no previous element");
    if ( this.isTail() ) return new this.constructor(this._arr, this._arr.length-1);
    else                 return new this.constructor(this._arr, this._pos-1);
};

proto.compareTo = 
proto.distance  = function ( that ) {
    if ( !(that instanceof this.constructor) ) return undefined;
    if ( this._arr !== that._arr             ) return undefined;
    var s = this._arr.length;
    var l = ToInteger(this._pos);
    var r = ToInteger(that._pos);
    if ( l <= 0  &&  r <= 0
      || l >= s  &&  r >= s ) return 0;
    return l - r;
};


function ReverseIterator ( a, n ) {
    Iterator.apply(this, arguments);
}

var proto = ReverseIterator.prototype = new List.Iterator();

for ( var i in Iterator.prototype ) {
    if ( Iterator.prototype.hasOwnProperty(i)
      && typeof Iterator.prototype[i] == "function" )
    {
        proto[i] = Iterator.prototype[i];
    }
}

proto.constructor = ReverseIterator;

proto.value = function ( ) {
    if ( this.isTail() ) return undefined;
    if ( this.isHead() ) return this._arr[this._arr.length-1];
    else                 return this._arr[this._arr.length-1-ToInteger(this._pos)];
};

proto.assign = function ( v ) {
    if ( this.isTail() ) this.insert(v);
    if ( this.isHead() ) return this._arr[this._arr.length-1] = v;
    else                 return this._arr[this._arr.length-1-ToInteger(this._pos)] = v;
};

proto.insert = function ( v ) {
    var i = ToInteger(this._pos);
    if ( i <= 0 ) i = 0;
    else          i = min(i, this._arr.length);
    return this._arr.insertAt(this._arr.length-i, v);
};

proto.remove = function ( ) {
    if ( this.isTail() ) throw new IllegalStateError("can't remove at the tail of list");
    if ( this.isHead() ) return this._arr.splice(this._arr.length-1, 1)[0];
    else                 return this._arr.splice(this._arr.length-1-ToInteger(this._pos), 1)[0];
};


            return {
                
            };
        }();
    }
}
}
}
}.call(null) ) {
}
}).call(null);
(function(){
    if ( !this.Math || (typeof this.Math != 'object' && typeof this.Math != 'function') ) this.Math = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Iterator || (typeof this.Data.Iterator != 'object' && typeof this.Data.Iterator != 'function') ) this.Data.Iterator = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data.Functional.Loop || (typeof this.Data.Functional.Loop != 'object' && typeof this.Data.Functional.Loop != 'function') ) this.Data.Functional.Loop = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Data.Cons.list === undefined ) this.Data.Cons.list = undefined;
    if ( this.Data.Cons.InsertAtHeadError === undefined ) this.Data.Cons.InsertAtHeadError = undefined;
    if ( this.Data.Cons.RemoveHeadError === undefined ) this.Data.Cons.RemoveHeadError = undefined;
with ( function(){
with ( Math ) {
with ( Data.Error ) {
with ( Data.Iterator ) {
with ( Data.Functional.Loop ) {
with ( Data.Functional ) {
with ( Data.Cons ) {

        return function () {
            var VERSION = '0.2.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Cons code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Cons';























var proto = new List();
proto.toString       = Cell.prototype.toString;
proto.toLocaleString = Cell.prototype.toLocaleString;
proto.isNil          = Cell.prototype.isNil;
Cell.prototype = proto;
proto.constructor = Cell;

proto = new Cell();
proto.toString       = Nil.prototype.toString;
proto.toLocaleString = Nil.prototype.toLocaleString;
proto.isNil          = Nil.prototype.isNil;
Nil.prototype = proto;
proto.constructor = Nil;



function list ( /* variable args */ ) {
    var head, cell;
    head = cell = new Cell(null, new Nil());
    for ( var i=0;  i < arguments.length;  i++ ) {
        cell = cell.cdr = new Cell(arguments[i], cell.cdr);
    }
    return head.cdr;
}



proto = Cell.prototype;


proto.iterator = 
proto.head     = function ( n ) {
    n = ToInteger(n);
    if ( n < 0 ) return this.tail(-n);
    try {
        for ( var it=new Iterator(this, this, null);  n > 0;  it=it.next(), n-- );
        return it;
    } catch ( e ) {
        if ( e instanceof NoSuchElementError ) {
            throw new RangeError();
        } else {
            throw e;
        }
    }
};

proto.tail = function ( n ) {
    n = ToInteger(n);
    if ( n < 0 ) return this.head(-n);
    for ( var it=new Iterator(this, this, null);  !it.isTail();  it=it.next() );
    try {
        for ( ;  n > 0;  it=it.previous(), n-- );
        return it;
    } catch ( e ) {
        if ( e instanceof NoSuchElementError ) {
            throw new RangeError();
        } else {
            throw e;
        }
    }
};

proto.reverseHead = function ( n ) {
    return new ReverseIterator(this.tail(n));
};

proto.reverseTail = function ( n ) {
    return new ReverseIterator(this.head(n));
};


proto.get = function ( n ) {
    if ( n instanceof Iterator || n instanceof ReverseIterator ) {
        if ( !n.isBoundTo(this) ) throw new IllegalStateError();
        return n.value();
    }
    n = ToInteger(n);
    if ( n < 0 ) return this.reverse().get(-n-1);
    var c = this;
    while ( n !== 0 ) {
        c = c.cdr;
        if ( c.isNil() ) return undefined;
        n--;
    }
    return c.car;
};

proto.set = function ( n, v ) {
    if ( n instanceof Iterator || n instanceof ReverseIterator ) {
        if ( !n.isBoundTo(this) ) throw new IllegalStateError();
        return n.assign(v);
    }
    return this.head(n).assign(v);
};


proto.add = function ( /* variable args */ ) {
    if ( arguments.length == 0 ) return false;
    if ( this.isNil() ) throw new InsertAtHeadError();
    for ( var c=this;  !c.cdr.isNil();  c=c.cdr );
    for ( var i=0;  i < arguments.length;  i++ ) {
        c = c.cdr = new Cell(arguments[i], new Nil());
    }
    return true;
};

proto.shift = function ( ) {
    throw new RemoveHeadError();
};

proto.unshift = function ( ) {
    throw new InsertAtHeadError();
};

proto.pop = function ( ) {
    if ( this.isNil() ) return undefined;
    if ( this.cdr.isNil() ) throw new RemoveHeadError();
    for ( var c=this.cdr;  !c.cdr.cdr.isNil();  c=c.cdr );
    var r = c.cdr.car;
    c.cdr = c.cdr.cdr;
    return r;
};

proto.push = function ( /* variable args */ ) {
    if ( arguments.length == 0 ) return this.size();
    if ( this.isEmpty() ) throw new InsertAtHeadError();
    for ( var l=1, c=this;  !c.cdr.isNil();  l++, c=c.cdr );
    for ( var i=0;  i < arguments.length;  i++, l++ ) {
        c = c.cdr = new Cell(arguments[i], c.cdr);
    }
    return l;
};


proto.isEmpty = function ( ) {
    return this.isNil();
};

proto.empty = function ( ) {
    if ( this.isEmpty() ) return;
    throw new RemoveHeadError();
};

proto.size = function ( ) {
    for ( var i=0, c=this;  !c.isNil();  i++, c=c.cdr );
    return i;
};

proto.copy = function ( ) {
    if ( this.isNil() ) return new Nil();
    var head, cell;
    head = cell = new Cell(this.car, new Nil());
    for ( var c=this.cdr;  !c.isNil();  c=c.cdr ) {
        cell = cell.cdr = new Cell(c.car, cell.cdr);
    }
    return head;
};

proto.toArray = function ( ) {
    var a = [];
    for ( var c=this;  !c.isNil();  c=c.cdr ) a.push(c.car);
    return a;
};

proto.reverse = function ( ) {
    var r = new Nil();
    for ( var c=this;  !c.isNil();  c=c.cdr ) r = new Cell(c.car, r);
    return r;
};

proto.concat = function ( /* variable args */ ) {
    var head, cell;
    head = cell = new Cell(null, new Nil());
    arguments[-1] = this;
    for ( var i=-1;  i < arguments.length;  i++ ) {
        var c = arguments[i];
        if ( c instanceof List ) {
            c.forEach(function( it ){
                cell = cell.cdr = new Cell(it, cell.cdr);
            });
        } else if ( c instanceof Array ) {
            for ( var j=0;  j < c.length;  j++ ) {
                cell = cell.cdr = new Cell(c[j], cell.cdr);
            }
        } else {
            cell = cell.cdr = new Cell(c, cell.cdr);
        }
    }
    return head.cdr;
};

proto.slice = function ( start, end ) {
    if ( !( (   start instanceof Iterator        && end instanceof Iterator
             || start instanceof ReverseIterator && end instanceof ReverseIterator )
           && start.isBoundTo(this) && end.isBoundTo(this) ) )
    {   try {
            start = this.head(start);
        } catch ( e ) {
            if ( e instanceof RangeError ) {
                start = start < 0 ? this.head() : this.tail();
            } else {
                throw e;
            }
        }
        if ( end === undefined ) {
            end = this.tail();
        } else {
            try {
                end = this.head(end);
            } catch ( e ) {
                if ( e instanceof RangeError ) {
                    end = end < 0 ? this.head() : this.tail();
                } else {
                    throw e;
                }
            }
        }
    }
    if ( start.compareTo(end) >= 0 ) return new Nil();
    var head, cell;
    head = cell = new Cell(null, new Nil());
    while ( !start.equals(end) ) {
        cell = cell.cdr = new Cell(start.value(), cell.cdr);
        start = start.next();
    }
    return head.cdr;
}


proto.forEach = function ( f ) {
    f = wrap_for_forEach(this, f);
    for ( var c=this;  !c.isNil();  c=c.cdr ) {
        try {
            f(c.car);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return;
            } else {
                throw e;
            }
        }
    }
};

proto.fold  =
proto.foldl = function ( f, s ) {
    f = wrap_for_fold(this, f, s);
    for ( var c=this;  !c.isNil();  c=c.cdr ) {
        try {
            s = f(c.car);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return e.result;
            } else {
                throw e;
            }
        }
    }
    return s;
};

proto.fold1  =
proto.foldl1 = function ( f ) {
    if ( this.isEmpty() ) throw new EmptyEnumerationError();
    var s = this.car;
    f = wrap_for_fold(this, f, s);
    for ( var c=this.cdr;  !c.isNil();  c=c.cdr ) {
        try {
            s = f(c.car);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return e.result;
            } else {
                throw e;
            }
        }
    }
    return s;
};

proto.foldr = function ( f, s ) {
    return this.reverse().foldl(function(x,y){return f.call(this,y,x);}, s);
};

proto.foldr1 = function ( f ) {
    return this.reverse().foldl1(function(x,y){return f.call(this,y,x);});
};

proto.map = function ( f ) {
    if ( this.isNil() ) return new Nil();
    var head, cell;
    head = cell = new Cell(null, new Nil());
    f = wrap_for_map(this, f, function(){
        for ( var i=0;  i < arguments.length;  i++ ) {
            cell = cell.cdr = new Cell(arguments[i], cell.cdr);
        }
    });
    for ( var c=this;  !c.isNil();  c=c.cdr ) {
        try {
            f(c.car);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return head.cdr;
            } else {
                throw e;
            }
        }
    }
    return head.cdr;
}



function Iterator ( head, cell, prev ) {
    this._head = head;
    this._cell = cell;
    this._prev = prev;
}

var proto = Iterator.prototype = new List.Iterator();
proto.constructor = Iterator;

proto.isBoundTo = function ( that ) {
    return this._head === that;
};

proto.isHead = function ( ) {
    return this._head === this._cell;
};

proto.isTail = function ( ) {
    return this._cell.isNil();
};

proto.value = function ( ) {
    return this._cell.car;
};

proto.assign = function ( v ) {
    if ( this.isTail() ) this.insert(v);
    else                 this._cell.car = v;
    return v;
};

proto.insert = function ( v ) {
    if ( this.isHead() ) throw new InsertAtHeadError();
    this._cell = this._prev._cell.cdr = new Cell(v, this._cell.cdr);
    return v;
};

proto.remove = function ( ) {
    if ( this.isHead() ) throw new RemoveHeadError();
    if ( this.isTail() ) throw new IllegalStateError("can't remove at tail");
    var r = this._cell.car;
    this._cell = this._prev._cell.cdr = this._cell.cdr;
    return r;
};

proto.next = function ( ) {
    if ( this.isTail() ) throw new NoSuchElementError("no next element");
    return new Iterator(this._head, this._cell.cdr, this);
};

proto.previous = function ( ) {
    if ( this.isHead() ) throw new NoSuchElementError("no previous element");
    return this._prev;
};

proto.equals = function ( that ) {
    return that instanceof Iterator
        && that.isBoundTo(this._head)
        && this._cell === that._cell;
};

proto.compareTo =
proto.distance  = function ( that ) {
    if ( !(that instanceof Iterator && that.isBoundTo(this._head)) ) return undefined;
    for ( var i=0, l=this._cell, r=that._cell;  !l.isNil();  i++, l=l.cdr ) {
        if ( l === r ) return -i;
    }
    for ( var i=1, l=that._cell.cdr, r=this._cell;  !l.isNil();  i++, l=l.cdr ) {
        if ( l === r ) return i;
    }
    return void 0;
};


function ReverseIterator ( ) {
    return List.ReverseIterator.apply(this, arguments);
}

var proto = ReverseIterator.prototype = new List.ReverseIterator();
proto.constructor = ReverseIterator;




var InsertAtHeadError = Error.extend(
    function ( $super, message ) { $super(message); },
    {
        name   : NAMESPACE + ".InsertAtHeadError",
        message: "can't insert at head of cons-list"
    }
);


var RemoveHeadError = Error.extend(
    function ( $super, message ) { $super(message); },
    {
        name   : NAMESPACE + ".RemoveHeadError",
        message: "can't remove head of cons-list"
    }
);


            return {
                InsertAtHeadError: InsertAtHeadError, RemoveHeadError: RemoveHeadError, list: list
            };
        }();
    }
}
}
}
}
}
}.call(null) ) {
    this.Data.Cons.InsertAtHeadError = InsertAtHeadError;
    this.Data.Cons.RemoveHeadError = RemoveHeadError;
    this.Data.Cons.list = list;
}
}).call(null);
(function(){
    if ( !this.Math || (typeof this.Math != 'object' && typeof this.Math != 'function') ) this.Math = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Iterator || (typeof this.Data.Iterator != 'object' && typeof this.Data.Iterator != 'function') ) this.Data.Iterator = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data.Functional.Loop || (typeof this.Data.Functional.Loop != 'object' && typeof this.Data.Functional.Loop != 'function') ) this.Data.Functional.Loop = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( this.Data.LinkedList === undefined ) this.Data.LinkedList = undefined;
with ( function(){
with ( Math ) {
with ( Data.Error ) {
with ( Data.Iterator ) {
with ( Data.Functional.Loop ) {
with ( Data.Functional ) {
with ( Data ) {

        return function () {
            var VERSION = '0.3.1';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.LinkedList module.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2005-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data';




















function LinkedList ( /* variable arguments */ ) {
    this._value   = undefined;
    this._prev    = this;
    this._next    = this;
    this._removed = false;
    this.add.apply(this, arguments);
}

LinkedList.fromCollection = function ( /* variable args */ ) {
    var l = new LinkedList();
    l.addAll.apply(l, arguments);
    return l;
};


function makeContainer ( v ) {
    return { _value: v, _removed: false };
}


var proto = LinkedList.prototype = new List();
proto.constructor = LinkedList;


function nForward ( top, c, n ) {
    if ( n == 0 ) return c;
    c = c._next;
    while ( --n > 0 ) {
        if ( c === top ) throw new RangeError();
        c = c._next;
    }
    return c;
}

function nBackward ( top, c, n ) {
    if ( n == 0 ) return c;
    c = c._prev;
    while ( --n > 0 ) {
        if ( c === top ) throw new RangeError();
        c = c._prev;
    }
    return c;
}


proto.head = function ( n ) {
    if ( n < 0 ) return this.tail(-n);
    return new Iterator( this, nForward(this, this._next, ToInteger(n)) );
};

proto.tail = function ( n ) {
    if ( n < 0 ) return this.head(-n);
    return new Iterator( this, nBackward(this, this, ToInteger(n)) );
};

proto.reverseHead = function ( n ) {
    if ( n < 0 ) return this.reverseTail(-n);
    return new ReverseIterator( this, nBackward(this, this._prev, ToInteger(n)) );
};

proto.reverseTail = function ( n ) {
    if ( n < 0 ) return this.reverseHead(-n);
    return new ReverseIterator( this, nBackward(this, this, ToInteger(n)) );
};

proto.iterator = proto.head;


proto.add = function ( /* variable args */ ) {
    if ( !arguments.length ) return false;
    var it = new Iterator(this, this);
    for ( var i=0;  i < arguments.length;  i++ ) it.insert(arguments[i]);
    return true;
};

proto.pop = function ( ) {
    return (new Iterator(this, this._prev)).remove();
};

proto.shift = function ( ) {
    return (new Iterator(this, this._next)).remove();
};

proto.unshift = function ( /* variable arguments */ ) {
    var it = new Iterator(this, this._next);
    for ( var i=0;  i < arguments.length;  i++ ) it.insert(arguments[i]);
    return this.size();
};


proto.isEmpty = function ( ) {
    return this._next === this;
};

proto.empty = function ( ) {
    this._prev = this._next = this;
};

proto.size = function ( ) {
    for ( var i=0, c=this._next;  c !== this;  ++i, c=c._next );
    return i;
};

proto.copy = function ( ) {
    var l = this.emptyCopy();
    for ( var c=this._next;  c !== this;  c=c._next ) l.add(c._value);
    return l;
};

proto.toArray = function ( ) {
    var a = [];
    for ( var c=this._next;  c !== this;  c=c._next ) a.push(c._value);
    return a;
};


proto.forEach = function ( f ) {
    f = wrap_for_forEach(this, f);
    for ( var c=this._next;  c !== this;  c=c._next ) {
        try {
            f(c._value);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return;
            } else {
                throw e;
            }
        }
    }
}

proto.fold  =
proto.foldl = function ( f, s ) {
    f = wrap_for_fold(this, f, s);
    for ( var c=this._next;  c !== this;  c=c._next ) {
        try {
            s = f(c._value);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return e.result;
            } else {
                throw e;
            }
        }
    }
    return s;
};

proto.fold1  =
proto.foldl1 = function ( f ) {
    if ( this.isEmpty() ) throw new EmptyEnumerationError();
    var s = this._next._value;
    f = wrap_for_fold(this, f, s);
    for ( var c=this._next._next;  c !== this;  c=c._next ) {
        try {
            s = f(c._value);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return e.result;
            } else {
                throw e;
            }
        }
    }
    return s;
};

proto.foldr = function ( f, s ) {
    var g = wrap_for_fold(this, function(x,y){return f.call(this,y,x);}, s);
    for ( var c=this._prev;  c !== this;  c=c._prev ) {
        try {
            s = f(c._value);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return e.result;
            } else {
                throw e;
            }
        }
    }
    return s;
};

proto.foldr1 = function ( f ) {
    if ( this.isEmpty() ) throw new EmptyEnumerationError();
    var s = this._prev._value;
    var g = wrap_for_fold(this, function(x,y){return f.call(this,y,x);}, s);
    for ( var c=this._prev._prev;  c !== this;  c=c._prev ) {
        try {
            s = g(c._value);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) {
                return e.result;
            } else {
                throw e;
            }
        }
    }
    return s;
};

proto.map = function ( f ) {
    var l = new LinkedList();
    f = wrap_for_map(this, f, function(){
        l.add.apply(l, arguments);
    });
    for ( var c=this._next;  c !== this;  c=c._next ) {
        try {
            f(c._value);
        } catch ( e ) {
            if ( e instanceof EndOfLoopException ) return l;
            else                                   throw e;
        }
    }
    return l;
};



// comparison function about containers
function comp ( top, l, r ) {
    if ( l === r ) return 0;
    do {
        l = l._next;
        if ( l === r ) return -1;
    } while ( l !== top );
    return 1;
}

// distance function about containers
function dist ( top, l, r ) {
    for ( var i=0, it=l;  it !== top;  i--, it=it._next ) {
        if ( it === r ) return i;
    }
    for ( var i=1, it=r._next;  it !== top;  i++, it=it._next ) {
        if ( it === l ) return i;
    }
    return undefined;
}


function Iterator ( l, c ) {
    this._top = l;  // LinkedList object which this iterator belongs to.
    this._pos = c;  // Current position; abstractly iterator points to just before this container
}

var proto = Iterator.prototype = new List.Iterator();
proto.constructor = Iterator;

function validate ( it ) {
    while ( it._pos._removed ) {
        it._pos = it._pos._next;
    }
}

proto.isBoundTo = function ( that ) {
    return this._top === that;
};

proto.equals = function ( that ) {
    if ( !(that instanceof Iterator && that.isBoundTo(this._top)) ) return false;
    validate(this);
    validate(that);
    return  this._pos === that._pos;
};

proto.compareTo = function ( that ) {
    if ( !(that instanceof Iterator && that.isBoundTo(this._top)) ) return undefined;
    validate(this);
    validate(that);
    return comp(this._top, this._pos, that._pos);
};

proto.distance = function ( that ) {
    if ( !(that instanceof Iterator && that.isBoundTo(this._top)) ) return undefined;
    validate(this);
    validate(that);
    return dist(this._top, this._pos, that._pos);
};

proto.isHead = function ( ) {
    validate(this);
    return this._pos === this._top._next;
};

proto.isTail = function ( ) {
    validate(this);
    return this._pos === this._top;
};

proto.next = function ( ) {
    if ( this.isTail() ) throw new NoSuchElementError("no next element");
    return new Iterator(this._top, this._pos._next);
};

proto.previous = function ( ) {
    if ( this.isHead() ) throw new NoSuchElementError("no previous element");
    return new Iterator(this._top, this._pos._prev);
};

proto.value = function ( ) {
    validate(this);
    return this._pos._value;
};

proto.assign = function ( v ) {
    if ( this.isTail() ) return this.insert(v);
    else                 return this._pos._value = v;
};

proto.insert = function ( v ) {
    validate(this);
    var c = makeContainer(v);
    c._prev = this._pos._prev;
    c._next = this._pos;
    this._pos._prev = this._pos._prev._next = c;
    return v;
};

proto.remove = function ( ) {
    if ( this.isTail() ) throw new IllegalStateError("can't remove at the tail of list");
    this._pos._prev._next = this._pos._next;
    this._pos._next._prev = this._pos._prev;
    this._pos._removed = true;
    return this._pos._value;
};



function ReverseIterator ( l, c ) {
    this._top = l;  // LinkedList object which this iterator belongs to.
    this._pos = c;  // Current position; abstractly iterator points to just before this container
}

var proto = ReverseIterator.prototype = new List.Iterator();
for ( var i in Iterator.prototype ) proto[i] = Iterator.prototype[i];
proto.constructor = ReverseIterator;

function rvalidate ( it ) {
    while ( it._pos._removed ) {
        it._pos = it._pos._prev;
    }
}

proto.isBoundTo = Iterator.prototype.isBoundTo;

proto.equals = function ( that ) {
    if ( !(that instanceof Iterator && that.isBoundTo(this._top)) ) return false;
    rvalidate(this);
    rvalidate(that);
    return  this._pos === that._pos;
};

proto.compareTo = function ( that ) {
    if ( !(that instanceof Iterator && that.isBoundTo(this._top)) ) return undefined;
    rvalidate(this);
    rvalidate(that);
    return -comp(this._top, this._pos, that._pos);
};

proto.distance = function ( that ) {
    if ( !(that instanceof Iterator && that.isBoundTo(this._top)) ) return undefined;
    rvalidate(this);
    rvalidate(that);
    var d = dist(this._top, this._pos, that._pos);
    return isNaN(d) ? d : -d;
};

proto.isHead = function ( ) {
    rvalidate(this);
    return this._pos === this._top._prev;
};

proto.isTail = function ( ) {
    rvalidate(this);
    return this._pos === this._top;
};

proto.next = function ( ) {
    if ( this.isTail() ) throw new NoSuchElementError("no next element");
    return new ReverseIterator(this._top, this._pos._prev);
};

proto.previous = function ( ) {
    if ( this.isHead() ) throw new NoSuchElementError("no previous element");
    return new ReverseIterator(this._top, this._pos._next);
};

proto.value = function ( ) {
    rvalidate(this);
    return this._pos._value;
};

proto.assign = Iterator.prototype.assign;

proto.insert = function ( v ) {
    rvalidate(this);
    var c = makeContainer(v);
    c._next = this._pos._next;
    c._prev = this._pos;
    this._pos._next = this._pos._next._prev = c;
    return v;
};

proto.remove = Iterator.prototype.remove;


            return {
                LinkedList: LinkedList
            };
        }();
    }
}
}
}
}
}
}.call(null) ) {
    this.Data.LinkedList = LinkedList;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( this.Concurrent.Thread === undefined ) this.Concurrent.Thread = undefined;
with ( function(){
with ( Data.Error ) {
with ( Concurrent ) {

        return function () {
            var VERSION = '0.1.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Concurrent';








var current_thread = null;  // Retains the current thread.


function NoContinuationException ( r ) {
    this.ret_val = r;
}

function initial_continuation_procedure ( ret_val ) {
    throw new NoContinuationException(ret_val);
}

function NoExceptionHandlerException ( e ) {
    this.thrown = e;
}

function initial_exception_handler ( e ) {
    throw new NoExceptionHandlerException(e);
}

var initial_continuation = {
    this_val : null,
    procedure: initial_continuation_procedure,
    exception: {
        this_val : null,
        procedure: initial_exception_handler
    }
};
// Cyclic reference ensures that at least one exceptinal continuation always exists.
initial_continuation.exception.exception = initial_continuation.exception;




function Thread ( ) {
    throw new Error("Thread cannot be instantiated directly.");
}

function THREAD ( t ) {
    this._triplet      = t;  // {continuation:{...}, timeout:int|undefined, ret_val:any}
    this._is_ended     = 0;  // 0:running, -1:throw, 1:return
    this._join_thread  = null;
    this._joined_list  = new Data.LinkedList();
    this._timerID      = undefined;
    standBy.call(this, 0);
}

var proto = THREAD.prototype = Thread.prototype;

+function(){
    var name = "[object " + NAMESPACE + ".Thread]"
    proto.toString = function ( ) {
        return name;
    };
}();


// Cancel timeout event.
function cancel ( ) {
    if ( this._timerID ) {
        clearTimeout(this._timerID);
        this._timerID = undefined;
    }
}

// Reserve execution of the next step after t msec.
function standBy ( t ) {
    cancel.call(this);
    var self = this;
    this._timerID = setTimeout(
        function(){ doNext.call(self); },
        Number(t) || 2  // some version of IE occationally fails to 
                        // context-switch with timeout interval less than 2.
    );
}

// Cut "join" link.
function unjoin ( ) {
    if ( this._join_thread ) {
        var self = this;
        var it = this._join_thread._joined_list.head().find(function( it ){
            return it === self;
        });
        it.remove();
        this._join_thread = null;
    }
}


Thread.TIME_SLICE = 20;

function doNext ( ) {
    cancel.call(this);
    var triplet = this._triplet;
    this._triplet = null;
    try {
        current_thread = this;
        var limit = (new Date).valueOf() + Thread.TIME_SLICE;
        do {
            try {
                triplet = triplet.continuation.procedure.call(
                              triplet.continuation.this_val, triplet.ret_val
                         );
            } catch ( e ) {
                if ( e instanceof NoContinuationException ) {
                    this._is_ended = 1;
                    this._result   = e.ret_val;
                    while ( !this._joined_list.isEmpty() ) {
                        var it = this._joined_list.head().value();
                        unjoin.call(it);
                        it._triplet.ret_val = e.ret_val;
                        standBy.call(it);
                    }
                    this._joined_list = null;
                    return;
                } else if ( e instanceof NoExceptionHandlerException ) {
                    e = e.thrown;
                    var joined_list   = this._joined_list;
                    this._joined_list = null;
                    this._is_ended    = -1;
                    this._result      = e;
                    if ( !joined_list.isEmpty() ) {
                        while ( !joined_list.isEmpty() ) {
                            joined_list.head().value().notify(e);  // "notify" implies "unjoin".
                        }
                    } else if ( !(e instanceof KillException) ) {
                        throw e;
                    }
                    return;
                } else {
                    triplet.continuation = triplet.continuation.exception;
                    triplet.ret_val      = e;
                }
            }
        } while ( triplet.timeout === undefined && (new Date).valueOf() < limit );
    } finally {
        current_thread = null;
    }
    this._triplet = triplet;
    if ( triplet.timeout < 0 ) { /* Do nothing. */                   }
    else                       { standBy.call(this, triplet.timeout); }
}


proto.notify = function ( e ) {
    if ( current_thread === this ) throw e;
    if ( this._is_ended ) throw new NotAliveError();
    cancel.call(this);
    unjoin.call(this);
    this._triplet.continuation = this._triplet.continuation.exception;
    this._triplet.ret_val = e;
    standBy.call(this);
    return e;
};

proto.kill = function ( s ) {
    return this.notify( arguments.length ? new KillException(s) : new KillException() );
};

proto.join = function ( ) {
    throw new Error("can't `join' in non-compiled functions");
};

proto.join.$Concurrent_Thread_compiled = function ( this_val, args, cont ) {
    //!TODO: check cyclic-join
    if ( this_val._is_ended > 0 ) {  // this thread has already ended normally
        return { continuation:cont, ret_val:this_val._result, timeout:undefined };
    } else if ( this_val._is_ended < 0 ) {  // this thread has already ended by exception
        throw this_val._result;
    } else {
        this_val._joined_list.add(current_thread);
        current_thread._join_thread = this_val;
        return { continuation:cont, timeout:-1 };
    }
};



Thread.create = function ( f /* , ... */ ) {
    if ( typeof f != "function" ) throw new TypeError("can't create new thread from non-function value");
    if ( typeof f.$Concurrent_Thread_compiled !== "function" ) f = this.compile(f);
    return f.async(null, Array.prototype.slice.call(arguments, 1, arguments.length));
};


Thread.self = function ( ) {
    return current_thread;
};


Thread.sleep = function ( ) {
    throw new Error("can't `sleep' in non-compiled functions");
};

Thread.sleep.$Concurrent_Thread_compiled = function ( this_val, args, cont ) {
    return { continuation: cont,
             ret_val     : undefined,
             timeout     : args[0] > 0 ? args[0] : 0 };
};


Thread.stop = function ( ) {
    throw new Error("can't `stop' in non-compiled functions");
};

Thread.stop.$Concurrent_Thread_compiled = function ( this_val, args, cont ) {
    return { continuation: cont,
             ret_val     : undefined,
             timeout     : -1        };
};


Thread.yield = function ( ) {
    throw new Error("can't `yield' in non-compiled functions");
};

Thread.yield.$Concurrent_Thread_compiled = function ( this_val, args, cont ) {
    return { continuation: cont,
             ret_val     : undefined,
             timeout     : 0         };
};


var KillException = Thread.KillException = Exception.extend(
    function ( $super, message ) { $super(message); },
    {
        name   : NAMESPACE + ".Thread.KillException",
        message: "thread killed"
    }
);

var NotAliveError = Thread.NotAliveError = Error.extend(
    function ( $super, message ) { $super(message); },
    {
        name   : NAMESPACE + ".Thread.NotAliveError",
        message: "thread not alive"
    }
);



// Extends Function object.
var proto = Function.prototype;

proto.apply.$Concurrent_Thread_compiled = function ( this_val, args, cont ) {
    if ( typeof this_val.$Concurrent_Thread_compiled == "function" ) {
        return this_val.$Concurrent_Thread_compiled(args[0], args[1], cont);
    } else {
        return { continuation: cont,
                 ret_val     : this_val.apply(args[0], args[1]) };
    }
};

proto.call.$Concurrent_Thread_compiled = function ( this_val, args, cont ) {
    if ( typeof this_val.$Concurrent_Thread_compiled == "function" ) {
        return this_val.$Concurrent_Thread_compiled(args[0], Array.prototype.slice.call(args, 1, args.length), cont);
    } else {
        return { continuation: cont,
                 ret_val     : this_val.apply(args[0], Array.prototype.slice.call(args, 1, args.length)) };
    }
};

proto.async = function ( this_val, args ) {
    if ( typeof this.$Concurrent_Thread_compiled != "function" ) throw new Error("this is not a compiled function");
    if ( args === void 0 ) args = [];  // IE6 does not allow null or undefined-value as the second argument of Function.prototype.apply. That does not conform to ECMA262-3!
    return new THREAD(
        this.$Concurrent_Thread_compiled(
            this_val,
            args,
            initial_continuation
        )
    );
};


            return {
                Thread: Thread
            };
        }();
    }
}
}.call(null) ) {
    this.Concurrent.Thread = Thread;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Http || (typeof this.Concurrent.Thread.Http != 'object' && typeof this.Concurrent.Thread.Http != 'function') ) this.Concurrent.Thread.Http = new Object();
    if ( this.Concurrent.Thread.Http.send === undefined ) this.Concurrent.Thread.Http.send = undefined;
    if ( this.Concurrent.Thread.Http.get === undefined ) this.Concurrent.Thread.Http.get = undefined;
    if ( this.Concurrent.Thread.Http.post === undefined ) this.Concurrent.Thread.Http.post = undefined;
with ( function(){
with ( Concurrent.Thread.Http ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Concurrent.Thread.Http';




var createXMLHttpRequest;  // Set up according to environment.
try {
    new XMLHttpRequest();
    createXMLHttpRequest = function ( ) {
        return new XMLHttpRequest();
    };
} catch ( e ) {
    try {
        // MSXML3 or later
        new ActiveXObject("Msxml2.XMLHTTP");
        createXMLHttpRequest = function ( ) {
            return new ActiveXObject("Msxml2.XMLHTTP");
        };
    } catch ( e ) {
        try {
            // MSXML up to 2
            new ActiveXObject("Microsoft.XMLHTTP");
            createXMLHttpRequest = function ( ) {
                return new ActiveXObject("Microsoft.XMLHTTP");
            };
        } catch ( e ) {
            throw new Error(NAMESPACE + ": can't load XMLHttpRequest object");
        }
    }
}



function send ( method, url, body, headers ) {
    throw new Error(NAMESPACE + ".send is unusable in non-compiled function");
}

var LoadedException = {};

send.$Concurrent_Thread_compiled = function ( $this, $args, $cont ) {
    var method=$args[0], url=$args[1], body=$args[2], headers=$args[3];
    if ( !headers || !(headers instanceof Array) ) headers = [];
    var req = createXMLHttpRequest();
    req.open(method, url, true);
    for ( var i=0;  i < headers.length;  i+=2 ) {
        req.setRequestHeader(headers[i], headers[i+1]);
    }
    var self = Concurrent.Thread.self();
    var loaded    = false;
    var cache_hit = true;
    req.onreadystatechange = function ( ) {
        if ( req.readyState == 4 ) {
            loaded = true;
            if ( !cache_hit ) self.notify(LoadedException);
        }
    };
    req.send(body);  // Firefox occasionally causes "onload" event here. Maybe, it occurs in case of cache-hit.
    cache_hit = false;
    if ( loaded ) {
        return {
            continuation: $cont,
            ret_val     : req,
            timeout     : undefined
        };
    } else {
        var ex_handler = {
            procedure: function ( e ) {
                if ( e === LoadedException ) {
                    return {
                        continuation: $cont,
                        ret_val     : req,
                        timeout     : undefined
                    };
                } else {
                    try{ req.abort(); }catch(_){}  // IE less than 7 does not support "abort".
                    return {
                        continuation: $cont.exception,
                        ret_val     : e,
                        timeout     : undefined
                    };
                }
            },
            this_val : null
        };
        ex_handler.exception = ex_handler;  // Cyclic reference assures to abort request.
        return {
            timeout     : -1,
            continuation: {
                procedure: null,
                this_val : null,
                exception: ex_handler
            }
        };
    }
};



function get ( url, headers ) {
    throw new Error(NAMESPACE + ".get is unusable in non-compiled function");
}

get.$Concurrent_Thread_compiled = function ($this, $args, $cont) {
    return send.$Concurrent_Thread_compiled(
        null,
        ["GET", $args[0], $args[1], null],
        $cont
    );
}



function post ( url, body, headers ) {
    throw new Error(NAMESPACE + ".post is unusable in non-compiled function");
}

post.$Concurrent_Thread_compiled = function ( $this, $args, $cont ) {
    var url=$args[0], body=$args[1], headers=$args[2];
    if ( typeof body == "object" ) {
        var vals = [];
        for ( var i in body ) {
            if ( body.hasOwnProperty(i) ) {
                vals.push( encodeURIComponent(i) + "=" + encodeURIComponent(body[i]) );
            }
        }
        body = vals.join("&");
    }
    if ( !headers || !(headers instanceof Array) ) headers = [];
    var content_type_exists = false;
    for ( var i=0;  i < headers.length;  i+=2 ) {
        if ( String(headers[i]).match(/^Content-type$/i) ) {
            content_type_exists = true;
            break;
        }
    }
    if ( !content_type_exists ) {
        headers = headers.concat("Content-type", "application/x-www-form-urlencoded");
    }
    return send.$Concurrent_Thread_compiled(
        null,
        ["POST", url, body, headers],
        $cont
    );
};

            return {
                send: send, post: post, get: get
            };
        }();
    }
}.call(null) ) {
    this.Concurrent.Thread.Http.send = send;
    this.Concurrent.Thread.Http.post = post;
    this.Concurrent.Thread.Http.get = get;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( !this.Data.Cons.Util || (typeof this.Data.Cons.Util != 'object' && typeof this.Data.Cons.Util != 'function') ) this.Data.Cons.Util = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Data.Cons.Util.last === undefined ) this.Data.Cons.Util.last = undefined;
    if ( this.Data.Cons.Util.adder === undefined ) this.Data.Cons.Util.adder = undefined;
    if ( this.Data.Cons.Util.concat === undefined ) this.Data.Cons.Util.concat = undefined;
with ( function(){
with ( Data.Error ) {
with ( Data.Cons ) {
with ( Data.Cons.Util ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Data.Cons code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Data.Cons.Util';











function last ( c ) {
    if ( !(c instanceof Cell) ) throw new TypeError("argument is not cons-list");
    if ( c.isNil() ) return c;
    if ( !(c.cdr instanceof Cell) ) throw new TypeError("argument is not cons-list");
    while ( !c.cdr.isNil() ) {
        c = c.cdr;
        if ( !(c.cdr instanceof Cell) ) throw new TypeError("argument is not cons-list");
    }
    return c;
}



function adder ( c ) {
    c = last(c);
    if ( c.isNil() ) throw new IllegalStateError("can't append to nil");
    return function ( /* variable arguments */ ) {
        c = last(c);
        for ( var i=0;  i < arguments.length;  i++ ) {
            c = c.cdr = new Cell(arguments[i], c.cdr);
        }
    };
}



function concat ( /* variable arguments */ ) {
    if ( arguments.length == 0 ) return nil();
    var head = arguments[0];
    var cell = last(head);
    for ( var i=1;  i < arguments.length;  i++ ) {
        cell.cdr = arguments[i];
        cell = last(cell);
    }
    return head;
}


            return {
                adder: adder, concat: concat, last: last
            };
        }();
    }
}
}
}.call(null) ) {
    this.Data.Cons.Util.adder = adder;
    this.Data.Cons.Util.concat = concat;
    this.Data.Cons.Util.last = last;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( this.Concurrent.Thread.Compiler.isAlpha === undefined ) this.Concurrent.Thread.Compiler.isAlpha = undefined;
    if ( this.Concurrent.Thread.Compiler.isDigit === undefined ) this.Concurrent.Thread.Compiler.isDigit = undefined;
    if ( this.Concurrent.Thread.Compiler.isHexDigit === undefined ) this.Concurrent.Thread.Compiler.isHexDigit = undefined;
    if ( this.Concurrent.Thread.Compiler.isLineTerminator === undefined ) this.Concurrent.Thread.Compiler.isLineTerminator = undefined;
    if ( this.Concurrent.Thread.Compiler.isSpace === undefined ) this.Concurrent.Thread.Compiler.isSpace = undefined;
    if ( this.Concurrent.Thread.Compiler.isFormatChar === undefined ) this.Concurrent.Thread.Compiler.isFormatChar = undefined;
    if ( this.Concurrent.Thread.Compiler.isIdentifierStart === undefined ) this.Concurrent.Thread.Compiler.isIdentifierStart = undefined;
    if ( this.Concurrent.Thread.Compiler.isIdentifierPart === undefined ) this.Concurrent.Thread.Compiler.isIdentifierPart = undefined;
with ( function(){
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Concurrent.Thread.Compiler';





function isAlpha ( c )
{
    c = c.charCodeAt(0);
    // #generated# Last update: Tue, 01 Aug 2006 16:31:50 +0900
    return c <= 0x5A ?
    0x41 <= c :
    0x61 <= c && c <= 0x7A;
    // #/generated#
}



function isDigit ( c )
{
    c = c.charCodeAt(0);
    // #generated# Last update: Tue, 01 Aug 2006 21:02:15 +0900
    return 0x30 <= c && c <= 0x39;
    // #/generated#
}



function isHexDigit  ( c )
{
    c = c.charCodeAt(0);
    // #generated# Last update: Tue, 01 Aug 2006 15:49:52 +0900
    return c <= 0x46 ?
    c <= 0x39 ?
    0x30 <= c :
    0x41 <= c :
    0x61 <= c && c <= 0x66;
    // #/generated#
}



function isLineTerminator ( c ) {
    switch ( c.charCodeAt(0) ) {
    case 0x000A:  // Line Feed           <LF>
    case 0x000D:  // Carriage Return     <CR>
    case 0x2028:  // Line separator      <LS>
    case 0x2029:  // Paragraph separator <PS>
        return true;
    default:
        return false;
    }
}



function isSpace ( c )
{
    c = c.charCodeAt(0);
    if ( c <= 255 ) {
        switch ( c ) {
        case 0x0009:  // Tab            <TAB>
        case 0x000B:  // Vertical Tab   <VT>
        case 0x000C:  // Form Feed      <FF>
        case 0x0020:  // Space          <SP>
        case 0x00A0:  // No-break space <NBSP>
            return true;
        default:
            return false;
        }
    }
    else {
        // the following code is derived from the Unicode category Zs based on:
        // http://www.unicode.org/Public/UNIDATA/extracted/DerivedGeneralCategory.txt
        // #generated# Last update: Tue, 01 Aug 2006 01:57:18 +0900
        return c <= 0x180E ?
        c <= 0xA0 ?
        c <= 0x20 ?
        0x20 <= c :
        0xA0 <= c :
        c <= 0x1680 ?
        0x1680 <= c :
        0x180E <= c :
        c <= 0x202F ?
        c <= 0x200A ?
        0x2000 <= c :
        0x202F <= c :
        c <= 0x205F ?
        0x205F <= c :
        c === 0x3000;
        // #/generated#
    }
}



function isFormatChar ( c )
{
    c = c.charCodeAt(0);
    if ( c <= 127 ) return false;  // optimization for ASCII characters
    // the following code is derived from the Unicode category Cf based on:
    // http://www.unicode.org/Public/UNIDATA/extracted/DerivedGeneralCategory.txt
    // #generated# Last update: Tue, 01 Aug 2006 01:50:39 +0900
    return c <= 0x202E ?
    c <= 0x70F ?
    c <= 0x603 ?
    c <= 0xAD ?
    0xAD <= c :
    0x600 <= c :
    c <= 0x6DD ?
    0x6DD <= c :
    0x70F <= c :
    c <= 0x200F ?
    c <= 0x17B5 ?
    0x17B4 <= c :
    0x200B <= c :
    0x202A <= c :
    c <= 0xFFFB ?
    c <= 0x206F ?
    c <= 0x2063 ?
    0x2060 <= c :
    0x206A <= c :
    c <= 0xFEFF ?
    0xFEFF <= c :
    0xFFF9 <= c :
    c <= 0xE0001 ?
    c <= 0x1D17A ?
    0x1D173 <= c :
    0xE0001 <= c :
    0xE0020 <= c && c <= 0xE007F;
    // #/generated#
}



function isIdentifierStart ( c ) {
    var c = c.charCodeAt(0);
    switch ( c ) {
    case 0x24:  // '$'
    case 0x5F:  // '_'
        return true;
    }
    // the following code is derived from the Unicode category Lu, Ll, Lt, Lm, Lo, and Nl based on:
    // http://www.unicode.org/Public/UNIDATA/extracted/DerivedGeneralCategory.txt
    // #generated# Last update: Tue, 01 Aug 2006 01:47:30 +0900
    return c <= 0x1731 ?
    c <= 0xB95 ?
    c <= 0x961 ?
    c <= 0x587 ?
    c <= 0x37D ?
    c <= 0xD6 ?
    c <= 0xAA ?
    c <= 0x7A ?
    c <= 0x5A ?
    0x41 <= c :
    0x61 <= c :
    0xAA <= c :
    c <= 0xBA ?
    c <= 0xB5 ?
    0xB5 <= c :
    0xBA <= c :
    0xC0 <= c :
    c <= 0x2D1 ?
    c <= 0x2C1 ?
    c <= 0xF6 ?
    0xD8 <= c :
    0xF8 <= c :
    0x2C6 <= c :
    c <= 0x2EE ?
    c <= 0x2E4 ?
    0x2E0 <= c :
    0x2EE <= c :
    0x37A <= c :
    c <= 0x3F5 ?
    c <= 0x38C ?
    c <= 0x38A ?
    c <= 0x386 ?
    0x386 <= c :
    0x388 <= c :
    0x38C <= c :
    c <= 0x3CE ?
    c <= 0x3A1 ?
    0x38E <= c :
    0x3A3 <= c :
    0x3D0 <= c :
    c <= 0x556 ?
    c <= 0x513 ?
    c <= 0x481 ?
    0x3F7 <= c :
    0x48A <= c :
    0x531 <= c :
    c <= 0x559 ?
    0x559 <= c :
    0x561 <= c :
    c <= 0x710 ?
    c <= 0x6D3 ?
    c <= 0x63A ?
    c <= 0x5F2 ?
    c <= 0x5EA ?
    0x5D0 <= c :
    0x5F0 <= c :
    0x621 <= c :
    c <= 0x66F ?
    c <= 0x64A ?
    0x640 <= c :
    0x66E <= c :
    0x671 <= c :
    c <= 0x6EF ?
    c <= 0x6E6 ?
    c <= 0x6D5 ?
    0x6D5 <= c :
    0x6E5 <= c :
    0x6EE <= c :
    c <= 0x6FF ?
    c <= 0x6FC ?
    0x6FA <= c :
    0x6FF <= c :
    0x710 <= c :
    c <= 0x7F5 ?
    c <= 0x7A5 ?
    c <= 0x76D ?
    c <= 0x72F ?
    0x712 <= c :
    0x74D <= c :
    0x780 <= c :
    c <= 0x7EA ?
    c <= 0x7B1 ?
    0x7B1 <= c :
    0x7CA <= c :
    0x7F4 <= c :
    c <= 0x93D ?
    c <= 0x939 ?
    c <= 0x7FA ?
    0x7FA <= c :
    0x904 <= c :
    0x93D <= c :
    c <= 0x950 ?
    0x950 <= c :
    0x958 <= c :
    c <= 0xA8D ?
    c <= 0x9F1 ?
    c <= 0x9B2 ?
    c <= 0x990 ?
    c <= 0x98C ?
    c <= 0x97F ?
    0x97B <= c :
    0x985 <= c :
    0x98F <= c :
    c <= 0x9B0 ?
    c <= 0x9A8 ?
    0x993 <= c :
    0x9AA <= c :
    0x9B2 <= c :
    c <= 0x9CE ?
    c <= 0x9BD ?
    c <= 0x9B9 ?
    0x9B6 <= c :
    0x9BD <= c :
    0x9CE <= c :
    c <= 0x9E1 ?
    c <= 0x9DD ?
    0x9DC <= c :
    0x9DF <= c :
    0x9F0 <= c :
    c <= 0xA36 ?
    c <= 0xA28 ?
    c <= 0xA10 ?
    c <= 0xA0A ?
    0xA05 <= c :
    0xA0F <= c :
    0xA13 <= c :
    c <= 0xA33 ?
    c <= 0xA30 ?
    0xA2A <= c :
    0xA32 <= c :
    0xA35 <= c :
    c <= 0xA5E ?
    c <= 0xA5C ?
    c <= 0xA39 ?
    0xA38 <= c :
    0xA59 <= c :
    0xA5E <= c :
    c <= 0xA74 ?
    0xA72 <= c :
    0xA85 <= c :
    c <= 0xB28 ?
    c <= 0xABD ?
    c <= 0xAB0 ?
    c <= 0xAA8 ?
    c <= 0xA91 ?
    0xA8F <= c :
    0xA93 <= c :
    0xAAA <= c :
    c <= 0xAB9 ?
    c <= 0xAB3 ?
    0xAB2 <= c :
    0xAB5 <= c :
    0xABD <= c :
    c <= 0xB0C ?
    c <= 0xAE1 ?
    c <= 0xAD0 ?
    0xAD0 <= c :
    0xAE0 <= c :
    0xB05 <= c :
    c <= 0xB10 ?
    0xB0F <= c :
    0xB13 <= c :
    c <= 0xB61 ?
    c <= 0xB39 ?
    c <= 0xB33 ?
    c <= 0xB30 ?
    0xB2A <= c :
    0xB32 <= c :
    0xB35 <= c :
    c <= 0xB5D ?
    c <= 0xB3D ?
    0xB3D <= c :
    0xB5C <= c :
    0xB5F <= c :
    c <= 0xB8A ?
    c <= 0xB83 ?
    c <= 0xB71 ?
    0xB71 <= c :
    0xB83 <= c :
    0xB85 <= c :
    c <= 0xB90 ?
    0xB8E <= c :
    0xB92 <= c :
    c <= 0xEB0 ?
    c <= 0xD28 ?
    c <= 0xC61 ?
    c <= 0xBB9 ?
    c <= 0xB9F ?
    c <= 0xB9C ?
    c <= 0xB9A ?
    0xB99 <= c :
    0xB9C <= c :
    0xB9E <= c :
    c <= 0xBAA ?
    c <= 0xBA4 ?
    0xBA3 <= c :
    0xBA8 <= c :
    0xBAE <= c :
    c <= 0xC28 ?
    c <= 0xC10 ?
    c <= 0xC0C ?
    0xC05 <= c :
    0xC0E <= c :
    0xC12 <= c :
    c <= 0xC39 ?
    c <= 0xC33 ?
    0xC2A <= c :
    0xC35 <= c :
    0xC60 <= c :
    c <= 0xCBD ?
    c <= 0xCA8 ?
    c <= 0xC90 ?
    c <= 0xC8C ?
    0xC85 <= c :
    0xC8E <= c :
    0xC92 <= c :
    c <= 0xCB9 ?
    c <= 0xCB3 ?
    0xCAA <= c :
    0xCB5 <= c :
    0xCBD <= c :
    c <= 0xD0C ?
    c <= 0xCE1 ?
    c <= 0xCDE ?
    0xCDE <= c :
    0xCE0 <= c :
    0xD05 <= c :
    c <= 0xD10 ?
    0xD0E <= c :
    0xD12 <= c :
    c <= 0xE82 ?
    c <= 0xDBD ?
    c <= 0xD96 ?
    c <= 0xD61 ?
    c <= 0xD39 ?
    0xD2A <= c :
    0xD60 <= c :
    0xD85 <= c :
    c <= 0xDBB ?
    c <= 0xDB1 ?
    0xD9A <= c :
    0xDB3 <= c :
    0xDBD <= c :
    c <= 0xE33 ?
    c <= 0xE30 ?
    c <= 0xDC6 ?
    0xDC0 <= c :
    0xE01 <= c :
    0xE32 <= c :
    c <= 0xE46 ?
    0xE40 <= c :
    0xE81 <= c :
    c <= 0xE9F ?
    c <= 0xE8A ?
    c <= 0xE88 ?
    c <= 0xE84 ?
    0xE84 <= c :
    0xE87 <= c :
    0xE8A <= c :
    c <= 0xE97 ?
    c <= 0xE8D ?
    0xE8D <= c :
    0xE94 <= c :
    0xE99 <= c :
    c <= 0xEA7 ?
    c <= 0xEA5 ?
    c <= 0xEA3 ?
    0xEA1 <= c :
    0xEA5 <= c :
    0xEA7 <= c :
    c <= 0xEAB ?
    0xEAA <= c :
    0xEAD <= c :
    c <= 0x1258 ?
    c <= 0x102A ?
    c <= 0xF00 ?
    c <= 0xEC4 ?
    c <= 0xEBD ?
    c <= 0xEB3 ?
    0xEB2 <= c :
    0xEBD <= c :
    0xEC0 <= c :
    c <= 0xEDD ?
    c <= 0xEC6 ?
    0xEC6 <= c :
    0xEDC <= c :
    0xF00 <= c :
    c <= 0xF8B ?
    c <= 0xF6A ?
    c <= 0xF47 ?
    0xF40 <= c :
    0xF49 <= c :
    0xF88 <= c :
    c <= 0x1027 ?
    c <= 0x1021 ?
    0x1000 <= c :
    0x1023 <= c :
    0x1029 <= c :
    c <= 0x11A2 ?
    c <= 0x10FA ?
    c <= 0x10C5 ?
    c <= 0x1055 ?
    0x1050 <= c :
    0x10A0 <= c :
    0x10D0 <= c :
    c <= 0x1159 ?
    c <= 0x10FC ?
    0x10FC <= c :
    0x1100 <= c :
    0x115F <= c :
    c <= 0x124D ?
    c <= 0x1248 ?
    c <= 0x11F9 ?
    0x11A8 <= c :
    0x1200 <= c :
    0x124A <= c :
    c <= 0x1256 ?
    0x1250 <= c :
    0x1258 <= c :
    c <= 0x1315 ?
    c <= 0x12BE ?
    c <= 0x128D ?
    c <= 0x1288 ?
    c <= 0x125D ?
    0x125A <= c :
    0x1260 <= c :
    0x128A <= c :
    c <= 0x12B5 ?
    c <= 0x12B0 ?
    0x1290 <= c :
    0x12B2 <= c :
    0x12B8 <= c :
    c <= 0x12D6 ?
    c <= 0x12C5 ?
    c <= 0x12C0 ?
    0x12C0 <= c :
    0x12C2 <= c :
    0x12C8 <= c :
    c <= 0x1310 ?
    0x12D8 <= c :
    0x1312 <= c :
    c <= 0x169A ?
    c <= 0x13F4 ?
    c <= 0x138F ?
    c <= 0x135A ?
    0x1318 <= c :
    0x1380 <= c :
    0x13A0 <= c :
    c <= 0x1676 ?
    c <= 0x166C ?
    0x1401 <= c :
    0x166F <= c :
    0x1681 <= c :
    c <= 0x170C ?
    c <= 0x16F0 ?
    c <= 0x16EA ?
    0x16A0 <= c :
    0x16EE <= c :
    0x1700 <= c :
    c <= 0x1711 ?
    0x170E <= c :
    0x1720 <= c :
    c <= 0xA805 ?
    c <= 0x2115 ?
    c <= 0x1F4D ?
    c <= 0x19A9 ?
    c <= 0x17DC ?
    c <= 0x1770 ?
    c <= 0x176C ?
    c <= 0x1751 ?
    0x1740 <= c :
    0x1760 <= c :
    0x176E <= c :
    c <= 0x17D7 ?
    c <= 0x17B3 ?
    0x1780 <= c :
    0x17D7 <= c :
    0x17DC <= c :
    c <= 0x191C ?
    c <= 0x18A8 ?
    c <= 0x1877 ?
    0x1820 <= c :
    0x1880 <= c :
    0x1900 <= c :
    c <= 0x1974 ?
    c <= 0x196D ?
    0x1950 <= c :
    0x1970 <= c :
    0x1980 <= c :
    c <= 0x1E9B ?
    c <= 0x1B33 ?
    c <= 0x1A16 ?
    c <= 0x19C7 ?
    0x19C1 <= c :
    0x1A00 <= c :
    0x1B05 <= c :
    c <= 0x1DBF ?
    c <= 0x1B4B ?
    0x1B45 <= c :
    0x1D00 <= c :
    0x1E00 <= c :
    c <= 0x1F1D ?
    c <= 0x1F15 ?
    c <= 0x1EF9 ?
    0x1EA0 <= c :
    0x1F00 <= c :
    0x1F18 <= c :
    c <= 0x1F45 ?
    0x1F20 <= c :
    0x1F48 <= c :
    c <= 0x1FD3 ?
    c <= 0x1FB4 ?
    c <= 0x1F5B ?
    c <= 0x1F59 ?
    c <= 0x1F57 ?
    0x1F50 <= c :
    0x1F59 <= c :
    0x1F5B <= c :
    c <= 0x1F7D ?
    c <= 0x1F5D ?
    0x1F5D <= c :
    0x1F5F <= c :
    0x1F80 <= c :
    c <= 0x1FC4 ?
    c <= 0x1FBE ?
    c <= 0x1FBC ?
    0x1FB6 <= c :
    0x1FBE <= c :
    0x1FC2 <= c :
    c <= 0x1FCC ?
    0x1FC6 <= c :
    0x1FD0 <= c :
    c <= 0x207F ?
    c <= 0x1FF4 ?
    c <= 0x1FEC ?
    c <= 0x1FDB ?
    0x1FD6 <= c :
    0x1FE0 <= c :
    0x1FF2 <= c :
    c <= 0x2071 ?
    c <= 0x1FFC ?
    0x1FF6 <= c :
    0x2071 <= c :
    0x207F <= c :
    c <= 0x2107 ?
    c <= 0x2102 ?
    c <= 0x2094 ?
    0x2090 <= c :
    0x2102 <= c :
    0x2107 <= c :
    c <= 0x2113 ?
    0x210A <= c :
    0x2115 <= c :
    c <= 0x2DBE ?
    c <= 0x2C5E ?
    c <= 0x2139 ?
    c <= 0x2126 ?
    c <= 0x2124 ?
    c <= 0x211D ?
    0x2119 <= c :
    0x2124 <= c :
    0x2126 <= c :
    c <= 0x212D ?
    c <= 0x2128 ?
    0x2128 <= c :
    0x212A <= c :
    0x212F <= c :
    c <= 0x214E ?
    c <= 0x2149 ?
    c <= 0x213F ?
    0x213C <= c :
    0x2145 <= c :
    0x214E <= c :
    c <= 0x2C2E ?
    c <= 0x2184 ?
    0x2160 <= c :
    0x2C00 <= c :
    0x2C30 <= c :
    c <= 0x2D6F ?
    c <= 0x2CE4 ?
    c <= 0x2C77 ?
    c <= 0x2C6C ?
    0x2C60 <= c :
    0x2C74 <= c :
    0x2C80 <= c :
    c <= 0x2D65 ?
    c <= 0x2D25 ?
    0x2D00 <= c :
    0x2D30 <= c :
    0x2D6F <= c :
    c <= 0x2DAE ?
    c <= 0x2DA6 ?
    c <= 0x2D96 ?
    0x2D80 <= c :
    0x2DA0 <= c :
    0x2DA8 <= c :
    c <= 0x2DB6 ?
    0x2DB0 <= c :
    0x2DB8 <= c :
    c <= 0x30FA ?
    c <= 0x3029 ?
    c <= 0x2DD6 ?
    c <= 0x2DCE ?
    c <= 0x2DC6 ?
    0x2DC0 <= c :
    0x2DC8 <= c :
    0x2DD0 <= c :
    c <= 0x3007 ?
    c <= 0x2DDE ?
    0x2DD8 <= c :
    0x3005 <= c :
    0x3021 <= c :
    c <= 0x3096 ?
    c <= 0x303C ?
    c <= 0x3035 ?
    0x3031 <= c :
    0x3038 <= c :
    0x3041 <= c :
    c <= 0x309F ?
    0x309D <= c :
    0x30A1 <= c :
    c <= 0x4DB5 ?
    c <= 0x318E ?
    c <= 0x312C ?
    c <= 0x30FF ?
    0x30FC <= c :
    0x3105 <= c :
    0x3131 <= c :
    c <= 0x31FF ?
    c <= 0x31B7 ?
    0x31A0 <= c :
    0x31F0 <= c :
    0x3400 <= c :
    c <= 0xA71A ?
    c <= 0xA48C ?
    c <= 0x9FBB ?
    0x4E00 <= c :
    0xA000 <= c :
    0xA717 <= c :
    c <= 0xA801 ?
    0xA800 <= c :
    0xA803 <= c :
    c <= 0x1049D ?
    c <= 0xFEFC ?
    c <= 0xFB36 ?
    c <= 0xFA6A ?
    c <= 0xA873 ?
    c <= 0xA822 ?
    c <= 0xA80A ?
    0xA807 <= c :
    0xA80C <= c :
    0xA840 <= c :
    c <= 0xFA2D ?
    c <= 0xD7A3 ?
    0xAC00 <= c :
    0xF900 <= c :
    0xFA30 <= c :
    c <= 0xFB17 ?
    c <= 0xFB06 ?
    c <= 0xFAD9 ?
    0xFA70 <= c :
    0xFB00 <= c :
    0xFB13 <= c :
    c <= 0xFB28 ?
    c <= 0xFB1D ?
    0xFB1D <= c :
    0xFB1F <= c :
    0xFB2A <= c :
    c <= 0xFD3D ?
    c <= 0xFB41 ?
    c <= 0xFB3E ?
    c <= 0xFB3C ?
    0xFB38 <= c :
    0xFB3E <= c :
    0xFB40 <= c :
    c <= 0xFBB1 ?
    c <= 0xFB44 ?
    0xFB43 <= c :
    0xFB46 <= c :
    0xFBD3 <= c :
    c <= 0xFDFB ?
    c <= 0xFDC7 ?
    c <= 0xFD8F ?
    0xFD50 <= c :
    0xFD92 <= c :
    0xFDF0 <= c :
    c <= 0xFE74 ?
    0xFE70 <= c :
    0xFE76 <= c :
    c <= 0x1003D ?
    c <= 0xFFD7 ?
    c <= 0xFFBE ?
    c <= 0xFF5A ?
    c <= 0xFF3A ?
    0xFF21 <= c :
    0xFF41 <= c :
    0xFF66 <= c :
    c <= 0xFFCF ?
    c <= 0xFFC7 ?
    0xFFC2 <= c :
    0xFFCA <= c :
    0xFFD2 <= c :
    c <= 0x10026 ?
    c <= 0x1000B ?
    c <= 0xFFDC ?
    0xFFDA <= c :
    0x10000 <= c :
    0x1000D <= c :
    c <= 0x1003A ?
    0x10028 <= c :
    0x1003C <= c :
    c <= 0x1034A ?
    c <= 0x100FA ?
    c <= 0x1005D ?
    c <= 0x1004D ?
    0x1003F <= c :
    0x10050 <= c :
    0x10080 <= c :
    c <= 0x1031E ?
    c <= 0x10174 ?
    0x10140 <= c :
    0x10300 <= c :
    0x10330 <= c :
    c <= 0x103CF ?
    c <= 0x103C3 ?
    c <= 0x1039D ?
    0x10380 <= c :
    0x103A0 <= c :
    0x103C8 <= c :
    c <= 0x103D5 ?
    0x103D1 <= c :
    0x10400 <= c :
    c <= 0x1D505 ?
    c <= 0x1236E ?
    c <= 0x1083F ?
    c <= 0x10835 ?
    c <= 0x10808 ?
    c <= 0x10805 ?
    0x10800 <= c :
    0x10808 <= c :
    0x1080A <= c :
    c <= 0x1083C ?
    c <= 0x10838 ?
    0x10837 <= c :
    0x1083C <= c :
    0x1083F <= c :
    c <= 0x10A13 ?
    c <= 0x10A00 ?
    c <= 0x10915 ?
    0x10900 <= c :
    0x10A00 <= c :
    0x10A10 <= c :
    c <= 0x10A33 ?
    c <= 0x10A17 ?
    0x10A15 <= c :
    0x10A19 <= c :
    0x12000 <= c :
    c <= 0x1D4A6 ?
    c <= 0x1D49C ?
    c <= 0x1D454 ?
    c <= 0x12462 ?
    0x12400 <= c :
    0x1D400 <= c :
    0x1D456 <= c :
    c <= 0x1D4A2 ?
    c <= 0x1D49F ?
    0x1D49E <= c :
    0x1D4A2 <= c :
    0x1D4A5 <= c :
    c <= 0x1D4BB ?
    c <= 0x1D4B9 ?
    c <= 0x1D4AC ?
    0x1D4A9 <= c :
    0x1D4AE <= c :
    0x1D4BB <= c :
    c <= 0x1D4C3 ?
    0x1D4BD <= c :
    0x1D4C5 <= c :
    c <= 0x1D6DA ?
    c <= 0x1D544 ?
    c <= 0x1D51C ?
    c <= 0x1D514 ?
    c <= 0x1D50A ?
    0x1D507 <= c :
    0x1D50D <= c :
    0x1D516 <= c :
    c <= 0x1D53E ?
    c <= 0x1D539 ?
    0x1D51E <= c :
    0x1D53B <= c :
    0x1D540 <= c :
    c <= 0x1D6A5 ?
    c <= 0x1D550 ?
    c <= 0x1D546 ?
    0x1D546 <= c :
    0x1D54A <= c :
    0x1D552 <= c :
    c <= 0x1D6C0 ?
    0x1D6A8 <= c :
    0x1D6C2 <= c :
    c <= 0x1D788 ?
    c <= 0x1D734 ?
    c <= 0x1D714 ?
    c <= 0x1D6FA ?
    0x1D6DC <= c :
    0x1D6FC <= c :
    0x1D716 <= c :
    c <= 0x1D76E ?
    c <= 0x1D74E ?
    0x1D736 <= c :
    0x1D750 <= c :
    0x1D770 <= c :
    c <= 0x1D7CB ?
    c <= 0x1D7C2 ?
    c <= 0x1D7A8 ?
    0x1D78A <= c :
    0x1D7AA <= c :
    0x1D7C4 <= c :
    c <= 0x2A6D6 ?
    0x20000 <= c :
    0x2F800 <= c && c <= 0x2FA1D;
    // #/generated#
}



function isIdentifierPart ( c ) {
    var c = c.charCodeAt(0);
    switch ( c ) {
    case 0x24:  // '$'
    case 0x5F:  // '_'
        return true;
    }
    // the following code is derived from the Unicode category Lu, Ll, Lt, Lm, Lo, Nl, Mn, Mc, Nd, and Pc based on:
    // http://www.unicode.org/Public/UNIDATA/extracted/DerivedGeneralCategory.txt
    // #generated# Last update: Tue, 01 Aug 2006 02:00:01 +0900
    return c <= 0x12B0 ?
    c <= 0xB90 ?
    c <= 0x990 ?
    c <= 0x5BF ?
    c <= 0x37D ?
    c <= 0xD6 ?
    c <= 0x7A ?
    c <= 0x5A ?
    c <= 0x39 ?
    0x30 <= c :
    0x41 <= c :
    c <= 0x5F ?
    0x5F <= c :
    0x61 <= c :
    c <= 0xB5 ?
    c <= 0xAA ?
    0xAA <= c :
    0xB5 <= c :
    c <= 0xBA ?
    0xBA <= c :
    0xC0 <= c :
    c <= 0x2E4 ?
    c <= 0x2C1 ?
    c <= 0xF6 ?
    0xD8 <= c :
    0xF8 <= c :
    c <= 0x2D1 ?
    0x2C6 <= c :
    0x2E0 <= c :
    c <= 0x36F ?
    c <= 0x2EE ?
    0x2EE <= c :
    0x300 <= c :
    0x37A <= c :
    c <= 0x481 ?
    c <= 0x3A1 ?
    c <= 0x38A ?
    c <= 0x386 ?
    0x386 <= c :
    0x388 <= c :
    c <= 0x38C ?
    0x38C <= c :
    0x38E <= c :
    c <= 0x3F5 ?
    c <= 0x3CE ?
    0x3A3 <= c :
    0x3D0 <= c :
    0x3F7 <= c :
    c <= 0x559 ?
    c <= 0x513 ?
    c <= 0x486 ?
    0x483 <= c :
    0x48A <= c :
    c <= 0x556 ?
    0x531 <= c :
    0x559 <= c :
    c <= 0x5BD ?
    c <= 0x587 ?
    0x561 <= c :
    0x591 <= c :
    0x5BF <= c :
    c <= 0x6FF ?
    c <= 0x63A ?
    c <= 0x5EA ?
    c <= 0x5C5 ?
    c <= 0x5C2 ?
    0x5C1 <= c :
    0x5C4 <= c :
    c <= 0x5C7 ?
    0x5C7 <= c :
    0x5D0 <= c :
    c <= 0x615 ?
    c <= 0x5F2 ?
    0x5F0 <= c :
    0x610 <= c :
    0x621 <= c :
    c <= 0x6DC ?
    c <= 0x669 ?
    c <= 0x65E ?
    0x640 <= c :
    0x660 <= c :
    c <= 0x6D3 ?
    0x66E <= c :
    0x6D5 <= c :
    c <= 0x6FC ?
    c <= 0x6E8 ?
    0x6DF <= c :
    0x6EA <= c :
    0x6FF <= c :
    c <= 0x94D ?
    c <= 0x7F5 ?
    c <= 0x76D ?
    c <= 0x74A ?
    0x710 <= c :
    0x74D <= c :
    c <= 0x7B1 ?
    0x780 <= c :
    0x7C0 <= c :
    c <= 0x939 ?
    c <= 0x7FA ?
    0x7FA <= c :
    0x901 <= c :
    0x93C <= c :
    c <= 0x97F ?
    c <= 0x963 ?
    c <= 0x954 ?
    0x950 <= c :
    0x958 <= c :
    c <= 0x96F ?
    0x966 <= c :
    0x97B <= c :
    c <= 0x98C ?
    c <= 0x983 ?
    0x981 <= c :
    0x985 <= c :
    0x98F <= c :
    c <= 0xA91 ?
    c <= 0xA28 ?
    c <= 0x9D7 ?
    c <= 0x9B9 ?
    c <= 0x9B0 ?
    c <= 0x9A8 ?
    0x993 <= c :
    0x9AA <= c :
    c <= 0x9B2 ?
    0x9B2 <= c :
    0x9B6 <= c :
    c <= 0x9C8 ?
    c <= 0x9C4 ?
    0x9BC <= c :
    0x9C7 <= c :
    c <= 0x9CE ?
    0x9CB <= c :
    0x9D7 <= c :
    c <= 0xA03 ?
    c <= 0x9E3 ?
    c <= 0x9DD ?
    0x9DC <= c :
    0x9DF <= c :
    c <= 0x9F1 ?
    0x9E6 <= c :
    0xA01 <= c :
    c <= 0xA10 ?
    c <= 0xA0A ?
    0xA05 <= c :
    0xA0F <= c :
    0xA13 <= c :
    c <= 0xA48 ?
    c <= 0xA39 ?
    c <= 0xA33 ?
    c <= 0xA30 ?
    0xA2A <= c :
    0xA32 <= c :
    c <= 0xA36 ?
    0xA35 <= c :
    0xA38 <= c :
    c <= 0xA42 ?
    c <= 0xA3C ?
    0xA3C <= c :
    0xA3E <= c :
    0xA47 <= c :
    c <= 0xA74 ?
    c <= 0xA5C ?
    c <= 0xA4D ?
    0xA4B <= c :
    0xA59 <= c :
    c <= 0xA5E ?
    0xA5E <= c :
    0xA66 <= c :
    c <= 0xA8D ?
    c <= 0xA83 ?
    0xA81 <= c :
    0xA85 <= c :
    0xA8F <= c :
    c <= 0xB28 ?
    c <= 0xACD ?
    c <= 0xAB9 ?
    c <= 0xAB0 ?
    c <= 0xAA8 ?
    0xA93 <= c :
    0xAAA <= c :
    c <= 0xAB3 ?
    0xAB2 <= c :
    0xAB5 <= c :
    c <= 0xAC9 ?
    c <= 0xAC5 ?
    0xABC <= c :
    0xAC7 <= c :
    0xACB <= c :
    c <= 0xB03 ?
    c <= 0xAE3 ?
    c <= 0xAD0 ?
    0xAD0 <= c :
    0xAE0 <= c :
    c <= 0xAEF ?
    0xAE6 <= c :
    0xB01 <= c :
    c <= 0xB10 ?
    c <= 0xB0C ?
    0xB05 <= c :
    0xB0F <= c :
    0xB13 <= c :
    c <= 0xB57 ?
    c <= 0xB43 ?
    c <= 0xB33 ?
    c <= 0xB30 ?
    0xB2A <= c :
    0xB32 <= c :
    c <= 0xB39 ?
    0xB35 <= c :
    0xB3C <= c :
    c <= 0xB4D ?
    c <= 0xB48 ?
    0xB47 <= c :
    0xB4B <= c :
    0xB56 <= c :
    c <= 0xB71 ?
    c <= 0xB61 ?
    c <= 0xB5D ?
    0xB5C <= c :
    0xB5F <= c :
    c <= 0xB6F ?
    0xB66 <= c :
    0xB71 <= c :
    c <= 0xB8A ?
    c <= 0xB83 ?
    0xB82 <= c :
    0xB85 <= c :
    0xB8E <= c :
    c <= 0xDD6 ?
    c <= 0xCB3 ?
    c <= 0xC10 ?
    c <= 0xBC2 ?
    c <= 0xB9F ?
    c <= 0xB9A ?
    c <= 0xB95 ?
    0xB92 <= c :
    0xB99 <= c :
    c <= 0xB9C ?
    0xB9C <= c :
    0xB9E <= c :
    c <= 0xBAA ?
    c <= 0xBA4 ?
    0xBA3 <= c :
    0xBA8 <= c :
    c <= 0xBB9 ?
    0xBAE <= c :
    0xBBE <= c :
    c <= 0xBEF ?
    c <= 0xBCD ?
    c <= 0xBC8 ?
    0xBC6 <= c :
    0xBCA <= c :
    c <= 0xBD7 ?
    0xBD7 <= c :
    0xBE6 <= c :
    c <= 0xC0C ?
    c <= 0xC03 ?
    0xC01 <= c :
    0xC05 <= c :
    0xC0E <= c :
    c <= 0xC56 ?
    c <= 0xC44 ?
    c <= 0xC33 ?
    c <= 0xC28 ?
    0xC12 <= c :
    0xC2A <= c :
    c <= 0xC39 ?
    0xC35 <= c :
    0xC3E <= c :
    c <= 0xC4D ?
    c <= 0xC48 ?
    0xC46 <= c :
    0xC4A <= c :
    0xC55 <= c :
    c <= 0xC8C ?
    c <= 0xC6F ?
    c <= 0xC61 ?
    0xC60 <= c :
    0xC66 <= c :
    c <= 0xC83 ?
    0xC82 <= c :
    0xC85 <= c :
    c <= 0xCA8 ?
    c <= 0xC90 ?
    0xC8E <= c :
    0xC92 <= c :
    0xCAA <= c :
    c <= 0xD43 ?
    c <= 0xCE3 ?
    c <= 0xCCD ?
    c <= 0xCC4 ?
    c <= 0xCB9 ?
    0xCB5 <= c :
    0xCBC <= c :
    c <= 0xCC8 ?
    0xCC6 <= c :
    0xCCA <= c :
    c <= 0xCDE ?
    c <= 0xCD6 ?
    0xCD5 <= c :
    0xCDE <= c :
    0xCE0 <= c :
    c <= 0xD10 ?
    c <= 0xD03 ?
    c <= 0xCEF ?
    0xCE6 <= c :
    0xD02 <= c :
    c <= 0xD0C ?
    0xD05 <= c :
    0xD0E <= c :
    c <= 0xD39 ?
    c <= 0xD28 ?
    0xD12 <= c :
    0xD2A <= c :
    0xD3E <= c :
    c <= 0xD96 ?
    c <= 0xD61 ?
    c <= 0xD4D ?
    c <= 0xD48 ?
    0xD46 <= c :
    0xD4A <= c :
    c <= 0xD57 ?
    0xD57 <= c :
    0xD60 <= c :
    c <= 0xD83 ?
    c <= 0xD6F ?
    0xD66 <= c :
    0xD82 <= c :
    0xD85 <= c :
    c <= 0xDC6 ?
    c <= 0xDBB ?
    c <= 0xDB1 ?
    0xD9A <= c :
    0xDB3 <= c :
    c <= 0xDBD ?
    0xDBD <= c :
    0xDC0 <= c :
    c <= 0xDD4 ?
    c <= 0xDCA ?
    0xDCA <= c :
    0xDCF <= c :
    0xDD6 <= c :
    c <= 0xF39 ?
    c <= 0xEA7 ?
    c <= 0xE88 ?
    c <= 0xE4E ?
    c <= 0xDF3 ?
    c <= 0xDDF ?
    0xDD8 <= c :
    0xDF2 <= c :
    c <= 0xE3A ?
    0xE01 <= c :
    0xE40 <= c :
    c <= 0xE82 ?
    c <= 0xE59 ?
    0xE50 <= c :
    0xE81 <= c :
    c <= 0xE84 ?
    0xE84 <= c :
    0xE87 <= c :
    c <= 0xE9F ?
    c <= 0xE8D ?
    c <= 0xE8A ?
    0xE8A <= c :
    0xE8D <= c :
    c <= 0xE97 ?
    0xE94 <= c :
    0xE99 <= c :
    c <= 0xEA5 ?
    c <= 0xEA3 ?
    0xEA1 <= c :
    0xEA5 <= c :
    0xEA7 <= c :
    c <= 0xED9 ?
    c <= 0xEC4 ?
    c <= 0xEB9 ?
    c <= 0xEAB ?
    0xEAA <= c :
    0xEAD <= c :
    c <= 0xEBD ?
    0xEBB <= c :
    0xEC0 <= c :
    c <= 0xECD ?
    c <= 0xEC6 ?
    0xEC6 <= c :
    0xEC8 <= c :
    0xED0 <= c :
    c <= 0xF29 ?
    c <= 0xF00 ?
    c <= 0xEDD ?
    0xEDC <= c :
    0xF00 <= c :
    c <= 0xF19 ?
    0xF18 <= c :
    0xF20 <= c :
    c <= 0xF37 ?
    c <= 0xF35 ?
    0xF35 <= c :
    0xF37 <= c :
    0xF39 <= c :
    c <= 0x1059 ?
    c <= 0xFC6 ?
    c <= 0xF8B ?
    c <= 0xF6A ?
    c <= 0xF47 ?
    0xF3E <= c :
    0xF49 <= c :
    c <= 0xF84 ?
    0xF71 <= c :
    0xF86 <= c :
    c <= 0xFBC ?
    c <= 0xF97 ?
    0xF90 <= c :
    0xF99 <= c :
    0xFC6 <= c :
    c <= 0x1032 ?
    c <= 0x1027 ?
    c <= 0x1021 ?
    0x1000 <= c :
    0x1023 <= c :
    c <= 0x102A ?
    0x1029 <= c :
    0x102C <= c :
    c <= 0x1049 ?
    c <= 0x1039 ?
    0x1036 <= c :
    0x1040 <= c :
    0x1050 <= c :
    c <= 0x1248 ?
    c <= 0x1159 ?
    c <= 0x10FA ?
    c <= 0x10C5 ?
    0x10A0 <= c :
    0x10D0 <= c :
    c <= 0x10FC ?
    0x10FC <= c :
    0x1100 <= c :
    c <= 0x11F9 ?
    c <= 0x11A2 ?
    0x115F <= c :
    0x11A8 <= c :
    0x1200 <= c :
    c <= 0x125D ?
    c <= 0x1256 ?
    c <= 0x124D ?
    0x124A <= c :
    0x1250 <= c :
    c <= 0x1258 ?
    0x1258 <= c :
    0x125A <= c :
    c <= 0x128D ?
    c <= 0x1288 ?
    0x1260 <= c :
    0x128A <= c :
    0x1290 <= c :
    c <= 0x30FF ?
    c <= 0x1FB4 ?
    c <= 0x180D ?
    c <= 0x16EA ?
    c <= 0x135A ?
    c <= 0x12C5 ?
    c <= 0x12BE ?
    c <= 0x12B5 ?
    0x12B2 <= c :
    0x12B8 <= c :
    c <= 0x12C0 ?
    0x12C0 <= c :
    0x12C2 <= c :
    c <= 0x1310 ?
    c <= 0x12D6 ?
    0x12C8 <= c :
    0x12D8 <= c :
    c <= 0x1315 ?
    0x1312 <= c :
    0x1318 <= c :
    c <= 0x166C ?
    c <= 0x138F ?
    c <= 0x135F ?
    0x135F <= c :
    0x1380 <= c :
    c <= 0x13F4 ?
    0x13A0 <= c :
    0x1401 <= c :
    c <= 0x169A ?
    c <= 0x1676 ?
    0x166F <= c :
    0x1681 <= c :
    0x16A0 <= c :
    c <= 0x1770 ?
    c <= 0x1734 ?
    c <= 0x170C ?
    c <= 0x16F0 ?
    0x16EE <= c :
    0x1700 <= c :
    c <= 0x1714 ?
    0x170E <= c :
    0x1720 <= c :
    c <= 0x176C ?
    c <= 0x1753 ?
    0x1740 <= c :
    0x1760 <= c :
    0x176E <= c :
    c <= 0x17D7 ?
    c <= 0x17B3 ?
    c <= 0x1773 ?
    0x1772 <= c :
    0x1780 <= c :
    c <= 0x17D3 ?
    0x17B6 <= c :
    0x17D7 <= c :
    c <= 0x17E9 ?
    c <= 0x17DD ?
    0x17DC <= c :
    0x17E0 <= c :
    0x180B <= c :
    c <= 0x1B59 ?
    c <= 0x196D ?
    c <= 0x191C ?
    c <= 0x1877 ?
    c <= 0x1819 ?
    0x1810 <= c :
    0x1820 <= c :
    c <= 0x18A9 ?
    0x1880 <= c :
    0x1900 <= c :
    c <= 0x193B ?
    c <= 0x192B ?
    0x1920 <= c :
    0x1930 <= c :
    0x1946 <= c :
    c <= 0x19D9 ?
    c <= 0x19A9 ?
    c <= 0x1974 ?
    0x1970 <= c :
    0x1980 <= c :
    c <= 0x19C9 ?
    0x19B0 <= c :
    0x19D0 <= c :
    c <= 0x1B4B ?
    c <= 0x1A1B ?
    0x1A00 <= c :
    0x1B00 <= c :
    0x1B50 <= c :
    c <= 0x1F45 ?
    c <= 0x1EF9 ?
    c <= 0x1DCA ?
    c <= 0x1B73 ?
    0x1B6B <= c :
    0x1D00 <= c :
    c <= 0x1E9B ?
    0x1DFE <= c :
    0x1EA0 <= c :
    c <= 0x1F1D ?
    c <= 0x1F15 ?
    0x1F00 <= c :
    0x1F18 <= c :
    0x1F20 <= c :
    c <= 0x1F5B ?
    c <= 0x1F57 ?
    c <= 0x1F4D ?
    0x1F48 <= c :
    0x1F50 <= c :
    c <= 0x1F59 ?
    0x1F59 <= c :
    0x1F5B <= c :
    c <= 0x1F7D ?
    c <= 0x1F5D ?
    0x1F5D <= c :
    0x1F5F <= c :
    0x1F80 <= c :
    c <= 0x2149 ?
    c <= 0x20DC ?
    c <= 0x1FF4 ?
    c <= 0x1FCC ?
    c <= 0x1FBE ?
    c <= 0x1FBC ?
    0x1FB6 <= c :
    0x1FBE <= c :
    c <= 0x1FC4 ?
    0x1FC2 <= c :
    0x1FC6 <= c :
    c <= 0x1FDB ?
    c <= 0x1FD3 ?
    0x1FD0 <= c :
    0x1FD6 <= c :
    c <= 0x1FEC ?
    0x1FE0 <= c :
    0x1FF2 <= c :
    c <= 0x2071 ?
    c <= 0x2040 ?
    c <= 0x1FFC ?
    0x1FF6 <= c :
    0x203F <= c :
    c <= 0x2054 ?
    0x2054 <= c :
    0x2071 <= c :
    c <= 0x2094 ?
    c <= 0x207F ?
    0x207F <= c :
    0x2090 <= c :
    0x20D0 <= c :
    c <= 0x211D ?
    c <= 0x2107 ?
    c <= 0x20EF ?
    c <= 0x20E1 ?
    0x20E1 <= c :
    0x20E5 <= c :
    c <= 0x2102 ?
    0x2102 <= c :
    0x2107 <= c :
    c <= 0x2115 ?
    c <= 0x2113 ?
    0x210A <= c :
    0x2115 <= c :
    0x2119 <= c :
    c <= 0x212D ?
    c <= 0x2126 ?
    c <= 0x2124 ?
    0x2124 <= c :
    0x2126 <= c :
    c <= 0x2128 ?
    0x2128 <= c :
    0x212A <= c :
    c <= 0x213F ?
    c <= 0x2139 ?
    0x212F <= c :
    0x213C <= c :
    0x2145 <= c :
    c <= 0x2DB6 ?
    c <= 0x2CE4 ?
    c <= 0x2C5E ?
    c <= 0x2184 ?
    c <= 0x214E ?
    0x214E <= c :
    0x2160 <= c :
    c <= 0x2C2E ?
    0x2C00 <= c :
    0x2C30 <= c :
    c <= 0x2C77 ?
    c <= 0x2C6C ?
    0x2C60 <= c :
    0x2C74 <= c :
    0x2C80 <= c :
    c <= 0x2D96 ?
    c <= 0x2D65 ?
    c <= 0x2D25 ?
    0x2D00 <= c :
    0x2D30 <= c :
    c <= 0x2D6F ?
    0x2D6F <= c :
    0x2D80 <= c :
    c <= 0x2DAE ?
    c <= 0x2DA6 ?
    0x2DA0 <= c :
    0x2DA8 <= c :
    0x2DB0 <= c :
    c <= 0x302F ?
    c <= 0x2DD6 ?
    c <= 0x2DC6 ?
    c <= 0x2DBE ?
    0x2DB8 <= c :
    0x2DC0 <= c :
    c <= 0x2DCE ?
    0x2DC8 <= c :
    0x2DD0 <= c :
    c <= 0x3007 ?
    c <= 0x2DDE ?
    0x2DD8 <= c :
    0x3005 <= c :
    0x3021 <= c :
    c <= 0x309A ?
    c <= 0x303C ?
    c <= 0x3035 ?
    0x3031 <= c :
    0x3038 <= c :
    c <= 0x3096 ?
    0x3041 <= c :
    0x3099 <= c :
    c <= 0x30FA ?
    c <= 0x309F ?
    0x309D <= c :
    0x30A1 <= c :
    0x30FC <= c :
    c <= 0x1049D ?
    c <= 0xFE23 ?
    c <= 0xFB06 ?
    c <= 0xA71A ?
    c <= 0x31FF ?
    c <= 0x318E ?
    c <= 0x312C ?
    0x3105 <= c :
    0x3131 <= c :
    c <= 0x31B7 ?
    0x31A0 <= c :
    0x31F0 <= c :
    c <= 0x9FBB ?
    c <= 0x4DB5 ?
    0x3400 <= c :
    0x4E00 <= c :
    c <= 0xA48C ?
    0xA000 <= c :
    0xA717 <= c :
    c <= 0xFA2D ?
    c <= 0xA873 ?
    c <= 0xA827 ?
    0xA800 <= c :
    0xA840 <= c :
    c <= 0xD7A3 ?
    0xAC00 <= c :
    0xF900 <= c :
    c <= 0xFAD9 ?
    c <= 0xFA6A ?
    0xFA30 <= c :
    0xFA70 <= c :
    0xFB00 <= c :
    c <= 0xFB44 ?
    c <= 0xFB3C ?
    c <= 0xFB28 ?
    c <= 0xFB17 ?
    0xFB13 <= c :
    0xFB1D <= c :
    c <= 0xFB36 ?
    0xFB2A <= c :
    0xFB38 <= c :
    c <= 0xFB41 ?
    c <= 0xFB3E ?
    0xFB3E <= c :
    0xFB40 <= c :
    0xFB43 <= c :
    c <= 0xFDC7 ?
    c <= 0xFD3D ?
    c <= 0xFBB1 ?
    0xFB46 <= c :
    0xFBD3 <= c :
    c <= 0xFD8F ?
    0xFD50 <= c :
    0xFD92 <= c :
    c <= 0xFE0F ?
    c <= 0xFDFB ?
    0xFDF0 <= c :
    0xFE00 <= c :
    0xFE20 <= c :
    c <= 0x1000B ?
    c <= 0xFF3F ?
    c <= 0xFEFC ?
    c <= 0xFE4F ?
    c <= 0xFE34 ?
    0xFE33 <= c :
    0xFE4D <= c :
    c <= 0xFE74 ?
    0xFE70 <= c :
    0xFE76 <= c :
    c <= 0xFF3A ?
    c <= 0xFF19 ?
    0xFF10 <= c :
    0xFF21 <= c :
    0xFF3F <= c :
    c <= 0xFFCF ?
    c <= 0xFFBE ?
    c <= 0xFF5A ?
    0xFF41 <= c :
    0xFF66 <= c :
    c <= 0xFFC7 ?
    0xFFC2 <= c :
    0xFFCA <= c :
    c <= 0xFFDC ?
    c <= 0xFFD7 ?
    0xFFD2 <= c :
    0xFFDA <= c :
    0x10000 <= c :
    c <= 0x10174 ?
    c <= 0x1004D ?
    c <= 0x1003A ?
    c <= 0x10026 ?
    0x1000D <= c :
    0x10028 <= c :
    c <= 0x1003D ?
    0x1003C <= c :
    0x1003F <= c :
    c <= 0x100FA ?
    c <= 0x1005D ?
    0x10050 <= c :
    0x10080 <= c :
    0x10140 <= c :
    c <= 0x103C3 ?
    c <= 0x1034A ?
    c <= 0x1031E ?
    0x10300 <= c :
    0x10330 <= c :
    c <= 0x1039D ?
    0x10380 <= c :
    0x103A0 <= c :
    c <= 0x103D5 ?
    c <= 0x103CF ?
    0x103C8 <= c :
    0x103D1 <= c :
    0x10400 <= c :
    c <= 0x1D4AC ?
    c <= 0x10A3F ?
    c <= 0x10915 ?
    c <= 0x10835 ?
    c <= 0x10805 ?
    c <= 0x104A9 ?
    0x104A0 <= c :
    0x10800 <= c :
    c <= 0x10808 ?
    0x10808 <= c :
    0x1080A <= c :
    c <= 0x1083C ?
    c <= 0x10838 ?
    0x10837 <= c :
    0x1083C <= c :
    c <= 0x1083F ?
    0x1083F <= c :
    0x10900 <= c :
    c <= 0x10A17 ?
    c <= 0x10A06 ?
    c <= 0x10A03 ?
    0x10A00 <= c :
    0x10A05 <= c :
    c <= 0x10A13 ?
    0x10A0C <= c :
    0x10A15 <= c :
    c <= 0x10A3A ?
    c <= 0x10A33 ?
    0x10A19 <= c :
    0x10A38 <= c :
    0x10A3F <= c :
    c <= 0x1D1AD ?
    c <= 0x1D172 ?
    c <= 0x12462 ?
    c <= 0x1236E ?
    0x12000 <= c :
    0x12400 <= c :
    c <= 0x1D169 ?
    0x1D165 <= c :
    0x1D16D <= c :
    c <= 0x1D18B ?
    c <= 0x1D182 ?
    0x1D17B <= c :
    0x1D185 <= c :
    0x1D1AA <= c :
    c <= 0x1D49F ?
    c <= 0x1D454 ?
    c <= 0x1D244 ?
    0x1D242 <= c :
    0x1D400 <= c :
    c <= 0x1D49C ?
    0x1D456 <= c :
    0x1D49E <= c :
    c <= 0x1D4A6 ?
    c <= 0x1D4A2 ?
    0x1D4A2 <= c :
    0x1D4A5 <= c :
    0x1D4A9 <= c :
    c <= 0x1D6C0 ?
    c <= 0x1D51C ?
    c <= 0x1D505 ?
    c <= 0x1D4BB ?
    c <= 0x1D4B9 ?
    0x1D4AE <= c :
    0x1D4BB <= c :
    c <= 0x1D4C3 ?
    0x1D4BD <= c :
    0x1D4C5 <= c :
    c <= 0x1D514 ?
    c <= 0x1D50A ?
    0x1D507 <= c :
    0x1D50D <= c :
    0x1D516 <= c :
    c <= 0x1D546 ?
    c <= 0x1D53E ?
    c <= 0x1D539 ?
    0x1D51E <= c :
    0x1D53B <= c :
    c <= 0x1D544 ?
    0x1D540 <= c :
    0x1D546 <= c :
    c <= 0x1D6A5 ?
    c <= 0x1D550 ?
    0x1D54A <= c :
    0x1D552 <= c :
    0x1D6A8 <= c :
    c <= 0x1D788 ?
    c <= 0x1D734 ?
    c <= 0x1D6FA ?
    c <= 0x1D6DA ?
    0x1D6C2 <= c :
    0x1D6DC <= c :
    c <= 0x1D714 ?
    0x1D6FC <= c :
    0x1D716 <= c :
    c <= 0x1D76E ?
    c <= 0x1D74E ?
    0x1D736 <= c :
    0x1D750 <= c :
    0x1D770 <= c :
    c <= 0x1D7FF ?
    c <= 0x1D7C2 ?
    c <= 0x1D7A8 ?
    0x1D78A <= c :
    0x1D7AA <= c :
    c <= 0x1D7CB ?
    0x1D7C4 <= c :
    0x1D7CE <= c :
    c <= 0x2FA1D ?
    c <= 0x2A6D6 ?
    0x20000 <= c :
    0x2F800 <= c :
    0xE0100 <= c && c <= 0xE01EF;
    // #/generated#
}


            return {
                isDigit: isDigit, isIdentifierStart: isIdentifierStart, isHexDigit: isHexDigit, isAlpha: isAlpha, isSpace: isSpace, isLineTerminator: isLineTerminator, isFormatChar: isFormatChar, isIdentifierPart: isIdentifierPart
            };
        }();
    }
}.call(null) ) {
    this.Concurrent.Thread.Compiler.isDigit = isDigit;
    this.Concurrent.Thread.Compiler.isIdentifierStart = isIdentifierStart;
    this.Concurrent.Thread.Compiler.isHexDigit = isHexDigit;
    this.Concurrent.Thread.Compiler.isAlpha = isAlpha;
    this.Concurrent.Thread.Compiler.isSpace = isSpace;
    this.Concurrent.Thread.Compiler.isLineTerminator = isLineTerminator;
    this.Concurrent.Thread.Compiler.isFormatChar = isFormatChar;
    this.Concurrent.Thread.Compiler.isIdentifierPart = isIdentifierPart;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Iterator || (typeof this.Data.Iterator != 'object' && typeof this.Data.Iterator != 'function') ) this.Data.Iterator = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( this.Concurrent.Thread.Compiler.IdentifierSet === undefined ) this.Concurrent.Thread.Compiler.IdentifierSet = undefined;
with ( function(){
with ( Data.Error ) {
with ( Data.Iterator ) {
with ( Data.Functional ) {
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


NAMESPACE = 'Concurrent.Thread.Compiler';













var MIN_INT = Math.pow(-2, 53);


function IdentifierSet ( ) {
    this._set      = {};
    this._state_no = MIN_INT;
}

var proto = IdentifierSet.prototype = new Set();
proto.constructor = IdentifierSet;


var hasOwnProperty = Object.prototype.hasOwnProperty;

proto.contains = function ( /* variable arguments */ ) {
    for ( var i=0;  i < arguments.length;  i++ ) {
        var id = arguments[i];
        if ( !(id instanceof Identifier) ) throw new TypeError("arguments[" + i + "] is not of type Identifier");
        // Because "hasOwnProperty" itself can be used as identifier,
        // we need to avoid "this._set.hasOwnProperty".
        if ( !hasOwnProperty.call(this._set, id.valueOf()) ) return false;
    }
    return true;
};


proto.add = function ( /* variable arguments */ ) {
    var changed = false;
    for ( var i=0;  i < arguments.length;  i++ ) {
        var id = arguments[i];
        if ( !(id instanceof Identifier) ) throw new TypeError("arguments[" + i + "] is not of type Identifier");
        var p = id.valueOf();
        if ( this._set[p] !== id ) {
            this._set[p] = id;
            this._state_no++;
            changed = true;
        }
    }
    return changed;
};


proto.remove = function ( /* variable arguments */ ) {
    var changed = false;
    for ( var i=0;  i < arguments.length;  i++ ) {
        var id = arguments[i];
        if ( !(id instanceof Identifier) ) throw new TypeError("argument is not of type Identifier");
        var p = id.valueOf();
        if ( hasOwnProperty.call(this._set, p) ) {
            delete this._set[p];
            this._state_no++;
            changed = true;
        }
    }
    return changed;
};


proto.toArray = function ( ) {
    var arr = [];
    for ( var i in this._set ) {
        if ( hasOwnProperty.call(this._set, i) ) arr.push(this._set[i]);
    }
    return arr;
};


proto.iterator = function ( ) {
    return new IdIterator(this, this.toArray(), 0);
};



function IdIterator ( parent, elems, index ) {
    this._parent = parent;
    this._elems  = elems;
    this._index  = index;
    this._state_no = parent._state_no;
}

var proto = IdIterator.prototype = new Iterator();
proto.constructor = IdIterator;

proto.isBoundTo = function ( o ) {
    return this._parent === o;
};

proto.isTail = function ( ) {
    if ( this._state_no !== this._parent._state_no ) throw new IllegalStateError("parent IdentifierSet object's state has been changed");
    return this._index >= this._elems.length;
};

proto.next = function ( ) {
    if ( this._state_no !== this._parent._state_no ) throw new IllegalStateError("parent IdentifierSet object's state has been changed");
    if ( this.isTail() ) throw new NoSuchElementError("no more element after the tail");
    return new IdIterator(this._parent, this._elems, this._index+1);
};

proto.value = function ( ) {
    if ( this._state_no !== this._parent._state_no ) throw new IllegalStateError("parent IdentifierSet object's state has been changed");
    return this._elems[this._index];
};

            return {
                IdentifierSet: IdentifierSet
            };
        }();
    }
}
}
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.IdentifierSet = IdentifierSet;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( this.Concurrent.Thread.Compiler.ErrorReporter === undefined ) this.Concurrent.Thread.Compiler.ErrorReporter = undefined;
with ( function(){
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Rhino code, released
 * May 6, 1999.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1997-1999
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Norris Boyd
 *   Daisuke Maki
 *
 * Alternatively, the contents of this file may be used under the terms of
 * the GNU General Public License Version 2 or later (the "GPL"), in which
 * case the provisions of the GPL are applicable instead of those above. If
 * you wish to allow use of your version of this file only under the terms of
 * the GPL and not to allow others to use your version of this file under the
 * MPL, indicate your decision by deleting the provisions above and replacing
 * them with the notice and other provisions required by the GPL. If you do
 * not delete the provisions above, a recipient may use your version of this
 * file under either the MPL or the GPL.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * This file is based on the file ErrorReporter.java in Rhino 1.6R5.
 */

// API class


NAMESPACE = 'Concurrent.Thread.Compiler';



/**
 * This is interface defines a protocol for the reporting of
 * errors during JavaScript translation or execution.
 *
 * @author Norris Boyd
 */


function ErrorReporter ( ) {
    // This is kind of abstract class.
    // It provides null-implementations for the methods as default.
}

var proto = ErrorReporter.prototype;


/**
 * Report a warning.
 *
 * The implementing class may choose to ignore the warning
 * if it desires.
 *
 * @param message a String describing the warning
 * @param line the line number associated with the warning
 * @param lineSource the text of the line (may be null)
 * @param lineOffset the offset into lineSource where problem was detected
 */
proto.warning = function ( message, line, lineSource, lineOffset ) { };


/**
 * Report an error.
 *
 * The implementing class is free to throw an exception if
 * it desires.
 *
 * If execution has not yet begun, the JavaScript engine is
 * free to find additional errors rather than terminating
 * the translation. It will not execute a script that had
 * errors, however.
 *
 * @param message a String describing the error
 * @param line the line number associated with the error
 * @param lineSource the text of the line (may be null)
 * @param lineOffset the offset into lineSource where problem was detected
 */
proto.error   = function ( message, line, lineSource, lineOffset ) { };


            return {
                ErrorReporter: ErrorReporter
            };
        }();
    }
}.call(null) ) {
    this.Concurrent.Thread.Compiler.ErrorReporter = ErrorReporter;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( this.Concurrent.Thread.Mutex === undefined ) this.Concurrent.Thread.Mutex = undefined;
with ( function(){
with ( Data ) {
with ( Data.Error ) {
with ( Concurrent ) {
with ( Concurrent.Thread ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2008
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Concurrent.Thread';














function Mutex ( ) {
    this._acquiring = null;
    this._waiting   = new LinkedList();
}

var proto = Mutex.prototype;


proto.isAcquirable = function ( ) {
    return !this._acquiring  &&  this._waiting.isEmpty();
};


proto.acquire = function ( ) {
    throw new Error("can't `acquire' in non-converted function");
};

proto.acquire.$Concurrent_Thread_compiled = function ( $this, $args, $cont ) {
    if ( $this.isAcquirable() ) {
        $this._acquiring = Thread.self();
        return {
            continuation: $cont ,
            ret_val     : void 0,
            timeout     : void 0
        };
    } else {
        $this._waiting.push(Thread.self());
        var callee = arguments.callee;
        return {
            continuation: {
                procedure: null,
                this_val : null,
                exception: {
                    procedure: function( e ){
                        if ( e === releasedException ) {
                            if ( $this._waiting.shift() !== Thread.self() ) {
                                return {
                                    continuation: $cont.exception,
                                    ret_val     : new IllegalStateError("unknown state (maybe bug)"),
                                    timeout     : void 0
                                };
                            }
                            $this._acquiring = Thread.self();
                            return {
                                continuation: $cont,
                                ret_val     : void 0,
                                timeout     : void 0
                            };
                        } else {
                            $this._waiting.head().find(function( it ){
                                return it === Thread.self();
                            }).remove();
                            return {
                                continuation: $cont.exception,
                                ret_val     : e,
                                timeout     : void 0
                            };
                        }
                    },
                    this_val : null,
                    exception: $cont.exception
                }
            },
            ret_val: void 0,
            timeout: -1
        };
    }
};


proto.release = function ( ) {
    if ( !this._acquiring ) {
        throw new IllegalStateError("mutex is not locked");
    }
    if ( this._acquiring !== Thread.self() ) {
        throw new IllegalStateError("mutex can be released only by the thread locking it");
    }
    this._acquiring = null;
    if ( !this._waiting.isEmpty() ) {
        this._waiting.head().value().notify(releasedException);
    }
};


var releasedException = {};

            return {
                Mutex: Mutex
            };
        }();
    }
}
}
}
}.call(null) ) {
    this.Concurrent.Thread.Mutex = Mutex;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Concurrent.Thread.Compiler.Kit || (typeof this.Concurrent.Thread.Compiler.Kit != 'object' && typeof this.Concurrent.Thread.Compiler.Kit != 'function') ) this.Concurrent.Thread.Compiler.Kit = new Object();
    if ( this.Concurrent.Thread.Compiler.Kit.printTrees === undefined ) this.Concurrent.Thread.Compiler.Kit.printTrees = undefined;
    if ( this.Concurrent.Thread.Compiler.Kit.codeBug === undefined ) this.Concurrent.Thread.Compiler.Kit.codeBug = undefined;
with ( function(){
with ( Concurrent.Thread.Compiler.Kit ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Rhino code, released
 * May 6, 1999.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1997-1999
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Igor Bukanov, igor@fastmail.fm
 *   Daisuke Maki
 *
 * Alternatively, the contents of this file may be used under the terms of
 * the GNU General Public License Version 2 or later (the "GPL"), in which
 * case the provisions of the GPL are applicable instead of those above. If
 * you wish to allow use of your version of this file only under the terms of
 * the GPL and not to allow others to use your version of this file under the
 * MPL, indicate your decision by deleting the provisions above and replacing
 * them with the notice and other provisions required by the GPL. If you do
 * not delete the provisions above, a recipient may use your version of this
 * file under either the MPL or the GPL.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * This file is based on the file Kit.java in Rhino 1.6R5.
 */




NAMESPACE = 'Concurrent.Thread.Compiler.Kit';








var printTrees = false;  // debug flag



function codeBug ( /* variable arguments */ ) {
    var str = "";
    for ( var i=0;  i < arguments.length;  i++ ) str += arguments[i];
    var e = new Data.Error.IllegalStateError("FAILED ASSERTION: " + str);
    var s = e.toString();
    if ( e.stack ) s += "\n----------\n" + e.stack;
    alert(s);
    throw e;
}


            return {
                printTrees: printTrees, codeBug: codeBug
            };
        }();
    }
}.call(null) ) {
    this.Concurrent.Thread.Compiler.Kit.printTrees = printTrees;
    this.Concurrent.Thread.Compiler.Kit.codeBug = codeBug;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Continuation || (typeof this.Concurrent.Thread.Continuation != 'object' && typeof this.Concurrent.Thread.Continuation != 'function') ) this.Concurrent.Thread.Continuation = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( this.Concurrent.Thread.Continuation.callcc === undefined ) this.Concurrent.Thread.Continuation.callcc = undefined;
    if ( this.Concurrent.Thread.Continuation.getCC === undefined ) this.Concurrent.Thread.Continuation.getCC = undefined;
    if ( this.Concurrent.Thread.Continuation.currentContinuation === undefined ) this.Concurrent.Thread.Continuation.currentContinuation = undefined;
    if ( this.Concurrent.Thread.Continuation.ContinuationCalledException === undefined ) this.Concurrent.Thread.Continuation.ContinuationCalledException = undefined;
with ( function(){
with ( Data.Error ) {
with ( Concurrent.Thread.Continuation ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2008
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Concurrent.Thread.Continuation';










function callcc ( ) {
    throw new Error("can't call `" + NAMESPACE + ".callcc' in non-threaded functions");
}

callcc.$Concurrent_Thread_compiled = function ( $this, $args, $cont ) {
    function continuation ( ) {
        throw new Error("can't call any captured continuation in non-threaded functions");
    }
    continuation.$Concurrent_Thread_compiled = function ( $this, $args, _ ) {
        return { continuation: $cont ,
                 timeout     : void 0,
                 ret_val     : $args[0] };
    };
    var f = $args[0];
    return f && typeof f.$Concurrent_Thread_compiled === "function"
             ?  f.$Concurrent_Thread_compiled(null, [continuation], $cont)
             :  {continuation:$cont, ret_val:f(continuation), timeout:void 0};
};



function getCC ( ) {
    throw new Error("can't call `" + NAMESPACE + ".getCC' in non-threaded functions");
}

getCC.$Concurrent_Thread_compiled = function ( $this, $args, $cont ) {
    function continuation ( ) {
        throw new Error("can't call any captured continuation in non-threaded functions");
    }
    continuation.$Concurrent_Thread_compiled = function ( $this, $args, _ ) {
        return { continuation: $cont ,
                 timeout     : void 0,
                 ret_val     : $args[0] };
    };
    return {continuation:$cont, ret_val:continuation, timeout:void 0};
};



function currentContinuation ( ) {
    throw new Error("can't call `" + NAMESPACE + ".currentContinuation' in non-threaded functions");
}

currentContinuation.$Concurrent_Thread_compiled = function ( $this, $args, $cont ) {
    function continuation ( ) {
        throw new Error("can't call any captured continuation in non-threaded functions");
    }
    continuation.$Concurrent_Thread_compiled = function ( $this, $args, _ ) {
        return { continuation: $cont.exception,
                 timeout     : void 0          ,
                 ret_val     : new ContinuationCalledException($args) };
    };
    return { continuation: $cont ,
             timeout     : void 0,
             ret_val     : continuation };
};



var ContinuationCalledException = Exception.extend(
    function ( $super, args ) {
        $super("continuation called");
        this.args = args;
    },
    { name: NAMESPACE + ".ContinuationCalledException" }
);

            return {
                ContinuationCalledException: ContinuationCalledException, callcc: callcc, getCC: getCC, currentContinuation: currentContinuation
            };
        }();
    }
}
}.call(null) ) {
    this.Concurrent.Thread.Continuation.ContinuationCalledException = ContinuationCalledException;
    this.Concurrent.Thread.Continuation.callcc = callcc;
    this.Concurrent.Thread.Continuation.getCC = getCC;
    this.Concurrent.Thread.Continuation.currentContinuation = currentContinuation;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( this.Concurrent.Thread.Compiler.Token === undefined ) this.Concurrent.Thread.Compiler.Token = undefined;
with ( function(){
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Rhino code, released
 * May 6, 1999.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1997-1999
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Roger Lawrence
 *   Mike McCabe
 *   Igor Bukanov
 *   Milen Nankov
 *   Daisuke Maki
 *
 * Alternatively, the contents of this file may be used under the terms of
 * the GNU General Public License Version 2 or later (the "GPL"), in which
 * case the provisions of the GPL are applicable instead of those above. If
 * you wish to allow use of your version of this file only under the terms of
 * the GPL and not to allow others to use your version of this file under the
 * MPL, indicate your decision by deleting the provisions above and replacing
 * them with the notice and other provisions required by the GPL. If you do
 * not delete the provisions above, a recipient may use your version of this
 * file under either the MPL or the GPL.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * This file is based on the file Token.java in Rhino 1.6R5.
 */





NAMESPACE = 'Concurrent.Thread.Compiler';







var Token = {};

// Although Token is in fact a namespace, we here implements it
// "manually" because of efficiency.


// start enum
Token.ERROR          = -1; // well-known as the only code < EOF
Token.EOF            = 0;  // end of file token - (not EOF_CHAR)
Token.EOL            = 1;  // end of line

// Interpreter reuses the following as bytecodes
Token.FIRST_BYTECODE_TOKEN    = 2;

Token.ENTERWITH      = 2;
Token.LEAVEWITH      = 3;
Token.RETURN         = 4;
Token.GOTO           = 5;
Token.IFEQ           = 6;
Token.IFNE           = 7;
Token.SETNAME        = 8;
Token.BITOR          = 9;
Token.BITXOR         = 10;
Token.BITAND         = 11;
Token.EQ             = 12;
Token.NE             = 13;
Token.LT             = 14;
Token.LE             = 15;
Token.GT             = 16;
Token.GE             = 17;
Token.LSH            = 18;
Token.RSH            = 19;
Token.URSH           = 20;
Token.ADD            = 21;
Token.SUB            = 22;
Token.MUL            = 23;
Token.DIV            = 24;
Token.MOD            = 25;
Token.NOT            = 26;
Token.BITNOT         = 27;
Token.POS            = 28;
Token.NEG            = 29;
Token.NEW            = 30;
Token.DELPROP        = 31;
Token.TYPEOF         = 32;
Token.GETPROP        = 33;
Token.SETPROP        = 34;
Token.GETELEM        = 35;
Token.SETELEM        = 36;
Token.CALL           = 37;
Token.NAME           = 38;
Token.NUMBER         = 39;
Token.STRING         = 40;
Token.NULL           = 41;
Token.THIS           = 42;
Token.FALSE          = 43;
Token.TRUE           = 44;
Token.SHEQ           = 45;   // shallow equality (===)
Token.SHNE           = 46;   // shallow inequality (!==)
Token.REGEXP         = 47;
Token.BINDNAME       = 48;
Token.THROW          = 49;
Token.RETHROW        = 50; // rethrow caught execetion: catch (e if ) use it
Token.IN             = 51;
Token.INSTANCEOF     = 52;
Token.LOCAL_LOAD     = 53;
Token.GETVAR         = 54;
Token.SETVAR         = 55;
Token.CATCH_SCOPE    = 56;
Token.ENUM_INIT_KEYS = 57;
Token.ENUM_INIT_VALUES = 58;
Token.ENUM_NEXT      = 59;
Token.ENUM_ID        = 60;
Token.THISFN         = 61;
Token.RETURN_RESULT  = 62; // to return prevoisly stored return result
Token.ARRAYLIT       = 63; // array literal
Token.OBJECTLIT      = 64; // object literal
Token.GET_REF        = 65; // *reference
Token.SET_REF        = 66; // *reference    : something
Token.DEL_REF        = 67; // delete reference
Token.REF_CALL       = 68; // f(args)    = something or f(args)++
Token.REF_SPECIAL    = 69; // reference for special properties like __proto

// For XML support:
Token.DEFAULTNAMESPACE = 70; // default xml namespace =
Token.ESCXMLATTR     = 71;
Token.ESCXMLTEXT     = 72;
Token.REF_MEMBER     = 73; // Reference for x.@y, x..y etc.
Token.REF_NS_MEMBER  = 74; // Reference for x.ns::y, x..ns::y etc.
Token.REF_NAME       = 75; // Reference for @y, @[y] etc.
Token.REF_NS_NAME    = 76; // Reference for ns::y, @ns::y@[y] etc.

// End of interpreter bytecodes

Token.LAST_BYTECODE_TOKEN = Token.REF_NS_NAME;

Token.TRY            = 77;
Token.SEMI           = 78;  // semicolon
Token.LB             = 79;  // left and right brackets
Token.RB             = 80;
Token.LC             = 81;  // left and right curlies (braces)
Token.RC             = 82;
Token.LP             = 83;  // left and right parentheses
Token.RP             = 84;
Token.COMMA          = 85;  // comma operator

Token.ASSIGN         = 86;  // simple assignment  (=)
Token.ASSIGN_BITOR   = 87;  // |=
Token.ASSIGN_BITXOR  = 88;  // ^=
Token.ASSIGN_BITAND  = 89;  // |=
Token.ASSIGN_LSH     = 90;  // <<=
Token.ASSIGN_RSH     = 91;  // >>=
Token.ASSIGN_URSH    = 92;  // >>>=
Token.ASSIGN_ADD     = 93;  // +=
Token.ASSIGN_SUB     = 94;  // -=
Token.ASSIGN_MUL     = 95;  // *=
Token.ASSIGN_DIV     = 96;  // /=
Token.ASSIGN_MOD     = 97;  // %=

Token.FIRST_ASSIGN   = Token.ASSIGN;
Token.LAST_ASSIGN    = Token.ASSIGN_MOD;

Token.HOOK           = 98; // conditional (?:)
Token.COLON          = 99;
Token.OR             = 100; // logical or (||)
Token.AND            = 101; // logical and (&&)
Token.INC            = 102; // increment/decrement (++ --)
Token.DEC            = 103;
Token.DOT            = 104; // member operator (.)
Token.FUNCTION       = 105; // function keyword
Token.EXPORT         = 106; // export keyword
Token.IMPORT         = 107; // import keyword
Token.IF             = 108; // if keyword
Token.ELSE           = 109; // else keyword
Token.SWITCH         = 110; // switch keyword
Token.CASE           = 111; // case keyword
Token.DEFAULT        = 112; // default keyword
Token.WHILE          = 113; // while keyword
Token.DO             = 114; // do keyword
Token.FOR            = 115; // for keyword
Token.BREAK          = 116; // break keyword
Token.CONTINUE       = 117; // continue keyword
Token.VAR            = 118; // var keyword
Token.WITH           = 119; // with keyword
Token.CATCH          = 120; // catch keyword
Token.FINALLY        = 121; // finally keyword
Token.VOID           = 122; // void keyword
Token.RESERVED       = 123; // reserved keywords

Token.EMPTY          = 124;

/* types used for the parse tree - these never get returned
 * by the scanner.
 */

Token.BLOCK          = 125; // statement block
Token.LABEL          = 126; // label
Token.TARGET         = 127;
Token.LOOP           = 128;
Token.EXPR_VOID      = 129; // expression statement in functions
Token.EXPR_RESULT    = 130; // expression statement in scripts
Token.JSR            = 131;
Token.SCRIPT         = 132; // top-level node for entire script
Token.TYPEOFNAME     = 133; // for typeof(simple-name)
Token.USE_STACK      = 134;
Token.SETPROP_OP     = 135; // x.y op= something
Token.SETELEM_OP     = 136; // x[y] op= something
Token.LOCAL_BLOCK    = 137;
Token.SET_REF_OP     = 138; // *reference op= something

// For XML support:
Token.DOTDOT         = 139;  // member operator (..)
Token.COLONCOLON     = 140;  // namespace::name
Token.XML            = 141;  // XML type
Token.DOTQUERY       = 142;  // .() -- e.g., x.emps.emp.(name == "terry")
Token.XMLATTR        = 143;  // @
Token.XMLEND         = 144;

// Optimizer-only-tokens
Token.TO_OBJECT      = 145;
Token.TO_DOUBLE      = 146;

Token.LAST_TOKEN     = 146;


Token.name = function ( token ) 
{
    if ( !Kit.printTrees ) return String(token);
    with ( Token ) {
        switch ( token ) {
          case ERROR:           return "ERROR";
          case EOF:             return "EOF";
          case EOL:             return "EOL";
          case ENTERWITH:       return "ENTERWITH";
          case LEAVEWITH:       return "LEAVEWITH";
          case RETURN:          return "RETURN";
          case GOTO:            return "GOTO";
          case IFEQ:            return "IFEQ";
          case IFNE:            return "IFNE";
          case SETNAME:         return "SETNAME";
          case BITOR:           return "BITOR";
          case BITXOR:          return "BITXOR";
          case BITAND:          return "BITAND";
          case EQ:              return "EQ";
          case NE:              return "NE";
          case LT:              return "LT";
          case LE:              return "LE";
          case GT:              return "GT";
          case GE:              return "GE";
          case LSH:             return "LSH";
          case RSH:             return "RSH";
          case URSH:            return "URSH";
          case ADD:             return "ADD";
          case SUB:             return "SUB";
          case MUL:             return "MUL";
          case DIV:             return "DIV";
          case MOD:             return "MOD";
          case NOT:             return "NOT";
          case BITNOT:          return "BITNOT";
          case POS:             return "POS";
          case NEG:             return "NEG";
          case NEW:             return "NEW";
          case DELPROP:         return "DELPROP";
          case TYPEOF:          return "TYPEOF";
          case GETPROP:         return "GETPROP";
          case SETPROP:         return "SETPROP";
          case GETELEM:         return "GETELEM";
          case SETELEM:         return "SETELEM";
          case CALL:            return "CALL";
          case NAME:            return "NAME";
          case NUMBER:          return "NUMBER";
          case STRING:          return "STRING";
          case NULL:            return "NULL";
          case THIS:            return "THIS";
          case FALSE:           return "FALSE";
          case TRUE:            return "TRUE";
          case SHEQ:            return "SHEQ";
          case SHNE:            return "SHNE";
          case REGEXP:          return "OBJECT";
          case BINDNAME:        return "BINDNAME";
          case THROW:           return "THROW";
          case RETHROW:         return "RETHROW";
          case IN:              return "IN";
          case INSTANCEOF:      return "INSTANCEOF";
          case LOCAL_LOAD:      return "LOCAL_LOAD";
          case GETVAR:          return "GETVAR";
          case SETVAR:          return "SETVAR";
          case CATCH_SCOPE:     return "CATCH_SCOPE";
          case ENUM_INIT_KEYS:  return "ENUM_INIT_KEYS";
          case ENUM_INIT_VALUES:  return "ENUM_INIT_VALUES";
          case ENUM_NEXT:       return "ENUM_NEXT";
          case ENUM_ID:         return "ENUM_ID";
          case THISFN:          return "THISFN";
          case RETURN_RESULT:   return "RETURN_RESULT";
          case ARRAYLIT:        return "ARRAYLIT";
          case OBJECTLIT:       return "OBJECTLIT";
          case GET_REF:         return "GET_REF";
          case SET_REF:         return "SET_REF";
          case DEL_REF:         return "DEL_REF";
          case REF_CALL:        return "REF_CALL";
          case REF_SPECIAL:     return "REF_SPECIAL";
          case DEFAULTNAMESPACE:return "DEFAULTNAMESPACE";
          case ESCXMLTEXT:      return "ESCXMLTEXT";
          case ESCXMLATTR:      return "ESCXMLATTR";
          case REF_MEMBER:      return "REF_MEMBER";
          case REF_NS_MEMBER:   return "REF_NS_MEMBER";
          case REF_NAME:        return "REF_NAME";
          case REF_NS_NAME:     return "REF_NS_NAME";
          case TRY:             return "TRY";
          case SEMI:            return "SEMI";
          case LB:              return "LB";
          case RB:              return "RB";
          case LC:              return "LC";
          case RC:              return "RC";
          case LP:              return "LP";
          case RP:              return "RP";
          case COMMA:           return "COMMA";
          case ASSIGN:          return "ASSIGN";
          case ASSIGN_BITOR:    return "ASSIGN_BITOR";
          case ASSIGN_BITXOR:   return "ASSIGN_BITXOR";
          case ASSIGN_BITAND:   return "ASSIGN_BITAND";
          case ASSIGN_LSH:      return "ASSIGN_LSH";
          case ASSIGN_RSH:      return "ASSIGN_RSH";
          case ASSIGN_URSH:     return "ASSIGN_URSH";
          case ASSIGN_ADD:      return "ASSIGN_ADD";
          case ASSIGN_SUB:      return "ASSIGN_SUB";
          case ASSIGN_MUL:      return "ASSIGN_MUL";
          case ASSIGN_DIV:      return "ASSIGN_DIV";
          case ASSIGN_MOD:      return "ASSIGN_MOD";
          case HOOK:            return "HOOK";
          case COLON:           return "COLON";
          case OR:              return "OR";
          case AND:             return "AND";
          case INC:             return "INC";
          case DEC:             return "DEC";
          case DOT:             return "DOT";
          case FUNCTION:        return "FUNCTION";
          case EXPORT:          return "EXPORT";
          case IMPORT:          return "IMPORT";
          case IF:              return "IF";
          case ELSE:            return "ELSE";
          case SWITCH:          return "SWITCH";
          case CASE:            return "CASE";
          case DEFAULT:         return "DEFAULT";
          case WHILE:           return "WHILE";
          case DO:              return "DO";
          case FOR:             return "FOR";
          case BREAK:           return "BREAK";
          case CONTINUE:        return "CONTINUE";
          case VAR:             return "VAR";
          case WITH:            return "WITH";
          case CATCH:           return "CATCH";
          case FINALLY:         return "FINALLY";
          case RESERVED:        return "RESERVED";
          case EMPTY:           return "EMPTY";
          case BLOCK:           return "BLOCK";
          case LABEL:           return "LABEL";
          case TARGET:          return "TARGET";
          case LOOP:            return "LOOP";
          case EXPR_VOID:       return "EXPR_VOID";
          case EXPR_RESULT:     return "EXPR_RESULT";
          case JSR:             return "JSR";
          case SCRIPT:          return "SCRIPT";
          case TYPEOFNAME:      return "TYPEOFNAME";
          case USE_STACK:       return "USE_STACK";
          case SETPROP_OP:      return "SETPROP_OP";
          case SETELEM_OP:      return "SETELEM_OP";
          case LOCAL_BLOCK:     return "LOCAL_BLOCK";
          case SET_REF_OP:      return "SET_REF_OP";
          case DOTDOT:          return "DOTDOT";
          case COLONCOLON:      return "COLONCOLON";
          case XML:             return "XML";
          case DOTQUERY:        return "DOTQUERY";
          case XMLATTR:         return "XMLATTR";
          case XMLEND:          return "XMLEND";
          case TO_OBJECT:       return "TO_OBJECT";
          case TO_DOUBLE:       return "TO_DOUBLE";
        }
    }
    // Token without name
    Kit.codeBug(token);
};

            return {
                Token: Token
            };
        }();
    }
}.call(null) ) {
    this.Concurrent.Thread.Compiler.Token = Token;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Concurrent.Thread.Compiler.Expression === undefined ) this.Concurrent.Thread.Compiler.Expression = undefined;
    if ( this.Concurrent.Thread.Compiler.UnaryExpression === undefined ) this.Concurrent.Thread.Compiler.UnaryExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.BinaryExpression === undefined ) this.Concurrent.Thread.Compiler.BinaryExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.ThisExpression === undefined ) this.Concurrent.Thread.Compiler.ThisExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.Identifier === undefined ) this.Concurrent.Thread.Compiler.Identifier = undefined;
    if ( this.Concurrent.Thread.Compiler.Literal === undefined ) this.Concurrent.Thread.Compiler.Literal = undefined;
    if ( this.Concurrent.Thread.Compiler.NumberLiteral === undefined ) this.Concurrent.Thread.Compiler.NumberLiteral = undefined;
    if ( this.Concurrent.Thread.Compiler.StringLiteral === undefined ) this.Concurrent.Thread.Compiler.StringLiteral = undefined;
    if ( this.Concurrent.Thread.Compiler.RegExpLiteral === undefined ) this.Concurrent.Thread.Compiler.RegExpLiteral = undefined;
    if ( this.Concurrent.Thread.Compiler.NullLiteral === undefined ) this.Concurrent.Thread.Compiler.NullLiteral = undefined;
    if ( this.Concurrent.Thread.Compiler.BooleanLiteral === undefined ) this.Concurrent.Thread.Compiler.BooleanLiteral = undefined;
    if ( this.Concurrent.Thread.Compiler.TrueLiteral === undefined ) this.Concurrent.Thread.Compiler.TrueLiteral = undefined;
    if ( this.Concurrent.Thread.Compiler.FalseLiteral === undefined ) this.Concurrent.Thread.Compiler.FalseLiteral = undefined;
    if ( this.Concurrent.Thread.Compiler.ArrayInitializer === undefined ) this.Concurrent.Thread.Compiler.ArrayInitializer = undefined;
    if ( this.Concurrent.Thread.Compiler.Elision === undefined ) this.Concurrent.Thread.Compiler.Elision = undefined;
    if ( this.Concurrent.Thread.Compiler.ObjectInitializer === undefined ) this.Concurrent.Thread.Compiler.ObjectInitializer = undefined;
    if ( this.Concurrent.Thread.Compiler.FunctionExpression === undefined ) this.Concurrent.Thread.Compiler.FunctionExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.DotAccessor === undefined ) this.Concurrent.Thread.Compiler.DotAccessor = undefined;
    if ( this.Concurrent.Thread.Compiler.BracketAccessor === undefined ) this.Concurrent.Thread.Compiler.BracketAccessor = undefined;
    if ( this.Concurrent.Thread.Compiler.NewExpression === undefined ) this.Concurrent.Thread.Compiler.NewExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.CallExpression === undefined ) this.Concurrent.Thread.Compiler.CallExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.PostIncExpression === undefined ) this.Concurrent.Thread.Compiler.PostIncExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.PostDecExpression === undefined ) this.Concurrent.Thread.Compiler.PostDecExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.PreIncExpression === undefined ) this.Concurrent.Thread.Compiler.PreIncExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.PreDecExpression === undefined ) this.Concurrent.Thread.Compiler.PreDecExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.DeleteExpression === undefined ) this.Concurrent.Thread.Compiler.DeleteExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.VoidExpression === undefined ) this.Concurrent.Thread.Compiler.VoidExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.TypeofExpression === undefined ) this.Concurrent.Thread.Compiler.TypeofExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.PosExpression === undefined ) this.Concurrent.Thread.Compiler.PosExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.NegExpression === undefined ) this.Concurrent.Thread.Compiler.NegExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.BitNotExpression === undefined ) this.Concurrent.Thread.Compiler.BitNotExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.NotExpression === undefined ) this.Concurrent.Thread.Compiler.NotExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.MulExpression === undefined ) this.Concurrent.Thread.Compiler.MulExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.DivExpression === undefined ) this.Concurrent.Thread.Compiler.DivExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.ModExpression === undefined ) this.Concurrent.Thread.Compiler.ModExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.AddExpression === undefined ) this.Concurrent.Thread.Compiler.AddExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.SubExpression === undefined ) this.Concurrent.Thread.Compiler.SubExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.LShiftExpression === undefined ) this.Concurrent.Thread.Compiler.LShiftExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.RShiftExpression === undefined ) this.Concurrent.Thread.Compiler.RShiftExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.URShiftExpression === undefined ) this.Concurrent.Thread.Compiler.URShiftExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.LessThanExpression === undefined ) this.Concurrent.Thread.Compiler.LessThanExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.GreaterThanExpression === undefined ) this.Concurrent.Thread.Compiler.GreaterThanExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.LessEqualExpression === undefined ) this.Concurrent.Thread.Compiler.LessEqualExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.GreaterEqualExpression === undefined ) this.Concurrent.Thread.Compiler.GreaterEqualExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.InstanceofExpression === undefined ) this.Concurrent.Thread.Compiler.InstanceofExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.InExpression === undefined ) this.Concurrent.Thread.Compiler.InExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.EqualExpression === undefined ) this.Concurrent.Thread.Compiler.EqualExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.NotEqualExpression === undefined ) this.Concurrent.Thread.Compiler.NotEqualExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.StrictEqualExpression === undefined ) this.Concurrent.Thread.Compiler.StrictEqualExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.StrictNotEqualExpression === undefined ) this.Concurrent.Thread.Compiler.StrictNotEqualExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.BitAndExpression === undefined ) this.Concurrent.Thread.Compiler.BitAndExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.BitXorExpression === undefined ) this.Concurrent.Thread.Compiler.BitXorExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.BitOrExpression === undefined ) this.Concurrent.Thread.Compiler.BitOrExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.AndExpression === undefined ) this.Concurrent.Thread.Compiler.AndExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.OrExpression === undefined ) this.Concurrent.Thread.Compiler.OrExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.ConditionalExpression === undefined ) this.Concurrent.Thread.Compiler.ConditionalExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.AssignExpression === undefined ) this.Concurrent.Thread.Compiler.AssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.SimpleAssignExpression === undefined ) this.Concurrent.Thread.Compiler.SimpleAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.MulAssignExpression === undefined ) this.Concurrent.Thread.Compiler.MulAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.DivAssignExpression === undefined ) this.Concurrent.Thread.Compiler.DivAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.ModAssignExpression === undefined ) this.Concurrent.Thread.Compiler.ModAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.AddAssignExpression === undefined ) this.Concurrent.Thread.Compiler.AddAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.SubAssignExpression === undefined ) this.Concurrent.Thread.Compiler.SubAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.LShiftAssignExpression === undefined ) this.Concurrent.Thread.Compiler.LShiftAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.RShiftAssignExpression === undefined ) this.Concurrent.Thread.Compiler.RShiftAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.URShiftAssignExpression === undefined ) this.Concurrent.Thread.Compiler.URShiftAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.BitAndAssignExpression === undefined ) this.Concurrent.Thread.Compiler.BitAndAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.BitXorAssignExpression === undefined ) this.Concurrent.Thread.Compiler.BitXorAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.BitOrAssignExpression === undefined ) this.Concurrent.Thread.Compiler.BitOrAssignExpression = undefined;
    if ( this.Concurrent.Thread.Compiler.CommaExpression === undefined ) this.Concurrent.Thread.Compiler.CommaExpression = undefined;
with ( function(){
with ( Data.Cons ) {
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


NAMESPACE = 'Concurrent.Thread.Compiler';










function Expression ( ) {
    // This is kind of abstract class.
}

var proto = Expression.prototype;

proto.toString = function ( ) {
    Kit.codeBug("Unimplemented method `toString' of class: " + this.constructor);
};

proto.containsFunctionCall = function ( ) {
    Kit.codeBug("Unimplemented method `containsFunctionCall' of class: " + this.constructor);
};

proto.hasSideEffect = function ( ) {
    Kit.codeBug("Unimplemented method `hasSideEffect' of class: " + this.constructor);
};

proto.hasLvalue = function ( ) {
    return false;
};



function UnaryExpression ( e ) {
    // This is kind of abstract class and should not be instantiated directly.
    // It just provides default implementations of methods and constructor.
    this.exp = e;  // Expression
}

var proto = UnaryExpression.prototype = new Expression();
proto.constructor = UnaryExpression;

proto.containsFunctionCall = function ( ) {
    return this.exp.containsFunctionCall();
};

proto.hasSideEffect = function ( ) {
    return this.exp.hasSideEffect();
};



function BinaryExpression ( l, r ) {
    // This is kind of abstract class and should not be instantiated directly.
    // It just provides default implementations of methods and constructor.
    this.left  = l;  // Expression
    this.right = r;  // Expression
}

var proto = BinaryExpression.prototype = new Expression();
proto.constructor = BinaryExpression;

proto.containsFunctionCall = function ( ) {
    return this.left.containsFunctionCall() || this.right.containsFunctionCall();
};

proto.hasSideEffect = function ( ) {
    return this.left.hasSideEfect() || this.right.hasSideEffect();
};



function ThisExpression ( ) {
    return THIS_EXPRESSION;  // Reuse object.
}

var proto = ThisExpression.prototype = new Expression();
proto.constructor = ThisExpression;

proto.toString = function ( ) {
    return "this";
};

proto.containsFunctionCall = function ( ) {
    return false;
};

proto.hasSideEffect = function ( ) {
    return false;
};

function temp ( ) { }
temp.prototype = ThisExpression.prototype;
var THIS_EXPRESSION = new temp();



function Identifier ( s ) {
    this.string = String(s);
    this.value  = eval('"' + this.string + '"');
}

var proto = Identifier.prototype = new Expression();
proto.constructor = Identifier;

proto.toString = function ( ) {
    return this.string;
};

proto.valueOf = function ( ) {
    return this.value;
};

proto.hasLvalue = function ( ) {
    return true;
};

proto.containsFunctionCall = function ( ) {
    return false;
};

proto.hasSideEffect = function ( ) {
    return false;
};



function Literal ( s ) {
    this.string = String(s);
    this.value  = eval(this.string);
}

var proto = Literal.prototype = new Expression();
proto.constructor = Literal;

proto.toString = function ( ) {
    return this.string;
};

proto.valueOf = function ( ) {
    return this.value;
};

proto.containsFunctionCall = function ( ) {
    return false;
};

proto.hasSideEffect = function ( ) {
    return false;
};



function NumberLiteral ( s ) {
    Literal.apply(this, arguments);
}

var proto = NumberLiteral.prototype = new Literal();
proto.constructor = NumberLiteral;



function StringLiteral ( s ) {
    Literal.apply(this, arguments);
}

var proto = StringLiteral.prototype = new Literal();
proto.constructor = StringLiteral;



function RegExpLiteral ( s ) {
    Literal.apply(this, arguments);
}

var proto = RegExpLiteral.prototype = new Literal();
proto.constructor = RegExpLiteral;



function NullLiteral ( ) {
    return NULL_LITERAL;  // Reuse object.
}

var proto = NullLiteral.prototype = new Literal();
proto.constructor = NullLiteral;

proto.string = "null";
proto.vakue  = null;

proto.toString = function ( ) {
    return "null";
};

proto.valueOf = function ( ) {
    return null;
};

function temp ( ) { }
temp.prototype = NullLiteral.prototype;
var NULL_LITERAL = new temp();



function BooleanLiteral ( ) { }

var proto = BooleanLiteral.prototype = new Literal();
proto.constructor = BooleanLiteral;



function TrueLiteral ( ) {
    return TRUE_LITERAL;  // Reuse object.
}

var proto = TrueLiteral.prototype = new BooleanLiteral();
proto.constructor = TrueLiteral;

proto.string = "true";
proto.vakue  = true;

proto.toString = function ( ) {
    return "true";
};

proto.valueOf = function ( ) {
    return true;
};

function temp ( ) { }
temp.prototype = TrueLiteral.prototype;
var TRUE_LITERAL = new temp();



function FalseLiteral ( ) {
    return FALSE_LITERAL;  // Reuse object.
}

var proto = FalseLiteral.prototype = new BooleanLiteral();
proto.constructor = FalseLiteral;

proto.string = "false";
proto.vakue  = false;

proto.toString = function ( ) {
    return "false";
};

proto.valueOf = function ( ) {
    return false;
};

function temp ( ) { }
temp.prototype = FalseLiteral.prototype;
var FALSE_LITERAL = new temp();



function ArrayInitializer ( elems ) {
    this.elems = elems;  // array of Expression
}

var proto = ArrayInitializer.prototype = new Expression();
proto.constructor = ArrayInitializer;

proto.toString = function ( ) {
    return "[" + this.elems.join(", ") + "]";
};

proto.containsFunctionCall = function ( ) {
    for ( var i=0;  i < this.elems.length;  i++ ) {
        if ( this.elems[i].containsFunctionCall() ) return true;
    }
    return false;
};

proto.hasSideEfect = function ( ) {
    for ( var i=0;  i < this.elems.length;  i++ ) {
        if ( this.elems[i].hasSideEffect() ) return true;
    }
    return false;
};



function Elision ( ) { }

var proto = Elision.prototype = new Expression();
proto.constructor = Elision;

proto.toString = function ( ) {
    return "";
};

proto.containsFunctionCall = function ( ) {
    return false;
};

proto.hasSideEffect = function ( ) {
    return false;
};



function ObjectInitializer ( v ) {
    this.pairs = v;  // array of {prop: Identifier or Literal,  exp: Expression}
}

var proto = ObjectInitializer.prototype = new Expression();
proto.constructor = ObjectInitializer;

proto.toString = function ( ) {
    var buf = [];
    for ( var i=0;  i < this.pairs.length;  i++ ) {
        buf.push( String(this.pairs[i].prop) + ":" + String(this.pairs[i].exp) );
    }
    return "{" + buf.join(", ") + "}";
};

proto.containsFunctionCall = function ( ) {
    for ( var i=0;  i < this.pairs.length;  i++ ) {
        if ( this.pairs[i].exp.containsFunctionCall() ) return true;
    }
    return false;
};

proto.hasSideEffect = function ( ) {
    for ( var i=0;  i < this.pairs.length;  i++ ) {
        if ( this.pairs[i].exp.hasSideEffect() ) return true;
    }
    return false;
};



function FunctionExpression ( name, params, body ) {
    this.name   = name;    // Identifier or null
    this.params = params;  // array of Identifier
    this.body   = body;    // cons-list of Statement
}

var proto = FunctionExpression.prototype = new Expression();
proto.constructor = FunctionExpression;

proto.toString = function ( ) {
    var buf = ["(function "];
    if ( this.name ) buf.push(this.name);
    buf.push( "(", this.params.join(", "), ") {\n");
    this.body.forEach(function( it ){
        buf.push(it, "\n");
    });
    buf.push("})");
    return buf.join("");
};

proto.containsFunctionCall = function ( ) {
    return false;
};

proto.hasSideEffect = function ( ) {
    return false;
};



function DotAccessor ( base, prop ) {
    this.base = base;  // Expression
    this.prop = prop;  // Identifier
}

var proto = DotAccessor.prototype = new Expression();
proto.constructor = DotAccessor;

proto.toString = function ( ) {
    return String(this.base) + "." + String(this.prop);
};

proto.hasLvalue = function ( ) {
    return true;
};

proto.containsFunctionCall = function ( ) {
    return this.base.containsFunctionCall();
};

proto.hasSideEffect = function ( ) {
    return this.base.hasSideEffect();
};



function BracketAccessor ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = BracketAccessor.prototype = new BinaryExpression();
proto.constructor = BracketAccessor;

proto.toString = function ( ) {
    return [ this.left, "[", this.right, "]" ].join("");
};

proto.hasLvalue = function ( ) {
    return true;
};



function NewExpression ( func, args ) {
    this.func = func;  // Expression
    this.args = args;  // array of Expression
}

var proto = NewExpression.prototype = new Expression();
proto.constructor = NewExpression;

proto.toString = function ( ) {
    return [ "new ", this.func, "(", this.args.join(", "), ")" ].join("");
};

proto.containsFunctionCall = function ( ) {
    return true;
};

proto.hasSideEffect = function ( ) {
    return true;
};



function CallExpression ( func, args ) {
    this.func = func;  // Expression
    this.args = args;  // array of Expression
}

var proto = CallExpression.prototype = new Expression();
proto.constructor = CallExpression;

proto.toString = function ( ) {
    return [ this.func, "(", this.args.join(", "), ")" ].join("");
};

proto.containsFunctionCall = function ( ) {
    return true;
};

proto.hasSideEffect = function ( ) {
    return true;
};



function PostIncExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = PostIncExpression.prototype = new UnaryExpression();
proto.constructor = PostIncExpression;

proto.toString = function ( ) {
    return String(this.exp) + "++";
};

proto.hasSideEffect = function ( ) {
    return true;
};



function PostDecExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = PostDecExpression.prototype = new UnaryExpression();
proto.constructor = PostDecExpression;

proto.toString = function ( ) {
    return String(this.exp) + "--";
};

proto.hasSideEffect = function ( ) {
    return true;
};



function PreIncExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = PreIncExpression.prototype = new UnaryExpression();
proto.constructor = PreIncExpression;

proto.toString = function ( ) {
    return "++" + String(this.exp);
};

proto.hasSideEffect = function ( ) {
    return true;
};



function PreDecExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = PreDecExpression.prototype = new UnaryExpression();
proto.constructor = PreDecExpression;

proto.toString = function ( ) {
    return "--" + String(this.exp);
};

proto.hasSideEffect = function ( ) {
    return true;
};



function DeleteExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = DeleteExpression.prototype = new UnaryExpression();
proto.constructor = DeleteExpression;

proto.toString = function ( ) {
    return "delete " + String(this.exp);
};

proto.hasSideEffect = function ( ) {
    return true;
};



function VoidExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = VoidExpression.prototype = new UnaryExpression();
proto.constructor = VoidExpression;

proto.toString = function ( ) {
    return "void " + String(this.exp);
};



function TypeofExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = TypeofExpression.prototype = new UnaryExpression();
proto.constructor = TypeofExpression;

proto.toString = function ( ) {
    return "typeof " + String(this.exp);
};



function PosExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = PosExpression.prototype = new UnaryExpression();
proto.constructor = PosExpression;

proto.toString = function ( ) {
    return "+ " + String(this.exp);
};



function NegExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = NegExpression.prototype = new UnaryExpression();
proto.constructor = NegExpression;

proto.toString = function ( ) {
    return "- " + String(this.exp);
};



function BitNotExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = BitNotExpression.prototype = new UnaryExpression();
proto.constructor = BitNotExpression;

proto.toString = function ( ) {
    return "~" + String(this.exp);
};



function NotExpression ( e ) {
    UnaryExpression.apply(this, arguments);
}

var proto = NotExpression.prototype = new UnaryExpression();
proto.constructor = NotExpression;

proto.toString = function ( ) {
    return "!" + String(this.exp);
};



function MulExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = MulExpression.prototype = new BinaryExpression();
proto.constructor = MulExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " * ", this.right, ")" ].join("");
};



function DivExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = DivExpression.prototype = new BinaryExpression();
proto.constructor = DivExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " / ", this.right, ")" ].join("");
};



function ModExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = ModExpression.prototype = new BinaryExpression();
proto.constructor = ModExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " % ", this.right, ")" ].join("");
};



function AddExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = AddExpression.prototype = new BinaryExpression();
proto.constructor = AddExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " + ", this.right, ")" ].join("");
};



function SubExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = SubExpression.prototype = new BinaryExpression();
proto.constructor = SubExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " - ", this.right, ")" ].join("");
};



function LShiftExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = LShiftExpression.prototype = new BinaryExpression();
proto.constructor = LShiftExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " << ", this.right, ")" ].join("");
};



function RShiftExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = RShiftExpression.prototype = new BinaryExpression();
proto.constructor = RShiftExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " >> ", this.right, ")" ].join("");
};



function URShiftExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = URShiftExpression.prototype = new BinaryExpression();
proto.constructor = URShiftExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " >>> ", this.right, ")" ].join("");
};



function LessThanExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = LessThanExpression.prototype = new BinaryExpression();
proto.constructor = LessThanExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " < ", this.right, ")" ].join("");
};



function GreaterThanExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = GreaterThanExpression.prototype = new BinaryExpression();
proto.constructor = GreaterThanExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " > ", this.right, ")" ].join("");
};



function LessEqualExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = LessEqualExpression.prototype = new BinaryExpression();
proto.constructor = LessEqualExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " <= ", this.right, ")" ].join("");
};



function GreaterEqualExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = GreaterEqualExpression.prototype = new BinaryExpression();
proto.constructor = GreaterEqualExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " >= ", this.right, ")" ].join("");
};



function InstanceofExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = InstanceofExpression.prototype = new BinaryExpression();
proto.constructor = InstanceofExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " instanceof ", this.right, ")" ].join("");
};



function InExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = InExpression.prototype = new BinaryExpression();
proto.constructor = InExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " in ", this.right, ")" ].join("");
};



function EqualExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = EqualExpression.prototype = new BinaryExpression();
proto.constructor = EqualExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " == ", this.right, ")" ].join("");
};



function NotEqualExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = NotEqualExpression.prototype = new BinaryExpression();
proto.constructor = NotEqualExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " != ", this.right, ")" ].join("");
};



function StrictEqualExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = StrictEqualExpression.prototype = new BinaryExpression();
proto.constructor = StrictEqualExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " === ", this.right, ")" ].join("");
};



function StrictNotEqualExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = StrictNotEqualExpression.prototype = new BinaryExpression();
proto.constructor = StrictNotEqualExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " !== ", this.right, ")" ].join("");
};



function BitAndExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = BitAndExpression.prototype = new BinaryExpression();
proto.constructor = BitAndExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " & ", this.right, ")" ].join("");
};



function BitXorExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = BitXorExpression.prototype = new BinaryExpression();
proto.constructor = BitXorExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " ^ ", this.right, ")" ].join("");
};



function BitOrExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = BitOrExpression.prototype = new BinaryExpression();
proto.constructor = BitOrExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " | ", this.right, ")" ].join("");
};



function AndExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = AndExpression.prototype = new BinaryExpression();
proto.constructor = AndExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " && ", this.right, ")" ].join("");
};



function OrExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = OrExpression.prototype = new BinaryExpression();
proto.constructor = OrExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " || ", this.right, ")" ].join("");
};



function ConditionalExpression ( c, t, f ) {
    this.cond = c;  // Expression
    this.texp = t;  // Expression
    this.fexp = f;  // Expression
}

var proto = ConditionalExpression.prototype = new Expression();
proto.constructor = ConditionalExpression;

proto.toString = function ( ) {
    return [ "(", this.cond, " ? ", this.texp, " : ", this.fexp, ")" ].join("");
};

proto.containsFunctionCall = function ( ) {
    return this.cond.containsFunctionCall()
        || this.texp.containsFunctionCall()
        || this.fexp.containsFunctionCall();
};

proto.hasSideEffect = function ( ) {
    return this.cond.hasSideEffect()
        || this.texp.hasSideEffect()
        || this.fexp.hasSideEffect();
};



function AssignExpression ( left, right ) {
    // This is kind of interface. It just represents a set of classes.
    BinaryExpression.apply(this, arguments);
}

var proto = AssignExpression.prototype = new BinaryExpression();
proto.constructor = AssignExpression;

proto.hasSideEffect = function ( ) {
    return true;
};



function SimpleAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = SimpleAssignExpression.prototype = new AssignExpression();
proto.constructor = SimpleAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " = ", this.right, ")" ].join("");
};



function MulAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = MulAssignExpression.prototype = new AssignExpression();
proto.constructor = MulAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " *= ", this.right, ")" ].join("");
};



function DivAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = DivAssignExpression.prototype = new AssignExpression();
proto.constructor = DivAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " /= ", this.right, ")" ].join("");
};



function ModAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = ModAssignExpression.prototype = new AssignExpression();
proto.constructor = ModAssignExpression;

proto.toString = function ( ) {
    return [ "(",  this.left, " %= ", this.right, ")" ].join("");
};



function AddAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = AddAssignExpression.prototype = new AssignExpression();
proto.constructor = AddAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " += ", this.right, ")" ].join("");
};



function SubAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = SubAssignExpression.prototype = new AssignExpression();
proto.constructor = SubAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " -= ", this.right, ")" ].join("");
};



function LShiftAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = LShiftAssignExpression.prototype = new AssignExpression();
proto.constructor = LShiftAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " <<= ", this.right, ")" ].join("");
};



function RShiftAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = RShiftAssignExpression.prototype = new AssignExpression();
proto.constructor = RShiftAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " >>= ", this.right, ")" ].join("");
};



function URShiftAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = URShiftAssignExpression.prototype = new AssignExpression();
proto.constructor = URShiftAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " >>>= ", this.right, ")" ].join("");
};



function BitAndAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = BitAndAssignExpression.prototype = new AssignExpression();
proto.constructor = BitAndAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " &= ", this.right, ")" ].join("");
};



function BitXorAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = BitXorAssignExpression.prototype = new AssignExpression();
proto.constructor = BitXorAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " ^= ", this.right, ")" ].join("");
};



function BitOrAssignExpression ( left, right ) {
    AssignExpression.apply(this, arguments);
}

var proto = BitOrAssignExpression.prototype = new AssignExpression();
proto.constructor = BitOrAssignExpression;

proto.toString = function ( ) {
    return [ "(", this.left, " |= ", this.right, ")" ].join("");
};



function CommaExpression ( left, right ) {
    BinaryExpression.apply(this, arguments);
}

var proto = CommaExpression.prototype = new BinaryExpression();
proto.constructor = CommaExpression;

proto.toString = function ( ) {
    return [ "(", this.left, ", ", this.right, ")" ].join("");
};



            return {
                StrictEqualExpression: StrictEqualExpression, BooleanLiteral: BooleanLiteral, OrExpression: OrExpression, NotExpression: NotExpression, ThisExpression: ThisExpression, BitAndAssignExpression: BitAndAssignExpression, DivExpression: DivExpression, BracketAccessor: BracketAccessor, CommaExpression: CommaExpression, BitAndExpression: BitAndExpression, MulExpression: MulExpression, EqualExpression: EqualExpression, CallExpression: CallExpression, FunctionExpression: FunctionExpression, Elision: Elision, PostIncExpression: PostIncExpression, InstanceofExpression: InstanceofExpression, NullLiteral: NullLiteral, BitXorAssignExpression: BitXorAssignExpression, URShiftExpression: URShiftExpression, ConditionalExpression: ConditionalExpression, Identifier: Identifier, UnaryExpression: UnaryExpression, BitOrAssignExpression: BitOrAssignExpression, DivAssignExpression: DivAssignExpression, VoidExpression: VoidExpression, TypeofExpression: TypeofExpression, NewExpression: NewExpression, MulAssignExpression: MulAssignExpression, BinaryExpression: BinaryExpression, TrueLiteral: TrueLiteral, AssignExpression: AssignExpression, SubExpression: SubExpression, PreDecExpression: PreDecExpression, RegExpLiteral: RegExpLiteral, DeleteExpression: DeleteExpression, FalseLiteral: FalseLiteral, BitNotExpression: BitNotExpression, GreaterEqualExpression: GreaterEqualExpression, LessEqualExpression: LessEqualExpression, ModExpression: ModExpression, StringLiteral: StringLiteral, LShiftAssignExpression: LShiftAssignExpression, SubAssignExpression: SubAssignExpression, LShiftExpression: LShiftExpression, ModAssignExpression: ModAssignExpression, URShiftAssignExpression: URShiftAssignExpression, NegExpression: NegExpression, PosExpression: PosExpression, AddAssignExpression: AddAssignExpression, ArrayInitializer: ArrayInitializer, LessThanExpression: LessThanExpression, NumberLiteral: NumberLiteral, StrictNotEqualExpression: StrictNotEqualExpression, RShiftExpression: RShiftExpression, InExpression: InExpression, BitOrExpression: BitOrExpression, AndExpression: AndExpression, PostDecExpression: PostDecExpression, ObjectInitializer: ObjectInitializer, RShiftAssignExpression: RShiftAssignExpression, Expression: Expression, DotAccessor: DotAccessor, Literal: Literal, SimpleAssignExpression: SimpleAssignExpression, BitXorExpression: BitXorExpression, AddExpression: AddExpression, GreaterThanExpression: GreaterThanExpression, NotEqualExpression: NotEqualExpression, PreIncExpression: PreIncExpression
            };
        }();
    }
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.StrictEqualExpression = StrictEqualExpression;
    this.Concurrent.Thread.Compiler.BooleanLiteral = BooleanLiteral;
    this.Concurrent.Thread.Compiler.OrExpression = OrExpression;
    this.Concurrent.Thread.Compiler.NotExpression = NotExpression;
    this.Concurrent.Thread.Compiler.ThisExpression = ThisExpression;
    this.Concurrent.Thread.Compiler.BitAndAssignExpression = BitAndAssignExpression;
    this.Concurrent.Thread.Compiler.DivExpression = DivExpression;
    this.Concurrent.Thread.Compiler.BracketAccessor = BracketAccessor;
    this.Concurrent.Thread.Compiler.CommaExpression = CommaExpression;
    this.Concurrent.Thread.Compiler.BitAndExpression = BitAndExpression;
    this.Concurrent.Thread.Compiler.MulExpression = MulExpression;
    this.Concurrent.Thread.Compiler.EqualExpression = EqualExpression;
    this.Concurrent.Thread.Compiler.CallExpression = CallExpression;
    this.Concurrent.Thread.Compiler.FunctionExpression = FunctionExpression;
    this.Concurrent.Thread.Compiler.Elision = Elision;
    this.Concurrent.Thread.Compiler.PostIncExpression = PostIncExpression;
    this.Concurrent.Thread.Compiler.InstanceofExpression = InstanceofExpression;
    this.Concurrent.Thread.Compiler.NullLiteral = NullLiteral;
    this.Concurrent.Thread.Compiler.BitXorAssignExpression = BitXorAssignExpression;
    this.Concurrent.Thread.Compiler.URShiftExpression = URShiftExpression;
    this.Concurrent.Thread.Compiler.ConditionalExpression = ConditionalExpression;
    this.Concurrent.Thread.Compiler.Identifier = Identifier;
    this.Concurrent.Thread.Compiler.UnaryExpression = UnaryExpression;
    this.Concurrent.Thread.Compiler.BitOrAssignExpression = BitOrAssignExpression;
    this.Concurrent.Thread.Compiler.DivAssignExpression = DivAssignExpression;
    this.Concurrent.Thread.Compiler.VoidExpression = VoidExpression;
    this.Concurrent.Thread.Compiler.TypeofExpression = TypeofExpression;
    this.Concurrent.Thread.Compiler.NewExpression = NewExpression;
    this.Concurrent.Thread.Compiler.MulAssignExpression = MulAssignExpression;
    this.Concurrent.Thread.Compiler.BinaryExpression = BinaryExpression;
    this.Concurrent.Thread.Compiler.TrueLiteral = TrueLiteral;
    this.Concurrent.Thread.Compiler.AssignExpression = AssignExpression;
    this.Concurrent.Thread.Compiler.SubExpression = SubExpression;
    this.Concurrent.Thread.Compiler.PreDecExpression = PreDecExpression;
    this.Concurrent.Thread.Compiler.RegExpLiteral = RegExpLiteral;
    this.Concurrent.Thread.Compiler.DeleteExpression = DeleteExpression;
    this.Concurrent.Thread.Compiler.FalseLiteral = FalseLiteral;
    this.Concurrent.Thread.Compiler.BitNotExpression = BitNotExpression;
    this.Concurrent.Thread.Compiler.GreaterEqualExpression = GreaterEqualExpression;
    this.Concurrent.Thread.Compiler.LessEqualExpression = LessEqualExpression;
    this.Concurrent.Thread.Compiler.ModExpression = ModExpression;
    this.Concurrent.Thread.Compiler.StringLiteral = StringLiteral;
    this.Concurrent.Thread.Compiler.LShiftAssignExpression = LShiftAssignExpression;
    this.Concurrent.Thread.Compiler.SubAssignExpression = SubAssignExpression;
    this.Concurrent.Thread.Compiler.LShiftExpression = LShiftExpression;
    this.Concurrent.Thread.Compiler.ModAssignExpression = ModAssignExpression;
    this.Concurrent.Thread.Compiler.URShiftAssignExpression = URShiftAssignExpression;
    this.Concurrent.Thread.Compiler.NegExpression = NegExpression;
    this.Concurrent.Thread.Compiler.PosExpression = PosExpression;
    this.Concurrent.Thread.Compiler.AddAssignExpression = AddAssignExpression;
    this.Concurrent.Thread.Compiler.ArrayInitializer = ArrayInitializer;
    this.Concurrent.Thread.Compiler.LessThanExpression = LessThanExpression;
    this.Concurrent.Thread.Compiler.NumberLiteral = NumberLiteral;
    this.Concurrent.Thread.Compiler.StrictNotEqualExpression = StrictNotEqualExpression;
    this.Concurrent.Thread.Compiler.RShiftExpression = RShiftExpression;
    this.Concurrent.Thread.Compiler.InExpression = InExpression;
    this.Concurrent.Thread.Compiler.BitOrExpression = BitOrExpression;
    this.Concurrent.Thread.Compiler.AndExpression = AndExpression;
    this.Concurrent.Thread.Compiler.PostDecExpression = PostDecExpression;
    this.Concurrent.Thread.Compiler.ObjectInitializer = ObjectInitializer;
    this.Concurrent.Thread.Compiler.RShiftAssignExpression = RShiftAssignExpression;
    this.Concurrent.Thread.Compiler.Expression = Expression;
    this.Concurrent.Thread.Compiler.DotAccessor = DotAccessor;
    this.Concurrent.Thread.Compiler.Literal = Literal;
    this.Concurrent.Thread.Compiler.SimpleAssignExpression = SimpleAssignExpression;
    this.Concurrent.Thread.Compiler.BitXorExpression = BitXorExpression;
    this.Concurrent.Thread.Compiler.AddExpression = AddExpression;
    this.Concurrent.Thread.Compiler.GreaterThanExpression = GreaterThanExpression;
    this.Concurrent.Thread.Compiler.NotEqualExpression = NotEqualExpression;
    this.Concurrent.Thread.Compiler.PreIncExpression = PreIncExpression;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Concurrent.Thread.Compiler.Statement === undefined ) this.Concurrent.Thread.Compiler.Statement = undefined;
    if ( this.Concurrent.Thread.Compiler.EmptyStatement === undefined ) this.Concurrent.Thread.Compiler.EmptyStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.Block === undefined ) this.Concurrent.Thread.Compiler.Block = undefined;
    if ( this.Concurrent.Thread.Compiler.ExpStatement === undefined ) this.Concurrent.Thread.Compiler.ExpStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.VarStatement === undefined ) this.Concurrent.Thread.Compiler.VarStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.IfStatement === undefined ) this.Concurrent.Thread.Compiler.IfStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.IfElseStatement === undefined ) this.Concurrent.Thread.Compiler.IfElseStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.DoWhileStatement === undefined ) this.Concurrent.Thread.Compiler.DoWhileStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.WhileStatement === undefined ) this.Concurrent.Thread.Compiler.WhileStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.ForStatement === undefined ) this.Concurrent.Thread.Compiler.ForStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.ForVarStatement === undefined ) this.Concurrent.Thread.Compiler.ForVarStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.ForInStatement === undefined ) this.Concurrent.Thread.Compiler.ForInStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.ForInVarStatement === undefined ) this.Concurrent.Thread.Compiler.ForInVarStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.ForEachStatement === undefined ) this.Concurrent.Thread.Compiler.ForEachStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.ForEachVarStatement === undefined ) this.Concurrent.Thread.Compiler.ForEachVarStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.ContinueStatement === undefined ) this.Concurrent.Thread.Compiler.ContinueStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.BreakStatement === undefined ) this.Concurrent.Thread.Compiler.BreakStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.ReturnStatement === undefined ) this.Concurrent.Thread.Compiler.ReturnStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.WithStatement === undefined ) this.Concurrent.Thread.Compiler.WithStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.SwitchStatement === undefined ) this.Concurrent.Thread.Compiler.SwitchStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.CaseClause === undefined ) this.Concurrent.Thread.Compiler.CaseClause = undefined;
    if ( this.Concurrent.Thread.Compiler.DefaultClause === undefined ) this.Concurrent.Thread.Compiler.DefaultClause = undefined;
    if ( this.Concurrent.Thread.Compiler.ThrowStatement === undefined ) this.Concurrent.Thread.Compiler.ThrowStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.TryCatchStatement === undefined ) this.Concurrent.Thread.Compiler.TryCatchStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.TryFinallyStatement === undefined ) this.Concurrent.Thread.Compiler.TryFinallyStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.TryCatchFinallyStatement === undefined ) this.Concurrent.Thread.Compiler.TryCatchFinallyStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.TryCatchListStatement === undefined ) this.Concurrent.Thread.Compiler.TryCatchListStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.TryCatchListFinallyStatement === undefined ) this.Concurrent.Thread.Compiler.TryCatchListFinallyStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.CatchGuard === undefined ) this.Concurrent.Thread.Compiler.CatchGuard = undefined;
    if ( this.Concurrent.Thread.Compiler.FunctionDeclaration === undefined ) this.Concurrent.Thread.Compiler.FunctionDeclaration = undefined;
with ( function(){
with ( Data.Cons ) {
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


NAMESPACE = 'Concurrent.Thread.Compiler';










function Statement ( labels, lineno, source ) {
    // This is kind of abstract class.
    this.labels = labels;  // array of Identifier  # labels directly qualifying this statement
    this.lineno = lineno;  // Number (optional)    # line no. 
    this.source = source;  // String (optional)    # file-name, URL, ...etc
}

Statement.prototype.toString = function ( ) {
    Kit.codeBug();
};

// kind of final protected method.
// Use this like: labelsToString.call(obj, arg0, arg1 ...)
function labelsToString ( ) {
    var buf = [];
    for ( var i=0;  i < this.labels.length;  i++ ) {
        buf.push(this.labels[i], ": ");
    }
    return buf.join("");
}



function EmptyStatement ( labels, lineno, source ) {
    Statement.call(this, labels, lineno, source);
}

var proto = EmptyStatement.prototype = new Statement();
proto.constructor = EmptyStatement;

proto.toString = function ( ) {
    return labelsToString.call(this) + ";";
};



function Block ( labels, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.body = body;  // cons-list of Statement
}

var proto = Block.prototype = new Statement();
proto.constructor = Block;

proto.toString = function ( ) {
    var buf = [labelsToString.call(this), "{"];
    this.body.forEach(function( it ){
        buf.push(it);
    });
    buf.push("}");
    return buf.join("\n");
};



function ExpStatement ( labels, exp, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.exp = exp;  // Expression
}

var proto = ExpStatement.prototype = new Statement();
proto.constructor = ExpStatement;

proto.toString = function ( ) {
    return labelsToString.call(this) + String(this.exp) + ";";
};

proto.containsFunctionCall = function ( ) {
    return this.exp.containsFunctionCall();
};



function VarStatement ( labels, decls, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.decls = decls;  // array of {id: Identifier,  exp: Expression or null}
}

var proto = VarStatement.prototype = new Statement();
proto.constructor = VarStatement;

proto.toString = function ( ) {
    var buf = [];
    for ( var i=0;  i < this.decls.length;  i++ ) {
        if ( this.decls[i].exp ) {
            buf.push( [ this.decls[i].id, "=", this.decls[i].exp ].join("") );
        }
        else {
            buf.push( this.decls[i].id );
        }
    }
    return [ labelsToString.call(this),
             "var ",
             buf.join(", "),
             ";",
           ].join("");
};

proto.containsFunctionCall = function ( ) {
    for ( var i=0;  i < this.decls.length;  i++ ) {
        if ( this.decls[i].exp && this.decls[i].exp.containsFunctionCall() ) {
            return true;
        }
    }
    return false;
};



function IfStatement ( labels, cond, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.cond = cond;  // Expression
    this.body = body;  // Statement
}

var proto = IfStatement.prototype = new Statement();
proto.constructor = IfStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "if (",
             this.cond,
             ") ",
             this.body
           ].join("");
};



function IfElseStatement ( labels, cond, tbody, fbody, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.cond  = cond;   // Expression
    this.tbody = tbody;  // Statement
    this.fbody = fbody;  // Statement
}

var proto = IfElseStatement.prototype = new Statement();
proto.constructor = IfElseStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "if (",
             this.cond,
             ") ",
             this.tbody,
             "\n",
             "else ",
             this.fbody
           ].join("");
};



function DoWhileStatement ( labels, body, cond, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.body = body;  // Statement
    this.cond = cond;  // Expression
}

var proto = DoWhileStatement.prototype = new Statement();
proto.constructor = DoWhileStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "do ",
             this.body,
             " while (",
             this.cond,
             ");"
           ].join("");
};



function WhileStatement ( labels, cond, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.cond = cond;  // Expression
    this.body = body;  // Statement
}

var proto = WhileStatement.prototype = new Statement();
proto.constructor = WhileStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "while (",
             this.cond,
             ") ",
             this.body
           ].join("");
};



function ForStatement ( labels, init, cond, incr, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.init = init;  // Expression or null
    this.cond = cond;  // Expression or null
    this.incr = incr;  // Expression or null
    this.body = body;  // Statement
}

var proto = ForStatement.prototype = new Statement();
proto.constructor = ForStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "for (",
             this.init ? this.init : "", "; ",
             this.cond ? this.cond : "", "; ",
             this.incr ? this.incr : "",
             ") ",
             this.body
           ].join("");
};



function ForVarStatement ( labels, decls, cond, incr, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.decls = decls;  // array of {id: Identifier,  exp: Expression or null}
    this.cond  = cond;   // Expression or null
    this.incr  = incr;   // Expression or null
    this.body  = body;   // Statement
}

var proto = ForVarStatement.prototype = new Statement();
proto.constructor = ForVarStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "for (",
             (this.decls.length ? new VarStatement([], this.decls) : ";"), " ",
             this.cond ? this.cond : "", "; ",
             this.incr ? this.incr : "",
             ") ",
             this.body
           ].join("");
};



function ForInStatement ( labels, lhs, exp, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.lhs  = lhs;   // Identifier or DotAccessor or BracketAccessor
    this.exp  = exp;   // Expression
    this.body = body;  // Statement
}

var proto = ForInStatement.prototype = new Statement();
proto.constructor = ForInStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "for (", this.lhs, " in ", this.exp, ") ",
             this.body
           ].join("");
};



function ForInVarStatement ( labels, decl, exp, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.decl = decl;  // {id: Identifier,  exp: Expression or null}
    this.exp  = exp;   // Expression
    this.body = body;  // Statement
}

var proto = ForInVarStatement.prototype = new Statement();
proto.constructor = ForInVarStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "for ( var ",
             this.decl.exp ? String(this.decl.id) + "=" + String(this.decl.exp)
                           : String(this.decl.id),
             " in ",
             this.exp,
             ") ",
             this.body
           ].join("");
};


// Mozilla extention "for each ( ... in ... )"

function ForEachStatement ( labels, lhs, exp, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.lhs  = lhs;   // Identifier or DotAccessor or BracketAccessor
    this.exp  = exp;   // Expression
    this.body = body;  // Statement
}

var proto = ForEachStatement.prototype = new Statement();
proto.constructor = ForEachStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "for each (", this.lhs, " in ", this.exp, ") ",
             this.body
           ].join("");
};



function ForEachVarStatement ( labels, decl, exp, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.decl = decl;  // {id: Identifier,  exp: Expression or null}
    this.exp  = exp;   // Expression
    this.body = body;  // Statement
}

var proto = ForEachVarStatement.prototype = new Statement();
proto.constructor = ForEachVarStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "for each ( var ",
             this.decl.exp ? String(this.decl.id) + "=" + String(this.decl.exp)
                           : String(this.decl.id),
             " in ",
             this.exp,
             ") ",
             this.body
           ].join("");
};



function ContinueStatement ( labels, target, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.target = target;  // Identifier or null
}

var proto = ContinueStatement.prototype = new Statement();
proto.constructor = ContinueStatement;

proto.toString = function ( ) {
    var buf = [labelsToString.call(this), "continue"];
    if ( this.target ) buf.push(" ", this.target);
    buf.push(";");
    return buf.join("");
};



function BreakStatement ( labels, target, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.target = target;  // Identifier or null
}

var proto = BreakStatement.prototype = new Statement();
proto.constructor = BreakStatement;

proto.toString = function ( ) {
    var buf = [labelsToString.call(this), "break"];
    if ( this.target ) buf.push(" ", this.target);
    buf.push(";");
    return buf.join("");
};



function ReturnStatement ( labels, exp, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.exp = exp;  // Expression or null
}

var proto = ReturnStatement.prototype = new Statement();
proto.constructor = ReturnStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "return ",
             this.exp ? this.exp : "",
             ";"
           ].join("");
};



function WithStatement ( labels, exp, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.exp  = exp;   // Expression
    this.body = body;  // Statement
}

var proto = WithStatement.prototype = new Statement();
proto.constructor = WithStatement;

proto.toString = function ( ) {
    return [ "with (", this.exp, ") ", this.body ].join("");
};



function SwitchStatement ( labels, exp, clauses, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.exp     = exp;      // Expression
    this.clauses = clauses;  // cons-list of (CaseClause or DefaultClause)
}

var proto = SwitchStatement.prototype = new Statement();
proto.constructor = SwitchStatement;

proto.toString = function ( ) {
    var buf = [ "switch ( ", this.exp, ") {\n"];
    this.clauses.forEach(function( it ){
        buf.push(it, "\n");
    });
    buf.push("}");
    return buf.join("");
};



function CaseClause ( exp, body, lineno, source ) {
    this.exp    = exp;     // Expression
    this.body   = body;    // cons-list of Statement
    this.lineno = lineno;  // Number (optional)
    this.source = source;  // String (optional)
}

CaseClause.prototype.toString = function ( ) {
    var buf = ["case ", this.exp, ":\n"];
    this.body.forEach(function( it ){
        buf.push(it, "\n");
    });
    return buf.join("");
};



function DefaultClause ( body, lineno, source ) {
    this.body   = body;    // cons-list of Statement
    this.lineno = lineno;  // Number (optional)
    this.source = source;  // String (optional)
}

DefaultClause.prototype.toString = function ( ) {
    var buf = ["default:\n"];
    this.body.forEach(function( it ){
        buf.push(it, "\n");
    });
    return buf.join("");
};



function ThrowStatement ( labels, exp, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.exp = exp;  // Expression
}

var proto = ThrowStatement.prototype = new Statement();
proto.constructor = ThrowStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "throw ", this.exp, ";"
           ].join("");
};



function TryCatchStatement ( labels, tryBlock, variable, catchBlock, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.tryBlock   = tryBlock;    // Block
    this.variable   = variable;    // Identifier
    this.catchBlock = catchBlock;  // Block
}

var proto = TryCatchStatement.prototype = new Statement();
proto.constructor = TryCatchStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "try ", this.tryBlock, "\n",
             "catch (", this.variable, ") ", this.catchBlock
           ].join("");
};



function TryFinallyStatement ( labels, tryBlock, finallyBlock, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.tryBlock     = tryBlock;      // Block
    this.finallyBlock = finallyBlock;  // Block
}

var proto = TryFinallyStatement.prototype = new Statement();
proto.constructor = TryFinallyStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "try ", this.tryBlock, "\n",
             "finally ", this.finallyBlock
           ].join("");
};



function TryCatchFinallyStatement ( labels, tryBlock, variable, catchBlock, finallyBlock, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.tryBlock     = tryBlock;      // Block
    this.variable     = variable;      // Identifier
    this.catchBlock   = catchBlock;    // Block
    this.finallyBlock = finallyBlock;  // Block
}

var proto = TryCatchFinallyStatement.prototype = new Statement();
proto.constructor = TryCatchFinallyStatement;

proto.toString = function ( ) {
    return [ labelsToString.call(this),
             "try ", this.tryBlock, "\n",
             "catch (", this.variable, ") ", this.catchBlock, "\n",
             "finally ", this.finallyBlock
           ].join("");
};



function TryCatchListStatement ( labels, tryBlock, catchList, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.tryBlock  = tryBlock;   // Block
    this.catchList = catchList;  // cons-list of CatchGuard
}

var proto = TryCatchListStatement.prototype = new Statement();
proto.constructor = TryCatchListStatement;

proto.toString = function ( ) {
    var buf = [ labelsToString.call(this),
                "try ", this.tryBlock, "\n" ];
    this.catchList.forEach(function( it ){
        buf.push(it);
    });
    return buf.join("");
};



function TryCatchListFinallyStatement ( labels, tryBlock, catchList, finallyBlock, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.tryBlock     = tryBlock;      // Block
    this.catchList    = catchList;     // cons-list of CatchGuard
    this.finallyBlock = finallyBlock;  // Block
}

var proto = TryCatchListFinallyStatement.prototype = new Statement();
proto.constructor = TryCatchListFinallyStatement;

proto.toString = function ( ) {
    var buf = [ labelsToString.call(this),
                "try ", this.tryBlock, "\n" ];
    this.catchList.forEach(function( it ){
        buf.push(it);
    });
    buf.push("finally ", this.finallyBlock);
    return buf.join("");
};



function CatchGuard ( variable, cond, block, lineno, source ) {
    this.variable = variable;  // Identifier
    this.cond     = cond;      // Expression or null (null means this is default catch clause)
    this.block    = block;     // Block
    this.lineno   = lineno;    // Number (optional)
    this.source   = source;    // String (optional)
}

CatchGuard.prototype.toString = function ( ) {
    var buf = ["catch ( ", this.variable];
    if ( this.cond ) buf.push(" if ", this.cond);
    buf.push(" )", this.block);
    return buf.join("");
};



function FunctionDeclaration ( labels, name, params, body, lineno, source ) {
    Statement.call(this, labels, lineno, source);
    this.name   = name;    // Identifier
    this.params = params;  // array of Identifier
    this.body   = body;    // cons-list of Statement
}

var proto = FunctionDeclaration.prototype = new Statement();
proto.constructor = FunctionDeclaration;

proto.toString = function ( ) {
    var buf = [ "function ", this.name,
                " (", this.params.join(", "), ") {\n" ];
    this.body.forEach(function( it ){
        buf.push(it, "\n");
    });
    buf.push("}");
    return buf.join("");
};


            return {
                CatchGuard: CatchGuard, Block: Block, IfStatement: IfStatement, FunctionDeclaration: FunctionDeclaration, ForVarStatement: ForVarStatement, IfElseStatement: IfElseStatement, TryFinallyStatement: TryFinallyStatement, TryCatchFinallyStatement: TryCatchFinallyStatement, ThrowStatement: ThrowStatement, ForEachStatement: ForEachStatement, EmptyStatement: EmptyStatement, TryCatchStatement: TryCatchStatement, WithStatement: WithStatement, ExpStatement: ExpStatement, ReturnStatement: ReturnStatement, Statement: Statement, ForInVarStatement: ForInVarStatement, BreakStatement: BreakStatement, TryCatchListStatement: TryCatchListStatement, DoWhileStatement: DoWhileStatement, ForInStatement: ForInStatement, DefaultClause: DefaultClause, VarStatement: VarStatement, ContinueStatement: ContinueStatement, TryCatchListFinallyStatement: TryCatchListFinallyStatement, WhileStatement: WhileStatement, SwitchStatement: SwitchStatement, ForEachVarStatement: ForEachVarStatement, CaseClause: CaseClause, ForStatement: ForStatement
            };
        }();
    }
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.CatchGuard = CatchGuard;
    this.Concurrent.Thread.Compiler.Block = Block;
    this.Concurrent.Thread.Compiler.IfStatement = IfStatement;
    this.Concurrent.Thread.Compiler.FunctionDeclaration = FunctionDeclaration;
    this.Concurrent.Thread.Compiler.ForVarStatement = ForVarStatement;
    this.Concurrent.Thread.Compiler.IfElseStatement = IfElseStatement;
    this.Concurrent.Thread.Compiler.TryFinallyStatement = TryFinallyStatement;
    this.Concurrent.Thread.Compiler.TryCatchFinallyStatement = TryCatchFinallyStatement;
    this.Concurrent.Thread.Compiler.ThrowStatement = ThrowStatement;
    this.Concurrent.Thread.Compiler.ForEachStatement = ForEachStatement;
    this.Concurrent.Thread.Compiler.EmptyStatement = EmptyStatement;
    this.Concurrent.Thread.Compiler.TryCatchStatement = TryCatchStatement;
    this.Concurrent.Thread.Compiler.WithStatement = WithStatement;
    this.Concurrent.Thread.Compiler.ExpStatement = ExpStatement;
    this.Concurrent.Thread.Compiler.ReturnStatement = ReturnStatement;
    this.Concurrent.Thread.Compiler.Statement = Statement;
    this.Concurrent.Thread.Compiler.ForInVarStatement = ForInVarStatement;
    this.Concurrent.Thread.Compiler.BreakStatement = BreakStatement;
    this.Concurrent.Thread.Compiler.TryCatchListStatement = TryCatchListStatement;
    this.Concurrent.Thread.Compiler.DoWhileStatement = DoWhileStatement;
    this.Concurrent.Thread.Compiler.ForInStatement = ForInStatement;
    this.Concurrent.Thread.Compiler.DefaultClause = DefaultClause;
    this.Concurrent.Thread.Compiler.VarStatement = VarStatement;
    this.Concurrent.Thread.Compiler.ContinueStatement = ContinueStatement;
    this.Concurrent.Thread.Compiler.TryCatchListFinallyStatement = TryCatchListFinallyStatement;
    this.Concurrent.Thread.Compiler.WhileStatement = WhileStatement;
    this.Concurrent.Thread.Compiler.SwitchStatement = SwitchStatement;
    this.Concurrent.Thread.Compiler.ForEachVarStatement = ForEachVarStatement;
    this.Concurrent.Thread.Compiler.CaseClause = CaseClause;
    this.Concurrent.Thread.Compiler.ForStatement = ForStatement;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( this.Concurrent.Thread.Compiler.IdentifierMap === undefined ) this.Concurrent.Thread.Compiler.IdentifierMap = undefined;
with ( function(){
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


NAMESPACE = 'Concurrent.Thread.Compiler';





var hasOwnProperty = Object.prototype.hasOwnProperty;




function IdentifierMap ( ) {
    this._map = {};
}

var proto = IdentifierMap.prototype;


proto.clone = function clone ( ) {
    var c = new IdentifierMap();
    for ( var i in this._map ) {
        if ( hasOwnProperty.call(this._map, i) ) c._map[i] = this._map[i];
    }
    return c;
};


proto.exists = function ( /* variable arguments */ ) {
    for ( var i=0;  i < arguments.length;  i++ ) {
        var key = arguments[i];
        if ( !(key instanceof Identifier) ) throw new TypeError("arguments[" + i + "] is not of type Identifier");
        if ( !hasOwnProperty.call(this._map, key.valueOf()) ) return false;
    }
    return true;
};


proto.get = function ( k ) {
    if ( !(k instanceof Identifier) ) throw new TypeError("arguments[0] is not of type Identifier");
    var s = k.valueOf();
    if ( !hasOwnProperty.call(this._map, s) ) return undefined;
    return this._map[s].value;
};


proto.put = function ( k, v ) {
    if ( !(k instanceof Identifier) ) throw new TypeError("arguments[0] is not of type Identifier");
    this._map[k.valueOf()] = {id: k, value: v};
};


proto.remove = function ( k ) {
    if ( !(k instanceof Identifier) ) throw new TypeError("arguments[0] is not of type Identifier");
    return delete this._map[k.valueOf()];
};


proto.keys = function ( ) {
    var set = new IdentifierSet();
    for ( var i in this._map ) {
        if ( hasOwnProperty.call(this._map, i) ) set.add(this._map[i].id);
    }
    return set;
};


proto.values = function ( ) {
    var vals = [];
    for ( var i in this._map ) {
        if ( hasOwnProperty.call(this._map, i) ) vals.push(this._map[i].value);
    }
    return vals;
};


            return {
                IdentifierMap: IdentifierMap
            };
        }();
    }
}.call(null) ) {
    this.Concurrent.Thread.Compiler.IdentifierMap = IdentifierMap;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( this.Concurrent.Thread.Compiler.TokenStream === undefined ) this.Concurrent.Thread.Compiler.TokenStream = undefined;
with ( function(){
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Rhino code, released
 * May 6, 1999.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1997-1999
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Roger Lawrence
 *   Mike McCabe
 *   Igor Bukanov
 *   Ethan Hugg
 *   Terry Lucas
 *   Milen Nankov
 *   Daisuke Maki
 *
 * Alternatively, the contents of this file may be used under the terms of
 * the GNU General Public License Version 2 or later (the "GPL"), in which
 * case the provisions of the GPL are applicable instead of those above. If
 * you wish to allow use of your version of this file only under the terms of
 * the GPL and not to allow others to use your version of this file under the
 * MPL, indicate your decision by deleting the provisions above and replacing
 * them with the notice and other provisions required by the GPL. If you do
 * not delete the provisions above, a recipient may use your version of this
 * file under either the MPL or the GPL.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * This file is based on the file TokenStream.java in Rhino 1.6R5.
 */





NAMESPACE = 'Concurrent.Thread.Compiler';







/*
 * For chars - because we need something out-of-range
 * to check.  (And checking EOF by exception is annoying.)
 * Fortunatelly, U+FFFF is guaranteed not to be assigned 
 * for any character.
 * Note distinction from EOF token type!
 */
var EOF_CHAR = String.fromCharCode(0xFFFF);




function TokenStream( parser, sourceString, lineno )
{
    this.parser = parser;
    this.sourceString = String(sourceString);
    this.sourceEnd    = this.sourceString.length;
    this.sourceCursor = 0;

    // stuff other than whitespace since start of line
    this.dirtyLine = false;

    this.string = "";

    this.stringBuffer = [];
    this.ungetBuffer  = [];

    this.hitEOF = false;

    this.lineStart   = 0;
    this.lineno      = Number(lineno) || 1;
    this.lineEndChar = undefined;

    // for xml tokenizer
    this.xmlIsAttribute   = false;
    this.xmlIsTagContent  = false;
    this.xmlOpenTagsCount = 0;
}

var proto = TokenStream.prototype;


/* This function uses the cached op, string and number fields in
 * TokenStream; if getToken has been called since the passed token
 * was scanned, the op or string printed may be incorrect.
 */
proto.tokenToString = function ( token )
{
    if (Token.printTrees) {
        var name = Token.name(token);

        switch ( token ) {
        case Token.STRING:
        case Token.REGEXP:
        case Token.NAME:
            return name + " `" + this.string + "'";

        case Token.NUMBER:
            return "NUMBER " + this.number;
        }

        return name;
    }
    return "";
};


function isKeyword ( s )
{
    return Token.EOF != stringToKeyword(s);
}


var strIdMap = {
    "break"         : Token.BREAK,
    "case"          : Token.CASE,
    "catch"         : Token.CATCH,
    "continue"      : Token.CONTINUE,
    "default"       : Token.DEFAULT,
    "delete"        : Token.DELPROP,
    "do"            : Token.DO,
    "else"          : Token.ELSE,
    "export"        : Token.EXPORT,
    "false"         : Token.FALSE,
    "finally"       : Token.FINALLY,
    "for"           : Token.FOR,
    "function"      : Token.FUNCTION,
    "if"            : Token.IF,
    "in"            : Token.IN,
    "instanceof"    : Token.INSTANCEOF,
    "new"           : Token.NEW,
    "null"          : Token.NULL,
    "return"        : Token.RETURN,
    "switch"        : Token.SWITCH,
    "this"          : Token.THIS,
    "throw"         : Token.THROW,
    "true"          : Token.TRUE,
    "try"           : Token.TRY,
    "typeof"        : Token.TYPEOF,
    "var"           : Token.VAR,
    "void"          : Token.VOID,
    "while"         : Token.WHILE,
    "with"          : Token.WITH,
    // Future Reserved Words
    "abstract"      : Token.RESERVED,
    "boolean"       : Token.RESERVED,
    "byte"          : Token.RESERVED,
    "char"          : Token.RESERVED,
    "class"         : Token.RESERVED,
    "const"         : Token.RESERVED,
    "debugger"      : Token.RESERVED,
    "double"        : Token.RESERVED,
    "enum"          : Token.RESERVED,
    "extends"       : Token.RESERVED,
    "final"         : Token.RESERVED,
    "float"         : Token.RESERVED,
    "goto"          : Token.RESERVED,
    "implements"    : Token.RESERVED,
    "import"        : Token.IMPORT,
    "int"           : Token.RESERVED,
    "interface"     : Token.RESERVED,
    "long"          : Token.RESERVED,
    "native"        : Token.RESERVED,
    "package"       : Token.RESERVED,
    "private"       : Token.RESERVED,
    "protected"     : Token.RESERVED,
    "public"        : Token.RESERVED,
    "short"         : Token.RESERVED,
    "static"        : Token.RESERVED,
    "super"         : Token.RESERVED,
    "synchronized"  : Token.RESERVED,
    "throws"        : Token.RESERVED,
    "transient"     : Token.RESERVED,
    "volatile"      : Token.RESERVED
};

function stringToKeyword ( name )
{
    return strIdMap.hasOwnProperty(name) ? strIdMap[name] : Token.EOF;
}


proto.getLineno = function ( ) { return this.lineno; };

proto.getString = function ( ) { return this.string; };

proto.eof = function ( ) { return this.hitEOF; };


proto.getToken = function ( )
{
    var c;

retry:
    for (;;) {
        // Eat whitespace, possibly sensitive to newlines.
        for (;;) {
            c = this.getChar();
            if ( c === EOF_CHAR ) {
                return Token.EOF;
            } else if ( c === '\n' ) {
                this.dirtyLine = false;
                return Token.EOL;
            } else if ( !isSpace(c) ) {
                if ( c !== '-' ) {
                    this.dirtyLine = true;
                }
                break;
            }
        }

        // identifier/keyword/instanceof?
        // watch out for starting with a <backslash>
        var identifierStart      = false;
        var isUnicodeEscapeStart = false;
        if ( c === '\\' ) {
            c = this.getChar();
            if ( c === 'u' ) {
                identifierStart      = true;
                isUnicodeEscapeStart = true;
                this.stringBuffer    = ["\\u"];
            } else {
                identifierStart = false;
                this.ungetChar(c);
                c = '\\';
            }
        } else if ( isIdentifierStart(c) ) {
            identifierStart   = true;
            this.stringBuffer = [c];
        }

        if ( identifierStart ) {
            var containsEscape = isUnicodeEscapeStart;
            for (;;) {
                if ( isUnicodeEscapeStart ) {
                    // strictly speaking we should probably push-back
                    // all the bad characters if the <backslash>uXXXX
                    // sequence is malformed. But since there isn't a
                    // correct context(is there?) for a bad Unicode
                    // escape sequence in an identifier, we can report
                    // an error here.
                    for ( var i=0;  i != 4;  ++i ) {
                        c = this.getChar();
                        if ( isHexDigit(c) ) {
                            this.addToString(c);
                        } else {
                            this.parser.addError("msg.invalid.escape");
                            return Token.ERROR;
                        }
                    }
                    isUnicodeEscapeStart = false;
                } else {
                    c = this.getChar();
                    if (c == '\\') {
                        c = this.getChar();
                        if (c == 'u') {
                            this.addToString("\\u");
                            isUnicodeEscapeStart = true;
                            containsEscape       = true;
                        } else {
                            this.parser.addError("msg.illegal.character");
                            return Token.ERROR;
                        }
                    } else {
                        if ( !isIdentifierPart(c) ) break;
                        this.addToString(c);
                    }
                }
            }
            this.ungetChar(c);

            var str = this.getStringFromBuffer();
            if ( !containsEscape ) {
                // OPT we shouldn't have to make a string to
                // check if it's a keyword.

                // Return the corresponding token if it's a keyword
                var result = stringToKeyword(str);
                if ( result != Token.EOF ) return result;
            }
            this.string = str;
            return Token.NAME;
        }

        // is it a number?
        if ( isDigit(c)  ||  (c==='.' && isDigit(this.peekChar())) ) {
            this.stringBuffer = [];
            var base = 10;

            if ( c === '0' ) {
                this.addToString('0');
                c = this.getChar();
                if ( c === 'x' || c === 'X' ) {
                    this.addToString(c);
                    base = 16;
                    c = this.getChar();
                } else if ( isDigit(c) ) {
                    base = 8;
                }
            }

            if ( base === 16 ) {
                while ( isHexDigit(c) ) {
                    this.addToString(c);
                    c = this.getChar();
                }
            } else {
                while ( isDigit(c) ) {
                    /*
                     * We permit 08 and 09 as decimal numbers, which
                     * makes our behavior a superset of the ECMA
                     * numeric grammar.  We might not always be so
                     * permissive, so we warn about it.
                     */
                    if ( base === 8  &&  (c==='8' || c==='9') ) {
                        this.parser.addWarning("msg.bad.octal.literal", c == '8' ? "8" : "9");
                        base = 10;
                    }
                    this.addToString(c);
                    c = this.getChar();
                }
            }

            if ( base === 10 ) {
                if ( c === '.' ) {
                    do {
                        this.addToString(c);
                        c = this.getChar();
                    } while ( isDigit(c) );
                }
                if ( c === 'e' || c === 'E' ) {
                    this.addToString(c);
                    c = this.getChar();
                    if ( c === '+' || c === '-' ) {
                        this.addToString(c);
                        c = this.getChar();
                    }
                    if ( !isDigit(c) ) {
                        this.parser.addError("msg.missing.exponent");
                        return Token.ERROR;
                    }
                    do {
                        this.addToString(c);
                        c = this.getChar();
                    } while ( isDigit(c) );
                }
            }
            this.ungetChar(c);

            this.string = this.getStringFromBuffer();
            return Token.NUMBER;
        }

        // is it a string?
        if ( c === '"' || c === "'" ) {
            var quoteChar = c;
            this.stringBuffer = [c];
            c = this.getChar();
            while ( c !== quoteChar ) {
                if ( c === '\n' || c === EOF_CHAR ) {
                    this.ungetChar(c);
                    this.parser.addError("msg.unterminated.string.lit");
                    return Token.ERROR;
                }
                if ( c === '\\' ) {
                    this.addToString('\\');
                    c = this.getChar();
                    if ( c === '\n' ) {
                        // Remove line terminator after escape to follow
                        // SpiderMonkey and C/C++
                        // But, issue warning since ECMA262-3 does not allow that.
                        this.parser.addWarning("msg.unsafe.string.lit");
                    } else {
                        this.addToString(c);
                    }
                } else {
                    this.addToString(c);
                }
                c = this.getChar();
            }
            this.addToString(quoteChar);
            this.string = this.getStringFromBuffer();
            return Token.STRING;
        }

        switch ( c.charCodeAt(0) ) {
        case 0x3B:  // ';'
            return Token.SEMI;

        case 0x5B:  // '['
            return Token.LB;

        case 0x5D:  // ']'
            return Token.RB;

        case 0x7B:  // '{'
            return Token.LC;

        case 0x7D:  // '}'
            return Token.RC;

        case 0x28:  // '('
            return Token.LP;

        case 0x29:  // ')'
            return Token.RP;

        case 0x2C:  // ','
            return Token.COMMA;

        case 0x3F:  // '?'
            return Token.HOOK;

        case 0x40:  // '@'
            return Token.XMLATTR;

        case 0x3A:  // ':'
            if ( this.matchChar(':') ) {
                return Token.COLONCOLON;
            } else {
                return Token.COLON;
            }

        case 0x2E:  // '.'
            if ( this.matchChar('.') ) {
                return Token.DOTDOT;
            } else if ( this.matchChar('(') ) {
                return Token.DOTQUERY;
            } else {
                return Token.DOT;
            }

        case 0x7C:  // '|'
            if ( this.matchChar('|') ) {
                return Token.OR;
            } else if ( this.matchChar('=') ) {
                return Token.ASSIGN_BITOR;
            } else {
                return Token.BITOR;
            }

        case 0x5E:  // '^'
            if ( this.matchChar('=') ) {
                return Token.ASSIGN_BITXOR;
            } else {
                return Token.BITXOR;
            }

        case 0x26:  // '&'
            if ( this.matchChar('&') ) {
                return Token.AND;
            } else if ( this.matchChar('=') ) {
                return Token.ASSIGN_BITAND;
            } else {
                return Token.BITAND;
            }

        case 0x3D:  // '='
            if ( this.matchChar('=') ) {
                if ( this.matchChar('=') ) {
                    return Token.SHEQ;
                } else {
                    return Token.EQ;
                }
            } else {
                return Token.ASSIGN;
            }

        case 0x21:  // '!'
            if ( this.matchChar('=') ) {
                if ( this.matchChar('=') ) {
                    return Token.SHNE;
                } else {
                    return Token.NE;
                }
            } else {
                return Token.NOT;
            }

        case 0x3C:  // '<'
            /* NB:treat HTML begin-comment as comment-till-eol */
            if ( this.matchChar('!') ) {
                if ( this.matchChar('-') ) {
                    if ( this.matchChar('-') ) {
                        this.skipLine();
                        continue retry;
                    }
                    this.ungetChar('-');
                }
                this.ungetChar('!');
            }
            if ( this.matchChar('<') ) {
                if ( this.matchChar('=') ) {
                    return Token.ASSIGN_LSH;
                } else {
                    return Token.LSH;
                }
            } else {
                if ( this.matchChar('=') ) {
                    return Token.LE;
                } else {
                    return Token.LT;
                }
            }

        case 0x3E:  // '>'
            if ( this.matchChar('>') ) {
                if ( this.matchChar('>') ) {
                    if ( this.matchChar('=') ) {
                        return Token.ASSIGN_URSH;
                    } else {
                        return Token.URSH;
                    }
                } else {
                    if ( this.matchChar('=') ) {
                        return Token.ASSIGN_RSH;
                    } else {
                        return Token.RSH;
                    }
                }
            } else {
                if ( this.matchChar('=') ) {
                    return Token.GE;
                } else {
                    return Token.GT;
                }
            }

        case 0x2A:  // '*'
            if ( this.matchChar('=') ) {
                return Token.ASSIGN_MUL;
            } else {
                return Token.MUL;
            }

        case 0x2F:  // '/'
            // is it a // comment?
            if ( this.matchChar('/') ) {
                this.skipLine();
                continue retry;
            } else if ( this.matchChar('*') ) {
                for (;;) {
                    c = this.getChar();
                    if ( c === EOF_CHAR ) {
                        this.parser.addError("msg.unterminated.comment");
                        return Token.ERROR;
                    } else if ( c === '*' ) {
                        c = this.getChar();
                        if ( c === '/' ) {
                            continue retry;
                        }
                    }
                }
            } else if ( this.matchChar('=') ) {
                return Token.ASSIGN_DIV;
            } else {
                return Token.DIV;
            }

        case 0x25:  // '%'
            if ( this.matchChar('=') ) {
                return Token.ASSIGN_MOD;
            } else {
                return Token.MOD;
            }

        case 0x7E:  // '~'
            return Token.BITNOT;

        case 0x2B:  // '+'
            if ( this.matchChar('=') ) {
                return Token.ASSIGN_ADD;
            } else if ( this.matchChar('+') ) {
                return Token.INC;
            } else {
                return Token.ADD;
            }

        case 0x2D:  // '-'
            if ( this.matchChar('=') ) {
                c = Token.ASSIGN_SUB;
            } else if ( this.matchChar('-') ) {
                if ( !this.dirtyLine ) {
                    // treat HTML end-comment after possible whitespace
                    // after line start as comment-untill-eol
                    if ( this.matchChar('>')) {
                        this.skipLine();
                        continue retry;
                    }
                }
                c = Token.DEC;
            } else {
                c = Token.SUB;
            }
            this.dirtyLine = true;
            return c;

        default:
            parser.addError("msg.illegal.character");
            return Token.ERROR;
        }
    }
};



/**
 * Parser calls the method when it gets / or /= in literal context.
 */
proto.readRegExp = function ( startToken )
{
    if ( startToken === Token.ASSIGN_DIV ) {
        // Miss-scanned /=
        this.stringBuffer = ["/="];
    } else if ( startToken === Token.DIV ) {
        this.stringBuffer = ["/"];
    } else {
        Kit.codeBug();
    }

    var c;
    while ( (c = this.getChar()) !== '/' ) {
        if ( c === '\n' || c === EOF_CHAR ) {
            this.ungetChar(c);
            throw this.parser.reportError("msg.unterminated.re.lit");
        }
        if ( c === '\\' ) {
            this.addToString(c);
            c = this.getChar();
        }
        this.addToString(c);
    }
    this.addToString("/");

    while ( isIdentifierPart(c = this.getChar()) ) {
        this.addToString(c);
    }
    this.ungetChar(c);

    this.string = this.getStringFromBuffer();
}


proto.isXMLAttribute = function ( )
{
    return this.xmlIsAttribute;
};

proto.getFirstXMLToken = function ( )
{
    this.xmlOpenTagsCount = 0;
    this.xmlIsAttribute   = false;
    this.xmlIsTagContent  = false;
    this.ungetChar('<');
    return this.getNextXMLToken();
};

proto.getNextXMLToken = function ( )
{
    this.stringBuffer = []; // remember the XML

    for ( var c=this.getChar();  c !== EOF_CHAR;  c=this.getChar() ) {
        if ( this.xmlIsTagContent ) {
            switch ( c.charCodeAt(0) ) {
            case 0x3E:  // '>'
                this.addToString('>');
                this.xmlIsTagContent = false;
                this.xmlIsAttribute  = false;
                break;
            case 0x2F:  // '/'
                this.addToString('/');
                if ( this.matchChar('>') ) {
                    this.addToString('>');
                    this.xmlIsTagContent = false;
                    this.xmlOpenTagsCount--;
                }
                break;
            case 0x7B:  // '{'
                this.ungetChar('{');
                this.string = this.getStringFromBuffer();
                return Token.XML;
            case 0x27:  // "'"
            case 0x22:  // '"'
                this.addToString(c);
                if ( !this.readQuotedString(c) ) return Token.ERROR;
                break;
            case 0x3D:  // '='
                this.addToString('=');
                this.xmlIsAttribute = true;
                break;
            case 0x20:  // ' '
            case 0x09:  // '\t'
            // case 0x0D:  // '\r'  CR never comes here because of the implementation of getChar().
            case 0x0A:  // '\n'
                this.addToString(c);
                break;
            default:
                this.addToString(c);
                this.xmlIsAttribute = false;
                break;
            }

            if ( !this.xmlIsTagContent  &&  this.xmlOpenTagsCount === 0 ) {
                this.string = this.getStringFromBuffer();
                return Token.XMLEND;
            }
        } else {
            switch ( c.charCodeAt(0) ) {
            case 0x3C:  // '<'
                this.addToString('<');
                c = this.getChar();
                switch ( c.charCodeAt(0) ) {
                case 0x21:  // '!'
                    this.addToString('!');
                    c = this.getChar();
                    switch ( c.charCodeAt(0) ) {
                    case 0x2D:  // '-'
                        if ( this.getChar() === '-' ) {
                            this.addToString('--');
                            if ( !this.readXmlComment() ) return Token.ERROR;
                        } else {
                            this.parser.addError("msg.XML.bad.form");
                            return Token.ERROR;
                        }
                        break;
                    case 0x5B:  // '['
                        if ( this.getChar() === 'C' &&
                             this.getChar() === 'D' &&
                             this.getChar() === 'A' &&
                             this.getChar() === 'T' &&
                             this.getChar() === 'A' &&
                             this.getChar() === '['    )
                        {
                            this.addToString('[CDATA[');
                            if ( !this.readCDATA() ) return Token.ERROR;
                        } else {
                            this.parser.addError("msg.XML.bad.form");
                            return Token.ERROR;
                        }
                        break;
                    default:
                        this.ungetChar(c);
                        if( !this.readEntity() ) return Token.ERROR;
                        break;
                    }
                    break;
                case 0x3F:  // '?'
                    this.addToString('?');
                    if ( !this.readPI() ) return Token.ERROR;
                    break;
                case 0x2F:  // '/'
                    // End tag
                    this.addToString('/');
                    if ( this.xmlOpenTagsCount === 0 ) {
                        this.parser.addError("msg.XML.bad.form");
                        return Token.ERROR;
                    }
                    this.xmlIsTagContent = true;
                    this.xmlOpenTagsCount--;
                    break;
                default:
                    // Start tag
                    this.ungetChar(c);
                    this.xmlIsTagContent = true;
                    this.xmlOpenTagsCount++;
                    break;
                }
                break;
            case 0x7B:  // '{'
                this.ungetChar('{');
                this.string = this.getStringFromBuffer();
                return Token.XML;
            default:
                this.addToString(c);
                break;
            }
        }
    }

    this.parser.addError("msg.XML.bad.form");
    return Token.ERROR;
};

proto.readQuotedString = function ( quote )
{
    for ( var c=this.getChar();  c !== EOF_CHAR;  c=this.getChar() ) {
        this.addToString(c);
        if ( c === quote ) return true;
    }
    parser.addError("msg.XML.bad.form");
    return false;
};

proto.readXmlComment = function ( )
{
    for ( var c=this.getChar();  c !== EOF_CHAR; ) {
        this.addToString(c);
        if ( c === '-'  &&  this.matchChar('-') ) {
            this.addToString('-');
            if ( this.matchChar('>') ) {
                this.addToString('>');
                return true;
            } else {
                // Strictly, XMLComment MUST NOT include the sequence "--".
                // So, if the program execution is here, the source is 
                // syntactically wrong, according to ECMA367. However, we 
                // allow the sequence here, so that our syntax is super-set 
                // of the specification.
                c = '-';
                continue;
            }
        }
        c = this.getChar();
    }
    this.parser.addError("msg.XML.bad.form");
    return false;
};

proto.readCDATA = function ( )
{
    for ( var c=this.getChar();  c !== EOF_CHAR; ) {
        this.addToString(c);
        if ( c === ']'  &&  this.matchChar(']') ) {
            this.addToString(']');
            if ( this.matchChar('>') ) {
                this.addToString('>');
                return true;
            } else {
                c = ']';
                continue;
            }
        }
        c = this.getChar();
    }
    this.parser.addError("msg.XML.bad.form");
    return false;
};

proto.readEntity = function ( )
{
    var declTags = 1;
    for ( var c=this.getChar();  c !== EOF_CHAR;  c=this.getChar() ) {
        this.addToString(c);
        switch ( c ) {
        case '<':
            declTags++;
            break;
        case '>':
            declTags--;
            if ( declTags === 0 ) return true;
            break;
        }
    }
    this.parser.addError("msg.XML.bad.form");
    return false;
};

proto.readPI = function ( )
{
    for ( var c=this.getChar();  c !== EOF_CHAR;  c=this.getChar() ) {
        this.addToString(c);
        if ( c === '?'  &&  this.matchChar('>') ) {
            this.addToString('>');
            return true;
        }
    }
    this.parser.addError("msg.XML.bad.form");
    return false;
};


proto.getStringFromBuffer = function ( )
{
    return this.stringBuffer.join("");
};

proto.addToString = function ( /* variable arguments */ )
{
    this.stringBuffer.push.apply(this.stringBuffer, arguments);
};

proto.ungetChar = function ( c )
{
    // can not unread past across line boundary
    if ( this.ungetBuffer.length && this.ungetBuffer[this.ungetBuffer.length-1] == '\n') Kit.codeBug();
    this.ungetBuffer.push(c);
};

proto.matchChar = function ( test )
{
    var c = this.getChar();
    if ( c === test ) {
        return true;
    } else {
        this.ungetChar(c);
        return false;
    }
};

proto.peekChar = function ( )
{
    var c = this.getChar();
    this.ungetChar(c);
    return c;
};

proto.getChar = function ( )
{
    if ( this.ungetBuffer.length ) return this.ungetBuffer.pop();

    for ( ;; ) {
        if ( this.sourceCursor == this.sourceEnd ) {
            this.hitEOF = true;
            return EOF_CHAR;
        }
        var c = this.sourceString.charAt(this.sourceCursor++);

        if ( this.lineEndChar ) {
            if ( this.lineEndChar == '\r' && c == '\n') {
                this.lineEndChar = '\n';
                continue;
            }
            this.lineEndChar = undefined;
            this.lineStart   = this.sourceCursor - 1;
            this.lineno++;
        }

        if ( isLineTerminator(c) ) {
            this.lineEndChar = c;
            c = '\n';
        }
        if ( isFormatChar(c) ) {
            continue;
        }
        return c;
    }
};

proto.skipLine = function ( )
{
    // skip to end of line
    var c;
    while ((c=this.getChar()) != EOF_CHAR && c != '\n') { }
    this.ungetChar(c);
};

proto.getOffset = function ( )
{
    var n = this.sourceCursor - this.lineStart;
    if ( this.lineEndChar ) { --n; }
    return n;
};

proto.getLine = function ( )
{
    var lineEnd = this.sourceCursor;
    if ( this.lineEndChar ) {
        --lineEnd;
    } else {
        for (; lineEnd != this.sourceEnd; ++lineEnd) {
            var c = this.sourceString.charAt(lineEnd);
            if ( isLineTerminator(c) ) {
                break;
            }
        }
    }
    return this.sourceString.substring(this.lineStart, lineEnd);
};


            return {
                TokenStream: TokenStream
            };
        }();
    }
}.call(null) ) {
    this.Concurrent.Thread.Compiler.TokenStream = TokenStream;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Concurrent.Thread.Compiler.CssConvert === undefined ) this.Concurrent.Thread.Compiler.CssConvert = undefined;
with ( function(){
with ( Data.Cons ) {
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


NAMESPACE = 'Concurrent.Thread.Compiler';












var Css = "Concurrent.Thread.Compiler.CssConvert";



function CssConvert ( func ) {
    return func[Css]();
}


Statement.prototype[Css] = function ( ) {
    Kit.codeBug("unimplemented '" + Css + "' method for: " + this);
};

EmptyStatement.prototype[Css] = function ( ) {
    return this;
};

Block.prototype[Css] = function ( ) {
    var head = last = cons(null, nil());
    for ( var c=this.body;  !c.isNil();  c=c.cdr ) {
        last = last.cdr = cons(c.car[Css](), last.cdr);
    }
    return new Block(this.labels, head.cdr, this.lineno, this.source);
};

ExpStatement.prototype[Css] = function ( ) {
    return new ExpStatement(this.labels, this.exp[Css](), this.lineno, this.source);
};

VarStatement.prototype[Css] = function ( ) {
    var decls = [];
    for ( var i=0;  i < this.decls.length;  i++ ) {
        decls[i] = {
            id : this.decls[i].id,
            exp: this.decls[i].exp ? this.decls[i].exp[Css]() : null
        };
    }
    return new VarStatement(this.labels, decls, this.lineno, this.source);
};

IfStatement.prototype[Css] = function ( ) {
    return new IfStatement(this.labels, this.cond[Css](), this.body[Css](), this.lineno, this.source);
};

IfElseStatement.prototype[Css] = function ( ) {
    return new IfElseStatement(this.labels, this.cond[Css](), this.tbody[Css](), this.fbody[Css](), this.lineno, this.source);
};

DoWhileStatement.prototype[Css] = function ( ) {
    return new DoWhileStatement(this.labels, this.body[Css](), this.cond[Css](), this.lineno, this.source);
};

WhileStatement.prototype[Css] = function ( ) {
    return new WhileStatement(this.labels, this.cond[Css](), this.body[Css](), this.lineno, this.source);
};

ForStatement.prototype[Css] = function ( ) {
    return new ForStatement(
        this.labels,
        this.init ? this.init[Css]() : null,
        this.cond ? this.cond[Css]() : null,
        this.incr ? this.incr[Css]() : null,
        this.body[Css](),
        this.lineno,
        this.source
    );
};

ForVarStatement.prototype[Css] = function ( ) {
    var decls = [];
    for ( var i=0;  i < this.decls.length;  i++ ) {
        decls[i] = {
            id : this.decls[i].id,
            exp: this.decls[i].exp ? this.decls[i].exp[Css]() : null
        };
    }
    return new ForVarStatement(
        this.labels,
        decls,
        this.cond ? this.cond[Css]() : null,
        this.incr ? this.incr[Css]() : null,
        this.body[Css](),
        this.lineno,
        this.source
    );
};

ForInStatement.prototype[Css] = function ( ) {
    return new ForInStatement(this.labels, this.lhs[Css](), this.exp[Css](), this.body[Css](), this.lineno, this.source);
};

ForInVarStatement.prototype[Css] = function ( ) {
    var decl = {
        id : this.decl.id,
        exp: this.decl.exp ? this.decl.exp[Css]() : null
    };
    return new ForInVarStatement(this.labels, decl, this.exp[Css](), this.body[Css](), this.lineno, this.source);
};

ForEachStatement.prototype[Css] = function ( ) {
    return new ForEachStatement(this.labels, this.lhs[Css](), this.exp[Css](), this.body[Css](), this.lineno, this.source);
};

ForEachVarStatement.prototype[Css] = function ( ) {
    var decl = {
        id : this.decl.id,
        exp: this.decl.exp ? this.decl.exp[Css]() : null
    };
    return new ForEachVarStatement(this.labels, decl, this.exp[Css](), this.body[Css](), this.lineno, this.source);
};

ContinueStatement.prototype[Css] = function ( ) {
    return this;
};

BreakStatement.prototype[Css] = function ( ) {
    return this;
};

ReturnStatement.prototype[Css] = function ( ) {
    if ( !this.exp ) return this;
    return new ReturnStatement(this.labels, this.exp[Css](), this.lineno, this.source);
};

WithStatement.prototype[Css] = function ( ) {
    return new WithStatement(this.labels, this.exp[Css](), this.body[Css](), this.lineno, this.source);
};

SwitchStatement.prototype[Css] = function ( ) {
    var head = last = cons(null, nil());
    for ( var c=this.clauses;  !c.isNil();  c=c.cdr ) {
        last = last.cdr = cons(c.car[Css](), last.cdr);
    }
    return new SwitchStatement(this.labels, this.exp[Css](), head.cdr, this.lineno, this.source);
};

CaseClause.prototype[Css] = function ( ) {
    var head = last = cons(null, nil());
    for ( var c=this.body;  !c.isNil();  c=c.cdr ) {
        last = last.cdr = cons(c.car[Css](), last.cdr);
    }
    return new CaseClause(this.exp[Css](), head.cdr, this.lineno, this.source);
};

DefaultClause.prototype[Css] = function ( ) {
    var head = last = cons(null, nil());
    for ( var c=this.body;  !c.isNil();  c=c.cdr ) {
        last = last.cdr = cons(c.car[Css](), last.cdr);
    }
    return new DefaultClause(head.cdr, this.lineno, this.source);
};

ThrowStatement.prototype[Css] = function ( ) {
    return new ThrowStatement(this.labels, this.exp[Css](), this.lineno, this.source);
};

TryCatchStatement.prototype[Css] = function ( ) {
    return new TryCatchStatement(this.labels, this.tryBlock[Css](), this.variable, this.catchBlock[Css](), this.lineno, this.source);
};

TryFinallyStatement.prototype[Css] = function ( ) {
    return new TryFinallyStatement(this.labels, this.tryBlock[Css](), this.finallyBlock[Css](), this.lineno, this.source);
};

TryCatchFinallyStatement.prototype[Css] = function ( ) {
    return new TryCatchFinallyStatement(this.labels, this.tryBlock[Css](), this.variable, this.catchBlock[Css](), this.finallyBlock[Css](), this.lineno, this.source);
};

TryCatchListStatement.prototype[Css] = function ( ) {
    if ( this.catchList.isNil() ) {  // no more catch-guard
        var block = this.tryBlock[Css]();
        block.labels = this.labels;
        return block;
    } else if ( this.catchList.car.cond ) {  // one or more qualified catch-guard
        var guard = this.catchList.car;
        return new TryCatchStatement(
            this.labels,
            this.tryBlock[Css](),
            guard.variable,
            new Block([], list(
                new IfElseStatement(
                    [],
                    guard.cond[Css](),
                    guard.block[Css](),
                    (new TryCatchListStatement(
                        [],
                        new Block([], list(new ThrowStatement([], guard.variable))),
                        this.catchList.cdr,
                        this.catchList.cdr.lineno, this.cdr.cdr.source
                    ))[Css](),
                    guard.lineno, guard.source
                )
            ))
        );
    } else {  // (only one) default catch-guard
        var guard = this.catchList.car;
        return new TryCatchStatement(this.labels, this.tryBlock[Css](), guard.variable, guard.block[Css](), this.lineno, this.source);
    }
};

TryCatchListFinallyStatement.prototype[Css] = function ( ) {
    return new TryFinallyStatement(
        this.labels,
        new Block([], list(
            (new TryCatchListStatement([],
                this.tryBlock,
                this.catchList,
                this.lineno,
                this.source
            ))[Css]()
        ), this.lineno, this.source),
        this.finallyBlock[Css](),
        this.lineno, this.source
    );
};

FunctionDeclaration.prototype[Css] = function ( ) {
    var head = last = cons(null, nil());
    for ( var c=this.body;  !c.isNil();  c=c.cdr ) {
        last = last.cdr = cons(c.car[Css](), last.cdr);
    }
    return new FunctionDeclaration(this.labels, this.name, this.params, head.cdr, this.lineno, this.source);
};



Expression.prototype[Css] = Statement.prototype[Css];

UnaryExpression.prototype[Css] = function ( ) {
    return new this.constructor( this.exp[Css]() );
};

BinaryExpression.prototype[Css] = function ( ) {
    return new this.constructor(this.left[Css](), this.right[Css]());
};

Literal.prototype[Css]        = 
Identifier.prototype[Css]     = 
ThisExpression.prototype[Css] = 
Elision.prototype[Css]        = function ( ) {
    return this;
};

ArrayInitializer.prototype[Css] = function ( ) {
    var elems = [];
    for ( var i=0;  i < this.elems.length;  i++ ) {
        elems[i] = this.elems[i][Css]();
    }
    return new ArrayInitializer(elems);
};

ObjectInitializer.prototype[Css] = function ( ) {
    var pairs = [];
    for ( var i=0;  i < this.pairs.length;  i++ ) {
        pairs[i] = {prop:this.pairs[i].prop, exp:this.pairs[i].exp[Css]()};
    }
    return new ObjectInitializer(pairs);
};

FunctionExpression.prototype[Css] = function ( ) {
    var head = last = cons(null, nil());
    for ( var c=this.body;  !c.isNil();  c=c.cdr ) {
        last = last.cdr = cons(c.car[Css](), last.cdr);
    }
    return new FunctionExpression(this.name, this.params, head.cdr);
};

DotAccessor.prototype[Css] = function ( ) {
    return new DotAccessor(this.base[Css](), this.prop);
};

NewExpression.prototype[Css]  =
CallExpression.prototype[Css] = function ( ) {
    var args = [];
    for ( var i=0;  i < this.args.length;  i++ ) {
        args[i] = this.args[i][Css]();
    }
    return new this.constructor(this.func[Css](), args);
};

ConditionalExpression.prototype[Css] = function ( ) {
    return new ConditionalExpression(this.cond[Css](), this.texp[Css](), this.fexp[Css]());
};

            return {
                CssConvert: CssConvert
            };
        }();
    }
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.CssConvert = CssConvert;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Concurrent.Thread.Compiler.IntermediateLanguage || (typeof this.Concurrent.Thread.Compiler.IntermediateLanguage != 'object' && typeof this.Concurrent.Thread.Compiler.IntermediateLanguage != 'function') ) this.Concurrent.Thread.Compiler.IntermediateLanguage = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( !this.Data.Cons.Util || (typeof this.Data.Cons.Util != 'object' && typeof this.Data.Cons.Util != 'function') ) this.Data.Cons.Util = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Concurrent.Thread.Compiler.IntermediateLanguage.Function === undefined ) this.Concurrent.Thread.Compiler.IntermediateLanguage.Function = undefined;
    if ( this.Concurrent.Thread.Compiler.IntermediateLanguage.Block === undefined ) this.Concurrent.Thread.Compiler.IntermediateLanguage.Block = undefined;
    if ( this.Concurrent.Thread.Compiler.IntermediateLanguage.GotoBlock === undefined ) this.Concurrent.Thread.Compiler.IntermediateLanguage.GotoBlock = undefined;
    if ( this.Concurrent.Thread.Compiler.IntermediateLanguage.CallBlock === undefined ) this.Concurrent.Thread.Compiler.IntermediateLanguage.CallBlock = undefined;
    if ( this.Concurrent.Thread.Compiler.IntermediateLanguage.NewBlock === undefined ) this.Concurrent.Thread.Compiler.IntermediateLanguage.NewBlock = undefined;
    if ( this.Concurrent.Thread.Compiler.IntermediateLanguage.Statement === undefined ) this.Concurrent.Thread.Compiler.IntermediateLanguage.Statement = undefined;
    if ( this.Concurrent.Thread.Compiler.IntermediateLanguage.ExpStatement === undefined ) this.Concurrent.Thread.Compiler.IntermediateLanguage.ExpStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.IntermediateLanguage.CondStatement === undefined ) this.Concurrent.Thread.Compiler.IntermediateLanguage.CondStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.IntermediateLanguage.RecvStatement === undefined ) this.Concurrent.Thread.Compiler.IntermediateLanguage.RecvStatement = undefined;
    if ( this.Concurrent.Thread.Compiler.IntermediateLanguage.EnumStatement === undefined ) this.Concurrent.Thread.Compiler.IntermediateLanguage.EnumStatement = undefined;
with ( function(){
with ( Data.Cons.Util ) {
with ( Data.Cons ) {
with ( Concurrent.Thread.Compiler.IntermediateLanguage ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Concurrent.Thread.Compiler.IntermediateLanguage';














function Function ( name, params, vars, body, start ) {
    this.name   = name;    // Identifier | Null
    this.params = params;  // [Identifier]
    this.vars   = vars;    // [Identifier]
    this.body   = body;    // <Block>
    this.start  = start;   // Block
}

Function.prototype.toString = function ( ) {
    return  [ "function ", this.name, "( ", this.params.join(", "), " ) {\n",
              "  var ", this.vars.join(", "), ";\n",
              this.body.join("\n").replace(/^/mg, "  "),
              "\n}" ].join("");
};



var block_id = 0;

function Block ( scopes, body, target, exception ) {
    this.id        = "label" + block_id++;
    this.scopes    = scopes;     // [Expression]
    this.body      = body;       // <Statement>
    this.target    = target;     // Block | "return" | "throw"
    this.exception = exception;  // Block | "return" | "throw"
}

var proto = Block.prototype;

proto.toString = function ( ) {
    Kit.codeBug('"toString" is not implemented for ', this.constructor);
};

proto.appendStatement = function ( /* variable arguments */ ) {
    var args = arguments;
    if ( this.body.isNil() ) {
        this.body = cons(arguments[0], this.body);
        args = Array.prototype.slice.call(arguments, 1, arguments.length);
    } else {
        adder(this.body).apply(null, args);
    }
};

proto.prependStatement = function ( /* variable arguments */ ) {
    for ( var i=arguments.length-1;  i >= 0;  i-- ) {
        this.body = cons(arguments[i], this.body);
    }
};


function stringify ( b ) {
    if ( b instanceof Block ) {
        return b.id;
    } else {
        return '"' + b + '"';
    }
}



function GotoBlock ( scopes, body, arg, target, exception ) {
    Block.call(this, scopes, body, target, exception);
    this.arg = arg;
}

var proto = GotoBlock.prototype = new Block();

proto.constructor = GotoBlock;

proto.toString = function ( ) {
    return [ this.id, "([", this.scopes.join(", "), "], ", stringify(this.exception), "): {\n",
             this.body.join("\n").replace(/^/mg, "  "), "\n",
             "  goto ", this.arg, " -> ", stringify(this.target), "\n",
             "}" ].join("");
};



function CallBlock ( scopes, body, this_val, func, args, target, exception ) {
    Block.call(this, scopes, body, target, exception);
    this.this_val  = this_val;   // Expression
    this.func      = func;       // Expression
    this.args      = args;       // [Expression]
}

var proto = CallBlock.prototype = new Block();

proto.constructor = CallBlock;

proto.toString = function ( ) {
    return [ this.id, "([", this.scopes.join(", "), "], ", stringify(this.exception), "): {\n",
             this.body.join("\n").replace(/^/mg, "  "), "\n",
             "  call ", this.this_val, ".", this.func, "(", this.args.join(", "), ") -> ", stringify(this.target), "\n",
             "}" ].join("");
};



function NewBlock ( scopes, body, func, args, target, exception ) {
    Block.call(this, scopes, body, target, exception);
    this.func      = func;       // Expression
    this.args      = args;       // [Expression]
}

var proto = NewBlock.prototype = new Block();

proto.constructor = NewBlock;

proto.toString = function ( ) {
    return [ this.id, "([", this.scopes.join(", "), "], ", stringify(this.exception), "): {\n",
             this.body.join("\n").replace(/^/mg, "  "), "\n",
             "  new ", this.func, "(", this.args.join(", "), ") -> ", stringify(this.target), "\n",
             "}" ].join("");
};




function Statement ( ) {
    // This is kind of interface.
}

Statement.prototype.toString = function ( ) {
    Kit.codeBug('"toString" is not implemented for ', this.constructor);
};



function ExpStatement ( e ) {
    this.exp = e;  // Expression
}

var proto = ExpStatement.prototype = new Statement();

proto.constructor = ExpStatement;

proto.toString = function ( ) {
    return this.exp + ";";
};



function CondStatement ( c, t ) {
    this.cond   = c;  // Expression
    this.target = t;  // Block
}

var proto = CondStatement.prototype = new Statement();

proto.constructor = CondStatement;

proto.toString = function ( ) {
    return [ "if ", this.cond, " -> ", stringify(this.target), ";" ].join("");
};



function RecvStatement ( a ) {
    this.assignee = a;  // Identifier | DotAccessor | BracketAccessor
}

var proto = RecvStatement.prototype = new Statement();

proto.constructor = RecvStatement;

proto.toString = function ( ) {
    return [ "recv ", this.assignee, ";" ].join("");
};



function EnumStatement ( e, a ) {
    this.exp      = e;  // Expression
    this.assignee = a;  // Identifier | DotAccessor | BracketAccessor
}

var proto = EnumStatement.prototype = new Statement();

proto.constructor = EnumStatement;

proto.toString = function ( ) {
    return [ "enum ", this.assignee, " <- ", this.exp, ";" ].join("");
};

            return {
                Block: Block, RecvStatement: RecvStatement, GotoBlock: GotoBlock, Function: Function, NewBlock: NewBlock, ExpStatement: ExpStatement, CallBlock: CallBlock, EnumStatement: EnumStatement, Statement: Statement, CondStatement: CondStatement
            };
        }();
    }
}
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.IntermediateLanguage.Block = Block;
    this.Concurrent.Thread.Compiler.IntermediateLanguage.RecvStatement = RecvStatement;
    this.Concurrent.Thread.Compiler.IntermediateLanguage.GotoBlock = GotoBlock;
    this.Concurrent.Thread.Compiler.IntermediateLanguage.Function = Function;
    this.Concurrent.Thread.Compiler.IntermediateLanguage.NewBlock = NewBlock;
    this.Concurrent.Thread.Compiler.IntermediateLanguage.ExpStatement = ExpStatement;
    this.Concurrent.Thread.Compiler.IntermediateLanguage.CallBlock = CallBlock;
    this.Concurrent.Thread.Compiler.IntermediateLanguage.EnumStatement = EnumStatement;
    this.Concurrent.Thread.Compiler.IntermediateLanguage.Statement = Statement;
    this.Concurrent.Thread.Compiler.IntermediateLanguage.CondStatement = CondStatement;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( this.Concurrent.Thread.Compiler.CuConvert === undefined ) this.Concurrent.Thread.Compiler.CuConvert = undefined;
with ( function(){
with ( Data.Cons ) {
with ( Concurrent.Thread ) {
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


NAMESPACE = 'Concurrent.Thread.Compiler';



///@require Concurrent.Thread.Compiler.Expression
///@require Concurrent.Thread.Compiler.Statement

///@require Concurrent.Thread.Compiler.IdentifierMap

var IL = Concurrent.Thread.Compiler.IntermediateLanguage;






function CuConvert ( func ) {
    // "map" below actually represents context of conversion.
    // Essentially, it maps old-block-ID => optimized-block. But, if the
    // value of a key is of type Array, it means that the block idenfied
    // with the ID is currently in process of the conversion (that means
    // "target" link is cyclic), and that each element of the array is a
    // GotoBlock whose "target" property is to be overwritten with the
    // optimized version of the block identified with old-block-ID.
    var map = {};
    func.body.forEach(function( it ){
        if ( !map.hasOwnProperty(it.id) ) {
            unify_block(it, map);
        }
    });
    func.body = nil();
    for ( var i in map ) {
        if ( map.hasOwnProperty(i) ){
            var block = map[i];
            replace_target(block, "exception", map);
            block.body.forEach(function( it ){
                if ( it instanceof IL.CondStatement ) {
                    replace_target(it, "target", map);
                }
            });
            func.body = cons(map[i], func.body);
        }
    }
    func.start = map[func.start.id];
    return func;
}

function unify_block ( block, map ) {
    map[block.id] = [];
    var next = block.target;
    if ( next instanceof IL.Block ) {
        if ( map.hasOwnProperty(next.id) ) {
            if ( map[next.id] instanceof Array ) {
                map[next.id].push(block);
            } else {
                block.target = map[next.id];
            }
        } else {
            block.target = unify_block(next, map);
        }
    }
    var unified;
    if ( can_unify(block) ) {
        next = block.target;
        switch ( next.constructor ) {
            case IL.GotoBlock:
                unified = new IL.GotoBlock(next.scopes, next.body, next.arg, next.target, next.exception);
                break;
            case IL.CallBlock:
                unified = new IL.CallBlock(next.scopes, next.body, next.this_val, next.func, next.args, next.target, next.exception);
                break;
            case IL.NewBlock:
                unified = new IL.NewBlock(next.scopes, next.body, next.func, next.args, next.target, next.exception);
                break;
            default:
                throw new Error("Concurrent.Thread.Compiler.CuConvert: internal error");
        }
        unified.body = concat_list(block.body, next.body);
        if ( unified.target instanceof IL.Block  &&  map.hasOwnProperty(unified.target.id)  &&  map[unified.target.id] instanceof Array ) {
            map[unified.target.id].push(unified);
        }
    } else {
        unified = block;
    }
    map[block.id].forEach(function( it ){
        it.target = unified;
    });
    map[block.id] = unified;
    return unified;
}

function can_unify ( block ) {
    if ( !(block instanceof IL.GotoBlock)           ) return false;
    var next = block.target;
    if ( !(next instanceof IL.Block)                ) return false;
    if ( block === next                             ) return false;
    if ( block.exception !== next.exception         ) return false;
    if ( block.scopes.length !== next.scopes.length ) return false;
    var length = block.exception.length;
    for ( var i=0;  i < length;  i++ ) {
        if ( block.scopes[i] !== next.scopes[i] ) return false;
    }
    return true;
}

function replace_target ( base, prop, map ) {
    var target = base[prop];
    if ( target === "return" || target === "throw" ) {
        return;
    }
    if ( !(target instanceof IL.Block) ) {
        throw new Error(NAMESPACE + ".CuConvert: internal error - `" + target + "' is not of type IntermediateLanguage.Block");
    }
    var target_id = target.id;
    if ( map.hasOwnProperty(target_id) ) {
        base[prop] = map[target_id];
    }
}


function concat_list ( x, y ) {
    return concat_list_aux(x, concat_list_aux(nil(), y));
}

function concat_list_aux ( list, acc ) {
	if ( list.isNil() ) {
		return acc;
	} else {
		return cons(list.car, concat_list_aux(list.cdr, acc));
	}
}

            return {
                CuConvert: CuConvert
            };
        }();
    }
}
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.CuConvert = CuConvert;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( !this.Data.Cons.Util || (typeof this.Data.Cons.Util != 'object' && typeof this.Data.Cons.Util != 'function') ) this.Data.Cons.Util = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Concurrent.Thread.Compiler.CzConvert === undefined ) this.Concurrent.Thread.Compiler.CzConvert = undefined;
with ( function(){
with ( Data.Cons.Util ) {
with ( Data.Cons ) {
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


NAMESPACE = 'Concurrent.Thread.Compiler';






var IL = Concurrent.Thread.Compiler.IntermediateLanguage;









var Cz = "$Concurrent_Thread_Compiler_CzConvert";

var PREFIX   = "$Concurrent_Thread_";
var var_this = new Identifier(PREFIX+"this");
var var_args = new Identifier(PREFIX+"arguments");
var var_cont = new Identifier(PREFIX+"continuation");
var var_self = new Identifier(PREFIX+"self");
var var_compiled     = new Identifier(PREFIX+"compiled");
var var_intermediate = new Identifier(PREFIX+"intermediate");

var name_arguments = new Identifier("arguments");
var name_prototype = new Identifier("prototype");
var name_apply     = new Identifier("apply");
var name_procedure = new Identifier("procedure");
var name_this_val  = new Identifier("this_val");
var name_exception = new Identifier("exception");

var var_null_function = new Identifier(PREFIX+"null_function");
var null_function = new FunctionDeclaration([], var_null_function, [], nil());




function CzConvert ( func ) {
    var body = inner_function(func);
    return new FunctionExpression(
               null,
               [var_this, var_args, var_cont],
               list(
                   new ReturnStatement([],
                       new CallExpression(
                           new DotAccessor(body, name_apply),
                           [var_this, var_args]
                       )
                   )
               )
           );
}




var arguments_callee = new DotAccessor(name_arguments, new Identifier("callee"));

function inner_function ( func ) {
    var blocks = func.body.map(function(it){ return it[Cz](); });
    blocks = cons( var_declaration(func.vars),
             cons( null_function,
             cons( make_assign(var_args, name_arguments),
             cons( make_assign(arguments_callee, var_self),
                   blocks ) ) ) );
    adder(blocks)( make_return(func.start) );
    return new FunctionExpression(null, func.params, blocks);
}

function var_declaration ( vars ) {
    if ( !vars.length ) return new EmptyStatement([]);
    var decls = [];
    vars.forEach(function( it ){
        decls.push({ id:it, exp:null });
    });
    return new VarStatement([], decls);
}


function make_assign ( lhs, rhs ) {
    return new ExpStatement( [], new SimpleAssignExpression(lhs, rhs) );
}


var var_cont_ex = new DotAccessor(var_cont, name_exception);

function target_to_name ( b ) {
    if ( b instanceof IL.Block ) {
        return new Identifier(PREFIX + b.id);
    } else if ( b === "return" ) {
        return var_cont;
    } else if ( b === "throw" ) {
        return var_cont_ex;
    } else {
        Kit.codeBug("invalid target");
    }
}


var undefinedExp = new VoidExpression(new Literal(0));
var name_continuation = new Identifier("continuation");
var name_timeout      = new Identifier("timeout");
var name_ret_val      = new Identifier("ret_val");

function make_return ( continuation, ret_val ) {
    return new ReturnStatement([], new ObjectInitializer([
               { prop: name_continuation, exp: target_to_name(continuation) },
               { prop: name_ret_val     , exp: ret_val || undefinedExp },
               { prop: name_timeout     , exp: undefinedExp            }
           ]) );
}


var assign_arguments = make_assign(name_arguments, var_args);

function make_continuation ( block, body ) {
    body = new Block([], body);
    for ( var i=block.scopes.length-1;  i >= 0;  i-- ) {
        body = new WithStatement([], block.scopes[i], body);
    }
    return new VarStatement([], [{
        id : target_to_name(block),
        exp: new ObjectInitializer([
                 {prop: name_procedure, exp: new FunctionExpression(null, [var_intermediate], list(assign_arguments, body))},
                 {prop: name_this_val , exp: new ThisExpression() },
                 {prop: name_exception, exp: target_to_name(block.exception) }
             ])
    }]);
}



IL.GotoBlock.prototype[Cz] = function ( ) {
    var body = this.body.map(function( it ) {
        return it[Cz]();
    });
    body = cons(null, body);
    adder(body)( make_return(this.target, this.arg) );
    return make_continuation(this, body.cdr);
};


var string_object   = new StringLiteral('"object"');
var string_function = new StringLiteral('"function"');

IL.CallBlock.prototype[Cz] = function ( ) {
    var body = this.body.map(function( it ) {
        return it[Cz]();
    });
    body = cons(null, body);
    adder(body)( new IfElseStatement([],
        new AndExpression(
            this.func,
            new StrictEqualExpression(
                new TypeofExpression(
                    new DotAccessor(this.func, var_compiled)
                ),
                string_function
            )
        ),
        new ReturnStatement([],
            new CallExpression(
                new DotAccessor(this.func, var_compiled),
                [
                    this.this_val,
                    new ArrayInitializer(this.args),
                    target_to_name(this.target)
                ]
            )
        ),
        make_return(
            this.target,
            new CallExpression(this.func, this.args)
        )
    ) );
    return make_continuation(this, body.cdr);
};


IL.NewBlock.prototype[Cz] = function ( ) {
    var body = this.body.map(function( it ) {
        return it[Cz]();
    });
    body = cons(null, body);
    /*  // Construct the following code-tree.
        if ( CONSTRUCTOR && typeof CONSTRUCTOR.$Concurrent_Thread_compiled == "function" ) {
        $Concurrent_Thread_null_function.prototype = CONSTRUCTOR.prototype;
        $Concurrent_Thread_this = new $Concurrent_Thread_null_function();
        return CONSTRUCTOR.$Concurrent_Thread_compiled(
                   $Concurrent_Thread_this,
                   [ARG1, ARG2, ...],
                   { procedure: function($Concurrent_Thread_intermediate){
                    if ( !($Concurrent_Thread_intermediate && (typeof $Concurrent_Thread_intermediate === "object" || typeof $Concurrent_Thread_intermediate === "function") )
                      $Concurrent_Thread_intermediate = $Concurrent_Thread_this;
                    $Concurrent_Thread_this = null;  // encourages GC
                       return { continuation: CONTINUATION,
                                ret_val     : $Concurrent_Thread_intermediate,
                                timeout     : void 0                          };
                   }, this_val: this, exception: EXCEPTION }
               );
        } else {
            return { continuation: CONTINUATION,
                     ret_val     : new CONSTRUCTOR(ARG1, ARG2...),
                     timeout     : void 0
                   };
        } 
     */
    adder(body)( new IfElseStatement([],
        new AndExpression(
            this.func,
            new StrictEqualExpression(
                new TypeofExpression(
                    new DotAccessor(this.func, var_compiled)
                ),
                string_function
            )
        ),
        new Block([],
            list( 
                make_assign( new DotAccessor(var_null_function, name_prototype),
                             new DotAccessor(this.func        , name_prototype) ),
                make_assign( var_this, new NewExpression(var_null_function, []) ),
                new ReturnStatement([],
                    new CallExpression(
                        new DotAccessor(this.func, var_compiled),
                        [
                            var_this,
                            new ArrayInitializer(this.args),
                            new ObjectInitializer([
                                {prop: name_procedure, exp: new FunctionExpression(null, [var_intermediate], list(
                                    new IfStatement([],
                                        new NotExpression(
                                            new AndExpression(
                                                var_intermediate,
                                                new OrExpression(
                                                    new StrictEqualExpression(new TypeofExpression(var_intermediate), string_object),
                                                    new StrictEqualExpression(new TypeofExpression(var_intermediate), string_function)
                                                )
                                            )
                                        ),
                                        make_assign(var_intermediate, var_this)
                                    ),
                                    make_assign(var_this, new NullLiteral()),
                                    make_return(this.target, var_intermediate)
                                ))},
                                {prop: name_this_val , exp: new ThisExpression()},
                                {prop: name_exception, exp: target_to_name(this.exception)}
                             ])
                        ]
                    )
                )
            )
        ),
        make_return(this.target, new NewExpression(this.func, this.args))
    ) );
    return make_continuation(this, body.cdr);
};


IL.ExpStatement.prototype[Cz] = function ( ) {
    return new ExpStatement([], this.exp);
};


IL.CondStatement.prototype[Cz] = function ( ) {
    return new IfStatement([], this.cond, make_return(this.target));
};


IL.RecvStatement.prototype[Cz] = function ( ) {
    return make_assign(this.assignee, var_intermediate);
};


var name_push = new Identifier("push");

IL.EnumStatement.prototype[Cz] = function ( ) {
    return new Block([], list(
        make_assign(var_this, new ArrayInitializer([])),
        new ForInStatement([], var_intermediate, this.exp, 
            new ExpStatement([], 
                new CallExpression(
                    new DotAccessor(var_this, name_push),
                    [var_intermediate]
                )
            )
        ),
        make_assign(this.assignee, var_this),
        make_assign(var_this, new NullLiteral())
    ));
};

            return {
                CzConvert: CzConvert
            };
        }();
    }
}
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.CzConvert = CzConvert;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( !this.Data.Cons.Util || (typeof this.Data.Cons.Util != 'object' && typeof this.Data.Cons.Util != 'function') ) this.Data.Cons.Util = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( this.Concurrent.Thread.Compiler.CfConvert === undefined ) this.Concurrent.Thread.Compiler.CfConvert = undefined;
    if ( this.Concurrent.Thread.Compiler.CyclicExceptionHandlerError === undefined ) this.Concurrent.Thread.Compiler.CyclicExceptionHandlerError = undefined;
with ( function(){
with ( Data.Cons.Util ) {
with ( Data.Cons ) {
with ( Data.Error ) {
with ( Concurrent.Thread ) {
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


NAMESPACE = 'Concurrent.Thread.Compiler';








var IL = Concurrent.Thread.Compiler.IntermediateLanguage;












var Cf = "$Concurrent_Thread_Compiler_Cf";


function CfConvert ( func ) {
    var cache = new IdentifierMap();
    var start = CfTarget(func.start, cache);
    var cache2 = new IdentifierMap();
    cache.values().forEach(function( it ){
        cache2.put(new Identifier(it.id), it);
    });
    var body  = cons(null, nil());
    append = adder(body);
    cacheToList(cache2).forEach(function( it ){
        return append(cache2.get(it));
    });
    return new IL.Function(func.name, func.params, func.vars, body.cdr, start);
}


function cacheToList ( cache ) {
    // Resolves exception-dependency and sort blocks in valid order.
    var blocks = [];
    var depends = new IdentifierMap();
    cache.values().forEach(function( it ){
        blocks.push(it);
        depends.put(
            new Identifier(it.id),
            it.exception instanceof IL.Block ? new Identifier(it.exception.id) : undefined
        );
    });
    return check_cyclic(depends);
}



var CyclicExceptionHandlerError = Error.extend(
    function ( $super, message ) { $super(message); },
    {name: NAMESPACE + ".CyclicExceptionHandlerError"}
);

function check_cyclic ( depends ) {
    var ok = {};
    function traverse ( id, path ) {
        if ( ok[id] ) return "OK";
        var next = depends.get(id);
        if ( !next ) {
            ok[id] = true;
            path.push(id);
            return "OK";
        }
        path.forEach(function( it ){
            if ( it.valueOf() == id.valueOf() ) {
                throw new CyclicExceptionHandlerError("cyclic exception handler: " + path.concat([id]).join(" -> "));
            }
        });
        path.push(id);
        traverse(next, path);
        ok[id] = true;
        return "OK";
    }
    var result = [];
    depends.keys().forEach(function( it ){
        var path = [];
        traverse(it, path);
        result = path.concat(result);
    });
    return result.reverse();
}


function CfTarget ( b, cache ) {
    if ( b === "return" || b === "throw" ) return b;
    if ( cache.get(new Identifier(b.id)) ) return cache.get(new Identifier(b.id));
    return b[Cf](cache);
}


IL.GotoBlock.prototype[Cf] = function ( cache ) {
    var block = new IL.GotoBlock();
    cache.put(new Identifier(this.id), block);
    block.scopes    = this.scopes.map(function( it ){ return it[Cf](cache); });
    block.body      = this.body.map(function( it ){ return it[Cf](cache); });
    block.arg       = this.arg[Cf](cache);
    block.target    = CfTarget(this.target, cache);
    block.exception = CfTarget(this.exception, cache);
    return block;
};

IL.CallBlock.prototype[Cf] = function ( cache ) {
    var block = new IL.CallBlock();
    cache.put(new Identifier(this.id), block);
    block.scopes    = this.scopes.map(function( it ){ return it[Cf](cache); });
    block.body      = this.body.map(function( it ){ return it[Cf](cache); });
    block.this_val  = this.this_val[Cf](cache);
    block.func      = this.func[Cf](cache);
    block.args      = this.args.map(function( it ){ return it[Cf](cache); });
    block.target    = CfTarget(this.target, cache);
    block.exception = CfTarget(this.exception, cache);
    return block;
};

IL.NewBlock.prototype[Cf] = function ( cache ) {
    var block = new IL.NewBlock();
    cache.put(new Identifier(this.id), block);
    block.scopes    = this.scopes.map(function( it ){ return it[Cf](cache); });
    block.body      = this.body.map(function( it ){ return it[Cf](cache); });
    block.func      = this.func[Cf](cache);
    block.args      = this.args.map(function( it ){ return it[Cf](cache); });
    block.target    = CfTarget(this.target, cache);
    block.exception = CfTarget(this.exception, cache);
    return block;
};


IL.ExpStatement.prototype[Cf] = function ( cache ) {
    return new IL.ExpStatement(
        this.exp[Cf](cache)
    );
};

IL.CondStatement.prototype[Cf] = function ( cache ) {
    return new IL.CondStatement(
        this.cond[Cf](cache),
        CfTarget(this.target, cache)
    );
};

IL.RecvStatement.prototype[Cf] = function ( cache ) {
    return new IL.RecvStatement(
        this.assignee[Cf](cache)
    );
};

IL.EnumStatement.prototype[Cf] = function ( cache ) {
    return new IL.EnumStatement(
        this.exp[Cf](cache),
        this.assignee[Cf](cache)
    );
};


Expression.prototype[Cf] = function ( cache ) {
    return this;
};

UnaryExpression.prototype[Cf] = function ( cache ) {
    return new this.constructor(this.exp[Cf](cache));
};

BinaryExpression.prototype[Cf] = function ( cache ) {
    return new this.constructor(this.left[Cf](cache), this.right[Cf](cache));
};

ArrayInitializer.prototype[Cf] = function ( cache ) {
    return new ArrayInitializer(this.elems.map(function( it ){
        return it[Cf](cache);
    }));
};

FunctionExpression.prototype[Cf] = function ( cache ) {
    return prepareTree(this);
};

ObjectInitializer.prototype[Cf] = function ( cache ) {
    return new ObjectInitializer(this.pairs.map(function( it ){
        return { prop: it.prop,  exp: it.exp[Cf](cache) };
    }));
};

DotAccessor.prototype[Cf] = function ( cache ) {
    return new DotAccessor(this.base[Cf](cache), this.prop);
};

ConditionalExpression.prototype[Cf] = function ( cache ) {
    return new ConditionalExpression(
        this.cond[Cf](cache),
        this.texp[Cf](cache),
        this.fexp[Cf](cache)
    );
};


            return {
                CfConvert: CfConvert, CyclicExceptionHandlerError: CyclicExceptionHandlerError
            };
        }();
    }
}
}
}
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.CfConvert = CfConvert;
    this.Concurrent.Thread.Compiler.CyclicExceptionHandlerError = CyclicExceptionHandlerError;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Concurrent.Thread.Compiler.Parser === undefined ) this.Concurrent.Thread.Compiler.Parser = undefined;
with ( function(){
with ( Data.Cons ) {
with ( Data ) {
with ( Data.Error ) {
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Rhino code, released
 * May 6, 1999.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1997-1999
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Mike Ang
 *   Igor Bukanov
 *   Yuh-Ruey Chen
 *   Ethan Hugg
 *   Terry Lucas
 *   Mike McCabe
 *   Milen Nankov
 *   Daisuke Maki
 *
 * Alternatively, the contents of this file may be used under the terms of
 * the GNU General Public License Version 2 or later (the "GPL"), in which
 * case the provisions of the GPL are applicable instead of those above. If
 * you wish to allow use of your version of this file only under the terms of
 * the GPL and not to allow others to use your version of this file under the
 * MPL, indicate your decision by deleting the provisions above and replacing
 * them with the notice and other provisions required by the GPL. If you do
 * not delete the provisions above, a recipient may use your version of this
 * file under either the MPL or the GPL.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * This file is based on the file Parser.java in Rhino 1.6R5.
 */





NAMESPACE = 'Concurrent.Thread.Compiler';





















// TokenInformation flags : flaggedTokenBuffer stores them together
// with token type
var CLEAR_TI_MASK  = 0xFFFF;   // mask to clear token information bits
var TI_AFTER_EOL   = 1 << 16;  // first token of the source line
var TI_CHECK_LABEL = 1 << 17;  // indicates to check for label


// Exception to unwind
var ParserException = Exception.extend(
    function($super, message){ $super(message); },
    { name: NAMESPACE + ".ParserException" }
);

// Exception to return statement-label
function LabelException ( label ) {
    this.label = label;  // Identifier
}


// default error reporter
var defaultReporter = new ErrorReporter();
defaultReporter.error = function ( message, line, lineSource, lineOffset ) {
    throw new SyntaxError("(" + line + ", " + lineOffset + "): " + message + "\nline: " + lineSource);
};



function Parser ( errorReporter )
{
    this.errorReporter       = errorReporter instanceof ErrorReporter
                                 ?  errorReporter  :  defaultReporter;
    this.ts                  = undefined;  // TokenStream
    this.source              = undefined;  // String       # file-name, URL, ...etc
    this.flaggedTokenBuffer  = null;       // Stack
    this.syntaxErrorCount    = 0;
    this.nestingOfFunction   = 0;
    // The following are per function variables and should be saved/restored
    // during function parsing.
    this.nestingOfLoop   = 0;
    this.nestingOfSwitch = 0;
    this.allLabelSet     = null;  // contains all labels in current scope
    this.loopLabelSet    = null;  // contains only labels qualifying IterationStatement in current scope
}

var proto = Parser.prototype;


proto.getMessage = function ( messageId  /* optional args */ )
{
    //!! fake implementation
    return messageId;
};

proto.addWarning = function ( messageId  /* optional args */ )
{
    this.errorReporter.warning(this.getMessage.apply(this, arguments),
                               this.ts.getLineno()                   ,
                               this.ts.getLine()                     ,
                               this.ts.getOffset()                   );
};

proto.addError = function ( messageId  /* optional args */ )
{
    ++this.syntaxErrorCount;
    this.errorReporter.error(this.getMessage.apply(this, arguments),
                             this.ts.getLineno()                   ,
                             this.ts.getLine()                     ,
                             this.ts.getOffset()                   );
};

proto.reportError = function ( messageId  /* optional args */ )
{
    this.addError.apply(this, arguments);
    // Throw a ParserException exception to unwind the recursive descent
    // parse.
    throw new ParserException();
};


proto.peekToken = function ( )
{
    var tt;
    if ( this.flaggedTokenBuffer.isEmpty() ) {
        tt = this.ts.getToken();
        if ( tt === Token.EOL ) {
            do {
                tt = this.ts.getToken();
            } while ( tt === Token.EOL );
            tt |= TI_AFTER_EOL;
        }
        this.flaggedTokenBuffer.push(tt);
    } else {
        tt = this.flaggedTokenBuffer.peek();
    }
    return tt & CLEAR_TI_MASK;
};

proto.peekFlaggedToken = function ( )
{
    this.peekToken();
    return this.flaggedTokenBuffer.peek();
};

proto.consumeToken = function ( )
{
    this.flaggedTokenBuffer.pop();
};

proto.nextToken = function ( )
{
    var tt = this.peekToken();
    this.consumeToken();
    return tt;
};

proto.nextFlaggedToken = function ( )
{
    this.peekToken();
    var ttFlagged = this.flaggedTokenBuffer.peek();
    this.consumeToken();
    return ttFlagged;
};

proto.matchToken = function ( toMatch )
{
    if ( this.peekToken() !== toMatch ) return false;
    this.consumeToken();
    return true;
};

proto.peekTokenOrEOL = function ( )
{
    var tt = this.peekToken();
    // Check for last peeked token flags
    if ( this.flaggedTokenBuffer.peek() & TI_AFTER_EOL ) return Token.EOL;
    return tt;
};

// Since we need to backtrack to properly parse "default xml namespace"
// in switch-statement.
proto.ungetToken = function ( token )
{
    this.flaggedTokenBuffer.push(token);
};

proto.setCheckForLabel = function ( )
{
    var tt = this.flaggedTokenBuffer.pop();
    if ( (tt & CLEAR_TI_MASK) !== Token.NAME ) throw Kit.codeBug();
    this.flaggedTokenBuffer.push(tt | TI_CHECK_LABEL);
};

proto.mustMatchToken = function ( toMatch, messageId  /* optional args */ )
{
    if ( !this.matchToken(toMatch) ) {
        var args = [];
        for ( var i=1;  i < arguments.length;  i++ ) args.push(arguments[i]);
        this.reportError.apply(this, args);
    }
};

proto.eof = function ( )
{
    return this.ts.eof();
};

proto.insideFunction = function ( )
{
    return this.nestingOfFunction !== 0;
};

proto.insideLoop = function ( )
{
    return this.nestingOfLoop !== 0;
};

proto.enterLoop = function ( labels )
{
    for ( var i=0;  i < labels.length;  i++ ) this.loopLabelSet.add(labels[i]);
    this.nestingOfLoop++;
};

proto.exitLoop = function ( labels )
{
    for ( var i=0;  i < labels.length;  i++ ) this.loopLabelSet.remove(labels[i]);
    this.nestingOfLoop--;
};


proto.parse = function ( sourceString, lineno, source )
{
    this.ts     = new TokenStream(this, sourceString, lineno);
    this.source = source;  // optional
    this.flaggedTokenBuffer = new Stack();
    this.syntaxErrorCount   = 0;
    this.nestingOfFunction  = 0;
    this.nestingOfLoop      = 0;
    this.nestingOfSwitch    = 0;
    this.allLabelSet        = new IdentifierSet();
    this.loopLabelSet       = new IdentifierSet();

    try {
        var body = this.statements();
        this.mustMatchToken(Token.EOF, "msg.syntax");
    } catch ( e ) {
        if ( e instanceof ParserException ) {
            // Ignore it.
        } else {
            // Maybe stack overflow.
            //!!fake implementation
            throw e;
        }
    }

    if ( this.syntaxErrorCount ) {
        var msg = "msg.got.syntax.errors";
        this.addError(msg);
        throw new SyntaxError(this.getMessage("msg.got.syntax.errors"));
    }

    this.ts = null; // It helps GC
    return body;
};


proto.statements = function ( )
{
    var head, cell;
    cell = head = cons(null, nil());
    bodyLoop: for (;;) {
        var n;
        switch ( this.peekToken() ) {
          case Token.ERROR:
          case Token.EOF:
          case Token.RC:
            break bodyLoop;
          case Token.FUNCTION:  // save the stack
            this.consumeToken();
            n = this.functionDecl([]);
            break;
          default:
            n = this.statement();
            break;
        }
        cell = cell.cdr = cons(n, cell.cdr);
    }
    return head.cdr;
};


proto.functionDecl = function ( labels )
{
    var baseLineno = this.ts.getLineno();  // line number where source starts
    this.mustMatchToken(Token.NAME, "msg.no.func.name");
    var name   = new Identifier(this.ts.getString());
    var params = this.parameterList();
    var body   = this.functionBody();
    return new FunctionDeclaration(labels, name, params, body, baseLineno, this.source);
};

proto.functionExpr = function ( )
{
    var name = null;
    if ( this.matchToken(Token.NAME) ) name = new Identifier(this.ts.getString());
    var params = this.parameterList();
    var body   = this.functionBody();
    return new FunctionExpression(name, params, body);
};

proto.parameterList = function ( )
{
    this.mustMatchToken(Token.LP, "msg.no.paren.parms");
    if ( this.matchToken(Token.RP) ) return [];
    var params = [];
    var exists = new IdentifierSet();
    do {
        this.mustMatchToken(Token.NAME, "msg.no.parm");
        var p = new Identifier(this.ts.getString());
        if ( exists.contains(p) ) this.addWarning("msg.dup.parms", s);
        params.push(p);
        exists.add(p);
    } while ( this.matchToken(Token.COMMA) );
    this.mustMatchToken(Token.RP, "msg.no.paren.after.parms");
    return params;
};

proto.functionBody = function ( )
{
    this.mustMatchToken(Token.LC, "msg.no.brace.body");
    
    var saveAllLabel  = this.allLabelSet;
    var saveLoopLabel = this.loopLabelSet;
    var saveLoop      = this.nestingOfLoop;
    var saveSwitch    = this.nestingOfSwitch;
    this.allLabelSet  = new IdentifierSet();
    this.loopLabelSet = new IdentifierSet();
    this.nestingOfLoop   = 0;
    this.nestingOfSwitch = 0;
    this.nestingOfFunction++;
    try {
        var body = this.statements();
    } catch ( e ) {
        if ( e instanceof ParserException ) {
            // Ignore it
        } else {
            throw e;
        }
    } finally {
        this.allLabelSet     = saveAllLabel;
        this.loopLabelSet    = saveLoopLabel;
        this.nestingOfLoop   = saveLoop;
        this.nestingOfSwitch = saveSwitch;
        this.nestingOfFunction--;
    }

    this.mustMatchToken(Token.RC, "msg.no.brace.after.body");
    return body;
};


proto.statement = function ( )
{
    try {
        var n = this.statementHelper([]);
        if ( n != null ) return n;
    } catch ( e ) {
        if ( e instanceof ParserException ) {
            // Ignore it.
        } else {
            throw e;
        }
    }

    // skip to end of statement
    guessingStatementEnd: for (;;) {
        var tt = this.peekTokenOrEOL();
        this.consumeToken();
        switch ( tt ) {
          case Token.ERROR:
          case Token.EOF:
          case Token.EOL:
          case Token.SEMI:
            break guessingStatementEnd;
        }
    }
    return null;
};

proto.statementHelper = function ( labels )
{
    var statement = null;
    switch ( this.peekToken() ) {
      case Token.IF: {
        this.consumeToken();
        var lineno = this.ts.getLineno();
        var cond   = this.condition();
        var tstat  = this.statement();
        if ( this.matchToken(Token.ELSE) ) {
            return new IfElseStatement(labels, cond, tstat, this.statement(), lineno, this.source);
        } else {
            return new IfStatement(labels, cond, tstat, lineno, this.source);
        }
      }

      case Token.SWITCH: {
        this.consumeToken();
        var lineno = this.ts.getLineno();
        this.mustMatchToken(Token.LP, "msg.no.paren.switch");
        var exp = this.expr(false);
        this.mustMatchToken(Token.RP, "msg.no.paren.after.switch");
        this.mustMatchToken(Token.LC, "msg.no.brace.switch");
        var switchStatement = new SwitchStatement(labels, exp, nil(), lineno, this.source);
        var clauses = cons(nil(), nil());
        var last = clauses;
        this.nestingOfSwitch++;
        try {
            var hasDefault = false;
            switchLoop: for (;;) {
                var lineno = this.ts.getLineno();
                var caseExpression;
                switch ( this.nextToken() ) {
                  case Token.RC:
                    break switchLoop;
                  case Token.CASE:
                    caseExpression = this.expr(false);
                    this.mustMatchToken(Token.COLON, "msg.no.colon.case");
                    break;
                  case Token.DEFAULT:
                    if ( hasDefault ) this.reportError("msg.double.switch.default");
                    hasDefault     = true;
                    caseExpression = null;
                    this.mustMatchToken(Token.COLON, "msg.no.colon.case");
                    break;
                  default:
                    this.reportError("msg.bad.switch");
                    break switchLoop;
                }
                var c = caseExpression
                          ?  new CaseClause(caseExpression, this.statementsInSwitch(), lineno, this.source)
                          :  new DefaultClause(this.statementsInSwitch(), lineno, this.source);
                last = last.cdr = cons(c, last.cdr);
            }
        } finally {
            this.nestingOfSwitch--;
        }
        switchStatement.clauses = clauses.cdr;
        return switchStatement;
      }

      case Token.WHILE: {
        this.consumeToken();
        var lineno = this.ts.getLineno();
        this.enterLoop(labels);
        try {
            return new WhileStatement(labels, this.condition(), this.statement(), lineno, this.source);
        } finally {
            this.exitLoop(labels);
        }
      }

      case Token.DO: {
        this.consumeToken();
        var lineno = this.ts.getLineno();
        this.enterLoop(labels);
        try {
            var body = this.statement();
        } finally {
            this.exitLoop(labels);
        }
        this.mustMatchToken(Token.WHILE, "msg.no.while.do");
        var cond = this.condition();
        // Always auto-insert semicon to follow SpiderMonkey:
        // It is required by EMAScript but is ignored by the rest of
        // world, see bug 238945
        this.matchToken(Token.SEMI);
        return new DoWhileStatement(labels, body, cond, lineno, this.source);
      }

      case Token.FOR: {
        this.consumeToken();
        var lineno = this.ts.getLineno();

        var init;  // init is also foo in 'foo in Object'
        var cond;  // cond is also object in 'foo in Object'
        var incr = null;
        var body;

        var isForEach = false;
        var isForIn   = false;
        var isVar     = false;

        // See if this is a for each () instead of just a for ()
        if ( this.matchToken(Token.NAME) ) {
            if ( this.ts.getString() === "each" ) {
                isForEach = true;
            } else {
                this.reportError("msg.no.paren.for");
            }
        }

        this.mustMatchToken(Token.LP, "msg.no.paren.for");

        var tt = this.peekToken();
        if ( tt === Token.SEMI ) {
            init = null;
        } else {
            if ( tt === Token.VAR ) {
                // set init to a var list or initial
                this.consumeToken();    // consume the 'var' token
                init  = this.variables(true);
                isVar = true;
            }
            else {
                init = this.expr(true);
            }
        }

        if ( this.matchToken(Token.IN) ) {
            isForIn = true;
            // 'cond' is the object over which we're iterating
            cond = this.expr(false);
        } else {  // ordinary for loop
            this.mustMatchToken(Token.SEMI, "msg.no.semi.for");
            if ( this.peekToken() === Token.SEMI ) {
                // no loop condition
                cond = null;
            } else {
                cond = this.expr(false);
            }

            this.mustMatchToken(Token.SEMI, "msg.no.semi.for.cond");
            if ( this.peekToken() === Token.RP ) {
                incr = null;
            } else {
                incr = this.expr(false);
            }
        }

        this.mustMatchToken(Token.RP, "msg.no.paren.for.ctrl");

        this.enterLoop(labels);
        try {
            body = this.statement();
        } finally {
            this.exitLoop(labels);
        }
        
        if ( !isForIn ) {
            // Although SpiderMonkey doesn't allow "for each ( ...; ...; ... )",
            // Rhino1.6R5 allowed it. We follow Rhino's position here.
            if ( isVar ) return new ForVarStatement(labels, init, cond, incr, body, lineno, this.source);
            else         return new ForStatement(labels, init, cond, incr, body, lineno, this.source);
        } else {
            if ( isVar ) {
                // Check if init (var declarations) contains only one.
                if ( init.length != 1 ) this.reportError("msg.mult.index");
                if ( isForEach ) return new ForEachVarStatement(labels, init[0], cond, body, lineno, this.source);
                else             return new ForInVarStatement(labels, init[0], cond, body, lineno, this.source);
            } else {
                // Check if init (an expression left-hand-side of "in") has lvalue.
                if ( !init.hasLvalue() ) this.reportError("msg.bad.for.in.lhs");
                if ( isForEach ) return new ForEachStatement(labels, init, cond, body, lineno, this.source);
                else             return new ForInStatement(labels, init, cond, body, lineno, this.source);
            }
        }
      }

      case Token.TRY: {
        this.consumeToken();
        var lineno = this.ts.getLineno();

        // Although ECMA262-3 requires a block here, Rhino1.6R5 allows any kind of statement.
        // We follow Rhino's style, but issue warning when a statement is not a block.
        var tryBlock = this.statement();
        if ( !(tryBlock instanceof Block) ) {
            this.addWarning("msg.no.brace.tryblock");
            tryBlock = new Block([], cons(tryBlock, nil()), tryBlock.lineno, tryBlock.source);
        }

        var catchList;
        var cell = catchList = cons(null, nil());
        var sawDefaultCatch = false;
        var peek = this.peekToken();
        if ( peek === Token.CATCH ) {
            while ( this.matchToken(Token.CATCH) ) {
                if ( sawDefaultCatch ) this.reportError("msg.catch.unreachable");
                var line = this.ts.getLineno();
                this.mustMatchToken(Token.LP, "msg.no.paren.catch");
                this.mustMatchToken(Token.NAME, "msg.bad.catchcond");
                var variable = new Identifier(this.ts.getString());

                var cond = null;
                if ( this.matchToken(Token.IF) ) {
                    cond = this.expr(false);
                } else {
                    sawDefaultCatch = true;
                }

                this.mustMatchToken(Token.RP, "msg.bad.catchcond");
                this.mustMatchToken(Token.LC, "msg.no.brace.catchblock");
                var block = new Block([], this.statements(), line, this.source);
                this.mustMatchToken(Token.RC, "msg.no.brace.after.body");

                var clause = new CatchGuard(variable, cond, block, line, this.source);
                cell = cell.cdr = cons(clause, cell.cdr);
            }
        } else if ( peek !== Token.FINALLY ) {
            this.mustMatchToken(Token.FINALLY, "msg.try.no.catchfinally");
        }
        catchList = catchList.cdr;

        var finallyBlock = null;
        if ( this.matchToken(Token.FINALLY) ) {
            // Rhino also allows any kind of statement here.
            finallyBlock = this.statement();
            if ( !(finallyBlock instanceof Block) ) {
                this.addWarning("msg.no.brace.finallyblock");
                finallyBlock = new Block([], cons(finallyBlock, nil()), finallyBlock.lineno, finallyBlock.source);
            }
        }

        return finallyBlock
                 ? new TryCatchListFinallyStatement(labels, tryBlock, catchList, finallyBlock, lineno, this.source)
                 : new TryCatchListStatement(labels, tryBlock, catchList, lineno, this.source);
      }

      case Token.THROW: {
        this.consumeToken();
        if ( this.peekTokenOrEOL() === Token.EOL ) {
            // ECMAScript does not allow new lines before throw expression,
            // see bug 256617
            this.reportError("msg.bad.throw.eol");
        }

        var lineno = this.ts.getLineno();
        statement = new ThrowStatement(labels, this.expr(false), lineno, this.source);
        break;
      }

      case Token.BREAK: {
        this.consumeToken();
        var lineno = this.ts.getLineno();
        var target = this.matchJumpLabelName(Token.BREAK);
        if ( target == null ) {
            if ( !this.nestingOfLoop && !this.nestingOfSwitch ) this.reportError("msg.bad.break");
        }
        statement = new BreakStatement(labels, target, lineno, this.source);
        break;
      }

      case Token.CONTINUE: {
        this.consumeToken();
        var lineno = this.ts.getLineno();
        var target = this.matchJumpLabelName(Token.CONTINUE);
        if ( target == null ) {
            if ( !this.nestingOfLoop ) reportError("msg.continue.outside");
        }
        statement = new ContinueStatement(labels, target, lineno, this.source);
        break;
      }

      case Token.WITH: {
        this.consumeToken();
        var lineno = this.ts.getLineno();
        this.mustMatchToken(Token.LP, "msg.no.paren.with");
        var exp = this.expr(false);
        this.mustMatchToken(Token.RP, "msg.no.paren.after.with");
        var body = this.statement();
        return new WithStatement(labels, exp, body, lineno, this.source);
      }

      case Token.VAR: {
        this.consumeToken();
        statement = new VarStatement(labels, this.variables(false), lineno, this.source);
        break;
      }

      case Token.RETURN: {
        if ( !this.insideFunction() ) this.reportError("msg.bad.return");
        this.consumeToken();
        var lineno = this.ts.getLineno();
        var exp;
        /* This is ugly, but we don't want to require a semicolon. */
        switch ( this.peekTokenOrEOL() ) {
          case Token.SEMI:
          case Token.RC:
          case Token.EOF:
          case Token.EOL:
          case Token.ERROR:
            exp = null;
            break;
          default:
            exp = this.expr(false);
        }
        statement = new ReturnStatement(labels, exp, lineno, this.source);
        break;
      }

      case Token.LC:
        this.consumeToken();
        var block = new Block(labels, this.statements(), lineno, this.source);
        this.mustMatchToken(Token.RC, "msg.no.brace.block");
        return block;

      case Token.ERROR:
        // Fall thru, to have a node for error recovery to work on
      case Token.SEMI:
        this.consumeToken();
        return new EmptyStatement(labels, lineno, this.source);

      case Token.FUNCTION: {
        this.consumeToken();
        return this.functionDecl(labels);
      }

      case Token.DEFAULT: {
        this.consumeToken();
        this.reportError("msg.XML.not.available");
      }

      case Token.NAME: {
        var lineno = this.ts.getLineno();
        this.setCheckForLabel();
        try {
            statement = new ExpStatement(labels, this.expr(false), lineno, this.source);
        } catch ( e ) {
            if ( e instanceof LabelException ) {
                // Label found!
                if ( this.allLabelSet.contains(e.label) ) this.reportError("msg.dup.label");
                this.allLabelSet.add(e.label);
                labels.push(e.label);
                try {
                    statement = this.statementHelper(labels);
                } finally {
                    this.allLabelSet.remove(e.label);
                }
                return statement;
            } else {
                throw e;
            }
        }
        break;
      }

      default: {
        var lineno = this.ts.getLineno();
        statement = new ExpStatement(labels, this.expr(false), lineno, this.source);
        break;
      }
    }

    switch ( this.peekTokenOrEOL() ) {
      case Token.SEMI:
        // Consume ';' as a part of statement
        this.consumeToken();
        break;
      case Token.ERROR:
      case Token.EOF:
      case Token.EOL:
      case Token.RC:
        // Autoinsert ;
        break;
      default:
        // Report error if no EOL or autoinsert ; otherwise
        this.reportError("msg.no.semi.stmt");
    }

    return statement;
};

proto.condition = function ( )
{
    this.mustMatchToken(Token.LP, "msg.no.paren.cond");
    var exp = this.expr(false);
    this.mustMatchToken(Token.RP, "msg.no.paren.after.cond");
    if ( exp instanceof SimpleAssignExpression ) this.addWarning("msg.assign.cond");
    return exp;
};

// match a NAME; return null if no match.
proto.matchJumpLabelName = function ( token )
{
    if ( this.peekTokenOrEOL() !== Token.NAME ) return null;
    var label = new Identifier(this.ts.getString());
    this.consumeToken();
    switch ( token ) {
      case Token.CONTINUE:
        if ( !this.loopLabelSet.contains(label) ) {
            this.reportError("msg.undef.label");
        }
        break;
      case Token.BREAK:
        if ( !this.allLabelSet.contains(label) ) {
            this.reportError("msg.undef.label");
        }
        break;
      default:
        throw Kit.codeBug();
    }
    return label;
};

proto.statementsInSwitch = function ( )
{
    var head, cell;
    head = cell = cons(null, nil());
    clauseLoop: for (;;) {
        switch ( this.peekToken() ) {
          case Token.ERROR:
          case Token.EOF:
          case Token.RC:
          case Token.CASE:
            break clauseLoop;
          case Token.DEFAULT:
            this.consumeToken();
            var tt = this.peekToken();
            this.ungetToken(Token.DEFAULT);
            if ( tt === Token.COLON ) break clauseLoop;
            // fall thru
          default:
            cell = cell.cdr = cons(this.statement(), cell.cdr);
        }
    }
    return head.cdr;
};

proto.variables = function ( inForInit )
{
    var decls = [];
    for (;;) {
        this.mustMatchToken(Token.NAME, "msg.bad.var");
        var name = new Identifier(this.ts.getString());
        var init = this.matchToken(Token.ASSIGN)
                     ?  this.assignExpr(inForInit)
                     :  null;
        decls.push({id: name, exp: init});
        if ( !this.matchToken(Token.COMMA) ) break;
    }
    return decls;
};


proto.expr = function ( inForInit )
{
    var exp = this.assignExpr(inForInit);
    while ( this.matchToken(Token.COMMA) ) {
        exp = new CommaExpression(exp, this.assignExpr(inForInit));
    }
    return exp;
};


proto.assignExpr = function ( inForInit )
{
    var exp = this.condExpr(inForInit);
    var tt  = this.peekToken();
    if ( tt < Token.FIRST_ASSIGN || Token.LAST_ASSIGN < tt ) return exp;

    if ( !exp.hasLvalue() ) this.reportError("msg.bad.assign.left");

    switch ( this.nextToken() ) {
      case Token.ASSIGN:
        return new SimpleAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_BITOR:
        return new BitOrAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_BITXOR:
        return new BitXorAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_BITAND:
        return new BitAndAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_LSH:
        return new LShiftAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_RSH:
        return new RShiftAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_URSH:
        return new URShiftAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_ADD:
        return new AddAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_SUB:
        return new SubAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_MUL:
        return new MulAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_DIV:
        return new DivAssignExpression(exp, this.assignExpr(inForInit));
      case Token.ASSIGN_MOD:
        return new ModAssignExpression(exp, this.assignExpr(inForInit));
      default:
        throw Kit.codeBug();
    }
};


proto.condExpr = function ( inForInit )
{
    var exp = this.orExpr(inForInit);
    if ( !this.matchToken(Token.HOOK) ) return exp;
    var ifTrue = this.assignExpr(false);
    this.mustMatchToken(Token.COLON, "msg.no.colon.cond");
    var ifFalse = this.assignExpr(inForInit);
    return new ConditionalExpression(exp, ifTrue, ifFalse);
};


proto.orExpr = function ( inForInit )
{
    var exp = this.andExpr(inForInit);
    while ( this.matchToken(Token.OR) ) {
        exp = new OrExpression(exp, this.andExpr(inForInit));
    }
    return exp;
};


proto.andExpr = function ( inForInit )
{
    var exp = this.bitOrExpr(inForInit);
    while ( this.matchToken(Token.AND) ) {
        exp = new AndExpression(exp, this.bitOrExpr(inForInit));
    }
    return exp;
};


proto.bitOrExpr = function ( inForInit )
{
    var exp = this.bitXorExpr(inForInit);
    while ( this.matchToken(Token.BITOR) ) {
        exp = new BitOrExpression(exp, this.bitXorExpr(inForInit));
    }
    return exp;
};


proto.bitXorExpr = function ( inForInit )
{
    var exp = this.bitAndExpr(inForInit);
    while ( this.matchToken(Token.BITXOR) ) {
        exp = new BitXorExpression(exp, this.bitAndExpr(inForInit));
    }
    return exp;
};


proto.bitAndExpr = function ( inForInit )
{
    var exp = this.eqExpr(inForInit);
    while ( this.matchToken(Token.BITAND) ) {
        exp = new BitAndExpression(exp, this.eqExpr(inForInit));
    }
    return exp;
};


proto.eqExpr = function ( inForInit )
{
    var exp = this.relExpr(inForInit);
    for (;;) {
        var constructor;
        switch ( this.peekToken() ) {
          case Token.EQ:
            constructor = EqualExpression;
            break;
          case Token.NE:
             constructor = NotEqualExpression;
            break;
          case Token.SHEQ:
            constructor = StrictEqualExpression;
            break;
          case Token.SHNE:
            constructor = StrictNotEqualExpression;
            break;
          default:
            return exp;
        }
        this.consumeToken();
        exp = new constructor(exp, this.relExpr(inForInit));
    }
};


proto.relExpr = function ( inForInit )
{
    var exp = this.shiftExpr();
    for (;;) {
        var constructor;
        switch ( this.peekToken() ) {
          case Token.IN:
            if ( inForInit ) return exp;
            constructor = InExpression;
            break;
          case Token.INSTANCEOF:
            constructor = InstanceofExpression;
            break;
          case Token.LE:
            constructor = LessEqualExpression;
            break;
          case Token.LT:
            constructor = LessThanExpression;
            break;
          case Token.GE:
            constructor = GreaterEqualExpression;
            break;
          case Token.GT:
            constructor = GreaterThanExpression;
            break;
          default:
            return exp;
        }
        this.consumeToken();
        exp = new constructor(exp, this.shiftExpr());
    }
};


proto.shiftExpr = function ( )
{
    var exp = this.addExpr();
    for (;;) {
        var constructor;
        switch ( this.peekToken() ) {
          case Token.LSH:
            constructor = LShiftExpression;
            break;
          case Token.RSH:
            constructor = RShiftExpression;
            break;
          case Token.URSH:
            constructor = URShiftExpression;
            break;
          default:
            return exp;
        }
        this.consumeToken();
        exp = new constructor(exp, this.addExpr());
    }
};


proto.addExpr = function ( )
{
    var exp = this.mulExpr();
    for (;;) {
        var constructor;
        switch ( this.peekToken() ) {
          case Token.ADD:
            constructor = AddExpression;
            break;
          case Token.SUB:
            constructor = SubExpression;
            break;
          default:
            return exp;
        }
        this.consumeToken();
        exp = new constructor(exp, this.mulExpr());
    }
};


proto.mulExpr = function ( )
{
    var exp = this.unaryExpr();
    for (;;) {
        var constructor;
        switch ( this.peekToken() ) {
          case Token.MUL:
            constructor = MulExpression;
            break;
          case Token.DIV:
            constructor = DivExpression;
            break;
          case Token.MOD:
            constructor = ModExpression;
            break;
          default:
            return exp;
        }
        this.consumeToken();
        exp = new constructor(exp, this.unaryExpr());
    }
};


proto.unaryExpr = function ( )
{
    var constructor;
    var needLvalue = null;
    switch( this.peekToken() ) {
      case Token.VOID:
        constructor = VoidExpression;
        break;
      case Token.NOT:
        constructor = NotExpression;
        break;
      case Token.BITNOT:
        constructor = BitNotExpression;
        break;
      case Token.TYPEOF:
        constructor = TypeofExpression;
        break;
      case Token.ADD:
        constructor = PosExpression;
        break;
      case Token.SUB:
        constructor = NegExpression;
        break;
      case Token.INC:
        constructor = PreIncExpression;
        needLvalue = "msg.bad.incr";
        break;
    case Token.DEC:
        constructor = PreDecExpression;
        needLvalue = "msg.bad.decr";
        break;
    case Token.DELPROP:
        constructor = DeleteExpression;
        break;
    default:
        var exp = this.memberExpr(true);
        // Don't look across a newline boundary for a postfix incop.
        switch ( this.peekTokenOrEOL() ) {
          case Token.INC:
            if ( !exp.hasLvalue() ) this.reportError("msg.bad.incr");
            this.consumeToken();
            return new PostIncExpression(exp);
          case Token.DEC:
            if ( !exp.hasLvalue() ) this.reportError("msg.bad.decr");
            this.consumeToken();
            return new PostDecExpression(exp);
          default:
            return exp;
        }
    }
    this.consumeToken();
    var exp = this.unaryExpr();
    if ( needLvalue  &&  !exp.hasLvalue() ) this.reportError(needLvalue);
    return new constructor(exp);
};


proto.argumentList = function ( )
{
    if ( this.matchToken(Token.RP) ) return [];
    var args = [];
    do {
        args.push( this.assignExpr(false) );
    } while ( this.matchToken(Token.COMMA) );
    this.mustMatchToken(Token.RP, "msg.no.paren.arg");
    return args;
};


proto.memberExpr = function ( allowCallSyntax )
{
    var base;
    if ( this.matchToken(Token.NEW) ) {
        var func = this.memberExpr(false);
        var args = this.matchToken(Token.LP)
                     ?  this.argumentList()
                     :  [];
        base = new NewExpression(func, args);
    } else {
        base = this.primaryExpr();
    }
    return this.memberExprTail(allowCallSyntax, base);
}


proto.memberExprTail = function ( allowCallSyntax, base )
{
    tailLoop: for (;;) {
        switch ( this.peekToken() ) {
          case Token.DOTDOT:
            this.reportError("msg.XML.not.available");

          case Token.DOT: {
            this.consumeToken();
            switch ( this.nextToken() ) {
              case Token.NAME:
                base = new DotAccessor(base, new Identifier(this.ts.getString()));
                break;
              case Token.MUL:
                this.reportError("msg.XML.not.available");
              case Token.XMLATTR:
                this.reportError("msg.XML.not.available");
              default:
                this.reportError("msg.no.name.after.dot");
            }
          }
          break;

          case Token.DOTQUERY:
            this.reportError("msg.XML.not.available");

          case Token.LB:
            this.consumeToken();
            base = new BracketAccessor(base, this.expr(false));
            this.mustMatchToken(Token.RB, "msg.no.bracket.index");
            break;

          case Token.LP:
            if ( !allowCallSyntax ) break tailLoop;
            this.consumeToken();
            base = new CallExpression(base, this.argumentList());
            break;

          default:
            break tailLoop;
        }
    }
    return base;
};


proto.primaryExpr = function ( )
{
    var exp;
    var ttFlagged = this.nextFlaggedToken();
    var tt = ttFlagged & CLEAR_TI_MASK;
    switch ( tt ) {

      case Token.FUNCTION:
        return this.functionExpr();

      case Token.LB: {
        var elems = [];
        elemLoop: for (;;) {
            switch ( this.peekToken() ) {
              case Token.RB:
                this.consumeToken();
                break elemLoop;
              case Token.COMMA:
                while ( this.matchToken(Token.COMMA) ) {
                    elems.push(new Elision());
                }
                break;
              default:
                elems.push(this.assignExpr(false));
                if ( this.matchToken(Token.COMMA) ) {
                    continue elemLoop;
                } else if ( this.matchToken(Token.RB) ) {
                    break elemLoop;
                } else {
                    this.reportError("msg.no.bracket.arg");
                }
            }
        }
        return new ArrayInitializer(elems);
      }

      case Token.LC: {
        var pairs = [];
        commaloop: do {
            var prop;
            switch ( this.peekToken() ) {
              case Token.NAME:
                this.consumeToken();
                prop = new Identifier(this.ts.getString());
                break;
              case Token.STRING:
                this.consumeToken();
                prop = new StringLiteral(this.ts.getString());
                break;
              case Token.NUMBER:
                this.consumeToken();
                prop = new NumberLiteral(this.ts.getString());
                break;
              case Token.RC:
                // trailing comma is OK.
                break commaloop;
            default:
                this.reportError("msg.bad.prop");
                break commaloop;
            }
            this.mustMatchToken(Token.COLON, "msg.no.colon.prop");
            pairs.push({prop:prop, exp:this.assignExpr(false)});
        } while ( this.matchToken(Token.COMMA) );
        this.mustMatchToken(Token.RC, "msg.no.brace.prop");
        return new ObjectInitializer(pairs);
      }

      case Token.LP:
        var exp = this.expr(false);
        this.mustMatchToken(Token.RP, "msg.no.paren");
        return exp;

      case Token.XMLATTR:
        this.reportError("msg.XML.not.available");

      case Token.NAME:
        var name = new Identifier(this.ts.getString());
        if ( ttFlagged & TI_CHECK_LABEL ) {
            if ( this.matchToken(Token.COLON) ) throw new LabelException(name);
        }
        return name;

      case Token.NUMBER:
        return new NumberLiteral(this.ts.getString());

      case Token.STRING:
        return new StringLiteral(this.ts.getString());

      case Token.DIV:
      case Token.ASSIGN_DIV:
        // Got / or /= which should be treated as regexp in fact
        this.ts.readRegExp(tt);
        return new RegExpLiteral(this.ts.getString());

      case Token.NULL:
        return new NullLiteral();
        
      case Token.THIS:
        return new ThisExpression();

      case Token.TRUE:
        return new TrueLiteral();

      case Token.FALSE:
        return new FalseLiteral();

      case Token.RESERVED:
        this.reportError("msg.reserved.id");
        break;

      case Token.ERROR:
        /* the scanner or one of its subroutines reported the error. */
        break;

      case Token.EOF:
        this.reportError("msg.unexpected.eof");
        break;

      default:
        this.reportError("msg.syntax");
        break;
    }
    return null;    // should never reach here
}



            return {
                Parser: Parser
            };
        }();
    }
}
}
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.Parser = Parser;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Functional || (typeof this.Data.Functional != 'object' && typeof this.Data.Functional != 'function') ) this.Data.Functional = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Concurrent.Thread.Compiler.CsConvert === undefined ) this.Concurrent.Thread.Compiler.CsConvert = undefined;
with ( function(){
with ( Data.Functional ) {
with ( Data.Cons ) {
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Concurrent.Thread.Compiler';








var IL = Concurrent.Thread.Compiler.IntermediateLanguage;








var Cs = "Concurrent.Thread.Compiler.CsConvert";
var STACK_VAR = "$Concurrent_Thread_stack";

var undefinedExp = new VoidExpression(new NumberLiteral(0));
var emptyLabel   = new Identifier("");

function isStackVar ( v ) {
    return v instanceof Identifier
        && v.valueOf().match(/^$Concurrent_Thread_stack/);
}


function Context ( ) {
    this.stackVars = [];
    this.contBreak    = new IdentifierMap();
    this.contContinue = new IdentifierMap();
    this.contReturn   = "return";
    this.contThrow    = "throw";
    this.scopes       = [];
}

var proto = Context.prototype;

proto.getStackVar = function ( n ) {
    n = Math.floor(n);
    if ( isNaN(n) || n < 0 ) Kit.codeBug("must be integer greater than zero");
    for ( var i=this.stackVars.length;  i <= n;  i++ ) {
        this.stackVars[i] = new Identifier(STACK_VAR + i);
    }
    return this.stackVars[n];
};

proto.putBreakLabels = function ( labels, target ) {
    if ( !labels.length ) return this.contBreak;
    var restore = this.contBreak;
    this.contBreak = this.contBreak.clone();
    for ( var i=0;  i < labels.length;  i++ ) {
        this.contBreak.put(labels[i], target);
    }
    return restore;
};

proto.putBreakAndContinueLabels = function ( labels, breakTarget, continueTarget ) {
    if ( !labels.length ) {
        return {
            contBreak   : this.contBreak,
            contContinue: this.contContinue
        };
    }
    var restore = {
        contBreak   : this.contBreak,
        contContinue: this.contContinue
    };
    this.contBreak    = this.contBreak.clone();
    this.contContinue = this.contContinue.clone();
    for ( var i=0;  i < labels.length;  i++ ) {
        this.contBreak.put(labels[i], breakTarget);
        this.contContinue.put(labels[i], continueTarget);
    }
    return restore;
};

proto.getScopes = function ( ) {
    return this.scopes.slice(0, this.scopes.length);
};

proto.pushScope = function ( /* variable args */ ) {
    return this.scopes.push.apply(this.scopes, arguments);
};

proto.popScope = function ( ) {
    return this.scopes.pop();
};

proto.makeGotoBlock = function ( arg, target ) {
    return new IL.GotoBlock(this.getScopes(), nil(), arg, target, this.contThrow);
};




function CsConvert ( func ) {
    var context = new Context();
    var last_block = new IL.GotoBlock([], nil(), undefinedExp, "return", "throw");
    func.body  = CsStatements(func.body, list(last_block), context, 0);
    func.start = func.body.car;
    func.vars  = func.vars.concat(context.stackVars);
    return func;
}


function CsStatements ( stmts, follows, ctxt, sttop ) {
    if ( stmts.isNil() ) return follows;
    follows = CsStatements(stmts.cdr, follows, ctxt, sttop);
    return stmts.car[Cs](follows, ctxt, sttop);
}

function CsReference ( exp, ctxt, sttop, rest ) {  // Expression -> Context -> Int -> (Expression -> <Block>) -> <Block>
    if ( exp instanceof DotAccessor ) {
        var e = new DotAccessor(ctxt.getStackVar(sttop), exp.prop);
        var follows = rest(e, sttop+1);
        return exp.base[Cs](follows, ctxt, sttop);
    } else if ( exp instanceof BracketAccessor ) {
        var e = new BracketAccessor(ctxt.getStackVar(sttop), ctxt.getStackVar(sttop+1));
        var follows = rest(e, sttop+2);
        follows = exp.right[Cs](follows, ctxt, sttop+1);
        return exp.left[Cs](follows, ctxt, sttop);
    } else if ( exp instanceof Identifier ) {
        return rest(exp, sttop);
    } else {
        var follows = rest(ctxt.getStackVar(sttop), sttop+1);
        return exp[Cs](follows, ctxt, sttop);
    }
}



EmptyStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    return follows;
};

Block.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var restore = ctxt.putBreakLabels(this.labels, follows.car);
    follows = cons( ctxt.makeGotoBlock(undefinedExp, follows.car), follows);
    try {
        return CsStatements(this.body, follows, ctxt, sttop);
    } finally {
        ctxt.contBreak = restore;
    }
};

ExpStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    return this.exp[Cs](follows, ctxt, sttop, true);
};


IfStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var next_block = follows.car;
    follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows);
    var restore = ctxt.putBreakLabels(this.labels, next_block);
    try {
        follows = this.body[Cs](follows, ctxt, sttop);
        follows.car.prependStatement( new IL.CondStatement(new NotExpression(ctxt.getStackVar(sttop)), next_block) );
        return this.cond[Cs](follows, ctxt, sttop);
    } finally {
        ctxt.contBreak = restore;
    }
};

IfElseStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var next_block = follows.car;
    follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows);
    var restore = ctxt.putBreakLabels(this.labels, next_block);
    try {
        follows = this.tbody[Cs](follows, ctxt, sttop);
        var true_block = follows.car;
        follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows);
        follows = this.fbody[Cs](follows, ctxt, sttop);
        follows.car.prependStatement( new IL.CondStatement(ctxt.getStackVar(sttop), true_block) );
        return this.cond[Cs](follows, ctxt, sttop);
    } finally {
        ctxt.contBreak = restore;
    }
};


DoWhileStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var next_block  = follows.car;
    var first_block = ctxt.makeGotoBlock(undefinedExp, null);
    follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows );
    if ( this.cond.containsFunctionCall() ) {
        follows.car.prependStatement( new IL.CondStatement(ctxt.getStackVar(sttop), first_block) );
        follows = this.cond[Cs](follows, ctxt, sttop);
    } else {
        follows.car.prependStatement( new IL.CondStatement(this.cond, first_block) );
    }
    var continue_block = follows.car;
    follows = cons( ctxt.makeGotoBlock(undefinedExp, follows.car), follows );
    var restore = ctxt.putBreakAndContinueLabels(this.labels.concat(emptyLabel), next_block, continue_block);
    try {
        follows = this.body[Cs](follows, ctxt, sttop);
    } finally {
        ctxt.contBreak    = restore.contBreak;
        ctxt.contContinue = restore.contContinue;
    }
    first_block.target = follows.car;
    return cons( ctxt.makeGotoBlock(undefinedExp, first_block),
                 cons(first_block, follows) );
};

WhileStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var next_block  = follows.car;
    var first_block = ctxt.makeGotoBlock(undefinedExp, null);
    follows = cons( ctxt.makeGotoBlock(undefinedExp, first_block), follows );
    var restore = ctxt.putBreakAndContinueLabels(this.labels.concat(emptyLabel), next_block, first_block);
    try {
        follows = this.body[Cs](follows, ctxt, sttop);
    } finally {
        ctxt.contBreak    = restore.contBreak;
        ctxt.contContinue = restore.contContinue;
    }
    if ( this.cond.containsFunctionCall() ) {
        follows.car.prependStatement( new IL.CondStatement(new NotExpression(ctxt.getStackVar(sttop)), next_block) );
        follows = this.cond[Cs](follows, ctxt, sttop);
    } else {
        follows.car.prependStatement( new IL.CondStatement(new NotExpression(this.cond), next_block) );
    }
    first_block.target = follows.car;
    return cons( ctxt.makeGotoBlock(undefinedExp, first_block),
                 cons(first_block, follows) );
};

ForStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var next_block = follows.car;
    var last_block = ctxt.makeGotoBlock(undefinedExp, null);
    follows = cons(last_block, follows);
    if ( this.incr ) follows = this.incr[Cs](follows, ctxt, sttop, true);
    var incr_block = follows.car;
    follows = cons( ctxt.makeGotoBlock(undefinedExp, follows.car), follows );
    var restore = ctxt.putBreakAndContinueLabels(this.labels.concat(emptyLabel), next_block, incr_block);
    try {
        follows = this.body[Cs](follows, ctxt, sttop);
    } finally {
        ctxt.contBreak    = restore.contBreak;
        ctxt.contContinue = restore.contContinue;
    }
    if ( this.cond ) {
        if ( this.cond.containsFunctionCall() ) {
            follows.car.prependStatement( new IL.CondStatement(new NotExpression(ctxt.getStackVar(sttop)), next_block) );
            follows = this.cond[Cs](follows, ctxt, sttop);
        } else {
            follows.car.prependStatement( new IL.CondStatement(new NotExpression(this.cond), next_block) );
        }
    }
    last_block.target = follows.car;
    follows = cons( ctxt.makeGotoBlock(undefinedExp, follows.car), follows );
    if ( this.init ) {
        follows = this.init[Cs](follows, ctxt, sttop, true);
    }
    return follows;
};

ForInStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    if ( !this.lhs.hasLvalue() ) Kit.codeBug('for-in requires lvalue on the left hand side of "in": ' + this);
    var next_block = follows.car;
    var loop_block = ctxt.makeGotoBlock(undefinedExp, null);
    follows = cons( ctxt.makeGotoBlock(undefinedExp, loop_block), follows );
    var restore = ctxt.putBreakAndContinueLabels(this.labels.concat(emptyLabel), next_block, loop_block);
    try {
        follows = this.body[Cs](follows, ctxt, sttop+2);
    } finally {
        ctxt.contBreak    = restore.contBreak;
        ctxt.contContinue = restore.contContinue;
    }
    if ( this.lhs.containsFunctionCall() ) {
        follows = CsReference(this.lhs, ctxt, sttop+2, function( exp ){
            follows.car.prependStatement( make_assign(
                exp,
                new BracketAccessor(
                    ctxt.getStackVar(sttop),
                    new PostIncExpression(ctxt.getStackVar(sttop+1))
                )
            ) );
            return follows;
        });
    } else {
        follows.car.prependStatement( make_assign(
            this.lhs,
            new BracketAccessor(
                ctxt.getStackVar(sttop),
                new PostIncExpression(ctxt.getStackVar(sttop+1))
            )
        ) );
    }
    follows.car.prependStatement( new IL.CondStatement(
        new GreaterEqualExpression(
            ctxt.getStackVar(sttop+1),
            new DotAccessor(ctxt.getStackVar(sttop), new Identifier("length"))
        ),
        next_block
    ) );
    loop_block.target = follows.car;
    follows = cons( loop_block, follows );
    follows = cons( ctxt.makeGotoBlock(undefinedExp, loop_block), follows );
    follows.car.prependStatement( make_assign(ctxt.getStackVar(sttop+1), new NumberLiteral(0)) );
    if ( this.exp.containsFunctionCall() ) {
        follows.car.prependStatement( new IL.EnumStatement(ctxt.getStackVar(sttop), ctxt.getStackVar(sttop)) );
        follows = this.exp[Cs](follows, ctxt, sttop);
    } else {
        follows.car.prependStatement( new IL.EnumStatement(this.exp, ctxt.getStackVar(sttop)) );
    }
    return follows;
};


ContinueStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    return cons(
        ctxt.makeGotoBlock(
            undefinedExp,
            ctxt.contContinue.get( this.target ? this.target : emptyLabel )
        ),
        follows
    );
};

BreakStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var restore = ctxt.putBreakLabels(this.labels, follows.car);
    try {
        return cons(
            ctxt.makeGotoBlock(
                undefinedExp,
                ctxt.contBreak.get( this.target ? this.target : emptyLabel )
            ),
            follows
        );
    } finally {
        ctxt.contBreak = restore;
    }
};

ReturnStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    if ( this.exp ) {
        if ( this.exp.containsFunctionCall() ) {
            follows = cons( ctxt.makeGotoBlock(ctxt.getStackVar(sttop), ctxt.contReturn), follows );
            return this.exp[Cs](follows, ctxt, sttop);
        } else {
            return cons( ctxt.makeGotoBlock(this.exp, ctxt.contReturn), follows );
        }
    } else {
        return cons( ctxt.makeGotoBlock(undefinedExp, ctxt.contReturn), follows );
    }
};


WithStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var next_block = follows.car;
    var restore = ctxt.putBreakLabels(this.labels, next_block);
    try {
        ctxt.pushScope(ctxt.getStackVar(sttop));
        try {
            follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows );
            follows = this.body[Cs](follows, ctxt, sttop+1);
        } finally {
            ctxt.popScope();
        }
        follows = cons( ctxt.makeGotoBlock(undefinedExp, follows.car), follows );
        return this.exp[Cs](follows, ctxt, sttop);
    } finally {
        ctxt.contBreak = restore;
    }
};


SwitchStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var next_block = follows.car;
    var restore = ctxt.putBreakLabels(this.labels.concat(emptyLabel) , next_block);
    try {
        var default_target  = next_block;
        var cond_and_target = this.clauses.reverse().map(function( clause ){
            follows = cons( ctxt.makeGotoBlock(undefinedExp, follows.car), follows );
            follows = CsStatements(clause.body, follows, ctxt, sttop);
            var clause_block = follows.car;
            if ( clause instanceof DefaultClause ) {
                default_target = clause_block;
                ignore();
            } else {
                return {cond:clause.exp, target:clause_block};
            }
        });
        follows = cons( ctxt.makeGotoBlock(undefinedExp, default_target), follows );
        cond_and_target.forEach(function( it ){
            if ( it.cond.containsFunctionCall() ) {
                follows.car.prependStatement(
                    new IL.CondStatement(
                        new StrictEqualExpression(ctxt.getStackVar(sttop), ctxt.getStackVar(sttop+1)),
                        it.target
                    )
                );
                follows = it.cond[Cs](follows, ctxt, sttop+1);
            } else {
                follows.car.prependStatement(
                    new IL.CondStatement(
                        new StrictEqualExpression(ctxt.getStackVar(sttop), it.cond),
                        it.target
                    )
                );
            }
        });
        return this.exp[Cs](follows, ctxt,sttop);
    } finally {
        ctxt.contBreak = restore;
    }
};


ThrowStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    if ( this.exp.containsFunctionCall() ) {
        follows = cons( ctxt.makeGotoBlock(ctxt.getStackVar(sttop), ctxt.contThrow), follows );
        return this.exp[Cs](follows, ctxt, sttop);
    } else {
        return cons( ctxt.makeGotoBlock(this.exp, ctxt.contThrow), follows );
    }
};

TryCatchStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var next_block = follows.car;
    follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows );
    var restore = ctxt.putBreakLabels(this.labels, next_block);
    try {
        follows = this.catchBlock[Cs](follows, ctxt, sttop);
        follows.car.prependStatement( new IL.RecvStatement(this.variable) );
        var storeContThrow = ctxt.contThrow;
        ctxt.contThrow = follows.car;
        try {
            follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows );
            return this.tryBlock[Cs](follows, ctxt, sttop);
        } finally {
            ctxt.contThrow = storeContThrow;
        }
    } finally {
        ctxt.contBreak = restore;
    }
};

TryFinallyStatement.prototype[Cs] = function ( follows, ctxt, sttop ) {
    var next_block = follows.car;
    follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows );
    var restoreBreak = ctxt.putBreakLabels(this.labels, next_block);
    try {
        var self = this;

        var contBreak = new IdentifierMap();
        ctxt.contBreak.keys().forEach(function( label ){
            follows = cons( ctxt.makeGotoBlock(undefinedExp, ctxt.contBreak.get(label)), follows );
            follows = self.finallyBlock[Cs](follows, ctxt, sttop);
            contBreak.put(label, follows.car);
        });
        
        var contContinue = new IdentifierMap();
        ctxt.contContinue.keys().forEach(function( label ){
            follows = cons( ctxt.makeGotoBlock(undefinedExp, ctxt.contContinue.get(label)), follows );
            follows = self.finallyBlock[Cs](follows, ctxt, sttop);
            contContinue.put(label, follows.car);
        });
        
        follows = cons( ctxt.makeGotoBlock(ctxt.getStackVar(sttop), ctxt.contReturn), follows );
        follows = this.finallyBlock[Cs](follows, ctxt, sttop+1);
        follows.car.prependStatement( new IL.RecvStatement(ctxt.getStackVar(sttop)) );
        var contReturn = follows.car;
        
        follows = cons( ctxt.makeGotoBlock(ctxt.getStackVar(sttop), ctxt.contThrow), follows );
        follows = this.finallyBlock[Cs](follows, ctxt, sttop+1);
        follows.car.prependStatement( new IL.RecvStatement(ctxt.getStackVar(sttop)) );
        var contThrow = follows.car;

        follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows );
        follows = this.finallyBlock[Cs](follows, ctxt, sttop);
        
        var restoreContinue = ctxt.contContinue;
        var restoreReturn   = ctxt.contReturn;
        var restoreThrow    = ctxt.contThrow;
        ctxt.contBreak    = contBreak;
        ctxt.contContinue = contContinue;
        ctxt.contReturn   = contReturn;
        ctxt.contThrow    = contThrow;
        try {
            return this.tryBlock[Cs](follows, ctxt, sttop);
        } finally {
            ctxt.contContinue = restoreContinue;
            ctxt.contReturn   = restoreReturn;
            ctxt.contThrow    = restoreThrow;
        }
    } finally {
        ctxt.contBreak = restoreBreak;
    }
};



function make_assign ( left, right ) {
    return new IL.ExpStatement( new SimpleAssignExpression(left, right) );
}

function prepend_exp ( exp, follows, ctxt, sttop, is_void ) {
    follows.car.prependStatement(
        is_void ? new IL.ExpStatement(exp)
                : make_assign(ctxt.getStackVar(sttop), exp)
    );
    return follows;
}

Expression.prototype[Cs] = function ( follows, ctxt, sttop, is_void ) {
    return prepend_exp(this, follows, ctxt, sttop, is_void);
};

ArrayInitializer.prototype[Cs] = function ( follows, ctxt, sttop, is_void ) {
    for ( var asis_from=this.elems.length-1;  asis_from >= 0;  asis_from-- ) {
        if ( this.elems[asis_from].containsFunctionCall() ) break;
    }
    asis_from++;
    var elems = [];
    for ( var i=0;  i < asis_from;  i++ ) {
        elems[i] = ctxt.getStackVar(sttop+i);
    }
    for ( ;  i < this.elems.length;  i++ ) {
        elems[i] = this.elems[i];
    }
    follows = prepend_exp(new ArrayInitializer(elems), follows, ctxt, sttop, is_void);
    for ( var i=asis_from-1;  i >= 0;  i-- ) {
        follows = this.elems[i][Cs](follows, ctxt, sttop+i);
    }
    return follows;
};

ObjectInitializer.prototype[Cs] = function ( follows, ctxt, sttop, is_void ) {
    for ( var asis_from=this.pairs.length-1;  asis_from >= 0;  asis_from-- ) {
        if ( this.pairs[asis_from].exp.containsFunctionCall() ) break;
    }
    asis_from++;
    var pairs = [];
    for ( var i=0;  i < asis_from;  i++ ) {
        pairs[i] = {prop:this.pairs[i].prop, exp:ctxt.getStackVar(sttop+i)};
    }
    for ( ;  i < this.pairs.length;  i++ ) {
        pairs[i] = this.pairs[i];
    }
    follows = prepend_exp(new ObjectInitializer(pairs), follows, ctxt, sttop, is_void);
    for ( var i=asis_from-1;  i >= 0;  i-- ) {
        follows = this.pairs[i].exp[Cs](follows, ctxt, sttop+i);
    }
    return follows;
};

UnaryExpression.prototype[Cs] = function ( follows, ctxt, sttop, is_void ) {
    if ( this.exp.containsFunctionCall() ) {
        follows = prepend_exp(new this.constructor(ctxt.getStackVar(sttop)), follows, ctxt, sttop, is_void);
        return this.exp[Cs](follows, ctxt, sttop);
    } else {
        return Expression.prototype[Cs].apply(this, arguments);
    }
};

BinaryExpression.prototype[Cs] = function ( follows, ctxt, sttop, is_void ) {
    if ( this.right.containsFunctionCall() ) {
        follows = prepend_exp(new this.constructor(ctxt.getStackVar(sttop), ctxt.getStackVar(sttop+1)), follows, ctxt, sttop, is_void);
        follows = this.right[Cs](follows, ctxt, sttop+1);
        return this.left[Cs](follows, ctxt, sttop);
    } else if ( this.left.containsFunctionCall() ) {
        follows = prepend_exp(new this.constructor(ctxt.getStackVar(sttop), this.right), follows, ctxt, sttop, is_void);
        return this.left[Cs](follows, ctxt, sttop);
    } else {
        return Expression.prototype[Cs].apply(this, arguments);
    }
};

DotAccessor.prototype[Cs] = function ( follows, ctxt, sttop, is_void ) {
    if ( this.base.containsFunctionCall() ) {
        follows = prepend_exp(new DotAccessor(ctxt.getStackVar(sttop), this.prop), follows, ctxt, sttop, is_void);
        return this.base[Cs](follows, ctxt, sttop);
    } else {
        return Expression.prototype[Cs].apply(this, arguments);
    }
};

CallExpression.prototype[Cs] = function ( follows, ctxt, sttop, is_void ) {
    var self = this;
    return CsReference(this.func, ctxt, sttop, function ( func, sttop2 ) {
        for ( var asis_from=self.args.length-1;  asis_from >= 0;  asis_from-- ) {
            if ( self.args[asis_from].containsFunctionCall() ) break;
        }
        asis_from++;
        var args = [];
        for ( var i=0;  i < asis_from;  i++ ) {
            args[i] = ctxt.getStackVar(sttop2+i);
        }
        for ( ;  i < self.args.length;  i++ ) {
            args[i] = self.args[i];
        }
        if ( !is_void ) follows.car.prependStatement( new IL.RecvStatement(ctxt.getStackVar(sttop)) );
        follows = cons( new IL.CallBlock(
                            ctxt.getScopes(),
                            nil(),
                            func instanceof DotAccessor     ? func.base :
                            func instanceof BracketAccessor ? func.left : new NullLiteral(),
                            func,
                            args,
                            follows.car,
                            ctxt.contThrow
                        ), follows );
        for ( var i=asis_from-1;  i >= 0;  i-- ) {
            follows = self.args[i][Cs](follows, ctxt, sttop2+i);
        }
        return follows;
    });
};

NewExpression.prototype[Cs] = function ( follows, ctxt, sttop, is_void ) {
    for ( var asis_from=this.args.length-1;  asis_from >= 0;  asis_from-- ) {
        if ( this.args[asis_from].containsFunctionCall() ) break;
    }
    asis_from++;
    var args = [];
    for ( var i=0;  i < asis_from;  i++ ) {
        args[i] = ctxt.getStackVar(sttop+1+i);
    }
    for ( ;  i < this.args.length;  i++ ) {
        args[i] = this.args[i];
    }
    if ( !is_void ) follows.car.prependStatement( new IL.RecvStatement(ctxt.getStackVar(sttop)) );
    follows = cons( new IL.NewBlock(
                        ctxt.getScopes(),
                        nil(),
                        ctxt.getStackVar(sttop),
                        args,
                        follows.car,
                        ctxt.contThrow
                    ), follows );
    for ( var i=asis_from-1;  i >= 0;  i-- ) {
        follows = this.args[i][Cs](follows, ctxt, sttop+1+i);
    }
    this.func[Cs](follows, ctxt, sttop);
    return follows;
};

AssignExpression.prototype[Cs] = function ( follows, ctxt, sttop, is_void ) {
    var self = this;
    if ( this.right.containsFunctionCall() ) {
        return CsReference(this.left, ctxt, sttop, function ( left, sttop2 ) {
            follows = prepend_exp(new self.constructor(left, ctxt.getStackVar(sttop2)), follows, ctxt, sttop, is_void);
            return self.right[Cs](follows, ctxt, sttop2);
        });
    } else if ( this.left.containsFunctionCall() ) {
        return CsReference(this.left, ctxt, sttop, function ( left, sttop2 ) {
            return prepend_exp(new self.constructor(left, self.right), follows, ctxt, sttop, is_void);
        });
    } else {
        return Expression.prototype[Cs].apply(this, arguments);
    }
};

AndExpression.prototype[Cs] = function ( follows, ctxt, sttop ) {
    if ( this.right.containsFunctionCall() ) {
        var next_block = follows.car;
        follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows );
        follows = this.right[Cs](follows, ctxt, sttop);
        follows.car.prependStatement( new IL.CondStatement(new NotExpression(ctxt.getStackVar(sttop)), next_block) );
        return this.left[Cs](follows, ctxt, sttop);
    } else if ( this.left.containsFunctionCall() ) {
        follows.car.prependStatement( make_assign(ctxt.getStackVar(sttop), new AndExpression(ctxt.getStackVar(sttop), this.right)) );
        return this.left[Cs](follows, ctxt, sttop);
    } else {
        return Expression.prototype[Cs].apply(this, arguments);
    }
};

OrExpression.prototype[Cs] = function ( follows, ctxt, sttop ) {
    if ( this.right.containsFunctionCall() ) {
        var next_block = follows.car;
        follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows );
        follows = this.right[Cs](follows, ctxt, sttop);
        follows.car.prependStatement( new IL.CondStatement(ctxt.getStackVar(sttop), next_block) );
        return this.left[Cs](follows, ctxt, sttop);
    } else if ( this.left.containsFunctionCall() ) {
        follows.car.prependStatement( make_assign(ctxt.getStackVar(sttop), new OrExpression(ctxt.getStackVar(sttop), this.right)) );
        return this.left[Cs](follows, ctxt, sttop);
    } else {
        return Expression.prototype[Cs].apply(this, arguments);
    }
};

ConditionalExpression.prototype[Cs] = function ( follows, ctxt, sttop ) {
    if ( this.texp.containsFunctionCall() || this.fexp.containsFunctionCall() ) {
        var next_block = follows.car;
        follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows );
        follows = this.texp[Cs](follows, ctxt, sttop);
        var true_block = follows.car;
        follows = cons( ctxt.makeGotoBlock(undefinedExp, next_block), follows );
        follows = this.fexp[Cs](follows, ctxt, sttop);
        follows.car.prependStatement(new IL.CondStatement(ctxt.getStackVar(sttop), true_block));
        return this.cond[Cs](follows, ctxt, sttop);
    } else if ( this.cond.containsFunctionCall() ) {
        follows.car.prependStatement( make_assign(ctxt.getStackVar(sttop), new ConditionalExpression(ctxt.getStackVar(sttop), this.texp, this.fexp)) );
        return this.cond[Cs](follows, ctxt, sttop);
    } else {
        return Expression.prototype[Cs].apply(this, arguments);
    }
};

            return {
                CsConvert: CsConvert
            };
        }();
    }
}
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.CsConvert = CsConvert;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( !this.Data.Cons.Util || (typeof this.Data.Cons.Util != 'object' && typeof this.Data.Cons.Util != 'function') ) this.Data.Cons.Util = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( this.Concurrent.Thread.Compiler.CvConvert === undefined ) this.Concurrent.Thread.Compiler.CvConvert = undefined;
with ( function(){
with ( Data.Cons.Util ) {
with ( Data.Cons ) {
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Concurrent.Thread.Compiler';












var IL = IntermediateLanguage;


var Cv = "$Concurrent_Thread_Compiler_CvConvert";



function CvConvert ( func ) {
    var vars  = new IdentifierSet()
    function add_vars ( /* variable arguments */ ) {
        return vars.add.apply(vars, arguments);
    }
    var decls     = cons(null, nil());
    var add_decls = adder(decls);
    for ( var c=func.body;  !c.isNil();  c=c.cdr ) {
        c.car = c.car[Cv](add_vars, add_decls);
    }
    return new IL.Function(func.name, func.params, vars.toArray(), concat(decls, func.body).cdr);
}



Statement.prototype[Cv] = function ( add_vars, add_decls ) {
    return this;
};


Block.prototype[Cv] = function ( add_vars, add_decls ) {
    for ( var c=this.body;  !c.isNil();  c=c.cdr ) {
        c.car = c.car[Cv](add_vars, add_decls);
    }
    return this;
};


VarStatement.prototype[Cv] = function ( add_vars, add_decls ) {
    var assigns = [];
    for ( var i=0;  i < this.decls.length;  i++ ) {
        add_vars(this.decls[i].id);
        if ( this.decls[i].exp ) {
            assigns.push( new SimpleAssignExpression(this.decls[i].id, this.decls[i].exp) );
        }
    }
    if ( !assigns.length ) {
        return new EmptyStatement([], this.lineno, this.source);
    } else {
        var exp = assigns[0];
        for ( var i=1;  i < assigns.length;  i++ ) {
            exp = new CommaExpression(exp, assigns[i]);
        }
        return new ExpStatement([], exp, this.lineno, this.source);
    }
};


IfStatement.prototype[Cv] = function ( add_vars, add_decls ) {
    this.body = this.body[Cv](add_vars, add_decls);
    return this;
};


IfElseStatement.prototype[Cv] = function ( add_vars, add_decls ) {
    this.tbody = this.tbody[Cv](add_vars, add_decls);
    this.fbody = this.fbody[Cv](add_vars, add_decls);
    return this;
};


DoWhileStatement.prototype[Cv] = IfStatement.prototype[Cv];


WhileStatement.prototype[Cv] = IfStatement.prototype[Cv];


ForStatement.prototype[Cv] = IfStatement.prototype[Cv];


ForVarStatement.prototype[Cv] = function ( add_vars, add_decls ) {
    var init = (new VarStatement([], this.decls))[Cv](add_vars, add_decls);
    if ( init instanceof EmptyStatement ) {
        init = null;
    } else {
        init = init.exp;
    }
    return new ForStatement(this.labels, init, this.cond, this.incr, this.body[Cv](add_vars, add_decls), this.lineno, this.source);
};


ForInStatement.prototype[Cv] = IfStatement.prototype[Cv];


ForInVarStatement.prototype[Cv] = function ( add_vars, add_decls ) {
    add_vars(this.decl.id);
    var for_in = new ForInStatement(this.labels, this.decl.id, this.exp, this.body[Cv](add_vars, add_decls), this.lineno, this.source);
    if ( this.decl.exp ) {
        return new Block([], list(
            new ExpStatement([], new SimpleAssignExpression(this.decl.id, this.decl.exp), this.lineno, this.source),
            for_in
        ), this.lineno, this.source);
    } else {
        return for_in;
    }
};


ForEachStatement.prototype[Cv] = IfStatement.prototype[Cv];


ForEachVarStatement.prototype[Cv] = ForInVarStatement.prototype[Cv];


WithStatement.prototype[Cv] = IfStatement.prototype[Cv];


SwitchStatement.prototype[Cv] = function ( add_vars, add_decls ) {
    for ( var c=this.clauses;  !c.isNil();  c=c.cdr ) {
        c.car = c.car[Cv](add_vars, add_decls);
    }
    return this;
};


CaseClause.prototype[Cv] = Block.prototype[Cv];


DefaultClause.prototype[Cv] = Block.prototype[Cv];


TryCatchStatement.prototype[Cv] = function ( add_vars, add_decls ) {
    add_vars(this.variable);
    this.tryBlock   = this.tryBlock[Cv](add_vars, add_decls);
    this.catchBlock = this.catchBlock[Cv](add_vars, add_decls);
    return this;
};


TryFinallyStatement.prototype[Cv] = function ( add_vars, add_decls ) {
    this.tryBlock     = this.tryBlock[Cv](add_vars, add_decls);
    this.finallyBlock = this.finallyBlock[Cv](add_vars, add_decls);
    return this;
};


TryCatchFinallyStatement.prototype[Cv] = function ( add_vars, add_decls ) {
    add_vars(this.variable);
    this.tryBlock     = this.tryBlock[Cv](add_vars, add_decls);
    this.catchBlock   = this.catchBlock[Cv](add_vars, add_decls);
    this.finallyBlock = this.finallyBlock[Cv](add_vars, add_decls);
    return this;
};


FunctionDeclaration.prototype[Cv] = function ( add_vars, add_decls ) {
    add_vars(this.name);
    add_decls( new ExpStatement(
        [],
        new SimpleAssignExpression(
            this.name,
            new FunctionExpression(null, this.params, this.body)
        ),
        this.lineno,
        this.source
    ));
    return new EmptyStatement([]);
};


            return {
                CvConvert: CvConvert
            };
        }();
    }
}
}
}.call(null) ) {
    this.Concurrent.Thread.Compiler.CvConvert = CvConvert;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Cons || (typeof this.Data.Cons != 'object' && typeof this.Data.Cons != 'function') ) this.Data.Cons = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( this.Concurrent.Thread.compile === undefined ) this.Concurrent.Thread.compile = undefined;
    if ( this.Concurrent.Thread.CACHE_LIMIT === undefined ) this.Concurrent.Thread.CACHE_LIMIT = undefined;
    if ( this.Concurrent.Thread.prepare === undefined ) this.Concurrent.Thread.prepare = undefined;
    if ( this.Concurrent.Thread.prepareTree === undefined ) this.Concurrent.Thread.prepareTree = undefined;
with ( function(){
with ( Data.Cons ) {
with ( Concurrent.Thread.Compiler ) {
with ( Concurrent.Thread ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread code.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2006-2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Concurrent.Thread';















var IL = Concurrent.Thread.Compiler.IntermediateLanguage;






var PREFIX            = "$Concurrent_Thread_";
var var_self     = new Identifier(PREFIX + "self");
var var_compiled = new Identifier(PREFIX + "compiled");



function compile ( f ) {
    return eval(prepare(f));
}



CACHE_LIMIT = 50;
var prepare_cache = {};
var cache_history = [];


function prepare ( f ) {
    if ( typeof f != "function" ) throw new TypeError("argument must be a function");
    f = f.toString();
    var c = prepare_cache[f];
    if ( c ) return c;
    c = prepareTree(parseFunction(f)).toString();
    while ( cache_history.length >= CACHE_LIMIT  &&  cache_history.length > 0 ) {  // avoid endless loop
        delete prepare_cache[cache_history.shift()];
    }
    if ( CACHE_LIMIT >= 1 ) {
        prepare_cache[f] = c;
        cache_history.push(f);
    }
    return c;
}

function parseFunction ( f ) {
    var stmts = (new Parser()).parse("(" + f + ");");
    if ( !(stmts.car instanceof ExpStatement) ) throw new Error("not exp-statement!");
    if ( !(stmts.car.exp instanceof FunctionExpression) ) throw new Error("not function-expression!");
    return stmts.car.exp;
}



function prepareTree ( f ) {
    if ( !(f instanceof FunctionExpression) ) Kit.codeBug("not FunctionalExpression");
    var name = f.name;
    f.name = null;
    var g = CssConvert(f);
    g = CvConvert(g);
    g = CsConvert(g);
    g = CuConvert(g);
    g = CfConvert(g);
    g = CzConvert(g);
    return new CallExpression(
        new FunctionExpression(null, [], list(
            new VarStatement([], [{id:var_self, exp:f}]),
            name ? new VarStatement([], [{id:name, exp:var_self}]) : new EmptyStatement([]),
            new ExpStatement([], new SimpleAssignExpression(new DotAccessor(var_self, var_compiled), g)),
            new ReturnStatement([], var_self)
        )),
        []
    );
    /* Constructs the following structure:
        "(function(){",
        "  var $Concurrent_Thread_self = ", f, ";",
        name  ?  "var " + name + " = " + "$Concurrent_Thread_self;"  :  "",
        "  $Concurrent_Thread_self.$Concurrent_Thread_compiled = ", func, ";",
        "  return $Concurrent_Thread_self;",
        "})()"
    */
}


            return {
                compile: compile, prepareTree: prepareTree, prepare: prepare
            };
        }();
    }
}
}
}.call(null) ) {
    this.Concurrent.Thread.compile = compile;
    this.Concurrent.Thread.prepareTree = prepareTree;
    this.Concurrent.Thread.prepare = prepare;
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Compiler || (typeof this.Concurrent.Thread.Compiler != 'object' && typeof this.Concurrent.Thread.Compiler != 'function') ) this.Concurrent.Thread.Compiler = new Object();
with ( function(){
with ( Concurrent.Thread.Compiler ) {

        return function () {
            var VERSION ;
            var NAMESPACE;
            



NAMESPACE = 'Concurrent.Thread.Compiler';



WebBrowser.ScriptExecuter.register("text/x-script.multithreaded-js", function ( src ){
    eval(compile(src)).async(null);
});

function compile ( src ) {
    var prog = (new Parser).parse(src);
    prog = new FunctionExpression(null, [], prog);
    prog = CssConvert(prog);
    prog = CvConvert(prog);
    prog = CsConvert(prog);
    prog = CfConvert(prog);
    prog.vars.forEach(function( it ){
        // Incredibly, window does not have hasOwnProperty method on IE!!
        if ( !Object.prototype.hasOwnProperty.call(window, it) ) window[it] = undefined;
    });
    prog.vars = [];
    prog = CzConvert(prog);
    return [
        "1, function(){",
        "    var $Concurrent_Thread_self = function(){};",
        "    $Concurrent_Thread_self.$Concurrent_Thread_compiled = ", prog, ";",
        "    return $Concurrent_Thread_self;",
        "}()"
    ].join("");
}

            return {
                
            };
        }();
    }
}.call(null) ) {
}
}).call(null);
(function(){
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Continuation || (typeof this.Concurrent.Thread.Continuation != 'object' && typeof this.Concurrent.Thread.Continuation != 'function') ) this.Concurrent.Thread.Continuation = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( this.Concurrent.Thread.Generator === undefined ) this.Concurrent.Thread.Generator = undefined;
with ( function(){
with ( Concurrent.Thread.Continuation ) {
with ( Concurrent ) {
with ( Concurrent.Thread ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Concurrent.Thread.Generator module.
 *
 * The Initial Developer of the Original Code is
 * Daisuke Maki.
 * Portions created by the Initial Developer are Copyright (C) 2008
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



NAMESPACE = 'Concurrent.Thread';











function Generator ( f ) {
    if ( typeof f != "function" ) throw new TypeError("not a function");
    if ( typeof f.$Concurrent_Thread_compiled != "function" ) f = Thread.compile(f);
    this._mutex       = new Mutex();
    this._cont_caller = null;
    this._buf         = null;
    this._got         = false;
    
    var self = this;
    
    var generate = eval(Thread.prepare(function( x ){
        self._buf = x;
        self._got = true;
        try {
            self._cont_iter = currentContinuation();
            self._cont_caller();
        } catch ( e ) {
            self._cont_iter = null;
            if ( e instanceof ContinuationCalledException ) {
                return;  // resume iteration
            } else {
                throw e;
            }
        }
        // execution never reaches here
    }));
    
    this._cont_iter = eval(Thread.prepare(function(){
        f(generate);
        self._got       = false;
        self._cont_iter = null;  // null means that the iteration function has finished
        self._cont_caller();
    }));
}


var proto = Generator.prototype;


proto.hasNext = function ( ) {
    // This definition is called when generator is used in non-converted context.
    // The implementation is quite tricky and strongly dependent on the internal
    // implementation of Concurrent.Thread.

    if ( !this._mutex.isAcquirable() ) this._mutex.acquire();  // must throw an error
    if ( this._got            ) return true;
    if ( !this._cont_iter     ) return false;
    
    var is_called = false;
    this._cont_caller = eval(Thread.prepare(function(){
        is_called = true;
        Thread.stop();
    }));

    var triplet = Thread.create(this._cont_iter)._triplet;
    triplet.timeout = void 0;
    while ( 1 ) {
        while ( triplet.timeout === void 0 ) {
            try {
                triplet = triplet.continuation.procedure.call(
                              triplet.continuation.this_val, triplet.ret_val
                         );
            } catch ( e ) {
                if ( e instanceof NoContinuationException ) {
                    return this._got;
                } else if ( e instanceof NoExceptionHandlerException ) {
                    throw e.thrown;
                } else {
                    triplet.continuation = triplet.continuation.exception;
                    triplet.ret_val      = e;
                }
            }
        }
        if ( is_called ) {
            break;
        } else {
            triplet.continuation = triplet.continuation.exception;
            triplet.ret_val      = new Error("can't suspend in non-converted context");
        }
    }
    this._cont_caller = null;
    return this._got;
};


proto.hasNext.$Concurrent_Thread_compiled = eval(Thread.prepare(
    function ( ) {
        this._mutex.acquire();
        try {
            if ( this._got        ) return true;
            if ( !this._cont_iter ) return false;
            try {
                this._cont_caller = currentContinuation();
                this._cont_iter();
            } catch ( e ) {
                this._cont_caller = null;
                if ( e instanceof ContinuationCalledException ) {
                    return this._got;
                } else {
                    throw e;
                }
            }
        } finally {
            this._mutex.release();
        }
        // execution never reaches here
    }
)).$Concurrent_Thread_compiled;


proto.next = eval(Thread.prepare(
    function ( ) {
        if ( this.hasNext() ) {
            var x = this._buf;
            this._buf = void 0;
            this._got = false;
            return x;
        } else {
            return void 0;
        }
    }
));

            return {
                Generator: Generator
            };
        }();
    }
}
}
}.call(null) ) {
    this.Concurrent.Thread.Generator = Generator;
}
}).call(null);
(function(){
    if ( !this.WebBrowser || (typeof this.WebBrowser != 'object' && typeof this.WebBrowser != 'function') ) this.WebBrowser = new Object();
    if ( !this.WebBrowser.GUI || (typeof this.WebBrowser.GUI != 'object' && typeof this.WebBrowser.GUI != 'function') ) this.WebBrowser.GUI = new Object();
    if ( !this.WebBrowser.GUI.Event || (typeof this.WebBrowser.GUI.Event != 'object' && typeof this.WebBrowser.GUI.Event != 'function') ) this.WebBrowser.GUI.Event = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.Event || (typeof this.Concurrent.Thread.Event != 'object' && typeof this.Concurrent.Thread.Event != 'function') ) this.Concurrent.Thread.Event = new Object();
    if ( !this.Util || (typeof this.Util != 'object' && typeof this.Util != 'function') ) this.Util = new Object();
    if ( !this.Util.Arrayize || (typeof this.Util.Arrayize != 'object' && typeof this.Util.Arrayize != 'function') ) this.Util.Arrayize = new Object();
    if ( this.Concurrent.Thread.Event.waitFor === undefined ) this.Concurrent.Thread.Event.waitFor = undefined;
    if ( this.Concurrent.Thread.Event.select === undefined ) this.Concurrent.Thread.Event.select = undefined;
with ( function(){
with ( Util.Arrayize ) {
with ( WebBrowser.GUI.Event ) {
with ( Concurrent ) {
with ( Concurrent.Thread.Event ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            


NAMESPACE = 'Concurrent.Thread.Event';
















var waitFor = eval(Concurrent.Thread.prepare(
    function waitFor ( target, type, options ) {
        var arg = {};
        for ( var i in options ) arg[i] = options[i];
        arg.target = target;
        arg.type   = type;
        return select(arg);
    }
));



var select = eval(Concurrent.Thread.prepare(
    function select ( /* variable args */ ) {
        try {
            var signal = {};
            set_handlers(arrayize(arguments), signal);
            Concurrent.Thread.stop();
        } catch ( e ) {
            if ( e === signal ) {
                return signal.event;
            } else {
                throw e;
            }
        }
    }
));


function set_handlers ( args, signal ) {
    var self = Concurrent.Thread.self();
    
    args = args.map(function( arg ){
        if ( !arg.target || typeof arg.target !== "object" ) {
            throw new TypeError("not a object: " + target);
        }
        return {
            target         : arg.target,
            type           : String(arg.type),
            useCapture     : Boolean(arg.useCapture),
            preventDefault : Boolean(arg.preventDefault),
            stopPropagation: Boolean(arg.stopPropagation)
        };
    });
    
    var lsn_ids = args.map(function( arg ){
        function handler ( e ) {
            if ( arg.preventDefault  ) e.preventDefault();
            if ( arg.stopPropagation ) e.stopPropagation();
            lsn_ids.forEach(function( id ){
                detach(id);
            });
            // IE invalidates event properties after leaving the event handler.
            // So, we pass a copy of the current event object (but DO NOT copy its methods).
            var evt = {};
            for ( var i in e ) {
                if ( typeof e[i] !== "function" ) evt[i] = e[i];
            }
            signal.event  = evt;
            self.notify(signal);
        }
        return attach(arg.target, arg.type, handler, arg.useCapture);
    });
}

            return {
                waitFor: waitFor, select: select
            };
        }();
    }
}
}
}
}.call(null) ) {
    this.Concurrent.Thread.Event.waitFor = waitFor;
    this.Concurrent.Thread.Event.select = select;
}
}).call(null);
(function(){
    if ( !this.Data || (typeof this.Data != 'object' && typeof this.Data != 'function') ) this.Data = new Object();
    if ( !this.Data.Error || (typeof this.Data.Error != 'object' && typeof this.Data.Error != 'function') ) this.Data.Error = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent || (typeof this.Concurrent != 'object' && typeof this.Concurrent != 'function') ) this.Concurrent = new Object();
    if ( !this.Concurrent.Thread || (typeof this.Concurrent.Thread != 'object' && typeof this.Concurrent.Thread != 'function') ) this.Concurrent.Thread = new Object();
    if ( !this.Concurrent.Thread.JSON || (typeof this.Concurrent.Thread.JSON != 'object' && typeof this.Concurrent.Thread.JSON != 'function') ) this.Concurrent.Thread.JSON = new Object();
    if ( !this.Concurrent.Thread.JSON.RPC || (typeof this.Concurrent.Thread.JSON.RPC != 'object' && typeof this.Concurrent.Thread.JSON.RPC != 'function') ) this.Concurrent.Thread.JSON.RPC = new Object();
    if ( !this.JSON || (typeof this.JSON != 'object' && typeof this.JSON != 'function') ) this.JSON = new Object();
    if ( !this.Util || (typeof this.Util != 'object' && typeof this.Util != 'function') ) this.Util = new Object();
    if ( !this.Util.Arrayize || (typeof this.Util.Arrayize != 'object' && typeof this.Util.Arrayize != 'function') ) this.Util.Arrayize = new Object();
    if ( this.Concurrent.Thread.JSON.RPC.bind === undefined ) this.Concurrent.Thread.JSON.RPC.bind = undefined;
    if ( this.Concurrent.Thread.JSON.RPC.JSONRPCError === undefined ) this.Concurrent.Thread.JSON.RPC.JSONRPCError = undefined;
with ( function(){
with ( Data.Error ) {
with ( Util.Arrayize ) {
with ( JSON ) {
with ( Concurrent ) {
with ( Concurrent.Thread.JSON.RPC ) {

        return function () {
            var VERSION = '0.0.0';
            var NAMESPACE;
            


NAMESPACE = 'Concurrent.Thread.JSON.RPC';

















function bind ( opts ) {
    if ( !(opts instanceof Object) ) throw new TypeError("argument for " + NAMESPACE + ".bind must be a hash.");
    var request = opts.request;
    if ( request != null ) {
        if ( !String(request).match(/^(?:GET|POST)$/i) ) throw new Error('"request" option must be "GET" or "POST".');
    } else {
        request = "POST";
    }
    var params = opts.params;
    if ( params != null ) {
        if ( !String(params).match(/^(?:Named|Positioned)$/i) ) throw new Error('"params" option must be "Named" or "Positioned".');
    } else {
        params = "Named";
    }
    var body;
    if ( request.match(/^POST$/i) ) {
        if ( params.match(/^Named$/i) ) {
            body = makeNamedPost(opts.url, opts.method);
        } else {
            body = makePositionedPost(opts.url, opts.method);
        }
    } else {
        if ( params.match(/^Named$/i) ) {
            body = makeNamedGet(opts.url, opts.method);
        } else {
            body = makePositionedGet(opts.url, opts.method);
        }
    }
    var with_pre;
    var pre = opts.preprocess;
    if ( pre != null ) {
        if ( typeof pre != "function" ) throw new TypeError('"preprocess" option must be function');
        with_pre = eval(Thread.prepare(function(){
            return body.apply(this, pre.apply(this, arguments));
        }));
    } else {
        with_pre = body;
    }
    var post = opts.postprocess;
    if ( post != null ) {
        if ( typeof post != "function" ) throw new TypeError('"preprocess" option must be function');
        return eval(Thread.prepare(function(){
            return post(with_pre.apply(this, arguments));
        }));
    } else {
        return with_pre;
    }
}


var COMMON_HEADERS = [
    'User-Agent'  , 'Concurrent.Thread.JSON.RPC',
    'Accept'      , 'application/json'
];

var POST_HEADERS = COMMON_HEADERS.concat(
    'Content-type', 'application/json'
);

function makeNamedPost( url, method ) {
    return eval(Thread.prepare(
        function ( /* variable arguments */ ) {
            var res = Thread.Http.post(url, dump({
                version: "1.1",
                method : method,
                params : args2params(arguments)
            }), POST_HEADERS);
            res = eval("(" + res.responseText + ")");
            if ( res.error ) throw new JSONRPCError(res.error);
            return res.result;
        }
    ));
};

function makePositionedPost ( url, method ) {
    return eval(Thread.prepare(
        function ( /* variable arguments */ ) {
            var res = Thread.Http.post(url, dump({
                version: "1.1",
                method : method,
                params : arrayize(arguments)
            }), POST_HEADERS);
            res = eval("(" + res.responseText + ")");
            if ( res.error ) throw new JSONRPCError(res.error);
            return res.result;
        }
    ));
};

function makeNamedGet ( url, method ) {
    url = url.replace(/\/+$/, "") + "/" + encodeURIComponent(method) + "?";
    return eval(Thread.prepare(
        function ( /* variable arguments */ ) {
            var res = Thread.Http.get(url + params2query(args2params(arguments)), COMMON_HEADERS);
            res = eval("(" + res.responseText + ")");
            if ( res.error ) throw new JSONRPCError(res.error);
            return res.result;
        }
    ));
};

function makePositionedGet ( url, method ) {
    url = url.replace(/\/+$/, "") + "/" + encodeURIComponent(method) + "?";
    return eval(Thread.prepare(
        function ( /* variable arguments */ ) {
            arguments[arguments.length] = {};
            arguments.length++;
            var res = Thread.Http.get(url + params2query(args2params(arguments)), COMMON_HEADERS);
            res = eval("(" + res.responseText + ")");
            if ( res.error ) throw new JSONRPCError(res.error);
            return res.result;
        }
    ));
};

function args2params ( args ) {
    var params = {};
    if ( args.length ) {
        var hash = args[args.length-1];
        if ( !(hash instanceof Object) ) throw new Error("the last argument must be a hash");
        for ( var i in hash ) {
            if ( hash.hasOwnProperty(i) ) params[i] = hash[i];
        }
        for ( var i=0;  i < args.length-1;  i++ ) {
            params[i] = args[i];
        }
    }
    return params;
}

function params2query ( params ) {
    var query = [];
    for ( var i in params ) {
        if ( !params.hasOwnProperty(i) ) continue;
        if ( params[i] instanceof Array ) {
            var arr = params[i];
            for ( var j=0;  j < arr.length;  j++ ) {
                query.push(encodeURIComponent(i) + "=" + encodeURIComponent(arr[j]));
            }
        } else {
            query.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));
        }
    }
    return query.join("&");
}



var JSONRPCError = Error.extend(
    function ( $super, e ) {
        if ( e instanceof Object ) {
            $super(e.message);
            for ( var i in e ) this[i] = e[i];
        } else {
            $super(e);
        }
    },
    {name: NAMESPACE + ".JSONRPCError"}
);

            return {
                JSONRPCError: JSONRPCError, bind: bind
            };
        }();
    }
}
}
}
}
}.call(null) ) {
    this.Concurrent.Thread.JSON.RPC.JSONRPCError = JSONRPCError;
    this.Concurrent.Thread.JSON.RPC.bind = bind;
}
}).call(null);
