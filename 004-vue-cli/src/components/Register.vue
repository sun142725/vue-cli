<template>
    <div class="register">
        <form action="/api/register" @submit.prevent="submit" method="post">
            <input type="text" placeholder="account" name="account" v-model="account">
            <input type="password" placeholder="password" name="password" v-model="password">
            <input type="text" placeholder="name" name="name" v-model="name">
            <input type="submit" value="注册">
        </form>
    </div>
</template>
<script>
    'use strict';
    import router from '@/router';
    export default{
        name:'register',
        data:function () {
          return{
              account:'',
              password:'',
              name:'',
          }
        },
        methods:{
            submit:function () {
                fetch('/api/register',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({name:this.name,account:this.account,password:this.password})

                })
                    .then(res=>res.json())
                    .then(function (data) {
                        router.push({path:'login'});
                    })
            }
        }
    }
</script>