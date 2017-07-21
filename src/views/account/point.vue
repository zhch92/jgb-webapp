<template>
    <div id="point">
        <c-exp ref="exp" :id="'pointChart'"></c-exp>
        <div class="first section">
            <div class="list">
                <div class="head">
                    <p>日期</p>
                    <p>行为</p>
                    <p>投资人</p>
                    <p>爱心值</p>
                    <p>备注</p>
                </div>
                <div class="content">
                    <template v-for="item in pointsRecord.resultList">
                        <div class="item">
                            <p>{{ item.time | formatDate('yyyy-MM-dd') }}</p>
                            <p>{{ item.actionDesc }}</p>
                            <p class="v-align-left" :title="item.investorName">{{ item.investorName | formatInvestorName(31) }}</p>
                            <p class="number">{{ item.point }}</p>
                            <p class="v-align-left" v-if="item.memoType == 0">
                                <em>产品：{{ item.productName }}</em>
                                <em>金额：{{ item.memo | formatMoney }}</em>
                            </p>
                            <p v-else>{{ item.actionDesc }}</p>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="second section">
            <c-page-nav :pageNo="pagination.cur" :totalPage="pagination.all" :displayNum="pagination.group" :alignStyle="pagination.align"></c-page-nav>
        </div>
    </div>
</template>

<script>
    import * as cExp from '../../components/Exp'
    import * as cPageNav from '../../components/Pagination'
    import { eventHub } from '../../plugins/utils'

    export default {
        components: {
            cExp,
            cPageNav
        },
        data () {
            return {
                pagination: {
                    cur: 1,
                    all: 0,
                    group: 5,
                    align: 'center'
                }
            }
        },
        computed: {
            pointsRecord () {
                return this.$store.getters.getPointsRecord
            }
        },
        activated () {
            this.loadList(this.pagination.cur);
            eventHub.$on('loadList', this.loadList);
            this.$store.dispatch('fetchPoint').then(() => {
                this.$refs.exp.updateChart(document.getElementById('pointChart'));
            });
        },
        deactivated () {
            eventHub.$off('loadList');
        },
        methods: {
            loadList (pageNo) {
                let _self = this;
                _self.$store.dispatch('fetchPointsRecord', pageNo).then(() => {
                    _self.pagination.all = _self.pointsRecord.totalPages;
                    _self.pagination.cur = _self.pointsRecord.pageNo;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/account/point.scss";
</style>
