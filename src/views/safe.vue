<template>
    <div id="safe">
        <div class="banner">
        <div class="content">
            <div class="text">
                <h3>机构宝</h3>
                <p>| 机构个性化现金管理工具</p>
                <p>帮助机构精选优质理财产品，满足企业个性化投资需求，为各类企业提供现金管理综合解决方案。</p>
            </div>
            <div class="img">
                <img src="../assets/images/safe/dun.png" alt="图片">
            </div>
        </div>

        </div>
        <div class="first section">
            <div class="head">
                <p>资金安全</p>
                <p><strong>机构宝</strong>为机构客户提供面向金融标准品投资理财的居间顾问服务，客户投资资金直接投向金融机构。</p>
            </div>
            <div class="content">
                <img src="../assets/images/safe/zijin.png" alt="资金">
            </div>
        </div>
        <div class="second section">
            <div class="head">
                <p>合作伙伴</p>
            </div>
            <div class="content">
                <div class="block">
                    <img src="../assets/images/safe/yh.png" alt="银行">
                    <p>商业银行</p>
                </div>
                <div class="block">
                    <img src="../assets/images/safe/qs.png" alt="券商">
                    <p>证券公司</p>
                </div>
                <div class="block">
                    <img src="../assets/images/safe/gmjj.png" alt="公募基金">
                    <p>公募基金</p>
                </div>
                <div class="block">
                    <img src="../assets/images/safe/jjzgs.png" alt="基金子公司">
                    <p>基金子公司</p>
                </div>
            </div>
        </div>
        <div class="third section">
            <div class="head">
                <p>精选资产</p>
            </div>
            <div class="content">
                <div class="block">
                    <img src="../assets/images/safe/hbjj.png" alt="货币基金">
                    <p>货币基金</p>
                </div>
                <div class="block">
                    <img src="../assets/images/safe/jhlcjh.png" alt="集合理财计划">
                    <p>券商集合理财计划</p>
                </div>
                <div class="block">
                    <img src="../assets/images/safe/yhxyck.png" alt="银行协议存款">
                    <p>银行协议存款</p>
                </div>
                <div class="block">
                    <img src="../assets/images/safe/jghjj.png" alt="结构化基金">
                    <p>结构化基金</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted () {
            this.$root.$refs.header.adjustStyle(true, 2);
        },
        beforeDestroy () {
            this.$root.$refs.header.adjustStyle(false, 0);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/stylesheets/safe.scss";
    .banner{
        background:url('../assets/images/safe/safe_banner.jpg') no-repeat 50% 70%;
        background-size: 100% 100%;
    }
</style>
