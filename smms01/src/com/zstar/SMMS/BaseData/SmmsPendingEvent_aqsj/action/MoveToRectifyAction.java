package com.zstar.SMMS.BaseData.SmmsPendingEvent_aqsj.action;

import com.zstar.fmp.core.frame.action.FrameAction;
import java.util.HashMap;
import java.util.Map;

public class MoveToRectifyAction extends FrameAction {

	public String bizExecute() throws Exception {
		String rid = (String) getWebData("RID");

		String isForceClose = "2";

		Map mapRid = new HashMap();
		mapRid.put("IS_FORCE_CLOSE", isForceClose);
		mapRid.put("RID", rid);
		int result = this.sqlSession.update("PendingEvent_aqsj.updateSave", mapRid);
		String message = null;
		if (result == 1) {
			message = "移至成功";
		} else {
			message = "移至失败";
		}
		setMsg(message);
		return "empty";
	}
}
