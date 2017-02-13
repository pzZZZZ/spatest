/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */
const items = [
    [{id: 1, imgSrc: '/static/list1.jpg'}, {id: 2, imgSrc: '/static/list2.jpg'}],
    [{id: 3, imgSrc: '/static/list3.jpg'}, {id: 4, imgSrc: '/static/list4.jpg'}],
    [{id: 5, imgSrc: '/static/list1.jpg'}, {id: 6, imgSrc: '/static/list2.jpg'}],
    [{id: 7, imgSrc: '/static/list3.jpg'}, {id: 8, imgSrc: '/static/list4.jpg'}],
    [{id: 9, imgSrc: '/static/list1.jpg'}, {id: 10, imgSrc: '/static/list2.jpg'}],
    [{id: 11, imgSrc: '/static/list3.jpg'}, {id: 12, imgSrc: '/static/list4.jpg'}],
];

module.exports = {
    api: '/api/hello',
    response: function (req, res) {
        res.send(items);
    }
};