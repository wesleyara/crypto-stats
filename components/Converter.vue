<script setup lang="ts">
import { coinList } from "~/utils/constants";
import { ApiService } from "~/services/ApiService";
import { FormatService } from "~/services/FormatService";
import type { ConvertedMarketChartData } from "~/types";
// import { type CryptoData } from "~/types";
// const runtimeConfig = useRuntimeConfig();

// const { data, pending, error } = await useFetch<CryptoData>(
//   runtimeConfig.public.API_ENDPOINT + "/coins/bitcoin/history?date=13-04-2024"
// );

const apiService = new ApiService();
const formatService = new FormatService();

const inputSelectCurrencyValue = ref("bitcoin");
const outputSelectCurrencyValue = ref("USD");

const inputCurrency = ref("1");
const outputCurrency = ref("0");
const data = ref<ConvertedMarketChartData | null>(
  {} as ConvertedMarketChartData,
);

onMounted(async () => {
  const response = await apiService.getCurrentPrice({ coin_id: "bitcoin" });
  if (!response) return;
  outputCurrency.value = (response?.price).toLocaleString() || "1";
  data.value = response;
});

const handleValueChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value.replace(/\D/g, "");
  const name = (event.target as HTMLInputElement).name;

  if (!data.value) return;

  if (name === "inputCurrency") {
    inputCurrency.value = value.toLocaleString() || "1";
    outputCurrency.value = (
      +inputCurrency.value * data.value.price
    ).toLocaleString();
  } else {
    outputCurrency.value = value.toLocaleString();
    inputCurrency.value = (
      +outputCurrency.value / data.value.price
    ).toLocaleString();
  }
};

const handleCurrencyChange = async (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  const name = (event.target as HTMLSelectElement).name;

  if (name === "inputSelectCurrencyValue") {
    inputSelectCurrencyValue.value = value;
    const response = await apiService.getCurrentPrice({ coin_id: value });

    outputCurrency.value = (response?.price).toLocaleString() || "1";
    data.value = response;
  }
};
</script>

<template>
  <section id="converter" class="bg-big-stone-900">
    <div class="window-width mx-auto flex flex-col items-center py-10">
      <h2 class="mb-10">Currency Converter</h2>
      <h4>
        {{
          coinList.find(item => inputSelectCurrencyValue === item.value)?.label
        }}/{{ outputSelectCurrencyValue }}
      </h4>
      <span class="text-center">
        {{ inputCurrency.toLocaleString() }}
        {{
          coinList.find(item => inputSelectCurrencyValue === item.value)?.label
        }}
        is equivalent to
        {{ outputCurrency.toLocaleString() }}
        {{ outputSelectCurrencyValue }}
      </span>

      <div
        class="width-full mt-10 flex flex-col items-center gap-3 lg:flex-row"
      >
        <span class="flex">
          <select
            class="flex w-[100px] items-center justify-center rounded-l"
            name="inputSelectCurrencyValue"
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
            type="text"
            name="inputCurrency"
            v-model="inputCurrency"
            @input="handleValueChange"
          />
        </span>

        <h4>=</h4>

        <span class="flex">
          <input
            class="w-full rounded-l"
            name="outputCurrency"
            type="text"
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
        {{ formatService.formatDate(data?.timestamp || Date.now()) }}
      </span>
    </div>
  </section>
</template>
