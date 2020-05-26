import Toast from '../../miniprogram_npm/vant-weapp/toast/toast'

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1500,
    background: ['home-banner-1', 'home-banner-2', 'home-banner-3']
  },
  goToLoan() {
    Toast('借个锤子借')
  }
})
