Page({
  data: {
    activeNames: '',
    systemInfo: {}
  },
  onChange(event) {
    if (event.detail === '1') {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            systemInfo: res
          })
        }
      })
    }
    this.setData({
      activeNames: event.detail
    })
  }
})
