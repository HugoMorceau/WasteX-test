import { defineStore } from 'pinia'
import { fetchBreweries, fetchBreweriesPage } from '../api/openbrewery'
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
    query: '',
    previousQuery: 'init',
    isLoading: false,
    currentPage: 1,
    perPage: 20,
    hasMore: false
  }),
  actions: {
    async searchBreweries(query: string, pagesLimit: number = 0) {
      if (query === this.previousQuery) {
        return
      }
      this.isLoading = true
      this.hasMore = true
      this.breweries = await fetchBreweries(query, pagesLimit)
      this.previousQuery = query
      this.breweries.length < this.perPage && (this.hasMore = false)
      this.isLoading = false
    },
    async loadMore() {
      if (!this.hasMore) {
        console.log('no more breweries to load')
        return
      }
      this.currentPage++
      this.isLoading = true
      const newBreweries = await fetchBreweriesPage(this.query, this.currentPage)
      console.log('new breweries', newBreweries)
      newBreweries.length < this.perPage && (this.hasMore = false)
      this.breweries.push(...newBreweries)
      this.isLoading = false
    }
  }
})
