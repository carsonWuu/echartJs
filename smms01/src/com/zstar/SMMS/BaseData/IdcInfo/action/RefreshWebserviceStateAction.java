package com.zstar.SMMS.BaseData.IdcInfo.action;

import com.zstar.fmp.core.frame.action.FrameAction;
import com.zstar.fmp.utils.JsonUtil;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class RefreshWebserviceStateAction extends FrameAction {

	public String bizExecute() throws Exception {
		List<Map<String, Object>> list = new ArrayList();
		String url = "";
		String state = "";
		list = this.sqlSession.selectList("IdcInfo.selectUrlAndRid");
		for (Map<String, Object> map : list) {
			url = (String) map.get("url");
			state = urlIsReach(url);
			map.put("state", state);
		}
		String json = JsonUtil.dataListToJson(list);
		setMsg(json);

		return "empty";
	}

	public static String urlIsReach(String url) {
		if (url == null) {
			return "不可用";
		}
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setConnectTimeout(5000);
			connection.setReadTimeout(5000);
			if (200 == connection.getResponseCode()) {
				return "可用";
			}
		} catch (Exception e) {
			return "不可用";
		}
		return "不可用";
	}
}
