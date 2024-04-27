<script setup lang="ts">
import { useBreweryStore } from '@/stores/brewery'
import { RouterLink, RouterView } from 'vue-router'

const store = useBreweryStore()

const handleSubmit = (pagesLimit: number) => {
  store.searchBreweries(store.query, pagesLimit)
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

  <div class="header flex gap-5 justify-center">
    <h1 class="text-3xl text-white">Brewery Search</h1>
    <div>
      <input
        v-model="store.query"
        @input="handleSubmit(1)"
        class="border border-gray-500 p-2"
        placeholder="Search for a brewery"
      />
      <button
        @click="handleSubmit(0)"
        class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4"
      >
        Search
      </button>
    </div>
  </div>
  <ul class="flex flex-col mt-4 ml-80">
    <li v-for="(brewery, index) in store.breweries" :key="brewery.id" class="text-white mt-1">
      {{ index + 1 }} - {{ brewery.name }}
    </li>
  </ul>
</template>
