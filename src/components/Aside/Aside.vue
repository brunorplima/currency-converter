<script setup>
import { useHistoryStore } from '../../stores/history'

const { history } = useHistoryStore()
</script>

<template>
  <div id="asideContainer" class="flex-1 px-4 py-10">
    <h3 class="text-xl mb-4">Search History</h3>
    <div v-if="!history.length">No search history</div>
    <div v-for="search of history" :key="search.id">
      {{ search.firstCurrency }} to {{ search.secondCurrency }} - {{ search.dateTime }}
    </div>
  </div>
</template>

<style scoped>
#asideContainer {
  flex: 1;
  background-color: white;
}
</style>
