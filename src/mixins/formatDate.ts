import {defineComponent} from 'vue';
import moment from 'moment';

export default defineComponent({
  methods: {
    formatDate(date: string): string {
      return moment(date).format('YYYY-MM-DD');
    },
  },
});
