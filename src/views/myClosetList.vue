<template>
  <div class="my-closet-list">
    <c-title :text="title"></c-title>
    <!--title-->

    <header>
      <div class="select"><button>Select</button></div>
      <div><button>All items</button><button>Wish Lish</button></div>
      <div class="more">
      <!--<svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tixing"></use>
      </svg>-->
      </div>
    </header>
    <section class="contentbox">
      <swiper  :options="swiperOption" infinite-scroll-disabled="true"  ref='mySwiperA'>
         <swiper-slide >
            <ul class="items_box">
              <li v-for="item in allItems" v-on:click="toggleMix(item)" v-bind:class="{'checked':!!item.checked}">
                <img v-bind:src='item.imgSrc'/>
                  <div class="overlay">
                      <i class="iconfont icon-gouxuan"></i>
                  </div>
              </li>
            </ul>
         </swiper-slide>
         <swiper-slide>Slider2</swiper-slide>
      </swiper>
        <router-link to="/mix" v-if="countMixClothes > 0">
            <div class="mix-btn">
                MIX
            </div>
        </router-link>
    </section>

  </div>
</template>
<script>
import {mapState} from 'vuex';
import cTitle from 'components/title';
import Vue from 'vue';
import {InfiniteScroll, Popup, Navbar, TabItem} from 'mint-ui';
import AwesomeSwiper from 'vue-awesome-swiper';
import  'whatwg-fetch';
import _ from 'lodash';
Vue.use(AwesomeSwiper);
Vue.use(InfiniteScroll);
import {swiper, swiperSlide, swiperPlugins} from 'vue-awesome-swiper';
export default {
    data () {
        return {
            title: 'myCloset',
            swiperOption: {
                autoplay: false
            },
            allItems: []
        }
    },
    created: function () {
        var _this = this;
        fetch('/api/hello')
            .then(function (response) {
                return response.json()
            }).then(function (result) {
            _(result).forEach(item => {
                _(_this.$store.state.mixedClothes).forEach(mixed => {
                    _(result).find({id: mixed.id}).checked = true;
                });
            });
            _this.allItems = result;
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    },
    methods: {
        toggleMix (clothItem){
            this.$set(clothItem, 'checked', !clothItem.checked);
            if (!!clothItem.checked) {
                this.$store.commit('addMix', clothItem);
            } else {
                this.$store.commit('removeMix', clothItem.id);
            }
        }
    },
    computed: {
        countMixClothes (){
            return _.filter(this.allItems, n => n.checked).length;
        }
    },
    components: {
        cTitle,
        swiper,
        swiperSlide
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
 .my-closet-list{
  flex:1;
  display: flex;
  flex-direction: column;
  header{
    height: 0.6rem;
    background: #ccc;
    display: flex;
    align-items:center;
    justify-content:space-between;
    .select{
      button{
        color:red;
      }
    }
    .more{
      font-size:26px;
    }
  }
  .contentbox{
    flex: 1;
    overflow: hidden;
    background: #f0f3f5;
    .items_box{
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      padding: 0 .1rem;
      li{
        width: 50%;
        padding-top: .1rem;
          position: relative;
        img{
          width: 100%;
          height: 100%;
        }
          .overlay{
              display: none;
              i{
                  font-size: 60px;
                  color: #fff;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  margin-left: -30px;
                  margin-top: -27px;
              }
          }
          &.checked{
              .overlay{
                  display: block;
                  position: absolute;
                  width: 100%;
                  height: calc(100% - 0.1rem);
                  left: 0;
                  top: 0.1rem;
                  background: rgba(0, 0, 0, .5);
              }
          }
      }
      li:nth-child(even){
        padding-left: .1rem;
          &.checked .overlay{
              left: 0.1rem;
              width: calc(100% - 0.1rem);
          }
      }
    }
      .mix-btn{
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
 }
</style>
