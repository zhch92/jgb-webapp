<template>
    <div id="footer" v-if="show">
        <div class="first">
            <div class="content clearfix">
                <div class="left">
                    <div class="block">
                        <router-link :to="{ name: 'index' }" tag="span">机构宝首页</router-link>
                        <router-link :to="{ name: 'help' }" tag="span">帮助中心</router-link>
                        <router-link :to="{ name: 'newbee' }" tag="span">新手指南</router-link>
                    </div>
                    <div class="block">
                        <div class="row">
                            <span>联系我们</span>
                        </div>
                        <div class="row">
                            <img src="../assets/images/common/footer-weixin.png" alt="图">
                            <span>微信公众号：{{ serveWeiXin }}</span>
                        </div>
                        <div class="row">
                            <img src="../assets/images/common/footer-address.png" alt="图">
                            <span>公司地址：{{ address }}</span>
                        </div>
                    </div>
                </div>
                <div class="middle">
                    <div class="row">
                        <span>客服电话(工作时间:{{ serveTime }})</span>
                    </div>
                    <div class="row">
                        <span>
                        <i class="fa fa-phone"></i>
                        {{ serveTel }}
                    </span>
                    </div>
                </div>
                <div class="right">
                    <img src="../assets/images/common/qrcode.jpg" alt="二维码">
                    <span>机构宝微信:jigoubao</span>
                </div>
            </div>
            <div class="copyright">
                <span>{{ license }}</span>
            </div>
        </div>
        <div style="width:300px;margin:0 auto; padding:5px 0;text-align:center">
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402001819" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../assets/images/common/copyright.png" width="20" style="float:left;" />
                <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#dddddd;">沪公网安备 {{copyright}} 号</p>
            </a>
        </div>
    </div>
</template>
<script>
import config from '../config'

export default {
    data() {
        return {
            show: true,
            serveTel: config.info.serveTel,
            serveTime: config.info.serveTime,
            serveMail: config.info.serveMail,
            serveWeiXin: config.info.serveWeiXin,
            address: config.info.address,
            license: config.info.license,
            copyright: config.info.copyright
        }
    }
}
</script>
<style lang="scss" scoped>
/* 变量定义 */

$fontColor: #ddd;

/* 底部样式 */
#footer {
    width: 100%;
    background-color: #7c7c7c;
    .first {
        height: 125px;
        padding: 15px 0 0 0;
        .content {
            max-width: 1200px;
            margin: 0 auto;
            .left {
                float: left;
                width: 45%;
                min-width: 480px;
                margin-left: 10%;
                .block {
                    height: 90px;
                    display: inline-flex;
                    flex-direction: column;
                    justify-content: space-between;
                    vertical-align: top;
                }
                .block:nth-child(1) {
                    width: 100px;
                    margin-right: 50px;
                    span {
                        display: block;
                        color: #ffffff;
                        font-size: 1.4rem;
                        cursor: pointer;
                    }
                }
                .block:nth-child(2) {
                    height: 80px;
                    .row {
                        display: flex;
                        align-items: center;
                        img {
                            width: 22px;
                            height: 22px;
                            margin-right: 5px;
                        }
                        span {
                            color: #dadada;
                            font-size: 1.4rem
                        }
                    }
                    .row:nth-child(1) {
                        span {
                            color: #ffffff;
                        }
                    }
                }
            }
            .middle {
                float: left;
                margin-top: 10px;
                text-align: center;
                .row {
                    span {
                        color: $fontColor;
                    }
                }
                .row:first-child {
                    font-size: 1.4rem;
                    margin-bottom: 5px;
                }
                .row:last-child {
                    font-size: 3rem;
                    font-weight: bold;
                }
            }
            .right {
                float: right;
                width: 15%;
                text-align: center;
                span {
                    display: block;
                    font-size: 1.2rem;
                    color: $fontColor;
                }
                img {
                    width: 40%;
                }
            }
        }
    }
    .copyright {
        height: 30px;
        text-align: center;
        background-color: #7c7c7c;
        clear: both;
        span {
            display: block;
            padding-top: 10px;
            font-size: 1.2rem;
            color: $fontColor;
            position: relative;
            // left: -80px;
        }
    }
}
</style>
