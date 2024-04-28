<script setup lang="ts"></script>

<template>
  <div class="max-w-7xl mx-auto text-white min-h-[100vh]">
    <header>
      <div class="wrapper">
        <nav class="flex items-center space-x-4 p-2">
          <img src="/favicon.ico" alt="logo" class="w-10 h-10" />
          <RouterLink to="/" class="text-amber-500 hover:text-blue-700">Home</RouterLink>
          <RouterLink to="/bookmarks" class="text-amber-500 hover:text-blue-700"
            >Bookmarks</RouterLink
          >
          <RouterLink to="/about" class="text-amber-500 hover:text-blue-700">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />

    <footer class="flex sticky top-[100vh] h-10 bg-primary-200 justify-center items-center">
      <p>@2024</p>
    </footer>
  </div>
</template>
