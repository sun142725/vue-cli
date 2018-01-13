<template>
    <div class="contact">
        <app-header></app-header>
        <div class="container">
            <div class="tips">
                {{current}}
            </div>
            <div class="left" ref="left">
                <div class="group" v-for="v in arr">
                    <div class="title">{{v}}</div>
                    <ul>
                        <li v-for="x in displayUser[v]">
                            <span>{{x.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right" :style="{height:22*arr.length+ 'px'}">
                <ul>
                    <li v-for="(v,i) in arr"
                        @click="to(i)"
                        :class="(v==current)?'active':''">
                       {{v}}
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
    'use strict';
    import Header from './Header.vue'
    export default {
        name: 'contact',
        data: function () {
            return {
                users: [],
                current: 'A',
                heightArr: [],
                inited: true
            }
        },
        methods: {
            to: function (i) {
                console.log(i);
                document.body.scrollTop = this.heightArr[i] - 64;
            }
        },
        computed: {
            displayUser: function () {
                let r = {};
                this.users.forEach(v=> {
                    let key = v.name_alias[0].toUpperCase();
                    if (!r[key]) {
                        r[key] = [];
                    }
                    r[key].push(v)
                });
                return r;
            },
            arr: function () {
                return Object.keys(this.displayUser).sort((a, b)=> {
                    return a.charCodeAt(0) - b.charCodeAt(0);
                });
            }
        },
        mounted: function () {
            var that = this;
            fetch('/api/getAllUser')
                .then(function (res) {
                    return res.json()
                })
                .then(function (data) {
                    that.users = data;
                })
        },
        updated: function () {
            if (this.users.length && this.inited) {
                var els = this.$refs.left.querySelectorAll('.title');
                for (var i = 0; i < els.length; i++) {
                    this.heightArr.push(els[i].offsetTop);
                }
                var that = this;
                window.onscroll = function () {
                    var top = document.body.scrollTop + 64;
                    var index = 0;
                    for (var i = 0; i < that.heightArr.length; i++) {
                        if (top <= that.heightArr[i]) {
                            index = i;
                            break;
                        }
                    }
                    that.current = that.arr[index];
                }
                this.inited = false;
            }
        },
        components: {
            'app-header': Header
        }
    }
</script>
<style lang="scss" scoped>
    .tips {
        position: fixed;
        top: 64px;
        left: 0;
        width: 100%;
        z-index: 10;
        background: #122b40;
        color: white;
    }
    .container{
        width:800px;
        margin:0 auto;
    }
    .right {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 120px;
        width: 20px;
        margin: auto;
        li {
        cursor: pointer;
    }

    li.active {
        background: red;
    }
    }
</style>
