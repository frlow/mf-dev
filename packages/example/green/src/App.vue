<script setup lang="ts">
import { ref } from 'vue'
import { AppProps } from './main.js'
const count = ref(0)
const increment = () => {
  count.value++
}
const { host } = defineProps<AppProps & { host: Element }>()
const send = () =>
  host!.dispatchEvent(new CustomEvent('my-event', { detail: 'green' }))
const log = console.log
</script>

<template>
  <h1>GREEN</h1>
  <button is="ex-button" @click="increment">Clicked: {{ count }}</button>
  <button is="ex-button" @click="send()">Dispatch: {{ myCount }}</button>
  <ex-vue-button @click="(e: Event) => log(e)"></ex-vue-button>
</template>

<style scoped>
h1 {
  color: #41b883;
}
</style>
