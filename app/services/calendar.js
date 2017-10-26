import Service from '@ember/service';
import moment from 'npm:moment';

export default Service.extend({
  selectedDate: null,
  init() {
    this.set('selectedDate', moment());
  }
});
