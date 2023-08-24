<script setup>
import CurrencyFields from '../CurrencyFields/CurrencyFields.vue'
import RateBox from '../RateBox/RateBox.vue'
import { useMain } from './useMain'

const {
    currencies,
    firstCurrency,
    secondCurrency,
    setFirstCurrency,
    setSecondCurrency
  } = useMain()
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
