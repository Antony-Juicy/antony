const baseUrl = 'https://api.qfh5.cn'; //'http://120.76.247.5:2020'; // 

function request(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      url: baseUrl + '/api' + url,
      data,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

request.get = function (url, data = {}, config = {}) {
  return request(url, data, {
    ...config,
    method: 'GET'
  })
}

request.put = function(url,data={},config={}){
  return request(url,data,{
    ...config,
    method:'PUT'
  })
}
// 删除
request.delete = function(url,data={},config={}){
  return request(url,data,{
    ...config,
    method:'DELETE'
  })
}


module.exports = request