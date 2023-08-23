import axios from "axios"
import Storage, { CURRENCIES_KEY, LATEST_KEY } from "../services/Storage"

const appId = import.meta.env.VITE_API_KEY
const CURRENCIES = `https://openexchangerates.org/api/currencies.json?app_id=${appId}`
const LATEST = `https://openexchangerates.org/api/latest.json?app_id=${appId}`

export const getCurrencies = async () => {
  if (isStoredDataValid(CURRENCIES_KEY)) {
    const { value } = Storage.get(CURRENCIES_KEY)
    console.log('returning "currencies" stored value')
    return value
  }
  const { data } = await axios.get(CURRENCIES)
  const currencies = []
  for (const currency in data) {
    currencies.push({
      id: currency,
      name: data[currency]
    })
  }
  Storage.set(CURRENCIES_KEY, currencies)
  return currencies
}

export const getLatest = async () => {
  if (isStoredDataValid(LATEST_KEY)) {
    const { value } = Storage.get(LATEST_KEY)
    console.log('returning "latest" stored value')
    return value
  }
  const { data: { rates } } = await axios.get(LATEST)
  Storage.set(LATEST_KEY, rates)
  return rates
}

const isStoredDataValid = key => {
  const { timestamp } = Storage.get(key)
  return Storage.isValid(timestamp, key)
}
