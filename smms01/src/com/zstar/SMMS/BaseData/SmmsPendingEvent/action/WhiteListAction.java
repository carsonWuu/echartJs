package com.zstar.SMMS.BaseData.SmmsPendingEvent.action;

import com.zstar.fmp.core.frame.action.FrameAction;
import java.util.HashMap;
import java.util.Map;

public class WhiteListAction extends FrameAction {

	public String bizExecute() throws Exception {
		String rid = (String) getWebData("RID");
		String[] kv = rid.split(";");
		int sum = 0;
		Map mapRid = new HashMap();
		for (int j = 0; j < kv.length; j++) {
			mapRid.put("RID", kv[j]);
			int i = this.sqlSession.update("SmmsPendingEvent.updateWhiteList", mapRid);
			sum += i;
		}
		setMsg("移至" + sum + "条数据" + "到白名单");
		return "empty";
	}
}
