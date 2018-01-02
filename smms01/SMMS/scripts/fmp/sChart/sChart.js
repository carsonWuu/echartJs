
if(typeof(Prototype) == 'undefined' || Prototype.Version < '1.5.1'){
	throw 'SChart depends on the Prototype framework (version 1.5.1).';
}

if(typeof(SChart) == 'undefined'){
	SChart = {
		author:  'Bas Wenneker',
		name: 	 'SChart',
		version: '0.3.0'
	};
}

if(typeof(SChart.Base) == 'undefined'){
	SChart.Base = {};
}

/*
	Function: items
		Collects all the nonfunction values of the passed object.
	
	Parameters:
		obj - Object with key:value pairs.
	
	Returns:
		An array of all nonfunction values of obj.
		
	Example:
		(start code)
		var value_arr = SChart.Base.items({
			foo: 'bar',
			baz: 99,
			fooFunc: function(){ }
		}); //=> ['bar', 99]		
		(end)
*/
SChart.Base.items = function(/*Object*/obj){
	
	return Object.values(obj).reject(function(item){
		return (typeof(item) == 'function');
	});
};

/*
	Function: SChart.Base.merge
		Recursively merge the passed objects. The 1nd arguments attributes are overwritten by the attributes of the 2nd argument.
		
	Parameters:
		ext - Some object to extend.
		obj - Object that overrides ext.
	
	Example:
		(start code)
		var a = {
			foo:{
				bar: 'foo.bar',
				baz: 2
			},
			boo: null
		};
		
		var b = {
			foo: {
				bar: 99,
				barbaz: 'hi'
			}
		};		
		
		var merged = SChart.Base.merge(a, b);
		
		// merged now holds: 
		// {
		//		foo: {bar: 99, baz: 2, barbaz: 'hi'},
		//		boo: null
		// }		
		(end)
*/
SChart.Base.merge = function(/*Object*/ext, /*Object*/obj){
	
	var result = ext || {};
    for(var i in obj){		
		result[i] = (typeof(obj[i]) == 'object' && !(obj[i].constructor == Array || obj[i].constructor == RegExp)) ? SChart.Base.merge(ext[i], obj[i]) : result[i] = obj[i];        
    }
    return result;
};

/*
	Function: isNil
		Check if the passed object is null or undefined.
	
	Parameters:
		obj - Object to check.
	
	Returns:
		True if obj is null or undefined, false otherwise.
*/
SChart.Base.isNil = function(/*Object*/obj){
	
	return (obj === null || typeof(obj) == 'undefined');
};

/*
	Function: excanvasSupported
		Check if canvas simulation by ExCanvas is supported by the browser.
		
	Returns:
		True if userAgent is IE, false otherwise.
*/
SChart.Base.excanvasSupported = function(){
	
	return (/MSIE/.test(navigator.userAgent) && !window.opera);
};

/*
	Function: isSupported
		Check if canvas is supported by the browser.
		
	Parameters:
		canvasId - (optional) Id of the canvas element.
		
	Returns:
		True if canvas is supported, false otherwise.
*/
SChart.Base.isSupported = function(/*String*/canvasId){
    
    try{
		((SChart.Base.isNil(canvasId)) ? document.createElement('canvas') : $(canvasId)).getContext('2d');
		
    }catch(e){
        
		var ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
		return ((!ie) || (ie[1] < 6) || (navigator.userAgent.toLowerCase().indexOf('opera') != -1));
    }
	return true;
};

/*
	Function: uniqueIndices
		Checks arr for the element with the largest length and returns an array with elements 0 .. length.
	
	Parameters:
		arr - Array of arrays.
		
	Returns:
		An array with a range of integers.
		
	Example:
		(start code)
		var someArray = [
			['hello', 'world'],
			['SChart', 'rulez', 'yeah'],
			['l33t']
		];
		var range = SChart.Base.uniqueIndices(someArray); //=> [0, 1, 2]
		(end)
*/
SChart.Base.uniqueIndices = function(/*Array*/arr){
	
	return new ObjectRange(0,arr.max(function(item){		
		return item.length;
	})).toArray();	
};

/*
	Function: sum
		Counts all integers in the array.
	
	Parameters:
		arr - Array of Integers.
		
	Returns:
		Returns the sum of all integers in the passed array.
*/
SChart.Base.sum = function(/*Integer[]*/ arr){
	
	return arr.flatten().inject(0, function(sum, n) { 
		return sum + n; 
	});
};

/*
	Function: generateColorscheme
		This function generates a colorScheme based on the passed hex string. It returns an Hash with the name of the dataset key as key, and a color as corresponding value.
	
	Parameters;
		hex - String with hexadecimal color code like '#ffffff'.
		keys - Keys of the corresponding Dataset Hash.
		
	Returns:
		An Hash with color codes.
		
	Example:
		(start code)
		var keys = [
			'firstSet',
			'secondSet',
			'thirdSet'
		];
		var scheme = SChart.Base.generateColorscheme('#000000', keys);
		//=> {firstSet: '#<hexcode>', secondSet: '#<hexcode>', thirdSet: '#<hexcode>'}
		(end)
*/
SChart.Base.generateColorscheme = function(/*String*/hex, /*String[]*/keys){
	
	if(keys.length === 0){
		return new Hash();
	}
	
	var color = new SChart.Color(hex);
	var result = new Hash();
	
	keys.each(function(index){
		result[index] = color.lighten(25).toHexString();
	});
	
	return result;
};

/*
	Function: defaultScheme
		Function that returns the default colorscheme for SChart.
	
	Parameters:
		keys - Keys of the corresponding Dataset Hash.
		
	Returns:
		An Hash with color codes.
*/
SChart.Base.defaultScheme = function(/*String[]*/keys){
	
	return SChart.Base.generateColorscheme('#3c581a', keys);
};


/*
	Function: getColorscheme
		Function returns a colorscheme, but the input can be {red, green, blue, grey, black}.
		
	Parameters:
		hex - String with hexadecimal color code like '#ffffff'.
		keys - Keys of the corresponding Dataset Hash.
		
	Returns:
		An Hash with color codes.
*/
SChart.Base.getColorscheme = function(/*String*/color, /*String[]*/keys){
	
	return SChart.Base.generateColorscheme(SChart.Base.colorSchemes[color] || color, keys);
};

/*
	 Object: colorSchemes
	 	Object with key:value pairs that assigns a color name to a hex color code. These are the predefined color schemes.
*/
SChart.Base.colorSchemes = {
	red: '#6d1d1d',
	green: '#3c581a',
	blue: '#224565',
	grey: '#444444',
	black: '#000000',
	darkcyan: '#305755'
};

