<template>
    <div id="help">
        <div class="head">
            <span :class="{ active: pageNo == 0 }" @click="headClick($event, 0)">活期机构宝</span>
        </div>
        <div class="content">
            <div class="first page" v-if="pageNo == 0">
                <div class="row" @click="rowClick($event)">
                    <div class="title">
                        <span>什么是机构宝？</span>
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <div class="detail">
                        <p>机构宝平台“活期机构宝”对标的金融产品，是货币市场基金。目前主要包括：</p>
                        <p>1，长信利息收益货币市场基金（场内：利息B（519598）；场外：长信利息收益B（519998））。</p>
                        <p>注：单个账户单次申购低于500万份的，（场内：利息A（519599）；场外：长信利息收益A（519999））。</p>
                        <p>2，广发钱袋子货币市场基金（000509）</p>
                        <p>3，广发货币B货币市场基金（270014）</p>
                        <p>注：单个账户单次申购不得低于500万份。</p>
                    </div>
                </div>
                <div class="row" @click="rowClick($event)">
                    <div class="title">
                        <span>如何注册机构宝？</span>
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <div class="detail">
                        <img src="../../assets/images/about/help/002.png" alt="">
                    </div>
                </div>
                <div class="row" @click="rowClick($event)">
                    <div class="title">
                        <span>如何购买机构宝?</span>
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <div class="detail">
                        <img src="../../assets/images/about/help/003.png" alt="">
                        <div class="link">
                            <a @click="linkRouter('4')"></a>
                            <a @click="linkRouter('5')"></a>
                        </div>
                    </div>
                </div>
                <div class="row" @click="rowClick($event)">
                    <div class="title">
                        <span>通过机构宝平台投资基金，有哪些便利？</span>
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <div class="detail">
                        <p>货币基金是投资业务中最安全、最便利的现金管理工具。场内货币基金，尤其适合已经在证交所场内开户并交易的投资机构进行资产配置。投资机构只要像买卖股票那样进入货币基金申购赎回页面，选择长信利息收益货币（或输入基金代码）申购赎回，就能完成交易。</p>
                        <p>您通过机构宝平台投资基金，平台将根据您的资产存量给予您爱心值。举例：单日1亿元存量，您可获得245爱心值。</p>
                        <p>机构宝平台在为您每日提供爱心值对账的同时，还将为您展示您的投资资产、所获收益以及长信利息收益货币基金的“每万份收益”和“7日年化收益率”等数据。</p>
                        <p>不远将来，机构宝平台还将上线场外货币基金、定期类固定收益理财产品等供您投资选择。</p>
                    </div>
                </div>
                <div class="row" @click="rowClick($event)">
                    <div class="title">
                        <span>购买的机构宝什么时候会有收益？</span>
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <div class="detail">
                        <p class="caption">1.长信利息收益货币市场基金：</p>
                        <p>a) 无论场内还是场外申购长信利息收益货币基金，收益从T+1日开始享受（注：T日为申购申请日）。T日15:00前完成申购，T+1日开始享受收益，T+2日开始显示收益并可以赎回；T日15:00后完成申购，T+2日开始计算并享受收益，T+3日开始显示收益并可以赎回。</p>
                        <p>b) 赎回长信利息收益货币基金，您依旧享受T日收益（注：T日为赎回申请日）。</p>
                        <p>c) 长信利息收益货币基金为您每日计算当日收益并分配，且每日进行支付，您可通过赎回基金份额方式获取现金红利收益。</p>
                        <p class="caption">2.广发钱袋子货币市场基金/广发货币B货币市场基金：</p>
                        <p> a) 申购后收益从T+1日开始享受。T日15:00前完成申购，T+1日开始享受收益并可以赎回，T+2日开始显示收益；T日15:00后完成  申购，T+2日开始享受收益并可以赎回，T+3日开始显示收益。</p>
                        <p>b) T日赎回当日依旧享受T日收益（注：T日为赎回申请日）。</p>
                        <p>c) 广发钱袋子每日计算当日收益并分配，广发货币B每月计算当日收益并分配。</p>
                    </div>
                </div>
            </div>
            <div class="second page" v-else>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                pageNo: 0,
                lastRow: undefined
            }
        },
        methods: {
            headClick(e, num) {
                let $dom = e.target;
                if ($dom.className.indexOf('active') == -1) {
                    this.pageNo = num;
                }
            },
            linkRouter(num) {
                let _self = this;
                _self.$router.push({
                    name: 'newbee'
                });
                _self.$parent.pageNo = num;
            },
            rowClick(e) {
                let $dom = '';
                let className = e.target.className;
                let tagName = e.target.tagName.toLowerCase();
                if (className != 'detail' && tagName != 'p') {
                    (className == 'row') ? $dom = $(e.target): $dom = $(e.target).parents('.row');
                    if (!$dom.hasClass('open')) {
                        $dom.addClass('open');
                        $dom.find('i')[0].className = 'fa fa-angle-up';
                        $dom.find('.title').addClass('active');
                        $dom.find('.detail').slideDown();
                        if ($dom[0] != this.lastRow && this.lastRow != undefined) {
                            this.rowRestore(this.lastRow);
                        }
                    } else {
                        this.rowRestore($dom[0]);
                    }
                    this.lastRow = $dom[0];
                }
            },
            rowRestore(obj) {
                let $obj = $(obj);
                $obj.removeClass('open');
                $obj.find('i')[0].className = 'fa fa-angle-down';
                $obj.find('.title').removeClass('active');
                $obj.find('.detail').slideUp();
            }
        }
}
</script>
<style lang="scss" scoped>
@import "../../assets/stylesheets/about/help.scss";
</style>
