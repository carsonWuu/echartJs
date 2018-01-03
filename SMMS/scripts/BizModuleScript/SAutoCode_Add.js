/***********************************
 * @文件描述：自动编码规则唯一性验证脚本
 *************************************/
function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于新增操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj) {
	if (typeof (doChange_Super) != "undefined") {doChange_Super(obj);} // 如果存在onChange的超级方法，则先执行
	// //////对于新增操作，页面元素发生改变是要执行的代码在此完成//////////
	if(obj.name == 'CODETYPE'){     //编码类型
		var orgId = $('#ORGID').val();
		var codeType = $('#CODETYPE').val();
		setErrMessage("ORGID", "");
		setErrMessage("CODETYPE", "");
		if(orgId != null && orgId != "" && codeType != null && codeType != ""){		
			var url=rootPath+"/fmp/system/autocode/SAutoCodeBiz/isOnly?CODETYPE="+codeType+"&ORGID="+orgId; 
			comAjax(url,backCallCT);
		}
	}

	if(obj.name == 'ORGID'){        //所属机构
		var codeType = $('#CODETYPE').val();
		var orgId = $('#ORGID').val();
		setErrMessage("ORGID", "");
		setErrMessage("CODETYPE", "");
		if(orgId != null && orgId != "" && codeType != null && codeType != ""){	
			var url=rootPath+"/fmp/system/autocode/SAutoCodeBiz/isOnly?CODETYPE="+codeType+"&ORGID="+orgId; 
			comAjax(url,backCallOI);
		}
	}		
}
