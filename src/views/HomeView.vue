<script setup lang="ts">
import BreweryList from '@/components/BreweryList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useBreweryStore } from '@/stores/brewery'
const store = useBreweryStore()
const loadMore = () => {
  store.loadMore()
}
</script>

<template>
  <SearchBar />
  <BreweryList :breweries="store.breweries" />
  <button @click="loadMore" class="flex w-full justify-center mt-4 mb-10 text-primary-hover">
    {{ store.hasMore ? 'Load More . . .' : '' }}
  </button>
</template>
