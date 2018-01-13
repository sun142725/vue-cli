<template>
    <div :class="'message-wrapper ' + data.type">
        <div class="message">
            {{data.message}}
        </div>
    </div>
</template>
<script>
    'use strict';
    export default{
        props: ['data']
    }
</script>
<style>
    .message {
        padding: 5px;
        font-size: 12px;
        display: inline-block;
        height: 26px;
        background-color: #4080ff;
        border-radius: 12px;
        color: #fff;
    }

    .message-wrapper {
        display: flex;
        padding: 8px 5px;
    }

    .message-wrapper.me {
        justify-content: flex-end;
    }

    .message-wrapper.other {
        justify-content: flex-start;
    }

    .message-wrapper.other .message {
        background-color: green;
    }
</style>