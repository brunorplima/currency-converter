<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { getCurrencies, getLatest } from '../../api/exchangeRatesApi'
import CurrencyFields from '../CurrencyFields/CurrencyFields.vue'
import RateBox from '../RateBox/RateBox.vue'
import Storage, { FIRST_CURRENCY_KEY, SECOND_CURRENCY_KEY } from '../../services/Storage'

const currencies = ref([])
const firstCurrency = ref(null)
const secondCurrency = ref(null)

onMounted(async () => {
  const currencyData = await getCurrencies()
  currencies.value = currencyData
  await getLatest()
})

const setFirstCurrency = async ev => {
  const currency = findCurrency(ev)
  Storage.set(FIRST_CURRENCY_KEY, currency.id)
  await resetCurrencyValue(firstCurrency)
  firstCurrency.value = currency
}
const setSecondCurrency = async ev => {
  const currency = findCurrency(ev)
  Storage.set(SECOND_CURRENCY_KEY, currency.id)
  await resetCurrencyValue(secondCurrency)
  secondCurrency.value = currency
}

const findCurrency = ev => {
  const currId = ev.target.value
  return currencies.value.find(c => c.id === currId) || null
}

const resetCurrencyValue = async currency => {
  if (currency.value) {
    currency.value = null
    await nextTick()
  }
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
        v-if="firstCurrency && secondCurrency"
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
