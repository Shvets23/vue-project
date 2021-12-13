import Vue from 'vue';
import moment from 'moment';

export default Vue.extend({
  methods: {
    formatDate(date: string): string {
      return moment(date).format('YYYY-MM-DD');
    },
  },
});
