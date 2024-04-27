<script setup lang="ts">

import SearchBar from './components/SearchBar.vue';
import HomeView from './views/HomeView.vue';

</script>

<template>
  <div class="max-w-screen-xl mx-auto">
  <header>
    <!-- <div class="wrapper">
      <nav class="flex items-center space-x-4">
        <RouterLink to="/" class="text-blue-500 hover:text-blue-700">Home</RouterLink>
        <RouterLink to="/about" class="text-blue-500 hover:text-blue-700">About</RouterLink>
      </nav>
    </div> -->
  </header>
  <!-- <RouterView /> -->

  <SearchBar />
  <HomeView />
</div>
</template>