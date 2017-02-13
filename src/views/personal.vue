<template>
  <div class="personal">
    <c-title :text="title"></c-title>
    <!--title-->
    
    Personal
  </div>
</template>
<script>

  import {mapState} from 'vuex';
  import cTitle from 'components/title';
  import { Popup } from 'mint-ui';
  import Vue from 'vue';


  export default {
    data () {
      return {
        title: 'Personal',
        content: ''
      }
    },
    methods:{
     
},
    components: {cTitle}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
 .myCloset{
  flex:1;
  background: blue;
 }
</style>
