<script lang="ts">
  let show = false;
  export let mycount: number
  export let dispatch: (name: string, detail?: any)=>void
</script>

<div class="root">
  <h1>Svelte</h1>
  <button on:click={()=>dispatch("myevent", "red")}>
    Clicks: {mycount}</button>
</div>

<style lang="scss">
  @import "./style.scss";
</style>
