<template>
    <div id="main" :class='{mainActive:popping}'>
        <c-header ref="header"></c-header>
        <transition name="router">
            <router-view></router-view>
        </transition>
        <c-back ref="backtop"></c-back>
        <c-footer ref="footer"></c-footer>
    </div>
</template>
<script>
import {
    storageManager
} from './plugins/utils'
import config from './config'
import * as cHeader from './components/Header'
import * as cFooter from './components/Footer'
import * as cBack from './components/BackTop'
import * as cActivity from './views/activity'

export default {
    components: {
        cHeader,
        cFooter,
        cBack,
        cActivity
    },
    data() {
        const date = new Date();
        const abortTime = new Date('2017-05-02');
        const newTime=abortTime.getTime()-8*3600;
        return {
            popping:  false,
            active: date.getTime() < newTime ? true : false
        }

    },
    beforeMount() {
        if (storageManager.getItem(config.session.loginKey, false)) {
            this.$store.dispatch('userLogin');
        }
    },
    mounted() {
        let _this = this;
        setTimeout(function() {
            _this.active = false;
            _this.popping = false;
        }, 3000)
    }

}
</script>
<style lang="scss">
@import "assets/stylesheets/global.scss";
</style>
