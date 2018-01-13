var app=new Vue({
    el:'#app',
    data:{
        fileList:[]
    },
    methods:{
        getDataList:function(){
            var that=this;
            fetch('/getFileList')
                .then(res=>res.json())
                .then(function(data){
                    that.fileList=data
                })
        },
        submit:function(){
           var that=this;
           fetch('/uploadList',{
               method:'POST',
               body:new FormData(this.$refs.myForm)
           }).then(res=>res.text())
               .then(function(data){
                   if(data==='ok'){
                       that.getDataList();
                   }
               })
        }
    },
    mounted:function(){
         this.getDataList();
    }

});