<template>
  <form @submit.prevent>

    <div class="form-search-artist">
      <label for="input-artist">
        <input id="input-artist" type="text" v-model="artist">
      </label>
      <button @click="searchArtist">Search</button>
    </div>

    <div class="form-download-csv">
      <label for="input-filename">
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
  if (searchTextFormatted === '') {
    console.warn('No artist name was entered. The serve will search for a random artist.');
  }

  let response = {};
  try {
    response = await fetch(`/search?artist=${searchTextFormatted}`) || {};
    const json = await response.json();
    artists.value = json;
    fields.value = Object.keys(artists.value[0]);
  } catch (e) {
    console.warn('Unexpected response: ', e);
    console.warn(response);
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

  const csvText = await response.text();

  if (response.status === 404) {
    console.warn(csvText);
  } else if (response.status >= 200 && response.status < 300) {
    csv.value = csvText;
    console.table(artists.value);
  } else {
    console.error(`A unhandled status code occurred: ${response.status}`);
  }
}
</script>

<style scoped lang="scss">
// FIXME make UI beautiful
label,
button {
  margin: 0.2rem
}
</style>
