<script lang="ts">
  import type { AppType } from "./main.js";
  import type {PropsType}from '@mf-dev/wrapper-svelte'

  let show = false;
  export let {myCount, dispatch} = {} as PropsType<typeof AppType>
</script>

<main is="ex-main">
  <h1>RED</h1>
  <button is="ex-button" on:click={()=>show=!show}>Toggle</button>
  {#if show}
    <button is="ex-button" class="secondary">Demo</button>
  {/if}
  <button is="ex-button" on:click={()=>dispatch("myEvent", "red")}>
    Dispatch {myCount}</button>
  <ex-svelte-button text="Svelte Button"></ex-svelte-button>
</main>

<style lang="scss">
  @import "./style.scss";
</style>
