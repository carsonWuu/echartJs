package com.zstar.SMMS.jobs;

import com.opensymphony.xwork2.ActionContext;
import com.strutsframe.db.DBSqlSession;
import com.zstar.SMMS.acLog.SmmsAcLogin.delegate.ReadAcLogDel;
import com.zstar.SMMS.constant.FileOperateUtil;
import com.zstar.SMMS.constant.FileUtil;
import com.zstar.fmp.core.base.FMPContex;
import com.zstar.fmp.job.BaseJob;
import com.zstar.fmp.log.FMPLog;

import java.io.File;
import java.util.*;
import org.quartz.JobExecutionException;

public class Load_Bbs_LogFileJob extends BaseJob {

	public Load_Bbs_LogFileJob() {
	}

	public void jobExcute(String arg0) throws JobExecutionException {
		Iterator iterator;
		ReadAcLogDel acDel = new ReadAcLogDel(getContex());
		List list = acDel.selectIdcIdAndRoomList();
		iterator = list.iterator();
		_L1: if (!iterator.hasNext())
			return;
		if (true) {
			String filePath;
			String backUpPath;
			Iterator iterator1;
			Map map = (Map) iterator.next();
			String idcFilePath = (new StringBuilder(String.valueOf(String.valueOf(map.get("IDC_ID"))))).append("/")
					.append(String.valueOf(map.get("ROOM_IDX"))).toString();
			filePath = (new StringBuilder(String.valueOf(FMPContex.getSystemProperty("AC_LOG_PATH"))))
					.append(idcFilePath).append("/").toString();
			String backPath = FMPContex.getSystemProperty("AC_LOG_BACKUP_PATH");
			String date = FMPContex.getCurrentDate();
			backUpPath = (new StringBuilder(String.valueOf(backPath))).append("/action/").append(date).append("/")
					.append(idcFilePath).toString();
			FileUtil.makeDirs(filePath);
			FileUtil.makeDirs(backUpPath);
			List fileNameList = FileUtil.outFileName(filePath);
			iterator1 = fileNameList.iterator();
			String fileName;
			String mdfPath;
			DBSqlSession dbsqlSession;
			fileName = (String) iterator1.next();
			if (!fileName.startsWith("bbs") || !fileName.endsWith(".mdf.ok")) {
				FMPLog.printLog("!fileName.startsWith(\"bbs\") || !fileName.endsWith(\".mdf.ok\")");
			} else {
				String mdfFileName = fileName.replace(".mdf.ok", ".mdf");
				mdfPath = (new StringBuilder(String.valueOf(filePath))).append(mdfFileName).toString();
				File file = new File(mdfPath);
				if (!file.exists()) {
					FMPLog.printLog("!file.exists()");
				} else {
					dbsqlSession = null;
					try {
						dbsqlSession = new DBSqlSession(FMPContex.DBConnection.openSqlSession(null));
						ActionContext contex = new ActionContext(new HashMap());
						contex.put("sqlSession", dbsqlSession.getSqlSession());
						String tableRow = "USERNAME,GROUPNAME,IP,SERV_CRC,APP_CRC,LOG_TIME,CONTENT,TITLE,URL,CONTENTPATH";
						String sqlId = "SmmsAcBbs.insertSave";
						ReadAcLogDel del = new ReadAcLogDel(contex);
						dbsqlSession.delete("SmmsAcBbs.deleteAll");
						int sum = del.insertAcLogin(filePath, mdfPath, tableRow, sqlId, false);
						String logFlag = "040";
						del.insertRecordMap(filePath, logFlag, sum);
						FMPContex.DBConnection.commitSession(dbsqlSession.getSqlSession());
						String okPath = (new StringBuilder(String.valueOf(filePath))).append(fileName).toString();
						FileOperateUtil.cutGeneralFile(okPath, backUpPath);
						FileOperateUtil.cutGeneralFile(mdfPath, backUpPath);
					} catch (Exception e) {
						FMPContex.DBConnection.rollBackSession(dbsqlSession.getSqlSession());
						e.printStackTrace();
					} finally {
						FMPContex.DBConnection.closeSession(dbsqlSession.getSqlSession());
					}
				}
			}
		}
	}
}
