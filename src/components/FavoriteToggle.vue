<script setup lang="ts">
import fullStar from '@/assets/fullStar.svg'
import star from '@/assets/star.svg'
import { useFavoritesStore } from '@/stores/favorite'

const store = useFavoritesStore()

const props = defineProps({
  breweryId: {
    type: String,
    required: true
  }
})

const toggleFavorite = () => {
  if (isFavorite()) {
    store.removeFavorite(props.breweryId)
  } else {
    store.addFavorite(props.breweryId)
  }
}

const isFavorite = () => {
  return store.favorites.some((brewery) => brewery.id === props.breweryId)
}
</script>

<template>
  <img
    :src="isFavorite() ? fullStar : star"
    @click="toggleFavorite()"
    class="h-6 w-6 cursor-pointer"
  />
</template>
