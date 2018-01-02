package com.zstar.SMMS.jobs;

import com.zstar.SMMS.afLog.SmmsAfLog.delegate.ReadAFLogDel;
import com.zstar.fmp.core.base.FMPContex;
import com.zstar.fmp.job.BaseJob;
import com.zstar.fmp.log.FMPLog;
import java.io.File;
import java.util.Map;
import org.quartz.JobExecutionException;

public class Load_AF_App_LogFile extends BaseJob {

	public void jobExcute(String arg0) throws JobExecutionException {
		FMPLog.printErr("执行装载AF的任务。。。。。。。");

		ReadAFLogDel del = new ReadAFLogDel(getContex());
		String filePath = FMPContex.getSystemProperty("AF_LOG_FILE");

		File file = new File(filePath);
		if (file.exists()) {
			Map map = (Map) this.sqlSession.selectOne("SmmsAfLog.findSyslogDataValue");
			long filePos = Long.valueOf((String) map.get("DATAVALUE")).longValue();
			FMPLog.printLog("准备在" + filePos + "位置开始读取文件【" + filePath + "】。。。");
			long resultFilePos = del.insertAFLog(filePos, filePath);
			FMPLog.printLog("完成读取文件。。。" + resultFilePos);
			System.out.println(resultFilePos);
			this.sqlSession.update("SmmsAfLog.updateSyslogDataValue", Long.valueOf(resultFilePos));
		} else {
			FMPLog.printErr("文件【" + filePath + "】不存在");
		}
	}
}
