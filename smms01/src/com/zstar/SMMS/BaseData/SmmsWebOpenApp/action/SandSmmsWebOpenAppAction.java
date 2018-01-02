package com.zstar.SMMS.BaseData.SmmsWebOpenApp.action;

import com.zstar.SMMS.BaseData.IdcInfo.delegate.IdcInfoDel;
import com.zstar.SMMS.webservice.delegate.RpcBusDel;
import com.zstar.fmp.core.base.FMPContex;
import com.zstar.fmp.core.frame.action.FrameAction;
import com.zstar.fmp.utils.JsonUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONObject;

public class SandSmmsWebOpenAppAction extends FrameAction {

	public String bizExecute() throws Exception {
		String rid = (String) getWebData("RID");
		Map dataMap = new HashMap();
		dataMap.put("RID", rid);

		Map jsonMap = (Map) this.sqlSession.selectOne("SmmsWebOpenApp.viewDetail", dataMap);
		String approval = (String) jsonMap.get("APP_RESULT");
		if (("1".equals(approval)) || ("9".equals(approval))) {
			Map listMap = new HashMap();
			listMap.put("event_id", jsonMap.get("EVENT_RID"));
			if (jsonMap.get("APP_OPINION") == null) {
				listMap.put("approve_opinion", "");
			} else {
				listMap.put("approve_opinion", jsonMap.get("APP_OPINION"));
			}
			listMap.put("approve_result", jsonMap.get("APP_RESULT"));

			Map mapTotal = new HashMap();
			mapTotal.put("total", Integer.valueOf(1));
			List<Map> list = new ArrayList();
			list.add(listMap);
			mapTotal.put("rows", list);

			Map map = new HashMap();
			map.put("data", mapTotal);

			String json = JSONObject.fromObject(map).toString();

			IdcInfoDel idcInfoDel = new IdcInfoDel(this.contex);
			String idcid = (String) jsonMap.get("ACCESS_ID");
			String tokenid = idcInfoDel.getIdcToken(idcid);
			String serviecUrl = idcInfoDel.getIdcServiceUrl(idcid);

			RpcBusDel rpc = new RpcBusDel(this.contex);
			String msg = rpc.rpc2103(tokenid, serviecUrl, json);

			Map messageJson = JsonUtil.jsonToDataMap(msg);

			Map updateMap = new HashMap();
			updateMap.put("APP_OPINION", jsonMap.get("APP_OPINION"));
			updateMap.put("EVENT_RID", jsonMap.get("EVENT_RID"));
			updateMap.put("SEND_TIME", FMPContex.getCurrentTime());
			updateMap.put("APP_RESULT", jsonMap.get("APP_RESULT"));
			updateMap.put("ISSUE_STATE", "1");
			if ("000".equals(messageJson.get("return_code"))) {
				this.sqlSession.update("SmmsWebOpenApp.issueStateUpdate", updateMap);
			}
			String message = (String) messageJson.get("return_msg");
			setMsg(message);
		} else {
			setMsg("未审批无法下发");
		}
		return "empty";
	}
}
