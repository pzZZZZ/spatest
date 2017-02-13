/**
 * Created by wenwu on 2017/2/7.
 */
const SERVER_HOST = 'http://huichuanda.com.cn/style_assistant/';
// const SERVER_HOST = 'https://huichuanda.ews.m.jaeapp.com/style_assistant/';
const API = {
    GET_CLOSET_PRODUCT_LIST: 'get_closet_products/',
    SEARCH: 'search_products',
    RECOMMEND: 'get_recommended_products',
    ADD_TO_CLOSET: 'add_to_closet/',
    GET_LIKED_OUTFITS : 'get_liked_outfits',
    // 搭一下
    OUTFIT_GENERATION: 'get_outfits/',
    // 获取相似单品
    GET_SIMILAR_PRODUCTS: 'get_similar_products/',
    // 编辑outfit
    EDIT_OUTFIT: 'edit_outfit/',
    DELETE_FROM_CLOSET: 'delete_from_closet/'
};
const output = {};
for (let key in API) {
    output[key] = SERVER_HOST + API[key];
}

module.exports = output;
