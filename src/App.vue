<script setup lang="ts"></script>

<template>
  <!-- <div class="max-w-screen-xl-max mx-auto"> -->
  <div class="max-w-7xl mx-auto">
    <header>
      <div class="wrapper">
        <nav class="flex items-center space-x-4 p-2">
          <RouterLink to="/" class="text-amber-500 hover:text-blue-700">Home</RouterLink>
          <RouterLink to="/bookmarks" class="text-amber-500 hover:text-blue-700"
            >Bookmarks</RouterLink
          >
          <RouterLink to="/about" class="text-amber-500 hover:text-blue-700">About</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>
