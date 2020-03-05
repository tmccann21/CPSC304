/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'char(30)', notNull: true },
  })
}

exports.down = pgm => {
  pgm.dropTable('users')
}