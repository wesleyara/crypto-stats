<script setup lang="ts">
defineProps<{
  handleExecute: () => void;
}>();
</script>

<template>
  <span class="flex flex-col gap-5 text-center">
    <span>
      Failed to fetch data. The API received too many requests. Please try again
      later.
    </span>
    <button
      class="rounded-md bg-emerald-500 px-3 py-2 text-black hover:bg-emerald-600"
      @click="handleExecute"
    >
      Retry
    </button>
  </span>
</template>
