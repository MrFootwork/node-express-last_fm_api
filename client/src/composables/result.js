import { ref } from 'vue';

// global states
const artists = ref([]);
const fields = ['name', 'image_small'];
const csv = ref('');
const filename = ref('');

// by convention, composable function names start with "use"
export default function useResult() {
  // expose managed state as return value
  return {
    artists,
    fields,
    csv,
    filename,
  };
}
