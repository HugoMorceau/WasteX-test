<script setup lang="ts">
import BreweryList from '@/components/BreweryList.vue'
import { useFavoritesStore } from '@/stores/favorite'
import type { Brewery } from '@/types/Brewery'
import { onMounted, ref } from 'vue'

const favorites = ref<Brewery[]>([])

const store = useFavoritesStore()

async function loadFavorites() {
  favorites.value = await store.fetchFavorites()
}

onMounted(loadFavorites)
</script>

<template>
  <BreweryList :breweries="favorites" />
</template>
