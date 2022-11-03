<template>
  <div class="input-search-artist">
    <label for="artist-search">
      {{ props.label }}
      <input id="artist-search" type="text">
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
});
</script>

<style scoped lang="scss">

</style>
