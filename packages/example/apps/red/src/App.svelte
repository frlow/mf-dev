<script lang="ts">
  import type { AppMeta } from "./main.js";

  let show = false;
  export let {myCount, host}: AppMeta = {}
</script>

<main is="ex-main">
  <h1>RED</h1>
  <button is="ex-button" on:click={()=>show=!show}>Toggle</button>
  {#if show}
    <button is="ex-button" class="secondary">Demo</button>
  {/if}
  <button is="ex-button" on:click={()=>host.dispatchEvent(new CustomEvent("my-event", {detail: "red"}))}>
    Dispatch {myCount}</button>
  <ex-svelte-button text="Svelte Button"></ex-svelte-button>
</main>

<style lang="scss">
  @import "./style.scss";
</style>
