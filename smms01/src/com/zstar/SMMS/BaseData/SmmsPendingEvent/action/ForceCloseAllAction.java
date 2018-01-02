package com.zstar.SMMS.BaseData.SmmsPendingEvent.action;

import com.zstar.SMMS.BaseData.SmmsPendingEvent.delegate.PendingEventDel;
import com.zstar.fmp.core.frame.action.FrameAction;
import java.util.List;
import java.util.Map;

public class ForceCloseAllAction extends FrameAction {

	public String bizExecute() throws Exception {
		List<Map> forceCloselist = this.sqlSession.selectList("SmmsPendingEvent.viewToAllJson");
		PendingEventDel del = new PendingEventDel(this.contex);
		String message = del.returnForceCloseMessage(forceCloselist);
		setMsg(message);
		return "empty";
	}
}
