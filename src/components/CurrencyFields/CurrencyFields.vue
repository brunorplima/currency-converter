<script setup>
const { amount, setCurrency, currencies } = defineProps({
  amount: {
    type: Number,
    required: true
  },
  setCurrency: Function,
  currencies: Array
})
</script>

<template>
  <div>
    <select @change="setCurrency">
      <option></option>
      <option
        v-for="currency of currencies"
        :value="currency.id"
        :key="currency.id"
      >
        {{ currency.id }} - {{ currency.name }}
      </option>
    </select>
  </div>
</template>
