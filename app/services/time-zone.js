import Service from '@ember/service';
import moment from 'npm:moment';
import 'npm:moment-timezone';

const availableTimeZones = [
    'America/Adak',
    'America/Los_Angeles',
    'Europe/Kiev',
    'Australia/Sydney'
  ],
  defaultTimeZone = availableTimeZones[0];

const applyGlobalTimeZone = timeZone => {
  moment.tz.setDefault(timeZone);
};

applyGlobalTimeZone(availableTimeZones[0]);

export default Service.extend({
  list: null,
  current: defaultTimeZone,
  init() {
    this._super(...arguments);
    this.set('list', availableTimeZones);
  },
  changeTimeZone(newTimeZone) {
    if (~this.get('list').indexOf(newTimeZone)) {
      applyGlobalTimeZone(newTimeZone);
      this.set('current', newTimeZone);
    }
  }
});
