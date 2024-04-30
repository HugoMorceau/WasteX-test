<script setup lang="ts">
import BreweryList from '@/components/BreweryList.vue'
import { useFavoritesStore } from '@/stores/favorite'

const store = useFavoritesStore()
</script>

<template>
  <div>
    <BreweryList v-if="store.favorites.length > 0" :breweries="store.favorites" />
    <p v-else class="mt-4 flex justify-center">No favorites yet.</p>
  </div>
</template>
