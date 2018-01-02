package com.zstar.SMMS.afLog.SmmsAfLog.delegate;

import com.opensymphony.xwork2.ActionContext;
import com.zstar.SMMS.BaseData.SmmsPendingEvent.delegate.PendingEventDel;
import com.zstar.SMMS.constant.FileOperateUtil;
import com.zstar.SMMS.constant.SMMSConstant;
import com.zstar.fmp.core.base.FMPContex;
import com.zstar.fmp.core.base.delegate.BaseDelegate;
import com.zstar.fmp.log.FMPLog;
import com.zstar.fmp.utils.JsonUtil;
import java.io.*;
import java.util.*;
import net.sf.json.JSONNull;

public class ReadAFLogDel extends BaseDelegate {

	public ReadAFLogDel(ActionContext contex) {
		super(contex);
	}

	public long insertAFLog(long filePos, String fileName) {
		String filePath;
		String fileFormat;
		long currPos;
		PendingEventDel del;
		InputStreamReader isr;
		BufferedReader in;
		filePath = FMPContex.getSystemProperty("AF_LOG_FILE");
		fileFormat = FMPContex.getSystemProperty("AF_LOG_FORMAT");
		currPos = filePos;
		del = new PendingEventDel(contex);
		isr = null;
		in = null;
		try {
			isr = new InputStreamReader(new FileInputStream(fileName), "UTF-8");
			in = new BufferedReader(isr);
			String str = null;
			in.skip(filePos);
			while ((str = in.readLine()) != null) {
				try {
					currPos += str.length();
					if (str.startsWith("[inavigator:][ [")) {
						String s = str.substring(16, str.length() - 2);
						Map jsonMap = new HashMap();
						jsonMap = JsonUtil.jsonToDataMap(s);
						for (Iterator it = jsonMap.keySet().iterator(); it.hasNext();) {
							String key = (String) it.next();
							Object obj = jsonMap.get(key);
							if (obj == null || (obj instanceof JSONNull)) {
								jsonMap.put(key, "");
							} else {
								jsonMap.put(key, String.valueOf(obj));
							}
						}

						FMPLog.printLog((new StringBuilder("jsonMap============")).append(jsonMap).toString());
						String type = (String) jsonMap.get("TYPE");
						if ("遭受入侵".equals(type)) {
							jsonMap.put("TYPE", "01");
						} else if ("黑客控制".equals(type)) {
							jsonMap.put("TYPE", "02");
						} else if ("黑产牟利".equals(type)) {
							jsonMap.put("TYPE", "03");
						} else if ("内部攻击".equals(type)) {
							jsonMap.put("TYPE", "04");
						} else {
							jsonMap.put("TYPE", "99");
						}
						String level = (String) jsonMap.get("LEVEL");
						if ("蓝色预警".equals(level)) {
							jsonMap.put("LEVEL", "1");
						} else if ("橙色预警".equals(level)) {
							jsonMap.put("LEVEL", "2");
						} else if ("红色预警".equals(level)) {
							jsonMap.put("LEVEL", "3");
						} else {
							jsonMap.put("LEVEL", "0");
						}

						String rid = FMPContex.getNewUUID();
						jsonMap.put("RID", rid);
						jsonMap.put("CREATTIME", FMPContex.getCurrentTime());
						jsonMap.put("END_TIME", FMPContex.getCurrentTime());
						jsonMap.put("RECORDSTATE", "0");
						String src_ip = (String) jsonMap.get("SRC_IP");
						jsonMap.put("SRC_IP", src_ip);
						String dst_ip = (String) jsonMap.get("DST_IP");
						jsonMap.put("DST_IP", dst_ip);
						int i = sqlSession.insert("SmmsAfLog.insertSave", jsonMap);
						String ip = "";
						Map insertMap = new HashMap();
						Boolean dstIpKey = Boolean.valueOf(jsonMap.containsKey("DST_IP"));
						if (dstIpKey.booleanValue() && !"".equals(jsonMap.get("DST_IP")) && !"0.0.0.0".equals(jsonMap.get("DST_IP"))) {
							ip = (String) jsonMap.get("DST_IP");
						} else {
							ip = (String) jsonMap.get("SRC_IP");
						}
						jsonMap.put("IP", ip);
						insertMap = del.selectInsertPendingInfoByIpOrUrl(jsonMap);
						insertMap.put("IP", ip);
						insertMap.put("SNAPSHOP", jsonMap.get("EVENT_EVIDENCE"));
						insertMap.put("OCCUR_TIME", jsonMap.get("START_TIME"));
						insertMap.put("THREAT_TYPE1", jsonMap.get("TYPE"));
						insertMap.put("THREAT_TYPE2", jsonMap.get("SUB_TYPE"));
						insertMap.put("THREAT_LEVEL", jsonMap.get("LEVEL"));
						insertMap.put("CLIENTNAME", SMMSConstant.CLIENTNAME);
						insertMap.put("EVENT_SOURCE", "1");
						String accessId = "";
						accessId = String.valueOf(jsonMap.get("BRANCH"));
						if (accessId.indexOf("/") != -1) {
							String kv[] = accessId.split("/");
							insertMap.put("ACCESS_ID", kv[0]);
							insertMap.put("ROOM_IDX", kv[1]);
							List list = sqlSession.selectList("SmmsRoomInfo.selectRoomNameAndRoomIdx", insertMap);
							if (list.size() > 0 && list != null) {
								insertMap.put("ROOM_NAME", ((Map) list.get(0)).get("ROOM_NAME"));
							}
						}
						insertMap.put("LOG_TABLENAME", "SMMS_AF_LOG");
						insertMap.put("LOG_RID", rid);
						if (i == 1) {
							del.insertSmmsPendingEvent(insertMap);
						}
					}
				} catch (Exception e) {
					FMPLog.printErr("处理日志异常。。。");
					String err = "错误数据:\n";
					err = (new StringBuilder(String.valueOf(err))).append(str).toString();
					FileOperateUtil.createFiles(filePath, err, fileFormat);
					e.printStackTrace();
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				in.close();
			} catch (Exception exception1) {
				exception1.printStackTrace();
			}
			try {
				isr.close();
			} catch (Exception exception2) {
				exception2.printStackTrace();
			}
		}
		return currPos;
	}
}