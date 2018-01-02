package com.zstar.SMMS.BaseData.SmmsPendingEvent.action;

import com.zstar.fmp.core.frame.action.FrameAction;
import com.zstar.fmp.log.FMPLog;
import java.util.HashMap;
import java.util.Map;

public class BlackListAction extends FrameAction {

	public String bizExecute() throws Exception {
		String rid = (String) getWebData("RID");
		String[] kv = rid.split(",");

		String ridList = "";
		int sum = 0;
		Map mapRid = new HashMap();
		for (int j = 0; j < kv.length; j++) {
			String s = "'" + kv[j] + "'" + ",";
			ridList = ridList + s;
		}
		ridList = ridList.substring(0, ridList.length() - 1);

		FMPLog.printErr("test:" + ridList);
		mapRid.put("ridCondition", "RID IN (" + ridList + ")");

		int i = this.sqlSession.update("SmmsPendingEvent.updateBlackList", mapRid);
		sum += i;
		setMsg("移出" + sum + "条数据");
		return "empty";
	}
}
