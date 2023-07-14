<script lang="ts">
import type { ButtonType } from "./main.js";

const css = String.raw
$: args = $$props as typeof ButtonType
</script>

<button>{args.text}</button>
<svelte:element this="style">
  {css`
    button {
      background-color: coral;
      color: white;
    }
  `}
</svelte:element>