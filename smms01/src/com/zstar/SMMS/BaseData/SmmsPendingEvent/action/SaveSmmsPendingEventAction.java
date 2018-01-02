package com.zstar.SMMS.BaseData.SmmsPendingEvent.action;

import com.zstar.SMMS.constant.SMMSConstant;
import com.zstar.fmp.core.base.FMPContex;
import com.zstar.fmp.core.frame.action.CommonSaveAction;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SaveSmmsPendingEventAction extends CommonSaveAction {

	public void afterBiz() throws Exception {
		super.afterBiz();
	}

	public void beforeBiz() throws Exception {
		if ("add".equals(getWebData("opMode"))) {
			setWebData("RID", FMPContex.getNewUUID());

			setWebData("EVENT_SOURCE", "3");

			setWebData("KEYWORDS", "test");

			setWebData("CLIENTNAME", (String) getWebData("CURR_USERID"));

			setWebData("REPORT_CITY", SMMSConstant.REPORT_CITY);

			setWebData("REPORT_TIME", FMPContex.getCurrentTime());

			setWebData("OCCUR_TIME", FMPContex.getCurrentTime());

			setWebData("IS_WHITE_LIST", "2");

			setWebData("RECTIFY_STATE", "000");
		}
		String url = (String) getWebData("URL");
		Map urlMap = new HashMap();
		urlMap.put("URL", url.toUpperCase());

		List list = this.sqlSession.selectList("WebCase.viewDoMainNameAndAccessId", urlMap);
		if ((list != null) && (list.size() > 0)) {
			Map webCaseMap = (Map) list.get(0);
			setWebData("SNAPSHOP", webCaseMap.get("SNAPSHOP"));
			setWebData("DOMAIN", webCaseMap.get("DOMAIN_NAME"));
			setWebData("ACCESS_ID", webCaseMap.get("ACCESS_ID"));
			setWebData("WEB_CASE_RID", webCaseMap.get("rid"));
			setWebData("URL", url.toLowerCase());
		} else {
			Map ipMap = new HashMap();
			ipMap.put("IP", getWebData("IP"));

			List roomIdcList = this.sqlSession.selectList("SmmsRoomIprange.selectAccesIdByIp", ipMap);
			if ((roomIdcList != null) && (roomIdcList.size() > 0)) {
				Map roomIdcMap = (Map) roomIdcList.get(0);
				setWebData("ACCESS_ID", roomIdcMap.get("ACCESS_ID"));

				List roomInfoList = this.sqlSession.selectList("SmmsRoomInfo.selectRoomNameAndRoomIdx", roomIdcMap);
				if ((roomInfoList != null) && (roomInfoList.size() > 0)) {
					Map roomInfo = (Map) roomInfoList.get(0);
					setWebData("ROOM_IDX", roomInfo.get("ROOM_IDX"));
					setWebData("ROOM_NAME", roomInfo.get("ROOM_NAME"));
				}
				List listWebCaseInfo = this.sqlSession.selectList("SmmsWebCaseIp.selectRidByIp", ipMap);
				if ((listWebCaseInfo != null) && (listWebCaseInfo.size() > 0)) {
					Map webCaseInfoMap = (Map) listWebCaseInfo.get(0);
					setWebData("WEB_CASE_RID", webCaseInfoMap.get("RID"));
					Map webCaseMap = (Map) this.sqlSession.selectOne("WebCase.getDomainNameAndWebstiteUrlByRid", webCaseInfoMap);
					setWebData("SNAPSHOP", webCaseMap.get("SNAPSHOP"));
					setWebData("DOMAIN_NAME", webCaseMap.get("DOMAIN_NAME"));
					setWebData("URL", webCaseMap.get("WEBSITE_URL"));
				}
			}
		}
		super.beforeBiz();
	}
}
