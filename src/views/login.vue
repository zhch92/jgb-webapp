<template>
    <div id="login">
    <div class="login-form" v-if="!isLogged" :style="{ minHeight: minHeight + 'px' }">
        <div class="content">
            <div class="title"><span>登录</span></div>
            <div class="clearfix">
                <div class="left">
                    <div class="head">
                        <p>登录</p>
                    </div>
                    <div class="row">
                        <span>手机号码:</span>
                        <input type="tel" id="username" placeholder="您的手机号码" :value="username">
                    </div>
                    <div class="row">
                        <span>登录密码:</span>
                        <input type="password" id="password" placeholder="您的登录密码" @keyup.enter="login">
                        <div class="forget">
                            <router-link to="forget" tag="span">忘记密码？</router-link>
                        </div>
                    </div>
                    <div class="row">
                        <a class="login btn" @click="login">
                            <em>登录</em>
                        </a>
                    </div>
                    <div class="register">
                        没有账号？
                        <router-link :to="{ name: 'register' }">立即注册</router-link>
                    </div>
                </div>
                <div class="right">
                    <div class="text">
                        <p>机构宝-机构个性化现金管理工具</p>
                        <div class="row">对接持牌资产管理公司优质资产，为机构理财助理</div>
                        <div class="row">货币基金收益远超银行活期存款利息</div>
                        <div class="row">投资高流动性、安全性的短期货币工具</div>
                        <div class="row">不仅支持T+1取现，还支持快速取现，资金秒速到账</div>
                    </div>
                    <div class="img">
                        <img src="../assets/images/common/qrcode.jpg" alt="二维码"><span>关注机构宝微信:jigoubao</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="logged-area" v-else>
        <p>您已经登录</p>
        <a class="logout btn" @click="logout">
            <i class="fa fa-sign-out"></i>
            <em>退出</em>
        </a>
    </div>
</div>
</template>

<script>
    import { stringTrim, cookieManager } from '../plugins/utils'
    import config from '../config'

    export default {
        data () {
            return {
                username: '',
                keepName: true,
                activeClass: 'fa fa-check-square active',
                deactiveClass: 'fa fa-square-o',
                minHeight:window.innerHeight - 244
            }
        },
        computed: {
            isLogged () {
                return this.$store.getters.getUserState
            }
        },
        mounted () {
            if (!this.isLogged) {
                this.username = cookieManager.getItem(config.cookie.userKey, false);
            }
        },
        methods: {
            login () {
                let $username = document.getElementById('username');
                let $password = document.getElementById('password');
                if (!stringTrim($username.value)) {
                    window.layer.tips('用户名不能为空', $username);
                } else if (!stringTrim($password.value)) {
                    window.layer.tips('密码不能为空', $password);
                } else {
                    let payload = {
                        username: $username.value,
                        password: $password.value,
                        instance: this
                    };
                    this.$store.dispatch('userLogin', payload);
                }
            },
            logout () {
                this.$store.dispatch('userLogout');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/stylesheets/login.scss";
    .right{
        .row{
            background: url('../assets/images/common/arrow.png') no-repeat 0 center;
        }
    }
</style>
