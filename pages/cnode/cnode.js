import { dictToOptions, TOPIC_STATUS } from '../../api/dict'
import { getNews } from '../../api/cnode'

//获取应用实例
const app = getApp()

// 使async\await能够在微信小程序中使用
const regeneratorRuntime = app.globalData.regeneratorRuntime

Page({
  data: {
    active: 'all',
    topicTabs: [],
    topicList: [],
    loading: false
  },
  async onLoad() {
    this.setData({
      loading: true,
      topicTabs: dictToOptions(TOPIC_STATUS)
    })
    try {
      const res = await getNews({
        page: 1
      })
      this.setData({
        topicList: res.data.data,
        loading: false
      })
      console.log(this.data.topicList)
    } catch (err) {
      this.setData({
        loading: false
      })
    }
  },
  async onChange(event) {
    console.log(event.detail)
    const res = await getNews()
    console.log(res)
  }
})
