<script>
export default {
  props: ['firstCurrency', 'secondCurrency'],
}
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <input class="w-40" type="number" min="0" step="1" />
    <div>{{ firstCurrency?.id }}</div>
    
    <input class="w-40" type="number" min="0" />
    <div>{{ secondCurrency?.id }}</div>
  </div>
</template>
