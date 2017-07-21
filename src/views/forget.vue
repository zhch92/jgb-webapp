<template>
    <div id="forget">
        <div class="forget-form">
            <div class="content">
                <div class="title"><span>忘记密码</span></div>
                <div class="clearfix">
                    <div class="left-box">
                        <div class="head">
                            <p>忘记密码</p>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>
                            手机号码:
                            <em>*</em>
                        </span>
                            </div>
                            <div class="middle">
                                <input type="tel" id="mobile" placeholder="您的手机号码">
                            </div>
                            <div class="right"></div>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>
                            图片验证:
                            <em>*</em>
                        </span>
                            </div>
                            <div class="middle">
                                <input type="text" id="captcha" maxlength="4" placeholder="请输入4位图片验证码">
                                <img class="captcha" src="/jgb-web/v1/captcha">
                            </div>
                            <div class="right">
                                <a id="change-captcha" @click="changeCaptch">换一张</a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>
                            手机验证码:
                            <em>*</em>
                        </span>
                            </div>
                            <div class="middle">
                                <input type="tel" id="smscode" maxlength="6" placeholder="请输入验证码">
                                <button class="send-sms" @click="sendSms($event)">点击获取</button>
                            </div>
                            <div class="right"></div>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>
                            设置密码:
                            <em>*</em>
                        </span>
                            </div>
                            <div class="middle">
                                <input type="password" id="password" placeholder="6-10位数字" @input="difficultyCheck($event)">
                                <div id="fzd">
                                    <ul>
                                        <li>低</li>
                                        <li>中</li>
                                        <li>高</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="right"></div>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>
                            确认密码:
                            <em>*</em>
                        </span>
                            </div>
                            <div class="middle">
                                <input type="password" id="verify-pwd" placeholder="6-10位数字">
                            </div>
                            <div class="right"></div>
                        </div>
                        <div class="row">
                            <a class="submit btn" @click="submit">
                                <em>完成</em>
                            </a>
                        </div>
                    </div>
                    <div class="right-box">
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
    </div>
</template>

<script>
    import userService from '../services/userService'
    import commonService from '../services/commonService'
    import { stringTrim, errorHandler, logger } from '../plugins/utils'
    import config from '../config'

    export default {
        data () {
            return {
                time: 60
            }
        },
        methods: {
            changeCaptch () {
                let captcha = document.querySelector('.captcha');
                let src = '/jgb-web/v1/captcha?v=';
                let time = new Date().getTime();
                captcha.src = src + time;
            },
            difficultyCheck (e) {
                let value = e.target.value;
                let $dom = document.getElementById('fzd');
                if (value.length == 0) {
                    $dom.className = '';
                } else if (value.length > 0 && value.length <= 6) {
                    $dom.className = 'weak';
                } else if (value.length > 6 && value.length <= 8) {
                    $dom.className = 'middle';
                } else if (value.length > 8) {
                    $dom.className = 'strong';
                }
            },
            sendSms (e) {
                let _self = this;
                let $mobileNo = document.getElementById('mobile');
                if (!stringTrim($mobileNo.value)) {
                    window.layer.tips('手机号码不能为空', $mobileNo);
                } else {
                    commonService.sendSms($mobileNo.value, _self).then(() => {
                        _self.countDown(e.target);
                    });
                }
            },
            countDown (dom) {
                let _self = this;
                if (_self.time == 0) {
                    dom.removeAttribute('disabled');
                    dom.innerText = '点击获取';
                    _self.time = 60;
                    return;
                } else {
                    dom.setAttribute('disabled', true);
                    dom.innerText = '（' + _self.time + '）';
                    _self.time--;
                }
                setTimeout(function () {
                    _self.countDown(dom);
                }, 1000);
            },
            submit () {
                let _self = this;
                let $mobileNo = document.getElementById('mobile');
                let $captcha = document.getElementById('captcha');
                let $smscode = document.getElementById('smscode');
                let $password = document.getElementById('password');
                let $verify = document.getElementById('verify-pwd');
                if (!stringTrim($mobileNo.value)) {
                    window.layer.tips('手机号码不能为空', $mobileNo);
                } else if (!stringTrim($captcha.value)) {
                    window.layer.tips('图片验证码不能为空', $captcha);
                } else if (!stringTrim($smscode.value)) {
                    window.layer.tips('短信验证码不能为空', $smscode);
                } else if (!stringTrim($password.value)) {
                    window.layer.tips('密码不能为空', $password);
                } else if (!stringTrim($verify.value)) {
                    window.layer.tips('确认密码不能为空', $verify);
                } else if ($password.value!= $verify.value) {
                    window.layer.tips('两次密码不一致', $verify);
                } else {
                    userService.forgetPassword($mobileNo.value, $captcha.value, $smscode.value, $password.value, _self).then(() => {
                        window.layer.msg('修改成功，请重新登陆！', {
                            time: 800,
                            end: function () {
                                _self.$router.push({ name: 'login' });
                            }
                        });
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/stylesheets/forget.scss";
    .right-box{
        .row{
            background: url('../assets/images/common/arrow.png') no-repeat 0 center;
        }
    }
</style>
