<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const increment = () => {
  count.value++
}
</script>

<template>
  <div>
    <h1>GREEN</h1>
    <button is="ex-button" @click="increment">Clicked: {{ count }}</button>
  </div>
</template>

<style scoped>
h1 {
  color: #41b883;
}
</style>
