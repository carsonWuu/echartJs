<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String rootPath = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>首页</title>
<script src="<%=rootPath%>/scripts/echarts.min.js"></script>
<script src="<%=rootPath%>/scripts/fmp/jquery-1.11.3.js"></script>
<script src="<%=rootPath%>/scripts/bootstrap.min.js"></script>
<link href="<%=rootPath%>/styles/fmp/bootstrap.min.css" rel="stylesheet"
	type="text/css" />
<!-- <script src="echarts.min.js"></script>
<link rel="stylesheet"
	href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
<script
	src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
<style type="text/css">
* {
	margin: 0;
	padding: 0;
}

#homepage_border {
	width: 100%;
	/* border: 1px solid #a5c2d6;
	padding-top: 3px;*/ 
	min-width: 980px;
	/*  	position: absolute;  */
}

.right_container_title {
	right: 2px;
	top: 61px;
	width: 100%;
	height: 28px;
	border: #4e627b solid 1px;
	background-color: #bfdcfc;
}

.right_title_bg {
	background: url(../../images/zscrd/kuangjia/title_bg.png) repeat-x;
	height: 28px;
	width: 100%;
}

.right_title_txt {
	background: url(../../images/zscrd/kuangjia/home_gb.png) repeat-x;
	width: 80px;
	height: 22px;
	position: absolute;
	top: 7px;
	left: 10px;
	border-left: #354860 solid 1px;
	border-top: #354860 solid 1px;
	border-right: #354860 solid 1px;
	line-height: 25px;
	text-align: center;
	font-size: 14px;
}

#right_container {
	/* 	border: #4e627b solid 1px; */
	background-color: #FFF;
	margin: 5px;
	height: auto;
	width: 99.5%;
	margin-top: 0px;
}

#right_container_row {
	background: url(../../images/zscrd/kuangjia/bgd.png) repeat-x;
	height: 80px;
}

#right_container_count_idc {
	background: url(../../images/zscrd/kuangjia/idc.png) no-repeat;
	height: 58px;
	margin-top: 12px;
}

#right_container_count_idc span {
	margin-left: 80px;
	display: block;
	padding-top: 12px;
	color: #5ed0ef;
	font-size: 14px;
	min-width: 80px;
}

#right_container_count_idchome {
	background: url(../../images/zscrd/kuangjia/jf.png) no-repeat;
	height: 58px;
	margin-top: 12px;
}

#right_container_count_idchome span {
	margin-left: 80px;
	display: block;
	padding-top: 12px;
	color: #5ed0ef;
	font-size: 14px;
	min-width: 80px;
}

#right_container_count_ywts {
	background: url(../../images/zscrd/kuangjia/ywts.png) no-repeat;
	height: 58px;
	margin-top: 12px;
	float: left;
}

#right_container_count_ywts span {
	margin-left: 105px;
	display: block;
	padding-top: 12px;
	color: #5ed0ef;
	font-size: 14px;
	min-width: 80px;
}

#right_container_count_ac {
	background: url(../../images/zscrd/kuangjia/ac.png) no-repeat;
	height: 58px;
	margin-top: 12px;
	margin-left: 15px;
}

#right_container_count_ac span {
	margin-left: 95px;
	display: block;
	padding-top: 3px;
	color: #5ed0ef;
	font-size: 14px;
	min-width: 80px;
}

#right_container_count_ac span ul {
	font-size: 8px;
}

#right_container_count_af {
	background: url(../../images/zscrd/kuangjia/ngaf.png) no-repeat;
	height: 58px;
	margin-top: 12px;
}

#right_container_count_af span {
	margin-left: 95px;
	display: block;
	padding-top: 3px;
	color: #5ed0ef;
	font-size: 14px;
	min-width: 80px;
}

#right_container_count_af ul {
	font-size: 8px;
	margin-left: 14px;
}

#right_container_count_sta {
	background: url(../../images/zscrd/kuangjia/sta.png) no-repeat;
	height: 58px;
	margin-top: 12px;
}

#right_container_count_sta span {
	margin-left: 95px;
	display: block;
	padding-top: 3px;
	color: #5ed0ef;
	font-size: 14px;
	min-width: 80px;
}

#right_container_count_sta ul {
	font-size: 8px;
}

#right_container_bottom_title {
	height: 30px;
	margin-top: 10px;
	margin-left: -15px;
	margin-bottom: 8px;
}

#right_container_bottom_count {
	/* 	height: 37px; */
	border: 1px solid #a5c6ff;
	border-radius: 5px;
	padding-top: 8px;
	padding-bottom: 8px;
	background: #f7faff;
}

#allcount_monthk {
	font-size: 16px;
	color: #fff;
	background: #46b7ff;
}

