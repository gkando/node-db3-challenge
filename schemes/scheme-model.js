const knex = require('knex');

const configOptions = require('../knexfile').development;

module.exports = knex(configOptions);
const db = knex(configOptions);

module.exports = {
  find,
  findSteps,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('schemes');
}

function findSteps(id) {
  console.log(id)
  return db('schemes as s')
    .join('steps as t', 's.id', 't.scheme_id')
    .select('s.scheme_name', 't.step_number', 't.instructions')
    .where('t.scheme_id', id)
}

function findById(id) {
  return db('schemes')
    .where({ id })
    .first();
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(id, changes) {
  return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('schemes')
    .where('id', id)
    .del();
}