package com.zstar.SMMS.BaseData.IdcInfo.delegate;

import com.opensymphony.xwork2.ActionContext;
import com.zstar.fmp.core.base.delegate.BaseDelegate;
import java.util.Map;

public class IdcInfoDel extends BaseDelegate {

	public IdcInfoDel(ActionContext contex) {
		super(contex);
	}

	public String getIdcServiceUrl(String idcid) {
		Map<String, String> map = (Map) this.sqlSession.selectOne("IdcInfo.getIdcInfoByIdcId", idcid);
		if (map != null) {
			return (String) map.get("WEBSERVICE_URL");
		}
		return "";
	}

	public String getIdcToken(String idcid) {
		Map<String, String> map = (Map) this.sqlSession.selectOne("IdcInfo.getIdcInfoByIdcId", idcid);
		if (map != null) {
			return (String) map.get("RID");
		}
		return "";
	}

	public String getIdcName(String idcid) {
		Map<String, String> map = (Map) this.sqlSession.selectOne("IdcInfo.getIdcInfoByIdcId", idcid);
		if (map != null) {
			return (String) map.get("IDC_NAME");
		}
		return "";
	}
}
