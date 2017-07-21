<template>
    <div id="system">
        <div id="change-pwd">
            <div class="row">
                <span>旧密码:</span>
                <input id="old-pwd" type="password" placeholder="请输入旧密码">
            </div>
            <div class="row">
                <span>新密码:</span>
                <input id="new-pwd" type="password" placeholder="请输入新密码">
            </div>
            <div class="row">
                <span>确认密码:</span>
                <input id="re-new-pwd" type="password" placeholder="再次输入新密码">
            </div>
            <div class="row">
                <a class="btn" @click="changePasswd">修改</a>
            </div>
        </div>
    </div>
</template>

<script>
    import userService from '../../services/userService'
    import { stringTrim } from '../../plugins/utils'
    export default {
        methods: {
            changePasswd () {
                let $oldPwd = document.getElementById('old-pwd');
                let $newPwd = document.getElementById('new-pwd');
                let $reNewPwd = document.getElementById('re-new-pwd');
                if (!stringTrim($oldPwd.value)) {
                    window.layer.tips('旧密码不能为空', $oldPwd);
                } else if (!stringTrim($newPwd.value)) {
                    window.layer.tips('新密码不能为空', $newPwd);
                } else if (!stringTrim($reNewPwd.value)) {
                    window.layer.tips('新密码不能为空', $reNewPwd);
                } else if ($newPwd.value !== $reNewPwd.value) {
                    window.layer.tips('两次密码不一致', $reNewPwd);
                } else {
                    userService.modifyPassword($oldPwd.value, $newPwd.value, this).then(() => {
                        window.layer.msg('密码修改成功', {
                            time: 1300,
                            end: function () {
                                $oldPwd.value =  $newPwd.value = $reNewPwd.value = '';
                            }
                        });
                    });
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/stylesheets/account/changePwd.scss";

</style>
