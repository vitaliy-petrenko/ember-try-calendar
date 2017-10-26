import Ember from 'ember';
import moment from 'npm:moment';

const { Service, computed, inject: { service } } = Ember;

const generateWeekDays = () => {
  const m = moment().startOf('isoweek'),
    weekDays = [];
  for (let i = 0; i < 7; i++, m.add(1, 'days')) {
    weekDays.push(m.format('ddd'))
  }
  return weekDays;
};

const calendarViewTypes = ['week', 'month'];

export default Service.extend({
  timeZone: service(),
  selectedDate: null,
  weekDays: null,
  view: calendarViewTypes[0],

  init() {
    this._super(...arguments);
    this.set('selectedDate', moment());
    this.set('weekDays', generateWeekDays());
  },

  title: computed('selectedDate', 'view', 'timeZone.current', function() {
    const view = this.get('view'),
      selectedDate = this.get('selectedDate');

    if (view === 'week') {
      const weekStart = selectedDate.clone().startOf('isoweek'),
        weekEnd = selectedDate.clone().endOf('isoweek');

      //if same month
      if (weekStart.get('month') === weekEnd.get('month')) {
        return `${weekStart.format('D')} - ${weekEnd.format('D')}, ${weekEnd.format('MMM, Y')}`;
      } else {
        return `${weekStart.format('D MMM')} - ${weekEnd.format('D MMM')}, ${weekEnd.format('Y')}`;
      }
    } else if (view === 'month') {
      return selectedDate.format('MMM, Y')
    }
  }),

  cells: computed('selectedDate', 'view', 'timeZone.current', function() {
    const view = this.get('view'),
      cells = [],
      selectedDate = this.get('selectedDate'),
      currentMoment = moment();
    let firstDate, lastDate;

    if (view === 'week') {
      firstDate = selectedDate.clone().startOf('isoweek');
      lastDate = selectedDate.clone().endOf('isoweek');
    } else if (view === 'month') {
      firstDate = selectedDate.clone().startOf('month').startOf('isoweek');
      lastDate = selectedDate.clone().endOf('month').endOf('isoweek');
    }

    const iteration = (i, j, date) => {
      const cell = {
          title: date.date() === 1 ? date.format('D MMMM') : date.format('D'),
          past: currentMoment.clone().startOf('day').isAfter(date),
          today: currentMoment.isSame(date, 'd')
        };

      if (i % 7 === 0) {
        cells.push([]);
        j++;
      }

      cells[j].push(cell);
    };

    for (let i = 0, j = -1; lastDate.isAfter(firstDate); i++, firstDate.add(1, 'days')) {
      iteration(i, j, firstDate.clone());
    }

    return cells;
  }),

  /**
   * @param direction {number} - >0 if next, else - previous
   */
  changeDate(direction) {
    const view = this.get('view'),
      selectedDate = this.get('selectedDate'),
      period = view === 'week' ? 'weeks' : 'months',
      action = direction > 0 ? 'add' : 'subtract';

    this.set('selectedDate', selectedDate.clone()[action](1, period));
  },

  viewExist(view) {
    return ~calendarViewTypes.indexOf(view);
  },

  today() {
    this.set('selectedDate', moment());
  }
});
