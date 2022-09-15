var autumn789 = {
  process: function (standard) {
    if (typeof standard == 'function') {
      // 函数直接返回该函数
      return standard
    } else if (typeof standard == 'object') {
      if (Array.isArray(standard)) {
        // 数组键值对 [prop, val]，返回判断属性和值是否对应的函数
        return (obj) => {
          return obj[standard[0]] == standard[1]
        }
      } else {
        // 对象，返回一个函数，判断obj是否包含所有standard中的键值对
        return (obj) => {
          for (let prop in standard) {
            if (standard[prop] != obj[prop]) return false
          }
          return true
        }
      }
    } else if (typeof standard == 'string') {
      // 字符串，属性值，返回函数，判断是否存在该属性
      return (obj) => standard in obj
    }
  },
  findIndex: function (arr, pred=x=>x, idx=0) {
    for (let i=idx; i<arr.length; i++) {
      if (this.process(pred)(arr[i])) {
        return i
      }
    }
    return -1
  },
  chunk: function (arr, size=1) {
    let res = []
    for (let i=0; i<arr.length; i+=size) {
      let temp = []
      for (let j=i; j<Math.min(i+size,arr.length); j++) {
        temp.push(arr[j])
      }
      res.push(temp)
    }
    return res
  },
  compact: function (arr) {
    let res = []
    for (let i=0; i<arr.length; i++) {
      if (arr[i]) {
        res.push(arr[i])
      }
    }
    return res
  },
  concat: function (arr, ...args) {
    let res = [...arr]
    for (let i=0; i<args.length; i++) {
      if (Array.isArray(args[i])) {
        let temp = args[i]
        for (let j=0; j<temp.length; j++) {
          res.push(temp[j])
        }
      } else {
        res.push(args[i])
      }
    }
    return res
  },
  difference: function (arr1, values) {
    let map = {}, res = []
    for (let i=0; i<values.length; i++) {
      map[values[i]] = 1
    }
    for (let i=0; i<arr1.length; i++) {
      if (!(arr1[i] in map)) {
        res.push(arr1[i])
      }
    }
    return res
  },
  drop: function (arr, n=1) {
    let res = []
    for (let i=0; i<arr.length-n; i++) {
      res[i] = arr[i+n]
    }
    return res
  },
  dropRight: function (arr, n=1) {
    let res = []
    for (let i=0; i<arr.length-n; i++) {
      res[i] = arr[i]
    }
    return res
  },
  fill: function (arr, v, start=0, end=arr.length) {
    for (let i=start; i<end; i++) {
      arr[i] = v
    }
    return arr
  },
  flatten: function (arr) {
    let res = []
    for (let i=0; i<arr.length; i++) {
      if (Array.isArray(arr[i])) {
        for (let j=0; j<arr[i].length; j++) {
          res.push(arr[i][j])
        }
      } else {
        res.push(arr[i])
      }
    }
    return res
  },
  flattenDepth: function (arr) {
    let res = []
    for (let i=0; i<arr.length; i++) {
      let ele = arr[i]
      if (Array.isArray(ele)) {
        let tarr = this.flattenDepth(ele)
        for (let j=0; j<tarr.length; j++) {
          res.push(tarr[j])
        }
      } else {
        res.push(ele)
      }
    }
    return res
  },
  flattenDepth: function (arr, d=1) {
    if (d == 0) return arr.slice()
    let res = []
    for (let i=0; i<arr.length; i++) {
      let ele = arr[i]
      if (Array.isArray(ele)) {
        let tarr = this.flattenDepth(ele, d-1)
        for (let j=0; j<tarr.length; j++) {
          res.push(tarr[j])
        }
      } else {
        res.push(ele)
      }
    }
    return res
  },
  toPairs: function (obj) {
    let res = []
    for (let i in obj) {
      res.push([i, obj[i]])
    }
    return res
  },
  fromPairs: function (arr) {
    let o = {}
    for (let i=0; i<arr.length; i++) {
      let key = arr[i][0], val = arr[i][1]
      o[key] = val
    }
    return o
  },
  head: function (arr) {
    return arr[0]
  },
  indexOf: function (arr, v, idx=0) {
    for (let i=idx; i<arr.length; i++) {
      if (arr[i] == v) return i
    }
    return -1
  },
  initial: function (arr) {
    let res = []
    for (let i=0; i<arr.length-1; i++) {
      res[i] = arr[i]
    }
    return res
  },
  intersection: function (...arrs) {
    let map = {}, firstArr = arrs[0], res = []
    for (let i=1; i<arrs.length; i++) {
      for (let j=0; j<arrs[i].length; j++) {
        let v = arrs[i][j]
        map[v] = map[v] ? map[v]+1 : 1
      }
    }
    for (let i=0; i<firstArr.length; i++) {
      if (firstArr[i] in map && map[firstArr[i]] == arrs.length-1) {
        res.push(firstArr[i])
      }
    }
    return res
  },
  last: function (arr) {
    return arr[arr.length-1]
  },
  join: function (arr, sep=',') {
    let res = ''
    for (let i=0; i<arr.length-1; i++) {
      res += arr[i] + sep
    }
    res += arr[arr.length-1]
    return res
  },
  lastIndexOf: function (arr, v, idx=arr.length-1) {
    for (let i=idx; i>=0; i--) {
      if (arr[i] == v) return i
    }
    return -1
  },
  pull: function (arr, v) {
    let count = 0
    for (let i=0; i<arr.length; i++) {
      if (arr[i] == v) {
        count++
      } else {
        arr[i-count] = arr[i]
      }
    }
    for (let i=0; i<count; i++) {
      arr.pop()
    }
    return arr
  },
  reverse: function (arr) {
    let l = arr.length
    for (let i=0; i<Math.floor(l/2); i++) {
      let temp = arr[i]
      arr[i] = arr[l-1-i]
      arr[l-1-i] = temp
    }
    return arr
  },
  sortedIndex: function (arr, v) {
    let l = 0, r = arr.length-1
    while (l < r) {
      let mid = Math.floor((l+r)/2)
      if (v <= arr[mid]) {
        r = mid
      } else if (v > arr[mid]) {
        l = mid + 1
      }
    }
    return l
  },
  uniq: function (arr) {
    let map = {}, res = []
    for (let i=0; i<arr.length; i++) {
      if (!(arr[i] in map)) {
        res.push(arr[i])
        map[arr[i]] = 1
      }
    }
    return res
  },
  // uniqBy: function (arr, pred=1) {

  // }
}

// module.exports = autumn789
