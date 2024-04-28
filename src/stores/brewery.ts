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
    breweriesCache: new Map(),
    query: '',
    isLoading: false,
    currentPage: 1,
    perPage: 20,
    hasMore: false
  }),
  actions: {
    async searchBreweries(query: string, pagesLimit: number = 0) {
      if (query === undefined || null) {
        console.log('No query')
        return
      }
      this.isLoading = true
      this.query = query
      if (this.breweriesCache.has(query)) {
        console.log('Using cached breweries')
        this.breweries = this.breweriesCache.get(query) as Brewery[]
        this.isLoading = false
        return
      }
      this.hasMore = true
      const fetchedBreweries = await fetchBreweries(query, pagesLimit)
      this.breweriesCache.set(query, fetchedBreweries)
      this.breweries = fetchedBreweries
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

      const cachedBreweries = this.breweriesCache.get(this.query) as Brewery[]
      cachedBreweries.push(...newBreweries)
      this.breweriesCache.set(this.query, cachedBreweries)

      newBreweries.length < this.perPage && (this.hasMore = false)
      this.breweries.push(...newBreweries)
      this.isLoading = false
    }
  }
})
