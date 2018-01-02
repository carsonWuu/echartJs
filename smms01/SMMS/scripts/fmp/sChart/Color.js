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