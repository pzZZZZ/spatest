<template src="../template/mix.html"></template>
<script>
    import CONSTANTS from '../constants.js';
    export default {
        name: 'mix',
        data() {
            return {
                msg: 'MIX PAGE',
                renderData: {
                    mixedItems: [],
                    renderReplace: {
                        activeSimilarList: [],
                        outfitIndex: 0,
                        productIndex: 0,
                        look_id: 0
                    }
                },
                container: {
                    width: 0,
                    sliderOffset: 0
                },
                loading: true,
                offset: 0,
//                获取搭配接口传递的固定参数
                fixedParams: ''
            }
        },
        mounted() {
            console.log('mounted');
            let _this = this;

            let mixList = _this.$store.state.mixedClothes, params = '';
            console.log(mixList);
            for (let i = 0; i < mixList.length; i++) {
                params += ('product_ids=' + mixList[i].id + '&');
            }

            this.fixedParams += 'user_name=' + this.$store.state.username + '&' + params;
            this.fetchOutfits();
        },
        methods: {
//            加载一页
            fetchOutfits(prevIds, succeed, failed){
                let _this = this, url = CONSTANTS.OUTFIT_GENERATION + '?' + this.fixedParams + '&offset=' + this.offset;
                if (typeof prevIds !== 'undefined') {
                    url += '&' + prevIds;
                }
                fetch(url)
                    .then(res => res.json())
                    .then(result => {
                        let renderOutfitList = _this.hotZoneGenerate(result.outfits);
                        console.log(renderOutfitList);
                        _this.renderData.mixedItems = renderOutfitList;
                        _this.loading = false;
                    })
                    .catch(e => console.log('parsing failed', e));
            },
            goProductInfo(){
                //this.$router.push({ name: 'productInfo', params: {userId: 123}})
            },
            hotZoneGenerate(outfitList){
                let renderOutfitList = [], containerWidth = this.$el.clientWidth - 40;
                this.container.width = containerWidth;
                for (let i = 0; i < outfitList.length; i++) {
                    renderOutfitList.push(this.generateSingleRenderOutfit(outfitList[i]));
                }
                return renderOutfitList;
            },
            //将接口返回的outfit处理成可以直接render的json
            generateSingleRenderOutfit(rawOutfit){
                let outfit = {}, products = [];
                outfit.look_id = rawOutfit.look_id;
                outfit.look_image_url = rawOutfit.look_image_url;
                //缩放比例
                let scale = this.container.width / rawOutfit.look_image_width,
                    containerHeight = rawOutfit.look_image_height * scale;
                for (let j = 0; j < rawOutfit.look_items.length; j++) {
                    let product = {}, rawProduct = rawOutfit.look_items[j];
                    //console.log(rawProduct);
                    product.x = rawProduct['x_0'] * this.container.width + 'px';
                    product.y = rawProduct['y_0'] * containerHeight + 'px';
                    product.width = (rawProduct['x_1'] - rawProduct['x_0']) * this.container.width + 'px';
                    product.height = (rawProduct['y_1'] - rawProduct['y_0']) * containerHeight + 'px';
                    product.productId = rawProduct.id;
                    products.push(product);
                }
                outfit.products = products;
                return outfit;
            },
            // 获取相似单品
            getSimilarProducts(productId, i, j, look_id){
                this.loading = true;

                this.renderData.renderReplace.outfitIndex = i;
                this.renderData.renderReplace.productIndex = j;
                this.renderData.renderReplace.look_id = look_id;

                let _this = this;
                fetch(CONSTANTS.GET_SIMILAR_PRODUCTS + '?user_name=' + this.$store.state.username + '&offset=0&product_iid=' + productId)
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        _this.loading = false;
                        if (result.code === 0) {
                            _this.renderData.mixedItems[i].products[j].similarProductList = result.products;
                            _this.renderData.renderReplace.activeSimilarList = _this.renderData.mixedItems[i].products[j].similarProductList;
                        }
                    })
                    .catch(e => console.log('parsing failed', e));
            },
            //替换单品，生成新搭配
            replaceProduct(newProductId){
                this.loading = true;

                let products = this.renderData.mixedItems[this.renderData.renderReplace.outfitIndex].products;
                let currProductId = products[this.renderData.renderReplace.productIndex].productId;

                let params = '';

                for (let i = 0; i < products.length; i++) {
                    if (products[i].productId !== currProductId) {
                        params += ('product_iids=' + products[i].productId + '&');
                    }
                }

                params += ('product_iids=' + newProductId + '&user_name=' + this.$store.state.username + '&look_id=' + this.renderData.renderReplace.look_id);

                console.log(CONSTANTS.EDIT_OUTFIT + '?' + params);

                let _this = this;
                fetch(CONSTANTS.EDIT_OUTFIT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: params
                }).then(response => {
                    return response.json();
                }).then(result => {
                    console.log(result);
                    _this.loading = false;
                    let newOutfit = _this.generateSingleRenderOutfit(result);
                    _this.renderData.mixedItems.splice(_this.renderData.renderReplace.outfitIndex + 1, 0, newOutfit);
                    _this.switchOutfit(this.renderData.renderReplace.outfitIndex + 1);
                }).catch(e => console.log('parsing failed', e));
            },
//            切换搭配
            switchOutfit(index){
                this.container.sliderOffset = -index * this.container.width;
                this.renderData.renderReplace.outfitIndex = index;
            },

//            上&下一个搭配
            prevOutfit(){
                if (this.renderData.renderReplace.outfitIndex > 0) {
                    this.switchOutfit(this.renderData.renderReplace.outfitIndex - 1);
                }
            },
            nextOutfit(){
                if (this.renderData.renderReplace.outfitIndex + 1 < this.renderData.mixedItems.length) {
                    this.switchOutfit(this.renderData.renderReplace.outfitIndex + 1);
                } else {

                }
            }
        },
        computed: {
            getSliderWidth(){
                return this.container.width * this.renderData.mixedItems.length + 'px';
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" src="../scss/mix.scss"></style>