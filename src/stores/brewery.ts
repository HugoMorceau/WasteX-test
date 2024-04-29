import type { Brewery } from '@/types/Brewery'
import { defineStore } from 'pinia'
import { fetchBreweries, fetchBreweriesPage } from '../api/openbrewery'

export const useBreweryStore = defineStore('brewery', {
  state: () => ({
    breweries: [] as Brewery[],
    breweriesCache: new Map<string, Brewery[]>(),
    query: '',
    isLoading: false,
    currentPage: 1,
    perPage: 20,
    hasMore: false
  }),
  actions: {
    async searchBreweries(query: string, pagesLimit: number = 0) {
      if (query === undefined) {
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
