import axios from "axios"

const appId = import.meta.env.VITE_API_KEY
const CURRENCIES = `https://openexchangerates.org/api/currencies.json?app_id=${appId}`

export const getCurrencies = async () => {
  const { data } = await axios.get(CURRENCIES)
  const currencies = []
  for (const currency in data) {
    currencies.push({
      id: currency,
      name: data[currency]
    })
  }
  return currencies
}
