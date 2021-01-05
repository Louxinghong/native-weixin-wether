Page({
  data: {
    drawData: [
      {
        id: 0,
        front: '正面1',
        back: '背面1',
        animationData: {}
      },
      {
        id: 1,
        front: '正面2',
        back: '背面2',
        animationData: {}
      },
      {
        id: 2,
        front: '正面3',
        back: '背面3',
        animationData: {}
      },
      {
        id: 3,
        front: '正面4',
        back: '背面4',
        animationData: {}
      },
      {
        id: 4,
        front: '正面5',
        back: '背面5',
        animationData: {}
      },
      {
        id: 5,
        front: '正面6',
        back: '背面6',
        animationData: {}
      },
      {
        id: 6,
        front: '正面7',
        back: '背面7',
        animationData: {}
      },
      {
        id: 7,
        front: '正面8',
        back: '背面8',
        animationData: {}
      },
      {
        id: 8,
        front: '正面9',
        back: '背面9',
        animationData: {}
      }
    ],
    isRotate: false,
    timer: null,
    chooseIndex: -1
  },
  onRotate() {
    this.setData({
      isRotate: !this.data.isRotate
    })
  },
  onShuffle() {
    this.onMove(115)
    this.data.timer = setTimeout(() => {
      clearTimeout()
      this.onMove(0)
    }, 1000)
    this.data.drawData.forEach(item => {
      this.setData({
        ['drawData[' + item.id + '].id']: null
      })
    })
    this.data.drawData.forEach((item, index) => {
      let inWhile = true;
      while(inWhile) {
        let randomNumber = (Math.random(0, 10) + 1).toFixed(0)
        if (this.data.drawData.find((itemFind, indexFind) => indexFind === randomNumber)) {
          inWhile = true
        } else {
          this.setData({
            ['drawData[' + index + '].id']: (Math.random(0, 10) + 1).toFixed(0)
          })
          inWhile = false
        }
      }
      console.log(item.id)
    })
  },
  onMove(moveUnit) {
    let curDrawData = this.data.drawData
    const lineTotal = 3
    curDrawData.map((item, index) => {
      let animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
      })
      const x = index % lineTotal
      const y = parseInt(index / lineTotal)
      const moveUnitX = moveUnit * (1 - x)
      const moveUnitY = moveUnit * (1 - y)
      animation.translate(moveUnitX, moveUnitY).step()
      item.animationData = animation.export()
    })
    this.setData({
      drawData: curDrawData
    })
  },
  onRotateItem(event) {
    let chooseData = event.currentTarget.dataset.value
    let findData = 'drawData[' + chooseData.id + '].front'
    if (chooseData.id === 3) {
      this.setData({
        chooseIndex: chooseData.id,
        [findData]: 'iphone 12'
      })
    } else {
      this.setData({
        [findData]: '谢谢惠顾'
      })
    }
  }
})
