<script lang="ts">
  import type {DispatchHandler} from '@mf-dev/wrapper-svelte'
  import style from './SvelteButton.scss?inline'

  export let dispatch: DispatchHandler;
</script>

<button class="button" on:click={()=>dispatch(new CustomEvent("my-click"))}>
  Svelte Button
</button>

<svelte:element this="style">{@html style}</svelte:element>