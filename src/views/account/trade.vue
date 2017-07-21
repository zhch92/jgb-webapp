<template>
    <div id="trade">
        <div class="top">
            <div class="row">
                <div class="left">
                    <div class="active" data-type="0">
                        <span @click="clickTab($event)">交易</span>
                    </div>
                    <div data-type="1">
                        <span @click="clickTab($event)">收益</span>
                    </div>
                </div>
                <div class="middle" v-if="tradePage">
                    <div class="active" data-type="0" @click="clickFilter($event)">
                        <i class="fa fa-check-circle"></i>
                        <span>申购</span>
                    </div>
                    <div class="active" data-type="1" @click="clickFilter($event)">
                        <i class="fa fa-check-circle"></i>
                        <span>赎回</span>
                    </div>
                </div>
                <div class="right">
                    <input id="startDate" type="datetime">
                    <span>-</span>
                    <input id="endDate" type="datetime">
                    <button @click="search">搜索</button>
                </div>
            </div>
        </div>
        <div class="trade area" v-if="tradePage">
            <div class="list">
                <div class="title">
                    <p>交易日期</p>
                    <p>交易类型</p>
                    <p>产品名称</p>
                    <p>交易金额</p>
                    <p>交易份额</p>
                    <p>备注</p>
                </div>
                <div class="content">
                    <template v-for="item in tradeList.resultList">
                        <div class="item">
                            <p>{{ item.txnTime | formatDate('yyyy.MM.dd') }}</p>
                            <p>{{ item.txnType | tradeType }}</p>
                            <p>
                                <a>{{ item.prodName | formatProdName('0') }}</a>
                                <a>{{ item.prodName | formatProdName('1') }}</a>
                            </p>
                            <p> {{ item.txnType==0 ? item.txnAmount :'' | formatMoney }}元</p>
                            <p> {{ item.txnType==1 ? item.txnAmount :'' | formatMoney }}份</p>
                            <p>{{ item.remark }}</p>
                        </div>
                    </template>
                </div>
            </div>
            <div class="nav">
                <c-page-nav :pageNo="tradePageNav.cur" :totalPage="tradePageNav.all" :displayNum="tradePageNav.group" :alignStyle="tradePageNav.align"></c-page-nav>
            </div>
        </div>
        <div class="income area" v-else>
            <div class="list">
                <div class="title">
                    <p>日期</p>
                    <p>收益</p>
                    <p>明细</p>
                </div>
                <div class="content">
                    <template v-for="item in incomeList.resultList">
                        <div class="item">
                            <p>{{ item.time | formatDate('yyyy.MM.dd') }}</p>
                            <p>{{ item.income | formatMoney }}</p>
                            <p>{{ item.memo }}</p>
                        </div>
                    </template>
                </div>
                <div class="nav">
                    <c-page-nav :pageNo="incomePageNav.cur" :totalPage="incomePageNav.all" :displayNum="incomePageNav.group" :alignStyle="incomePageNav.align"></c-page-nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as cPageNav from '../../components/Pagination'
    import { eventHub, dateFormat } from '../../plugins/utils'
    import config from '../../config'
    import Flatpickr from '../../../static/libs/flatpickr/flatpickr.min'

    export default {
        components: {
            cPageNav
        },
        data () {
            return {
                tradePage: true,
                firstTime: 0,
                lastTime: 0,
                txnType: '',
                tradePageNav: {
                    all: 0,
                    cur: 1,
                    group: 5,
                    align: 'center'
                },
                incomePageNav: {
                    all: 0,
                    cur: 1,
                    group: 5,
                    align: 'center'
                }
            }
        },
        computed: {
            tradeList () {
                return this.$store.getters.getTradeList
            },
            incomeList () {
                return this.$store.getters.getIncomeList
            },
            startDate () {
                return dateFormat(this.firstTime, 'yyyy-MM-dd')
            },
            endDate () {
                return dateFormat(this.lastTime, 'yyyy-MM-dd')
            }
        },
        activated () {
            (this.tradePage) ? this.getTradeList(this.tradePageNav.cur) : this.getIncomeList(this.incomePageNav.cur);
            eventHub.$on('loadList', this.loadList);
        },
        deactivated () {
            eventHub.$off('loadList');
        },
        mounted () {
            // 定义指针
            let _self = this;
            let $startDate = document.getElementById('startDate');
            let $endDate = document.getElementById('endDate');
            // 加载中文
            Flatpickr.localize(require('../../../static/libs/flatpickr/flatpickr.l10n.zh.js'));
            // 开始时间
            new Flatpickr($startDate, {
                dateFormat: 'Y.m.d',
                defaultDate: new Date().fp_incr(-30*6),
                maxDate: 'today',
                onChange: function (dateObj) {
                    _self.firstTime = new Date(dateObj).getTime();
                }
            });
            // 结束时间
            new Flatpickr($endDate, {
                dateFormat: 'Y.m.d',
                defaultDate: 'today',
                maxDate: 'today',
                onChange: function (dateObj) {
                    _self.lastTime = new Date(dateObj).getTime();
                }
            });
            this.firstTime = new Date($startDate.value).getTime();
            this.lastTime = new Date($endDate.value).getTime();
        },
        methods: {
            clickTab (e) {
                let $dom = $(e.target).parent();
                let type = $dom.data('type');
                if (!$dom.hasClass('active')) {
                    this.txnType = '';
                    if (type == 0) {
                        this.tradePage = true;
                        this.getTradeList(1);
                    } else {
                        this.tradePage = false;
                        this.getIncomeList(1);
                    }
                    $dom.addClass('active').siblings().removeClass('active');
                }
            },
            search () {
                (this.tradePage) ? this.getTradeList(1) : this.getIncomeList(1);
            },
            clickFilter (e) {
                let [$dom, tagName] = ['', e.target.tagName.toLowerCase()];
                (tagName == 'div') ? $dom = $(e.target) : $dom = $(e.target).parent();
                let $filter = $dom.parent();
                if (!$dom.hasClass('active')) {
                    $dom.addClass('active').css('border-color', '#008fe6');
                } else {
                    $dom.removeClass('active').css('border-color', '#ddd');
                }
                switch ($filter.find('.active').length) {
                    case 1:
                        this.txnType = $filter.find('.active').data('type');
                        break;
                    case 2:
                        this.txnType = '';
                        break;
                }
                this.getTradeList(1);
            },
            loadList (pageNo) {
                (this.tradePage) ? this.getTradeList(pageNo) : this.getIncomeList(pageNo);
            },
            getIncomeList (pageNo) {
                let _self = this;
                _self.$store.dispatch('fetchIncomeList', {
                    startDate: _self.startDate,
                    endDate: _self.endDate,
                    pageNo: pageNo
                }).then(() => {
                    _self.incomePageNav.all = _self.incomeList.totalPages;
                    _self.incomePageNav.cur = _self.incomeList.pageNo;
                })
            },
            getTradeList (pageNo) {
                let _self = this;
                _self.$store.dispatch('fetchTradeList', {
                    startDate: _self.startDate,
                    endDate: _self.endDate,
                    pageNo: pageNo,
                    txnType: _self.txnType
                }).then(() => {
                    _self.tradePageNav.all = _self.tradeList.totalPages;
                    _self.tradePageNav.cur = _self.tradeList.pageNo;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/account/trade.scss";
</style>
