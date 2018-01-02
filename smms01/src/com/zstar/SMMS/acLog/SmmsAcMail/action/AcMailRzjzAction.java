package com.zstar.SMMS.acLog.SmmsAcMail.action;

import com.zstar.fmp.core.frame.action.FrameAction;
import com.zstar.fmp.log.FMPLog;
import java.io.*;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;

public class AcMailRzjzAction extends FrameAction {

	public AcMailRzjzAction() {
	}

	public String bizExecute() throws Exception {
		HttpServletResponse response;
		File outFile;
		OutputStream out;
		FileInputStream fis;
		response = (HttpServletResponse) contex.get("com.opensymphony.xwork2.dispatcher.HttpServletResponse");
		String rid = (String) getWebData("RID");
		Map ridMap = new HashMap();
		ridMap.put("RID", rid);
		Map map = (Map) sqlSession.selectOne("SmmsAcMail.selectContentPathByRid", ridMap);
		String fileName = (String) map.get("CONTENTPATH");
		FMPLog.printLog((new StringBuilder("test:")).append(fileName).toString());
		if (fileName == null || fileName.length() <= 0) {
			FMPLog.printErr("fileName == null || fileName.length() <= 0");
			return "empty";
		}
		outFile = new File(fileName);
		if (!outFile.exists()) {
			FMPLog.printErr((new StringBuilder("未找到文件：")).append(fileName).toString());
			setMsg((new StringBuilder("未找到文件：")).append(fileName).toString());
			return "empty";
		}
		response.setContentLength((int) outFile.length());
		out = null;
		fis = null;
		try {
			fis = new FileInputStream(outFile);
			out = response.getOutputStream();
			byte b[] = new byte[1024];
			for (int i = 0; (i = fis.read(b)) > 0;)
				out.write(b, 0, i);

			fis.close();
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (fis != null) {
					fis.close();
					fis = null;
				}
				if (out != null) {
					out.close();
					out = null;
				}
			} catch (Exception exception1) {
				exception1.printStackTrace();
			}
		}
		return null;
	}
}
