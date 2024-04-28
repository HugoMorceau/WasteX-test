<script setup lang="ts">
import { useBreweryStore } from '@/stores/brewery'
import SearchBar from './components/SearchBar.vue'
import HomeView from './views/HomeView.vue'

const store = useBreweryStore()
const loadMore = () => {
  console.log(store.currentPage)
  store.loadMore()
}
</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <header>
      <!-- <div class="wrapper">
      <nav class="flex items-center space-x-4">
        <RouterLink to="/" class="text-blue-500 hover:text-blue-700">Home</RouterLink>
        <RouterLink to="/about" class="text-blue-500 hover:text-blue-700">About</RouterLink>
      </nav>
    </div> -->
    </header>
    <!-- <RouterView /> -->

    <SearchBar />
    <HomeView />
    <button @click="loadMore" class="flex justify-center mt-2 text-primary-hover">
      {{ store.hasMore ? 'Load More' : '' }}
    </button>
  </div>
</template>
