<script setup>
import barImg from '@/assets/images/brewery-type/bar.webp'
import brewpubImg from '@/assets/images/brewery-type/brewpub.webp'
import closedImg from '@/assets/images/brewery-type/closed.webp'
import contractImg from '@/assets/images/brewery-type/contract.webp'
import largeImg from '@/assets/images/brewery-type/large.webp'
import microImg from '@/assets/images/brewery-type/micro.webp'
import nanoImg from '@/assets/images/brewery-type/nano.webp'
import planningImg from '@/assets/images/brewery-type/planning.webp'
import proprietorImg from '@/assets/images/brewery-type/proprietor.webp'
import regionalImg from '@/assets/images/brewery-type/regional.webp'

import { useBreweryStore } from '@/stores/brewery'
import { reactive } from 'vue'

const images = {
  regional: regionalImg,
  nano: nanoImg,
  micro: microImg,
  brewpub: brewpubImg,
  large: largeImg,
  planning: planningImg,
  bar: barImg,
  contract: contractImg,
  proprietor: proprietorImg,
  closed: closedImg
}

const store = useBreweryStore()

const showDetails = reactive({})

function toggleDetails(brewery) {
  if (showDetails[brewery.id] === undefined) {
    showDetails[brewery.id] = true
  } else {
    showDetails[brewery.id] = !showDetails[brewery.id]
  }
}
</script>

<template>
  <div>
    <p class="text-primary-text text-center text-2xl font-bold mb-4">
      {{ store.isLoading ? 'loading. . .' : store.breweries.length === 0 ? 'no result' : '' }}
    </p>

    <ul class="flex flex-row flex-wrap gap-2 justify-center">
      <li
        v-for="(brewery, index) in store.breweries"
        :key="brewery.id"
        class="flex h-36 bg-primary-200 text-primary-text rounded-lg shadow-md p-4 hover:bg-primary-hover hover:text-primary-100"
        style="width: calc(50% - 0.5rem)"
      >
        <img
          v-bind:src="images[brewery.brewery_type]"
          alt="brewery type"
          class="w-32 h-32 rounded-md"
        />
        <h2 class="text-xl font-bold">{{ `${index + 1}.  ${brewery.name} ` }}</h2>

        <p class="">{{ brewery.brewery_type }}</p>
        <div class="mt-2">
          <p v-if="brewery.city" class="">{{ `${brewery.city}, ${brewery.country}` }}</p>
        </div>
        <button @click="toggleDetails(brewery)" class="mt-2 text-sm bg-primary-300 p-2 rounded">
          {{ showDetails[brewery.id] ? 'Hide Details' : 'Show Details' }}
        </button>
        <div v-if="showDetails[brewery.id]" class="mt-2">
          <p>{{ `phone: ${brewery.phone}` }}</p>
          <p>{{ brewery.address_1 }}</p>
          <p>{{ brewery.address_2 }}</p>
          <p>{{ brewery.address_3 }}</p>
          <p>{{ brewery.state }}</p>
          <p>{{ brewery.postal_code }}</p>
          <p>{{ brewery.website_url }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
