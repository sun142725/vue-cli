<template>
    <div id="message-input">
        <textarea @keyup.enter="submit" v-model="message" placeholder="Type a message"></textarea>
    </div>
</template>
<script>
    'use strict';
    export default{
        name: 'message-input',
        props: ['data'],
        data: function () {
            return {
                message: ''
            }
        },
        methods: {
            submit: function () {
                this.$emit('send', this.data, this.message);
                this.message = '';
            }
        }
    }
</script>
<style>
    #message-input {
        height: 57px;
        border-top: 1px solid #c9d0da;
    }

    textarea {
        box-sizing: border-box;
        padding: 10px 8px 6px;
        border: none;
        resize: none;
        height: 32px;
        outline: none;
        display: block;
        width: 100%;
    }
</style>