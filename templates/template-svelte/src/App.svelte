<script lang="ts">
  let show = false;
  export let mycount: number
  export let dispatch: (name: string, detail?: any) => void
  const {fizzBuzz, mySignal} = (window as any).store
</script>

<div class="root">
    <h1>Svelte</h1>
    <svelte-button on:myclick={()=>dispatch("myevent", "svelte")} text={`Clicks: ${mycount}`}/>
    <button on:click={()=>mySignal.value++}>{$mySignal} = {$fizzBuzz}</button>
</div>

<style lang="scss">
  @import "./style.scss";
</style>
