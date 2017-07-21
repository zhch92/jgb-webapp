<template>
    <div class="page-nav" :style="{ textAlign: alignStyle }">
        <ul>
            <li v-if="!isFirst">
                <a @click="cur--">上一页</a>
            </li>
            <template v-if="totalPage <= 1">
                <li class="active"><a @click="btnClick(1)">{{ 1 }}</a></li>
            </template>
            <template v-if="cur < displayNum && totalPage > 1">
                <template v-if="totalPage < displayNum">
                    <li v-for="index in totalPage" :class="{ active: cur == index }">
                        <a @click="btnClick(index)">{{ index }}</a>
                    </li>
                </template>
                <template v-else>
                    <li v-for="index in displayNum" :class="{ active: cur == index }">
                        <a @click="btnClick(index)">{{ index }}</a>
                    </li>
                    <li><a style="cursor: not-allowed">...</a></li>
                </template>
            </template>
            <template v-if="cur >= displayNum">
                <li><a @click="btnClick(1)">1</a></li>
                <li><a style="cursor: not-allowed">...</a></li>
                <li><a @click="btnClick(cur - 2)">{{ cur - 2 }}</a></li>
                <li><a @click="btnClick(cur - 1)">{{ cur - 1 }}</a></li>
                <li class="active"><a @click="btnClick(cur)">{{ cur }}</a></li>
                <template v-if="totalPage - cur > 2">
                    <li><a @click="btnClick(cur + 1)">{{ cur + 1 }}</a></li>
                    <li><a @click="btnClick(cur + 2)">{{ cur + 2 }}</a></li>
                    <li><a style="cursor: not-allowed">...</a></li>
                </template>
                <template v-if="totalPage - cur == 2">
                    <li><a @click="btnClick(cur + 1)">{{ cur + 1 }}</a></li>
                    <li><a @click="btnClick(cur + 2)">{{ cur + 2 }}</a></li>
                </template>
                <template v-if="totalPage - cur == 1">
                    <li><a @click="btnClick(cur + 1)">{{ cur + 1 }}</a></li>
                </template>
            </template>
            <li v-if="!isLast && totalPage > 1">
                <a @click="cur++">下一页</a>
            </li>
            <li>
                <a>共<i>{{ totalPage }}</i>页</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { eventHub } from '../plugins/utils'

    export default {
        name: 'Pagination',
        props: ['pageNo', 'totalPage', 'displayNum', 'alignStyle'],
        data () {
            return {
                cur: this.pageNo
            }
        },
        computed: {
            isFirst () {
                return this.cur == 1;
            },
            isLast () {
                return this.cur == this.totalPage;
            }
        },
        watch: {
            cur: {
                handler () {
                    eventHub.$emit('loadList', this.cur)
                },
                deep: true
            }
        },
        methods: {
            btnClick (data) {
                if (data != this.cur) {
                    this.cur = data;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-nav {
        ul,li {
            margin: 0;
            padding: 0;
        }
        ul {
            display: inline-block;
            li {
                display: inline;
                list-style: none;
                a {
                    position: relative;
                    float: left;
                    margin-left: -1px;
                    padding: 5px 12px;
                    line-height: 1.5;
                    font-size: 14px;
                    color: #337ab7;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    cursor: pointer;
                    text-decoration: none;
                    user-select: none;
                    i {
                        font-style: normal;
                        color: #d44950;
                        margin: 0 4px;
                    }
                    &:hover {
                        background-color: #eee;
                    }
                }
                &:first-child {
                    a {
                        margin-left: 0;
                    }
                }
                &.active {
                    a {
                        color: #fff;
                        cursor: default;
                        background-color: #337ab7;
                        border-color: #337ab7;
                    }
                }
            }
        }
    }
</style>
