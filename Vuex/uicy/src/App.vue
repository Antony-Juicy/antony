<template>
  <div id="app">
    <!-- <h3>router-view 显示的内容</h3> -->
    <!-- <nav>  跳转
      <router-link to="/home" tag="span" active-class="active">首页</router-link>
      <router-link to="/reg" active-class="active" replace>注册</router-link>
      <router-link to="/login" active-class="active" event="mouseover">登录</router-link>
    </nav>-->
    <!-- 
    <nav>
      <ul>
        <li v-for="item in nav" :key="item.name" @click="goto(item)" :class="{active:item.path===current}">{{item.text}}</li>
      </ul>
    </nav> -->


    <!-- :default-active="current"   刷新不锁定内容  -->
    <el-row style="background-color:#545c64">
      <el-col :span="12">
        <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
          :default-active="current" router>

          <el-menu-item :index='item.path' v-for="item in nav" :key="item.name"><i :class="item.icon"></i>{{item.text}}
          </el-menu-item>


        </el-menu>
      </el-col>
      <el-col :span="12"
        style="border-bottom:solid 1px #e6e6e6;height:61px;overflow:hidden;text-align:right;line-height:61px;padding-right:20px;">
<!-- 判断是否登录 -->
        <template v-if="$store.getters.isLogin">
            <el-avatar size="small" icon="el-icon-s-custom"></el-avatar>
            <span style="vertical-align:middle">{{ $store.state.user.username }}</span>
            <el-button type="text" @click="logout">退出</el-button>
          </template>
          <template v-else>
            <el-button type="text" @click="goto('/reg')">注册</el-button>
            <el-button type="text" @click="goto('/login')">登录</el-button>
          </template>
      </el-col>
    </el-row>
    <!-- 显示  路由信息显示-->
    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        nav: [{
          name: "home",
          path: "/home",
          text: "首页",
          icon: "el-icon-s-home"
        }, {
          name: "discover",
          path: "/discover",
          text: "发现",
          icon: "el-icon-view"
        }, {
          name: "cart",
          path: "/cart",
          text: "购物车",
          icon: "el-icon-shopping-cart-2"
        }],
        current: "/home"
      }
    },
    watch: {
      // 监听路由变化，实现高亮效果   newVal新值（path）    oldVal旧值（path）
      "$route.path": function (newVal) {
        //  console.log(newVal,oldVal);
        this.current = newVal;
      }
    },
    methods: {
      goto(path) {
        // this.$router.push(item.path);  跳转 浏览器有记录
        this.$router.replace(path) // 跳转   无浏览器有记录
      },
      // 退出 
      logout(){
        this.$store.commit('logout');  // 修改数据
        this.goto('/login');
      }
    },

    //  刷新锁定 声明周期
    created() {
      let {
        path
      } = this.$route;
      this.current = path;
    }

  }
</script>

<style lang="scss">
  body {
    margin: 0;
  }

  .price {

    span::before,
    del::before {
      content: '￥'
    }

    del {
      color: #999
    }

    span {
      color: red
    }
  }

  @for $i from 1 to 6 {
    .m-#{$i} {
      margin: $i*0.3em;
    }

    .p-#{$i} {
      padding: $i*0.3em;
    }
  }

  nav a {
    margin: 0 10px;
  }

  .active {
    color: #f00;
    font-weight: bold;
  }
  .el-card__body {
  h4 {
    margin-top: 0;
  }
  img {
    width: 100%;
  }
}
</style>