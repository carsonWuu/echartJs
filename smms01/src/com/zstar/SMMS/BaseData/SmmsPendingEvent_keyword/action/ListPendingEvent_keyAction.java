package com.zstar.SMMS.BaseData.SmmsPendingEvent_keyword.action;

import com.zstar.fmp.core.frame.action.CommonListAction;
import java.util.HashMap;
import java.util.Map;

public class ListPendingEvent_keyAction extends CommonListAction {

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
		if ("2".equals(TradeOpType)) {
			setFreezeCondition(" and THREAT_TYPE4 like '%020%' ");
		} else if ("3".equals(TradeOpType)) {
			setFreezeCondition(" and THREAT_TYPE4 like '%030%' ");
		} else if ("4".equals(TradeOpType)) {
			setFreezeCondition(" and THREAT_TYPE4 like '%040%' ");
		} else if ("5".equals(TradeOpType)) {
			setFreezeCondition(" and THREAT_TYPE4 like '%050%' ");
		} else if ("6".equals(TradeOpType)) {
			setFreezeCondition(" and THREAT_TYPE4 like '%060%' ");
		} else if ("1".equals(TradeOpType)) {
			setFreezeCondition(" and THREAT_TYPE4 like '%010%' ");
		}
	}
}
