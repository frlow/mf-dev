<script lang="ts">
  let show = false;
  export let mycount: number
  export let dispatch: (name: string, detail?: any) => void
</script>

<div class="root">
    <h1>Svelte</h1>
    <svelte-button on:myclick={()=>dispatch("myevent", "svelte")} text={`Clicks: ${mycount}`}/>
</div>

<style lang="scss">
  @import "./style.scss";
</style>
