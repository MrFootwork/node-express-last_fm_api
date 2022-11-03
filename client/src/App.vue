<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <LayoutContainer>
    <SearchArtistForm />
  </LayoutContainer>

  <LayoutContainer>
    <SearchResult />
  </LayoutContainer>

</template>

<script setup>
import LayoutContainer from './components/LayoutContainer.vue';
import SearchArtistForm from './components/SearchArtistForm.vue';
import SearchResult from './components/SearchResult.vue';

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
