import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './scss/styles.scss';
import moment from 'moment';
import VCalendar from 'v-calendar';
// createApp(App).use(store).use(router).mount('#app');
const app = createApp(App);
/**
 * @params {date} date to be converted to timeago
 * @returns returns timeAgo
 */
app.config.globalProperties.$filters = {
  timeAgo(date: any): any {
    return moment(date).fromNow();
  },
};
app.use(router).use(store).use(VCalendar, {});
app.mount('#app');
