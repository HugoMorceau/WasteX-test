<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'
import { useBreweryStore } from '@/stores/brewery'
import { fetchBreweries } from '@/api/openbrewery'

const store = useBreweryStore()

const handleSubmit = () => {
  // fetchBreweries()
  store.searchBreweries()
  console.log('stored breweries', store.breweries)
  console.log('Menu button clicked')
}
</script>

<template>
  <header>
    

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      
    </div>
  </header>

  <RouterView />
  <button @click="handleSubmit">Menu</button>
  <ul>
    <li v-for="(brewery, index) in store.breweries" :key="brewery.id">
      {{ index +1  }} -  {{brewery.name }}
    </li>
  </ul>
</template>



