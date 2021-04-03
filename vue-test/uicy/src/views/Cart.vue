<template>
    <div class="wrapper">
        <h3>通用设置</h3>
        <p class="aaa">页面设置</p>
        <div class="yemian">
            <p>页面标题: <span> 页面标题添加统一后缀-</span></p>
            <el-input v-model="input1" placeholder="乐商Wise B2B产品"></el-input>
        </div>
        <dd>设置后缀时后缀名不能为空</dd>
        <div class="long">
            <p>后台登录页LOGO：</p>
            <el-radio v-model="radio" label="1">默认</el-radio>
            <el-radio v-model="radio" label="2">自定义</el-radio>
            <!-- 图片上传 -->
            <span>上传图片</span>
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="avatar-uploader-icon">2222</i>
            </el-upload>
        </div>
        <dd class="aaaa">建议：上传尺寸为160*46的PNG图片，该设置保存后30分钟内生效。</dd>
        <div class="long">
            <p>前台登录页LOGO：</p>
            <el-radio v-model="radio2" label="1">默认</el-radio>
            <el-radio v-model="radio2" label="2">自定义</el-radio>
            <!-- 图片上传 -->
            <span>上传图片</span>
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="avatar-uploader-icon">2222</i>
            </el-upload>
        </div>
        <dd class="aaaa">建议：上传尺寸为160*46的PNG图片，该设置保存后30分钟内生效。</dd>
        <div class="yemian1">
            <p>后台登录页文字：</p>
            <el-input v-model="input2" placeholder="乐商·医药新流通"></el-input>
        </div>
        <div class="yemian11">
            <p class="menu">后台登录页底部文字：</p>
            <el-input v-model="input2" placeholder="Copyright 2006-2021 版权所有"></el-input>
        </div>
        <div class="long1">
            <p >后台菜单LOGO：</p>
            <el-radio v-model="radio3" label="1">默认</el-radio>
            <el-radio v-model="radio3" label="2">自定义</el-radio>
        </div>
        <dd class="aaaa">建议：上传尺寸为125*46的PNG图片，白色底最佳，该设置保存后30分钟内生效。</dd>
        <div class="yemian2">
            <p>总平台Admin账户标题：</p>
            <el-input v-model="input3" placeholder="乐商Wise B2B产品"></el-input>
        </div>
        <div class="long2">
            <p>后台菜单LOGO：</p>
            <el-radio v-model="radio4" label="1">默认</el-radio>
            <el-radio v-model="radio4" label="2">自定义</el-radio>
        </div>
         <dd class="aaaa">建议：上传尺寸为40*40的PNG图片，该设置保存后30分钟内生效。</dd>
    </div>

</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {
                form: {
                    name: ''
                },
                radio: '1',
                imageUrl: '',
                radio2: '1',
                radio3: '1',
                radio4: '1',
                input1: '',
                input2: '',
                input3: ''

            };
        },
        watch: {},
        computed: {},
        methods: {
            // 成功
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        created() {},
        mounted() {}
    };
</script>
<style lang="scss">
    .wrapper {
        width: 100%;
        h3 {
            width: 100%;
            height: 50px;
            background: #FBFBFB;
            line-height: 50px;
            padding-left: 10px;
            color: #262626;
            border: 1px solid #E9E9E9;
        }

        .aaa {
            padding-left: 60px;
            font-weight: 900;
        }
        .yemian {
            display: flex;
            width: 660px;
            height: 36px;
            justify-content: center;
            align-items: center;
            p {
                width: 100%;
                padding-left: 100px;
                span {
                    padding: 20px;
                }
            }
            .el-input__inner {
                width: 186px;
                line-height: 53px;
            }
        }
        dd {
            font-size: 12px;
            color: #AAAAAA;
            padding-left: 152px;
        }
        .long {
            display: flex;
            height: 45px;
            padding-left: 36px;
            .el-radio {
                height: 53px;
                line-height: 53px;
                // padding-left: 20px;
            }
            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }

            // .avatar-uploader-icon {
            //     font-size: 28px;
            //     color: #8c939d;
            //     width: 178px;
            //     height: 178px;
            //     line-height: 178px;
            //     text-align: center;
            // }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
            span {
                font-size: 14px;
                padding-left: 10px;
                line-height: 53px;
                color: #000;
            }

            .el-upload {
                margin-top: 14px;
                margin-left: 4px;
                border: 1px solid #d9d9d9 !important;
                //   background: url(); 
            }
        }
        .aaaa {
            font-size: 12px;
            color: #AAAAAA;
            padding-left: 152px;
        }
        .yemian1{
            display: flex;
            width: 660px;
            height: 36px;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            
            p {
                width: 30%;
                padding-left: 50px;
            }
            .el-input__inner {
                width: 383px;
                line-height: 53px;
            }
        }
        .yemian11{
            display: flex;
            width: 660px;
            height: 36px;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            padding-top: 15px;
            .menu{
                width: 37%;
                padding-left: 17px;
            }
            .el-input__inner {
                width: 383px;
                line-height: 53px;
            }
        }
        .long2,
        .long1 {
            display: flex;
            height: 45px;
            padding-left: 50px;
            padding-top:14px;
            .el-radio {
                height: 53px;
                line-height: 53px;
                padding-left: 14px;
            }
        }
        .yemian2 {
            display: flex;
            width: 660px;
            height: 36px;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            p {
                width: 41%;
            }
            .el-input__inner {
                width: 383px;
                line-height: 53px;
            }
        }

    }
</style>