package com.zstar.SMMS.BaseData.IdcInfo.action;

import com.zstar.SMMS.acLog.SmmsAcLogin.delegate.ReadAcLogDel;
import com.zstar.fmp.core.frame.action.CommonViewAction;
import java.net.HttpURLConnection;
import java.net.URL;

public class ViewIdcInfoAction extends CommonViewAction {

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

	public void afterBiz() throws Exception {
		super.afterBiz();
		String rid = (String) getWebData("RID");
		String url = (String) this.sqlSession.selectOne("IdcInfo.selectUrlOneRid", rid);
		this.detailData.put("WEBSERVICE_STATE", urlIsReach(url));
	}

	public void beforeBiz() throws Exception {
		super.beforeBiz();

		String fileName1 = "bbs_1505202173.mdf";
		String tableRow1 = "USERNAME,GROUPNAME,IP,SERV_CRC,APP_CRC,LOG_TIME,CONTENT,TITLE,URL";
		String sqlId1 = "SmmsAcBbs.insertSave";
		ReadAcLogDel del1 = new ReadAcLogDel(this.contex);

		String fileName2 = "app_1505202753.mdf";
		String tableRow2 = "USERNAME,GROUPNAME,IP,SERV_CRC,APP_CRC,LOG_TIME,DES_IP,DES_PORT";
		String sqlId2 = "SmmsAcApp.insertSave";
		ReadAcLogDel del2 = new ReadAcLogDel(this.contex);

		String fileName3 = "D:\\AC_LOG\\action\\mail_1505202802.mdf";
		String tableRow3 = "USERNAME,GROUPNAME,IP,SERV_CRC,APP_CRC,LOG_TIME,CONTENT,TITLE,MAIL_FROM,MAIL_TO";
		String sqlId3 = "SmmsAcMail.insertSave";
		ReadAcLogDel del3 = new ReadAcLogDel(this.contex);
	}
}
