<script setup lang="ts">
import { coinList } from "../utils/constants";
import { ApiService } from "../services/ApiService";
import { FormatService } from "../services/FormatService";
import type { ConvertedMarketChartData } from "../types";

const toast = useToast();

const apiService = new ApiService();
const formatService = new FormatService();

const inputSelectCurrencyValue = ref("bitcoin");
const outputSelectCurrencyValue = ref("USD");

const inputCurrency = ref(1);
const outputCurrency = ref(0);
const dateInput = ref("");
const data = ref<ConvertedMarketChartData | null>(
  {} as ConvertedMarketChartData,
);

const fetchPrice = async () => {
  const response = await apiService.getCurrentPrice({
    coin_id: inputSelectCurrencyValue.value,
    toast,
  });

  if (!response) return;

  outputCurrency.value = response?.price || 0;
  data.value = response;
};

onMounted(async () => {
  fetchPrice()
    .then()
    .catch(err => console.error(err));
  setInterval(
    () =>
      dateInput.value.length === 0 &&
      fetchPrice()
        .then()
        .catch(err => console.error(err)),
    30000,
  );
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
    inputCurrency.value = +value / data.value.price
  }
};

const handleCurrencyChange = async (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  const name = (event.target as HTMLSelectElement).name;

  if (name === "inputSelectCurrencyValue") {
    inputSelectCurrencyValue.value = value;
    const response = await apiService.getCurrentPrice({
      coin_id: value,
      toast,
    });

    outputCurrency.value = response?.price || 0
    data.value = response;
  }
};

const handleDateChange = async (event: Event) => {
  const value = (event.target as HTMLDataElement).value;

  const date = new Date(value);

  if (date > new Date()) {
    dateInput.value = formatService.getCurrentDate();
    return alert("Please select a date in the past");
  }

  dateInput.value = value;
  const response = await apiService.getCurrentPrice({
    coin_id: inputSelectCurrencyValue.value,
    toast,
    dateStr: value,
  });

  outputCurrency.value = response?.price || 0;
  data.value = response;
};

const handleClear = async () => {
  dateInput.value = "";
  inputCurrency.value = 1;
  await fetchPrice();
};
</script>

<template>
  <section id="converter" class="bg-big-stone-900">
    <div class="window-width mx-auto flex flex-col items-center py-10">
      <h2 class="mb-10 text-center">Currency Converter</h2>

      <span
        class="flex w-full flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10"
      >
        <span class="flex flex-col gap-2 text-center sm:text-start">
          <span class="text-3xl font-bold">
            {{
              coinList?.find(item => inputSelectCurrencyValue === item.value)
                ?.label
            }}/{{ outputSelectCurrencyValue }}
          </span>
          <span class="text-center">
            {{ inputCurrency?.toLocaleString() }}
            {{
              coinList?.find(item => inputSelectCurrencyValue === item.value)
                ?.label
            }}
            is equivalent to
            {{ outputCurrency?.toLocaleString() }}
            {{ outputSelectCurrencyValue }}
          </span>
        </span>

        <span class="flex flex-col">
          <label for="dateInput">Select a date:</label>

          <span class="flex gap-1">
            <input
              class="rounded-md bg-[#ebebeb]"
              name="dateInput"
              id="dateInput"
              type="datetime-local"
              @change="handleDateChange"
              v-model="dateInput"
            />
            <button
              v-if="dateInput.length > 0"
              @click="handleClear"
              class="btn rounded-md px-3 py-2"
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
        {{ formatService?.formatDate(data?.timestamp || Date.now()) }}
      </span>
    </div>
  </section>
</template>
