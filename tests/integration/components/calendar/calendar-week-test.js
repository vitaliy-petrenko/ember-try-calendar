import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('calendar/calendar-week', 'Integration | Component | calendar/calendar week', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{calendar/calendar-week}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#calendar/calendar-week}}
      template block text
    {{/calendar/calendar-week}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
