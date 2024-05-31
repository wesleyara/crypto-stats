<script setup lang="ts">
import { coinList } from "../utils/constants";
import { formatDate, getTimestampFromDate } from "../utils";
import type { GetCurrentPriceResponse } from "../types";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const toast = useToast();

const inputSelectCurrencyValue = ref("bitcoin");
const outputSelectCurrencyValue = ref("USD");

const inputCurrency = ref(1);
const outputCurrency = ref(0);

const dateInput = ref();
const data = ref<GetCurrentPriceResponse | null>(null);

const coinLabel = computed(() => {
  return coinList.find(item => inputSelectCurrencyValue.value === item.value)
    ?.label;
});

const endpoint = computed(() => {
  const dateString = dateInput.value || new Date();
  const { timestampLessOneDay, timestampMoreOneDay } = getTimestampFromDate(
    dateString as Date,
  );

  return `https://api.coingecko.com/api/v3/coins/${inputSelectCurrencyValue.value}/market_chart/range?vs_currency=usd&from=${timestampLessOneDay}&to=${timestampMoreOneDay}`;
});

const {
  pending,
  error,
  execute,
} = useFetch(endpoint, {
  onRequestError: error => {
    toast.add({
      title: "Error",
      description: `Failed to fetch data. The API received too many requests. Please try again
      later.`,
    });
  },
  onResponse: response => {
    const dateString = dateInput.value || new Date();
    const { timestamp } = getTimestampFromDate(dateString as Date);

    const prices = convertArrayToObjects(response.response._data.prices);
    const closestPrice = findClosestTimestamp(prices, timestamp);

    if (!closestPrice) {
      return (data.value = {
        timestamp: 0,
        price: 0,
        coin_id: inputSelectCurrencyValue.value,
        error: "No data found",
      });
    }

    data.value = {
      ...closestPrice,
      coin_id: inputSelectCurrencyValue.value,
      error: null,
    };
  },
  retry: 0,
});

const lastUpdate = ref(formatDate(data.value?.timestamp || Date.now()));

onMounted(() => {
  setInterval(() => {
    if (!error) {
      execute();
    }
  }, 30000);
});

watchEffect(() => {
  if (data.value) {
    inputCurrency.value = 1;
    outputCurrency.value = data.value.price;
  }
});

const handleValueChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  const name = (event.target as HTMLInputElement).name;

  if (!data.value) return;

  if (name === "inputCurrency") {
    inputCurrency.value = +value;
    outputCurrency.value = +value * data.value.price;
  } else {
    outputCurrency.value = +value;
    inputCurrency.value = +value / data.value.price;
  }
};

const handleCurrencyChange = async (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  const name = (event.target as HTMLSelectElement).name;

  if (name === "inputSelectCurrencyValue") {
    inputSelectCurrencyValue.value = value;
  }
};

const handleClear = async () => {
  dateInput.value = "";
  inputCurrency.value = 1;
};

const handleExecute = async () => {
  await execute();
};
</script>

<template>
  <section id="converter" class="bg-big-stone-900">
    <div class="window-width mx-auto flex flex-col items-center py-10">
      <h2 class="mb-10 text-center">Currency Converter</h2>

      <section v-if="!error">
        <span
          class="flex w-full flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10"
        >
          <span class="flex flex-col gap-2 text-center sm:text-start">
            <span class="text-3xl font-bold">
              {{ coinLabel }}/{{ outputSelectCurrencyValue }}
            </span>
            <span class="text-center">
              {{ inputCurrency?.toLocaleString() }}
              {{ coinLabel }}
              is equivalent to
              {{ outputCurrency?.toLocaleString() }}
              {{ outputSelectCurrencyValue }}
            </span>
          </span>

          <span class="flex flex-col">
            <label for="dateInput">Select a date:</label>

            <span class="flex gap-1">
              <VueDatePicker
                v-model="dateInput"
                :max-date="new Date()"
                placeholder="Select a date"
                text-input
              />
              <button
                v-if="dateInput?.length > 0"
                @click="handleClear"
                class="rounded-md bg-emerald-500 px-3 py-2 text-black hover:bg-emerald-600"
              >
                Clear
              </button>
            </span>
          </span>
        </span>

        <div
          class="width-full mt-10 flex flex-col items-center gap-3 lg:flex-row"
        >
          <span class="flex">
            <select
              class="flex w-[100px] items-center justify-center rounded-l"
              name="inputSelectCurrencyValue"
              aria-label="Select currency"
              @change="handleCurrencyChange"
              :value="inputSelectCurrencyValue"
            >
              <option
                v-for="item of coinList"
                :key="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>

            <input
              class="w-full rounded-r"
              type="number"
              name="inputCurrency"
              aria-label="Input currency"
              v-model="inputCurrency"
              @input="handleValueChange"
            />
          </span>

          <span class="text-3xl font-bold">=</span>

          <span class="flex">
            <input
              class="w-full rounded-l"
              name="outputCurrency"
              type="number"
              aria-label="Output currency"
              v-model="outputCurrency"
              @input="handleValueChange"
            />

            <span
              class="flex w-[100px] items-center justify-center rounded-r bg-[#ebebeb] px-4 py-2 text-black"
            >
              USD
            </span>
          </span>
        </div>

        <span class="my-10">
          Last Update:
          {{ lastUpdate }}
        </span>
      </section>

      <ApiError v-if="error" :handleRetry="handleExecute" />
    </div>
  </section>
</template>
