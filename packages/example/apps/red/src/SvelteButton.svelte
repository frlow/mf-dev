<script lang="ts">
import type { buttonMeta } from "./main.js";

const css = String.raw
export let {text}: typeof buttonMeta={}
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