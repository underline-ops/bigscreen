//v1.1 2024.7.24 刘嘉磊：将前台echarts数据改为从后端获取，采用Express框架 待更新：跨域访问、身份验证、将后端数据改为从数据库获取（低）



//图表一:柱形表
(function() {
    //实例化对象
    var myChart = echarts.init(document.querySelector(".mainbox .panel"));

    // 定义获取数据的函数
    function fetchData() {
        return fetch('http://localhost:3000/column_data')
            .then(response => response.json())
            .then(data => {
                return {
                    xAxisData: data.xAxisData, // 后端返回的数据中有x轴的数据
                    seriesData: data.seriesData // 后端返回的数据中有系列的数据
                };
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // 使用获取到的数据设置图表
    function setChartData() {
        fetchData().then(data => {
            var option1 = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function(params) {
                        let tooltipContent = '';
                        params.forEach(function(item) {
                            if (item.value !== null && item.value !== undefined) {
                                tooltipContent += item.marker + item.seriesName + ': ' + item.value + '<br/>';
                            }
                        });
                        return tooltipContent;
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: data.xAxisData // 使用从后端获取的x轴数据
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: data.seriesData // 使用从后端获取的系列数据
            };
            //把配置项给实例对象
            myChart.setOption(option1);
        });
    }

    // 调用函数，设置图表数据
    setChartData();
})();



//图表二:地图表
(function() {
    var myChart = echarts.init(document.querySelector(".mainbox .panel2"));
    var name_title = "智慧农业全国企业数分布情况"
    var subname = '各省详细企业数'
    var nameColor = " rgb(55, 75, 113)"
    var name_fontFamily = '等线'
    var subname_fontSize = 15
    var name_fontSize = 18
    var mapName = 'china'
    var data = [
        { name: "北京", value: 177 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 66 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 67 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
    ];

    var geoCoordMap = {};
    var toolTipData = [
        { name: "北京", value: [{ name: "全市企业数", value: 95 }, { name: "区县企业数", value: 82 }] },
        { name: "天津", value: [{ name: "全市企业数", value: 22 }, { name: "区县企业数", value: 20 }] },
        { name: "河北", value: [{ name: "全市企业数", value: 60 }, { name: "区县企业数", value: 42 }] },
        { name: "山西", value: [{ name: "全市企业数", value: 40 }, { name: "区县企业数", value: 41 }] },
        { name: "内蒙古", value: [{ name: "全市企业数", value: 23 }, { name: "区县企业数", value: 24 }] },
        { name: "辽宁", value: [{ name: "全市企业数", value: 39 }, { name: "区县企业数", value: 28 }] },
        { name: "吉林", value: [{ name: "全市企业数", value: 41 }, { name: "区县企业数", value: 41 }] },
        { name: "黑龙江", value: [{ name: "全市企业数", value: 35 }, { name: "区县企业数", value: 31 }] },
        { name: "上海", value: [{ name: "全市企业数", value: 12 }, { name: "区县企业数", value: 12 }] },
        { name: "江苏", value: [{ name: "全市企业数", value: 47 }, { name: "区县企业数", value: 45 }] },
        { name: "浙江", value: [{ name: "全市企业数", value: 57 }, { name: "区县企业数", value: 57 }] },
        { name: "安徽", value: [{ name: "全市企业数", value: 57 }, { name: "区县企业数", value: 52 }] },
        { name: "福建", value: [{ name: "全市企业数", value: 59 }, { name: "区县企业数", value: 57 }] },
        { name: "江西", value: [{ name: "全市企业数", value: 49 }, { name: "区县企业数", value: 42 }] },
        { name: "山东", value: [{ name: "全市企业数", value: 67 }, { name: "区县企业数", value: 52 }] },
        { name: "河南", value: [{ name: "全市企业数", value: 69 }, { name: "区县企业数", value: 68 }] },
        { name: "湖北", value: [{ name: "全市企业数", value: 60 }, { name: "区县企业数", value: 56 }] },
        { name: "湖南", value: [{ name: "全市企业数", value: 62 }, { name: "区县企业数", value: 52 }] },
        { name: "重庆", value: [{ name: "全市企业数", value: 47 }, { name: "区县企业数", value: 44 }] },
        { name: "四川", value: [{ name: "全市企业数", value: 65 }, { name: "区县企业数", value: 60 }] },
        { name: "贵州", value: [{ name: "全市企业数", value: 32 }, { name: "区县企业数", value: 30 }] },
        { name: "云南", value: [{ name: "全市企业数", value: 42 }, { name: "区县企业数", value: 41 }] },
        { name: "西藏", value: [{ name: "全市企业数", value: 5 }, { name: "区县企业数", value: 4 }] },
        { name: "陕西", value: [{ name: "全市企业数", value: 38 }, { name: "区县企业数", value: 42 }] },
        { name: "甘肃", value: [{ name: "全市企业数", value: 28 }, { name: "区县企业数", value: 28 }] },
        { name: "青海", value: [{ name: "全市企业数", value: 5 }, { name: "区县企业数", value: 5 }] },
        { name: "宁夏", value: [{ name: "全市企业数", value: 10 }, { name: "区县企业数", value: 8 }] },
        { name: "新疆", value: [{ name: "全市企业数", value: 36 }, { name: "区县企业数", value: 31 }] },
        { name: "广东", value: [{ name: "全市企业数", value: 63 }, { name: "区县企业数", value: 60 }] },
        { name: "广西", value: [{ name: "全市企业数", value: 29 }, { name: "区县企业数", value: 30 }] },
        { name: "海南", value: [{ name: "全市企业数", value: 8 }, { name: "区县企业数", value: 6 }] },
    ];

    /*获取地图数据*/
    myChart.showLoading();
    var mapFeatures = echarts.getMap(mapName).geoJson.features;
    myChart.hideLoading();
    mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;

    });

    // console.log("============geoCoordMap===================")
    // console.log(geoCoordMap)
    // console.log("================data======================")
    console.log(data)
    console.log(toolTipData)
    var max = 480,
        min = 9; // todo 
    var maxSize4Pin = 100,
        minSize4Pin = 20;

    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };
    option2 = {
        title: {
            text: name_title,
            subtext: subname,
            x: 'center',
            textStyle: {
                color: nameColor,
                fontFamily: name_fontFamily,
                fontSize: name_fontSize
            },
            subtextStyle: {
                fontSize: subname_fontSize,
                fontFamily: name_fontFamily
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (typeof(params.value)[2] == "undefined") {
                    var toolTiphtml = ''
                    for (var i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + ':<br>'
                            for (var j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    console.log(toolTiphtml)
                        // console.log(convertData(data))
                    return toolTiphtml;
                } else {
                    var toolTiphtml = ''
                    for (var i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + ':<br>'
                            for (var j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    console.log(toolTiphtml)
                        // console.log(convertData(data))
                    return toolTiphtml;
                }
            }
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x: 'right',
        //     data: ['credit_pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        visualMap: {
            show: true,
            min: 0,
            max: 200,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
                // color: ['#3B5077', '#031525'] // 蓝黑
                // color: ['#ffc0cb', '#800080'] // 红紫
                // color: ['#3C3B3F', '#605C3C'] // 黑绿
                // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                // color: ['#23074d', '#cc5333'] // 紫红
                color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#1488CC', '#2B32B2'] // 浅蓝
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿
                    // color: ['#00467F', '#A5CC82'] // 蓝绿

            }
        },
        /*工具按钮组*/
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         dataView: {
        //             readOnly: false
        //         },
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
        geo: {
            show: true,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            }
        },
        series: [{
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function(val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#05C3F9'
                    }
                }
            },
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin', //气泡
                symbolSize: function(val) {
                    var a = (maxSize4Pin - minSize4Pin) / (max - min);
                    var b = minSize4Pin - a * min;
                    b = maxSize4Pin - a * max;
                    return a * val[2] + b;
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 9,
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F62157', //标志颜色
                    }
                },
                zlevel: 6,
                data: convertData(data),
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function(a, b) {
                    return b.value - a.value;
                }).slice(0, 5)),
                symbolSize: function(val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'yellow',
                        shadowBlur: 10,
                        shadowColor: 'yellow'
                    }
                },
                zlevel: 1
            },

        ]
    };
    myChart.setOption(option2);
})();




