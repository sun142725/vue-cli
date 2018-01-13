<template>
    <transition appear appear-class="fly" appear-to-class="a"
                appear-active-class="b">
        <div id="chat">
            <div class="chat-wrapper">
                <div class="chat-large" v-show="!mini">
                    <div class="chat-header" @click="hide">
                        chat
                    </div>
                    <div class="friend-list">
                        <ul>
                            <li @click="openTab(v)" :key="v.id" v-for="v in contacts.filter(v=>v.online)">
                                <div class="u-pic"></div>
                                <div class="u-name">{{v.name}}</div>
                                <div v-if="v.online" class="last-online-time" style="color:#4cae4c">online</div>
                                <div v-else class="last-online-time">offline</div>
                            </li>
                            <li @click="openTab(v)" :key="v.id" v-for="v in contacts.filter(v=>!v.online)">
                                <div class="u-pic"></div>
                                <div class="u-name">{{v.name}}</div>
                                <div v-if="v.online" class="last-online-time" style="color:#4cae4c">online</div>
                                <div v-else class="last-online-time">offline</div>
                            </li>
                        </ul>
                    </div>
                    <div class="search"></div>
                </div>
                <div class="chat-mini" v-show="mini" @click="show">
                    chat
                </div>
            </div>
            <!-- from一个user对象   to一个user对象  messages 一个数组 -->
            <chat-tab @close="closeTab" v-for="(v,i) in tabs" :data="v" :key="i">
                <MessageInput @send="send" :data="v"></MessageInput>
            </chat-tab>
        </div>
    </transition>
</template>
<!--suppress JSUnresolvedFunction -->
<script>
    import ChatTab from './ChatTab.vue';
    import MessageInput from './MessageInput.vue';
    import io from 'socket.io-client';
    const serverUrl = 'http://instantmessage.duapp.com:18080';

    class ChatTabData {
        constructor(from, to, position = 0, messages = []) {
            this.from = from; // {id,sid,name}
            this.to = to;     // {id,sid,name}
            this.position = position;
            this.messages = messages;
        }
    }
    export default{
        name: 'chat',
        data: function () {
            return {
                user: {},
                mini: false,
                socket: null,
                onlineUsers: {},  // 在线用户  { 1:'xxqZ_...' }
                contacts: [],     // 所有用户 [{},{}]
                tabs: []          // 所有选项卡 [{},{}]
            }
        },

        methods: {
            closeTab: function (id) {
                this.tabs = this.tabs.filter(v=> v.to.id != id)
            },
            hide: function () {
                this.mini = true;
            },

            show: function () {
                this.mini = false;
            },

            // 打开聊天窗口
            openTab: function (user) {
                var from = {};
                from.id = this.user.id;
                from.name = this.user.name;
                from.sid = this.onlineUsers[from.id];

                var to = {};
                to.id = user.id;
                to.name = user.name;
                to.sid = this.onlineUsers[to.id];

                let t = this.tabs.filter(v=>v.to.id == to.id);
                if (!t.length) {
                    let o = new ChatTabData(from, to);
                    this.tabs.unshift(o);

                    // 调整窗口的位置
                    this.tabs = this.tabs.map((v, i)=> {
                        v.position = (i + 1) * 300;
                        return v;
                    });
                }
            },

            // 发送消息
            send: function (data, message) {
                this.tabs.forEach((v, i)=> {
                    if (v.to.id == data.to.id) {
                        let o = {
                            type: 'me',
                            message
                        };
                        v.messages.push(o);
                    }
                });
                this.socket.emit('private', {data, message})
            },

            // 接收消息
            watchIncomingMesaage: function () {
                this.socket.on('incomingMessage', (v)=> {
                    var from = {};
                    from.id = this.user.id;
                    from.name = this.user.name;
                    from.sid = this.onlineUsers[from.id];

                    var to = {};
                    to.id = v.data.from.id;
                    to.name = v.data.from.name;
                    to.sid = this.onlineUsers[to.id];

                    let t = this.tabs.filter(v=>v.to.id == to.id);
                    if (!t.length) {
                        let o = new ChatTabData(from, to);
                        let m = {
                            type: 'other',
                            message: v.message
                        };
                        o.messages.push(m);
                        this.tabs.unshift(o);
                        // 调整窗口的位置
                        this.tabs = this.tabs.map((v, i)=> {
                            v.position = (i + 1) * 300;
                            return v;
                        });
                    } else {
                        let m = {
                            type: 'other',
                            message: v.message
                        };
                        t[0].messages.push(m);
                    }
                });
            },

            // 获取所有联系人
            getAllUser: function () {
                fetch('/api/getAllUser').then(res => res.json()).then(data => {
                    data = data.filter(v=> v.id != this.user.id);
                    this.contacts = data;
                });
            },

            // 连接到socket服务器
            connect: function () {
                this.socket = io.connect(serverUrl);
            },

            // 监测在线联系人,实时反映
            watchOnlineUser: function () {
                this.socket.on('onlineUserChange', (onlineUsers) => {
                    this.onlineUsers = onlineUsers;
                    this.contacts = this.contacts.map(v=> {
                        v.online = !!this.onlineUsers[v.id];
                        return v;
                    })
                });
            },

            // 初始化
            init: function () {
                this.user = JSON.parse(localStorage._chat_user);
                this.getAllUser();
                this.connect();
                this.watchOnlineUser();
                this.watchIncomingMesaage();
            }
        },
        mounted: function () {
            this.init();
        },
        components: {
            'chat-tab': ChatTab,
            MessageInput
        }
    }
</script>


<style lang="scss" scoped="">
    .fly {
        animation: fly .8s ease both;
    }

    @keyframes fly {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    #chat {

        .chat-mini {
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 29px;
            width: 276px;
            background-color: #f6f7f9;
            border: 1px solid #dddfe2;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            box-shadow: none;
            padding-left: 12px;
            padding-right: 12px;
        }

        .chat-wrapper {
            width: 276px;
            position: fixed;
            right: 18px;
            bottom: 0;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .3);
        }

        .chat-large {
            height: 345px;
            overflow: hidden;
        }

        .chat-header {
            font-size: 13px;
            font-weight: bolder;
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;
            height: 28px;
            background: #4080ff;
            box-shadow: 0 1px 0 0 rgba(0, 0, 0, .10);
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
        }

        .friend-list {
            height: 285px;
            overflow: auto;
            background: #f6f7f9;

            li {
                cursor: pointer;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
            }

            .u-pic {
                flex-basis: 32px;
                height: 32px;
                background: #4080ff;

            }

            .u-name {
                flex-basis: 180px;
                font-size: 12px;
            }

            .last-online-time {
                flex-basis: 20px;
                font-size: 12px;
            }

        }

        .search {
            height: 31px;
            border-left: 1px solid rgba(0, 0, 0, .10);
            border-right: 1px solid rgba(0, 0, 0, .10);
            border-top: 1px solid #dadfea;
            background: #f6f7f9;
        }

    }
</style>