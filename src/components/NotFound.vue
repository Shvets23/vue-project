<template lang="pug">
.wrap
  p.main-content 404
  p The page you were looking for doesn't exist. Return to
    router-link(to='/tasks')  homepage.
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'NotFound',
});
</script>

<style scoped lang="scss">
.wrap {
  margin: 100px;
  .main-content {
    font-weight: 700;
    font-size: 76px;
    margin-bottom: 50px;
  }
}
</style>
