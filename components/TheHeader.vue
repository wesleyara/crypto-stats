<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <header
    class="window-width mx-auto mt-4 flex items-center justify-between rounded-lg bg-big-stone-950 px-4 py-3"
  >
    <span class="flex items-center gap-2 text-emerald-500">
      <Icon
        name="streamline:money-currency-bitcoin-circle-1-crypto-circle-payment-blockchain-finance-bitcoin-currency-money"
        size="28"
        class="cursor-pointer"
      />

      <h4 class="text-white">CryptoStats</h4>
    </span>

    <span class="rounded-md p-2 hover:bg-big-stone-800">
      <Icon
        name="material-symbols:dark-mode-rounded"
        size="28"
        class="cursor-pointer"
        @click="toggleDark"
      />
    </span>
  </header>
</template>

// material-symbols:clear-day-rounded
