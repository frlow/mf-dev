<script lang="ts">
  import type { AppType } from "./main.js";
  let show = false;
  $: args = $$props as typeof AppType
</script>

<main>
  <h1>RED</h1>
  <button on:click={()=>show=!show}>Toggle</button>
  {#if show}
    <button class="secondary">Demo</button>
  {/if}
  <button on:click={()=>args.dispatch("my-event", "red")}>
    Dispatch {args["my-count"]}</button>
  <ex-svelte-button text="Svelte Button"></ex-svelte-button>
</main>

<style lang="scss">
  @import "./style.scss";
</style>
