<script setup>
import VueComponent from './components/VueComponent.vue';
import { RouterLink ,RouterView} from 'vue-router';


</script>

<template>
    <h1>目前在app.vue</h1>
    

    <VueComponent></VueComponent>

    <RouterView></RouterView>

</template>

<style>
.link{
    font-size: 40px;
    text-decoration: none;
}

</style>