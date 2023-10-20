<script lang="ts">
  let show = false;
  export let mycount: number
  export let dispatch: (name: string, detail?: any)=>void
</script>

<main class="root">
  <h1>Svelte</h1>
  <button on:click={()=>dispatch("myevent", "red")}>
    Clicks: {mycount}</button>
</main>

<style lang="scss">
  @import "./style.scss";
</style>
