<script lang="ts" setup>
const { text, dispatch } = defineProps() as {
  text: string
  dispatch: (name: string, detail?: any) => void
}

</script>

<template>
  <button @click="()=>dispatch('myclick')">{{text}}</button>
  <component is="style">
    {{`button {
      border: 1px solid white;
      padding: 1rem;
      background-color: #41b883;
      text-transform: uppercase;
      font-family: 'Avenir Next', serif;
      border-radius: 5px;
      font-size: 1.2rem;
      color: #dbdde1;
    }`}}
  </component>
</template>
