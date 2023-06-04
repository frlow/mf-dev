<script setup lang="ts">
import { ref } from 'vue'
import { DispatchHandler } from '@mf-dev/wrapper-vue'
const count = ref(0)
const increment = () => {
  count.value++
}
const { dispatch } = defineProps<{
  dispatch: DispatchHandler
  myCount: number
}>()
const send = () => dispatch(new CustomEvent('my-event', { detail: 'green' }))
</script>

<template>
  <div>
    <h1>GREEN</h1>
    <button is="ex-button" @click="increment">Clicked: {{ count }}</button>
    <button is="ex-button" @click="send()">Dispatch: {{ myCount }}</button>
  </div>
</template>

<style scoped>
h1 {
  color: #41b883;
}
</style>
