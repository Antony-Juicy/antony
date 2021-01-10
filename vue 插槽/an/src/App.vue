<template>
  <div id="app">

    <Slots>
      <!--  默认是 default  参数是props 所有数据 -->
      <template #default="props">
 
        <h4>{{props.username}}</h4>
        <p>性别：{{props.gender}}</p>
        <p>等级：{{props.role}}</p>
        <p>年龄：{{props.age}}</p>
     
      </template>
    </Slots>




    <Slots>
      <template #info="{username,gender,age,password}">
        <h1>用户名：{{username}}</h1>
        <span>性别：{{gender}}</span><br>
        <span>年龄：{{age}}</span>
        <h3>密码：{{password}}</h3>
      </template>

    </Slots>



 <Dcomponent></Dcomponent>
  </div>

</template>

<script>
// 插槽
  import Slots from './components/Slots.vue';

// 动态组件
  import Dcomponent from './components/Dcomponent';

  export default {
    name: 'App',
    components: {
      Slots,
      Dcomponent
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>