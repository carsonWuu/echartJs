package com.zstar.SMMS.BaseData.SmmsPendingEvent.action;

import com.zstar.fmp.core.frame.action.FrameAction;
import com.zstar.fmp.utils.JsonUtil;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CheckUrlAction extends FrameAction {

	public String bizExecute() throws Exception {
		String url = (String) getWebData("URL");
		Map urlMap = new HashMap();
		urlMap.put("URL", url.toUpperCase());

		List urlList = this.sqlSession.selectList("WebCase.checkUrl", urlMap);
		if ((urlList != null) && (urlList.size() > 0)) {
			Map webCaseMap = (Map) urlList.get(0);
			List roomInfoList = this.sqlSession.selectList("SmmsRoomInfo.selectRoomInfo", webCaseMap);
			if ((roomInfoList != null) && (roomInfoList.size() > 0)) {
				Map roomInfoMap = (Map) roomInfoList.get(0);
				webCaseMap.put("ssrRid", roomInfoMap.get("ssrRid"));
				webCaseMap.put("room_name", roomInfoMap.get("room_name"));
				webCaseMap.put("room_idx", roomInfoMap.get("room_idx"));
				webCaseMap.put("room_address", roomInfoMap.get("room_address"));
				setMsg(JsonUtil.dataMapToJson(webCaseMap));
			}
		} else {
			Map ipMap = new HashMap();
			ipMap.put("IP", getWebData("IP"));
			List listRoomIdc = this.sqlSession.selectList("SmmsRoomIprange.selectAccesIdByIp", ipMap);
			if ((listRoomIdc != null) && (listRoomIdc.size() > 0)) {
				Map roomIdcMap = (Map) listRoomIdc.get(0);
				List listRoomAndIdc = this.sqlSession.selectList("SmmsPendingEvent.checkAccessIdAndRoomIdx",
						roomIdcMap);
				if ((listRoomAndIdc != null) && (listRoomAndIdc.size() > 0)) {
					Map roomAndIdcMap = (Map) listRoomAndIdc.get(0);
					List listSwcIp = this.sqlSession.selectList("SmmsWebCaseIp.selectRidByIp", ipMap);
					if ((listSwcIp != null) && (listSwcIp.size() > 0)) {
						Map swcIpMap = (Map) listSwcIp.get(0);
						List listSwc = this.sqlSession.selectList("SmmsWebCaseIp.webCaseRid", swcIpMap);
						if ((listSwc != null) && (listSwc.size() > 0)) {
							Map swcMap = (Map) listSwc.get(0);
							roomAndIdcMap.put("swcRid", swcMap.get("swcRid"));
							roomAndIdcMap.put("website_name", swcMap.get("website_name"));
							roomAndIdcMap.put("sponser_case_num", swcMap.get("sponser_case_num"));
							roomAndIdcMap.put("website_url", swcMap.get("website_url"));
							setMsg(JsonUtil.dataMapToJson(roomAndIdcMap));
						}
					}
				}
			}
		}
		return "empty";
	}
}
