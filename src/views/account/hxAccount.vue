<template>
    <div id="system">
        <div id="update-info">
            <div class="top">
                <div class="left">
                    <span>华信资管开户</span>
                </div>
                <div class="right">
                    <a class="btn" :class="{ active: urlType == 1 }" @click="urlType = 1">
                        产品开户
                        <em v-if="urlType == 1">*客户以所管理产品的名义开户</em>
                    </a>
                    <a class="btn" :class="{ active: urlType == 3 }" @click="urlType = 3">
                        企业开户
                        <em v-if="urlType == 3">*客户以自身企业名义开户</em>
                    </a>
                </div>
            </div>
            <div class="content">
                <div class="title">
                    <span v-text="urlType == 1 ? '产品开户' : '企业开户'"></span>
                    <div class="btns">
                        <a class="show-tips btn" @click="showHint()">开户提示</a>
                        <!-- <a class="change-bank btn" @click="changeBank = !changeBank">{{ changeBank ? '展示所有信息' : '银行信息变更' }}</a> -->
                    </div>
                </div>
                <div class="first section" v-if="!changeBank">
                    <div class="title">
                        <p v-text="urlType == 1 ? '产品信息' : '企业信息'"></p>
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
                            <div class="left"><span>企业电话:</span></div>
                            <div class="middle">
                                <input id="mobile" type="tel" v-model="tradeInfos.telNo">
                            </div>
                            <div class="right"><span></span></div>
                        </div>
                        <div class="row">
                            <div class="left"><span>企业地址 :</span></div>
                            <div class="middle">
                                <input id="organAddress" type="tel" v-model="tradeInfos.organAddress">
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
                                <span class="tips">注：使用产品开户时，需填写基金管理人公司代码</span>
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
                            <!-- <div class="row">
                                <span class="tips">注：使用产品开户时，需填写基金管理人公司代码</span>
                            </div>
 -->                            <div class="row">
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
                        
                            <div class="row">
                                <div class="left"><span>基金产品名称:</span></div>
                                <div class="middle">
                                    <input id="investor-name" type="text" placeholder="请输入基金产品名称" v-model="tradeInfos.investorName">
                                </div>
                                <div class="right"></div>
                            </div>
                            <div class="row">
                                <div class="left"><span>产品备案文件:</span></div>
                                <div class="middle">
                                    <input disabled>
                                </div>
                                <div class="right">
                                    <a href="javascript:;" class="upload">
                                        <input id="ta-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.taRegCerFileUrl">上传扫描件
                                    </a>
                                    <span></span>
                                    <i class="fa fa-check-circle"></i>
                                </div>
                            </div>
                            <template v-if="urlType == 1">
                            <div class="row">
                                <div class="left"><span>委托授权书:</span></div>
                                <div class="middle">
                                    <input disabled>
                                </div>
                                <div class="right">
                                    <a href="javascript:;" class="upload">
                                        <input id="attorney-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.taPowerAttorneyFileUrl">上传扫描件
                                    </a>
                                    <span></span>
                                    <i class="fa fa-check-circle"></i><a href="http://www.51jigoubao.com/jgb-download/gfPowerAttorney.zip" class="download">
                                        下载模板
                                    </a>
                                </div>
                            </div>
                            </template>
                    </div>
                </div>
                <div class="second section" v-if="!changeBank">
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
                                <input v-else id="corpid-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" v-model="tradeInfos.corpIdExpireDate">
                            </div>
                            <div class="right">
                                <i class="fa fa-calendar"></i>
                                <i id="corpid-valid" class="fa fa-square-o" @click="changeState"></i>
                                <span>长期有效</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <template v-if="urlType == 1"> -->
                <template>
                    <div class="second section" v-if="!changeBank">
                        <div class="title">
                            <p>管理员信息</p>
                        </div>
                        <div class="content">
                            <div class="row">
                                <div class="left"><span>管理员姓名:</span></div>
                                <div class="middle">
                                    <input id="contactname" type="text" v-model="tradeInfos.taContactName">
                                </div>
                                <div class="right"></div>
                            </div>
                            <div class="row">
                                <div class="left"><span>管理员邮箱:</span></div>
                                <div class="middle">
                                    <input id="taContactEml" type="text" v-model="tradeInfos.taContactEml">
                                </div>
                                <div class="right"></div>
                            </div>
                            <div class="row">
                                <div class="left"><span>管理员手机号:</span></div>
                                <div class="middle">
                                    <input id="contacttel" type="text" v-model="tradeInfos.taContactTel">
                                </div>
                                <div class="right">
                                     <button :class="['btn']" @click="sendSms($event)" v-if="time==60">发送验证码</button>
                                    <button :class="['btn','disabled']" v-else>{{time}}s后重发</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="left"><span>验证码:</span></div>
                                <div class="middle">
                                    <input id="regcode" type="text" :disabled="codeDisabled" v-model="tradeInfos.regcode">
                                </div>
                                <div class="right"></div>
                            </div>
                            <div class="row">
                                <div class="left">
                                    <span>证件号码:</span>
                                </div>
                                <div class="middle">
                                    <select id="contact-type">
                                        <option value="0">身份证</option>
                                    </select>
                                <input id="contact-no" type="text" v-model="tradeInfos.taContactIdNo">
                                </div>
                                <div class="right">
                                    <a href="javascript:;" class="upload">
                                        <input id="contact-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.taContactIdFileUrl">上传扫描件
                                    </a>
                                    <span></span>
                                    <i class="fa fa-check-circle"></i>
                                </div>
                            </div>
                            <div class="row">
                                <div class="left"><span>有效期至:</span></div>
                                <div class="middle">
                                    <input v-if="tradeInfos.taContactExpireDate!=null && timeFormat(tradeInfos.taContactExpireDate, 'yyyy-MM-dd').length==10" id="contact-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" :value="timeFormat(tradeInfos.taContactExpireDate, 'yyyy-MM-dd')">
                                    <input v-else id="contact-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" v-model="tradeInfos.taContactExpireDate">
                                </div>
                                <div class="right">
                                    <i class="fa fa-calendar"></i>
                                    <i id="contact-valid" class="fa fa-square-o" @click="changeState"></i>
                                    <span>长期有效</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
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
                            <div class="left"><span>开户行所在地:</span></div>
                            <div class="middle">
                                <input id="bankAddress" type="text" v-model="tradeInfos.bankAddress">
                            </div>
                            <div class="right">
                                <!-- <a href="javascript:;" class="upload">
                                    <input id="bank-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.bankOpenAcctPermitFileUrl">上传扫描件
                                </a>
                                <span></span>
                                <i class="fa fa-check-circle"></i> -->
                            </div>
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
                        <div class="row" v-if="!changeBank">
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
                                <a class="submit btn" @click="submit" v-if="!changeBank">提交</a>
                                <a class="submit btn" @click="modifyBankInfo" v-else>提交</a>
                            </div>
                            <div class="right"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <c-modal v-if="showKhModal">
            <div class="kh-tips modal-container" slot="modal-container">
                <div class="title">
                    <span>开户提示</span>
                    <a class="btn" @click="hideHint()">
                        <i class="fa fa-times-circle-o"></i>
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <div class="first section">
                        <span>感谢选择机构宝</span>
                        <span>为了让您顺利完成网上开户，请确认您已准备好一下材料</span>
                    </div>
                    <div class="second section">
                        <div class="row">
                            <em></em>
                            <span>营业执照扫描件（如原件扫描无需公章，如复印件扫描需加盖公章）</span>
                        </div>
                        <div class="row" v-if="urlType != 1">
                            <em></em>
                            <span>开户许可证或开立银行账户申请表（如原件扫描无需公章，如复印件扫描需加盖公章）</span>
                        </div>
                        <div class="row" v-else>
                            <em></em>
                            <span>托管行出具的开户证明文件的原件彩色扫描件（如原件扫描无需公章，如复印件扫描需加盖公章)</span>
                        </div>
                        <div class="row">
                            <em></em>
                            <span>法人身份证扫描件（如正反面扫描，需加盖公章）</span>
                        </div>
                        <template v-if="urlType == 1">
                            <div class="row">
                                <em></em>
                                <span>加盖公章及法人印鉴的《业务授权委托书》<a href="http://www.51jigoubao.com/jgb-download/gfPowerAttorney.zip">下载模板</a></span>
                            </div>
                            <div class="row">
                                <em></em>
                                <span>监管部门出具的备案函，需加盖公章</span>
                            </div>
                        </template>
                    </div>
                    <div class="third section">
                        <span>如您的公司还未三证合一，请额外提供<em>税务登记证</em>与<em>组织机构代码证</em>扫描件，如原件扫描无需公章，如复印件扫描需加盖公章</span>
                        <span>文件格式：jpeg、jpg、png、bmp，单个文件大小不超过5M</span>
                        <span><em>如有疑问，请拨打客服电话：{{ serveTel }}</em></span>
                    </div>
                </div>
                <div class="btns">
                    <a class="btn" @click="hideHint()">知道了</a>
                </div>
            </div>
        </c-modal>
    </div>
