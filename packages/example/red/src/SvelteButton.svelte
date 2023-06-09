<script lang="ts">
  import type {DispatchHandler} from '@mf-dev/wrapper-svelte'
  import { css } from "@mf-dev/wrapper-svelte";

  export let dispatch: DispatchHandler;
</script>

<button class="button" on:click={()=>dispatch(new CustomEvent("my-click"))}>
  Svelte Button
</button>

<svelte:element this="style">{@html css`
  .button {
    background-color: #f86464;
  }
`}</svelte:element>