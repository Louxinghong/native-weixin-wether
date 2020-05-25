import Toast from '../../miniprogram_npm/vant-weapp/toast/toast'

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1500,
    background: ['picOne', 'picTwo', 'picThree']
  },
  goToLoan() {
    Toast('借个锤子借')
  }
})