</template>
<script>
import userService from '../../services/userService'
import bankService from '../../services/bankService'
import commonService from '../../services/commonService'
import * as cModal from '../../components/Modal'
import {
    dateFormat,
    stringTrim,
    storageManager,
    logger
} from '../../plugins/utils'
import config from '../../config'
import Flatpickr from '../../../static/libs/flatpickr/flatpickr.min'

export default {
    components: {
        cModal
    },
    data() {
        return {
            time:60,
            urlType: 1,
            oneCode: true,
            showKhModal: false,
            changeBank: false,
            branchBankList: [],
            transferBankList: [],
            showBranchBank: false,
            serveTel: config.info.serveTel,
            codeDisabled:true,
            tradeInfos: {
                orgNo: '',
                telNo: '',
                idType: '',
                organAddress:'',
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
                bankAddress:'',
                bankOpenAcctPermitFileUrl: '',
                taPowerAttorneyFileUrl: '',
                taContactName: '',
                taContactIdType: '0',
                taContactIdNo: '',
                taContactEml:'',
                taContactTel: '',
                regcode:'',
                taContactIdFileUrl: '',
                taContactExpireDate: '--'

            },
        }

    },
    computed: {
        tradeInfo() {
            this.tradeInfos = this.$store.getters.getTradeInfo;
            if (this.tradeInfos.idType == 0) {
                this.oneCode = false;
            }
            return this.$store.getters.getTradeInfo
        }
    },
    activated() {
        this.$store.dispatch('fetchTradeInfo');
        this.getTransferBank();
    },
    // watch: {
    //     tradeInfos: {
    //         handler(val) {
    //             if (val.idType == 0) {
    //                 this.oneCode = false;
    //             }
    //         },
    //         deep: true
    //     }
    // },
    methods: {
        timeFormat(value, format) {
            return dateFormat(value, format);
        },
        showHint() {
            this.showKhModal = true;
            this.$root.popping = true;

        },
        hideHint() {
            this.showKhModal = false;
            this.$root.popping = false;

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

                }else if (idName == 'contact-valid') {
                    $this.tradeInfos.taContactExpireDate = $dom.val()
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
                        } else if (idName == 'attorney-url') {
                            $this.tradeInfos.taPowerAttorneyFileUrl = data
                        }else if (idName == 'contact-url') {
                            $this.tradeInfos.taContactIdFileUrl = data
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
                        }else if(idName == 'contact-expiredate'){
                            $this.tradeInfos.taContactExpireDate = $dom.val()
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
        modifyBankInfo() {
            let $bankName = document.getElementById('bankname');
            let $branchBankNo = document.getElementById('branch-bankno');
            let $acctNo = document.getElementById('acctno');
            let $bankUrl = document.getElementById('bank-url');
            bankService.modifyBankInfo($bankName.options[$bankName.selectedIndex].dataset.no, $branchBankNo.value, $acctNo.value, $bankUrl.dataset.src, this);
        },
        submit() {
            let $name = document.getElementById('name');
            let $mobile = document.getElementById('mobile');
            let $organAddress = document.getElementById('organAddress');
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
            let $investorName = document.getElementById('investor-name');
            let $taUrl = document.getElementById('ta-url');
            let $attorneyUrl = document.getElementById('attorney-url');
            let $bankName = document.getElementById('bankname');
            let $branchBank = document.getElementById('branch-bankname');
            let $branchBankNo = document.getElementById('branch-bankno');
            let $acctName = document.getElementById('acctname');
            let $acctNo = document.getElementById('acctno');
            let $bankUrl = document.getElementById('bank-url');
            let $bankAddress = document.getElementById('bankAddress');
            let $contactName = document.getElementById('contactname');
            let $taContactEml = document.getElementById('taContactEml');
            let $contactTel = document.getElementById('contacttel');
            let $regcode = document.getElementById('regcode');
            let $contactType = document.getElementById('contact-type');
            let $contactNo = document.getElementById('contact-no');
            let $contactUrl = document.getElementById('contact-url');
            let $contactExpiredate = document.getElementById('contact-expiredate');
            let payload = {
                acctType:'01',
                issueId:4,
                 orgName: $name.value,
                telNo: $mobile.value,
                organAddress:$organAddress.value,
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
                bankAddress:$bankAddress.value,
                acctName: $acctName.value,
                acctNo: $acctNo.value,
                bankOpenAcctPermitFileUrl: $bankUrl.dataset.src,
                taContactName:$contactName.value,
                taContactTel:$contactTel.value,
                regcode:$regcode.value,
                taContactEml:$taContactEml.value,
                taContactIdType:$contactType.value,
                taContactIdNo:$contactNo.value,
                taContactIdFileUrl:$contactUrl.dataset.src,
                taContactExpireDate:$contactExpiredate.value,
                investorName:$investorName.value,
                taRegCerFileUrl :$taUrl.dataset.src,


            };
            if (!this.oneCode) {
                payload.idType = 0;
                payload.taxRegistrationNo = $taxNo.value;
                payload.registrationFileUrl = $taxUrl.dataset.src;
                payload.organizationNo = $orgnNo.value;
                payload.orgNoFileUrl = $orgnUrl.dataset.src;
            }
            if (this.urlType == 1) {
                payload.acctType='1';
               payload.taPowerAttorneyFileUrl=$attorneyUrl.dataset.src
            }else{
                payload.acctType='0'
            }
            commonService.submitTradeInfo(this.urlType, payload, this);
        },
        sendSms (e) {
                let _self = this;
                let $mobileNo = document.getElementById('contacttel');
                if (!stringTrim($mobileNo.value)) {
                    window.layer.tips('手机号码不能为空', $mobileNo);
                } else {
                    _self.codeDisabled=false,
                    commonService.hxSendSms($mobileNo.value, _self).then(() => {
                        _self.countDown(e.target);
                    });
                }
            },
            countDown (dom) {
                let _self = this;
                if (_self.time == 0) {
                    _self.time = 60;
                    return;
                } else {
                    _self.time--;
                }
                setTimeout(function () {
                    _self.countDown(dom);
                }, 1000);
            },
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/stylesheets/account/updateInfo.scss";
</style>
