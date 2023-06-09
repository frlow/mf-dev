<script lang="ts" setup>
const css = String.raw
</script>

<template>
  <button>Vue Button</button>
  <component
    is="style"
    v-html="
      css`
        button {
          background-color: greenyellow;
        }
      `
    "
  />
</template>
