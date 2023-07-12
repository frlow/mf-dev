<script lang="ts">
  import type { AppType } from "./main.js";
  import type {PropsType}from '@mf-dev/wrapper-svelte'

  let show = false;
  export let {myCount, dispatch} = {} as PropsType<typeof AppType>
</script>

<main>
  <h1>RED</h1>
  <button on:click={()=>show=!show}>Toggle</button>
  {#if show}
    <button class="secondary">Demo</button>
  {/if}
  <button on:click={()=>dispatch("myEvent", "red")}>
    Dispatch {myCount}</button>
  <ex-svelte-button text="Svelte Button"></ex-svelte-button>
</main>

<style lang="scss">
  @import "./style.scss";
</style>
