<template>
  <div class="myCloset">
    <c-title :text="title"></c-title>
    <!--title-->
    <!-- loading -->
    <div class="loading" v-if='loading'>
      <div class="loading_icon">
         <mt-spinner :type='1' color='#26a2ff' :size='100' ></mt-spinner>
          <!--<p>数据加载中......</p>-->
      </div>
    </div>
    <!-- header -->
    <div class="header">
     <!--  <div class="select"><button>Select</button></div> -->
  <!--     <div v-if='active_btn == 0'><button class="active_btn" >All items</button><button  @click='swiperChange' >Wish Lish</button></div> -->
            <div v-if='active_btn == 0'><div class="active_btn"><i class="iconfont icon-yigui"></i><p>我的衣橱</p></div><div @click='swiperChange'><i class="iconfont icon-lianyiqun"></i><p>我的搭配</p></div><div class="more">
        <router-link to="/search"> <i class="iconfont icon-faxian"></i><p>发现好物</p></router-link>
      </div></div>
      <div v-else><div @click='swiperChange'><i class="iconfont icon-yigui"></i><p>我的衣橱</p></div><div class="active_btn"><i class="iconfont icon-lianyiqun"></i><p>我的搭配</p></div><div class="more">
        <router-link to="/search"> <i class="iconfont icon-faxian"></i><p>发现好物</p></router-link>
      </div></div>
    </div>

    <!-- main_box -->
   <div class="swiperbox">
     <div class="swiper-container">
      <div class="swiper-wrapper">
       <!--  swiper1 -->
        <div class="swiper-slide" id='wrapper'>
            <ul class="list1"> 
            <!-- 图片列表 -->
              <li class="imgsbox" v-for="(item,index) in closet.myCloset_allItems" v-on:click="toggleMix(item)" key="item.id" v-bind:class="{'checked':!!item.checked}">
                  <div v-if='index === closet.myCloset_index_num' class="delthis" @click.stop='deleteProducts'>
                      <img src="../assets/images/delete2.svg" alt="">
                  </div>
                  <div class="selectBtn"></div>
                  <v-touch ref="tapper" @press.prevent="pressStart(item,index)"  >
                  <div class="li-container">
                      <img v-bind:src='item.image_url'>
                      <div class="overlay">
                          <i class="iconfont icon-gouxuan"></i>
                      </div>
                  </div>
                  </v-touch>
              </li>
            </ul>
        </div>
        <!-- swiper2 -->
        <div class="swiper-slide" id='wrapper1'>
          <!-- <ul class="list2">
              <li v-for='item in closet.items'>{{item}}aaa</li>
            </ul> -->
             <div class="dapei_con">
                <ul>
                  <li v-for="list in closet.looks">
                    <div class="img_box">
                        <img v-bind:src="list.look_image_url"  class='outfit_img'alt="">
                    </div>
                  </li>
                </ul>
              </div>
        </div>
        <!-- swiper3 -->
        <!-- <div class="swiper-slide" id='wrapper3'>
          <ul class="list3">
              <li v-for='item in items'>{{item}}aaa</li>
            </ul>
        </div> -->
      </div>
    </div>
   </div>
      <router-link to="/mix" v-if="countMixClothes > 0">
          <div class="mix-btn">
              MIX
          </div>
      </router-link>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import cTitle from 'components/title';
import Vue from 'vue';
import _ from 'lodash';
import {swiper, swiperSlide, swiperPlugins} from 'vue-awesome-swiper';
import {Spinner} from 'mint-ui';
import CONSTANTS from '../constants.js';
import {InfiniteScroll,Lazyload}  from 'mint-ui';
import 'whatwg-fetch';
  Vue.use(InfiniteScroll);
  Vue.use(Lazyload);
