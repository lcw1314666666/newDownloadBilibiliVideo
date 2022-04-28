const axios = require('axios');
let videoList = []
let count = 0 // 视频总数量
const pageSize = 50
let currentPage = 1
let totalPages = 0
//外站接口
let api = `https://api.bilibili.com/x/space/arc/search?mid=432044872&ps=${pageSize}&tid=0&pn=${currentPage}`;

// ps => pageSize // 一页最多展示50条
// pn => pageNumber
// count => 总的视频数量




// getUpVideoList(api).then(res => {
//     // console.log(res.length)
// })

// up主 视频列表

// 获取up 主所有视频列表
async function getUpVideoList() {
    return new Promise(async (resolve, reject) => {
        count = await getUpVideoLength()  // 查看up共有多少条视频
        totalPages = Math.ceil(count / pageSize)
        for (let i = 1; i <= totalPages; i++) {
            await videoPages(`https://api.bilibili.com/x/space/arc/search?mid=432044872&ps=${pageSize}&tid=0&pn=${i}`)
        }
        resolve(videoList)
    })
}

// 查看up共有多少视频
function getUpVideoLength() {
    return new Promise((resolve, reject) => {
        axios.get(api)
            .then((response) => {
                const count = response.data.data.page.count
                resolve(count)

            })
            .catch(function (error) {
                reject(error)
            })
    })
}

// 获取up 某一页的数据
function videoPages(api) {
    return new Promise((resolve, reject) => {
        axios.get(api)
            .then((response) => {
                //这里获得整个请求响应对象
                const res = response.data.data.list.vlist
                //获取商品数据只需要调用:  response.data
                res.forEach(item => {
                    videoList.push({
                        ...item,
                        videoUrl: item.bvid
                    })
                })
                resolve(videoList)

            })
            .catch(function (error) {
                reject(error)
            })
    })
}

module.exports = { getUpVideoList }

