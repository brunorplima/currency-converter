
import { ref, onMounted, nextTick, onUpdated } from 'vue'
import { getCurrencies, getLatest } from '../../api/exchangeRatesApi'
import Storage, { FIRST_CURRENCY_KEY, SECOND_CURRENCY_KEY } from '../../services/Storage'
import { useHistoryStore } from '../../stores/history'

export function useMain() {
  const currencies = ref([])
  const firstCurrency = ref(null)
  const secondCurrency = ref(null)
  const searchHistory = useHistoryStore()

  // Lifecycle hooks
  onMounted(async () => {
    const currencyData = await getCurrencies()
    currencies.value = currencyData
    await getLatest()
  })

  onUpdated(() => {
    if (firstCurrency.value && secondCurrency.value) {
      searchHistory.add(firstCurrency.value.id, secondCurrency.value.id)
    }
  })

  // Public functions
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

  // Private functions
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

  return {
    currencies,
    firstCurrency,
    secondCurrency,
    setFirstCurrency,
    setSecondCurrency
  }
}
