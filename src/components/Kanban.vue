<template lang="pug">
.tab-item.active-item
  .tab-title Kanban
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Kanban',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
