<script setup lang="ts">
import {refSignal} from "./signals";

const {mySignal, fizzBuzz} = (window as any).store
const counter = refSignal<number>(mySignal)
const text = refSignal<string>(fizzBuzz)


const {mycount, dispatch} = defineProps() as {
  mycount: number
  dispatch: (name: string, detail?: any) => void
}

const send = () => dispatch('myevent', 'vue')
</script>

<template>
  <div class="root">
    <h1>Vue</h1>
    <vue-button :text="`Clicks: ${mycount}`"
                @myclick="send()"></vue-button>
    <button @click="counter++">{{mySignal}} = {{ text }}</button>
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
