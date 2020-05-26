// const ajax = require('../utils/ajax.js')
import ajax from '../utils/ajax'

export const getNews = (data) =>
  ajax.get('https://cnodejs.org/api/v1/topics', data)
