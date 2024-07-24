(function() {
    var myChart = echarts.init(document.querySelector(".mainbox .panel2"));
    $('<div class="back">返回</div>').appendTo(
        $('.panel2')
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
    let chartTitle = '';  // 新增一个变量，用于存储不同的图表标题

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
        chartTitle = '第一级图表';  // 设置标题
    }
    if (code === 2) {
        mockData = [
            { value: 1, name: '耗牛' ,id:'123'},
            { value: 2, name: '奶牛',id:'456' },
            { value: 3, name: '羊',id:'789' }
        ];
        chartTitle = '养殖';  // 设置标题
    }
    if (code === 3) {
        mockData = [
            { value: 4, name: '耗牛'  ,id:'123'},
            { value: 5, name: '羊'  ,id:'123'},
            { value: 6, name: '鸡'  ,id:'123'}
        ];
        chartTitle = '屠宰';  // 设置标题
    }
    if (code === 4) {
        mockData = [
            { value: 7, name: '顺丰'  ,id:'123'},
            { value: 8, name: '极兔'  ,id:'123'},
            { value: 9, name: '邮政'  ,id:'123'}
        ];
        chartTitle = '物流';  // 设置标题
    }
    if (code === 5) {
        mockData = [
            { value: 9, name: '省外'  ,id:'123'},
            { value: 10, name: '省内'  ,id:'123'},
            { value: 11, name: '国外'  ,id:'123'}
        ];
        chartTitle = '批发';  // 设置标题
    }
    if (code === 6) {
        mockData = [
            { value: 12, name: '直售'  ,id:'123'},
            { value: 13, name: '网售'  ,id:'123'},
            { value: 14, name: '代售'  ,id:'123'}
        ];
        chartTitle = '零售';  // 设置标题
    }
    if (code === 7) {
        mockData = [
            { value: 15, name: '主管'  ,id:'123'},
            { value: 16, name: '饲养员'  ,id:'123'},
            { value: 17, name: '卫生检查员'  ,id:'123'}
        ];
        chartTitle = '监管';  // 设置标题
    }
    if (code === 8) {
        mockData = [
            { value: 50, name: '执法官'  ,id:'123'},
            { value: 50, name: '执法人'  ,id:'123'},
            { value: 50, name: '法人'  ,id:'123'}
        ];
        chartTitle = '执法';  // 设置标题
    }
    if (code === 9) {
        mockData = [
            { value: 21, name: '投诉人'  ,id:'123'},
            { value: 22, name: '投诉环境'  ,id:'123'},
            { value: 23, name: '投诉品质'  ,id:'123'}
        ];
        chartTitle = '投诉';  // 设置标题
    }

    initEcharts(mockData, chartTitle);  // 传递标题
}


function initEcharts(newData, chartTitle) {
    myChart.setOption({
        title: {
            text: chartTitle,  // 使用传入的标题
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
        series: [
            {
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
            }
        ]
    }, true);
    // 点击前解绑，防止点击事件触发多次
    myChart.off('click');
    myChart.on('click', echartsMapClick);
    
}

// 第一次渲染数据
getRealData(parentInfo[0].code);


            myChart.setOption(option);
  })();
  