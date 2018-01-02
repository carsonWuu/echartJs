package com.zstar.SMMS.BaseData.SmmsPendingEvent.delegate;

import com.opensymphony.xwork2.ActionContext;
import com.zstar.SMMS.BaseData.IdcInfo.delegate.IdcInfoDel;
import com.zstar.SMMS.constant.SMMSConstant;
import com.zstar.SMMS.webservice.delegate.RpcBusDel;
import com.zstar.fmp.core.base.FMPContex;
import com.zstar.fmp.core.base.delegate.BaseDelegate;
import com.zstar.fmp.log.FMPLog;
import com.zstar.fmp.utils.JsonUtil;
import java.util.*;
import net.sf.json.JSONObject;

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

	public String rectification(Map mapRid) {
		Map jsonMap = (Map) this.sqlSession.selectOne("SmmsPendingEvent.viewToRectify", mapRid);

		Map listMap = new HashMap();

		listMap.put("event_id", jsonMap.get("event_id"));
		listMap.put("url", jsonMap.get("url"));
		listMap.put("security_type", jsonMap.get("security_type"));
		listMap.put("damage_class", jsonMap.get("damage_class"));
		listMap.put("rectify_suggestion", jsonMap.get("rectify_suggestion"));
		listMap.put("rectify_term", jsonMap.get("rectify_term"));
		listMap.put("case_id", jsonMap.get("case_id"));
		listMap.put("snapshop", jsonMap.get("snapshop"));

		Map mapTotal = new HashMap();
		mapTotal.put("total", Integer.valueOf(1));
		List<Map> list = new ArrayList();
		list.add(listMap);
		mapTotal.put("rows", list);

		Map map = new HashMap();
		map.put("data", mapTotal);
		String json = JSONObject.fromObject(map).toString();

		IdcInfoDel idcInfoDel = new IdcInfoDel(this.contex);
		String idcid = (String) jsonMap.get("access_id");
		String tokenid = idcInfoDel.getIdcToken(idcid);
		String idcName = idcInfoDel.getIdcName(idcid);
		String serviecUrl = idcInfoDel.getIdcServiceUrl(idcid);

		RpcBusDel rpc = new RpcBusDel(this.contex);
		try {
			String msg = rpc.rpc2101(tokenid, serviecUrl, json);

			Map messageJson = JsonUtil.jsonToDataMap(msg);

			mapRid.put("RECTIFY_STATE", "010");
			mapRid.put("SEND_TIME", FMPContex.getCurrentTime());
			mapRid.put("FEEDBACK_TIMESTAMP", Long.valueOf(System.currentTimeMillis()));
			if ("000".equals(messageJson.get("return_code"))) {
				this.sqlSession.update("SmmsPendingEvent.issueStateUpdate", mapRid);
			}
			String message = (String) messageJson.get("return_msg");
			return messageJson.get("return_code") + ":" + message;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "无法连接" + idcName + "IDC服务器";
	}

	public int sendAllForceClose(List<Map> sendList, String idcId) {
		Map mapTotal = new HashMap();
		mapTotal.put("total", Integer.valueOf(1));

		mapTotal.put("rows", sendList);
		Map map = new HashMap();
		map.put("data", mapTotal);

		String json = JsonUtil.dataMapToJson(map);

		IdcInfoDel idcInfoDel = new IdcInfoDel(this.contex);
		String serviceURL = idcInfoDel.getIdcServiceUrl(idcId);
		String tokenId = idcInfoDel.getIdcToken(idcId);
		String idcName = idcInfoDel.getIdcName(idcId);
		RpcBusDel del = new RpcBusDel(this.contex);
		String str = del.rpc2102(tokenId, serviceURL, json);

		Map messageJson = JsonUtil.jsonToDataMap(str);

		int sum = 0;
		if ("000".equals((String) messageJson.get("return_code"))) {
			for (Map ridMap : sendList) {
				ridMap.put("RECTIFY_STATE", "010");
				ridMap.put("SEND_TIME", FMPContex.getCurrentTime());
				ridMap.put("SEND_TIMESTAMP", Long.valueOf(System.currentTimeMillis()));
				int i = this.sqlSession.update("SmmsPendingEvent.updateRectifyState", ridMap);
				sum += i;
			}
		}
		return sum;
	}

	public String returnForceCloseMessage(List<Map> forceCloselist) {
		IdcInfoDel idcInfoDel;
		String str;
		String tmp_accessid;
		String idcName;
		String idcNameErr;
		String errmsg;
		int sum;
		int sumThen;
		List sendList;
		Iterator iterator;
		idcInfoDel = new IdcInfoDel(contex);
		str = "";
		tmp_accessid = "";
		idcName = "";
		idcNameErr = "";
		errmsg = "";
		sum = 0;
		sumThen = 0;
		int sumAfter = 0;
		sendList = new ArrayList();
		iterator = forceCloselist.iterator();
		if (iterator.hasNext()) {
			Map mapToJson;
			mapToJson = (Map) iterator.next();
			if (mapToJson.get("close_term") == null)
				mapToJson.put("close_term", "0000000000");
			if (mapToJson.get("rectify_term") == null)
				mapToJson.put("rectify_term", "0000000000");
			if (mapToJson.get("security_type") == null)
				mapToJson.put("security_type", "未知");
			if (mapToJson.get("access_id") == null || "".equals(mapToJson.get("access_id"))) {
				FMPLog.printLog("mapToJson.get(\"access_id\") == null || \"\".equals(mapToJson.get(\"access_id\"))");
			}
			if ("".equals(tmp_accessid)) {
				sendList.add(mapToJson);
				tmp_accessid = (String) mapToJson.get("access_id");
			}
			if (tmp_accessid.equals(mapToJson.get("access_id"))) {
				sendList.add(mapToJson);
			}
			idcName = idcInfoDel.getIdcName(tmp_accessid);
			idcNameErr = (new StringBuilder(String.valueOf(idcNameErr))).append(idcInfoDel.getIdcName(tmp_accessid)).append(",").toString();
			try {
				sum = sendAllForceClose(sendList, tmp_accessid);
				str = (new StringBuilder(String.valueOf(str))).append(idcName).append("处理了:").append(sum).append("条数据").append("\n").toString();
				return str;
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (!"".equals(errmsg))
					errmsg = (new StringBuilder("无法连接")).append(idcNameErr).append("IDC服务器").toString();
				sumThen += sum;
				sendList.clear();
				sendList.add(mapToJson);
				tmp_accessid = (String) mapToJson.get("access_id");
			}
		} else {
			idcName = idcInfoDel.getIdcName(tmp_accessid);
			idcNameErr = (new StringBuilder(String.valueOf(idcNameErr))).append(idcInfoDel.getIdcName(tmp_accessid)).toString();
			try {
				sumAfter = sendAllForceClose(sendList, tmp_accessid);
				str = (new StringBuilder(String.valueOf(str))).append(idcName).append("处理了:").append(sumAfter).append("条数据").append("\n").toString();
				sumAfter += sumThen;
				str = (new StringBuilder(String.valueOf(str))).append("总共处理:").append(sumAfter).append("条数据").append("\n").toString();
				return str;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		errmsg = (new StringBuilder("无法连接")).append(idcNameErr).append("IDC服务器").toString();
		return errmsg;
	}

	public String insertSmmsPendingEvent(Map insertMap) {
		String rid = FMPContex.getNewUUID();
		insertMap.put("RID", rid);

		insertMap.put("REPORT_CITY", SMMSConstant.REPORT_CITY);

		insertMap.put("REPORT_TIME", FMPContex.getCurrentTime());
		if (insertMap.get("OCCUR_TIME") == null) {
			insertMap.put("OCCUR_TIME", FMPContex.getCurrentTime());
		}
		insertMap.put("IS_WHITE_LIST", "2");

		insertMap.put("CREATTIME", FMPContex.getCurrentTime());

		insertMap.put("MODIFIEDTIME", FMPContex.getCurrentTime());

		insertMap.put("RECTIFY_STATE", "000");
		this.sqlSession.insert("SmmsPendingEvent.insertSave", insertMap);
		return rid;
	}

	public Map selectInsertPendingInfoByIpOrUrl(Map selectMap) {
		Map insertMap = new HashMap();

		List list = this.sqlSession.selectList("WebCase.viewDoMainNameAndAccessId", selectMap);
		if ((list != null) && (list.size() > 0)) {
			Map webCaseMap = (Map) list.get(0);
			insertMap.put("DOMAIN", webCaseMap.get("DOMAIN_NAME"));
			insertMap.put("SNAPSHOP", webCaseMap.get("SNAPSHOP"));
			insertMap.put("ACCESS_ID", webCaseMap.get("ACCESS_ID"));
			insertMap.put("WEB_CASE_RID", webCaseMap.get("rid"));
		} else {
			List roomIdcList = this.sqlSession.selectList("SmmsRoomIprange.selectAccesIdByIp", selectMap);
			Map roomIdcMap = new HashMap();
			String accessId = "";
			if ((roomIdcList != null) && (roomIdcList.size() > 0)) {
				roomIdcMap = (Map) roomIdcList.get(0);
				accessId = (String) roomIdcMap.get("ACCESS_ID");
				insertMap.put("ACCESS_ID", accessId);

				List roomInfoList = this.sqlSession.selectList("SmmsRoomInfo.selectRoomNameAndRoomIdx", roomIdcMap);
				if ((roomInfoList != null) && (roomInfoList.size() > 0)) {
					Map roomInfo = (Map) roomInfoList.get(0);
					insertMap.put("ROOM_IDX", roomInfo.get("ROOM_IDX"));
					insertMap.put("ROOM_NAME", roomInfo.get("ROOM_NAME"));
				}
			}
			List listWebCaseInfo = this.sqlSession.selectList("SmmsWebCaseIp.selectRidByIp", selectMap);
			if ((listWebCaseInfo != null) && (listWebCaseInfo.size() > 0)) {
				Map webCaseInfoMap = (Map) listWebCaseInfo.get(0);
				insertMap.put("WEB_CASE_RID", webCaseInfoMap.get("RID"));

				Map webCaseMap = (Map) this.sqlSession.selectOne("WebCase.getDomainNameAndWebstiteUrlByRid", webCaseInfoMap);
				if ((webCaseMap != null) && (webCaseMap.size() > 0)) {
					insertMap.put("SNAPSHOP", webCaseMap.get("SNAPSHOP"));
					insertMap.put("DOMAIN", webCaseMap.get("DOMAIN_NAME"));
					insertMap.put("URL", webCaseMap.get("WEBSITE_URL"));
					if ((accessId == null) || (accessId.equals(""))) {
						insertMap.put("ACCESS_ID", webCaseMap.get("ACCESS_ID"));
					}
				}
			}
		}
		return insertMap;
	}

	public String ForceClose(Map mapRid) {
		mapRid.put("RECTIFY_STATE", "010");
		mapRid.put("SEND_TIME", FMPContex.getCurrentTime());
		mapRid.put("SEND_TIMESTAMP", Long.valueOf(System.currentTimeMillis()));
		String idcId = "";

		Map jsonMap = (Map) this.sqlSession.selectOne("SmmsPendingEvent.viewToJson", mapRid);
		if ((jsonMap != null) && (jsonMap.size() > 0)) {
			if (jsonMap.get("close_term") == null) {
				jsonMap.put("close_term", "0000000000");
			}
			if (jsonMap.get("rectify_term") == null) {
				jsonMap.put("rectify_term", "0000000000");
			}
			if (jsonMap.get("damage_class") == null) {
				jsonMap.put("damage_class", "3");
			}
			if (jsonMap.get("security_type") == null) {
				jsonMap.put("security_type", "����");
			}
			if (jsonMap.get("access_id") != null) {
				idcId = String.valueOf(jsonMap.get("access_id"));
			}
		}
		Map mapTotal = new HashMap();
		mapTotal.put("total", Integer.valueOf(1));
		List<Map<String, String>> list = new ArrayList();
		list.add(jsonMap);
		mapTotal.put("rows", list);
		Map map = new HashMap();
		map.put("data", mapTotal);

		String json = JsonUtil.dataMapToJson(map);

		IdcInfoDel idcInfoDel = new IdcInfoDel(this.contex);
		String serviceURL = idcInfoDel.getIdcServiceUrl(idcId);
		String tokenId = idcInfoDel.getIdcToken(idcId);
		String idcName = idcInfoDel.getIdcName(idcId);
		RpcBusDel rpcBusdel = new RpcBusDel(this.contex);
		try {
			String str = rpcBusdel.rpc2102(tokenId, serviceURL, json);

			Map messageJson = JsonUtil.jsonToDataMap(str);
			if ("000".equals(messageJson.get("return_code"))) {
				this.sqlSession.update("SmmsPendingEvent.updateRectifyState", mapRid);
			}
			String message = (String) messageJson.get("return_msg");
			return messageJson.get("return_code") + ":" + message;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "无法连接" + idcName + "IDC服务器";
	}

	public int sandAll(List<Map> sendList, String idcId) {
		Map mapTotal = new HashMap();
		mapTotal.put("total", Integer.valueOf(1));

		mapTotal.put("rows", sendList);
		Map map = new HashMap();
		map.put("data", mapTotal);

		String json = JsonUtil.dataMapToJson(map);
		System.out.println("json:" + json);
		IdcInfoDel idcInfoDel = new IdcInfoDel(this.contex);
		String serviceURL = idcInfoDel.getIdcServiceUrl(idcId);
		String tokenId = idcInfoDel.getIdcToken(idcId);
		String idcName = idcInfoDel.getIdcName(idcId);
		RpcBusDel del = new RpcBusDel(this.contex);
		String str = del.rpc2101(tokenId, serviceURL, json);

		int i = 0;
		int sum = 0;
		Map messageJson = JsonUtil.jsonToDataMap(str);
		if ("000".equals(messageJson.get("return_code"))) {
			for (Map updateMap : sendList) {
				updateMap.put("RECTIFY_STATE", "010");
				updateMap.put("SEND_TIME", FMPContex.getCurrentTime());
				updateMap.put("FEEDBACK_TIMESTAMP", Long.valueOf(System.currentTimeMillis()));
				i = this.sqlSession.update("SmmsPendingEvent.issueStateUpdate", updateMap);
				sum += i;
			}
		}
		return sum;
	}

	public String returnSandMessage(List<Map> dataList) {
		IdcInfoDel idcInfoDel;
		String str;
		String tmp_accessid;
		String idcName;
		String idcNameErr;
		String errmsg;
		int sum;
		int sumThen;
		List sendList;
		Iterator iterator;
		idcInfoDel = new IdcInfoDel(contex);
		str = "";
		tmp_accessid = "";
		idcName = "";
		idcNameErr = "";
		errmsg = "";
		sum = 0;
		sumThen = 0;
		int sumAfter = 0;
		sendList = new ArrayList();
		iterator = dataList.iterator();
		if (iterator.hasNext()) {
			Map mapToJson;
			mapToJson = (Map) iterator.next();
			if (mapToJson.get("access_id") == null || "".equals(mapToJson.get("access_id"))) {
				FMPLog.printLog("mapToJson.get(\"access_id\") == null || \"\".equals(mapToJson.get(\"access_id\"))");
			}
			if ("".equals(tmp_accessid)) {
				sendList.add(mapToJson);
				tmp_accessid = (String) mapToJson.get("access_id");
			}
			if (tmp_accessid.equals(mapToJson.get("access_id"))) {
				sendList.add(mapToJson);
			}
			idcName = idcInfoDel.getIdcName(tmp_accessid);
			idcNameErr = (new StringBuilder(String.valueOf(idcNameErr))).append(idcInfoDel.getIdcName(tmp_accessid)).append(",").toString();
			try {
				sum = sandAll(sendList, tmp_accessid);
				str = (new StringBuilder(String.valueOf(str))).append(idcName).append("处理了:").append(sum).append("条数据").append("\n").toString();
				return str;
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (!"".equals(errmsg))
					errmsg = (new StringBuilder("无法连接")).append(idcNameErr).append("IDC服务器").toString();
				sumThen += sum;
				sendList.clear();
				sendList.add(mapToJson);
				tmp_accessid = (String) mapToJson.get("access_id");
			}
		} else {
			idcName = idcInfoDel.getIdcName(tmp_accessid);
			idcNameErr = (new StringBuilder(String.valueOf(idcNameErr))).append(idcInfoDel.getIdcName(tmp_accessid)).toString();
			try {
				sumAfter = sandAll(sendList, tmp_accessid);
				str = (new StringBuilder(String.valueOf(str))).append(idcName).append("处理了:").append(sumAfter).append("条数据").append("\n").toString();
				sumAfter += sumThen;
				str = (new StringBuilder(String.valueOf(str))).append("总共处理:").append(sumAfter).append("条数据").append("\n").toString();
				return str;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return (new StringBuilder("无法连接")).append(idcNameErr).append("IDC服务器").toString();
	}
}
