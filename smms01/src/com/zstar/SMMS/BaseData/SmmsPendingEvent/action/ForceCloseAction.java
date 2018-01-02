package com.zstar.SMMS.BaseData.SmmsPendingEvent.action;

import com.zstar.SMMS.BaseData.SmmsPendingEvent.delegate.PendingEventDel;
import com.zstar.fmp.core.frame.action.FrameAction;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ForceCloseAction extends FrameAction {

	public String bizExecute() throws Exception {
		String rid = (String) getWebData("RID");
		String[] kv = rid.split(",");
		String ridList = "";
		for (int j = 0; j < kv.length; j++) {
			String s = "'" + kv[j] + "'" + ",";
			ridList = ridList + s;
		}
		ridList = ridList.substring(0, ridList.length() - 1);

		Map mapRid = new HashMap();
		mapRid.put("ridCondition", "and ssp.RID IN (" + ridList + ") order by ssp.access_id asc");

		List<Map> forceCloselist = this.sqlSession.selectList("SmmsPendingEvent.viewToJson", mapRid);
		PendingEventDel del = new PendingEventDel(this.contex);
		String message = del.returnForceCloseMessage(forceCloselist);
		setMsg(message);
		return "empty";
	}
}
