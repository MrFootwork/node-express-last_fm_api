<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <LayoutContainer>
    <SearchInput label="Search for Artist" />
    <SearchButton />
    <DownloadButton />
  </LayoutContainer>

  <LayoutContainer>
    <SearchResult />
  </LayoutContainer>

</template>

<script setup>
import LayoutContainer from './components/LayoutContainer.vue';
import SearchInput from './components/SearchInput.vue';
import SearchButton from './components/SearchButton.vue';
import DownloadButton from './components/DownloadButton.vue';
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
