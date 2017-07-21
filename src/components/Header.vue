<template>
    <div id="header" :class="{ clearfix: scrollFix }" :style="isFront ? frontStyle.global : endStyle.global">
        <div class="row">
            <div class="content">
                <div class="left">
                    <div class="brand">
                        <router-link :to="{ name: 'index'}" tag="a">
                            <img v-if="isFront" src="../assets/images/common/logo-white.png">
                            <img v-else src="../assets/images/common/logo-blue.png">
                        </router-link>
                    </div>
                </div>
                <div class="right" :style="isFront && !isCurrent ? frontStyle.span : endStyle.span">
                    <template v-for="item in navList">
                        <router-link :to="{ name: item.split('-')[1] }" :class="item.split('-')[1]" tag="span">{{ item.split('-')[0] }}</router-link>
                    </template>
                    <template v-if="!isLogged">
                        <span class="fgx">|</span>
                        <router-link :to="{ name: 'register' }" tag="span" class="register" active-class="t">注 册</router-link>
                        <router-link :to="{ name: 'login' }" tag="span" class="login" active-class="t">登 录</router-link>
                    </template>
                    <span v-else class="exit" @click="logout">退 出</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import userService from '../services/userService'
import config from '../config'

export default {
    data() {
            return {
                serveTel: config.info.serveTel,
                serveTime: config.info.serveTime,
                navList: Object.freeze([
                    '首 页-index',
                    '活 期-current',
                    '安全保障-safe',
                    '帮助中心-help',
                    '我的账户-account'
                ]),
                scrollFix: false,
                isFront: false,
                isCurrent: false,
                isSafe: false,
                frontStyle: {
                    global: {
                        position: 'fixed',
                        background: 'transparent'
                    },
                    span: {
                        color: '#fff'
                    }
                },
                endStyle: {
                    global: {
                        position: 'relative',
                        background: '#fff'
                    },
                    span: {
                        color: '#333'
                    }
                }
            }
        },
        computed: {
            isLogged() {
                return this.$store.getters.getUserState
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('userLogout');
            },
            adjustStyle(isFront, pageNo) {
                let [$dom, _self] = [document.querySelector('.login'), this];
                _self.isFront = isFront;
                switch (pageNo) {
                    case 0:
                        _self.isCurrent = false;
                        _self.isSafe = false;
                        break;
                    case 1:
                        _self.isCurrent = true;
                        break;
                    case 2:
                        _self.isSafe = true;
                        break;
                    default:
                        break;
                }
                if ($dom) {
                    if (_self.isSafe) {
                        $dom.style.cssText = 'background: #fff; color: #008fe6';
                    } else {
                        $dom.style.cssText = '';
                    }
                } else {
                    $dom = document.querySelector('.exit');
                    if (this.isFront && this.isSafe) {
                        $dom.style.cssText = 'background: #fff; color: #1b65ce; border: none;';
                    } else if (this.isFront) {
                        $dom.style.cssText = 'background: #1b65ce; color: #fff; border: none;';
                    } else {
                        $dom.style.cssText = '';
                    }
                }
                window.onscroll = function() {
                    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    (scrollTop > 100) ? _self.scrollFix = true: _self.scrollFix = false;
                }
            }
        }
}
</script>
<style lang="scss" scoped>
#header {
    width: 100%;
    z-index: 1000;
    .row {
        .content {
            height: 104px;
            width: 1200px;
            margin: 0 auto;
            position: relative;
            .left {
                position: absolute;
                top: 50%;
                margin-top: -29px;
                left: 0;
            }
            .right {
                float: right;
                margin: 38px 0 0 0;
                span {
                    display: inline-block;
                    ;
                    margin-left: 15px;
                    padding: 4px 15px;
                    font-size: 1.8rem;
                    cursor: pointer;
                    text-align: center;
                    user-select: none;
                    box-sizing: border-box;
                    &.active {
                        padding-bottom: 37px;
                        color: #1b65ce;
                        border-bottom: 2px solid #1b65ce;
                    }
                    &.safe.active {
                        color: #333;
                        border-bottom-color: #333;
                    }
                    &.fgx {
                        padding: 0;
                    }
                    &.register {
                        margin: 0;
                    }
                    &.login {
                        color: #fff;
                        background: #1b65ce;
                    }
                    &.exit {
                        color: #999;
                        border: 1px solid #c5c5c5;
                    }
                }
            }
        }
    }
    &.clearfix {
        background: rgba(0, 0, 0, .3) !important;
    }
}
</style>
