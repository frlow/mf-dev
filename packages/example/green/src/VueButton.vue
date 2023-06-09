<script lang="ts" setup></script>

<template>
  <button>Vue Button</button>
  <component
    is="style"
    v-html="
      `
        button {
          background-color: greenyellow;
        }
      `
    "
  />
</template>
