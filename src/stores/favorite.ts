import { fetchBreweriesByIDs } from '@/api/openbrewery'
import type { Brewery } from '@/types/Brewery'
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as Brewery[]
  }),
  actions: {
    async addFavorite(breweryId: string) {
      if (!breweryId) return
      const existingBrewery = this.favorites.find((brewery) => brewery.id === breweryId)
      if (!existingBrewery) {
        const newBrewery = await fetchBreweriesByIDs([breweryId])
        if (newBrewery[0]) {
          this.favorites.push(newBrewery[0])
          this.saveFavorites()
        }
      }
    },
    removeFavorite(breweryId: string) {
      this.favorites = this.favorites.filter((brewery: Brewery) => brewery.id !== breweryId)
      this.saveFavorites()
    },
    saveFavorites() {
      const ids = this.favorites.map((brewery) => brewery.id)
      if (ids.length === 0) {
        localStorage.removeItem('favorites')
        return
      }
      localStorage.setItem('favorites', JSON.stringify(ids))
    },
    async loadFavorites() {
      const storedFavorites = localStorage.getItem('favorites')
      if (storedFavorites) {
        const ids = JSON.parse(storedFavorites)
        this.favorites = await fetchBreweriesByIDs(ids)
      }
    }
  }
})
