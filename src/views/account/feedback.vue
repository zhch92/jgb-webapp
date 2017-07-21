<template>
    <div id="system">
        <div id="feedback">
            <div class="title">
                <em>描述</em>
                <span>（欢迎您参与我们的产品建设，聊聊您的看法，让机构宝不断进步，500字以内）：</span>
            </div>
            <div class="content">
                <textarea id="feed-detail"></textarea>
                <a class="submit btn" @click="feedback">提交</a>
            </div> 
        </div>
    </div>
</template>

<script>
    import userService from '../../services/userService'
    import { stringTrim, storageManager } from '../../plugins/utils'
    import config from '../../config'
    export default {
        methods: {
            feedback () {
                let [data, errCode, $content] = ['', '', document.getElementById('feed-detail')];
                let orgName = storageManager.getItem(config.session.userKey, true).organName;
                if (!stringTrim($content.value)) {
                    window.layer.tips('反馈内容不能为空', $content);
                } else {
                    userService.feedback(orgName, $content.value, this).then(() => {
                        window.layer.msg('反馈成功！', {
                            time: 1300,
                            end: function () {
                                $content.value = '';

                            }
                        });
                    });
                }
            },
            }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/stylesheets/account/feedback.scss";
</style>
