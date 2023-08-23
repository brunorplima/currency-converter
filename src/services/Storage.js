
const SHORT_VALID_TIME = 1800000 // half hour
const LONG_VALID_TIME = 604800000 // 7 days

export const CURRENCIES_KEY = 'currencies'
export const LATEST_KEY = 'latest'
export const FIRST_CURRENCY_KEY = 'firstCurrency'
export const SECOND_CURRENCY_KEY = 'secondCurrency'

const timesForKeys = {
  [CURRENCIES_KEY]: LONG_VALID_TIME,
  [LATEST_KEY]: SHORT_VALID_TIME,
}

class Storage {
  static set(key, value) {
    const record = { value, timestamp: Date.now() }
    localStorage.setItem(key, JSON.stringify(record))
  }

  static get(key) {
    const stringValue = localStorage.getItem(key)
    if (!stringValue) return { timestamp: 0, value: null }
    return JSON.parse(stringValue)
  }

  static isValid(timestamp, key) {
    const validTime = timesForKeys[key] || SHORT_VALID_TIME
    const expiresAt = timestamp + validTime
    return expiresAt >= Date.now()
  }
}

export default Storage
