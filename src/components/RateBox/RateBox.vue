<script>
import Storage, { LATEST_KEY } from '../../services/Storage'

function getRateAndIds(firstCurrency, secondCurrency) {
  const fcId = firstCurrency.id
  const scId = secondCurrency.id
  const { value: rates } = Storage.get(LATEST_KEY)
  const fcUsdRate = rates[fcId]
  const scUsdRate = rates[scId]
  return { fcUsdRate, scUsdRate }
}

export default {
  props: ['firstCurrency', 'secondCurrency'],
  data() {
    return {
      firstValue: '1',
      secondValue: '1'
    }
  },
  mounted() {
    this.calcSecondValue()
  },
  methods: {
    calcFirstValue() {
      const { fcUsdRate, scUsdRate } = getRateAndIds(this.firstCurrency, this.secondCurrency)
      const rate = fcUsdRate / scUsdRate
      const currentValue = Number(this.secondValue)
      this.firstValue = (rate * currentValue).toFixed(2)
    },
    calcSecondValue() {
      const { fcUsdRate, scUsdRate } = getRateAndIds(this.firstCurrency, this.secondCurrency)
      const rate = scUsdRate / fcUsdRate
      const currentValue = Number(this.firstValue)
      this.secondValue = (rate * currentValue).toFixed(2)
    },
  },
}
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <input class="w-40" type="number" min="0" step="1" v-model="firstValue" @input="calcSecondValue" />
    <div>{{ firstCurrency.id }}</div>
    
    <input class="w-40" type="number" min="0" v-model="secondValue" @input="calcFirstValue" />
    <div>{{ secondCurrency.id }}</div>
  </div>
</template>
