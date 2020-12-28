   const express = require('express');

   const mysql = require("../mysql/01 mysql");

   const mongo = require('../db/mongodb');

   const router = express.Router();


   const {
       formatData
   } = require("../utlils");



   //  --------mysql-----------
   // 查询用户名是否存在
   //    router.get('/check', async (req, res) => {
   //        let {
   //            username
   //        } = req.query; // get请求 获取参数 结构对象 

   //        let sql = `select username from user where username='${username}' ` // 查询用户名是否存在

   //        //  使用try 不会阻塞代码执行 
   //        try {
   //            const rows = await mysql.query(sql);
   //            if (rows.length > 0) {
   //                // res.send({
   //                //     code: 400,  // 用户已存在
   //                //     data: [],
   //                //     msg: 'fail'
   //                // });

   //                // 调用封装函数  统一返回一个对象的数据格式

   //                let result = formatData({
   //                    code: 400
   //                }); // {code:400,data:[],msg:"fail"}

   //                res.send(result) // 响应 返回前端

   //            } else {
   //                // res.send({
   //                //     code: 200,
   //                //     data: [],
   //                //     msg: "success"
   //                // })

   //                res.send(formatData()) // 同理调用函数

   //            }
   //        } catch (err) { // 执行失败
   //            // res.send({
   //            //     code:400,
   //            //     data:err,
   //            //     msg:"fail"
   //            // })
   //            res.send(formatData({
   //                code: 100,
   //                msg: "error"
   //            })) // 响应 返回前端
   //        }
   //    });



   //    // 查询所有用户  注意asyns await
   //    router.get('/', async (req, res) => {
   //        let sql = `select* from user`; // 查询所有

   //        // prompt 的写法  拿取结果
   //        // mysql.query(sql).then(rows=>{
   //        //     res.send(rows)  //  Promise 成功 方法
   //        //         pool.query(sql, (error, rows) => {
   //        // }).catch(error) // 失败

   //        try { //  成功执行    
   //            const rows = await mysql.query(sql);
   //            // res.send({
   //            //     code: 200,
   //            //     data: rows,
   //            //     msg: "success"
   //            // }) //  同意一下传出参数 为对象


   //            let result = formatData({
   //                data: rows
   //            }); //  {code:200,data:[{},{},{}],msg:'success'}

   //            res.send(result) // 响应
   //        } catch (err) {
   //            res.send(formatData({
   //                code: 400,
   //                msg: "error"
   //            }));
   //        }

   //    })

   // ------------------mongodb----------------------

   const colName = 'user'; // 表

   //    注册用户   增加 create()

   router.post('/reg', async (req,res) => {
       const {
           username,
           password
       } = req.body; //   获取参数

       const result = await mongo.create(colName, {
           username,
           password
       }) // 插入数据
       if (result) {
           res.send(formatData()) // 响应
       } else {
           res.send(formatData({
               code: 400
           }))
       }
   });


   /**
    * 检测用户名是否存在
    */
   router.get('/check', async (req, res) => {
       let {
           username
       } = req.query;

       // 查询用户是否存在
       const resule = await mongo.find(colName, {
           username
       });
    //    console.log(resule);
       if (resule.length > 0) {
           res.send(formatData({
               code: 400
           }));
       } else {
           res.send(formatData())
       }
   })



   //    用户 登入

   router.get('/login', async (req, res) => {
       const {
           username,
           password
       } = req.query // get请求获取参数  
       const result = await mongo.find(colName, {
           username,
           password
       });
       //    判断是否匹配
       if (result.length > 0) {
           res.send(formatData())
       } else {
           res.send(formatData({
               code: 400
           }))
       }
   })



   /**
    * 删除用户
    * delete /api/user/:id
    */

   //    router.delete('/:id', async (req, res) => {
   //        const result = await mongo.remove(colName, {
   //            _id: id
   //        }); // 删除user表的id这条天数据
   //        if (result) {
   //            res.send(formatData())
   //        } else {
   //            res.send(formatData({
   //                code: 400
   //            }))
   //        }

   //    });

   module.exports = router; // 导出