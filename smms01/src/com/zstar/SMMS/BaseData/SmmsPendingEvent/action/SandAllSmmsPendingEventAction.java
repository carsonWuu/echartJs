package com.zstar.SMMS.BaseData.SmmsPendingEvent.action;

import com.zstar.SMMS.BaseData.SmmsPendingEvent.delegate.PendingEventDel;
import com.zstar.fmp.core.frame.action.FrameAction;
import java.util.List;
import java.util.Map;

public class SandAllSmmsPendingEventAction extends FrameAction {

	public String bizExecute() throws Exception {
		List<Map> dataList = this.sqlSession.selectList("SmmsPendingEvent.viewToAllRectify");
		PendingEventDel pendingEventdel = new PendingEventDel(this.contex);
		String returnMessage = pendingEventdel.returnSandMessage(dataList);
		setMsg(returnMessage);
		return "empty";
	}
}
