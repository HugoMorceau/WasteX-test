<script setup lang="ts">
import { useBreweryStore } from '@/stores/brewery'
import debounce from 'lodash/debounce'

const store = useBreweryStore()

const debouncedSearch = debounce((pagesLimit: number) => {
  handleSubmit(pagesLimit)
}, 500)

const handleSubmit = (pagesLimit: number) => {
  store.searchBreweries(store.query, pagesLimit)
}
</script>

<template>
  <!-- <a
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
  > -->
  <br />

  <div class="header flex gap-5 justify-center h-72 bg-primary-200 rounded-2xl p-4 relative">
    <!-- <div class="object-cover w-1/4 h-full absolute right-0 top-1/2"> -->

    <img
      src="@/assets/images/barrels.png"
      alt="brewery"
      class="object-contain h-2/5 absolute right-6 bottom-0"
    />
    <!-- </div> -->

    <div class="flex justify-center items-center gap-10">
      <h1 class="text-3xl text-white">Find breweries :</h1>
      <div>
        <input
          v-model="store.query"
          @input="debouncedSearch(1)"
          class="border border-gray-500 p-2 hover:text-secondary-100"
          placeholder="Search for a brewery"
        />
        <button
          @click="handleSubmit(2)"
          class="bg-secondary-100 hover:bg-amber-800 text-white font-bold py-2 px-4"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>
