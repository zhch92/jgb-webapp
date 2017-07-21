<template>
    <div id="newbee">
        <div class="head">
            <template v-for="(item, index) in tabList">
                <span :class="{ active: $parent.pageNo == index }" @click="tabClick($event, index)">{{ item }}</span>
            </template>
        </div>
        <div class="content">
            <div class="page" v-if="$parent.pageNo == 0">
                <div class="row">
                    <p>1.首先需要以真实信息进行注册，点击“注册按钮”；</p>
                    <img src="../../assets/images/about/newbee/kaihu1.jpg" alt="图片">
                </div>
                <div class="row">
                    <p>2.输入手机号、公司名称、联系人姓名并设置登陆密码；</p>
                    <img src="../../assets/images/about/newbee/kaihu2.jpg" alt="图片">
                </div>
                <div class="row">
                    <p>3.注册成功后，等待人工审核；</p>
                    <img src="../../assets/images/about/newbee/kaihu3.jpg" alt="图片">
                </div>
            </div>
            <div class="page" v-if="$parent.pageNo == 1">
                <div class="row">
                    <p>1.输入正确的账号和密码，登录账户；</p>
                    <img src="../../assets/images/about/newbee/guangfa1.jpg" alt="图片">
                </div>
                <div class="row">
                    <p>2.点击产品列表，在场外基金中，选择广发基金产品；</p>
                    <img src="../../assets/images/about/newbee/guangfa2.jpg" alt="图片">
                </div>
                <div class="row">
                    <p>3.申购：提交申购申请，完成汇款；</p>
                    <img src="../../assets/images/about/newbee/guangfa3.jpg" alt="图片">
                </div>
                <div class="row">
                    <p>4.赎回：提交赎回申请，填写相关数据，完成场外交易；</p>
                    <img src="../../assets/images/about/newbee/guangfa4.jpg" alt="图片">
                </div>
            </div>
            <div class="page" v-if="$parent.pageNo == 2">
                <div class="row">
                    <p>1.输入正确的账号和密码，登录账户；</p>
                    <img src="../../assets/images/about/newbee/changxin1.jpg" alt="图片">
                </div>
                <div class="row">
                    <p>2.点击产品列表，选择长信基金产品；</p>
                    <img src="../../assets/images/about/newbee/changxin2.jpg" alt="图片">
                </div>
                <div class="row">
                    <p>3.场内确权：填写相关数据，提交确权申请；</p>
                    <img src="../../assets/images/about/newbee/changxin3.jpg" alt="图片">
                </div>
                <div class="row">
                    <p>4.场外确权：填写相关数据，提交确权申请；</p>
                    <img src="../../assets/images/about/newbee/changxin4.jpg" alt="图片">
                </div>
            </div>
            <div class="page" v-if="$parent.pageNo == 3">
                <div class="row">
                    <p>1.我的资产，查看每日资产；</p>
                    <img src="../../assets/images/about/newbee/zichan1.jpg" alt="图片">
                </div>
                <div class="row">
                    <p>2.爱心值，查看每日爱心；</p>
                    <img src="../../assets/images/about/newbee/zichan2.jpg" alt="图片">
                </div>
            </div>
            <div class="page" v-if="$parent.pageNo == 4">
                <div class="row">
                    <p></p>
                    <img src="../../assets/images/about/newbee/gf.png" alt="图片">
                </div>
            </div>
            <div class="page" v-if="$parent.pageNo == 5">
                <div class="row">
                    <p></p>
                    <img src="../../assets/images/about/newbee/cx.png" alt="图片">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                pageNo: 11,
                tabList: Object.freeze([
                    '在线开户',
                    '广发交易',
                    '长信确权',
                    '查看资产',
                    '广发全流程',
                    '长信全流程'
                ])
            }
        },
        methods: {
            tabClick (e, num) {
                let $dom = e.target;
                if ($dom.className.indexOf('active') == -1) {
                    this.$parent.pageNo = num;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/about/newbee.scss";
</style>
