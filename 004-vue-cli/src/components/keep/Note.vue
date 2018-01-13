<template>
    <div class="note">
        <h3>{{data.title}}</h3>
        {{data.content}}
    </div>
</template>
<script>
    'use strict';
    export default{
        props:{
            data:Object,
        }
    }
</script>
<style lang="scss">
    .note{
        width: 45%;
        height:130px;
        background: white;
        color:black;
        box-sizing: border-box;
        padding-top:10px;
        margin-bottom:10px;
        float: left;
        margin-left:20px;
        border-radius: 10px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12);
    }
</style>