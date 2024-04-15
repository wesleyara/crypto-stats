<script setup lang="ts">
const dropdown = ref();
const show = ref(false);

</script>

<template>
  <section
    id="home"
    class="window-width mx-auto flex flex-col items-center gap-10 py-32 text-center lg:flex-row lg:items-start lg:text-start"
  >
    <NuxtImg
      src="/ilustration.webp"
      alt="A crypto ilustration"
      width="640"
      height="587"
      class="w-[300px] rounded-lg sm:w-[640px]"
    />

    <div class="flex flex-col gap-4">
      <h1 class="text-4xl md:text-5xl">
        Welcome to <span class="text-emerald-500">CryptoStats</span>
      </h1>

      <span class="text-lg">
        Your trusted source for real-time analytics and statistics in the
        fascinating world of <b class="text-emerald-500">cryptocurrencies</b>.
        <br />

        <span ref="dropdown" class="dropdown" v-auto-animate>
          <span class="dropdown-label" @click="show = !show">
            See more
            <Icon
              name="material-symbols:arrow-drop-down"
              size="24"
              :class="
                show ? 'rotate-180 transition-all' : 'rotate-0 transition-all'
              "
            />
          </span>

          <p class="dropdown-content" v-if="show">
            Explore the latest market data, track trends, and discover valuable
            insights to inform your investment decisions. Whether you're just
            starting out or a seasoned veteran in the crypto space, CryptoStats
            is your partner in navigating this ever-evolving universe. Join us
            and embark on this exciting journey into the future of finance.
          </p>
        </span>
      </span>
    </div>
  </section>
</template>
