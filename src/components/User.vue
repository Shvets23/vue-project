<template lang="pug">
.product-owner
  .owner-helper
    .owner-photo
      user-avatar(:user='user')
    .owner-wrap
      .owner-name {{user.userName}}
      .owner-desc {{user.userRole}}
  .more-info-wrap &bull;&bull;&bull;
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import UserAvatar from '@/components/UserAvatar.vue';

export default defineComponent({
  name: 'User',
  props: {
    user: Object,
  },
  components: {UserAvatar},
});
</script>

<style scoped lang="scss">
@import '../scss/vars';
.product-owner {
  background: #202020;
  padding: 16px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .owner-helper {
    display: flex;
    align-items: center;
  }
  .owner-photo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    background: $lg;
    margin-right: 15px;
    img {
      width: 100%;
    }
  }
  .owner-name {
    font-size: 14px;
    color: white;
    margin-bottom: 5px;
  }
  .owner-desc {
    font-size: 12px;
    color: #9b9b9b;
  }
  .more-info-wrap {
    color: #9b9b9b;
  }
}
</style>
