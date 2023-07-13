<script setup lang="ts">
import { ref } from 'vue'
import type { AppType } from './main.js'

const count = ref(0)
const increment = () => {
  count.value++
}
const { 'my-count': myCount, dispatch } = defineProps() as typeof AppType

const send = () => dispatch('my-event', 'green')
const log = console.log
</script>

<template>
  <h1>GREEN</h1>
  <button @click="increment">Clicked: {{ count }}</button>
  <button @click="send()">Dispatch: {{ myCount }}</button>
  <ex-vue-button @click="(e: Event) => log(e)"></ex-vue-button>
</template>

<style scoped>
h1 {
  color: #41b883;
}
</style>
