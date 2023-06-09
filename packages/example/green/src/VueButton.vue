<script lang="ts" setup>
import { css } from '@mf-dev/wrapper-vue'
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
