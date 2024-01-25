<script lang="ts">
  import type {AppProps} from "./main";

  export let {dispatch, mycount} = {} as typeof AppProps
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
