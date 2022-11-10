<template>
  <form @submit.prevent>

    <div class="form-search-artist">
      <label for="input-artist">
        <input id="input-artist" type="text" v-model="artist">
      </label>
      <button @click="searchArtist">Search</button>
    </div>

    <div class="form-download-csv">
      <label for=" input-filename">
        <input id="input-filename" type="text" v-model="filename">
      </label>
      <button @click="saveCSV">Create CSV File</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import useResult from '../composables/result';

const artist = ref('');
const {
  artists, fields, csv, filename,
} = useResult();

async function searchArtist() {
  const searchTextFormatted = artist.value.replace(/\s/g, '%20');
  // TODO error handle failed fetch
  try {
    const data = await fetch(`/search?artist=${searchTextFormatted}`);
    const json = await data.json();
    artists.value = json;
    fields.value = Object.keys(artists.value[0]);
  } catch (error) {
    console.error(error);
  }
}

async function saveCSV() {
  const headersList = {
    Accept: 'application/json',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  };
  // TODO find programmatic way to point to localhost:4000
  const response = await fetch(`http://localhost:4000/save?filename=${filename.value}`, {
    method: 'POST',
    headers: headersList,
  });
  csv.value = await response.text();
}
</script>

<style scoped lang="scss">
// FIXME make UI beautiful
label,
button {
  margin: 0.2rem
}
</style>
