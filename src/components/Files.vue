<template lang="pug">
.tab-item.active-item
  .tab-title Files
  table
    tr(v-for='(file, index) in files' :key="`file-${index}`" ref="tableRow")
      td
        .file {{ file }}
      td
        img(:src='file')
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const files = ref([]);
    files.value = store.getters['activities/getFiles'];
    return {
      files,
    };
  },
  name: 'Files',
});
</script>
<style scoped lang="scss">
table {
  margin: 0 auto;
  margin-top: 30px;
}
img {
  width: 30px;
}
.file {
  text-overflow: ellipsis;
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  padding-right: 30px;
}
</style>
