<template>
    <div id="wealth">
        <div class="base">
            <div class="info">
                <span>欢迎您，
                    <em>{{ userInfo.organName }}</em>
                </span>
                <span>上次登录IP：
                    <em>{{ userInfo.lastLoginIp }}</em>
                </span>
                <span>上次登录时间：
                    <em>{{ userInfo.lastLoginTime | formatDate('yyyy年MM月dd日') }}</em>
                </span>
            </div>
            <c-exp ref="exp" :id="'wealthChart'"></c-exp>
            <div class="first section">
                <div class="profit">
                    <div class="money">
                        <p>总资产（元）</p>
                        <p>{{ wealth.totalAsset | formatMoney }}</p>
                    </div>
                    <div class="yesterday-profit">
                        <p>昨日收益（元）</p>
                        <p>{{ wealth.nowdayIncome | formatMoney }}</p>
                    </div>
                    <div class="total-profit">
                        <p>累计收益（元）</p>
                        <p>{{ wealth.totalIncome | formatMoney }}</p>
                    </div>
                </div>
            </div>
            <div class="second section">
                <span>*本数据仅供参考，实际数据以基金公司发布为准。</span>
            </div>
            <div class="third section">
                <div class="title">
                    <span>持有资产
                        <em>(*机构宝平台所显示的持有资产为经基金公司确认的资产，在途资产可以登录基金公司官网查看。)</em>
                    </span>
                </div>
                <div class="content" v-if="wealth.orgNo!=''">
                    <template v-for="organItem in wealth.orgTaAcctlist">
                        <div class="organ">
                            <div class="title">
                                <span :title="organItem.investorName">{{ organItem.investorName | formatInvestorName(31) }}</span>
                                <a class="toggle btn" @click="toggleList($event)">
                                    <em>展开</em>
                                    <i class="fa fa-angle-down"></i>
                                </a>
                            </div>
                            <div class="products">
                                <template v-for="product in organItem.taWealthAcctlist">
                                    <div class="product">
                                        <div class="top">
                                            <div class="name">
                                                <img v-if="product.productType == 0" src="../../assets/images/account/wealth/product_demand.png" alt="">
                                                <img v-else src="../../assets/images/account/wealth/product_fixed.png" alt="">
                                                <span>{{ product.prodName }}</span>
                                            </div>
                                        </div>
                                        <div class="bottom">
                                            <div class="block">
                                                <p class="intro">{{product.issueId==3?'金额(元)':'持有资产（元）'}}</p>
                                                <p class="number">
                                                    <b>{{ product.totalAsset | formatMoney }}</b>
                                                </p>
                                            </div>
                                            <template v-if="product.issueId==3">
                                                <div class="block">
                                                    <p class="intro">预期报价收益率</p>
                                                    <p class="number">
                                                        <b>{{ product.seventhYearYield | toPercent }}</b>
                                                    </p>
                                                </div>
                                                <div class="block">
                                                    <p class="intro">期限(天)</p>
                                                    <p class="number">
                                                        <b>{{ product.valueDuration }}</b>
                                                    </p>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="block">
                                                    <p class="intro">昨日收益</p>
                                                    <p class="number">
                                                        <b>{{ product.nowdayIncome | formatMoney }}</b>
                                                    </p>
                                                </div>
                                                <div class="block">
                                                    <p class="intro">累计收益</p>
                                                    <p class="number">
                                                        <b>{{ product.totalIncome | formatMoney }}</b>
                                                    </p>
                                                </div>
                                            </template>
                                            <template v-if="product.issueId == 1">
                                                <div class="block cx1">
                                                    <p class="intro">七日年化</p>
                                                    <p>{{ product.seventhYearYield | toPercent }}</p>
                                                </div>
                                                <div class="block cx2">
                                                    <p>
                                                        <em class="intro">万份收益：</em>
                                                        <em>{{ product.yieldPerMillion | keepDecimal }}</em>
                                                    </p>
                                                    <p>
                                                        <em class="intro">更新日期：</em>
                                                        <em>{{ product.uptTime | formatDate('yyyy.MM.dd') }}</em>
                                                    </p>
                                                </div>
                                            </template>
                                            <template v-else-if="product.issueId == 2">
                                                <div class="block">
                                                    <p>
                                                        <em class="intro">七日年化：</em>
                                                        <em>{{ product.seventhYearYield | toPercent }}</em>
                                                    </p>
                                                    <p>
                                                        <em class="intro">万份收益：</em>
                                                        <em>{{ product.yieldPerMillion | keepDecimal }}</em>
                                                    </p>
                                                    <p>
                                                        <em class="intro">更新日期：</em>
                                                        <em>{{ product.uptTime | formatDate('yyyy.MM.dd') }}</em>
                                                    </p>
                                                </div>
                                                <div class="block">
                                                    <a class="buy btn" @click="openModal($event, 2, 0)" :data-id="product.productId" :data-issue="product.issueId" :data-name="product.prodName" :data-type="product.securityMarketType" :data-code="product.prodCode">申购</a>
                                                    <a class="sell btn" @click="openModal($event, 3, 1)" :data-id="product.productId" :data-issue="product.issueId" :data-name="product.prodName" :data-asset="product.totalAsset" :data-type="product.securityMarketType" :data-code="product.prodCode">赎回</a>
                                                </div>
                                            </template>
                                            <template v-else-if="product.issueId == 4">
                                                <div class="block">
                                                    <p>
                                                        <em class="intro">投资期限：</em>
                                                        <em>每日申赎</em>
                                                    </p>
                                                    <p>
                                                        <em class="intro">更新日期：</em>
                                                        <em>{{ product.uptTime | formatDate('yyyy.MM.dd') }}</em>
                                                    </p>
                                                    <p>
                                                        <span class="intro">
                                                            <em>爱</em>
                                                            <em>心</em>
                                                            <em>值</em>
                                                        </span>
                                                        <em class="intro">：</em>
                                                        <em>{{product.pointRate | tonIteger}}/亿元（日终存量）</em>
                                                    </p>
                                                </div>
                                                <div class="block">
                                                    <a class="buy btn" @click="openModal($event,2, 0)" :data-id="product.productId" :data-issue="product.issueId" :data-name="product.prodName" :data-type="product.securityMarketType" :data-code="product.prodCode">申购</a>
                                                    <a class="sell btn" @click="openModal($event, 3, 1)" :data-id="product.productId" :data-issue="product.issueId" :data-name="product.prodName" :data-asset="product.totalAsset" :data-type="product.securityMarketType" :data-code="product.prodCode">赎回</a>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="block cx2">
                                                    <p>
                                                        <em class="intro">资金追加日：</em>
                                                        <em>{{ product.fundAccessDate | formatDate('yyyy.MM.dd') }}</em>
                                                    </p>
                                                    <p>
                                                        <em class="intro">产品计息日：</em>
                                                        <em>{{ product.yieldStartDate | formatDate('yyyy.MM.dd') }}</em>
                                                    </p>
                                                </div>
                                                <div class="block cx2">
                                                    <p>
                                                        <em class="intro">产品到期日：</em>
                                                        <em>{{ product.yieldEndDate | formatDate('yyyy.MM.dd') }}</em>
                                                    </p>
                                                    <p>
                                                        <em class="intro">资金到账日：</em>
                                                        <em>{{ product.fundExitDate | formatDate('yyyy.MM.dd') }}</em>
                                                    </p>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="content" v-else>
                    <div class="tips">
                        <img src="../../assets/images/account/wealth/none.png">
                        <p>您暂无投资任何项目</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    eventHub,
    storageManager,
    logger
} from '../../plugins/utils'
import * as cExp from '../../components/Exp'
import config from '../../config'

