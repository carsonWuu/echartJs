package com.smms;

import java.net.URL;
import javax.xml.rpc.Service;
import javax.xml.rpc.ServiceException;

/**
 * @author 吴立
 * @date 2017年11月29日
 */
public abstract interface WsRpciService extends Service {

	public abstract String getWsRpciAddress();

	public abstract WsRpci_client getWsRpci() throws ServiceException;

	public abstract WsRpci_client getWsRpci(URL paramURL) throws ServiceException;
}