Vue.component(Spinner.name, Spinner);
export default {
    data () {
        return {
            title: 'myCloset',
            swiperOption: {
                autoplay: false
            },
            //myCloset_allItems: [],
            Swiper: {},
            active_btn: 0,
            userName:'test1234',
            //offset:0,
           // transitionName: 'slide-left',
            //myCloset_index_num:'',
         closet: {
            offset: 0,
            looks: [],
            myCloset_allItems: [],
            myCloset_index_num:'',
             items: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, , 2, 2, 2, 2, 2, , 2, 2, 2, , 2, 2, 2, 2, 2, 2, , 2, 2, 2, 2, 2, 2, , 2, 22, 2, , 2, 2, 2, 2, , 2, 2, 2, 2, 2, 21, 1, 1, , 1, 1, 1, , 1, 1, 1, , 1, 1, 2, , 2, 2, 2, 2, 2, 22, 2, 2, 2],
             loading: false
          },
          outfit: {
            offset: 0
          }
        }
    },
    created(){
        //console.log(CONSTANTS.GET_CLOSET_PRODUCT_LIST);
    },
    mounted(){

        //TODO retrive selected mix products later
        this.$store.commit('clearAllMix');

        var that = this;
        //加载图片数据

        //fetch(CONSTANTS.GET_CLOSET_PRODUCT_LIST+'?user_name='+this.$store.state.username+'&offset='+that.offset)
        fetch(CONSTANTS.GET_CLOSET_PRODUCT_LIST+'/?user_name='+that.userName+'&offset='+that.closet.offset)
        .then(function (response) {
            return response.json()
        }).then(function (result) {
            console.log(result);
            /*_(result.products).forEach(item => {
                _(that.$store.state.mixedClothes).forEach(mixed => {
                    _(result.products).find({iid: mixed.iid}).checked = true;
                });
            });*/
            that.closet.myCloset_allItems = result.products;
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        }).then(function () {
            //异步解决IScroll高度不能正确获取问题
            that.Swiper = new Swiper('.swiper-container', {
                onSlideChangeEnd: function (swiper) {
                    //console.log(that.Swiper.activeIndex)
                    that.Swiper.activeIndex == 1 ? that.active_btn = 1 : that.active_btn = 0;//切换后callback 设置btn的active值
                    // console.log(that.Swiper.activeIndex)
                }
            });//实例化swiper

            // var wrapper = document.getElementById('wrapper');
            // var wrapper1 = document.getElementById('wrapper1');
            // var myScroll = new IScroll(wrapper, {
            //     mouseWheel: true
            // });
            //实例化swiper1中的IScroll
            // var myScroll1 = new IScroll(wrapper1, {
            //     mouseWheel: true
            // })
            //实例化swiper2中的IScroll
            // console.log(that.allItems)
            that.loading = false;//控制loading的关闭
        });
         this.getDapeiList();
    },
    methods: {
        //切换swiper的index方法
        swiperChange(){
            // console.log(this.Swiper)
            if (this.Swiper.activeIndex == 0) {
                this.Swiper.slideTo(1, 400, false);
                this.active_btn = 1;
            } else {
                this.Swiper.slideTo(0, 400, false);
                this.active_btn = 0;
            }
        },
        toggleMix (clothItem){
            this.$set(clothItem, 'checked', !clothItem.checked);
            if (!!clothItem.checked) {
                this.$store.commit('addMix', clothItem);
            } else {
                this.$store.commit('removeMix', clothItem.iid);
            }
        },
        deleteProducts(){
            //删除
            console.log(this.closet.myCloset_allItems[this.closet.myCloset_index_num].id)
            var that = this;
            var deleteApi = CONSTANTS.DELETE_FROM_CLOSET;

            fetch(deleteApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'user_name='+that.userName+'&product_id='+that.closet.myCloset_allItems[that.closet.myCloset_index_num].id
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                console.log(result);
                if (result.code == 0) {
                    that.closet.myCloset_allItems.splice(that.closet.myCloset_index_num,1);
                   that.flag =false;
                   that.closet.myCloset_index_num ='';
                } else {
                    console.log('服务器未正常返回数据');
                }
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            });
        },
         pressStart(item,index){
                console.log(index);
                this.closet.myCloset_index_num = index ;
                // console.log(item);
                // let that = this;
                // var timer = setTimeout(function(){
                //     that.longprerss(item);//长按逻辑处理
                //      clearTimeout(timer);
                // },500)
            },
       getDapeiList(){
        //获取我的搭配
        var that = this;
       // var dapeiApi=CONSTANTS.GET_LIKED_OUTFITS+'/?user_name='+that.$store.state.username+'&offset='+that.outfit.offset;
        var dapeiApi=CONSTANTS.GET_LIKED_OUTFITS+'/?user_name='+that.userName+'&offset='+that.outfit.offset;
        fetch(dapeiApi)
          .then(function (response) {
              return response.json()
          }).then(function (result) {
              if(result.code == 0){
                 that.closet.looks = result.looks;
                 console.log(result+'result')
              }else {
                console.log('服务器未正常返回数据');
              }
          }).catch(function (ex) {
              console.log('parsing failed', ex)
          })
      }
    },
    computed: {
        countMixClothes (){
            var count = 0;
            for(let i=0;i<this.closet.myCloset_allItems.length;i++){
                if(this.closet.myCloset_allItems[i].checked){
                    count++;
                }
            }
            console.log(count);
            return count;
            //return _.filter(this.myCloset_allItems, n => n.checked).length;
        },
        calcRowWidth (row){
        }
    },
    components: {
        cTitle,
        swiper,
        swiperSlide
    }
}
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
    .myCloset {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .header {
            display: flex;
            background: #fff;
            height: 76px;
            &>div{
                padding:0 10vw;
                display:flex;
                flex:1;
                justify-content:space-between;
                align-items:center;
                &>div{
                    text-align:center;
                    color:#999999;
                    p{  padding-top:5px;
                        font-size:14px;
                    }
                }
            }
            .icon-yigui,.icon-lianyiqun,.icon-faxian{
               font-size:24px;
               color:#999999;
            }
            .active_btn {
                color: rgba(0, 0, 0, 1) !important;

            }
            button {
                outline: none;
                border: none;
            }
            .more{
                a{
                    color: #999;
                }
            }
        }
        .swiperbox {
            background: #eee;
             flex:1;
             overflow:hidden;
            .swiper-container {
                 height:100%;
                .swiper-wrapper {
                height:100%;
                    .swiper-slide {
                        height:100%;
                        overflow:scroll;
                        .list1 {
                            overflow: hidden;
                            display:flex;
                            flex-wrap:wrap;
                            justify-content:flex-start;
                            align-items:flex-start;
                            padding:40px 20px 80px;
                            li {

                                position:relative;
                                width: 50%;
                                // float: left;
                                padding:0px 0 60px 0;
                                &:nth-child(2n) {
                                    padding-left: 12px;
                                    .delthis{
                                        left:5px;
                                    }
                                    .selectBtn{
                                    left:calc(50% - 8px);

                                    }

                                }
                                &:nth-child(2n+1) {
                                    padding-right: 12px;

                                }
                                .delthis{
                                    position:absolute;
                                    z-index:100;
                                    height:16px;
                                    width:16px;
                                    top:-10px;
                                    left:-5px;
                                    border-radius:50%;
                                    overflow:hidden;

                                }
                                .selectBtn{
                                    width:16px;
                                    height:16px;
                                    border:1px solid #FF9402;
                                    border-radius:50%;
                                    position:absolute;
                                    z-index:100;
                                    bottom:20px;
                                    left:calc(50% - 16px);

                                }
                                .li-container {
                                    position: relative;
                                    height: 100%;
                                    .overlay {
                                        display: none;
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        left: 0;
                                        top: 0;
                                        background: rgba(0, 0, 0, .5);
                                        margin: 0;
                                        border-radius: 5px;
                                        i {
                                            font-size: 60px;
                                            color: #fff;
                                            position: absolute;
                                            left: 50%;
                                            top: 50%;
                                            margin-left: -30px;
                                            margin-top: -27px;
                                        }
                                    }
                                }
                                &.checked {
                                    .overlay {
                                        display: block;
                                    }
                                }
                            }
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 5px;
                                border: 1px solid #ccc;
                            }
                        }

                        .list2 {
                            overflow: hidden;
                            display:flex;
                            flex-wrap:wrap;
                            justify-content:flex-start;
                            align-items:flex-start;
                            padding:40px 20px 80px;
                           
                        }
                    }
                }
            }

        }
        .mix-btn {
            width: 100%;
            height: 0.44rem;
            line-height: 0.44rem;
            background-color: #222;
            position: fixed;
            bottom: 0;
            text-align: center;
            z-index: 2;
            font-size: 0.16rem;
            color: #fff;
        }
    }

    .child-view {
        position: absolute;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .my-closet {
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }
     .dapei_con{
                                 width: 100%;
                                 ul{
                                   display: flex;
                                   width: 100%;
                                   flex-wrap: wrap;
                                   background: #F0F3F5;
                                   box-sizing: border-box;
                                   padding: 10px 10px 0px 0px;
                                   li{
                                     box-sizing: border-box;
                                     width: 50%;
                                     padding:0 0 10px 10px;
                                    
                                     .img_box{

                                       img{
                                        width:100%;
                                       }
                                     }
                                   }
                                 }
                               }
</style>
