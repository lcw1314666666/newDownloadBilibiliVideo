const ibili = require('ibili')
const { getUpVideoList } = require('./getVideoUrlList')

//外站接口
// const api = 'https://api.bilibili.com/x/space/arc/search?mid=432044872&ps=50&tid=0&pn=1';


// 请求到视频列表
getUpVideoList().then(res => {
    const videoInfoList = res
    console.log(videoInfoList)
})

// ibili.downloadVideo({　　　　　　// ibili.downloadVideo  查看官网 （ https://www.npmjs.com/package/ibili ）
//     folder: 'list',
//     url: 'https://www.bilibili.com/video/BV1734y1R7dn?p=',
//     filename: '123'
// })
