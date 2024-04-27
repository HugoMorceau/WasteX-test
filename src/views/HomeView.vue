<script setup>
import { useBreweryStore } from '@/stores/brewery';

const store = useBreweryStore()
console.log(store.isLoading)
</script>

<template>
  <div>
    <p class="text-center text-2xl font-bold mb-4">{{ store.isLoading ? "loading. . ." : "Breweries list" }}</p>
    <ul class="flex flex-wrap gap-2 justify-center">
      <li v-for="brewery in store.breweries" :key="brewery.id" class="bg-primary-200 text-primary-text rounded-lg shadow-md p-4 w-1/5 hover:bg-primary-hover hover:text-primary-100">
        
          <h2 class="text-xl font-bold">{{ brewery.name }}</h2>
          <p class="">{{ brewery.brewery_type }}</p>
          <div class="mt-2">
            <p v-if="brewery.street" class="">{{ brewery.street }}</p>
            <p v-if="brewery.city" class="">{{ brewery.city }}</p>
            <p v-if="brewery.state_province" class="0">{{ brewery.state_province }}</p>
            <!-- <p v-if="brewery.postal_code" class="text-gray-700">{{ brewery.postal_code }}</p> -->
            <p v-if="brewery.country" class="">{{ brewery.country }}</p>
          </div>
          <div class="mt-2">
            <p v-if="brewery.phone" class="">Tel: {{ brewery.phone }}</p>
            <a v-if="brewery.website_url" :href="brewery.website_url" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Visit Website</a>
          </div>
        
      </li>
    </ul>
  </div>
</template>




<style lang="scss" scoped></style>