SChart.Color = Class.create();
SChart.Color.prototype = {
	
	initialize: function(color){
		
		this.toHex(color);
	},

/*
	Function: toHex
		Parses and stores the hex values of the input color string.
	
	Parameters:
		color - Hex or rgb css string
*/
	toHex: function(/*String*/color){
		
		if(/^#?([\da-f]{3}|[\da-f]{6})$/i.test(color)){
		
			color = color.replace(/^#/, '').replace(/^([\da-f])([\da-f])([\da-f])$/i, "$1$1$2$2$3$3");
			this.r = parseInt(color.substr(0,2), 16);
			this.g = parseInt(color.substr(2,2), 16);
			this.b = parseInt(color.substr(4,2), 16);
   		}else if(/^rgb *\( *\d{0,3} *, *\d{0,3} *, *\d{0,3} *\)$/i.test(color)){
      		
			color = color.match(/^rgb *\( *(\d{0,3}) *, *(\d{0,3}) *, *(\d{0,3}) *\)$/i);
			this.r = parseInt(color[1], 10);
			this.g = parseInt(color[2], 10);
			this.b = parseInt(color[3], 10);
		}
		return this.check();
	},
	
/*
	Function: lighten
		Lightens the color.
	
	Parameters:
		level - level to lighten the color with.
*/
	lighten: function(/*Integer*/level){
		this.r += parseInt(level, 10);
   		this.g += parseInt(level, 10);
		this.b += parseInt(level, 10);

   		return this.check();
	},
	
/*
	Function: darken
		Darkens the color.
	
	Parameters:
		level - level to darken the color with.
*/
	darken: function(/*Integer*/level){
		this.r -= parseInt(level, 10);
   		this.g -= parseInt(level, 10);
		this.b -= parseInt(level, 10);
		
   		return this.check();
	},

/*
	Function: check
		Checks and validates if the hex values r, g and b are between 0 and 255.
*/
	check: function(){
		if(this.r>255){this.r=255;}else if(this.r<0){this.r=0;}
		if(this.g>255){this.g=255;}else if(this.g<0){this.g=0;}
		if(this.b>255){this.b=255;}else if(this.b<0){this.b=0;}
	
	   return this;
	},
	
/*
	Function: toHexString
		Returns a css hex string.
*/
	toHexString: function(){
		return '#' + [this.r, this.g, this.b].invoke('toColorPart').join('');
	},
	
/*
	Function: toRgbString
		Returns a css rgb string.
*/
	toRgbString: function(){
		return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';		
	},
	
/*
	Function: toRgbaString
		Returns a css rgba string.
*/
	toRgbaString: function(alpha){
		return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + alpha +')';		
	}	
	
};

if(typeof(SChart.Base) == 'undefined'){
	throw 'SChart.Chart depends on SChart.Base.';
}


/*
	Class: SChart.Chart  
		Implements basic charting functions used by BarChart, PieChart
		and LineChart.
*/
SChart.Chart = {
	
/*
	Constructor: initialize
		Initializes the canvas, options and the storage hash.
*/
	initialize: function(/*String*/element, /*Object*/options){
				
		// Initialize storage hash.
		this.dataSets = new Hash();	
				
		// Override the default options.
		this.setOptions(options);	
		
		// Initialize the canvas element.
		this._initCanvas(element);
	},
		
/*
	Function: addDataset		
		Adds an object containing chart data to the storage hash.
	
	Parameters:		
		dataset - The dataset to add. This object has key:value pairs. The value is an array of arrays.
			
	Example:		
		(start code)
		var bar = new SChart.BarChart('canvasElement', options);
		bar.addDataset({
			'first': [[0, 1], [1, 1], [2, 1.414]],
			'second': [[0, 0.3], [1, 2.67], [2, 1.34]],
			...
		});
		(end)
	
	See Also:			
		<addTable>
*/
	addDataset: function(/*Object*/dataset){
		
		this.dataSets.merge(dataset);
	},
	
/*
	Function: addTable
		This function makes it easy to parse a table and show it's data in a chart. The upper left corner has coordinates (x=0,y=0).
		
	Parameters:
		table - table element id.
		x - xcoordinate to start table parsing (left = 0).
		y - ycoordinate to start table parsing (top = 0).
		xticks - row number of row with labels for xticks.
*/
	addTable: function(/*String*/table, x, y, xticks){
		
		var tr = $$('table#' + table + ' tbody tr');
		var thead = $$('table#' + table + ' thead td');
		table = $(table);		
		x = x || 0;
		y = y || 0;
		xticks = xticks || -1;	
		
		var store = {};
		var labels = [];
		
		for(var i = y, ln = tr.length, key = ''; i < ln; i++){
			var j = 0;
			key = ( thead[i] && thead[i].innerHTML.length ) ? thead[i].innerHTML : 'row_'+i;
			store[key] = Array.from(tr[i].cells).reject(function(cell,index){
				return index < x;
			}).collect(function(cell){
				return [j++, parseFloat(cell.innerHTML)];
			});
		}
		if(xticks >= 0){
			var tickIndex = 0;
			this.options.axis.x.ticks = Array.from(tr[xticks].cells).reject(function(cell,index){
				return index < x;
			}).collect(function(cell){
				return {v: tickIndex++, label: cell.innerHTML};
			});
		}
		this.addDataset(store);
	},

/*
	Function: _eval
		(Private) Everytime a chart is rendered, we need to evaluate metric for the axis.
		
	Parameters:
		options - (optional) Options object to override the default options.
*/
	_eval: function(options){
		
		if(!!(options)){			
			this.setOptions(options);
		}
		
		// Todo!
		this.stores = this.dataSets.values();
		this._evalXY();
		this.setColorscheme();
	},
	
/*
	Function: _evalXY
		(Private) Calculates all kinds of metrics for the x and y axis. 
*/
	_evalXY: function(){
		
		// Calculate area data.
		this.area = {
 	        x: this.options.padding.left,
 	        y: this.options.padding.top,
 	        w: this.canvasNode.width - this.options.padding.left - this.options.padding.right,
 	        h: this.canvasNode.height - this.options.padding.top - this.options.padding.bottom
 	    };
		
		// Gather data for the x axis.
		var xdata = this.stores.collect(function(item){return item.pluck(0);}).flatten();
		if(!!(this.options.axis.x.values)){
			
			this.minxval = this.options.axis.x.values[0];
	        this.maxxval = this.options.axis.x.values[1];
			this.xscale = this.maxxval - this.minxval;			
		}else{
		
			this.minxval = (this.options.xOriginIsZero) ? 0 : parseFloat(xdata.min());
			this.maxxval = parseFloat(xdata.max());
		}
		this.xrange = this.maxxval - this.minxval;
		this.xscale = (this.xrange === 0) ? 1.0 : 1/this.xrange;	
		
		// Gather data for the y axis.
		var ydata = this.stores.collect(function(item){return item.pluck(1);}).flatten();
		if(!!(this.options.axis.y.values)){
			
			this.minyval = this.options.axis.y.values[0];
	        this.maxyval = this.options.axis.y.values[1];
			this.yscale = this.maxyval - this.minyval;			
		}else {
			
			this.minyval = (this.options.yOriginIsZero) ? 0 : parseFloat(ydata.min());
			this.maxyval = parseFloat(ydata.max());
		}

	    this.yrange = this.maxyval - this.minyval;
		this.yscale = (this.yrange === 0) ? 1.0 : 1/this.yrange;
	},
	
/*
	Function: _evalLineTicks
		(Private) Evaluates line ticks for x and y axis.
*/
	_evalLineTicks: function(){		
		
		if(this.type == 'pie'){
			return;		
		}
		
		// Evaluate xTicks
		if(this.options.axis.x.ticks){	
			
			this.xticks = this.options.axis.x.ticks.collect(function (tick){
				
				var label = tick.label;
	            if(SChart.Base.isNil(label)){
	                
					label = tick.v.toString();
				}
				
	            var pos = this.xscale * (tick.v - this.minxval);
	            if((pos >= 0.0) && (pos <= 1.0)){
	                
					return [pos, label];
	            }
			}.bind(this));
			
	    } else if(this.options.axis.x.tickCount){
	        var uniqx = SChart.Base.uniqueIndices(this.stores);
	        var roughSeparation = this.xrange / this.options.axis.x.tickCount;
			
	        this.xticks = [];
	        for (var i = 0, j = 0; i <= uniqx.length && j < this.options.axis.x.tickCount; i++){

			    if((uniqx[i+1] - this.minxval) >= (j * roughSeparation)){
	               
				    var pos = this.xscale * (uniqx[i] - this.minxval);
	                if((pos > 1.0) || (pos < 0.0)){
	                    continue;
					}
					
					this.xticks.push([pos, uniqx[i+1]]);
	                j++;
	            }				
	        }
    	}
		
		// Evaluate yTicks
		this.yticks = [];
		if(this.options.axis.y.ticks){
		
			this.yticks = this.options.axis.y.ticks.collect(function(tick){
				            
				var pos = 1.0 - (this.yscale * (tick.v - this.minyval));
	            if((pos >= 0.0) && (pos <= 1.0)){
	            	return [pos, ((!tick.label) ? tick.v.toString() : tick.label)];
	            }
			}.bind(this));
	    }else if(this.options.axis.y.tickCount > 0){ 
			var prec = this.options.axis.y.tickPrecision;
			var num = this.yrange/this.options.axis.y.tickCount;
			var roughSeparation = (num < 1 && prec == 0) ? 1 : num.toFixed(prec);
			
	        for(var i = 0; i <= this.options.axis.y.tickCount; i++){
	            var yval = this.minyval + (i * roughSeparation);
	            var pos = 1.0 - ((yval - this.minyval) * this.yscale);
	            
				if((pos > 1.0) || (pos < 0.0)){
	                continue;
				}
	            
				this.yticks.push([pos, yval.toFixed(prec)]);
	        }
    	}
	}
};

if(typeof(SChart.Base) == 'undefined' ||
	typeof(SChart.Chart) == 'undefined'){
	throw 'SChart.Canvas depends on SChart.{Base, Chart}.';
}

 
Object.extend(SChart.Chart, {
	
	resetFlag: false,
	
	/**
	 * Sets options of this chart. Current options are:
	 * - drawBackground: whether a background should be drawn. {Boolean}
	 * - backgroundLineColor: color of backgroundlines. {String}
	 * - backgroundColor: background color. {String}
	 * - padding: padding. {Object}
	 * - colorScheme: Array of colors used for chart. {Array}
	 * - strokeColor: color of a stroke. {String}
	 * - strokeWidth: width of a stroke. {Number}
	 * - fillOpacity: opacity to use when filling bars/lines/pies. {Number}
	 * - shouldFill: whether bars/lines/pies should be filled. {Boolean}
	 * - shouldStroke: whether strokes should be drawn. {Boolean}
	 * - drawXAxis: whether the X axis should be drawn. {Boolean}
	 * - drawYAxis: whether the Y axis should be drawn. {Boolean}
	 * - axisTickSize: size of a tick in pixels. {Number}
	 * - axisLineColor: color of axis lines. {String}
	 * - axisLineWidth: line width of axis. {Number}
	 * - axisLabelColor: axis label color. {String}
	 * - axisLabelFont: font familily used for labels. {String}
	 * - axisLabelFontSize: font size used for labels. {String}
	 * - axisLabelWidth: axis label width. {Number} 
	 * - barWidthFillFraction: sets the bar width (>1 will cause bars to overlap eachother). {Integer} 
	 * - barOrientation: whether bars are horizontal. {'horizontal','vertical'} 
	 * - xOriginIsZero: whether or not the origin of the X axis starts at zero. {Boolean}
	 * - yOriginIsZero: whether or not the origin of the Y axis starts at zero. {Boolean}
	 * - xAxis: values of xAxis {[xmin,xmax]}
	 * - yAxis: values of yAxis {[ymin,ymax]}
	 * - xTicks: labels for the X axis. {[{label: "somelabel", v: value}, ..]} (label = optional)
	 * - yTicks: labels for the Y axis. {[{label: "somelabel", v: value}, ..]} (label = optional)
	 * - xNumberOfTicks: number of ticks on X axis when xTicks is null. {Integer}
	 * - yNumberOfTicks: number of ticks on Y axis when yTicks is null. {Integer}
	 * - xTickPrecision: decimals for the labels on the X axis. {Integer}
	 * - yTickPrecision: decimals for the labels on the Y axis. {Integer}
	 * - shadow: whether or not to show shadow. {Boolean}
	 * 
	 * @param {Object} options - Object with options.
	 */
	setOptions: function(options){
				
		this.options = SChart.Base.merge({
			axis: {
				lineWidth:			1.0,
				lineColor:			'#000000',
				tickSize:			3.0,
				labelColor:			'#666666',
				labelFont:			'Tahoma',
				labelFontSize:		9,
				labelWidth: 		50.0,
				x: {
					hide:			false,					
					ticks:			null,
					tickCount:		10,
					tickPrecision:	1,
					values:			null
				},
				y: {
					hide:			false,
					ticks:			null,
					tickCount:		10,
					tickPrecision:	1,					
					values:			null			
				}	
			},
			background: {
				color:				'#f5f5f5',
				hide:				false,
				lineColor:			'#ffffff',
				lineWidth:			1.5
			},
			legend:	{
				opacity:			0.8,
				borderColor:		'#000000',
				style:				{},
				hide:				false,
				position:			{top: '20px', left: '40px'}				
			},
	        padding: {
				left: 				30, 
				right: 				30, 			
				top: 				5,
				bottom: 			10
			},			
			stroke:	{
				color:				'#ffffff',
				hide:				false,								
				shadow:				true,
				width:				2	
			},			
			fillOpacity:			1.0,
	        shouldFill: 			true,
			barWidthFillFraction:	0.75,
			barOrientation: 		'vertical',
        	xOriginIsZero: 			true,
			yOriginIsZero:			true,
			pieRadius: 				0.4,						
			colorScheme: 			SChart.Base.defaultScheme(this.dataSets.keys())
	    }, options || {});
	},
	
/*
	Function: reset
		Resets options and datasets.
*/
	reset: function(){
		
		this.resetFlag = true;
		
		// Set options to their defaults.
		this.setOptions();
		
		// Empty the datasets.
		this.dataSets = new Hash();
					
		// Stop the delay.
		if(!!this.renderDelay){
			this.renderDelay.stop();
			delete this.renderDelay;
		}		
	},
	
/*
	Function: _initCanvas
		(Private) Initializes the canvas tag, and does some pre rendering checks.
		
	Parameters: 
		element - canvas element id.
*/
	_initCanvas: function(/*String*/element){
				
		if(this.resetFlag){
			// Set the reset flag back to false.
			this.resetFlag = false;

			if(!!(element) && this.elementId == element){				
				// Clear canvas and html wrapper.
				this.clean();
			}				
		}
		
		// Store the element ID, usefull when resetting a chart.
		this.elementId = element;
		
		// Store the canvas node.
		this.canvasNode = $(element);
		
		// Store its parent and pass certain styles in order to draw axis labels at the right position.
		this.containerNode = Element.setStyle($(this.canvasNode.parentNode), {position: 'relative',width: this.canvasNode.width + 'px'});
					
		// Decide if we're dealing with IE.
		this.isIE = SChart.Base.excanvasSupported();
				
	    if(this.isIE && !SChart.Base.isNil(G_vmlCanvasManager)){
			
			// Number of retries before halting the rendering.
	        this.maxTries = 20;
			
			this.renderStack = new Hash();
			
			// Initialize and overwrite the canvas node.
	        this.canvasNode = G_vmlCanvasManager.initElement(this.canvasNode);			
	    }
		
		if(!(this.canvasNode)){
			throw 'SChart.Canvas(): Could\'nt find canvas.';
		}else if(!(this.containerNode) || this.containerNode.nodeName.toLowerCase() != 'div'){
			throw 'SChart.Canvas(): Canvas element is not enclosed by a <div> element.';	
		}else if(!(this.isIE) && !(SChart.Base.isSupported(element))){
        	throw "SChart.Canvas(): Canvas is not supported.";
		}	
							
		// All html labels and legends are put in this wrapper.
		this.htmlWrapper = $(document.createElement('div'));
		this.containerNode.appendChild(this.htmlWrapper);	
	},
	
/*
	Function: _render
		(Private) Function that does basic rendering of the legend and background. This function is called by all charts.
	
	Parameters:
		element - (Optional) canvas element id.
*/
	_render: function(/*String*/element){
				
		if(!!(element)){
			this._initCanvas(element);						
		}		
		
		this._renderBackground();
		
		this._addLegend();	
	},

/*
	Function: clean
		Clears a canvas tag, this removes all renderings including axis, legends etc.
*/
	clean: function(){
		// Empty legend and axis.
		this.htmlWrapper.remove();
				
		// Clear canvas.
		this.canvasNode.getContext('2d').clearRect(0, 0, $(this.canvasNode).readAttribute('width'), this.canvasNode.readAttribute('height'));
	},

/*
	Function: getLegend
		Returns a html table element containing the legend. This is usefull when you want to place the legend somewhere else than default or maybe outside the canvas tag.
*/
	getLegend: function(){			

		var legend = Element.setStyle(document.createElement('table'), Object.extend({
			position: 		'absolute',
			top:			this.options.legend.position.top,
			left:			this.options.legend.position.left,
			fontSize: 		this.options.axis.labelFontSize + 'px',			
			fontFamily: 	this.options.axis.labelFont,
			zIndex: 		12,
			border: 		'1px solid '+ this.options.legend.borderColor,
			overflow: 		'hidden',
			height: 		'22px',
			backgroundColor:'white',
			filter:			'alpha(opacity=' + this.options.legend.opacity + ')',
			opacity:		this.options.legend.opacity
		}, this.options.legend.style));
		legend.addClassName('SChart-legend');
		
		var cStyle = {
			width:			'10px',
			height:			'10px',
			border:			'1px solid ' + this.options.legend.borderColor,
			margin:			'2px'
		};		
		
		var body = document.createElement('tbody');
		var cbox, desc, row;
		this.dataSets.keys().each(function(key){
			cStyle.backgroundColor = this.options.colorScheme[key];
			
			row = document.createElement('tr');
			row.appendChild(Element.setStyle(document.createElement('td'), cStyle));
						
			desc = document.createElement('td');
			desc.appendChild(document.createTextNode(key));			
			row.appendChild(desc);
			
			body.appendChild(row);						
		}.bind(this));		
		legend.appendChild(body);
		
		return legend;
	},

/*
	Function: _addLegend
		(Private) This function adds a legend to the chart.
*/
	_addLegend: function(){
		
		if(this.options.legend.hide){
			return;
		}
		
		this.htmlWrapper.appendChild(this.getLegend());
	},
	
/*
	Function: _ieWaitForVML
		(Private) In IE, there's a slight delay when the canvas element is ready, so we have to loop a few times before we can render.
		
	Parameters:
		element - canvas element id.
		options - options for the chart.
*/
	_ieWaitForVML: function(/*String*/element, /*Object*/options){
		
		if(!!(element)){
			this.renderStack.merge({element: options});
		}
				
		try{
			if(!!this.canvasNode){	
				this.canvasNode.getContext('2d');					
			} else {
				$(element).getContext('2d');
			}
		} catch(e){
			if(!!(this.renderDelay)){
				this.renderDelay = new PeriodicalExecuter(function(){
					if(!!(this.canvasNode)){	
						this.render(this.canvasNode,options);					
					} else {
						this.render(element,options);
					}					
				}.bind(this), 0.5);
			}else if(this.maxTries-- <= 0){
				this.renderDelay.stop();
			}
			return true;
		}
		
		if(!!(this.renderDelay)){

			this.renderDelay.stop();
			delete this.renderStack[element || this.canvasNode];
		}
		
		return false;
	},
	
/*
	Function: setColorscheme
		Sets the colorScheme used for the chart.
*/
	setColorscheme: function(){
		var scheme = this.options.colorScheme;

		if(typeof(scheme) == 'object'){ 
			return;
		} else if(typeof(scheme) == 'string'){
			
			this.options.colorScheme = SChart.Base.getColorscheme(scheme, this.dataSets.keys());
		} else { 
			throw 'SChart.Canvas.setColorscheme(): colorScheme is invalid!';
		}
	},

/*
	Function: _renderBackground
		(Private) Renders the background of the chart.
*/
	_renderBackground: function(){
		
		if(this.options.background.hide){
			return;
		}
		
		var cx = this.canvasNode.getContext('2d');
		cx.save();
	    cx.fillStyle = this.options.background.color;			
        cx.fillRect(this.area.x, this.area.y, this.area.w, this.area.h);
        cx.strokeStyle = this.options.background.lineColor;
        cx.lineWidth = this.options.axis.lineWidth;
        
		if(this.type == 'pie'){
			cx.restore();
			return;
		}
		
        var ticks = this.yticks;
        var horiz = false;
        if(this.type == 'bar' && this.options.barOrientation == 'horizontal'){
			ticks = this.xticks;
            horiz = true;
        }
        
		var drawLine = function(tick){
			var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
			
			if(horiz){
				x1 = x2 = tick[0] * this.area.w + this.area.x;
                y1 = this.area.y;
                y2 = y1 + this.area.h;
			}else{
				x1 = x2 = this.area.x;                
                x2 += this.area.w;
				y1 = y2 = tick[0] * this.area.h + this.area.y;
			}
			cx.beginPath();
            cx.moveTo(x1, y1);
            cx.lineTo(x2, y2);
            cx.closePath();
        	cx.stroke();
		}.bind(this);
				
		ticks.each(drawLine);
		
		cx.restore();
	},
	
/*
	Function: _renderLineAxis
		(Private) Renders the axis for line charts.
*/
	_renderLineAxis: function(){
		this._renderAxis();
	},
	
/*
	Function: _renderAxis
		(Private) Renders axis.
*/
	_renderAxis: function(){
		
		if(this.options.axis.x.hide && this.options.axis.y.hide){
	        return;
		}
		
	    var cx = this.canvasNode.getContext('2d');
	
	    var labelStyle = {
			position: 'absolute',
	        fontSize: this.options.axis.labelFontSize + 'px',			
			fontFamily: this.options.axis.labelFont,
	        zIndex: 10,
	        color: this.options.axis.labelColor,
	        width: this.options.axis.labelWidth + 'px',
	        overflow: 'hidden'
		};
		
	    cx.save();
	    cx.strokeStyle = this.options.axis.lineColor;
	    cx.lineWidth = this.options.axis.lineWidth;
		
	    if(!this.options.axis.y.hide){
	        if(this.yticks){
				var collectYLabels = function(tick){
					if(typeof(tick) == 'function'){
						return;
					} 
					
	                var x = this.area.x;
	                var y = this.area.y + tick[0] * this.area.h;
					
	                cx.beginPath();
	                cx.moveTo(x, y);
	                cx.lineTo(x - this.options.axis.tickSize, y);
	                cx.closePath();
	                cx.stroke();
					
					var label = document.createElement('div');
					label.appendChild(document.createTextNode(tick[1]));	
					Element.setStyle(label, Object.extend(labelStyle,{
						top: (y - this.options.axis.labelFontSize) + 'px',
						left: (x - this.options.padding.left - this.options.axis.tickSize) + 'px',
						width: (this.options.padding.left - this.options.axis.tickSize * 2) + 'px',
						textAlign: 'right'
					}));
										
	                this.htmlWrapper.appendChild(label);
	                return label;
				}.bind(this);
				this.ylabels = this.yticks.collect(collectYLabels);
	        }
	
	        cx.beginPath();
	        cx.moveTo(this.area.x, this.area.y);
	        cx.lineTo(this.area.x, this.area.y + this.area.h);
	        cx.closePath();
	        cx.stroke();
	    }
		
		if(!this.options.axis.x.hide){
	        if(this.xticks){
				var collectXLabels = function(tick){
					if(typeof(tick) == 'function'){
						return;
					}
					
	                var x = this.area.x + tick[0] * this.area.w;
                	var y = this.area.y + this.area.h;
					
	                cx.beginPath();
	                cx.moveTo(x, y);
	                cx.lineTo(x, y + parseFloat(this.options.axis.tickSize));
	                cx.closePath();
	                cx.stroke();
					
	                var label = Element.setStyle(document.createElement('div'), Object.extend(labelStyle,{
						top: 		(y + parseFloat(this.options.axis.tickSize)) + 'px',
						left: 		(x - this.options.axis.labelWidth/2) + 'px',
						width: 		this.options.axis.labelWidth + 'px',
						textAlign: 	'center'
					}));
	                label.appendChild(document.createTextNode(tick[1]));                
					
	                this.htmlWrapper.appendChild(label);
	                return label;
				}.bind(this);
				this.xlabels = this.xticks.collect(collectXLabels);
	        }
	
	        cx.beginPath();
	        cx.moveTo(this.area.x, this.area.y + this.area.h);
	        cx.lineTo(this.area.x + this.area.w, this.area.y + this.area.h);
	        cx.closePath();
	        cx.stroke();
	    }		
		cx.restore();	
	}
});


if (typeof(SChart.Base) == 'undefined' || 
	typeof(SChart.Chart) == 'undefined'){
			
	throw 'SChart.BarChart depends on SChart.{Base,Canvas,Chart}.';
}

SChart.BarChart = Class.create();
Object.extend(SChart.BarChart.prototype, SChart.Chart);
Object.extend(SChart.BarChart.prototype,{
	type: 'bar',
	
/*
	Function: render
		Renders the chart with the specified options. The optional parameters can be used to render a barchart in a different canvas element with new options.
		
	Parameters:
		element - (Optional) canvas element to render a chart in.
		options - (Optional) options for this chart.
*/
	render: function(/*String*/element, /*Object*/options) {		
		
		if(this.isIE && this._ieWaitForVML(element,options)){
			// Wait for IE because the canvas element is rendered with a small delay.		
			return;
		}
		
		this._evaluate(options);
		this._render(element);
		this._renderBarChart();				
		this._renderAxis();
		
		// Add a legend.
		this._addLegend();
		
		if(this.isIE){
			for(var el in this.renderStack){
				if(typeof(this.renderStack[el]) != 'function'){
					this.render(el,this.renderStack[el]);
					break;
				}
			}
		}	
	},
	
/*
	Function: _evaluate
		(Private) Evaluates all the data needed to plot the bar chart.
		
	Parameters:
		options - options for this chart.
*/
	_evaluate: function(/*Object*/options) {
		
		this._eval(options);	
		
		// Evaluate horizontal/vertical barchart.
		this._evalBarChart();
		
		// Evaluate ticks.
		this._evalBarTicks();
	},

/*
	Function: _evalBarChart
		(Private) Evaluates measures for vertical bars.
*/
	_evalBarChart: function() {
		
		if(this.options.barOrientation == 'horizontal'){
			
			this._evalHorizBarChart();
			return;	
		}
		
		var uniqx = SChart.Base.uniqueIndices(this.stores);		
		var xdelta = 10000000;
	    for(var j = 1; j < uniqx.length; j++){
	        xdelta = Math.min(Math.abs(uniqx[j] - uniqx[j-1]), xdelta);
	    }
		
		var barWidth = 0;
	    var barWidthForSet = 0;
	    var barMargin = 0;
	    if (uniqx.length == 1) {
	        xdelta = 1.0;
	        this.xscale = 1.0;
	        this.minxval = uniqx[0];
	        barWidth = 1.0 * this.options.barWidthFillFraction;
	        barWidthForSet = barWidth / this.stores.length;
	        barMargin = (1.0 - this.options.barWidthFillFraction)/2;
	    } else {
			this.xscale = (this.xrange == 1) ? 0.5 : (this.xrange == 2) ? 1/3.0 : (1.0 - 1/this.xrange)/this.xrange;
	        barWidth = xdelta * this.xscale * this.options.barWidthFillFraction;
	        barWidthForSet = barWidth / this.stores.length;
	        barMargin = xdelta * this.xscale * (1.0 - this.options.barWidthFillFraction)/2;
	    }
		
		this.minxdelta = xdelta;
		this.bars = [];
		
		this.dataSets.each(function(store, i){			
			store.value.each(function(item){
				var rect = {
	                x: ((parseFloat(item[0]) - this.minxval) * this.xscale) + (i * barWidthForSet) + barMargin,
	                y: 1.0 - ((parseFloat(item[1]) - this.minyval) * this.yscale),
	                w: barWidthForSet,
	                h: ((parseFloat(item[1]) - this.minyval) * this.yscale),
	                xval: parseFloat(item[0]),
	                yval: parseFloat(item[1]),
	                name: store.key
	            };
				
				if ((rect.x >= 0.0) && (rect.x <= 1.0) && 
	                (rect.y >= 0.0) && (rect.y <= 1.0)) {
	                this.bars.push(rect);
	            }
			}.bind(this));	        
		}.bind(this));	    
	},
	
/*
	Function: _evalHorizBarChart
		(Private) Evaluates measures for horizontal bars.
*/
	_evalHorizBarChart: function() {		
		var uniqx = SChart.Base.uniqueIndices(this.stores);	
		var xdelta = 10000000;
	    for (var i = 1; i < uniqx.length; i++) {
	        xdelta = Math.min(Math.abs(uniqx[i] - uniqx[i-1]), xdelta);
	    }
					
		var barWidth = 0;
	    var barWidthForSet = 0;
	    var barMargin = 0;
	    if (uniqx.length == 1) {
	        xdelta = 1.0;
	        this.xscale = 1.0;
	        this.minxval = uniqx[0];
	        barWidth = 1.0 * this.options.barWidthFillFraction;
	        barWidthForSet = barWidth / this.stores.length;
	        barMargin = (1.0 - this.options.barWidthFillFraction)/2;
	    } else {
       	 	this.xscale = (1.0 - xdelta/this.xrange)/this.xrange;
        	barWidth = xdelta * this.xscale * this.options.barWidthFillFraction;
        	barWidthForSet = barWidth / this.stores.length;
        	barMargin = xdelta * this.xscale * (1.0 - this.options.barWidthFillFraction)/2;			
		}
		
		this.minxdelta = xdelta;
		this.bars = [];
		this.dataSets.each(function(store, i){			
			store.value.each(function(item){
				var rect = {
	                y: ((parseFloat(item[0]) - this.minxval) * this.xscale) + (i * barWidthForSet) + barMargin,
	                x: 0.0,
	                h: barWidthForSet,
	                w: ((parseFloat(item[1]) - this.minyval) * this.yscale),
	                xval: parseFloat(item[0]),
	                yval: parseFloat(item[1]),
	                name: store.key
	            };
				
				rect.y = (rect.y <= 0.0) ? 0.0 : (rect.y >= 1.0) ? 1.0 : rect.y;	            
	            if ((rect.x >= 0.0) && (rect.x <= 1.0)) {
	                this.bars.push(rect);
	            }
			}.bind(this));	        
		}.bind(this));	 
	},

/*
	Function: _renderBarChart
		(Private) Renders a horizontal/vertical bar chart.
*/
	_renderBarChart: function() {
		var cx = this.canvasNode.getContext('2d');
		
		var drawBar = function(bar, index) {
			var fillColor = new SChart.Color(this.options.colorScheme[bar.name]).toRgbaString(parseFloat(this.options.fillOpacity));
			// Setup context.			
			cx.lineWidth = this.options.stroke.width;
			cx.fillStyle = fillColor;
			cx.strokeStyle = this.options.stroke.color;
			
			// Gather bar proportions.
			var x = this.area.w * bar.x + this.area.x;
 	    	var y = this.area.h * bar.y + this.area.y;
        	var w = this.area.w * bar.w;
        	var h = this.area.h * bar.h;
      
       		if((w < 1) || (h < 1)){
				// Dont draw when the bar is too small.
				return;
			} 
	        	
			if(!!(this.options.stroke.shadow)){
				// Draw fake shadow.
				cx.fillStyle = "rgba(0,0,0,0.15)";
			
				if(this.options.barOrientation == 'vertical'){
					cx.fillRect(x-2, y-2, w+4, h+2);
				}else{
					cx.fillRect(x, y-2, w+2, h+4);
				}
				
				cx.fillStyle = fillColor;
			}
				
			if(this.options.shouldFill){
				// Fill rectangle.
				cx.fillRect(x, y, w, h);
			}		
			
			if(!this.options.stroke.hide){
				// Draw stroke.						
				cx.strokeRect(x, y, w, h);
			}			
		}.bind(this);
		
		// Draw the bars.
		cx.save();
		this.bars.each(drawBar);
		cx.restore();		
	},
	
/*
	Function: _evalBarTicks
		(Private) Evaluates bar ticks.
*/
	_evalBarTicks: function() {
		
		this._evalLineTicks();
		
		this.xticks = this.xticks.collect(function(tick) {
			return [tick[0] + (this.minxdelta * this.xscale)/2, tick[1]];
		}.bind(this));
		
		if (this.options.barOrientation == 'horizontal') {
			var tmp = this.xticks;			
			this.xticks = this.yticks.collect(function(tick) {
				return [1.0 - tick[0], tick[1]];
			}.bind(this));
			this.yticks = tmp;
	    }
	}	
});

if (typeof(SChart.Base) == 'undefined' || 
	typeof(SChart.Chart) == 'undefined'){
			
	throw 'SChart.LineChart depends on SChart.{Base, Chart}.';
}

SChart.LineChart = Class.create();
Object.extend(SChart.LineChart.prototype, SChart.Chart);
Object.extend(SChart.LineChart.prototype,{
	type: 'line',
	
/*
	Function: render
		Renders the chart with the specified options. The optional parameters can be used to render a linechart in a different canvas element with new options.
		
	Parameters:
		element - (Optional) canvas element to render a chart in.
		options - (Optional) options for this chart.
*/
	render: function(/*String*/element, /*Object*/options) {	
		if(this.isIE && this._ieWaitForVML(element,options)){
			return;
		}
		
		this._evaluate(options);
		this._render(element);
		this._renderLineChart();
		this._renderLineAxis();
		
		if(this.isIE){
			for(var el in this.renderStack){
				if(typeof(this.renderStack[el]) != 'function'){
					this.render(el,this.renderStack[el]);
					break;
				}
			}
		}
	},
	
/*
	Function: _evaluate
		(Private) Evaluates all the data needed to plot the line chart.
		
	Parameters:
		options - options for this chart.
*/
	_evaluate: function(/*Object*/options) {
		this._eval(options);
		this._evalLineChart();
		this._evalLineTicks();
	},
	
/*
	Function: _evalLineChart
		(Private) Evaluates measures for line charts.
*/
	_evalLineChart: function(){
	    this.points = [];
	
		this.dataSets.each(function(store){			
			store.value.each(function(item){
				var point = {
	                x: ((parseFloat(item[0]) - this.minxval) * this.xscale),
	                y: 1.0 - ((parseFloat(item[1]) - this.minyval) * this.yscale),
	                xval: parseFloat(item[0]),
	                yval: parseFloat(item[1]),
	                name: store.key
	            };
				
				point.y = (point.y <= 0.0) ? 0.0 : (point.y >= 1.0) ? 1.0 : point.y;
	            
	            if((point.x >= 0.0) && (point.x <= 1.0)){
	                this.points.push(point);
	            }
			}.bind(this));	        
		}.bind(this));	    
	},
	
/*
	Function: _renderLineChart
		(Private) Renders a line chart.
*/	
	_renderLineChart: function(){
	    var cx = this.canvasNode.getContext("2d");
		
		var preparePath = function(storeName,index){
			cx.beginPath();
            cx.moveTo(this.area.x, this.area.y + this.area.h);
			this.points.each(function(point){
				
				if(point.name == storeName){
                    cx.lineTo(this.area.w * point.x + this.area.x, this.area.h * point.y + this.area.y);
				}
			}.bind(this));
			
            cx.lineTo(this.area.w + this.area.x, this.area.h + this.area.y);
            cx.lineTo(this.area.x, this.area.y + this.area.h);
			
			if(this.options.shouldFill){
				cx.closePath();
			}else{
	        	cx.strokeStyle = this.options.colorScheme[storeName];
			    cx.stroke();
			}
		}.bind(this);
		
		if(this.options.shouldFill){
			
			var drawLine = function(storeName, index){
				if(this.options.stroke.shadow){
					// Draw shadow.
					cx.save();
					cx.fillStyle = 'rgba(0,0,0,0.15)';				
					cx.translate(2, -2);
					preparePath(storeName,index);	
					cx.fill();				
					cx.restore();
				}
				
				// Fill line.
				cx.fillStyle = new SChart.Color(this.options.colorScheme[storeName]).toRgbaString(parseFloat(this.options.fillOpacity));
	            preparePath(storeName,index);
		        cx.fill();			    			
		        
				if (!this.options.stroke.hide){
					// Draw stroke.
		            preparePath(storeName,index);
		            cx.stroke();
		        } 
			}.bind(this);
			
			// Draw the lines.
			cx.save();
			cx.lineWidth = this.options.stroke.width;		
		    cx.strokeStyle = this.options.stroke.color;
			this.dataSets.keys().each(drawLine);		
			cx.restore();
		}else{
			cx.save();
			cx.lineWidth = this.options.stroke.width;				
			this.dataSets.keys().each(preparePath);
			//cx.stroke();
			cx.restore();
		}
	}
});

if (typeof(SChart.Base) == 'undefined' || 
	typeof(SChart.Chart) == 'undefined'){
			
	throw 'SChart.PieChart depends on SChart.{Base, Chart}.';
}

SChart.PieChart = Class.create();
Object.extend(SChart.PieChart.prototype, SChart.Chart);
Object.extend(SChart.PieChart.prototype,{
	type: 'pie',
	
/*
	Function: render
		Renders the chart with the specified options. The optional parameters can be used to render a piechart in a different canvas element with new options.
		
	Parameters:
		element - (Optional) canvas element to render a chart in.
		options - (Optional) options for this chart.
*/
	render: function(/*String*/element, /*Object*/options) {	
		
		if(this.isIE && this._ieWaitForVML(element,options)){
			return;
		}

		this._evaluate(options);
		this._render(element);
		this._renderPieChart();
		this._renderPieAxis();
		
		if(this.isIE){
			for(var el in this.renderStack){
				if(typeof(this.renderStack[el]) != 'function'){
					this.render(el,this.renderStack[el]);
					break;
				}
			}
		}
	},	
	
/*
	Function: _evaluate
		(Private) Evaluates all the data needed to plot the pie chart.
		
	Parameters:
		options - options for this chart.
*/
	_evaluate: function(/*Object*/options) {
		this._eval(options);
		this._evalPieChart();
		this._evalPieTicks();			
	},
	
/*
	Function: _evalPieChart
		(Private) Evaluates measures for pie charts.
*/
	_evalPieChart: function(){
		
		var slices = this.dataSets.collect(function(hash, index){
			
			return {
				name:	hash[0], // TODO Real labels
				value:	[index, hash[1][0][1]]
			};
		});
		var sum = slices.pluck('value').pluck(1).inject(0, function(acc, n) { return acc + n; });
		
		var fraction = angle = 0.0;
		this.slices = slices.collect(function(slice){
			angle += fraction;
			if(slice.value[1] > 0){
				fraction = slice.value[1]/sum;
				return {
					name: 		slice.name,
					fraction: 	fraction,
					xval: 		slice.value[0],
					yval: 		slice.value[1],
					startAngle: 2 * angle * Math.PI,
					endAngle: 	2 * (angle + fraction) * Math.PI
				};				
			}
		});
	},
	
/*
	Function: _renderPieChart
		(Private) Renders a pie chart.
*/	
	_renderPieChart: function(){
		var cx = this.canvasNode.getContext('2d');
				
		var centerx = this.area.x + this.area.w * 0.5;
    	var centery = this.area.y + this.area.h * 0.5;
		var radius = Math.min(this.area.w * this.options.pieRadius, this.area.h * this.options.pieRadius);
		
		if(this.isIE){
	        centerx = parseInt(centerx,10);
	        centery = parseInt(centery,10);
	        radius = parseInt(radius,10);
	    }
		
		var drawPie = function(slice){
			cx.beginPath();
			cx.moveTo(centerx, centery);
			cx.arc(centerx, centery, radius, 
                    slice.startAngle - Math.PI/2,
                    slice.endAngle - Math.PI/2,
                    false);
			cx.lineTo(centerx, centery);
       		cx.closePath();
		};
				
		if(this.options.stroke.shadow){
			cx.save();
			cx.fillStyle = "rgba(0,0,0,0.15)";
				
	        cx.beginPath();
			cx.moveTo(centerx, centery);
			cx.arc(centerx+1, centery+2, radius+1, 0, Math.PI*2, false);
			cx.lineTo(centerx, centery);
       		cx.closePath();
			cx.fill();
			cx.restore();
		}
		
		cx.save();
		this.slices.each(function(slice,i){	
			if(slice && Math.abs(slice.startAngle - slice.endAngle) > 0.001){
				
				cx.fillStyle = new SChart.Color(this.options.colorScheme[slice.name]).toRgbaString(parseFloat(this.options.fillOpacity));;
				
				if(this.options.shouldFill){
					drawPie(slice);               	
	                cx.fill();
	            }
	            
	            if(!this.options.stroke.hide){
					drawPie(slice);
	                cx.lineWidth = this.options.stroke.width;
	                cx.strokeStyle = this.options.stroke.color;
											       
	                cx.stroke();
	            }
			}
			
		}.bind(this));
		cx.restore();
		
	},
	
/*
	Function: _evalPieTicks
		(Private) Evaluates ticks for x and y axis.
*/
	_evalPieTicks: function(){
				
		this.xticks = [];
				
		if(this.options.axis.x.ticks){
			
			var lookup = [];
			this.slices.each(function(slice){
				if (slice){
					lookup[slice.xval] = slice;
				}
			});
			
			this.options.axis.x.ticks.each(function(tick){
				var slice = lookup[tick.v]; 
	            var label = tick.label || tick.v.toString();
				if(!!(slice)){
					label += ' (' + (slice.fraction * 100).toFixed(1) + '%)';
					this.xticks.push([tick.v, label]);
				}
			}.bind(this));
			
		}else{
			
			this.slices.each(function(slice){
				if (slice){
					var label = slice.xval + ' (' + (slice.fraction * 100).toFixed(1) + '%)';
					this.xticks.push([slice.xval, label]);
				}
			}.bind(this));			
		}		
	},

/*
	Function: _renderPieAxis
		(Private) Renders the axis for pie charts.
*/
	_renderPieAxis: function(){
		
		if(this.options.axis.x.hide || !this.xticks){
        	return;
		}			
		this.xlabels = lookup = [];
		this.slices.each(function(slice){
			if (slice){
				lookup[slice.xval] = slice;
			}
		});
		
		var centerx = this.area.x + this.area.w * 0.5;
	    var centery = this.area.y + this.area.h * 0.5;
	    var radius = Math.min(this.area.w * this.options.pieRadius, this.area.h * this.options.pieRadius);
		var labelWidth = this.options.axis.labelWidth;
		
		var labelStyle = {
	        position: 	'absolute',
	        zIndex: 	11,
	        width: 		labelWidth + 'px',
	        fontFamily: this.options.axis.labelFont,
	        fontSize: 	this.options.axis.labelFontSize + 'px',
	        overflow: 	'hidden',
	        color: 		this.options.axis.labelColor
	    }; 
		
		this.xticks.each(function(tick){
			var slice = lookup[tick[0]];
			
			// normalize the angle
			var normalisedAngle = (slice.startAngle + slice.endAngle)/2;
			if(normalisedAngle > Math.PI * 2){
				normalisedAngle = normalisedAngle - Math.PI * 2;
			}else if(normalisedAngle < 0){
				normalisedAngle = normalisedAngle + Math.PI * 2;
			}
				
			var labelx = centerx + Math.sin(normalisedAngle) * (radius + 10);
	        var labely = centery - Math.cos(normalisedAngle) * (radius + 10);
						
			if(normalisedAngle <= Math.PI * 0.5){
	            // text on top and align left
				Object.extend(labelStyle, {
					textAlign: 		'left',
					verticalAlign: 	'top',
					left: 			labelx + 'px',
					top: 			(labely - this.options.axis.labelFontSize) + 'px'
				});
	        }else if((normalisedAngle > Math.PI * 0.5) && (normalisedAngle <= Math.PI)){
	            // text on bottom and align left
				Object.extend(labelStyle, {
					textAlign: 		'left',
					verticalAlign: 	'bottom',
					left: 			labelx + 'px',
					top: 			labely + 'px'
				});	
	        }else if((normalisedAngle > Math.PI) && (normalisedAngle <= Math.PI*1.5)){
	            // text on bottom and align right
				Object.extend(labelStyle, {
					textAlign: 		'right',
					verticalAlign: 	'bottom',
					left: 			(labelx  - labelWidth) + 'px',
					top: 			labely + 'px'
				});
	        }else {
	            // text on top and align right
				Object.extend(labelStyle, {
					textAlign: 		'right',
					verticalAlign: 	'bottom',
					left: 			(labelx  - labelWidth) + 'px',
					top: 			(labely - this.options.axis.labelFontSize) + 'px'
				});
	        }
			
			var label = Element.setStyle(document.createElement('div'), labelStyle);
			label.appendChild(document.createTextNode(tick[1]));
			
            this.htmlWrapper.appendChild(label);
			this.xlabels.push(label);
			
		}.bind(this));		
	}
});