package com.smms;

import com.opensymphony.xwork2.ActionContext;
import com.zstar.SMMS.webservice.delegate.RpcBusDel;
import com.zstar.fmp.core.base.FMPContex;
import java.util.HashMap;
import org.apache.ibatis.session.SqlSession;

public class WsRpci {

	public WsRpci() {
	}

	public String wscall(String tokenid, String rpc_code, String rpc_json, byte rpc_byte[]) {
		ActionContext contex;
		String rtStr;
		System.out.println("*************收到远程调用*****************");
		System.out.println((new StringBuilder("tokenid=[")).append(tokenid).append("]，rpc_code=[").append(rpc_code)
				.append("] ").toString());
		System.out.println((new StringBuilder("rpc_json=")).append(rpc_json).toString());
		System.out.println("*****************************************");
		contex = new ActionContext(new HashMap());
		rtStr = "";
		try {
			contex.put("com.opensymphony.xwork2.ActionContext.session", new HashMap());
			contex.put("sqlSession", FMPContex.DBConnection.openSqlSession(null));
			RpcBusDel rbd = new RpcBusDel(contex);
			if ("1001".equals(rpc_code))
				rtStr = rbd.rpc1001(rpc_json);
			else if ("1002".equals(rpc_code))
				rtStr = rbd.rpc1002(rpc_json);
			else if ("1101".equals(rpc_code))
				rtStr = rbd.rpc1101(rpc_json);
			else if ("1102".equals(rpc_code))
				rtStr = rbd.rpc1102(rpc_json);
			else if ("1201".equals(rpc_code))
				rtStr = rbd.rpc1201(rpc_json);
			else if ("1202".equals(rpc_code))
				rtStr = rbd.rpc1202(rpc_json);
			else if ("1203".equals(rpc_code))
				rtStr = rbd.rpc1203(rpc_json);
			else
				rtStr = (new StringBuilder("无法识别rpc接口编号(rpc_code)：[")).append(rpc_code).append("]").toString();
			FMPContex.DBConnection.commitSession((SqlSession) contex.get("sqlSession"));
		} catch (Exception e) {
			e.printStackTrace();
			FMPContex.DBConnection.rollBackSession((SqlSession) contex.get("sqlSession"));
			rtStr = (new StringBuilder("服务器内部异常：[")).append(rpc_code).append("]").toString();
			System.err.println(
					(new StringBuilder("未知异常，事务回滚！请将以下错误信息记录下来，以便进行问题跟踪： \n\r")).append(e.toString()).toString());
		} finally {
			FMPContex.DBConnection.closeSession((SqlSession) contex.get("sqlSession"));
		}
		System.out.println("*************返回信息*****************");
		System.out.println(rtStr);
		System.out.println("*****************************************");
		return rtStr;
	}
}
