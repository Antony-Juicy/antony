const request = require('request');
const cheerio = require('cheerio'); //  标签
const fs = require('fs'); //  读取文件
const path = require('path');

const db = require('../../Database/db/mongodb')



// 目标地址
const url = 'http://store.lining.com/shop/goodsCate-sale,desc,1,15s15_122,15_122_m,15_122_ls15_122_10,15_122_10_m,15_122_10_l-0-0-15_122_10,15_122_10_m,15_122_10_l-0s0-0-0-min,max-0.html';

request(url, (ree, res, body) => { //  body 每条数据  结构
    // console.log(body);
    const $ = cheerio.load(body);
    let goods = [];
    $('.selItem').each((idx, el) => { // 获取所有 遍历
        let $el = $(el);
        let $price = $el.find(".price"); // 获取  .price标签

        let imgurl = $el.find('.selMainPic img').attr('orginalsrc'); // 获取 .selMainPic 下的图片  名字为 orginalsrc属性
        let name = $el.find(".hgoodsName").text(); //   获取hgoodsName  下的文本

        let price = $price.text().slice(1) * 1; // 获取  .price标签 的文本 去掉美元符号 ￥
        // $('.body') // 获取body 里面的这个字符

        let sku = $price.attr('sku'); // 获取属性

        let imgs = Array.from($el.find('.swiper_content img').map((idx, el) => $(el).attr('orginalsrc'))); //  获取 .swiper_content 的属性下   img   遍历拿取属性为orginalsrc  的 img       Array.from()   伪数组转数组

        let good = {
            name,
            imgurl,
            price,
            imgs,
            sku
        }



        // 2. 爬取图片到本地

        // 获取图片名称
        const filename = path.basename(imgurl);

        const fileStream = fs.createWriteStream('../public/img/' + filename);

        // request请求图片地址，返回一个数据流Stream   request 实现一个简单的图片抓取的小爬虫       利用request与stream数据流保存爬取到的图片到本地硬盘
        request(imgurl).pipe(fileStream);
        good.imgurl=filename;
        goods.push(good);


        // 小图
        imgs.forEach((item) => {
            console.log(item);
            const filename = path.basename(item);
            const fileStream = fs.createWriteStream('../public/img/' + filename);
            request(item).pipe(fileStream);
            good.imgs = filename;
            goods.push(good);
          
        })
        
    });


    console.log(goods);
    db.create("goods",goods);

});