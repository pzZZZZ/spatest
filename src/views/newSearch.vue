<template >
  <div class="search_con">
    <div class="search_input">
      <router-link class="cancel" to="/index">取消</router-link>
      <input v-model="keyWord" type="btext" name="" value=""/>
      <i v-on:click="Search" class="iconfont icon-sousuo_sousuo"></i>
    </div>
    <!-- <div class="search_header">
      <input v-model="keyWord" placeholder='请输入宝贝名称' type="btext" name="" value=""/>
      <i v-on:click="Search" class="iconfont icon-sousuo_sousuo"></i>
    </div> -->
    <div class="search_recommend">
      <ul v-infinite-scroll="loadMore">
        <li v-for="(item,index) in search.productList">
          <div class='recommend_box'>
            <img v-lazy="item.image_url"  v-bind:src="item.image_url" alt="">
            <h6 v-show='item.collectionFlag'v-on:click="DeleteFromMyCloset(index)" >
              <svg width="21px" height="20px" viewBox="3 4 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <polygon id="Star-Copy-3" stroke="none" fill="#FF9402" fill-rule="evenodd" points="13.5105652 19 7.63271264 22.0901699 8.75528258 15.545085 4 10.9098301 10.5716389 9.95491503 13.5105652 4 16.4494914 9.95491503 23.0211303 10.9098301 18.2658477 15.545085 19.3884177 22.0901699"></polygon>
             </svg>
           </h6>
            <h6 v-show='!item.collectionFlag' v-on:click="joinMyCloset(index)">
              <svg width="23px" height="22px" viewBox="207 222 23 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <polygon id="Star-Copy-2" stroke="#222222" stroke-width="1" fill="none" points="218.510565 239 212.632713 242.09017 213.755283 235.545085 209 230.90983 215.571639 229.954915 218.510565 224 221.449491 229.954915 228.02113 230.90983 223.265848 235.545085 224.388418 242.09017"></polygon>
              </svg>
            </h6>
          </div>
          <!-- <h5>{{item.name}}</h5> -->
          <h5>2017冬季新款羊毛套衫保暖舒适简约风格</h5>
         </li>
      </ul>
      <div class='nomore' v-show="loadEnd">没有更多了~</div>
    </div>
  </div>
</template>
<script>
  import {InfiniteScroll,Lazyload,Toast}  from 'mint-ui';
  import Vue from 'vue';
  import 'whatwg-fetch';
  Vue.use(InfiniteScroll);
  Vue.use(Lazyload);
  Vue.use(Toast);
  import CONSTANTS from '../constants.js';
  export default {
    data () {
        return {
          search:{
            productList:[], //推荐图片列表
            loadFlag:true,   //是否还要加载更多
            userName:"test1234", //用户名
            offset:0, //索引
            keyWord:'', //输入关键字
            searchFlag: false ,//是否点击了搜索
            importModel: false ,//是否显示模态框
            loadEnd: false, //是否加载完所有数据
          }
        }
    },
    mounted(){
      //获取图片资源
        this.getMayLikeProduct(this);
    },
    methods: {
      //加载更多图片
      loadMore(){
        var that=this;
        if (that.search.loadFlag) {
          if(!that.search.searchFlag){
            that.getMayLikeProduct(that);
            that.search.offset =  that.search.productList.length;
          }else{
            that.getSearchProduct(that);
            that.search.offset =  that.search.productList.length;
          }
        }else{
          that.search.loadEnd = true;
          console.log('加载完');
        }
      },
      getMayLikeProduct(that){
        //获取推荐数据
        var that = that;
        var productApi=CONSTANTS.RECOMMEND+'/?user_name='+that.search.userName+'&offset='+that.search.offset;
        //var productApi=CONSTANTS.RECOMMEND+'/?user_name='+that.$store.state.username+'&offset='+that.search.offset;
        if(that.search.loadFlag){
        fetch(productApi)
            .then(function (response) {
                return response.json()
            }).then(function (result) {
              if(result.code == 0){
                for(var i =0 ;i < result.products.length ;i++){
                  result.products[i].collectionFlag = false;
                }
                that.search.productList = that.search.productList.concat(result.products);
                that.search.loadFlag = result.more;
              }else {
                console.log('服务器未正常返回数据');
              }
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
          }
      },
      getSearchProduct(that){
        //加载搜索结果
        var that = that;
        var searchApi=CONSTANTS.SEARCH+'/?keyword='+that.search.keyWord+'&user_name='+that.$store.state.username+'&offset='+that.search.offset;
        fetch(searchApi)
            .then(function (response) {
                return response.json()
            }).then(function (result) {
              if(result.code == 0){
                for(var i =0 ;i < result.products.length ;i++){
                  result.products[i].collectionFlag = false;
                }
                that.search.productList = that.search.productList.concat(result.products);
                that.search.loadFlag = result.more;
              }else {
                console.log('服务器未正常返回数据');
              }
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
        },
      Search(){
        //搜索
        this.search.productList = [];
        this.search.searchFlag = true;
        this.getSearchProduct(this);
     },
     joinMyCloset(index){
        //加入我的衣橱
        var that = this;
        that.search.productList[index].collectionFlag = true;
        console.log('jiaru');
        var product_id = that.search.productList[index].id;
        var source;
        if (that.search.searchFlag) {
          source = 'search';
        }else{
          source = 'browse';
        }
        var addApi = CONSTANTS.ADD_TO_CLOSET;
        fetch(addApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'user_name='+that.$store.state.username+'&product_id='+product_id+'&source='+source
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            console.log(result);
            if (result.code == 0) {
              Toast({
                message: '已添加至衣橱',
              });
            } else {
                console.log('服务器未正常返回数据');
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        });
     },
     DeleteFromMyCloset(index){
       //从我的衣橱删除
      this.search.productList[index].collectionFlag = false;
     },
     Add(){
       //继续添加
       this.search.importModel = false;
     }
   }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .search_con{
      background: #F0F3F5;
      .search_input{
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding: 25px 20px 0;
        display: flex;
        align-items:center;
        justify-content: space-between;
        position: relative;
        .cancel{
          width: 45px;
        }
        input{
          flex: 1;
          border: 1px solid #eee;
          height: 30px;
          border-radius: 10px;
          box-sizing: border-box;
          padding:0 30px 0 10px;
        }
        i{
          position: absolute;
          right: 30px;
          cursor: pointer;
        }
      }
      .search_header{
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding: 25px 20px 0;
        position: relative;
        input{
          width: 100%;
          height: 28px;
          border-radius: 10px;
          box-sizing: border-box;
          padding: 0 10px 0 30px;
        }
        i{
          position: absolute;
          right: 30px;
          top: 30px;
        }
    }
    .search_recommend{
        ul{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          box-sizing: border-box;
          padding: 20px 20px 0px 0px;
          li{
            box-sizing: border-box;
            width: 50%;
            padding:0 0 20px 20px;
            .recommend_box{
              position:relative;
              h6{
                width: 25px;
                height: 25px;
                position:absolute;
                left: 0;
                top: 0;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              img{
                width: 100%;
                height: 100%;
              }
              i{
                font-size: 18px;
              }
            }
          }

        }
    }
  }
</style>
