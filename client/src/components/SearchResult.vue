<template>
  <div>
    <button v-if="csv" @click="downloadCSV">Download CSV</button>
    <p v-else>Click on Generate CSV to download the Artist List</p>

    <table v-if="artists">
      <thead>
        <tr>
          <th v-for="field in fields" :key="field"> {{ field }} </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(artist, index) in artists" :key="index + artist.mbid">
          <td :key="index + artist.mbid + 'name'">{{ artist.name }}</td>
          <td :key="index + artist.mbid + 'image_small'">
            <img :src="artist.image_small" :alt="artist.name">
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import useResult from '../composables/result';

const {
  artists, fields, csv, filename,
} = useResult();

function downloadCSV() {
  const anchor = document.createElement('a');
  anchor.href = `data:text/csv;charset=utf-8, ${encodeURIComponent(csv.value)}`;
  anchor.download = filename.value;
  anchor.click();
}

</script>

<style scoped lang="scss">
// FIXME make UI beautiful
</style>
