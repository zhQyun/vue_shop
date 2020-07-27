import API from '../../api.js'

/*
 * 处理提交给后台数据方法
 * @params 分页数据对象
 * @myData 需要传递的参数对象
 * @ArrayRules 对应设置op字段值
 * */
export const paramsFn = (params, myData, ArrayRules = []) => {
  let parData = []
  for (let name in myData) {
    let op = ''
    let fagle = false
    for (let ruls = 0; ruls < ArrayRules.length; ruls++) {
      if (name == ArrayRules[ruls].field) {
        fagle = true
        op = ArrayRules[ruls].op
        let group = ArrayRules[ruls].group ? ArrayRules[ruls].group : null
        let value = ArrayRules[ruls].value
        if (group) {
          parData.push({field: name, value: value, op: op, group: group})
        } else {
          parData.push({field: name, value: value, op: op})
        }
      }
    }
    // 已有ArrayRules设置时 跳过当前循环
    if (fagle) continue
    // 创建时间处理
    if (name == 'CREATE_DATE' && myData[name] != null) {
      parData.push({field: name, value: myData[name] + ' 00:00:00', op: '>='})
      parData.push({field: name, value: myData[name] + ' 23:59:59', op: '<='})
    } else {
      if (name == 'KeyWords') {
        let val = params.KeyWordVal
        if (val != undefined && val.length > 0) {
          val.forEach(e => {
            parData.push({field: e, value: myData[name], op: op, group: '666'})
          })
        }
      } else {
        parData.push({field: name, value: myData[name], op: op})
      }
    }
  }
  parData.push({field: 'IS_DEL', value: 'N'})
  let JsonValue = JSON.stringify(parData)
  params.filterRules = JsonValue
  return params
}
// 数组字段排序
export const compareFn = function (prop) {
  return function (obj1, obj2) {
    let val1 = obj1[prop]
    let val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
}
/*
 * 处理对象赋值方法
 * */
export const replaceObject = (rowInfo) => {
  let rowInfos = {}
  if (rowInfo != null && rowInfo != undefined) {
    for (let key in rowInfo) {
      if (key != undefined && typeof (rowInfo[key]) !== 'object') {
        rowInfos[key] = rowInfo[key]
      }
    }
  }
  return rowInfos
}
/*
 * sessionStorage 数据操作 添加 是否存在 操作
 * type 操作类型 has 判断是否存在 add 添加信息 get 获取信息
 * text 具体操作内容
 * value add 的时候需要添加的值
 * */
export const manageSessionStorage = (obj) => {
  let returnValue = {}
  switch (obj.type) {
    case 'has':
      (sessionStorage[obj.text] != undefined && sessionStorage[obj.text] != null) ? returnValue.isStatus = true : returnValue.isStatus = false
      break
    case 'get':
      if (sessionStorage[obj.text] == undefined || sessionStorage[obj.text] == null) { return false }
      returnValue.value = JSON.parse(sessionStorage[obj.text])
      break
    case 'add':
      if (obj.value == undefined) return false
      sessionStorage[obj.text] = JSON.stringify(obj.value)
      break
    default:
      break
  }
  return returnValue
}

// 处理PKID赋值方法
export const listenPkidChange = (pkidInfo, fn) => {
  if (pkidInfo != '') {
    fn()
  }
}

// 通过val获取对应text
export const findTextByValue = (list = [], val) => {
  let text = ''
  list.find(e => {
    if (e.Value == val) {
      text = e.Text
      return false
    }
  })
  return text
}

// 获取数据对应字段的text
export const findSelectText = (lists = [], list = []) => {
  lists.forEach(e => {
    list.forEach(r => {
      e[r.name] = findTextByValue(r.list, e[r.name])
    })
  })
}

/*
 * 转换列表数据（英文转中文)
 * */
export const InitTableData = (row, column) => {
  let initTableData = ''
  // 获取所有字段表所有信息
  let SelectColdeAll = sessionStorage.SelectColdeAll
  if (SelectColdeAll == undefined) { return false }
  let Value = JSON.parse(SelectColdeAll)
  let tableData = row[column.property]
  if (tableData.indexOf(',') == -1) { // 判断表中是否多数据
    Value.forEach(key => {
      // 获取对应下拉选项值
      if (key.Code == API.INFO_ALL_TYPE[column.property]) {
        key.rels.forEach(value => {
          // 获取英文对应的中文值
          if (value.value == row[column.property]) {
            initTableData = value.key
          }
        })
      }
    })
  } else {
    let newArrType = []
    newArrType = tableData.split(',')
    console.log(newArrType)
    Value.forEach(key => {
      // 获取对应下拉选项值
      if (key.Code == API.INFO_ALL_TYPE[column.property]) {
        key.rels.forEach(value => {
          // 获取英文对应的中文值
          newArrType.forEach(val => {
            if (value.value == val) {
              initTableData = value.key + ',' + initTableData
            }
          })
        })
      }
    })
  }
  return initTableData
}
/*
* json 数组去重
* */
export const uniqueArray = (array = [], key) => {
  var result = [array[0]]
  for (let i = 1; i < array.length; i++) {
    var item = array[i]
    var repeat = false
    for (let j = 0; j < result.length; j++) {
      if (item[key] == result[j][key]) {
        repeat = true
        break
      }
    }
    if (!repeat) {
      result.push(item)
    }
  }
  return result
}

// 过滤前后空格和空值
export const filterSpace = (array, obj) => {
  array.forEach(e => {
    if (typeof (obj[e.prop]) === 'string') {
      obj[e.prop] = obj[e.prop].replace(/(^\s*)|(\s*$)/g, '')
      obj[e.prop] = obj[e.prop] ? obj[e.prop] : ''
    }
  })
}

/*
* 报表查看
* name 报表名称
* pkid 当前信息id
* */
export const queryReportsInfo = (obj) => {
  if (obj.type != undefined && obj.type == true && obj.urlEnd != undefined) {
    var urlEnd = obj.urlEnd
  } else if (obj.pkid != undefined) {
    urlEnd = '&PKID=' + obj.pkid
  }
  let url = API.REPORTS_VIEW_ROOT + obj.name + '.cpt' + urlEnd
  // 打开新页面
  window.open(url, '_blank')
}

/*
* 获取当前时间
* */
export const getDateTime = () => {
  let myDate = new Date()
  let result = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
  return result
}

/*
* 处理关键字
* */
export const KeyWordsFn = (obj) => {
  let oValue = {}
  if (obj.FormData.KeyWords != undefined && obj.FormData.KeyWords != '' && obj.KeyWodsCode != undefined && obj.KeyWodsCode.length > 0) {
    let oKeyCode = obj.KeyWodsCode
    for (let k = 0; k < oKeyCode.length; k++) {
      oValue[oKeyCode[k]] = obj.FormData.KeyWords
    }
  }
  if (obj.FormData == undefined) { obj.FormData = {} }
  return Object.assign(oValue, obj.FormData)
}
