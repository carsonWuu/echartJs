package com.smms;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * @author 吴立
 * @date 2017年11月29日
 */
public abstract interface WsRpci_client extends Remote {

	public abstract String wscall(String paramString1, String paramString2, String paramString3,
			byte[] paramArrayOfByte) throws RemoteException;
}
