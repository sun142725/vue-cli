<template>
    <div>
        <app-header></app-header>
        <div class="container">
            <div id="content" ref="content">
                <ul ref="ul">
                    <li v-for="v in messages">
                        <span>{{v.name}}:</span>
                        <span>{{v.message}}</span>
                    </li>
                </ul>
            </div>
            <div id="contact">
                ---------------在线
                <ul>
                    <li v-for="v in contacts.filter(r=>r.online)">
                        {{v.name}}
                    </li>
                </ul>
                ---------------离线
                <ul>
                    <li v-for="v in contacts.filter(r=>!r.online)">
                        {{v.name}}
                    </li>
                </ul>
            </div>
            <div id="input">
                <textarea v-model="message"></textarea>
                <button @click="send">发文本</button>
                <!--<button @click="send">发弹幕</button>-->
            </div>
        </div>
    </div>
</template>
<script>
    'use strict';
    import Header from '../Header.vue';
    import io from 'socket.io-client';
    export default{
        name:'chatRoom',
        data:function () {
            return{
                uid:'',
                name:'',
                socket:null,
                message:'',
                messages:[],
                contacts:[]
            }
        },

        methods:{
          send:function () {
              this.messages.push({name: this.name, message: this.message});
              this.socket.emit('message',{name:this.name,message:this.message});
              this.message='';
          }
        },
        components:{
            'app-header':Header,
        },
        mounted:function () {
            let that = this;
            fetch('/api/getMyInfo',{
                credentials:'include',
            })
                .then(res=>res.json())
                .then(function (data) {
                    that.uid = data.uid;
                    that.name = data.name;
                });
            fetch('/api/getAllUser')
                .then(res=>res.json())
                .then(data=>this.contacts=data);

            this.socket = io.connect('http://instantmessage.duapp.com:18080');
            this.socket.on('broad',function (data) {
               that.messages.push(data);
                console.log(data)
            });
            this.socket.on('news',function (onlineUser) {
                that.contacts=that.contacts.map(v=>{
                    if(onlineUser[v.id]){
                        v.online = true;
                    }else{
                        v.online = false;
                    }
                    return v;
                });
                console.log(onlineUser);
            })
        },
        updated:function () {
            this.$refs.content.scrollTop=this.$refs.ul.offsetHeight-370;
        }

    }
</script>
<style lang="scss" scoped>
    .container{
        width:800px;
        margin:0 auto;
        display: flex;
        flex-wrap: wrap;
        text-align: left;
    }
    #content{
        height:400px;
        flex-basis: 500px;
        padding:10px;
        border:1px solid #000000;
        overflow: scroll;

    }
    #contact{
        height: 400px;
        flex-basis:300px;
        padding:10px;
        border:1px solid #000000;
        overflow: scroll;
    }
    #input{
        height:100px;
        width: 800px;
        padding:10px;
        border:1px solid #000000;
        textarea{
            width: 600px;
            height:60px;
        }
    }
</style>