#allcount_monthj {
	font-size: 16px;
	color: #fff;
	background: #ffa200;
	margin-right: 2px;
}

#allcount_monthi {
	font-size: 16px;
	color: #fff;
	background: #ff3eeb;
	margin-right: 2px;
}

#allcount_month2 {
	font-size: 16px;
	color: #007eff;
}

#allcount_month3 {
	font-size: 16px;
	color: #00b711;
}

#allcount_month4 {
	font-size: 16px;
	color: #ff9a22;
}

#echarts_five {
	height: 160px;
	margin-top: 4px;
}

#echarts_zhpj,#echarts_ywzg,#echarts_dzg,#echarts_yjgjz,#echarts_ejgjz {
	height: 160px;
	margin: 0;
	padding: 0;
}

#echarts_bar_wlaqsj,#echarts_bar_wxsjTop {
	height: auto;
	margin: 0;
	padding: 0;
	border-top: 1px solid #768aa3;
}

#echarts_bar_wlaqsj_top {
	height: 27px;
	width: 100%;
	border-bottom: 2px solid #639ddb;
	border:1px solid #639ddb;
	background: url(../../images/zscrd/kuangjia/sjbg.png) repeat-x;
}

#echarts_bar_wlaqsj_left {
	height: 25px;
	width: 120px;
	background: url(../../images/zscrd/kuangjia/sjtbg.png) repeat-x;
	float: left;
	/*margin-top: 5px;*/
	margin-left: 12px;
	text-align: center;
	line-height: 25px;
	color: #fff;
	font-size: 14px;
}

#echarts_bar_wlaqsj_right {
	float: right;
	margin-top: 2px;
	width: 125px;
}

