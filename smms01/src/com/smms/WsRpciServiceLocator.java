package com.smms;

import java.net.MalformedURLException;
import java.net.URL;
import java.rmi.Remote;
import java.util.HashSet;
import java.util.Iterator;
import javax.xml.namespace.QName;
import javax.xml.rpc.ServiceException;
import org.apache.axis.AxisFault;
import org.apache.axis.EngineConfiguration;
import org.apache.axis.client.Service;
import org.apache.axis.client.Stub;

/**
 * @author 吴立
 * @date 2017年11月29日
 */
public class WsRpciServiceLocator extends Service implements WsRpciService {

	public WsRpciServiceLocator() {
	}

	public WsRpciServiceLocator(EngineConfiguration config) {
		super(config);
	}

	public WsRpciServiceLocator(String wsdlLoc, QName sName) throws ServiceException {
		super(wsdlLoc, sName);
	}

	private String WsRpci_address = "http://2.0.1.1:8088/SMMS/services/WsRpci";

	public String getWsRpciAddress() {
		return this.WsRpci_address;
	}

	private String WsRpciWSDDServiceName = "WsRpci";

	public String getWsRpciWSDDServiceName() {
		return this.WsRpciWSDDServiceName;
	}

	public void setWsRpciWSDDServiceName(String name) {
		this.WsRpciWSDDServiceName = name;
	}

	public WsRpci_client getWsRpci() throws ServiceException {
		URL endpoint;
		try {
			endpoint = new URL(this.WsRpci_address);
		} catch (MalformedURLException e) {
			throw new ServiceException(e);
		}
		return getWsRpci(endpoint);
	}

	public WsRpci_client getWsRpci(URL portAddress) throws ServiceException {
		try {
			WsRpciSoapBindingStub _stub = new WsRpciSoapBindingStub(portAddress, this);
			_stub.setPortName(getWsRpciWSDDServiceName());
			return _stub;
		} catch (AxisFault e) {
		}
		return null;
	}

	public void setWsRpciEndpointAddress(String address) {
		this.WsRpci_address = address;
	}

	public Remote getPort(Class serviceEndpointInterface) throws ServiceException {
		try {
			if (WsRpci_client.class.isAssignableFrom(serviceEndpointInterface)) {
				WsRpciSoapBindingStub _stub = new WsRpciSoapBindingStub(new URL(this.WsRpci_address), this);
				_stub.setPortName(getWsRpciWSDDServiceName());
				return _stub;
			}
		} catch (Throwable t) {
			throw new ServiceException(t);
		}
		throw new ServiceException("There is no stub implementation for the interface:  "
				+ (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
	}

	public Remote getPort(QName portName, Class serviceEndpointInterface) throws ServiceException {
		if (portName == null) {
			return getPort(serviceEndpointInterface);
		}
		String inputPortName = portName.getLocalPart();
		if ("WsRpci".equals(inputPortName)) {
			return getWsRpci();
		}
		Remote _stub = getPort(serviceEndpointInterface);
		((Stub) _stub).setPortName(portName);
		return _stub;
	}

	public QName getServiceName() {
		return new QName("http://smms.com", "WsRpciService");
	}

	private HashSet ports = null;

	public Iterator getPorts() {
		if (this.ports == null) {
			this.ports = new HashSet();
			this.ports.add(new QName("http://smms.com", "WsRpci"));
		}
		return this.ports.iterator();
	}

	public void setEndpointAddress(String portName, String address) throws ServiceException {
		if ("WsRpci".equals(portName)) {
			setWsRpciEndpointAddress(address);
		} else {
			throw new ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
		}
	}

	public void setEndpointAddress(QName portName, String address) throws ServiceException {
		setEndpointAddress(portName.getLocalPart(), address);
	}
}
