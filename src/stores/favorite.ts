import { fetchBreweriesByIDs } from '@/api/openbrewery'
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as string[]
  }),
  actions: {
    addFavorite(breweryId: string) {
      if (!breweryId) return
      if (!this.favorites.includes(breweryId)) {
        this.favorites.push(breweryId)
        this.saveFavorites()
      }
    },
    removeFavorite(breweryId: string) {
      this.favorites = this.favorites.filter((id: string) => id !== breweryId)
      this.saveFavorites()
    },
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    loadFavorites() {
      const storedFavorites = localStorage.getItem('favorites')

      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites)
      }
    },
    async fetchFavorites() {
      if (!this.favorites.length) return []
      const favorites = await fetchBreweriesByIDs(this.favorites)
      return favorites
    }
  }
})
