<template>
    <div id="about" :style="{ minHeight: minHeight + 'px' }">
        <div class="left">
            <template v-for="item in itemList">
                <router-link :to="{ name: item.split('-')[1] }" tag="div" class="item">
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
</div>
</template>

<script>
    export default {
        data() {
            return {
                itemList: Object.freeze([
                    '帮助中心-help',
                    '新手指南-newbee'
                ]),
                pageNo: 0,
                minHeight: window.innerHeight - 344
            }
        },
        mounted() {
            this.$root.$refs.header.adjustStyle(false, 0);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/about/index.scss";
</style>