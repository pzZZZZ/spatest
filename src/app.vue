<!--suppress ALL -->
<template>
  <div id="app">
      <transition name="slide-left">
        <router-view></router-view>
      </transition>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  html {
    height: 100%;
  }

  body {
    height: 100%;
  }

  #app {
    height:100%;
    width: 100%; 
  }

</style>
