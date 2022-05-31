<template>
  <div class="relative  font-baloo-tamma2">
    <div class="flex z-30 absolute text-orange-400">
      <router-link to="/todo" class="mr-3 p-2">Todolist</router-link>
      <router-link to="/tracker" class="mr-3 p-2">Tracker</router-link>
    </div>
  </div>
  <router-view />
</template>

<script setup>
</script>
