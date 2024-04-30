<script setup lang="ts">
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
import type { Brewery } from '@/types/Brewery'
import { ref, watchEffect } from 'vue'
import FavoriteToggle from './FavoriteToggle.vue'
import useWindowWidth from '@/composables/useWindowWidth'

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

const props = defineProps<{
  breweries: Brewery[]
}>()

const store = useBreweryStore()
let activeBreweryId = ref<string | null>(null)
let sibblingBreweryId = ref<string | null>(null)

watchEffect(() => {
  if (activeBreweryId.value) {
    const index = props.breweries.findIndex((brewery) => brewery.id === activeBreweryId.value)

    // 2 items per row, if left (odd) the sibbling is the next one, if right (even) the sibbling is the previous one
    if (index !== -1) {
      const sibblingIndex = index % 2 === 0 ? index + 1 : index - 1
      if (sibblingIndex < props.breweries.length) {
        sibblingBreweryId.value = props.breweries[sibblingIndex].id
      } else {
        sibblingBreweryId.value = null
      }
    }
  } else {
    sibblingBreweryId.value = null
  }
})
const { isMobile, isMedium } = useWindowWidth()

function toggleDetails(selectedBrewery: string) {
  if (activeBreweryId.value === selectedBrewery) {
    activeBreweryId.value = null
  } else {
    if (!activeBreweryId.value) {
      activeBreweryId.value = selectedBrewery
      return
    }
    activeBreweryId.value = null // First hide the active one
    activeBreweryId.value = selectedBrewery
  }
}
</script>

<template>
  <div>
    <!-- Loading text -->
    <p class="mb-4 text-center text-2xl font-bold text-primary-text">
      {{
        store.isLoading
          ? 'loading. . .'
          : breweries.length === 0 && store.query
            ? `no result for "${store.query}" `
            : ''
      }}
    </p>
    <!-- Brewery list -->
    <ul class="flex flex-row flex-wrap justify-center gap-2">
      <!-- Brewery Element -->
      <!-- prettier-ignore -->
      <li
        v-for="(brewery, index) in breweries"
        :key="brewery.id"
        @click="toggleDetails(brewery.id)"
        class="group relative flex max-h-36 flex-row gap-2 overflow-hidden 
               rounded-lg bg-primary-200 text-primary-text 
               hover:bg-primary-hover hover:text-primary-100 
                sm:max-h-fit  sm:pb-6 pr-6"
        :style="{
          width: isMobile
            ? 'calc(100% - 0.5rem)'
            : sibblingBreweryId === brewery.id
              ? 'calc(20% - 0.5rem)'
              : activeBreweryId === brewery.id
                ? 'calc(80% - 0.5rem)'
                : 'calc(50% - 0.5rem)',
          transition: 'width 0.5s ease'
        }"
      ><!-- prettier-ignore-end -->
        <img
          v-if="sibblingBreweryId !== brewery.id && !isMedium"
          v-bind:src="
            brewery.brewery_type
              ? images[brewery.brewery_type as keyof typeof images]
              : images['closed']
          "
          
          alt="brewery type"
          class="h-36 w-36 rounded-md grayscale transition-all group-hover:grayscale-0 hover:cursor-pointer"
        />
        <!-- Brewery text content container -->
        <div
          class="p-1"
          :class="
            activeBreweryId === brewery.id
              ? 'flex w-full flex-row flex-wrap items-start gap-5'
              : 'flex flex-col'
          "
        >
          <!-- Basic infos  -->
          <div>
            <h2 class="text-xl font-bold text-amber-500 hover:cursor-pointer">
              {{ `${index + 1}. ${brewery.name}` }}
            </h2>
            <p
              class="w-fit rounded-lg bg-primary-text px-1 text-sm text-primary-100 group-hover:bg-stone-300"
            >
              {{ `Type : ${brewery.brewery_type}` }}
            </p>
            <div v-if="sibblingBreweryId !== brewery.id" class="mt-2">
              <p v-if="brewery.city">
                {{ `${brewery.city}, ${brewery.country}` }}
              </p>
              <a
                v-if="brewery.website_url"
                @click.stop
                :href="brewery.website_url"
                target="_blank"
                class="text-primary-300 hover:text-secondary-100 hover:underline"
              >
                {{ brewery.website_url }}
              </a>
            </div>
            <!-- Show Brewery details button -->
            <button
              
              class="bg-primary-300 absolute bottom-1 right-3 rounded text-start text-sm sm:left-3"
            >
              {{ activeBreweryId === brewery.id ? '< Hide Details' : 'Show Details >' }}
            </button>
          </div>

          <!-- Details -->
          <div v-if="activeBreweryId === brewery.id" class="mt-9 flex flex-grow gap-10 sm:mt-0">
            <div>
              <p>
                {{ `Address : ${brewery.address_1}` }}
              </p>
              <p>{{ brewery.address_2 }}</p>
              <p>{{ brewery.state }}</p>
              <p>{{ brewery.postal_code }}</p>
            </div>

            <div v-if="activeBreweryId === brewery.id">
              <a
                v-if="brewery.latitude && brewery.longitude"
                @click.stop
                :href="`https://www.google.com/maps/search/?api=1&query=${brewery.latitude},${brewery.longitude}`"
                target="_blank"
                class="text-primary-300 mb-2 flex text-secondary-100 hover:underline"
              >
                <img src="@/assets/location.svg" alt="location" class="mr-2 w-6" />
                Show on map
              </a>
              <p v-if="brewery.phone">
                {{ `Phone: ${brewery.phone}` }}
              </p>
            </div>
          </div>
        </div>
        <!-- Favorite -->
        <FavoriteToggle
          :breweryId="brewery.id"
          @click.stop
          v-if="sibblingBreweryId !== brewery.id"
          class="absolute right-2 top-2"
        />
      </li>
    </ul>
  </div>
</template>
