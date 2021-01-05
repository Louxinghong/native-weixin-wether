import { topicTab } from '../../utils/util'

Page({
  data: {
    plugins: [
      {
        imgName: 'wether',
        url: '/pages/wether/wether',
        title: '天气查询'
      },
      {
        imgName: 'cnode',
        url: '/pages/cnode/cnode',
        title: 'CNode'
      },
      {
        imgName: 'bilibili',
        url: '/pages/bilibili/bilibili',
        title: 'Bilbili'
      },
      {
        imgName: 'luck-draw',
        url: '/pages/luck-draw/luck-draw',
        title: 'LuckDraw'
      }
    ]
  }
})
