<template>
    <div class="discover">
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="160px">
                <!-- 默认 lls页面 -->
                <el-menu :default-active="current" router>
                    <el-menu-item :index="item.path" v-for="item in menu" :key="item.name">
                        <!-- <i :class="item.icon"></i> -->
                        {{item.text}}
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <!--  子路由 -->
                <router-view></router-view>
                <header>
                    <el-button plain type='warning' size='mini' @click="changeSort('price')">
                        价格
                        <i :class="{'el-icon-bottom' :sort=='price-desc','el-icon-top' :sort=='price-asc'}"></i>
                    </el-button>
                    <!-- 升序  price-desc   降序 price-asc-->
                </header>
                <el-row :gutter="10">
                    <el-col :span="6" :sm="8" :md="6" :lg="4" v-for="item in goods" :key="item.id"
                        style="margin-top:20px">
                        <el-card :body-style="{ padding: '0px',height:'320px' }">
                            <img :src="'/img/'+item.imgurl" class="image" @click="gotoDetail(item._id)">
                            <div style="padding: 14px;">
                                <h4>{{item.name}}</h4>
                                <div class="bottom clearfix">
                                    <p class="price">
                                       
                                        <span>{{item.price}}</span></p>
                                    <el-button @click="gotoDetail(item._id)" type="text" class="button">商品详情</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-pagination background layout="prev,total, pager, next,sizes" :total="200" :page-size="size"
                    :page-sizes="[10,20,30,50]" @current-change="pageChange" @size-change="sizeChange">

                </el-pagination>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    // import axios from 'axios';

    export default {
        name: "Discover",
        data() {
            return {
                sort: null,
                goods: [],
                page: 1,
                size: 10,
                menu: [{
                    path: 'Lls',
                    name: 'lls',
                    text: '劳力士'
                }, {
                    path: 'omg',
                    name: 'omg',
                    text: '欧米伽'
                }, {
                    path: 'kdy',
                    name: 'kdy',
                    text: '卡地亚'
                }, {
                    path: 'tissot',
                    name: 'tissot',
                    text: '天梭'
                }],
                current: 'lls'
            }
        },
        async created() {
            // 发起ajax请求，axios
            // this.getData();
            this.getData();

        },

        methods: {
            //  传进类型 判断是升序还是降序
            changeSort(type) {
                this.sort = type + `-${this.sort.includes('desc') ? 'asc':'desc'}`

                this.getData(); // price-desc


            },
            async getData() {
                let {
                    page,
                    size,
                    sort
                } = this;
                // const {
                //     data
                // } = await axios.get("http://localhost:2020/api/goods", {
                //     params: {
                //         page,
                //         size,
                //         sort
                //     }
                // });
                const {
                    data
                } = await this.$ajax.get("/goods", {
                    params: {
                        page,
                        size,
                        sort
                    }
                });
                console.log("data=", data);
                this.goodslist = data.data;

                console.log(data);
                this.goods = data.data
            },
            // 触发事件
            pageChange(currentPage) {
                this.page = currentPage;
                this.getData()
            },
            // pageSize 改变时会触发
            sizeChange(currentSize) {
                this.size = currentSize;
                this.getData();
            },
            // 跳转
            gotoDetail(id) {
                // this.$router.push('./goods/'+id);  //  params传参  变量

                // this.$router.push('./goods/'+id+'?id='+id); 

                this.$router.push({ // query传参 可以传多个  可以通过名字传  刷新后参数依然存在

                    //    path:'/goods',  //  跳转不显示内容
                    name: 'goods', // params传参，只支持name方式跳转
                    params: {
                        id,
                        // username: 'sss'   // 刷新后，只有保留了动态参数
                    },
                    // query:{
                    //    a:123
                    // }
                })
            },
            // 组件内路由守卫   路由进入当前组件时触发
            beforeRouteEnter: function (to, from, next) {
                console.log('Goods.beforeRouteEnter')
                next();
            },
            //   路由进入更新时触发                 等效于watch:{'$route':function(to,from){}}   
            beforeRouteUpdate(to, from, next) {
                console.log('Goods.beforeRouteUpdate', to, from)
                this.getData(to.params.id);
                next();
            },
            //   路由离开时触发
            beforeRouteLeave(to, from, next) {
                console.log('Goods.beforeRouteLeave')
                next();
            },

        },


    }
</script>