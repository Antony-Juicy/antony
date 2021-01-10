//  封装 参数    obj={}给个初始值
// function formatData(obj={}){  
// let{code=200,data=[],msg="success"}=obj;  结构对象
// }

function formatData({code = 200, data = [], msg = "success"} = {}) {
    //  判断
    if (code === 400) {  // 失败存在
        msg = 'fail'
    } 
    
    return {
        code,
        data,
        msg
    }
}

module.exports={formatData}  // 导出  