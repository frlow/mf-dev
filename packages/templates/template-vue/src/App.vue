<script setup lang="ts">
import type { AppType } from './main.js'

const { 'my-count': myCount, dispatch } = defineProps() as typeof AppType

const send = () => dispatch('my-event', 'green')
const log = console.log
</script>

<template>
  <div class="root">
    <h1>Vue</h1>
    <button @click="send()">Clicks: {{ myCount }}</button>
  </div>
</template>

<style scoped>
.root {
  background-color: #152311;
  padding: 3rem;
  border: 2px solid #2d3746;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 10rem;
}
h1 {
  color: #41b883;
}
button {
  border: 1px solid white;
  padding: 1rem;
  background-color: #41b883;
  text-transform: uppercase;
  font-family: 'Avenir Next', serif;
  border-radius: 5px;
  font-size: 1.2rem;
  color: #dbdde1;
}
</style>
