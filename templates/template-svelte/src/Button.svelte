<script lang="ts">
  export let text: string
  export let dispatch: (name: string, detail?: any) => void
</script>

<button on:click={()=>dispatch('myclick')}>{text}</button>
<svelte:element this="style">
    {`button {
      border: 1px solid white;
      padding: 1rem;
      background-color: #aa1e1e;
      text-transform: uppercase;
      font-family: 'Avenir Next', serif;
      border-radius: 5px;
      font-size: 1.2rem;
      color: #dbdde1;
    }`}
</svelte:element>