export default {
    components: {
        cExp
    },
    data() {
        return {
            userInfo: {}
        }
    },
    computed: {
        wealth() {
            return this.$store.getters.getWealth
        }
    },
    activated() {
        this.$store.dispatch('fetchWealth');
        this.userInfo = storageManager.getItem(config.session.userKey, true);
        this.$store.dispatch('fetchPoint').then(() => {
            this.$refs.exp.updateChart(document.getElementById('wealthChart'));
        });
    },
    methods: {
        toggleList(e) {
            let $dom, $em, $i, $products;
            (e.target.tagName == 'a') ? $dom = $(e.target) : $dom = $(e.target).parent();
            $em = $dom.find('em');
            $i = $dom.find('i');
            $products = $dom.parents('.organ').find('.products');
            if ($i.hasClass('fa-angle-down')) {
                $em.text('收拢');
                $i.removeClass().addClass('fa fa-angle-up');
            } else {
                $em.text('展开');
                $i.removeClass().addClass('fa fa-angle-down');
            }
            $products.slideToggle();
        },
        openModal(e, modalType, txnType) {
            let [$dom, objData] = [$(e.target), {}];
            objData = {
                product: {
                    id: $dom.data('id'),
                    name: $dom.data('name'),
                    prodCode: $dom.data('code'),
                    issueId: $dom.data('issue'),
                    txnType: txnType,
                    totalAsset: $dom.data('asset'),
                    marketType: $dom.data('type')
                },
                getAsset: false,
                modalType: modalType
            };
            if (modalType == 1 || modalType == 3) {
                objData.getAsset = true;
            }
            eventHub.$emit('showModal', objData);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/stylesheets/account/wealth.scss";
</style>
