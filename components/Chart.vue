<script setup lang="ts">
import { coinList } from "../utils/constants";
import { ref } from "vue";
import { Chart, Line, Responsive } from "vue3-charts";

const toast = useToast();

const data = ref([]);
const currency = ref("bitcoin");

const endpoint = computed(() => {
  const times = getLastTwoWeeksTimestamp();

  return `https://api.coingecko.com/api/v3/coins/${currency.value}/market_chart/range?vs_currency=usd&from=${times.timestampLastTwoWeeks}&to=${times.timestampNow}`;
});

const { pending, error, execute } = useFetch(endpoint, {
  onRequestError: error => {
    toast.add({
      title: "Error",
      description: `Failed to fetch data. The API received too many requests. Please try again
      later.`,
    });
  },
  onResponse: response => {
    const prices = convertArrayToObjects(response.response._data.prices);
    const tempArray: any = convertBigDataToSmallData(prices).map(item => {
      return { name: item.day, pl: item.price };
    });

    data.value = tempArray;
  },
  retry: 0,
});

const handleCurrencyChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  currency.value = value;
};

const handleExecute = () => {
  execute();
};
</script>

<template>
  <section class="window-width mx-auto my-10 flex flex-col gap-4">
    <h2>Graph of the last 15 days</h2>
    <template v-if="!error">
      <span className="flex flex-col gap-2">
        <span>Select the crypto</span>
        <select
          class="flex w-[100px] items-center justify-center rounded"
          name="inputSelectCurrencyValue"
          aria-label="Select currency"
          v-model="currency"
          @change="handleCurrencyChange"
        >
          <option
            v-for="item of coinList"
            :key="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </span>
      <Responsive v-if="!pending" class="w-full">
        <template #main="{ width }">
          <Chart :size="{ width, height: 420 }" :data="data">
            <template #layers>
              <Line :dataKeys="['name', 'pl']" />
            </template>
          </Chart>
        </template>
      </Responsive>
    </template>

    <span className="text-center h-[420px] text-2xl" v-if="pending">Loading...</span>

    <ApiError v-if="error" :handleRetry="handleExecute" />
  </section>
</template>

<style>
#app {
  color: #2ecc71;
}
</style>
