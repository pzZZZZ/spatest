<template>

  
</template>

<script>
import Vue from 'vue';
import { Cell } from 'mint-ui';
Vue.component(Cell.name, Cell);

  export default {
    props: ['text', 'hide'],
    mounted: function () {
      document.title = this.text;
    }
  }
</script>