<template>
  <form @submit.prevent="searchArtist">

    <label for="artist-search">
      <input id="artist-search" type="text" v-model="artist">
    </label>

    <button>Search</button>

    <button>Download CSV</button>

  </form>
</template>

<script setup>
import { ref } from 'vue';

const artist = ref('');
const artists = ref([]);

// const props = defineProps({
//   label: String,
// });

async function searchArtist(searchText) {
  const data = await fetch(`/api/search?artist=${searchText.value}`);
  const json = await data.json();
  console.log(json);
  artists.value = json;
  console.log(artists.value);
}
</script>

<style scoped lang="scss">
label,
button {
  margin: 0.2rem
}
</style>
