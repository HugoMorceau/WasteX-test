import { fetchBreweriesByIDs } from '@/api/openbrewery'
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: []
  }),
  actions: {
    addFavorite(breweryId) {
      if (!breweryId) return
      if (!this.favorites.includes(breweryId)) {
        this.favorites.push(breweryId)
        this.saveFavorites()
      }
    },
    removeFavorite(breweryId) {
      this.favorites = this.favorites.filter((id) => id !== breweryId)
      this.saveFavorites()
    },
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    loadFavorites() {
      const storedFavorites = localStorage.getItem('favorites')
      console.log('loading favorites')
      if (storedFavorites) {
        console.log('favorites loaded')
        this.favorites = JSON.parse(storedFavorites)
      }
    },
    async fetchFavorites() {
      if (!this.favorites.length) return []
      console.log('fav ids', this.favorites)
      const favorites = await fetchBreweriesByIDs(this.favorites)
      console.log('fetched favorites', favorites)
      return favorites
    }
  }
})
