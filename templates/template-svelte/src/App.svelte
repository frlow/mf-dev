<script lang="ts">
  export let mycount: number
  export let dispatch: (name: string, detail?: any) => void
</script>

<div class="root">
    <h1>Svelte</h1>
    <button on:click={()=>dispatch("myevent", {value: "svelte"})}>clicks: {mycount}</button>
</div>

<style lang="scss">
  @import "./style.scss";

  button {
    border: 1px solid white;
    padding: 1rem;
    background-color: #aa1e1e;
    text-transform: uppercase;
    font-family: 'Avenir Next', serif;
    border-radius: 5px;
    font-size: 1.2rem;
    color: #dbdde1;
  }
</style>
