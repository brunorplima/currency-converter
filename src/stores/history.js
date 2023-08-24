import { defineStore } from "pinia"
import { formatDate } from "../utils/dates"

export const useHistoryStore = defineStore('history', {
  state: () => ({
    /** @type {{ firstCurrency: string, secondCurrency: string, id: number, dateTime: string }[]} */
    history: []
  }),
  actions: {
    /** @type {(firstCurrency: string, secondCurrency: string): void} */
    add(firstCurrency, secondCurrency) {
      const newSearch = {
        firstCurrency,
        secondCurrency,
        id: Date.now(),
        dateTime: formatDate(Date.now())
      }
      this.history.unshift(newSearch)
    }
  }
})
