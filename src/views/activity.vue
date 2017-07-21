<template>
    <div class="active-wrap">
        
            <div class="middle"><img src="../assets/images/active/51.jpg"  alt=""></div>
        <!--     <div class="btn">
                <button @click='hideActive()'></button>
            </div>
 -->    </div>
</template>
<script>
export default {

    name: 'activity',
    methods: {
        hideActive() {
            this.$parent.active = false;
            this.$parent.popping = false;

        }
    }
};
</script>
<style lang="scss" scoped>
@import "../assets/stylesheets/active.scss";
.active-wrap{
    // background: url(../assets/images/active/5-1.jpg) no-repeat ;
    // background-size:100% 100%;
    background:rgba(0,0,0,.6);
    .middle{
        height: 80%;
        width: 30%;
        img{
        border-radius: 10px;

        }
    }
}
.btn{
    button{
    background: url(../assets/images/active/btn.png) no-repeat ;
    background-size:100% 100%;


    }
}
</style>
