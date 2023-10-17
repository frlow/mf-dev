<script lang="ts">
  import type { AppType } from "./main.js";
  let show = false;
  $: args = $$props as typeof AppType
</script>

<main>
  <h1>Svelte</h1>
  <button on:click={()=>args.dispatch("my-event", "red")}>
    Dispatch {args["my-count"]}</button>
</main>

<style lang="scss">
  @import "./style.scss";
</style>
