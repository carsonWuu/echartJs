package com.zstar.SMMS.BaseData.PendingEventForClose.action;

import com.strutsframe.db.DBSqlSession;
import com.zstar.fmp.core.frame.action.FrameAction;
import com.zstar.fmp.log.FMPLog;
import java.util.HashMap;
import java.util.Map;

public class DeleteList extends FrameAction {

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
		mapRid.put("RECORDSTATE", "1");
		int i = this.sqlSession.update("PendingEventForClose.deleteUpdateRecordstate", mapRid);
		sum += i;
		setMsg("成功删除" + sum + "条数据");
		return "empty";
	}
}
