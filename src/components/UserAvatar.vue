<template lang="pug">
a(href='#')
  img(:src='getImgUrl(user.avatar)' alt='user-avatar')
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'UserAvatar',
  props: {
    user: Object,
  },
  methods: {
    getImgUrl(img: string) {
      return require('../assets/img/' + img);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
  width: 100%;
}
</style>
