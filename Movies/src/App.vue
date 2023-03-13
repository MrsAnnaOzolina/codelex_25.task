<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header class="header">
    <img class="header__logo" src="../public/Movie_logo.jpg"/>
    <div class="header__links">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>

</style>
