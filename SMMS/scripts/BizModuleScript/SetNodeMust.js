
function moveOption(e1, e2) {
	for ( var i = 0; i < e1.options.length; i++) {
		if (e1.options[i].selected) {
			var e = e1.options[i];
			if(e.text.indexOf('集团已设必填') !=-1){return;}				
			e2.options.add(new Option(e.text, e.value));
			e1.remove(i);
			i = i - 1;
		}
	}
}
function moveAllOption(e1, e2) {
	var idx =e1.options.length;
	for ( var i = 0; i < idx; i++) {		
			var e = e1.options[i];
			if(e.text.indexOf('集团已设必填') ==-1){	
			e2.options.add(new Option(e.text, e.value));
			e1.remove(i);
			i = i - 1;
			idx = e1.options.length;
			}else{
			idx--;}
	}
}






