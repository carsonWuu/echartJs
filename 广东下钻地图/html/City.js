function city(name){
    var id=document.getElementById('id1');
	var charts = echarts.init(id);
	$.getJSON('../js/广东/'+name+'.json', function (usaJson) {
          echarts.registerMap('city', usaJson);
          option = {
          	title : {
          		text: 'IDC市区分布',
                //subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
            	formatter:function(params){
            		var content='';
                    content=params.name;//+params.value[0]+params.value[1];
                    return content;
                },
            },
            backgroundColor:'#fff',
            
            series: [
            {
            	name: name,
            	type: 'map3D',
            	map: 'city', /* // 自定义扩展图表类型 */
            	roam: false,

                regionHeight: 2,
                boxWidth:70,
                //boxHeight:50,
                boxDepth:50,
            	label: {
            		show:true,
            		formatter:function(params){
            			var content='',
            			content=params.name;
            			return content;
            		},
            		textStyle:{
            			color:'#EECBAD',
            			fontWeight : 'normal',
            			fontSize : 5,
            			backgroundColor: 'rgba(0,23,11,1)'
            		},


                    emphasis: {//对应的鼠标悬浮效果
                    	show: true,
                    	textStyle:{color:"#f00"}
                    } 
                },
                itemStyle: {

                	normal: {
                        color:'#e0ffff',
                		borderWidth: 0.4
                        }, //阴影效果
                        emphasis: {
                        	color: 'rgb(255,255,255)'
                        }
                    },

                    viewControl: {
                    	autoRotate: false,
                    	distance: 70
                    },

                    data:[
                    {name: '斗门区', value: 0},
                    {name: '金湾区', value: 0},
                    {name: '香洲区', value: 0}

                    ],
                } 
                ]
            };
            charts.clear();
            alert(charts.getOption());
            charts.setOption(option,true);
            id.oncontextmenu = function () { return false; }; 
             charts.on('click', function (params) {console.log('左键')});

            charts.on('contextmenu', function (params) {
                console.log("右键事件");
                console.log(params);
            });
        });
}