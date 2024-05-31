<script setup lang="ts">
const year = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="my-10 flex flex-col items-center justify-center gap-4 text-center">
    <span>© {{ year }} Crypto Stats</span>
    <span>
      Created by
      <a
        href="https://wesleyaraujo.dev/"
        target="_blank"
        class="text-emerald-500"
        >Wesley Araujo
      </a>
      using Nuxt and CoinGecko API.
    </span>
  </footer>
</template>
