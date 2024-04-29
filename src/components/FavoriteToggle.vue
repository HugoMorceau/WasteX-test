<script setup lang="ts">
import fullStar from '@/assets/fullStar.svg'
import star from '@/assets/star.svg'
import { useFavoritesStore } from '@/stores/favorite'

const { breweryId } = defineProps(['breweryId'])
const store = useFavoritesStore()

const toggleFavorite = (breweryId: string) => {
  if (store.favorites.includes(breweryId)) {
    store.removeFavorite(breweryId)
  } else {
    store.addFavorite(breweryId)
  }
}

const isFavorite = (breweryId: string) => {
  return store.favorites.includes(breweryId)
}
</script>

<template>
  <img
    :src="isFavorite(breweryId) ? fullStar : star"
    @click="toggleFavorite(breweryId)"
    class="w-6 h-6 cursor-pointer"
  />
</template>
