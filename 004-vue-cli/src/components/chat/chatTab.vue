<template>
    <div id="chat-tab">
        <div class="chat-tab-wrapper" :style="{right:data.position+'px'}">
            <div class="chat-tab-large" v-show="!mini">
                <div class="chat-tab-header" @click="hide">
                    {{data.to.name}}
                    <div class="close" @click.stop="closeTab(data.to.id)">x</div>
                </div>
                <div class="chat-list">
                    <div v-for="(v,i) in data.messages" :key="i">
                        <Message :data="v"></Message>
                    </div>
                </div>
                <slot></slot>
            </div>
            <div class="chat-tab-mini" v-show="mini" @click="show">
                {{data.to.name}}
            </div>
        </div>
    </div>
</template>
<script>
    'use strict';
    import Message from './Message.vue';
    export default{
        name: 'chat-tab',
        props: ['data'],
        data: function () {
            return {
                mini: false
            }
        },
        methods: {
            closeTab:function (id) {
                this.$emit('close',id)
            },
            send: function (message) {
                this.$emit('send', message)
            },
            hide: function () {
                this.mini = true;
            },
            show: function () {
                this.mini = false;
            }
        },
        components: {
            Message
        }
    }
</script>
<style lang="scss" scoped>
    #chat-tab {

        .chat-tab-mini {
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 29px;
            width: 260px;
            background-color: #f6f7f9;
            border: 1px solid #dddfe2;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            box-shadow: none;
            padding-left: 12px;
            padding-right: 12px;
        }

        .chat-tab-wrapper {
            width: 260px;
            position: fixed;
            bottom: 0;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .3);
        }

        .chat-tab-large {
            background: #fff;
            height: 334px;
            overflow: hidden;
        }

        .chat-tab-header {
            .close{
                cursor:pointer;
                height:28px;
                position: absolute;
                top:0;
                bottom:0;
                margin:auto;
                right:4px;
            }
            position:relative;
            background-color: rgb(246, 247, 249);

            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .20);
            font-size: 13px;
            font-weight: bolder;
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 28px;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
        }

        .chat-list {
            height: 251px;
            overflow: auto;
        }

    }
</style>