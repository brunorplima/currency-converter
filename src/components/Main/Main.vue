<script setup>
import { ref, onMounted, watch } from 'vue'
import { getCurrencies } from '../../api/exchangeRatesApi'
import CurrencyFields from '../CurrencyFields/CurrencyFields.vue'
import RateBox from '../RateBox/RateBox.vue'

const currencies = ref([])
const firstCurrency = ref(null)
const secondCurrency = ref(null)

onMounted(async () => {
  const currencyData = await getCurrencies()
  currencies.value = currencyData
})

const setFirstCurrency = ev => {
  firstCurrency.value = findCurrency(ev)
}
const setSecondCurrency = (ev) => {
  secondCurrency.value = findCurrency(ev)
}

const findCurrency = ev => {
  const currId = ev.target.value
  return currencies.value.find(c => c.id === currId) || null
}
</script>

<template>
  <main id="mainContainer">
    <div>
      <form class="mb-7">
        <legend>Choose Currencies</legend>
        <CurrencyFields :setCurrency="setFirstCurrency" :currencies="currencies" />
        <CurrencyFields :setCurrency="setSecondCurrency" :currencies="currencies" />
      </form>

      <RateBox
        v-show ="firstCurrency && secondCurrency"
        :firstCurrency="firstCurrency"
        :secondCurrency="secondCurrency"
      />
    </div>
  </main>
</template>

<style scoped>
#mainContainer {
  flex: 3;
  display: grid;
  place-items: center;
}
</style>
