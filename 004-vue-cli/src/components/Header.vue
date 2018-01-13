<template>
    <div class="header">
        <ul class="menu">
            <li><router-link :to="{name:'keep'}">keep</router-link></li>
            <li><router-link :to="{name:'contact'}">contact</router-link></li>
            <li><router-link :to="{name:'chatRoom'}">chatRoom</router-link></li>
        </ul>
    </div>
</template>
<script>
    'use strict';
    import router from '@/router';
    export default{
        name:'header'
    }
</script>
<style lang="scss" scoped>
    .header{
        height:64px;
        background: #fb0;
    }
    .menu{
        height:64px;
        display: flex;
        justify-content:center;
        align-content: space-around;
        li{
            line-height: 54px;
            a{
                display:block;
                margin:5px;
            }
        }
    }
    .header a {
        color: white;
    }
</style>