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
						
			if(Math.abs(slice.startAngle - slice.endAngle) > 0.001){
				
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
				lookup[slice.xval] = slice;
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
				var label = slice.xval + ' (' + (slice.fraction * 100).toFixed(1) + '%)';
				this.xticks.push([slice.xval, label]);
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
			lookup[slice.xval] = slice;
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