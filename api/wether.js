const ajax = require("../utils/ajax.js");

export const getWether = data =>
  ajax.get("https://www.tianqiapi.com/api/", data);
