<script lang="ts" setup>
const css = String.raw
</script>

<template>
  <button>Vue button</button>
  <component is="style">
    {{
      css`
        button {
          background-color: deeppink;
          padding: 1rem;
          border-radius: 5px;
          border: 1px solid #090606;
          color: white;
        }
      `
    }}</component
  >
</template>
