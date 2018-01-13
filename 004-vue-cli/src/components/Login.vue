<template>
    <div class="login">
            <input type="text" placeholder="account" name="account" v-model="account">
            <input type="password" placeholder="password" name="password" v-model="password">
            <input type="submit" value="登录" @click="send">
            <router-link :to="{name:'register'}">去注册</router-link>
    </div>
</template>
<script>
    'use strict';
    import router from '@/router';
    export default{
        name:'login',
        data:function () {
          return{
              account:'',
              password:'',
          }
        },
        methods:{
            send:function () {
                fetch('/api/login',{
                    credentials:'include',
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({account:this.account,password:this.password})
                })
                    .then(res=>res.text())
                    .then(function (data) {
                        if(data){
                            localStorage._chat_user=data;
                            router.push({name: 'keep'})
                        }
                    })
            }
        },
    }
</script>