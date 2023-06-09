<script lang="ts">
  import style from './SvelteButton.scss?inline'

  export let host: HTMLElement;
</script>

<button class="button" on:click={()=>host.dispatchEvent(new CustomEvent("my-click"))}>
  Svelte Button
</button>

<svelte:element this="style">{@html style}</svelte:element>