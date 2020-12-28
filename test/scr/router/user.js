const express=require('express');   //  引入

const router=express.Router();

const {formatData} = require('../utils');


//  /api/user/reg  曾加用户
router.post('/reg',(req,res)=>{
    res.send(formatData());

})

//  /api/user/login 用户登录
router.get('/login',(req,res)=>{
    res.send(formatData());
})


//  /api/user/list  // 获取所有用户
router.get('/list',(req,res)=>{
    res.send(formatData());
})

//  /api/user/   // 获取指定用户
router.get('/:id',(req,res)=>{
    res.send(formatData())
})

                  // 删除指定用户
router.delete('/:id',(req,res)=>{
    res.send(formatData());
})


// 修改指定用户
router.put('/:id',(req.res)=>_{
    res.send(formatData());
})

module.exports=router;  // 导出