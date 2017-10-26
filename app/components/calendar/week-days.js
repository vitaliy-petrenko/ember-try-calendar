import Component from '@ember/component';
import moment from 'npm:moment'

const generateWeekDays = () => {
  const m = moment().startOf('isoweek'),
    weekDays = [];
  for (let i = 0; i < 7; i++, m.add(1, 'days')) {
    weekDays.push(m.format('ddd'))
  }
  return weekDays;
};

export default Component.extend({
  classNames: ['calendar__week-days'],
  weekDays: null,
  init() {
    this._super(...arguments);
    this.set('weekDays', generateWeekDays());
  }
});
