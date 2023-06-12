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

<script context="module" lang="ts">
  import { createSvelteWebComponent } from "@mf-dev/wrapper-svelte";
  import('./SvelteButton.svelte').then(r=>{
    createSvelteWebComponent({
      tag: 'ex-svelte-button',
      component: r.default,
      attributes: ['text'],
    })
  })
</script>