<template>
    <div id="system">
        <div id="account-info" >
            <div class="list title">
                <span></span>
                <span>企业/基金产品名称</span>
                <span>股东/基金账号</span>
                <span>状态</span>
            </div>
            <div class="list content">
                <template v-for="item in accountInfo.resultList">
                    <div class="record">
                        <p>
                            <span class="icon" :class="iconType(item.issueId)">{{item.issueId | fundsName}}</span>
                        </p>
                        <p>
                            <span>{{ item.investorName | formatInvestorName(31) || '--' }}</span>
                        </p>
                        <p>
                            <span v-text="item.issueId == 1||item.issueId == 4 ? item.taAccountId || '--' : '--'"></span>
                        </p>
                        <p>
                            <span v-if="item.status == 0"><em v-text="item.issueId == 1 ? '确权': '开户'"></em>进行中，请等候...</span>
                            <template v-if="item.status == 1">
                                <span v-text="item.issueId == 1 ? '确权成功': '开户成功'"></span>
                            </template>
                            <template v-if="item.status == 2">
                                <span><em v-text="item.issueId == 1 ? '确权': '开户'"></em>失败，请您
                                    <a :href="item.issueId == 1 ? 'product' : 'updateInfo'">重新操作</a>
                                </span>
                            </template>
                        </p>
                    </div>
                </template>
            </div>
            <div class="list nav">
                <c-page-nav :pageNo="accountPageNav.cur" :totalPage="accountPageNav.all" :displayNum="accountPageNav.group" :alignStyle="accountPageNav.align"></c-page-nav>
            </div>
        </div>
    </div>
</template>

<script>
    import { eventHub } from '../../plugins/utils'
    import * as cPageNav from '../../components/Pagination'

    export default {
        components: {
            cPageNav
        },
        data () {
            return {
                accountPageNav: {
                    all: 0,
                    cur: 1,
                    group: 5,
                    align: 'center'
                }
            }
        },
        computed: {
            accountInfo () {
                return this.$store.getters.getAccountInfo
            }
        },
        activated () {
            this.loadList(this.accountPageNav.cur);
            eventHub.$on('loadList', this.loadList);
        },
        deactivated () {
            eventHub.$off('loadList', this.loadList);
        },
        methods: {
            iconType(issueId){
                        let cls='';
                        if(issueId==1){
                            cls='cx';
                        }else if(issueId==2){
                            cls='gf';
                        }else if(issueId==4){
                            cls='hx';
                        }
                        return cls
            },
            loadList (pageNo) {
                let _self = this;
                _self.$store.dispatch('fetchAccountInfo', pageNo).then(() => {
                    _self.accountPageNav.all = _self.accountInfo.totalPages;
                    _self.accountPageNav.cur = _self.accountInfo.pageNo;
                })
            },
        }
        }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/account/accountInfo.scss";
    #account-info {
        .record {
            .icon {
                &.gf {
                    background: url("../../assets/images/account/system/bg_orange.png") no-repeat;
                    color: orange;
                }
                &.cx {
                     background: url("../../assets/images/account/system/bg_blue.png") no-repeat;
                     color:blue;
                 }

                &.hx {
                     background: url("../../assets/images/account/system/hx.png") no-repeat;
                     color:#ffa500;
                     
                 }
            }
        }
    }
</style>
