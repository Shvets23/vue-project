import {MessageInterface} from '@/types/message.interface';
import {ActivitiesStoreInterface} from '@/types/store/activities-store.interface';
import ActivityService from '@/services/activity.service';
import {TasksStoreInterface} from '@/types/store/taska-store.interface';
import {TaskInterface} from '@/types/task.interface';

const activitiesStore = {
  namespaced: true,
  state: {
    messages: [] as MessageInterface[],
  },
  getters: {
    getActivities(state: ActivitiesStoreInterface): MessageInterface[] {
      return state.messages;
    },
    getFiles(state: ActivitiesStoreInterface): String[] {
      let files = [] as String[];
      state.messages.forEach((el) => {
        if (el.images.length) {
          files = files.concat(el.images);
        }
      });
      return files;
    },
  },
  mutations: {
    setActivities(state: ActivitiesStoreInterface, data: MessageInterface[]) {
      state.messages = data;
    },
  },
  actions: {
    getActivities({commit}: any) {
      return ActivityService.getActivity().then((res) => {
        commit('setActivities', res.data);
      });
    },
  },
};

export default activitiesStore;
