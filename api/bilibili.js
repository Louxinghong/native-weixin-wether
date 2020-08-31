// const ajax = require('../utils/ajax.js')
import ajax from '../utils/ajax'

export const getNews = (data) =>
  ajax.get('https://api.bilibili.com/x/web-interface/view', data)
