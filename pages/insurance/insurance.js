import { insuranceProducts } from "../../api/local-data";
import Toast from "../../miniprogram_npm/vant-weapp/toast/toast";

Page({
  data: {
    products: insuranceProducts,
    showNumbers: 2,
    allProducts: insuranceProducts.length,
    isShowLoading: false,
    isAllShow: false
  },
  onShowDetail() {
    Toast("看个锤子看");
  },
  onReachBottom() {
    Toast("上拉");
    this.setData({
      isShowLoading: true
    });
  }
});