#echarts_bar_1,#echarts_bar_3,#echarts_bar_2 {
	height: 498px;
	/* 	border: 1px solid red; */
}
</style>
</head>
<body>
	<div id="homepage_border">
		<!-- <div class="right_container_title">
			<div class="right_title_bg">
				<div class="right_title_txt">首 页</div>
			</div>
		</div> -->
		<!-- 主题内容 -->
		<div id="right_container">
			<div class="container-fluid">
				<div class="row" id="right_container_row">
					<div class="col-xs-2" id="right_container1">
						<div class="right_container_count" id="right_container_count_idc">
							<span id="idc">4个</span>
						</div>
					</div>
					<div class="col-xs-2" id="right_container1">
						<div class="right_container_count"
							id="right_container_count_idchome">
							<span id="roomidc">14个</span>
						</div>
					</div>
					<div class="col-xs-2" id="right_container1">
						<div class="right_container_count" id="right_container_count_ywts">
							<span id="ywts">25145条</span>
						</div>
					</div>
					<div class="col-xs-2" id="right_container1">
						<!-- <div style="position: absolute;float:left;">
							<img src="../../images/zscrd/kuangjia/L_line.png" alt="" height="100px"/>
						</div> -->
						<div class="right_container_count" id="right_container_count_ac">
							<span>
								<ul>
									<li style="color: #42f603;"><a
										style="color: #5de0ef; font-size: 10px; text-decoration: none;"
										id="aconline">在线:14台</a></li>
									<li style="color: #ff1212;"><a
										style="color: #5de0ef; font-size: 10px; text-decoration: none;"
										id="acoffline">离线:0台</a></li>
								</ul>
							</span>
						</div>
					</div>
					<div class="col-xs-2" id="right_container1">
						<div class="right_container_count" id="right_container_count_af">
							<span>
								<ul>
									<li style="color: #42f603;"><a
										style="color: #5de0ef; font-size: 10px; text-decoration: none;"
										id="afonline">在线:2台</a></li>
									<li style="color: #ff1212;"><a
										style="color: #5de0ef; font-size: 10px; text-decoration: none;"
										id="afoffline">离线:0台</a></li>
								</ul>
							</span>
						</div>
					</div>
					<div class="col-xs-2" id="right_container1">
						<div class="right_container_count" id="right_container_count_sta">
							<span>
								<ul>
									<li style="color: #42f603;"><a
										style="color: #5de0ef; font-size: 10px; text-decoration: none;"
										id="staonline">在线:0台</a></li>
									<li style="color: #ff1212;"><a
										style="color: #5de0ef; font-size: 10px; text-decoration: none;"
										id="staoffline">离线:0台</a></li>
								</ul>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-12">
						<table cellpadding="0" cellspacing="0"
							id="right_container_bottom_title">
							<tr>
								<td><img alt="" src="../../images/zscrd/kuangjia/dot.png"></td>
								<td
									style="font-size: 14px; font-weight: bold; padding-left: 15px;">全市全网IDC安全管理</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="container-fluid">
				<div class="row" id="right_container_bottom_count">
					<div class="col-xs-3">
						<table>
							<tr>
								<td><img src="../../images/zscrd/kuangjia/URL.png" alt="" /></td>
								<td>&nbsp;&nbsp;未备案URL/IP总数 :&nbsp;</td>
								<td id="allcount_monthi"></td>
								<td id="allcount_monthj"></td>
								<td id="allcount_monthk"></td>
							</tr>
						</table>
					</div>
					<div class="col-xs-3">
						<table>
							<tr>
								<td><img src="../../images/zscrd/kuangjia/find.png" alt="" /></td>
								<td>&nbsp;&nbsp;当月累积发现安全事件 :&nbsp;</td>
								<td id="allcount_month2">4345</td>
							</tr>
						</table>
					</div>
					<div class="col-xs-3">
						<table>
							<tr>
								<td><img src="../../images/zscrd/kuangjia/fin.png" alt="" /></td>
								<td>&nbsp;&nbsp;当月累积已处理安全事件 :&nbsp;</td>
								<td id="allcount_month3">2565</td>
							</tr>
						</table>
					</div>
					<div class="col-xs-3">
						<table>
							<tr>
								<td><img src="../../images/zscrd/kuangjia/not.png" alt="" /></td>
								<td>&nbsp;&nbsp;当月累积未处理安全事件 :&nbsp;</td>
								<td id="allcount_month4">245</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="container-fluid">
				<div class="row" id="echarts_five">
					<div class="col-xs-2" id="echarts_zhpj"></div>
					<div class="col-xs-10">
						<div class="row">
							<div class="col-xs-3" id="echarts_ywzg"></div>
							<div class="col-xs-3" id="echarts_dzg"></div>
							<div class="col-xs-3" id="echarts_yjgjz"></div>
							<div class="col-xs-3" id="echarts_ejgjz"></div>
						</div>
					</div>

				</div>
			</div>
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-6" id="echarts_bar_wlaqsj">
						<div id="echarts_bar_wlaqsj_top">
							<div id="echarts_bar_wlaqsj_left">网络安全事件</div>
							<div id="echarts_bar_wlaqsj_right">
								<table>
									<tr>
										<td>查看:</td>
										<td><select id="ztlj">
												<option value="1">总体累积</option>
												<option value="2">当前状态</option>
										</select></td>
									</tr>
								</table>
							</div>
						</div>
						<div id="echarts_bar_1"></div>
						<div id="echarts_bar_3"></div>
					</div>
					<div class="col-xs-6" id="echarts_bar_wxsjTop">
						<div id="echarts_bar_wlaqsj_top">
							<div id="echarts_bar_wlaqsj_left">威胁事件Top10</div>
							<div id="echarts_bar_wlaqsj_right">
								<table>
									<tr>
										<td>查看:</td>
										<td><select id="wxsj">
												<option value="1">总体累积</option>
												<option value="2">当前状态</option>
										</select></td>
									</tr>
								</table>
							</div>
						</div>
						<div id="echarts_bar_2"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var SMMS_EVENT_STAT, SMMS_EVENT_TOP10, SMMS_BASE_STAT,

	SMMS_EVENT_STAT_CURRENT, SMMS_EVENT_TOP10_CURRENT;

	var eventTop10 = [], eventTop10_current = [];

	var close_count, no_case, idc_count,

	sta_offline, sta_online,

	month_not_deal, need_close_count, af_online, af_offline,

	room_count, month_dealt, month_event,

	bussy_count,

	ac_online, ac_offline,

	rectify_count, need_rectify_count,

	key_010, key_020, key_030, key_040, key_050, key_060;

	var IDC_NAME = [], INVADE = [], HACKER = [], BLACK_PROFIT = [], INSIDER_ATTACK = [], OVER_WALL = [], PROXY = [], VPN = [];

	var IDC_NAME_CURRENT = [], INVADE_CURRENT = [], HACKER_CURRENT = [], BLACK_PROFIT_CURRENT = [], INSIDER_ATTACK_CURRENT = [], OVER_WALL_CURRENT = [], PROXY_CURRENT = [], VPN_CURRENT = [];

	$(function() {
		AjaxData();
		dealData();
		$(idc).text(idc_count + "个");
		$(roomidc).text(room_count + "个");
		$(ywts).text(bussy_count + "条");
		$(aconline).text("在线:"+ac_online+"台");
// 		$(acoffline).text("离线:"+ac_offline+"台");
		$(afonline).text("在线:"+af_online+"台");
// 		$(afoffline).text("离线:"+af_offline+"台");
		$(staonline).text("在线:"+sta_online+"台");
// 		$(staoffline).text("离线:"+sta_offline+"台");

		tianRuCount(allcount_monthi, allcount_monthj, allcount_monthk, no_case);
		
		$(allcount_month2).text(month_event);
		$(allcount_month3).text(month_dealt);
		$(allcount_month4).text(month_not_deal);

		evaluate("综合评级", getThirdPart()[0], "echarts_zhpj");
		var cin1 = [ {
			name : '已关停',
			value : close_count
		}, {
			name : '待关停',
			value : need_close_count
		} ];
		var color1 = [ 'rgb(30, 144, 255)', 'rgb(233, 105, 8)' ];
		var count1 = close_count + need_close_count;
		Pie('业务关停', '合计' + count1 + '个', cin1, 'echarts_ywzg', color1);
		var cin2 = [ {
			name : '已整改',
			value : rectify_count
		}, {
			name : '待整改',
			value : need_rectify_count
		} ];
		var count2 = rectify_count + need_rectify_count;
		var color2 = [ 'rgb(0, 191, 255)', 'rgb(255, 215, 0)' ];
		Pie('整改', '合计' + count2 + '个', cin2, 'echarts_dzg', color2);
		var cin3 = [ {
			name : '涉政',
			value : key_020
		}, {
			name : '涉稳',
			value : key_030
		}, {
			name : '涉恐',
			value : key_010
		} ];
		var count3 = key_020 + key_030 + key_010;
		var color3 = [ 'rgb(30, 144, 255)', 'rgb(124, 205, 124)',
				'rgb(255, 160, 122)' ];
		Pie('一级关键字', '合计' + count3 + '个', cin3, 'echarts_yjgjz', color3);
		var cin4 = [ {
			name : '涉黄',
			value : key_040
		}, {
			name : '涉赌',
			value : key_050
		}, {
			name : '涉毒',
			value : key_060
		} ];
		var count4 = key_040 + key_050 + key_060;
		var color4 = [ 'rgb(255, 215, 0)', 'rgb(30, 144, 255)',
				'rgb(208,32,144)' ];
		Pie('二级关键字', '合计' + count4 + '个', cin4, 'echarts_ejgjz', color4);

		var height = 80;
		for (var i = 1; i <= IDC_NAME.length; i++) {
			height += 20;
		}
		$(echarts_bar_1).css("height", height + "px");
// 		$(echarts_bar_wlaqsj).css("border-bottom", "0");
		Internet_safe(IDC_NAME, INVADE, HACKER, BLACK_PROFIT, INSIDER_ATTACK,
				OVER_WALL, PROXY, VPN, 'echarts_bar_1');

		var arr = [ {
			name : '暴力破解',
			value : 89
		}, {
			name : 'WEB漏洞',
			value : 157
		}, {
			name : 'WEBSELL',
			value : 247
		}, {
			name : '虚拟货币挖矿',
			value : 312
		}, {
			name : 'SMB协议攻击',
			value : 364
		}, {
			name : 'LSTM算法',
			value : 368
		}, {
			name : 'http指纹',
			value : 457
		}, {
			name : '漏洞扫描',
			value : 492
		}, {
			name : '黑链',
			value : 547
		}, {
			name : '风险访问',
			value : 586
		} ];
		var color = [ '#CCCFFF', '#6699CC', '#3399CC', '#8faadc', '#0099CC ',
				'#006699', '#00b0f0', '#99CCFF', '#99CCCC', '#336699' ];
		ThreatEvent(eventTop10, 'echarts_bar_2', color);

	});

	var color = [ '#CCCFFF', '#6699CC', '#3399CC', '#8faadc', '#0099CC ',
			'#006699', '#00b0f0', '#99CCFF', '#99CCCC', '#336699' ];

	$("#ztlj").change(
			function() {
				var val = $(this).val();
				if (val == 1) {//累积状态
					$(echarts_bar_3).css("display","none");
					$(echarts_bar_1).css("display","block");
					var height1 = 80;
					for (var i = 1; i <= IDC_NAME.length; i++) {
						height1 += 20;
					}
					$(echarts_bar_1).css("height", height1 + "px");
					Internet_safe(IDC_NAME, INVADE, HACKER, BLACK_PROFIT,
							INSIDER_ATTACK, OVER_WALL, PROXY, VPN,
							'echarts_bar_1');
				}
				if (val == 2) {//当前状态
					$(echarts_bar_1).css("display","none");
					$(echarts_bar_3).css("display","block");
					var height2 = 80;
					for (var i = 1; i <= IDC_NAME_CURRENT.length; i++) {
						height2 += 20;
					}
					$(echarts_bar_3).css("height", height2 + "px");
					Internet_safe(IDC_NAME_CURRENT, INVADE_CURRENT,
							HACKER_CURRENT, BLACK_PROFIT_CURRENT,
							INSIDER_ATTACK_CURRENT, OVER_WALL_CURRENT,
							PROXY_CURRENT, VPN_CURRENT, 'echarts_bar_3');
				}
			});

	$("#wxsj").change(function() {
		var val = $(this).val();
		if (val == 1) {//累积状态
			ThreatEvent(eventTop10, 'echarts_bar_2', color);
		}
		if (val == 2) {//当前状态
			ThreatEvent(eventTop10_current, 'echarts_bar_2', color);
		}
	});
	
	function evaluate(title, grace1, divId) {
		var grace = grace1;
		var access = '';
		if (grace >= 85)
			access = '优';
		else if (grace >= 75)
			access = '良';
		else if (grace >= 60)
			access = '中';
		else
			access = '差';
		option = {
			title : {
				show : true,
				text : title,
				x : "center",
				textStyle : {
					fontSize : 14,
					align : 'center'
				}
			},
			tooltip : {
				formatter : "{a} <br/>{b} : {c}"
			},
			series : [ {
				name : '综合评级',
				type : 'gauge',
				min : 0,
				max : 100,
				center : [ '50%', '55%' ],
				pointer : {
					show : true,
					width : 5
				},
				axisLine : {
					show : true,
					lineStyle : {
						width : 15,
						shadowBlur : 0,
						color : [ [ 0.599, '#ff4500' ], [ 0.749, '#ffa500' ],
								[ 0.849, '#87ceeb' ], [ 1, '#6ced91' ] ]
					}
				},
				axisTick : {
					show : true,
					splitNumber : 4
				},
				splitLine : {
					show : false,
				},
				axisLabel : {
					show:true,
					formatter : function(e) {
						switch (e + "") {
						case "60":
							return "差";
						
						case "100":
							return "优";
						default:
							return e;
						}
					},
					textStyle : {
						fontSize : 8,
						fontWeight : ""
					},
					distance : -15,
					fontWeight : 'lighter'
				},
				detail : {
					formatter : '{value}分',
					
					textStyle : {
						fontSize : 14
					}
				},
				data : [ {
					name : access,
					value : grace
				} ]
			} ]
		};

		var myChart = echarts.init(document.getElementById(divId));
		myChart.setOption(option);
		window.addEventListener("resize",function(){
		    myChart.resize();
		});
	}

	//通用环形图
	/*
	 * name:标题
	 * count:图形中间的文字描述
	 * CinArray:对应的数值和名称
	 * divId:位置ID
	 * colorL:颜色
	 */
	 function Pie(name, count, CinArray, divId, colorL) {
			// 基于准备好的dom，初始化echarts实例
			var NameArray = CinArray.map(function(cinarray) {
				return cinarray.name;
			}), DataArray = CinArray.map(function(cinarray) {
				return cinarray.value;
			});
			var tag=1;
			for(var i=0;i<DataArray.length;i++){if(DataArray[i]!=0){tag=0;break;}}
			if(tag==1){
				colorL=['rgb(220,220,220)','rgb(220,220,220)','rgb(220,220,220)','rgb(220,220,220)','rgb(220,220,220)','rgb(220,220,220)']
			}
			var myChart = echarts.init(document.getElementById(divId));

			// 指定图表的配置项和数据
			option = {
				title : {
					text : name,
					x : 'center',
					subtext : count,
					itemGap : 65,
					textStyle : {
						fontSize : 14
					}
				},
				tooltip : {
					show : 'true',
					trigger : 'item',
					formatter : "{a} <br/>{b}: {c} ({d}%)"
				},
				legend : {
					orient : 'vertical',
					icon : 'circle',
					align : 'auto',
					itemGap : 6,
					itemWidth : 8,
					x : '72%',
					y : 'center',
					data : NameArray,
					align : 'left',
					selectedMode : true,
					formatter : function(v) {
						return v;
					},
					textStyle : {
						fontSize : 12,
						color : '#666'
					}
				},
				series : [ {
					name : name,
					type : 'pie',
					radius : [ '45%', '63%' ],
					center : [ '50%', '55%' ],
					avoidLabelOverlap : false,
					hoverAnimation : false,
					label : {
						normal : {
							show : false,
							position : 'center'
						},
						emphasis : {
							show : false,
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					labelLine : {
						normal : {
							show : false
						}
					},
					data : CinArray,
					itemStyle : {
						normal : {
							//柱状图颜色  
							color : function(params) {
								// 颜色列表  
								var colorList = colorL;
								//返回颜色  
								return colorList[params.dataIndex];
							},

						},
						emphasis : {

						}
					}
				} ]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			window.addEventListener("resize",function(){
			    myChart.resize();
			});
		}

	//网络安全事件

	// 基于准备好的dom，初始化echarts实例
	function Internet_safe(idc, a1, a2, a3, a4, a5, a6, a7, divId) {
		var colorL = [ 'rgb(122 ,139 ,139)', 'rgb(0, 104, 139)',
				'rgb(0, 0, 139)', 'rgb(85, 26, 139)', 'rgb(24 ,116 ,205)',
				'rgb(0 ,0 ,255)', 'rgb(70 ,130 ,180)', 'rgb(0 ,139 ,139)',
				'rgb(0, 255, 255)', 'rgb(78 ,238 ,148)', 'rgb(0 ,191 ,255)',
				'rgb(46 ,139 ,87)' ];

		var element = [ '遭受入侵', '黑客控制', '黑产牟利', '内部攻击', '翻墙软件', '代理工具', 'VPN' ];
		var idc = idc;
		var IDC = idc;
		var Element = element;
		var myChart = echarts.init(document.getElementById(divId));

		// 指定图表的配置项和数据
		option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend : {
				data : Element,

				// icon: 'circle',
				align : 'auto',
				itemGap : 6,
				itemWidth : 15,
				itemHeight : 8,
				top:'10',
				align : 'left',
				selectedMode : true,
				formatter : function(v) {
					return v;
				},
				textStyle : {
					fontSize : 14,
					color : '#666'
				}
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				top : '60',
				containLabel : true
			},
			xAxis : {
				type : 'value',
				show : false
				//inverse:true
			},
			yAxis : {
				type : 'category',
				//position:'right',
				//silent:true,
				// axisTick:{
				// 	show:false
				// },
				axisLabel : {
					
					textStyle : {
						color : 'rgb(119 ,136 ,153)'
					}
				},
				axisLine:{
					//onZero:false
				},
				data : IDC
			},
			series : [ {
				name : '遭受入侵',
				type : 'bar',
				barWidth : 10,
				barCategoryGap : '15%',
				boundaryGap : true,
				stack : '总量',
				label : {
					normal : {
						show : false,
						position : 'insideRight'
					}
				},
				itemStyle : {
					normal : {
						color : colorL[0]
					},
				},

				data : a1
			}, {
				name : '黑客控制',
				type : 'bar',
				stack : '总量',
				barWidth : 10,
				label : {
					normal : {
						show : false,
						position : 'insideRight'
					}
				},
				itemStyle : {
					normal : {
						color : colorL[1]
					},
				},
				data : a2
			}, {
				name : '黑产牟利',
				type : 'bar',
				stack : '总量',
				barWidth : 10,
				label : {
					normal : {
						show : false,
						position : 'insideRight'
					}
				},
				itemStyle : {
					normal : {
						color : colorL[2]
					},
				},
				data : a3
			}, {
				name : '内部攻击',
				type : 'bar',
				stack : '总量',
				barWidth : 10,
				label : {
					normal : {
						show : false,
						position : 'insideRight'
					}
				},
				itemStyle : {
					normal : {
						color : colorL[3]
					},
				},
				data : a4
			}, {
				name : '翻墙软件',
				type : 'bar',
				stack : '总量',
				barWidth : 10,
				label : {
					normal : {
						show : false,
						position : 'insideRight'
					}
				},
				itemStyle : {
					normal : {
						color : colorL[4]
					},
				},
				data : a5
			}, {
				name : '代理工具',
				type : 'bar',
				stack : '总量',
				barWidth : 10,
				label : {
					normal : {
						show : false,
						position : 'insideRight'
					}
				},
				itemStyle : {
					normal : {
						color : colorL[5]
					},
				},
				data : a6
			}, {
				name : 'VPN',
				type : 'bar',
				stack : '总量',
				barWidth : 10,
				label : {
					normal : {
						show : false,
						position : 'insideRight'
					}
				},
				itemStyle : {
					normal : {
						color : colorL[6]
					},
				},
				data : a7,
			} ]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",function(){
		    myChart.resize();
		});
	}

	//威胁事件top10
	function ThreatEvent(dataArray, divname, colorL) {
		var name = dataArray.map(function(data) {
			return data.name;
		}), data = dataArray.map(function(data) {
			return data.value;
		});
		var myChart = echarts.init(document.getElementById(divname));
		option = {

			tooltip : {
				formatter : '{b} ({c})'
			},
			legend : {
				data : ''
			},
			grid : {
				left : '2%',
				right : '4%',
				bottom : '3%',
				width : '95%',
				height : '90%',

				containLabel : true
			},
			xAxis : {
				type : 'value',
				boundaryGap : [ 0, 0.01 ],
				position :'top'
			},
			yAxis : {
				type : 'category',
				data : name
			},
			series : [ {
				name : name,
				type : 'bar',
				barWidth : 10,
				data : data,
				label : {
					normal : {
						show : true,
						position : "right",
						textStyle : {
							color : "#9EA7C4"
						}
					}
				},
				itemStyle : {
					normal : {
						//柱状图颜色  
						color : function(params) {
							// 颜色列表  
							var colorList = colorL;
							//返回颜色  
							return colorList[params.dataIndex];
						},

					}
				}
			} ]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize",function(){
		    myChart.resize();
		});
	};

	function tianRuCount(divId1, divId2, divId3, num) {
		var num = (num || 0).toString(), result = '';
		for (var i = 0; i < 3; i++) {
			if (i == 0) {
				if (num.length > 4) {
					result = ' ' + num.slice(-4) + result;
					$(divId3).text(result);
					num = num.slice(0, num.length - 4);
				}else{
					$(divId3).text(num);
					num="";
				}
			}
			if (i == 1 && num!="") {
				if (num.length > 4) {
					result = ' ' + num.slice(-4);
					$(divId2).text(result);
					num = num.slice(0, num.length - 4);
				}else{
					$(divId2).text(num);
					num="";
				}
			}
			if (i == 2 && num!="") {
				$(divId1).text(num);
			}
		}
	};

	var compare = function (obj1, obj2) {
	    var val1 = obj1.value;
	    var val2 = obj2.value;
	    if (val1 < val2) {
	        return -1;
	    } else if (val1 > val2) {
	        return 1;
	    } else {
	        return 0;
	    }            
	};
	function add(name,value){this.name=name;this.value=value;}
	function AjaxData(){
		 $.ajax({
            type:"POST",
            async:false,
            url : "http://172.18.2.150/SMMS/SmmsEventMainBiz/getStatJson",
//             url:"data.json",
            dataType:"json",
            success:function(data){
               
                SMMS_EVENT_STAT=eval(data.SMMS_EVENT_STAT_COUNT);
                SMMS_EVENT_TOP10=eval(data.SMMS_EVENT_TOP10_COUNT);
                SMMS_BASE_STAT=eval(data.SMMS_BASE_STAT);
                
                SMMS_EVENT_STAT_CURRENT=eval(data.SMMS_EVENT_STAT_CURRENT);
                SMMS_EVENT_TOP10_CURRENT=eval(data.SMMS_EVENT_TOP10_CURRENT);
                
                
                $.each(SMMS_EVENT_TOP10,function(i,item){
                	eventTop10[eventTop10.length] = new add(item.EVENT_NAME,item.EVENT_COUNT); 
   
               		
                }); 
                
                
                 $.each(SMMS_EVENT_STAT,function(i,item){
                	IDC_NAME.push(item.IDC_NAME);
                	
                	INVADE.push(item.INVADE);
                	
                	HACKER.push(item.HACKER);
                	BLACK_PROFIT.push(item.BLACK_PROFIT);
                	INSIDER_ATTACK.push(item.INSIDER_ATTACK);
                	OVER_WALL.push(item.OVER_WALL);
                	PROXY.push(item.PROXY);
                	VPN.push(item.VPN);
                	
                	//students[students.length].name = item.strNowEngineer; 
                	//students[students.length].age =item.completeNum;  
               		
                });
                 
                 $.each(SMMS_EVENT_TOP10_CURRENT,function(i,item){
                 	eventTop10_current[eventTop10_current.length] = new add(item.EVENT_NAME,item.EVENT_COUNT); 
                 	
                		
                 });   
                 eventTop10=eventTop10.sort(compare);
                 eventTop10_current=eventTop10_current.sort(compare);
                  $.each(SMMS_EVENT_STAT_CURRENT,function(i,item){
                 	IDC_NAME_CURRENT.push(item.IDC_NAME);
                 	
                 	INVADE_CURRENT.push(item.INVADE);
                 	
                 	HACKER_CURRENT.push(item.HACKER);
                 	BLACK_PROFIT_CURRENT.push(item.BLACK_PROFIT);
                 	INSIDER_ATTACK_CURRENT.push(item.INSIDER_ATTACK);
                 	OVER_WALL_CURRENT.push(item.OVER_WALL);
                 	PROXY_CURRENT.push(item.PROXY);
                 	VPN_CURRENT.push(item.VPN);
                 	
                 	//students[students.length].name = item.strNowEngineer; 
                 	//students[students.length].age =item.completeNum;  
                		
                 });
            },
            error:function(data){
                alert("Get Data Failed");
            }
        })
	}

	function dealData() {
		close_count = (SMMS_BASE_STAT.CLOSED_COUNT==''||SMMS_BASE_STAT.CLOSED_COUNT==undefined)?0:SMMS_BASE_STAT.CLOSED_COUNT;
		need_close_count = (SMMS_BASE_STAT.NEED_CLOSE_COUNT==''||SMMS_BASE_STAT.NEED_CLOSE_COUNT==undefined)?0:SMMS_BASE_STAT.NEED_CLOSE_COUNT;

		no_case = (SMMS_BASE_STAT.NO_CASE==''||SMMS_BASE_STAT.NO_CASE==undefined)?0:SMMS_BASE_STAT.NO_CASE;
		idc_count = (SMMS_BASE_STAT.IDC_COUNT==''||SMMS_BASE_STAT.IDC_COUNT==undefined)?0:SMMS_BASE_STAT.IDC_COUNT;
		sta_online = (SMMS_BASE_STAT.STA_ONLINE==''||SMMS_BASE_STAT.STA_ONLINE==undefined)?0:SMMS_BASE_STAT.STA_ONLINE;

		af_online = (SMMS_BASE_STAT.AF_ONLINE==''||SMMS_BASE_STAT.AF_ONLINE==undefined)?0:SMMS_BASE_STAT.AF_ONLINE;
		af_offline = (SMMS_BASE_STAT.AF_OFFLINE==''||SMMS_BASE_STAT.AF_OFFLINE==undefined)?0:SMMS_BASE_STAT.AF_OFFLINE;

		room_count = (SMMS_BASE_STAT.ROOM_COUNT==''||SMMS_BASE_STAT.ROOM_COUNT==undefined)?0:SMMS_BASE_STAT.ROOM_COUNT;

		month_not_deal = (SMMS_BASE_STAT.MONTH_NOT_DEAL==''||SMMS_BASE_STAT.MONTH_NOT_DEAL==undefined)?0:SMMS_BASE_STAT.MONTH_NOT_DEAL;
		month_dealt = (SMMS_BASE_STAT.MONTH_DEALT==''||SMMS_BASE_STAT.MONTH_DEALT==undefined)?0:SMMS_BASE_STAT.MONTH_DEALT;
		month_event = (SMMS_BASE_STAT.MONTH_EVENT==''||SMMS_BASE_STAT.MONTH_EVENT==undefined)?0:SMMS_BASE_STAT.MONTH_EVENT;

		bussy_count = (SMMS_BASE_STAT.BUSSY_COUNT==''||SMMS_BASE_STAT.BUSSY_COUNT==undefined)?0:SMMS_BASE_STAT.BUSSY_COUNT;

		ac_online = (SMMS_BASE_STAT.AC_ONLINE==''||SMMS_BASE_STAT.AC_ONLINE==undefined)?0:SMMS_BASE_STAT.AC_ONLINE;
		ac_offline = (SMMS_BASE_STAT.AC_OFFLINE==''||SMMS_BASE_STAT.AC_OFFLINE==undefined)?0:SMMS_BASE_STAT.AC_OFFLINE;

		sta_offline = (SMMS_BASE_STAT.STA_OFFLINE==''||SMMS_BASE_STAT.STA_OFFLINE==undefined)?0:SMMS_BASE_STAT.STA_OFFLINE;
		sta_online = (SMMS_BASE_STAT.STA_ONLINE==''||SMMS_BASE_STAT.STA_ONLINE==undefined)?0:SMMS_BASE_STAT.STA_ONLINE;

		rectify_count = (SMMS_BASE_STAT.RECTIFY_COUNT==''||SMMS_BASE_STAT.RECTIFY_COUNT==undefined)?0:SMMS_BASE_STAT.RECTIFY_COUNT;
		need_rectify_count = (SMMS_BASE_STAT.NEED_RECTIFY_COUNT==''||SMMS_BASE_STAT.NEED_RECTIFY_COUNT==undefined)?0:SMMS_BASE_STAT.NEED_RECTIFY_COUNT;
		
		
		key_010 = SMMS_BASE_STAT.KEY_010;
		key_020 = SMMS_BASE_STAT.KEY_020;
		key_030 = SMMS_BASE_STAT.KEY_030;
		key_040 = SMMS_BASE_STAT.KEY_040;
		key_050 = SMMS_BASE_STAT.KEY_050;
		key_060 = SMMS_BASE_STAT.KEY_060;
	}
	function getFirstPart() {//第一栏所取数据依次
		return [ idc_count, room_count, bussy_count, ac_online, ac_offline,
				af_online, af_offline, sta_online, sta_offline ];
	}
	function getSecondPart() {//第二栏所取数据依次
		return [ no_case, month_event, month_dealt, month_not_deal ];
	}
	function getThirdPart() {//第三栏所取数据依次
		var access=0;
		if(month_event!=0){
			access = month_dealt / month_event;//综合评价的分数；
		} 
		//var access = month_dealt / month_event;//综合评价的分数；
		var f = parseFloat(access);
		if (isNaN(f)) {
			return;
		}
		access = Math.round(access * 100);
		return [ access, close_count, need_close_count, rectify_count,
				need_rectify_count, key_010, key_020, key_030, key_040,
				key_050, key_060 ];
	}
</script>
</html>