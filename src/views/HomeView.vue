<script setup lang="ts">
import BreweriesList from '@/components/BreweriesList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useBreweryStore } from '@/stores/brewery'
const store = useBreweryStore()
const loadMore = () => {
  store.loadMore()
}
</script>

<template>
  <SearchBar />
  <BreweriesList />
  <button @click="loadMore" class="flex justify-center mt-2 text-primary-hover">
    {{ store.hasMore ? 'Load More' : '' }}
  </button>
</template>
