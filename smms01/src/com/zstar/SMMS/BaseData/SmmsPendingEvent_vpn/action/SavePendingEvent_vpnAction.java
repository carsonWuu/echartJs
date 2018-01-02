package com.zstar.SMMS.BaseData.SmmsPendingEvent_vpn.action;

import com.zstar.fmp.core.frame.action.CommonSaveAction;

public class SavePendingEvent_vpnAction extends CommonSaveAction {

	public void afterBiz() throws Exception {
		super.afterBiz();
	}

	public void beforeBiz() throws Exception {
		super.beforeBiz();
		this.sqlSession.insert("test.test");
	}
}
