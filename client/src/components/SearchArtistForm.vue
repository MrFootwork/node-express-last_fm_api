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
      <button @click="saveCSV">Save CSV</button>
    </div>

    <p>{{ csv }}</p>
    <p>{{ artists }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import Utils from '../assets/js/utils';

const artist = ref('');
const artists = ref([]);

async function searchArtist() {
  const searchTextFormatted = await Utils.formatSearchText(artist.value);
  const data = await fetch(`/search?artist=${searchTextFormatted}`);
  // FIXME error handle failed fetch
  alert(data.statusText);
  const json = await data.json();
  artists.value = json;
}

const filename = ref('');
let csv = ref('');

async function saveCSV() {
  // FIXME remove all alerts
  alert(`Downloading CSV with name ${filename.value}...`);
  const headersList = {
    Accept: 'application/json',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  };
  // TODO find programmatic way to point to localhost:4000
  const response = await fetch(`http://localhost:4000/save?filename=${filename.value}`, {
    method: 'POST',
    headers: headersList,
  });

  csv = await response.text();
}
</script>

<style scoped lang="scss">
label,
button {
  margin: 0.2rem
}
</style>
