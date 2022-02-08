<template lang="pug">
.tab-item.active-item
  .tab-title Today
  .wrap-helper(v-for='message in messages' :key="`message-${message.id}`")
    .tab-section
      .tab-desc
        .icon.icon-approve(v-if='message.type == messageType.MARK')
        .icon.icon-mess(v-if='message.type == messageType.COMMENT')
        .icon.icon-upload(v-if='message.type == messageType.CONTENT')
        p(v-if='message.type != messageType.SYSTEM') {{ message.text }}
      .activity-time(v-if='message.type != messageType.SYSTEM') {{ formatTaskDate(message.createdAt) }}
    .mess-body(v-if='message.type == messageType.SYSTEM') {{ message.text }}
    .upload-files(v-if='message.type == messageType.CONTENT && message.images.length')
      .img-wrap(v-for='(img, index) in message.images' :key="`image-${index}`" @click="$emit('selectedImg', index)")
        img(:src='img')
</template>

<script lang="ts">
import MessageType from '@/core/enums/message-type.enum';
import {useStore} from 'vuex';
import {defineComponent, ref} from 'vue';
import formatDate from '@/composables/formatDate';

export default defineComponent({
  setup() {
    const {formatTaskDate} = formatDate();
    const messageType = MessageType;
    const messages: any = ref([]);
    const store = useStore();
    store.dispatch('activities/getActivities').then(() => {
      messages.value = store.getters['activities/getActivities'];
    });

    return {
      formatTaskDate,
      messageType,
      messages,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '../scss/vars';
.tab-content {
  padding: 35px 30px 90px;
  background: #fff;
  width: 70%;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 15px;
  height: fit-content;
  .tab-item {
    display: none;
    &.active-item {
      display: block;
    }
    .tab-title {
      opacity: 0.5;
      color: $dark;
      font-size: 14px;
      text-transform: uppercase;
    }
    .tab-section {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      color: $dark;
      .tab-desc {
        display: flex;
        align-items: center;
      }
      .icon {
        background: #cef9c6;
        min-width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before {
          width: 12px;
          height: 12px;
        }
        &.icon-approve {
          &::before {
            content: url(../assets/img/icon.svg);
          }
        }
        &.icon-mess {
          &::before {
            content: url(../assets/img/icon-mess.svg);
          }
        }
        &.icon-upload {
          &::before {
            content: url(../assets/img/icon-upload.svg);
          }
        }
      }
      .icon-mess {
        background: #fff8dd;
      }
      .icon-upload {
        background: #e3efff;
        svg {
          transform: rotate(180deg);
        }
      }
      svg {
        width: 12px;
      }
      p {
        font-size: 16px;
        line-height: 20px;
      }
      .activity-time {
        font-size: 14px;
        opacity: 0.7;
        white-space: nowrap;
      }
    }
    .mess-body {
      background: $lg;
      border-radius: 15px;
      color: $dark;
      font-size: 15px;
      padding: 20px 30px;
      margin: 20px 90px 0;
      line-height: 18px;
    }
    .upload-files {
      margin: 20px 90px 0;
      display: flex;
      flex-wrap: wrap;
      .img-wrap {
        background: $lg;
        border-radius: 15px;
        max-width: 100px;
        height: 100px;
        margin-left: 10px;
        margin-top: 10px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
