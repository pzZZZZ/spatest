<template>
    <v-touch ref="tapper" @press.default="pressStart">aaaaa</v-touch>
</template>
<script type="text/javascript">
    export default {
        data(){
            return{

            }
        },
        methods:{
            pressStart(){
                console.log('start')
                var timer = setTimeout(500,function(){
                    this.longprerss();
                    this.pressCancle();
                })
                
            },
            longprerss(){
                console.log(1)
            },
            pressCancle(){
                clearTimeout(timer);
                console.log('cancle')
            }
        }
        ,
        mounted(){

        }
    }
</script>