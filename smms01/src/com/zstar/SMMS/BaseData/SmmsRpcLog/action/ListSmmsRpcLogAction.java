package com.zstar.SMMS.BaseData.SmmsRpcLog.action;

import com.zstar.fmp.core.frame.action.CommonListAction;
import java.util.HashMap;
import java.util.Map;

public class ListSmmsRpcLogAction extends CommonListAction {

	private static final String filterType = null;

	public void afterBiz() throws Exception {
		super.afterBiz();
	}

	public void beforeBiz() throws Exception {
		super.beforeBiz();
		String TradeOpType = (String) getWebData("filterType");
		String rid = (String) getWebData("RID");

		Map dataMap = new HashMap();
		dataMap.put("RID", TradeOpType);
		if ("1".equals(TradeOpType)) {
			setFreezeCondition(" and to_days(srl.CREATTIME) = to_days(now()) ");
		} else if ("2".equals(TradeOpType)) {
			setFreezeCondition(" and DATE_FORMAT( srl.CREATTIME, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' )");
		} else {
			setFreezeCondition("");
		}
	}
}
