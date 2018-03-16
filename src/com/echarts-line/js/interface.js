/**
 * Created by lujiaju on 2/5/15.
 */
(function(){
    var myChart = echarts.init(document.getElementById('main'));
    /*
        data根据不同的需要调用
    */

    var getDataFromServer = {
        data1:['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日',
            '周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日'
        ],
        data2:[7.0,7.2,7.3,7.1,7.8,7.6,7.7,7.7,7.4,7.6,7.1,7.8,7.6,7.7,
            7.4,7.2,7.3,7.3,7.5,7.8,7.1,7.0,7.2,7.3,7.1,7.8,7.6,7.7]
    }

    var option = {
        title:{
            text:'HelloEchart',
            subtext:'lujiaju',
            backgroundColor:'yellow',
            textStyle:{
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#383'
            }
        },
        tooltip : {
            trigger: 'axis'
        },

        areaStyle:{
            color:'red'
        },

        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLabel:{
                    interval:2
                },
                data : getDataFromServer.data1,
                axisTick:{
                    show:false
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} '
                },
                min : 6.9,
                max : 7.9
            }
        ],

        series : [
            {
                name:'年收益率',
                type:'line',

                symbol:'none',

                data: getDataFromServer.data2
                /*
                data:function (){
                    var list = [];
                    var i = 1;
                    while (i <= 28) {
                        list.push(Math.random()+7);
                        i++;
                    }
                    return list;
                }()
                 */
            }
        ],
        calculable:true
    };
    myChart.setOption(option);
})();


