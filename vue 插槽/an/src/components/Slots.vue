<template>
  <div class="slot">
    <div class="default">
      <slot v-bind="userInfo"></slot>
    </div>

    

    <div>
      <slot name="info" v-bind="userInfo"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Slots",
    data() {
      return {
        userInfo: {
          username: 'jingjing',
          password: 123,
          role: 'vip',
          gender: '女',
          age: 36,
        }
      }
    }
  }
</script>