/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */
const data = {
    mixItems: [{
        "imgSrc": '/static/list1.jpg'
    },
        {
            "imgSrc": '/static/list2.jpg'
        },
        {
            "imgSrc": '/static/list3.jpg'
        }],
    inspirationItems: [{
        "imgSrc": '/static/list1.jpg'
    },
        {
            "imgSrc": '/static/list2.jpg'
        },
        {
            "imgSrc": '/static/list3.jpg'
        },
        {
            "imgSrc": '/static/list4.jpg'
        }]
}
module.exports = {
    api: '/api/mix',
    response: function (req, res) {
        res.send(data);
    }
}
