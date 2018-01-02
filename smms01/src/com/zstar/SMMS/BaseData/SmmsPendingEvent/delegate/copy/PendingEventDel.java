package com.zstar.SMMS.BaseData.SmmsPendingEvent.delegate.copy;

import com.opensymphony.xwork2.ActionContext;
import com.zstar.SMMS.BaseData.IdcInfo.delegate.IdcInfoDel;
import com.zstar.SMMS.webservice.delegate.RpcBusDel;
import com.zstar.fmp.core.base.FMPContex;
import com.zstar.fmp.core.base.delegate.BaseDelegate;
import com.zstar.fmp.utils.JsonUtil;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PendingEventDel extends BaseDelegate {

	public PendingEventDel(ActionContext contex) {
		super(contex);
	}

	public void pendingEvent101(Map map) {
		Map<String, String> updateMap = (Map) this.sqlSession.selectOne("SmmsPendingEvent.selectAll", map);
		map.put("MODIFIEDTIME", FMPContex.getCurrentTime());
		if (map != null) {
			this.sqlSession.update("SmmsPendingEvent.updateSave", updateMap);
		}
	}

	public String sendAllForceClose(List<Map> sendList, String idcId) {
		Map mapTotal = new HashMap();
		mapTotal.put("total", Integer.valueOf(1));

		mapTotal.put("rows", sendList);
		Map map = new HashMap();
		map.put("data", mapTotal);

		String json = JsonUtil.dataMapToJson(map);
		IdcInfoDel idcInfoDel = new IdcInfoDel(this.contex);
		String serviceURL = idcInfoDel.getIdcServiceUrl(idcId);
		String tokenId = idcInfoDel.getIdcToken(idcId);
		RpcBusDel del = new RpcBusDel(this.contex);
		String str = del.rpc2102(tokenId, serviceURL, json);

		Map messageJson = JsonUtil.jsonToDataMap(str);
		int i = 0;
		if ("000".equals((String) messageJson.get("return_msg"))) {
			for (Map ridMap : sendList) {
				ridMap.put("RECTIFY_STATE", "010");
				ridMap.put("SEND_TIME", FMPContex.getCurrentTime());
				ridMap.put("FEEDBACK_TIMESTAMP", Long.valueOf(System.currentTimeMillis()));
				i = this.sqlSession.update("SmmsPendingEvent.updateRectifyState", ridMap);
				i++;
			}
		}
		String message = (String) messageJson.get("return_msg") + ":更新了" + i + "条数据";
		return message;
	}
}
