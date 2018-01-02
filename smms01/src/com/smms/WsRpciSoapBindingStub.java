package com.smms;

import java.net.URL;
import java.rmi.RemoteException;
import java.util.Enumeration;
import java.util.Vector;
import javax.xml.namespace.QName;
import org.apache.axis.AxisFault;
import org.apache.axis.NoEndPointException;
import org.apache.axis.client.Call;
import org.apache.axis.client.Stub;
import org.apache.axis.constants.Style;
import org.apache.axis.constants.Use;
import org.apache.axis.description.OperationDesc;
import org.apache.axis.description.ParameterDesc;
import org.apache.axis.soap.SOAPConstants;
import org.apache.axis.utils.JavaUtils;

/**
 * @author 吴立
 * @date 2017年11月29日
 */
public class WsRpciSoapBindingStub extends Stub implements WsRpci_client {

	private Vector cachedSerClasses = new Vector();

	private Vector cachedSerQNames = new Vector();

	private Vector cachedSerFactories = new Vector();

	private Vector cachedDeserFactories = new Vector();

	static OperationDesc[] _operations = new OperationDesc[1];

	static {
		_initOperationDesc1();
	}

	private static void _initOperationDesc1() {
		OperationDesc oper = new OperationDesc();
		oper.setName("wscall");
		ParameterDesc param = new ParameterDesc(new QName("http://smms.com", "tokenid"), (byte) 1,
				new QName("http://www.w3.org/2001/XMLSchema", "string"), String.class, false, false);
		oper.addParameter(param);
		param = new ParameterDesc(new QName("http://smms.com", "rpc_code"), (byte) 1,
				new QName("http://www.w3.org/2001/XMLSchema", "string"), String.class, false, false);
		oper.addParameter(param);
		param = new ParameterDesc(new QName("http://smms.com", "rpc_json"), (byte) 1,
				new QName("http://www.w3.org/2001/XMLSchema", "string"), String.class, false, false);
		oper.addParameter(param);
		param = new ParameterDesc(new QName("http://smms.com", "rpc_byte"), (byte) 1,
				new QName("http://www.w3.org/2001/XMLSchema", "base64Binary"), byte[].class, false, false);
		oper.addParameter(param);
		oper.setReturnType(new QName("http://www.w3.org/2001/XMLSchema", "string"));
		oper.setReturnClass(String.class);
		oper.setReturnQName(new QName("http://smms.com", "wscallReturn"));
		oper.setStyle(Style.WRAPPED);
		oper.setUse(Use.LITERAL);
		_operations[0] = oper;
	}

	public WsRpciSoapBindingStub() throws AxisFault {
		this(null);
	}

	public WsRpciSoapBindingStub(URL endpointURL, javax.xml.rpc.Service service) throws AxisFault {
		this(service);
		this.cachedEndpoint = endpointURL;
	}

	public WsRpciSoapBindingStub(javax.xml.rpc.Service service) throws AxisFault {
		if (service == null) {
			this.service = new org.apache.axis.client.Service();
		} else {
			this.service = service;
		}
		((org.apache.axis.client.Service) this.service).setTypeMappingVersion("1.2");
	}

	protected Call createCall() throws RemoteException {
		try {
			Call _call = super._createCall();
			if (this.maintainSessionSet) {
				_call.setMaintainSession(this.maintainSession);
			}
			if (this.cachedUsername != null) {
				_call.setUsername(this.cachedUsername);
			}
			if (this.cachedPassword != null) {
				_call.setPassword(this.cachedPassword);
			}
			if (this.cachedEndpoint != null) {
				_call.setTargetEndpointAddress(this.cachedEndpoint);
			}
			if (this.cachedTimeout != null) {
				_call.setTimeout(this.cachedTimeout);
			}
			if (this.cachedPortName != null) {
				_call.setPortName(this.cachedPortName);
			}
			Enumeration keys = this.cachedProperties.keys();
			while (keys.hasMoreElements()) {
				String key = (String) keys.nextElement();
				_call.setProperty(key, this.cachedProperties.get(key));
			}
			return _call;
		} catch (Throwable _t) {
			throw new AxisFault("Failure trying to get the Call object", _t);
		}
	}

	public String wscall(String tokenid, String rpc_code, String rpc_json, byte rpc_byte[]) throws RemoteException {
		Call _call;
		if (super.cachedEndpoint == null)
			throw new NoEndPointException();
		_call = createCall();
		_call.setOperation(_operations[0]);
		_call.setUseSOAPAction(true);
		_call.setSOAPActionURI("");
		_call.setEncodingStyle(null);
		_call.setProperty("sendXsiTypes", Boolean.FALSE);
		_call.setProperty("sendMultiRefs", Boolean.FALSE);
		_call.setSOAPVersion(SOAPConstants.SOAP11_CONSTANTS);
		_call.setOperationName(new QName("http://smms.com", "wscall"));
		setRequestHeaders(_call);
		setAttachments(_call);
		Object _resp;
		_resp = _call.invoke(new Object[] { tokenid, rpc_code, rpc_json, rpc_byte });
		if (_resp instanceof RemoteException)
			throw (RemoteException) _resp;
		extractAttachments(_call);
		try {
			return (String) _resp;
		} catch (Exception _exception) {
			return (String) JavaUtils.convert(_resp, String.class);
		}
	}
}
