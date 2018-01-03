/***********************************
 * @文件描述：与用户管理相关的js
 *************************************/
function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于新增操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于新增操作，页面元素发生改变是要执行的代码在此完成//////////
	if(obj.name == 'LOGINCODE'){                             //登录账号
		var preLoginCode = document.getElementsByName("pre#LOGINCODE");
		var loginCode = obj.value;
		if(preLoginCode[0] != null && preLoginCode[0] != "undefined"){        //判断该对象是否存在
			if(preLoginCode[0].value != loginCode){                           //判断记录值是否不等于修改值
				validationInfo();
			}
		}else{
			validationInfo();
		}
		function validationInfo(){                            //验证登录账号信息
			var url=rootPath+"/fmp/SUser/isExistLoginCode?tableModelId=SUser&LOGINCODE="+loginCode; 
			comAjax(url,backCallInfo);
			function backCallInfo(msg){
				if (msg == "exist"){
					showMessage("MSG1236");//此登录账号已存在，请重新输入！
					setFieldValue("LOGINCODE","");
				}else{
					return;
				}
			}
		}
	}

	onCertInfoChange(obj.name,'','IDCARDNO','BIRTHDAY');
	
	if(obj.name == 'IDCARDNO'){                                //身份证号码
		var preIdCardNo = document.getElementsByName("pre#IDCARDNO");
		var idCardNo = obj.value;
		if(preIdCardNo[0] != null && preIdCardNo[0] != "undefined"){        //判断该对象是否存在
			if(preIdCardNo[0].value != idCardNo){                           //判断记录值是否不等于修改值
				validationMsg();
			}
		}else{
			validationMsg();
		}

		function validationMsg(){                               //验证身份证信息
			var url = rootPath+"/fmp/SUser/isExistIdCardNo?tableModelId=SUser&IDCARDNO="+idCardNo; 
			comAjax(url,backCallMsg);
			function backCallMsg(msg){
				if (msg == "exist"){
					showMessage("MSG1237");//此身份证号码已存在，请重新输入！
					setFieldValue("IDCARDNO","");
					setFieldValue("BIRTHDAY","");
				}else{
					return;
				}
			}
		}
	}

	if(obj.name == 'FIREDATE'){                          //解雇日期
		var startDate = document.getElementById("detailId_STARTDATE").value;
		var fireDate = obj.value;
		if(startDate =="" || startDate == null){         //判断开启日期是否为“空”
			if(fireDate != null && fireDate != ""){
				showMessage("MSG1238");//请先选择启用日期！
				setFieldValue("FIREDATE","");
			}
		}else{
			if(dateConvDig(startDate) > dateConvDig(fireDate)){       //判断开启日期的整型数值是否大于解雇日期的整型数值 
				if(fireDate != null && fireDate != ""){
					showMessage("MSG1239");//解雇日期不能提前于开启日期！
					setFieldValue("FIREDATE","");
				}			
			}
			function dateConvDig(str){                  //将日期转换为整型
				var numerical = 0;
				if(str != null && str != ""){
					numerical = parseInt(str.substring(0,4) + str.substring(5,7) + str.substring(8,10));			
				}
				return numerical;
			}
		}
	}

	if(obj.name == 'ORGID'){
		setFieldValue("DEPTID","");
	}
}
 

function openDeptPop(){                       //打开所属部门pop窗口
	var orgId = document.getElementById("detailId_ORGID").value;
	if(orgId == "" || orgId == null){         //判断所属机构是否为“空”
		showMessage("MSG1240");//请先选择所属机构！
	}else {
		var freezeCondition = "and (dept.ORGID='"+orgId+"' or dept.ORGID='[ALL]') and dept.STATE='0'";
		openSinPop('SDept','DEPTID','DEPTID','DEPTNAME','',freezeCondition);
	}
}