
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