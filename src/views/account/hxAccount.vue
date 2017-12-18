<template>
    <div id="system">
        <div id="update-info">
            <div class="top">
                <div class="left">
                    <span>华信现金宝开户</span>
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
                            <div class="left">
                                <span>企业全称:</span>
                            </div>
                            <div class="middle">
                                <input id="name" placeholder="请输入企业全称" type="text" v-model="tradeInfos.orgName">
                            </div>
                            <div class="right">
                                <span></span>
                            </div>
                        </div>
                        <div class="row" v-if="urlType==3">
                            <div class="left">
                                <span>企业简称:</span>
                            </div>
                            <div class="middle">
                                <input id="shortName" type="text" placeholder="请输入四个汉字的企业简称" maxlength="4" v-model="tradeInfos.shortName">
                            </div>
                            <div class="right">
                                <span></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>企业电话:</span>
                            </div>
                            <div class="middle">
                                <input id="mobile" type="tel" v-model="tradeInfos.telNo">
                            </div>
                            <div class="right">
                                <span></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>企业地址 :</span>
                            </div>
                            <div class="middle">
                                <input id="organAddress" type="tel" v-model="tradeInfos.organAddress">
                            </div>
                            <div class="right">
                                <span></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>证件类型:</span>
                            </div>
                            <div class="middle">
                                <button :class="{ active: oneCode }" @click="changeType($event)">三证一码</button>
                                <button :class="{ active: !oneCode }" @click="changeType($event)">三证三码</button>
                            </div>
                            <div class="right"></div>
                        </div>
                        <template v-if="oneCode">
                            <div class="row">
                                <div class="left">
                                    <span>统一社会信用代码:</span>
                                </div>
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
                                <span class="tips">注：使用产品开户时，需填写产品管理人公司的统一社会信用代码</span>
                            </div>
                            <div class="row">
                                <div class="left">
                                    <span>有效期至:</span>
                                </div>
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
                                <div class="left">
                                    <span>营业执照号:</span>
                                </div>
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
                            <div class="row" v-if="urlType==1">
                                <span class="tips">注：使用产品开户时，需填写产品管理人公司的统一社会信用代码</span>
                            </div>
                            <div class="row">
                                <div class="left">
                                    <span>有效期至:</span>
                                </div>
                                <div class="middle">
                                    <input v-if="tradeInfos.licenceExpireDate!=null && timeFormat(tradeInfos.licenceExpireDate, 'yyyy-MM-dd').length==10" id="licence-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" :value="timeFormat(tradeInfos.licenceExpireDate, 'yyyy-MM-dd')" key="1111">
                                    <input v-else id="licence-expiredate" type="text" data-first="true" @mouseenter="addCalender($event)" v-model="tradeInfos.licenceExpireDate" key="222"> </div>
                                <div class="right">
                                    <i class="fa fa-calendar"></i>
                                    <i id="licence-valid" class="fa fa-square-o" @click="changeState"></i>
                                    <span>长期有效</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="left">
                                    <span>税务登记证号:</span>
                                </div>
                                <div class="middle">
                                    <input id="tax-registration-no" type="tel" v-model="tradeInfos.taxRegistrationNo" key="333">
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
                                <div class="left">
                                    <span>组织机构代码证号:</span>
                                </div>
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
                        <template v-if="urlType == 1">
                            <div class="row">
                                <div class="left">
                                    <span>基金产品名称:</span>
                                </div>
                                <div class="middle">
                                    <input id="investor-name" type="text" placeholder="请输入基金产品名称" v-model="tradeInfos.investorName">
                                </div>
                                <div class="right"></div>
                            </div>
                            <div class="row">
                                <div class="left">
                                    <span>基金产品简称:</span>
                                </div>
                                <div class="middle">
                                    <input id="shortName" type="text" placeholder="请输入四个汉字的产品简称" maxlength="4" v-model="tradeInfos.shortName">
                                </div>
                                <div class="right"></div>
                            </div>
                            <div class="row">
                                <div class="left">
                                    <span>产品备案文件:</span>
                                </div>
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
                        </template>
                        <div class="row">
                            <div class="left">
                                <span>委托授权书:</span>
                            </div>
                            <div class="middle">
                                <input disabled>
                            </div>
                            <div class="right">
                                <a href="javascript:;" class="upload">
                                    <input id="attorney-url" type="file" @change="uploadImg($event)" :data-src="tradeInfos.taPowerAttorneyFileUrl">上传扫描件
                                </a>
                                <span></span>
                                <i class="fa fa-check-circle"></i>
                                <a href="http://www.51jigoubao.com/jgb-download/%E5%8D%8E%E4%BF%A1%E5%BC%80%E6%88%B7%E6%8E%88%E6%9D%83%E4%B9%A6.doc" class="download">
                                    下载模板
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="second section" v-if="!changeBank">
                    <div class="title">
                        <p>法人信息</p>
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="left">
                                <span>法人姓名:</span>
                            </div>
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
                            <div class="left">
                                <span>有效期至:</span>
                            </div>
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
                                <div class="left">
                                    <span>管理员姓名:</span>
                                </div>
                                <div class="middle">
                                    <input id="contactname" type="text" v-model="tradeInfos.taContactName">
                                </div>
                                <div class="right"></div>
                            </div>
                            <div class="row">
                                <div class="left">
                                    <span>管理员邮箱:</span>
                                </div>
                                <div class="middle">
                                    <input id="taContactEml" type="text" v-model="tradeInfos.taContactEml">
                                </div>
                                <div class="right"></div>
                            </div>
                            <div class="row">
                                <div class="left">
                                    <span>管理员手机号:</span>
                                </div>
                                <div class="middle">
                                    <input id="contacttel" type="text" v-model="tradeInfos.taContactTel">
                                </div>
                                <div class="right">
                                    <button :class="['btn']" @click="sendSms($event)" v-if="time==60">发送验证码</button>
                                    <button :class="['btn','disabled']" v-else>{{time}}s后重发</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="left">
                                    <span>验证码:</span>
                                </div>
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
                                <div class="left">
                                    <span>有效期至:</span>
                                </div>
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
                            <div class="left">
                                <span>开户银行:</span>
                            </div>
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
                            <div class="left">
                                <span>开户行所在地:</span>
                            </div>
                            <div class="middle">
                                <!-- <input  type="text" > -->
                                <select v-model="province" style="width: 115px">
                                    <option v-for="(province,index) in provinceList" :value="province.provCode" :key="index">{{province.provName}}</option>
                                </select>
                                <select id="bankAddress" v-model="tradeInfos.bankAddress" style="width: 115px">
                                    <option v-for="(city,index) in cityList" :value="city.cityCode" :key="index">{{city.cityName}}</option>
                                </select>
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
                            <div class="left">
                                <span>支行名称:</span>
                            </div>
                            <div class="middle">
                                <input id="branch-bankname" type="text" v-model="tradeInfos.branchBankName" @input="getBranchBank($event)">
                                <ul id="branch-banklist" v-if="showBranchBank">
                                    <template v-for="(item,index) in branchBankList">
                                        <li :data-no="item.payBranchnNo" @click="inputBranchBank($event)" :key="index">{{ item.bankFullName }}</li>
                                    </template>
                                </ul>
                            </div>
                            <div class="right">
                                <span>*例：输入“漕河泾支行”</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>联行号:</span>
                            </div>
                            <div class="middle">
                                <input id="branch-bankno" type="text" v-model="tradeInfos.branchBankNo" disabled>
                            </div>
                            <div class="right"></div>
                        </div>
                        <div class="row" v-if="!changeBank">
                            <div class="left">
                                <span>银行户名:</span>
                            </div>
                            <div class="middle">
                                <input id="acctname" type="text" v-model="tradeInfos.acctName">
                            </div>
                            <div class="right"></div>
                        </div>
                        <div class="row">
                            <div class="left">
                                <span>银行账户:</span>
                            </div>
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
                    <p class="hint"   v-if="!riskLevelIs">*根据国家相关法律法规要求，在您提交前，请务必完成风险评估测试（点击”风险评估测试”按钮）</p>
                    <div class="content">
                        <div class="row">
                            <div class="left"></div>
                            <div class="middle">
                                <a class="btn question" @click="showKhQuestions=true" v-if="!riskLevelIs">风险评估测试</a>
                                <a class="submit btn" @click="submit">提交</a>
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
                                <span>加盖公章及法人印鉴的《业务授权委托书》
                                    <a href="http://www.51jigoubao.com/jgb-download/%E5%8D%8E%E4%BF%A1%E5%BC%80%E6%88%B7%E6%8E%88%E6%9D%83%E4%B9%A6.doc">下载模板</a>
                                </span>
                            </div>
                            <div class="row">
                                <em></em>
                                <span>监管部门出具的备案函，需加盖公章</span>
                            </div>
                            <div class="row">
                                <em></em>
                                <span>管理员的手机号码</span>
                            </div>
                            <div class="row">
                                <em></em>
                                <span> 管理人身份证扫描件（如正反面扫描，需加盖公章）</span>
                            </div>
                        </template>
                    </div>
                    <div class="third section">
                        <span>如您的公司还未三证合一，请额外提供
                            <em>税务登记证</em>与
                            <em>组织机构代码证</em>扫描件，如原件扫描无需公章，如复印件扫描需加盖公章</span>
                        <span>文件格式：jpeg、jpg、png、bmp，单个文件大小不超过5M</span>
                        <span>
                            <em>如有疑问，请拨打客服电话：{{ serveTel }}</em>
                        </span>
                    </div>
                </div>
                <div class="btns">
                    <a class="btn" @click="hideHint()">知道了</a>
                </div>
            </div>
        </c-modal>
        <c-modal v-show="showKhQuestions">
            <div class="kh-tips questionnaire modal-container" slot="modal-container">
                <div class="title">
                    <span>问卷调查</span>
                    <a class="btn" @click="showKhQuestions=false">
                        <i class="fa fa-times-circle-o"></i>
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <div class="issue">
                        <p class="headline">1.贵单位的性质：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-1" value='01_01_5'>A. 国有企事业单位</label>
                            <label>
                                <input type="radio" name="issue-1" value='01_02_2'>B. 非上市民营企业</label>
                            <label>
                                <input type="radio" name="issue-1" value='01_03_4'>C. 外资企业</label>
                            <label>
                                <input type="radio" name="issue-1" value='01_04_6'>D. 上市公司</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">2.贵单位的净资产规模为：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-2" value='02_01_1'>A.500 万元以下</label>
                            <label>
                                <input type="radio" name="issue-2" value='02_02_2'>B. 500 万元-2000 万元</label>
                            <label>
                                <input type="radio" name="issue-2" value='02_03_3'>C.2000 万元-1 亿元</label>
                            <label>
                                <input type="radio" name="issue-2" value='02_04_5'>D. 超过 1 亿元</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">3.贵单位年营业收入为：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-3" value='03_01_1'>A.500 万元以下</label>
                            <label>
                                <input type="radio" name="issue-3" value='03_02_2'>B. 500 万元-3000 万元</label>
                            <label>
                                <input type="radio" name="issue-3" value='03_03_3'>C.2000 万元-1 亿元</label>
                            <label>
                                <input type="radio" name="issue-3" value='03_04_4'>D. 超过 1 亿元</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">4.贵单位的性质：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-4" value='04_01_1'>A. 300万以内</label>
                            <label>
                                <input type="radio" name="issue-4" value='04_02_2'>B. 300万元～1000万元</label>
                            <label>
                                <input type="radio" name="issue-4" value='04_03_3'>C. 1000万元～3000万元</label>
                            <label>
                                <input type="radio" name="issue-4" value='04_04_4'>D. 超过3000万元</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">5.贵单位是否有尚未清偿的数额较大的债务？如有，主要是：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-5" value='05_01_3'>A. 银行贷款</label>
                            <label>
                                <input type="radio" name="issue-5" value='05_02_2'>B. 公司债券或企业债券</label>
                            <label>
                                <input type="radio" name="issue-5" value='05_03_1'>C. 通过担保公司等中介机构募集的借款</label>
                            <label>
                                <input type="radio" name="issue-5" value='05_04_0'>D. 民间借贷</label>
                            <label>
                                <input type="radio" name="issue-5" value='05_05)4'>E. 没有数额较大的债务</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">6.对于金融产品投资工作，贵单位打算配置怎样的人员力量：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-6" value='06_01_1'>A. 一名兼职人员（包括负责人自行决策）</label>
                            <label>
                                <input type="radio" name="issue-6" value='06_02_3'>B. 一名兼职人员</label>
                            <label>
                                <input type="radio" name="issue-6" value='06_03_4'>C. 多名兼职或专职人员，相互之间分工不明确</label>
                            <label>
                                <input type="radio" name="issue-6" value='06_04_5'>D. 多名兼职或专职人员，相互之间有明确分工</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">7.贵单位所配置的负责金融产品投资工作的人员是否符合以下情况：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-7" value='07_01_6'>A. 现在或此前曾从事金融、经济或财会等与金融产品投资相关的工作超过两年</label>
                            <label>
                                <input type="radio" name="issue-7" value='07_02_6'>B. 已取得金融、经济或财会等与金融产品投资相关专业学士以上学位</label>
                            <label>
                                <input type="radio" name="issue-7" value='07_03_6'>C. 取得证券从业资格、期货从业资格、注册会计师证书（ CPA）或注册金融分析师证书（ CFA）中的一项及以上</label>
                            <label>
                                <input type="radio" name="issue-7" value='07_04_0'>D. 本单位所配置的人员不符合以上任何一项描述</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">8.贵单位是否建立了金融产品投资相关的管理制度：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-8" value='08_01_1'>A. 没有。因为要保证操作的灵活性</label>
                            <label>
                                <input type="radio" name="issue-8" value='08_02_3'>B. 已建立。包括了分工和授权的要求，但未包括投资风险控制的规则</label>
                            <label>
                                <input type="radio" name="issue-8" value='08_03_7'>C. 已建立。包括了分工与授权、风险控制等一系列与金融产品投资有关的规则</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">9.贵单位的投资经验可以被概括为：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-9" value='09_01_1'>A. 有限：除银行活期账户和定期存款外，基本没有其他投资经验</label>
                            <label>
                                <input type="radio" name="issue-9" value='09_02_2'>B. 一般：除银行活期账户和定期存款外，购买过基金、保险等理财产品，但还需要进一步的指导</label>
                            <label>
                                <input type="radio" name="issue-9" value='09_03_3'>C. 丰富：本单位具有相当投资经验，参与过股票、基金等产品的交易，并倾向于自己做出投资决策</label>
                            <label>
                                <input type="radio" name="issue-9" value='09_04_4'>D. 非常丰富：本单位对于投资非常有经验，参与过权证、期货或创业板等高风险产品的交易</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">10. 有一位投资者一个月内做了 15 笔交易（同一品种买卖各一次算一笔），贵单位认为这样的交易频率：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-10" value='10_01_1'>A. 太高了</label>
                            <label>
                                <input type="radio" name="issue-10" value='10_02_2'>B. 偏高</label>
                            <label>
                                <input type="radio" name="issue-10" value='10_03_3'>C. 正常</label>
                            <label>
                                <input type="radio" name="issue-10" value='10_04_4'>D. 偏低</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">11.过去一年时间内，您购买的不同金融产品（含同一类型的不同金融产品）的数量是：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-11" value='11_01_1'>A. 5 个以下</label>
                            <label>
                                <input type="radio" name="issue-11" value='11_02_3'>B. 6 至 10 个</label>
                            <label>
                                <input type="radio" name="issue-11" value='11_03_4'>C. 11 至 15 个</label>
                            <label>
                                <input type="radio" name="issue-11" value='11_04_6'>D. 16 个以上</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">12.以下金融产品，贵单位投资经验在两年以上的有：（本题可多选）</p>
                        <p class="option">
                            <label>
                                <input type="checkbox" name="issue-12" value='12_01_0'>A. 银行存款</label>
                            <label>
                                <input type="checkbox" name="issue-12" value='12_02_1'>B.债券、货币市场基金、债券型基金或其它固定收益类产品</label>
                            <label>
                                <input type="checkbox" name="issue-12" value='12_03_2'>C.股票、混合型基金、偏股型基金、股票型基金等权益类投资品种</label>
                            <label>
                                <input type="checkbox" name="issue-12" value='12_04_4'>D.期货、融资融券</label>
                            <label>
                                <input type="checkbox" name="issue-12" value='12_05_6'>E.复杂金融产品或其他产品</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">13.贵单位的性质：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-13" value='13_01_1'>A. 100 万元以内</label>
                            <label>
                                <input type="radio" name="issue-13" value='13_02_2'>B. 100 万元-300 万元</label>
                            <label>
                                <input type="radio" name="issue-13" value='13_03_3'>C. 300 万元-1000 万元</label>
                            <label>
                                <input type="radio" name="issue-13" value='13_04_4'>D. 1000 万元以上</label>
                            <label>
                                <input type="radio" name="issue-13" value='13_05_0'>E. 从未投资过金融产品</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">14.贵单位用于证券投资的大部分资金不会用作其它用途的时间段为：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-14" value='14_01_1'>A. 短期——0 到 1 年</label>
                            <label>
                                <input type="radio" name="issue-14" value='14_02_3'>B. 中期——1 到 5 年</label>
                            <label>
                                <input type="radio" name="issue-14" value='14_03_%'>C. 长期——5 年以上</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">15.贵单位进行投资时的首要目标是：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-15" value='15_01_0'>A. 资产保值，我不愿意承担任何投资风险</label>
                            <label>
                                <input type="radio" name="issue-15" value='15_02_2'>B. 尽可能保证本金安全，不在乎收益率比较低</label>
                            <label>
                                <input type="radio" name="issue-15" value='15_03_4'>C. 产生较多的收益，可以承担一定的投资风险</label>
                            <label>
                                <input type="radio" name="issue-15" value='15_04_6'>D. 实现资产大幅增长，愿意承担很大的投资风险</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">16.贵单位打算重点投资于哪些种类的投资品种？（本题可多选）</p>
                        <p class="option">
                            <label>
                                <input type="checkbox" name="issue-16" value='16_01_2'>A. 债券、货币市场基金、债券基金等固定收益类投资品种</label>
                            <label>
                                <input type="checkbox" name="issue-16" value='16_02_4'>B. 股票、混合型基金、偏股型基金、股票型基金等权益类投资品种</label>
                            <label>
                                <input type="checkbox" name="issue-16" value='16_03_5'>C. 期货、融资融券</label>
                            <label>
                                <input type="checkbox" name="issue-16" value='16_04_6'>D. 复杂金融产品</label>
                            <label>
                                <input type="checkbox" name="issue-16" value='16_05_6'> E. 其他产品</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">17.贵单位认为自己能承受的最大投资损失是多少？</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-17" value='17_01_0'>A. 10%以内</label>
                            <label>
                                <input type="radio" name="issue-17" value='17_02_2'>B. 10%-30%</label>
                            <label>
                                <input type="radio" name="issue-17" value='17_03_4'>C. 30%-50%</label>
                            <label>
                                <input type="radio" name="issue-17" value='17_04_6'>D. 超过 50%</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">18. 假设有两种不同的投资：投资 A 预期获得 5%的收益，有可能承担非常小的损失；投资 B 预期获得 20%的收益，但有可能面临25%甚至更高的亏损。您将您的投资资产分配为：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-18" value='18_01_0'>A. 全部投资于 A</label>
                            <label>
                                <input type="radio" name="issue-18" value='18_02_1'>B. 大部分投资于 A</label>
                            <label>
                                <input type="radio" name="issue-18" value='18_03_3'>C. 两种投资各一半</label>
                            <label>
                                <input type="radio" name="issue-18" value='18_04_5'>D. 大部分投资于 B</label>
                            <label>
                                <input type="radio" name="issue-18" value='18_05_7'>E. 全部投资于 B</label>
                        </p>
                    </div>
                    <div class="issue">
                        <p class="headline">19.贵单位参与金融产品投资的主要目的是什么：</p>
                        <p class="option">
                            <label>
                                <input type="radio" name="issue-19" value='19_01_3'>A. 闲置资金保值增值</label>
                            <label>
                                <input type="radio" name="issue-19" value='19_02_5'>B. 获取主营业务以外的投资收益</label>
                            <label>
                                <input type="radio" name="issue-19" value='19_03_4'>C. 现货套期保值、对冲主营业务风险</label>
                            <label>
                                <input type="radio" name="issue-19" value='19_04_1'>D. 减持已持有的股票</label>
                        </p>
                    </div>
                </div>
                <div class="btns">
                    <a class="btn" @click="countScore()">提交</a>
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
import { dateFormat, stringTrim, storageManager, logger } from '../../plugins/utils'
import config from '../../config'
import Flatpickr from '../../../static/libs/flatpickr/flatpickr.min'
export default {
    components: {
        cModal
    },
    data() {
        return {
            time: 60,
            urlType: 1,
            oneCode: true,
            showKhModal: false,
            showKhQuestions: false,
            changeBank: false,
            branchBankList: [],
            transferBankList: [],
            showBranchBank: false,
            serveTel: config.info.serveTel,
            codeDisabled: true,
            riskLevel: '',
            riskLevelIs:false,
            custanswers: '',
            tradeInfos: {
                orgNo: '',
                telNo: '',
                idType: '',
                shortName: '',
                organAddress: '',
                licenceNo: '',
                licenceExpireDate: null,
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
                corpIdExpireDate: null,
                bankName: '',
                branchBankName: '',
                acctName: '',
                acctNo: '',
                bankAddress: '',
                bankOpenAcctPermitFileUrl: '',
                taPowerAttorneyFileUrl: '',
                taContactName: '',
                taContactIdType: '0',
                taContactIdNo: '',
                taContactEml: '',
                taContactTel: '',
                regcode: '',
                taContactIdFileUrl: '',
                taContactExpireDate: null,
            },
            province: '',
            cityList: [{
                "cityCode": undefined,
                "cityName": "请选择",
                "provCode": "",
                "cityAttr": "",
                "cityKeyword": "",
                "provPinyinSi": "",
                "provPinyin": "",
                "cityPinyinSi": "",
                "cityPinyin": ""
            }]
        }

    },
    computed: {
        tradeInfo() {
            this.tradeInfos = this.$store.getters.getHxTradeInfo;
            if (this.tradeInfos.idType == 0) {
                this.oneCode = false;
            }
            return this.$store.getters.getTradeInfo
        },
        provinceList() {
            return this.$store.getters.getCity;
        }
    },
    watch: {
        province(val) {
            const _self = this;
            userService.getCity(val, _self);
            _self.tradeInfos.bankAddress = undefined;

        }
    },
    activated() {
        this.$store.dispatch('fetchHxTradeInfo')
        // .then((data) => {
        //     this.riskLevel = data.data.riskLevel
        // });
        userService.getIsTest({}, this).then((resp) => {
            // this.riskLevel = false
            this.riskLevelIs = resp.data
        });

        this.$store.dispatch('fetchCity');
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
        change(value) {
            console.log(value)
        },
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

                } else if (idName == 'contact-valid') {
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
                        } else if (idName == 'contact-url') {
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
                        } else if (idName == 'contact-expiredate') {
                            $this.tradeInfos.taContactExpireDate = $dom.val()
                        }
                    }
                });
                $dom.data('first', false);
            }
        },
        getTransferBank() {
            let _self = this;
            bankService.getTransferBank(_self, 4).then((data) => {
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
        submit() {
            let $name = document.getElementById('name');
            let $mobile = document.getElementById('mobile');
            let $organAddress = document.getElementById('organAddress');
            let $shortName = document.getElementById('shortName');
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
                acctType: '01',
                issueId: 4,
                orgName: $name.value,
                telNo: $mobile.value,
                organAddress: $organAddress.value,
                shortName: $shortName.value,
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
                bankAddress: $bankAddress.value,
                acctName: $acctName.value,
                acctNo: $acctNo.value,
                bankOpenAcctPermitFileUrl: $bankUrl.dataset.src,
                taContactName: $contactName.value,
                taContactTel: $contactTel.value,
                regcode: $regcode.value,
                taContactEml: $taContactEml.value,
                taContactIdType: $contactType.value,
                taContactIdNo: $contactNo.value,
                taContactIdFileUrl: $contactUrl.dataset.src,
                taContactExpireDate: $contactExpiredate.value,
                riskLevel: this.riskLevel,
                custanswers: this.custanswers,
                taPowerAttorneyFileUrl: $attorneyUrl.dataset.src

            };
            if ($shortName.value.length != 4) {
                if (this.urlType == 1) {
                    window.layer.msg('请输入四个汉字的产品简称 ', { time: 1300 })
                } else {
                    window.layer.msg('请输入四个汉字的企业简称 ', { time: 1300 })
                }
                return false
            }

            if (!this.oneCode) {
                payload.idType = 0;
                payload.taxRegistrationNo = $taxNo.value;
                payload.registrationFileUrl = $taxUrl.dataset.src;
                payload.organizationNo = $orgnNo.value;
                payload.orgNoFileUrl = $orgnUrl.dataset.src;
            }
            if (this.urlType == 1) {
                payload.acctType = '1';
                payload.taRegCerFileUrl = $taUrl.dataset.src;
                payload.investorName = $investorName.value;


            } else {
                payload.acctType = '0'
            }
            if (!this.riskLevelIs && this.custanswers == '') {
                window.layer.msg('根据相关法律法规要求，请您先完成风险评估测试，再提交开户申请，谢谢！')
                return false
            }
            commonService.submitTradeInfo(this.urlType, payload, this);
        },
        sendSms(e) {
            let _self = this;
            let $mobileNo = document.getElementById('contacttel');
            if (!stringTrim($mobileNo.value)) {
                window.layer.tips('手机号码不能为空', $mobileNo);
            } else {
                _self.codeDisabled = false,
                    commonService.hxSendSms($mobileNo.value, _self).then(() => {
                        window.layer.msg('发送成功!')
                        _self.countDown(e.target);
                    });
            }
        },
        countDown(dom) {
            let _self = this;
            if (_self.time == 0) {
                _self.time = 60;
                return;
            } else {
                _self.time--;
            }
            setTimeout(function() {
                _self.countDown(dom);
            }, 1000);
        },
        countScore() {
            let scoreArr = [];
            const _self = this;
            for (let i = 1; i < 20; i++) {
                let $issue_i = $("input[name='issue-" + i + "']:checked");
                if ($issue_i.val() === undefined) {
                    layer.msg('您存在遗漏问题未回答，请您完成，谢谢！');
                    return false
                } else {
                    if (i == 12 || i == 16) {
                        const arr = $issue_i;
                        let arrval = []
                        for (let j = 0; j < arr.length; j++) {
                            let val = arr[j].value;
                            arrval.push(val)
                        }
                        let num = arrval.map(item => { return Number(item.substring(6)) });
                        let max = Math.max(...num);
                        let index = num.indexOf(max);
                        scoreArr[i - 1] = arrval[index]
                        // .substring(0, 5);
                    } else {
                        scoreArr[i - 1] = $issue_i.val();
                    }
                }
            }
            let scoreNumArr=scoreArr.map(function(item){return Number(item.substring(6))});
            let custanswers=scoreArr.map(function(item){return item.substring(0,5)});
            this.custanswers = custanswers.join(',')
            const scoreVal = scoreNumArr.reduce(function(pre, next) { return pre + next })
            if (14 < scoreVal && scoreVal < 27) {
                layer.msg('您的风险承受能力评估为保守型');
                _self.riskLevel = 1;

            } else if (28 < scoreVal && scoreVal < 41) {
                _self.riskLevel = 2;
                layer.msg('您的风险承受能力评估为谨慎型')

            } else if (42 < scoreVal && scoreVal < 72) {
                _self.riskLevel = 3;
                layer.msg('您的风险承受能力评估为稳健型')

            } else if (73 < scoreVal && scoreVal < 86) {
                _self.riskLevel = 4;
                layer.msg('您的风险承受能力评估为积极型')

            } else if (87 < scoreVal && scoreVal < 100) {
                _self.riskLevel = 5;
                layer.msg('您的风险承受能力评估为激进型')

            }
            setTimeout(function() {
                _self.showKhQuestions = false;
            }, 2500)


        },
    }
}

</script>
<style lang="scss" scoped>
@import "../../assets/stylesheets/account/updateInfo.scss";

</style>
