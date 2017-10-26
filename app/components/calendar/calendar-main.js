import Ember from 'ember';
import moment from 'npm:moment';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  init() {
    this._super(...arguments);
    this.set('selectedDate', moment());
  },

  timeZone: service(),
  selectedDate: null,

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

  cells: computed('selectedDate', 'timeZone.current', function() {
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

    for (let i = 0, j = -1; lastDate.isAfter(firstDate); i++, firstDate.add(1, 'days')) {
      const date = firstDate.clone(),
        cell = {
          title: date.date() === 1 ? date.format('D MMMM') : date.format('D'),
          past: currentMoment.clone().startOf('day').isAfter(date),
          today: currentMoment.isSame(date, 'd')
        };

      if (i % 7 === 0) {
        cells.push([]);
        j++;
      }
      cells[j].push(cell);
    }

    return cells;
  }),

  actions: {
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

    changeTimeZone(value) {
      this.get('timeZone').changeTimeZone(value);
    }
  }
});
