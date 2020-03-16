import { monetaryProducts } from "../../api/local-data";

Page({
  data: {
    products: monetaryProducts
  },
  onGotoMonetaryApply(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../monetary-apply/monetary-apply?id=${id}`
    });
  }
});
