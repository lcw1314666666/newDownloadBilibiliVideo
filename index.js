const ibili = require('ibili')
const fs = require('fs')
const path = require('path')
const { getUpVideoList } = require('./getVideoUrlList')

//外站接口
// const api = 'https://api.bilibili.com/x/space/arc/search?mid=432044872&ps=50&tid=0&pn=1';

// setDownloadList().then(res => {
//     getDownloadList().then(res => {
//         console.log(res)
//     })
//
// })



// 请求到视频列表
getUpVideoList().then(async res => {
    const videoInfoList = res
    // 循环下载
    for (let i = 0; i < videoInfoList.length; i++) {
        const videoItem = videoInfoList[i]
        const catalogue = videoItem.author // 目录 文件夹
        const filename = videoItem.title // 文件名称
        // 文件下载
        await ibili.downloadVideo({
            folder: catalogue || 'videoFile',
            url: videoItem.videoUrl,
            filename: filename
        })

        // 文件下载完毕存入JSON文件
        const historyDown = await getDownloadList() // 获取历史数据
        historyDown.push({
            ...videoItem,
            path: path.resolve(__dirname, `${catalogue}/${filename}`)
        })
        await setDownloadList(historyDown) // 存入JSON文件中
    }
})


// 读取JSON文件
function getDownloadList() {
    return new Promise((resolve, reject) => {
        fs.readFile('downloadList.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            }
            const downloadList = JSON.parse(data.toString())

            resolve(downloadList)
        })
    })
}

// 写入JSON文件
async function setDownloadList(newDownload) {
    // const historyDown = await getDownloadList() // 获取历史下载文件记录
    const downloadList = JSON.stringify(newDownload)
    return new Promise((resolve, reject) => {
        fs.writeFile('downloadList.json', downloadList, (err) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            resolve(downloadList)
        })
    })
}
