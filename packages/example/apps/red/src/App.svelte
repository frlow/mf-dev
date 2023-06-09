<script lang="ts">
  let show = false;
  export let host: HTMLElement;
  export let myCount: number;
</script>

<main is="ex-main">
  <h1>RED</h1>
  <button is="ex-button" on:click={()=>show=!show}>Toggle</button>
  {#if show}
    <button is="ex-button" class="secondary">Demo</button>
  {/if}
  <button is="ex-button" on:click={()=>host.dispatchEvent(new CustomEvent("my-event", {detail: "red"}))}>
    Dispatch {myCount}</button>
</main>

<style lang="scss">
  @import "./style.scss";
</style>
