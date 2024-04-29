<script setup lang="ts">
import BreweryList from '@/components/BreweryList.vue'
import { useFavoritesStore } from '@/stores/favorite'

const store = useFavoritesStore()
</script>

<template>
  <BreweryList :breweries="store.favorites" />
</template>
