<script lang="ts">
const css = String.raw
export let text: string
</script>

<button>{text}</button>
<svelte:element this="style">
  {css`
    button {
      background-color: coral;
      color: white;
    }
  `}
</svelte:element>