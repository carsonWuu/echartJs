package com.zstar.SMMS.BaseData.SmmsRoomIprange_idcInfo.action;

import com.zstar.fmp.core.frame.action.CommonViewAction;
import java.io.PrintStream;

public class ViewSmmsRoomIprange_idcAction extends CommonViewAction {

	public void afterBiz() throws Exception {
		super.afterBiz();
	}

	public void beforeBiz() throws Exception {
		System.out.println("a66666" + getWebData("DET_IP"));
		super.beforeBiz();
	}
}
