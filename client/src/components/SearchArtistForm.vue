<template>
  <form @submit.prevent="">

    <div class="form-search-artist">
      <label for="input-artist">
        <input id="input-artist" type="text" v-model="artist">
      </label>
      <button @click="searchArtist()">Search</button>
    </div>

    <div class="form-download-csv">
      <label for=" input-filename">
        <input id="input-filename" type="text" v-model="filename">
      </label>
      <button @click="downloadCSV()">Download CSV</button>
    </div>

  </form>
</template>

<script setup>
import { ref } from 'vue';

const artist = ref('');
const artists = ref([]);

// query in url should replace " " by "%20"
function formatSearchText(searchText) {
  return searchText.replace(/\s/g, '%20');
}

async function searchArtist() {
  const searchTextFormatted = formatSearchText(artist.value);
  console.log('formatted searchtext', searchTextFormatted);
  const data = await fetch(`/search?artist=${searchTextFormatted}`);
  const json = await data.json();
  artists.value = json;
  console.log(artists);
  console.log(artists.value);
}

const filename = ref('');

async function downloadCSV() {
  alert(`Downloading CSV with name ${filename.value}...`);
}
</script>

<style scoped lang="scss">
label,
button {
  margin: 0.2rem
}
</style>
