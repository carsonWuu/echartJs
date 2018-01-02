package com.smms;

import java.rmi.RemoteException;

/**
 * @author 吴立
 * @date 2017年11月29日
 */
public class WsRpci_client_impl implements WsRpci_client {

	public String wscall(String tokenid, String rpcCode, String rpcJson, byte[] rpcByte) throws RemoteException {
		return null;
	}

	public static void main(String[] ss) {
		WsRpciProxy wrp = new WsRpciProxy();
		wrp.setEndpoint("http://172.18.2.61/SMMS/services/WsRpci");
		String json = "";
		json = json + "{";
		json = json + " \"data\": {";
		json = json + "\"access_id\": \"1\",";
		json = json + " \"machine_room_idx\": \"123\",";
		json = json + " \"machine_room_name\": \"002机房\",";
		json = json + " \"machine_room_property\": \"1\",";
		json = json + " \"room_manager\": \"负责人01\",";
		json = json + " \"room_manager_tel\": \"232323\",";
		json = json + "\"room_manager_mobile\": \"131023\",";
		json = json + " \"machine_room_place\": \"广东省深圳市x\",";
		json = json + "\"total\": 2,";
		json = json + " \"rows\": [";
		json = json + "     {";
		json = json + " \"begin_ip\": \"37\",";
		json = json + "\"end_ip\": \"192.168.234.82\"";
		json = json + "},";
		json = json + " {";
		json = json + " \"begin_ip\": \"38.1\",";
		json = json + " \"end_ip\": \"192.168.123.82\"";
		json = json + "}";
		json = json + " ]";
		json = json + "}";
		json = json + "}";
		String rtStr = "";
		try {
			rtStr = wrp.getWsRpci().wscall("1111", "1001", json, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.err.println("rtStr===" + rtStr);
	}
}