// const ajax = require('../utils/ajax.js')
import ajax from '../utils/ajax'

export const getWether = (data) =>
  ajax.get('https://www.tianqiapi.com/api/', data)
