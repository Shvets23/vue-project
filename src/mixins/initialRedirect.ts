import Vue from 'vue';
import { UserType } from '@/constants/userType';
import TokenService from '@/services/_helper/storage.service';
import { mapState } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapState('user', ['user']),
  },
  methods: {
    initialRedirect() {
      if (TokenService.getToken()) {
        switch (this.user.role) {
          case UserType.Administrator:
            this.replaceRoute('/dashboard');
            break;
          case UserType.Doctor:
            this.replaceRoute('/reports');
            break;
          case UserType.Operator:
            this.replaceRoute('/patient-list');
            break;
          case UserType.Developer:
          default:
            this.replaceRoute('/profile');
        }
      }
    },
    replaceRoute(to: string): void {
      if (this.$route.path !== to) {
        this.$router.replace(to);
      }
    },
  },
});
