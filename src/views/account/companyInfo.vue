<template>
    <div id="system">
        <div id="company-info" v-if="pageNo == 0">
            <div class="first section">
                <div class="title">
                    <span>企业基本信息</span>
                    <div class="btns">
                        <a class="edit btn" @click="editInfo()">
                            <em>编辑信息</em>
                        </a>
                    </div>
                </div>
                <div class="content">
                    <div class="row">
                        <p>企业全称:</p>
                        <p>{{ tradeInfo.orgName }}</p>
                    </div>
                    <div class="row">
                        <p>企业电话:</p>
                        <p>{{ tradeInfo.telNo }}</p>
                    </div>
                    <div class="row">
                        <p>证件类型:</p>
                        <p>{{ tradeInfo.idType | organCertType }}</p>
                    </div>
                    <template v-if="tradeInfo.idType == 0">
                        <div class="row">
                            <p>营业执照号:</p>
                            <p>{{ tradeInfo.licenceNo }}</p>
                            <a class="btn" @click="viewImg($event)" data-id="0">
                                查看附件
                                <img :src="tradeInfo.licenceFileUrl" alt="">
                            </a>
                        </div>
                        <div class="row">
                            <p>有效期:</p>
                            <p>{{ tradeInfo.licenceExpireDate | formatDate('yyyy-MM-dd') }}</p>
                        </div>
                        <div class="row">
                            <p>税务登记证号:</p>
                            <p>{{ tradeInfo.taxRegistrationNo }}</p>
                            <a class="btn" @click="viewImg($event)" data-id="1">
                                查看附件
                                <img :src="tradeInfo.registrationFileUrl" alt="">
                            </a>
                        </div>
                        <div class="row">
                            <p>组织机构代码证号:</p>
                            <p>{{ tradeInfo.organizationNo }}</p>
                            <a class="btn" @click="viewImg($event)" data-id="2">
                                查看附件
                                <img :src="tradeInfo.orgNoFileUrl" alt="">
                            </a>
                        </div>
                    </template>
                    <template v-else>
                        <div class="row">
                            <p>统一社会信用代码:</p>
                            <p>{{ tradeInfo.licenceNo }}</p>
                            <a class="btn" @click="viewImg($event)" data-id="5">
                                查看附件
                                <img :src="tradeInfo.licenceFileUrl" alt="">
                            </a>
                        </div>
                        <div class="row">
                            <p>有效期:</p>
                            <p>{{ tradeInfo.licenceExpireDate | formatDate('yyyy-MM-dd') }}</p>
                        </div>
                    </template>
                </div>
            </div>
            <div class="second section">
                <div class="title">
                    <span>法人信息</span>
                </div>
                <div class="content">
                    <div class="row">
                        <p>法人姓名:</p>
                        <p>{{ tradeInfo.corpName }}</p>
                    </div>
                    <div class="row">
                        <p>证件号码:</p>
                        <p>{{ tradeInfo.corpIdNo }}</p>
                        <a class="btn" @click="viewImg($event)" data-id="3">
                            查看附件
                            <img :src="tradeInfo.corpIdFileUrl" alt="">
                        </a>
                    </div>
                    <div class="row">
                        <p>有效期:</p>
                        <p>{{ tradeInfo.corpIdExpireDate | formatDate('yyyy-MM-dd') }}</p>
                    </div>
                </div>
            </div>
            <div class="third section">
                <div class="title">
                    <span>银行信息</span>
                </div>
                <div class="content">
                    <div class="row">
                        <p>开户银行:</p>
                        <p>{{ tradeInfo.bankName }}</p>
                    </div>
                    <div class="row">
                        <p>开户银行支行名称:</p>
                        <p>{{ tradeInfo.branchBankName }}</p>
                    </div>
                    <div class="row">
                        <p>银行户名:</p>
                        <p>{{ tradeInfo.acctName }}</p>
                        <a class="btn" @click="viewImg($event)" data-id="4">
                            查看附件
                            <img :src="tradeInfo.bankOpenAcctPermitFileUrl" alt="">
                        </a>
                    </div>
                    <div class="row">
                        <p>银行账户</p>
                        <p>{{ tradeInfo.acctNo }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="update-info" v-if="pageNo == 1">
            <div class="content">
                <div class="first section">
                    <div class="title">
                        <p>企业信息</p>
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="left"><span>企业全称:</span></div>
                            <div class="middle">
                                <input id="name" type="text" v-model="tradeInfos.orgName">
                            </div>
                            <div class="right"><span></span></div>
                        </div>
                        <div class="row">
                            <div class="left"><span>企业电话（手机号）:</span></div>
                            <div class="middle">
                                <input id="mobile" type="tel" v-model="tradeInfos.telNo">
                            </div>
                            <div class="right"><span></span></div>
                        </div>
                        <div class="row">
                            <div class="left"><span>证件类型:</span></div>
                            <div class="middle">
                                <button :class="{ active: oneCode }" @click="changeType($event)">三证一码</button>
                                <button :class="{ active: !oneCode }" @click="changeType($event)">三证三码</button>
                            </div>
                            <div class="right"></div>
                        </div>
                        <template v-if="oneCode">
                            <div class="row">
                                <div class="left"><span>统一社会信用代码:</span></div>
                                <div class="middle">
                                    <input id="licence-no" type="text" v-model="tradeInfos.licenceNo">
                                </div>
                                <div class="right">
                                    <a href="javascript:;" class="upload">
                                        <input id="licence-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.licenceFileUrl">上传扫描件
                                    </a>
                                    <span></span>
                                    <i class="fa fa-check-circle"></i>
                                </div>
                            </div>
                            <div class="row">
                                <div class="left"><span>有效期至:</span></div>
                                <div class="middle">
                                    <input v-if="tradeInfos.licenceExpireDate!=null && timeFormat(tradeInfos.licenceExpireDate, 'yyyy-MM-dd').length==10" id="licence-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" :value="timeFormat(tradeInfos.licenceExpireDate, 'yyyy-MM-dd')">
                                    <input v-else id="licence-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" v-model="tradeInfos.licenceExpireDate">
                                </div>
                                <div class="right">
                                    <i class="fa fa-calendar"></i>
                                    <i id="licence-valid" class="fa fa-square-o" @click="changeState"></i>
                                    <span>长期有效</span>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="row">
                                <div class="left"><span>营业执照号:</span></div>
                                <div class="middle">
                                    <input id="licence-no" type="text" v-model="tradeInfos.licenceNo">
                                </div>
                                <div class="right">
                                    <a href="javascript:;" class="upload">
                                        <input id="licence-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.licenceFileUrl">上传扫描件
                                    </a>
                                    <span></span>
                                    <i class="fa fa-check-circle"></i>
                                </div>
                            </div>
                            <div class="row">
                                <div class="left"><span>有效期至:</span></div>
                                <div class="middle">
                                    <input v-if="tradeInfos.licenceExpireDate!=null && timeFormat(tradeInfos.licenceExpireDate, 'yyyy-MM-dd').length==10" id="licence-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" :value="timeFormat(tradeInfos.licenceExpireDate, 'yyyy-MM-dd')">
                                    <input v-else id="licence-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" v-model="tradeInfos.licenceExpireDate"> </div>
                                <div class="right">
                                    <i class="fa fa-calendar"></i>
                                    <i id="licence-valid" class="fa fa-square-o" @click="changeState"></i>
                                    <span>长期有效</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="left"><span>税务登记证号:</span></div>
                                <div class="middle">
                                    <input id="tax-registration-no" type="tel" v-model="tradeInfos.taxRegistrationNo">
                                </div>
                                <div class="right">
                                    <a href="javascript:;" class="upload">
                                        <input id="tax-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.registrationFileUrl">上传扫描件
                                    </a>
                                    <span></span>
                                    <i class="fa fa-check-circle"></i>
                                </div>
                            </div>
                            <div class="row">
                                <div class="left"><span>组织机构代码证号:</span></div>
                                <div class="middle">
                                    <input id="organization-no" type="tel" v-model="tradeInfos.organizationNo">
                                </div>
                                <div class="right">
                                    <a href="javascript:;" class="upload">
                                        <input id="orgn-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.orgNoFileUrl">上传扫描件
                                    </a>
                                    <span></span>
                                    <i class="fa fa-check-circle"></i>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="second section">
                    <div class="title">
                        <p>法人信息</p>
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="left"><span>法人姓名:</span></div>
                            <div class="middle">
                                <input id="corpname" type="text" v-model="tradeInfos.corpName">
                            </div>
                            <div class="right"></div>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>证件号码:</span>
                            </div>
                            <div class="middle">
                                <select id="corpid-type">
                                    <option value="0">身份证</option>
                                </select>
                                <input id="corpid-no" type="text" v-model="tradeInfos.corpIdNo">
                            </div>
                            <div class="right">
                                <a href="javascript:;" class="upload">
                                    <input id="corpid-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.corpIdFileUrl">上传扫描件
                                </a>
                                <span></span>
                                <i class="fa fa-check-circle"></i>
                            </div>
                        </div>
                        <div class="row">
                            <div class="left"><span>有效期至:</span></div>
                            <div class="middle">
                                <input v-if="tradeInfos.corpIdExpireDate!=null && timeFormat(tradeInfos.corpIdExpireDate, 'yyyy-MM-dd').length==10" id="corpid-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" :value="timeFormat(tradeInfos.corpIdExpireDate, 'yyyy-MM-dd')">
                                <input v-else id="corpid-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" v-model="tradeInfos.corpIdExpireDate"> </div>
                            <div class="right">
                                <i class="fa fa-calendar"></i>
                                <i id="corpid-valid" class="fa fa-square-o" @click="changeState"></i>
                                <span>长期有效</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="third section">
                    <div class="title">
                        <p>银行信息</p>
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="left"><span>开户银行:</span></div>
                            <div class="middle">
                                <select id="bankname">
                                    <template v-for="item in transferBankList">
                                        <option v-if="item.bankName == tradeInfo.bankName" :data-no="item.bankNo" :data-type="item.bankType" selected>{{ item.bankName }}</option>
                                        <option v-else :data-no="item.bankNo" :data-type="item.bankType">{{ item.bankName }}</option>
                                    </template>
                                </select>
                            </div>
                            <div class="right"></div>
                        </div>
                        <div class="row">
                            <div class="left"><span>支行名称:</span></div>
                            <div class="middle">
                                <input id="branch-bankname" type="text" v-model="tradeInfos.branchBankName" @input="getBranchBank($event)">
                                <ul id="branch-banklist" v-if="showBranchBank">
                                    <template v-for="item in branchBankList">
                                        <li :data-no="item.payBranchnNo" @click="inputBranchBank($event)">{{ item.bankFullName }}</li>
                                    </template>
                                </ul>
                            </div>
                            <div class="right">
                                <span>*例：输入“漕河泾支行”</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="left"><span>联行号:</span></div>
                            <div class="middle">
                                <input id="branch-bankno" type="text" v-model="tradeInfos.branchBankNo" disabled>
                            </div>
                            <div class="right"></div>
                        </div>
                        <div class="row">
                            <div class="left"><span>银行户名:</span></div>
                            <div class="middle">
                                <input id="acctname" type="text" v-model="tradeInfos.acctName">
                            </div>
                            <div class="right"></div>
                        </div>
                        <div class="row">
                            <div class="left"><span>银行账户:</span></div>
                            <div class="middle">
                                <input id="acctno" type="text" v-model="tradeInfos.acctNo">
                            </div>
                            <div class="right">
                                <a href="javascript:;" class="upload">
                                    <input id="bank-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.bankOpenAcctPermitFileUrl">上传扫描件
                                </a>
                                <span></span>
                                <i class="fa fa-check-circle"></i>
                            </div>
                        </div>
                        <div class="row bank-url">
                            <span>
                                <em>* 基本户，提供《开户许可证》</em>
                                <em>* 一般户，提供《开户单位银行结算账户申请书》</em>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="fourth section">
                    <div class="title"></div>
                    <div class="content">
                        <div class="row">
                            <div class="left"></div>
                            <div class="middle">
                                <a class="cancel btn" @click="cancel">取消</a>
                                <a class="submit btn" @click="submit">提交</a>
                            </div>
                            <div class="right"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bankService from '../../services/bankService'
import commonService from '../../services/commonService'
import {
    dateFormat,
    logger
} from '../../plugins/utils'
import Viewer from '../../../static/libs/viewer/viewer.min'
import Flatpickr from '../../../static/libs/flatpickr/flatpickr.min'

export default {
    data() {
            return {
                pageNo: 0,
                oneCode: true,
                transferBankList: [],
                branchBankList: [],
                showBranchBank: false,
                tradeInfos: {
                    orgName:'',
                    orgNo: '',
                    telNo: '',
                    idType: '',
                    licenceNo: '',
                    licenceExpireDate: '--',
                    taxRegistrationNo: '',
                    registrationFileUrl: '',
                    organizationNo: '',
                    orgNoFileUrl: '',
                    bdTel: '',
                    bdName: '',
                    corpName: '',
                    corpIdType: '',
                    corpIdNo: '',
                    corpIdFileUrl: '',
                    corpIdExpireDate: '--',
                    bankName: '',
                    branchBankName: '',
                    acctName: '',
                    acctNo: '',
                    bankOpenAcctPermitFileUrl: ''
                },
                viewer: {
                    id: '',
                    obj: {}
                }
            }
        },
        computed: {
            tradeInfo() {
                this.tradeInfos = this.$store.getters.getTradeInfo;
                return this.$store.getters.getTradeInfo
            }
        },
        created() {
            this.$store.dispatch('fetchTradeInfo');
        },
        watch: {
            // tradeInfo: {
            //     handler(val) {
            //     console.log("!!!")

            //         if (val.idType == 0) {
            //             this.oneCode = false;
            //         }
            //     },
            //     deep: true
            // },
            pageNo: {
                handler(val) {
                    switch (val) {
                        case 0:
                            this.$store.dispatch('fetchTradeInfo');
                            break;
                        case 1:
                            this.getTransferBank();
                            break;
                        default:
                            break;
                    }
                },
                deep: true
            }
        },
        methods: {
            timeFormat(value, format) {
                return dateFormat(value, format);
            },
            editInfo() {
                this.pageNo = 1;
                if (this.tradeInfos.idType == 0) {
                    this.oneCode = false;
                }

            },
            viewImg(e) {
                const url = e.target.lastChild.src;
                const id = e.target.dataset.id;
                if (id != this.viewer.id) {
                    this.viewer.id = id;
                    this.viewer.obj = new Viewer(e.target);
                }
                (url) ? this.viewer.obj.show(): window.layer.msg('没有附件!');
            },
            changeType(e) {
                let $dom = $(e.target);
                if (!$dom.hasClass('active')) {
                    this.oneCode = !this.oneCode;
                }
            },
            changeState(e) {
                let $this = this;
                let $dom = $(e.target);
                let idName = $dom.context.id;
                if (!$dom.hasClass('active')) {
                    $dom[0].className = 'fa fa-check-square-o';
                    $dom.addClass('active').parent().siblings('.middle').find('input').val('').attr('disabled', 'disabled');
                    if (idName == 'licence-valid') {
                        $this.tradeInfos.licenceExpireDate = $dom.val()

                    } else if (idName == 'corpid-valid') {
                        $this.tradeInfos.corpIdExpireDate = $dom.val()

                    }

                } else {
                    $dom[0].className = 'fa fa-square-o';
                    $dom.parent().siblings('.middle').find('input').removeAttr('disabled');
                }
            },
            uploadImg(e) {
                let $this = this;
                let $dom = $(e.target);
                let file = $dom[0].files[0];
                let idName = $dom.context.id;
                let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'];
                let formData = new FormData();
                if (file) {
                    if (supportedTypes.indexOf(file.type) >= 0) {
                        formData.append('file', file);
                        commonService.uploadImage(formData, this).then((data) => {
                            if (idName == 'licence-url') {
                                $this.tradeInfos.licenceFileUrl = data
                            } else if (idName == 'tax-url') {
                                $this.tradeInfos.registrationFileUrl = data
                            } else if (idName == 'orgn-url') {
                                $this.tradeInfos.orgNoFileUrl = data
                            } else if (idName == 'ta-url') {
                                $this.tradeInfos.taRegCerFileUrl = data
                            } else if (idName == 'corpid-url') {
                                $this.tradeInfos.corpIdFileUrl = data
                            } else if (idName == 'bank-url') {
                                $this.tradeInfos.bankOpenAcctPermitFileUrl = data
                            }
                            // $dom[0].dataset.src = data;
                            $dom.parent().siblings('i').show();
                        }, () => {
                            $dom.innerHTML = '';
                            window.layer.msg('图片上传失败');
                        })
                    } else {
                        $dom.val('');
                        window.layer.msg('文件格式只支持：jpg、jpeg 和 png');
                    }
                } else {
                    logger.warn('未选择任何文件');
                }
            },
            addCalender(e) {
                let $this = this;

                let $dom = $(e.target);
                let idName = $dom.context.id;

                if ($dom.data('first')) {
                    // 加载中文
                    Flatpickr.localize(require('../../../static/libs/flatpickr/flatpickr.l10n.zh.js'));
                    // 加载控件
                    new Flatpickr($dom[0], {
                        dateFormat: 'Y-m-d',
                        defaultDate: $dom.val(),
                        onChange: function() {
                            if (idName == 'licence-expiredate') {
                                $this.tradeInfos.licenceExpireDate = $dom.val()
                            } else if (idName == 'corpid-expiredate') {
                                $this.tradeInfos.corpIdExpireDate = $dom.val()
                            }
                        }
                    });
                    $dom.data('first', false);
                }
            },
            getTransferBank() {
                let _self = this;
                bankService.getTransferBank(_self).then((data) => {
                    _self.transferBankList = data;
                })
            },
            getBranchBank(e) {
                let [q, bankType, _self] = [e.target.value, $('#bankname').find('option:selected').data('type'), this];
                _self.tradeInfo.branchBankName = q;
                if (q.length >= 2 && /^[\u4e00-\u9fa5]+$/i.test(q)) {
                    bankService.getBranchBank(bankType, q, _self).then((data) => {
                        _self.branchBankList = data;
                        _self.showBranchBank = true;
                    })
                } else if (q.length == 0) {
                    _self.showBranchBank = false;
                }
            },
            inputBranchBank(e) {
                let $dom = e.target;
                this.tradeInfos.branchBankName = $dom.innerText;
                this.tradeInfos.branchBankNo = $dom.dataset.no;
                this.showBranchBank = false;
            },
            cancel() {
                location.reload(true);
            },
            submit() {
                let $name = document.getElementById('name');
                let $mobile = document.getElementById('mobile');
                let $licenceNo = document.getElementById('licence-no');
                let $licenceUrl = document.getElementById('licence-url');
                let $licenceExpiredate = document.getElementById('licence-expiredate');
                let $taxNo = document.getElementById('tax-registration-no');
                let $taxUrl = document.getElementById('tax-url');
                let $orgnNo = document.getElementById('organization-no');
                let $orgnUrl = document.getElementById('orgn-url');
                let $corpName = document.getElementById('corpname');
                let $corpidType = document.getElementById('corpid-type');
                let $corpidNo = document.getElementById('corpid-no');
                let $corpidUrl = document.getElementById('corpid-url');
                let $corpidExpiredate = document.getElementById('corpid-expiredate');
                let $bankName = document.getElementById('bankname');
                let $branchBank = document.getElementById('branch-bankname');
                let $branchBankNo = document.getElementById('branch-bankno');
                let $acctName = document.getElementById('acctname');
                let $acctNo = document.getElementById('acctno');
                let $bankUrl = document.getElementById('bank-url');
                let payload = {
                    orgName: $name.value,
                    telNo: $mobile.value,
                    idType: 1,
                    licenceNo: $licenceNo.value,
                    licenceFileUrl: $licenceUrl.dataset.src,
                    licenceExpireDate: $licenceExpiredate.value,
                    taxRegistrationNo: '',
                    registrationFileUrl: '',
                    organizationNo: '',
                    orgNoFileUrl: '',
                    corpName: $corpName.value,
                    corpIdType: $corpidType.options[$corpidType.selectedIndex].value,
                    corpIdNo: $corpidNo.value,
                    corpIdFileUrl: $corpidUrl.dataset.src,
                    corpIdExpireDate: $corpidExpiredate.value,
                    bankName: $bankName.options[$bankName.selectedIndex].text,
                    bankNo: $bankName.options[$bankName.selectedIndex].dataset.no,
                    bankType: $bankName.options[$bankName.selectedIndex].dataset.type,
                    branchBankName: $branchBank.value,
                    branchBankNo: $branchBankNo.value,
                    acctName: $acctName.value,
                    acctNo: $acctNo.value,
                    bankOpenAcctPermitFileUrl: $bankUrl.dataset.src
                };
                if (!this.oneCode) {
                    payload.idType = 0;
                    payload.taxRegistrationNo = $taxNo.value;
                    payload.registrationFileUrl = $taxUrl.dataset.src;
                    payload.organizationNo = $orgnNo.value;
                    payload.orgNoFileUrl = $orgnUrl.dataset.src;
                }
                commonService.submitTradeInfo(0, payload, this);
            }
        }
}
</script>
<style lang="scss" scoped>
@import "../../assets/stylesheets/account/companyInfo.scss";
@import "../../../static/libs/viewer/viewer.min.css";
</style>
