<template>
    <div>
        <h1>用户登录</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px"
            @keyup.native.enter="submitForm" >
            <el-form-item label="用户名" prop="username" :error="errMsg">
                <el-input v-model="ruleForm.username"  ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :error="errMsg">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"
                @keyup.enter="submitForm"></el-input>
            </el-form-item>
            <el-form-item prop="mdl">
                <el-checkbox v-model="ruleForm.mdl">7天免登陆</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    const crypto = require('crypto')
    export default {
        name: 'Login',
        data() {
            return {
                errMsg: '',
                ruleForm: {
                    username: "",
                    password: "",
                    mdl: true,
                },
                rules: {
                    username: [{
                            required: true,
                            message: "请输入用户名",
                            trigger: "blur"
                        },
                        {
                            min: 3,
                            max: 20,
                            message: "用户名长度必须在3到20",
                            trigger: "blur",
                        },
                    ],
                    password: [{
                            required: true,
                            message: "请输入密码",
                            trigger: "blur"
                        },
                        {
                            min: 6,
                            max: 12,
                            message: "密码长度必须在6到12",
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        methods: {
            submitForm() {
                this.$refs.loginForm.validate(async (valid) => {
                    if (valid) {
                        const {
                            username,
                            password
                        } = this.ruleForm;
                        // 加密
                        const hash = crypto.createHash("sha256");
                        hash.update(password);
                        const newPassword = hash.digest("hex");

                        // 发起ajax请求注册
                        const {
                            data
                        } = await this.$ajax.get("/user/login", {
                            params: {
                                username,
                                password: newPassword
                            },
                        });
                        if (data.code == 200) {
                            // 跳转
                            // this.$router.replace("/home");
                        let {redirectTo='/mine'}=this.$route.query;  // 给个默认值
                        this.$router.replace(redirectTo)

                            // 把用户信息保存到vuex
                            this.$store.commit( 'login', data.data);
                        } else {
                            // this.$message.error("用户名或密码错误");
                            this.errMsg = '用户名或密码错误';
                        } 

                        // this.$store.dispatch('login',{
                        //      username,
                        //         password: newPassword
                        // })
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
        },
        // 获取数据
        created() { 
            console.log('store=', this.$store);
            console.log('state=', this.$store.state.user.username);
            console.log('getters=', this.$store.getters.totalPrice);
        }
    }
</script>