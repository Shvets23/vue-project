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
import {defineComponent} from 'vue';
import ComingSoon from '@/components/ComingSoon.vue';
import {mapGetters} from 'vuex';

export default defineComponent({
  name: 'Files',
  data() {
    return {
      files: [],
    };
  },
  props: {
    msg: String,
  },
  components: {ComingSoon},
  computed: {
    ...mapGetters('files', ['getFiles']),
  },
  created() {
    this.files = this.getFiles;
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
