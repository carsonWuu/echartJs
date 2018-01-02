package com.zstar.SMMS.constant;

import com.zstar.fmp.core.base.FMPContex;
import com.zstar.fmp.utils.JsonUtil;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FileUtil {

	public static List<Map<String, Object>> insertAcLogin(String fileName, String tableRow) {
		List<Map<String, Object>> listMap = new ArrayList();
		String[] rowKey = tableRow.split(",");
		try {
			InputStreamReader isr = new InputStreamReader(new FileInputStream(fileName), "UTF-8");
			BufferedReader in = new BufferedReader(isr);
			String str = null;
			while ((str = in.readLine()) != null) {
				String[] kv = str.split("\001");
				Map loginMap = new HashMap();
				if (kv.length == rowKey.length) {
					for (int j = 0; j < kv.length; j++) {
						loginMap.put(rowKey[j], kv[j]);
						loginMap.put("RID", FMPContex.getNewUUID());
						loginMap.put("CREATTIME", FMPContex.getCurrentTime());
						loginMap.put("RECORDSTATE", "0");
					}
					listMap.add(loginMap);
				}
			}
			isr.close();
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return listMap;
	}

	public static List<Map<String, Object>> insertAFLog(String fileName) {
		List<Map<String, Object>> listMap = new ArrayList();
		try {
			InputStreamReader isr = new InputStreamReader(new FileInputStream(fileName), "UTF-8");
			BufferedReader in = new BufferedReader(isr);
			String str = null;
			while ((str = in.readLine()) != null) {
				if (str.length() > 5) {
					String s = str.substring(2, str.length() - 1);
					Map<String, Object> jsonMap = new HashMap();
					jsonMap = JsonUtil.jsonToDataMap(s);
					jsonMap.put("RID", FMPContex.getNewUUID());
					jsonMap.put("CREATTIME", FMPContex.getCurrentTime());
					jsonMap.put("END_TIME", FMPContex.getCurrentTime());
					jsonMap.put("RECORDSTATE", "0");
					listMap.add(jsonMap);
				}
			}
			isr.close();
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return listMap;
	}

	public static List<String> outFileName(String filePath) {
		File file = new File(filePath);
		List fileNameList = new ArrayList();
		if ((file != null) && (file.isDirectory())) {
			File[] f = file.listFiles();
			File[] arrayOfFile1;
			int j = (arrayOfFile1 = f).length;
			for (int i = 0; i < j; i++) {
				File file2 = arrayOfFile1[i];
				fileNameList.add(file2.getName());
			}
		}
		return fileNameList;
	}

	public static void makeDirs(String filePath) {
		File file = new File(filePath);
		if (!file.exists()) {
			file.mkdirs();
		}
	}

	public static void main(String[] args) {
		makeDirs("D:/AC_LOG/action");
	}
}
