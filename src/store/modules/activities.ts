import {MessageInterface} from '@/types/message.interface';
import {ActivitiesStoreInterface} from '@/types/store/activities-store.interface';

const activitiesStore = {
  namespaced: true,
  state: {
    messages: [
      {
        type: 'mark',
        text: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
        createdAt: '2021-10-27T21:39:54.159Z',
        images: [],
        id: 1,
      },
      {
        type: 'comment',
        text: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
        createdAt: '2021-10-27T21:39:54.159Z',
        images: [],
        id: 2,
      },
      {
        type: 'system',
        text: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
        createdAt: '2021-10-27T21:39:54.159Z',
        images: [],
        id: 3,
      },
      {
        type: 'content',
        text: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
        createdAt: '2021-10-27T21:39:54.159Z',
        images: [
          'https://i.pinimg.com/originals/97/89/b0/9789b0dba1b81f2b6ae96cf1d0067f0a.jpg',
          'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
        ],
        id: 4,
      },
    ] as MessageInterface[],
  },
  getters: {
    getActivities(state: ActivitiesStoreInterface): MessageInterface[] {
      return state.messages;
    },
  },
};

export default activitiesStore;
