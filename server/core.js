//v1.1 2024.7.24 刘嘉磊：将前台echarts数据改为从后端获取，采用Express框架 待更新：跨域访问、身份验证、将后端数据改为从数据库获取（低）
//v1.2 刘嘉磊：已解决跨域访问
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// 启用所有CORS请求
app.use(cors());

// 示例数据，实际应用中应从数据库或其他数据源获取
const column_data = {
    xAxisData: ['养殖', '屠宰', '货物', '批发', '零售', '监管', '执法'],
    seriesData: [{
            name: '总数',
            type: 'bar',
            data: [1600, 1400, 783, 999, 1050, 250, 150],
            emphasis: {
                focus: 'series'
            },
        },
        {
            name: '牛',
            type: 'bar',
            barWidth: 20,
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [620, 700]
        },
        {
            name: '羊',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [620, 400]
        },
        {
            name: '鸡',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [300, 200]
        },
        {
            name: '其他',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [60, 100]
        },
        {
            name: '刑事执法',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, null, null, null, 50]
        },
        {
            name: '行政执法',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, null, null, null, 40]
        },
        {
            name: '民事执法',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, null, null, null, 60]
        },
        {
            name: '运输数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, 183, null, null, null, null]
        },
        {
            name: '仓储数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, 200, 200, 200, null, null]
        },
        {
            name: '订单数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, 190, 199, null, null, null]
        },
        {
            name: '异常数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, 210, null, null, null, null]
        },
        {
            name: '采购数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, 200, 150, null, null]
        },
        {
            name: '销售数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, 200, 250, null, null]
        },
        {
            name: '促销数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, 200, 100, null, null]
        },
        {
            name: '供应商数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, null, 200, null, null]
        },
        {
            name: '退换货数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, null, 150, null, null]
        },
        {
            name: '合规数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, null, null, 150, null]
        },
        {
            name: '审计数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, null, null, 50, null]
        },
        {
            name: '投诉数',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
                focus: 'series'
            },
            data: [null, null, null, null, null, 50, null]
        },
        // 其他系列数据...
    ]
};

app.get('/column_data', (req, res) => {
    // 后期这里连接数据库获取实时数据，然后返回
    res.json(column_data);
});

app.listen(port, () => {
    console.log(`core app listening at http://localhost:${port}`);
});