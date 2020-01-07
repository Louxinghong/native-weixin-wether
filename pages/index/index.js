import { getWether } from "../../api/wether.js";
import Toast from "../../miniprogram_npm/vant-weapp/toast/toast";
import { dictToOptions, WETHER_STATUS } from "../../api/dict.js";

//index.js
//获取应用实例
const app = getApp();

//引用SDK核心类
const QQMapWx = require("../../qqmap-wx-jssdk/qqmap-wx-jssdk.js");
// 实例化API核心类
const wxMap = new QQMapWx({
  key: "QYOBZ-MKERR-M5DWQ-WVKD6-CDXW2-54FNP"
});

// 使async\await能够在微信小程序中使用
const regeneratorRuntime = app.globalData.regeneratorRuntime;

// 字典表转换
const wetherStatus = dictToOptions(WETHER_STATUS);

Page({
  data: {
    loading: false,
    showActions: false,
    actions: [{ name: "选择位置" }, { name: "用户信息" }, { name: "授权中心" }],
    menuSelected: "",
    userInfo: {},
    locationInfo: {
      nation: "",
      province: "",
      city: "",
      districe: "",
      street: "",
      street_number: ""
    },
    hasUserInfo: false,
    hasLocationInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    latitude: 0,
    longitude: 0,
    searchCity: "",
    wetherInfo: {},
    daysInfo: [],
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    scrollTop: 0,
    scrollTopLast: 0,
    maxFontSize: 130,
    minFontSize: 80,
    fontSize: 130
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  // 监听页面加载
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  // 监听页面显示，当小程序启动，或者页面回退，或者从后台进入前台显示，会触发onShow
  onShow: function() {
    if (this.data.canIUse) {
      wx.getUserInfo({
        success: res => {
          // console.log(res);
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo
          });
        }
      });
    } else {
      app.globalData.userInfo = {};
      this.setData({
        userInfo: {}
      });
    }

    if (!this.data.hasLocationInfo) {
      this.getNowLocation();
    }
    this.onCloseActions();
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    // TODO 逻辑
    //当逻辑执行完后关闭刷新
    wx.stopPullDownRefresh();
  },
  // 显示菜单
  onShowActions() {
    this.setData({
      showActions: true
    });
  },
  // 菜单选择
  onSelectActions: function(event) {
    if (event.detail.name === "选择位置") {
      this.chooseLoaction();
    } else if (event.detail.name === "用户信息") {
      this.getUserInfo();
    } else if (event.detail.name === "授权中心") {
      this.lookGet();
    }
  },
  // 关闭菜单
  onCloseActions() {
    this.setData({
      showActions: false
    });
  },
  // 获取用户信息
  getUserInfo: function(e) {
    // console.log(e);
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 页面进入自动获取经纬度并转换为详细地址
  getNowLocation() {
    this.setData({
      loading: true
    });
    wx.getLocation({
      type: "wgs84",
      success: res => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        wxMap.reverseGeocoder({
          location: {
            // 当前经纬度
            latitude: latitude,
            longitude: longitude
          },
          success: res => {
            // console.log(res);
            app.globalData.locationInfo = res.result.address_component;
            this.setData({
              locationInfo: res.result.address_component,
              hasLocationInfo: true,
              loading: false
            });
            this.onSearchCity();
          },
          fail: err => {
            console.log(err);
            this.setData({
              loading: false
            });
          },
          complete: () => {
            this.setData({
              loading: false
            });
          }
        });
      },
      fail: err => {
        console.log(err);
        this.setData({
          loading: false
        });
      },
      complete: () => {
        this.setData({
          loading: false
        });
      }
    });
  },
  // 手动选择地址
  chooseLoaction: function(event) {
    this.setData({
      loading: true
    });
    wx.chooseLocation({
      success: res => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        wxMap.reverseGeocoder({
          location: {
            // 当前经纬度
            latitude: latitude,
            longitude: longitude
          },
          success: res => {
            app.globalData.locationInfo = res.result.address_component;
            this.setData({
              locationInfo: res.result.address_component,
              hasLocationInfo: true,
              loading: false
            });
            this.onSearchCity();
          },
          fail: err => {
            console.log(err);
            this.setData({
              loading: false
            });
          }
        });
      },
      fail: res => {
        if (res.errMsg.indexOf("cancel") === -1) {
          Toast("请前往授权中心授权");
        }
      },
      complete: () => {}
    });
  },
  // 获取输入框的城市名称
  onChangeCity(event) {
    this.setData({
      searchCity: event.detail
    });
  },
  // 搜索
  async onSearchCity() {
    const city = this.data.searchCity
      ? this.data.searchCity
      : this.data.locationInfo.city.substr(
          0,
          this.data.locationInfo.city.length - 1
        );
    const search = {
      appid: "77993245",
      appsecret: "HtnE33t1",
      version: "v1",
      city: city
    };
    this.setData({
      loading: true
    });
    getWether(search)
      .then(res => {
        this.setData({
          wetherInfo: res.data,
          daysInfo: res.data.data,
          loading: false
        });
        this.data.daysInfo[0].hours.forEach((item, i) => {
          wetherStatus.forEach((res, j) => {
            if (item.wea.indexOf(res.label) !== -1) {
              this.setData({
                [`daysInfo[0].hours[${i}].wea_img`]: `../../images/${res.value}.png`
              });
            }
          });
        });
        console.log(this.data.wetherInfo);
      })
      .catch(err => {
        this.setData({
          loading: false
        });
      });
  },
  // 查看所有权限
  lookGet: function() {
    wx.openSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting["scope.userInfo"]) {
          this.setData({
            hasUserInfo: true
          });
        } else {
          this.setData({
            hasUserInfo: false
          });
        }
        if (res.authSetting["scope.userLocation"]) {
          this.setData({
            hasLocationInfo: true
          });
        } else {
          this.setData({
            hasLocationInfo: false,
            locationInfo: {
              nation: "",
              province: "",
              city: "",
              districe: "",
              street: "",
              street_number: ""
            },
            wetherInfo: {},
            daysInfo: []
          });
        }
      },
      fail: err => {
        console.log(err);
      },
      complete: () => {}
    });
  },
  // 触摸起始位置
  handleTouchStart: function(event) {
    this.data.startX = event.touches[0].pageX;
    this.data.startY = event.touches[0].pageY;
  },
  // 触摸移动当前位置
  handleTouchMove: function(event) {
    let currentX = event.touches[0].pageX;
    let currentY = event.touches[0].pageY;
    this.setData({
      moveX: currentX - this.data.startX,
      moveY: currentY - this.data.startY
    });

    // if (Math.abs(moveX) > Math.abs(moveY)) {
    //   if (moveX < 0) {
    //     console.log("画面向右");
    //   } else {
    //     console.log("画面向左");
    //   }
    // } else {
    //   if (moveY < 0) {
    //     console.log("画面向下");
    //   } else {
    //     console.log("画面向上");
    //   }
    // }
  },
  onPageScroll: function(res) {
    // res.scrollTop 当前滚轮滚动长度
    if (this.data.scrollTopLast < res.scrollTop) {
      this.setData({
        fontSize:
          this.data.fontSize > this.data.minFontSize
            ? this.data.fontSize - 5
            : this.data.minFontSize
      });
    } else if (this.data.scrollTopLast > res.scrollTop && res.scrollTop <= 80) {
      this.setData({
        fontSize:
          this.data.fontSize < this.data.maxFontSize
            ? this.data.fontSize + 5
            : this.data.maxFontSize
      });
    }

    this.setData({
      scrollTop: res.scrollTop,
      scrollTopLast: res.scrollTop
    });
  }
});
