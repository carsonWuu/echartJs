var rawData = [
        {name: '时代互联',value:130},
        {name: '朗达互动',value: 50}
        
        ];
        
        function Map(id,cityData,cityName){     
            var name=cityData.map(name=>name.name);


            var chart =  echarts.init(document.getElementById(id));
            $.getJSON('广东/'+cityName+'.json', function (usaJson) {
             echarts.registerMap('city', usaJson);
            var geoCoordMap = {
            '时代互联':[114.085947,22.547],
            '朗达互动':[114.005947,22.547],
            '飞远网络':[113.353986,21.924979],
            '科飞科技':[113.353986,21.924979],
            '明飞互联':[113.353986,21.924979],
            '万网网络':[113.353986,21.924979],
            '大朗科技':[113.353986,21.924979],
            '腾度科技':[112.353986,22.924979]
            
           
          
        };

        var option = {
            legend: [],
            xAxis: [{
                type: "value",
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },],
            yAxis: [{
                type: "category",
                
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                axisLabel: {
                    textStyle:{
                       show:false
                    }
                },
                data:name,
            },],
            grid: [{
                left: "70%",
                right: "20",
                bottom: "10",
                top:'60%',
                containLabel: true
            },],
            title:[{
                text:cityName+'IDC安全态势',
                x:0,
                textStyle:{
                    color:'rgb(0,147,203)',
                    fontSize:14
                }
            },{
                text: "综合安全事件影响排名Top10",
                textStyle: {
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: 14
                },
                top: "55%",
                left: "69%"
            }],
            tooltip:[{
                // formatter:function(params){
                //     console.log(params)
                //     var content='',
                //     content=params.name+params.value[0]+params.value[1]+params.value[2];
                //     return content;
                // },
                show:true,
            }],
            backgroundColor:'#fff',
            // visualMap: {
            //     show: false,
            //     min: 0,
            //     max: 3000,
            //     inRange: {
            //         color: ['#00ffff', '#006edd'],
            //          color: ['#00467F', '#A5CC82']
            //     },
            //     calculable:true

            // },

            geo:{
                left:'10',
                show:true,
                map:'city',
                type:'map',
                zlevel:0,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true,
                        fontSize:20,
                        color:'rgb(255,255,255)',
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        color: 'rgb(0,90,157)',
                        borderColor: 'rgb(0,90,157)',
                        borderWidth: 1,
                    },
                    emphasis: {
                        areaColor: '#2B91B7',
                        
                            
                        
                    }
                }
            },
            series: [{
                name: "安全事件数量",
                type: "bar",
                data: cityData,
                barWidth:7,
                barCategoryGap: "50%",
                 zlevel:2,
                label: {
                    normal: {
                        left:'right',
                        show: true,
                        position: "right",
                        formatter: function(params) {
                            console.log(params);
                            return params.data.value;
                        },
                        textStyle: {
                    color: "#000" //color of value
                        }
                    }
                },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "rgb(231,91,250)" // 0% 处的颜色
                }, {
                    offset: 1,
                    color: "rgb(80,50,180)" // 100% 处的颜色
                }], false),
                barBorderRadius: [30, 30,30, 30],
            }
        }
    },]

        };//option
        chart.setOption(option);
        
        function renderEachCity() {  
            var width=$('#'+id).width();
            var height=$('#'+id).height();
            // option.xAxis.push();
            // option.yAxis.push();
            // option.grid.push();
            // option.series.push();
            echarts.util.each(rawData, function(dataItem, idx) {

                var geoCoord = geoCoordMap[dataItem.name];
                console.log(dataItem.name);
                var coord = chart.convertToPixel('geo', geoCoord);
                console.log(geoCoord+":"+coord);
                idx += '';

                console.log(dataItem.name)
                option.xAxis.push({
                    id: idx,
                    gridId: idx,
                    type: 'category',
                    //show: true,
                    data:[dataItem.name],
                    boundaryGap:true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        
                        
                        show: false,
                        
                    },
                    axisLabel: {
                        interval:0,
                        fontSize:10,
                        
                        color: "#fff",
                        
                        
                        
                    }
                });
                option.yAxis.push({
                    id: idx,
                    gridId: idx,
                    show: false
                });
                option.grid.push({
                    id: idx,
                    width: 10,
                    height: (dataItem.value),
                    left: coord[0],
                    bottom:height-coord[1]+10,
                });


                option.series.push({
                    name:dataItem.name,
                    type: 'bar',
                    xAxisId: idx,
                    yAxisId: idx,
                     zlevel:1,
                    road:true,
                    itemStyle: {
                        normal: {
                            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(231,91,250,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(80,50,180,0.8)'
                            }], false),
                            borderColor:'rgba(255,255,255,0.8)',
                            barBorderRadius: [30, 30,30, 30],
                        },
                        emphasis:{
                            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 1,
                                color: 'rgb(231,91,250)'
                            }, {
                                offset: 0,
                                color: 'rgb(80,50,180)'
                            }], false)
                        }
                    },
                    data: [dataItem.value]
                });


            });
            chart.setOption(option);
        }

        renderEachCity();

        
        chart.on('click',function(params){console.log(params);})
    });
    }
    Map('id1',rawData,'深圳市');