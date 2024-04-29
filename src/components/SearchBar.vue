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
    class="flex flex-col gap-5 justify-center h-72 bg-primary-200 rounded-2xl p-4 relative sm:justify-start"
    :style="{
      background: 'linear-gradient(109.6deg, rgba(30, 30, 30, 0.93) 11.2%, rgb(40, 40, 41) 78.9%)'
    }"
  >
    <img
      src="@/assets/images/barrels.png"
      alt="brewery"
      class="object-contain h-2/5 absolute right-6 bottom-0"
    />

    <div class="flex justify-center gap-10 items-end sm:gap-1">
      <h1 class="text-5xl font-semibold text-white sm:text-2xl">It's a Brewin' :</h1>
      <div>
        <input
          v-model="store.query"
          @input="debouncedSearch(1)"
          class="border-2 p-2 text-secondary-200 rounded-xl"
          placeholder="Search for a brewery"
        />
      </div>
    </div>

    <button
      @click="getLocation"
      class="flex justify-center text-white font-bold py-2 px-4 items-baseline"
    >
      Or discover nearby breweries
      <img src="@/assets/location.svg" alt="location" class="w-6 ml-2" />
    </button>
  </div>
</template>
