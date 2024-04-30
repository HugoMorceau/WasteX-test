<script setup lang="ts">
import BreweryList from '@/components/BreweryList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useBreweryStore } from '@/stores/brewery'
import { onMounted, onUnmounted, ref } from 'vue'

const store = useBreweryStore()
const loadMoreButton = ref(null)
const loadMore = () => {
  store.loadMore()
}
let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  })

  if (loadMoreButton.value) {
    observer.observe(loadMoreButton.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <SearchBar />
  <BreweryList :breweries="store.breweries" />
  <button
    ref="loadMoreButton"
    @click="loadMore"
    class="mb-10 mt-4 flex w-full justify-center text-primary-hover"
  >
    {{ store.hasMore ? 'Load More . . .' : '' }}
  </button>
</template>
