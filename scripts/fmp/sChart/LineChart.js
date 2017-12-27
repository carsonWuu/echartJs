
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