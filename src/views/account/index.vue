<template>
    <div id="account" :style="{ minHeight: rightHeight + 'px' }">
        <div class="left">
            <template v-for="item in itemList">
                <router-link :to="{ name: item.split('-')[1] }" tag="div" class="item">
                    <span>{{ item.split('-')[0] }}</span>
                    <i class="fa fa-angle-right"></i>
                </router-link>
            </template>
            <div class="item">
                <span>系统管理</span>
            </div>
            <template v-for="item in systemList">
                <router-link :to="{ name: item.split('-')[1] }" tag="div" class="item1">
                    <span>{{ item.split('-')[0] }}</span>
                    <i class="fa fa-angle-right"></i>
                </router-link>
            </template>
        </div>
        <div class="right">
            <transition name="router">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
        <c-modal v-if="showBuy">
            <div class="buy modal-container" slot="modal-container">
                <div class="title">
                    <span>申购</span>
                    <a class="btn" @click="closeModal(2)">
                        <i class="fa fa-times-circle-o"></i>
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <div class="row">
                        <span>选择产品：</span>
                        <a class="btn select active" @click="selectProduct($event)">{{ product.name }}</a>
                    </div>
                    <div class="row">
                        <span>选择账户：</span>
                        <select id="acct-id" v-model="selected">
                            <option v-for="(item,index) in taInfo" :value="item.acctId">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="row">
                        <span>申购金额：</span>
                        <input v-if='isQDZ' id="money" type="text" placeholder="单日限额2000万元" v-model="moneyThousands">
                        <input v-else-if='isQDZA' id="money" type="text" placeholder="500万(含)以上请申购广发货币B" v-model="moneyThousands">
                        <input v-else-if='isB' id="money" type="text" placeholder="500万起投" v-model="moneyThousands">
                        <input v-else id="money" type="text" placeholder="100万起投" v-model="moneyThousands">
                        <span>（元）</span>
                    </div>
                    <div class="row hint" v-if="product.issueId==4">
                        <p>最大可申购金额 {{formatRemain}}</p>
                    </div>
                </div>
                <div class="title">
                    <span>汇款</span>
                </div>
                <div class="triangle"></div>
                <div class="comment">
                    <div class="detail">
                        <template v-for="item in taInfo">
                            <span v-if="selected==item.acctId">请以贵公司开户银行({{ item.bankName }}尾号{{ item.bankAcctNo | numberLen }}），将预约资金汇入以下银行账户</span>
                        </template>
                        <div class="bank-info">
                            <span>银行户名：{{(isQDZ||isQDZA||isB)?'广发基金管理有限公司直销专户':'上海华信证券有限责任公司销售专户'}}</span>
                            <span>银行账号：{{(isQDZ||isQDZA||isB)?'3602 0001 2983 8383 823':'4000 0405 2920 0414 049'}}</span>
                            <span>开户行：{{(isQDZ||isQDZA||isB)?'中国工商银行广州第一支行':'中国工商银行股份有限公司深圳星河支行'}}</span>
                            <template v-if="isQDZ||isQDZA||isB">
                                <span>跨行大额支付号：1025 8100 0013</span>
                                <span>同行大额支付号：2587 3005</span>
                            </template>
                            <template v-else>
                                <span>联行号:102584004055</span>
                            </template>
                        </div>
                        <span>注:{{product.carryForwardType==1?'1.':''}}当日15：00前完成汇款，次日计息；
                            <em>15：00之后汇款，当日交易失败。</em>
                        </span>
                        <template v-if='product.carryForwardType==1'>
                            <span style="padding-left: 20px;">2.根据基金合同，广发货币
                                <template v-if="isQDZA">A</template>
                                <template v-if="isB">B</template>实行收益月结转，每月结转日前您看到的资产只包含您本金申购赎回后的净额，相关收益将在月结转日后显示，但这不影响您的实际收益。</span>
                        </template>
                    </div>
                </div>
                <div class="btns">
                    <a class="btn" @click="reser($event, 2, 0)">立即申购</a>
                    <a class="btn" @click="closeModal(2)">取消</a>
                </div>
            </div>
        </c-modal>
        <!-- 赎回 -->
        <c-modal v-if="showSell">
            <div class="sell modal-container" slot="modal-container">
                <div class="title">
                    <span>赎回</span>
                    <a class="btn" @click="closeModal(3)">
                        <i class="fa fa-times-circle-o"></i>
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <div class="row">
                        <span>选择产品：</span>
                        <a class="btn select active" @click="selectProduct($event)">{{ product.name }}</a>
                    </div>
                    <div class="row">
                        <span>选择账户：</span>
                        <select id="acct-id">
                            <option v-for="item in taInfo" :value="item.acctId">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="row">
                        <span>赎回份额：</span>
                        <!-- <input id="money" type="text" :placeholder="'最大份额：' + formatRemain+' 份'" v-model="moneyThousands" v-if="product.issueId==4" key='1'> -->
                        <input id="money" type="text" :placeholder="'最大份额：' + formatAsset +' 份'" v-model="moneyThousands">
                        <!-- <a class="btn reser-all" @click="reserAll($event, 1)">全部赎回</a> -->
                    </div>
                    <div class="row hint">
                        <span>赎回份额：</span>
                        <p v-if="product.issueId!=4">赎回后份额余额请勿低于200</p>
                        <p v-else>赎回后份额余额不得低于100万</p>
                    </div>
                </div>
                <div class="comment">
                    <div class="title">
                        <span>交易</span>
                    </div>
                    <div class="triangle"></div>
                    <div class="detail">
                        <span v-if="product.issueId!=4">注：请贵公司于当日15:00前在基金公司直销柜台完成</span>
                        <span v-else>注：请您于当日15:00前完成</span>
                        <span>
                            <em>{{ product.name }}</em>赎回交易</span>
                    </div>
                </div>
                <div class="btns" v-if="isB || isHX">
                    <div>
                        <a class="btn" @click="reser($event, 3, 0)">确认赎回</a>
                        <span>当日计算收益</span>
                    </div>
                    <div>
                        <a class="btn" @click="closeModal(3)">取消</a>
                    </div>
                </div>
                <div class="btns" v-else>
                    <div>
                        <a class="btn" @click="reser($event, 3, 1)">快速赎回</a>
                        <span>当日不计算收益</span>
                        <span v-text="isQDZ ? '单日限额5000万元' : ''"></span>
                    </div>
                    <div>
                        <a class="btn" @click="reser($event, 3, 0)">普通赎回</a>
                        <span>当日计算收益</span>
                    </div>
                </div>
            </div>
        </c-modal>
        <!-- 确权 -->
        <c-modal v-if="showAuth">
            <div class="auth modal-container" slot="modal-container">
                <div class="title">
                    <span v-text="isOTF ? '场内确权' : '场外确权'"></span>
                    <a class="btn" @click="closeModal(4)">
                        <i class="fa fa-times-circle-o"></i>
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <div class="row hint">
                        <p v-if="isOTF">每个股东账户只需确权一次，新的股东账户交易请再确权一次。（确权请在首次交易后即刻进行）</p>
                        <p v-else>每个企业/基金产品只需确权一次，新的企业/基金产品请再确权一次。（确权请在首次交易后即刻进行）</p>
                    </div>
                    <div class="row">
                        <span class="required">选择产品：</span>
                        <a id="fund-code" class="btn select active" @click="selectProduct($event)" :data-code="product.prodCode">{{ product.name }}</a>
                    </div>
                    <template v-if="isOTF">
                        <div class="row">
                            <span class="required">申购金额：</span>
                            <input id="txn-amount" type="text" placeholder="（元）" v-model="txnAmountThousands">
                        </div>
                        <div class="row">
                            <span class="required">股东账号：</span>
                            <input id="ta-account-id" type="text" placeholder="例：B123456789">
                        </div>
                        <div class="row">
                            <span class="required">交易日期：</span>
                            <input id="txn-date" type="text" data-init="0" @mouseenter="addCalender($event)">
                        </div>
                    </template>
                    <template v-else>
                        <div class="row">
                            <span class="required">开户日期：</span>
                            <input id="txn-date" type="text" data-init="0" @mouseenter="addCalender($event)">
                        </div>
                        <div class="row">
                            <span class="required">统一社会<br>信用代码：</span>
                            <input id="licence-no" type="text" placeholder="例：91230123AB1ABCD11C">
                        </div>
                        <div class="row">
                            <p class="tips">线下开户时，账户基本信息请填写统一社会信用代码</p>
                        </div>
                        <div class="row">
                            <span class="required">企业/基金<br>产品名称：</span>
                            <input id="investor-name" type="text" placeholder="例：外贸信托·锐意01期海洋证券投资">
                        </div>
                        <div class="row">
                            <p class="tips">
                                <em>注：</em>请务必正确填写上述信息，否则确权将失效。</p>
                        </div>
                    </template>
                    <div class="row err-msg">
                        <p v-if="authErrMsg">{{ authErrMsg }}</p>
                    </div>
                </div>
                <div class="btns">
                    <button class="btn" @click="confirmAcct($event, 4)" :class="{ disabled: authErrMsg }" :disabled="Boolean(authErrMsg)" data-clicked="0">确权</button>
                    <button class="btn" @click="closeModal(4)">取消</button>
                </div>
                <div class="comment">
                    <div class="detail">
                        <span>注：请贵公司于当日15:00前在
                            <em v-text="isOTF ? '场内交易系统' : '基金公司直销柜台'"></em>完成</span>
                        <span>
                            <em>{{ product.name }}</em>交易</span>
                    </div>
                </div>
            </div>
        </c-modal>
        <c-modal v-if="showCurrent">
            <div class="modal-container current " slot="modal-container">
                <div class="title">
                    <span>预约</span>
                    <a class="btn" @click="closeModal(5)">
                        <i class="fa fa-times-circle-o"></i>
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <div class="row">
                        <span class="required">选择产品：</span>
                        <a id="fund-code" class="btn select active" @click="selectProduct($event)" :data-id="product.id">{{ product.name }}</a>
                    </div>
                    <div class="row">
                        <span class="required">选择账户：</span>
                        <input id="ta-account-id" type="text" v-model='credit' :disabled='addAccount' @mouseout="formatInput($event)" @mouseover="restoreInput($event)">
                        <div class="account-list" v-if='accountList'>
                            <ul>
                                <li @click='selectAccount($event)' v-for="info in regularList">{{info}}</li>
                                <li>
                                    <a @click='addCredit'> +添加账户</a>
                                </li>
                            </ul>
                        </div>
                        <div class="list-arrow arrow-top" @click='accountList=!accountList'></div>
                    </div>
                    <div class="row">
                        <span class="required">申购金额：</span>
                        <input id="txn-amount" type="text" placeholder="（元）" v-model="txnAmountThousands">
                    </div>
                    <div class="row err-msg">
                        <p v-if="authErrMsg">{{ authErrMsg }}</p>
                    </div>
                </div>
                <div class="btns">
                    <button class="btn" @click="regularOrder(5)" :class="{ disabled: authErrMsg }" data-clicked="0">立即预约</button>
                    <button class="btn" @click="closeModal(5)">取消</button>
                </div>
            </div>
        </c-modal>
    </div>
</template>
<script>
import productService from '../../services/productService'
import bankService from '../../services/bankService'
import * as cModal from '../../components/Modal'
import number from '../../filters/subFilters/number'
import {
    eventHub,
    stringTrim,
    errorHandler
} from '../../plugins/utils'
import config from '../../config'
import Flatpickr from '../../../static/libs/flatpickr/flatpickr.min'

export default {
    components: {
        cModal
    },
    data() {
        return {
            moneyThousands: '',
            txnAmountThousands: '',
            itemList: Object.freeze([
                '我的资产-wealth',
                '产品列表-product',
                '交易记录-trade',
                '爱心值-point',
                // '系统管理-system'
            ]),
            systemList: Object.freeze([
                '企业信息-companyInfo',
                '广发基金开户-updateInfo',
                '华信现金宝开户-hxAccount',
                '账户信息-accountInfo',
                '修改密码-changePwd',
                '反馈信息-feedback',
            ]),
            rightHeight: (window.innerHeight - 324) > 422 ? (window.innerHeight - 324) : 500,
            index: 0,
            product: {
                id: 0,
                name: '',
                prodCode: '',
                issueId: 0,
                txnType: 0,
                totalAsset: 0,
                remainAmount: 0,
                marketType: 1
            },
            bankInfo: {
                bankName: '',
                shortAcctNo: '0000'
            },
            selected: '',
            taInfo: [{
                name: '',
                acctId: '',
                bankName: '',
                shortAcctNo: ''

            }],
            regularList: [],
            authErrMsg: '',
            credit: '',
            showOrderBuy: false,
            showOrderSell: false,
            showBuy: false,
            showSell: false,
            showAuth: false,
            showCurrent: false,
            accountList: false,
            addAccount: true,
            top: 0
        }
    },
    watch: {
        moneyThousands() {
            var str = this.moneyThousands;
            this.moneyThousands = this.thousand(str)
        },
        txnAmountThousands() {
            var str = this.txnAmountThousands;
            this.txnAmountThousands = this.thousand(str)
        }

    },
    computed: {
        isB() {
            // 禁用广发货币B快赎
            return this.product.prodCode == '270014';
        },
        isQDZ() {
            // 钱袋子限额
            return this.product.prodCode == '000509';
        },
        isQDZA() {
            // 广发货币A 
            return this.product.prodCode == '270004';
        },
        isOTF() {
            // 场内
            return this.product.marketType == 1;
        },
        isHX() {
            return this.product.issueId == 4;

        },
        formatAsset() {
            let value = this.product.totalAsset;
            if (!isNaN(value) && value != null) {
                let num = parseFloat(value).toFixed(2);
                let regx = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
                return num.replace(regx, "$1,");
            } else {
                return '0.00';
            }
        },
        formatRemain() {
            let value = this.product.remainAmount;
            if (!isNaN(value) && value != null) {
                let num = parseFloat(value).toFixed(2);
                let regx = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
                return num.replace(regx, "$1,");
            } else {
                return '0.00';
            }
        }
    },
    created() {
        eventHub.$on('showModal', this.showModal);
    },
    mounted() {
        this.$root.$refs.header.adjustStyle(false, 0);
    },
    beforeDestroy() {
        eventHub.$off('showModal');
    },
    methods: {
        testLay(account, product, type, kind, number, unit, fn) {
            layer.confirm('<div style="color:#666666"><p>交易账户：' + account + '</p><p>交易产品：' + product + '</p><p>交易类型：' + type + '</p><p>交易' + kind + '：' + number + unit + '</p></div>',
                {
                    title: '交易确认',
                    time: 0,
                    move: false,
                    area: ['440px', '300px'],
                },
                function(index) {
                    fn();
                    layer.close(index);
                });
        },
        thousand(num) {
            var arr = num.split(",");
            var str = arr.join('');
            var re = /\d{1,3}(?=(\d{3})+$)/g;
            var newStr = str.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
                return s1.replace(re, "$&,") + s2;
            });
            return newStr
        },
        selectProduct(e) {
            let $dom = $(e.target);
            $dom.hasClass('active') ? $dom.removeClass('active') : $dom.addClass('active');
        },
        addCalender(e) {
            let $dom = e.target;
            if ($dom.dataset.init) {
                // 加载中文
                Flatpickr.localize(require('../../../static/libs/flatpickr/flatpickr.l10n.zh.js'));
                // 加载控件
                new Flatpickr($dom, {
                    dateFormat: 'Y-m-d',
                    defaultDate: $dom.value
                });
                $dom.dataset.init = 1;
            }
        },
        selectAccount(e) {
            let [$dom, credit, _self] = [e.target, '', this];
            credit = $dom.innerHTML;
            _self.credit = credit;
            _self.accountList = false;
            _self.addAccount = true

        },
        addCredit() {
            let [_self, $dom] = [this, $("#ta-account-id")];
            _self.accountList = false;
            _self.addAccount = false;
            _self.credit = '';
            $dom.focus();
        },
        reser(e, modalType, reserType) {
            const _self = this;
            let $content = $(e.target).parents('.btns').siblings('.content');
            let $prodcut = $content.find('.select');
            let $input = $content.find('input');
            let $acctId = $content.find('#acct-id');
            let money = $input.val();
            let dataObj = this.product;
            const remaining = this.product.totalAsset - Number(money.replace(/,/g, ''));
            // const remain=this.product.remain-Number(money.replace(/,/g, ''));
            if (!$prodcut.hasClass('active')) {
                window.layer.tips('请选择产品', $prodcut);
            } else if (money.length == 0) {
                window.layer.tips('份额不能为空', $input);
            } else if (modalType == 3 && this.product.issueId == 4 && remaining < 1000000 && remaining != 0) {
                window.layer.tips('赎回后份额余额不得低于100万', $input);
            } else if (modalType == 3 && this.product.issueId != 4 && remaining < 200 && remaining != 0) {
                window.layer.tips('赎回后份额余额不得小于200', $input);

            } else if (modalType == 2 && dataObj.prodCode == '000509' && money > 20000000) {
                // 广发申购限额
                window.layer.tips('超出申购限额', $input);
            } else if (modalType == 2 && dataObj.prodCode == '270014' && money < 5000000) {
                window.layer.tips('500万起投', $input);
            } else if (modalType == 2 && dataObj.issueId == 4 && money < 1000000) {
                window.layer.tips('100万起投', $input);
            } else if (modalType == 2 && dataObj.prodCode == '270004' && money == 0) {
                window.layer.tips('申购金额应大于0', $input);
            } else if (dataObj.prodCode == '270014' && reserType == 1) {
                // 临时禁止广发货币快赎
                window.layer.msg('该产品暂未开放该功能');
            } else {
                let tradeType = modalType == 2 ? '产品申购' : '产品赎回';
                if (modalType == 3 && reserType == 0) {
                    tradeType = '产品赎回';
                } else if (modalType == 3 && reserType == 1) {
                    tradeType = '产品快速赎回';
                } else {
                    tradeType = '产品申购';
                }
                let unit = modalType == 2 ? ' 元' : ' 份';
                let kind = modalType == 2 ? '金额' : '份额';
                this.testLay($acctId.find("option:selected").text(), this.product.name, tradeType, kind, money, unit, function() {
                    money = Number(money.replace(/,/g, ''));
                    (modalType == 0 || modalType == 2) ? money = money : null;
                    (reserType == 0) ? productService.reser(dataObj.id, money, dataObj.issueId, dataObj.txnType, $acctId.val(), modalType, _self) : productService.quickWithdraw(dataObj.id, money, $acctId.val(), _self);
                    _self.closeModal(modalType);

                })

                // money = Number(money.replace(/,/g, ''));
                // (modalType == 0 || modalType == 2) ? money = money : null;
                // (reserType == 0) ? productService.reser(dataObj.id, money, dataObj.issueId, dataObj.txnType, $acctId.val(), modalType, this) : productService.quickWithdraw(dataObj.id, money, $acctId.val(), this);
                // this.closeModal(modalType);
            }
        },
        // reserAll(e, modalType) {
        //     let $content = $(e.target).parent().siblings('.row');
        //     let $prodcut = $content.find('.select');
        //     let $acctId = $content.find('#acct-id');
        //     let dataObj = this.product;
        //     let money = dataObj.totalAsset;
        //     if (!$prodcut.hasClass('active')) {
        //         window.layer.tips('请选择产品', $prodcut);
        //     } else if (money == 0) {
        //         window.layer.tips('该产品可赎回金额为0', $prodcut);
        //     } else {
        //         money = parseInt(money.toString().replace(/,/g, ''));
        //         productService.reser(dataObj.id, money, dataObj.issueId, dataObj.txnType, $acctId.val(), modalType, this);
        //         this.closeModal(modalType);
        //     }
        // },
        confirmAcct(e, modalType) {
            let [payload, _self] = [{}, this];
            if (_self.isOTF) {
                let $fundCode = document.getElementById('fund-code');
                let $taAccountId = document.getElementById('ta-account-id');
                let $txnAmount = document.getElementById('txn-amount');
                let $txnDate = document.getElementById('txn-date');
                if ($fundCode.className.indexOf('active') == -1) {
                    window.layer.tips('请选择产品', $fundCode);
                    return false;
                } else if (!stringTrim($txnAmount.value)) {
                    window.layer.tips('申购金额不能为空', $txnAmount);
                    return false;
                } else if (!stringTrim($taAccountId.value)) {
                    window.layer.tips('股东账号不能为空', $taAccountId);
                    return false;
                } else if (!stringTrim($txnDate.value)) {
                    window.layer.tips('交易时间不能为空', $txnDate);
                    return false;
                }
                payload = {
                    fundCode: $fundCode.dataset.code,
                    taAccountId: $taAccountId.value,
                    txnAmount: parseInt($txnAmount.value.toString().replace(/,/g, '')),
                    txnDate: $txnDate.value
                }
            } else {
                let $txnDate = document.getElementById('txn-date');
                let $licenceNo = document.getElementById('licence-no');
                let $investorName = document.getElementById('investor-name');
                if (!stringTrim($txnDate.value)) {
                    window.layer.tips('开户日期不能为空', $txnDate);
                    return false;
                } else if (!stringTrim($licenceNo.value)) {
                    window.layer.tips('组织机构代码不能为空', $licenceNo);
                    return false;
                } else if (!stringTrim($investorName.value)) {
                    window.layer.tips('名称不能为空', $investorName);
                    return false;
                }
                payload = {
                    txnDate: $txnDate.value,
                    licenceNo: $licenceNo.value,
                    investorName: $investorName.value
                }
            }
            _self.btnClicked(e).then(() => {
                productService.confirmAcct(payload, _self).then(() => {
                    window.layer.msg('提交成功', {
                        time: 1300
                    });
                    _self.closeModal(modalType);
                }, (errCode) => {
                    switch (errCode) {
                        case null:
                            window.layer.msg('提交失败', {
                                time: 1300
                            });
                            _self.closeModal(modalType);
                            break;
                        case 'J0011':
                            _self.authErrMsg = '已确权成功，无需二次确权！';
                            break;
                        case 'J0014':
                            _self.authErrMsg = '确权进行中，请等待确权结果...';
                            break;
                        default:
                            errorHandler(errCode);
                            _self.closeModal(modalType);
                            break;
                    }
                });
            }).then(() => {
                e.target.dataset.clicked = 0;
            });
        },
        // 定期产品预约
        regularOrder(modalType) {
            let [parm, _self] = [{}, this];
            let $fundCode = document.getElementById('fund-code');
            let $taAccountId = document.getElementById('ta-account-id');
            let $txnAmount = document.getElementById('txn-amount');
            if ($fundCode.className.indexOf('active') == -1) {
                window.layer.tips('请选择产品', $fundCode);
                return false;
            } else if (!stringTrim($taAccountId.value)) {
                window.layer.tips('请选择账户', $taAccountId);
                return false;
            } else if ($txnAmount.value == '' || $txnAmount.value == 0) {
                window.layer.tips('请输入预约金额', $txnAmount);
                return false;
            }
            parm = {
                productId: $fundCode.dataset.id,
                investorName: $taAccountId.value,
                amount: parseInt($txnAmount.value.toString().replace(/,/g, ''))

            }
            productService.regular(parm, _self);
            this.closeModal(modalType);

        },
        showModal(objData) {
            let _self = this;
            // _self.$root.popping = true;
            _self.product = objData.product;
            if (objData.modalType == 2 && objData.product.issueId == 4) {
                productService.getMaxRemain(objData.product.prodCode, _self).then((data) => {
                    _self.product.remainAmount = data.remainAmount;
                })
            }
            if (objData.product.issueId == 2 || objData.product.issueId == 4) {
                productService.getTaInfo(objData.product.issueId, _self).then((data) => {
                    _self.taInfo = data;
                    if (data && data.length > 0) {
                        let selected = data[0].acctId;
                        _self.selected = selected;

                        if (objData.getAsset && objData.product.issueId != 1 && objData.product.issueId != 3) {
                            productService.getRemain(objData.product.taAccountId?objData.product.taAccountId:selected, objData.product.id, _self).then((data) => {
                                objData.product.totalAsset = data;
                            })
                        }
                        switch (objData.modalType) {
                            case 2:
                                _self.showBuy = true;
                                break;
                            case 3:
                                _self.showSell = true;
                                break;

                        }

                    } else {
                        window.layer.msg('您暂未开户，请先开户再进行交易', { time: 2000 });
                        return false
                    }
                })
            }

            if (objData.modalType == 5) {
                productService.regularAccount(_self).then((data) => {
                    let regularList = data.resultList;
                    let arrList = [];
                    for (var i = 0; i < regularList.length; i++) {
                        arrList.push(regularList[i].investorName)
                    }
                    _self.regularList = arrList

                })

            }
            switch (objData.modalType) {
                case 0:
                    _self.showOrderBuy = true;
                    break;
                case 1:
                    _self.showOrderSell = true;
                    break;
                // case 2:
                //     _self.showBuy = true;
                //     break;
                // case 3:
                //     _self.showSell = true;
                //     break;
                case 4:
                    _self.authErrMsg = '';
                    _self.showAuth = true;
                    break;
                case 5:
                    _self.showCurrent = true;
                    break;
            }
        },
        closeModal(modalType) {
            // this.$root.popping = false;
            switch (modalType) {
                case 2:
                    this.showBuy = false;
                    this.moneyThousands = '';
                    break;
                case 3:
                    this.showSell = false;
                    this.moneyThousands = '';
                    break;
                case 4:
                    this.showAuth = false;
                    this.txnAmountThousands = '';
                    break;
                case 5:
                    this.showCurrent = false;
                    this.txnAmountThousands = '';
                    break;
            }
        },
        formatInput(e) {
            let $dom = e.target;
            $dom.blur();
            let s = $dom.value;
            if (!isNaN(s - 0) && s.length > 3) {
                let num = parseFloat(s).toFixed(2);
                let regx = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
                $dom.value = num.replace(regx, "$1,");
            }
        },
        restoreInput(e) {
            let $dom = e.target;
            $dom.focus();
            let s = $dom.value;
            if (s) {
                s = parseInt(s.replace(/,/g, ''));
            }
            $dom.value = s;
        },
        btnClicked(e) {
            return new Promise((resolve, reject) => {
                let $dom = e.target;
                if ($dom.dataset.clicked == 0) {
                    $dom.dataset.clicked = 1;
                    resolve();
                } else {
                    reject();
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/stylesheets/account/index.scss";
@import "../../../static/libs/flatpickr/flatpickr.min.css";
#txn-date {
    background: url('../../assets/images/common/calender.png') no-repeat 98% 3px;
    background-size: 22px;
}

.current {
    .select {
        &.active {
            background: url('../../assets/images/account/product/selected.png') no-repeat !important;
        }
    }
}
</style>
