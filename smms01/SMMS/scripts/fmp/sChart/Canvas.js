
if(typeof(SChart.Base) == 'undefined' ||
	typeof(SChart.Chart) == 'undefined'){
	throw 'SChart.Canvas depends on SChart.{Base, Chart}.';
}

/*
	Class: SChart.Canvas  
		Implements basic rendering functions used by BarChart, PieChart
		and LineChart.
*/
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