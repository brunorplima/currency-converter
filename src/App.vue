<script setup>
import Main from './components/Main/Main.vue'
import Aside from './components/Aside/Aside.vue'
</script>

<template>
  <div id="appContainer" class="h-screen flex">
    <Main />
    <Aside />
  </div>
</template>

<style>
#appContainer {
  background-color: #F0F8FF;
}
</style>
