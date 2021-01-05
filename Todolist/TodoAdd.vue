<template>
    <div class="input-group mt-3">
        <input type="text" class="form-control" ref="input" v-model="event" @keyup.enter="addItem" />
        <div class="input-group-append">

            <button class="btn btn-success" @click="addItem">添加</button>
        </div>
    </div>
</template>
<script>
    export default {
        name:'todoAdd',
        data: function () {
            return {
                event: ''
            }
        },

      

        // 方法
        methods: {
            //  自定义一个获取焦点事件   触发自定义事件 $emit()
            addItem() {
                this.$emit('add', this.event);

                // this.$on('add',)// 与v-on一致

                // 清空并自动获取焦点
                this.event = "",
                    this.$refs.input.focus(); //  自定义传参   $emit()
            }
        },

    }
</script>