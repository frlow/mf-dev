<script lang="ts">
import type { ButtonMeta } from "./main.js";

const css = String.raw
export let {text}: ButtonMeta={}
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