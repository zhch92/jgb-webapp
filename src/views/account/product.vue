<template>
    <div id="product">
        <div class="top-nav"><span class="active" @click='changeActive($event)'>活期产品</span><span @click='changeActive($event)'>定期产品</span></div>
        <template v-if='!current'>
        <div class="third section">
                <div class="title">
                    <span>券商资管</span>
                </div>
                <div class="content">
                    <template v-for="(item, index) in filterHxProducts">
                        <div class="item" :class="{ cx_last: index == 1 }" v-if="index<4">
                            <div class="top">
                                <div class="name">
                                    <img src="../../assets/images/account/product/product.png" alt="">
                                    <a :href="item.linkUrl" target="_blank">{{ item.name }}</a>
                                </div>
                            </div>
                            <div class="bottom regular">
                                <div class="block">
                                    <p class="intro">七日年化收益率</p>
                                    <p class="number">{{ item.seventhYearYield | toPercent }}</p>
                                </div>
                                <div class="block">
                                    <p class="intro">万份收益</p>
                                    <p class="number">
                                        {{ item.yieldPerMillion | keepDecimal }}
                                        <span class="suffix">元</span>
                                    </p>
                                </div>
                                <div class="block">
                                    <p>
                                        <em class="intro">投资期限：</em>
                                        <em>每日申赎</em>
                                    </p>
                                    <p>
                                        <em class="intro">更新日期：</em>
                                        <em>{{ item.uptTime | formatDate('yyyy.MM.dd') }}</em>
                                    </p>
                                    <p>
                                        <span class="intro">
                                        <em>爱</em>
                                        <em>心</em>
                                        <em>值</em>
                                    </span>
                                        <em class="intro">：</em>
                                        <em>{{item.pointRate | tonIteger}}/亿元（日终存量）</em>
                                    </p>
                                </div>
                                <div class="block">
                                    <template>
                                        <a class="buy btn" @click="openModal($event, 2, 2, 0)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode" :data-forwardType='item.carryForwardType'>申购</a>
                                        <a class="sell btn" @click="openModal($event, 3, 2, 1)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">赎回</a>
                                        <router-link :to="{ name: 'hxAccount' }" class="gf-kh btn">开户</router-link>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="item" :class="{ cx_last: index == 1 }" v-if="index>3" v-show="more">
                            <div class="top">
                                <div class="name">
                                    <img src="../../assets/images/account/product/product.png" alt="">
                                    <a :href="item.linkUrl" target="_blank">{{ item.name }}</a>
                                </div>
                            </div>
                            <div class="bottom regular">
                                <div class="block">
                                    <p class="intro">七日年化收益率</p>
                                    <p class="number">{{ item.seventhYearYield | toPercent }}</p>
                                </div>
                                <div class="block">
                                    <p class="intro">万份收益</p>
                                    <p class="number">
                                        {{ item.yieldPerMillion | keepDecimal }}
                                        <span class="suffix">元</span>
                                    </p>
                                </div>
                                <div class="block">
                                    <p>
                                        <em class="intro">投资期限：</em>
                                        <em>每日申赎</em>
                                    </p>
                                    <p>
                                        <em class="intro">更新日期：</em>
                                        <em>{{ item.uptTime | formatDate('yyyy.MM.dd') }}</em>
                                    </p>
                                    <p>
                                        <span class="intro">
                                        <em>爱</em>
                                        <em>心</em>
                                        <em>值</em>
                                    </span>
                                        <em class="intro">：</em>
                                        <em>{{item.pointRate | tonIteger}}/亿元（日终存量）</em>
                                    </p>
                                </div>
                                <div class="block">
                                    <template>
                                        <a class="buy btn" @click="openModal($event, 2, 2, 0)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode" :data-forwardType='item.carryForwardType'>申购</a>
                                        <a class="sell btn" @click="openModal($event, 3, 2, 1)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">赎回</a>
                                        <router-link :to="{ name: 'hxAccount' }" class="gf-kh btn">开户</router-link>
                                    </template>
                                </div>
                            </div>
                        </div>

                    </template>
                    <a href="javascript:void(0)" class="more" @click="more=!more" v-if="filterHxProducts.length>4">{{more?'收起':'查询更多'}}</a>
                </div>
            </div>
            <div class="first section">
                <div class="title">
                    <span>场内基金</span>
                    <div class="btns">
                        <a class="btn" @click="showZN()">什么是确权？</a>
                    </div>
                </div>
                <div class="content">
                    <template v-for="(item,index) in filterMarketType(1)"  v-if="item.issueId!=4">
                        <div class="item">
                            <div class="top">
                                <div class="name">
                                    <img src="../../assets/images/account/product/product.png" alt="">
                                    <a :href="item.linkUrl" target="_blank">{{ item.name }}</a>
                                </div>
                            </div>
                            <div class="bottom regular">
                                <div class="block">
                                    <p class="intro">七日年化收益率</p>
                                    <p class="number">{{ item.seventhYearYield | toPercent }}</p>
                                </div>
                                <div class="block">
                                    <p class="intro">万份收益</p>
                                    <p class="number">
                                        {{ item.yieldPerMillion | keepDecimal }}
                                        <span class="suffix">元</span>
                                    </p>
                                </div>
                                <div class="block">
                                    <p class="fix">
                                        <em class="intro">更新日期：</em>
                                        <em>{{ item.uptTime | formatDate('yyyy.MM.dd') }}</em>
                                    </p>
                                    <p>
                                        <span class="intro">
                                        <em>爱</em>
                                        <em>心</em>
                                        <em>值</em>
                                    </span>
                                        <em class="intro">：</em>
                                        <em>{{item.pointRate | tonIteger}}/亿元（日终存量）</em>
                                    </p>
                                </div>
                                <div class="block">
                                    <a class="auth btn" @click="openModal($event, 4, 1, 2)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">场内确权</a>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="second section">
                <div class="title">
                    <span>场外基金</span>
                </div>
                <div class="content">
                    <template v-for="(item, index) in filterMarketType(2)"  v-if="item.issueId!=4">
                        <div class="item" :class="{ cx_last: index == 1 }">
                            <div class="top">
                                <div class="name">
                                    <img src="../../assets/images/account/product/product.png" alt="">
                                    <a :href="item.linkUrl" target="_blank">{{ item.name }}</a>
                                </div>
                            </div>
                            <div class="bottom regular">
                                <div class="block">
                                    <p class="intro">七日年化收益率</p>
                                    <p class="number">{{ item.seventhYearYield | toPercent }}</p>
                                </div>
                                <div class="block">
                                    <p class="intro">万份收益</p>
                                    <p class="number">
                                        {{ item.yieldPerMillion | keepDecimal }}
                                        <span class="suffix">元</span>
                                    </p>
                                </div>
                                <div class="block">
                                    <p v-if="item.prodCode == '000509'">
                                        <em class="intro">赎回时效：</em>
                                        <em>{{ item.endDate | redeemType }}</em>
                                    </p>
                                    <p :class="{ fix: item.prodCode != '000509' }">
                                        <em class="intro">更新日期：</em>
                                        <em>{{ item.uptTime | formatDate('yyyy.MM.dd') }}</em>
                                    </p>
                                    <p>
                                        <span class="intro">
                                        <em>爱</em>
                                        <em>心</em>
                                        <em>值</em>
                                    </span>
                                        <em class="intro">：</em>
                                        <em>{{item.pointRate | tonIteger}}/亿元（日终存量）</em>
                                    </p>
                                </div>
                                <div class="block">
                                    <template v-if="item.issueId == 1">
                                        <a v-if="index == 0" href="/jgb-download/cxdoc.zip" class="cx-kh btn">长信开户</a>
                                        <a class="auth btn" @click="openModal($event, 4, 2, 2)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">场外确权</a>
                                    </template>
                                    <template v-else>
                                        <a class="buy btn" @click="openModal($event, 2, 2, 0)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode" :data-forwardType='item.carryForwardType'>申购</a>
                                        <a class="sell btn" @click="openModal($event, 3, 2, 1)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">赎回</a>
                                        <router-link :to="{ name: 'updateInfo' }" class="gf-kh btn">开户</router-link>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            
        </template>
        
        <template v-if='current'>
            <div class="second section">
                <div class="content">
                    <template v-for="(item, index) in filterDqProducts">
                        <div class="item" :class='{end:item.endFlag===true}'>
                            <div class="top">
                                <div class="name">
                                    <img src="../../assets/images/account/product/product.png" alt="">
                                    <a>{{item.name}} </a>
                                </div>
                                <div class="love-value"><span>爱心值：<em>{{item.pointRate | tonIteger}}/亿元（日终存量）</em></span> </div>
                            </div>
                            <div class="bottom current">
                                <div class="block">
                                    <p class="intro">预期报价收益率</p>
                                    <p class="number">{{ item.yieldPerMillion | toPercent }}</p>
                                </div>
                                <div class="block">
                                    <p class="intro">期限</p>
                                    <p class="number">
                                        {{item.valueDuration}}
                                        <span class="suffix">天</span>
                                    </p>
                                </div>
                                <div class="block">
                                    <p>
                                        <em class="intro">资金追加日：</em>
                                        <em>{{ item.fundAccessDate | formatDate('yyyy.MM.dd') }}</em>
                                    </p>
                                    <p>
                                        <em class="intro">产品计息日：</em>
                                        <em>{{ item.yieldStartDate | formatDate('yyyy.MM.dd') }}</em>
                                    </p>
                                </div>
                                <div class="block">
                                    <p>
                                        <em class="intro">产品到期日：</em>
                                        <em>{{ item.yieldEndDate | formatDate('yyyy.MM.dd') }}</em>
                                    </p>
                                    <p>
                                        <em class="intro">资金到账日：</em>
                                        <em>{{ item.fundExitDate | formatDate('yyyy.MM.dd') }}</em>
                                    </p>
                                </div>
                                <template v-if="item.endFlag===false">
                                    <div class="block">
                                        <a class="buy btn" >查看详情
                                     <img :src="item.linkUrl" alt="" :data-id="'details'+index"  @click="viewImg($event)">
                                     </a>
                                        <a class="sell btn" @click="openModal($event,5, 2, 1)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">预约</a>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="block">
                                        <span>已结束</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <c-modal v-if="showTips">
            <div class="tips modal-container" slot="modal-container">
                <div class="title">
                    <span>什么是确权</span>
                    <a class="btn" @click="hideZN()">
                        <i class="fa fa-times-circle-o"></i>
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <span><em>确权</em>是将贵公司的交易<em>登记</em>在机构宝平台名下，登记成功会计算<em>爱心值</em>;<br><em>T日的交易</em>,T+1日基金公司确认，<em>T+2日</em>在机构宝平台<em>查询资产、收益和爱心值</em>。</span>
                </div>
            </div>
        </c-modal>
    </div>
