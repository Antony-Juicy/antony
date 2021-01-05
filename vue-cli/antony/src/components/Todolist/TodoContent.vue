<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">代办事项</th>
                <th scope="col">是否完成</th>
                <th scope="col">操作</th>
            </tr>
        </thead>
        <tbody>

            <TodoItem v-for="(item,idx) in datalist" :key="item.id" :item="item" :idx="idx"></TodoItem>

        </tbody>
    </table>
</template>
<script>
    import TodoItem from './TodoItem'; //  引入

    export default {
        name: "TodoContent",
        props: ["datalist"],
      
        components: {
            TodoItem

        }
    }
</script>