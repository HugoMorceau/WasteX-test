<script setup lang="ts">
import { useBreweryStore } from '@/stores/brewery'
import { RouterLink, RouterView } from 'vue-router'

const store = useBreweryStore()

const handleSubmit = () => {
  console.log('query', store.query)
  store.searchBreweries(store.query)
  console.log('stored breweries', store.breweries)
  console.log('Menu button clicked')
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="flex items-center space-x-4">
        <RouterLink to="/" class="text-blue-500 hover:text-blue-700">Home</RouterLink>
        <RouterLink to="/about" class="text-blue-500 hover:text-blue-700">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
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
  <input
    v-model="store.query"
    @input="handleSubmit"
    class="border border-gray-500 p-2"
    placeholder="Search for a brewery"
  />
  <button
    @click="handleSubmit"
    class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4"
  >
    Search
  </button>
  <ul>
    <li v-for="(brewery, index) in store.breweries" :key="brewery.id" class="text-white mt-1">
      {{ index + 1 }} - {{ brewery.name }}
    </li>
  </ul>
</template>
