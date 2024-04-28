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
import { onMounted, onUnmounted, ref } from 'vue'

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
  closed: closedImg,
  taproom: closedImg
}
let activeBreweryId = ref(null)
const isMobile = ref(window.innerWidth <= 640)

function updateWindowWidth() {
  isMobile.value = window.innerWidth <= 640
}
onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const store = useBreweryStore()

function toggleDetails(selectedBrewery) {
  if (activeBreweryId.value === selectedBrewery) {
    activeBreweryId.value = null
  } else {
    if (!activeBreweryId.value) {
      activeBreweryId.value = selectedBrewery
      return
    }
    activeBreweryId.value = null // first hide the active one
    setTimeout(() => {
      // then show the selected one
      activeBreweryId.value = selectedBrewery
    }, 250)
  }
}
</script>

<template>
  <div>
    <p class="text-primary-text text-center text-2xl font-bold mb-4">
      {{ store.isLoading ? 'loading. . .' : store.breweries.length === 0 ? 'no result' : '' }}
    </p>

    <ul class="flex flex-row flex-wrap gap-2 justify-start">
      <li
        v-for="(brewery, index) in store.breweries"
        :key="brewery.id"
        class="group flex flex-row gap-2 max-h-36 bg-primary-200 text-primary-text rounded-lg shadow-md hover:bg-primary-hover hover:text-primary-100 sm:max-h-fit"
        :style="{
          width:
            activeBreweryId === brewery.id || isMobile
              ? 'calc(100% - 0.5rem)'
              : 'calc(50% - 0.5rem)',
          transition: 'width 0.5s ease'
        }"
      >
        <img
          v-bind:src="brewery.brewery_type ? images[brewery.brewery_type] : images['closed']"
          alt="brewery type"
          class="w-36 h-36 rounded-md grayscale group-hover:grayscale-0 transition-all"
        />

        <div
          :class="
            activeBreweryId === brewery.id
              ? 'flex flex-row flex-wrap items-start gap-5 w-full'
              : 'flex flex-col'
          "
        >
          <div>
            <h2 class="text-xl text-amber-500 font-bold">
              {{ `${index + 1}. ${brewery.name}` }}
            </h2>
            <div class="mt-2">
              <p v-if="brewery.city">{{ `${brewery.city}, ${brewery.country}` }}</p>
              <a
                v-if="brewery.website_url"
                :href="brewery.website_url"
                target="_blank"
                class="text-primary-300 hover:underline hover:text-secondary-100"
              >
                {{ brewery.website_url }}
              </a>
              <p v-if="activeBreweryId === brewery.id" class="mt-1">
                {{ `Type : ${brewery.brewery_type}` }}
              </p>
            </div>
          </div>
          <div v-if="activeBreweryId === brewery.id" class="mt-8 flex-grow flex gap-10">
            <div>
              <p>{{ `Address : ${brewery.address_1}` }}</p>
              <p>{{ brewery.address_2 }}</p>
              <p>{{ brewery.address_3 }}</p>
              <p>{{ brewery.state }}</p>
              <p>{{ brewery.postal_code }}</p>
            </div>
            <p>{{ `Phone: ${brewery.phone}` }}</p>
          </div>

          <button
            @click="toggleDetails(brewery.id)"
            class="mt-2 text-sm bg-primary-300 p-2 rounded text-start"
          >
            {{ activeBreweryId === brewery.id ? 'Hide Details' : 'Show Details' }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
