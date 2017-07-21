<template>
    <div id="current">
        <div class="first section">
            <div class="container">
                <div class="left">
                    <div class="content">
                        <div class="top">
                            <span>活期机构宝</span>
                        </div>
                        <div class="bottom">
                            <div class="row"><div></div><span>收益远超银行活期</span></div>
                            <div class="row"><div></div><span>支持随存随取</span></div>
                            <div class="row"><div></div><span>安全合规无风险</span></div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="content">
                        <div class="top">
                            <span>{{ recommend.uptTime | formatDate('yyyy.MM.dd') }}</span>
                            <span>机构宝七日年化收益率</span>
                        </div>
                        <div class="middle">
                            <span>{{ recommend.seventhYearYield | toPercent }}</span>
                        </div>
                        <div class="bottom">
                            <router-link v-if="!isLogged" :to="{ name: 'login' }" tag="button">立即登录</router-link>
                            <button v-else>已登录</button>
                            <router-link :to="{ name: 'register' }" tag="button">快速注册</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="second section">
            <div class="title">
                <p>为您优选的货币基金</p>
            </div>
            <div class="product">
                <div class="icon">
                    <img src="../assets/images/current/icon.png">
                </div>
                <div class="name">
                    <p>{{ recommend.decription }}</p>
                </div>
                <div class="week">
                    <p>{{ recommend.seventhYearYield | toPercent }}</p>
                    <p>7日年化收益率</p>
                </div>
                <div class="day">
                    <p>{{ recommend.yieldPerMillion | keepDecimal }}元</p>
                    <p>日万份收益</p>
                </div>
                <div class="time">
                    <p>{{ recommend.endDate | redeemType }}</p>
                    <p>取现到账时间</p>
                </div>
                <div class="buy">
                    <router-link :to="{ name: 'product' }" tag="button">立即投资</router-link>
                </div>
            </div>
            <div class="imgs">
                <div class="left block">
                    <img src="../assets/images/current/img001.png" alt="收益">
                    <p>收益远超活期</p>
                    <p>机构宝货币基金收益远超银行活期存款利息，日日复利，每日结转。一分起存，轻松享受企业理财收益。</p>
                </div>
                <div class="middle block">
                    <img src="../assets/images/current/img002.png" alt="安全">
                    <p>安全高 放心存</p>
                    <p>机构宝货币基金仅投资高流动性、安全性的短期货币工具，不参与股票投资，是企业闲置资金理财的好选择。</p>
                </div>
                <div class="right block">
                    <img src="../assets/images/current/img003.png" alt="流动">
                    <p>流动强 随心取</p>
                    <p>机构宝货币基金不仅支持T+1取现，还支持快速取现，资金秒速到账。所有交易线上完成轻松便捷。</p>
                </div>
            </div>
        </div>
        <div class="third section">
            <div class="title">
                <p>准备以下资料，立即开户吧</p>
            </div>
            <div class="progress">
                <div class="img">
                    <img src="../assets/images/current/img004.png" alt="开户步骤">
                </div>
                <div class="open">
                    <button>预约咨询（请联系：{{ serveTel }}）</button>
                    <router-link :to="{ name: 'updateInfo'}" tag="button">自助开户</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../config'

    export default {
        data () {
            return {
                index: 0,
                serveTel: config.info.serveTel
            }
        },
        computed: {
            recommend () {
                return this.$store.getters.getRecommend
            },
            isLogged () {
                return this.$store.getters.getUserState
            }
        },
        mounted () {
            this.$root.$refs.header.adjustStyle(true, 1);
            this.$store.dispatch('fetchRecommend');
        },
        beforeDestroy () {
            this.$root.$refs.header.adjustStyle(false, 0);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/stylesheets/current.scss";

    .first.section {
        background: url('../assets/images/current/bg001.jpg') no-repeat 50% 0%;
        // background-size: cover;
    }
</style>
