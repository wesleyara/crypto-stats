<script setup lang="ts">
import { linkMap } from "../utils/constants";

const handleScrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<template>
  <header
    class="window-width mx-auto mt-4 flex items-center justify-between rounded-lg px-4 py-3"
  >
    <span class="flex items-center gap-2 text-emerald-500">
      <Icon
        name="streamline:money-currency-bitcoin-circle-1-crypto-circle-payment-blockchain-finance-bitcoin-currency-money"
        size="28"
        class="cursor-pointer"
      />

      <h4 class="text-white">CryptoStats</h4>
    </span>

    <span class="flex">
      <span
        v-for="item of linkMap"
        :key="item.label"
        class="cursor-pointer rounded-md px-4 py-2 hover:bg-big-stone-800"
        @click="handleScrollToId(item.href)"
      >
        {{ item.label }}
      </span>
    </span>
  </header>
</template>

// material-symbols:clear-day-rounded
