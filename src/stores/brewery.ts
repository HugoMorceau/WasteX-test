import { defineStore } from 'pinia'
import { fetchBreweries } from '../api/openbrewery'

export const useBreweryStore = defineStore('brewery', {
  state: () => ({
    breweries: []
  }),
  actions: {
    async searchBreweries() {
      this.breweries = await fetchBreweries()
    }
  }
})
