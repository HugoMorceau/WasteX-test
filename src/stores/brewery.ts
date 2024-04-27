import { defineStore } from 'pinia'
import { fetchBreweries } from '../api/openbrewery'
interface Brewery {
  id: string
  name: string
  brewery_type: string
  address_1: string | null
  address_2: string | null
  address_3: string | null
  city: string | null
  state_province: string | null
  postal_code: string | null
  country: string | null
  longitude: string | null
  latitude: string | null
  phone: string | null
  website_url: string | null
  state: string | null
  street: string | null
}

export const useBreweryStore = defineStore('brewery', {
  state: () => ({
    breweries: [] as Brewery[],
    query: ''
  }),
  actions: {
    async searchBreweries(query: string, pagesLimit: number = 0) {
      this.breweries = await fetchBreweries(query, pagesLimit)
    }
  }
})
