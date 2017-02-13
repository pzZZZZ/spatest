<template>
    <div class="product-container">
productinfo
    </div>
</template>
<script>
    export default {
      name: 'productInfo',
      data() {
            return{
                renderData: {}
            }
        },
        created(){
            console.log(this.$router);
        },
        mouted (){
            console.log(this.$router);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.product-container{
    padding: 10px;
}
</style>