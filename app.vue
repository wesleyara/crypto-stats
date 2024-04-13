<script setup lang="ts">
useSeoMeta({
  title: "CryptoStats",
  description: "A simple way to track your Cryptocurrency stats",
  ogTitle: "CryptoStats",
  ogDescription: "A simple way to track your Cryptocurrency stats",
  ogImage: "https://wesleyaraujo.dev/favicon.png",
  ogImageUrl: "https://wesleyaraujo.dev/favicon.png",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/svg",
      href: "/favicon.svg",
    },
  ],
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
@use "~/assets/css/typography.scss";
@use "~/assets/css/globals.scss";
</style>
