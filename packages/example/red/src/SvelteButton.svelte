<script lang="ts">
import type { ButtonType } from "./main.js";

const css = String.raw
export let {text}: typeof ButtonType={} as any
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