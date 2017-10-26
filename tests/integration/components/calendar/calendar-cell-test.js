import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('calendar/calendar-cell', 'Integration | Component | calendar/calendar cell', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{calendar/calendar-cell}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#calendar/calendar-cell}}
      template block text
    {{/calendar/calendar-cell}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
