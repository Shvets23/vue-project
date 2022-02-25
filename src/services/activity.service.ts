import ApiService from '@/services/helper/api.service';

export default class ActivityService {
  static getActivity() {
    return ApiService.get('/activity');
  }
}
