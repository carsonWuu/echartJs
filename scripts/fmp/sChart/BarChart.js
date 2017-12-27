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