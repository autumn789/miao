var autumn789 = {
  process: function (arg) {
    if (typeof arg == 'function') {
      // 函数直接返回该函数
      return arg
    } else if (typeof arg == 'object') {
      if (Array.isArray(arg)) {
        // 数组键值对 [prop, val]，返回判断属性和值是否对应的函数
        return (obj) => {
          return obj[arg[0]] == arg[1]
        }
      } else {
        // 对象，返回一个函数，判断obj是否包含所有arg中的键值对
        return (obj) => {
          for (let prop in arg) {
            if (arg[prop] != obj[prop]) return false
          }
          return true
        }
      }
    } else if (typeof arg == 'string') {
      // 字符串，属性值，返回函数，判断该属性是否truthy
      return (obj) => obj[arg] == true
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
  difference: function (arr1, ...values) {
    let map = {}, res = []
    for (let i=0; i<values.length; i++) {
      for (let j=0; j<values[i].length; j++) {
        map[values[i][j]] = 1
      }
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
    sep = sep.toString()
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
  pull: function (arr, ...vals) {
    let count = 0, map = {}
    for (let i=0; i<vals.length; i++) {
      map[vals[i]] = 1
    }
    for (let i=0; i<arr.length; i++) {
      if (arr[i] in map) {
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
  sortedIndexBy: function (arr, v, fn) {
    let l = 0, r = arr.length-1
    while (l < r) {
      let mid = Math.floor((l+r)/2),
          trans = this.by(fn)
      if (trans(v) <= trans(arr[mid])) {
        r = mid
      } else if (trans(v) > trans(arr[mid])) {
        l = mid + 1
      }
    }
    return l
  },
  sortedIndexOf: function (array, value) {
    let l = 0, r = array.length-1
    while (l < r) {
      let mid = Math.floor((l+r)/2)
      if (value > array[mid]) {
        l = mid + 1
      } else {
        r = mid
      }
    }
    if (array[l] != value) return -1
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
  by: function (fn) {
    if (typeof fn == 'function') {
      return fn
    } else if (typeof fn == 'string') {
      return (obj) => {
        return obj[fn]
      }
    }
  },
  uniqBy: function (arr, pred=x=>x) {
    let map = {}, res = []
    for (let i=0; i<arr.length; i++) {
      let trans = this.by(pred)(arr[i])
      if (!(trans in map)) {
        res.push(arr[i])
        map[trans] = 1
      }
    }
    return res
  },
  sortedLastIndex(arr, v) {
    let l = 0, r = arr.length-1
    while (l < r) {
      let mid = Math.floor((l+r)/2)
      if (v >= arr[mid]) {
        l = mid + 1
      } else {
        r = mid
      }
    }
    return l
  },
  sortedLastIndexBy(arr, v, fn) {
    let l = 0, r = arr.length-1
    while (l < r) {
      let mid = Math.floor((l+r)/2), trans = this.by(fn)
      if (trans(v) >= trans(arr[mid])) {
        l = mid + 1
      } else {
        r = mid
      }
    }
    return l
  },
  sortedLastIndexOf(arr, v) {
    let l = 0, r = arr.length-1
    while (l < r) {
      let mid = Math.ceil((l+r)/2)
      if (v >= arr[mid]) {
        l = mid
      } else {
        r = mid - 1
      }
    }
    if (arr[l] != v) return -1
    return l
  },
  sortedUniq(arr) {
    let res = [arr[0]]
    for (let i=1; i<arr.length; i++) {
      if (arr[i] != arr[i-1]) {
        res.push(arr[i])
      }
    }
    return res
  },
  sortedUniqBy(arr, fn) {
    let res = [arr[0]], trans = this.by(fn)
    for (let i=1; i<arr.length; i++) {
      if (trans(arr[i]) != trans(arr[i-1])) {
        res.push(arr[i])
      }
    }
    return res
  },
  tail(arr) {
    let res = []
    for (let i=1; i<arr.length; i++) {
      res.push(arr[i])
    }
    return res
  },
  take(arr, n=1) {
    let res = [], len = Math.min(arr.length, n)
    for (let i=0; i<len; i++) {
      res.push(arr[i])
    }
    return res
  },
  takeRight(arr, n=1) {
    let res = [], len = Math.min(arr.length, n)
    for (let i=arr.length-len; i<arr.length; i++) {
      res.push(arr[i])
    }
    return res
  },
  takeRightWhile(arr, fn) {
    let res = []
    for (let i=arr.length-1; i>=0; i--) {
      if (this.process(fn)(arr[i]) == true) {
        res.unshift(arr[i]) // or push, then reverse at last.
      } else break
    }
    return res
  },
  takeWhile(arr, fn) {
    let res = []
    for (let i=0; i<arr.length; i++) {
      if (this.process(fn)(arr[i]) == true) {
        res.push(arr[i])
      } else break
    }
    return res
  },
  union(...arrs) {
    let res = [], map = {}
    for (let i=0; i<arrs.length; i++) {
      for (let j=0; j<arrs[i].length; j++) {
        if (!(arrs[i][j] in map)) {
          res.push(arrs[i][j])
          map[arrs[i][j]] = 1
        }
      }
    }
    return res
  },
  unionBy(...args) {
    let fn = args.pop(), res = [], map = {}, trans = this.by(fn)
    for (let i=0; i<args.length; i++) {
      for (let j=0; j<args[i].length; j++) {
        if (!(trans(args[i][j]) in map)) {
          res.push(args[i][j])
          map[trans(args[i][j])] = 1
        }
      }
    }
    return res
  },
  zip(...arrs) {
    let res = []
    for (let i=0; i<arrs.length; i++) {
      for (let j=0; j<arrs[0].length; j++) {
        if (Array.isArray(res[j])) {
          res[j][i] = arrs[i][j]
        } else {
          res[j] = [arrs[i][j]]
        }
      }
    }
    return res
  },
  unzip(arrs) {
    return this.zip(...arrs)
  },
  without(arr, ...vs) {
    let map = {}, res = []
    for (let i=0; i<vs.length; i++) {
      map[vs[i]] = 1
    }
    for (let i=0; i<arr.length; i++) {
      if (!(arr[i] in map)) {
        res.push(arr[i])
      }
    }
    return res
  },
  xor(...arrs) {
    let res = [], map = {}
    for (let i=0; i<arrs.length; i++) {
      for (let j=0; j<arrs[i].length; j++) {
        map[arrs[i][j]] = map[arrs[i][j]] ? map[arrs[i][j]]+1 : 1
      }
    }
    for (let key in map) {
      if (map[key] > 1) {
        delete map[key]
      }
    }
    for (let i=0; i<arrs.length; i++) {
      for (let j=0; j<arrs[0].length; j++) {
        if (arrs[i][j] in map) {
          res.push(arrs[i][j])
        }
      }
    }
    return res
  },
  countBy(arr, fn) {
    let res = {}, trans = this.by(fn)
    for (let i=0; i<arr.length; i++) {
      res[trans(arr[i])] = res[trans(arr[i])] ? res[trans(arr[i])]+1 : 1
    }
    return res
  },
  every(arr, fn) {
    let trans = this.process(fn)
    for (let i=0; i<arr.length; i++) {
      if (trans(arr[i]) == false) return false
    }
    return true
  },
  filter(arr, fn) {
    let res = [], trans = this.process(fn)
    for (let i=0; i<arr.length; i++) {
      if (trans(arr[i])) {
        res.push(arr[i])
      }
    }
    return res
  },
  find(arr, fn, fromIdx=0) {
    let trans = this.process(fn)
    for (let i=fromIdx; i<arr.length; i++) {
      if (trans(arr[i])) return arr[i]
    }
    return
  },
  flatMap(arr, fn) {
    let res = []
    for (let i=0; i<arr.length; i++) {
      res.push(...this.by(fn)(arr[i]))
    }
    return res
  },
  flatMapDepth(arr, fn, d=1) {
    let temp = [], res = []
    for (let i=0; i<arr.length; i++) {
      temp.push(this.by(fn)(arr[i]))
    }
    function flatten(temp, d) {
      for (let i=0; i<temp.length; i++) {
        if (d > 0 && Array.isArray(temp[i])) {
          flatten(temp[i], d-1)
        } else {
          res.push(temp[i])
        }
      }
    }
    flatten(temp, d)
    return res
  }
}

// module.exports = autumn789
// var users = [
//   { 'user': 'barney', 'age': 36, 'active': true },
//   { 'user': 'fred',   'age': 40, 'active': false }
// ];
// function duplicate(n) {
//   return [[[n, n]]];
// }
// debugger
// console.log(autumn789.flatMapDepth([1, 2], duplicate, 2))
