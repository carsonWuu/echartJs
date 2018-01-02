package com.zstar.SMMS.BaseData.SmmsRpcLog.delegate;

import com.opensymphony.xwork2.ActionContext;
import com.zstar.fmp.core.base.FMPContex;
import com.zstar.fmp.core.base.delegate.BaseDelegate;
import com.zstar.fmp.utils.JsonUtil;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RpcLogDel extends BaseDelegate {

	public RpcLogDel(ActionContext contex) {
		super(contex);
	}

	public void addRpcLog(String itf_num, String idc_id, String in_json, String out_json, String rpc_result) {
		Map<String, String> mapLog = new HashMap();

		mapLog.put("RID", FMPContex.getNewUUID());
		if (itf_num.startsWith("2")) {
			mapLog.put("CALL_DIRECTION", "1");
		} else {
			mapLog.put("CALL_DIRECTION", "2");
		}
		mapLog.put("IDC_ID", idc_id);
		mapLog.put("IN_JSON", in_json);
		mapLog.put("OUT_JSON", out_json);
		mapLog.put("ITF_NUM", itf_num);
		if (rpc_result.indexOf("000") != -1) {
			Map map = JsonUtil.jsonToDataMap(rpc_result);
			mapLog.put("RPC_RESULT", (String) map.get("return_msg"));
		} else if (rpc_result.indexOf("999") != -1) {
			Map map = JsonUtil.jsonToDataMap(rpc_result);
			mapLog.put("RPC_RESULT", (String) map.get("return_msg"));
		} else {
			mapLog.put("RPC_RESULT", rpc_result);
		}
		mapLog.put("CREATTIME", FMPContex.getCurrentTime());
		mapLog.put("RECORDSTATE", "0");

		this.sqlSession.insert("SmmsRpcLog.insertSave", mapLog);
	}

	public String getIdcId(String json) {
		Map<String, Object> map = JsonUtil.jsonToDataMap(json);
		Map<String, Object> dataMap = (Map) map.get("data");
		List<Map> list = (List) dataMap.get("rows");
		String idc_id = "";
		if ((list.size() > 0) && (list != null)) {
			for (Map mp : list) {
				idc_id = (String) mp.get("access_id");
			}
		}
		return idc_id;
	}
}
