<template>
  <div id="el" @dblclick="addNote"
       @mouseup="mu"
       @mousemove="mv">
    <div class="header"></div>
    <div class="content">
      <div :class="`note ${v.theme} ${i==moveEvent.index?'active':''}`" v-for="(v,i) in notes"
           :key="v.id"
           :style="{top:v.top+'px',left:v.left+'px'}">
        <h3 class="title"
            @mousedown.prevent.stop="md(i,$event)">
          {{v.title}}
        </h3>
        <div class="content">
          <textarea @keyup.stop="save" v-model="v.content"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    'use strict';
    var colors = ['red', 'green', 'blue', 'orange'];
    export default {
        name: 'el',
        data () {
            return {
                notes: [
                    {id: 1, title: '便签1', content: 'a', top: 10, left: 120, theme: 'red'}
                ],
                moveEvent: {state: false, index: null, position: {}}
            }
        },
        methods: {
            md: function (i, e) {
                this.moveEvent.index = i;
                this.moveEvent.position = {
                    x: e.offsetX,
                    y: e.offsetY
                };
                this.moveEvent.state = true;
            },

            mv: function (e) {
                if (this.moveEvent.state) {
                    var top = e.clientY - 44 - this.moveEvent.position.y;
                    var left = e.clientX - this.moveEvent.position.x;
                    this.notes[this.moveEvent.index].top = top;
                    this.notes[this.moveEvent.index].left = left;
                    this.save();
                }
            },

            mu: function () {
                this.moveEvent.state = false;
            },

            save: function () {
                localStorage.notes = JSON.stringify(this.notes);
            },

            addNote: function (e) {
                var
                    id = this.notes.length ?
                        (this.notes[this.notes.length - 1].id + 1) : 1,
                    top = e.clientY - 44 - 18,
                    left = e.clientX - 100,
                    title = '便签' + id,
                    theme = colors[Math.floor(Math.random() * colors.length)];

                this.notes.push({id, title, top, left, theme});
                this.save();
            }
        },

        mounted: function () {

            document.onkeyup = (function (e) {
                if (this.moveEvent.index != null && e.keyCode === 8) {
                    this.notes.splice(this.moveEvent.index, 1);
                    this.moveEvent.index =
                        this.notes.length ?
                            this.notes.length - 1 : null;
                    this.save();
                }
            }).bind(this);

            if (localStorage.notes) {
                this.notes = JSON.parse(localStorage.notes);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
  html{
    height: 100%;
  }
  #el {
    height: 100%;
  }
  .header {
    height: 44px;
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left:0;
  }

  .content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .note {
    overflow: hidden;
    border-radius:3px;
    position: absolute;
    top: 100px;
    left: 200px;
    width: 200px;
    box-shadow: inset 1px 1px 0 rgba(0,0,0,.1), inset 0 -1px 0 rgba(0,0,0,.07);
  }
  .note.red .title {
    background: #dc2f23;
  }

  .note.blue .title {
    background: #3768fb;
  }
  .note.green .title {
    background: #359933;
  }
  .note.orange .title {
    background: #f6b200;
  }

  .note.active {
    z-index: 10000;
    box-shadow: 1px 5px 30px rgba(0, 0, 0, 0.3);
  }

  .note .title {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: move;
    font-size: 14px;
    color: white;
    text-align: center;
    line-height: 36px;
    font-weight: normal;
    height: 36px;
  }

  .note .content {
    padding: 20px;
    min-height: 200px;
    background: #fff;
    color: #666;
  }

  .note textarea {
    font-family: Consolas, Sana, sans-serif;
    border: none;
    min-height: 100px;
    font-size: 13px;
    width: 100%;
    outline: none;
    resize: none;
  }

</style>
