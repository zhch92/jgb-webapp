<template>
    <div id="exp">
        <div class="left block">
            <div class="row">
                <span>*我的爱心值：通过机构宝平台交易即可获得爱心值</span>
            </div>
            <div class="row">
                <i class="icon"></i>
                <span>我的爱心值</span>
                <em>{{ point.totalPoint | thousands }}</em>
            </div>
            <div class="row">
                <i class="icon"></i>
                <span>可用爱心值</span>
                <em>{{ point.availPoint | thousands }}</em>
            </div>
            <div class="row">
                <i class="icon"></i>
                <span>
                    在途爱心值
                    <a>({{ point.availDate | formatDate('MM月dd日') }}可用)</a>
                </span>
                <em>{{ point.frozePoint | thousands }}</em>
            </div>
        </div>
        <div class="right block">
            <div :id="id" class="chart"></div>
        </div>
    </div>
</template>

<script>
    import echarts from '../../static/libs/echarts/echarts.min'

    export default {
        props: ['id'],
        data () {
            return {
                myChart: {}
            }
        },
        computed: {
            point () {
                return this.$store.getters.getPoint
            }
        },
        methods: {
            initChart (dom) {
                return new Promise((resolve, reject) => {
                    this.myChart = echarts.init(dom);
                    this.myChart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: '{b}'
                        },
                        series: [
                            {
                                name:'访问来源',
                                type:'pie',
                                radius: ['60%', '80%'],
                                avoidLabelOverlap: false,
                                hoverAnimation: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        show: false,
                                        textStyle: {
                                            fontSize: '16',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                }
                            }
                        ],
                        color: ['#fb565c', '#1b65ce', '#dddddd']
                    });
                    resolve();
                });
            },
            updateChart (dom) {
                if (dom.childElementCount > 0) {
                    this.setData();
                } else {
                    this.initChart(dom).then(() => {
                        this.setData();
                    });
                }
            },
            setData () {
                let [totalPoint, availPoint, frozePoint] = [this.point.totalPoint, this.point.availPoint, this.point.frozePoint];
                if (totalPoint == 0) {
                    this.myChart.setOption({
                        series: [{
                            data: [
                                {value: 0},
                                {value: 0},
                                {value: 1, name:'我的爱心值'}
                            ]
                        }]
                    })
                } else {
                    if (availPoint > frozePoint && frozePoint / availPoint <= 0.01) {
                        frozePoint = frozePoint*100;
                    } else if (availPoint < frozePoint && availPoint / frozePoint <= 0.01) {
                        availPoint = availPoint*100;
                    }
                    this.myChart.setOption({
                        series: [{
                            data: [
                                {value: availPoint, name:'可用爱心值：当前可以使用的爱心值'},
                                {value: frozePoint, name:'在途爱心值：本季度交易获得的<br/>爱心值，状态暂时为“在途”，<br/>下一季度首日即转为可用爱心值'}
                            ]
                        }]
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #exp {
        height: 270px;
        background-color: #fff;
        border: 1px solid #ddd;
        .block {
            display: inline-block;
            vertical-align: top;
            &.left {
                padding: 25px 0 0 40px;
                .row {
                    display: flex;
                    align-items: center;
                    i {
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                    }
                    span {
                        margin: 0 80px 0 20px;
                        font-size: 1.6rem;
                    }
                    em {
                        font-size: 2.8rem;
                    }
                    &:nth-child(1) {
                        margin-bottom: 40px;
                        span {
                            margin: 0;
                        }
                    }
                    &:nth-child(2) {
                        i {
                            background-color: transparent;
                        }
                        em {

                        }
                    }
                    &:nth-child(3) {
                        margin: 20px 0;
                        i {
                            background-color: #fb565c;
                        }
                        em {
                            color: #fb565c;
                        }
                    }
                    &:nth-child(4) {
                        i {
                            background-color: #1b65ce;
                        }
                        span {

                            a {
                                font-size: 1.2rem;
                                color: #666666;
                            }
                        }
                        em {
                            color: #1b65ce;
                        }
                    }
                    &:nth-child(2), &:nth-child(3), &:nth-child(4) {
                        span {
                            display: inline-block;
                            width: 8.4rem;
                            vertical-align: middle;
                        }
                    }
                }
            }
            &.right {
                padding: 60px 0 0 100px;
                .chart {
                    width: 200px;
                    height: 200px;
                }
            }
        }
    }
</style>
