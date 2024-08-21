<script setup>
import {ref} from 'vue';
const todos =ref([
    {
        name:"購買雜貨",
        dueDate:"2024-07-30",
        isFinished:true,
        id:1
    },
    {
        name:"完成報告",
        dueDate:"2024-08-01",
        isFinished:false,
        id:2
    },
    {
        name:"清理房間",
        dueDate:"2024-07-28",
        isFinished:true,
        id:3
    },
    {
        name:"計劃假期",
        dueDate:"2024-08-05",
        isFinished:false,
        id:4
    },
    {
        name:"處理稅務",
        dueDate:"2024-08-10",
        isFinished:false,
        id:5
    }
]);

// console.log(todos.value);
</script>
<template>
    <RouterLink to="/" class="link">回首頁</RouterLink>
    <h2>這是Week1Hw.vue</h2>
    <table>
        <thead>
            <tr>
            <th>代辦事項名稱</th>
            <th>到期日</th>
            <th>是否已完成</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="todo in todos" :key="todo.id">
            <td>{{todo.name}}</td>
            <td>{{todo.dueDate}}</td>
            <td>{{todo.isFinished ? "是":"否"}}<input type="checkbox" v-model="todo.isFinished">
                <button type="button" @click="todo.isFinished =!todo.isFinished">切換</button>
            </td>
<!-- 三元運算子 -->
            </tr>
        </tbody> 
    </table>
</template>
<style>
</style>