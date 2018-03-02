    function Map(callback){
        var city=[
        {name:'珠海市',value:[123,'idc']},
        {name:'广州市',value:[123,'idc']},
        {name:'湛江市',value:[123,'idc']},
        {name:'茂名市',value:[123,'idc']},
        {name:'阳江市',value:[123,'idc']},
        {name:'云浮市',value:[123,'idc']},
        {name:'肇庆市',value:[123,'idc']},
        {name:'江门市',value:[123,'idc']},
        {name:'中山市',value:[123,'idc']},
        {name:'佛山市',value:[123,'idc']},
        {name:'清远市',value:[100,'idc']},
        {name:'韶关市',value:[123,'idc']},
        {name:'河源市',value:[0,'idc']},
        {name:'梅州市',value:[123,'idc']},
        {name:'潮州市',value:[255,'idc']},
        {name:'揭阳市',value:[123,'idc']},
        {name:'汕头市',value:[123,'idc']},
        {name:'汕尾市',value:[123,'idc']},
        {name:'深圳市',value:[123,'idc']},
        {name:'东莞市',value:[123,'idc']},
        {name:'惠州市',value:[123,'idc']}
        ]
        var min=100;
        var max=150;
        var chart = echarts.init(document.getElementById('id1'));
        var option = {
            tooltip:{
                formatter:function(params){
                    var content='',
                    content=params.name+params.value[0]+params.value[1];
                    return content;
                },
            },
            backgroundColor:'#fff',
            visualMap: {
                show: false,
                min: min,
                max: max,
                inRange: {
                    color: ['#e0ffff', '#006edd']
                },
                calculable:true

            },
            series: {
                name:'广东',
                type: 'map3D',
                map: '广东',
                data:city,


                regionHeight: 2,
                boxWidth:70,
                //boxHeight:50,
                boxDepth:50,
                top:'-10%',
               //left:'10%',


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
                        backgroundColor: 'rgba(0,23,11,0)'
                    },


                    emphasis: {//对应的鼠标悬浮效果
                        show: true,
                        textStyle:{color:"#f00"}
                    } 
                },
                itemStyle: {

                        normal: {

                            borderWidth: 0.4
                        }, //阴影效果
                        emphasis: {
                            color: 'rgb(255,255,255)'
                        }
                },

                viewControl: {
                        autoRotate: false,
                        distance: 70
                }


                }
            }
            chart.setOption(option);
            chart.on('click', function (params) {
                var cout=params.data.name;
                console.log(cout);
                
                if(cout!=''){
                   // window.open('http://smms.idc.com/SMMS/fmp/base/ShowLogin');
                   
                   
                   callback(cout);
               }
            });

            chart.on('contextmenu', function(params) {
        console.log('right');
                console.log(params);
            });

        }
        