<template>
    <div id="back-top" title="回到顶部" @click="toTop" v-show="show">
        <i class="fa fa-angle-up"></i>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                show: true
            }
        },
        mounted () {
            let _self = this;
            window.onscroll = function () {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                (scrollTop > 100) ? _self.show = true : _self.show = false;
            }
        },
        methods: {
            toTop () {
                window.scrollTo(0, 0);
                this.show = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    #back-top {
        position: fixed;
        bottom: 50px;
        right: 30px;
        z-index: 100;
        cursor: pointer;
        background-color: rgba(0, 0, 0, .3);
        border-radius: 50%;
        i {
            padding: 7px 12px 8px 12px;
            font-size: 2.4rem;
            font-weight: bold;
            color: #fff;
        }
    }
</style>
