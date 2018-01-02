package com.smms;

import com.zstar.fmp.log.FMPLog;
import java.rmi.RemoteException;
import javax.xml.rpc.ServiceException;
import javax.xml.rpc.Stub;

/**
 * @author 吴立
 * @date 2017年11月29日
 */
public class WsRpciProxy implements WsRpci_client {

	private String _endpoint = null;

	private WsRpci_client wsRpci = null;

	public WsRpciProxy() {
		_initWsRpciProxy();
	}

	public WsRpciProxy(String endpoint) {
		this._endpoint = endpoint;
		_initWsRpciProxy();
	}

	private void _initWsRpciProxy() {
		try {
			this.wsRpci = new WsRpciServiceLocator().getWsRpci();
			if (this.wsRpci != null) {
				if (this._endpoint != null) {
					((Stub) this.wsRpci)._setProperty("javax.xml.rpc.service.endpoint.address", this._endpoint);
				} else {
					this._endpoint = ((String) ((Stub) this.wsRpci)
							._getProperty("javax.xml.rpc.service.endpoint.address"));
				}
			}
		} catch (ServiceException localServiceException) {
		}
	}

	public String getEndpoint() {
		return this._endpoint;
	}

	public void setEndpoint(String endpoint) {
		this._endpoint = endpoint;
		if (this.wsRpci != null) {
			((Stub) this.wsRpci)._setProperty("javax.xml.rpc.service.endpoint.address", this._endpoint);
		}
	}

	public WsRpci_client getWsRpci() {
		if (this.wsRpci == null) {
			_initWsRpciProxy();
		}
		return this.wsRpci;
	}

	public String wscall(String tokenid, String rpc_code, String rpc_json, byte[] rpc_byte) throws RemoteException {
		if (this.wsRpci == null) {
			_initWsRpciProxy();
		}
		FMPLog.printLog("tokenid====" + tokenid);
		FMPLog.printLog("rpc_code====" + rpc_code);
		FMPLog.printLog("rpc_json====" + rpc_json);
		if ((tokenid == null) || ("".equals(tokenid))) {
			return "{ \"return_code \": \"999\",\"return_msg \": \"tokenid不能为空[" + tokenid + "]\"}";
		}
		if ((rpc_code == null) || ("".equals(rpc_code))) {
			return "{ \"return_code \": \"999\",\"return_msg \": \"rpc_code不能为空[" + rpc_code + "]\"}";
		}
		return this.wsRpci.wscall(tokenid, rpc_code, rpc_json, rpc_byte);
	}
}
