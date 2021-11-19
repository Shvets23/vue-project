<template lang="pug">
.tab-item.active-item
  .tab-title Kanban
  coming-soon
</template>

<script lang="ts">
import Vue from 'vue';
import ComingSoon from '@/components/ComingSoon.vue';

export default Vue.extend({
  name: 'Kanban',
  props: {
    msg: String,
  },
  components: {ComingSoon},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
