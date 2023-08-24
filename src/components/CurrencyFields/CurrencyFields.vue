<script setup>
const { setCurrency, currencies } = defineProps({
  setCurrency: Function,
  currencies: Array
})
</script>

<template>
  <div>
    <select class="w-60" @change="setCurrency">
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
