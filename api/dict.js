/**
 * 字典转下拉框选项
 * @param {Array} dict 字典
 * @param {string} labelKey 标签名
 * @param {string} valueKey 值名
 */
export const dictToOptions = (
  dict,
  labelKey = 'dictName',
  valueKey = 'dictCode'
) =>
  dict.reduce((total, item) => {
    total.push({ label: item[labelKey], value: item[valueKey] })
    return total
  }, [])

/**
 * 字典转键值对象
 * @param {Array} dict 字典
 * @param {string} labelKey 标签名
 * @param {string} valueKey 值名
 */
export const dictToObject = (
  dict,
  labelKey = 'dictName',
  valueKey = 'dictCode'
) =>
  dict.reduce((total, item) => {
    total[item[valueKey]] = item[labelKey]
    return total
  }, {})

/**
 * 天气类型
 */
export const WETHER_STATUS = [
  { dictCode: 'xue', dictName: '雪' },
  { dictCode: 'lei', dictName: '雷' },
  { dictCode: 'shachen', dictName: '沙尘' },
  { dictCode: 'wu', dictName: '雾' },
  { dictCode: 'bingbao', dictName: '冰雹' },
  { dictCode: 'yun', dictName: '云' },
  { dictCode: 'yu', dictName: '雨' },
  { dictCode: 'yin', dictName: '阴' },
  { dictCode: 'qing', dictName: '晴' }
]

// 帖子类别
export const TOPIC_STATUS = [
  { dictCode: 'all', dictName: '全部' },
  { dictCode: 'good', dictName: '精华' },
  { dictCode: 'share', dictName: '分享' },
  { dictCode: 'ask', dictName: '问答' },
  { dictCode: 'job', dictName: '招聘' },
  { dictCode: 'dev', dictName: '客户端' }
]
