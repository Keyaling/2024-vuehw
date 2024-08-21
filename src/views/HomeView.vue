<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <RouterLink to="/week1hw" class="link">這是Week1Hw的連結</RouterLink>|
    <RouterLink to="/week2hw" class="link">這是Week2Hw的連結</RouterLink>|
    <RouterLink to="/about" class="link">這是about的連結</RouterLink>
    
  </main>
</template>
<style>
.link{
  font-size: 16px;

}
.link+.link{
  margin-left: 16px;
}
</style>