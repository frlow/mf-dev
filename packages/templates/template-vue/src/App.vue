<script setup lang="ts">
import type { AppType } from './main.js'

const { 'my-count': myCount, dispatch } = defineProps() as typeof AppType

const send = () => dispatch('my-event', 'green')
const log = console.log
</script>

<template>
  <h1>Vue</h1>
  <button @click="send()">Clicks: {{ myCount }}</button>
</template>

<style scoped>
h1 {
  color: #41b883;
}
</style>
