var autumn789 = {
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
  difference: function (arr1, arr2) {

  }
}

console.log(autumn789.concat([1],2,3,[5]))
