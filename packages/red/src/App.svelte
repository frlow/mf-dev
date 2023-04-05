<script lang="ts">
  let show = false
</script>

<main is="ex-main">
    <h1>RED</h1>
    <button is="ex-button" on:click={()=>show=!show}>Toggle</button>
    {#if show}
        <button is="ex-button" class="secondary">Demo</button>
    {/if}
</main>

<style>
    h1{
        color: #aa1e1e;
    }
</style>
