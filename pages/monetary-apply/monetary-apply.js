import { monetaryProducts } from "../../api/local-data";

Page({
  data: {},
  onLoad(options) {
    const product = monetaryProducts.find(
      item => item.id === parseInt(options.id)
    );
    this.setData({
      product: product
    });
  }
});
