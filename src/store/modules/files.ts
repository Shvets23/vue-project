import {FilesStoreInterface} from '@/types/store/files-store.interface';

const filesStore = {
  namespaced: true,
  state: {
    files: [
      'https://i.pinimg.com/originals/97/89/b0/9789b0dba1b81f2b6ae96cf1d0067f0a.jpg',
      'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
    ],
  },
  getters: {
    getFiles(state: FilesStoreInterface): string[] {
      return state.files;
    },
  },
};

export default filesStore;
