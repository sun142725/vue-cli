<template>
    <div class="keep">
        <app-header></app-header>
        <div class="container">
            <AddNote @insert="insert"></AddNote>
            <ul class="note-list">
                <Note v-for="v in notes" :data="v"></Note>
            </ul>
        </div>
        <Chat></Chat>
    </div>
</template>
<script>
    'use strict';
    import Header from '../Header'
    import AddNote from './AddNote.vue'
    import Note from './Note.vue'
    import Chat from '../chat/Chat.vue';
    export default {
        name: 'keep',
        data: function () {
            return {
                notes: []
            }
        },
        methods: {
            insert: function (v) {
                this.notes.push(v);
            }
        },
        watch: {
            notes: function () {
                localStorage.notes = JSON.stringify(this.notes);
            }
        },
        mounted: function () {
            if (localStorage.notes) {
                this.notes = JSON.parse(localStorage.notes);
            }
        },
        components: {
            'app-header': Header,
            AddNote,
            Note,
            Chat
        }
    }
</script>
<style lang="scss" scoped>
    .note-list {
        padding-top: 50px
    }

    .container {
        width: 600px;
        margin: 20px auto 0 auto;
        background: #fb4;
        height: 40px;
    }
</style>
