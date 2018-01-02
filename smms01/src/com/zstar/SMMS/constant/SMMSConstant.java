package com.zstar.SMMS.constant;

import java.util.HashMap;
import java.util.Map;

public class SMMSConstant {

	public static Map<String, String> idcServiceUrlMap = new HashMap();

	public static Map<String, String> idcTokenMap = new HashMap();

	public static final String CASE_NICKNAME = "项目";

	public static final String CRD_REPORTORG = "[ALL]";

	public static final String CRD_REPORTDEPT = "[ALL]";

	public static final String DICKEY_JLZT = "0";

	public static final String DICKEY_ZGJG_CG = "1";

	public static final String DICKEY_ZGJG_SB = "9";

	public static final String DICKEY_SMMS_SPJG_TG = "1";

	public static final String DICKEY_SMMS_SPJG_FJ = "9";

	public static final String DICKEY_SMMS_SPJG_WSP = "0";

	public static final String DICKEY_XFZT = "0";

	public static final String EVENT_SOURCE = "3";

	public static final String EVENT_SOURCE_AC = "1";

	public static final String REPORT_CITY = "深圳";

	public static final String RECTIFY_STATE = "000";

	public static final String RECTIFY_STATE_END = "010";

	public static final String RECTIFY_TERM = "0000000000";

	public static final String CLOSE_TERM = "0000000000";

	public static final String IS_WHITE_LIST = "2";

	public static final String MESSAGE = "000";

	public static final String MUST_SMMSROOMINFO = "ACCESS_ID,ROOM_NAME,ROOM_IDX,ROOM_PROPERTY,ROOM_MANAGER,MANAGER_TEL,MANAGER_MOBILE";

	public static final String FIELD_LONG_SMMSROOMINFO = "ACCESS_ID:10,ROOM_NAME:20,ROOM_IDX:3,ROOM_ADDRESS:100,ROOM_PROPERTY:1,ROOM_MANAGER:20,MANAGER_TEL:20,MANAGER_MOBILE:100";

	public static final String MUST_SMMSROOMIPRANGEINFO = "ACCESS_ID,ROOM_IDX,BEGIN_IP,END_IP";

	public static final String FIELD_LONG_SMMSROOMIPRANGE = "ACCESS_ID:10,ROOM_IDX:3,BEGIN_IP:15,END_IP:15";

	public static final String IS_FORCE_CLOSE = "1";

	public static final String IS_FORCE_CLOSE_TWO = "2";

	public static final String SECURITY_TYPE = "未知";

	public static final String ACLOGIN_RECORDSTATE = "0";

	public static final String CASE_STATE = "0";

	public static final String THREAT_LEVEL = "3";

	public static final String THREAT_NAME = "未知";

	public static final String CLIENTNAME = "未知";

	public static final String SMMS_AC_APP_VPN = "SMMS_AC_APP_VPN";

	public static final String SMMS_AC_BBS_KEY = "SMMS_AC_BBS_KEY";

	public static final String SMMS_AC_MAIL_KEY = "SMMS_AC_MAIL_KEY";

	public static final String SMMS_AC_URL_KEY = "SMMS_AC_URL_KEY";

	public static final String APP = "app";

	public static final String BBS = "bbs";

	public static final String MAIL = "mail";

	public static final String URL = "url";

	public static final String KEY = "Key";

	public static final String VPN = "vpn";

	public static final String VPNO = "vpno";

	public static final String CALLDIRECTION_ONE = "1";

	public static final String CALLDIRECTION_TWO = "2";

	public static final String RPC_LOG_RECORDSTATE = "0";

	public static final String RPC_RESULT_SUCCESS = "处理成功";

	public static final String RPC_RESULT_FAIL = "处理失败";

	public static final String RPC_RESULT_SUCCESS_CODE = "000";

	public static final String RPC_RESULT_FAIL_CODE = "999";

	public static final String JCSJ_ITF_NUM_IDC = "1001";

	public static final String WEB_INFO_ITF_NUM = "1002";

	public static final String ZGTS_ITF_NUM = "2101";

	public static final String QZGT_ITF_NUM = "2102";

	public static final String ZGGTFK_ITF_NUM = "1101";

	public static final String YWHF_ITF_NUM = "1102";

	public static final String WZHF_ITF_NUM = "2103";

	public static final String WEB_JLZS_NUM = "1201";

	public static final String WEB_XXCX_NUM = "1202";

	public static final String WEB_JFXX_NUM = "1203";

	public static final String QUERYRESULT = "0";

	public static final String URL_LOG_FLAG = "010";

	public static final String LOGIN_LOG_FLAG = "020";

	public static final String APP_LOG_FLAG = "030";

	public static final String BBS_LOG_FLAG = "040";

	public static final String MAIL_LOG_FLAG = "050";

	public static final String AF_LOG_FLAG = "060";
}