//图表三:下钻饼图
(function() {
    var myChart = echarts.init(document.querySelector(".mainbox .panel3"));
    $('<div class="back">返回</div>').appendTo(
        $('.panel3')
    );
    $('.back').css({
            'position': 'absolute',
            'left': '17px',
            'top': '25px',
            'color': 'black',
            'font-size': '15px',
            'cursor': 'pointer',
            'z-index': '100'
        })
        // 返回上一级按钮点击事件
    $('.back').click(function() {
        if (parentInfo.length === 1) {
            return;
        }
        parentInfo.pop();
        getRealData(parentInfo[parentInfo.length - 1].code);
    });

    var parentJson = null;
    var parentInfo = [{ code: 1 }];

    function echartsMapClick(params) {
        let data = params.data;
        if (parentInfo.length > 1) {
            // 如果已经在第二级，点击时不再响应
            return;
        }

        // 判断是否点击的是不同区域，然后根据点击区域决定加载的数据
        if (data.name === '养殖') {
            parentInfo.push({ code: 2 });
            getRealData(2);
        } else if (data.name === '屠宰') {
            parentInfo.push({ code: 3 });
            getRealData(3);
        } else if (data.name === '物流') {
            parentInfo.push({ code: 4 });
            getRealData(4);
        } else if (data.name === '批发') {
            parentInfo.push({ code: 5 });
            getRealData(5);
        } else if (data.name === '零售') {
            parentInfo.push({ code: 6 });
            getRealData(6);
        } else if (data.name === '监管') {
            parentInfo.push({ code: 7 });
            getRealData(7);
        } else if (data.name === '执法') {
            parentInfo.push({ code: 8 });
            getRealData(8);
        } else if (data.name === '投诉') {
            parentInfo.push({ code: 9 });
            getRealData(9);
        }
    }


    function getRealData(code) {
        let mockData = [];
        let chartTitle = ''; // 新增一个变量，用于存储不同的图表标题

        if (code === 1) {
            mockData = [
                { value: 1048, name: '养殖', code: 2 },
                { value: 735, name: '屠宰', code: 3 },
                { value: 580, name: '物流', code: 4 },
                { value: 484, name: '批发', code: 5 },
                { value: 300, name: '零售', code: 6 },
                { value: 200, name: '监管', code: 7 },
                { value: 150, name: '执法', code: 8 },
                { value: 100, name: '投诉', code: 9 }
            ];
            chartTitle = '第一级图表'; // 设置标题
        }
        if (code === 2) {
            mockData = [
                { value: 1, name: '耗牛', id: '123' },
                { value: 2, name: '奶牛', id: '456' },
                { value: 3, name: '羊', id: '789' }
            ];
            chartTitle = '养殖'; // 设置标题
        }
        if (code === 3) {
            mockData = [
                { value: 4, name: '耗牛', id: '123' },
                { value: 5, name: '羊', id: '123' },
                { value: 6, name: '鸡', id: '123' }
            ];
            chartTitle = '屠宰'; // 设置标题
        }
        if (code === 4) {
            mockData = [
                { value: 7, name: '顺丰', id: '123' },
                { value: 8, name: '极兔', id: '123' },
                { value: 9, name: '邮政', id: '123' }
            ];
            chartTitle = '物流'; // 设置标题
        }
        if (code === 5) {
            mockData = [
                { value: 9, name: '省外', id: '123' },
                { value: 10, name: '省内', id: '123' },
                { value: 11, name: '国外', id: '123' }
            ];
            chartTitle = '批发'; // 设置标题
        }
        if (code === 6) {
            mockData = [
                { value: 12, name: '直售', id: '123' },
                { value: 13, name: '网售', id: '123' },
                { value: 14, name: '代售', id: '123' }
            ];
            chartTitle = '零售'; // 设置标题
        }
        if (code === 7) {
            mockData = [
                { value: 15, name: '主管', id: '123' },
                { value: 16, name: '饲养员', id: '123' },
                { value: 17, name: '卫生检查员', id: '123' }
            ];
            chartTitle = '监管'; // 设置标题
        }
        if (code === 8) {
            mockData = [
                { value: 50, name: '执法官', id: '123' },
                { value: 50, name: '执法人', id: '123' },
                { value: 50, name: '法人', id: '123' }
            ];
            chartTitle = '执法'; // 设置标题
        }
        if (code === 9) {
            mockData = [
                { value: 21, name: '投诉人', id: '123' },
                { value: 22, name: '投诉环境', id: '123' },
                { value: 23, name: '投诉品质', id: '123' }
            ];
            chartTitle = '投诉'; // 设置标题
        }

        initEcharts(mockData, chartTitle); // 传递标题
    }


    function initEcharts(newData, chartTitle) {
        myChart.setOption({
            title: {
                text: chartTitle, // 使用传入的标题
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    let info = `${params.seriesName} <br/>${params.name}: ${params.value} (${params.percent}%)`;
                    if (params.data && params.data.id) {
                        info += `<br/>ID: ${params.data.id}`;
                    }
                    return info;
                }
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [{
                name: '访问来源:XXX',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: newData
            }]
        }, true);
        // 点击前解绑，防止点击事件触发多次
        myChart.off('click');
        myChart.on('click', echartsMapClick);

    }

    // 第一次渲染数据
    getRealData(parentInfo[0].code);


    //myChart.setOption(option);
})();
//检测前端是否能与后端通信
document.addEventListener('DOMContentLoaded', function() {
    // 模拟与后端的通信
    fetch('http://localhost:3000/check').then(response => {
        if (response.ok) {
            // 通信成功，隐藏加载页面
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    }).catch(error => {
        console.error('通信失败:', error);
    });
});