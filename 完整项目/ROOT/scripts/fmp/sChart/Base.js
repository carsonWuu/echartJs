
if(typeof(Prototype) == 'undefined' || Prototype.Version < '1.5.1'){
	throw 'SChart depends on the Prototype framework (version 1.5.1).';
}

if(typeof(SChart) == 'undefined'){
	SChart = {
		author:  'Bas Wenneker',
		name: 	 'SChart',
		version: '{version}'
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