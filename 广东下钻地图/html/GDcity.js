function city(a){
	var charts = echarts.init(document.getElementById('id1'));
	$.getJSON('./js/geometryCouties/440400.json', function (usaJson) {
          echarts.registerMap('guangdong', usaJson);//hennanJson名称取自henan.js里的var  henanJson变量名
          option = {
            title : {
                text: 'IDC市区分布',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                x:'left',
                data:['iphone3','iphone4','iphone5']
            },
            
            
            roamController: {
                show: true,
                x: 'right',
                mapTypeControl: {
                    'yueyang': true
                }
            },
            series: [
                     {
                         name: a,
                         type: 'map',
                         mapType: 'guangdong', /* // 自定义扩展图表类型 */
                         roam: false,
                         label:{
                             normal: {
                              show: true,
                          },
                             emphasis: {
                                 show: true,
                             }
                         },
                         itemStyle: {
                             normal: {
                                 borderWidth: 0.2,/* //区域边框宽度 */
                              borderColor: '#009fe8',/* //区域边框颜色 */
                              areaColor:"#ffefd5"
                             },
                             emphasis: {
                                 areaColor: '#FFFFFF',
                             }
                         },
                         showLegendSymbol:true,
                         data:[
                              {name: '斗门区', value: 430600},
                              {name: '金湾区', value: 430602},
                              {name: '香洲区', value: 430603}
                              
                          ],
                     } 
                 ]
        };
          charts.setOption(option);
    });
}