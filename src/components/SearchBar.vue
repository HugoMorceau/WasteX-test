<script setup lang="ts">
import { useBreweryStore } from '@/stores/brewery'
import debounce from 'lodash/debounce'

const store = useBreweryStore()

const handleSubmit = (pagesLimit: number) => {
  store.searchBreweries(store.query, pagesLimit)
}
function getNearbyBreweries(position: GeolocationPosition) {
  store.searchNearbyBreweries(position.coords.latitude, position.coords.longitude)
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getNearbyBreweries, handleError, options)
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}
function handleError(error: GeolocationPositionError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log('user denied the request for Geolocation.')
      break
    default:
      console.error(`An error occurred: ${error.message}`)
      break
  }
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}
const debouncedSearch = debounce((pagesLimit: number) => {
  handleSubmit(pagesLimit)
}, 500)
</script>

<template>
  <div
    class="relative flex h-72 flex-col justify-center gap-5 rounded-2xl bg-primary-200 p-4 sm:justify-start"
    :style="{
      background: 'linear-gradient(109.6deg, rgba(30, 30, 30, 0.93) 11.2%, rgb(40, 40, 41) 78.9%)'
    }"
  >
    <img
      src="@/assets/images/barrels.png"
      alt="brewery"
      class="absolute bottom-0 right-6 h-2/5 object-contain"
    />

    <div class="flex items-end justify-center gap-10 sm:gap-1">
      <h1 class="text-5xl font-semibold text-white sm:text-2xl">It's a Brewin' :</h1>
      <div>
        <input
          v-model="store.query"
          @input="debouncedSearch(1)"
          class="rounded-xl border-2 p-2 text-secondary-200"
          placeholder="Search for a brewery"
        />
      </div>
    </div>

    <button
      @click="getLocation"
      class="flex items-baseline justify-center px-4 py-2 font-bold text-white"
    >
      Or discover nearby breweries
      <img src="@/assets/location.svg" alt="location" class="ml-2 w-6" />
    </button>
  </div>
</template>
