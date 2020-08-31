import { getNews } from '../../api/bilibili.js'

//获取应用实例
const app = getApp()

// 使async\await能够在微信小程序中使用
const regeneratorRuntime = app.globalData.regeneratorRuntime

Page({
  data: {
    loading: false
  },
  async onText() {
    console.log(1)
    this.loading = true
    let res = await getNews({ aid: 85440373 })
    this.loading = false
    console.log(res)
  }
})
