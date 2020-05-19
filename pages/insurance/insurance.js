import { insuranceProducts } from '../../api/local-data'
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast'

Page({
  data: {
    products: insuranceProducts,
    showNumbers: 2,
    allProducts: insuranceProducts.length,
    isShowLoading: false,
    isAllShow: false
  },
  onLoad() {},
  onShow() {},
  onShowDetail() {
    Toast('看个锤子看')
  },
  onReachBottom() {
    this.setData({
      isShowLoading: true
    })
    if (this.data.showNumbers + 1 < this.data.allProducts) {
      setTimeout(() => {
        this.setData({
          isShowLoading: false,
          showNumbers:
            this.data.showNumbers + 2 >= this.data.allProducts
              ? this.data.allProducts
              : this.data.showNumbers + 2
        })
      }, 3000)
    } else {
      setTimeout(() => {
        this.setData({
          isShowLoading: false,
          isAllShow: true
        })
        Toast('真的没有啦')
      }, 3000)
    }
  }
})
