<template>
  <form @submit.prevent>

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
      <button @click="saveCSV()">Download CSV</button>
    </div>

  </form>
</template>

<script setup>
import { ref } from 'vue';

const artist = ref('');
const artists = ref([]);

// TODO put this in an utils module
// query in url should replace " " by "%20"
function formatSearchText(searchText) {
  return searchText.replace(/\s/g, '%20');
}

async function searchArtist() {
  const searchTextFormatted = formatSearchText(artist.value);
  const data = await fetch(`/search?artist=${searchTextFormatted}`);
  // FIXME error handle failed fetch
  alert(data.statusText);
  const json = await data.json();
  artists.value = json;
}

const filename = ref('');

// FIXME try axios
async function saveCSV() {
  alert(`Downloading CSV with name ${filename.value}...`);
  await fetch(`/save?filename=${filename.value}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filename: filename.value }),
  });
  // .then((response) => response.json())
  // .then((response) => console.log(JSON.stringify(response)));
}
</script>

<style scoped lang="scss">
label,
button {
  margin: 0.2rem
}
</style>
