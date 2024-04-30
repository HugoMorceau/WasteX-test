import type { Brewery } from '@/types/Brewery'
import { defineStore } from 'pinia'
import { fetchBreweries, fetchBreweriesPage, fetchNearbyBreweries } from '../api/openbrewery'
interface BreweryState {
  breweries: Brewery[]
  breweriesCache: Map<string, Brewery[]>
  query: string
  isLoading: boolean
  currentPage: number
  perPage: number
  hasMore: boolean
}
export const useBreweryStore = defineStore('brewery', {
  state: (): BreweryState => ({
    breweries: [] as Brewery[],
    breweriesCache: new Map<string, Brewery[]>(),
    query: '',
    isLoading: false,
    currentPage: 1,
    perPage: 20,
    hasMore: false
  }),
  actions: {
    async searchNearbyBreweries(lat: number, lng: number) {
      if (lat === undefined || lng === undefined) {
        return
      }
      this.isLoading = true
      this.query = `nearby:${lat},${lng}`
      if (this.breweriesCache.has(this.query)) {
        this.breweries = this.breweriesCache.get(this.query) as Brewery[]
        this.isLoading = false
        this.query = ''
        return
      }
      const fetchedBreweries = await fetchNearbyBreweries(lat, lng)
      this.breweriesCache.set(this.query, fetchedBreweries)
      this.breweries = fetchedBreweries
      this.isLoading = false
      this.query = ''
    },
    async searchBreweries(query: string, pagesLimit: number = 0) {
      if (query === undefined) {
        return
      }
      this.isLoading = true
      this.query = query
      if (this.breweriesCache.has(query)) {
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
