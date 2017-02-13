<template>
    <div class="preference-container">
        <header>
            <div class="title">
                <p>
                    Select outfits you like
                </p>
            </div>
            <router-link to="importing" v-bind:class="{available:pickedItems > 0}">Next</router-link>
        </header>
        <div class="list">
            <ul class="items_box">
                <li v-for="item in allItems" v-on:click="pick(item)" v-bind:class="{'checked':!!item.checked}">
                    <img v-bind:src='item.imgSrc'/>
                    <div class="overlay">
                        <i class="iconfont icon-gouxuan"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
export default {
    name: 'preference',
    data() {
        return {
            allItems: []
        }
    },
    created: function () {
        var _this = this;
        fetch('/api/preference')
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
        pick (clothItem){
            this.$set(clothItem, 'checked', !clothItem.checked);
            /*if (!!clothItem.checked) {
                this.$store.commit('addMix', clothItem);
            } else {
                this.$store.commit('removeMix', clothItem.id);
            }*/
        }
    },
    computed: {
        pickedItems (){
            return _.filter(this.allItems, n => n.checked).length;
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.preference-container{
    header{
        .title{
            width: 2.2rem;
            height: 0.4rem;
            border-top: 0.01rem solid #e5e5e5;
            position: relative;
            margin: 0 auto;
            margin-top: 0.3rem;
            p{
                position: absolute;
                top: -0.08rem;
                left: 50%;
                margin-left: -0.8rem;
                background-color: #fff;
                width: 1.6rem;
                text-align: center;
            }
        }
        a{
            position: absolute;
            top: 0.24rem;
            right: 0.15rem;
            color: #ccc;
            &.available{
                color: #c31230;
            }
        }
    }
    .list{
        flex: 1;
        overflow: hidden;
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
                    background-color: #dadada;
                    border: 0.01rem solid #ccc;
                    border-radius: 5px;
                }
                .overlay{
                    display: none;
                    border-radius: 5px;
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