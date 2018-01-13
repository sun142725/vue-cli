<template>
    <div class="containers">
        <div class="input" v-show="!open" @click="showCard">添加记事...</div>
        <div class="card" v-show="open">
            <div class="title">
                <input type="text" v-model="title" placeholder="标题">
            </div>
            <div class="content">
                <input type="text" v-model="content" placeholder="添加记事...">
            </div>
            <div class="button" @click="addNode">完成</div>
        </div>

    </div>
</template>
<script>
    'use strict';
    export default{
        name: 'AddNote',
        data: function () {
            return {
                open: false,
                title:'',
                content:'',
                notes:[]
            }
        },
        methods: {
            showCard: function () {
                this.open=true
            },
            addNode:function () {
                this.open=false;
                this.$emit('insert',{id:1,title:this.title,content:this.content});
                this.title='';
                this.content='';
            }
        }
    }
</script>
<style lang="scss" scoped>
    .containers {
        width: 600px;
        margin: 20px auto;
    }
    .input {
        height: 40px;
        color: rgba(0,0,0,.54);
        font-size: 14px;
        line-height: 19px;
        min-height: 46px;
        padding: 12px 15px 15px 15px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12);
        text-align: left;
        background: #ffffff;
    }

    .card {
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12);
        background: #ffffff;
        .title {
            min-height: 40px;
            input{
                height: 40px;
                color: rgba(0,0,0,.54);
                font-size: 14px;
                line-height: 19px;
                min-height: 46px;
                padding: 12px 15px 15px 15px;
                text-align: left;
                width: 100%;
                border:none;
                outline:none;
            }
        }
        .content {
            min-height: 50px;
            input{
                color: rgba(0,0,0,.54);
                font-size: 14px;
                line-height: 19px;
                min-height: 46px;
                padding: 12px 15px 15px 15px;
                text-align: left;
                width: 100%;
                border:none;
                outline:none;
            }
        }
    }
    .button{
        width: 100%;
        height: 40px;
        text-align: right;
        line-height: 40px;
        padding:0 10px;
        cursor: pointer;
    }
</style>
