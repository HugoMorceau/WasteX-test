import { defineStore } from 'pinia'
import { fetchBreweries } from '../api/openbrewery'

export const useBreweryStore = defineStore('brewery', {
  state: () => ({
    breweries: [],
    query: ''
  }),
  actions: {
    async searchBreweries(query: string) {
      this.breweries = await fetchBreweries(query)
    }
  }
})
