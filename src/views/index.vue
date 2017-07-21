<template>
    <div id="index">
        <c-activity ref="activity" v-if="active"></c-activity>
        <div class="swiper-container" :style="{ height: contentHeight + 'px' }">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="first section">
                        <div class="masking"></div>
                        <div class="first block">
                            <div class="content">
                                <div class="left">
                                    <span>机构宝</span>
                                </div>
                                <div class="middle"></div>
                                <div class="right">
                                    <span>对接持牌资产管理公司优质资产，</span>
                                    <span>为机构理财助力。</span>
                                </div>
                            </div>
                        </div>
                        <div class="second block" :style="secondBlockStyle">
                            <div class="login form" v-if="!isLogged">
                                <div class="top">
                                    <span class="user-icon"><em></em></span>
                                    <input id="username" type="text" placeholder="请输入您的账号" :value="username">
                                    <span class="pass-icon"><em></em></span>
                                    <input id="password" type="password" placeholder="请输入您的密码" @keyup.enter="login">
                                </div>
                                <div class="center">
                                    <div class="remember">
                                        <i :class="keepName ? activeClass : deactiveClass" @click="keepName = !keepName"></i>
                                        <span>记住用户名</span>
                                    </div>
                                    <div class="forget">
                                        <router-link to="forget" tag="span">忘记密码？</router-link>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <a class="btn" @click="login">登 录</a>
                                    <div>
                                        <router-link to="register" tag="span">快速注册</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="logout form" v-else>
                                <div class="top">
                                    <span>欢迎您！</span>
                                </div>
                                <div class="center">
                                    <span><b>{{ userInfo.organName }}</b></span>
                                </div>
                                <div class="bottom">
                                    <a class="btn" @click="logout">退 出</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="second section">
                        <div class="head">
                            <span>我们的优势</span>
                        </div>
                        <div class="content">
                            <div class="left block" :class="{ active: advantage == 0 }" @mouseover='changeAdvantage($event,0)'>
                            </div>
                            <div class="middle block" :class="{ active: advantage == 1 }" @mouseover='changeAdvantage($event,1)'>
                            </div>
                            <div class="right block" :class="{ active: advantage == 2 }" @mouseover='changeAdvantage($event,2)'>
                            </div>
                        </div>
                        <template v-if="advantage == 0">
                            <div class="content-text">
                                国内基金销售行业排名第二的数米基金网业务团队联合国内资产管理数据和服务实力团队倾力打造。
                            </div>
                        </template>
                        <template v-if="advantage == 1">
                            <div class="content-text">
                                针对机构客户的专业需求，为客户打造使客户投资安心，操作便捷的企业理财专业平台。
                            </div>
                        </template>
                        <template v-if="advantage == 2">
                            <div class="content-text">
                                十多年基金营销、销售和技术管理经验团队为您在安全性、流动性基础上，筛选匹配您需求的多种类固定收益产品。
                            </div>
                        </template>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="third section">
                        <div class="head head-bot">
                            <span>合作伙伴</span>
                        </div>
                        <div class="content company">
                            <div class="row">
                                <img src="../assets/images/index/changxin-hover.png" alt="长信基金">
                                <img src="../assets/images/index/guangfa-hover.png" alt="广发基金">
                                <!-- <img src="../assets/images/index/liantai-hover.png" alt="联泰资产"> -->
                                <img src="../assets/images/index/taipingyang-hover.png" alt="太平洋证券">
                            </div>
                        </div>
                        <div class="footer">
                            <span><img src="../assets/images/index/address.png" height="20" width="14">{{ info.address }}</span>
                            <span><img src="../assets/images/index/phone.png" height="20" width="14">{{ info.serveTel }}<em>({{ info.serveTime }})</em></span>
                            <span><img src="../assets/images/index/weixin.png" alt="图" >机构宝微信:jigoubao</span>
                        </div>
                        <div class="copyright" >
                            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402001819" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../assets/images/common/copyright.png" width="20" style="float:left;" />
                                <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#ffffff;">沪公网安备31010402001819号</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import {
    stringTrim,
    storageManager,
    cookieManager
} from '../plugins/utils'
import config from '../config'
import Swiper from '../../static/libs/swiper/swiper.min'
import * as cActivity from './activity'


export default {
    components: {
        cActivity
    },
    data() {
        return {
            advantage: 0,
            keepName: true,
            username: '',
            userInfo: {},
            secondBlockStyle: {
                margin: ''
            },
            contentHeight: window.innerHeight,
            activeClass: 'fa fa-check-square active',
            deactiveClass: 'fa fa-square-o',
            info: config.info,
            active: this.$parent.active
        }
    },
    computed: {
        isLogged() {
            return this.$store.getters.getUserState
        }
    },
    beforeMount() {
        this.$root.$refs.footer.show = false;
    },
    mounted() {
        this.$root.$refs.header.adjustStyle(true, false);
        let mySwiper = new Swiper('.swiper-container', {
            speed: 1000,
            direction: 'vertical',
            pagination: '.swiper-pagination',
            paginationElement: 'li',
            paginationClickable: true,
            mousewheelControl: true,
            height: this.contentHeight
        });
        let _this = this;
        setTimeout(function() {
                _this.active = false;
                _this.$parent.popping = false;
            }, 3000)
            // 判断是否登录
        if (!this.isLogged) {
            this.username = cookieManager.getItem(config.cookie.userKey, false);
        } else {
            this.userInfo = storageManager.getItem(config.session.userKey, true);
            this.secondBlockStyle = {
                margin: '-120px 50px 0 0'
            };
        }
        // 尺寸调整
        $(window).resize(function() {
            location.reload(true);
        })
    },
    beforeDestroy() {
        this.$root.$refs.header.adjustStyle(false, false);
        this.$root.$refs.footer.show = true;
    },
    methods: {
        login() {
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
        logout() {
            this.$store.dispatch('userLogout');
        },
        changeAdvantage(e, num) {
            let $dom = e.target.parentNode;
            if ($dom.className.indexOf('active') == -1) {
                this.advantage = num;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/stylesheets/index.scss";
@import "../../static/libs/swiper/swiper.min.css";
.swiper-wrapper {
    .swiper-slide {
        .first.section {
            background: url('../assets/images/index/bg001.jpg') no-repeat 100% 45%;
            background-size: cover;
            .first.block {
                background: url('../assets/images/index/banner-1-border.png') no-repeat;
            }
        }
        .second.section {
            background: url('../assets/images/index/bg002.jpg') no-repeat 100% 100%;
            background-size: cover;
        }
        .third.section {
            background: url('../assets/images/index/bg003.jpg') no-repeat 100% 100%;
            background-size: cover;
        }
    }
}

.swiper-pagination {
    opacity: 1;
    left: 10px;
    width: 40px;
}

.block.left {
    background: url('../assets/images/index/advantage.png');
}

.block.middle {
    background: url('../assets/images/index/advantage1.png');
}

.block.right {
    background: url('../assets/images/index/advantage2.png');
}

.user-icon {
    em {
        background-image: url('../assets/images/common/login-username.png');
    }
}

.pass-icon {
    em {
        background-image: url('../assets/images/common/login-password.png');
    }
}
</style>