</template>
<script>
import * as cModal from '../../components/Modal'
import {
    eventHub
} from '../../plugins/utils'
import Viewer from '../../../static/libs/viewer/viewer.min'


export default {
    components: {
        cModal
    },
    data() {
        return {
            more:false,
            showTips: false,
            current: false,
            viewer: {
                id: '',
                obj: {}
            }


        }
    },
    computed: {
        products() {
            return this.$store.getters.getProducts
        },
        pointRate(val) {
            return val * 10000
        },
         filterHxProducts(){
            let _self = this;
            const hxProducts=_self.products.filter((product) => {
                return product.issueId == 4
            })
            return  hxProducts

        },
         filterDqProducts(){
            let _self = this;
            const dQProducts=_self.products.filter((product) => {
                return product.issueId == 3
            })
            return  dQProducts

        }
    },
    activated() {
        this.$store.dispatch('fetchProducts');
    },
    methods: {
        filterMarketType(type) {
            let _self = this;
            return _self.products.filter((product) => {
                return product.securityMarketType == type
            })
        },
       
        // viewImg(e) {
        //     const url = e.target.lastChild.src;
        //     const id = e.target.dataset.id;
        //     if (id != this.viewer.id) {
        //         this.viewer.id = id;
        //         this.viewer.obj = new Viewer(e.target);
        //     }
        //     let xx = this.viewer.obj;
        //     (url) ? this.viewer.obj.show(): window.layer.msg('没有一页通!')
        // },
        viewImg(e) {
            const url = e.target.src;
            if (url) {
            let x = new Viewer(e.target);

            }else{
                window.layer.msg('没有一页通!')
            }

        },


        changeActive(e) {
            var $dom = $(e.target);
            this.current = $dom.index();
            $dom.addClass('active').siblings().removeClass('active');
        },
        showZN() {
            this.showTips = true;
            this.$root.popping = true
        },
        hideZN() {
            this.showTips = false;
            this.$root.popping = false
        },
        openModal(e, modalType, marketType, txnType) {
            let [$dom, objData] = [$(e.target), {}];
            objData = {
                product: {
                    id: $dom.data('id'),
                    name: $dom.data('name'),
                    prodCode: $dom.data('code'),
                    issueId: $dom.data('issue'),
                    carryForwardType:$dom.data('forwardtype'),
                    txnType: txnType,
                    totalAsset: 0,
                    remainAmount:0,
                    marketType: marketType
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
@import "../../assets/stylesheets/account/product.scss";
@import "../../../static/libs/viewer/viewer.min.css";
</style>
