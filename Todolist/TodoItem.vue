<template>

    <tr :id="item.id" :class="{'table-success':item.complete}">
        <th scope="row">{{idx+1}}</th>
        <td>{{item.event}}</td>
        <td>{{item.complete ? '是':'否'}}</td>
        <td>
            <!-- <div class="btn-group"> -->

            <button class="btn btn-outline-primary btn-sm" @click="complete(item.id)">完成</button>
            <button class="btn btn-outline-danger btn-sm" @click="remove(item.id)">删除</button>
            <!-- </div> -->

        </td>
    </tr>
</template>

<script>
    export default {
        name: "TodoItem",
      
        props: ["item", "idx"],
     
        //   方法
        methods: {
            complete(id) {
                // 触发事件并传递数据
                Bus.$emit("complete", id);
                // this.$root.$emit('complete', id);
            },
            remove(id) { 
                Bus.$emit("remove", id);
                // this.$root.$emit('remove', id);

            }


        },


    }
</script>