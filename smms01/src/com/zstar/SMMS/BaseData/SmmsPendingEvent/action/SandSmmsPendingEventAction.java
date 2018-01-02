package com.zstar.SMMS.BaseData.SmmsPendingEvent.action;

import com.zstar.SMMS.BaseData.SmmsPendingEvent.delegate.PendingEventDel;
import com.zstar.fmp.core.frame.action.FrameAction;
import com.zstar.fmp.log.FMPLog;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SandSmmsPendingEventAction extends FrameAction {

	public String bizExecute() throws Exception {
		String rid = (String) getWebData("RID");
		String[] kv = rid.split(",");
		String ridList = "";
		for (int j = 0; j < kv.length; j++) {
			String s = "'" + kv[j] + "'" + ",";
			ridList = ridList + s;
		}
		ridList = ridList.substring(0, ridList.length() - 1);

		FMPLog.printErr("test" + ridList);
		Map mapRid = new HashMap();

		mapRid.put("ridCondition", "and ssp.RID IN (" + ridList + ") order by ssp.access_id asc");

		List<Map> dataList = this.sqlSession.selectList("SmmsPendingEvent.viewToRectify", mapRid);
		PendingEventDel del = new PendingEventDel(this.contex);
		String returnMessage = del.returnSandMessage(dataList);
		setMsg(returnMessage);
		return "empty";
	}
}
