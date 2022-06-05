const mydata = [
    {
        "stu_id": "5",
        "value": "2"
    },
    {
        "stu_id": "5",
        "value": "2"
    },
    {
        "stu_id": "5",
        "value": "1"
    },
    {
        "stu_id": "5",
        "value": "1"
    },
    {
        "stu_id": "5",
        "value": "1"
    },
    {
        "stu_id": "5",
        "value": "1"
    },
    {
        "stu_id": "5",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "1"
    },
    {
        "stu_id": "8",
        "value": "2"
    },
    {
        "stu_id": "12",
        "value": "2"
    },
    {
        "stu_id": "12",
        "value": "2"
    },
    {
        "stu_id": "12",
        "value": "2"
    },
    {
        "stu_id": "12",
        "value": "1"
    },
    {
        "stu_id": "12",
        "value": "2"
    },
    {
        "stu_id": "12",
        "value": "1"
    },
    {
        "stu_id": "12",
        "value": "1"
    },
    {
        "stu_id": "12",
        "value": "2"
    },
    {
        "stu_id": "12",
        "value": "2"
    },
]
var myChart = echarts.init(document.getElementById('bing2'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: 'ECharts 入门示例'
    },
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        axisTick: {
            alignWithLabel: true //坐标值是否在刻度中间
        }

    },
    yAxis: { triggerEvent: true },
    series: {
        name: '销量',
        type: 'scatter',
        //data: [n1, n2, n3, n4, n5, n6],
        // data : seriesdata,
        data: mydata,
        itemStyle: {
            normal: {
                color: function (params) {
                    var colorList = ['#2eddc1', '#FCCE10', '#E87C25', '#277bbb', '#E87fff', '#277aaa'];
                    //若返回的list长度不足，不足部分自动显示为最后一个颜色
                    return colorList[params.dataIndex]
                },
                label: {
                    show: true,
                    position: 'top'
                }
            }
        }
    }
};

//map

// index.js
const XHR = new XMLHttpRequest();
XHR.open("get", "./date/china.json", true);
XHR.onload = function () {
    const jsonData = XHR.response;
    echarts.registerMap("china", jsonData);
    var mapChart = echarts.init(document.getElementById('container'));
    var option = {
        geo: {
            id: "china",
            map: "china",
            show: true,
            itemStyle: {
                normal: {
                    areaColor: '#f5e8c8'
                },
            },
            emphasis: {
                itemStyle: {
                    areaColor: "#ebdba4",
                    borderColor: "#f00"
                }
            }
        },
        series: [
            {
                type: "scatter",
                name: "---",
                coordinateSystem: "geo",
                data:
                    [
                        {
                            "basin": "长江",
                            "code": "5",
                            "custodian": "重庆市环境监测中心",
                            "name": "重庆朱沱",
                            "section": "长江干流（川-渝省界）",
                            "setupdate": "2000年7月",
                            "value": [105.8489722, 29.01563889]
                        },
                        {
                            "basin": "太湖",
                            "code": "8",
                            "custodian": "湖州市环境保护监测中心站",
                            "name": "浙江湖州新塘港",
                            "section": "新塘港（浙-苏省界）",
                            "setupdate": "1999年11月",
                            "value": [120.8388889, 30.83888889]
                        },
                        {
                            "basin": "黄河",
                            "code": "12",
                            "custodian": "济源市环境监测站",
                            "name": "河南济源小浪底",
                            "section": "黄河干流（水库出口）",
                            "setupdate": "2000年12月",
                            "value": [112.4006389, 34.91730556]
                        },
                        {
                            "basin": "松花江",
                            "code": "14",
                            "custodian": "黑龙江肇源环境监测站",
                            "name": "黑龙江肇源",
                            "section": "松花江干流",
                            "setupdate": "2000年12月",
                            "value": [124.9888889, 45.47222222]
                        },
                    ]
            }
        ],
        tooltip: {
            trigger: "item",
            formatter: function (params) {
                console.log(params)
                let text = params.name + "<br>坐标：" + params.value + "<br>托管所：" + params.data.custodian + "<br>编号：" + params.data.code + "<br>所属流域：" + params.data.basin + "<br>断面属性：" + params.data.section + "<br>建立时间：" + params.data.setupdate
                return text
            },
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderColor: 'gray',
            borderWidth: '1',
            textStyle: {
                color: '#aaaaaa'
            }
        }
    }
    mapChart.setOption(option);
    mapChart.on('click', function (params) {
        console.log("PARAMS", params);
        updatePage(params);

        if (params.componentType == "series") {
            refresh();
        }
    });
}
XHR.send();
function updatePage(params) {
    //点击内容区域
    if (params.componentType == "series") {
        tag = option.xAxis.data[params.dataIndex];
        value = params.value;
        var xAxisTag = $("#xAxisTag");
        xAxisTag.html(tag);
        var barValue = $("#barValue");
        barValue.html(value);
    }
};

function getSeriesData() {
    var n1 = Math.floor(Math.random() * 50 + 1);
    var n2 = Math.floor(Math.random() * 50 + 1);
    var n3 = Math.floor(Math.random() * 50 + 1);
    var n4 = Math.floor(Math.random() * 50 + 1);
    var n5 = Math.floor(Math.random() * 50 + 1);
    var n6 = Math.floor(Math.random() * 50 + 1);
    seriesdata = [n1, n2, n3, n4, n5, n6];

    return seriesdata;
}

function refresh() {

    //局部刷新series内容
    //此处没有用常用的刷新div等方法，而是直接改变了option的值，然后重新赋值给myChart

    //简化方法，调用getSeriesData更新数据。
    option.series.data = getSeriesData();
    myChart.setOption(option);
};