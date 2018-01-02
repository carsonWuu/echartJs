package com.zstar.SMMS.BaseData.SmmsKeyword.action;

import com.strutsframe.db.DBSqlSession;
import com.zstar.fmp.core.frame.action.FrameAction;
import com.zstar.fmp.utils.JsonUtil;
import java.io.PrintStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class sandKeyAction extends FrameAction {

	public String bizExecute() throws Exception {
		List<Map> list = this.sqlSession.selectList("SmmsKeyword.selectList");
		Map keyWordMap = new HashMap();
		String keyWord = "";
		for (Map map : list) {
			keyWord = keyWord + map.get("KEYWORD") + ";";
		}
		if (keyWord.endsWith(";")) {
			keyWord = keyWord.substring(0, keyWord.length() - 1);
		}
		keyWordMap.put("keyWrd", keyWord);
		keyWordMap.put("opMode", Integer.valueOf(1));
		System.out.println("-------------------" + keyWord);
		String json = JsonUtil.dataMapToJson(keyWordMap);
		setMsg(json);
		return "empty";
	}
}
