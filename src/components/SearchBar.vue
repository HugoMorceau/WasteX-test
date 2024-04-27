<script setup lang="ts">
import { useBreweryStore } from '@/stores/brewery';
import debounce from 'lodash/debounce';

const store = useBreweryStore()

const debouncedSearch = debounce((pagesLimit: number) => {
  handleSubmit(pagesLimit)
}, 500)

const handleSubmit = (pagesLimit: number) => {
  store.searchBreweries(store.query, pagesLimit)
}
</script>

<template>
  <a
    href="https://api.openbrewerydb.org/breweries"
    target="_blank"
    rel="noopener noreferrer"
    class="mb-4 text-white"
    >API</a
  >
  <br />
  <a
    href="https://www.openbrewerydb.org/documentation"
    target="_blank"
    rel="noopener noreferrer"
    class="mb-4 text-white"
    >Documentation</a
  >
  <br />

  <div class="header flex gap-5 justify-center">
    <h1 class="text-3xl text-white">Brewery Search</h1>
    <div>
      <input
        v-model="store.query"
        @input="debouncedSearch(1)"
        class="border border-gray-500 p-2"
        placeholder="Search for a brewery"
      />
      <button
        @click="handleSubmit(2)"
        class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4"
      >
        Search
      </button>
    </div>
  </div>  
</template>